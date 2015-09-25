package com.dataart.spreadsheetanalytics.engine.temp;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

public class TempSqlDataSource {

    private Connection co;
    
    private String initSql_1 = "CREATE TABLE Persons "
                                + "("
                                    + "PersonId int,"
                                    + "LastName varchar(255),"
                                    + "FirstName varchar(255),"
                                    + "Address varchar(255),"
                                    + "City varchar(255),"
                                    + "Age int,"
                                    + "CreditCardNumber bigint,"
                                + ");";
    
    private String initSql_2 = 
            "INSERT INTO Persons (PersonId, LastName, FirstName, Address, City, Age, CreditCardNumber) VALUES (1,'Erichsen','Tom B.','Abc St.','Lublin',36, 0001000100010001);" +
            "INSERT INTO Persons (PersonId, LastName, FirstName, Address, City, Age, CreditCardNumber) VALUES (2,'Tomasson','John B.','Abc St.','Lublin',25, 0002000200020002);" +
            "INSERT INTO Persons (PersonId, LastName, FirstName, Address, City, Age, CreditCardNumber) VALUES (3,'Bedersson','Richard B.','Abc St.','Lublin',48, 0003000300030003);" +
            "INSERT INTO Persons (PersonId, LastName, FirstName, Address, City, Age, CreditCardNumber) VALUES (4,'Chrenesson','Michael B.','Abc St.','Lublin',77, 0004000400040004);" +
            "INSERT INTO Persons (PersonId, LastName, FirstName, Address, City, Age, CreditCardNumber) VALUES (5,'Nefasson','Hank B.','Abc St.','Lublin',19, 0005000500050005);";
    
    public TempSqlDataSource() {
        
        try {
            Class.forName("org.hsqldb.jdbcDriver" );
            co = DriverManager.getConnection("jdbc:hsqldb:mem:aname", "sa", "");
            Statement st = co.createStatement();
            st.execute(initSql_1);
            st.execute(initSql_2);
        } catch (Exception e) {
            //TODO: this is temp!!
            e.printStackTrace();
        }
    }
    
    public ResultSet executeQuery(String query, List<Object> params) throws SQLException {
        
        String queryToExecute = query;
        for (int i = 0; i < params.size(); i++) {
            queryToExecute = queryToExecute.replace(i + "", params.get(i).toString());
        }
        
        PreparedStatement st = co.prepareStatement(queryToExecute);
        st.execute();
        return st.getResultSet();
    }

}
