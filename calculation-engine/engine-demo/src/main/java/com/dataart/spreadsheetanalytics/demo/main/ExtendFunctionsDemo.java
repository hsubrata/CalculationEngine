package com.dataart.spreadsheetanalytics.demo.main;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.dataart.spreadsheetanalytics.api.engine.ExternalServices;
import com.dataart.spreadsheetanalytics.api.engine.IAuditor;
import com.dataart.spreadsheetanalytics.api.engine.IEvaluator;
import com.dataart.spreadsheetanalytics.api.model.ICellAddress;
import com.dataart.spreadsheetanalytics.api.model.IExecutionGraph;
import com.dataart.spreadsheetanalytics.demo.util.DemoUtil;
import com.dataart.spreadsheetanalytics.engine.AttributeFunctionsScanner;
import com.dataart.spreadsheetanalytics.engine.SpreadsheetAuditor;
import com.dataart.spreadsheetanalytics.engine.SpreadsheetEvaluator;
import com.dataart.spreadsheetanalytics.engine.execgraph.ExecutionGraphConfig;
import com.dataart.spreadsheetanalytics.functions.poi.Functions;
import com.dataart.spreadsheetanalytics.model.A1Address;
import com.dataart.spreadsheetanalytics.model.CellAddress;
import com.dataart.spreadsheetanalytics.model.PoiDataModel;
import com.other.project.functions.ModeldefineFunction;


public class ExtendFunctionsDemo {

    public static void main(String[] args) throws Exception {

        final String excel = "src/main/resources/excel/define-funcexec/Modelexec_Test.xlsx";
        final List<String> cellsToEvaluate = new ArrayList<>(Arrays.asList("A2"));

        //prepare DataModel to work with
        final PoiDataModel model = new PoiDataModel(Paths.get(excel).getFileName().toString(), excel);

        DemoUtil.initCaches(model);
        
        OtherFunctions.init();

        //create Evaluator
        final IEvaluator evaluator = new SpreadsheetEvaluator(model);

        //evaluate and save to map to print later
        Map<String, Object> values = new LinkedHashMap<>();
        for (String cell : cellsToEvaluate) {
            values.put(cell, evaluator.evaluate(new CellAddress(model.dataModelId(), A1Address.fromA1Address(cell))));
        }

        //last cell
        final ICellAddress addr = new CellAddress(model.dataModelId(), A1Address.fromA1Address(cellsToEvaluate.get(cellsToEvaluate.size() - 1)));

        //create Auditor
        final IAuditor auditor = new SpreadsheetAuditor((SpreadsheetEvaluator) evaluator);
        //build graph
        final IExecutionGraph graph = auditor.buildExecutionGraph(addr, ExecutionGraphConfig.DEFAULT);

        //print graph
        DemoUtil.generateVisJsData(graph);
        DemoUtil.plainprint(graph);

        //pring values\
        System.out.println("\n\n***********");
        for (String cell : values.keySet()) {
            System.out.println("Result of " + cell + " is: " + values.get(cell));
        }
    }
}

class OtherFunctions extends Functions {
    public static final String OTHER_PACKAGE_FUNCTIONS = "com.other.project.functions";

    public static void init() { //or non static init()
        Functions.add(Functions.load(OTHER_PACKAGE_FUNCTIONS));
        
        ExternalServices external = ExternalServices.INSTANCE;
        external.getDataModelStorage().getDataModels().values().forEach(dm -> {
            AttributeFunctionsScanner.scan(dm, ModeldefineFunction.map).get(ModeldefineFunction.KEYWORD).values()
                                     .forEach(dfm -> external.getAttributeFunctionStorage().addDefineFunction(dfm));
        });
    }
}