
//import com.mysql.cj.xdevapi.JsonParser;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.json.JSONArray;
import org.json.JSONException;
//import org.kevin.KvMysql;
import org.kevin.KvRedis;
import org.json.JSONObject;
import org.kevin.Root;
import org.kevin.Lib;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.util.Map;
import org.kevin.GB;
import org.kevin.HttpUrlConnection;
import org.kevin.Https;
import org.kevin.InfConn;
import org.kevin.MyMqtt;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author kevin
 */
public final class AdminServlet extends HttpServlet {

    /**
     *
     * @param request
     * @param response
     * @param resbonse
     * @throws ServletException
     * @throws IOException
     */
    String dbkey;
    String hdbKey;
    String hdbTable;
    RetData retData = new RetData();

    List<UserData> lsUserData = new ArrayList<>();
    List<KeyJson> lsDashboardData = new ArrayList<>();

    String[] strA;
    String filePath;
    HttpUrlConnection https;
    MyMqtt myMqtt;

    public AdminServlet() {
        int i, j, k;
        String userName;
        String userId;
        String password;
        String fatherName;
        Object jj, kk;
        String tt;
        JSONObject jsTmp;
        MenberInf miTmp;
        String sbuf;
        //===========================================================
        //myMqtt =new MyMqtt();
        //myMqtt.connect();
        //myMqtt.sub("kevin/test");

        //===========================================================
        int kevinAdmin_f = 0;
        int globalAdmin_f = 0;
        int demoAdmin_f = 0;
        int demoGuest_f = 0;

        if (hgetAll("systemUserId")) {
            int len = retData.lsKeyValue.size();
            for (i = 0; i < len; i++) {
                String key = retData.lsKeyValue.get(i).key;
                if (key.equals("systemUserId~kevin~admin")) {
                    kevinAdmin_f = 1;
                }
                if (key.equals("systemUserId~global~admin")) {
                    globalAdmin_f = 1;
                }
                if (key.equals("systemUserId~demo~admin")) {
                    demoAdmin_f = 1;
                }
                if (key.equals("systemUserId~demo~quest")) {
                    demoGuest_f = 1;
                }
                miTmp = MenberInf.toObj(retData.lsKeyValue.get(i).value);
                sbuf = miTmp.userName + "~" + miTmp.userId;
                lsUserData.add(new UserData(sbuf, miTmp, null));
            }
        }

        if (kevinAdmin_f == 0) {
            miTmp = new MenberInf();
            miTmp.userName = "kevin";
            miTmp.userId = "admin";
            miTmp.password = "1234";
            miTmp.userFather = "root";
            miTmp.permition = 0;
            miTmp.accountQuota = -1;
            miTmp.accountUsed = 0;
            miTmp.userQuota = -1;
            miTmp.priLevel = 0;
            miTmp.leftMenu = 1;
            miTmp.language = "chinese";
            lsUserData.add(new UserData("kevin~admin", miTmp, null));
        }
        if (globalAdmin_f == 0) {
            miTmp = new MenberInf();
            miTmp.userName = "global";
            miTmp.userId = "admin";
            miTmp.password = "1234";
            miTmp.userFather = "root";
            miTmp.permition = 100;
            miTmp.accountQuota = 0;
            miTmp.accountUsed = 0;
            miTmp.userQuota = 0;
            miTmp.priLevel = 100;
            miTmp.leftMenu = 1;
            miTmp.language = "english";
            lsUserData.add(new UserData("global~admin", miTmp, null));
        }
        if (demoAdmin_f == 0) {
            miTmp = new MenberInf();
            miTmp.userName = "demo";
            miTmp.userId = "admin";
            miTmp.password = "1234";
            miTmp.userFather = "root";
            miTmp.permition = 100;
            miTmp.accountQuota = 0;
            miTmp.accountUsed = 0;
            miTmp.userQuota = 0;
            miTmp.priLevel = 100;
            miTmp.leftMenu = 1;
            miTmp.language = "english";
            lsUserData.add(new UserData("demo~admin", miTmp, null));
        }

        if (demoGuest_f == 0) {
            miTmp = new MenberInf();
            miTmp.userName = "demo";
            miTmp.userId = "guest";
            miTmp.password = "0000";
            miTmp.userFather = "root~demo";
            miTmp.permition = 400;
            miTmp.accountQuota = 0;
            miTmp.accountUsed = 0;
            miTmp.userQuota = 0;
            miTmp.priLevel = 400;
            miTmp.leftMenu = 1;
            miTmp.language = "english";
            lsUserData.add(new UserData("demo~guest", miTmp, null));
        }

        for (i = 0; i < lsUserData.size(); i++) {
            userName = lsUserData.get(i).menberInf.userName;
            userId = lsUserData.get(i).menberInf.userId;
            if (!"admin".equals(userId)) {
                continue;
            }
            if (getHashData(userName)) {
                lsDashboardData.add(new KeyJson(userName, this.retData.valueStr));
            }
        }

        for (i = 0; i < lsUserData.size(); i++) {
            userName = lsUserData.get(i).menberInf.userName;
            for (j = 0; j < lsDashboardData.size(); j++) {
                if (lsDashboardData.get(j).key.equals(userName)) {
                    lsUserData.get(i).dashboardData = lsDashboardData.get(j);
                    break;
                }
            }
        }

        try {
            Https.igoreVerify();
        } catch (Exception ex) {
            ex.printStackTrace();
            Logger.getLogger(AdminServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public void init() {
        https = new HttpUrlConnection();
        https.create();
        //https.addUrl("test", "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/M-A0060-000?Authorization=CWB-353E9535-CCA8-48B4-9C00-9A9B094A23E7&downloadType=WEB&format=JSON", 10000);

    }

//for Preflight
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        System.out.println("doOptions");
        fixHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    private void fixHeaders(HttpServletResponse response) {
        /*
        response.setContentType("text/html");
        response.setHeader("Cache-control", "no-cache, no-store");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Expires", "-1");

        response.addHeader("Access-Control-Allow-Origin", "*"); // 授權的網址，星號代表接受所有
        response.addHeader("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS, DELETE"); // 接受的方式
        response.addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Content-Length");
        response.addHeader("Access-Control-Max-Age", "86400");
         */
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        fixHeaders(response);
        boolean isMultipart = ServletFileUpload.isMultipartContent(request);

        if (isMultipart) {
            //int maxFileSize = 50 * 1024;
            //int maxMemSize = 4 * 1024;
            File file;

            DiskFileItemFactory factory = new DiskFileItemFactory();
            // maximum size that will be stored in memory
            //factory.setSizeThreshold(maxMemSize);
            // Location to save data that is larger than maxMemSize.
            factory.setRepository(new File("c:\\temp"));
            // Create a new file upload handler
            ServletFileUpload upload = new ServletFileUpload(factory);
            // maximum file size to be uploaded.
            //upload.setSizeMax(maxFileSize);
            try {
                // Parse the request to get file items.
                List fileItems = upload.parseRequest(request);
                // Process the uploaded file items
                Iterator i = fileItems.iterator();
                while (i.hasNext()) {
                    FileItem fi = (FileItem) i.next();
                    //if (!fi.isFormField()) {
                    if (!fi.isFormField()) {
                        // Get the uploaded file parameters
                        String fieldName = fi.getFieldName();
                        String fileName = fi.getName();
                        String contentType = fi.getContentType();
                        boolean isInMemory = fi.isInMemory();
                        long sizeInBytes = fi.getSize();

                        System.out.println("fieldName=  " + fieldName);
                        System.out.println("fileName=  " + fileName);
                        System.out.println("contentType=  " + contentType);
                        System.out.println("isInMemory=  " + isInMemory);
                        System.out.println("sizeInBytes=  " + sizeInBytes);
                        String[] strF = fieldName.split("~");
                        switch (strF[0]) {
                            case "saveFileToDir":
                                JSONObject outJo = new JSONObject();
                                JSONObject outOpts = new JSONObject();
                                putJos(outJo, "name", "response ok");
                                putJos(outJo, "type", "Commands OK !");
                                putJoo(outJo, "opts", outOpts);
                                response.setContentType("application/json;charset=utf-8");//指定返回的格式为JSON格式
                                PrintWriter out = response.getWriter();
                                out.print(outJo);
                                out.close();
                                filePath = Root.sSrcPath + strF[1] + "/";
                                file = new File(filePath + fileName);
                                fi.write(file);
                                break;

                        }

                    }
                }
            } catch (Exception ex) {
                ex.printStackTrace();
                return;
            }
            return;
        }

        request.setCharacterEncoding("UTF-8");
        StringBuilder myJson = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        String inpStr;

        //boolean isMultipart = ServletFileUpload.isMultipartContent(request);
        //==========================================================
        String ipAddress = request.getHeader("X-FORWARDED-FOR");
        if (ipAddress == null) {
            ipAddress = request.getRemoteAddr();
        }
        Lib.p1("Connect ip= " + ipAddress);
        //==========================================================

        while ((line = reader.readLine()) != null) {
            myJson.append(line);
        }
        inpStr = myJson.toString();
        JSONObject outJo = new JSONObject();
        try {
            switch (inpStr.charAt(0)) {
                case '[': {
                    JSONArray ja = new JSONArray(inpStr);
                    JSONObject inpJo = new JSONObject();
                    inpJo.put("a", ja);
                    anaJoA(inpJo, outJo);
                    break;
                }
                case '{': {
                    JSONObject inpJo = new JSONObject(inpStr);
                    if (!inpJo.get("name").toString().equals("commands")) {
                        anaJo(inpJo, outJo);
                        break;
                    }
                    //commands 
                    //{name:"commands",type:"xxxx",opts:{userName:"xxxx",objs:[{action:"xxxx",key:"xxxx",value:"xxxx"}]}

                    JSONObject newInpJo;
                    JSONObject newInpJoOpts;
                    JSONObject newOutJo;
                    JSONObject jsObj;
                    JSONObject inJsOpts = new JSONObject(inpJo.get("opts").toString());
                    String actionStr;
                    String keyStr;
                    String valueStr;

                    String userName = inJsOpts.get("userName").toString();
                    //System.out.println("userName= "+userName);
                    JSONArray objsArray = inJsOpts.getJSONArray("objs");
                    int objsArrayLen = objsArray.length();
                    int inx;
                    for (inx = 0; inx < objsArrayLen; inx++) {
                        //System.out.println("objsArray= "+objsArray.get(i));
                        jsObj = new JSONObject(objsArray.get(inx).toString());
                        actionStr = getJos(jsObj, "action");
                        keyStr = getJos(jsObj, "key");
                        valueStr = getJos(jsObj, "value");
                        //======================================================
                        newInpJo = new JSONObject();
                        newInpJoOpts = new JSONObject();
                        newOutJo = new JSONObject();
                        putJos(newInpJoOpts, "table", userName);
                        putJos(newInpJoOpts, "key", keyStr);
                        putJos(newInpJoOpts, "value", valueStr);
                        //======================================================
                        putJos(newInpJo, "name", actionStr);
                        putJos(newInpJo, "type", "");
                        putJoo(newInpJo, "opts", newInpJoOpts);
                        anaJo(newInpJo, newOutJo);
                        if (newOutJo.get("name").toString().equals("response error")) {
                            outJo = newOutJo;
                            break;
                        }
                    }
                    if (inx != objsArrayLen) {
                        break;
                    }
                    JSONObject outOpts = new JSONObject();
                    System.out.println("inJsOpts= " + inJsOpts);
                    setRespAction(inJsOpts, outJo, outOpts);
                    putJos(outJo, "type", "Commands OK !");
                    putJoo(outJo, "opts", outOpts);
                    break;
                }
                default:
                    anaStr(inpStr, outJo);
                    break;
            }

        } catch (JSONException ex) {
            ex.printStackTrace();
            Logger.getLogger(AdminServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        //Object jsonOb = j.getJSONObject("Data").getJSONArray("Phone").get(0);
        //System.out.println(jsonOb);        
        //===============================================
        //response.setContentType("text/html; charset=utf-8");
        //String a = "任意内容";
        //PrintWriter out = response.getWriter();
        //out.write(a);        
        //out.close();
        //====================================================
        response.setContentType("application/json;charset=utf-8");//指定返回的格式为JSON格式
        // response.setHeader("Access-Control-Allow-Origin","*"); 

        PrintWriter outPrint = response.getWriter();
        outPrint.print(outJo);

        outPrint.close();

    }

    public String getJos(JSONObject jo, String key) {
        try {
            return jo.get(key).toString();
        } catch (JSONException ex) {
            return "";
        }
    }

    public void putJos(JSONObject jo, String key, Object value) {
        try {
            //jo.accumulate(key, value);  //if exist trans to array
            jo.put(key, value);//添加元素
            //jo.append(key, value);
        } catch (JSONException ex) {
            ex.printStackTrace();
            Logger.getLogger(AdminServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void putJoo(JSONObject jo, String key, JSONObject joo) {
        try {
            jo.put(key, joo);//添加元素
        } catch (JSONException ex) {
            ex.printStackTrace();
            Logger.getLogger(AdminServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void anaJoA(JSONObject in, JSONObject out) {
        //in.get(0).getJSONObject("Data").getJSONArray("Phone").get(0);        
        Object obj;
        JSONObject jsObj;
        String jsStr;
        Object value;
        try {
            obj = in.getJSONArray("a").get(0);
            System.out.println(obj);
            jsObj = new JSONObject(obj.toString());
            value = jsObj.get("name");
            System.out.println(value);

        } catch (JSONException ex) {
            ex.printStackTrace();
            Logger.getLogger(AdminServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public boolean jsobjGet(JSONObject in, String name) {
        this.retData.err_f = false;
        try {
            this.retData.retStr = in.get(name).toString();

        } catch (JSONException ex) {
            this.retData.err_f = true;
            return false;
        }
        return true;
    }

    public boolean jsGet(JSONObject in, String name) {
        this.retData.err_f = false;
        try {
            this.retData.retObj = in.get(name);//.toString();
            Class cls = this.retData.retObj.getClass();
            String type = cls.getSimpleName();
            switch (type) {
                case "String":
                    this.retData.retStr = (String) this.retData.retObj;
                    break;
                case "Integer":
                    this.retData.reti = (int) this.retData.retObj;
                    break;
                case "Double":
                case "Float":
                    this.retData.retf = (float) this.retData.retObj;
                    break;
                default:
                    this.retData.retStr = this.retData.retObj.toString();
            }
        } catch (JSONException ex) {
            this.retData.err_f = true;
            return false;
        }
        return true;
    }

    public boolean setDbkey(JSONObject opts) {
        this.dbkey = null;
        this.hdbKey = null;
        this.hdbTable = null;

        jsobjGet(opts, "key");
        if (this.retData.err_f) {
            return false;
        }
        this.dbkey = this.retData.retStr;
        this.hdbKey = this.retData.retStr;
        jsobjGet(opts, "table");
        if (this.retData.err_f) {
            return true;
            //this.retData.retStr="empty";
        }
        this.hdbTable = this.retData.retStr;
        this.dbkey = this.retData.retStr + "~" + this.dbkey;
        return true;
    }

    public boolean setSecondKey(JSONObject opts) {
        this.dbkey = null;
        jsobjGet(opts, "secondKey");
        if (this.retData.err_f) {
            return false;
        }
        this.dbkey = this.retData.retStr;
        jsobjGet(opts, "table");
        if (this.retData.err_f) {
            return true;
            //this.retData.retStr="empty";
        }
        this.dbkey = this.retData.retStr + "~" + this.dbkey;
        return true;
    }

    public boolean chkSaveFile(JSONObject opts, String inStr) {
        String fileName;
        FileOutputStream outfile;
        jsobjGet(opts, "saveFileName");
        if (this.retData.err_f) {
            return true;
        }
        fileName = Root.sSrcPath + this.retData.retStr;
        return Lib.saveFile(fileName, inStr);
    }

    //=========================================================
    public boolean saveFile(String _fileName, String inStr) {
        String fileName;
        FileOutputStream outfile;
        try {
            fileName = Root.sSrcPath + _fileName;
            outfile = new FileOutputStream(fileName);
            outfile.write(inStr.getBytes());
            outfile.close();
            return true;
        } catch (FileNotFoundException ex) {
            ex.printStackTrace();
            return false;
        } catch (IOException ex) {
            ex.printStackTrace();
            return false;
        }
    }
    //=========================================================

    public void setRespAction(JSONObject opts, JSONObject out, JSONObject outOpts) {
        jsobjGet(opts, "responseType");
        if (this.retData.err_f) {
            putJos(out, "name", "response none");
        } else {
            switch (this.retData.retStr) {
                case "response ok":
                    putJos(out, "name", "response ok");
                    break;
                case "response error message ok":
                case "message ok":
                    putJos(out, "name", "message ok");
                    break;
                default:
                    putJos(out, "name", "response none");
                    break;
            }
        }
        jsobjGet(opts, "messageTime");
        if (!this.retData.err_f) {
            putJos(outOpts, "messageTime", this.retData.retStr);
        }

        jsobjGet(opts, "responseAction");
        if (!this.retData.err_f) {
            putJos(outOpts, "responseAction", this.retData.retStr);
        }
        jsobjGet(opts, "callBackFunc");
        if (!this.retData.err_f) {
            putJos(outOpts, "callBackFunc", this.retData.retStr);
        }
        jsobjGet(opts, "loadToElemId");
        if (!this.retData.err_f) {
            putJos(outOpts, "loadToElemId", this.retData.retStr);
        }
        jsobjGet(opts, "saveVar");
        if (!this.retData.err_f) {
            putJos(outOpts, "saveVar", this.retData.retStr);
        }
    }

    public String addUserData(String userName, String userData) {
        List<String> lsClassName;
        String userClassNames;
        lsClassName = Lib.getFileClassNames(Root.sSrcPath + "user-" + userName + "/userLib.js",
                new String[]{"classStart=<", ">", "classEnd=<", ">"});
        userClassNames = "{\"key\":\"" + userName + "~userClassNames\",\"value\":\"";
        for (int i = 0; i < lsClassName.size(); i++) {
            if (i != 0) {
                userClassNames += "~";
            }
            userClassNames += lsClassName.get(i);
        }
        userClassNames += "\"}";
        String valueStr = userData.substring(0, userData.length() - 1);
        if (valueStr.length() > 2) {
            valueStr += ",";
        }
        valueStr += userClassNames;

        if (!userName.equals("global")) {
            getUserData("global", "admin", "1234");
            if (!this.retData.err_f) {
                String globStr = this.retData.valueStr.substring(1, this.retData.valueStr.length() - 1);
                if (globStr.length() != 0) {
                    valueStr += "," + globStr;
                }
            }

            lsClassName = Lib.getFileClassNames(Root.sSrcPath + "user-" + "global" + "/userLib.js",
                    new String[]{"classStart=<", ">", "classEnd=<", ">"});
            userClassNames = "{\"key\":\"" + "global" + "~userClassNames\",\"value\":\"";
            for (int i = 0; i < lsClassName.size(); i++) {
                if (i != 0) {
                    userClassNames += "~";
                }
                userClassNames += lsClassName.get(i);
            }
            userClassNames += "\"}";
            valueStr += "," + userClassNames;
        }
        valueStr += "]";
        return valueStr;
    }

    public void anaJo(JSONObject in, JSONObject out) {
        Object obj;
        String action;
        String type;
        JSONObject opts;
        JSONArray jar;
        String table;
        String key;
        String value;
        String dbKey;
        Iterator<String> it;
        JSONObject outOpts = new JSONObject();
        FileOutputStream outfile;
        String getKey;
        String bufStr;
        String outStr;
        String fileName;
        String userName;
        String userId;
        String password;
        String userNameId;

        String userSetData;
        String typeStr;
        String initDir;
        String valueStr;

        String registerName;
        String registerUserId;
        String responseType = "response none";
        JSONArray jaUserSet;
        String inpKey;
        String inpValue;
        File tempFile;
        String tempError;
        String userFather;

        String dataType;
        JSONObject jsTmp;
        UserData udBuf;
        MenberInf miTmp;

        boolean err_f;
        int ibuf;
        //jar = opts.getJSONArray("backgroundColors");
        //jar.get(0);jar.length
        try {
            action = in.get("name").toString();
            type = in.get("type").toString();
            opts = new JSONObject(in.get("opts").toString());
            //System.out.println(action);
            //==============================================================
            //jar = opts.getJSONObject("opts").getJSONArray("backgroundColors");
            //System.out.println("opts.colors: "+opts.getJSONObject("opts").getJSONArray("backgroundColors"));
            //==============================================================

            if (jsobjGet(opts, "responseType")) {
                responseType = this.retData.retStr;
                switch (responseType) {
                    case "response ok":
                    case "response error":
                    case "response error message ok":
                        putJos(out, "name", "response error");
                        break;
                    case "message ok":
                    case "message error":
                        putJos(out, "name", "message error");
                        break;
                    default:
                        putJos(out, "name", responseType);
                        break;
                }
            } else {
                putJos(out, "name", responseType);
            }
            putJos(out, "type", "Server Error!");
            putJoo(out, "opts", outOpts);
            switch (action) {

                case "test1":
                    System.out.println("============================");
                    System.out.println("Server Test 1 Call By Client");
                    setRespAction(opts, out, outOpts);
                    //putJos(outOpts, "value", content);
                    putJos(out, "name", "response ok");
                    putJos(out, "type", "Call Test1 OK !");
                    putJoo(out, "opts", outOpts);

                    break;
                case "test2":
                    System.out.println("============================");
                    System.out.println("Server Test 2 Call By Client");
                    setRespAction(opts, out, outOpts);
                    //putJos(outOpts, "value", content);
                    putJos(out, "name", "response ok");
                    putJos(out, "type", "Call Test2 OK !");
                    putJoo(out, "opts", outOpts);
                    break;

                case "saveUserDataToHash":
                    putJos(out, "type", "Save Hash Error!");
                    if (!jsobjGet(opts, "userName")) {
                        break;
                    }
                    userName = this.retData.retStr;
                    //================================
                    if (!jsobjGet(opts, "userId")) {
                        break;
                    }
                    userId = this.retData.retStr;
                    //================================
                    if (!jsobjGet(opts, "password")) {
                        break;
                    }
                    password = this.retData.retStr;
                    if (!getUserData(userName, userId, password)) {
                        break;
                    }

                    jaUserSet = new JSONArray(this.retData.valueStr);
                    for (int i = 0; i < jaUserSet.length(); i++) {
                        JSONObject actObj = new JSONObject(jaUserSet.get(i).toString());
                        if (!jsobjGet(actObj, "key")) {
                            continue;
                        }
                        inpKey = this.retData.retStr;
                        if (!jsobjGet(actObj, "value")) {
                            continue;
                        }
                        inpValue = this.retData.retStr;
                        if (!KvRedis.keyOp("hset", new String[]{"hash~" + userName, inpKey, inpValue})) {
                            break;
                        }
                    }

                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Save To Hash OK");
                    putJoo(out, "opts", outOpts);
                    break;
                case "delUserDataFromHash":
                    putJos(out, "type", "Delete Hash Error!");
                    if (!jsobjGet(opts, "userName")) {
                        break;
                    }
                    userName = this.retData.retStr;
                    //================================
                    if (!jsobjGet(opts, "userId")) {
                        break;
                    }
                    userId = this.retData.retStr;
                    //================================
                    if (!jsobjGet(opts, "password")) {
                        break;
                    }
                    password = this.retData.retStr;
                    //=================================
                    if (!chkLogin(userName, userId, password)) {
                        break;
                    }
                    if (!KvRedis.keyOp("hdelall", new String[]{"hash~" + userName})) {
                        break;
                    }
                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Delete from Hash OK");
                    putJoo(out, "opts", outOpts);
                    break;
                case "read file":
                    putJos(out, "type", "Read File Error!");
                    if (!jsobjGet(opts, "fileName")) {
                        this.retData.retStr = "testOut.js";
                    }
                    fileName = Root.sSrcPath + this.retData.retStr;
                    String content = "";

                    try (BufferedReader reader = Files.newBufferedReader(Paths.get(fileName))) {
                        // Read from the stream
                        String currentLine;
                        while ((currentLine = reader.readLine()) != null) {
                            content += currentLine + "\n";
                        }
                    } catch (IOException ex) {
                        ex.printStackTrace();
                        Lib.prt(ex.toString());
                        putJos(out, "type2", ex.toString());
                        break;
                        // Handle file I/O exception...
                    }
                    Lib.prt(content);
                    setRespAction(opts, out, outOpts);
                    putJos(outOpts, "value", content);
                    typeStr = "Read File OK! ";
                    putJos(out, "name", "response none");
                    putJos(out, "type", typeStr);
                    putJoo(out, "opts", outOpts);
                    break;

                case "copy file":
                    putJos(out, "type", "Copy File Error!");
                    if (!jsobjGet(opts, "fromFileName")) {
                        break;
                    }
                    String fromFileName = Root.sSrcPath + this.retData.retStr;

                    if (!jsobjGet(opts, "toFileName")) {
                        break;
                    }
                    String toFileName = Root.sSrcPath + this.retData.retStr;

                    File file = new File(fromFileName);
                    if (!file.exists()) {
                        putJos(out, "type", "File Source Is Not Exist !!!");
                        break;
                    }
                    
                    if (!jsobjGet(opts, "overWrite")) {
                        file = new File(toFileName);
                        if (file.exists() && !file.isDirectory()) {
                            putJos(out, "type", "File Destination Is Exist !!!");
                            break;
                        }
                    }

                    if (Lib.copyFile(fromFileName, toFileName) != 0) {
                        break;
                    }

                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Copy File OK");
                    putJoo(out, "opts", outOpts);
                    break;

                case "save to file":
                    putJos(out, "type", "Save To File Error!");
                    if (!jsobjGet(opts, "fileName")) {
                        break;
                    }
                    fileName = Root.sSrcPath + this.retData.retStr;
                    if (!jsobjGet(opts, "value")) {
                        break;
                    }
                    System.out.println("fileName= " + fileName);

                    Writer outf = new BufferedWriter(new OutputStreamWriter(
                            new FileOutputStream(fileName), "UTF-8"));
                    try {
                        outf.write(this.retData.retStr);
                    } finally {
                        outf.close();
                    }
                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Save To File OK");
                    putJoo(out, "opts", outOpts);
                    break;

                case "export file":
                    putJos(out, "type", "Save To File Error!");
                    if (!jsobjGet(opts, "fileName")) {
                        break;
                    }
                    fileName = this.retData.retStr;
                    if (!jsobjGet(opts, "initDir")) {
                        break;
                    }
                    initDir = this.retData.retStr;
                    if (!jsobjGet(opts, "userName")) {
                        break;
                    }
                    userName = this.retData.retStr;
                    if (!jsobjGet(opts, "userId")) {
                        break;
                    }
                    userId = this.retData.retStr;
                    //================================
                    if (!jsobjGet(opts, "password")) {
                        break;
                    }
                    password = this.retData.retStr;
                    //================================
                    if (!getUserData(userName, userId, password)) {
                        break;
                    }
                    userSetData = this.retData.valueStr;
                    fileName = Root.sSrcPath + initDir + fileName + ".sav";
                    System.out.println("fileName= " + fileName);
                    outfile = new FileOutputStream(fileName);
                    outfile.write(userSetData.getBytes());
                    outfile.close();
                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Save To File OK");
                    putJoo(out, "opts", outOpts);
                    break;

                case "export help file":
                    putJos(out, "type", "Save To File Error!");
                    if (!jsobjGet(opts, "fileName")) {
                        break;
                    }
                    fileName = this.retData.retStr;
                    if (!jsobjGet(opts, "initDir")) {
                        break;
                    }
                    initDir = this.retData.retStr;
                    if (!jsobjGet(opts, "userName")) {
                        break;
                    }
                    userName = this.retData.retStr;
                    if (!jsobjGet(opts, "userId")) {
                        break;
                    }
                    userId = this.retData.retStr;
                    //================================
                    if (!jsobjGet(opts, "password")) {
                        break;
                    }
                    password = this.retData.retStr;
                    //================================
                    putJos(out, "type", "Permition denied !");
                    if (!userName.equals("global")) {
                        break;
                    }
                    if (!userId.equals("admin")) {
                        break;
                    }
                    if (!getHashData("help")) {
                        putJos(out, "type", "No Help data !");
                        break;
                    }
                    userSetData = this.retData.valueStr;
                    fileName = Root.sSrcPath + initDir + fileName + ".hlp";
                    System.out.println("fileName= " + fileName);
                    outfile = new FileOutputStream(fileName);
                    outfile.write(userSetData.getBytes());
                    outfile.close();
                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Save To File OK");
                    putJoo(out, "opts", outOpts);
                    break;

                case "inport file":
                    putJos(out, "type", "Inport File Error!");
                    if (!jsobjGet(opts, "fileName")) {
                        break;
                    }
                    fileName = this.retData.retStr;
                    if (!jsobjGet(opts, "initDir")) {
                        break;
                    }
                    initDir = this.retData.retStr;
                    if (!jsobjGet(opts, "userName")) {
                        break;
                    }
                    userName = this.retData.retStr;
                    //=================================
                    if (!jsobjGet(opts, "userId")) {
                        break;
                    }
                    userId = this.retData.retStr;
                    //================================
                    if (!jsobjGet(opts, "password")) {
                        break;
                    }
                    password = this.retData.retStr;
                    //==================================
                    fileName = Root.sSrcPath + initDir + fileName;
                    userSetData = Lib.fileToString(fileName);

                    if (!userSetData.equals("")) {
                        KvRedis.keyOp("del", new String[]{"hash~" + userName});
                        jaUserSet = new JSONArray(userSetData);
                        String usKey, usValue;
                        for (int i = 0; i < jaUserSet.length(); i++) {
                            JSONObject actObj = new JSONObject(jaUserSet.get(i).toString());
                            if (!jsobjGet(actObj, "key")) {
                                continue;
                            }
                            usKey = this.retData.retStr;
                            if (!jsobjGet(actObj, "value")) {
                                continue;
                            }
                            usValue = this.retData.retStr;
                            if (!KvRedis.keyOp("Hset", new String[]{usKey, usValue})) {
                                break;
                            }
                        }
                    }

                    setRespAction(opts, out, outOpts);
                    putJos(outOpts, "action", "loadUserSet");
                    putJos(outOpts, "value", userSetData);
                    putJos(outOpts, "menberInf", getMenberInf(userName, userId, password));
                    putJos(outOpts, "dataServerStatus", GB.dataServerStatus);
                    putJos(out, "type", "Get User Data OK");
                    putJoo(out, "opts", outOpts);

                    break;

                case "inport help file":
                    putJos(out, "type", "Inport File Error!");
                    if (!jsobjGet(opts, "fileName")) {
                        break;
                    }
                    fileName = this.retData.retStr;
                    if (!jsobjGet(opts, "initDir")) {
                        break;
                    }
                    initDir = this.retData.retStr;
                    if (!jsobjGet(opts, "userName")) {
                        break;
                    }
                    userName = this.retData.retStr;
                    //=================================
                    if (!jsobjGet(opts, "userId")) {
                        break;
                    }
                    userId = this.retData.retStr;
                    //================================
                    if (!jsobjGet(opts, "password")) {
                        break;
                    }
                    password = this.retData.retStr;
                    //==================================
                    fileName = Root.sSrcPath + initDir + fileName;
                    userSetData = Lib.fileToString(fileName);

                    if (!userSetData.equals("")) {
                        KvRedis.keyOp("del", new String[]{"hash~help"});
                        jaUserSet = new JSONArray(userSetData);
                        String usKey, usValue;
                        for (int i = 0; i < jaUserSet.length(); i++) {
                            JSONObject actObj = new JSONObject(jaUserSet.get(i).toString());
                            if (!jsobjGet(actObj, "key")) {
                                continue;
                            }
                            usKey = this.retData.retStr;
                            if (!jsobjGet(actObj, "value")) {
                                continue;
                            }
                            usValue = this.retData.retStr;
                            if (!KvRedis.keyOp("Hset", new String[]{usKey, usValue})) {
                                break;
                            }
                        }
                    }

                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Inport Help Data OK");
                    putJoo(out, "opts", outOpts);
                    break;

                case "test server":
                    JSONObject res = null;
                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Test Server OK");
                    putJoo(out, "opts", outOpts);
                    break;
                case "tick":
                    JSONArray tickActDatas = new JSONArray();
                    String destinationType;
                    String destinationId;
                    JSONObject actOut;
                    InfConn infConn = null;

                    if (jsobjGet(opts, "tickActions")) {
                        JSONArray tickActs = new JSONArray(this.retData.retStr);
                        for (int i = 0; i < tickActs.length(); i++) {
                            JSONObject actObj = new JSONObject(tickActs.get(i).toString());
                            if (!jsobjGet(actObj, "actionName")) {
                                continue;
                            }
                            String actionName = this.retData.retStr;
                            valueStr = "{}";
                            switch (actionName) {
                                case "getData":
                                    if (!jsobjGet(actObj, "destinationType")) {
                                        break;
                                    }
                                    destinationType = this.retData.retStr;//userInput/
                                    //====
                                    if (!jsobjGet(actObj, "destinationId")) {
                                        break;
                                    }
                                    destinationId = this.retData.retStr; //id
                                    //====
                                    if (!jsobjGet(actObj, "dataType")) {
                                        break;
                                    }
                                    dataType = this.retData.retStr;      //Number,String,Json
                                    //====
                                    if (!jsobjGet(actObj, "sourceType")) {
                                        break;
                                    }
                                    String sourceType = this.retData.retStr;    //address
                                    //=======================================================================
                                    if (sourceType.equals("Url")) {
                                        if (!jsobjGet(actObj, "urlAddress")) {
                                            break;
                                        }
                                        String urlAddress = this.retData.retStr;
                                        //====
                                        if (!jsobjGet(actObj, "urlName")) {
                                            break;
                                        }
                                        String urlName = this.retData.retStr;
                                        //====
                                        if (!jsobjGet(actObj, "urlPeriodTime")) {
                                            break;
                                        }
                                        long urlPeriodTime = Lib.str2long(this.retData.retStr, 10000);
                                        //====
                                        long chksum = 0;
                                        if (jsobjGet(actObj, "chksum")) {
                                            chksum = Lib.str2long(this.retData.retStr, 0);
                                        }
                                        //====
                                        int len = https.lsInfConn.size();
                                        int sameUrl_f = 0;
                                        for (int j = 0; j < len; j++) {
                                            infConn = https.lsInfConn.get(j);
                                            if (infConn.url.equals(urlAddress)) {
                                                String paraCheck;
                                                paraCheck = sourceType + urlName + urlAddress + urlPeriodTime;
                                                if (!infConn.paraCheck.equals(paraCheck)) {

                                                }
                                                sameUrl_f = 1;
                                                JSONObject jsObj = new JSONObject();
                                                jsObj.put("name", infConn.name);
                                                jsObj.put("errorData", infConn.errorData);
                                                jsObj.put("dataPresent_f", infConn.dataPresent_f);
                                                jsObj.put("connSta", infConn.connSta);
                                                jsObj.put("chksum", infConn.chksum);
                                                if (infConn.chksum != chksum) {
                                                    jsObj.put("chksumSta", "new chksum");
                                                    jsObj.put("okData", infConn.okData);    //real data
                                                    valueStr = jsObj.toString();
                                                } else {
                                                    jsObj.put("chksumSta", "same chksum");
                                                    valueStr = jsObj.toString();
                                                }
                                                break;
                                            }
                                        }
                                        if (sameUrl_f == 0) {
                                            https.addUrl(sourceType, urlName, urlAddress, urlPeriodTime);
                                        }
                                    }
                                    //=======================================================================
                                    if (sourceType.equals("Redis")) {
                                        if (!jsobjGet(actObj, "urlAddress")) {
                                            break;
                                        }
                                        String urlAddress = this.retData.retStr;
                                        //====
                                        if (!jsobjGet(actObj, "urlPort")) {
                                            break;
                                        }
                                        int urlPort = Lib.str2int(this.retData.retStr, 10000);
                                        //====
                                        if (!jsobjGet(actObj, "urlName")) {
                                            break;
                                        }
                                        String urlName = this.retData.retStr;
                                        //====
                                        if (!jsobjGet(actObj, "urlPeriodTime")) {
                                            break;
                                        }
                                        long urlPeriodTime = Lib.str2long(this.retData.retStr, 10000);
                                        //====
                                        if (!jsobjGet(actObj, "userName")) {
                                            break;
                                        }
                                        String urlUserName = this.retData.retStr;
                                        //====
                                        if (!jsobjGet(actObj, "password")) {
                                            break;
                                        }
                                        String urlPassword = this.retData.retStr;
                                        //====
                                        if (!jsobjGet(actObj, "databaseTable")) {
                                            break;
                                        }
                                        String databaseTable = this.retData.retStr;
                                        //====
                                        if (!jsobjGet(actObj, "databaseKey")) {
                                            break;
                                        }
                                        String databaseKey = this.retData.retStr;
                                        //====
                                        if (!jsobjGet(actObj, "timeout")) {
                                            break;
                                        }
                                        int timeout = Lib.str2int(this.retData.retStr, 2000);
                                        //====
                                        long chksum = 0;
                                        if (jsobjGet(actObj, "chksum")) {
                                            chksum = Lib.str2long(this.retData.retStr, 0);
                                        }
                                        //=======================================================
                                        int len = https.lsInfConn.size();
                                        int sameUrl_f = 0;
                                        int samePara_f = 0;
                                        int sameLink_f = 0;
                                        int j;

                                        for (j = 0; j < len; j++) {
                                            infConn = https.lsInfConn.get(j);
                                            if (!infConn.name.equals(urlName)) {
                                                continue;
                                            }
                                            if (!infConn.url.equals(urlAddress)) {
                                                continue;
                                            }
                                            if (infConn.port != urlPort) {
                                                continue;
                                            }
                                            if (!infConn.databaseTable.equals(databaseTable)) {
                                                continue;
                                            }
                                            if (!infConn.databaseKey.equals(databaseKey)) {
                                                continue;
                                            }
                                            sameLink_f = 1;
                                            if (!infConn.type.equals(sourceType)) {
                                                break;
                                            }
                                            if (infConn.periodTime != urlPeriodTime) {
                                                break;
                                            }
                                            if (!infConn.userName.equals(urlUserName)) {
                                                break;
                                            }
                                            if (!infConn.password.equals(urlPassword)) {
                                                break;
                                            }
                                            if (infConn.timeout != timeout) {
                                                break;
                                            }
                                            samePara_f = 1;
                                            break;
                                        }
                                        if (sameLink_f == 1 && samePara_f == 0) {
                                            https.td1_run_f = 0;
                                            https.lsInfConn.remove(j);
                                            https.td1_run_f = 1;
                                            sameLink_f = 0;
                                        }
                                        if (sameLink_f == 0) {
                                            https.lsInfConn.add(new InfConn(sourceType, urlName, urlAddress, urlPort, urlPeriodTime, urlUserName, urlPassword, databaseTable, databaseKey, timeout));
                                        }
                                        if (sameLink_f == 1 && samePara_f == 1) {
                                            JSONObject jsObj = new JSONObject();
                                            jsObj.put("name", infConn.name);
                                            jsObj.put("errorData", infConn.errorData);
                                            jsObj.put("dataPresent_f", infConn.dataPresent_f);
                                            jsObj.put("connSta", infConn.connSta);
                                            jsObj.put("chksum", infConn.chksum);
                                            if (infConn.chksum != chksum) {
                                                jsObj.put("chksumSta", "new chksum");
                                                jsObj.put("okData", infConn.okData);    //real data
                                                valueStr = jsObj.toString();
                                            } else {
                                                jsObj.put("chksumSta", "same chksum");
                                                valueStr = jsObj.toString();
                                            }
                                        }
                                    }
                                    actOut = new JSONObject();
                                    putJos(actOut, "actionName", actionName);
                                    putJos(actOut, "destinationType", destinationType);//system//userInput
                                    putJos(actOut, "destinationId", destinationId);
                                    putJos(actOut, "dataType", dataType);//json,string,number
                                    putJos(actOut, "value", valueStr);
                                    tickActDatas.put(actOut);
                                    break;
                                //============================================
                                case "setData":
                                    if (!jsobjGet(actObj, "destinationType")) {
                                        break;
                                    }
                                    destinationType = this.retData.retStr;//userInput/
                                    //====
                                    if (!jsobjGet(actObj, "destinationId")) {
                                        break;
                                    }
                                    destinationId = this.retData.retStr; //id
                                    //====
                                    if (!jsobjGet(actObj, "dataType")) {
                                        break;
                                    }
                                    dataType = this.retData.retStr;      //json,string
                                    //====
                                    if (!jsobjGet(actObj, "sourceType")) {
                                        break;
                                    }
                                    sourceType = this.retData.retStr;    //address
                                    //====
                                    if (sourceType.equals("Url")) {
                                    }
                                    if (sourceType.equals("Redis")) {
                                        if (!jsobjGet(actObj, "urlAddress")) {
                                            break;
                                        }
                                        String urlAddress = this.retData.retStr;
                                        //====
                                        if (!jsobjGet(actObj, "urlPort")) {
                                            break;
                                        }
                                        int urlPort = Lib.str2int(this.retData.retStr, 10000);
                                        //====
                                        if (!jsobjGet(actObj, "urlName")) {
                                            break;
                                        }
                                        String urlName = this.retData.retStr;
                                        //====
                                        if (!jsobjGet(actObj, "urlPeriodTime")) {
                                            break;
                                        }
                                        long urlPeriodTime = Lib.str2long(this.retData.retStr, 10000);
                                        //====
                                        if (!jsobjGet(actObj, "userName")) {
                                            break;
                                        }
                                        String urlUserName = this.retData.retStr;
                                        //====
                                        if (!jsobjGet(actObj, "password")) {
                                            break;
                                        }
                                        String urlPassword = this.retData.retStr;
                                        //====
                                        if (!jsobjGet(actObj, "databaseTable")) {
                                            break;
                                        }
                                        String databaseTable = this.retData.retStr;
                                        //====
                                        if (!jsobjGet(actObj, "databaseKey")) {
                                            break;
                                        }
                                        String databaseKey = this.retData.retStr;
                                        //====
                                        if (!jsobjGet(actObj, "timeout")) {
                                            break;
                                        }
                                        int timeout = Lib.str2int(this.retData.retStr, 2000);
                                        //====
                                        if (!jsobjGet(actObj, "ioValue")) {
                                            break;
                                        }
                                        valueStr = this.retData.retStr;

                                        boolean bf;
                                        if (databaseTable.equals("")) {
                                            bf = KvRedis.keyOpAdr("set",
                                                    new String[]{databaseKey, valueStr},
                                                    new String[]{urlAddress, "" + urlPort, "" + timeout, urlPassword});
                                        } else {
                                            bf = KvRedis.keyOpAdr("hset",
                                                    new String[]{databaseTable, databaseKey, valueStr},
                                                    new String[]{urlAddress, "" + urlPort, "" + timeout, urlPassword});
                                        }
                                        if (bf) {
                                            valueStr = "Set Ok";
                                        } else {
                                            valueStr = "Set Error";
                                        }

                                    }
                                    actOut = new JSONObject();
                                    putJos(actOut, "actionName", actionName);
                                    putJos(actOut, "destinationType", destinationType);//system//userInput
                                    putJos(actOut, "destinationId", destinationId);
                                    putJos(actOut, "dataType", dataType);//json,string,number
                                    putJos(actOut, "value", valueStr);
                                    tickActDatas.put(actOut);
                                    break;

                            }
                        }
                    }

                    putJos(outOpts, "value", tickActDatas.toString());
                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Server Tick OK");
                    putJoo(out, "opts", outOpts);
                    break;

                case "save to model class libery":
                    putJos(out, "type", "Save To Model Class Libery Error!");
                    if (!jsobjGet(opts, "fileName")) {
                        break;
                    }
                    fileName = Root.sSrcPath + this.retData.retStr;

                    if (!jsobjGet(opts, "className")) {
                        break;
                    }
                    String className = this.retData.retStr;

                    if (!jsobjGet(opts, "value")) {
                        break;
                    }
                    Lib.log(this.retData.retStr);
                    Lib.getModelClassLib(fileName, new String[]{"classStart=<", ">", "classEnd=<", ">"});
                    Lib.saveModelClassLib(fileName, className, this.retData.retStr);

                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Save OK");
                    putJoo(out, "opts", outOpts);
                    break;
                case "remove class from model class libery":
                    putJos(out, "type", "Remov Class From Model Class Libery Error!");
                    if (!jsobjGet(opts, "fileName")) {
                        break;
                    }
                    fileName = Root.sSrcPath + this.retData.retStr;
                    if (!jsobjGet(opts, "className")) {
                        break;
                    }
                    String newClassName = this.retData.retStr;
                    Lib.getModelClassLib(fileName, new String[]{"classStart=<", ">", "classEnd=<", ">"});
                    Lib.removeModelClassLib(fileName, newClassName);
                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Remove Class OK");
                    putJoo(out, "opts", outOpts);
                    break;

                case "read image file names":
                    putJos(out, "type", "Read Image File Names Error!");
                    if (!jsobjGet(opts, "userName")) {
                        break;
                    }
                    userName = this.retData.retStr;
                    initDir = "user-" + userName;
                    if (jsobjGet(opts, "initDir")) {
                        initDir = this.retData.retStr;
                    }
                    ArrayList<String> fileNameList = new ArrayList<String>();
                    File folder = new File(Root.sSrcPath + initDir);
                    if (folder.exists() && folder.isDirectory()) {
                        File[] listOfFiles = folder.listFiles();
                        loop1:
                        for (int i = 0; i < listOfFiles.length; i++) {
                            if (listOfFiles[i].isFile()) {
                                fileName = listOfFiles[i].getName();
                                strA = fileName.split("\\.");
                                if (strA.length < 2) {
                                    continue;
                                }
                                while (true) {
                                    if (strA[strA.length - 1].equals("png")) {
                                        break;
                                    }
                                    if (strA[strA.length - 1].equals("bmp")) {
                                        break;
                                    }
                                    if (strA[strA.length - 1].equals("jpg")) {
                                        break;
                                    }
                                    continue loop1;
                                }
                                fileNameList.add("./" + initDir + "/" + fileName);
                                System.out.println("File " + fileName);

                            } else if (listOfFiles[i].isDirectory()) {
                                System.out.println("Directory " + listOfFiles[i].getName());
                            }
                        }

                    }

                    outStr = "[";
                    ibuf = 0;
                    for (int i = 0; i < fileNameList.size(); i++) {
                        if (i != 0) {
                            outStr += ",";
                        }
                        outStr += "\"";
                        outStr += fileNameList.get(i);
                        outStr += "\"";
                    }
                    outStr += "]";

                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Read Image File Names OK");
                    putJos(outOpts, "value", outStr);
                    putJoo(out, "opts", outOpts);
                    break;
                case "read file names":
                    putJos(out, "type", "Read File Names Error!");
                    if (!jsobjGet(opts, "initDir")) {
                        return;
                    }
                    initDir = Root.sRealPath + this.retData.retStr;
                    if (!jsobjGet(opts, "compareNames")) {
                        return;
                    }
                    String[] compareNames = this.retData.retStr.split(",");
                    ArrayList<String> alFileNames = Lib.readFileNames(initDir, compareNames);
                    outStr = Lib.stringListToString(alFileNames);
                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Read File Names OK");
                    putJos(outOpts, "value", outStr);
                    putJoo(out, "opts", outOpts);
                    break;

                case "deleteFilesInDir":
                    putJos(out, "type", "Delete File Error !!!");
                    if (!jsobjGet(opts, "actDir")) {
                        return;
                    }
                    String actDir = Root.sSrcPath + this.retData.retStr;
                    if (!jsobjGet(opts, "fileNames")) {
                        return;
                    }
                    JSONArray jaFileNames = new JSONArray(this.retData.retStr);
                    String[] fileNames = Lib.toStringArray(jaFileNames);
                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Delete Files OK.");
                    putJoo(out, "opts", outOpts);


                    for (int ii = 0; ii < fileNames.length; ii++) {
                        filePath = actDir + "/";
                        file = new File(filePath + fileNames[ii]);
                        file.delete();
                    }

                    break;

                /*
                    putJos(out, "type", "Read File Names Error!");
                    if (!jsobjGet(opts, "userName")) {
                        break;
                    }
                    userName = this.retData.retStr;
                    //=================================
                    initDir = "user-" + userName;
                    if (jsobjGet(opts, "initDir")) {
                        initDir = this.retData.retStr;
                    }
                    //=================================
                    String[] extendType = new String[]{};
                    if (jsobjGet(opts, "extendType")) {
                        JSONArray ja = new JSONArray(this.retData.retStr);
                        extendType = Lib.toStringArray(ja);
                    }
                    //=================================
                    fileNameList = new ArrayList<String>();
                    folder = new File(Root.sRealPath + initDir);
                    //folder = new File(Root.sSrcPath + initDir);
                    if (folder.exists() && folder.isDirectory()) {
                        File[] listOfFiles = folder.listFiles();
                        loop1:
                        for (int i = 0; i < listOfFiles.length; i++) {
                            if (listOfFiles[i].isFile()) {
                                fileName = listOfFiles[i].getName();
                                if (extendType.length == 0) {
                                    fileNameList.add("./" + initDir + "/" + fileName);
                                    continue;
                                }
                                strA = fileName.split("\\.");
                                if (strA.length < 2) {
                                    continue;
                                }
                                for (int j = 0; j < extendType.length; j++) {
                                    if (strA[strA.length - 1].equals(extendType[j])) {
                                        fileNameList.add("./" + initDir + "/" + fileName);
                                        continue loop1;
                                    }
                                }

                            } else if (listOfFiles[i].isDirectory()) {
                                System.out.println("Directory " + listOfFiles[i].getName());
                            }
                        }

                    }

                    outStr = "[";
                    ibuf = 0;
                    for (int i = 0; i < fileNameList.size(); i++) {
                        if (i != 0) {
                            outStr += ",";
                        }
                        outStr += "\"";
                        outStr += fileNameList.get(i);
                        outStr += "\"";
                    }
                    outStr += "]";

                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Read File Names OK");
                    putJos(outOpts, "value", outStr);
                    putJoo(out, "opts", outOpts);
                    break;
                 */
                //======================================================================    
                case "set database a":
                    putJos(out, "type", "Save Data Error!");
                    if (!setDbkey(opts)) {
                        break;
                    }
                    value = opts.get("value").toString();
                    System.out.println(this.dbkey + ": " + value);
                    if (!KvRedis.keyOp("set", new String[]{this.dbkey, value})) {
                        break;
                    }
                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Save Data OK!");
                    putJoo(out, "opts", outOpts);
                    break;

                case "Hset database a":
                    putJos(out, "type", "Save Data Error!");
                    if (!setDbkey(opts)) {
                        break;
                    }
                    value = opts.get("value").toString();
                    System.out.println(this.dbkey + ": " + value);
                    if (!KvRedis.keyOp("Hset", new String[]{this.dbkey, value})) {
                        break;
                    }
                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Save Data OK!");
                    putJoo(out, "opts", outOpts);
                    break;

                //======================================================================    
                case "set user database":
                    putJos(out, "type", "set user database Error!");
                    if (!jsobjGet(opts, "sourceType")) {
                        break;
                    }
                    String sourceType = this.retData.retStr;
                    switch (sourceType) {
                        case "Redis":
                            if (!jsobjGet(opts, "dataType")) {
                                break;
                            }
                            dataType = this.retData.retStr;
                            if (!jsobjGet(opts, "address")) {
                                break;
                            }
                            String address = this.retData.retStr;
                            if (!jsobjGet(opts, "port")) {
                                break;
                            }
                            String port = this.retData.retStr;
                            if (!setDbkey(opts)) {
                                break;
                            }
                            value = opts.get("value").toString();

                            String timeout = "2000";
                            if (!jsobjGet(opts, "timeout")) {
                                timeout = this.retData.retStr;
                            }
                            String redisPassword = "";
                            if (jsobjGet(opts, "password")) {
                                redisPassword = this.retData.retStr;
                            }

                            System.out.println(this.dbkey + ": " + value);

                            if (this.hdbTable.equals("")) {
                                if (!KvRedis.keyOpAdr("set", new String[]{this.hdbKey, value}, new String[]{address, port, timeout, redisPassword})) {
                                    break;
                                }

                            } else {
                                if (!KvRedis.keyOpAdr("hset", new String[]{this.hdbTable, this.hdbKey, value}, new String[]{address, port, timeout, redisPassword})) {
                                    break;
                                }
                            }
                            setRespAction(opts, out, outOpts);
                            putJos(out, "type", "Edit Database OK!");
                            putJoo(out, "opts", outOpts);

                            break;
                        case "Mysql":
                            break;
                    }
                    break;
                //======================================================================    
                case "get user database":
                    putJos(out, "type", "get user database Error!");
                    if (!jsobjGet(opts, "sourceType")) {
                        break;
                    }
                    System.out.println(opts);
                    sourceType = this.retData.retStr;
                    switch (sourceType) {
                        case "Redis":
                            if (!jsobjGet(opts, "dataType")) {
                                break;
                            }
                            dataType = this.retData.retStr;
                            //=====================================
                            if (!jsobjGet(opts, "address")) {
                                break;
                            }
                            String address = this.retData.retStr;
                            //=====================================
                            if (!jsobjGet(opts, "port")) {
                                break;
                            }
                            String port = this.retData.retStr;
                            //=====================================
                            if (!setDbkey(opts)) {
                                break;
                            }
                            //=====================================
                            String timeout = "2000";
                            if (!jsobjGet(opts, "timeout")) {
                                timeout = this.retData.retStr;
                            }
                            String redisPassword = "";
                            if (jsobjGet(opts, "password")) {
                                redisPassword = this.retData.retStr;
                            }

                            if (this.hdbTable.equals("")) {
                                if (!KvRedis.keyOpAdr("get", new String[]{this.hdbKey}, new String[]{address, port, timeout, redisPassword})) {
                                    break;
                                }

                            } else {
                                if (!KvRedis.keyOpAdr("hget", new String[]{this.hdbTable, this.hdbKey}, new String[]{address, port, timeout, redisPassword})) {
                                    break;
                                }

                            }

                            setRespAction(opts, out, outOpts);
                            putJos(outOpts, "value", KvRedis.valueStr);
                            putJos(outOpts, "dataType", dataType);
                            typeStr = "Get User Database OK! ";
                            jsobjGet(opts, "showValue");
                            if (!this.retData.err_f) {
                                typeStr += KvRedis.valueStr;
                            }
                            putJos(out, "type", typeStr);

                            break;
                        case "Mysql":
                            break;
                    }
                    break;
                //======================================================================    

                case "get database a":
                    putJos(out, "type", "Get Data Error!");
                    if (!setDbkey(opts)) {
                        break;
                    }
                    if (!KvRedis.keyOp("get", new String[]{this.dbkey})) {
                        break;
                    }
                    if (!chkSaveFile(opts, KvRedis.valueStr)) {
                        break;
                    }
                    setRespAction(opts, out, outOpts);
                    putJos(outOpts, "value", KvRedis.valueStr);
                    typeStr = "Get Data OK! ";
                    if (KvRedis.errCode != 0) {
                        typeStr = KvRedis.actStr;
                    }
                    jsobjGet(opts, "showValue");
                    if (!this.retData.err_f) {
                        typeStr += KvRedis.valueStr;
                    }
                    putJos(out, "type", typeStr);
                    putJoo(out, "opts", outOpts);
                    break;

                case "Hget database a":
                    putJos(out, "type", "Get Data Error!");
                    if (!setDbkey(opts)) {
                        break;
                    }
                    if (!KvRedis.keyOp("Hget", new String[]{this.dbkey})) {
                        break;
                    }
                    if (KvRedis.valueStr == null) {
                        if (setSecondKey(opts)) {
                            if (!KvRedis.keyOp("Hget", new String[]{this.dbkey})) {
                                break;
                            }
                        }
                    }
                    if (!chkSaveFile(opts, KvRedis.valueStr)) {
                        break;
                    }
                    setRespAction(opts, out, outOpts);
                    putJos(outOpts, "value", KvRedis.valueStr);
                    typeStr = "Get Data OK! ";
                    if (KvRedis.errCode != 0) {
                        typeStr = KvRedis.actStr;
                    }
                    jsobjGet(opts, "showValue");
                    if (!this.retData.err_f) {
                        typeStr += KvRedis.valueStr;
                    }
                    putJos(out, "type", typeStr);
                    putJoo(out, "opts", outOpts);
                    break;

                case "del database a":
                    putJos(out, "type", "Delete Data Error!");
                    if (!setDbkey(opts)) {
                        break;
                    }
                    if (!KvRedis.keyOp("findKeys", new String[]{this.dbkey})) {
                        break;
                    }
                    it = KvRedis.setList.iterator();
                    err_f = false;
                    while (it.hasNext()) {
                        getKey = it.next();
                        if (!KvRedis.keyOp("del", new String[]{getKey})) {
                            err_f = true;
                            break;
                        }
                    }
                    if (err_f == true) {
                        break;
                    }
                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Delete Data OK");
                    putJoo(out, "opts", outOpts);
                    break;
                case "Hdel database a":
                    putJos(out, "type", "Delete Data Error!");
                    if (!setDbkey(opts)) {
                        break;
                    }
                    if (!KvRedis.keyOp("HfindKeys", new String[]{this.dbkey})) {
                        break;
                    }
                    it = KvRedis.setList.iterator();
                    err_f = false;
                    while (it.hasNext()) {
                        getKey = it.next();
                        if (!KvRedis.keyOp("Hdel", new String[]{getKey})) {
                            err_f = true;
                            break;
                        }
                    }
                    if (err_f == true) {
                        break;
                    }
                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Delete Data OK");
                    putJoo(out, "opts", outOpts);
                    break;
                case "get database a keys":
                    putJos(out, "type", "Get Data Error!");
                    if (!setDbkey(opts)) {
                        break;
                    }
                    if (!KvRedis.keyOp("findKeys", new String[]{this.dbkey})) {
                        break;
                    }
                    it = KvRedis.setList.iterator();
                    err_f = false;
                    outStr = "[\n";
                    ibuf = 0;
                    while (it.hasNext()) {
                        getKey = it.next();
                        if (ibuf != 0) {
                            outStr += ",\n";
                        }
                        outStr += "\"";
                        outStr += getKey;
                        outStr += "\"";
                        ibuf++;
                    }
                    outStr += "\n]";
                    if (err_f == true) {
                        break;
                    }
                    if (!chkSaveFile(opts, outStr)) {
                        break;
                    }
                    setRespAction(opts, out, outOpts);
                    putJos(outOpts, "value", outStr);
                    putJos(out, "type", "Get Data Keys OK");
                    putJoo(out, "opts", outOpts);
                    break;

                case "hget database a keys":
                    putJos(out, "type", "Get Data Error!");
                    if (!setDbkey(opts)) {
                        break;
                    }
                    if (!KvRedis.keyOp("HfindKeys", new String[]{this.dbkey})) {
                        break;
                    }
                    it = KvRedis.setList.iterator();
                    err_f = false;
                    outStr = "[\n";
                    ibuf = 0;
                    while (it.hasNext()) {
                        getKey = it.next();
                        if (ibuf != 0) {
                            outStr += ",\n";
                        }
                        outStr += "\"";
                        outStr += getKey;
                        outStr += "\"";
                        ibuf++;
                    }
                    outStr += "\n]";
                    if (err_f == true) {
                        break;
                    }
                    if (!chkSaveFile(opts, outStr)) {
                        break;
                    }
                    setRespAction(opts, out, outOpts);
                    putJos(outOpts, "value", outStr);
                    putJos(out, "type", "Get Data Keys OK");
                    putJoo(out, "opts", outOpts);
                    break;

                case "get sonAccount":
                    putJos(out, "type", "Get Data Error!");
                    if (!jsobjGet(opts, "userName")) {
                        break;
                    }
                    userName = this.retData.retStr;
                    if (!jsobjGet(opts, "userId")) {
                        break;
                    }
                    userId = this.retData.retStr;
                    if (!userId.equals("admin")) {
                        putJos(out, "type", "You Are Not administer !");
                        break;
                    }
                    if (!jsobjGet(opts, "userFather")) {
                        break;
                    }
                    userFather = this.retData.retStr;
                    //=====================================
                    userFather = userFather + "-" + userName;
                    outStr = "[\n";
                    ibuf = 0;
                    for (int i = 0; i < lsUserData.size(); i++) {
                        String fstr = lsUserData.get(i).menberInf.userFather;
                        String nstr = lsUserData.get(i).menberInf.userName;
                        String istr = lsUserData.get(i).menberInf.userId;
                        if (!istr.equals("admin")) {
                            continue;
                        }
                        if (lsUserData.get(i).menberInf.userFather.contains(userFather)) {
                            if (ibuf != 0) {
                                outStr += ",";
                            }
                            bufStr = "";
                            if (!lsUserData.get(i).menberInf.userFather.equals(userFather)) {
                                bufStr += lsUserData.get(i).menberInf.userFather.substring(userFather.length() + 1) + "-";
                            }
                            bufStr += lsUserData.get(i).menberInf.userName;
                            outStr += "\"" + bufStr + "\"";
                            ibuf++;
                        }
                    }
                    outStr += "\n]";
                    setRespAction(opts, out, outOpts);
                    putJos(outOpts, "value", outStr);
                    putJos(out, "type", "Get Data Keys OK");
                    putJoo(out, "opts", outOpts);
                    break;

                case "get sonUserId":
                    putJos(out, "type", "Get Data Error!");
                    if (!jsobjGet(opts, "userName")) {
                        break;
                    }
                    userName = this.retData.retStr;
                    if (!jsobjGet(opts, "userId")) {
                        break;
                    }
                    userId = this.retData.retStr;
                    if (!userId.equals("admin")) {
                        putJos(out, "type", "You Are Not administer !");
                        break;
                    }
                    if (!jsobjGet(opts, "userFather")) {
                        break;
                    }
                    userFather = this.retData.retStr;
                    //=====================================
                    userFather = userFather + "-" + userName;
                    outStr = "[\n";
                    ibuf = 0;
                    for (int i = 0; i < lsUserData.size(); i++) {
                        String fstr = lsUserData.get(i).menberInf.userFather;
                        String nstr = lsUserData.get(i).menberInf.userName;
                        String istr = lsUserData.get(i).menberInf.userId;
                        if (istr.equals("admin")) {
                            continue;
                        }
                        if (lsUserData.get(i).menberInf.userFather.contains(userFather)) {
                            if (ibuf != 0) {
                                outStr += ",";
                            }
                            bufStr = "";
                            bufStr += lsUserData.get(i).menberInf.userId;
                            outStr += "\"" + bufStr + "\"";
                            ibuf++;
                        }
                    }
                    outStr += "\n]";
                    setRespAction(opts, out, outOpts);
                    putJos(outOpts, "value", outStr);
                    putJos(out, "type", "Get Data Keys OK");
                    putJoo(out, "opts", outOpts);
                    break;

                case "saveMenberInf":
                    putJos(out, "type", "Save Error!");
                    if (!jsobjGet(opts, "value")) {
                        break;
                    }
                    miTmp = MenberInf.toObj(this.retData.retStr);
                    this.dbkey = "systemUserId~" + miTmp.userName + "~" + miTmp.userId;
                    if (!KvRedis.keyOp("Hset", new String[]{this.dbkey, this.retData.retStr})) {
                        break;
                    }
                    udBuf = new UserData(miTmp.userName + "~" + miTmp.userId, miTmp, null);
                    UserData.lsEditNew(lsUserData, udBuf);

                    break;
                case "chkLogin":
                    putJos(out, "type", "Connect Error!");
                    if (!jsobjGet(opts, "userName")) {
                        break;
                    }
                    userName = this.retData.retStr;

                    if (!jsobjGet(opts, "userId")) {
                        break;
                    }
                    userId = this.retData.retStr;

                    if (!jsobjGet(opts, "password")) {
                        break;
                    }
                    password = this.retData.retStr;
                    chkLogin(userName, userId, password);
                    if (this.retData.err_f) {
                        switch (this.retData.errStr) {
                            case "noDashboard":
                                putJos(out, "type", "No This Dashboard !");
                                break;
                            case "noUserId":
                                putJos(out, "type", "No This User ID !");
                                break;
                            case "passwordError":
                                putJos(out, "type", "Password Error !");
                                break;

                        }
                        break;
                    }
                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "response ok");
                    putJos(outOpts, "action", "chkLoginOk");
                    putJoo(out, "opts", outOpts);

                    break;
                case "connectFirst":
                    putJos(out, "type", "Connect Error!");
                    if (!jsobjGet(opts, "userName")) {
                        break;
                    }
                    userName = this.retData.retStr;

                    if (!jsobjGet(opts, "userId")) {
                        break;
                    }
                    userId = this.retData.retStr;

                    if (!jsobjGet(opts, "password")) {
                        break;
                    }
                    password = this.retData.retStr;

                    if (!getUserData(userName, userId, password)) {
                        switch (this.retData.errStr) {
                            case "noDashboard":
                                setRespAction(opts, out, outOpts);
                                putJos(outOpts, "action", "login");
                                putJos(out, "type", "No Dashboard");
                                putJoo(out, "opts", outOpts);
                                return;
                            case "noUserId":
                                setRespAction(opts, out, outOpts);
                                putJos(outOpts, "action", "login");
                                putJos(out, "type", "No User Id");
                                putJoo(out, "opts", outOpts);
                                return;
                            case "passwordError":
                                setRespAction(opts, out, outOpts);
                                putJos(outOpts, "action", "login");
                                putJos(out, "type", "Passwors Error");
                                putJoo(out, "opts", outOpts);
                                return;
                            default:
                                setRespAction(opts, out, outOpts);
                                putJos(outOpts, "action", "login");
                                putJos(out, "type", "Get UserData Error");
                                putJoo(out, "opts", outOpts);
                                return;
                        }
                    }
                    tempFile = new File(Root.sSrcPath + "user-" + userName + "/userClass.js");
                    if (!tempFile.exists() || tempFile.isDirectory()) {
                        putJos(out, "name", "response error");
                        putJos(out, "type", "File Not Exist!");
                        putJos(out, "type2", tempFile);
                        putJos(outOpts, "responseAction", "loadUserSet Error");
                        break;

                    }
                    tempFile = new File(Root.sSrcPath + "user-" + userName + "/userLib.js");
                    if (!tempFile.exists() || tempFile.isDirectory()) {
                        putJos(out, "name", "response error");
                        putJos(out, "type", "File Not Exist!");
                        putJos(out, "type2", tempFile);
                        putJos(outOpts, "responseAction", "loadUserSet Error");
                        break;
                    }
                    valueStr = addUserData(userName, this.retData.valueStr);
                    //=====================================================================================================
                    setRespAction(opts, out, outOpts);
                    putJos(outOpts, "action", "loadUserSet");
                    putJos(outOpts, "menberInf", getMenberInf(userName, userId, password));
                    putJos(outOpts, "dataServerStatus", GB.dataServerStatus);
                    putJos(outOpts, "value", valueStr);
                    putJos(out, "type", "Get User Data OK");
                    putJoo(out, "opts", outOpts);
                    //=====================================================================
                    //filePath = Root.sSrcPath + "user-" + userName + "/";
                    //outfile = new FileOutputStream(filePath + "userSetData.json");
                    //outfile.write(valueStr.getBytes());
                    //outfile.close();

                    break;
                case "login":
                    putJos(out, "type", "Login Error!");
                    if (!jsobjGet(opts, "userName")) {
                        break;
                    }
                    userName = this.retData.retStr;

                    if (!jsobjGet(opts, "userId")) {
                        break;
                    }
                    userId = this.retData.retStr;

                    if (!jsobjGet(opts, "password")) {
                        break;
                    }
                    password = this.retData.retStr;
                    getUserData(userName, userId, password);
                    if (this.retData.err_f) {
                        switch (this.retData.errStr) {
                            case "notMyMenber":
                                putJos(out, "name", "response error");
                                putJos(out, "type", "No This User Name !");
                                putJos(outOpts, "responseAction", "loadUserSet Error");
                                return;
                            case "passwordError":
                                putJos(out, "name", "response error");
                                putJos(out, "type", "Password Error !");
                                putJos(outOpts, "responseAction", "loadUserSet Error");
                                return;
                            case "linkDatabaseError":
                                putJos(out, "name", "response error");
                                putJos(out, "type", "Link Database Error !");
                                putJos(outOpts, "responseAction", "loadUserSet Error");
                                return;
                            case "getDatabaseError":
                            default:
                                putJos(out, "name", "response error");
                                putJos(out, "type", "Get Database Error !");
                                putJos(outOpts, "responseAction", "loadUserSet Error");
                                return;

                        }
                    }
                    tempFile = new File(Root.sSrcPath + "user-" + userName + "/userClass.js");
                    if (!tempFile.exists() || tempFile.isDirectory()) {
                        putJos(out, "name", "response error");
                        putJos(out, "type", "File Not Exist!");
                        putJos(out, "type2", tempFile);
                        putJos(outOpts, "responseAction", "loadUserSet Error");
                        break;

                    }
                    tempFile = new File(Root.sSrcPath + "user-" + userName + "/userLib.js");
                    if (!tempFile.exists() || tempFile.isDirectory()) {
                        putJos(out, "name", "response error");
                        putJos(out, "type", "File Not Exist!");
                        putJos(out, "type2", tempFile);
                        putJos(outOpts, "responseAction", "loadUserSet Error");
                        break;
                    }

                    valueStr = addUserData(userName, this.retData.valueStr);
                    setRespAction(opts, out, outOpts);
                    putJos(outOpts, "action", "loadUserSet");
                    putJos(outOpts, "menberInf", getMenberInf(userName, userId, password));
                    putJos(outOpts, "dataServerStatus", GB.dataServerStatus);
                    putJos(outOpts, "value", valueStr);
                    putJos(out, "type", "Get User Data OK");
                    putJoo(out, "opts", outOpts);
                    break;
                case "contactUs":
                    putJos(out, "type", "contactUs Error!");
                    if (!jsobjGet(opts, "userName")) {
                        break;
                    }
                    userName = this.retData.retStr;
                    if (!jsobjGet(opts, "from")) {
                        break;
                    }
                    String contactUsFrom = this.retData.retStr;
                    if (!jsobjGet(opts, "to")) {
                        break;
                    }
                    String contactUsTo = this.retData.retStr;
                    if (!jsobjGet(opts, "subject")) {
                        break;
                    }
                    String contactUsSubject = this.retData.retStr;
                    if (!jsobjGet(opts, "content")) {
                        break;
                    }
                    String contactUsContent = this.retData.retStr;

                    putJos(out, "type", "Connect Databas Error !");
                    Timestamp timestamp = new Timestamp(System.currentTimeMillis());
                    this.dbkey = "contactUs~" + userName + "~" + timestamp;
                    value = opts.toString();
                    if (!KvRedis.keyOp("set", new String[]{this.dbkey, value})) {
                        break;
                    }
                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Send Suceess");
                    putJoo(out, "opts", outOpts);
                    break;

                case "delete register":
                    putJos(out, "type", "Delete Register Error!");
                    if (!jsobjGet(opts, "registerName")) {
                        break;
                    }
                    registerName = this.retData.retStr;
                    if (!jsobjGet(opts, "userName")) {
                        break;
                    }
                    userName = this.retData.retStr;
                    putJos(out, "type", "Delete Database Error!");
                    this.dbkey = "systemUserId~" + registerName + "~" + "admin";
                    err_f = false;
                    if (!KvRedis.keyOp("Hdel", new String[]{this.dbkey})) {
                        err_f = true;
                    }
                    if (err_f == true) {
                        break;
                    }

                    strA = this.dbkey.split("~");
                    for (int i = 0; i < lsUserData.size(); i++) {
                        if (lsUserData.get(i).menberInf.userName.equals(registerName)) {
                            lsUserData.remove(i);
                            break;
                        }
                    }
                    File index = new File(Root.sSrcPath + "user-" + registerName);
                    if (index.exists()) {
                        String[] entries = index.list();
                        for (String s : entries) {
                            File currentFile = new File(index.getPath(), s);
                            currentFile.delete();
                        }
                        index.delete();
                    }
                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Delete Register OK");
                    putJoo(out, "opts", outOpts);
                    break;

                case "delete userId":
                    putJos(out, "type", "Delete Register Error!");
                    if (!jsobjGet(opts, "registerUserId")) {
                        break;
                    }
                    registerUserId = this.retData.retStr;
                    if (!jsobjGet(opts, "userName")) {
                        break;
                    }
                    userName = this.retData.retStr;
                    if (!jsobjGet(opts, "userId")) {
                        break;
                    }
                    userId = this.retData.retStr;
                    putJos(out, "type", "Delete Database Error!");
                    this.dbkey = "systemUserId~" + userName + "~" + registerUserId;
                    err_f = false;
                    if (!KvRedis.keyOp("Hdel", new String[]{this.dbkey})) {
                        err_f = true;
                    }
                    if (err_f == true) {
                        break;
                    }

                    strA = this.dbkey.split("~");
                    for (int i = 0; i < lsUserData.size(); i++) {
                        if (!lsUserData.get(i).menberInf.userName.equals(userName)) {
                            continue;
                        }
                        if (!lsUserData.get(i).menberInf.userId.equals(registerUserId)) {
                            continue;
                        }
                        lsUserData.remove(i);
                        break;
                    }
                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Delete Register OK");
                    putJoo(out, "opts", outOpts);
                    break;

                case "register":
                    putJos(out, "type", "Register Error!");
                    if (!jsobjGet(opts, "userName")) {
                        break;
                    }
                    userName = this.retData.retStr;
                    if (!jsobjGet(opts, "registerName")) {
                        break;
                    }
                    registerName = this.retData.retStr;
                    if (!jsobjGet(opts, "userId")) {
                        break;
                    }
                    registerUserId = this.retData.retStr;

                    if (!jsobjGet(opts, "password")) {
                        break;
                    }
                    password = this.retData.retStr;

                    if (!jsobjGet(opts, "userFather")) {
                        break;
                    }
                    userFather = this.retData.retStr;

                    if (!jsobjGet(opts, "permition")) {
                        break;
                    }
                    int newPermition = Integer.parseInt(this.retData.retStr);
                    if (!jsobjGet(opts, "accountQuota")) {
                        break;
                    }
                    int accountQuota = Integer.parseInt(this.retData.retStr);
                    if (!jsobjGet(opts, "accountUse")) {
                        break;
                    }
                    int accountUse = Integer.parseInt(this.retData.retStr);

                    if (accountQuota >= 0) {
                        if (accountQuota - accountUse < 0) {
                            putJos(out, "type", "accountQuota has run out !");
                            break;
                        }
                    }

                    int permition = -1;
                    udBuf = UserData.lsGet(lsUserData, userName + "~" + "admin");
                    if (udBuf == null) {
                        break;
                    }
                    permition = udBuf.menberInf.permition;
                    if (permition == -1) {
                        break;
                    }
                    if (permition >= 400) {
                        putJos(out, "type", "Permition Deny!");
                        break;
                    }
                    if (newPermition < permition) {
                        putJos(out, "type", "Permition Under Self !");
                        break;
                    }

                    if (UserData.lsCheckExist(lsUserData, registerName + "~" + registerUserId)) {
                        putJos(out, "type", "Dashboard Name is exist !");
                        return;
                    }

                    putJos(out, "type", "Read Database Error !");
                    if (!KvRedis.keyOp("findKeys", new String[]{"*"})) {
                        break;
                    }
                    it = KvRedis.setList.iterator();
                    ibuf = 0;
                    while (it.hasNext()) {
                        getKey = it.next();
                        if (getKey.equals("hash~" + registerName)) {
                            ibuf = 1;
                            break;
                        }
                    }
                    if (ibuf > 0) {
                        putJos(out, "type", "Dashboard Name Error ! !");
                        break;
                    }
                    putJos(out, "type", "Connect Databas Error !");
                    //===========================================================================
                    MenberInf miBuf = new MenberInf();
                    miBuf.userName = registerName;
                    miBuf.userId = registerUserId;
                    miBuf.password = password;
                    miBuf.permition = newPermition;
                    miBuf.userFather = userFather;
                    miBuf.accountQuota = accountQuota;
                    //===========================================================================
                    this.dbkey = "systemUserId~" + registerName + "~" + registerUserId;
                    value = miBuf.toJson().toString();
                    if (!KvRedis.keyOp("Hset", new String[]{this.dbkey, value})) {
                        break;
                    }
                    lsUserData.add(new UserData(registerName + "~" + registerUserId, miBuf, null));
                    //===========================================================================
                    try {
                        String pathName;
                        String fileData;
                        Path path;
                        timestamp = new Timestamp(System.currentTimeMillis());
                        pathName = Root.sSrcPath + "user-" + registerName + "/";
                        path = Paths.get(pathName);
                        Files.createDirectories(path);
                        //=======================================================
                        fileName = pathName + "userLib.js";
                        outfile = new FileOutputStream(fileName);
                        fileData = "//Create at " + timestamp;
                        outfile.write(fileData.getBytes());
                        outfile.close();
                        //=======================================================
                        fileName = pathName + "userClass.js";
                        outfile = new FileOutputStream(fileName);
                        fileData = "//Create at " + timestamp + "\n";
                        fileData += "class UserClass {\n";
                        fileData += "constructor() {\n";
                        fileData += "//user define=========================\n";
                        fileData += "//user define end=====================\n";
                        fileData += "}\n";
                        fileData += "}\n";
                        fileData += "var uc = new UserClass();\n";
                        outfile.write(fileData.getBytes());
                        outfile.close();
                        //======================================================
                        pathName = Root.sRealPath + "user-" + registerName + "/";
                        path = Paths.get(pathName);
                        Files.createDirectories(path);
                        //=======================================================
                        fileName = pathName + "userLib.js";
                        outfile = new FileOutputStream(fileName);
                        timestamp = new Timestamp(System.currentTimeMillis());
                        fileData = "//Create at " + timestamp;
                        outfile.write(fileData.getBytes());
                        outfile.close();
                        //=======================================================
                        fileName = pathName + "userClass.js";
                        outfile = new FileOutputStream(fileName);
                        fileData = "//Create at " + timestamp + "\n";
                        fileData += "class UserClass {\n";
                        fileData += "constructor() {\n";
                        fileData += "//user define=========================\n";
                        fileData += "//user define end=====================\n";
                        fileData += "}\n";
                        fileData += "}\n";
                        fileData += "var uc = new UserClass();\n";
                        outfile.write(fileData.getBytes());
                        outfile.close();
                        //======================================================

                    } catch (IOException ex) {
                        ex.printStackTrace();
                        putJos(out, "type", "Create File Error !");
                        break;
                    }

                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Register OK");
                    putJoo(out, "opts", outOpts);
                    break;

                case "registerUserId":
                    putJos(out, "type", "Register Error!");
                    if (!jsobjGet(opts, "userName")) {
                        break;
                    }
                    userName = this.retData.retStr;
                    if (!jsobjGet(opts, "registerName")) {
                        break;
                    }
                    registerName = this.retData.retStr;
                    if (!jsobjGet(opts, "userId")) {
                        break;
                    }
                    registerUserId = this.retData.retStr;

                    if (!jsobjGet(opts, "password")) {
                        break;
                    }
                    password = this.retData.retStr;

                    if (!jsobjGet(opts, "userFather")) {
                        break;
                    }
                    userFather = this.retData.retStr;

                    if (!jsobjGet(opts, "permition")) {
                        break;
                    }
                    newPermition = 400;
                    accountQuota = 0;
                    udBuf = UserData.lsGet(lsUserData, userName + "~" + "admin");

                    if (UserData.lsCheckExist(lsUserData, registerName + "~" + registerUserId)) {
                        putJos(out, "type", "User ID is exist !");
                        return;
                    }
                    putJos(out, "type", "Connect Databas Error !");
                    //===========================================================================
                    miBuf = new MenberInf();
                    miBuf.userName = registerName;
                    miBuf.userId = registerUserId;
                    miBuf.password = password;
                    miBuf.permition = newPermition;
                    miBuf.userFather = userFather;
                    miBuf.accountQuota = accountQuota;
                    //===========================================================================
                    this.dbkey = "systemUserId~" + registerName + "~" + registerUserId;
                    value = miBuf.toJson().toString();
                    if (!KvRedis.keyOp("Hset", new String[]{this.dbkey, value})) {
                        break;
                    }
                    lsUserData.add(new UserData(registerName + "~" + registerUserId, miBuf, null));
                    //===========================================================================

                    setRespAction(opts, out, outOpts);
                    putJos(out, "type", "Register OK");
                    putJoo(out, "opts", outOpts);
                    break;

                case "get database a values":
                    putJos(out, "type", "Get Data Values Error!");
                    if (!setDbkey(opts)) {
                        break;
                    }
                    if (!KvRedis.keyOp("findKeys", new String[]{this.dbkey})) {
                        break;
                    }
                    it = KvRedis.setList.iterator();
                    err_f = false;
                    outStr = "[\n";
                    ibuf = 0;
                    while (it.hasNext()) {
                        getKey = it.next();

                        if (!KvRedis.keyOp("get", new String[]{getKey})) {
                            break;
                        }
                        bufStr = KvRedis.valueStr.trim();

                        if (ibuf != 0) {
                            outStr += ",\n";
                        }
                        outStr += "{\n\"key\":\"" + getKey + "\",\n";
                        outStr += "\"value\":" + bufStr + "\n}";
                        ibuf++;
                    }
                    outStr += "]\n";
                    if (err_f == true) {
                        break;
                    }
                    if (!chkSaveFile(opts, outStr)) {
                        break;
                    }
                    setRespAction(opts, out, outOpts);
                    putJos(outOpts, "value", outStr);
                    putJos(out, "type", "Get Data Values OK");
                    putJoo(out, "opts", outOpts);
                    break;
            }

        } catch (JSONException ex) {
            Logger.getLogger(AdminServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (FileNotFoundException ex) {
            ex.printStackTrace();
            Logger.getLogger(AdminServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            ex.printStackTrace();
            Logger.getLogger(AdminServlet.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    public JSONObject getMenberInf(String userName, String userId, String password) {
        int i;
        for (i = 0; i < lsUserData.size(); i++) {
            if (lsUserData.get(i).id.equals(userName + "~" + userId)) {
                int hh = lsUserData.get(i).menberInf.leftMenu;
                return lsUserData.get(i).menberInf.toJson();
            }
        }
        return null;
    }

    public boolean getUserData(String userName, String userId, String password) {
        this.retData.errStr = "";
        this.retData.err_f = true;
        boolean myMenber_f = false;
        String outStr;
        String bufKey, bufValue;
        JSONObject jsTmp;
        int ibuf;
        int i;
        this.retData.valueStr = "[]";
        if (!chkLogin(userName, userId, password)) {
            return false;
        }
        int userDataInx = this.retData.reti;
        /*
        if (this.retData.retObj != null) {
            KeyJson dashboardObj = (KeyJson) this.retData.retObj;
            this.retData.valueStr = dashboardObj.value;
            this.retData.err_f = false;
            return true;
        }
         */
        if (getHashData(userName)) {
            for (i = 0; i < lsDashboardData.size(); i++) {
                if (lsDashboardData.get(i).key.equals(userName)) {
                    lsDashboardData.remove(i);
                    break;
                }
            }
            KeyJson boardData = new KeyJson(userName, this.retData.valueStr);
            lsDashboardData.add(boardData);
            lsUserData.get(userDataInx).dashboardData = boardData;
            this.retData.valueStr = boardData.value;
            this.retData.err_f = false;
            return true;
        }
        this.retData.err_f = false;
        return true;
    }

    public boolean getHashData(String userName) {
        this.retData.errStr = "";
        this.retData.err_f = true;
        boolean myMenber_f = false;
        String outStr;
        String bufKey, bufValue;
        JSONObject jsTmp;
        int ibuf;
        int i;
        if (KvRedis.keyOp("hgetall", new String[]{"hash~" + userName})) {
            if (KvRedis.map.size() > 0) {

                this.retData.lsKeyValue.clear();
                this.retData.errStr = "noon";
                this.retData.err_f = true;

                outStr = "[\n";
                ibuf = 0;
                for (Map.Entry<String, String> entry : KvRedis.map.entrySet()) {
                    bufKey = entry.getKey();
                    bufValue = entry.getValue().trim();
                    if (ibuf != 0) {
                        outStr += ",";
                    }
                    outStr += "{\"key\":\"" + bufKey + "\",";
                    char ch = bufValue.charAt(0);
                    if (ch == '\"' || ch == '[' || ch == '{') {
                        outStr += "\"value\":" + bufValue + "}\n";
                    } else {
                        outStr += "\"value\":\"" + bufValue + "\"}\n";
                    }
                    this.retData.lsKeyValue.add(new KeyValue(bufKey, bufValue));
                    ibuf++;
                }
                outStr += "]";
                this.retData.valueStr = outStr;
                this.retData.err_f = false;
                return true;
            }
        }
        return false;
    }

    public boolean chkLogin(String userName, String userId, String password) {
        JSONObject jsTmp;
        boolean dashboardExist_f = false;
        String userNameId = userName + "~" + userId;
        String[] strAA;
        for (int i = 0; i < lsUserData.size(); i++) {
            strAA = lsUserData.get(i).id.split("~");
            if (strAA.length != 2) {
                continue;
            }
            if (strAA[0].equals(userName)) {
                dashboardExist_f = true;
            }
            if (!lsUserData.get(i).id.equals(userNameId)) {
                continue;
            }
            if (!lsUserData.get(i).menberInf.password.equals(password)) {
                this.retData.errStr = "passwordError";
                this.retData.err_f = true;
                return false;
            }
            this.retData.retObj = lsUserData.get(i).dashboardData;
            this.retData.errStr = "";
            this.retData.reti = i;
            this.retData.err_f = false;
            return true;
        }
        if (!dashboardExist_f) {
            this.retData.errStr = "noDashboard";
        } else {
            this.retData.errStr = "noUserId";
        }
        this.retData.err_f = true;
        return false;

    }

    public boolean hgetAll(String tableName) {
        this.retData.lsKeyValue.clear();
        this.retData.errStr = "noon";
        this.retData.err_f = true;
        if (!KvRedis.keyOp("hgetall", new String[]{"hash~" + tableName})) {
            return false;
        }
        if (KvRedis.map.size() > 0) {
            String outStr;
            String bufValue;
            String bufKey;
            int ibuf;

            outStr = "[\n";
            ibuf = 0;
            for (Map.Entry<String, String> entry : KvRedis.map.entrySet()) {
                bufKey = entry.getKey();
                bufValue = entry.getValue().trim();
                if (ibuf != 0) {
                    outStr += ",";
                }
                outStr += "{\"key\":\"" + bufKey + "\",";
                char ch = bufValue.charAt(0);
                if (ch == '\"' || ch == '[' || ch == '{') {
                    outStr += "\"value\":" + bufValue + "}\n";
                } else {
                    outStr += "\"value\":\"" + bufValue + "\"}\n";
                }
                this.retData.lsKeyValue.add(new KeyValue(bufKey, bufValue));
                ibuf++;
            }
            outStr += "]";
            this.retData.valueStr = outStr;
            this.retData.err_f = false;
            return true;

        }

        return false;
    }

    public boolean getValues(String keyStr) {
        this.retData.lsKeyValue.clear();
        this.retData.errStr = "noon";
        this.retData.err_f = true;
        this.dbkey = keyStr;
        //==========================================================
        if (!KvRedis.keyOp("findKeys", new String[]{this.dbkey})) {
            this.retData.errStr = "linkDatabaseError";
            return false;
        }
        Iterator<String> it;
        it = KvRedis.setList.iterator();
        boolean err_f = false;
        String outStr;
        String bufStr;
        String getKey;
        int ibuf;
        outStr = "[\n";
        ibuf = 0;
        while (it.hasNext()) {
            getKey = it.next();
            if (!KvRedis.keyOp("get", new String[]{getKey})) {
                err_f = true;
                break;
            }
            bufStr = KvRedis.valueStr.trim();

            if (ibuf != 0) {
                outStr += ",";
            }
            outStr += "{\"key\":\"" + getKey + "\",";
            outStr += "\"value\":" + bufStr + "}\n";
            this.retData.lsKeyValue.add(new KeyValue(getKey, bufStr));
            ibuf++;
        }
        outStr += "]";
        if (err_f == true) {
            this.retData.errStr = "getDatabaseError";
            return false;
        }
        this.retData.valueStr = outStr;
        this.retData.err_f = false;
        return true;
    }

    public void anaStr(String inpJo, JSONObject outJo) {

    }

    /**
     *
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.err.println("Get 1049");
        fixHeaders(response);

        request.setCharacterEncoding("UTF-8");
        StringBuilder myJson = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            myJson.append(line);
        }
        System.out.println(myJson.toString());
        //===============================================
        //response.setContentType("text/html; charset=utf-8");
        //String a = "任意内容";
        //PrintWriter out = response.getWriter();
        //out.write(a);        
        //out.close();
        //====================================================
        response.setContentType("application/json;charset=utf-8");//指定返回的格式为JSON格式
        JSONObject ob = new JSONObject();
        try {
            ob.accumulate("name", "小明");//添加元素
            ob.accumulate("age", 18);
        } catch (JSONException ex) {
            ex.printStackTrace();
            Logger.getLogger(AdminServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        PrintWriter out = response.getWriter();
        out.print(ob);
        out.close();

        /*
        try {
            String cmdstr = "";
            String str;
            String[] strA;
            String[] strB;
            String para0, para1, para2, para3;
            request.setCharacterEncoding("utf-8");
            resbonse.setContentType("text/html; charset=utf-8");
            PrintWriter out = resbonse.getWriter();
            out.println("dsadadas");
            para0 = request.getParameter("para0");
            switch (para0) {
                case "set table data":
                    para1 = request.getParameter("para1");//key
                    para2 = request.getParameter("para2");//value
                    para3 = request.getParameter("para3");//table
                    System.out.println("para2= " + para2);

                    //if(!KvRedis.keyOp("set", new String[]{para3+"~"+para1,para2})){
                    String para = para3 + para1;
                    System.err.println(para);
                    if (!KvRedis.keyOp("set", new String[]{para3 + para1, para2})) {
                        out.println("ErrorMessage" + "~" + KvRedis.actStr);
                        break;
                    }
                    out.println("OkMessage" + "~" + para0 + "  OK!");
                    break;
                case "get table data":
                    para1 = request.getParameter("para1");//key
                    para2 = request.getParameter("para2");//count
                    para3 = request.getParameter("para3");//table
                    if (!KvRedis.keyOp("get", new String[]{para1})) {
                        out.println("ErrorMessage" + "~" + KvRedis.actStr);
                        break;
                    }
                    out.println("OkMessage" + "~" + para0 + "  OK!");
                    break;

                case "insert table data":
                    para1 = request.getParameter("para1");//key
                    para2 = request.getParameter("para2");//value
                    para3 = request.getParameter("para3");//table
                    KvMysql.table=para3;
                    if (!KvMysql.insert(para1,para2)) {
                        out.println("ErrorMessage" + "~" + KvMysql.errStr);
                        break;
                    }
                    out.println("OkMessage" + "~" +para0 +"  OK!");
                    break;
                case "edit table data":
                    para1 = request.getParameter("para1");//key
                    para2 = request.getParameter("para2");//value
                    para3 = request.getParameter("para3");//table
                    KvMysql.table=para3;
                    if (!KvMysql.edit(para1,para2)) {
                        out.println("ErrorMessage" + "~" + KvMysql.errStr);
                        break;
                    }
                    out.println("OkMessage" + "~" +para0 +"  OK!");
                    break;
                case "insertEdit table data":
                    para1 = request.getParameter("para1");//key
                    para2 = request.getParameter("para2");//value
                    para3 = request.getParameter("para3");//table
                    KvMysql.table=para3;
                    if (!KvMysql.insertEdit(para1,para2)) {
                        out.println("ErrorMessage" + "~" + KvMysql.errStr);
                        break;
                    }
                    out.println("OkMessage" + "~" +para0 +"  OK!");
                    break;
                case "get table value":
                    para1 = request.getParameter("para1");//key
                    para2 = request.getParameter("para2");//count
                    para3 = request.getParameter("para3");//table
                    KvMysql.table=para3;
                    if (!KvMysql.getValue(para1,para2)) {
                        out.println("ErrorMessage" + "~" + KvMysql.errStr);
                        break;
                    }
                    out.println("OkMessage" + "~" +para0 +"  OK!~"+KvMysql.getValue);
                    break;
            }
        } catch (IOException | NumberFormatException e) {
        }
         */
    }

}

class RetData {

    boolean err_f = false;
    String errStr = "";
    String statusStr = "";
    String valueStr = "";
    String retStr = "";
    int reti = 0;
    float retf = 0;
    Object retObj;
    List<KeyValue> lsKeyValue = new ArrayList<>();
}

class KeyValue {

    String key;
    String value;

    KeyValue(String _key, String _value) {
        key = _key;
        value = _value;
    }
}

class Menber {

    String name;
    String password;
    int permition;
    int accountQuota;
    int accountUsed;
    String father;
    String usrSetData;

    Menber(String _name, String _password, int _permition, int _accQuota, String _father) {
        name = _name;
        father = _father;
        password = _password;
        permition = _permition;
        accountQuota = _accQuota;
        accountUsed = 0;
        usrSetData = null;
    }
}

class KeyJson {

    String key, value;

    KeyJson(String _key, String _value) {
        key = _key;
        value = _value;//jsonStr
    }

    public static boolean lsEditNew(List<KeyJson> _lsObj, KeyJson _obj) {
        int i;
        int len = _lsObj.size();
        for (i = 0; i < len; i++) {
            if (_lsObj.get(i).key.equals(_obj.key)) {
                _lsObj.remove(i);
                _lsObj.add(_obj);
                return true;
            }
        }
        _lsObj.add(_obj);
        return false;
    }

    public static boolean lsDel(List<KeyJson> _lsObj, String _key) {
        int i;
        int len = _lsObj.size();
        for (i = 0; i < len; i++) {
            if (_lsObj.get(i).key.equals(_key)) {
                _lsObj.remove(i);
                return true;
            }
        }
        return false;
    }

    public static KeyJson lsGet(List<KeyJson> _lsObj, String _key) {
        int i;
        int len = _lsObj.size();
        for (i = 0; i < len; i++) {
            if (_lsObj.get(i).key.equals(_key)) {
                return _lsObj.get(i);
            }
        }
        return null;
    }

}

class MenberInf {

    String userName = "demo";
    String userId = "gest";
    String password = "0000";
    String userFather = "";
    int permition = 400;
    int accountQuota = 0;
    int accountUsed = 0;
    int userQuota = 0;
    int priLevel = 400;
    //========================
    String language = "english";
    int leftMenu = 1;
    int fullScreen = 0;

    public JSONObject toJson() {
        JSONObject jsObj = new JSONObject();
        Lib.putJos(jsObj, "userName", userName);
        Lib.putJos(jsObj, "userId", userId);
        Lib.putJos(jsObj, "password", password);
        Lib.putJos(jsObj, "userFather", userFather);
        Lib.putJos(jsObj, "permition", permition);
        Lib.putJos(jsObj, "accountQuota", accountQuota);
        Lib.putJos(jsObj, "accountUsed", accountUsed);
        Lib.putJos(jsObj, "userQuota", userQuota);
        Lib.putJos(jsObj, "priLevel", priLevel);
        Lib.putJos(jsObj, "language", language);
        Lib.putJos(jsObj, "leftMenu", leftMenu);
        Lib.putJos(jsObj, "fullScreen", fullScreen);
        return jsObj;

    }

    public static MenberInf toObj(String jsonStr) {
        JSONObject jsTmp;
        MenberInf miTmp;
        miTmp = new MenberInf();
        try {
            jsTmp = new JSONObject(jsonStr);
            miTmp.userName = (String) jsTmp.get("userName");
            miTmp.userId = (String) jsTmp.get("userId");
            miTmp.password = (String) jsTmp.get("password");
            miTmp.userFather = (String) jsTmp.get("userFather");
            miTmp.permition = (int) jsTmp.get("permition");
            miTmp.accountQuota = (int) jsTmp.get("accountQuota");
            miTmp.accountUsed = (int) jsTmp.get("accountUsed");
            miTmp.userQuota = (int) jsTmp.get("userQuota");
            miTmp.priLevel = (int) jsTmp.get("priLevel");
            //=========================================
            miTmp.language = (String) jsTmp.get("language");
            miTmp.leftMenu = (int) jsTmp.get("leftMenu");
            miTmp.fullScreen = (int) jsTmp.get("fullScreen");
        } catch (JSONException ex) {
            Logger.getLogger(MenberInf.class.getName()).log(Level.SEVERE, null, ex);
            return miTmp;
        }
        return miTmp;

    }

}

class UserData {

    String id;//dashbordName~userId
    MenberInf menberInf;//jsonStr     
    KeyJson dashboardData;//key,jsonObj
    static int reti;
    static String retStr;

    UserData(String _nameId, MenberInf _menberInf, KeyJson _dashboardData) {
        id = _nameId;
        menberInf = _menberInf;
        dashboardData = _dashboardData;
    }

    //return true edit
    //return false new
    public static boolean lsEditNew(List<UserData> _lsObj, UserData _obj) {
        int i;
        int len = _lsObj.size();
        for (i = 0; i < len; i++) {
            if (_lsObj.get(i).id.equals(_obj.id)) {
                _lsObj.remove(i);
                _lsObj.add(_obj);
                return true;
            }
        }
        _lsObj.add(_obj);
        return false;
    }

    public static boolean lsDel(List<UserData> _lsObj, String _id) {
        int i;
        int len = _lsObj.size();
        for (i = 0; i < len; i++) {
            if (_lsObj.get(i).id.equals(_id)) {
                _lsObj.remove(i);
                return true;
            }
        }
        return false;
    }

    public static UserData lsGet(List<UserData> _lsObj, String _id) {
        int i;
        int len = _lsObj.size();
        for (i = 0; i < len; i++) {
            if (_lsObj.get(i).id.equals(_id)) {
                return _lsObj.get(i);
            }
        }
        return null;
    }

    public static boolean lsCheckExist(List<UserData> _lsObj, String _id) {
        int i;
        int len = _lsObj.size();
        for (i = 0; i < len; i++) {
            if (_lsObj.get(i).id.equals(_id)) {
                return true;
            }
        }
        return false;
    }

}
