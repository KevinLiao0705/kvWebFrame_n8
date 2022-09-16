package org.kevin;

import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONException;
import org.json.JSONObject;

//import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.json.JSONArray;

/**
 *
 * @author kevin
 */
public final class WebBase {

    public static WebBase sWebBase;
    public static String sRealPath = "";
    public static String sSrcPath = "";
    static final org.apache.log4j.Logger log = org.apache.log4j.Logger.getLogger(WebBase.class);

//==========================================================
    public WebBase(List<String> paraList, String realPath) {
        int i;
        String[] strA;
        sWebBase = this;
        WebBase.sRealPath = realPath;
        Lib.sRealPath = realPath;
        strA = realPath.split("/");
        String srcPath = "";
        for (i = 0; i < strA.length - 2; i++) {
            srcPath = srcPath + strA[i] + "/";
        }
        //srcPath = srcPath + "web/";
        //srcPath = srcPath + "webapps/ROOT/";
        srcPath = srcPath + GB.sourceDir;
        WebBase.sSrcPath = srcPath;
        System.out.println("srcPath = " + srcPath);
//==========================================================
        GB.requestPara = paraList;

        //String currentDir = System.getProperty("user.dir");
        //PropertyConfigurator.configure(currentDir + "\\log4j.properties");
        PropertyConfigurator.configure(WebBase.sSrcPath + "log4j.properties");
        //=============================================
        //Base3.log.debug("This is a Debug Information.");    //debug層級
        //Base3.log.info("This is a Info Information.");      //info層級
        //Base3.log.warn("This is a Warn Information.");      //warn層級
        //Base3.log.error("This is a Error Information.");    //error層級
        //Base3.log.fatal("This is a Fatal Information.");    //fatal層級        
        //===============================================
        WebBase.log.info("Web Base Program Start.....\n");
        //extractSet();

    }

    public void log(String mes) {

    }
    
    

    public void extractSet() {
        String fileName;
        String content;
        String key;
        String keya;
        Object value;
        ArrayList<String> strLs = new ArrayList();
        strLs.add("aboutUs");
        try {
            String outStr = "";
            outStr += "class MySet {\n";
            outStr += "    constructor() {\n";
            for (int i = 0; i < strLs.size(); i++) {
                fileName = WebBase.sSrcPath + "systemResource/" + strLs.get(i) + ".json";
                content = Lib.readJsonFile(fileName);
                if (content == null) {
                    WebBase.log.error(Lib.errString);
                    continue;
                }
                
                JsonData jd=new JsonData(content);
                outStr += strLs.get(i) + "Page=";
                outStr +=jd.toJsValue();
                if(jd.erri==1){
                    String errStr="Json File Format Eerror At "+(jd.posy+1)+":"+(jd.posx+1)+" !!!";
                    WebBase.log.error(errStr);
                    return; 
                }
                outStr += "\n}\n";
                outStr += "\n}\n";
                //=================================
                FileOutputStream outfile;
                //fileName = WebBase.sSrcPath + "MySet.js";
                fileName = "d:/tmp/" + "MySet.js";
                Lib.saveFile(fileName, outStr);
                System.out.println("Save MySet.js");

            }
        } catch (Exception ex) {
            WebBase.log.error(ex.toString());
        }

    }

    public String html() {

        //======================================
        String str = "";
        str += "<head>\n";
        str += "<meta charset='UTF-8'>\n";
        str += "<title>" + GB.title_str + "</title>\n";
        str += "<link href ='aiot3.ico' rel='shortcut icon'>\n";
        //str+="<style type='text/css'>";
        //str+="html,body,#id_rootDiv{ height: 100%; margin: 0; padding: 0; position: absolute;}";
        //str+="</style>";
        if (GB.min_js_f == 1) {
        } else {
            str += "<script type='text/javascript' src='jquery_min.js'></script>\n";
            //======================================================================
            str += "<script type='text/javascript' src='WebGlobal.js'></script>\n";
            str += "<script type='text/javascript' src='kvLib.js'></script>\n";
            str += "<script type='text/javascript' src='MyTexts.js'></script>\n";
            str += "<script type='text/javascript' src='View.js'></script>\n";
            str += "<script type='text/javascript' src='josnWebSet/MySet.js'></script>\n";

        }
        //str += "<script type='text/javascript' src='user-kevin/userLib.js'></script>\n";
        //str += "<script type='text/javascript' src='userLib.js'></script>\n";
        //str += "<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>";

        str += "<link rel=stylesheet type='text/css' href='cssC.css'>\n";
        str += "</head>\n";
        str += body();
        return str;
    }

    //防右鍵oncontextmenu="return false"
    public String body() {
        String str = "";
        str += "<body id='id_body' onload='bodyOnload()' oncontextmenu='return false;' onmousedown='KvLib.bodyMouseDown()' style='width:100%;height:100%;'>";
        str += "<div id='id_rootDiv' style='position:absolute;width:100%;height:100%;'></div>";
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
        str += "View.bodyOnLoad();";   //kvPaint
        str += "View.repaint(1);";   //kvPaint
        str += "}";
        str += "gr.baseTimerObj=setInterval(View.baseTimer, 20);";
        //str += "document.body.onmousemove = bodyOnMouseMove;";
        //str += "document.body.onclick = bodyOnMouseClick;";
        str += "</script>";
        str += "</div>";
        str += "</body>";
        return str;
    }
}
