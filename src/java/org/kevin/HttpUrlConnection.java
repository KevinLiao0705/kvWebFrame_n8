/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.kevin;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.net.ssl.HttpsURLConnection;

/**
 *
 * @author Administrator
 */
public class HttpUrlConnection {

    static final String USER_AGENT = "Mozilla/5.0";
    GetUrlDataTd1 td1 = null;
    public int td1_run_f = 0;
    public int td1_destroy_f = 0;

    /**
     *
     */
    public List<InfConn> lsInfConn = new ArrayList<>();

    public void create() {
        HttpUrlConnection cla = this;
        if (cla.td1 == null) {
            cla.td1 = new GetUrlDataTd1(cla);
            cla.td1.start();
            cla.td1_run_f = 1;
            cla.td1_destroy_f = 0;
        }

    }

    public void addUrl(String _type, String _name, String _url, long _periodTime) {
        lsInfConn.add(new InfConn(_type, _name, _url, _periodTime));
    }

    public void addRedis(String _type, String _name, String _url, int _port, long _periodTime, String _userName, String _password) {
        lsInfConn.add(new InfConn(_type, _name, _url, _port, _periodTime, _userName, _password));
    }

    public static void sendGet(String url, InfConn infConn) throws Exception {

        URL obj = new URL(url);
        //Lib.prt(url);
        //URL obj = new URL("https://od.moi.gov.tw/od/data/api/EA28418E-8956-4790-BAF4-C2D3988266CC?$format=json");
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        //默认值我GET
        con.setRequestMethod("GET");

        //添加请求头
        con.setRequestProperty("User-Agent", USER_AGENT);

        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'GET' request to URL : " + url);
        System.out.println("Response Code : " + responseCode);

        InputStream ips = null;
        int connectOk_f = 0;
        switch (responseCode) {
            case HttpURLConnection.HTTP_OK:
            case HttpURLConnection.HTTP_CREATED:
            case HttpURLConnection.HTTP_ACCEPTED:
                ips = con.getInputStream();
                connectOk_f = 1;
                break;
            default:
                ips = con.getErrorStream();
                break;
        }

        BufferedInputStream bis = new BufferedInputStream(ips);
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        int len;
        byte[] arr = new byte[1024];
        long chksum = 0;
        while ((len = bis.read(arr)) != -1) {
            bos.write(arr, 0, len);
            for (int i = 0; i < len; i++) {
                chksum += arr[i];
            }
            bos.flush();
        }
        bos.close();
        if (connectOk_f == 0) {
            infConn.connSta = "Connect Error";
            infConn.errorData = bos.toString("utf-8");
        } else {
            infConn.connSta = "Connect OK";
            infConn.okData = bos.toString("utf-8");
            infConn.dataPresent_f = 1;
            infConn.chksum = chksum;
        }
        //System.out.println(bos.toString("utf-8"));

    }

    // HTTP POST请求
    public static void sendPost(String url) throws Exception {

        URL obj = new URL(url);
        HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();

        //添加请求头
        con.setRequestMethod("POST");
        con.setRequestProperty("User-Agent", USER_AGENT);
        con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");

        String urlParameters = "sn=C02G8416DRJM&cn=&locale=&caller=&num=12345";

        //发送Post请求
        con.setDoOutput(true);
        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.writeBytes(urlParameters);
        wr.flush();
        wr.close();

        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'POST' request to URL : " + url);
        System.out.println("Post parameters : " + urlParameters);
        System.out.println("Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        //打印结果
        System.out.println(response.toString());

    }

}

class GetUrlDataTd1 extends Thread {

    HttpUrlConnection cla;
    int debug = 0;

    GetUrlDataTd1(HttpUrlConnection owner) {
        cla = owner;
    }

    @Override
    public void run() { // override Thread's run()
        //Test cla=Test.thisCla;
        int i;
        InfConn infConn;
        Date date;
        long nowTime;
        for (;;) {
            if (cla.td1_run_f == 1) {
                if (!cla.lsInfConn.isEmpty()) {
                    int len = cla.lsInfConn.size();
                    for (i = 0; i < len; i++) {
                        date = new Date();
                        nowTime = date.getTime();
                        infConn = cla.lsInfConn.get(i);
                        if (infConn.lastTime == 0) {
                            infConn.lastTime = nowTime- infConn.periodTime;
                        }
                        if ((infConn.lastTime + infConn.periodTime) <= nowTime) {
                            infConn.lastTime = nowTime;
                            if (infConn.type.equals("Url")) {
                                try {
                                    HttpUrlConnection.sendGet(infConn.url, infConn);
                                } catch (Exception ex) {
                                    Logger.getLogger(GetUrlDataTd1.class.getName()).log(Level.SEVERE, null, ex);
                                }
                            }

                            if (infConn.type.equals("Redis")) {

                                Lib.prt("Redis");
                                boolean bf;
                                if(infConn.databaseTable.equals("")){
                                    bf=KvRedis.keyOpAdr("get",
                                        new String[]{infConn.databaseKey},
                                        new String[]{infConn.url, "" + infConn.port, "" + infConn.timeout, infConn.password});
                                }else{
                                    bf=KvRedis.keyOpAdr("hget",
                                        new String[]{infConn.databaseTable,infConn.databaseKey},
                                        new String[]{infConn.url, "" + infConn.port, "" + infConn.timeout, infConn.password});
                                }
                                
                                if (bf)
                                 {
                                    infConn.connSta = "Connect OK";
                                    infConn.okData = KvRedis.valueStr;
                                    if (Objects.isNull(infConn.okData)) {
                                        infConn.okData = "\"Null\"";
                                    }

                                    int le = infConn.okData.length();
                                    long chksum = 0;
                                    char[] charA = infConn.okData.toCharArray();
                                    for (int ib = 0; ib < le; ib++) {
                                        chksum += charA[ib];
                                    }
                                    infConn.dataPresent_f = 1;
                                    infConn.chksum = chksum;
                                } else {
                                    infConn.connSta = "Connect Error";
                                    infConn.errorData = "";
                                }

                            }
                            //Lib.prt(infConn.connSta);

                        }

                    }
                }

            }
            if (cla.td1_destroy_f == 1) {
                break;
            }
            //System.out.println("AAAAAAA " + debug++);
            try {
                Thread.sleep(20);
            } catch (InterruptedException ex) {
                Thread.currentThread().interrupt();
            }

        }
        try {
            Thread.sleep(1000);
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
        }

    }
}
