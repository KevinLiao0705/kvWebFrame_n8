package org.kevin;

import java.util.List;

/**
 *
 * @author kevin
 */
public final class Jsaiot_3 {

    public static Jsaiot_3 sJsaiot_3;
    public static String sRealPath = "";
    public static String sSrcPath = "";

//==========================================================
    public Jsaiot_3(List<String> paraList, String realPath) {
        int i;
        String[] strA;
        sJsaiot_3 = this;
        Jsaiot_3.sRealPath = realPath;
        Lib.sRealPath = realPath;
        strA = realPath.split("/");
        String srcPath = "";
        for (i = 0; i < strA.length - 2; i++) {
            srcPath = srcPath + strA[i] + "/";
        }
        //srcPath = srcPath + "web/";
        //srcPath = srcPath + "webapps/ROOT/";
        srcPath = srcPath + GB.sourceDir;
        Jsaiot_3.sSrcPath = srcPath;
        System.out.println("srcPath = " + srcPath);
//==========================================================
        GB.requestPara = paraList;
    }

    public String html() {
        String str = "";
        str += "<head>\n";
        str += "<meta charset='UTF-8'>\n";
        str += "<title>" + GB.title_str + "</title>\n";
        str += "<link href ='webIcon.ico' rel='shortcut icon'>\n";
        //str+="<style type='text/css'>";
        //str+="html,body,#id_rootDiv{ height: 100%; margin: 0; padding: 0; position: absolute;}";
        //str+="</style>";
        if (GB.min_js_f == 1) {
            //str += "<script type='text/javascript' src='jquery_min.js'></script>\n";
        } else {
            //str += "<script type='text/javascript' src='josnWebSet/MySet.js'></script>\n";
        }

        //str += "<link rel=stylesheet type='text/css' href='cssB.css'>\n";
        str += "</head>\n";
        str += body();
        return str;
    }

    //防右鍵oncontextmenu="return false"
    public String body() {
        if(true)
            return "12345";
        
        String str = "";
        str += "<body id='id_body' onload='bodyOnload()' oncontextmenu='return false;' onmousedown='KvLib.bodyMouseDown()' style='width:100%;height:100%;'>";
        str += "<div id='id_rootDiv'></div>";
        str += "<div id='id_sysPageDiv'></div>";
        str += "<div id='id_popMenuDiv'></div>";
        
        /*
        str += "<div id='id_sysTestDiv'></div>";
        str += "<div id='id_sysMessageDiv'></div>";
        str += "<div id='id_inputDiv'></div>";
        str += "<div id='id_sysMemoDiv'></div>";
        str += "<div id='id_sysMemoDiv'></div>";
        str += "<div id='id_sysColorSetDiv'></div>";
        str += "<div id='id_sysMaskDiv'></div>";
        str += "<div id='testId'></div>";
         */
        //===================================
        str += "<div id='id_scriptDiv'>";
        str += "<script>";
        str += "function bodyOnload()";
        str += "{";
        str += "repaint(1);";   //kvPaint
        //str += "View.bodyOnLoad();";   //kvPaint
        //str += "View.repaint(1);";   //kvPaint
        
        
        str += "}";
        str += "gr.baseTimerObj=setInterval(baseTimer, 20);";
        //str += "gr.baseTimerObj=setInterval(View.baseTimer, 20);";
        
        
        //str += "document.body.onmousemove = bodyOnMouseMove;";
        //str += "document.body.onclick = bodyOnMouseClick;";
        str += "</script>";
        str += "</div>";
        str += "</body>";
        return str;
    }
}
