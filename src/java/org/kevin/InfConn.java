/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.kevin;

/**
 *
 * @author Administrator
 */
public class InfConn {
    public String type;
    public String name;
    public String url;
    public int port;
    public String userName;
    public String password;
    public String databaseTable;
    public String databaseKey;
    public String paraCheck;
    public String linkCheck;
    
    public int timeout;
    public long periodTime;
    public long chksum;
    //======================================
    public long updateCnt;
    public long lastTime = 0;
    public String okData = "{}";
    public String errorData = "{}";
    //No connect||Connect Error||Connect OK)
    public String connSta = "No Connect";
    public int dataPresent_f = 0;

    public InfConn(String _type,String _name, String _url, long _periodTime) {
        type=_type;
        name = _name;
        url = _url;
        periodTime = _periodTime;
        paraCheck=type+periodTime;
        linkCheck=name+url; 
    }
    public InfConn(String _type,String _name, String _url, int _port,long _periodTime) {
        type=_type;
        name = _name;
        url = _url;
        port=_port;
        periodTime = _periodTime;
        paraCheck=type+periodTime;
        linkCheck=name+url+port;
    }
    public InfConn(String _type,String _name, String _url, int _port,long _periodTime,String _userName,String _password) {
        type=_type;
        name = _name;
        url = _url;
        port=_port;
        periodTime = _periodTime;
        userName=_userName;
        password=_password;
        paraCheck=type+periodTime+userName+password;
        linkCheck=name+url+port;
    }
    public InfConn(String _type,String _name, String _url, int _port,long _periodTime,String _userName,String _password,String _table,String _key,int _timeout) {
        type=_type;
        name = _name;
        url = _url;
        port=_port;
        periodTime = _periodTime;
        userName=_userName;
        password=_password;
        databaseTable=_table;
        databaseKey=_key;
        timeout=_timeout;
        paraCheck=type+periodTime+userName+password+timeout;
        linkCheck=url+port+databaseTable+databaseKey;
                
                
        
    }
    
    
    
}
