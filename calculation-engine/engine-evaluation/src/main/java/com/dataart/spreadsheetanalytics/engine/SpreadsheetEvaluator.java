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

import static com.dataart.spreadsheetanalytics.engine.Converters.toWorkbook;
import static com.dataart.spreadsheetanalytics.engine.PoiWorkbookConverters.getEvaluationCell;
import static com.dataart.spreadsheetanalytics.engine.PoiWorkbookConverters.toEvaluationWorkbook;
import static com.dataart.spreadsheetanalytics.engine.graph.PoiExecutionGraphBuilder.resolveValueEval;
import static com.dataart.spreadsheetanalytics.functions.poi.Functions.getUdfFinder;
import static org.apache.poi.common.execgraph.IExecutionGraphVertexProperty.PropertyName.VALUE;
import static org.apache.poi.ss.formula.IStabilityClassifier.TOTALLY_IMMUTABLE;
import static org.apache.poi.ss.formula.eval.ErrorEval.NA;
import static org.apache.poi.ss.formula.eval.ErrorEval.NAME_INVALID;
import static org.apache.poi.ss.formula.eval.ErrorEval.REF_INVALID;
import static org.apache.poi.ss.formula.eval.ErrorEval.VALUE_INVALID;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.poi.common.execgraph.FormulaParseNAException;
import org.apache.poi.common.execgraph.FormulaParseNameException;
import org.apache.poi.common.execgraph.IExecutionGraphBuilder;
import org.apache.poi.common.execgraph.IncorrectExternalReferenceException;
import org.apache.poi.common.execgraph.ValuesStackNotEmptyException;
import org.apache.poi.ss.formula.EvaluationCell;
import org.apache.poi.ss.formula.EvaluationWorkbook;
import org.apache.poi.ss.formula.WorkbookEvaluator;
import org.apache.poi.ss.formula.atp.AnalysisToolPak;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.dataart.spreadsheetanalytics.api.engine.IAuditor;
import com.dataart.spreadsheetanalytics.api.engine.IEvaluator;
import com.dataart.spreadsheetanalytics.api.model.ICellAddress;
import com.dataart.spreadsheetanalytics.api.model.ICellValue;
import com.dataart.spreadsheetanalytics.api.model.IDataModel;
import com.dataart.spreadsheetanalytics.api.model.IDataSet;
import com.dataart.spreadsheetanalytics.api.model.IDmCell;
import com.dataart.spreadsheetanalytics.api.model.IDmRow;
import com.dataart.spreadsheetanalytics.engine.graph.ExecutionGraphVertex;
import com.dataart.spreadsheetanalytics.engine.graph.PoiExecutionGraphBuilder;
import com.dataart.spreadsheetanalytics.functions.poi.CustomFunction;
import com.dataart.spreadsheetanalytics.functions.poi.Functions;
import com.dataart.spreadsheetanalytics.model.A1Address;
import com.dataart.spreadsheetanalytics.model.CellValue;
import com.dataart.spreadsheetanalytics.model.DataSet;
import com.dataart.spreadsheetanalytics.model.DsCell;
import com.dataart.spreadsheetanalytics.model.DsRow;

/**
 * SpreadsheetEvaluator is a direct implementation of {@link IEvaluator} interface.
 * It allows to do spreadsheets evaluation. It's 2 major methods are {@link #evaluate()} and {@link #evaluate(ICellAddress)}.
 * They do evaluation of one cell, or whole spreadsheet cell, by cell (algorithm can be changed in future).
 * 
 * This version of Evaluator requires an {@link IDataModel} to evaluate. DataModel provides access to POI's proxy workbook object, 
 * so instance of {@link WorkbookEvaluator} can do actual evaluation.
 * 
 * {@link IExecutionGraphBuilder} can be attached to this class to trace all evaluation steps. This is usually done via
 * {@link IAuditor}.
 */
public class SpreadsheetEvaluator implements IEvaluator {
    private static final Logger log = LoggerFactory.getLogger(SpreadsheetEvaluator.class);

    protected final IDataModel model;
    protected final EvaluationWorkbook evaluationWorkbook;
    protected final WorkbookEvaluator poiEvaluator;
    
    static {
        try { loadCustomFunctions(); }
        catch (Exception e) { log.error("Custom functions loading was unsuccessful. This may cause Evaluator to not work with custom functions.", e); }
    }
        
    public SpreadsheetEvaluator(IDataModel model) throws IOException {
        this.model = model;
        this.evaluationWorkbook = toEvaluationWorkbook(toWorkbook(this.model));
        this.poiEvaluator = new WorkbookEvaluator(this.evaluationWorkbook, TOTALLY_IMMUTABLE, getUdfFinder());        
    }
    
    public SpreadsheetEvaluator(IDataModel model, String context) throws IOException {
        this.model = model;
        this.evaluationWorkbook = toEvaluationWorkbook(toWorkbook(this.model));
        this.poiEvaluator = new WorkbookEvaluator(this.evaluationWorkbook, TOTALLY_IMMUTABLE, getUdfFinder());
        CustomFunction.setContext(context);
    }
    
    @Override
    public ICellValue evaluate(ICellAddress addr) {
        EvaluationCell cell = getEvaluationCell(this.evaluationWorkbook, addr);
        if (cell == null) { return null; }
        
        try { return evaluateCell(cell); }
        catch (ValuesStackNotEmptyException e) { return CellValue.from(VALUE_INVALID.getErrorString()); }        
    }

    @Override
    public IDataSet evaluate() {
        DataSet dataSet = new DataSet(model.name());

        for (int i = this.model.getFirstRowIndex(); i <= this.model.getLastRowIndex(); i++) {
            IDmRow row = this.model.getRow(i);
            DsRow evaluatedRow = dataSet.createRow();
            if (row == null) { continue; }

            for (int j = row.getFirstColumnIndex(); j <= row.getLastColumnIndex(); j++) {
                IDmCell cell = row.getCell(i);
                DsCell evaluatedCell = evaluatedRow.createCell();
                if (cell == null) { continue; }

                ICellAddress addr = A1Address.fromRowColumn(i, j);
                try { evaluatedCell.value(evaluateCell(getEvaluationCell(this.evaluationWorkbook, addr))); }
                catch (ValuesStackNotEmptyException e) { evaluatedCell.value(handleExceptionForGraphBuilder(this.poiEvaluator.getExecutionGraphBuilder(), addr)); }
            }
        }

        return dataSet;
    }

    protected ICellValue evaluateCell(EvaluationCell c) {
        if (c == null) { return null; }
        
        try { return resolveValueEval(this.poiEvaluator.evaluate(c)); }
        catch (FormulaParseNameException e) { return handleNameParseException(); }
        catch (FormulaParseNAException e) { return handleNaParseException(); }
        catch (IncorrectExternalReferenceException e) { return handleIncorrectExternalReferenceException(); }
    }

    protected static ICellValue handleIncorrectExternalReferenceException() {
        return CellValue.from(REF_INVALID.getErrorString());
    }

    protected static ICellValue handleNameParseException() {
        return CellValue.from(NAME_INVALID.getErrorString());
    }

    protected static ICellValue handleNaParseException() {
        return CellValue.from(NA.getErrorString());
    }

    protected static void loadCustomFunctions() throws ReflectiveOperationException {
        Map<String, Class<? extends CustomFunction>> map = Functions.get();
        AnalysisToolPak._saFunctionsByName = new HashMap<>();
        map.forEach((k, v) -> AnalysisToolPak._saFunctionsByName.put(k, null));
        
        for (Entry<String, Class<? extends CustomFunction>> en : map.entrySet())
            { WorkbookEvaluator.registerFunction(en.getKey(), en.getValue().newInstance()); }
    }
    
    protected static ICellValue handleExceptionForGraphBuilder(IExecutionGraphBuilder builder, ICellAddress cell) {
        if (builder instanceof PoiExecutionGraphBuilder) {
            ((PoiExecutionGraphBuilder) builder).getVerticesFromCache(cell.row(), cell.column())
                                                .forEach(v -> ((ExecutionGraphVertex) v).property(VALUE).set(VALUE_INVALID.getErrorString()));
        }
        return CellValue.from(VALUE_INVALID.getErrorString());
    }

    void setExecutionGraphBuilder(IExecutionGraphBuilder graphBuilder) { this.poiEvaluator.setExecutionGraphBuilder(graphBuilder); }

}
