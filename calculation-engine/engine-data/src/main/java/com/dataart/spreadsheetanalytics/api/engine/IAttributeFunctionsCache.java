package com.dataart.spreadsheetanalytics.api.engine;

import java.util.Map;
import java.util.Set;

import com.dataart.spreadsheetanalytics.api.model.IDataModel;
import com.dataart.spreadsheetanalytics.engine.DefineFunctionMeta;

public interface IAttributeFunctionsCache {

    void addDefineFunction(DefineFunctionMeta meta);
    
    Map<String, DefineFunctionMeta> getDefineFunctions();
    
    void updateDefineFunctions(Set<IDataModel> dataModels);

}
