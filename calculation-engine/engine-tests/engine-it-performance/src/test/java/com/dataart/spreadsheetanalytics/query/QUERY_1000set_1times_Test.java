package com.dataart.spreadsheetanalytics.query;

import static org.assertj.core.api.StrictAssertions.assertThat;

import java.util.HashMap;
import java.util.Map;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Level;
import org.openjdk.jmh.annotations.Scope;
import org.openjdk.jmh.annotations.Setup;
import org.openjdk.jmh.annotations.State;
import org.openjdk.jmh.infra.Blackhole;

import com.dataart.spreadsheetanalytics.api.engine.IEvaluator;
import com.dataart.spreadsheetanalytics.api.model.ICellAddress;
import com.dataart.spreadsheetanalytics.api.model.ICellValue;
import com.dataart.spreadsheetanalytics.engine.ExcelFileConverters;
import com.dataart.spreadsheetanalytics.engine.SpreadsheetEvaluator;
import com.dataart.spreadsheetanalytics.model.A1Address;
import com.dataart.spreadsheetanalytics.model.PoiDataModel;

public class QUERY_1000set_1times_Test extends ZParentTest {

    @State(Scope.Benchmark)
    public static class BenchmarkStateEvaluator {
        protected int iterations = 1;
        protected int dataSetSize = 1000;
        protected String excelFile = "src/test/resources/datamodel/query/QUERY_" + dataSetSize + "set_" + iterations + "times.xlsx";
        protected String dataSet = "src/test/resources/dataset/ShuffledDataSet" + dataSetSize + ".xlsx";

        PoiDataModel dataModel;
        IEvaluator evaluator;
        Map<Integer, ICellAddress> addressMap;

        @Setup(Level.Trial)
        public void initialize() throws Exception {
            external.getDataSetStorage().saveDataSet(ExcelFileConverters.toDataSet(new XSSFWorkbook(dataSet)));

            this.dataModel = new PoiDataModel(excelFile + "_Benchmark", excelFile);
            this.evaluator = new SpreadsheetEvaluator(dataModel);

            this.addressMap = new HashMap<>();
            for (int i = from; i < from + iterations; i++)
                this.addressMap.put(i, A1Address.fromA1Address(column + i));
        }

        ICellAddress addressAt(int i) {
            return addressMap.get(i);
        }
    }

    @Benchmark
    public void evaluate_ExcelDataModel_ExecutionTimeIsOk(BenchmarkStateEvaluator state, Blackhole bh) {
        for (int i = from; i < from + state.iterations; i++) {
            ICellValue value = state.evaluator.evaluate(state.addressAt(i));
            assertThat(value.get()).isEqualTo(expectedValue); /* comment for better performance */
            bh.consume(value);
        }
    }

}
