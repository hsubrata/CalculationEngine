package com.dataart.spreadsheetanalytics.engine;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.dataart.spreadsheetanalytics.api.model.ICellAddress;
import com.dataart.spreadsheetanalytics.api.model.IDataModel;
import com.dataart.spreadsheetanalytics.api.model.IDataModelId;
import com.dataart.spreadsheetanalytics.model.A1Address;
import com.dataart.spreadsheetanalytics.model.A1RangeAddress;

/**
 * This class integrates all the information about 'DEFINE' function.
 * Function itself (function code, implementation) can be found in {@link DefineFunction} and {@link FuncexecFunction} in engine-functions library.
 * 
 * This class is only the container for meta information.
 * When parsing of spreadsheet is done (search for DEFINEs) all information is stored in instances of this class.
 * 
 * Meta information contains:
 * <li>Function name</li>
 * <li>Input paramenters (links to {@link ICellAddress})</li>
 * <li>Output paramentes (links to {@link ICellAddress})</li>
 * <li>Id of {@link IDataModel} as {@link IDataModelId}</li>
 * 
 */
@SuppressWarnings("javadoc")
public class DefineFunctionMeta extends AttributeFunctionMeta {

    /** Name of DEFINE function in excel */
    public static final String KEYWORD = "DEFINE";
    /** Separator for intput and output arguments */
    public static final String IN_OUT_SEPARATOR = "#";
    
    public final static Map<String, Class<DefineFunctionMeta>> ATTRIBUTE_FUNCTION = Collections.unmodifiableMap(new LinkedHashMap() {
        {
            put(DefineFunctionMeta.KEYWORD, DefineFunctionMeta.class);
        }
    });
    
    protected List<ICellAddress> inputs;
    protected List<ICellAddress> outputs;
    
    public List<ICellAddress> inputs() { return this.inputs; }
    public List<ICellAddress> outputs() { return this.outputs; }
    
    public void inputs(List<ICellAddress> inputs) { this.inputs = inputs; }
    public void outputs(List<ICellAddress> outputs) { this.outputs = outputs; }
    
    public DefineFunctionMeta parse(String formula) {

        String[] ptgs = formula
                            .replace(KEYWORD, "")
                            .replace("(", "")
                            .replace(")", "")
                            .replace("\"", "")
                            .replace(" ", "")
                            .split(",");
        
        if (ptgs.length < 2) { throw new IllegalArgumentException("Number of arguments in " + KEYWORD + " function must be more than 2"); }
        if (!formula.contains(IN_OUT_SEPARATOR)) { throw new IllegalArgumentException(KEYWORD + " function must contain a " + IN_OUT_SEPARATOR); }
        
        DefineFunctionMeta meta = new DefineFunctionMeta();
        meta.name(ptgs[0]);

        List<ICellAddress> in = new LinkedList<>();
        List<ICellAddress> out = new LinkedList<>();
        
        boolean passedSeparator = false;

        for (int i = 1; i < ptgs.length; i++) {

            if (IN_OUT_SEPARATOR.equals(ptgs[i])) { passedSeparator = true; continue; }

            if (passedSeparator) {
                A1Address outAddr = A1Address.fromA1Address(ptgs[i]);
                if (outAddr instanceof A1RangeAddress) {
                    out.addAll(A1RangeAddress.toCellAddresses((A1RangeAddress) outAddr));
                } else {
                    out.add(outAddr);
                }
            } else {
                in.add(A1Address.fromA1Address(ptgs[i]));
            }
        }

        meta.inputs(in);
        meta.outputs(out);

        return meta;
    }

}
