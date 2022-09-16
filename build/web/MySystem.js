/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gr, KvLib, Kext, Component, ani */

//################################################################################
class MySystem {
    constructor() {
        this.baseTimerCnt = 0;
        this.baseTimerBuf = 0;
        this.baseTimerFlag = 0;
        this.secCnt = 0;
        this.hintKvObj = null;
    }

    webInit() {
        var gr = window.gr;
        var elem = document.getElementById('rootBody');
        //===========================================================
        elem.style.width = gr.clientW + 'px';
        elem.style.height = gr.clientH + 'px';
        elem.innerHTML = "";
        //============================================================
        var elemPop = document.getElementById("rootBody");
        elemPop.innerHTML = "";
        gr.mouseFuncPara = null;
        //============================================================
        gr.scrollWidth = KvLib.getScrollbarWidth();
        //=======================================================


    }
    dispWebPage(pageName) {
        var self = this;
        let gr = window.gr;
        //gr.webPage = "josnPage";
        if (pageName)
            gr.webPage = pageName;
        self.webInit();
        console.log("gr.webPage= " + gr.webPage);
        switch (gr.webPage) {
            case "mainPage0":
                break;
            case "showLogo":
                break;
            case "loginBox":
                break;
            case "buildPage":
                break;
            case "josnPage":
                break;
            case "webFramePage":
                gr.mdMain = new Model("mdTest", "Md_test~a", {}, {});
                gr.mdMain.build();
                gr.mdMain.create("rootBody");
                break;
        }
        gr.mdSystem = new Model("mdSystem", "Md_system", {}, {});
        gr.mdSystem.build();
        gr.mdSystem.create("rootBody", -1000, 0, 100, 100);

    }

    repaint(para)
    {
        var self = this;
        var gr = window.gr;
        var repaint_f = gr.repaint_f;
        gr.repaint_f = 0;
        if (gr.window_innerWidth_old !== window.innerWidth)
        {
            gr.window_innerWidth_old = window.innerWidth;
            repaint_f = 1;
            console.log("window.innerWidth change");
        }
        if (gr.window_innerHeight_old !== window.innerHeight)
        {
            gr.window_innerHeight_old = window.innerHeight;
            repaint_f = 1;
            console.log("window.innerHeight change");
        }
        gr.clientH=window.innerHeight-1;
        gr.clientW=window.innerWidth-1;
        //======================================================
        if (para === 1)
            repaint_f = 1;
        if (repaint_f === 0)
            return;
        self.dispWebPage();
    }

    //period= Animate.period, unit: ms, about 16ms.
    baseTimer() {
        var self = window.sys;
        self.baseTimerCnt++;
        self.baseTimerFlag = self.baseTimerCnt ^ self.baseTimerBuf;
        self.baseTimerBuf = self.baseTimerCnt;
        //=================
        self.repaint(0);
        gr.mdMain.chkWatch();
        gr.mdSystem.chkWatch();
        self.checkMessage();
        ani.check();
        if (this.hintKvObj) {
            var elem = document.getElementById(this.hintKvObj);
            if (!elem) {
                self.delKvHint();
            }
        }
    }

    setKvHint(kvObj, hint) {
        var len = ani.animates.length;
        for (var i = len - 1; i >= 0; i--) {
            var aobj = ani.animates[i];
            if (aobj.elemId === "hintId") {
                ani.animates.splice(i, 1);
            }
        }
        var elem = kvObj.elems["base"];
        if (!elem)
            return;
        var pos = KvLib.getPosition(elem);
        var size = KvLib.hint(hint, -9999, pos.y);
        this.hintKvObj = kvObj.elems["base"].id;
        size.w += 4;

        var stx = pos.x + kvObj.stas.rw - size.w;
        var endx = stx + size.w;
        if ((endx + size.w) > gr.clientW) {
            stx = pos.x;
            endx = stx - size.w;
        }

        ani.setT("hintId", "moveX", endx, endx, 200, 1000);
        ani.setT("hintId", "opacity", 0, 1, 200, 1000);
    }
    delKvHint() {
        var hint = document.getElementById("hintId");
        if (hint) {
            document.body.removeChild(hint);
        }
        this.hintKvObj = null;
    }

    checkMessage() {
        if (!gr.messageKobj)
            return;
        var chg = 0;
        if (gr.messageKobj.opts.innerText !== gr.message) {
            gr.messageKobj.opts.innerText = gr.message;
            chg = 1;
        }
        if (gr.messageKobj.opts.innerTextColor !== gr.messageColor) {
            gr.messageKobj.opts.innerTextColor = gr.messageColor;
            chg = 1;
        }
        if (!chg)
            return;
        var self = this;
        self.setMessageBar(gr.messageKobj, gr.message, gr.messageColor, gr.messageTime);

    }

    setMessage(mes, color, time) {
        if (!color)
            color = "#000";
        if (!time)
            time = 0;
        gr.message = mes;
        gr.messageColor = color;
        gr.messageTime = time;
    }

    indexLoaded() {
        Component.init();
        var baseTimerId;
        var elem = document.getElementById("rootBody");
        elem.style.position = "absolute";
        elem.style.overflow = "hidden";
        elem.style.backgroundColor = gr.baseColor;
        elem.style.left = "0px";
        elem.style.top = "0px";
        elem.style.width = window.innerWidth + "px";
        elem.style.height = window.innerHeight + "px";

        /*
         gr.mdMain = new Model("mdTest", "Md_test~a", {}, {mode: "editaa"});
         gr.mdMain.build();
         gr.mdMain.create("rootBody");
         
         gr.mdSystem = new Model("mdSystem", "Md_system", {}, {mode: "editdd"});
         gr.mdSystem.build();
         gr.mdSystem.create("rootBody", -1000, 0, 100, 100);
         */
        ani.setTimer();
        //gr.baseTimerId = setInterval(sys.baseTimer, 10);



        // Model.test();


    }

    setIpObj(type, inputName, optName) {
        var ipObj = {};
        ipObj.type = type;
        ipObj.inputName = inputName;
        ipObj.optName = optName;
        ipObj.period = 1;
        ipObj.cnt = 0;
        return ipObj;
    }

    setWatch(self, optsName, value) {
        //self.watch["_sysReDraw_f"] = 1;
        self.watch[optsName] = 1;
        if (value !== undefined)
            self.opts[optsName] = value;
    }
    setReDraw(self, optsName, value) {
        self.watch["_sysReDraw_f"] = 1;
        if(!optsName)
            return;
        self.watch[optsName] = 1;
        if (value !== undefined)
            self.opts[optsName] = value;
    }

    inputWatch(self) {
        for (var i = 0; i < self.opts.inputRegs.length; i++) {
            var ipObj = self.opts.inputRegs[i];
            ipObj.cnt++;
            if (ipObj.cnt < ipObj.period)
                continue;
            ipObj.cnt = 0;
            if (ipObj.type === "directName") {
                var value;
                var str = "value=" + ipObj.inputName;
                try {
                    eval(str);
                } catch (except) {
                    continue;
                }
                if (self.opts[ipObj.optName] !== value) {
                    sys.setWatch(self, ipObj.optName, value);
                }
            }
        }
    }

    checkWatch(self) {
        var keys = Object.keys(self.watch);
        if (keys.length === 0)
            return;
        if (self.watch["_sysReDraw_f"]) {
            if (!self.stas.fhid) {
                self.watch = {};
                return;
            }
            var child = document.getElementById(self.kid);
            var parent = document.getElementById(self.stas.fhid);
            if (!parent || !child) {
                self.watch = {};
                return;
            }
            parent.removeChild(child);
            var fhid = self.stas.fhid;
            var x = self.stas.fx;
            var y = self.stas.fy;
            var w = self.stas.fw;
            var h = self.stas.fh;
            self.build();
            self.create(fhid, x, y, w, h);
            self.watch = {};
        }
    }
    setMessageBar(self, mes, color, msTime) {
        if (!self)
            return;
        sys.setWatch(self, "innerText", mes);
        sys.setWatch(self, "innerTextColor", color);
        if (msTime === 0)
            return;
        var timePrg = function () {
            sys.setWatch(self, "innerText", "");
            sys.setWatch(self, "innerTextColor", "#000");
            gr.message = "";
            gr.messageColor = "#000";
        };
        setTimeout(timePrg, msTime);
    }

    mesBox(title, width, mes, buttons, func) {
        var iobj = {};
        var strA=title.split("~");
        switch (strA[0]) {
            case "cy":
                iobj.title = strA[1];
                iobj.titleColor = "#ff0";
                break;
            case "ca":
                iobj.title = strA[1];
                iobj.titleColor = "#ccc";
                break;
            case "cr":
                iobj.title = "Error";
                iobj.titleColor = "#f00";
                break;
            case "cg":
                iobj.title = "OK.";
                iobj.titleColor = "#0f0";
                break;
            default:
                iobj.title = title;
                iobj.titleColor = "#ccc";
                break;


        }
        iobj.messages = [mes];
        iobj.actionFunc = func;
        if (buttons)
            iobj.buttons = buttons;
        else
            iobj.buttons = ["ESC"];
        iobj.width = width;
        this.messageBox(iobj);
    }

    messageBox(iobj) {
        if (!iobj.width)
            iobj.width = 700;
        if (!iobj.buttons)
            iobj.buttons = ["ESC"];
        var opts = {};
        opts.messages = iobj.messages;
        opts.buttons = iobj.buttons;
        opts.title = iobj.title;
        opts.titleColor = iobj.titleColor;
        opts.actionFunc = iobj.actionFunc;
        var mod = new Model("", "Md_messageBox~sys", opts, {});
        var itemHeight = 30;
        var hh = mod.opts.titleHeight + mod.opts.buttonHeight;
        hh += mod.opts.tm + mod.opts.bm;
        hh += mod.opts.messages.length * itemHeight;
        hh+=4;
        var opts = {};
        opts.kvObj = mod;
        opts.w = iobj.width;
        opts.h = hh;
        opts.shadow_f = 1;
        opts.center_f = 1;
        gr.mdSystem.mdClass.popMaskOn({});
        gr.mdSystem.mdClass.popOn(opts);
    }
    popModel(mod, w, h) {
        var opts = {};
        opts.kvObj = mod;
        opts.w = w;
        opts.h = h;
        this.popOnModel(opts);
    }

    popOnModel(op) {
        var self = this;
        var opts = {};
        opts.kvObj = null;
        opts.w = op.w;
        opts.h = op.h;
        opts.shadow_f = 1;
        opts.center_f = 1;
        opts.maskTouchOff_f = 0;
        KvLib.coverObject(opts, op);
        var maskOpts = {};
        maskOpts.clickFunc = function () {
            self.popOff(2);
        };
        if (!opts.maskTouchOff_f)
            maskOpts = {};
        gr.mdSystem.mdClass.popMaskOn(maskOpts);
        gr.mdSystem.mdClass.popOn(opts);
    }

    popOff(cnt) {
        gr.mdSystem.mdClass.popOff(cnt);
    }
    popList(iobj) {
        var kvObj = iobj.kvObj;
        var op = kvObj.opts;
        var md = iobj.md;
        var minW = iobj.minW;
        if (!minW) {
            minW = kvObj.stas.w;
        }

        var popOffFunc = function () {
            gr.mdSystem.mdClass.popOff(2);
        };

        var itemSelectFunc = function (obj) {
            gr.mdSystem.mdClass.popOff(2);
            obj.act = "menuClick";
            obj.fatherKvObj = iobj.kvObj;
            iobj.actionFunc(obj);
        };


        var kexts = iobj.kexts;
        if (!kexts) {
            if (iobj.popOff_f)
                gr.mdSystem.mdClass.popOff(2);
            if (md.opts.actionFunc) {
                var obj = {};
                obj.act = "itemClick";
                obj.kvObj = kvObj;
                md.opts.actionFunc(obj);
                return;
            }
        } else {


            var opts = {};
            opts.listTexts = [];
            opts.preTexts = [];
            opts.afterTexts = [];
            opts.ids = [];
            opts.tm = 10;
            opts.bm = 10;
            opts.ih = 24;
            opts.lpd = 10;
            opts.rpd = 10;
            var ph = opts.tm + opts.bm;
            var maxw = 0;
            for (var i = 0; i < kexts.length; i++) {
                var text = Kext.getText(kexts[i]);
                opts.listTexts.push(text);
                if (text === "kvd:sepLineH")
                    ph += 12;
                else
                    ph += opts.ih;
                var fontSize = KvLib.transUnit("0.6rh", 10, 100, opts.ih);
                var fontSizeObj = KvLib.measureText(text, fontSize, "normal", "monospace");
                if (fontSizeObj.w > maxw)
                    maxw = fontSizeObj.w;
                opts.preTexts.push(kexts[i].preText);
                opts.ids.push(kexts[i].id);
                //opts.lpd = iobj.lpd;
                if (md.opts.menuKexts) {
                    var sonKexts = md.opts.menuKexts[kexts[i].id];
                    if (sonKexts)
                        opts.afterTexts.push("▶");
                    else
                        opts.afterTexts.push("");
                }
            }
            maxw += opts.lpd + opts.rpd + 4 + 30;
            if (maxw < minW)
                maxw = minW;
            if (maxw > 800)
                maxw = 800;
            opts.actionFunc = itemSelectFunc;
            opts.itemId = iobj.itemId;
            var mod = new Model("", "Md_list~gray", opts, {});
            var opts = {};
            opts.kvObj = mod;
            opts.w = maxw;
            opts.h = ph;
            var pos = KvLib.getPosition(kvObj.elems["base"]);

            if (iobj.posType) {
                opts.x = pos.x;
                opts.x += kvObj.stas.rw - 10;
                opts.y = pos.y;
            } else {
                opts.y = pos.y + kvObj.stas.rh + 2;
                opts.x = pos.x;
            }


            if ((opts.x + maxw) >= (gr.clientW - 0)) {
                opts.x = gr.clientW - 0 - maxw;
                if (opts.x < 0)
                    opts.x = 0;
            }
            if ((opts.y + opts.h) >= (gr.clientH - 0)) {
                opts.y = opts.y - opts.h;
            }

            opts.shadow_f = 1;
            var maskOpts = {};
            maskOpts.clickFunc = popOffFunc;
            gr.mdSystem.mdClass.popMaskOn(maskOpts);
            gr.mdSystem.mdClass.popOn(opts);

        }

    }
    /*
     return setObj
     name, value, dataType, setType, dataRegular
     dataRegular:
     enum:
     min:
     max:
     
     dataType:
     num, str, color, ratio, dim, flag, enum, 
     str~array, none, 
     setType:
     inputNumber, inputColor, inputText, inputBoolean, select,
     inputSelect, system, inputArray
     
     */
    getOptsSet(optName, opt) {
        var setObj = {};
        setObj.name = optName;
        setObj.value = opt;
        switch (optName) {
            case "propertyWidth":
                setObj.dataType = "n-num";
                setObj.setType = "inputNumber";
                setObj.max=300;
                setObj.min=0;
                return setObj;
            case "propertyHeight":
            case "margin":
            case "padding":
            case "lm":
            case "rm":
            case "tm":
            case "bm":
            case "lpd":
            case "rpd":
            case "tpd":
            case "bpd":
            case "borderWidth":
            case "maxByte":
            case "insideShadowOffx":
            case "insideShadowOffy":
            case "outsideShadowOffx":
            case "outsideShadowOffy":
            case "backgroundInx":
                setObj.dataType = "n-num";
                setObj.setType = "inputNumber";
                return setObj;
            case "baseColor":
            case "borderColor":
            case "innerTextColor":
            case "insideShadowColor":
            case "outsideShadowColor":
            case "disableTextColor":
                setObj.dataType = "color";
                setObj.setType = "selectColor";
                return setObj;
            case "iw":
            case "ih":
            case "fontSize":
            case "insideShadowWidth":
            case "outsideShadowWidth":
                setObj.dataType = "dim";
                setObj.setType = "inputText";
                return setObj;
            case "whr":
                setObj.dataType = "ratio";
                setObj.setType = "inputText";
                return setObj;
            case "center_f":
                setObj.dataType = "flag";
                setObj.setType = "inputBoolean";
                setObj.dataRegular = {};
                setObj.dataRegular.enum = ["yes", "no"];
                return setObj;
            case "wAlign":
            case "textAlign":
            case "preTextAlign":
                setObj.dataType = "enum";
                setObj.setType = "select";
                setObj.dataRegular = {};
                setObj.dataRegular.enum = ["center", "left", "right"];
                return setObj;
            case "hAlign":
                setObj.dataType = "enum";
                setObj.setType = "select";
                setObj.dataRegular = {};
                setObj.dataRegular.enum = ["center", "top", "down"];
                return setObj;
            case "onMouseOn":
            case "onMousePress":
                setObj.dataType = "enum";
                setObj.setType = "select";
                setObj.dataRegular = {};
                setObj.dataRegular.enum = ["type0", "type1"];
                return setObj;




            case "fontWeight":
                setObj.dataType = "enum";
                setObj.setType = "select";
                setObj.dataRegular = {};
                setObj.dataRegular.enum = ["100", "200", "300", "400", "500", "600", "700", "800", "900"];
                return setObj;
            case "fontStyle":
                setObj.dataType = "enum";
                setObj.setType = "select";
                setObj.dataRegular = {};
                setObj.dataRegular.enum = ["normal", "italic", "oblique"];
                return setObj;

            case "fontFamily":
                setObj.dataType = "enum";
                setObj.setType = "inputSelect";
                setObj.dataRegular = {};
                setObj.dataRegular.enum = ["sans-serif", "monospace", "digital_3"];
                return setObj;
            case "whiteSpace":
            case "backgroundRepeat":
            case "backgroundImagePosition":
            case "cursor":
            case "inputRegs":
                setObj.dataType = "str";
                setObj.setType = "system";
                return setObj;

            case "backgroundColors":
                setObj.dataType = "color~array";
                setObj.setType = "selectColor~array";
                return setObj;
            case "backgroundUrls":
                setObj.dataType = "str~array";
                setObj.setType = "inputArray";
                return setObj;



            case "hint":
            case "boxShadow":
            case "innerText":
                //case "textShadow":
                setObj.dataType = "str";
                setObj.setType = "inputText";
                return setObj;
            case "background":
                setObj.dataType = "str";
                setObj.setType = "inputSelect";
                setObj.dataRegular = {};
                setObj.dataRegular.enum = [];
                setObj.dataRegular.enum.push("linear-gradient(red, orange, yellow, green, blue)");
                setObj.dataRegular.enum.push("linear-gradient(45deg, red, blue)");
                setObj.dataRegular.enum.push("linear-gradient(135deg, orange 60%, cyan)");
                setObj.dataRegular.enum.push("radial-gradient(red, green, blue)");
                setObj.dataRegular.enum.push("radial-gradient(red 5%, green 15%, blue 60%)");
                return setObj;
            case "textShadow":
                setObj.dataType = "str";
                setObj.setType = "inputSelect";
                setObj.dataRegular = {};
                setObj.dataRegular.enum = [];
                setObj.dataRegular.enum.push("1px 1px 1px #fff");
                return setObj;


            default:
                setObj.dataType = "none";
                setObj.setType = "inputText";
                return setObj;
        }

    }

    getServerFileNames(callBackFunc,path,filter) {
        if(!path)
            path="systemResource";
        if(!filter)
            filter="*.*";
        var opts;
        var obj = {};
        obj["name"] = "read file names";
        obj["type"] = "";
        obj["opts"] = {};
        opts = obj["opts"];
        //=================================
        opts["responseType"] = "response error";
        opts["initDir"] = path + "";
        opts["compareNames"] = filter;
        //opts["initDir"] = "1234";
        //opts["fileNames"] = "5678";
        opts["responseAction"] = "exeCallBackFunc";
        gr.serverCallBack = callBackFunc;
        sv.callServer(JSON.stringify(obj));
        return;
    }
}


var sys = new MySystem();


class Kext {
    constructor(_id, _title, _chinese, _opts) {
        this.opts = _opts;
        this.id = _id;
        this.type = "text";
        this.text = {};
        this.text.english = _title;
        this.text.chinese = _chinese;
        this.sub = {};
        this.dsc = {};
        this.hint = {};
        if (_opts) {
            this.preText = _opts.preText;
            this.afterText = _opts.afterText;
            this.hint["english"] = _opts.enHint;
            this.hint["chinese"] = _opts.chHint;
            this.sub["english"] = _opts.enSub;
            this.sub["chinese"] = _opts.chSub;
            this.dsc["english"] = _opts.enDsc;
            this.dsc["chinese"] = _opts.chDsc;
        }

    }
    static getText(kext) {
        var value = kext.text[gr.language];
        if (!value)
            value = kext.text["english"];
        if (!value)
            value = "";
        return value;
    }

    getText() {
        var value = this.text[gr.language];
        if (!value)
            value = this.text["english"];
        if (!value)
            value = "";
        return value;
    }

    getSub() {
        var value = this.sub[gr.language];
        if (!value)
            value = this.sub["english"];
        if (!value)
            value = "";
        return value;
    }
    getDsc() {
        var value = this.dsc[gr.language];
        if (!value)
            value = this.dsc["english"];
        if (!value)
            value = "";
        return value;
    }
    getHint() {
        var value = this.hint[gr.language];
        if (!value)
            value = this.hint["english"];
        if (!value)
            value = "";
        return value;
    }

}

