var nodes = new vis.DataSet([
                             /* {id: a, label: b, ...}, */
{id: '1994', label: 'E6\n6.0', color: '#31b0d5', title: 'Name: E6<br>Alias: null<br>Value: 6.0<br>Type: CELL_WITH_FORMULA<br>Id: 1994<br>Formula Expression: Formula String: INDEX(VALUE, VALUE, A1:C4); Formula Values: INDEX(2.0, 3.0, [[Apples, Lemons, 7.0], [Bananas, Pears, u], [67.0, 6.0, u], [9.0, 98.0, 98.0]]); Formula Ptg: ; Ptgs:  Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@2443abd6'},
{id: '1995', label: 'A1:C4\n...', color: '#31b0d5', title: 'Name: A1:C4<br>Alias: null<br>Value: [[Apples, Lemons, 7.0], [Bananas, Pears, u], [67.0, 6.0, u], [9.0, 98.0, 98.0]]<br>Type: RANGE<br>Id: 1995<br>Formula Expression: Formula String: A1:C4; Formula Values: [[Apples, Lemons, 7.0], [Bananas, Pears, u], [67.0, 6.0, u], [9.0, 98.0, 98.0]]; Formula Ptg: [[Apples, Lemons, 7.0], [Bananas, Pears, u], [67.0, 6.0, u], [9.0, 98.0, 98.0]]; Ptgs: A1:C4 Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@2443abd6'},
{id: '1996', label: 'VALUE\n3.0', color: '#31b0d5', title: 'Name: VALUE<br>Alias: null<br>Value: 3.0<br>Type: CONSTANT_VALUE<br>Id: 1996<br>Formula Expression: Formula String: VALUE; Formula Values: 3.0; Formula Ptg: 3.0; Ptgs: VALUE Index in Ptgs: 1 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@2443abd6'},
{id: '1997', label: 'VALUE\n2.0', color: '#31b0d5', title: 'Name: VALUE<br>Alias: null<br>Value: 2.0<br>Type: CONSTANT_VALUE<br>Id: 1997<br>Formula Expression: Formula String: VALUE; Formula Values: 2.0; Formula Ptg: 2.0; Ptgs: VALUE Index in Ptgs: 2 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@2443abd6'},
{id: '1998', label: 'INDEX\n[[6.0]]', color: '#f0ad4e', title: 'Name: INDEX<br>Alias: null<br>Value: [[6.0]]<br>Type: FUNCTION<br>Id: 1998<br>Formula Expression: Formula String: INDEX(VALUE, VALUE, A1:C4); Formula Values: INDEX(2.0, 3.0, [[Apples, Lemons, 7.0], [Bananas, Pears, u], [67.0, 6.0, u], [9.0, 98.0, 98.0]]); Formula Ptg: ; Ptgs:  Index in Ptgs: 3 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@2443abd6'}
                            ]);


var edges = new vis.DataSet([
                             /* {from: id_a, to: id_b}, */
{from: '1997', to: '1998'},
{from: '1996', to: '1998'},
{from: '1995', to: '1998'},
{from: '1998', to: '1994'}
                            ]);