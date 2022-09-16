/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


/* global gr, sys */

class Server {
    constructor() {
        this.urlCallBackMes=null;
        this.waitUrl_f=0;
    }
//================================================
    urlBackOk(data) {
        console.log(data);
    }
    urlBackError(mes) {
        console.log(mes);
    }
    callUrl(url, dataJson) {
        var self=this;
        self.urlCallBackMes = null;
        var posObj = {
            type: "post",
            data: dataJson,
            url: url,
            dataType: "json",
            success: self.urlBackOk,
            error: self.urlBackError
        };
        $.ajax(posObj);
        self.waitUrl_f = 1;
    }

//================================================
    callServer(dataJson, url) {
        var self=this;
        self.serverCallBackMes = null;
        var posObj = {
            type: "POST",
            url: "servlet1",
            contentType: "application/json;charset=utf-8",
            data: dataJson,
            dataType: "json",
            success: self.serverBackOk,
            error: self.serverBackError
        };
        if (url)
            if (url !== "Main Server") {
                posObj.url = url;
            }
        $.ajax(posObj);
        self.waitServer_f = 1;
    }

    transferServer(formData) {
        var self=this;
        self.serverCallBackMes = null;
        var posObj = {
            type: "POST",
            url: "servlet1",
            contentType: false,
            data: formData,
            processData: false,
            //dataType: null,
            dataType: "json",
            success: self.serverBackOk,
            error: self.serverBackError
        };
        $.ajax(posObj);
    }

    serverBackOk(mes) {
        var self=this;
        let gr = window.gr;
        self.waitServer_f = 0;
        self.serverCallBackMes = mes;
        switch (mes.name)
        {
            case "response none":
                if (gr.serverResponseFunc) {
                    gr.serverResponseFunc(mes);
                    break;
                }


                break;
            case "response ok":
                if (mes.opts.messageTime)
                    var buttons = [];
                else
                    var buttons = ["ESC"];
                if (mes.type2)
                    sys.mesBox("cg~OK", 800, [mes.type, mes.type2], buttons);
                else
                    sys.mesBox("cg~OK", 600, [mes.type], buttons);

                if (mes.opts.messageTime) {
                    var timeFunc = function () {
                        sysPopOff();
                        sysMaskOff();
                    };
                    window.setTimeout(timeFunc, mes.opts.messageTime);
                }
                if (gr.serverResponseFunc) {
                    gr.serverResponseFunc(mes);
                    break;
                }
                if (gr.serverResponseOkFunc) {
                    gr.serverResponseOkFunc(mes);
                }
                break;
            case "response error":
                if (mes.type2)
                    sys.mesBox("cr~ERROR", 800, [mes.type, mes.type2]);
                else
                    sys.mesBox("cr~ERROR", 800, [mes.type]);
                gr.serverCallBackMes = null;
                if (gr.serverResponseFunc) {
                    gr.serverResponseFunc(mes);
                    break;
                }
                if (gr.serverResponseOkFunc) {
                    gr.serverResponseErrorFunc(mes);
                }
                break;
            case "message ok":
                gr.message=mes.type;
                if (mes.opts.messageTime)
                    gr.messageTime = parseInt(mes.opts.messageTime);
                else
                    gr.messageTime = 0;
                break;
                
            case "message error":
                kw["messageBarTextColor"] = "#f00";
                kw["messageBarText"] = mes.type;
                if (mes.opts.messageTime)
                    gr.messageTime = parseInt(mes.opts.messageTime);
                else
                    gr.messageTime = 5;
                break;
        }

        if (!mes.opts)
            return;
        if (!mes.opts.responseAction)
            return;
        switch (mes.opts.responseAction) {
            case "exeCallBackFunc":
                if (!mes.opts.value)
                    return;
                var obj = JSON.parse(mes.opts.value);
                KvLib.exeFunc(gr.serverCallBack, obj);
                break;
            case "save var":
                if (!mes.opts.value)
                    return;
                var obj = JSON.parse(mes.opts.value);
                window.gr[mes.opts.saveVar] = obj;
                break;
            case "loadToElem":
                if (!mes.opts.value)
                    return;
                if (!mes.opts.loadToElemId)
                    return;
                var elem = document.getElementById(mes.opts.loadToElemId);
                if (!elem)
                    return;
                elem.value = JSON.parse(mes.opts.value);
                break;
            case "eval data":
                if (!mes.opts.value)
                    return;
                var obj = JSON.parse(mes.opts.value);
                if ((typeof obj === 'string'))
                    eval(obj);
                break;
            case "test":
                break;
            case "chkLogin":
                switch (mes.opts.action) {
                    case "chkLoginOk":
                        FnDebug.messageBox("message", 600, ["Wait Loadding......"]);
                        var opts;
                        var obj = {};
                        var elem;
                        obj["name"] = "login";
                        obj["type"] = "";
                        obj["opts"] = {};
                        opts = obj["opts"];
                        //=================================
                        elem = document.getElementById(gr.loginKcObj.model.inputTextObjs[0].opts.inputTextId);
                        opts["userName"] = elem.value;
                        elem = document.getElementById(gr.loginKcObj.model.inputTextObjs[1].opts.inputTextId);
                        opts["userId"] = elem.value;
                        elem = document.getElementById(gr.loginKcObj.model.inputTextObjs[2].opts.inputTextId);
                        opts["password"] = elem.value;
                        opts["responseAction"] = "loadUserSet";
                        callServer(JSON.stringify(obj));
                        break;
                }
                break;
            case "tickResponse":
                //console.log("tickResponse");
                var tickRespDatas = JSON.parse(mes.opts.value);
                var obj;
                var jsonStr;
                for (let i = 0; i < tickRespDatas.length; i++) {
                    obj = tickRespDatas[i];
                    switch (obj.actionName) {
                        case "setData":
                            console.log("setData");
                            break;
                        case "getData":
                            if (!obj.destinationType)
                                break;
                            if (!obj.destinationId)
                                break;
                            if (!obj.dataType)
                                break;
                            for (let j = 0; j < gr.userInputObjA.length; j++) {
                                if (gr.userInputObjA[j].id === obj.destinationId) {
                                    var valueObj = JSON.parse(obj.value);
                                    if (valueObj.dataPresent_f) {
                                        if (valueObj.chksumSta === "new chksum") {
                                            var inData = JSON.parse(valueObj.okData);
                                            var outData = inData;
                                            if (gr.userInputObjA[j].sobj.filter) {
                                                var errKey = "Error at userInput." + gr.userInputObjA[j].sobj.name + ".filter !!!";
                                                if (!KvLib.evalPrgA(gr.userInputObjA[j].sobj, "filter", errKey))
                                                    break;
                                            }
                                            gr.userInputObjA[j].ioValue = outData;
                                            gr.userInputObjA[j].chksum = valueObj.chksum;
                                        }
                                    }
                                    break;
                                }
                            }

                            break;

                    }



                }

                //console.log(tickRespDatas);


                break;
            case "loadUserSet Error":
                console.log("LoadUserSet Error");
                setCookie('userName', "", 1);
                setCookie('userId', "", 1);
                setCookie('password', "", 1);
                var timerFunc = function () {
                    window.location.reload();
                };
                setTimeout(timerFunc, 5000);
                //window.location.reload();
                break;


            case "loadUserSet":
                var errStr;

                while (true) {
                    errStr = "menberInf is null";
                    if (!mes.opts.menberInf)
                        break;
                    gr.menberInf = JSON.parse(JSON.stringify(mes.opts.menberInf));
                    lg.chg(gr.menberInf.language);

                    /*
                     var menberInf = mes.opts.menberInf;
                     gr.userName = menberInf.userName;
                     gr.userFather = menberInf.userFather;
                     gr.permition = menberInf.permition;
                     gr.accountQuota = menberInf.accountQuota;
                     gr.accountUsed = menberInf.accountQuota;
                     //========================================
                     gr.menberInf.userId = menberInf.userId;
                     gr.menberInf.password = menberInf.password;
                     gr.priLevel = menberInf.priLevel;
                     gr.userQuota = menberInf.userQuota;
                     gr.language = menberInf.language;
                     gr.leftMenu = menberInf.leftMenu;
                     */

                    //========================================
                    errStr = "menber value is null";
                    if (!mes.opts.value)
                        break;
                    try {
                        var objA = JSON.parse(mes.opts.value);
                    } catch (e) {
                        errStr = "menber data error !!!";
                        break;
                    }

                    if (mes.opts.dataServerStatus !== "OK") {
                        errStr = mes.opts.dataServerStatus;
                        break;
                    }
                    errStr = "OK";
                    break;
                }
                if (errStr !== "OK") {
                    var objA = [];
                    gr.menberInf = {};
                    gr.menberInf.userName = "demo";
                    gr.menberInf.userFather = "root";
                    gr.menberInf.permition = 400;
                    gr.menberInf.accountQuota = 0;
                    gr.menberInf.accountUsed = 0;
                    //========================================
                    gr.menberInf.userId = "guest";
                    gr.menberInf.password = "0000";
                    gr.menberInf.priLevel = 400;
                    gr.menberInf.userQuota = 0;
                    gr.menberInf.language = "english";
                    gr.menberInf.leftMenu = "1";
                    //========================================
                    var errStop_f = 1;
                }

                var strA;
                gr.showPageMaxInx = 0;
                loadLayoutSet("clearAll");
                gr.showPageName = [];
                gr.buildModelObjs = [];
                gr.userClassNames = [];
                gr.leftMenuPages = [];
                gr.helpMenuPages = [];
                gr.userDispTypes = [];
                gr.globalDispTypes = [];
                gr.googleMapKeys = [];
                window.kw.watch.messageBarText = "";


                for (let i = 0; i < objA.length; i++) {
                    strA = objA[i].key.split("~");

                    if (strA[0] === "global") {
                        switch (strA[1])
                        {
                            case "userClassNames":
                                gr.globalClassNames = objA[i].value.split("~");
                                if (gr.globalClassNames) {
                                    for (let i = 0; i < gr.globalClassNames.length; i++)
                                        if (gr.globalClassNames[i] !== "")
                                            gr.typeEnum.push(gr.globalClassNames[i]);
                                }
                                break;
                            case "displayType":
                                gr.globalDispTypes.push(objA[i].value);
                                break;


                        }

                    }


                    if (strA[0] !== gr.menberInf.userName)
                        continue;
                    //console.log("loadUserSet.key = " + objA[i].key);
                    switch (strA[1])
                    {
                        case "layoutSet":
                            loadLayoutSet(strA[2], objA[i].value);
                            break;
                        case "showPageName":
                            if (objA[i].value >= gr.showPageMaxInx)
                                gr.showPageMaxInrex = objA[i].value;
                            gr.showPageName.push({pageName: strA[2], inx: objA[i].value});
                            break;
                        case "userClassNames":
                            gr.typeEnum = [];
                            gr.typeEnum.push("ValueUpDown");
                            gr.typeEnum.push("SelectEnum");
                            //====================================
                            gr.typeEnum.push("SelectPanel");
                            gr.typeEnum.push("ButtonPanelX");
                            gr.typeEnum.push("StatusBar");
                            gr.typeEnum.push("SelectBoxS");
                            gr.typeEnum.push("InputLine");
                            gr.typeEnum.push("PopContainer");
                            gr.typeEnum.push("ButtonPanelY");
                            gr.typeEnum.push("ModelContainer");
                            gr.userClassNames = objA[i].value.split("~");
                            if (gr.userClassNames) {
                                for (let i = 0; i < gr.userClassNames.length; i++) {
                                    if (gr.userClassNames[i] !== "")
                                        gr.typeEnum.push(gr.userClassNames[i]);
                                }
                            }
                            break;
                        case "buidModelAll":
                            var buidModeObj = {};
                            var allObj = objA[i].value;
                            buidModeObj.pageName = strA[2];
                            buidModeObj.value = allObj.value;
                            buidModeObj.pageInput = allObj.pageInput;
                            buidModeObj.pageOutput = allObj.pageOutput;
                            if (buidModeObj.pageInput === undefined)
                                buidModeObj.pageInput = [];
                            if (buidModeObj.pageOutput === undefined)
                                buidModeObj.pageOutput = [];
                            gr.buildModelObjs.push(buidModeObj);
                            for (let k = 0; k < buidModeObj.value.length; k++) {
                                if (buidModeObj.value[k].className === "Component") {
                                    if (buidModeObj.value[k].type === "googleMap") {
                                        if (buidModeObj.value[k].opts.gm_apiKey) {
                                            var apiKey = buidModeObj.value[k].opts.gm_apiKey;
                                            var sameKey_f = 0;
                                            for (let m = 0; m < gr.googleMapKeys.length; m++) {
                                                if (gr.googleMapKeys[m] === apiKey) {
                                                    sameKey_f = 1;
                                                    break;
                                                }
                                            }
                                            if (!sameKey_f) {
                                                gr.googleMapKeys.push(apiKey);
                                            }
                                        }
                                    }
                                    break;
                                }
                            }
                            break;
                        case "userInnerIoObj":
                            var recObj = objA[i].value;
                            gr.userInnerIoObjA = recObj.userInnerIoObjA;
                            break;
                        case "userInputObj":
                            var recObj = objA[i].value;
                            gr.userInputObjA = recObj.userInputObjA;
                            break;
                        case "userOutputObj":
                            var recObj = objA[i].value;
                            gr.userOutputObjA = recObj.userOutputObjA;
                            break;
                        case "userConstantObj":
                            var recObj = objA[i].value;
                            gr.userConstantObjA = recObj.userConstantObjA;
                            break;
                        case "userInputAcion":
                            var recObj = objA[i].value;
                            gr.userInputActionA = recObj.userInputActionA;
                            break;
                        case "displayType":
                            gr.userDispTypes.push(objA[i].value);
                            break;


                    }
                }
                setCookie('userName', gr.menberInf.userName, 1);
                setCookie('userId', gr.menberInf.userId, 1);
                setCookie('password', gr.menberInf.password, 1);
                //============================================
                var versionUpdate = (new Date()).getTime();
                //=============================
                console.log(document.URL);
                var script = document.createElement('script');
                script.src = "user-" + "global" + "/userLib.js?v=" + versionUpdate;
                document.head.appendChild(script); //or something of the likes            
                //                                                                                                        
                var script = document.createElement('script');
                script.src = "user-" + gr.menberInf.userName + "/userClass.js?v=" + versionUpdate;
                document.head.appendChild(script); //or something of the likes            
                //================================
                for (let k = 0; k < gr.googleMapKeys.length; k++) {
                    var script = document.createElement('script');
                    script.src = "https://maps.googleapis.com/maps/api/js?key=" + gr.googleMapKeys[k];//AIzaSyDOlTL0xvlXJGN1gnqcV4zxEPhQW5rmd8Q
                    document.head.appendChild(script); //or something of the likes            
                }
                //================================
                var script = document.createElement('script');
                script.src = "user-" + gr.menberInf.userName + "/userLib.js?v=" + versionUpdate;
                document.head.appendChild(script); //or something of the likes            
                script.onload = function () {
                    gr.userSetLoaded = true;
                    if (gr.leftMenuPages.length > 0)
                        gr.contentPage = gr.leftMenuPages[0].page;
                    gr.leftMenuIndex = 0;
                    if (!errStop_f) {
                        dispWebPage("mainPage0");
                    }
                };

                if (!errStop_f) {
                    gr.editPageName = "";
                    BuildPanelA.clrBuildPanelA();
                    break;
                }
                var errFunc = function () {
                    gr.editPageName = "";
                    BuildPanelA.clrBuildPanelA();
                    gr.leftMenuIndex = 0;
                    dispWebPage("mainPage0");
                };
                FnDebug.messageBox("error", 600, [errStr], ["ESC"], errFunc);
                /*
                 $.ajax({
                 url: document.URL + "user-" + gr.menberInf.userName + "/userLib.js?v=" + versionUpdate,
                 type: 'HEAD',
                 error: function ()
                 {
                 console.log("Error")
                 setCookie('userName', "kevin", 1);
                 setCookie('password', "1234", 1);
                 window.location.reload();
                 },
                 success: function ()
                 {
                 console.log("Yes")
                 }
                 });
                 */


                /* 
                 if (gr.leftMenuPages.length > 0)
                 gr.contentPage = gr.leftMenuPages[0].page;
                 dispWebPage("mainPage0");
                 */
                break;
            case "connectFirst":
                console.log("connectFirst");
                break;
            case "loadFileNames":
                gr.loadFileNames = JSON.parse(mes.opts.value);
                break;
            case "view result":
                FnDebug.viewInf(mes.opts.value);
                break;

        }
    }

}

var sv = new Server();
