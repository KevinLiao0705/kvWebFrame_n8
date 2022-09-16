/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

/* global sv */

class Test {
    constructor(_name, _type, _opts, _paras) {
    }

    //==========================================================================
    static testServerResponse() {
        var opts;
        var obj = {};
        obj["name"] = "test server";
        obj["type"] = "";
        obj["opts"] = {};
        opts = obj["opts"];
        //=================================
        //opts["responseType"] = "message ok";
        //opts["messageTime"] = "2000";
        opts["responseType"] = "response ok";
        sv.callServer(JSON.stringify(obj));
    }
    //--------------------------------------------------------------------------


    static setDatabaseKeyValue(table, key, value, responseType) {
        var opts;
        var obj = {};
        obj["name"] = "Hset database a";
        obj["type"] = "";
        obj["opts"] = {};
        opts = obj["opts"];
        //=================================
        if (responseType)
            opts["responseType"] = responseType;
        opts["table"] = table;
        opts["key"] = key;
        opts["value"] = JSON.stringify(value);
        callServer(JSON.stringify(obj));

    }

    static getDatabaseKey(table, key, loadElemId) {
        var opts;
        var obj = {};
        obj["name"] = "get database a";
        obj["type"] = "";
        obj["opts"] = {};
        opts = obj["opts"];
        //=================================
        opts["table"] = table;
        opts["key"] = key;
        if (loadElemId) {
            opts["loadToElemId"] = loadElemId;
            opts["responseAction"] = "loadToElem";
        }
        callServer(JSON.stringify(obj));
    }

    static loadDbValueToElem(table, key, loadElemId, secondKey) {
        var opts;
        var obj = {};
        obj["name"] = "Hget database a";
        obj["type"] = "";
        obj["opts"] = {};
        opts = obj["opts"];
        //=================================
        opts["table"] = table;
        opts["key"] = key;
        if (secondKey)
            opts["secondKey"] = secondKey;
        if (loadElemId) {
            opts["loadToElemId"] = loadElemId;
            opts["responseAction"] = "loadToElem";
        }
        callServer(JSON.stringify(obj));
    }

    static setKeyValue(table, preKey) {
        var inputBoxRet = function (event) {
            console.log(event)
            var para4Obj = event.para[4];
            while (true) {
                if (!para4Obj)
                    break;
                if (para4Obj.paras[0] === "OK") {
                    //==========================================
                    var kcObj = insts[event.para[3]].model;
                    var elemK = document.getElementById(kcObj.inputTextObjs[0].opts.inputTextId);
                    var elemV = document.getElementById(kcObj.inputTextObjs[1].opts.inputTextId);

                    var opts;
                    var obj = {};
                    obj["name"] = "Hset database a";
                    obj["type"] = "";
                    obj["opts"] = {};
                    opts = obj["opts"];
                    //=================================
                    opts["responseType"] = "response ok";
                    if (table)
                        opts["table"] = table;
                    else
                        opts["table"] = "empty";
                    if (preKey)
                        opts["key"] = preKey + "~" + elemK.value;
                    else
                        opts["key"] = elemK.value;
                    opts["value"] = JSON.stringify(elemV.value);
                    callServer(JSON.stringify(obj));
                }
                break;
            }
            sysPopOff();
            sysMaskOff();
        };
        var opts = {
            inputTexts: ["", ""],
            titles: [" key: ", " Value: "],
            eventFunction: inputBoxRet
        };
        var paras = {
            className: "InputBox",
            width: 600,
            height: 80 + opts.inputTexts.length * 36
        };
        var inputBoxObj = WebMakerLib.popWindow("InputBox", "base", opts, paras);
    }

    static getKeyValues(table, preKey) {
        this.getKeyValue("get database a values", table, preKey);
    }
    static getKeyValueOne(table, preKey) {
        this.getKeyValue("get database a", table, preKey);
    }

    static getKeyValue(name, table, preKey) {
        var inputBoxRet = function (event) {
            console.log(event)
            var para4Obj = event.para[4];
            while (true) {
                if (!para4Obj)
                    break;
                if (para4Obj.paras[0] === "OK") {
                    var kcObj = insts[event.para[3]].model;
                    var elemObj = kcObj.inputTextObjs[0];
                    var elem = document.getElementById(elemObj.opts.inputTextId);
                    //==========================================
                    var opts;
                    var obj = {};
                    obj["name"] = name;
                    obj["type"] = "";
                    obj["opts"] = {};
                    opts = obj["opts"];
                    //=================================
                    opts["responseType"] = "response ok";
                    if (table)
                        opts["table"] = table;
                    if (preKey)
                        opts["key"] = preKey + "~" + elem.value;
                    else
                        opts["key"] = elem.value;
                    opts["saveFileName"] = "testOut.js";
                    callServer(JSON.stringify(obj));

                }
                break;
            }
            sysPopOff();
            sysMaskOff();
        };
        var opts = {
            inputTexts: [""],
            titles: [" key: "],
            eventFunction: inputBoxRet
        };
        var paras = {
            className: "InputBox",
            width: 600,
            height: 80 + opts.inputTexts.length * 36
        };
        var inputBoxObj = WebMakerLib.popWindow("InputBox", "base", opts, paras);
    }

    static deleteKeyValue(table, preKey) {
        var inputBoxRet = function (event) {
            console.log(event)
            var para4Obj = event.para[4];
            while (true) {
                if (!para4Obj)
                    break;
                if (para4Obj.paras[0] === "OK") {
                    var kcObj = insts[event.para[3]].model;
                    var elemObj = kcObj.inputTextObjs[0];
                    var elem = document.getElementById(elemObj.opts.inputTextId);
                    //==========================================
                    var opts;
                    var obj = {};
                    obj["name"] = "del database a";
                    obj["type"] = "";
                    obj["opts"] = {};
                    opts = obj["opts"];
                    //=================================
                    opts["responseType"] = "response ok";
                    if (table)
                        opts["table"] = table;
                    if (preKey)
                        opts["key"] = preKey + "~" + elem.value;
                    else
                        opts["key"] = elem.value;
                    callServer(JSON.stringify(obj));

                }
                break;
            }
            sysPopOff();
            sysMaskOff();
        };
        var opts = {
            inputTexts: [""],
            titles: [" key: "],
            eventFunction: inputBoxRet
        };
        var paras = {
            className: "InputBox",
            width: 600,
            height: 80 + opts.inputTexts.length * 36
        };
        var inputBoxObj = WebMakerLib.popWindow("InputBox", "base", opts, paras);
    }

    static readServerFile(fileName) {
        var opts;
        var obj = {};
        obj["name"] = "read file";
        obj["type"] = "";
        obj["opts"] = {};
        opts = obj["opts"];
        //=================================
        opts["responseType"] = "response error";
        opts["fileName"] = fileName;
        opts["responseAction"] = "view result";
        callServer(JSON.stringify(obj));

    }

    static getUserKeys(table, preKey) {
        var opts;
        var obj = {};
        obj["name"] = "get database a keys";
        obj["type"] = "";
        obj["opts"] = {};
        opts = obj["opts"];
        //=================================
        opts["responseType"] = "response ok";
        if (table)
            opts["table"] = table;
        if (preKey)
            opts["key"] = preKey + "~*";
        else
            opts["key"] = "*";
        opts["saveFileName"] = "testOut.js";
        callServer(JSON.stringify(obj));
    }

    static trueFalseTest() {
        var testVar;
        testVar = undefined;
        console.log("undefined= " + ((testVar) ? 'true' : 'false'));
        testVar = null;
        console.log("null= " + ((testVar) ? 'true' : 'false'));
        testVar = 0;
        console.log("0= " + ((testVar) ? 'true' : 'false'));
        testVar = 1;
        console.log("1= " + ((testVar) ? 'true' : 'false'));
        testVar = "";
        console.log("\"\"= " + ((testVar) ? 'true' : 'false'));
        testVar = "1";
        console.log("\"1\"= " + ((testVar) ? 'true' : 'false'));
        testVar = [];
        console.log("[]= " + ((testVar) ? 'true' : 'false'));
        testVar = {};
        console.log("{}= " + ((testVar) ? 'true' : 'false'));
        testVar = parseInt("aaa");
        console.log(testVar);
        console.log("parseInt('aaa')= " + ((testVar) ? 'true' : 'false'));
    }

    static deepEqualTest() {
        var a = [12, 34];
        var b = [12, 34];
        console.log(a);
        console.log(b);
        console.log(KvLib.deepEqual(a, b));
        var a = [12, 34, {bb: "as", cc: [12, 34]}];
        var b = [12, 34, {bb: "as", cc: [12, 35]}];
        console.log(a);
        console.log(b);
        console.log(KvLib.deepEqual(a, b));


    }
    static showConstructorName() {
        var testVar;
        console.log("constructor.name");
        console.log("typeof");
        console.log("===============");
        testVar = 1.1;
        console.log("1.1 =" + testVar.constructor.name);
        console.log(typeof (testVar));
        console.log("===============");
        testVar = 123;
        console.log("123 =" + testVar.constructor.name);
        console.log(typeof (testVar));
        console.log("===============");
        testVar = "ABC";
        console.log("\"ABC\" =" + testVar.constructor.name);
        console.log(typeof (testVar));
        console.log("===============");
        testVar = [];
        console.log("[] =" + testVar.constructor.name);
        console.log(typeof (testVar));
        console.log("===============");
        testVar = {};
        console.log("{} =" + testVar.constructor.name);
        console.log(typeof (testVar));
        console.log("===============");
    }

    static testClass_InputLine(func) {
        console.log("inputLine");
        let gr = window.gr;
        var eventFunction = function (event) {
            console.log(event);
            KvLib.checkEvent(event);
            sysPopOff();
            sysMaskOff();
            if (event.para[4].paras[2] === "ESC")
                return;
            KvLib.exeFunc(func,{text:event.para[4].paras[0]});
        };
        var opts = {
            title: "",
            eventFunction: eventFunction,
            inputTexts: "",
            paras: [],
            end: 0
        };
        if (!opts.title)
            opts.title = "Input";
        var paras = {
            newClass: 'new InputLine(myName, type, opts,paras);',
            width: 600,
            height: 120,
            paras: [],
            end: 0
        };
        sysMaskShow("popMask", "", {opacity: '0.7'});
        var obj = sysPopShow("testClassInputLine", "base", opts, paras);
        var inputTextElemId = obj.model.inputTextObj.opts.inputTextId;
        document.getElementById(inputTextElemId).focus();
    }    

    static testClass_InputBox() {
        console.log("inputLine");
        let gr = window.gr;
        var eventFunction = function (event) {
            console.log(event);
            sysPopOff();
            sysMaskOff();
            if (event.para[4].paras[0] === "ESC")
                return;
        };
        var opts = {
            eventFunction: eventFunction,
            titles: [
                "title 1",
                "title 2",
                "title 3",
                "title 4",
                "title 5",
                "title 6"
            ],
            inputTexts: [
                "inputText 1",
                "inputText 2",
                "inputText 3",
                "inputText 4",
                "inputText 5",
                "inputText 6"
            ],
            units: [
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            enums: [
                [],
                ["aa", "bb"],
                [],
                [],
                [],
                []
            ],
            readOnlys: [0, 1, 0, 0, 0, 0],
            end: 0
        };
        var paras = {
            //newClass: 'new InputBox(myName, type, opts,paras);',
            className: "InputBox",
            width: 600,
            height: opts.titles.length * 36 + 70,
            end: 0
        };
        WebMakerLib.popWindow("testClass_InputBox", "base", opts, paras);
        //sysMaskShow("mask", "base", {opacity: '0.7'});
        //sysPopShow("testClassInputBox", "base", opts, paras);
    }    

    static testClass_EditMemoPanel(_text,_opts) {
        var retFunc = function (event) {
            sysPopOff();
            sysMaskOff();
        };
        var paras = {
            className: "EditMemoPanel"
        };
        var opts = {
            fullScreen_f: 1,
            title: "",
            text: "",
            readOnly_f: 1,
            eventFunction: retFunc,
            end: 0
        };
        if(_opts){
            if(_opts.fullScreen_f!==undefined)
                opts.fullScreen_f=_opts.fullScreen_f;
            if(_opts.title)
                opts.title=_opts.title;
            if(_opts.readOnly_f!==undefined)
                opts.readOnly_f=_opts.readOnly_f;
            if(_opts.nowrap_f!==undefined)
                opts.nowrap_f=_opts.nowrap_f;
            if(_opts.eventFunction)
                opts.eventFunction=_opts.eventFunction;
        }
        if(_text)
            opts.text=_text;
        WebMakerLib.popWindow("testClass_EditMemoPanel", "base", opts, paras);
    }

    static testClass_UrlViewPanel(_urls) {
        var retFunc = function (event) {
            sysPopOff();
            sysMaskOff();
        };
        var paras = {
            className: "UrlViewPanel"
        };
        var opts = {
            fullScreen_f: 1,
            eventFunction: retFunc,
            //urlType:"image",
            urls: _urls,
            //urls : ["./systemResource/tpms_1920x1080.png","./josnWebSet/show3_800x600.JPG"],
            //urlType:"pdf",
            //urls : ["./systemResource/introduce.pdf"],
            //urlType:"txt",
            //urls : ["./systemResource/test.txt"],
            //urlType:"mp4",
            //urls : ["./systemResource/test.mp4"],

            end: 0
        };
        WebMakerLib.popWindow("testClass_UrlViewPanel", "base", opts, paras);
    }

    static testClass_passwordBox() {
        var retFunc = function (paraObj) {
            if (paraObj.paras[0] === "OK") {
                window.gr.editWebUserName = paraObj.paras[2];
                window.gr.editWebPassword = paraObj.paras[3];
            }
            sysPopOff();
            sysMaskOff();
        };
        var opts = {
            eventFunction: retFunc,
            titles: ["username:", "password:"],
            inputTexts: ["", ""],

            end: 0
        };
        var paras = {
            className: "PasswordBox",
            width: 600,
            height: opts.titles.length * 36 + 70,
        };
        WebMakerLib.popWindow("testClass_PasswordBox", "base", opts, paras);
    }

    static testClass_WebEditBox() {
        var retFunc = function (paraObj) {
            if (paraObj.paras[0] === "OK") {
            }
            sysPopOff();
            sysMaskOff();
        };
        var opts = {
            fullScreen_f: 1,
            eventFunction: retFunc,
            end: 0
        };
        var paras = {
            className: "WebEditBox",
            fullScreen_f: 1
        };
        WebMakerLib.popWindow("testClass_WebEditBox", "base", opts, paras);
    }

    static testClass_contactUs() {
        var retFunc = function (event) {
            sysPopOff();
            sysMaskOff();
        };
        var paras = {
            className: "ContactUsBox"
        };
        var opts = {
            title: "",
            text: "",
            readOnly_f: 1,
            eventFunction: retFunc,
            end: 0
        };
        WebMakerLib.popWindow("testClass_ContactUsBox", "base", opts, paras);
    }

    static testClass_StringValueSetBox() {
        var paras = {
            className: "StringValueSetBox",
            width: 800,
            height: 600
        };
        var opts = {
            setNames: [],
            setValues: [],
            setFuncs: [],
            enums: [],
            types: [],
            noCheck_f: 1,
            noButton_f: 0,
            title: ""
        };
        WebMakerLib.popWindow("testClass_EditMemoPanel", "base", opts, paras);

    }

}

