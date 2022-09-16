/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.kevin;

import java.util.Date;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

/**
 *
 * @author Administrator
 */
public class Https {

    /**
     * 忽略驗證https
     *
     * @throws java.lang.Exception
     */

    public static void igoreVerify() throws Exception {

        ignoreVerifyHttpsTrustManager();
        ignoreVerifyHttpsHostName();
    }
    /**
     * 忽略驗證https
     */
    public static void ignoreVerifyHttpsHostName() {
        HostnameVerifier hv = new HostnameVerifier() {

            public boolean verify(String urlHostName, SSLSession session) {

                System.out.println("Warning: URL Host: " + urlHostName + " vs. " + session.getPeerHost());

                return true;

            }

        };

        HttpsURLConnection.setDefaultHostnameVerifier(hv);
    }

    /**
     * 忽略驗證https
     *
     * @throws java.lang.Exception
     */
    public static void ignoreVerifyHttpsTrustManager() throws Exception {
        TrustManager[] trustAllCerts = new TrustManager[]{
            new X509TrustManager() {
                public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                    return null;
                }

                public void checkClientTrusted(java.security.cert.X509Certificate[] certs, String authType) {
                }

                public void checkServerTrusted(java.security.cert.X509Certificate[] certs, String authType) {
                }
            }
        };

        SSLContext sc = SSLContext.getInstance("SSL");
        sc.init(null, trustAllCerts, new java.security.SecureRandom());
        HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
    }
}

