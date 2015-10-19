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

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import com.dataart.spreadsheetanalytics.api.model.IDsCell;
import com.dataart.spreadsheetanalytics.api.model.IDsRow;

public class DsRow implements IDsRow {

    protected final int index;
    protected List<IDsCell> cells;
    
    protected Iterator<IDsCell> iterator;
    
    public DsRow(int rowIndex) {
        this.index = rowIndex;
        this.cells = new ArrayList<>();
    }

    @Override public int index() { return this.index; }
    
    @Override public int width() { return cells.size(); }
    
    @Override public List<IDsCell> cells() { return Collections.<IDsCell>unmodifiableList(this.cells); }
    
    @Override public IDsCell cellAt(int cellIndex) {
        return cellIndex < 0 || cellIndex >= cells().size() ? null : cells().get(cellIndex);
    }
    
    public DsCell createCell() {
        DsCell cell = new DsCell(cells.size() + 1);
        cells.add(cell);
        this.iterator = this.cells.iterator();
        return cell;
    }

    @Override
    public Iterator<IDsCell> iterator() {
        this.iterator = this.cells.iterator();
        return this;
    }

    @Override public boolean hasNext() { return this.iterator.hasNext(); }
    @Override public IDsCell next() { return this.iterator.next(); }

    @Override
    public String toString() {
        return cells.toString();
    }    
}
