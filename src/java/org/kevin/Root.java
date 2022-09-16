package org.kevin;

import java.util.List;

/**
 *
 * @author kevin
 */
public final class Root {

    public static Root sRoot;
    public static String sRealPath = "";
    public static String sSrcPath = "";

//==========================================================
    public Root(List<String> paraList, String realPath) {
        int i;
        String[] strA;
        sRoot = this;
        Root.sRealPath = realPath;
        Lib.sRealPath = realPath;
        strA = realPath.split("/");
        String srcPath = "";
        for (i = 0; i < strA.length - 2; i++) {
            srcPath = srcPath + strA[i] + "/";
        }
        //srcPath = srcPath + "web/";
        //srcPath = srcPath + "webapps/ROOT/";
        srcPath = srcPath + GB.sourceDir;
        Root.sSrcPath = srcPath;
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
        String str = "";
        return str;
    }
}
