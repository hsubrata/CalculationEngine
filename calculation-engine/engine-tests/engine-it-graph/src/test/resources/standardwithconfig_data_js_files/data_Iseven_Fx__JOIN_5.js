var nodes = new vis.DataSet([
                             /* {id: a, label: b, ...}, */
{id: '5ed60f8d-bc2c-478d-bb23-09804112e757', label: 'D7\nFALSE', color: '#31b0d5', title: 'Name: D7<br>Value: FALSE<br>Type: CELL_WITH_FORMULA<br>Id: 5ed60f8d-bc2c-478d-bb23-09804112e757<br>Formula Expression: Formula String: ISEVEN(A1); Formula Values: ISEVEN(1.0); Formula Ptg: 1.0 ISEVEN ; Ptgs: A1 ISEVEN  Index in Ptgs: 2 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@19507769'},
{id: '7f2e114c-d306-4191-9382-1e391ddb5da5', label: 'ISEVEN\nTRUE', color: '#f0ad4e', title: 'Name: ISEVEN<br>Value: TRUE<br>Type: FUNCTION<br>Id: 7f2e114c-d306-4191-9382-1e391ddb5da5<br>Formula Expression: Formula String: ISEVEN(A2); Formula Values: ISEVEN(2.0); Formula Ptg: ; Ptgs:  Index in Ptgs: 2 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@19507769'},
{id: 'da8d74da-5509-4db7-a1d9-c6e9019caee2', label: 'C3\n5.45', color: '#31b0d5', title: 'Name: C3<br>Value: 5.45<br>Type: CELL_WITH_VALUE<br>Id: da8d74da-5509-4db7-a1d9-c6e9019caee2<br>Formula Expression: Formula String: C3; Formula Values: 5.45; Formula Ptg: 5.45; Ptgs: C3 Index in Ptgs: 1 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@19507769'},
{id: 'e97a5b20-dc87-4eac-8235-93f38a06db08', label: 'ISEVEN\nFALSE', color: '#f0ad4e', title: 'Name: ISEVEN<br>Value: FALSE<br>Type: FUNCTION<br>Id: e97a5b20-dc87-4eac-8235-93f38a06db08<br>Formula Expression: Formula String: ISEVEN(A1); Formula Values: ISEVEN(1.0); Formula Ptg: ; Ptgs:  Index in Ptgs: 2 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@19507769'},
{id: 'f7795f44-5450-4877-8ff4-85565d5a1b9a', label: 'A2\n2.0', color: '#31b0d5', title: 'Name: A2<br>Value: 2.0<br>Type: CELL_WITH_VALUE<br>Id: f7795f44-5450-4877-8ff4-85565d5a1b9a<br>Formula Expression: Formula String: A2; Formula Values: 2.0; Formula Ptg: 2.0; Ptgs: A2 Index in Ptgs: 1 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@19507769'},
{id: 'c63ad7d7-a0f4-4015-894f-71b6aacd8e04', label: 'ISEVEN\n#VALUE!', color: '#f0ad4e', title: 'Name: ISEVEN<br>Value: #VALUE!<br>Type: FUNCTION<br>Id: c63ad7d7-a0f4-4015-894f-71b6aacd8e04<br>Formula Expression: Formula String: ISEVEN(D1); Formula Values: ISEVEN(qwerty); Formula Ptg: ; Ptgs:  Index in Ptgs: 2 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@19507769'},
{id: '870dad32-5fde-43f9-9d0e-0641e0a23696', label: 'D8\nTRUE', color: '#31b0d5', title: 'Name: D8<br>Value: TRUE<br>Type: CELL_WITH_FORMULA<br>Id: 870dad32-5fde-43f9-9d0e-0641e0a23696<br>Formula Expression: Formula String: ISEVEN(A2); Formula Values: ISEVEN(2.0); Formula Ptg: 2.0 ISEVEN ; Ptgs: A2 ISEVEN  Index in Ptgs: 2 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@19507769'},
{id: 'def97e5a-167b-48f0-8304-abdee3a546d4', label: 'ISEVEN\nFALSE', color: '#f0ad4e', title: 'Name: ISEVEN<br>Value: FALSE<br>Type: FUNCTION<br>Id: def97e5a-167b-48f0-8304-abdee3a546d4<br>Formula Expression: Formula String: ISEVEN(C3); Formula Values: ISEVEN(5.45); Formula Ptg: ; Ptgs:  Index in Ptgs: 2 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@19507769'},
{id: 'e108e3e7-1c38-4725-9c43-2d32dfe6a9d2', label: 'D10\nFALSE', color: '#31b0d5', title: 'Name: D10<br>Value: FALSE<br>Type: CELL_WITH_FORMULA<br>Id: e108e3e7-1c38-4725-9c43-2d32dfe6a9d2<br>Formula Expression: Formula String: ISEVEN(C3); Formula Values: ISEVEN(5.45); Formula Ptg: 5.45 ISEVEN ; Ptgs: C3 ISEVEN  Index in Ptgs: 2 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@19507769'},
{id: '287f7803-7019-499b-9447-5eaf28b4f404', label: 'D11\n#VALUE!', color: '#31b0d5', title: 'Name: D11<br>Value: #VALUE!<br>Type: CELL_WITH_FORMULA<br>Id: 287f7803-7019-499b-9447-5eaf28b4f404<br>Formula Expression: Formula String: ISEVEN(D1); Formula Values: ISEVEN(qwerty); Formula Ptg: qwerty ISEVEN ; Ptgs: D1 ISEVEN  Index in Ptgs: 2 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@19507769'},
{id: '06b72b13-b6c4-489c-98cb-4629728763cd', label: 'A1\n1.0', color: '#31b0d5', title: 'Name: A1<br>Value: 1.0<br>Type: CELL_WITH_VALUE<br>Id: 06b72b13-b6c4-489c-98cb-4629728763cd<br>Formula Expression: Formula String: A1; Formula Values: 1.0; Formula Ptg: 1.0; Ptgs: A1 Index in Ptgs: 1 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@19507769'},
{id: '0918331c-2a03-4586-b6cc-4ba4cacca230', label: 'D1\nqwerty', color: '#31b0d5', title: 'Name: D1<br>Value: qwerty<br>Type: CELL_WITH_VALUE<br>Id: 0918331c-2a03-4586-b6cc-4ba4cacca230<br>Formula Expression: Formula String: D1; Formula Values: qwerty; Formula Ptg: qwerty; Ptgs: D1 Index in Ptgs: 1 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@19507769'},
{id: 'fb763e55-19ce-4455-99e2-43297968a5f9', label: 'D12\nTRUE', color: '#31b0d5', title: 'Name: D12<br>Value: TRUE<br>Type: CELL_WITH_FORMULA<br>Id: fb763e55-19ce-4455-99e2-43297968a5f9<br>Formula Expression: Formula String: ISEVEN(hjk); Formula Values: ISEVEN(); Formula Ptg:  ISEVEN ; Ptgs: hjk ISEVEN  Index in Ptgs: 2 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@19507769'},
{id: 'f086b9b5-a802-45e7-b1a5-207f1d79f9dc', label: 'hjk\n', color: '#31b0d5', title: 'Name: hjk<br>Value: <br>Type: EMPTY_CELL<br>Id: f086b9b5-a802-45e7-b1a5-207f1d79f9dc<br>Formula Expression: Formula String: hjk; Formula Values: ; Formula Ptg: ; Ptgs: hjk Index in Ptgs: 1 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@19507769'},
{id: '24702ba9-b6fd-4de5-b4cd-fb2e6a63f45a', label: 'D9\nFALSE', color: '#31b0d5', title: 'Name: D9<br>Value: FALSE<br>Type: CELL_WITH_FORMULA<br>Id: 24702ba9-b6fd-4de5-b4cd-fb2e6a63f45a<br>Formula Expression: Formula String: ISEVEN(A1); Formula Values: ISEVEN(1.0); Formula Ptg: 1.0 ISEVEN ; Ptgs: A1 ISEVEN  Index in Ptgs: 2 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@19507769'},
{id: 'b153fb6d-d93d-47e3-b501-631a5b5c0c72', label: 'D7\nFALSE', color: '#31b0d5', title: 'Name: D7<br>Value: FALSE<br>Type: CELL_WITH_FORMULA<br>Id: b153fb6d-d93d-47e3-b501-631a5b5c0c72<br>Formula Expression: Formula String: ISEVEN(A1); Formula Values: ISEVEN(1.0); Formula Ptg: 1.0 ISEVEN ; Ptgs: A1 ISEVEN  Index in Ptgs: 2 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@19507769'},
{id: '7f5df31e-6393-419a-8578-2cf08197fd18', label: 'ISEVEN\nTRUE', color: '#f0ad4e', title: 'Name: ISEVEN<br>Value: TRUE<br>Type: FUNCTION<br>Id: 7f5df31e-6393-419a-8578-2cf08197fd18<br>Formula Expression: Formula String: ISEVEN(hjk); Formula Values: ISEVEN(); Formula Ptg: ; Ptgs:  Index in Ptgs: 2 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@19507769'}
                            ]);


var edges = new vis.DataSet([
                             /* {from: id_a, to: id_b}, */
{from: '06b72b13-b6c4-489c-98cb-4629728763cd', to: 'e97a5b20-dc87-4eac-8235-93f38a06db08'},
{from: 'e97a5b20-dc87-4eac-8235-93f38a06db08', to: 'b153fb6d-d93d-47e3-b501-631a5b5c0c72'},
{from: '0918331c-2a03-4586-b6cc-4ba4cacca230', to: 'c63ad7d7-a0f4-4015-894f-71b6aacd8e04'},
{from: '7f2e114c-d306-4191-9382-1e391ddb5da5', to: '870dad32-5fde-43f9-9d0e-0641e0a23696'},
{from: 'c63ad7d7-a0f4-4015-894f-71b6aacd8e04', to: '287f7803-7019-499b-9447-5eaf28b4f404'},
{from: 'da8d74da-5509-4db7-a1d9-c6e9019caee2', to: 'def97e5a-167b-48f0-8304-abdee3a546d4'},
{from: 'f086b9b5-a802-45e7-b1a5-207f1d79f9dc', to: '7f5df31e-6393-419a-8578-2cf08197fd18'},
{from: 'def97e5a-167b-48f0-8304-abdee3a546d4', to: 'e108e3e7-1c38-4725-9c43-2d32dfe6a9d2'},
{from: 'e97a5b20-dc87-4eac-8235-93f38a06db08', to: '5ed60f8d-bc2c-478d-bb23-09804112e757'},
{from: '7f5df31e-6393-419a-8578-2cf08197fd18', to: 'fb763e55-19ce-4455-99e2-43297968a5f9'},
{from: '5ed60f8d-bc2c-478d-bb23-09804112e757', to: '24702ba9-b6fd-4de5-b4cd-fb2e6a63f45a'},
{from: 'f7795f44-5450-4877-8ff4-85565d5a1b9a', to: '7f2e114c-d306-4191-9382-1e391ddb5da5'}
                            ]);