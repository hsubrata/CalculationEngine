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
package com.dataart.spreadsheetanalytics.api.model;

import com.dataart.spreadsheetanalytics.model.CellValue;

/**
 * Container for Cell's value. 
 * Since value can be of any type (Integer, Double, String, Error, etc.) this interface provides 
 * a wrapper to original value, so it can be send to any recipients.
 * The value is of {@link Object} class.
 * 
 * Basic implementation: {@link CellValue}.
 */
public interface ICellValue {
    
    /**
     * Returns the underlying value.
     */
    Object get();

}
