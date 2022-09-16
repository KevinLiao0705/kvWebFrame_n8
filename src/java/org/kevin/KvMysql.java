/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.kevin;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *
 * @author kevin
 */
public class KvMysql {

    public static String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
    public static String DB_URL = "jdbc:mysql://localhost:3306/web_maker?useSSL=false&serverTimezone=UTC";
    public static String USER = "root";
    public static String PASS = "qwer1234";
    public static String errStr = "";
    public static String addr = "localhost";
    public static String port = "3306";
    public static String database = "web_maker";
    public static String table = "disp_type";
    public static boolean setTime_f = true;
    public static String getKey;
    public static String getValue;
    public static String getSetTime;
    public static int getLen=0;
    public static int actLne=0;
    public static int errCode=0;

    //errCode:2,KvErr: Cannot find the key in this table
    
    
    static public String nowTime() {

        String nowTime = "";
        if (KvMysql.setTime_f) {
            Date date = new Date();
            //SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
            nowTime = formatter.format(date);
        }
        return nowTime;
    }

    static public boolean insert(String key, String value) {
        String sqlStr = "";
        sqlStr += " INSERT INTO `" + KvMysql.table + "` (`key`,`value`,`set_time`)";
        sqlStr += " VALUES ('" + key + "','" + value + "','" + KvMysql.nowTime() + "');";
        return exeSql(sqlStr,0,0);
    }
    static public boolean edit(String key, String value) {
        String sqlStr = "";
        sqlStr += " UPDATE `" + KvMysql.table + "` SET";
        sqlStr += " `value`='" + value + "'";
        sqlStr += ",`set_time`='" + KvMysql.nowTime() + "'";
        sqlStr += " WHERE `key`='" + key + "'";
        if(!exeSql(sqlStr,2,0))
            return false;
        if(KvMysql.actLne==0){
            KvMysql.errCode=2;
            KvMysql.errStr="KvErr: Cannot find the key in this table";
            return false;
        }
        return true;
    }
    static public boolean insertEdit(String key, String value) {
        if(edit(key,value)){
            return true;
        }
        if(KvMysql.errCode==2){
            return insert(key,value);
        }
        return false;
    }
    static public boolean getValue(String key,String count) {
        int cnt=Integer.parseInt(count);
        System.err.println(cnt);
        String sqlStr = "";
        sqlStr += " SELECT * FROM `" + KvMysql.table +"`" ;
        sqlStr += " WHERE `key`='"+key+"'";
        return exeSql(sqlStr,1,cnt);
    }
    
    
    

    static public boolean exeSql(String sqlStr, int type,int getCnt) {
        Connection conn = null;
        Statement stmt = null;
        KvMysql.errCode=0;
        String url = "jdbc:mysql://" + KvMysql.addr + ":" + KvMysql.port + "/web_maker?useSSL=false&serverTimezone=UTC";
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(url, USER, PASS);
            stmt = conn.createStatement();
            switch (type) {
                case 0:
                    stmt.execute(sqlStr);
                    break;
                case 2:
                    KvMysql.actLne=stmt.executeUpdate(sqlStr);
                    break;
                case 1:
                    ResultSet rs = stmt.executeQuery(sqlStr);
                    KvMysql.getKey="";
                    KvMysql.getValue="";
                    KvMysql.getSetTime="";
                    KvMysql.getLen=0;
                    while (rs.next()) {
                        System.err.println(rs.getString("value"));
                        KvMysql.getKey = rs.getString("key");
                        KvMysql.getValue= rs.getString("value");
                        KvMysql.getSetTime=rs.getString("set_time");
                        KvMysql.getLen++;
                        break;
                    }
                    rs.close();
                    break;
            }
            stmt.close();
            conn.close();
            return true;
        } catch (SQLException se) {
            // 处理 JDBC 错误
            KvMysql.errStr = se.getMessage();
            KvMysql.errCode=1;
            System.err.println(se.getMessage());
            return false;
        } catch (Exception e) {
            errStr = e.getMessage();
            KvMysql.errCode=1;
            System.err.println(e.getMessage());
            return false;
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
            } catch (SQLException se2) {
            }
            try {
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException se) {
                errStr = se.getMessage();
                KvMysql.errCode=1;
                System.err.println(se.getMessage());
                return false;
            }
        }

    }

}
