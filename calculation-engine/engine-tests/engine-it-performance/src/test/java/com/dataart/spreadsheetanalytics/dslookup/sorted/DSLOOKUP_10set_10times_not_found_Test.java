package com.dataart.spreadsheetanalytics.dslookup.sorted;

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
import com.dataart.spreadsheetanalytics.dslookup.ZParentTest;
import com.dataart.spreadsheetanalytics.engine.SpreadsheetEvaluator;
import com.dataart.spreadsheetanalytics.engine.util.PoiFileConverter;
import com.dataart.spreadsheetanalytics.model.A1Address;
import com.dataart.spreadsheetanalytics.model.DataModel;

public class DSLOOKUP_10set_10times_not_found_Test extends ZParentTest {

    @State(Scope.Benchmark)
    public static class BenchmarkStateEvaluator {
        int dslookups = 10;
        int iterations = dslookups * 4;
        int dataSetSize = 10;
        String excelFile = "src/test/resources/datamodel/dslookup/sorted/DSLOOKUP_" + dataSetSize + "set_" + dslookups + "times_not_found.xlsx";
        String dataSet = "src/test/resources/dataset/SortedDataSet" + dataSetSize + ".xlsx";

        Map<ICellAddress, Object> expectedValues;

        DataModel dataModel;
        IEvaluator evaluator;
        Map<Integer, ICellAddress> addressMap;

        @Setup(Level.Trial)
        public void initialize() throws Exception {
            this.dataModel = new DataModel(excelFile + "_Benchmark", excelFile);
            this.evaluator = new SpreadsheetEvaluator(dataModel);

            external.getDataSetStorage().saveDataSet(PoiFileConverter.toDataSet(new XSSFWorkbook(dataSet)));

            this.expectedValues = new HashMap<>();
            for (int i = from; i < from + iterations; i++)
                expectedValues.put(A1Address.fromA1Address(columnA + i), evaluator.evaluate(A1Address.fromA1Address(columnB + i)).get());

            this.addressMap = new HashMap<>();
            for (int i = from; i < from + iterations; i++)
                this.addressMap.put(i, A1Address.fromA1Address(columnA + i));
        }

        ICellAddress addressAt(int i) { return addressMap.get(i); }
    }

    @Benchmark
    public void evaluate_ExcelDataModel_ExecutionTimeIsOk(BenchmarkStateEvaluator state, Blackhole bh) {
        for (int i = from; i < from + state.iterations; i++) {
            ICellValue value = state.evaluator.evaluate(state.addressAt(i));
            assertThat(value.get()).isEqualTo(state.expectedValues.get(state.addressAt(i))); /* comment for better performance */
            bh.consume(value);
        }
    }

}
