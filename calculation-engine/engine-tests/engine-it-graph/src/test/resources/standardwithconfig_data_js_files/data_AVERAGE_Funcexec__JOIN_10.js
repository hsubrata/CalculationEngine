var nodes = new vis.DataSet([
                             /* {id: a, label: b, ...}, */
{id: '1408', label: 'F9\n6.225', color: '#31b0d5', title: 'Name: F9<br>Alias: null<br>Value: 6.225<br>Type: CELL_WITH_FORMULA<br>Id: 1408<br>Formula Expression: Formula String: FUNCEXEC(D5, C5, B5, A5, VALUE); Formula Values: FUNCEXEC(9.0, 0.9, 8.0, 7.0, DEVDEF_4); Formula Ptg: ; Ptgs:  Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1410', label: 'VALUE\nDEVDEF_4', color: '#31b0d5', title: 'Name: VALUE<br>Alias: null<br>Value: DEVDEF_4<br>Type: CONSTANT_VALUE<br>Id: 1410<br>Formula Expression: Formula String: VALUE; Formula Values: DEVDEF_4; Formula Ptg: DEVDEF_4; Ptgs: VALUE Index in Ptgs: 1 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1411', label: 'A5\n7.0', color: '#31b0d5', title: 'Name: A5<br>Alias: null<br>Value: 7.0<br>Type: CELL_WITH_VALUE<br>Id: 1411<br>Formula Expression: Formula String: A5; Formula Values: 7.0; Formula Ptg: 7.0; Ptgs: A5 Index in Ptgs: 2 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1412', label: 'B5\n8.0', color: '#31b0d5', title: 'Name: B5<br>Alias: null<br>Value: 8.0<br>Type: CELL_WITH_VALUE<br>Id: 1412<br>Formula Expression: Formula String: B5; Formula Values: 8.0; Formula Ptg: 8.0; Ptgs: B5 Index in Ptgs: 3 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1413', label: 'C5\n0.9', color: '#31b0d5', title: 'Name: C5<br>Alias: null<br>Value: 0.9<br>Type: CELL_WITH_VALUE<br>Id: 1413<br>Formula Expression: Formula String: C5; Formula Values: 0.9; Formula Ptg: 0.9; Ptgs: C5 Index in Ptgs: 4 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1414', label: 'D5\n9.0', color: '#31b0d5', title: 'Name: D5<br>Alias: null<br>Value: 9.0<br>Type: CELL_WITH_VALUE<br>Id: 1414<br>Formula Expression: Formula String: D5; Formula Values: 9.0; Formula Ptg: 9.0; Ptgs: D5 Index in Ptgs: 5 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1415', label: 'FUNCEXEC\n6.225', color: '#f0ad4e', title: 'Name: FUNCEXEC<br>Alias: null<br>Value: 6.225<br>Type: FUNCTION<br>Id: 1415<br>Formula Expression: Formula String: FUNCEXEC(D5, C5, B5, A5, VALUE); Formula Values: FUNCEXEC(9.0, 0.9, 8.0, 7.0, DEVDEF_4); Formula Ptg: ; Ptgs:  Index in Ptgs: 6 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1416', label: 'A10\nDEFINE', color: '#31b0d5', title: 'Name: A10<br>Alias: null<br>Value: DEFINE<br>Type: CELL_WITH_FORMULA<br>Id: 1416<br>Formula Expression: Formula String: DEFINE(AVERAGE(A5:D5), VALUE, D5, C5, B5, A5, VALUE); Formula Values: DEFINE(AVERAGE([[7.0, 8.0, 0.9, 9.0]]), #, 9.0, 0.9, 8.0, 7.0, DEVDEF_4); Formula Ptg: ; Ptgs:  Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1418', label: 'VALUE\nDEVDEF_4', color: '#31b0d5', title: 'Name: VALUE<br>Alias: null<br>Value: DEVDEF_4<br>Type: CONSTANT_VALUE<br>Id: 1418<br>Formula Expression: Formula String: VALUE; Formula Values: DEVDEF_4; Formula Ptg: DEVDEF_4; Ptgs: VALUE Index in Ptgs: 1 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1419', label: 'A5\n7.0', color: '#31b0d5', title: 'Name: A5<br>Alias: null<br>Value: 7.0<br>Type: CELL_WITH_VALUE<br>Id: 1419<br>Formula Expression: Formula String: A5; Formula Values: 7.0; Formula Ptg: 7.0; Ptgs: A5 Index in Ptgs: 2 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1420', label: 'B5\n8.0', color: '#31b0d5', title: 'Name: B5<br>Alias: null<br>Value: 8.0<br>Type: CELL_WITH_VALUE<br>Id: 1420<br>Formula Expression: Formula String: B5; Formula Values: 8.0; Formula Ptg: 8.0; Ptgs: B5 Index in Ptgs: 3 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1421', label: 'C5\n0.9', color: '#31b0d5', title: 'Name: C5<br>Alias: null<br>Value: 0.9<br>Type: CELL_WITH_VALUE<br>Id: 1421<br>Formula Expression: Formula String: C5; Formula Values: 0.9; Formula Ptg: 0.9; Ptgs: C5 Index in Ptgs: 4 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1422', label: 'D5\n9.0', color: '#31b0d5', title: 'Name: D5<br>Alias: null<br>Value: 9.0<br>Type: CELL_WITH_VALUE<br>Id: 1422<br>Formula Expression: Formula String: D5; Formula Values: 9.0; Formula Ptg: 9.0; Ptgs: D5 Index in Ptgs: 5 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1423', label: 'VALUE\n#', color: '#31b0d5', title: 'Name: VALUE<br>Alias: null<br>Value: #<br>Type: CONSTANT_VALUE<br>Id: 1423<br>Formula Expression: Formula String: VALUE; Formula Values: #; Formula Ptg: #; Ptgs: VALUE Index in Ptgs: 6 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1424', label: 'E5\n6.225', color: '#31b0d5', title: 'Name: E5<br>Alias: null<br>Value: 6.225<br>Type: CELL_WITH_FORMULA<br>Id: 1424<br>Formula Expression: Formula String: AVERAGE(A5:D5); Formula Values: AVERAGE([[7.0, 8.0, 0.9, 9.0]]); Formula Ptg: ; Ptgs:  Index in Ptgs: 7 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1425', label: 'DEFINE\nDEFINE', color: '#f0ad4e', title: 'Name: DEFINE<br>Alias: null<br>Value: DEFINE<br>Type: FUNCTION<br>Id: 1425<br>Formula Expression: Formula String: DEFINE(AVERAGE(A5:D5), VALUE, D5, C5, B5, A5, VALUE); Formula Values: DEFINE(AVERAGE([[7.0, 8.0, 0.9, 9.0]]), #, 9.0, 0.9, 8.0, 7.0, DEVDEF_4); Formula Ptg: ; Ptgs:  Index in Ptgs: 8 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1342', label: 'E2\n5.25', color: '#31b0d5', title: 'Name: E2<br>Alias: null<br>Value: 5.25<br>Type: CELL_WITH_FORMULA<br>Id: 1342<br>Formula Expression: Formula String: AVERAGE(A2:D2); Formula Values: AVERAGE([[5.0, 3.0, 9.0, 4.0]]); Formula Ptg: ; Ptgs:  Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1343', label: 'A2:D2\n[[5.0, 3.0, 9.0, 4.0]]', color: '#31b0d5', title: 'Name: A2:D2<br>Alias: null<br>Value: [[5.0, 3.0, 9.0, 4.0]]<br>Type: RANGE<br>Id: 1343<br>Formula Expression: Formula String: A2:D2; Formula Values: [[5.0, 3.0, 9.0, 4.0]]; Formula Ptg: [[5.0, 3.0, 9.0, 4.0]]; Ptgs: A2:D2 Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1344', label: 'AVERAGE\n5.25', color: '#f0ad4e', title: 'Name: AVERAGE<br>Alias: null<br>Value: 5.25<br>Type: FUNCTION<br>Id: 1344<br>Formula Expression: Formula String: AVERAGE(A2:D2); Formula Values: AVERAGE([[5.0, 3.0, 9.0, 4.0]]); Formula Ptg: ; Ptgs:  Index in Ptgs: 1 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1345', label: 'E3\n5.5', color: '#31b0d5', title: 'Name: E3<br>Alias: null<br>Value: 5.5<br>Type: CELL_WITH_FORMULA<br>Id: 1345<br>Formula Expression: Formula String: AVERAGE(A3:D3); Formula Values: AVERAGE([[8.0, 4.0, 8.0, 2.0]]); Formula Ptg: ; Ptgs:  Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1346', label: 'A3:D3\n[[8.0, 4.0, 8.0, 2.0]]', color: '#31b0d5', title: 'Name: A3:D3<br>Alias: null<br>Value: [[8.0, 4.0, 8.0, 2.0]]<br>Type: RANGE<br>Id: 1346<br>Formula Expression: Formula String: A3:D3; Formula Values: [[8.0, 4.0, 8.0, 2.0]]; Formula Ptg: [[8.0, 4.0, 8.0, 2.0]]; Ptgs: A3:D3 Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1347', label: 'AVERAGE\n5.5', color: '#f0ad4e', title: 'Name: AVERAGE<br>Alias: null<br>Value: 5.5<br>Type: FUNCTION<br>Id: 1347<br>Formula Expression: Formula String: AVERAGE(A3:D3); Formula Values: AVERAGE([[8.0, 4.0, 8.0, 2.0]]); Formula Ptg: ; Ptgs:  Index in Ptgs: 1 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1348', label: 'E4\n3.5', color: '#31b0d5', title: 'Name: E4<br>Alias: null<br>Value: 3.5<br>Type: CELL_WITH_FORMULA<br>Id: 1348<br>Formula Expression: Formula String: AVERAGE(A4:D4); Formula Values: AVERAGE([[1.0, 8.0, 0.0, 5.0]]); Formula Ptg: ; Ptgs:  Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1349', label: 'A4:D4\n[[1.0, 8.0, 0.0, 5.0]]', color: '#31b0d5', title: 'Name: A4:D4<br>Alias: null<br>Value: [[1.0, 8.0, 0.0, 5.0]]<br>Type: RANGE<br>Id: 1349<br>Formula Expression: Formula String: A4:D4; Formula Values: [[1.0, 8.0, 0.0, 5.0]]; Formula Ptg: [[1.0, 8.0, 0.0, 5.0]]; Ptgs: A4:D4 Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1350', label: 'AVERAGE\n3.5', color: '#f0ad4e', title: 'Name: AVERAGE<br>Alias: null<br>Value: 3.5<br>Type: FUNCTION<br>Id: 1350<br>Formula Expression: Formula String: AVERAGE(A4:D4); Formula Values: AVERAGE([[1.0, 8.0, 0.0, 5.0]]); Formula Ptg: ; Ptgs:  Index in Ptgs: 1 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1351', label: 'E5\n6.225', color: '#31b0d5', title: 'Name: E5<br>Alias: null<br>Value: 6.225<br>Type: CELL_WITH_FORMULA<br>Id: 1351<br>Formula Expression: Formula String: AVERAGE(A5:D5); Formula Values: AVERAGE([[7.0, 8.0, 0.9, 9.0]]); Formula Ptg: ; Ptgs:  Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1352', label: 'A5:D5\n[[7.0, 8.0, 0.9, 9.0]]', color: '#31b0d5', title: 'Name: A5:D5<br>Alias: null<br>Value: [[7.0, 8.0, 0.9, 9.0]]<br>Type: RANGE<br>Id: 1352<br>Formula Expression: Formula String: A5:D5; Formula Values: [[7.0, 8.0, 0.9, 9.0]]; Formula Ptg: [[7.0, 8.0, 0.9, 9.0]]; Ptgs: A5:D5 Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1353', label: 'AVERAGE\n6.225', color: '#f0ad4e', title: 'Name: AVERAGE<br>Alias: null<br>Value: 6.225<br>Type: FUNCTION<br>Id: 1353<br>Formula Expression: Formula String: AVERAGE(A5:D5); Formula Values: AVERAGE([[7.0, 8.0, 0.9, 9.0]]); Formula Ptg: ; Ptgs:  Index in Ptgs: 1 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1354', label: 'F6\n5.25', color: '#31b0d5', title: 'Name: F6<br>Alias: null<br>Value: 5.25<br>Type: CELL_WITH_FORMULA<br>Id: 1354<br>Formula Expression: Formula String: FUNCEXEC(D2, C2, B2, A2, VALUE); Formula Values: FUNCEXEC(4.0, 9.0, 3.0, 5.0, DEVDEF_1); Formula Ptg: ; Ptgs:  Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1356', label: 'VALUE\nDEVDEF_1', color: '#31b0d5', title: 'Name: VALUE<br>Alias: null<br>Value: DEVDEF_1<br>Type: CONSTANT_VALUE<br>Id: 1356<br>Formula Expression: Formula String: VALUE; Formula Values: DEVDEF_1; Formula Ptg: DEVDEF_1; Ptgs: VALUE Index in Ptgs: 1 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1357', label: 'A2\n5.0', color: '#31b0d5', title: 'Name: A2<br>Alias: null<br>Value: 5.0<br>Type: CELL_WITH_VALUE<br>Id: 1357<br>Formula Expression: Formula String: A2; Formula Values: 5.0; Formula Ptg: 5.0; Ptgs: A2 Index in Ptgs: 2 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1358', label: 'B2\n3.0', color: '#31b0d5', title: 'Name: B2<br>Alias: null<br>Value: 3.0<br>Type: CELL_WITH_VALUE<br>Id: 1358<br>Formula Expression: Formula String: B2; Formula Values: 3.0; Formula Ptg: 3.0; Ptgs: B2 Index in Ptgs: 3 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1359', label: 'C2\n9.0', color: '#31b0d5', title: 'Name: C2<br>Alias: null<br>Value: 9.0<br>Type: CELL_WITH_VALUE<br>Id: 1359<br>Formula Expression: Formula String: C2; Formula Values: 9.0; Formula Ptg: 9.0; Ptgs: C2 Index in Ptgs: 4 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1360', label: 'D2\n4.0', color: '#31b0d5', title: 'Name: D2<br>Alias: null<br>Value: 4.0<br>Type: CELL_WITH_VALUE<br>Id: 1360<br>Formula Expression: Formula String: D2; Formula Values: 4.0; Formula Ptg: 4.0; Ptgs: D2 Index in Ptgs: 5 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1361', label: 'FUNCEXEC\n5.25', color: '#f0ad4e', title: 'Name: FUNCEXEC<br>Alias: null<br>Value: 5.25<br>Type: FUNCTION<br>Id: 1361<br>Formula Expression: Formula String: FUNCEXEC(D2, C2, B2, A2, VALUE); Formula Values: FUNCEXEC(4.0, 9.0, 3.0, 5.0, DEVDEF_1); Formula Ptg: ; Ptgs:  Index in Ptgs: 6 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1362', label: 'A7\nDEFINE', color: '#31b0d5', title: 'Name: A7<br>Alias: null<br>Value: DEFINE<br>Type: CELL_WITH_FORMULA<br>Id: 1362<br>Formula Expression: Formula String: DEFINE(AVERAGE(A2:D2), VALUE, D2, C2, B2, A2, VALUE); Formula Values: DEFINE(AVERAGE([[5.0, 3.0, 9.0, 4.0]]), #, 4.0, 9.0, 3.0, 5.0, DEVDEF_1); Formula Ptg: ; Ptgs:  Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1364', label: 'VALUE\nDEVDEF_1', color: '#31b0d5', title: 'Name: VALUE<br>Alias: null<br>Value: DEVDEF_1<br>Type: CONSTANT_VALUE<br>Id: 1364<br>Formula Expression: Formula String: VALUE; Formula Values: DEVDEF_1; Formula Ptg: DEVDEF_1; Ptgs: VALUE Index in Ptgs: 1 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1365', label: 'A2\n5.0', color: '#31b0d5', title: 'Name: A2<br>Alias: null<br>Value: 5.0<br>Type: CELL_WITH_VALUE<br>Id: 1365<br>Formula Expression: Formula String: A2; Formula Values: 5.0; Formula Ptg: 5.0; Ptgs: A2 Index in Ptgs: 2 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1366', label: 'B2\n3.0', color: '#31b0d5', title: 'Name: B2<br>Alias: null<br>Value: 3.0<br>Type: CELL_WITH_VALUE<br>Id: 1366<br>Formula Expression: Formula String: B2; Formula Values: 3.0; Formula Ptg: 3.0; Ptgs: B2 Index in Ptgs: 3 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1367', label: 'C2\n9.0', color: '#31b0d5', title: 'Name: C2<br>Alias: null<br>Value: 9.0<br>Type: CELL_WITH_VALUE<br>Id: 1367<br>Formula Expression: Formula String: C2; Formula Values: 9.0; Formula Ptg: 9.0; Ptgs: C2 Index in Ptgs: 4 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1368', label: 'D2\n4.0', color: '#31b0d5', title: 'Name: D2<br>Alias: null<br>Value: 4.0<br>Type: CELL_WITH_VALUE<br>Id: 1368<br>Formula Expression: Formula String: D2; Formula Values: 4.0; Formula Ptg: 4.0; Ptgs: D2 Index in Ptgs: 5 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1369', label: 'VALUE\n#', color: '#31b0d5', title: 'Name: VALUE<br>Alias: null<br>Value: #<br>Type: CONSTANT_VALUE<br>Id: 1369<br>Formula Expression: Formula String: VALUE; Formula Values: #; Formula Ptg: #; Ptgs: VALUE Index in Ptgs: 6 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1370', label: 'E2\n5.25', color: '#31b0d5', title: 'Name: E2<br>Alias: null<br>Value: 5.25<br>Type: CELL_WITH_FORMULA<br>Id: 1370<br>Formula Expression: Formula String: AVERAGE(A2:D2); Formula Values: AVERAGE([[5.0, 3.0, 9.0, 4.0]]); Formula Ptg: ; Ptgs:  Index in Ptgs: 7 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1371', label: 'DEFINE\nDEFINE', color: '#f0ad4e', title: 'Name: DEFINE<br>Alias: null<br>Value: DEFINE<br>Type: FUNCTION<br>Id: 1371<br>Formula Expression: Formula String: DEFINE(AVERAGE(A2:D2), VALUE, D2, C2, B2, A2, VALUE); Formula Values: DEFINE(AVERAGE([[5.0, 3.0, 9.0, 4.0]]), #, 4.0, 9.0, 3.0, 5.0, DEVDEF_1); Formula Ptg: ; Ptgs:  Index in Ptgs: 8 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1372', label: 'F7\n5.5', color: '#31b0d5', title: 'Name: F7<br>Alias: null<br>Value: 5.5<br>Type: CELL_WITH_FORMULA<br>Id: 1372<br>Formula Expression: Formula String: FUNCEXEC(D3, C3, B3, A3, VALUE); Formula Values: FUNCEXEC(2.0, 8.0, 4.0, 8.0, DEVDEF_2); Formula Ptg: ; Ptgs:  Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1374', label: 'VALUE\nDEVDEF_2', color: '#31b0d5', title: 'Name: VALUE<br>Alias: null<br>Value: DEVDEF_2<br>Type: CONSTANT_VALUE<br>Id: 1374<br>Formula Expression: Formula String: VALUE; Formula Values: DEVDEF_2; Formula Ptg: DEVDEF_2; Ptgs: VALUE Index in Ptgs: 1 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1375', label: 'A3\n8.0', color: '#31b0d5', title: 'Name: A3<br>Alias: null<br>Value: 8.0<br>Type: CELL_WITH_VALUE<br>Id: 1375<br>Formula Expression: Formula String: A3; Formula Values: 8.0; Formula Ptg: 8.0; Ptgs: A3 Index in Ptgs: 2 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1376', label: 'B3\n4.0', color: '#31b0d5', title: 'Name: B3<br>Alias: null<br>Value: 4.0<br>Type: CELL_WITH_VALUE<br>Id: 1376<br>Formula Expression: Formula String: B3; Formula Values: 4.0; Formula Ptg: 4.0; Ptgs: B3 Index in Ptgs: 3 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1377', label: 'C3\n8.0', color: '#31b0d5', title: 'Name: C3<br>Alias: null<br>Value: 8.0<br>Type: CELL_WITH_VALUE<br>Id: 1377<br>Formula Expression: Formula String: C3; Formula Values: 8.0; Formula Ptg: 8.0; Ptgs: C3 Index in Ptgs: 4 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1378', label: 'D3\n2.0', color: '#31b0d5', title: 'Name: D3<br>Alias: null<br>Value: 2.0<br>Type: CELL_WITH_VALUE<br>Id: 1378<br>Formula Expression: Formula String: D3; Formula Values: 2.0; Formula Ptg: 2.0; Ptgs: D3 Index in Ptgs: 5 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1379', label: 'FUNCEXEC\n5.5', color: '#f0ad4e', title: 'Name: FUNCEXEC<br>Alias: null<br>Value: 5.5<br>Type: FUNCTION<br>Id: 1379<br>Formula Expression: Formula String: FUNCEXEC(D3, C3, B3, A3, VALUE); Formula Values: FUNCEXEC(2.0, 8.0, 4.0, 8.0, DEVDEF_2); Formula Ptg: ; Ptgs:  Index in Ptgs: 6 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1380', label: 'A8\nDEFINE', color: '#31b0d5', title: 'Name: A8<br>Alias: null<br>Value: DEFINE<br>Type: CELL_WITH_FORMULA<br>Id: 1380<br>Formula Expression: Formula String: DEFINE(AVERAGE(A3:D3), VALUE, D3, C3, B3, A3, VALUE); Formula Values: DEFINE(AVERAGE([[8.0, 4.0, 8.0, 2.0]]), #, 2.0, 8.0, 4.0, 8.0, DEVDEF_2); Formula Ptg: ; Ptgs:  Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1382', label: 'VALUE\nDEVDEF_2', color: '#31b0d5', title: 'Name: VALUE<br>Alias: null<br>Value: DEVDEF_2<br>Type: CONSTANT_VALUE<br>Id: 1382<br>Formula Expression: Formula String: VALUE; Formula Values: DEVDEF_2; Formula Ptg: DEVDEF_2; Ptgs: VALUE Index in Ptgs: 1 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1383', label: 'A3\n8.0', color: '#31b0d5', title: 'Name: A3<br>Alias: null<br>Value: 8.0<br>Type: CELL_WITH_VALUE<br>Id: 1383<br>Formula Expression: Formula String: A3; Formula Values: 8.0; Formula Ptg: 8.0; Ptgs: A3 Index in Ptgs: 2 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1384', label: 'B3\n4.0', color: '#31b0d5', title: 'Name: B3<br>Alias: null<br>Value: 4.0<br>Type: CELL_WITH_VALUE<br>Id: 1384<br>Formula Expression: Formula String: B3; Formula Values: 4.0; Formula Ptg: 4.0; Ptgs: B3 Index in Ptgs: 3 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1385', label: 'C3\n8.0', color: '#31b0d5', title: 'Name: C3<br>Alias: null<br>Value: 8.0<br>Type: CELL_WITH_VALUE<br>Id: 1385<br>Formula Expression: Formula String: C3; Formula Values: 8.0; Formula Ptg: 8.0; Ptgs: C3 Index in Ptgs: 4 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1386', label: 'D3\n2.0', color: '#31b0d5', title: 'Name: D3<br>Alias: null<br>Value: 2.0<br>Type: CELL_WITH_VALUE<br>Id: 1386<br>Formula Expression: Formula String: D3; Formula Values: 2.0; Formula Ptg: 2.0; Ptgs: D3 Index in Ptgs: 5 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1387', label: 'VALUE\n#', color: '#31b0d5', title: 'Name: VALUE<br>Alias: null<br>Value: #<br>Type: CONSTANT_VALUE<br>Id: 1387<br>Formula Expression: Formula String: VALUE; Formula Values: #; Formula Ptg: #; Ptgs: VALUE Index in Ptgs: 6 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1388', label: 'E3\n5.5', color: '#31b0d5', title: 'Name: E3<br>Alias: null<br>Value: 5.5<br>Type: CELL_WITH_FORMULA<br>Id: 1388<br>Formula Expression: Formula String: AVERAGE(A3:D3); Formula Values: AVERAGE([[8.0, 4.0, 8.0, 2.0]]); Formula Ptg: ; Ptgs:  Index in Ptgs: 7 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1389', label: 'DEFINE\nDEFINE', color: '#f0ad4e', title: 'Name: DEFINE<br>Alias: null<br>Value: DEFINE<br>Type: FUNCTION<br>Id: 1389<br>Formula Expression: Formula String: DEFINE(AVERAGE(A3:D3), VALUE, D3, C3, B3, A3, VALUE); Formula Values: DEFINE(AVERAGE([[8.0, 4.0, 8.0, 2.0]]), #, 2.0, 8.0, 4.0, 8.0, DEVDEF_2); Formula Ptg: ; Ptgs:  Index in Ptgs: 8 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1390', label: 'F8\n3.5', color: '#31b0d5', title: 'Name: F8<br>Alias: null<br>Value: 3.5<br>Type: CELL_WITH_FORMULA<br>Id: 1390<br>Formula Expression: Formula String: FUNCEXEC(D4, C4, B4, A4, VALUE); Formula Values: FUNCEXEC(5.0, 0.0, 8.0, 1.0, DEVDEF_3); Formula Ptg: ; Ptgs:  Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1392', label: 'VALUE\nDEVDEF_3', color: '#31b0d5', title: 'Name: VALUE<br>Alias: null<br>Value: DEVDEF_3<br>Type: CONSTANT_VALUE<br>Id: 1392<br>Formula Expression: Formula String: VALUE; Formula Values: DEVDEF_3; Formula Ptg: DEVDEF_3; Ptgs: VALUE Index in Ptgs: 1 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1393', label: 'A4\n1.0', color: '#31b0d5', title: 'Name: A4<br>Alias: null<br>Value: 1.0<br>Type: CELL_WITH_VALUE<br>Id: 1393<br>Formula Expression: Formula String: A4; Formula Values: 1.0; Formula Ptg: 1.0; Ptgs: A4 Index in Ptgs: 2 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1394', label: 'B4\n8.0', color: '#31b0d5', title: 'Name: B4<br>Alias: null<br>Value: 8.0<br>Type: CELL_WITH_VALUE<br>Id: 1394<br>Formula Expression: Formula String: B4; Formula Values: 8.0; Formula Ptg: 8.0; Ptgs: B4 Index in Ptgs: 3 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1395', label: 'C4\n0.0', color: '#31b0d5', title: 'Name: C4<br>Alias: null<br>Value: 0.0<br>Type: CELL_WITH_VALUE<br>Id: 1395<br>Formula Expression: Formula String: C4; Formula Values: 0.0; Formula Ptg: 0.0; Ptgs: C4 Index in Ptgs: 4 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1396', label: 'D4\n5.0', color: '#31b0d5', title: 'Name: D4<br>Alias: null<br>Value: 5.0<br>Type: CELL_WITH_VALUE<br>Id: 1396<br>Formula Expression: Formula String: D4; Formula Values: 5.0; Formula Ptg: 5.0; Ptgs: D4 Index in Ptgs: 5 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1397', label: 'FUNCEXEC\n3.5', color: '#f0ad4e', title: 'Name: FUNCEXEC<br>Alias: null<br>Value: 3.5<br>Type: FUNCTION<br>Id: 1397<br>Formula Expression: Formula String: FUNCEXEC(D4, C4, B4, A4, VALUE); Formula Values: FUNCEXEC(5.0, 0.0, 8.0, 1.0, DEVDEF_3); Formula Ptg: ; Ptgs:  Index in Ptgs: 6 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1398', label: 'A9\nDEFINE', color: '#31b0d5', title: 'Name: A9<br>Alias: null<br>Value: DEFINE<br>Type: CELL_WITH_FORMULA<br>Id: 1398<br>Formula Expression: Formula String: DEFINE(AVERAGE(A4:D4), VALUE, D4, C4, B4, A4, VALUE); Formula Values: DEFINE(AVERAGE([[1.0, 8.0, 0.0, 5.0]]), #, 5.0, 0.0, 8.0, 1.0, DEVDEF_3); Formula Ptg: ; Ptgs:  Index in Ptgs: 0 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1400', label: 'VALUE\nDEVDEF_3', color: '#31b0d5', title: 'Name: VALUE<br>Alias: null<br>Value: DEVDEF_3<br>Type: CONSTANT_VALUE<br>Id: 1400<br>Formula Expression: Formula String: VALUE; Formula Values: DEVDEF_3; Formula Ptg: DEVDEF_3; Ptgs: VALUE Index in Ptgs: 1 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1401', label: 'A4\n1.0', color: '#31b0d5', title: 'Name: A4<br>Alias: null<br>Value: 1.0<br>Type: CELL_WITH_VALUE<br>Id: 1401<br>Formula Expression: Formula String: A4; Formula Values: 1.0; Formula Ptg: 1.0; Ptgs: A4 Index in Ptgs: 2 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1402', label: 'B4\n8.0', color: '#31b0d5', title: 'Name: B4<br>Alias: null<br>Value: 8.0<br>Type: CELL_WITH_VALUE<br>Id: 1402<br>Formula Expression: Formula String: B4; Formula Values: 8.0; Formula Ptg: 8.0; Ptgs: B4 Index in Ptgs: 3 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1403', label: 'C4\n0.0', color: '#31b0d5', title: 'Name: C4<br>Alias: null<br>Value: 0.0<br>Type: CELL_WITH_VALUE<br>Id: 1403<br>Formula Expression: Formula String: C4; Formula Values: 0.0; Formula Ptg: 0.0; Ptgs: C4 Index in Ptgs: 4 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1404', label: 'D4\n5.0', color: '#31b0d5', title: 'Name: D4<br>Alias: null<br>Value: 5.0<br>Type: CELL_WITH_VALUE<br>Id: 1404<br>Formula Expression: Formula String: D4; Formula Values: 5.0; Formula Ptg: 5.0; Ptgs: D4 Index in Ptgs: 5 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1405', label: 'VALUE\n#', color: '#31b0d5', title: 'Name: VALUE<br>Alias: null<br>Value: #<br>Type: CONSTANT_VALUE<br>Id: 1405<br>Formula Expression: Formula String: VALUE; Formula Values: #; Formula Ptg: #; Ptgs: VALUE Index in Ptgs: 6 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1406', label: 'E4\n3.5', color: '#31b0d5', title: 'Name: E4<br>Alias: null<br>Value: 3.5<br>Type: CELL_WITH_FORMULA<br>Id: 1406<br>Formula Expression: Formula String: AVERAGE(A4:D4); Formula Values: AVERAGE([[1.0, 8.0, 0.0, 5.0]]); Formula Ptg: ; Ptgs:  Index in Ptgs: 7 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'},
{id: '1407', label: 'DEFINE\nDEFINE', color: '#f0ad4e', title: 'Name: DEFINE<br>Alias: null<br>Value: DEFINE<br>Type: FUNCTION<br>Id: 1407<br>Formula Expression: Formula String: DEFINE(AVERAGE(A4:D4), VALUE, D4, C4, B4, A4, VALUE); Formula Values: DEFINE(AVERAGE([[1.0, 8.0, 0.0, 5.0]]), #, 5.0, 0.0, 8.0, 1.0, DEVDEF_3); Formula Ptg: ; Ptgs:  Index in Ptgs: 8 <br>Source Object Id: com.dataart.spreadsheetanalytics.engine.PoiProxyWorkbook@1e0895f5'}
                            ]);


var edges = new vis.DataSet([
                             /* {from: id_a, to: id_b}, */
{from: '1346', to: '1347'},
{from: '1370', to: '1371'},
{from: '1378', to: '1379'},
{from: '1386', to: '1389'},
{from: '1394', to: '1397'},
{from: '1412', to: '1352'},
{from: '1402', to: '1407'},
{from: '1410', to: '1415'},
{from: '1418', to: '1425'},
{from: '1404', to: '1349'},
{from: '1396', to: '1349'},
{from: '1371', to: '1362'},
{from: '1379', to: '1372'},
{from: '1421', to: '1352'},
{from: '1347', to: '1345'},
{from: '1387', to: '1389'},
{from: '1395', to: '1397'},
{from: '1413', to: '1352'},
{from: '1403', to: '1407'},
{from: '1411', to: '1415'},
{from: '1419', to: '1425'},
{from: '1353', to: '1424'},
{from: '1422', to: '1352'},
{from: '1388', to: '1389'},
{from: '1396', to: '1397'},
{from: '1414', to: '1352'},
{from: '1404', to: '1407'},
{from: '1412', to: '1415'},
{from: '1356', to: '1361'},
{from: '1420', to: '1425'},
{from: '1364', to: '1371'},
{from: '1347', to: '1388'},
{from: '1365', to: '1343'},
{from: '1357', to: '1343'},
{from: '1389', to: '1380'},
{from: '1397', to: '1390'},
{from: '1349', to: '1350'},
{from: '1405', to: '1407'},
{from: '1413', to: '1415'},
{from: '1357', to: '1361'},
{from: '1421', to: '1425'},
{from: '1365', to: '1371'},
{from: '1366', to: '1343'},
{from: '1358', to: '1343'},
{from: '1383', to: '1346'},
{from: '1350', to: '1348'},
{from: '1406', to: '1407'},
{from: '1414', to: '1415'},
{from: '1358', to: '1361'},
{from: '1422', to: '1425'},
{from: '1375', to: '1346'},
{from: '1366', to: '1371'},
{from: '1374', to: '1379'},
{from: '1382', to: '1389'},
{from: '1367', to: '1343'},
{from: '1359', to: '1343'},
{from: '1407', to: '1398'},
{from: '1415', to: '1408'},
{from: '1384', to: '1346'},
{from: '1343', to: '1344'},
{from: '1359', to: '1361'},
{from: '1423', to: '1425'},
{from: '1376', to: '1346'},
{from: '1367', to: '1371'},
{from: '1375', to: '1379'},
{from: '1383', to: '1389'},
{from: '1368', to: '1343'},
{from: '1401', to: '1349'},
{from: '1360', to: '1343'},
{from: '1393', to: '1349'},
{from: '1350', to: '1406'},
{from: '1385', to: '1346'},
{from: '1344', to: '1342'},
{from: '1352', to: '1353'},
{from: '1360', to: '1361'},
{from: '1424', to: '1425'},
{from: '1377', to: '1346'},
{from: '1368', to: '1371'},
{from: '1376', to: '1379'},
{from: '1384', to: '1389'},
{from: '1392', to: '1397'},
{from: '1400', to: '1407'},
{from: '1402', to: '1349'},
{from: '1394', to: '1349'},
{from: '1425', to: '1416'},
{from: '1386', to: '1346'},
{from: '1361', to: '1354'},
{from: '1344', to: '1370'},
{from: '1419', to: '1352'},
{from: '1353', to: '1351'},
{from: '1378', to: '1346'},
{from: '1369', to: '1371'},
{from: '1377', to: '1379'},
{from: '1385', to: '1389'},
{from: '1393', to: '1397'},
{from: '1411', to: '1352'},
{from: '1401', to: '1407'},
{from: '1403', to: '1349'},
{from: '1395', to: '1349'},
{from: '1420', to: '1352'}
                            ]);