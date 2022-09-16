/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global KvLib, gr */

class Layout {
    constructor(_name, _type, _opts, _paras) {
        this.name = _name;
        this.type = _type;
        this.kid = KvLib.genKid();
        this.paras = this.initParas();
        this.opts = this.initOpts();
        this.stas = {};
        KvLib.coverObject(this.paras, _paras);
        KvLib.deepCoverObject(this.opts, _opts);
        gr.kidMap.set(this.kid, this);
    }

    initParas() {
        var obj = {};
        obj.editColor = "#888";
        obj.mode = "normal";
        return obj;
    }
    initOpts() {
        var obj = {};
        obj.type = "array";
        obj.xc = 1;
        obj.yc = 1;
        obj.xcen = 0;
        obj.ycen = 0;
        obj.xst = 0;
        obj.yst = 0;
        obj.lm = null;
        obj.tm = null;
        obj.rm = null;
        obj.bm = null;
        obj.xm = 0;
        obj.ym = 0;
        obj.iw = 0;
        obj.ih = 0;
        obj.fw = 0;
        obj.fh = 0;
        obj.margin = 0;
        obj.whr = 0;
        obj.xmO = {};
        obj.ymO = {};
        obj.iwO = {};
        obj.ihO = {};
        obj.color = gr.baseColor;
        obj.borderWidth = 0;
        obj.borderColor = "#000";
        obj.overflowX = "hidden";
        obj.overflowY = "hidden";
        //==========================
        var strA = this.type.split("~");
        this.baseType = strA[0];
        this.subType = strA[1];
        if (this.baseType === "xxxx") {


            if (this.subType === "XX") {

                return;
            }
            return;
        }
        return obj;
    }

    setMargin(_margin) {
        this.opts.margin = _margin;
    }

    addLy(name, opts) {
        var strA = name.split("~");
        if (strA.length < 2)
            return;
        if (strA[0] !== "c")
            return;
        var strB = [];
        for (var i = 1; i < strA.length; i++) {
            strB.push(strA[i]);
        }
        var lyObj = this;
        var objName = "lyObj";
        for (var i = 0; i < strB.length; i++) {
            objName += ".sonLys" + ".c" + strB[i];
        }
        var name = "";
        for (var i = 0; i < strB.length; i++) {
            name += "~" + strB[i];
        }
        var obj = new Layout(lyObj.name + name, lyObj.type, opts, lyObj.paras);
        obj.model = this.model;
        obj.rootLayout = this.rootLayout;
        eval(objName + "=obj;");
        this.sonLys["c" + name] = obj;
    }

    transData() {
        var self = this;
        var op = self.opts;
        var st = self.stas;
        st.lyRects = [];
        var margin = KvLib.transUnit(op.margin);
        st.lm = margin;
        st.tm = margin;
        st.rm = margin;
        st.bm = margin;
        if (op.tm !== null)
            st.tm = KvLib.transUnit(op.tm);
        if (op.rm !== null)
            st.rm = KvLib.transUnit(op.rm);
        if (op.bm !== null)
            st.bm = KvLib.transUnit(op.bm);
        if (op.lm !== null)
            st.lm = KvLib.transUnit(op.lm);
        st.xm = KvLib.transUnit(op.xm);
        st.ym = KvLib.transUnit(op.ym);
        st.iw = KvLib.transUnit(op.iw);
        st.ih = KvLib.transUnit(op.ih);
        //=
        st.xmO = {};
        var xmOkeys = Object.keys(op.xmO);
        for (var i = 0; i < xmOkeys.length; i++) {
            st.xmO[xmOkeys[i]] = KvLib.transUnit(op.xmO[xmOkeys[i]]);
        }

        st.ymO = {};
        var ymOkeys = Object.keys(op.ymO);
        for (var i = 0; i < ymOkeys.length; i++) {
            st.ymO[ymOkeys[i]] = KvLib.transUnit(op.ymO[ymOkeys[i]]);
        }
        st.iwO = {};
        var iwOkeys = Object.keys(op.iwO);
        for (var i = 0; i < iwOkeys.length; i++) {
            st.iwO[iwOkeys[i]] = KvLib.transUnit(op.iwO[iwOkeys[i]]);
        }
        st.ihO = {};
        var ihOkeys = Object.keys(op.ihO);
        for (var i = 0; i < ihOkeys.length; i++) {
            st.ihO[ihOkeys[i]] = KvLib.transUnit(op.ihO[ihOkeys[i]]);
        }
    }

    grid(fhid, x, y, fw, fh) {
        var self = this;
        var op = self.opts;
        var st = self.stas;
        st.fhid=fhid;
        st.lyRects = [];
        var yst = st.yst;
        var xst = st.xst;
        var fwb = st.fw;
        var fhb = st.fh;
        if (x !== undefined)
            xst = x;
        if (y !== undefined)
            yst = x;
        if (fw !== undefined)
            fwb = fw;
        if (fh !== undefined)
            fhb = fw;


        var tmb = st.tm;
        var rmb = st.rm;
        var bmb = st.bm;
        var lmb = st.lm;
        var ihb = st.ih;
        var iwb = st.iw;
        var xmb = st.xm;
        var ymb = st.ym;
        var fwb = st.fw;
        var fhb = st.fh;
        var xc = op.xc;
        var yc = op.yc;

        var yend = 0;
        var xend = 0;
        var y = 0;
        var x = 0;
        var k = 0;
        var yf = 0.0;
        var ihbuf, iwbuf;
        var m = 0;
        var xrf = 0.0;
        var yrf = 0.0;
        var xmax;
        var ymax;
        var wr = 0;
        var hr;


        if (op.whr) {
            var ww = (op.whr * fhb) | 0;
            var hh = (fwb / op.whr) | 0;
            if (ww > fwb) {
                ww = fwb;
            } else {
                hh = fhb;
            }
            yst = (((fhb - hh) / 2) | 0) + yst;
            xst = (((fwb - ww) / 2) | 0) + xst;
            fhb = hh;
            fwb = ww;
        }
        //================================
        xrf = 0;
        var allXm = lmb + rmb + (xc - 1) * xmb;
        var xmOkeys = Object.keys(op.xmO);
        for (var i = 0; i < xmOkeys.length; i++) {
            allXm += op.xmO[xmOkeys[i]];
        }

        //=====================================
        var iwOkeys = Object.keys(op.iwO);
        var restIw = fwb - allXm;
        for (var i = 0; i < iwOkeys.length; i++) {
            if (op.iwO[iwOkeys[i]] === 9999)
                continue;
            restIw -= op.iwO[iwOkeys[i]];
        }
        for (var i = 0; i < iwOkeys.length; i++) {
            if (op.iwO[iwOkeys[i]] === 9999)
                op.iwO[iwOkeys[i]] = restIw;
        }
        //=====================================
        if (iwb === 0)
        {
            iwb = (fwb - allXm) / xc;
            iwb = iwb | 0;
            wr = (fwb - lmb - rmb - allXm) % xc;
            xrf = wr / xc;
        } else
        {
            if (op.xcen === 1)
            {
                lmb = (fwb - iwb * xc - allXm) / 2;
                rmb = lmb;
                wr = (fwb - lmb - rmb - allXm) % xc;
                xrf = wr / xc;
            }
        }

        yrf = 0;
        var allYm = tmb + bmb + (yc - 1) * ymb;
        var ymOkeys = Object.keys(op.ymO);
        for (var i = 0; i < ymOkeys.length; i++) {
            allYm += op.ymO[ymOkeys[i]];
        }
        //=====================================
        var ihOkeys = Object.keys(op.ihO);
        var restIh = fhb - allYm;
        for (var i = 0; i < ihOkeys.length; i++) {
            if (op.ihO[ihOkeys[i]] === 9999)
                continue;
            restIh -= op.ihO[ihOkeys[i]];
        }
        for (var i = 0; i < ihOkeys.length; i++) {
            if (op.ihO[ihOkeys[i]] === 9999)
                op.ihO[ihOkeys[i]] = restIh;
        }
        //=====================================


        if (ihb === 0)
        {
            ihb = (fhb - allYm) / yc;
            ihb = ihb | 0;
            hr = (fhb - tmb - bmb - (yc - 1) * ymb) % yc;
            yrf = hr / yc;
        } else
        {
            if (op.ycen === 1)
            {
                tmb = (fhb - ihb * yc - allYm) / 2;
                bmb = tmb;
                hr = (fhb - tmb - bmb - allYm) % yc;
                yrf = hr / yc;
            }

        }
        //================================
        yend = 0;
        y = yst + tmb;
        k = 0;
        yf = yrf;

        var inx = -1;
        if (op.type === "array") {
            yend = 0;
            y = yst + tmb;
            k = 0;
            yf = 0.0;
            for (var i = 0; i < op.yc; i++)
            {
                var n = 0;
                var xf = xrf;
                if (yf >= 1)
                {
                    yf -= 1;
                    n = 1;
                }
                /*
                if (i === (op.yc - 1)) {
                    if (yf >= 0.001)
                        n += 1;
                }
                */

                x = xst + lmb;
                xend = 0;
                ihbuf = ihb;
                if (op.ihO["c" + i]) {
                    ihbuf = op.ihO["c" + i];
                }

                for (var j = 0; j < op.xc; j++)
                {
                    inx++;
                    m = 0;
                    if (xf >= 0.999)
                    {
                        xf -= 1;
                        m = 1;
                    }
                    if (j === (op.xc - 1)) {
                        if (xf >= 0.001)
                            m += 1;
                    }

                    iwbuf = iwb;
                    if (op.iwO["c" + j]) {
                        iwbuf = op.iwO["c" + j];
                    }
                    //console.log(self.paras.layout.opts.userLy);
                    var style = "auto";
                    var xb = x;
                    var yb = y;
                    var wb = iwbuf + m;
                    var hb = ihbuf + n;
                    var zb = 0;
                    //=============
                    var strA = (self.name + "~" + inx).split("~");
                    var name = "c";
                    for (var ii = 1; ii < strA.length; ii++) {
                        name += "~" + strA[ii];
                    }


                    if (self.fatherMd.opts.userRects) {
                        var userLy = self.model.opts.userRects;
                        var keys = Object.keys(userLy);
                        if (userLy[name]) {
                            xb = KvLib.transUnit(userLy[name].x);
                            yb = KvLib.transUnit(userLy[name].y);
                            wb = KvLib.transUnit(userLy[name].w);
                            hb = KvLib.transUnit(userLy[name].h);
                            zb = userLy[name].z;
                            style = "user";
                        }
                    }



                    var rectObj = {x: xb, y: yb, w: wb, h: hb, z: zb, style: style, name: name};
                    st.lyRects.push(rectObj);
                    self.fatherMd.layZinxMap.set(name, 0);

                    xend = x + iwbuf;
                    x += (xmb + iwbuf + m);
                    if (op.xmO["c" + j])
                        x += op.xmO["c" + j];
                    xf += xrf;
                    k++;
                }
                yend = y + ihbuf;
                y += (ymb + ihbuf + n);
                if (op.ymO["c" + i])
                    y += op.ymO["c" + i];
                yf += yrf;
                if (xend > xmax)
                    xmax = xend;

            }


        }


    }

    editMouseClick(event) {
        var elem = event.target;
        var fhid = elem.kvd.fhid;
        var lyObj = elem.kvd.layout;
        var lyBase = elem.kvd.model.layout;
        var rectName = elem.kvd.lyRect.name;
        var layZinxMap = lyObj.model.layZinxMap;

        var max = 0;
        var min = 0;
        for (let key of layZinxMap.keys()) {
            if (key === rectName)
                continue;
            var level = layZinxMap.get(key);
            if (level > max)
                max = level;
            if (level < min)
                min = level;
        }
        max++;
        min--;
        var saveElemData = function () {
            gr.mouseAct.act = lyObj.paras.act;
            gr.mouseAct.mouseDownX = event.clientX;
            gr.mouseAct.mouseDownY = event.clientY;
            gr.mouseAct.elemLeft = KvLib.transUnit(elem.style.left, 0);
            gr.mouseAct.elemTop = KvLib.transUnit(elem.style.top, 0);
            gr.mouseAct.elemWidth = KvLib.transUnit(elem.style.width, 0);
            gr.mouseAct.elemHeight = KvLib.transUnit(elem.style.height, 0);
            gr.mouseAct.elemZIndex = elem.style.zIndex;
            gr.mouseAct.moveX = 0;
            gr.mouseAct.moveY = 0;
            gr.mouseAct.elem = elem;
        };
        if (lyObj.paras.act === "move") {
            if (!gr.mouseAct.act) {
                saveElemData();
                elem.style.background = "radial-gradient(circle at center,red,black)";
                elem.style.zIndex = "" + max;
            } else {
                gr.mouseAct.act = null;
                elem.style.background = "radial-gradient(circle at center,blue,black)";
                layZinxMap.set(rectName, max);
                lyBase.stas.setRects[rectName] = {};
                var rectObj = lyBase.stas.setRects[rectName];
                rectObj.x = KvLib.transUnit(elem.style.left, 0);
                rectObj.y = KvLib.transUnit(elem.style.top, 0);
                rectObj.w = KvLib.transUnit(elem.style.width, 0);
                rectObj.h = KvLib.transUnit(elem.style.height, 0);
                rectObj.z = parseInt(elem.style.zIndex);
                rectObj.fh = elem.kvd.felem.clientHeight;
                rectObj.fw = elem.kvd.felem.clientWidth;
                console.log(lyBase.stas.setRects);
                return;


            }
        }

        if (lyObj.paras.act === "resize") {
            if (!gr.mouseAct.act) {
                saveElemData();
                elem.style.background = "radial-gradient(circle at center,red,black)";
                elem.style.zIndex = "" + max;
                elem.style.cursor = "crosshair";

            } else if (gr.mouseAct.act === "resize") {
                if (elem.id === gr.mouseAct.elem.id) {
                    saveElemData();
                    gr.mouseAct.act = "resizeStart";
                    elem.style.cursor = "nwse-resize";

                }
            } else {
                gr.mouseAct.act = null;
                gr.mouseAct.elem.style.background = "radial-gradient(circle at center,blue,black)";
                gr.mouseAct.elem = elem;
                gr.mouseAct.elem.style.cursor = "pointer";
                var lyRectObj = elem.kvd.lyRect;
                lyRectObj.w = KvLib.transUnit(gr.mouseAct.elem.style.width, 0);
                lyRectObj.h = KvLib.transUnit(gr.mouseAct.elem.style.height, 0);
                lyRectObj.type = "user";
                layZinxMap.set(gr.mouseAct.elem.id, max);
            }
        }



    }

    feditMouseClick(event) {
        //console.log(event);
    }

    feditMouseDown(event) {
        if (event.button !== 0) {
            if (gr.mouseAct.act === "move") {
                gr.mouseAct.act = null;
                gr.mouseAct.elem.style.background = "radial-gradient(circle at center,blue,black)";
                gr.mouseAct.elem.style.zIndex = gr.mouseAct.elemZIndex;
                gr.mouseAct.elem.style.left = gr.mouseAct.elemLeft + "px";
                gr.mouseAct.elem.style.top = gr.mouseAct.elemTop + "px";

            }
            if (gr.mouseAct.act === "resize") {

                gr.mouseAct.act = null;
                gr.mouseAct.elem.style.background = "radial-gradient(circle at center,blue,black)";
                gr.mouseAct.elem.style.zIndex = gr.mouseAct.elemZIndex;
                gr.mouseAct.elem.style.left = gr.mouseAct.elemLeft + "px";
                gr.mouseAct.elem.style.top = gr.mouseAct.elemTop + "px";

            }
        }
    }

    feditMouseMove(event) {
        if (gr.mouseAct.act === "move") {
            var moveX = event.clientX - gr.mouseAct.mouseDownX;
            var moveY = event.clientY - gr.mouseAct.mouseDownY;
            gr.mouseAct.elem.style.left = (gr.mouseAct.elemLeft + moveX) + "px";
            gr.mouseAct.elem.style.top = (gr.mouseAct.elemTop + moveY) + "px";
            gr.mouseAct.moveX = moveX;
            gr.mouseAct.moveY = moveY;

        }
        if (gr.mouseAct.act === "resizeStart") {
            var moveX = event.clientX - gr.mouseAct.mouseDownX;
            var moveY = event.clientY - gr.mouseAct.mouseDownY;
            var width = gr.mouseAct.elemWidth + moveX;
            var height = gr.mouseAct.elemHeight + moveY;
            if (width <= 1) {
                width = 2;
            }
            if (height <= 1) {
                height = 2;
            }

            gr.mouseAct.elem.style.width = (width) + "px";
            gr.mouseAct.elem.style.height = (height) + "px";

        }


    }

    build() {
    }

    create(fhid, xst, yst, fw, fh, root) {
        var self = this;
        var st = self.stas;
        var op = self.opts;
        var ly = st.ly;
        self.transData();
        st.xst = xst;
        st.yst = yst;
        st.fw = fw;
        st.fh = fh;
        if (!st.fw)
            st.fw = document.getElementById(st.fhid).clientWidth;
        if (!st.fh)
            st.fh = document.getElementById(st.fhid).clientHeight;
        if (!xst)
            st.xst = 0;
        if (!yst)
            st.yst = 0;
        st.borderWidth = KvLib.transUnit(op.borderWidth, 0);
        if(op.rootIw){
            st.xst+=(st.fw-op.rootIw)/2;
            st.fw=op.rootIw;
        }    
        if(op.rootIh){
            st.yst+=(st.fh-op.rootIh)/2;
            st.fh=op.rootIh;
        }    
        st.fw -= st.borderWidth;
        st.fh -= st.borderWidth;
         
        var felem = document.getElementById(fhid);
        var relem = felem;
        //==============================================
        if (root) {
            var rootElem = document.createElement("div");
            rootElem.id = this.kid + "~" + "root";
            rootElem.style.position = "absolute";
            rootElem.style.backgroundColor =  op.color;
            rootElem.style.borderWidth = KvLib.transUnit(op.borderWidth, 0) + "px";
            rootElem.style.borderColor = op.borderColor;
            rootElem.style.borderStyle = "solid";
            rootElem.style.overflowX = op.overflowX;
            rootElem.style.overflowY = op.overflowY;
            if (op.zIndex)
                rootElem.style.zIndex = op.zIndex;

            if (self.paras.mode === "edit") {
                rootElem.onmousedown = self.feditMouseDown;
                rootElem.onmousemove = self.feditMouseMove;
            }
            if (op.outsideShadowWidth) {
                var str = "";
                str += KvLib.transUnit(op.outsideShadowOffx, 0) + "px ";
                str += KvLib.transUnit(op.outsideShadowOffy, 0) + "px ";
                str += KvLib.transUnit(op.outsideShadowWidth, 0) + "px ";
                str += op.outsideShadowColor;
                rootElem.style.boxShadow = str;
            }
            //st.fw -= st.borderWidth * 2;
            //st.fh -= st.borderWidth * 2;
            rootElem.style.left = st.xst + "px";
            rootElem.style.top = st.yst + "px";
            rootElem.style.width = (st.fw) + "px";
            rootElem.style.height = (st.fh) + "px";
            felem.appendChild(rootElem);
            relem = rootElem;
            st.xst = 0;
            st.yst = 0;
            self.fatherMd.stas.rootId = rootElem.id;
            self.fatherMd.stas.fhid = fhid;
        }
        //==============================================
        self.grid();
        var shrinkX = 0;
        for (var i = 0; i < st.lyRects.length; i++) {
            st.lyRects[i].fhid = relem.id;
            var x = st.lyRects[i].x;
            var y = st.lyRects[i].y;
            var w = st.lyRects[i].w;
            var h = st.lyRects[i].h;
            var cname = st.lyRects[i].name;
            
            
            if (self.fatherMd.opts.layoutGroups[cname]) {
                var group = self.fatherMd.opts.layoutGroups[cname];
                var groupElem = document.createElement("div");
                groupElem.id = this.kid + "~group~" + cname;
                if(!self.fatherMd.stas.layoutGroups)
                    self.fatherMd.stas.layoutGroups={};
                self.fatherMd.stas.layoutGroups[cname]={fhid:groupElem.id,x:x,y:y};
                
                
                st.lyRects[i].groupHid = groupElem.id;
                groupElem.style.position = "absolute";
                groupElem.style.backgroundColor = group.color;
                //groupElem.style.borderWidth = KvLib.transUnit(op.borderWidth, 0) + "px";
                //groupElem.style.borderColor = op.borderColor;
                //groupElem.style.borderStyle = "solid";
                //if (op.zIndex)
                //rootElem.style.zIndex = op.zIndex;

                //if (self.paras.mode === "edit") {
                //    rootElem.onmousedown = self.feditMouseDown;
                // rootElem.onmousemove = self.feditMouseMove;
                //}
                //st.fw -= st.borderWidth * 2;
                //st.fh -= st.borderWidth * 2;
                groupElem.style.left = x + "px";
                groupElem.style.top = y + "px";
                groupElem.style.width = (w) + "px";
                groupElem.style.height = (h) + "px";
                var gelem = document.getElementById(relem.id);
                gelem.appendChild(groupElem);
                
            }
            
            if (self.paras.mode === "edit") {
                var elem = document.createElement("div");
                elem.id = this.kid + "~" + i;
                var kvd = {};
                elem.style.position = "absolute";
                elem.style.overflow = "hidden";
                elem.style.backgroundColor = self.stas.color;
                if (self.paras.mode === "edit") {
                    elem.style.backgroundColor = self.paras.editColor;
                    elem.style.background = "radial-gradient(circle at center,blue,black)";
                    elem.onclick = self.editMouseClick;
                    elem.style.cursor = "pointer";
                }
                elem.style.left = x + "px";
                elem.style.top = y + "px";
                elem.style.width = w + "px";
                elem.style.height = h + "px";
                st.lyRects[i].elemId = elem.id;
                kvd.lyRect = st.lyRects[i];
                kvd.layout = this;
                kvd.layoutInx = i;
                kvd.model = this.model;
                kvd.fhid = relem.id;
                kvd.felem = relem;
                elem.kvd = kvd;
                relem.appendChild(elem);
                continue;
            }

            if (self.fatherMd.comps[cname]) {
                var compObj = self.fatherMd.comps[cname];
                compObj.create(relem.id, x - shrinkX, y, w, h);
                st.lyRects[i].elemId = compObj.stas.elemId;
                if (compObj.opts.shrinkX_f) {
                    st.lyRects[i].x = x - shrinkX;
                    shrinkX += compObj.stas.shrinkX;
                }
            }
            if (self.fatherMd.models[cname]) {
                var modelObj = self.fatherMd.models[cname];
                modelObj.create(relem.id, x, y, w, h);
            }
        }
    }
}

