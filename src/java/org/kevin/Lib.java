/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.kevin;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.channels.FileChannel;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author kevin
 */
public class Lib {

    public static int ptLevel = 3;
    public static String sRealPath = "";
    public static List<String> lsClassName;
    public static List<String> lsClassData;
    public static String errString;

    public static void log(String inf) {
        System.out.println(inf);
    }

    public static void p1(String inf) { //print 0       hard
        if (ptLevel < 1) {
            System.out.println(inf);
        }
    }

    public static void lp2(String inf) {    //punint 0,1t   middle
        if (ptLevel < 2) {
            System.out.println(inf);
        }
    }

    public static void p3(String inf) {     //print 0,1,2   easy
        if (ptLevel < 3) {
            System.out.println(inf);
        }
    }

    public static void putJos(JSONObject jo, String key, Object value) {
        try {
            //jo.accumulate(key, value);  //if exist trans to array
            jo.put(key, value);//添加元素
            //jo.append(key, value);
        } catch (JSONException ex) {
            ex.printStackTrace();
        }
    }

    public String josnToJs(String inStr) {

        String outStr = "";
        JSONObject jobj;
        String key;
        Object value;
        String str;
        int len = inStr.length();
        int fg = 0;
        for (int i = 0; i < len; i++) {
            if (inStr.charAt(i) == '{') {
                fg = 1;
                break;
            }
            if (inStr.charAt(i) == '[') {
                fg = 2;
                break;
            }
        }
        try {
            if (fg == 0) {
                Lib.errString = "Json Format First frror !!!";
                return null;
            }
            if (fg == 1) {
                jobj = new JSONObject(inStr);
                Iterator<String> it = jobj.keys();
                int first = 0;
                while (it.hasNext()) {
                    key = it.next();
                    if (first != 0) {
                        outStr += ',';
                    }
                    first = 1;
                    value = jobj.get(key);
                    str = value.toString();

                    for (int j = 0; j < str.length(); j++) {
                        if (value.getClass().getSimpleName().equals("String")) {
                            value = "\"" + value.toString() + "\"";
                        }
                    }
                    outStr += "\n" + key + "=" + value;
                }

            }
        } catch (Exception ex) {
            Lib.errString = ex.toString();
            return null;

        }

        return outStr;

    }

    //=======================================================================
    public static String fileToString(String fileName) {
        try {
            String contents;
            contents = new String(Files.readAllBytes(Paths.get(fileName)));
            //return new String(contents.getBytes("utf-8"),"utf-8");
            return contents;
        } catch (IOException ex) {
            Logger.getLogger(Lib.class.getName()).log(Level.SEVERE, null, ex);
        }
        return "";
    }

    public static String readJsonFile(String fileName) {
        String content = "";
        int first = 0;
        try (BufferedReader reader = Files.newBufferedReader(Paths.get(fileName))) {
            String currentLine;
            while ((currentLine = reader.readLine()) != null) {
                if (first == 1) {
                    content += "\n";
                }
                first = 1;
                content += currentLine;
            }
            return content;
        } catch (IOException ex) {
            Lib.errString = ex.toString();
            ex.printStackTrace();
        }
        return null;
    }

    //=======================================================================
    public static boolean saveFile(String _fileName, String inStr) {
        String fileName = _fileName;
        FileOutputStream outfile;
        try {
            outfile = new FileOutputStream(fileName);
            outfile.write(inStr.getBytes("utf-8"));
            outfile.close();
            return true;
        } catch (FileNotFoundException ex) {
            Lib.log("FileNotFound: " + fileName);
            return false;
        } catch (IOException ex) {
            Lib.log("SaveFileError: " + fileName);
            return false;
        }
    }
    //=======================================================================

    public static int copyFile(String sourceName, String destName) {
        File source = new File(sourceName);
        File dest = new File(destName);

        FileChannel inputChannel = null;
        FileChannel outputChannel = null;
        int err = 0;
        try {
            inputChannel = new FileInputStream(source).getChannel();
            outputChannel = new FileOutputStream(dest).getChannel();
            outputChannel.transferFrom(inputChannel, 0, inputChannel.size());
            inputChannel.close();
            outputChannel.close();
        } catch (IOException ex) {
            Lib.log("CopuFileError: " + source + " -> " + dest);
            err = 1;
        }
        return err;
    }

    public static String createColorPicker() {
        int i, j;
        String str = "";
        String strb = "";
        String style;
        String[] background_color = new String[]{
            "#000", "#200", "#400", "#600", "#800", "#a00", "#c00", "#e00",
            "#000", "#020", "#040", "#060", "#080", "#0a0", "#0c0", "#0e0",};
        String[] color = new String[]{
            "#000", "#020", "#040", "#060", "#080", "#0a0", "#0c0", "#0e0",
            "#000", "#200", "#400", "#600", "#800", "#a00", "#c00", "#e00",};

        strb += "<table class='cs_colorPicker_tbl' >";
        for (j = 0; j < 2; j++) {
            strb += "<tr>";
            for (i = 0; i < 8; i++) {
                style = "";
                style += "background-color:" + background_color[j * 8 + i] + ";";
                style += "color:" + color[j * 8 + i] + ";";
                //strb+="<div clase='cs_colorPicker_blk' style='"+style+"'>";
                strb += "<th";
                strb += " id='id_colorPicker_th_" + j * 8 + i + "'";
                strb += " class='cs_colorPicker_th'";
                strb += " style='" + style + "'";
                strb += " onclick='colorPickerClick(" + (j * 8 + i) + " )'";
                strb += ">";
                strb += background_color[j * 8 + i];
                strb += "</div>";
            }
            strb += "</tr>";
        }
        strb += "</table>";
        //======================================================
        str += "<div id='id_colorPicker_div'>" + strb + "</div>";
        //String path;
        //path = Lib.sRealPath + "include.js";
        //strb = "<script>" + fileData2str(path, "/*1*/") + "</script>";
        //str += strb;
        //path = Lib.sRealPath + "include.css";
        //strb = "<style type='text/css'>" + fileData2str(path, "/*1*/") + "</style>";
        //str += strb;

        //=======================================================  
        return str;
    }

    public static String popMenuMoveOut() {

        String str = "";
        str += "function popMenuMoveOut(id,event){                              ";
        str += "    var elemPop = document.getElementById(\"iPopMenuDiv\");     ";
        /*
        str += "    var stmp=\" X=\";                                           ";
        str += "    stmp=stmp+event.clientX;                                    ";
        str += "    stmp=stmp+\" Y=\";                                          ";
        str += "    stmp=stmp+event.clientY;                                    ";
        str += "    stmp=stmp+\" offX=\";                                       ";
        str += "    stmp=stmp+elemPop.offsetLeft;                               ";
        str += "    stmp=stmp+\" offY=\";                                       ";
        str += "    stmp=stmp+elemPop.offsetTop;                                ";
        str += "    stmp=stmp+\" W=\";                                          ";
        str += "    stmp=stmp+elemPop.offsetWidth;                              ";
        str += "    stmp=stmp+\" H=\";                                          ";
        str += "    stmp=stmp+elemPop.offsetHeight;                             ";
        str += "    debugOut(stmp);                                             ";    
         */
        str += "var curX=event.clientX;                                        ";
        str += "var curY=event.clientY;                                        ";
        str += "var left=elemPop.offsetLeft;                                   ";
        str += "var top=elemPop.offsetTop;                                     ";
        str += "var eleW=elemPop.offsetWidth;                                  ";
        str += "var eleH=elemPop.offsetHeight;                                 ";
        str += "var flag=0;                                                    ";
        str += "if(curX<left+2)                                                  ";
        str += "    flag=1;                                                    ";
        str += "if(curY<top+2)                                                   ";
        str += "    flag=1;                                                    ";
        str += "if(curX>(left+eleW-2))                                           ";
        str += "    flag=1;                                                    ";
        str += "if(curY>(top+eleH-2))                                            ";
        str += "    flag=1;                                                    ";
        str += "if(flag==1)                                                    ";
        str += "   elemPop.style.display = \"none\"                             ";
        str += "        }";
        return str;
    }

    public static String bodyLoad(int inx) {
        String str = "";
        switch (inx) {
            case 0:
                str += fileData2str(Lib.sRealPath + "lib.js", "/*a0*/");
                break;
            case 1:
                str += fileData2str(Lib.sRealPath + "lib.js", "/*a1*/");
                break;

        }
        return str;
    }

    public static void prt(String str) {
        System.out.println(str);
    }

    public static long str2long(String str, long errorCode) {
        long lg = errorCode;
        try {
            lg = Long.parseLong(str);
        } catch (NumberFormatException ex) {
            System.out.println("parseLong Error line");
        }
        return lg;
    }

    public static int str2int(String str, int errorCode) {
        int lg = errorCode;
        try {
            lg = Integer.parseInt(str);
        } catch (NumberFormatException ex) {
            System.out.println("parseLong Error line");
        }
        return lg;
    }

    //".\\jsA.js"
    public static String fileFunc2str(String fileName, String funcName) {
        int i;
        char ch;
        char[] chs;
        String str = "";
        FileReader fr;
        int index = 0;
        chs = funcName.toCharArray();
        char[] cbuf = new char[chs.length];
        int cbuf_len = 0;
        int cbuf_inx1 = 0;
        int cbuf_inx2 = 0;
        int ibuf;

        try {
            fr = new FileReader(fileName);
            try {
                //===========================================
                for (;;) {
                    if (cbuf_len > 0) {
                        ch = cbuf[cbuf_inx2++];
                        cbuf_len--;
                    } else {
                        ibuf = fr.read();
                        if (ibuf == -1) {
                            break;
                        }
                        ch = (char) ibuf;
                        cbuf[cbuf_inx1++] = ch;
                    }
                    if (ch == chs[index++]) {
                        if (index == chs.length) {
//==============================================================================                            
                            int func_start_f = 0;
                            int mark_start_f = 0;
                            int quot_cnt = 0;
                            String func_str = "";

                            for (;;) {
                                ibuf = fr.read();
                                if (ibuf == -1) {
                                    return "";
                                }
                                ch = (char) ibuf;
                                func_str += ch;
                                if (mark_start_f == 1) {
                                    if (ch == '/') {
                                        mark_start_f = 2;
                                        continue;
                                    }
                                    if (ch == '*') {
                                        mark_start_f = 3;
                                        continue;
                                    }
                                    mark_start_f = 0;
                                }
                                if (mark_start_f == 2) {
                                    if (ch == '\n') {
                                        mark_start_f = 0;
                                    }
                                    continue;
                                }
                                if (mark_start_f == 3) {
                                    if (ch == '*') {
                                        mark_start_f = 4;
                                    }
                                    continue;
                                }
                                if (mark_start_f == 4) {
                                    if (ch == '/') {
                                        mark_start_f = 0;
                                        continue;
                                    }
                                    mark_start_f = 3;
                                    continue;
                                }
                                if (ch == '/') {
                                    mark_start_f = 1;
                                    continue;
                                }
                                if (func_start_f == 0) {
                                    if (ch == '{') {
                                        func_start_f = 1;
                                        quot_cnt = 1;
                                    }
                                    continue;
                                }
                                if (ch == '{') {
                                    quot_cnt++;
                                }
                                if (ch == '}') {
                                    quot_cnt--;
                                    if (quot_cnt == 0) {
                                        return funcName + func_str;

                                    }
                                }
                            }
//==============================================================================                            
                        }
                    } else {
                        if (cbuf_inx1 > 0) {
                            cbuf_len = cbuf_inx1 - 1;
                            cbuf_inx2 = 1;
                        }
                        index = 0;
                        cbuf_inx1 = 0;
                    }
                }
                return "";
            } catch (IOException ex) {
                Logger.getLogger(Lib.class.getName()).log(Level.SEVERE, null, ex);
            }
        } catch (FileNotFoundException ex) {
            Logger.getLogger(Lib.class.getName()).log(Level.SEVERE, null, ex);
        }

        return str;
    }

    public static String fileData2str(String fileName, String sepstr) {
        int i;
        int ibuf;
        char ch;
        char[] chs;
        String str = "";
        FileReader fr;
        chs = sepstr.toCharArray();
        char[] cbuf = new char[chs.length];
        int index = 0;
        int cbuf_len = 0;
        int cbuf_inx1 = 0;
        int cbuf_inx2 = 0;
        int same_cnt = 0;
        String middata_str = "";
        try {
            fr = new FileReader(fileName);
            try {
                //===========================================
                for (;;) {
                    if (cbuf_len > 0) {
                        ch = cbuf[cbuf_inx2++];
                        cbuf_len--;
                    } else {
                        ibuf = fr.read();
                        if (ibuf == -1) {
                            break;
                        }
                        ch = (char) ibuf;
                        cbuf[cbuf_inx1++] = ch;
                    }
                    if (same_cnt == 1) {
                        middata_str += ch;
                    }
                    if (ch == chs[index++]) {
//==============================================================================                            
                        if (index == chs.length) {
                            if (same_cnt == 0) {
                                index = 0;
                                cbuf_len = 0;
                                cbuf_inx1 = 0;
                                cbuf_inx2 = 0;
                                same_cnt++;
                            } else {
                                return middata_str.substring(0, middata_str.length() - chs.length);
                            }

                        }
//==============================================================================                            
                    } else {
                        if (cbuf_inx1 > 0) {
                            cbuf_len = cbuf_inx1 - 1;
                            cbuf_inx2 = 1;
                        }
                        index = 0;
                        cbuf_inx1 = 0;
                    }
                }
                return "";
            } catch (IOException ex) {
                Logger.getLogger(Lib.class.getName()).log(Level.SEVERE, null, ex);
            }
        } catch (FileNotFoundException ex) {
            Logger.getLogger(Lib.class.getName()).log(Level.SEVERE, null, ex);
        }

        return str;
    }

    public static List<String> getFileClassNames(String fileName, String[] sepstr) {
        List<String> lsClassName = new ArrayList<>();
        BufferedReader reader;
        try {
            reader = new BufferedReader(new FileReader(fileName));
            String[] strA, strB;
            String className = "";
            int findInx = 0;
            String line;
            while (true) {
                line = reader.readLine();

                if (line == null) {
                    break;
                }
                if (line.contains(sepstr[0])) {
                    strA = line.split(sepstr[0]);
                    if (strA.length != 2) {
                        continue;
                    }
                    strB = strA[1].split(sepstr[1]);
                    if (strB.length != 2) {
                        continue;
                    }
                    className = strB[0];
                    findInx = 1;
                    continue;
                }
                if (findInx == 0) {
                    continue;
                }
                if (line.contains(sepstr[2])) {
                    findInx = 0;
                    strA = line.split(sepstr[2]);
                    if (strA.length != 2) {
                        continue;
                    }
                    strB = strA[1].split(sepstr[3]);
                    if (strB.length != 2) {
                        continue;
                    }
                    if (!className.equals(strB[0])) {
                        continue;
                    }
                    lsClassName.add(className);
                    System.out.println(className);
                }
            }
            reader.close();
            return lsClassName;
        } catch (IOException e) {
            return lsClassName;
        }

    }

    public static void getModelClassLib(String fileName, String[] sepstr) {
        BufferedReader reader;
        Lib.lsClassName = new ArrayList<>();
        Lib.lsClassData = new ArrayList<>();

        try {
            File f = new File(fileName);
            InputStreamReader read = new InputStreamReader(new FileInputStream(f), "UTF-8");
            reader = new BufferedReader(read);
            //reader = new BufferedReader(new FileReader(fileName));
            String[] strA, strB;
            String className = "";
            String classData = "";

            int findInx = 0;
            String line;
            while (true) {
                line = reader.readLine();

                if (line == null) {
                    break;
                }
                classData += "\n" + line;
                if (line.contains(sepstr[0])) {
                    strA = line.split(sepstr[0]);
                    if (strA.length != 2) {
                        continue;
                    }
                    strB = strA[1].split(sepstr[1]);
                    if (strB.length != 2) {
                        continue;
                    }
                    className = strB[0];
                    classData = line;
                    findInx = 1;
                    continue;
                }
                if (findInx == 0) {
                    continue;
                }
                if (line.contains(sepstr[2])) {
                    findInx = 0;
                    strA = line.split(sepstr[2]);
                    if (strA.length != 2) {
                        continue;
                    }
                    strB = strA[1].split(sepstr[3]);
                    if (strB.length != 2) {
                        continue;
                    }
                    if (!className.equals(strB[0])) {
                        continue;
                    }
                    Lib.lsClassName.add(className);
                    Lib.lsClassData.add(classData);
                }
            }
            reader.close();
        } catch (IOException e) {
        }
    }

    public static void saveModelClassLib(String fileName, String className, String addString) {
        FileOutputStream outfile = null;
        String source = "";
        System.out.println(fileName);

        for (int i = 0; i < Lib.lsClassData.size(); i++) {
            System.out.println(Lib.lsClassName.get(i));
            if (!Lib.lsClassName.get(i).equals(className)) {
                source += "\n";
                source += Lib.lsClassData.get(i);
            }
        }
        source += "\n";
        source += addString;
        try {
            outfile = new FileOutputStream(fileName);
            outfile.write(source.getBytes("utf-8"));
            outfile.close();
        } catch (IOException e) {

        }
    }

    public static void removeModelClassLib(String fileName, String className) {
        FileOutputStream outfile = null;
        String source = "";
        for (int i = 0; i < Lib.lsClassName.size(); i++) {
            if (!Lib.lsClassName.get(i).equals(className)) {
                source += Lib.lsClassData.get(i);
            }
        }
        try {
            outfile = new FileOutputStream(fileName);
            outfile.write(source.getBytes("utf-8"));
            outfile.close();
        } catch (IOException e) {
        }
    }

    public static String json2Obj(String jsonStr) {
        JsData jd = new JsData(jsonStr);
        jd.transObj();
        return jd.outStr;
    }

    public static String[] toStringArray(JSONArray array) {
        if (array == null) {
            return null;
        }

        String[] arr = new String[array.length()];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = array.optString(i);
        }
        return arr;
    }

    public static String stringListToString(ArrayList<String> alString) {
        String outStr = "[";
        for (int i = 0; i < alString.size(); i++) {
            if (i != 0) {
                outStr += ",";
            }
            outStr += "\"";
            outStr += alString.get(i);
            outStr += "\"";
        }
        outStr += "]";
        return outStr;

    }

    public static ArrayList<String> readFileNames(String initDir, String[] compareNames) {
        String[] strA;
        String fileName;
        ArrayList<String> fileNameList = new ArrayList<String>();
        File folder = new File(initDir);
        if (folder.exists() && folder.isDirectory()) {
            File[] listOfFiles = folder.listFiles();
            loop1:
            for (int i = 0; i < listOfFiles.length; i++) {
                if (listOfFiles[i].isFile()) {
                    fileName = listOfFiles[i].getName();
                    for (int j = 0; j < compareNames.length; j++) {
                        if (compareString(fileName, compareNames[j].trim()) == 1) {
                            fileNameList.add(fileName);
                            System.out.println("File " + fileName);         
                            break;
                        }
                    }
                    /*
                    if(extNames.length==0){
                        fileNameList.add("./" + initDir + "/" + fileName);
                        continue;
                    }
                    strA = fileName.split("\\.");
                    if (strA.length < 2) {
                        continue;
                    }
                    int j;
                    for(j=0;j<extNames.length;j++){
                        if(strA[strA.length - 1].equals(extNames[i]))
                            break;
                        if(strA[strA.length - 1].equals(extNames[i]))
                            break;
                        if(strA[strA.length - 1].equals(extNames[i]))
                            break;
                    }
                    if(j==extNames.length)
                        continue;
                    fileNameList.add("./" + initDir + "/" + fileName);
                    //System.out.println("File " + fileName);
                     */
                } else if (listOfFiles[i].isDirectory()) {
                    //System.out.println("Directory " + listOfFiles[i].getName());
                }
            }
        }
        return fileNameList;
    }

    public static int compareString(String orgStr, String cmpStr) {
        int olen = orgStr.length();
        int clen = cmpStr.length();
        int i, j, k, ibuf;
        String sbuf, tbuf;
        ibuf = cmpStr.indexOf('*');
        if (ibuf == -1) {
            if (orgStr.equals(cmpStr)) {
                return 1;
            }
            return 0;
        }
        if (ibuf == 0) {    //first *
            if (clen == 1) //cmpStr="*"
            {
                return 1;
            }
            if (cmpStr.charAt(clen - 1) == '*') {     //comStr="*xxx*"
                sbuf = cmpStr.substring(1, clen - 1);
                if (orgStr.indexOf(sbuf) == -1) {
                    return 0;
                }
                return 1;
            }
            sbuf = cmpStr.substring(1);

            int slen = sbuf.length();
            for (i = 0; i < slen; i++) {
                if (sbuf.charAt(slen - 1 - i) != orgStr.charAt(olen - 1 - i)) {
                    return 0;
                }
            }
            return 1;
        }
        if (ibuf == clen - 1) {   //end *
            sbuf = cmpStr.substring(0, clen - 1);
            ibuf = orgStr.indexOf(sbuf);
            if (ibuf != 0) {
                return 0;
            }
            return 1;
        }
        sbuf = cmpStr.substring(0, ibuf);
        tbuf = cmpStr.substring(ibuf + 1, clen);
        ibuf = orgStr.indexOf(sbuf);
        if (ibuf != 0) {
            return 0;
        }
        int tlen = tbuf.length();
        for (i = 0; i < tlen; i++) {
            if (tbuf.charAt(tlen - 1 - i) != orgStr.charAt(olen - 1 - i)) {
                return 0;
            }
        }
        if (sbuf.length() + tbuf.length() > olen) {
            return 0;
        }
        return 1;
    }

}

class JsData {

    String inStr = "";
    String outStr = "";
    int inx = 0;
    int err_i = 0;
    int len;

    JsData(String str) {
        inStr = str;
        len = inStr.length();
    }

    public void transObj() {
        char ch;
        int mm_i = 0;
        int array_i = 0;
        for (; inx < len; inx++) {
            ch = inStr.charAt(inx);
            outStr += ch;
            if (ch == '{') {
                inx++;
                tobj();
            }
        }
    }

    public void tobj() {
        char ch;
        int mm_i = 0;
        int array_i = 0;
        int pp_i = 0;
        for (; inx < len; inx++) {
            ch = inStr.charAt(inx);
            if (mm_i == 0) {
                if (ch == '\"') {
                    continue;
                }
                if (ch == ':') {
                    mm_i = 1;
                }
                outStr += ch;
                continue;
            } else {
                outStr += ch;
                if (ch == '[') {
                    array_i = 1;
                    continue;
                }
                if (ch == '\"') {
                    if (pp_i == 0) {
                        pp_i = 1;
                    } else {
                        pp_i = 0;
                    }
                    continue;
                }

                if (array_i == 0) {
                    if (ch == ',') {
                        if (pp_i == 0) {
                            outStr += '\n';
                            mm_i = 0;
                        }
                        continue;
                    }
                    if (ch == '{') {
                        inx++;
                        tobj();
                        continue;
                    }
                } else {
                    if (ch == ']') {
                        array_i = 0;
                        continue;
                    }
                    if (ch == '{') {
                        inx++;
                        tobj();
                        continue;
                    }
                    if (ch == '}') {
                        return;
                    }

                }
            }
        }
    }
}

abstract class MapCbk {

    public abstract String prg(String sendJid, Map<String, String> map);
}
