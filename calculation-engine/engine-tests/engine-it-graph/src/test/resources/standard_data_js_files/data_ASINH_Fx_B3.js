var nodes = new vis.DataSet([
                             /* {id: a, label: b, ...}, */
{id: '68', label: 'B3\n3.4023066454805946', color: '#31b0d5', title: 'Name: B3<br>Alias: null<br>Value: 3.4023066454805946<br>Type: CELL_WITH_FORMULA<br>Id: 68<br>Formula Expression: Formula String: ASINH(VALUE); Formula Values: ASINH(15.0); Formula Ptg: ; Ptgs:  Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@2b91004a'},
{id: '69', label: 'VALUE\n15.0', color: '#31b0d5', title: 'Name: VALUE<br>Alias: null<br>Value: 15.0<br>Type: CONSTANT_VALUE<br>Id: 69<br>Formula Expression: Formula String: VALUE; Formula Values: 15.0; Formula Ptg: 15.0; Ptgs: VALUE Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@2b91004a'},
{id: '70', label: 'ASINH\n3.4023066454805946', color: '#f0ad4e', title: 'Name: ASINH<br>Alias: null<br>Value: 3.4023066454805946<br>Type: FUNCTION<br>Id: 70<br>Formula Expression: Formula String: ASINH(VALUE); Formula Values: ASINH(15.0); Formula Ptg: ; Ptgs:  Index in Ptgs: 1 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@2b91004a'}
                            ]);


var edges = new vis.DataSet([
                             /* {from: id_a, to: id_b}, */
{from: '69', to: '70'},
{from: '70', to: '68'}
                            ]);