var nodes = new vis.DataSet([
                             /* {id: a, label: b, ...}, */
{id: 'a69ba467-4c73-4bed-8f4b-282ba8e0317f', label: 'ISNONTEXT\nTRUE', color: '#f0ad4e', title: 'Name: ISNONTEXT<br>Value: TRUE<br>Type: FUNCTION<br>Id: a69ba467-4c73-4bed-8f4b-282ba8e0317f<br>Formula Expression: Formula String: ISNONTEXT(A1); Formula Values: ISNONTEXT(1.0); Formula Ptg: ; Ptgs:  Index in Ptgs: 1 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@4806fbf7'},
{id: 'd3e3db0d-f007-4aa4-bf67-01f5fa03b9d6', label: 'C5\nTRUE', color: '#31b0d5', title: 'Name: C5<br>Value: TRUE<br>Type: CELL_WITH_FORMULA<br>Id: d3e3db0d-f007-4aa4-bf67-01f5fa03b9d6<br>Formula Expression: Formula String: ISNONTEXT(A1); Formula Values: ISNONTEXT(1.0); Formula Ptg: 1.0 ISNONTEXT ; Ptgs: A1 ISNONTEXT  Index in Ptgs: 1 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@4806fbf7'},
{id: '0e159c2a-c43a-4ae6-ad84-6a4f1e438166', label: 'ISNONTEXT\nTRUE', color: '#f0ad4e', title: 'Name: ISNONTEXT<br>Value: TRUE<br>Type: FUNCTION<br>Id: 0e159c2a-c43a-4ae6-ad84-6a4f1e438166<br>Formula Expression: Formula String: ISNONTEXT(ISNONTEXT(A1)); Formula Values: ISNONTEXT(ISNONTEXT(1.0)); Formula Ptg: ; Ptgs:  Index in Ptgs: 1 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@4806fbf7'},
{id: '44475bff-0da6-4638-bad9-9ec798abdaac', label: 'VALUE\n67.0', color: '#31b0d5', title: 'Name: VALUE<br>Value: 67.0<br>Type: CONSTANT_VALUE<br>Id: 44475bff-0da6-4638-bad9-9ec798abdaac<br>Formula Expression: Formula String: VALUE; Formula Values: 67.0; Formula Ptg: 67.0; Ptgs: VALUE Index in Ptgs: 0 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@4806fbf7'},
{id: '34b4d925-5250-47af-af0b-20829a963346', label: 'B1\nsome', color: '#31b0d5', title: 'Name: B1<br>Value: some<br>Type: CELL_WITH_VALUE<br>Id: 34b4d925-5250-47af-af0b-20829a963346<br>Formula Expression: Formula String: B1; Formula Values: some; Formula Ptg: some; Ptgs: B1 Index in Ptgs: 0 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@4806fbf7'},
{id: 'd4d57b3c-0db6-4936-b36e-e4c7b79a60d5', label: 'C8\nTRUE', color: '#31b0d5', title: 'Name: C8<br>Value: TRUE<br>Type: CELL_WITH_FORMULA<br>Id: d4d57b3c-0db6-4936-b36e-e4c7b79a60d5<br>Formula Expression: Formula String: ISNONTEXT(VALUE); Formula Values: ISNONTEXT(67.0); Formula Ptg: 67.0 ISNONTEXT ; Ptgs: VALUE ISNONTEXT  Index in Ptgs: 1 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@4806fbf7'},
{id: '6bfe1681-a5d4-4d71-b84e-c599fd44b5d6', label: 'C6\nFALSE', color: '#31b0d5', title: 'Name: C6<br>Value: FALSE<br>Type: CELL_WITH_FORMULA<br>Id: 6bfe1681-a5d4-4d71-b84e-c599fd44b5d6<br>Formula Expression: Formula String: ISNONTEXT(B1); Formula Values: ISNONTEXT(some); Formula Ptg: some ISNONTEXT ; Ptgs: B1 ISNONTEXT  Index in Ptgs: 1 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@4806fbf7'},
{id: 'e9edac6a-34cc-46e6-8254-4844bafac76a', label: 'ISNONTEXT\nFALSE', color: '#f0ad4e', title: 'Name: ISNONTEXT<br>Value: FALSE<br>Type: FUNCTION<br>Id: e9edac6a-34cc-46e6-8254-4844bafac76a<br>Formula Expression: Formula String: ISNONTEXT(B1); Formula Values: ISNONTEXT(some); Formula Ptg: ; Ptgs:  Index in Ptgs: 1 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@4806fbf7'},
{id: '808701a0-7893-4d86-8399-7f653c73de54', label: 'A1\n1.0', color: '#31b0d5', title: 'Name: A1<br>Value: 1.0<br>Type: CELL_WITH_VALUE<br>Id: 808701a0-7893-4d86-8399-7f653c73de54<br>Formula Expression: Formula String: A1; Formula Values: 1.0; Formula Ptg: 1.0; Ptgs: A1 Index in Ptgs: 0 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@4806fbf7'},
{id: 'ef5e8978-716c-4ba2-9361-69fd3f87fd3b', label: 'C7\nTRUE', color: '#31b0d5', title: 'Name: C7<br>Value: TRUE<br>Type: CELL_WITH_FORMULA<br>Id: ef5e8978-716c-4ba2-9361-69fd3f87fd3b<br>Formula Expression: Formula String: ISNONTEXT(ISNONTEXT(A1)); Formula Values: ISNONTEXT(ISNONTEXT(1.0)); Formula Ptg: 1.0 ISNONTEXT  ISNONTEXT ; Ptgs: A1 ISNONTEXT  ISNONTEXT  Index in Ptgs: 1 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@4806fbf7'},
{id: '912510ae-5cd2-4283-bab0-e7972c955669', label: 'C5\nTRUE', color: '#31b0d5', title: 'Name: C5<br>Value: TRUE<br>Type: CELL_WITH_FORMULA<br>Id: 912510ae-5cd2-4283-bab0-e7972c955669<br>Formula Expression: Formula String: ISNONTEXT(A1); Formula Values: ISNONTEXT(1.0); Formula Ptg: 1.0 ISNONTEXT ; Ptgs: A1 ISNONTEXT  Index in Ptgs: 1 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@4806fbf7'},
{id: '6249a4a3-28cd-4359-a2ec-dd3ac1189797', label: 'ISNONTEXT\nTRUE', color: '#f0ad4e', title: 'Name: ISNONTEXT<br>Value: TRUE<br>Type: FUNCTION<br>Id: 6249a4a3-28cd-4359-a2ec-dd3ac1189797<br>Formula Expression: Formula String: ISNONTEXT(VALUE); Formula Values: ISNONTEXT(67.0); Formula Ptg: ; Ptgs:  Index in Ptgs: 1 <br>Source Object Id: org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook@4806fbf7'}
                            ]);


var edges = new vis.DataSet([
                             /* {from: id_a, to: id_b}, */
{from: '44475bff-0da6-4638-bad9-9ec798abdaac', to: '6249a4a3-28cd-4359-a2ec-dd3ac1189797'},
{from: 'a69ba467-4c73-4bed-8f4b-282ba8e0317f', to: '912510ae-5cd2-4283-bab0-e7972c955669'},
{from: '6249a4a3-28cd-4359-a2ec-dd3ac1189797', to: 'd4d57b3c-0db6-4936-b36e-e4c7b79a60d5'},
{from: '0e159c2a-c43a-4ae6-ad84-6a4f1e438166', to: 'ef5e8978-716c-4ba2-9361-69fd3f87fd3b'},
{from: 'd3e3db0d-f007-4aa4-bf67-01f5fa03b9d6', to: '0e159c2a-c43a-4ae6-ad84-6a4f1e438166'},
{from: '34b4d925-5250-47af-af0b-20829a963346', to: 'e9edac6a-34cc-46e6-8254-4844bafac76a'},
{from: 'e9edac6a-34cc-46e6-8254-4844bafac76a', to: '6bfe1681-a5d4-4d71-b84e-c599fd44b5d6'},
{from: 'a69ba467-4c73-4bed-8f4b-282ba8e0317f', to: 'd3e3db0d-f007-4aa4-bf67-01f5fa03b9d6'},
{from: '808701a0-7893-4d86-8399-7f653c73de54', to: 'a69ba467-4c73-4bed-8f4b-282ba8e0317f'}
                            ]);