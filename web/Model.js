/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global KvLib, Layout, gr, Component, sys, Kext, Test, ani, mac */


//===========================================
class Model {

    constructor(_name, _type, _opts, _paras) {
        this.name = _name;
        this.type = _type;
        this.opts = this.initOpts();
        this.paras = this.initParas();
        this.kid = KvLib.genKid();
        this.popOnCnt = 0;

        this.watch = {};
        this.stas = {};
        //=============================
        this.fatherMd = null;
        this.layZinxMap = new Map();
        this.lyMap = new Map();
        //==============================

        KvLib.deepCoverObject(this.opts, _opts);
        KvLib.coverObject(this.paras, _paras);
        gr.kidMap.set(this.kid, this);
    }

    initOpts() {
        var obj = {};
        var strA = this.type.split("~");
        this.baseType = strA[0];
        this.subType = strA[1];
        if (this.baseType !== "xxxx") {
            this.mdClass = eval("new " + this.baseType + "()");
            obj = this.mdClass.initOpts(this);
        }
        return obj;
    }

    initParas() {
        var paras = {};
        return paras;
    }

    chkWatch() {
        if (this.models) {
            var modleKeys = Object.keys(this.models);
            for (var i = 0; i < modleKeys.length; i++) {
                var md = this.models[modleKeys[i]];
                if (md.mdClass.chkWatch)
                    md.mdClass.chkWatch();
                md.chkWatch();
            }
        }
        if (this.comps) {
            var compKeys = Object.keys(this.comps);
            for (var i = 0; i < compKeys.length; i++) {
                var comp = this.comps[compKeys[i]];
                comp.chkWatch();
            }
        }
        /*
         var modKeys = Object.keys(this.models);
         for (var i = 0; i < modKeys.length; i++) {
         var mod = this.models[modKeys[i]];
         mod.chkWatch();
         }
         */

    }

    create(fhid, x, y, w, h) {
        this.fhid = fhid;
        var self = this;
        var st = self.stas;
        var op = self.opts;
        var felem = document.getElementById(fhid);
        if (!felem)
            return;
        st.fhid = fhid;
        if (x === undefined || x === null)
            x = 0;
        if (y === undefined || y === null)
            y = 0;
        if (w === undefined || w === null) {
            w = felem.clientWidth;
            if (!w)
                w = 0;
        }
        if (h === undefined || h === null) {
            h = felem.clientHeight;
            if (!h)
                h = 0;
        }
        st.fx = x;
        st.fy = y;
        st.fw = w;
        st.fh = h;
        st.fhid = fhid;
        //this.layout.create(fhid, x, y, w, h, 1);
        //self.layouts["c"].create(fhid, x, y, w, h, 1);

        for (var cname in self.layouts) {
            var layout = self.layouts[cname];
            if (cname === "c") {
                self.layouts[cname].create(fhid, x, y, w, h, 1);
                continue;
            } else {
                var strA = cname.split("~");
                var fname = "";
                for (var i = 0; i < strA.length - 1; i++) {
                    if (i !== 0)
                        fname += "~";
                    fname += strA[i];
                }
                if (self.layouts[fname]) {
                    var fLayout = self.layouts[fname];
                    if (!fLayout.stas.lyRects)
                        continue;

                    for (var i = 0; i < fLayout.stas.lyRects.length; i++) {
                        if (!fLayout.stas.lyRects)
                            continue;
                        var rect = fLayout.stas.lyRects[i];
                        if (rect.name !== cname)
                            continue;
                        var x = rect.x;
                        var y = rect.y;
                        var w = rect.w;
                        var h = rect.h;
                        var fhid = rect.fhid;

                        for (var key in self.opts.layoutGroups) {
                            if (cname.includes(key)) {
                                if (!self.stas.layoutGroups[key])
                                    continue;
                                var group = self.stas.layoutGroups[key];
                                //fhid=group.fhid;
                                //x=x-group.x;
                                //y=y-group.y;
                                break
                            }
                        }

                        self.layouts[cname].create(fhid, x, y, w, h);
                        break;
                    }
                }
            }
        }

        if (this.mdClass.afterCreate)
            this.mdClass.afterCreate();

    }

    clearAll(cname) {
        var self = this;
        self.clear(cname);
        var keys = Object.keys(self.layouts);
        for (var i = 0; i < keys.length; i++) {
            if (keys[i].includes(cname))
                delete self.layouts[keys[i]];
        }
    }

    clear(cname) {
        var self = this;
        var st = self.stas;
        if (cname) {
            var keys = Object.keys(self.comps);
            for (var i = 0; i < keys.length; i++) {
                if (keys[i].includes(cname))
                    self.comps[keys[i]].clear();
            }
            var keys = Object.keys(self.models);
            for (var i = 0; i < keys.length; i++) {
                if (keys[i].includes(cname))
                    self.models[keys[i]].clear();
            }
            return;
        }
        var child = document.getElementById(self.stas.rootId);
        var parent = document.getElementById(self.stas.fhid);
        if (child)
            parent.removeChild(child);
        var name = self.name;
        if (!this.fatherMd)
            return;
        delete this.fatherMd.models[this.cname];
        delete this.fatherMd.modelRefs[name];
    }

    reCreate(cname, newKvObj) {
        var self = this;
        if (!cname) {
            var oldOpts = JSON.parse(JSON.stringify(self.opts));
            oldOpts.actionFunc = self.opts.actionFunc;
        }
        if (!this.fatherMd && !cname) {
            self = this;
            var kvObj = this;
            var name = kvObj.name;
            var type = kvObj.type;
            var opts = kvObj.opts;
            var paras = kvObj.paras;
            var cname = kvObj.cname;
            var className = kvObj.constructor.name;
            var rect = {};
            rect.fhid = kvObj.stas.fhid;
            rect.fh;
            rect.fw;
            rect.fx;
            rect.fy;

            kvObj.clear();
            var kvObj = eval("new " + className + "(name,type,opts,paras);");
            gr.mdMain = kvObj;
            kvObj.build();
            kvObj.create(rect.fhid, rect.x, rect.y, rect.w, rect.h);
            return;
        }


        if (!cname) {
            cname = this.cname;
            self = this.fatherMd;
        }
        if (!cname)
            return;
        if (self.layouts[cname]) {
            var rects = self.layouts[cname].stas.lyRects;
            for (var i = 0; i < rects.length; i++) {
                self.reCreate(cname + "~" + i);
            }
            return;
        }



        if (self.comps[cname])
            var kvObj = self.comps[cname];
        if (self.models[cname])
            var kvObj = self.models[cname];
        if (!kvObj)
            return;
        var strA = cname.split("~");
        var lyCname = "";
        for (var i = 0; i < strA.length - 1; i++) {
            if (i !== 0)
                lyCname += "~";
            lyCname += strA[i];
        }
        if (!self.layouts[lyCname])
            return;
        var rects = self.layouts[lyCname].stas.lyRects;
        for (var i = 0; i < rects.length; i++) {
            if (rects[i].name !== cname)
                continue;
            var rect = rects[i];
            if (!newKvObj) {
                var name = kvObj.name;
                var type = kvObj.type;
                var opts = kvObj.opts;
                var paras = kvObj.paras;
                var cname = kvObj.cname;
                var mdClass = kvObj.mdClass;
                var className = kvObj.constructor.name;
                kvObj.clear();
                var kvObj = eval("new " + className + "(name,type,opts,paras);");
                if (oldOpts) {
                    kvObj.opts = oldOpts;
                }
                if (className === "Component") {
                    self.comps[cname] = kvObj;
                    if (name)
                        self.compRefs[name] = kvObj;
                }
                if (className === "Model") {
                    self.models[cname] = kvObj;
                    if (name)
                        self.modelRefs[name] = kvObj;
                }
                kvObj.fatherMd = self;
                kvObj.cname = cname;
                kvObj.build();
                kvObj.create(rect.fhid, rect.x, rect.y, rect.w, rect.h);
                if (mdClass)
                    mdClass.md = kvObj;
            } else {
                if (self.comps[cname])
                    var oldKvObj = self.comps[cname];
                if (self.models[cname])
                    var oldKvObj = self.models[cname];
                if (oldKvObj)
                    oldKvObj.clear();
                var className = newKvObj.constructor.name;
                if (className === "Component") {
                    self.comps[cname] = newKvObj;
                    if (name)
                        self.compRefs[name] = newKvObj;
                }
                if (className === "Model") {
                    self.models[cname] = newKvObj;
                    if (name)
                        self.modelRefs[name] = newKvObj;
                }
                newKvObj.fatherMd = self;
                newKvObj.build();
                newKvObj.create(rect.fhid, rect.x, rect.y, rect.w, rect.h);
            }
        }
    }

    build() {
        var md = this;
        md.opts.layouts = {};
        md.opts.comps = {};
        md.opts.models = {};
        md.opts.layoutGroups = {};
        md.lyMap = new Map();
        //======================================================================
        this.mdClass.build(md);
        //======================================================================
        md.layouts = {};
        md.layoutRefs = {};
        for (var cname in md.opts.layouts) {
            var layout = md.opts.layouts[cname];
            md.layouts[cname] = new Layout(layout.name, layout.type, layout.opts, md.paras);
            md.layoutRefs[layout.name] = md.layouts[cname];
            md.layouts[cname].build();
            md.layouts[cname].fatherMd = md;
            md.layouts[cname].cname = cname;
        }
        //======================================================================
        md.comps = {};
        md.compRefs = {};
        for (var cname in md.opts.comps) {
            var cmp = md.opts.comps[cname];
            md.comps[cname] = new Component(cmp.name, cmp.type, cmp.opts, md.paras);
            if (cmp.name)
                md.compRefs[cmp.name] = md.comps[cname];
            md.comps[cname].build();
            md.comps[cname].fatherMd = md;
            md.comps[cname].cname = cname;
        }
        //======================================================================
        md.models = {};
        md.modelRefs = {};
        for (var cname in md.opts.models) {
            var mod = md.opts.models[cname];
            md.models[cname] = new Model(mod.name, mod.type, mod.opts, md.paras);
            if (mod.name)
                md.modelRefs[mod.name] = md.models[cname];
            md.models[cname].build();
            md.models[cname].fatherMd = md;
            md.models[cname].cname = cname;
        }
        //======================================================================
    }

    setFarme(opts) {
        var op = this.opts;
        opts.borderWidth = op.borderWidth;
        opts.outsideShadowWidth = op.outsideShadowWidth;
        opts.outsideShadowOffx = op.outsideShadowOffx;
        opts.outsideShadowOffy = op.outsideShadowOffy;
        opts.outsideShadowColor = op.outsideShadowColor;
        opts.borderColor = op.borderColor;
        opts.color = op.baseColor;
    }

}
//===========================================
class Md_test {
    initOpts(md) {
        var obj = {};
        //obj.pageName = "testComponent_2";
        //obj.pageName = "testComponent_1";
        obj.pageName = "testModel_1";
        return obj;
    }
    buildPage() {
        var self = this;
        if (self.md.opts.pageName === "testComponent_1")
            self.buildPageTestComponent_1();
        if (self.md.opts.pageName === "testComponent_2")
            self.buildPageTestComponent_2();
        if (self.md.opts.pageName === "testModel_1")
            self.buildPageTestModel_1();
    }

    buildPageTestModel_1() {
        var md = this.md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var cname = lyMap.get("body");
        var opts = {};
        models[cname] = {name: "editOptsDialog", type: "Md_editOptsBox~dark", opts: opts};
    }

    buildPageTestComponent_2() {
        var md = this.md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;

        var actionFunc = function (obj) {
            console.log(obj);
        };

        var cname = "c~1";
        layouts[cname] = {name: cname, type: "base", opts: {xc: 3, yc: 1}};
        lyMap.set("body", cname);

        var cname = lyMap.get("body") + "~" + 0;
        layouts[cname] = {name: cname, type: "base", opts: {xc: 1, yc: 28}};
        lyMap.set("body1", cname);


        var cname = lyMap.get("body1") + "~" + 0;
        var opts = {};
        opts.setType = "inputText";
        opts.value = "This is text.";
        models[cname] = {name: "testMdEditOptsLine", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + 1;
        var opts = {};
        opts.setType = "inputPassword";
        opts.value = "password";
        models[cname] = {name: "testMdEditOptsLine1", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + 2;
        var opts = {};
        opts.setType = "inputDate";
        opts.value = "2018-12-23";
        models[cname] = {name: "testMdEditOptsLine1", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + 3;
        var opts = {};
        opts.setType = "inputDatetime";
        opts.value = "2018-12-23T12:34";
        models[cname] = {name: "testMdEditOptsLine1", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + 4;
        var opts = {};
        opts.setType = "inputEmail";
        opts.value = "kevin.josn@gmail.com";
        models[cname] = {name: "testMdEditOptsLine1", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + 5;
        var opts = {};
        opts.setType = "inputTel";
        opts.value = "0975-801797";
        models[cname] = {name: "testMdEditOptsLine1", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + 6;
        var opts = {};
        opts.setType = "inputRadio";
        opts.value = "-1~123~456~ABCD";
        opts.selectHint = "Please Select!";
        models[cname] = {name: "testMdEditOptsLine1", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + 7;
        var opts = {};
        opts.setType = "inputCheckbox";
        opts.value = "0~disable~enable";
        models[cname] = {name: "testMdEditOptsLine1", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + 8;
        var opts = {};
        opts.setType = "inputColor";
        opts.value = "#0f0";
        models[cname] = {name: "testMdEditOptsLine1", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + 9;
        var opts = {};
        opts.setType = "inputNumber";
        opts.value = 12;
        models[cname] = {name: "testMdEditOptsLine1", type: "Md_editOptsLine~sys", opts: opts};

        var cname = lyMap.get("body1") + "~" + 10;
        var opts = {};
        opts.setType = "inputRange";
        opts.value = 12;
        models[cname] = {name: "testMdEditOptsLine1", type: "Md_editOptsLine~sys", opts: opts};


    }

    buildPageTestComponent_1() {
        var md = this.md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;

        var actionFunc = function (obj) {
            console.log(obj);
            if (obj.act === "click") {
                var kvObj = obj.kvObj;
                if (kvObj.name === "lightButton~5") {
                    kvObj.opts.altColorInx ^= 1;
                    sys.setWatch(kvObj, "altColorInx", kvObj.opts.altColorInx);
                }
            }

        };

        var name = "c~1";
        layouts[name] = {name: name, type: "base", opts: {xc: 5, yc: 1}};
        var name = "c~1~0";
        layouts[name] = {name: name, type: "base", opts: {xc: 1, yc: 24, ym: 1, margin: 1}};
        var name = "c~1~1";
        layouts[name] = {name: name, type: "base", opts: {xc: 1, yc: 10}};
        var name = "c~1~2";
        layouts[name] = {name: name, type: "base", opts: {xc: 2, yc: 10}};
        var name = "c~1~3";
        layouts[name] = {name: name, type: "base", opts: {xc: 1, yc: 3}};
        var name = "c~1~4";
        layouts[name] = {name: name, type: "base", opts: {xc: 1, yc: 3}};
        //=====================================
        lyMap.set("mainBody0", "c~1~0");
        lyMap.set("mainBody1", "c~1~1");
        lyMap.set("mainBody2", "c~1~2");
        lyMap.set("mainBody3", "c~1~3");
        lyMap.set("mainBody4", "c~1~4");


        var inx = 0;


        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.innerText = "label~sys";
        comps[cname] = {name: "testLabel", type: "label~sys", opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.innerText = "label~sys";
        opts.preText = "pre";
        opts.lpd = 40;
        comps[cname] = {name: "testLabel", type: "label~sys", opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.innerText = "button~sys";
        comps[cname] = {name: "", type: "button~sys", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.innerText = "button~sys";
        opts.preText = "pre";
        opts.preTextBorderWidth = 1;
        opts.lpd = 40;
        comps[cname] = {name: "", type: "button~sys", opts: opts};


        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.disable_f = 1;
        opts.innerText = "button~sys,disable";
        comps[cname] = {name: "", type: "button~sys", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~text", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~radio", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.editValue = 1;
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~radio", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~radio", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~checkbox", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        opts.itemWidth = 100;
        //opts.afterTextWidth=100;
        comps[cname] = {name: "", type: "input~color", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.itemWidth = 100;
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~number", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~password", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~date", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~datetime-local", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~email", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~month", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~range", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~tel", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~time", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        opts.selectInx = 2;
        opts.options = [];
        opts.options.push("Select 0");
        opts.options.push("Select 1");
        opts.options.push("Select 2");
        opts.options.push("Select 3");
        opts.options.push("Select 4");
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "select~sys", opts: opts};

        var cname = lyMap.get("mainBody0") + "~" + inx++;
        var opts = {};
        models[cname] = {name: "testMdEditOptsLine", type: "Md_editOptsLine~sys", opts: opts};


        var cname = lyMap.get("mainBody1") + "~" + 0;
        var opts = {};
        comps[cname] = {name: "", type: "button~sys", opts: opts};

        var cname = lyMap.get("mainBody1") + "~" + 1;
        var opts = {};
        opts.afterText = "Sec";
        opts.preTextLine2_f = 1;
        opts.preTextHeight = "0.4rh";
        opts.preTextBackgroundColor = "#ccc";
        opts.fontSize = "0.3rh";
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~text", opts: opts};

        var cname = lyMap.get("mainBody1") + "~" + 2;
        var opts = {};
        opts.innerText = "";
        opts.preTextLine2_f = 1;
        opts.preTextHeight = "0.4rh";
        opts.preTextBackgroundColor = "#ccc";
        opts.lpd = 0;
        opts.itemWidth = 0;
        opts.afterTextWidth = 60;
        opts.afterText = "0";
        opts.fontSize = "0.3rh";
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "", type: "input~range", opts: opts};

        var cname = lyMap.get("mainBody1") + "~" + 3;
        var opts = {};
        opts.altColors = ["#f44", "#400"];
        opts.altColorInx = 0;
        comps[cname] = {name: "", type: "button~light", opts: opts};

        var cname = lyMap.get("mainBody1") + "~" + 4;
        var opts = {};
        opts.altColors = ["#f44", "#400"];
        opts.altColorInx = 1;
        comps[cname] = {name: "", type: "button~light", opts: opts};

        var cname = lyMap.get("mainBody1") + "~" + 5;
        var opts = {};
        opts.altColors = ["#4f4", "#030"];
        opts.altColorInx = 0;
        comps[cname] = {name: "", type: "button~light", opts: opts};

        var cname = lyMap.get("mainBody1") + "~" + 6;
        var opts = {};
        opts.altColors = ["#4f4", "#030"];
        opts.altColorInx = 1;
        comps[cname] = {name: "", type: "button~light", opts: opts};

        var cname = lyMap.get("mainBody1") + "~" + 7;
        var opts = {};
        opts.altColors = ["#88f", "#005"];
        opts.altColorInx = 0;
        comps[cname] = {name: "", type: "button~light", opts: opts};

        var cname = lyMap.get("mainBody1") + "~" + 8;
        var opts = {};
        opts.altColors = ["#88f", "#005"];
        opts.altColorInx = 1;
        opts.clickFunc = actionFunc;
        comps[cname] = {name: "lightButton~5", type: "button~light", opts: opts};

        var cname = lyMap.get("mainBody2") + "~" + 0;
        var opts = {};
        opts.altColorInx = 0;
        comps[cname] = {name: "", type: "label~meter", opts: opts};

        var cname = lyMap.get("mainBody2") + "~" + 1;
        var opts = {};
        opts.altColorInx = 1;
        comps[cname] = {name: "", type: "label~meter", opts: opts};

        var cname = lyMap.get("mainBody2") + "~" + 2;
        var opts = {};
        opts.altColorInx = 2;
        comps[cname] = {name: "", type: "label~meter", opts: opts};

        var cname = lyMap.get("mainBody2") + "~" + 3;
        var opts = {};
        opts.innerText = "button";
        opts.background = "linear-gradient(#88f,#fff,#88f)";
        comps[cname] = {name: "", type: "button~sys", opts: opts};

        var cname = lyMap.get("mainBody2") + "~" + 4;
        var opts = {};
        opts.innerText = "buttoncccccccccccccc123";
        opts.backgroundInx = 1;
        opts.fontSize = "fixWidth";
        comps[cname] = {name: "", type: "button~sys", opts: opts};

        var cname = lyMap.get("mainBody2") + "~" + 5;
        var opts = {};
        opts.innerText = "";
        opts.backgroundInx = 0;
        opts.backgroundImageUrls = ['./systemResource/downArrow.png'];
        comps[cname] = {name: "", type: "button~sys", opts: opts};



        var itemClickFunc = function (obj) {
            var scrollTop = obj.scrollTop;
            md.modelRefs["testList"].opts.selectInx = obj.index;
            md.modelRefs["testList"].reCreate();
            md.modelRefs["testList"].mdClass.setScroll(scrollTop);
            console.log(obj);
        };
        var cname = lyMap.get("mainBody3") + "~" + 0;
        var opts = {};
        opts.actionFunc = itemClickFunc;
        opts.borderColor = "#444 #000 #000 #444";
        opts.borderWidth = 1;
        opts.listTexts = [];
        for (var i = 0; i < 20; i++) {
            opts.listTexts.push("item " + i);
        }
        models[cname] = {name: "testList", type: "Md_list~dark", opts: opts};



        var cname = lyMap.get("mainBody3") + "~" + 1;
        var opts = {};
        comps[cname] = {name: "", type: "chart~bar", opts: opts};

        var cname = lyMap.get("mainBody3") + "~" + 2;
        var opts = {};
        comps[cname] = {name: "", type: "chart~line", opts: opts};

        var cname = lyMap.get("mainBody4") + "~" + 0;
        var opts = {};
        opts.chartType = "doughnut";
        comps[cname] = {name: "", type: "chart~doughnut", opts: opts};

        var cname = lyMap.get("mainBody4") + "~" + 1;
        var opts = {};
        opts.chartType = "pie";
        comps[cname] = {name: "", type: "chart~doughnut", opts: opts};

        var cname = lyMap.get("mainBody4") + "~" + 2;
        var opts = {};
        opts.chartType = "polarArea";
        comps[cname] = {name: "", type: "chart~doughnut", opts: opts};


    }
    afterCreate() {
        var self = this;
        var md = self.md;
        var mesObj = md.compRefs["message"];
        gr.messageKobj = mesObj;

    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        //===================================
        var opts = {};
        var name = "c";
        opts.xc = 1;
        opts.yc = 3;
        opts.ihO = {};
        opts.ihO.c0 = 24;
        opts.ihO.c1 = 9999;
        opts.ihO.c2 = 24;
        layouts[name] = {name: name, type: "base", opts: opts};
        lyMap.set("topMenu", "c~0");
        lyMap.set("body", "c~1");
        lyMap.set("footBar", "c~2");
        //======================================================================
        var cname = lyMap.get("topMenu");
        mac.setMainMenu(md, cname);
        var cname = lyMap.get("footBar");
        mac.setFootBar(layouts, lyMap, comps, cname);
        self.buildPage();
    }
}
//===========================================
class Md_menu {
    constructor() {
        this.popOnCnt = 0;
    }
    initOpts(md) {
        var op = {};
        op.menuKexts = {};
        var kexts = [];
        var head = "rootMenu";
        kexts.push(new Kext("menu0", "1234"));
        kexts.push(new Kext("menu1", "2345"));
        kexts.push(new Kext("menu2", "3456"));
        kexts.push(new Kext("sepLineV", "kvd:sepLineV"));
        kexts.push(new Kext("menu4", "abcd"));
        kexts.push(new Kext("menu5", "4567"));
        kexts.push(new Kext("menu0", '<i class="material-icons">&#xe3c2;</i>', "", {enHint: "show frame"}));
        kexts.push(new Kext("menu0", '<i class="material-icons">&#xe3c2;</i>', "", {enHint: "show frame"}));
        kexts.push(new Kext("menu0", '<i class="material-icons">&#xe3c2;</i>', "", {enHint: "show frame"}));

        op.menuKexts[head] = kexts;
        op.fontSize = "0.8rh";
        op.lm = 6;
        op.xm = 5;
        op.lpd = 8;
        op.rpd = 8;
        op.popOff_f = 1;
        op.buttonType = "menu";
        op.iw = null;

        return op;
    }
    build(md) {
        var self = this;
        var op = md.opts;
        var layouts = op.layouts;
        if (!op.menuKexts)
            return;
        if (!op.menuKexts["rootMenu"])
            return;


        var opts = {};
        var name = "c";
        opts.xc = op.menuKexts["rootMenu"].length;
        opts.yc = 1;
        opts.color = "#222";
        opts.lm = op.lm;
        opts.xm = op.xm;
        //opts.borderWidth = 1;
        layouts[name] = {name: name, type: "base", opts: opts};



        //======================================================================
        md.opts.comps = {};
        var comps = md.opts.comps;
        var menuClickFunc = function (actObj) {
            var kvObj = actObj.kvObj;
            var itemId = kvObj.opts.itemId;
            var opts = {};
            opts.kvObj = actObj.kvObj;
            opts.md = md;
            if (!actObj.kvObj.opts.rootMenu)
                opts.posType = 1;
            else
                opts.posType = 0;
            opts.kexts = md.opts.menuKexts[itemId];
            opts.lpd = 10;
            opts.actionFunc = menuClickFunc;
            opts.popOff_f = md.opts.popOff_f;
            sys.popList(opts);

        };

        var kexts = op.menuKexts["rootMenu"];
        if (!kexts)
            return;

        for (var i = 0; i < kexts.length; i++) {
            var cname = "c~" + i;
            var opts = {};
            var text = Kext.getText(kexts[i]);
            if (text === "kvd:sepLineV") {
                comps[cname] = {name: "menuLabel~" + i, type: "label~sepLineV", opts};
            } else {
                opts.innerText = text;
                opts.itemId = kexts[i].id;
                opts.rootMenu = 1;
                opts.hint = kexts[i].getHint();
                opts.fontSize = op.fontSize;
                opts.lpd = op.lpd;
                opts.rpd = op.rpd;
                opts.textAlign = "center";
                opts.textOverflow = "hidden";
                if (op.iw)
                    opts.iw = op.iw;
                opts.clickFunc = menuClickFunc;
                comps[cname] = {name: "menuButton~" + i, type: "button~" + op.buttonType, opts};
            }
        }
    }
}
//===========================================
class Md_list {
    initOpts(md) {
        var obj = {};
        obj.listTexts = [];
        for (var i = 0; i < 50; i++)
            obj.listTexts.push("TestString-" + i);
        obj.preTexts = [];
        obj.afterTexts = [];
        obj.ids = [];
        obj.ih = 24;
        obj.dispNo_f = 0;
        obj.selectInx = -1;
        obj.selectBaseColor = "#000";
        obj.selectTextColor = "#0f0";
        obj.tm = 10;
        obj.bm = 10;
        obj.lpd = 10;
        obj.rpd = 10;
        obj.topScroll = 0;
        if (md.subType === "dark") {
            obj.baseColor = "#222";
            obj.textColor = "#888";
            obj.sepLineBorderColor = "#000 #888 #888 #000";
            return obj;
        }
        if (md.subType === "gray") {
            obj.baseColor = "#bbb";
            obj.textColor = "#000";
            obj.sepLineBorderColor = "#000 #fff #fff #000";
            return obj;
        }
        obj.baseColor = "#222";
        obj.textColor = "#888";
        obj.sepLineBorderColor = "#000 #888 #888 #000";
        return obj;
    }
    setScroll(pos) {
        var self = this;
        var rootElem = document.getElementById(self.md.stas.rootId);
        rootElem.scrollTop = pos;
    }
    getScroll(pos) {
        var self = this;
        var rootElem = document.getElementById(self.md.stas.rootId);
        return rootElem.scrollTop;
    }

    setScrollEnd() {
        var self = this;
        var rootElem = document.getElementById(self.md.stas.rootId);
        var pos = rootElem.scrollHeight - rootElem.clientHeight;
        rootElem.scrollTop = pos;
    }

    chkWatch() {
        var self = this;
        if (self.md.watch["optsChanged"]) {
            if (self.md.watch["xxselectInx"]) {
                delete self.md.watch["selectInx"];
                /*  action */
                return;
            }
            self.md.reCreate();
            self.setScroll(this.md.opts.topScroll);
            self.md.watch = {};
        }

    }

    build(md) {
        this.md = md;

        var op = md.opts;
        var comps = op.comps;
        var models = op.models;
        //===================
        var lyOpts = {};
        var name = "c";
        lyOpts.xc = 1;
        lyOpts.yc = op.listTexts.length;
        lyOpts.ih = op.ih;
        lyOpts.tm = op.tm;
        lyOpts.bm = op.bm;
        lyOpts.overflowY = "auto";
        md.setFarme(lyOpts);
        lyOpts.ihO = {};
        md.opts.layouts[name] = {name: name, type: "base", opts: lyOpts};

        var itemClick = function (actObj) {
            console.log("md_list:");
            console.log(actObj);
            var kvObj = actObj.kvObj;
            if (md.opts.actionFunc) {
                var obj = {};
                obj.act = "itemClick";
                obj.index = parseInt(kvObj.name.split("~")[1]);
                var rootElem = document.getElementById(md.stas.rootId);
                obj.scrollTop = rootElem.scrollTop;
                obj.scrollHeight = rootElem.scrollHeight - rootElem.clientHeight;
                obj.scrollRate = obj.scrollTop / obj.scrollHeight;
                obj.kvObj = kvObj;
                obj.selectText = kvObj.opts.innerText;
                md.opts.actionFunc(obj);
            }
        };
        var index = 0;
        for (var i = 0; i < op.listTexts.length; i++) {
            var opts = {};
            var cname = "c" + "~" + i;
            var istr = KvLib.getKvText(op.listTexts[i], "");
            if (istr === "kvd:sepLineH") {
                md.opts.layouts["c"].opts.ihO["c" + i] = 10;
                opts.baseColor = op.textColor;
                opts.borderColor = op.sepLineBorderColor;
                comps[cname] = {name: "", type: "label~sepLineH", opts: opts};
                continue;
            }
            opts.innerText = op.listTexts[i];
            if (op.dispNo_f) {
                opts.innerText = "" + (index + 1) + ".  " + opts.innerText;
            }
            if (i === op.selectInx) {
                opts.baseColor = op.selectBaseColor;
                opts.innerTextColor = op.selectTextColor;
            } else {
                opts.baseColor = op.baseColor;
                opts.innerTextColor = op.textColor;
            }
            opts.clickFunc = itemClick;
            opts.fontFamily = "monospace";

            if (op.preTexts[i]) {
                opts.preText = op.preTexts[i];
            }
            if (op.afterTexts[i]) {
                opts.afterText = op.afterTexts[i];
            }
            opts.lpd = op.lpd;
            opts.rpd = op.rpd;
            opts.itemId = op.ids[i];
            comps[cname] = {name: "mdList~" + i, type: "button~item", opts: opts};
            index++;
        }
        //======================================================================
    }
}
//===========================================
class Md_system {
    constructor() {
        this.stackCnt = 0;
        this.kvObjs = [];

    }
    initOpts(md) {
        this.md = md;
        var obj = {};
        return obj;
    }

    popMaskOn(op) {
        var maskClickFunc = function () {
            gr.mdSystem.mdClass.popOff(2);
        };
        var opts = {};
        if (op.clickFunc)
            opts.clickFunc = op.clickFunc;
        var comp = new Component("", "plate~mask", opts, {});
        var opts = {};
        opts.kvObj = comp;
        gr.mdSystem.mdClass.popOn(opts);
    }

    popOn(_opts) {
        var opts = {
            kvObj: null,
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            shadow_f: 0,
            center_f: 0,
        };
        KvLib.coverObject(opts, _opts);

        if (this.stackCnt >= 16) {
            console.error("Pop panel stack over flow !!!");
            return;
        }
        var cname = "c~" + this.stackCnt;
        var rects = this.md.layouts["c"].stas.lyRects;
        for (var i = 0; i < rects.length; i++) {
            if (rects[i].name === cname) {
                rects[i].w = gr.clientW;
                rects[i].h = gr.clientH;
                if (opts.w)
                    rects[i].w = opts.w;
                if (opts.h)
                    rects[i].h = opts.h;
                if (!opts.center_f) {
                    rects[i].x = 1000 + opts.x;
                    rects[i].y = opts.y;
                } else {
                    rects[i].x = 1000 + ((gr.clientW - rects[i].w) / 2) | 0;
                    rects[i].y = ((gr.clientH - rects[i].h) / 2) | 0;

                }
                rects[i].z = this.stackCnt;
                rects[i].style = "user";
                if (opts.kvObj) {
                    //opts.kvObj.build();
                    /*
                     var op = {};
                     if (opts.shadow_f) {
                     op.outsideShadowWidth = 10;
                     op.outsideShadowOffx = 10;
                     op.outsideShadowOffy = 10;
                     op.outsideShadowColor = "#000";
                     }
                     op.borderWidth = 1;
                     op.borderColor = "#fff #777 #777 #fff";
                     op.baseColor = opts.kvObj.opts.baseColor;
                     */
                    if (opts.kvObj.constructor.name === "Model") {
                        var lyopts = opts.kvObj.opts;
                        lyopts.borderWidth = 1;
                        lyopts.outsideShadowWidth = 10;
                        lyopts.outsideShadowOffx = 10;
                        lyopts.outsideShadowOffy = 10;
                        lyopts.outsideShadowColor = "#000";
                        lyopts.borderColor = "#fff #777 #777 #fff";
                        lyopts.baseColor = opts.kvObj.opts.baseColor;
                    }
                    this.md.reCreate(cname, opts.kvObj);
                    break;
                }
            }

        }
        this.stackCnt++;
    }
    getLastKvObj() {
        if (!this.stackCnt)
            return;
        return  this.kvObjs[(this.stackCnt - 1)];

    }

    popOff(times) {
        if (!times)
            times = 1;
        while (times) {
            if (this.stackCnt <= 0) {
                return;
            }
            this.stackCnt--;
            var cname = "c~" + this.stackCnt;
            this.md.clear(cname);
            times--;
        }
    }

    build(md) {

        md.lyMap = new Map();
        var op = md.opts;
        var cs = md.kvCs;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        //===================
        var lyOpts = {};
        var name = "c";

        lyOpts.xc = 4;
        lyOpts.yc = 4;
        lyOpts.overflowX = "visible";
        lyOpts.overflowY = "visible";
        lyOpts.color = "#222";
        lyOpts.borderColor = "#fff #000 #000 #fff";
        lyOpts.borderWidth = 1;
        lyOpts.outsideShadowWidth = 0;
        lyOpts.outsideShadowOffx = 10;
        lyOpts.outsideShadowOffy = 10;
        lyOpts.outsideShadowColor = "#000";
        lyOpts.zIndex = 100;

        md.opts.layouts[name] = {name: name, type: "base", opts: lyOpts};


        for (var i = 0; i < 16; i++) {
            var cname = "c" + "~" + i;
            var opts = {};
            comps[cname] = {name: "", type: "plate~popMenu", opts: opts};
        }

        //======================================================================
    }
}
//===========================================
class Md_editOptsBox {
    initOpts(md) {
        var obj = {};
        return obj;
    }

    chkWatch() {
        var self = this;
        if (self.md.watch["optsChanged"]) {
            if (self.md.watch["xxselectInx"]) {
                delete self.md.watch["selectInx"];
                /*  action */
                return;
            }
            self.md.reCreate();
            self.setScroll(this.md.opts.topScroll);
            self.md.watch = {};
        }
    }

    actionFunc(obj) {
    }

    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //===================================
        var cname = "c";
        var opts = {};
        opts.xc = 2;
        opts.yc = 1;
        opts.iwO = {};
        opts.iwO.c0 = 9999;
        opts.iwO.c1 = 500;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //===
        var cname = "c~0";
        var opts = {};
        opts.xc = 1;
        opts.yc = 2;
        opts.ihO = {};
        opts.ihO.c0 = 9999;
        opts.ihO.c1 = 24;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("bodyLeft", cname);
        //===
        var cname = lyMap.get("bodyLeft") + "~" + 0;
        var opts = {};
        opts.className = "";
        opts.typeName = "";
        models[cname] = {name: "viewKvObj", type: "Md_viewKvObj", opts: opts};

        var cname = lyMap.get("bodyLeft") + "~" + 1;
        var opts = {};
        opts.menuKexts = {};
        //==================
        var menuFunc = function (iobj) {
            var kvObj = iobj.kvObj;
            if (kvObj.opts.itemId === "showFrame") {
                if (kvObj.opts.baseColor === "#ccc") {
                    kvObj.opts.baseColor = "#aaf";
                    var showFrame = 1;
                } else {
                    kvObj.opts.baseColor = "#ccc";
                    var showFrame = 0;
                }
                sys.setReDraw(kvObj);
                var viewKvObj = md.modelRefs["viewKvObj"];
                viewKvObj.opts.showFrame_f = showFrame;
                viewKvObj.reCreate();
            }
        };
        var kexts = [];
        var head = "";
        kexts.push(new Kext("showFrame", '<i class="material-icons">&#xe3c2;</i>', "", {enHint: "show frame"}));
        opts.menuKexts["rootMenu"] = kexts;
        opts.buttonType = "menuButton";
        //==================
        opts.actionFunc = menuFunc;
        models[cname] = {name: "funcMenu", type: "Md_menu", opts: opts};




        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        models[cname] = {name: "testList", type: "Md_optsPanel", opts: opts};





        //======================================================================
    }
}
//===========================================
class Md_optsPanel {
    constructor() {


    }
    initOpts(md) {
        var self = this;
        var obj = {};
        obj.modelSet = "";
        obj.compSet = "button";
        obj.typeSet = "sys";
        obj.editOpts = {};
        return obj;
    }

    chkWatch() {
        var self = this;
        if (self.md.watch["optsChanged"]) {
            if (self.md.watch["xxselectInx"]) {
                delete self.md.watch["selectInx"];
                /*  action */
                return;
            }
            self.md.reCreate();
            self.setScroll(this.md.opts.topScroll);
            self.md.watch = {};
        }

    }

    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //===================================
        var actionFunc = function (obj) {
            console.log(obj);
            var kvObj = obj.kvObj;


            if (obj.act === "valueChange") {
                console.log(kvObj.opts.setObj);
                var setObj = kvObj.opts.setObj;
                var eopts = md.opts.editOpts;
                eopts[setObj.name] = setObj.value;

                if (md.opts.modelSet) {
                    var className = "model";
                    var classType = md.opts.modelSet;
                }
                if (md.opts.compSet) {
                    var className = "component";
                    var classType = md.opts.compSet;
                }
                classType += "~" + md.opts.typeSet;
                var editOptsBox = md.fatherMd;
                var viewKvObj = editOptsBox.modelRefs["viewKvObj"];
                viewKvObj.opts.className = className;
                viewKvObj.opts.classType = classType;
                viewKvObj.opts.kvObjOpts = eopts;
                viewKvObj.opts.iw = eopts.propertyWidth;
                viewKvObj.opts.ih = eopts.propertyHeight;
                viewKvObj.reCreate();
                return;
            }
            if (obj.act === "click") {
                switch (obj.kvObj.name) {
                    case "chgModel":
                        var kexts = [];
                        var head = "model";
                        for (var i = 0; i < Model.enum.length; i++) {
                            kexts.push(new Kext(head + "~" + i, Model.enum[i]));
                        }
                        var kvObj = obj.kvObj;
                        var itemId = kvObj.opts.itemId;
                        var opts = {};
                        opts.kvObj = kvObj;
                        opts.md = kvObj.fatherMd;
                        opts.posType = 0;
                        opts.kexts = kexts;
                        opts.lpd = 10;
                        opts.itemId = obj.kvObj.name;
                        opts.actionFunc = function (obj) {
                            var setObj = obj.fatherKvObj;
                            sys.setReDraw(setObj, "innerText", obj.kvObj.opts.innerText);
                            var md = setObj.fatherMd;

                            setObj = md.compRefs["chgComponent"];
                            sys.setReDraw(setObj, "innerText", "");
                            setObj = md.compRefs["chgType"];
                            sys.setReDraw(setObj, "innerText", "");

                            md.opts.modelSet = obj.kvObj.opts.innerText;
                            md.opts.compSet = "";
                            md.opts.typeSet = "";

                        };
                        sys.popList(opts);
                        break;
                    case "chgComponent":
                        var kexts = [];
                        var head = "component";

                        for (var key in gr.compOpts) {
                            kexts.push(new Kext(head + "~" + i, key));
                        }
                        var kvObj = obj.kvObj;
                        var itemId = kvObj.opts.itemId;
                        var opts = {};
                        opts.kvObj = kvObj;
                        opts.md = kvObj.fatherMd;
                        opts.posType = 0;
                        opts.kexts = kexts;
                        opts.lpd = 10;
                        opts.itemId = obj.kvObj.name;
                        opts.actionFunc = function (obj) {
                            var setObj = obj.fatherKvObj;
                            sys.setReDraw(setObj, "innerText", obj.kvObj.opts.innerText);
                            var md = setObj.fatherMd;
                            setObj = md.compRefs["chgModel"];
                            sys.setReDraw(setObj, "innerText", "");
                            setObj = md.compRefs["chgType"];
                            sys.setReDraw(setObj, "innerText", "");

                            md.opts.compSet = obj.kvObj.opts.innerText;
                            md.opts.modelSet = "";
                            md.opts.typeSet = "";


                        };
                        sys.popList(opts);
                        break;
                    case "chgType":
                        var kvObj = obj.kvObj;
                        var baseOpts = gr.compOpts [kvObj.fatherMd.opts.compSet];
                        if (!baseOpts)
                            break;
                        var opts = {};
                        var kexts = [];
                        var subOpts = baseOpts["subOpts"];
                        for (var key in subOpts) {
                            kexts.push(new Kext("type~" + i, key));
                        }
                        opts.kvObj = kvObj;
                        opts.md = kvObj.fatherMd;
                        opts.posType = 0;
                        opts.kexts = kexts;
                        opts.lpd = 10;
                        opts.itemId = obj.kvObj.name;

                        opts.actionFunc = function (obj) {
                            var setObj = obj.fatherKvObj;
                            sys.setReDraw(setObj, "innerText", obj.kvObj.opts.innerText);
                            var md = setObj.fatherMd;
                            md.opts.typeSet = obj.kvObj.opts.innerText;
                            var optsList = md.modelRefs["optsList"];
                            md.opts.editOpts = Component.getOpts(md.opts.compSet, md.opts.typeSet);
                            optsList.opts.setObjs = [];
                            for (var key in md.opts.editOpts) {
                                var setObj = sys.getOptsSet(key, md.opts.editOpts[key]);
                                if (setObj.setType === "system")
                                    continue;
                                optsList.opts.setObjs.push(setObj);
                            }
                            optsList.reCreate();

                            var editOptsBox = md.fatherMd;
                            var viewKvObj = editOptsBox.modelRefs["viewKvObj"];
                            var className = "";
                            if (md.opts.compSet)
                                className = "component";
                            if (md.opts.modelSet)
                                className = "model";
                            var eopts = md.opts.editOpts;
                            viewKvObj.opts.className = className;
                            viewKvObj.opts.classType = md.opts.typeSet;
                            viewKvObj.opts.kvObjOpts = eopts;
                            viewKvObj.opts.iw = eopts.propertyWidth;
                            viewKvObj.opts.ih = eopts.propertyHeight;
                            viewKvObj.reCreate();




                        };
                        sys.popList(opts);
                        break;




                }
            }
        }


















        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 5;
        opts.ihO = {};
        opts.ihO.c0 = 30;
        opts.ihO.c1 = 30;
        opts.ihO.c2 = 30;
        opts.ihO.c3 = 30;
        opts.ihO.c4 = 9999;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //===




        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.margin = 0;
        opts.preText = "Model";
        opts.preTextWidth = 150;
        opts.textAlign = "left";
        opts.preTextColor = "#008";
        opts.lpd = 160;
        opts.preTextBorderWidth = 1;
        opts.clickFunc = self.actionFunc;
        opts.innerText = op.modelSet;
        comps[cname] = {name: "chgModel", type: "button~sys", opts: opts};

        var cname = lyMap.get("body") + "~" + 2;
        var opts = {};


        opts.margin = 0;
        opts.preText = "Component";
        opts.preTextWidth = 150;
        opts.textAlign = "left";
        opts.preTextColor = "#008";
        opts.lpd = 160;
        opts.preTextBorderWidth = 1;
        opts.clickFunc = actionFunc;
        opts.innerText = op.compSet;
        comps[cname] = {name: "chgComponent", type: "button~sys", opts: opts};

        var cname = lyMap.get("body") + "~" + 3;
        var opts = {};
        opts.margin = 0;
        opts.preText = "Type";
        opts.preTextWidth = 150;
        opts.textAlign = "left";
        opts.preTextColor = "#008";
        opts.lpd = 160;
        opts.preTextBorderWidth = 1;
        opts.clickFunc = actionFunc;
        opts.innerText = op.typeSet;
        comps[cname] = {name: "chgType", type: "button~sys", opts: opts};

        var cname = lyMap.get("body") + "~" + 4;
        var opts = {};
        //opts.actionFunc = itemClickFunc;
        opts.margin = 0;
        opts.borderColor = "#444 #000 #000 #444";
        opts.borderWidth = 1;
        opts.setObjs = [];

        if (op.compSet)
            var eopts = Component.getOpts(op.compSet, op.typeSet);
        if (op.modelSet)
            var eopts = Model.getOpts(op.modelSet, op.typeSet);
        opts.setObjs = [];
        for (var key in eopts) {
            var setObj = sys.getOptsSet(key, eopts[key]);
            if (setObj.setType === "system")
                continue;
            opts.setObjs.push(setObj);
        }
        opts.rm = gr.scrollWidth;
        opts.actionFunc = actionFunc;
        models[cname] = {name: "optsList", type: "Md_setList~light", opts: opts};







        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.menuKexts = {};
        //==================
        var kexts = [];
        var head = "";
        kexts.push(new Kext("menu0", "🔨", "", {enHint: "Set"}));
        kexts.push(new Kext("menu1", "💾"));
        kexts.push(new Kext("menu2", "📁"));
        kexts.push(new Kext("menu4", "🔒"));
        kexts.push(new Kext("menu5", "🔓"));
        kexts.push(new Kext("menu6", "📖"));
        opts.menuKexts["rootMenu"] = kexts;
        opts.buttonType = "menuButton";
        //==================
        //opts.actionFunc = menuFunc;
        opts.buttonType = "menuButton";

        models[cname] = {name: "", type: "Md_menu", opts: opts};


        //======================================================================
    }
}
//===========================================
class Md_editOptsLine {
    initOpts(md) {
        var self = this;
        var obj = {};
        obj.setObj = {};
        var setObj = obj.setObj;
        setObj.name = "Name";
        setObj.value = 12;
        setObj.setType = "inputNumber";
        setObj.dataType = "num";
        setObj.dataRegular = {};
        setObj.titleWidth = 200;
        setObj.unit = "";
        setObj.selectHint = "";
        setObj.showName_f = 1;
        setObj.showDataType_f = 1;
        return obj;
    }

    chkWatch() {
    }

    actionFunc(obj) {
        console.log(obj);
        var kvObj = obj.kvObj;
        var name = kvObj.name;
        var self = kvObj.fatherMd;


        if (obj.act === "valueChange") {
            var setType = self.opts.setObj.setType;
            var dataType = self.opts.setObj.dataType;
            var max = self.opts.setObj.max;
            var min = self.opts.setObj.min;
            console.log(setType);
            console.log(dataType);
            var reCreateSelf = function () {
                self.reCreate();
                if (self.opts.actionFunc) {
                    obj.kvObj = self;
                    self.opts.actionFunc(obj);
                }
            };


            var errStr = "Input format error !!!";
            if (setType === "inputNumber") {
                var value = kvObj.elems["input"].value;
                if (dataType === "num" || dataType === "n-num") {
                    var num = KvLib.toInt(value, "error");
                    if (dataType === "n-num") {
                        if (value === "") {
                            num = null;
                        }
                    }
                    if (num === "error") {
                        sys.mesBox("cr~Error", 500, errStr);
                        clearTimeout(gr.addSubTimer);
                        self.reCreate();
                        return;
                    }
                    if (max !== null && max !== undefined) {
                        if (value > max) {
                            errStr = "Value is over " + max + " !!!";
                            sys.mesBox("cr~Error", 500, errStr);
                            clearTimeout(gr.addSubTimer);
                            self.reCreate();
                            return;
                        }
                    }
                    if (min !== null && min !== undefined) {
                        if (value < min) {
                            errStr = "Value is less " + min + " !!!";
                            sys.mesBox("cr~Error", 500, errStr);
                            clearTimeout(gr.addSubTimer);
                            self.reCreate();
                            return;
                        }
                    }
                    self.opts.setObj.value = num;
                    var actionFunc = self.opts.actionFunc;
                    if (actionFunc) {
                        obj.kvObj = self;
                        actionFunc(obj);
                    }
                    self.reCreate();
                }
                return;
            }
            if (setType === "selectColor") {
                var value = kvObj.opts.innerText;
                self.opts.setObj.value = value;
                reCreateSelf();
                return;
            }
            if (setType === "inputText") {
                var value = kvObj.elems["input"].value;
                if(value==="")
                    value=null;
                if (dataType === "str") {
                    self.opts.setObj.value = value;
                    reCreateSelf();
                    return;
                }
                if (dataType === "dim") {
                    var err_f=KvLib.transUnit(value,"error",100,100);
                    if(err_f==="error" && value !==null){
                            sys.mesBox("cr~Error", 500, errStr);
                            self.reCreate();
                            return;
                    }
                    self.opts.setObj.value = value;
                    reCreateSelf();
                    return;
                }
            }


            return;
            var errStr;
            while (1) {
                var max = self.opts.setObj.max;
                var min = self.opts.setObj.min;



                if (obj.value === "error") {
                    errStr = "Input format error !!!";
                    break
                }
                if (max !== null && max !== undefined) {
                    if (obj.value > max) {
                        errStr = "Value is over " + max + " !!!";
                        break;
                    }
                }
                if (min !== null && min !== undefined) {
                    if (obj.value < min) {
                        errStr = "Value is less " + min + " !!!";
                        break;
                    }
                }
                break;
            }
            if (errStr) {
                sys.mesBox("cr~Error", 500, errStr);
                self.opts.setObj.value = obj.preValue;
                self.reCreate();
            } else {
                self.opts.setObj.value = obj.value;
            }


        }
        if (obj.act === "click") {
            if (name === "selectColor") {
                var colorSelectFunc = function (iobj) {
                    kvObj.opts.innerText = iobj;
                    sys.setReDraw(kvObj, "preTextBackgroundColor", iobj);
                    kvObj.fatherMd.opts.setObj.value = iobj;
                    var rtObj = {};
                    rtObj.act = "valueChange";
                    rtObj.kvObj = kvObj;
                    self.mdClass.actionFunc(rtObj);
                };
                var opts = {};
                opts.color = kvObj.opts.innerText;
                opts.actionFunc = colorSelectFunc;
                var mod = new Model("", "Md_colorPicker~sys", opts, {});

                var pos = KvLib.getPosition(kvObj.elems["base"]);



                var opts = {};
                opts.kvObj = mod;
                opts.w = 250;
                opts.h = 380;
                opts.center_f = 0;
                opts.x = pos.x;
                opts.y = pos.y;
                if ((opts.x + opts.w) >= (gr.clientW)) {
                    opts.x = gr.clientW - opts.w;
                }
                if ((opts.y + opts.h) >= (gr.clientH)) {
                    opts.y = opts.y - opts.h;
                }


                sys.popOnModel(opts);


            }
        }
        var md = kvObj.fatherMd;
        if (md.opts.actionFunc) {
            obj.kvObj = self;
            md.opts.actionFunc(obj);
        }
    }

    static getDataIcon(dataType) {
        if (dataType === "str")
            return './systemResource/txt.png';
        if (dataType === "num" || dataType === "n-num")
            return './systemResource/num123.png';
        if (dataType === "color")
            return './systemResource/color.png';
        if (dataType === "dim")
            return './systemResource/size1.png';
        if (dataType === "ratio")
            return './systemResource/ratio.png';
        if (dataType === "flag")
            return './systemResource/num01.png';
        if (dataType === "enum")
            return './systemResource/list.png';
        var strA = dataType.split("~");
        if (strA[1] === "array")
            return './systemResource/array.png';
        return "";
    }

    static getDataIconFont(dataType) {
        if (dataType === "str")
            return '<span class="material-icons">font_download</span>';
        if (dataType === "num" || dataType === "n-num")
            return '<span class="material-icons">looks_one</span>';
        if (dataType === "color")
            return '<span class="material-icons">color_lens</span>';
        if (dataType === "dim")
            return '<span class="material-icons">expand</span>';
        if (dataType === "ratio")
            return '<span class="material-icons">timelapse</span>';
        if (dataType === "flag")
            return '<span class="material-icons">flag</span>';
        if (dataType === "enum")
            return '<span class="material-icons">view_list</span>';
        var strA = dataType.split("~");
        if (strA[1] === "array")
            return '<span class="material-icons">grid_view</span>';
        return "";
    }

    static setDataName(title, dataType, op) {
        var opts = {};
        opts.margin = 0;
        opts.baseColor = "#ccc";
        opts.borderWidth = 1;
        opts.borderColor = "#888";
        opts.innerTextColor = "#000";
        opts.lpd = 4;
        opts.fontFamily = "monospace";
        if (op.setObj.showDataType_f) {
            opts.preTextLpd = 0;
            opts.preTextRpd = 0;
            opts.preTextWidth = 22;
            opts.preTextBackgroundColor = "#cce";
            //opts.preTextBorderWidth = 1;
            opts.lpd = 26;
            opts.preText = Md_editOptsLine.getDataIconFont(dataType);
            opts.preTextFontSize = "0.9rh";
            opts.preText = Md_editOptsLine.getDataIconFont(dataType);
            //opts.preTextFontSize="0.7rh";
            //opts.preTextBackgroundImageUrl = Md_editOptsLine.getDataIcon(dataType);
            //opts.preTextBackgroundImagePosition = "fit";
        }
        opts.innerText = title;
        return opts;

    }

    build(md) {
        var self = this;
        this.md = md;
        //============================
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        //==================================
        var cname = "c";
        var opts = {};
        opts.xc = 2;
        opts.yc = 1;
        opts.iwO = {};
        //opts.margin = 0;
        opts.tm = 0;
        opts.bm = 0;
        opts.color = "#2f2";
        opts.iwO.c0 = op.setObj.titleWidth;
        opts.iwO.c1 = 9999;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);

        if (op.setObj.showName_f) {
            var cname = lyMap.get("body") + "~" + 0;
            var opts = Md_editOptsLine.setDataName(op.setObj.name, op.setObj.dataType, op);
            opts.clickFunc = self.actionFunc;
            opts.disable_f = 1;
            opts.disableTextColor = "#000";
            opts.margin = 0;
            comps[cname] = {name: "nameButton", type: "button~item", opts: opts};
            comps[cname] = {name: "nameButton", type: "label~sys", opts: opts};
        }

        //===================================
        if (op.setObj.setType === "inputText") {
            var cname = lyMap.get("body") + "~" + 1;
            var opts = {};
            opts.margin = 0;
            opts.bm = 0;
            opts.preText = "";
            if (op.setObj.unit) {
                opts.afterTextBackgroundColor = "#fff";
                opts.afterTextBorderWidth = 1;
                opts.afterText = op.setObj.unit;
            }
            opts.actionFunc = self.actionFunc;
            opts.editValue = op.setObj.value;
            comps[cname] = {name: "", type: "input~text", opts: opts};
        }

        if (op.setObj.setType === "inputPassword") {
            var cname = lyMap.get("body") + "~" + 1;
            var opts = {};
            opts.margin = 0;
            opts.preText = "";
            opts.actionFunc = self.actionFunc;
            opts.editValue = op.setObj.value;
            comps[cname] = {name: "", type: "input~password", opts: opts};
        }

        if (op.setObj.setType === "inputDate") {
            var cname = lyMap.get("body") + "~" + 1;
            var opts = {};
            opts.margin = 0;
            opts.preText = "";
            opts.actionFunc = self.actionFunc;
            opts.editValue = op.setObj.value;
            comps[cname] = {name: "", type: "input~date", opts: opts};
        }

        if (op.setObj.setType === "inputDatetime") {
            var cname = lyMap.get("body") + "~" + 1;
            var opts = {};
            opts.margin = 0;
            opts.preText = "";
            opts.actionFunc = self.actionFunc;
            opts.editValue = op.setObj.value;
            comps[cname] = {name: "", type: "input~datetime-local", opts: opts};
        }
        if (op.setObj.setType === "inputEmail") {
            var cname = lyMap.get("body") + "~" + 1;
            var opts = {};
            opts.margin = 0;
            opts.preText = "";
            opts.actionFunc = self.actionFunc;
            opts.editValue = op.setObj.value;
            comps[cname] = {name: "", type: "input~email", opts: opts};
        }

        if (op.setObj.setType === "inputTel") {
            var cname = lyMap.get("body") + "~" + 1;
            var opts = {};
            opts.margin = 0;
            opts.preText = "";
            opts.actionFunc = self.actionFunc;
            opts.editValue = op.setObj.value;
            comps[cname] = {name: "nameButton", type: "input~tel", opts: opts};
        }

        if (op.setObj.setType === "inputRadio") {
            var cname = lyMap.get("body") + "~" + 1;
            var opts = {};
            opts.margin = 0;
            opts.preText = "";
            opts.actionFunc = self.actionFunc;
            var strA = op.setObj.value.split("~");
            if (strA.length >= 2) {
                opts.selectInx = KvLib.toInt(strA[0], -1);
                opts.selectHint = op.selectHint;
                opts.options = [];
                for (var i = 1; i < strA.length; i++)
                    opts.options.push(strA[i]);
            }
            comps[cname] = {name: "nameButton", type: "select~sys", opts: opts};
        }

        if (op.setObj.setType === "inputCheckbox") {
            var cname = lyMap.get("body") + "~" + 1;
            var opts = {};
            opts.margin = 0;
            opts.preText = "";
            opts.actionFunc = self.actionFunc;
            var strA = op.setObj.value.split("~");
            if (strA.length === 3) {
                opts.editValue = KvLib.toInt(strA[0], 0);
                opts.enums = [strA[1], strA[2]];
            } else {
                opts.editValue = op.value;
            }
            comps[cname] = {name: "", type: "input~checkbox", opts: opts};
        }

        if (op.setObj.setType === "inputRange") {
            var cname = lyMap.get("body") + "~" + 1;
            var opts = {};
            opts.margin = 0;
            opts.preText = "";
            opts.actionFunc = self.actionFunc;
            opts.editValue = op.setObj.value;
            opts.afterText = op.setObj.unit;
            comps[cname] = {name: "", type: "input~range", opts: opts};
        }

        if (op.setObj.setType === "inputColor") {
            var cname = lyMap.get("body") + "~" + 1;
            var opts = {};
            opts.margin = 0;
            opts.preText = "";
            opts.actionFunc = self.actionFunc;
            opts.editValue = op.setObj.value;
            comps[cname] = {name: "", type: "input~color", opts: opts};
        }

        if (op.setObj.setType === "selectColor") {
            var cname = lyMap.get("body") + "~" + 1;
            var opts = {};
            opts.margin = 0;
            opts.preText = "";
            opts.clickFunc = self.actionFunc;
            opts.preTextWidth = 50;
            opts.preTextBorderWidth = 1;
            opts.preText = "";
            opts.preTextBackgroundColor = op.setObj.value;
            opts.innerText = op.setObj.value;
            opts.lpd = 56;
            opts.textAlign = "left";
            comps[cname] = {name: "selectColor", type: "button~simple", opts: opts};
        }

        if (op.setObj.setType === "select") {
            var cname = lyMap.get("body") + "~" + 1;
            var opts = {};
            opts.margin = 0;
            opts.preText = "";
            opts.actionFunc = self.actionFunc;
            opts.selectInx = -1;
            opts.editValue = op.setObj.value;
            opts.options = [];
            for (var i = 0; i < op.setObj.dataRegular.enum.length; i++)
                opts.options.push(op.setObj.dataRegular.enum[i]);
            comps[cname] = {name: "", type: "select~sys", opts: opts};
        }




        if (op.setObj.setType === "inputNumber") {
            var cname = lyMap.get("body") + "~" + 1;
            var opts = {};
            opts.xc = 3;
            opts.yc = 1;
            opts.iwO = {};
            opts.iwO.c0 = 9999;
            opts.iwO.c1 = 30;
            opts.iwO.c2 = 30;
            opts.color = "#fff";
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("body-1", cname);

            var cname = lyMap.get("body-1") + "~" + 0;
            var opts = {};
            opts.margin = 0;
            opts.preText = "";
            opts.actionFunc = self.actionFunc;
            opts.editValue = op.setObj.value;
            if (op.setObj.unit)
                opts.afterText = op.setObj.unit;
            else
                opts.afterText = "";
            opts.max = op.setObj.max;
            opts.min = op.setObj.min;
            comps[cname] = {name: "input", type: "input~number", opts: opts};
            var inputObj = comps[cname];


            var addValueFunc = function (obj) {
                var kvObj = obj.kvObj;
                var inputObj = kvObj.fatherMd.compRefs["input"];
                if (inputObj.opts.max !== null && inputObj.opts.max !== undefined) {
                    if (inputObj.opts.editValue >= inputObj.opts.max) {
                        clearTimeout(gr.addSubTimer);
                        return;
                    }
                }
                inputObj.opts.editValue += 1;
                var elem = inputObj.elems["input"];
                elem.value = inputObj.opts.editValue;
                var event = {};
                event.target = elem;
                elem.kvd.kvObj.changeFunc(event);
            };




            var subValueFunc = function (obj) {
                var kvObj = obj.kvObj;
                var inputObj = kvObj.fatherMd.compRefs["input"];
                if (inputObj.opts.min !== null && inputObj.opts.min !== undefined) {
                    if (inputObj.opts.editValue <= inputObj.opts.min) {
                        clearTimeout(gr.addSubTimer);
                        return;
                    }
                }
                inputObj.opts.editValue -= 1;
                var elem = inputObj.elems["input"];
                elem.value = inputObj.opts.editValue;
                var event = {};
                event.target = elem;
                elem.kvd.kvObj.changeFunc(event);
            };

            var addTimerFunc = function (iobj) {
                if (!gr.mouseDown_f)
                    return;
                addValueFunc(iobj);
                var delay = 50;
                gr.addSubTimer = setTimeout(function () {
                    addTimerFunc(iobj);
                }, delay);
            };
            var subTimerFunc = function (iobj) {
                if (!gr.mouseDown_f)
                    return;
                subValueFunc(iobj);
                var delay = 50;
                gr.addSubTimer = setTimeout(function () {
                    subTimerFunc(iobj);
                }, delay);
            };
            var setAddTimer = function (iobj) {
                addValueFunc(iobj);
                var delay = 500;
                clearTimeout(gr.addSubTimer);
                gr.addSubTimer = setTimeout(function () {
                    addTimerFunc(iobj);
                }, delay);
            };
            var setSubTimer = function (iobj) {
                subValueFunc(iobj);
                var delay = 500;
                clearTimeout(gr.addSubTimer);
                gr.addSubTimer = setTimeout(function () {
                    subTimerFunc(iobj);
                }, delay);
            };
            var stopTimer = function () {
                clearTimeout(gr.addSubTimer);
            };


            var cname = lyMap.get("body-1") + "~" + 1;
            var opts = {};
            opts.margin = 0;
            opts.baseColor = "#ccc";
            opts.borderWidth = 1;
            opts.innerTextColor = "#000";
            opts.innerText = "➕";
            opts.mouseDownFunc = setAddTimer;
            opts.mouseUpFunc = stopTimer;
            opts.mouseOutFunc = stopTimer;
            comps[cname] = {name: "", type: "button~sys", opts: opts};

            var cname = lyMap.get("body-1") + "~" + 2;
            var opts = {};
            opts.margin = 0;
            opts.baseColor = "#ccc";
            opts.borderWidth = 1;
            opts.innerTextColor = "#000";
            opts.innerText = "➖";
            opts.mouseDownFunc = setSubTimer;
            opts.mouseUpFunc = stopTimer;
            opts.mouseOutFunc = stopTimer;
            comps[cname] = {name: "", type: "button~sys", opts: opts};


        }



        if (op.setObj.setType === "inputSelect") {
            var cname = lyMap.get("body") + "~" + 1;
            var opts = {};
            opts.xc = 2;
            opts.yc = 1;
            opts.iwO = {};
            opts.iwO.c0 = 9999;
            opts.iwO.c1 = 30;
            opts.color = "#fff";
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("body-1", cname);

            var cname = lyMap.get("body-1") + "~" + 0;
            var opts = {};
            opts.margin = 0;
            opts.preText = "";
            opts.actionFunc = self.actionFunc;
            opts.editValue = op.setObj.value;
            if (op.setObj.unit)
                opts.afterText = op.setObj.unit;
            else
                opts.afterText = "";
            comps[cname] = {name: "input", type: "input~text", opts: opts};
            var inputObj = comps[cname];

            var downFunc = function (obj) {
                var md = obj.kvObj.fatherMd;
                var selectOkFunc = function (iobj) {
                    sys.setReDraw(md.compRefs["input"], "editValue", iobj.selectText);
                    var robj = {};
                    robj.act = "valueChange";
                    robj.value = iobj.selectText;
                    robj.kvObj = md.compRefs["input"];
                    self.actionFunc(robj);


                };
                var kexts = [];
                var head = "";
                for (var i = 0; i < op.setObj.dataRegular.enum.length; i++)
                    kexts.push(new Kext("id" + i, op.setObj.dataRegular.enum[i]));
                obj.kexts = kexts;
                obj.md = md;
                obj.kvObj = md.compRefs["input"];
                obj.posType = 0;
                obj.actionFunc = selectOkFunc;
                sys.popList(obj);


            };

            var cname = lyMap.get("body-1") + "~" + 1;
            var opts = {};
            opts.margin = 0;
            opts.baseColor = "#ccc";
            opts.borderWidth = 1;
            opts.innerTextColor = "#000";
            opts.innerText = "⏬";
            opts.clickFunc = downFunc;
            comps[cname] = {name: "", type: "button~sys", opts: opts};



        }

        var strA = op.setObj.setType.split("~");
        if (strA[1] === "array") {
            var cname = lyMap.get("body") + "~" + 1;
            var opts = {};
            opts.xc = 2;
            opts.yc = 1;
            opts.iwO = {};
            opts.iwO.c0 = 9999;
            opts.iwO.c1 = 30;
            opts.color = "#fff";
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("body-1", cname);

            var cname = lyMap.get("body-1") + "~" + 0;
            var opts = {};
            opts.margin = 0;
            opts.preText = "";
            opts.actionFunc = self.actionFunc;
            opts.editValue = op.setObj.value.toString();
            opts.readOnly_f = 1;
            if (op.unit)
                opts.afterText = op.unit;
            else
                opts.afterText = "";
            comps[cname] = {name: "input", type: "input~text", opts: opts};
            var inputObj = comps[cname];

            var enterFunc = function (obj) {
                var inpObj = obj.kvObj.fatherMd.compRefs["input"];
                var butObj = obj.kvObj.fatherMd.compRefs["nameButton"];
                var md = obj.kvObj.fatherMd;
                var regName = butObj.opts.innerText;
                var opts = {};
                opts.arrayName = regName;
                opts.values = obj.kvObj.fatherMd.opts.setObj.value;
                var setObj = JSON.parse(JSON.stringify(obj.kvObj.fatherMd.opts.setObj));
                var strA = setObj.dataType.split("~");
                setObj.dataType = strA[0];
                setObj.showName_f = 0;
                setObj.showDataType_f = 0;
                setObj.setType = setObj.setType.split("~")[0];
                setObj.titleWidth = 0.1;
                setObj.value = setObj.value[0];
                opts.setObj = setObj;

                opts.selectAble_f = 1;


                opts.actionFunc = function (iobj) {
                    var value = [];
                    for (var i = 0; i < iobj.setObjs.length; i++) {
                        var setObj = iobj.setObjs[i];
                        value.push(setObj.value);
                    }
                    console.log(md);
                    console.log(value);
                    md.opts.setObj.value = value;
                    md.reCreate();
                };
                console.log(obj.kvObj.fatherMd.opts);
                var mod = new Model("", "Md_setArray", opts, {});
                var opts = {};
                opts.kvObj = mod;
                opts.w = 600;
                opts.h = 600;
                opts.center_f = 1;
                opts.shadow_f = 1;
                var maskOpts = {};
                gr.mdSystem.mdClass.popMaskOn(maskOpts);
                gr.mdSystem.mdClass.popOn(opts);
                md.popOnCnt += 2;





            };

            var cname = lyMap.get("body-1") + "~" + 1;
            var opts = {};
            opts.margin = 0;
            opts.baseColor = "#ccc";
            opts.borderWidth = 1;
            opts.innerTextColor = "#000";
            opts.innerText = "▶";
            opts.clickFunc = enterFunc;
            comps[cname] = {name: "", type: "button~sys", opts: opts};



        }



        if (op.setObj.setType === "inputBoolean") {
            var cname = lyMap.get("body") + "~" + 1;
            var opts = {};
            opts.xc = 2;
            opts.yc = 1;
            opts.iwO = {};
            opts.iwO.c0 = 9999;
            opts.iwO.c1 = 30;
            opts.color = "#fff";
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("body-1", cname);

            var cname = lyMap.get("body-1") + "~" + 0;
            var opts = {};
            opts.margin = 0;
            opts.preText = "";
            opts.actionFunc = self.actionFunc;
            opts.editValue = op.setObj.value;
            opts.afterText = "";
            opts.readOnly_f = 1;
            comps[cname] = {name: "input", type: "input~text", opts: opts};
            var inputObj = comps[cname];

            var downFunc = function (obj) {
                var md = obj.kvObj.fatherMd;
                var inObj = md.compRefs["input"];
                if (inObj.opts.editValue)
                    inObj.opts.editValue = 0;
                else
                    inObj.opts.editValue = 1;
                sys.setReDraw(inObj, "editValue", inObj.opts.editValue);
                var robj = {};
                robj.act = "valueChange";
                robj.value = inObj.opts.editValue;
                robj.kvObj = md.compRefs["input"];
                self.actionFunc(robj);

            };

            var cname = lyMap.get("body-1") + "~" + 1;
            var opts = {};
            opts.margin = 0;
            opts.baseColor = "#ccc";
            opts.borderWidth = 1;
            opts.innerTextColor = "#000";
            opts.innerText = "➕";
            opts.clickFunc = downFunc;
            comps[cname] = {name: "", type: "button~sys", opts: opts};
        }
    }
}
//===========================================
class Md_setList {
    initOpts(md) {
        var obj = {};
        obj.tagOn_f = 1;
        obj.tagColor = "#ccc";
        obj.tagWidth = 30;
        obj.dispNo_f = 1;
        obj.ih = 24;
        obj.selectAble_f = 0;
        obj.selects = {};
        obj.showTitle_f = 1;
        obj.showDataType_f = 1;
        obj.titleWidth = 250;
        obj.baseColor = "#222";
        obj.rm = gr.scrollWidth;
        //==================================
        obj.setObjs = [];
        obj.topScroll = 0;
        return obj;
    }
    setScroll(pos) {
        var self = this;
        var rootElem = document.getElementById(self.md.stas.rootId);
        if (rootElem)
            rootElem.scrollTop = pos;

    }
    getScroll() {
        var self = this;
        var rootElem = document.getElementById(self.md.stas.rootId);
        if (rootElem)
            return rootElem.scrollTop;
        return 0;
    }

    setScrollEnd() {
        var self = this;
        var rootElem = document.getElementById(self.md.stas.rootId);
        if (!rootElem)
            return;
        var pos = rootElem.scrollHeight - rootElem.clientHeight;
        rootElem.scrollTop = pos;
    }

    chkWatch() {
        var self = this;
        if (self.md.watch["optsChanged"]) {
            self.md.reCreate();
            self.setScroll(this.md.opts.topScroll);
            self.md.watch = {};
        }
    }

    afterCreate() {
        var md = this.md;
        var elem = document.getElementById(md.stas.rootId);
        var exist = KvLib.scrollVExist(elem);
        if (md.opts.rm) {
            if (!exist) {
                md.opts.rm = 0;
                md.reCreate();
            }
        } else {
            if (exist) {
                md.opts.rm = gr.scrollWidth;
                md.reCreate();
            }
        }
    }

    selectFunc(iobj) {
        console.log(iobj);
        var kvObj = iobj.kvObj;
        var strA = kvObj.name.split("~");
        if (!kvObj.opts.preText) {
            kvObj.opts.preText = "✔";
            kvObj.opts.preTextLpd = 4;
            kvObj.opts.preTextAlign = "left";
            kvObj.fatherMd.opts.selects[strA[1]] = 1;
        } else {
            kvObj.opts.preText = "";
            delete kvObj.fatherMd.opts.selects[strA[1]];
        }
        console.log(kvObj.fatherMd.opts.selects);
        kvObj.reCreate();

    }

    dataChangeFunc(iobj) {
        var editLineObj = iobj.kvObj.fatherMd;
        var strA = editLineObj.name.split("~");
        var inx = KvLib.toInt(strA[1], -1);
        if (inx < 0)
            return;
        editLineObj.fatherMd.opts.setObjs[inx].value = iobj.value;

    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var comps = op.comps;
        var models = op.models;
        //===================
        var lyOpts = {};
        var name = "c";
        lyOpts.xc = 2;
        lyOpts.yc = op.setObjs.length;
        lyOpts.ih = op.ih;
        lyOpts.rm = op.rm;//gr.scrollWidth;
        lyOpts.overflowY = "auto";
        lyOpts.color = op.baseColor;
        lyOpts.borderWidth = op.borderWidth;
        lyOpts.borderColor = op.borderColor;
        lyOpts.ihO = {};
        lyOpts.iwO = {};
        if (op.tagOn_f)
            lyOpts.iwO.c0 = op.tagWidth;
        else
            lyOpts.iwO.c0 = 0.1;
        lyOpts.iwO.c1 = 9999;


        md.opts.layouts[name] = {name: name, type: "base", opts: lyOpts};

        var itemClick = function (actObj) {
            var kvObj = actObj.kvObj;
            if (md.opts.actionFunc) {
                var obj = {};
                obj.act = "itemClick";
                obj.index = parseInt(kvObj.name.split("~")[1]);
                var rootElem = document.getElementById(md.stas.rootId);
                obj.scrollTop = rootElem.scrollTop;
                obj.scrollHeight = rootElem.scrollHeight - rootElem.clientHeight;
                obj.scrollRate = obj.scrollTop / obj.scrollHeight;
                obj.kvObj = kvObj;
                md.opts.actionFunc(obj);
            }
        };
        var index = 0;
        for (var i = 0; i < op.setObjs.length; i++) {
            if (op.tagOn_f) {
                var opts = {};
                var cname = "c" + "~" + (i * 2);
                var opts = {};
                if (!op.selectAble_f)
                    opts.disable_f = 1;
                opts.disableTextColor = "#000";
                if (op.dispNo_f) {
                    opts.innerText = (i + 1);
                    opts.textAlign = "right";
                    opts.rpd = 4;
                }
                if (op.selectAble_f) {
                    opts.clickFunc = self.selectFunc;
                }
                if (op.selects["" + i]) {
                    opts.preText = "✔";
                    opts.preTextLpd = 4;
                    opts.preTextAlign = "left";

                }
                opts.preTextLpd = 4;
                opts.actionFunc = op.actionFunc;
                comps[cname] = {name: "tagButton~" + i, type: "button~sys", opts: opts};
            }




            var setObj = op.setObjs[i];
            var opts = {};
            var cname = "c" + "~" + (i * 2 + 1);
            var opts = {};

            opts.setObj = setObj;
            opts.actionFunc = op.actionFunc;
            models[cname] = {name: "mdEditOptsLine~" + i, type: "Md_editOptsLine~sys", opts: opts};

        }
        //======================================================================
    }
}
//===========================================
class Md_setArray {
    constructor() {

    }
    initOpts(md) {
        var self = this;
        var obj = {};
        obj.arrayName = "ArrayName";
        obj.values = [];
        for (var i = 0; i < 50; i++) {
            obj.values.push("string " + (i + 1));
        }
        //=====================================
        obj.setObj = {};
        var setObj = obj.setObj;
        setObj.name = "title";
        setObj.value = "";
        setObj.dataType = "str";
        setObj.setType = "inputText";
        return obj;
    }
    afterCreate() {
    }

    chkWatch() {
        var self = this;
        if (self.md.watch["optsChanged"]) {
            if (self.md.watch["xxselectInx"]) {
                delete self.md.watch["selectInx"];
                /*  action */
                return;
            }
            self.md.reCreate();
            self.setScroll(this.md.opts.topScroll);
            self.md.watch = {};
        }

    }

    menuFunc(obj) {
        var itemId = obj.kvObj.opts.itemId;
        var md = obj.kvObj.fatherMd.fatherMd;
        console.log(obj);
        console.log(itemId);
        var tag = "";
        switch (itemId) {
            case "selectAll":
                var tag = "✔";
            case "selectClear":
                var optsList = md.modelRefs["optsList"];
                console.log(optsList);
                optsList.opts.selects = {};
                //mdEditOptsLine
                for (var key in optsList.compRefs) {
                    var strA = key.split("~");
                    if (strA[0] !== "tagButton")
                        continue;
                    var editLine = optsList.modelRefs[key];
                    var nbut = optsList.compRefs[key];
                    if (!nbut)
                        continue;
                    nbut.opts.preText = tag;
                    nbut.opts.preTextLpd = 4;
                    nbut.opts.preTextAlign = "left";
                    nbut.reCreate();
                    if (tag)
                        optsList.opts.selects[strA[1]] = 1;
                }
                break;
            case "new":

                var optsList = md.modelRefs["optsList"];
                var scrollPos = optsList.mdClass.getScroll();
                var keys = Object.keys(optsList.opts.selects);
                if (keys.length > 1) {
                    sys.setMessage("Selects can only be one or none !!!", "#f00", 3000);
                    return;
                }
                var inx = optsList.opts.setObjs.length;
                if (keys.length === 1)
                    inx = KvLib.toInt(keys[0], -1);
                if (inx < 0)
                    return;
                var sobj = JSON.parse(JSON.stringify(md.opts.setObj));
                //optsList.opts.setObjs.push(sobj);
                optsList.opts.setObjs.splice(inx, 0, sobj);


                optsList.opts.selects = {};
                optsList.reCreate();
                var optsList = md.modelRefs["optsList"];
                if (keys.length === 0)
                    optsList.mdClass.setScrollEnd();
                else {
                    var elem = document.getElementById(optsList.stas.rootId);
                    var nowPos = (inx) * optsList.opts.ih;
                    var setPos = nowPos - elem.clientHeight + optsList.opts.ih;
                    if (setPos < 0)
                        setPos = 0;
                    optsList.mdClass.setScroll(setPos);

                }

                break;
            case "delete":
                var deleteAllFunc = function (iobj) {
                    if (iobj.buttonName !== "YES")
                        return;
                    var optsList = md.modelRefs["optsList"];
                    var scrollPos = optsList.mdClass.getScroll();
                    var chg = 0;
                    for (var i = optsList.opts.setObjs.length - 1; i >= 0; i--) {
                        if (optsList.opts.selects["" + i]) {
                            optsList.opts.setObjs.splice(i, 1);
                            chg = 1;
                        }
                    }
                    optsList.opts.selects = {};
                    if (chg) {
                        optsList.reCreate();
                        var optsList = md.modelRefs["optsList"];
                        optsList.mdClass.setScroll(scrollPos);
                    }
                };
                var optsList = md.modelRefs["optsList"];
                var keys = Object.keys(optsList.opts.selects);
                if (keys.length === 0)
                    break;
                sys.mesBox("cy~warn", 500, "Delete all you selected ?", ["NO", "YES"], deleteAllFunc);
                break;

            case "moveUp":
                var optsList = md.modelRefs["optsList"];
                var scrollPos = optsList.mdClass.getScroll();
                var keys = Object.keys(optsList.opts.selects);
                if (keys.length < 1 || keys.length > 2) {
                    sys.setMessage("Please select one or two line to move !!!", "#f00", 3000);
                    return;
                }
                var inx = KvLib.toInt(keys[0], -1);
                var inx2 = KvLib.toInt(keys[1], -1);
                if (keys.length === 2) {
                    if (inx < inx2) {
                        inx = KvLib.toInt(keys[1], -1);
                        inx2 = KvLib.toInt(keys[0], -1);
                    }
                } else {
                    inx2 = inx - 1;
                }
                if (inx < 0 || inx2 < 0)
                    return;
                var setObj = optsList.opts.setObjs[inx];
                optsList.opts.setObjs.splice(inx, 1);
                optsList.opts.setObjs.splice(inx2, 0, setObj);
                delete optsList.opts.selects["" + inx];
                if (keys.length === 1)
                    optsList.opts.selects["" + (inx2)] = 1;
                else
                    delete optsList.opts.selects["" + (inx2)];

                optsList.reCreate();
                optsList.mdClass.setScroll(scrollPos);

                var optsList = md.modelRefs["optsList"];
                var elem = document.getElementById(optsList.stas.rootId);
                var nowPos = (inx2) * optsList.opts.ih;
                var prePos = nowPos - elem.clientHeight + optsList.opts.ih;
                if (prePos < 0)
                    prePos = 0;
                if ((nowPos) < scrollPos)
                    optsList.mdClass.setScroll(prePos);
                else
                    optsList.mdClass.setScroll(scrollPos);



                break;
            case "moveDown":
                var optsList = md.modelRefs["optsList"];
                var scrollPos = optsList.mdClass.getScroll();
                var keys = Object.keys(optsList.opts.selects);

                if (keys.length < 1 || keys.length > 2) {
                    sys.setMessage("Please select one or two line to move !!!", "#f00", 3000);
                    return;
                }
                var inx = KvLib.toInt(keys[0], -1);
                var inx2 = KvLib.toInt(keys[1], -1);
                if (keys.length === 2) {
                    if (inx > inx2) {
                        inx = KvLib.toInt(keys[1], -1);
                        inx2 = KvLib.toInt(keys[0], -1);
                    }
                } else {
                    inx2 = inx + 1;
                }
                if (inx < 0 || inx2 < 0)
                    return;



                if (inx2 === optsList.opts.setObjs.length)
                    return;
                var setObj = optsList.opts.setObjs[inx];
                optsList.opts.setObjs.splice(inx, 1);
                optsList.opts.setObjs.splice(inx2, 0, setObj);
                delete optsList.opts.selects["" + inx];

                if (keys.length === 1)
                    optsList.opts.selects["" + (inx2)] = 1;
                else
                    delete optsList.opts.selects["" + (inx2)];


                optsList.reCreate();
                var optsList = md.modelRefs["optsList"];
                var elem = document.getElementById(optsList.stas.rootId);
                var nowPos = (inx2) * optsList.opts.ih;
                if ((nowPos + optsList.opts.ih) > elem.clientHeight + scrollPos)
                    optsList.mdClass.setScroll(nowPos);
                else
                    optsList.mdClass.setScroll(scrollPos);


                break;
            case "save":
                if (md.opts.actionFunc) {
                    var optsList = md.modelRefs["optsList"];
                    var setObjs = [];
                    var keys = Object.keys(optsList.modelRefs);
                    for (var i = 0; i < keys.length; i++)
                        setObjs.push(0);
                    for (var i = 0; i < keys.length; i++) {
                        var strA = keys[i].split("~");
                        if (strA[0] !== "mdEditOptsLine")
                            continue;
                        var inx = KvLib.toInt(strA[1], -1);
                        if (inx < 0)
                            continue;
                        var editObj = optsList.modelRefs[keys[i]];
                        setObjs[inx] = editObj.opts.setObj;
                    }
                    optsList.opts.setObjs = setObjs;
                    var obj = {};
                    obj.act = "save";
                    obj.setObjs = optsList.opts.setObjs;
                    md.opts.actionFunc(obj);
                    gr.mdSystem.mdClass.popOff(2);
                }
                break;
            case "esc":
                gr.mdSystem.mdClass.popOff(2);
                break;

        }
    }
    actionFunc(obj) {
        console.log(obj);
        if (obj.act === "click") {
            switch (obj.kvObj.name) {
                case "chgModel":
                    break;
            }
        }
    }

    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================    
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 3;
        opts.ihO = {};
        opts.ihO.c0 = 30;
        opts.ihO.c1 = 30;
        opts.ihO.c2 = 9999;
        //==============================
        md.setFarme(opts);
        //==============================
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //==============================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.menuKexts = {};
        //==================
        var kexts = [];
        var head = "";
        kexts.push(new Kext("selectClear", "🔳", "", {enHint: "Clear All Select"}));
        kexts.push(new Kext("selectAll", "☑", "", {enHint: "Select All"}));
        kexts.push(new Kext("new", "➕", "", {enHint: "New"}));
        kexts.push(new Kext("delete", "➖", "", {enHint: "Delete"}));
        kexts.push(new Kext("moveUp", "⏫", "", {enHint: "Move Up"}));
        kexts.push(new Kext("moveDown", "⏬", "", {enHint: "Move Down"}));
        kexts.push(new Kext("save", "💾", "", {enHint: "Save"}));
        kexts.push(new Kext("esc", "❌", "", {enHint: "Esc"}));
        opts.menuKexts["rootMenu"] = kexts;
        //==================
        opts.actionFunc = self.menuFunc;
        opts.popOff_f = 0;
        opts.buttonType = "menuButton";
        models[cname] = {name: "", type: "Md_menu", opts: opts};
        //======================================================================
        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        var url = Md_editOptsLine.getDataIcon(op.setObj.dataType);
        /*
         if (url) {
         opts.preTextBackgroundImageUrl = url;
         opts.preTextBackgroundImagePosition = "fit";
         opts.preTextWidth = 30;
         opts.preText = "";
         opts.lpd=34;
         opts.innerText = op.arrayName;
         }
         */
        var fontIcon = Md_editOptsLine.getDataIconFont(op.setObj.dataType);
        if (fontIcon) {
            opts.preTextWidth = 24;
            opts.preText = fontIcon;
            opts.lpd = 24;
            opts.innerText = op.arrayName;
        }



        comps[cname] = {name: "arrayName", type: "label~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("body") + "~" + 2;
        var opts = {};
        opts.margin = 0;
        opts.setObjs = [];
        for (var i = 0; i < op.values.length; i++) {
            var sobj = JSON.parse(JSON.stringify(op.setObj));
            sobj.name = op.arrayName + "~" + i;
            sobj.value = op.values[i];
            opts.setObjs.push(sobj);
        }
        opts.rm = gr.scrollWidth;
        opts.selectAble_f = 1;
        opts.dispNo_f = 1;
        opts.tagWidth = 50;

        models[cname] = {name: "optsList", type: "Md_setList~light", opts: opts};




    }
}
//===========================================
class Md_messageBox {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var obj = {};
        obj.title = "Title";
        obj.titleColor = "#222";
        obj.buttons = ["ESC"];
        obj.messages = [];
        obj.messages.push("this is a message1");
        obj.messages.push("this is a message2");
        obj.messages.push("this is a message3");
        obj.lm = 10;
        obj.tm = 10;
        obj.rm = 10;
        obj.bm = 10;
        obj.titleHeight = 30;
        obj.buttonHeight = 30;
        obj.buttonWidth = 100;
        return obj;
    }
    afterCreate() {
    }
    buttonClickFunc(iobj) {
        console.log(iobj);
        sys.popOff(2);
        var kvObj = iobj.kvObj;
        if (kvObj.fatherMd.opts.actionFunc) {
            iobj.buttonName = kvObj.opts.innerText;
            kvObj.fatherMd.opts.actionFunc(iobj);
        }
    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================    
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 3;
        opts.ihO = {};
        opts.ihO.c0 = op.titleHeight;
        opts.ihO.c1 = 9999;
        opts.ihO.c2 = op.buttonHeight;
        opts.bm = 4;
        md.setFarme(opts);
        //==============================
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //==============================
        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.xc = 1;
        opts.yc = op.messages.length;
        opts.lm = op.lm;
        opts.rm = op.rm;
        opts.tm = op.tm;
        opts.bm = op.bm;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("main", cname);
        //==============================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.innerText = op.title;
        opts.textAlign = "center";
        opts.baseColor = op.titleColor;
        comps[cname] = {name: "title", type: "label~message", opts: opts};
        //==============================
        var cname = lyMap.get("body") + "~" + 2;
        var opts = {};
        opts.xc = op.buttons.length;
        opts.iw = op.buttonWidth;
        opts.xcen = 1;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("buttonPane", cname);


        for (var i = 0; i < op.buttons.length; i++) {
            var cname = lyMap.get("buttonPane") + "~" + i;
            var opts = {};
            opts.innerText = op.buttons[i];
            opts.clickFunc = self.buttonClickFunc;
            comps[cname] = {name: "button~" + i, type: "button~sys", opts: opts};
        }
        //==================================
        for (var i = 0; i < op.messages.length; i++) {
            var cname = lyMap.get("main") + "~" + i;
            var opts = {};
            opts.innerText = op.messages[i];
            opts.innerTextColor = "#ccc";
            comps[cname] = {name: "message~" + i, type: "plate~none", opts: opts};


        }


    }
}
//===========================================
class Md_colorPicker {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var obj = {};
        obj.color = "#000";
        obj.cr = 0;
        obj.cg = 0;
        obj.cb = 0;
        obj.opacity = 1;
        obj.colorTable = [
            "#000", "#444", "#888", "#ccc", "#eee", "#fff",
            "#400", "#800", "#c00", "#f00", "#440", "#880",
            "#040", "#080", "#0c0", "#0f0", "#cc0", "#ff0",
            "#005", "#008", "#00c", "#00f", "#088", "#0ff"
        ];
        return obj;
    }
    afterCreate() {
    }
    actionFunc(iobj) {
        console.log(iobj);
        var kvObj = iobj.kvObj;
        var act = iobj.act;
        var name = kvObj.name;
        var self = kvObj.fatherMd;
        var op = self.opts;
        if (act === "click") {
            if (name === "escButton") {
                sys.popOff(2);
                return;
            }
            if (name === "okButton") {
                sys.popOff(2);
                var colorStr = KvLib.transColorStr(op.cr, op.cg, op.cb, op.opacity);
                KvLib.exe(self.opts.actionFunc, colorStr);
                return;
            }
            var strA = name.split("~");
            if (strA[0] === "colorButton") {
                var inx = KvLib.toInt(strA[1], 0);
                var strColor = self.opts.colorTable[inx];
                self.mdClass.transColor(strColor);
                self.mdClass.setColor();
                sys.popOff(2);
                var colorStr = KvLib.transColorStr(op.cr, op.cg, op.cb, op.opacity);
                KvLib.exe(self.opts.actionFunc, colorStr);
                return;
            }
        }
        if (act === "valueChange") {
            if (name === "colorRed")
                self.opts.cr = iobj.value;
            if (name === "colorGreen")
                self.opts.cg = iobj.value;
            if (name === "colorBlue")
                self.opts.cb = iobj.value;
            if (name === "opacity")
                self.opts.opacity = iobj.value * 0.01;
            if (name === "colorInput") {
                self.mdClass.transColor(iobj.value);
            }
            self.mdClass.setColor();
        }
    }
    transColor(colorStr) {
        var md = this.md;
        var op = md.opts;
        var cobj = KvLib.transColor(colorStr);
        op.cr = cobj.r;
        op.cg = cobj.g;
        op.cb = cobj.b;
        if (cobj.a !== undefined)
            op.opacity = cobj.a;
    }
    setColor() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var rgb = "rgb(" + op.cr;
        rgb += "," + op.cg;
        rgb += "," + op.cb + ")";
        var kvObj = md.compRefs["nowColor"];
        var elem = kvObj.elems["base"];
        elem.style.backgroundColor = rgb;
        var kvObj = md.compRefs["colorRed"];
        kvObj.opts.afterText = "" + op.cr;
        sys.setReDraw(kvObj, "editValue", op.cr);
        var kvObj = md.compRefs["colorGreen"];
        kvObj.opts.afterText = "" + op.cg;
        sys.setReDraw(kvObj, "editValue", op.cg);
        var kvObj = md.compRefs["colorBlue"];
        kvObj.opts.afterText = "" + op.cb;
        sys.setReDraw(kvObj, "editValue", op.cb);

        var colorStr = KvLib.transColorStr(op.cr, op.cg, op.cb);
        var kvObj = md.compRefs["colorInput"];
        sys.setReDraw(kvObj, "editValue", colorStr);



        //var elem = kvObj.elems["input"];
        //elem.value=op.cr;

    }
    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================    
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 7;
        opts.ihO = {};
        opts.ihO.c0 = 30;
        opts.ihO.c1 = 40;
        opts.ihO.c2 = 40;
        opts.ihO.c3 = 40;
        opts.ihO.c4 = 40;
        opts.ihO.c5 = 9999;
        opts.ihO.c6 = 30;
        opts.ymO = {c0: 10};
        opts.ym = 4;
        opts.margin = 2;

        md.setFarme(opts);
        //==============================
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //==============================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.xc = 3;
        opts.iwO = {};
        opts.iwO.c0 = 50;
        opts.iwO.c1 = 9999;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("line0", cname);
        //===
        var cname = lyMap.get("line0") + "~" + 0;
        var opts = {};
        opts.innerText = "color:";
        //opts.baseColor="#222";
        opts.innerTextColor = "#fff";
        //comps[cname] = {name: "colorText", type: "plate~none", opts: opts};


        var cname = lyMap.get("line0") + "~" + 0;
        var opts = {};
        var cobj = KvLib.transColor(op.color);
        op.cr = cobj.r;
        op.cg = cobj.b;
        op.cb = cobj.g;
        if (cobj.a === undefined)
            op.opacity = 1;
        else
            op.opacity = cobj.a;
        opts.baseColor = op.color;
        opts.margin = 2;
        comps[cname] = {name: "nowColor", type: "plate~none", opts: opts};



        var cname = lyMap.get("line0") + "~" + 1;
        var opts = {};
        opts.editValue = op.color;
        opts.preText = "";
        opts.actionFunc = self.actionFunc;
        comps[cname] = {name: "colorInput", type: "input~text", opts: opts};
        //==============================
        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.preText = "Red";
        opts.preTextLine2_f = 1;
        opts.preTextHeight = "0.4rh";
        opts.preTextBackgroundColor = "#f00";
        opts.afterTextWidth = 40;
        opts.fontSize = "0.3rh";
        opts.actionFunc = self.actionFunc;
        opts.editValue = op.cr;
        opts.afterText = opts.editValue;
        opts.max = 255;
        comps[cname] = {name: "colorRed", type: "input~range", opts: opts};
        //==============================
        var cname = lyMap.get("body") + "~" + 2;
        var opts = {};
        opts.preText = "Green";
        opts.preTextLine2_f = 1;
        opts.preTextHeight = "0.4rh";
        opts.preTextBackgroundColor = "#0f0";
        opts.afterTextWidth = 40;
        opts.fontSize = "0.3rh";
        opts.actionFunc = self.actionFunc;
        opts.editValue = op.cg;
        opts.afterText = opts.editValue;
        opts.max = 255;
        comps[cname] = {name: "colorGreen", type: "input~range", opts: opts};
        //==============================
        var cname = lyMap.get("body") + "~" + 3;
        var opts = {};
        opts.preText = "Blue";
        opts.preTextLine2_f = 1;
        opts.preTextHeight = "0.4rh";
        opts.preTextBackgroundColor = "#00f";
        opts.afterTextWidth = 40;
        opts.fontSize = "0.3rh";
        opts.actionFunc = self.actionFunc;
        opts.editValue = op.cb;
        opts.afterText = opts.editValue;
        opts.max = 255;
        comps[cname] = {name: "colorBlue", type: "input~range", opts: opts};
        //==============================
        var cname = lyMap.get("body") + "~" + 4;
        var opts = {};
        opts.preText = "Opacity";
        opts.preTextLine2_f = 1;
        opts.preTextHeight = "0.4rh";
        opts.preTextBackgroundColor = "#888";
        opts.afterTextWidth = 40;
        opts.fontSize = "0.3rh";
        opts.actionFunc = self.actionFunc;
        opts.editValue = op.opacity * 100;
        opts.afterText = op.opacity;
        opts.mulRate = 0.01;
        opts.fixed = 2;
        comps[cname] = {name: "opacity", type: "input~range", opts: opts};
        //==============================
        var cname = lyMap.get("body") + "~" + 5;
        var opts = {};
        opts.xc = 6;
        opts.yc = 4;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("line5", cname);
        //===
        for (var i = 0; i < 24; i++) {
            var cname = lyMap.get("line5") + "~" + i;
            var opts = {};
            opts.baseColor = op.colorTable[i];
            opts.insideShadowWidth = 0;
            opts.clickFunc = self.actionFunc;
            comps[cname] = {name: "colorButton~" + i, type: "button~sys", opts: opts};
        }

        //===============================
        var cname = lyMap.get("body") + "~" + 6;
        var opts = {};
        opts.xc = 2;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("line6", cname);
        //===
        var cname = lyMap.get("line6") + "~" + 0;
        var opts = {};
        opts.innerText = "ESC";
        opts.clickFunc = self.actionFunc;
        comps[cname] = {name: "escButton", type: "button~sys", opts: opts};

        var cname = lyMap.get("line6") + "~" + 1;
        var opts = {};
        opts.innerText = "OK";
        opts.clickFunc = self.actionFunc;
        comps[cname] = {name: "okButton", type: "button~sys", opts: opts};
        //==============================








    }
}
//===========================================
class Md_filePicker {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var obj = {};
        var options = obj.dirOptions = [];
        options.push("systemResource");
        options.push("user-kevin");
        var options = obj.filterOptions = [];
        options.push("*jpg, *.bmp, *.png");
        options.push("*.txt");
        options.push("*.pdf");
        options.push("*.*");

        obj.kvObjType = "image";
        //obj.kvObjType="txt";
        obj.urls = [];
        obj.url = "systemResource/test.txt";

        return obj;
    }
    afterCreate() {
    }
    build(md) {
        var actionFunc = function (iobj) {
            console.log("md_filePicker:");
            console.log(iobj);
            var kvObj = iobj.kvObj;
            var name = kvObj.name;

            if (iobj.act === "itemClick") {
                var mdList = iobj.kvObj.fatherMd;
                var scrollTop = iobj.scrollTop;
                mdList.opts.selectInx = iobj.index;
                mdList.reCreate();
                mdList.mdClass.setScroll(scrollTop);
                var fileNameObj = md.compRefs["fileName"];
                var dirObj = md.compRefs["dirButton"];
                var dirName = dirObj.opts.options[dirObj.opts.selectInx];
                var path = dirName + "/" + iobj.selectText;
                sys.setReDraw(fileNameObj, "innerText", path);

                var vKvObj = md.modelRefs["viewKvObj"];
                var strA = iobj.selectText.split(".");
                var exName = strA[strA.length - 1];

                var flag = 1
                while (1) {
                    if (exName === "js" || exName === "css" || exName === "html")
                        break;
                    if (exName === "txt" || exName === "xml" || exName === "json")
                        break;
                    flag = 0;
                    break;
                }
                if (flag) {
                    vKvObj.opts.kvObjType = "w3doc";
                    vKvObj.opts.classType = "editor~sys";
                    vKvObj.opts.className = "component";
                    vKvObj.opts.iw = 0;
                    vKvObj.opts.ih = 0;
                    var kvObjOpts = vKvObj.opts.kvObjOpts;
                    kvObjOpts.borderWidth = 0;
                    kvObjOpts.exName = exName;
                    kvObjOpts.urls = [path];
                    kvObjOpts.urlsInx = 0;
                    kvObjOpts.baseColor = "#333";
                    vKvObj.reCreate();
                    return;
                }


                if (exName === "txt" || exName === "pdf" || exName === "json") {
                    vKvObj.opts.kvObjType = "txt";
                    vKvObj.opts.exName = exName;
                    vKvObj.opts.classType = "urlReader~sys";
                    vKvObj.opts.className = "component";
                    vKvObj.opts.iw = 0;
                    vKvObj.opts.ih = 0;
                    var kvObjOpts = vKvObj.opts.kvObjOpts;
                    kvObjOpts.urls = [path];
                    kvObjOpts.urlsInx = 0;
                    kvObjOpts.baseColor = "#fff";
                    kvObjOpts.borderWidth = 0;
                    kvObjOpts.exName = exName;
                    vKvObj.reCreate();
                    return;
                }
                if (exName === "mp4") {
                    vKvObj.opts.kvObjType = "video";
                    vKvObj.opts.exName = exName;
                    vKvObj.opts.classType = "video~sys";
                    vKvObj.opts.className = "component";
                    vKvObj.opts.iw = 0;
                    vKvObj.opts.ih = 0;
                    var kvObjOpts = vKvObj.opts.kvObjOpts;
                    kvObjOpts.urls = [path];
                    kvObjOpts.urlsInx = 0;
                    kvObjOpts.baseColor = "#000";
                    kvObjOpts.borderWidth = 0;
                    kvObjOpts.exName = exName;
                    vKvObj.reCreate();
                    return;
                }

                if (exName === "bmp" || exName === "jpg" || exName === "png") {
                    var retFunc = function (obj) {
                        console.log(obj);
                        var ly = md.layoutRefs["c~1"];
                        var rect = ly.stas.lyRects["0"];
                        var ww = obj.w;
                        var hh = obj.h;
                        if (ww > rect.w || hh > rect.h) {
                            if (obj.w)
                                var w = rect.w;
                            var h = rect.h;
                            var rate = obj.w / obj.h;
                            ww = h * rate;
                            hh = h;
                            if (ww > w) {
                                ww = w;
                                hh = ww / rate;
                            }
                        }
                        vKvObj.opts.iw = ww | 0;
                        vKvObj.opts.ih = hh | 0;
                        vKvObj.opts.className = "component";
                        vKvObj.opts.classType = "plate~none";
                        vKvObj.opts.kvObjType = "image";
                        var kvObjOpts = vKvObj.opts.kvObjOpts;
                        kvObjOpts.backgroundImageUrls = [path];
                        kvObjOpts.backgroundInx = 0;
                        kvObjOpts.baseColor = "#222";
                        kvObjOpts.borderWidth = 1;
                        kvObjOpts.exName = exName;
                        vKvObj.reCreate();

                        var dirObj = md.compRefs["fileName"];
                        var rate = "" + ((ww * 100 / obj.w) | 0) + "% ";
                        dirObj.opts.afterText = rate + "size: " + obj.w + "x" + obj.h;
                        dirObj.opts.afterTextRpd = 10;
                        dirObj.reCreate();
                        return;
                    };

                    KvLib.getImageSize(path, retFunc);
                }
                return;
            }
            if (iobj.act === "selectChange") {
                var mdList = md.modelRefs["fileList"];
                mdList.opts.listTexts = [];
                mdList.opts.selectInx = -1;
                mdList.reCreate();
                var fileNameObj = md.compRefs["fileName"];
                fileNameObj.opts.innerText = "";
                fileNameObj.opts.afterText = "";
                fileNameObj.reCreate();


                var vKvObj = md.modelRefs["viewKvObj"];
                vKvObj.opts.iw = 0;
                vKvObj.opts.ih = 0;
                var kvObjOpts = vKvObj.opts.kvObjOpts;
                kvObjOpts.backgroundImageUrls = [path];
                kvObjOpts.backgroundInx = null;
                kvObj.kvObjType = "image";
                vKvObj.reCreate();


                return;
            }
            if (iobj.act === "click") {
                sys.popOff(2);
                if (name === "okButton") {
                    var fileNameObj = md.compRefs["fileName"];
                    KvLib.exe(md.opts.actionFunc, fileNameObj.opts.innerText);
                }
            }
            return;
        }
        ;
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================    
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 2;
        opts.ihO = {};
        opts.ihO.c0 = 30;
        opts.ihO.c1 = 9999;
        //md.setFarme(opts);
        //==============================
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //==============================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.xc = 3;
        opts.iwO = {};
        opts.iwO.c0 = 9999;
        opts.iwO.c1 = 100;
        opts.iwO.c2 = 100;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("line0", cname);
        //===
        var cname = lyMap.get("line0") + "~" + 0;
        var opts = {};
        opts.innerText = "";
        opts.textAlign = "left";
        opts.preTextWidth = 50;
        opts.preText = "File: ";
        opts.lpd = 50;
        comps[cname] = {name: "fileName", type: "label~sys", opts: opts};
        var cname = lyMap.get("line0") + "~" + 1;
        var opts = {};
        opts.innerText = "OK";
        opts.clickFunc = actionFunc;
        comps[cname] = {name: "okButton", type: "button~sys", opts: opts};
        var cname = lyMap.get("line0") + "~" + 2;
        var opts = {};
        opts.innerText = "ESC";
        opts.clickFunc = actionFunc;
        comps[cname] = {name: "escButton", type: "button~sys", opts: opts};
        //==============================
        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.xc = 2;
        opts.iwO = {};
        opts.iwO.c0 = 9999;
        opts.iwO.c1 = 400;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("line1", cname);
        //===
        var cname = lyMap.get("line1") + "~" + 0;
        var opts = {};

        opts.iw = 0;
        opts.ih = 0;
        var kop = opts.kvObjOpts = {};
        if (op.kvObjType === "image") {
            opts.className = "component";
            opts.classType = "plate~none";
            kop.backgroundImageUrls = [];
            kop.baseColor = "rgba(0,0,0,0)";
            kop.borderWidth = 1;
            kop.borderColor = "#888";
        }
        if (op.kvObjType === "txt") {
            opts.className = "component";
            opts.classType = "urlReader~sys";
            kop.urls = [];
            kop.urlsInx = 0;
            kop.baseColor = "#fff";
        }

        if (op.kvObjType === "w3doc") {
            opts.className = "component";
            opts.classType = "editor~sys";
            kop.baseColor = "#333";
        }


        //kop.urls=["systemResource/test.txt"];
        //kop.urlsInx=0;
        //kop.baseColor="#fff";
        models[cname] = {name: "viewKvObj", type: "Md_viewKvObj~sys", opts: opts};
        //===
        var cname = lyMap.get("line1") + "~" + 1;
        var opts = {};
        opts.yc = 4;
        opts.ihO = {};
        opts.ihO.c0 = 30;
        opts.ihO.c1 = 30;
        opts.ihO.c2 = 24;
        opts.ihO.c3 = 9999;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("filePanel", cname);
        var cname = lyMap.get("filePanel") + "~" + 0;
        var opts = {};
        //opts.innerText = "ESC";
        opts.preText = "Folder";
        opts.preTextWidth = 100;
        opts.preTextAlign = "left";
        opts.options = op.dirOptions;
        opts.selectInx = 0;
        opts.actionFunc = actionFunc;
        comps[cname] = {name: "dirButton", type: "select~sys", opts: opts};
        var cname = lyMap.get("filePanel") + "~" + 1;
        var opts = {};
        opts.preText = "Filter";
        opts.preTextWidth = 100;
        opts.preTextAlign = "left";
        opts.options = op.filterOptions;
        opts.selectInx = 0;
        opts.actionFunc = actionFunc;
        //opts.innerText = "ESC";
        comps[cname] = {name: "filterButton", type: "select~sys", opts: opts};
        var cname = lyMap.get("filePanel") + "~" + 2;
        var opts = {};
        opts.menuKexts = {};
        //==================
        var menuFunc = function (iobj) {
            var kvObj = iobj.kvObj;
            var itemId = kvObj.opts.itemId;
            var fileLoaded = function (iobj) {
                var mdList = md.modelRefs["fileList"];
                mdList.opts.listTexts = [];
                for (var i = 0; i < iobj.length; i++) {
                    mdList.opts.listTexts.push(iobj[i]);
                }
                mdList.opts.selectInx = -1;
                mdList.reCreate();
            };
            if (itemId === "reload") {
                var dirObj = md.compRefs["dirButton"];
                var dirName = dirObj.opts.options[dirObj.opts.selectInx];
                var filterObj = md.compRefs["filterButton"];
                var filterName = filterObj.opts.options[filterObj.opts.selectInx];
                sys.getServerFileNames(fileLoaded, dirName, filterName);
            }
            return;
        };
        var kexts = [];
        var head = "";
        kexts.push(new Kext("reload", "loadFiles", "", {enHint: "load files"}));
        opts.menuKexts["rootMenu"] = kexts;
        //==================
        opts.actionFunc = menuFunc;
        opts.popOff_f = 0;
        opts.buttonType = "menuButton";
        models[cname] = {name: "", type: "Md_menu", opts: opts};
        //======================================================================
        var cname = lyMap.get("filePanel") + "~" + 3;
        var opts = {};
        opts.listTexts = [];
        opts.actionFunc = actionFunc;
        models[cname] = {name: "fileList", type: "Md_list~sys", opts: opts};
        return;
    }
}
//===========================================








//===========================================
class Md_viewKvObj {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var op = {};
        op.iw = 0;
        op.ih = 0;
        op.className = "component";//model
        op.classType = "button~sys";//model
        op.kvObjOpts = {};


        op.kvObjOpts = {};
        return op;
    }
    afterCreate() {
    }
    build(md) {
        var actionFunc = function (iobj) {
            console.log("md_filePicker:");
            console.log(iobj);
            var kvObj = iobj.kvObj;
            var name = kvObj.name;

            if (iobj.act === "click") {
            }
            return;
        };
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================    
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 1;
        opts.rootIw = op.iw;
        opts.rootIh = op.ih;
        if (op.showFrame_f)
            opts.borderWidth = 1;
        //==============================
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //==============================

        if (op.className && op.classType) {
            var cname = lyMap.get("body") + "~" + 0;
            var opts = op.kvObjOpts;
            if (op.className === "component")
                comps[cname] = {name: "kvObj", type: op.classType, opts: opts};
            if (op.className === "model")
                models[cname] = {name: "kvObj", type: op.classType, opts: opts};
        }
        return;
    }
}
//===========================================
