/*
Copyright 2015 DataArt Apps, Inc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package com.dataart.spreadsheetanalytics.engine;

import static com.dataart.spreadsheetanalytics.engine.ExcelFileConverters.resolveCellValue;
import static com.dataart.spreadsheetanalytics.model.A1Address.fromRowColumn;
import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static java.util.UUID.randomUUID;
import static org.apache.poi.ss.formula.FormulaParser.parse;
import static org.apache.poi.ss.formula.FormulaType.CELL;
import static org.apache.poi.ss.usermodel.Cell.CELL_TYPE_FORMULA;
import static org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook.create;

import java.io.IOException;
import java.io.InputStream;
import java.util.LinkedList;
import java.util.List;

import org.apache.poi.ss.formula.FormulaParseException;
import org.apache.poi.ss.formula.FormulaParsingWorkbook;
import org.apache.poi.ss.formula.ptg.AreaPtg;
import org.apache.poi.ss.formula.ptg.Ptg;
import org.apache.poi.ss.formula.ptg.RefPtg;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.dataart.spreadsheetanalytics.api.model.ICellAddress;
import com.dataart.spreadsheetanalytics.api.model.IDataModel;
import com.dataart.spreadsheetanalytics.model.A1RangeAddress;
import com.dataart.spreadsheetanalytics.model.DataModel;
import com.dataart.spreadsheetanalytics.model.DmCell;

public final class DependencyExtractors {
    private static final Logger log = LoggerFactory.getLogger(DependencyExtractors.class);
    
    private static final String POI_FUNCTION_PREFIX = "_xlfn.";
    
    private DependencyExtractors() {}

    public static IDataModel toDataModel(final InputStream book, final ICellAddress address) throws IOException {
        return toDataModel(new XSSFWorkbook(book), address);
    }
    
    public static IDataModel toDataModel(final Workbook book, final ICellAddress address) throws IOException {
        if (book == null || address == null) { return null; }
        if (address instanceof A1RangeAddress) { throw new IllegalArgumentException("A1RangeAddress is not supported, only one cell can be converted to DataModel."); }
        
        Sheet s = book.getSheetAt(0); /* TODO: only one sheet is supported */
        Row r = s.getRow(address.row());
        if (r == null) { return null; }
        Cell c = r.getCell(address.column());
        if (c == null || CELL_TYPE_FORMULA != c.getCellType()) { return null; }

        return createDataModelFromCell(s, create((XSSFWorkbook) book), fromRowColumn(c.getRowIndex(), c.getColumnIndex()));
    }
    
    public static List<IDataModel> toDataModels(final InputStream book, final String function) throws IOException {
        return toDataModels(new XSSFWorkbook(book), function);
    }
    
    public static List<IDataModel> toDataModels(final Workbook book, final String function) {
        if (book == null || function == null) { return emptyList(); }
        List<IDataModel> list = new LinkedList<>();

        final FormulaParsingWorkbook parsingBook = create((XSSFWorkbook) book);
        
        Sheet s = book.getSheetAt(0); /* TODO: only one sheet is supported */
        for (Row r : s) {
            for (Cell c : r) {
                if (c == null || CELL_TYPE_FORMULA != c.getCellType()) { continue; }

                try {
                    if (isFunctionInFormula(c.getCellFormula(), function))
                        { list.add(createDataModelFromCell(s, parsingBook, fromRowColumn(c.getRowIndex(), c.getColumnIndex()))); } }
                catch (FormulaParseException e) { log.warn("Warning while parsing excel formula. Probably this is OK.", e); }
            }
        }
        
        return list;
    }

    private static boolean isFunctionInFormula(String formula, String function) {
        String filteredFormula = formula.replace(POI_FUNCTION_PREFIX, "");
        return filteredFormula.startsWith(function) && filteredFormula.replace(function, "").startsWith("(");
    }

    private static IDataModel createDataModelFromCell(Sheet sheet, FormulaParsingWorkbook workbook, ICellAddress address) {
        IDataModel dm = new DataModel(randomUUID().toString());
        resolveCellDependencies(address, sheet, workbook).forEach(cell -> copyCell(cell, sheet, dm));
        return dm;
    }

    public static List<ICellAddress> resolveCellDependencies(ICellAddress cellAddress, Sheet sheet, FormulaParsingWorkbook workbook) {
        Row row = sheet.getRow(cellAddress.row());
        if (row == null) { return emptyList(); }
        Cell cell = row.getCell(cellAddress.column());
        if (cell == null) { return emptyList(); }
        
        if (CELL_TYPE_FORMULA != cell.getCellType()) { return singletonList(cellAddress); }
        
        List<ICellAddress> dependencies = new LinkedList<>();
        
        for (Ptg ptg : parse(cell.getCellFormula(), workbook, CELL, 0)) { /* TODO: only one sheet is supported */
            
            if (ptg instanceof RefPtg) {
                RefPtg ref = (RefPtg) ptg;
                
                dependencies.addAll(resolveCellDependencies(fromRowColumn(ref.getRow(), ref.getColumn()), sheet, workbook));
            
            } else if (ptg instanceof AreaPtg) {
                AreaPtg area = (AreaPtg) ptg;
                
                for (int r = area.getFirstRow(); r <= area.getLastRow(); r++) {
                    for (int c = area.getFirstColumn(); c <= area.getLastColumn(); c++) {
                        dependencies.addAll(resolveCellDependencies(fromRowColumn(r, c), sheet, workbook));
                    }
                }
            }
            
            dependencies.add(cellAddress);
        }
        
        return dependencies;
    }

    private static void copyCell(ICellAddress address, Sheet from, IDataModel to) {
        if (from == null) { return; }
        Row fromRow = from.getRow(address.row());
        if (fromRow == null) { return; }
        Cell fromCell = fromRow.getCell(address.column());
        if (fromCell == null) { return; }
        
        DmCell toCell = new DmCell();
        toCell.address(address);
        toCell.alias("TODO"); /*TODO*/
        toCell.content(resolveCellValue(fromCell));
        
        to.setCell(address, toCell);
    }
}