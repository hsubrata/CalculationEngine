/*
Copyright 2015 DataArt, Inc.

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
package com.dataart.spreadsheetanalytics.model;

import java.io.IOException;
import java.io.InputStream;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.dataart.spreadsheetanalytics.api.model.ICellAddress;
import com.dataart.spreadsheetanalytics.api.model.ICellValue;
import com.dataart.spreadsheetanalytics.api.model.IDataModel;

public class DataModel extends DataSet implements IDataModel {

    public final XSSFWorkbook poiModel;

    public DataModel(String name, String path) throws IOException {
        super(name);
        this.poiModel = new XSSFWorkbook(path);
        this.dataModelId = new DataModelId(this.poiModel.toString());
    }

    public DataModel(String name, InputStream in) throws IOException {
        super(name);
        this.poiModel = new XSSFWorkbook(in);
        this.dataModelId = new DataModelId(this.poiModel.toString());
    }

    @Override
    public void replaceCellValue(ICellAddress address, ICellValue value) {
        Sheet s = poiModel.getSheetAt(0/*TODO: add sheet information here*/);
        Row r = s.getRow(address.row());
        if (r == null) { r = s.createRow(address.row()); }
        Cell c = r.getCell(address.column());
        if (c == null) { c = r.createCell(address.column()); }

        if (value.get() instanceof Number) {
            c.setCellValue((double) value.get());
        } else if (value.get() instanceof Boolean) {
            c.setCellValue((boolean) value.get());
        } else if (value.get() instanceof String) {
            c.setCellValue((String) value.get());
        }
    }
    
    public boolean isFormulaCell(ICellAddress addr) {
        Sheet s = poiModel.getSheetAt(0 /* TODO: sheet number 1 */ );
        Row r = s.getRow(addr.row());
        if (r == null) { return false; }
        Cell c = r.getCell(addr.column());
        if (c == null) { return false; }

        return Cell.CELL_TYPE_FORMULA == c.getCellType();
    }
    
    @Override
    public String toString() {
        return name();
    }
        
}
