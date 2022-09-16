/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.kevin;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author Kevin
 */
public class Myjs {

    int inx = -1;
    int[] type = new int[20]; //;0:array 1:obj
    int[] cnt = new int[20];

    String jstr = "";
    int arrCnt = 0;
    int objCnt = 0;
    int iCnt = 0;
    int mm = 0;

    MapCbk cbk;

    public void stArr() {
        if (inx >= 0) {
            if (cnt[inx] > 0) {
                if (mm == 0) {
                    jstr += ",";
                }
            }
        }
        inx++;
        type[inx] = 0;
        cnt[inx] = 0;
        jstr += "[";
        mm = 0;
    }

    public void stObj() {
        if (inx >= 0) {
            if (cnt[inx] > 0) {
                if (mm == 0) {
                    jstr += ",";
                }
            }
        }
        inx++;
        type[inx] = 1;
        cnt[inx] = 0;
        jstr += "{";
        mm = 0;
    }

    public void end() {
        if (inx < 0) {
            return;
        }
        if (type[inx] == 0) {
            jstr += "]";
        }
        if (type[inx] == 1) {
            jstr += "}";
        }
        cnt[inx] = 0;
        inx--;
        if (inx >= 0) {
            cnt[inx] += 1;
        }
        mm = 0;

    }

    public void addKey(String key) {
        if (type[inx] == 0) {
            return;
        }
        if (cnt[inx] != 0) {
            jstr += ",";
        }
        jstr += "\"";
        jstr += key;
        jstr += "\":";
        mm = 1;
    }

    public void addArrStr(String value) {
        if (type[inx] != 0) {
            return;
        }
        if (cnt[inx] != 0) {
            jstr += ",";
        }
        jstr += "\"";
        jstr += value;
        jstr += "\"";
        cnt[inx] += 1;
        mm = 0;
    }

    public void addArrObj(Object value) {
        if (type[inx] != 0) {
            return;
        }
        if (cnt[inx] != 0) {
            jstr += ",";
        }
        jstr += value.toString();
        cnt[inx] += 1;
        mm = 0;
    }

    public void addKeyVstr(String key, String vstr) {
        if (type[inx] == 0) {
            return;
        }
        if (cnt[inx] != 0) {
            jstr += ",";
        }
        jstr += "\"";
        jstr += key;
        jstr += "\":";
        jstr += "\"";
        jstr += vstr;
        jstr += "\"";
        cnt[inx] += 1;
        mm = 0;
    }

    public void addKeyVobj(String key, Object vobj) {
        if (type[inx] == 0) {
            return;
        }
        if (cnt[inx] != 0) {
            jstr += ",";
        }
        jstr += "\"";
        jstr += key;
        jstr += "\":";
        jstr += vobj.toString();
        cnt[inx] += 1;
        mm = 0;
    }

    static public ArrayList<String> jsToStrArr(String str) {
        String[] strA;
        String sbuf = null;
        ArrayList al = new ArrayList();
        int step = 0;
        for (int i = 0; i < str.length(); i++) {
            switch (step) {
                case 0:
                    if (str.charAt(i) == ' ') {
                        break;
                    }
                    if (str.charAt(0) == '[') {
                        step = 1;
                        break;
                    }
                    return null;
                case 1:
                    if (str.charAt(i) == ' ') {
                        break;
                    }
                    if (str.charAt(i) == '\"') {
                        sbuf = new String("");
                        step = 2;
                        break;
                    }
                    if (str.charAt(0) == ']') {
                        return al;
                    }
                    return null;
                case 2:
                    if (str.charAt(i) == '\"') {
                        al.add(sbuf);
                        step = 3;
                        break;
                    }
                    sbuf += str.charAt(i);
                    break;
                case 3:
                    if (str.charAt(i) == ' ') {
                        break;
                    }
                    if (str.charAt(i) == ',') {
                        step = 1;
                        break;
                    }
                    if (str.charAt(i) == ']') {
                        return al;
                    }
                    break;
            }
        }
        return null;

    }

    public void anaJs(String sendJid, String istr) {
        JSONObject js;
        String kstr;
        Object vobj;
        String act = "";
        String type = "";
        String target = "";
        int cmdNo = 0;
        Map<String, String> map = new HashMap();

        try {
            js = new JSONObject(istr);
            Iterator<String> it = js.keys();
            while (it.hasNext()) {
                kstr = it.next();
                if (kstr.equals("cmdNo")) {
                    cmdNo = (int) js.get(kstr);
                }
                if ("commands".equals(kstr)) {
                    JSONArray ja = js.getJSONArray(kstr);
                    for (int j = 0; j < ja.length(); j++) {
                        JSONObject jss = ja.getJSONObject(j);
                        jss.put("cmdNo", cmdNo);
                        anaJs(sendJid, jss.toString());
                    }
                }
                map.put(kstr, js.get(kstr).toString());
            }
            cbk.prg(sendJid, map);

            /*
            if ("setMqttAgentAutoTx".equals(act)) {
                AgentObject aobj=mcla.agentLs.get(0);
                for(int i=0;i<aobj.jidArrayList.size();i++){
                    JidArray ja= aobj.jidArrayList.get(i);
                    for(int j=0;j<ja.jids.size();j++){
                        if(ja.jids.get(j).equals(target) ){
                            return;
                        }
                    }
                    i+=0;
                }
                
            }
             */
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public Object getValue(String istr, String key) {
        JSONObject j;
        try {
            j = new JSONObject(istr);
            Iterator it = j.keys();

            Object jsonOb = j.getJSONObject(key);
            return jsonOb;
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return null;
    }

    //return 0 = ok
    //return 1 = error
    public int ansJosn(String istr) {
        int step = 0;
        int inx = 0;
        int type = 0; //0 array 1: obj
        for (int i = 0; i < istr.length(); i++) {
            switch (step) {
                case 0: //start
                    if (istr.charAt(inx) == ' ') {
                        inx++;
                        continue;
                    }
                    if (istr.charAt(inx) == '[') {
                        inx++;
                        type = 0;
                        step = 1;
                        continue;
                    }
                    if (istr.charAt(inx) == '{') {
                        inx++;
                        type = 1;
                        step = 2;
                        continue;
                    }

            }

        }
        return 0;

    }
}

class JsonData {

    String inStr = "";
    String outStr = "";
    int inx = 0;
    int len;
    int posx = 0;
    int posy = 0;
    int erri = 0;
    int nowInx = 0;
    int loopCnt = 0;

    JsonData(String str) {
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

    public String toJsKeyValue() {
        int itemCnt = 0;
        char ch;
        String oStr = "";
        int charCnt = 0;
        int step = 0;
        String key = "";
        while (nowInx < len) {
            ch = inStr.charAt(nowInx++);
            int d=(int)(ch);
            posx++;
            if (ch == '\n') {
                posx = 0;
                posy++;
            }
            switch (step) {
                case 0:
                    if (ch == '\n' || ch == ' ') {
                        continue;
                    }
                    if (ch == '}') {
                        return oStr;
                    }
                    if (ch == '\"') {
                        itemCnt++;
                        step = 1;
                        charCnt = 0;
                        key = "";
                        continue;
                    }
                    erri = 1;
                    return "";
                case 1:
                    if (ch >= '0' && ch <= '9') {
                        if (charCnt == 0) {
                            erri = 1;
                            return "";
                        }
                        charCnt++;
                        key += ch;
                        continue;
                    }
                    charCnt++;
                    if (ch >= 'a' && ch <= 'z') {
                        key += ch;
                        continue;
                    }
                    if (ch >= 'A' && ch <= 'Z') {
                        key += ch;
                        continue;
                    }
                    if (ch == '_') {
                        key += ch;
                        continue;
                    }
                    if (ch == '"') {
                        if (key.length() == 0) {
                            erri = 1;
                            return "";
                        }
                        oStr += key;
                        step = 2;
                        continue;
                    }
                    erri = 1;
                    return "";
                case 2:
                    if (ch == '\n' || ch == ' ') {
                        continue;
                    }
                    if (ch == ':') {
                        oStr += "=";
                        oStr += toJsValue();
                        if(erri==1)
                            return "";
                        step = 3;
                        continue;
                    }
                    erri = 1;
                    return "";
                case 3:
                    if (ch == '\n' || ch == ' ') {
                        continue;
                    }
                    if (ch == '}') {
                        return oStr;
                    }
                    if (ch == ',') {
                        oStr += "\n,";
                        step = 0;
                        continue;
                    }
                    erri = 1;
                    return "";

            }
        }
        return "";
    }

    public String toJsArray() {
        char ch;
        String oStr = "";
        while (nowInx < len) {
            oStr += toJsValue();
            if(erri==1)
                return "";
            while (nowInx < len) {
                ch = inStr.charAt(nowInx++);
                posx++;
                if (ch == '\n') {
                    posx = 0;
                    posy++;
                }
                if (ch == '\n' || ch == ' ') {
                    continue;
                }
                if (ch == ']') {
                    return oStr;
                }
                if (ch == ',') {
                    oStr+="\n,";
                    break;
                }
                erri = 1;
                return "";
            }
            continue;
        }
        erri = 1;
        return "";

    }

    public String toJsNumber() {
        int step = 0;
        int itemCnt = 0;
        int charCnt = 0;
        char ch;
        int yes;
        String oStr = "";
        int point = 0;
        while (nowInx < len) {
            ch = inStr.charAt(nowInx++);
            posx++;
            if (ch == '\n') {
                posx = 0;
                posy++;
            }
            switch (step) {
                case 0:
                    if (ch == '\n' || ch == ' ') {
                        continue;
                    }
                    if (ch == '-') {
                        step = 1;
                        oStr += ch;
                        continue;
                    }
                    if (ch == '.') {
                        step = 1;
                        point++;
                        oStr += ch;
                        continue;
                    }
                    if (ch >= '0' && ch <= '9') {
                        oStr += ch;
                        step = 1;
                        continue;
                    }
                    erri = 1;
                    return "";
                case 1:
                    if (ch >= '0' && ch <= '9') {
                        oStr += ch;
                        continue;
                    }
                    if (ch == '.') {
                        point++;
                        if (point >= 2) {
                            erri = 1;
                            return "";
                        }
                        oStr += ch;
                        continue;
                    }
                    if (ch == '}' || ch == ']' || ch == ',') {
                        nowInx--;
                        posx--;
                        return oStr;
                    }
                    if (ch == ' ' || ch == '\n') {
                        step = 2;
                        continue;
                    }
                    erri = 1;
                    return "";
                case 2:
                    if (ch == '}' || ch == ']' || ch == ',') {
                        nowInx--;
                        posx--;
                        return oStr;
                    }
                    if (ch == ' ' || ch == '\n') {
                        continue;
                    }
                    erri = 1;
                    return "";
            }
        }
        erri = 1;
        return "";
    }

    public String toJsString() {
        int step = 0;
        int itemCnt = 0;
        int charCnt = 0;
        char ch;
        int yes;
        String oStr = "";
        while (nowInx < len) {
            ch = inStr.charAt(nowInx++);
            posx++;
            if (ch == '\n') {
                posx = 0;
                posy++;
            }
            switch (step) {
                case 0:
                    if (ch == '"') {
                        if (nowInx >= 0 && inStr.charAt(nowInx - 1) == '\\') {
                            oStr += ch;
                            continue;
                        }
                        step = 1;
                        continue;
                    }
                    oStr += ch;
                    continue;
                case 1:
                    if (ch == '\n' || ch == ' ') {
                        continue;
                    }
                    if (ch == '}' || ch == ']' || ch == ',') {
                        nowInx--;
                        posx--;
                        return oStr;
                    }
                    erri = 1;
                    return "";

            }

        }
        erri = 1;
        return "";
    }

    public String toJsValue() {
        int step = 0;
        int itemCnt = 0;
        int charCnt = 0;
        char ch;
        int yes;
        String oStr = "";
        int point = 0;
        while (nowInx < len) {
            ch = inStr.charAt(nowInx++);

            posx++;
            if (ch == '\n') {
                posx = 0;
                posy++;
            }
            if (ch == '\n' || ch == ' ') {
                continue;
            }
            if (ch == '{') {
                oStr += "\n{\n";
                loopCnt++;
                oStr += toJsKeyValue();
                if(erri==1)
                    return "";
                loopCnt--;
                oStr += "\n}\n";
                return oStr;
            }
            if (ch == '[') {
                oStr += "\n[\n";
                oStr += toJsArray();
                if(erri==1)
                    return "";
                oStr += "\n]\n";
                return oStr;
            }
            if (ch == '"') {
                oStr += "\"";
                oStr += toJsString();
                if(erri==1)
                    return "";
                oStr += "\"";
                return oStr;
            }
            if (ch == '-' || ch == '.') {
                nowInx--;
                posx--;
                oStr += toJsNumber();
                if(erri==1)
                    return "";
                return oStr;
            }
            if (ch >= '0' && ch <= '9') {
                nowInx--;
                posx--;
                oStr += toJsNumber();
                if(erri==1)
                    return "";
                return oStr;
            }
            if (ch == '}' || ch == ']' || ch == ',') {
                nowInx--;
                posx--;
                return oStr;
            }
            erri = 1;
            return "";
        }
        erri = 1;
        return "";
    }

    public void tobj() {
        char ch;
        int mm_i = 0;
        int array_i = 0;
        int pp_i = 0;
        while (nowInx < len) {
            ch = inStr.charAt(nowInx++);
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
