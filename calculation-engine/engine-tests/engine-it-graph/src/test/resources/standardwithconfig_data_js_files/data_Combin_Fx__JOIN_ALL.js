var nodes = new vis.DataSet([
                             /* {id: a, label: b, ...}, */
{id: '2663', label: 'E6\n3.0', color: '#31b0d5', title: 'Name: E6<br>Alias: null<br>Value: 3.0<br>Type: CELL_WITH_FORMULA<br>Id: 2663<br>Formula Expression: Formula String: COMBIN(VALUE, VALUE); Formula Values: COMBIN(1.0, 3.0); Formula Ptg: ; Ptgs:  Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1ccdc7aa'},
{id: '2664', label: 'VALUE\n3.0', color: '#31b0d5', title: 'Name: VALUE<br>Alias: null<br>Value: 3.0<br>Type: CONSTANT_VALUE<br>Id: 2664<br>Formula Expression: Formula String: VALUE; Formula Values: 3.0; Formula Ptg: 3.0; Ptgs: VALUE Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1ccdc7aa'},
{id: '2665', label: 'VALUE\n1.0', color: '#31b0d5', title: 'Name: VALUE<br>Alias: null<br>Value: 1.0<br>Type: CONSTANT_VALUE<br>Id: 2665<br>Formula Expression: Formula String: VALUE; Formula Values: 1.0; Formula Ptg: 1.0; Ptgs: VALUE Index in Ptgs: 1 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1ccdc7aa'},
{id: '2666', label: 'COMBIN\n3.0', color: '#f0ad4e', title: 'Name: COMBIN<br>Alias: null<br>Value: 3.0<br>Type: FUNCTION<br>Id: 2666<br>Formula Expression: Formula String: COMBIN(VALUE, VALUE); Formula Values: COMBIN(1.0, 3.0); Formula Ptg: ; Ptgs:  Index in Ptgs: 2 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1ccdc7aa'}
                            ]);


var edges = new vis.DataSet([
                             /* {from: id_a, to: id_b}, */
{from: '2664', to: '2666'},
{from: '2665', to: '2666'},
{from: '2666', to: '2663'}
                            ]);