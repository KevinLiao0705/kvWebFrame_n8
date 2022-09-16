/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Font Test emoje ☀ ☕ 體 SansSerif,monospaced, MS Gothic dilogInput, magical mystery..., meiryo ui, 
/* global KvLib, gr, Kext, sys */
//fontFamily
//sans-serif ( 無襯線體 )、serif ( 襯線體 )、monospace ( 等寬體 )、cursive ( 手寫體 ) 和 fantasy ( 幻想體 )
//✉✂✔❌➕➖❓❗➗➡⬅⬆⬇⤴⤵⬛⬜🀄🅰🅱🆎🆗🆖🆕🆔🎧🎵🏠👆👇👈👉👍👨👩📎📈📂📁📞📖📡📢📤📥
//📨📷📶📱🔃🔊🔋🔌🔍🔎🔏🔒🔓🔔🔗🔠🔤🔢🔧🔨🔴🔲🕒
//📊 ⏰ ⏳ ⏳ 📡 ⏪ ⏩ ⏩ ⏫ ⏬ ➡ ➡ ⬆ ⬇ ↕ ↔ ▶
//❎✅💾⚙☑◻🔳🌏
class Component {
    static init() {
        var bobj = gr.compBaseOpts = {};
        if ("base") {
            bobj.propertyWidth = 200;
            bobj.propertyHeight = 200;
            bobj.baseColor = gr.baseColor;
            bobj.margin = 0;
            bobj.lm = null;
            bobj.tm = null;
            bobj.rm = null;
            bobj.bm = null;
            bobj.padding = 0;
            bobj.lpd = null;
            bobj.rpd = null;
            bobj.tpd = null;
            bobj.bpd = null;
            bobj.iw = null;
            bobj.ih = null;
            bobj.whr = 0;
            bobj.wAlign = "center";
            bobj.hAlign = "center";
            bobj.boxShadow = "";
            bobj.borderWidth = 0;
            bobj.borderColor = "#000";
            bobj.fontFamily = "monospace";
            bobj.hint = "";
            bobj.whiteSpace = "nowrap";
            bobj.fontSize = "0.6rh";
            bobj.maxByte = 0;
            bobj.fontWeight = "normal";//normal,bold,italic
            bobj.fontStyle = "normal";//normal,italic,oblique
            bobj.innerText = "";
            bobj.innerTextColor = "#000";
            bobj.textAlign = "center";
            bobj.preTextAlign = "left";
            bobj.preTextLpd = 4;
            bobj.preTextBackgroundColor = "#ccd";

            bobj.onMouseOn = null;
            bobj.onMousePress = null;
            bobj.insideShadowWidth = 0;
            bobj.insideShadowColor = "#000";
            bobj.insideShadowOffx = 0;
            bobj.insideShadowOffy = 0;
            bobj.outsideShadowColor = "#000";
            bobj.outsideShadowWidth = 0;
            bobj.outsideShadowOffx = 10;
            bobj.outsideShadowOffy = 10;
            bobj.background = null;
            bobj.backgroundInx = null;
            bobj.backgroundColors = ["#f00", "#0f0", "#00f"];
            bobj.backgroundImageUrls = [];
            bobj.backgroundRepeat = "no-repeat"; //repeat/repeat-x,repeat-y/no-repeat;
            bobj.backgroundImagePosition = "center"; //extend,center,fit
            bobj.inputRegs = [];
            //bobj.afterTextBackgroundColor="#000";
        }
        //==================================================
        var bobj = gr.compOpts["urlReader"] = {};
        var sobj = bobj["subOpts"] = {};
        if ("urlReader") {
            bobj.propertyWidth = 200;
            bobj.propertyHeight = 200;
        }
        //==============
        var bobj = gr.compOpts["video"] = {};
        var sobj = bobj["subOpts"] = {};
        if ("video") {
            bobj.propertyWidth = 200;
            bobj.propertyHeight = 200;
            bobj.autoPlay_f = 1;
            bobj.loop_f = 1;
            bobj.controls_f = 1;
        }
        //==============
        //==================================================
        var bobj = gr.compOpts["editor"] = {};
        var sobj = bobj["subOpts"] = {};
        if ("editor") {
            bobj.propertyWidth = 0;
            bobj.propertyHeight = 0;
            bobj.baseColor = "#333";
        }
        //==================================================



        var bobj = gr.compOpts["plate"] = {};
        var sobj = bobj["subOpts"] = {};
        if ("plate") {
            bobj.propertyWidth = 200;
            bobj.propertyHeight = 200;
        }
        //==============
        var obj = sobj["mask"] = {};
        if ("plate~mask") {
            obj.iw = 0;
            obj.ih = 0;
            obj.whr = 0;
            obj.innerText = "";
            obj.baseColor = "rgba(0,0,0,0.3)";
        }
        //==============
        var obj = sobj["none"] = {};
        if ("plate~none") {
            obj.innerText = "";
            obj.baseColor = "rgba(0,0,0,0)";
        }
        //==============
        var obj = sobj["popMenu"] = {};
        if ("plate~popMenu") {
            obj.innerText = "";
            obj.baseColor = "#ccc";
            obj.borderColor = "#fff #000 #000 #fff";
            obj.borderWidth = 1;
            obj.outsideShadowWidth = 10;
            obj.outsideShadowOffx = 10;
            obj.outsideShadowOffy = 10;
            obj.outsideShadowColor = "#000";
        }
        //==================================================
        var bobj = gr.compOpts["button"] = {};
        var sobj = bobj["subOpts"] = {};
        if ("button") {
            bobj.onMouseOn = "mouseOnType0";
            bobj.onMousePress = "mousePressType0";
            bobj.cursor = "pointer";
            bobj.margin = 0;
            bobj.borderWidth = 0;
        }
        //==============
        var obj = sobj["sys"] = {};
        if ("button~sys") {
            obj.baseColor = "#ccc";
            obj.disableTextColor = "#aaa";
            obj.borderWidth = 1;
            obj.insideShadowWidth = "0.2rh";
            obj.textShadow = "1px 1px 1px #fff";
            obj.fontWeight = "bold";
        }

        var obj = sobj["simple"] = {};
        if ("button~simple") {
            obj.margin = 2;
            obj.baseColor = "#ccc";
            obj.disableTextColor = "#aaa";
            obj.borderWidth = 1;
            obj.insideShadowWidth = "0.1rh";
            //obj.textShadow = "1px 1px 1px #fff";
        }

        //==============
        var obj = sobj["light"] = {};
        if ("button~light") {
            obj.altColors = ["#f55", "#400", "#4f4", "#030", "#88f", "#005"];
            obj.altColorInx = 0;
            var altColor = obj.altColors[obj.altColorInx];
            obj.onMouseOn = "mouseOnType0";
            obj.onMousePress = "mousePressType0";
            obj.margin = 2;
            obj.baseColor = "#000";
            obj.disableTextColor = "#aaa";
            obj.borderWidth = 2;
            obj.borderColor = altColor;
            obj.innerTextColor = altColor;
            obj.insideShadowWidth = "0.2rh";
            obj.insideShadowColor = altColor;
            obj.outsideShadowWidth = 1;
            obj.outsideShadowOffx = 0;
            obj.outsideShadowOffy = 0;
            obj.outsideShadowColor = altColor;
        }
        //==============
        var obj = sobj["menu"] = {};
        if ("button~menu") {
            obj.onMouseOn = "mouseOnType0";
            obj.onMousePress = "mousePressType0";
            obj.margin = 0;
            obj.iw = 0;
            obj.ih = 0;
            obj.whr = 0;
            obj.shrinkX_f = 1;
            obj.lpd = 0;
            obj.rpd = 0;
            obj.textAlign = "center";
            obj.fontFamily = "sans-serif";
            obj.baseColor = "#222";
            obj.mouseOnColor = "#666";
            obj.mouseOnTextColor = "#ddd";
            obj.innerTextColor = "#aaa";
            obj.insideShadowWidth = 0;
            obj.outsideShadowWidth = 0;
            obj.fontSize = "0.6rh";
            obj.textShadow = "2px 2px 2px #000";
        }

        //==============
        var obj = sobj["menuButton"] = {};
        if ("button~menuButton") {
            obj.onMouseOn = "mouseOnType0";
            obj.onMousePress = "mousePressType0";
            obj.iw = 0;
            obj.ih = 0;
            obj.whr = 0;
            obj.shrinkX_f = 1;
            obj.lpd = 2;
            obj.rpd = 2;
            obj.textAlign = "center";
            obj.fontFamily = "sans-serif";


            obj.margin = 1;
            obj.baseColor = "#ccc";
            obj.disableTextColor = "#aaa";
            obj.borderWidth = 1;
            obj.insideShadowWidth = "0.2rh";
            obj.textShadow = "1px 1px 1px #fff";


            //obj.baseColor = "#222";
            //obj.mouseOnColor = "#666";
            //obj.mouseOnTextColor = "#ddd";
            //obj.innerTextColor = "#888";
            //obj.insideShadowWidth = 0;
            //obj.outsideShadowWidth = 0;
            //obj.fontSize = "0.7rh";
        }


        //==============
        var obj = sobj["item"] = {};
        if ("button~item") {
            obj.onMouseOn = "mouseOnType0";
            obj.onMousePress = "mousePressType0";
            obj.margin = 0;
            obj.iw = 0;
            obj.ih = 0;
            obj.whr = 0;
            obj.textAlign = "left";
            obj.lpd = 31;
            obj.fontFamily = "sans-serif";
            obj.baseColor = "#222";
            obj.disableTextColor = "#444";
            obj.mouseOnColor = "#666";
            obj.mouseOnTextColor = "#ddd";
            obj.innerTextColor = "#888";
            obj.insideShadowWidth = 0;
            obj.outsideShadowWidth = 0;
            obj.preText = "";
            obj.preTextColor = "#000";
            obj.preTextLpd = 10;
            obj.preTextRpd = 10;

        }
        //==================================================
        var bobj = gr.compOpts["label"] = {};
        var sobj = bobj["subOpts"] = {};
        if ("label") {
        }
        //==============
        var obj = sobj["sys"] = {};
        if ("label~sys") {
            obj.lpd = 4;
            obj.iw = 0;
            obj.ih = 0;
            obj.whr = 0;
            obj.baseColor = "#bbb";
            obj.borderColor = "#000";
            obj.borderWidth = 1;
            obj.textAlign = "left";
            obj.insideShadowWidth = "0.2rh";
            obj.insideShadowColor = "#ccc";
            obj.textShadow = "1px 1px 1px #fff";
            obj.fontWeight = "bold";
        }
        //==============
        var obj = sobj["message"] = {};
        if ("label~message") {
            obj.margin = 2;
            obj.iw = 0;
            obj.ih = 0;
            obj.whr = 0;
            obj.baseColor = "#ccc";
            //obj.borderColor = "#770";
            obj.borderColor = "#000 #fff #fff #000";

            obj.borderWidth = 1;
            obj.textAlign = "left";
            obj.lpd = 4;
        }
        //==============
        var obj = sobj["meter"] = {};
        if ("label~meter") {
            obj.altColors = ["#f55", "#4f4", "#88f"];
            obj.altColorInx = 0;
            var altColor = obj.altColors[obj.altColorInx];

            obj.fontFamily = "digital_3";
            obj.innerText = "8964";
            obj.fontSize = "0.9rh";

            obj.margin = 2;
            obj.baseColor = "#000";
            obj.disableTextColor = "#aaa";
            obj.borderWidth = 2;
            obj.borderColor = altColor;
            obj.innerTextColor = altColor;
            obj.insideShadowWidth = "0.2rh";
            obj.insideShadowColor = altColor;
            obj.outsideShadowWidth = 1;
            obj.outsideShadowOffx = 0;
            obj.outsideShadowOffy = 0;
            obj.outsideShadowColor = altColor;
        }
        //==============
        var obj = sobj["sepLineV"] = {};
        if ("label~sepLineV") {
            obj.margin = 0;
            obj.tm = 2;
            obj.bm = 2;
            obj.lm = 10;
            obj.rm = 10;
            obj.iw = 1;
            obj.ih = 0;
            obj.whr = 0;
            obj.baseColor = "#777";
            obj.borderColor = "#777";
            obj.borderWidth = 0;
            obj.innerText = "";
            obj.shrinkX_f = 1;
            obj.wAlign = "left";
        }
        //==============
        var obj = sobj["sepLineH"] = {};
        if ("label~sepLineH") {
            obj.margin = 0;
            obj.tm = 0;
            obj.bm = 0;
            obj.lm = 4;
            obj.rm = 4;
            obj.iw = 0;
            obj.ih = 1;
            obj.whr = 0;
            obj.tpd = 0;
            obj.bpd = 0;
            obj.innerText = "";
            obj.baseColor = "#ccc";
            obj.borderColor = "#000 #fff #fff #000";
            obj.borderWidth = 1;
        }
        //==================================================
        var bobj = gr.compOpts["input"] = {};
        var sobj = bobj["subOpts"] = {};
        if ("input") {
            bobj.insideShadowWidth = "0.2rh";
            bobj.insideShadowColor = "#000";
            bobj.margin = 0;
            bobj.borderWidth = 0;


        }
        //==============
        var obj = sobj["text"] = {};
        if ("input~text") {
            obj.textAlign = "left";
            obj.baseColor = "#eef";
            obj.readOnly_f = 0;
            //obj.preTextWidth = 100;
            obj.minLength = 0;
            obj.maxLength = 32;
            obj.preText = "preText";
            obj.innerText = "";
            obj.editValue = "editValue";
            obj.preTextColor = "#000";
            obj.preTextLpd = 4;
            obj.preTextRpd = 10;
            //obj.afterTextWidth = 200;
            obj.afterText = "";
            obj.afterTextColor = "#000";
            obj.afterTextLpd = 10;
            obj.afterTextRpd = 10;
            obj.heightSubK = 6;
        }
        //==============
        var obj = sobj["password"] = {};
        if ("input~password") {
            obj.textAlign = "left";
            obj.baseColor = "#eef";
            obj.readOnly_f = 0;
            //obj.preTextWidth = 100;
            obj.minLength = 0;
            obj.maxLength = 32;
            obj.preText = "preText";
            obj.innerText = "";
            obj.editValue = "editValue";
            obj.preTextColor = "#000";
            obj.preTextLpd = 4;
            obj.preTextRpd = 10;
            //obj.afterTextWidth = 200;
            obj.afterText = "";
            obj.afterTextColor = "#000";
            obj.afterTextLpd = 10;
            obj.afterTextRpd = 10;
            obj.heightSubK = 6;
        }
        //==============
        var obj = sobj["date"] = {};
        if ("input~date") {
            obj.textAlign = "left";
            obj.baseColor = "#eef";
            obj.readOnly_f = 0;
            //obj.preTextWidth = 100;
            obj.min = "2018-01-01";
            obj.max = "2018-12-31";
            obj.preText = "preText";
            obj.innerText = "";
            obj.editValue = "2018-07-05";
            obj.preTextColor = "#000";
            obj.preTextLpd = 4;
            obj.preTextRpd = 10;
            //obj.afterTextWidth = 200;
            obj.afterText = "";
            obj.afterTextColor = "#000";
            obj.afterTextLpd = 10;
            obj.afterTextRpd = 10;
        }
        //==============
        var obj = sobj["month"] = {};
        if ("input~month") {
            obj.textAlign = "left";
            obj.baseColor = "#eef";
            obj.readOnly_f = 0;
            //obj.preTextWidth = 100;
            obj.min = "2018-01";
            obj.max = "2018-12";
            obj.preText = "preText";
            obj.innerText = "";
            obj.editValue = "2018-07";
            obj.preTextColor = "#000";
            obj.preTextLpd = 4;
            obj.preTextRpd = 10;
            //obj.afterTextWidth = 200;
            obj.afterText = "afterText";
            obj.afterTextColor = "#000";
            obj.afterTextLpd = 10;
            obj.afterTextRpd = 10;
        }
        //==============
        var obj = sobj["datetime-local"] = {};
        if ("input~datetime-local") {
            obj.textAlign = "left";
            obj.baseColor = "#eef";
            obj.readOnly_f = 0;
            //obj.preTextWidth = 100;
            obj.min = "2018-06-07T00:00";
            obj.max = "2018-06-14T00:00";
            obj.preText = "preText";
            obj.innerText = "";
            obj.editValue = "2018-06-12T19:30";
            obj.preTextColor = "#000";
            obj.preTextLpd = 4;
            obj.preTextRpd = 10;
            //obj.afterTextWidth = 200;
            //obj.afterText = "afterText";
            //obj.afterTextColor = "#000";
            //obj.afterTextLpd = 10;
            //obj.afterTextRpd = 10;
        }
        //==============
        var obj = sobj["email"] = {};
        if ("input~email") {
            obj.textAlign = "left";
            obj.baseColor = "#eef";
            obj.readOnly_f = 0;
            //obj.preTextWidth = 100;
            obj.preText = "preText";
            obj.innerText = "";
            obj.editValue = "kevin.josn@gmail.com";
            //obj.pattern=".+@\.com";
            obj.preTextColor = "#000";
            obj.preTextLpd = 4;
            obj.preTextRpd = 10;
            //obj.afterTextWidth = 200;
            //obj.afterText = "afterText";
            //obj.afterTextColor = "#000";
            //obj.afterTextLpd = 10;
            //obj.afterTextRpd = 10;
        }
        //==============
        var obj = sobj["tel"] = {};
        if ("input~tel") {
            obj.textAlign = "left";
            obj.baseColor = "#eef";
            obj.readOnly_f = 0;
            //obj.preTextWidth = 100;
            obj.preText = "preText";
            obj.innerText = "";
            obj.editValue = "0911-571153";
            obj.pattern = "[0-9]{4}-[0-9]{6}";
            obj.preTextColor = "#000";
            obj.preTextLpd = 4;
            obj.preTextRpd = 10;
            //obj.afterTextWidth = 200;
            //obj.afterText = "afterText";
            //obj.afterTextColor = "#000";
            //obj.afterTextLpd = 10;
            //obj.afterTextRpd = 10;
        }
        //==============
        var obj = sobj["radio"] = {};
        if ("input~radio") {
            obj.textAlign = "left";
            obj.baseColor = "#eef";
            obj.disableTextColor = "#444";
            obj.groupName = "foo";
            obj.editValue = 0;
            obj.innerText = "";
            obj.preText = "No.";
            //obj.preTextWidth =24;
            obj.preTextLpd = 4;
            obj.preTextRpd = 4;
            obj.itemWidth = 30;
            obj.itemHeight = 20;


            //obj.afterText = "afterText";
            //obj.afterTextPos = "follow";
            //obj.afterTextColor = "#000";
            //obj.afterTextLpd = 10;
            //obj.afterTextRpd = 10;
        }
        //==============
        var obj = sobj["checkbox"] = {};
        if ("input~checkbox") {
            obj.textAlign = "left";
            obj.lpd = 0;
            obj.baseColor = "#eef";
            obj.disableTextColor = "#444";
            obj.innerText = "";
            obj.editValue = 0;
            obj.preText = "No.";
            //obj.preTextWidth = 24;
            obj.preTextLpd = 4;
            obj.preTextRpd = 4;
            obj.itemWidth = 30;
            obj.itemHeight = 20;


            //obj.afterText = "afterText";
            obj.afterTextPos = "follow";
            //obj.afterTextColor = "#000";
            obj.afterTextLpd = 10;
            //obj.afterTextRpd = 10;
        }
        //==============
        var obj = sobj["color"] = {};
        if ("input~color") {
            obj.textAlign = "left";
            obj.lpd = 0;
            //obj.fontFamily = "sans-serif";
            obj.innerText = "";
            obj.baseColor = "#eef";
            obj.preText = "preText";
            obj.preTextColor = "#000";
            obj.preTextBorderWidth=1;
            obj.preTextLpd = 4;
            obj.preTextRpd = 10;
            obj.itemWidth = 0;
            obj.itemHeight = "0.8rh";

            obj.afterText = "afterText";
            obj.afterTextPos = "follow";
            obj.afterTextColor = "#000";
            obj.afterTextLpd = 10;
            obj.afterTextRpd = 10;

        }
        //==============
        var obj = sobj["number"] = {};
        if ("input~number") {
            obj.textAlign = "left";
            obj.lpd = 0;
            //obj.fontFamily = "sans-serif";
            obj.editValue = "0";
            obj.innerText = "";
            obj.baseColor = "#eef";
            obj.preText = "preText";
            obj.preTextColor = "#000";
            obj.preTextLpd = 4;
            obj.preTextRpd = 10;
            obj.itemWidth = 0;
            obj.itemHeight = "0.8rh";
            obj.min = 0;
            //obj.max = 100;
            obj.afterText = "afterText";
            obj.afterTextPos = "fallow";
            obj.afterTextColor = "#000";
            obj.afterTextLpd = 15;
            obj.afterTextRpd = 10;
        }
        //==============
        var obj = sobj["time"] = {};
        if ("input~time") {
            obj.textAlign = "left";
            obj.baseColor = "#eef";
            obj.readOnly_f = 0;
            //obj.preTextWidth = 100;
            obj.preText = "preText";
            obj.innerText = "";
            obj.editValue = "15:00";
            obj.min = "09:00";
            obj.max = "17:00";
            obj.preTextColor = "#000";
            obj.preTextLpd = 4;
            obj.preTextRpd = 10;
            //obj.afterTextWidth = 200;
            obj.afterText = "afterText";
            obj.afterTextColor = "#000";
            obj.afterTextLpd = 10;
            obj.afterTextRpd = 10;
        }
        //==============
        var obj = sobj["range"] = {};
        if ("input~range") {
            obj.textAlign = "left";
            obj.lpd = 0;
            //obj.fontFamily = "sans-serif";
            obj.editValue = "0";
            obj.innerText = "";
            obj.baseColor = "#eef";
            obj.preText = "preText";
            obj.preTextColor = "#000";
            obj.preTextLpd = 4;
            obj.preTextRpd = 10;
            obj.itemWidth = 0;
            obj.itemHeight = "0.8rh";
            obj.min = 0;
            obj.max = 100;
            obj.afterText = "afterText";
            obj.afterTextColor = "#000";
            obj.afterTextLpd = 10;
            obj.afterTextRpd = 10;
            obj.mulRate = null;
        }

        //==================================================
        var bobj = gr.compOpts["select"] = {};
        var sobj = bobj["subOpts"] = {};
        if ("select") {
            bobj.heightSubK = 4;
            bobj.insideShadowWidth = "0.2rh";
            bobj.insideShadowColor = "#000";
            bobj.margin = 0;
        }
        var obj = sobj["sys"] = {};
        if ("select~sys") {
            obj.textAlign = "left";
            obj.borderWidth = 1;
            obj.baseColor = "#eef";
            obj.readOnly_f = 0;
            //obj.preTextWidth = 100;
            obj.minLength = 0;
            obj.maxLength = 32;
            obj.preText = "preText";
            obj.innerText = "";
            obj.editValue = "";
            obj.inputHint = "Input Your Select.";
            obj.preTextColor = "#000";
            obj.preTextLpd = 4;
            obj.preTextRpd = 10;
            //obj.afterTextWidth = 200;
            //obj.afterText = "afterText";
            //obj.afterTextColor = "#000";
            //obj.afterTextLpd = 10;
            //obj.afterTextRpd = 10;
            obj.selectInx = -1;
            obj.options = [];
        }
        //==================================================
        var bobj = gr.compOpts["chart"] = {};
        bobj.baseColor = "#222";
        var sobj = bobj["subOpts"] = {};
        if ("chart") {
            obj.hint = "kvd:disable";
        }
        var obj = sobj["bar"] = {};
        if ("chart~bar") {
            obj.title = "Title";
            obj.yAxe_f = 0;
            obj.datasetName = "datasetName";
            obj.chartDatas = [70, 89];
            obj.chartLabels = ["label1", "label2"];
            obj.chartType = "bar";
            obj.chartMin = 0;
            obj.chartStep = 20;
            obj.chartMax = 100;
            obj.chartAxesFontSize = 10;
            obj.chartLineColor = "#000";
            obj.chartBackgroundColors = ["#0f0", "#f00"];
            obj.chartFilter = "if(inData>50) outData='#0f0';else outData='#f00';";
        }
        //==============
        var obj = sobj["line"] = {};
        if ("chart~line") {
            obj.title = "Title";
            obj.yAxe_f = 0;
            obj.datasetName = "datasetName";
            obj.chartDatas = [10, 32, 5, 65, 44, 70, 89, 24, 100, 23];
            obj.chartLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
            obj.chartType = "line";
            obj.chartMin = 0;
            obj.chartMax = 100;
            obj.chartStep = 20;
            obj.chartAxesFontSize = 10;
            obj.chartLineColor = "#fff";
            obj.chartBackgroundColors = ["#0f0", "#f00"];
            obj.chartFilter = "if(inData>50) outData='#0f0';else outData='#f00';";
            obj.chartFillColor = '#ccc';
            obj.chartFill_f = 1;
        }
        //==============
        var obj = sobj["doughnut"] = {};
        if ("chart~doughnut") {
            obj.title = "Title";
            obj.yAxe_f = 0;
            obj.datasetName = "datasetName";
            obj.chartDatas = [10, 32, 5, 65, 44];
            obj.chartLabels = ["1", "2", "3", "4", "5"];
            obj.chartMin = 0;
            obj.chartMax = 100;
            obj.chartStep = 20;
            obj.chartAxesFontSize = 10;
            obj.chartType = "polarArea"; //doughnut,pie,polarArea
            obj.chartLineColor = "#fff";
            obj.chartBackgroundColors = ["#f00", "#0f0", '#00f', '#ff0', '#0ff'];
        }
        //==============
    }

    constructor(_name, _type, _opts, _paras) {
        this.name = _name;
        this.type = _type;
        this.opts = this.initOpts();
        this.paras = this.initParas();
        this.kid = KvLib.genKid();
        this.stas = {};
        this.elems = {};
        this.objs = {};
        this.watch = {};
        this.inputRegs = [];
        //=============================
        this.layout = null;
        this.fatherMd = null;
        //==============================
        KvLib.deepCoverObject(this.opts, _opts);
        KvLib.coverObject(this.paras, _paras);
        gr.kidMap.set(this.kid, this);
    }
    initOpts() {
        var self = this;
        var obj = {};
        var strA = this.type.split("~");
        this.baseType = strA[0];
        this.subType = strA[1];
        this.s0Type = strA[2];
        this.s1Type = strA[3];
        this.s2Type = strA[4];
        return Component.getOpts(this.baseType, this.subType);
    }
    static getOpts(baseType, subType) {
        var opts = {};
        KvLib.deepCoverObject(opts, gr.compBaseOpts);
        var bopts = gr.compOpts[baseType];
        if (bopts) {
            KvLib.deepCoverObject(opts, bopts);
            var sopts = bopts["subOpts"][subType];
            if (sopts)
                KvLib.deepCoverObject(opts, sopts);
        }
        return opts;

    }

    initParas() {
        var paras = {};
        return paras;
    }
    build() {
    }

    chkWatch() {
        var self = this;
        sys.inputWatch(self);
        sys.checkWatch(self);
        if (self.watch["innerText"]) {
            var elem = self.elems["base"];
            elem.innerHTML = self.opts.innerText;
            delete self.watch["innerText"];
        }
        if (self.watch["innerTextColor"]) {
            var elem = self.elems["base"];
            elem.style.color = self.opts.innerTextColor;
            delete self.watch["innerTextColor"];
        }
        return;
    }

    clickFunc(event) {
        var elem = event.target;
        if (!elem.kvd)
            return;
        var self = elem.kvd.kvObj;


        if (self.opts.clickFunc) {
            var obj = {};
            obj.act = "click";
            obj.kvObj = self;
            self.opts.clickFunc(obj);
            return;
        }




    }
    mouseOver(event) {
        var elem = event.target;
        if (!elem.kvd)
            return;
        var self = elem.kvd.kvObj;
        var baseElem = self.elems["base"];
        if (!baseElem)
            return;
        var st = self.stas;
        var op = self.opts;
        baseElem.style.borderColor = "#fff";
        if (op.mouseOnColor)
            baseElem.style.backgroundColor = op.mouseOnColor;
        if (op.mouseOnTextColor)
            baseElem.style.color = op.mouseOnTextColor;

        if (op.hint) {
            if (op.hint !== "kvd:disable") {
                sys.setKvHint(self, op.hint);
            }
        }


    }

    mouseOut(event) {
        var elem = event.target;
        if (!elem.kvd)
            return;
        var self = elem.kvd.kvObj;
        var baseElem = self.elems["base"];
        if (!baseElem)
            return;
        var st = self.stas;
        var op = self.opts;
        baseElem.style.borderColor = self.getBorderColor();
        self.setBackground(baseElem);
        baseElem.style.boxShadow = self.getShadowStr();
        baseElem.style.color = self.getInnerTextColor();
        if (op.hint) {
            if (op.hint !== "kvd:disable") {
                sys.delKvHint();
            }
        }
        if (self.opts.mouseOutFunc) {
            var obj = {};
            obj.act = "mouseOut";
            obj.kvObj = self;
            self.opts.mouseOutFunc(obj);
            return;
        }




    }
    getBorderColor() {
        var self = this;
        var op = self.opts;
        if (op.altColors)
            return op.altColors[op.altColorInx];
        return op.borderColor;
    }

    getInnerTextColor() {
        var self = this;
        var op = self.opts;
        if (op.altColors)
            return op.altColors[op.altColorInx];
        return op.innerTextColor;
    }

    setBackground(elem) {
        var self = this;
        var op = self.opts;
        if (op.backgroundInx === undefined || op.backgroundInx === null) {
            elem.style.backgroundColor = op.baseColor;
            if (op.background) {
                elem.style.background = op.background;
            }
            return;
        } else {
            if (op.backgroundImageUrls.length) {
                elem.style.backgroundColor = op.baseColor;
                if (op.background) {
                    elem.style.background = op.background;
                }
                elem.style.backgroundRepeat = op.backgroundRepeat;
                elem.style.backgroundImage = "url('" + op.backgroundImageUrls[op.backgroundInx] + "')";
                switch (op.backgroundImagePosition) {
                    case "fit":
                        elem.style.backgroundSize = "contain";
                        elem.style.backgroundPosition = "center";
                        break;
                    case "center":
                        elem.style.backgroundPosition = "center";
                        break;
                    case "extend":
                    default:
                        elem.style.backgroundSize = this.stas.cw + "px " + this.stas.ch + "px";
                        break;
                }
                return;
            }
            if (op.backgroundColors.length) {
                elem.style.backgroundColor = op.backgroundColors[op.backgroundInx];
                return;
            }
        }
    }

    setPreTextBackground(elem) {
        var self = this;
        var op = self.opts;
        if (op.preTextBackgroundColor) {
            elem.style.backgroundColor = op.preTextBackgroundColor;
        }
        if (op.preTextBackground) {
            elem.style.background = op.preTextBackground;
        }
        if (op.preTextBackgroundImageUrl) {
            elem.style.backgroundRepeat = op.backgroundRepeat;
            elem.style.backgroundImage = "url('" + op.preTextBackgroundImageUrl + "')";
            switch (op.preTextBackgroundImagePosition) {
                case "fit":
                    elem.style.backgroundSize = "contain";
                    elem.style.backgroundPosition = "center";
                    break;
                case "center":
                    elem.style.backgroundPosition = "center";
                    break;
                case "extend":
                default:
                    elem.style.backgroundSize = this.stas.preTextWidth + "px " + this.stas.ch + "px";
                    break;
            }
            return;
        }
    }

    mouseDown(event) {
        var elem = event.target;
        if (!elem.kvd)
            return;
        var self = elem.kvd.kvObj;
        var baseElem = self.elems["base"];
        if (!baseElem)
            return;
        var st = self.stas;
        var op = self.opts;
        baseElem.style.fontSize = (self.stas.fontSize * 0.9) + "px";
        baseElem.style.boxShadow = "";//self.getOutsideShadowStr();

        if (self.opts.mouseDownFunc) {
            var obj = {};
            obj.act = "mouseDown";
            obj.kvObj = self;
            self.opts.mouseDownFunc(obj);
            return;
        }



    }
    mouseUp(event) {
        var elem = event.target;
        if (!elem.kvd)
            return;
        var self = elem.kvd.kvObj;
        var baseElem = self.elems["base"];
        if (!baseElem)
            return;
        var st = self.stas;
        var op = self.opts;
        baseElem.style.boxShadow = self.getShadowStr();
        baseElem.style.fontSize = (self.stas.fontSize) + "px";

        if (self.opts.mouseUpFunc) {
            var obj = {};
            obj.act = "mouseDown";
            obj.kvObj = self;
            self.opts.mouseUpFunc(obj);
            return;
        }


    }
    getOutsideShadowStr() {
        var self = this;
        var st = self.stas;
        var op = self.opts;
        var color = op.outsideShadowColor;
        if (op.altColors)
            color = op.altColors[op.altColorInx];


        var str = "";
        if (st.outsideShadowWidth) {
            str += st.outsideShadowOffx + "px ";
            str += st.outsideShadowOffy + "px ";
            str += st.outsideShadowWidth + "px ";
            str += color;

        }
        return str;
    }
    getInsideShadowStr() {
        var self = this;
        var st = self.stas;
        var op = self.opts;

        var color = op.insideShadowColor;
        if (op.altColors)
            color = op.altColors[op.altColorInx];


        var str = "";
        if (st.insideShadowWidth) {
            str += st.insideShadowOffx + "px ";
            str += st.insideShadowOffy + "px ";
            str += st.insideShadowWidth + "px ";
            str += color;
            str += " inset";

        }
        return str;
    }
    getShadowStr() {
        var str0 = this.getInsideShadowStr();
        var str1 = this.getOutsideShadowStr();
        if (str0.length !== 0 && str1.length !== 0)
            return str0 + "," + str1;
        else
            return str0 + str1;
    }
    clear() {
        var self = this;
        if (!self.stas.fhid)
            return;
        var child = document.getElementById(self.kid);
        var parent = document.getElementById(self.stas.fhid);
        if (child && parent)
            parent.removeChild(child);
        var name = self.name;
        var rect = {};
        rect.fhid = self.stas.fhid;
        rect.x = self.stas.fx;
        rect.y = self.stas.fy;
        rect.w = self.stas.fw;
        rect.h = self.stas.fh;
        if (this.fatherMd.comps[this.cname])
            delete this.fatherMd.comps[this.cname];
        if (this.fatherMd.compRefs[this.cname])
            delete this.fatherMd.compRefs[name];
        return rect;
    }

    reCreate() {
        var self = this;
        var name = self.name;
        var type = self.type;
        var opts = self.opts;
        var paras = self.paras;
        var rect = self.clear();
        var fatherMd = self.fatherMd;
        var cname = self.cname;
        if (!rect)
            return;
        self.clear();
        var comp = new Component(name, type, opts, paras);
        if (fatherMd) {
            fatherMd.comps[cname] = comp;
            if (name)
                fatherMd.compRefs[name] = comp;
            comp.fatherMd = fatherMd;
        }
        comp.cname = cname;
        comp.build();
        comp.create(rect.fhid, rect.x, rect.y, rect.w, rect.h);
    }

    changeFunc(event) {
        var elem = event.target;
        if (!elem.kvd)
            return;
        var self = elem.kvd.kvObj;

        if (self.type === "input~range") {
            var inputElem = self.elems["input"];


            var afterTextElem = self.elems["afterText"];
            if (afterTextElem) {
                if (self.opts.mulRate) {
                    var num = KvLib.toNumber(inputElem.value);
                    if (num === null)
                        num = 0;
                    afterTextElem.innerHTML = (num * self.opts.mulRate).toFixed(self.opts.fixed);
                } else
                    afterTextElem.innerHTML = inputElem.value;
            }
        }
        if (!self.opts.actionFunc)
            return;
        var reto = {};
        reto.act = "valueChange";
        reto.kvObj=self;
        self.opts.actionFunc(reto);
        return;
        
        while (1) {
            if (self.baseType === "input") {
                if (self.type === "input~checkbox") {
                    if (inputElem.checked)
                        reto.value = 1;
                    else
                        reto.value = 0;
                    break
                }
                reto.value = inputElem.value;
            }
            if (self.baseType === "select") {
                var selectElem = self.elems["select"];
                reto.value = selectElem.selectedIndex;
            }
            break;
        }


        return;

        var reto = {};
        reto.preValue = self.opts.editValue;

        if (self.baseType === "input") {
            var inputElem = self.elems["input"];
            if (self.subType === "checkbox" || self.radio) {
                if (inputElem.checked)
                    self.opts.editValue = 1;
                else
                    self.opts.editValue = 0;
            } else if (self.subType === "number") {
                self.opts.editValue = KvLib.toInt(inputElem.value, "error");
            } else if (self.subType === "ratio") {
                self.opts.editValue = KvLib.toNumber(inputElem.value, "error");
            } else if (self.subType === "range") {
                self.opts.editValue = KvLib.toInt(inputElem.value, "error");
            } else {
                self.opts.editValue = inputElem.value;
            }
        }


        if (self.baseType === "select") {
            var selectElem = self.elems["select"];
            self.opts.selectInx = selectElem.selectedIndex;
        }
        if (inputElem) {
            self.stas.editValue = self.opts.editValue;
            if (self.opts.actionFunc) {
                reto.act = "valueChange";
                reto.value = self.stas.editValue;
                if (self.type === "input~radio") {
                    reto.value = inputElem.checked;
                    var afterTextElem = self.elems["afterText"];
                    if (afterTextElem) {
                        reto.text = afterTextElem.innerHTML;
                        reto.groupName = inputElem.name;
                    }
                }
                if (self.type === "input~checkbox") {
                    var afterTextElem = self.elems["afterText"];
                    if (self.opts.enums) {
                        if (!reto.value)
                            afterTextElem.innerHTML = self.opts.enums[0];
                        else
                            afterTextElem.innerHTML = self.opts.enums[1];
                    }
                    if (afterTextElem) {
                        reto.text = afterTextElem.innerHTML;
                    }
                }
                reto.kvObj = self;
                self.opts.actionFunc(reto);
            }
            if (self.type === "input~range") {
                var afterTextElem = self.elems["afterText"];
                if (afterTextElem) {
                    if (self.opts.mulRate) {
                        var num = KvLib.toNumber(self.stas.editValue);
                        if (num === null)
                            num = 0;
                        afterTextElem.innerHTML = (num * self.opts.mulRate).toFixed(self.opts.fixed);
                    } else
                        afterTextElem.innerHTML = self.stas.editValue;
                }
            }

            if (self.type === "input~color") {
                var afterTextElem = self.elems["afterText"];
                if (afterTextElem) {
                    afterTextElem.innerHTML = self.stas.editValue;
                }
            }


        }
        var selectElem = self.elems["select"];
        if (selectElem) {
            if (self.opts.actionFunc) {
                var reto = {};
                reto.act = "selectChange";
                reto.value = selectElem.options[selectElem.selectedIndex].value;
                reto.index = KvLib.toInt(reto.value);
                reto.text = selectElem.options[selectElem.selectedIndex].text;
                reto.kvObj = self;
                self.opts.actionFunc(reto);
            }
        }


        return;





    }

    transData(x, y, w, h) {
        var self = this;
        var op = self.opts;
        var st = self.stas;
        //======================================
        //======================================
        var margin = KvLib.transUnit(op.margin, 0);
        st.lm = margin;
        st.tm = margin;
        st.rm = margin;
        st.bm = margin;
        if (op.tm !== null)
            st.tm = KvLib.transUnit(op.tm, 0);
        if (op.rm !== null)
            st.rm = KvLib.transUnit(op.rm, 0);
        if (op.bm !== null)
            st.bm = KvLib.transUnit(op.bm, 0);
        if (op.lm !== null)
            st.lm = KvLib.transUnit(op.lm, 0);
        //======================================
        var padding = KvLib.transUnit(op.padding, 0);
        st.lpd = padding;
        st.tpd = padding;
        st.rpd = padding;
        st.bpd = padding;
        if (op.tpd !== null)
            st.tpd = KvLib.transUnit(op.tpd, 0);
        if (op.rpd !== null)
            st.rpd = KvLib.transUnit(op.rpd, 0);
        if (op.bm !== null)
            st.bpd = KvLib.transUnit(op.bpd, 0);
        if (op.lpd !== null)
            st.lpd = KvLib.transUnit(op.lpd, 0);
        //======================================
        st.preTextLpd = KvLib.transUnit(op.preTextLpd, 0);
        st.preTextRpd = KvLib.transUnit(op.preTextRpd, 0);
        st.afterTextLpd = KvLib.transUnit(op.afterTextLpd, 0);
        st.afterTextRpd = KvLib.transUnit(op.afterTextRpd, 0);
        //======================================
        st.borderWidth = KvLib.transUnit(op.borderWidth);
        //======================================
        op.innerText = "" + op.innerText;
        st.innerText = KvLib.getKvText(op.innerText, "");
        //======================================
        if (op.whr) {
            var ww = (h * op.whr) | 0;
            var hh = (w / op.whr) | 0;
            if (ww > w)
                ww = w;
            if (hh > h)
                hh = h;
            x += ((w - ww) / 2) | 0;
            y += ((h - hh) / 2) | 0;
            w = ww;
            h = hh;
        }
        st.rx = x;
        st.ry = y;
        st.rw = w;
        st.rh = h;
        //==============================================
        st.iw = KvLib.transUnit(op.iw, null, st.rw, st.rh);
        st.ih = KvLib.transUnit(op.ih, null, st.rw, st.rh);
        if (st.iw===null)
            st.iw=st.rw;
        if (st.ih===null)
            st.ih=st.rh;
        var ww = st.rw;
        var hh = st.rh;
        if (st.iw!==null)
            ww = st.iw;
        if (st.ih!==null)
            hh = st.ih;
        ww = ww - st.borderWidth * 2 - (st.lm + st.rm);
        hh = hh - st.borderWidth * 2 - (st.tm + st.bm);

        st.insideShadowWidth = KvLib.transUnit(op.insideShadowWidth, 0, ww, hh);
        st.insideShadowOffx = KvLib.transUnit(op.insideShadowOffx, 0, ww, hh);
        st.insideShadowOffy = KvLib.transUnit(op.insideShadowOffy, 0, ww, hh);
        st.outsideShadowWidth = KvLib.transUnit(op.outsideShadowWidth, 0, ww, hh);
        st.outsideShadowOffx = KvLib.transUnit(op.outsideShadowOffx, 0, ww, hh);
        st.outsideShadowOffy = KvLib.transUnit(op.outsideShadowOffy, 0, ww, hh);
        st.preTextWidth = KvLib.transUnit(op.preTextWidth, 0, ww, hh);
        st.afterTextWidth = KvLib.transUnit(op.afterTextWidth, 0, ww, hh);
        //==============================================
        st.cw = st.rw - st.borderWidth * 2 - (st.lm + st.rm) - (st.lpd + st.rpd);
        st.ch = st.rh - st.borderWidth * 2 - (st.tm + st.bm) - (st.tpd + st.bpd);
        st.cx = st.rx + st.lm;
        st.cy = st.ry + st.tm;
        //==============================================
        if (st.iw !== 0) {
            if (op.wAlign === "center") {
                st.cx = st.cx + ((st.rw - st.iw) / 2) | 0;
                st.cw = st.iw - st.borderWidth * 2 - st.lpd - st.rpd;
            }
        }
        if (st.ih !== 0) {
            if (op.hAlign === "center") {
                st.cy = st.cy + ((st.rh - st.ih) / 2) | 0;
                st.ch = st.ih - st.borderWidth * 2 - st.tpd - st.bpd;
            }
        }

        if (op.fontSize === "fixWidth") {
            st.fontSize = KvLib.transUnit("0.9rh", 10, st.cw, st.ch);
            var testText = st.innerText;
            if (op.maxByte) {
                testText = 0;
                for (var i = 0; i < op.maxByte; i++) {
                    testText += "W";
                }
            }
            st.fontSizeObj = KvLib.measureText(testText, st.fontSize, op.fontWeight, op.fontFamily);
            if (st.fontSizeObj.w > st.cw) {
                st.fontSize = (st.fontSize * st.cw / st.fontSizeObj.w) | 0;
                st.fontSize--;
                st.fontSize = KvLib.minMax(st.fontSize, gr.minFontSize, gr.maxFontSize);
            }
        } else {
            st.fontSize = KvLib.transUnit(op.fontSize, 10, st.cw, st.ch);
            st.fontSize = KvLib.minMax(st.fontSize, gr.minFontSize, gr.maxFontSize);
            if (op.innerText.length > 20)
                st.innerText = KvLib.getKvText("" + op.innerText, "");
            st.fontSizeObj = KvLib.measureText(st.innerText, st.fontSize, op.fontWeight, op.fontFamily);
        }
        st.preTextFontSize = KvLib.transUnit(op.preTextFontSize, st.fontSize, st.cw, st.ch);
        st.preTextFontSize = KvLib.minMax(st.preTextFontSize, gr.minFontSize, gr.maxFontSize);
        st.preTextFontSizeObj = KvLib.measureText(op.preText, st.preTextFontSize, op.fontWeight, op.fontFamily);


        if (op.shrinkX_f) {
            st.cw = st.fontSizeObj.w;
            var ws = st.cw + st.borderWidth * 2 + st.lm + st.rm + st.lpd + st.rpd;
            if (st.iw) {
                ws = st.iw + st.borderWidth * 2 + st.lm + st.rm + st.lpd + st.rpd;
                st.cw = st.iw;
            }
            st.shrinkX = st.w - ws;
            st.rw = ws;
        }

        if (op.shrinkY_f) {
            var hs = st.fontSizeObjj.h + st.borderWidth * 2 + st.tm + st.bm + st.tpd + st.bpd;
            st.ch = st.fontSizeObj.h;
            st.shrinkY = st.h - hs;
            st.rh = hs;
        }

        if (op.preText || op.preTextWidth) {
            if (st.preTextWidth) {
            } else {
                var sizeObj = KvLib.measureText(op.preText, st.fontSize, op.fontWeight, op.fontFamily);
                st.preTextWidth = sizeObj.w + st.preTextLpd + st.preTextRpd;
            }
        }
        if (op.afterText) {
            if (st.afterTextWidth) {
            } else {
                var sizeObj = KvLib.measureText(op.afterText, st.fontSize, op.fontWeight, op.fontFamily);
                st.afterTextWidth = sizeObj.w + st.afterTextLpd + st.afterTextRpd;
            }
        }



    }

    create(fhid, x, y, w, h) {
        var self = this;
        var st = self.stas;
        var op = self.opts;
        st.fhid = fhid;
        st.fx = x;
        st.fy = y;
        st.fw = w;
        st.fh = h;


        //==============================
        var felem = document.getElementById(fhid);
        if (!felem)
            return;
        //==============================
        if ("setStxywh") {
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
            st.x = x;
            st.y = y;
            st.w = w;
            st.h = h;
        }
        self.transData(st.x, st.y, st.w, st.h);
        //=====================================
        var elem = document.createElement("div");
        elem.id = this.kid;
        st.elemId = elem.id;
        elem.style.position = "absolute";
        elem.style.overflow = "hidden";
        //=====================================
        elem.style.left = (st.cx) + "px";
        elem.style.top = (st.cy) + "px";
        elem.style.width = (st.cw) + "px";
        elem.style.height = (st.ch) + "px";
        elem.style.paddingLeft = st.lpd + "px";
        elem.style.paddingRight = st.rpd + "px";

        elem.style.maginLeft = (st.lm) + "px";
        elem.style.marginRight = (st.rm) + "px";

        //=====================================
        elem.style.lineHeight = (st.ch) + "px";
        elem.style.verticalAlign = "center";
        elem.style.userSelect = "none";
        if (op.textOverflow)
            elem.style.textOverflow = op.textOverflow;
        else
            elem.style.textOverflow = "ellipsis";

        if (op.cursor) {
            if (!op.disable_f)
                elem.style.cursor = op.cursor;
        }
        /*
         if (op.hint) {
         if (op.hint !== "kvd:disable") {
         elem.title = op.hint;
         }
         } else {
         if ((st.fontSizeObj.w) >= st.cw)
         elem.title = st.innerText;
         }
         */
        //=====================================
        elem.style.borderWidth = st.borderWidth + "px";
        elem.style.borderStyle = "solid";
        elem.style.fontFamily = op.fontFamily;
        elem.style.fontWeight = op.fontWeight;
        elem.style.fontSize = st.fontSize + "px";
        elem.style.whiteSpace = op.whiteSpace;
        elem.style.textAlign = op.textAlign;
        if (op.textShadow)
            elem.style.textShadow = op.textShadow;
        //=====================================
        elem.style.borderColor = self.getBorderColor();
        self.setBackground(elem);
        //elem.style.backgroundColor = self.getBackgroundColor();
        var str = self.getShadowStr();
        if (str.length)
            elem.style.boxShadow = str;
        //=====================================
        if (!op.disable_f) {
            elem.style.color = self.getInnerTextColor();
            if (op.onMouseOn) {
                elem.addEventListener("mouseover", self.mouseOver);
                elem.addEventListener("mouseout", self.mouseOut);
            }
            if (op.onMousePress) {
                elem.addEventListener("mousedown", self.mouseDown);
                elem.addEventListener("mouseup", self.mouseUp);
            }
            if (op.clickFunc)
                elem.addEventListener("click", self.clickFunc);
        } else {
            if (op.disableTextColor)
                elem.style.color = op.disableTextColor;
            else
                elem.style.color = op.innerTextColor;
        }
        //=====================================


        elem.innerHTML = st.innerText;



        var kvd = {};
        kvd.kvObj = self;
        elem.kvd = kvd;
        //=====================================
        st.dx = 0;
        st.dy = 0;
        st.dw = st.cw;
        st.dh = st.ch;
        //=====================================
        if (op.preText || op.preTextWidth) {
            if (op.preTextLine2_f) {
                st.preTextHeight = KvLib.transUnit(op.preTextHeight, 12, st.cw, st.ch);
                st.dy += st.preTextHeight;
                st.dh = st.ch - st.preTextHeight;
                st.dx += st.lpd;
                var selem = document.createElement("div");
                selem.id = this.kid + "_preText";
                selem.style.position = "absolute";
                selem.style.overflow = "hidden";
                selem.style.left = 0 + "px";
                selem.style.top = 0 + "px";
                selem.style.width = (st.cw) + "px";
                selem.style.height = st.preTextHeight + "px";
                selem.style.color = op.preTextColor;
                selem.style.fontSize = st.preTextFontSize + "px";
                self.setPreTextBackground(selem);
                if (op.preTextTextColor)
                    selem.style.color = op.preTextTextColor;
                selem.style.paddingLeft = op.preTextLpd + "px";
                selem.style.verticalAlign = "center";
                selem.style.lineHeight = (st.preTextHeight) + "px";
                selem.style.fontSize = KvLib.transUnit("0.8rh", 10, st.cw, st.preTextHeight) + "px";
                selem.style.textAlign = "center";
                //selem.style.backgroundColor= "rgba(0,0,0,1)";
                selem.innerHTML = op.preText;
                selem.kvd = kvd;
                elem.appendChild(selem);
                self.elems["preText"] = selem;
            } else {
                st.dx += st.preTextWidth;
                st.dw -= st.preTextWidth;
                var selem = document.createElement("div");
                selem.id = this.kid + "_preText";
                selem.style.position = "absolute";
                selem.style.overflow = "hidden";
                selem.style.left = 0 + "px";
                selem.style.top = 0 + "px";
                var bw = op.preTextBorderWidth;
                if (!bw)
                    bw = 0;
                selem.style.width = (st.preTextWidth - bw * 2) + "px";
                selem.style.height = (st.ch - bw * 2) + "px";
                selem.style.color = op.preTextColor;
                selem.style.paddingLeft = op.preTextLpd + "px";
                selem.style.textAlign = op.preTextAlign;
                selem.style.lineHeight = (st.ch - bw * 2) + "px";
                selem.style.fontSize = st.preTextFontSize + "px";



                self.setPreTextBackground(selem);
                if (op.preTextTextColor)
                    selem.style.color = op.preTextTextColor;
                selem.style.borderWidth = bw + "px";
                selem.style.borderStyle = "solid";
                selem.style.borderColor = "#000";

                if (st.insideShadowWidth) {
                    //selem.style.boxShadow = self.getInsideShadowStr();

                }
                //obj.insideShadowWidth = "0.2rh";


                //selem.style.backgroundColor= "rgba(0,0,0,1)";
                selem.innerHTML = op.preText;
                selem.kvd = kvd;
                elem.appendChild(selem);
                self.elems["preText"] = selem;
            }
        }
        //=====================================
        if (this.baseType === "input") {
            var selem = document.createElement("input");
            selem.id = this.kid + "_" + this.type;
            self.elems["input"] = selem;
            selem.spellcheck = null;
            if (op.maxLength !== undefined && op.maxLength !== null)
                selem.maxLength = op.maxLength;
            if (op.minLength !== undefined && op.minLength !== null)
                selem.minLength = op.minLength;
            if (op.max !== undefined && op.max !== null)
                selem.max = op.max;
            if (op.min !== undefined && op.minLength !== null)
                selem.min = op.min;
            if (op.pattern !== undefined && op.pattern !== null)
                selem.pattern = op.pattern;



            selem.type = this.subType;
            selem.style.position = "absolute";
            selem.style.overflow = "hidden";
            selem.style.lineHeight = st.ch + "px";

            var editLineText = 1;
            while (1) {
                if (this.subType === "text")
                    break;
                if (this.subType === "password")
                    break;
                if (this.subType === "date")
                    break;
                if (this.subType === "month")
                    break;
                if (this.subType === "datetime-local")
                    break;
                if (this.subType === "email")
                    break;
                if (this.subType === "tel")
                    break;
                if (this.subType === "time")
                    break;
                editLineText = 0;
                break;
            }


            if (editLineText) {
                if (op.readOnly_f)
                    selem.readOnly = true;
                selem.style.fontFamily = "monospace";
                selem.style.left = st.dx + "px";
                selem.style.top = st.dy + "px";
                selem.style.width = (st.dw - st.afterTextWidth - 7) + "px";
                selem.style.height = st.dh - op.heightSubK + "px";
                //selem.style.height = st.dh + "px";
                //selem.style.lineHeight = st.dh + "px";


                selem.style.fontSize = st.fontSize + "px";
                selem.value = op.editValue;
                st.editValue = op.editValue;
                selem.addEventListener('change', self.changeFunc);
                selem.kvd = kvd;
                elem.appendChild(selem);
            }
            if (this.subType === "radio") {
                st.itemHeight = KvLib.transUnit(op.itemHeight, 0, st.cw, st.ch);
                st.itemWidth = KvLib.transUnit(op.itemWidth, 0, st.cw, st.ch);
                selem.name = op.groupName;
                selem.style.left = st.preTextWidth + "px";
                selem.style.top = (st.ch - st.itemHeight) / 2 - 3 + "px";
                selem.style.width = (st.itemWidth) + "px";
                selem.style.height = (st.itemHeight) + "px";
                selem.addEventListener('change', self.changeFunc);
                if (op.editValue)
                    selem.checked = "checked";
                selem.kvd = kvd;
                elem.appendChild(selem);

            }

            if (this.subType === "checkbox") {
                st.itemHeight = KvLib.transUnit(op.itemHeight, 0, st.cw, st.ch);
                st.itemWidth = KvLib.transUnit(op.itemWidth, 0, st.cw, st.ch);
                selem.style.left = st.preTextWidth + "px";
                selem.style.top = (st.ch - st.itemHeight) / 2 - 3 + "px";
                selem.style.width = (st.itemWidth) + "px";
                selem.style.height = (st.itemHeight) + "px";
                selem.addEventListener('change', self.changeFunc);
                if (op.editValue)
                    selem.checked = "checked";
                selem.kvd = kvd;
                elem.appendChild(selem);

                if (self.opts.enums) {
                    if (!op.editValue)
                        op.afterText = self.opts.enums[0];
                    else
                        op.afterText = self.opts.enums[1];
                }



            }

            if (this.subType === "color") {
                st.itemHeight = KvLib.transUnit(op.itemHeight, 20, st.cw, st.ch);
                st.itemWidth = KvLib.transUnit(op.itemWidth, 0, st.cw, st.ch);
                if (st.itemWidth === 0)
                    st.itemWidth = st.cw - st.preTextWidth - st.afterTextWidth;
                selem.style.left = st.preTextWidth + "px";
                selem.style.top = (st.ch - st.itemHeight) / 2 - 1 + "px";
                selem.style.width = (st.itemWidth) + "px";
                selem.style.height = (st.itemHeight) + "px";
                selem.addEventListener('change', self.changeFunc);
                selem.kvd = kvd;
                selem.value = op.editValue;
                elem.appendChild(selem);
                op.afterText = op.editValue;

            }

            if (this.subType === "number") {
                selem.value = op.editValue;
                st.itemHeight = KvLib.transUnit(op.itemHeight, 20, st.cw, st.ch);
                st.itemWidth = KvLib.transUnit(op.itemWidth, 0, st.cw, st.ch);
                if (st.itemWidth === 0)
                    st.itemWidth = st.cw - st.preTextWidth - st.afterTextWidth;

                selem.style.left = st.preTextWidth + "px";
                selem.style.top = (st.ch - st.itemHeight) / 2 - 3 + "px";
                selem.style.width = (st.itemWidth) + "px";
                selem.style.height = (st.itemHeight) + "px";
                selem.addEventListener('change', self.changeFunc);
                selem.kvd = kvd;
                elem.appendChild(selem);

            }

            if (this.subType === "range") {
                selem.value = op.editValue;
                st.itemHeight = KvLib.transUnit(op.itemHeight, 20, st.cw, st.ch);
                st.itemWidth = KvLib.transUnit(op.itemWidth, 20, st.cw, st.ch);
                if (st.itemWidth === 0) {
                    st.itemWidth = st.dw - 4 - st.afterTextWidth;
                }
                selem.style.left = st.dx + "px";
                selem.style.top = st.dy + (st.dh - st.itemHeight) / 2 + "px";
                selem.style.width = (st.itemWidth) + "px";
                selem.style.height = (st.itemHeight - 4) + "px";
                selem.style.verticalAlign = "center";
                selem.style.lineHeight = (st.itemHeight - 4) + "px";
                selem.kvd = kvd;
                selem.addEventListener('change', self.changeFunc);

                elem.appendChild(selem);

            }

        }
        if (this.baseType === "select") {
            var selem = document.createElement("select");
            selem.id = this.kid + "_" + this.type;
            self.elems["select"] = selem;
            selem.style.position = "absolute";
            selem.style.overflow = "hidden";

            if (this.subType === "sys") {
                selem.style.left = st.dx + "px";
                selem.style.top = st.dy + "px";
                selem.style.width = (st.dw - st.afterTextWidth) + "px";
                selem.style.height = st.dh + "px";
                selem.style.fontSize = st.fontSize + "px";
                if (op.selectHint && op.selectInx < 0) {
                    var opti = new Option(op.selectHint, "-1");
                    opti.selected = "selected";
                    opti.disabled = "disabled";
                    opti.hidden = "hidden";
                    selem.options.add(opti);
                }

                for (var i = 0; i < op.options.length; i++) {
                    selem.options.add(new Option(op.options[i], i));
                }
                if (op.selectInx >= 0)
                    selem.selectedIndex = op.selectInx;
                selem.addEventListener('change', self.changeFunc);
                selem.kvd = kvd;
                elem.appendChild(selem);
                self.elems["item"] = selem;

            }


            //selem.style.paddingTop = 0+ "px";

            //selem.style.backgroundColor= "rgba(0,0,0,1)";



        }
        //=====================================
        if (op.afterText) {
            st.afterText = op.afterText;
            var selem = document.createElement("div");
            selem.id = this.kid + "_afterText";
            selem.style.position = "absolute";
            selem.style.overflow = "hidden";
            if (op.afterTextPos)
                selem.style.left = (st.preTextWidth + st.itemWidth) + "px";
            else
                selem.style.left = (st.cw - st.afterTextWidth + st.lpd) + "px";
            selem.style.top = st.dy + "px";

            var bw = op.afterTextBorderWidth;
            if (!bw)
                bw = 0;
            selem.style.borderWidth = bw + "px";
            selem.style.borderStyle = "solid";
            selem.style.borderColor = "#000";


            selem.style.width = (st.afterTextWidth - st.afterTextLpd - st.afterTextRpd - bw * 2) + "px";
            selem.style.height = (st.dh - bw * 2) + "px";
            selem.style.color = op.afterTextColor;
            selem.style.paddingLeft = st.afterTextLpd + "px";
            selem.style.paddingRight = st.afterTextRpd + "px";
            selem.style.backgroundColor = op.afterTextBackgroundColor;
            selem.style.verticalAlign = "center";
            selem.style.lineHeight = (st.dh) + "px";
            selem.style.textAlign = "center";
            selem.innerHTML = op.afterText;
            selem.kvd = kvd;
            elem.appendChild(selem);
            self.elems["afterText"] = selem;
        }
        felem.appendChild(elem);
        self.elems["base"] = elem;


        if (this.baseType === "chart") {
            self.setCanvas();
            var chartData = {labels: [], datasets: []};
            for (let i = 0; i < op.chartLabels.length; i++)
                chartData.labels.push(op.chartLabels[i]);
            var xAxe = {
                gridLines: {
                    offsetGridLines: true,
                    display: true,
                    borderDash: [6, 2],
                    tickMarkLength: 5
                },
                ticks: {
                    fontSize: op.chartAxesFontSize,
                    labelOffset: 10,
                    maxRotation: 0
                }
            };
            var yAxe = {
                gridLines: {
                    display: true
                },
                ticks: {
                    beginAtZero: true,
                    max: op.chartMax,
                    min: op.chartMin,
                    stepSize: op.chartStep,
                    fontSize: op.chartAxesFontSize
                }
            };
            switch (self.subType) {
                case "bar":
                    var dispLegend = false;
                    var opts = {
                        label: op.datasetName,
                        borderColor: op.chartLineColor,
                        borderWidth: 1,
                        backgroundColor: [],
                        data: []
                    };
                    if (op.chartFilter) {
                        for (let i = 0; i < op.chartLabels.length; i++) {
                            var valueObj = KvLib.watchFilter(op.chartDatas[i], op.chartFilter);
                            opts.backgroundColor.push(valueObj);
                        }
                    } else {
                        for (let i = 0; i < op.chartBackgroundColors.length; i++)
                            opts.backgroundColor.push(op.chartBackgroundColors[i]);
                    }

                    for (let i = 0; i < op.chartLabels.length; i++) {
                        opts.data.push(op.chartDatas[i]);
                    }
                    chartData.datasets.push(opts);

                    var chartScales = {xAxes: [xAxe], yAxes: [yAxe]};
                    if (op.yAxe_f) {
                        chartType = "horizontalBar";
                        chartScales = {xAxes: [yAxe], yAxes: [xAxe]};
                    }
                    break;
                case "line":
                    var dispLegend = false;
                    var opts = {
                        label: op.datasetName,
                        borderColor: op.chartLineColor,
                        borderWidth: 1,
                        pointBackgroundColor: [],
                        fill: KvLib.toBoolean(op.fill_f),
                        data: []
                    };
                    if (op.chartFilter) {
                        for (let i = 0; i < op.chartLabels.length; i++) {
                            var valueObj = KvLib.watchFilter(op.chartDatas[i], op.chartFilter);
                            opts.pointBackgroundColor.push(valueObj);
                        }
                    } else {
                        for (let i = 0; i < op.chartBackgroundColors.length; i++)
                            opts.pointBackgroundColor.push(op.chartBackgroundColors[i]);
                    }
                    for (let i = 0; i < op.chartLabels.length; i++) {
                        opts.data.push(op.chartDatas[i]);
                    }
                    chartData.datasets.push(opts);
                    var barScales = {xAxes: [xAxe], yAxes: [yAxe]};
                    break;
                case "doughnut":
                    var dispLegend = true;
                    var opts = {
                        label: op.datasetName,
                        borderColor: "#000",
                        borderWidth: 1,
                        backgroundColor: [],
                        data: []
                    };
                    if (op.chartFilter) {
                        for (let i = 0; i < op.chartLabels.length; i++) {
                            var valueObj = KvLib.watchFilter(op.chartDatas[i], op.chartFilter);
                            opts.backgroundColor.push(valueObj);
                        }
                    } else {
                        for (let i = 0; i < op.chartBackgroundColors.length; i++)
                            opts.backgroundColor.push(op.chartBackgroundColors[i]);
                    }
                    for (let i = 0; i < op.chartLabels.length; i++) {
                        opts.data.push(op.chartDatas[i]);
                    }
                    chartData.datasets.push(opts);
                    var barScales = {xAxes: [xAxe], yAxes: [yAxe]};
                    break;
            }
            //========================================
            var ctx = document.getElementById(self.opts.canvasId).getContext('2d');
            self.opts.chartObj = new Chart(ctx, {
                type: op.chartType,
                data: chartData,
                options: {
                    responsive: true,
                    legend: {
                        display: dispLegend,
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: op.title
                    },
                    scales: chartScales
                }
            });
        }

        if (this.baseType === "urlReader") {
            self.setIframe();
        }
        if (this.baseType === "video") {
            self.setVideo();
        }
        if (this.baseType === "editor") {
            var self = this;
            var op = this.opts;
            var selem = document.createElement("div");
            selem.id = this.kid + "_editorDiv";
            selem.style.position = "absolute";
            selem.style.left = 0;
            selem.style.top = 0;
            selem.style.right = 0;
            selem.style.bottom = 0;
            selem.style.backgroundColor = op.baseColor;
            selem.kvd = self;
            self.elems["editor"] = selem;
            self.elems["base"].appendChild(selem);

            var retFunc = function (data) {
                var elem = self.elems["editor"];
                //elem.innerHTML = data;
                if (op.exName === "js")
                    var mode = "ace/mode/javascript";
                if (op.exName === "css")
                    var mode = "ace/mode/css";
                if (op.exName === "html")
                    var mode = "ace/mode/html";
                if (op.exName === "txt")
                    var mode = "ace/mode/text";
                if (op.exName === "xml")
                    var mode = "ace/mode/xml";
                if (op.exName === "json")
                    var mode = "ace/mode/json";
                var editor = ace.edit(elem.id, {
                    //maxLines: 30, // 最大行数，超过会自动出现滚动条
                    //minLines: 10, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
                    fontSize: 14, // 编辑器内字体大小
                    theme: "ace/theme/monokai", // 默认设置的主题
                    mode: mode, // 默认设置的语言模式
                    //value: data.toString(),
                    tabSize: 4 // 制表符设置为 4 个空格大小
                });
                var modes = ace.require('ace/ext/modelist');
                editor.setReadOnly(true);
                editor.setShowPrintMargin(false);
                //editor.getSession().getValue();
                editor.getSession().setValue(data.toString());
                self.objs["editor"] = editor;
            };
            if (op.urls)
                KvLib.getTextFileFromServer(op.urls[op.urlsInx], retFunc);
            else {
                retFunc(self.opts.editValue);
            }

            /*
             selem.src = op.urls[op.urlsInx];
             selem.kvd = self;
             self.elems["base"].appendChild(selem);
             var editor = ace.edit(selem.id);
             editor.setTheme("ace/theme/monokai");
             if(op.exName==="js")
             editor.session.setMode("ace/mode/javascript");
             if(op.exName==="css")
             editor.session.setMode("ace/mode/css");
             if(op.exName==="html")
             editor.session.setMode("ace/mode/html");
             */
        }


    }

    setCanvas() {
        var self = this;
        var op = this.opts;
        var selem = document.createElement("canvas");
        selem.id = self.kid + "_canvas";
        selem.style.position = "absolute";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.width = "100%";
        selem.style.height = "100%";
        selem.style.backgroundColor = op.baseColor;
        //if (self.opts.urls[self.opts.urlsInx])
        //   selem.src = self.opts.urls[self.opts.urlsInx];
        selem.kvd = self;
        self.elems["base"].appendChild(selem);
        self.elems["canvas"] = selem;
        self.opts.canvasId = selem.id;
    }
    setIframe() {
        var self = this;
        var op = this.opts;
        var selem = document.createElement("iframe");
        selem.id = this.kid + "_iframe";
        selem.style.position = "absolute";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.width = "100%";
        selem.style.height = "100%";
        selem.style.backgroundColor = op.baseColor;
        if (self.opts.urls[self.opts.urlsInx])
            selem.src = self.opts.urls[self.opts.urlsInx];
        selem.kvd = self;
        self.elems["base"].appendChild(selem);
        self.elems["iframe"] = selem;
    }

    setVideo() {
        var self = this;
        var op = this.opts;
        var selem = document.createElement("video");
        selem.id = this.kid + "_video";
        selem.style.position = "absolute";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.width = "100%";
        selem.style.height = "100%";
        selem.style.backgroundColor = op.baseColor;
        selem.type = "video/mp4";
        selem.autoplay = op.autoPlay_f;
        selem.loop = op.loop_f;
        selem.controls = op.controls_f;
        if (self.opts.urls[self.opts.urlsInx])
            selem.src = self.opts.urls[self.opts.urlsInx];
        selem.kvd = self;
        self.elems["base"].appendChild(selem);
        self.elems["video"] = selem;
    }

}
