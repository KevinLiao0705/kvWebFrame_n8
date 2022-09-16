/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.kevin;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/**
 *
 * @author Administrator
 */
public class KvRedis {

    //public static String host = "localhost";
    //public static int port = 6379;
    //=====================================
    //public static String host = "103.44.220.55";
    //public static int port = 19346;
    //public static String passw = "1234";
    //=======================================
    public static String host = "118.163.89.29";
    //public static String passw = "1234";
    public static int port = 16479;
    //=======================================
    public static int timeout = 5000;//msec
    public static String actStr;
    public static long actLine;
    public static String valueStr;
    public static int errCode;
    public static Set<String> setList;
    public static Map<String,String> map; 

    static public boolean keyOp(String op, String[] strA) {
        String[] paras={KvRedis.host, ""+KvRedis.port, ""+KvRedis.timeout};
        return KvRedis.keyOpAdr(op, strA, paras);
    }

    static public boolean keyOpAdr(String op, String[] strA, String[] strB) {
        Iterator<String> it;
        String sbuf;
        try {
            KvRedis.errCode = 0;
            KvRedis.actLine = 0;
            KvRedis.actStr = null;
            KvRedis.valueStr = null;
            Jedis jedis = new Jedis(strB[0], Integer.parseInt(strB[1]), Integer.parseInt(strB[2]));
            if (strB.length >= 4) {
                if (!strB[3].equals("")) {
                    jedis.auth(strB[3]);
                }
            }
            String table="empty";
            String[] strAA=strA[0].split("~");
            if(strAA.length>=2)
                table=strAA[0];
            //System.out.println("==============================");
            switch (op) {
                case "type"://test error
                    KvRedis.actStr = jedis.type(strA[0]);
                    break;
                case "select"://test error
                    KvRedis.actStr = jedis.select(Integer.parseInt(strA[0]));
                    break;
                case "set":
                    KvRedis.actStr = jedis.set(strA[0], strA[1]);
                    break;
                case "Hset":
                    KvRedis.actLine = jedis.hset("hash~"+table,strA[0], strA[1]);
                    break;
                case "get":
                    KvRedis.valueStr = jedis.get(strA[0]);
                    break;
                case "Hget":
                    KvRedis.valueStr = jedis.hget("hash~"+table,strA[0]);
                    break;
                case "del":
                    KvRedis.actLine = jedis.del(strA[0]);
                    break;
                case "Hdel":
                    KvRedis.actLine = jedis.hdel("hash~"+table,strA[0]);
                    break;
                case "exists":
                    KvRedis.actLine = jedis.exists(strA);
                    break;
                case "findKeys":
                    KvRedis.setList = jedis.keys(strA[0]);
                    break;
                case "HfindKeys":
                    Set<String> setListTmp=jedis.hkeys("hash~"+table);
                    it = setListTmp.iterator();
                    String getKey;
                    KvRedis.setList = new HashSet<String>();
                    while (it.hasNext()) {
                        getKey = it.next();
                        if(Lib.compareString(getKey, strA[0])==1){
                            KvRedis.setList.add(getKey);
                        }
                    }
                    //KvRedis.setList = jedis.hkeys("hash~"+table);
                    break;
                //==================================================    
                case "hget":
                    KvRedis.valueStr = jedis.hget(strA[0],strA[1]);
                    break;
                case "hset":
                    KvRedis.actLine = jedis.hset(strA[0], strA[1],strA[2]);
                    break;
                case "hdel":
                    KvRedis.actLine = jedis.hdel(strA[0], strA[1]);
                    break;
                case "hgetall":
                    KvRedis.map = jedis.hgetAll(strA[0]);
                    if(KvRedis.map==null){
                        actStr = "Cannot get this key";
                        KvRedis.errCode = 2;
                    }    
                    break;
                case "hdelall":
                    KvRedis.setList = jedis.hkeys(strA[0]);
                    it = KvRedis.setList.iterator();
                    while (it.hasNext()) {
                          sbuf = it.next();
                          jedis.hdel(strA[0], sbuf);
                    }
                    break;
                default:
                    actStr = "Redis No This Command";
                    KvRedis.errCode = 2;
                    break;

            }
            GB.dataServerStatus="OK";
            jedis.disconnect();
            if(KvRedis.errCode!=0)
                return false;
            return true;
        } catch (Exception e) {
            KvRedis.actStr = e.getMessage();
            KvRedis.errCode = 1;
            String errStr="Connect to Redis Error!"+" url: "+strB[0]+" port:"+strB[1]+" key= "+strA[0];
            System.err.println(errStr);
            GB.dataServerStatus=errStr;
            return false;
        }
    }

    static public boolean set(String key, String value) {
        try {
            KvRedis.errCode = 0;
            Jedis jedis = new Jedis(KvRedis.host, KvRedis.port, KvRedis.timeout);
            //jedis.auth(passw); 
            KvRedis.actStr = jedis.set(key, value);//rtesult="OK";
            //System.out.println("result: " + KvRedis.actStr);
            jedis.disconnect();
            return true;
        } catch (Exception e) {
            KvRedis.actStr = e.getMessage();
            KvRedis.errCode = 1;
            System.err.println(e.getMessage());
            return false;
        }
    }

    static public boolean get(String key) {
        try {
            KvRedis.errCode = 0;
            Jedis jedis = new Jedis(KvRedis.host, KvRedis.port, KvRedis.timeout);
            //jedis.auth(passw); 
            KvRedis.valueStr = jedis.get(key);//rtesult="OK";
            //System.out.println("result: " + KvRedis.actStr);
            jedis.disconnect();
            if (KvRedis.valueStr == null) {
                actStr = "Cannot get this key";
                KvRedis.errCode = 2;
                return false;
            }
            return true;
        } catch (Exception e) {
            KvRedis.actStr = e.getMessage();
            KvRedis.errCode = 1;
            System.err.println(e.getMessage());
            return false;
        }
    }

    //连接本地的 Redis 服务
    static public boolean test() {
        System.out.println("connect success");
        try {
            Jedis jedis = new Jedis(KvRedis.host, KvRedis.port, KvRedis.timeout);
            //jedis.auth(passw); 
            System.out.println("服务正在运行: " + jedis.ping());
            jedis.disconnect();
            return true;
        } catch (Exception e) {
            KvRedis.actStr = e.getMessage();
            KvRedis.errCode = 1;
            System.err.println(e.getMessage());
            return false;
        }

        /*
        //设置 redis 字符串数据
        jedis.set("myKey", "myValue");
        // 获取存储的数据并输出
        System.out.println("myKey: " + jedis.get("myKey"));
        
        //存储数据到列表中
        jedis.lpush("site-list", "Runoob");
        jedis.lpush("site-list", "Google");
        jedis.lpush("site-list", "Taobao");
        // 获取存储的数据并输出
        List<String> list = jedis.lrange("site-list", 0 ,3);
        for(int i=0; i<list.size(); i++) {
            System.out.println("列表: "+list.get(i));
        }        
        

        // 获取数据并输出
        Set<String> keys = jedis.keys("*"); 
        Iterator<String> it=keys.iterator() ;   
        while(it.hasNext()){   
            String key = it.next();   
            System.out.println(key);   
        }        
         */
    }

}
