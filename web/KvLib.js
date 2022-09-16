/* global gr, Kext, NaN */

//static coverObject(toObj, fromObj) {
//static deepCoverObject(toObj, fromObj,deepCnt) {
//static transInnerText(istr, defaultOut) {
//static transUnit(istr, defaultOut,w,h) {



//################################################################################
class KvLib {
    constructor(_name, _type, _opts, _paras) {
    }

    static genKid() {
        gr.kid++;
        return "kid" + gr.kid;
    }

    static getTextFileFromServer1(url, retFunc) {
        $.ajax({
            url: url,
            success: retFunc//
        });
    }

    static getTextFileFromServer(url, retFunc) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState ===4 && xhr.status ===200) {
                retFunc(xhr.responseText);
                //document.getElementById('placeholder').innerHTML = xhr.responseText;
            }
        }
        xhr.open('GET', url);
        xhr.send();
    }
    getNowTime() {
        window.performance = window.performance || {};
        performance.now = (function () {
            return performance.now ||
                    performance.mozNow ||
                    performance.msNow ||
                    performance.oNow ||
                    performance.webkitNow ||
                    function () {
                        //Doh! Crap browser!
                        return new Date().getTime();
                    };
        })();
        return performance.now;
    }

    static transColorStr(cr, cg, cb, ca) {
        if (ca === undefined || ca === 1) {
            var str = "#";
            str += KvLib.numToHex2b(cr);
            str += KvLib.numToHex2b(cg);
            str += KvLib.numToHex2b(cb);
            return str;
        } else {
            var str = "rgba(";
            str += cr + ",";
            str += cg + ",";
            str += cb + ",";
            str += ca.toFixed(2) + ")";
            return str;
        }
    }

    static transColor(cstr) {
        var numA = [];
        var num;
        var color = {r: 0, g: 0, b: 0};
        if (!cstr)
            return;
        var str = cstr.trim();
        var strA = str.split("");
        if (strA.length === 4) {
            var hexMap = {0: 0, 1: 0x11, 2: 0x22, 3: 0x33, 4: 0x44, 5: 0x55, 6: 0x66, 7: 0x77, 8: 0x88, 9: 0x99,
                a: 0xaa, A: 0xaa, b: 0xbb, B: 0xbb, c: 0xcc, C: 0xcc, d: 0xdd, D: 0xdd, e: 0xee, E: 0xee, f: 0xff, F: 0xff};
            if (strA[0] !== "#")
                return color;
            for (var i = 0; i < 3; i++) {
                num = hexMap[strA[i + 1]];
                if (num === undefined)
                    return color;
                numA.push(num);
            }
            color.r = numA[0];
            color.g = numA[1];
            color.b = numA[2];
            return color;
        }
        if (strA.length === 7) {
            var hexMap = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, a: 10, A: 10, b: 11, B: 11, c: 12, C: 12, d: 13, D: 13, e: 14, E: 14, f: 15, F: 15};
            if (strA[0] !== "#")
                return color;
            for (var i = 0; i < 3; i++) {
                var value;
                num = hexMap[strA[i * 2 + 1]];
                if (num === undefined)
                    return color;
                value = num;
                num = hexMap[strA[i * 2 + 2]];
                if (num === undefined)
                    return color;
                value = value * 16 + num;
                numA.push(value);
            }
            color.r = numA[0];
            color.g = numA[1];
            color.b = numA[2];
            return color;
        }
        if (strA[0] === 'r' && strA[1] === 'g' && strA[2] === 'b') {
            if (strA[3] === '(' || (strA[3] === 'a')) {
                strA = str.split(",");
                var strB = strA[0].split("(");
                if (strB.length !== 2)
                    return color;
                strA[0] = strB[1];
                var strC = strA[strA.length - 1].split(")");
                if (strC.length !== 2)
                    return color;
                strA[strA.length - 1] = strC[0];
                for (var i = 0; i < strA.length; i++) {
                    if (i === 3)
                        num = KvLib.parseNumber(strA[i]);
                    else
                        num = parseInt(strA[i]);
                    if (isNaN(num))
                        return color;
                    numA.push(num);
                }
                color.r = numA[0];
                color.g = numA[1];
                color.b = numA[2];
                if (numA[3])
                    color.a = numA[3];
                return color;
            }
            return color;
        }
        return color;


    }

    static hint(text, x, y) {
        var hint = document.getElementById("hintId");
        if (!hint)
            hint = document.createElement('div');
        hint.id = "hintId";
        var sty = hint.style;
        sty.fontSize = "12px";
        sty.fontWeight = "normal";
        sty.fontFamily = "sans-serif";
        var size = KvLib.measureText(text, 12, sty.fontWeight, sty.fontFamily);
        size.w += 8;
        size.h = size.h * 1.4;
        sty.position = "absolute";
        sty.width = size.w + "px";
        sty.height = size.h + "px";
        sty.left = x + "px";
        sty.top = y + "px";
        sty.backgroundColor = "#ff0";
        sty.color = "#000";
        sty.borderRadius = "6px";
        sty.borderWidth = "1px";
        sty.borderStyle = "solid";
        sty.borderColor = "#000";
        sty.textAlign = "center";
        sty.lineHeight = (size.h) + "px";
        sty.pointerEvents = "none";
        sty.zIndex = 100;
        sty.opacity = 0;
        hint.innerHTML = text;
        document.body.appendChild(hint);
        return size;

    }

    static measureText(pText, fontSize, fontWeight, fontFamily) {

        var lDiv = document.createElement('div');
        document.body.appendChild(lDiv);
        lDiv.style.fontFamily = fontFamily;
        lDiv.style.fontWeight = fontWeight;
        lDiv.style.fontSize = "" + fontSize + "px";
        lDiv.style.position = "absolute";
        lDiv.style.left = -1000;
        lDiv.style.top = -1000;
        //lDiv.textContent = pText;
        lDiv.innerHTML = pText;
        var lResult = {
            w: lDiv.clientWidth,
            h: lDiv.clientHeight
        };
        document.body.removeChild(lDiv);
        lDiv = null;
        if (lResult.w > 100)
            return lResult;
        return lResult;
    }

    static coverObject(toObj, fromObj) {
        if (!fromObj)
            return;
        if (!toObj)
            return;
        var fromKeys = Object.keys(fromObj);
        for (var i = 0; i < fromKeys.length; i++) {
            var value = fromObj[fromKeys[i]];
            var typeName = typeof value;
            //if(typeName==="object")
            //    continue;
            toObj[fromKeys[i]] = fromObj[fromKeys[i]];
        }
    }

    static deepCoverObject(toObj, fromObj, deepCnt) {
        if (!fromObj)
            return;
        if (!toObj)
            return;
        if (!deepCnt)
            deepCnt = 0;
        var fromKeys = Object.keys(fromObj);
        for (var i = 0; i < fromKeys.length; i++) {
            var key = fromKeys[i];
            if (key === "subOpts")
                continue;
            var value = fromObj[key];
            if (value === undefined) {
                continue;
            }
            if (value === null) {
                toObj[key] = fromObj[key];
                continue;
            }
            if (Array.isArray(value)) {
                toObj[key] = fromObj[key];
                continue;
            }
            var typeName = typeof value;
            if (typeName === "object") {
                if (!toObj[fromKeys[i]]) {
                    toObj[fromKeys[i]] = {};
                }
                deepCnt++;
                if (deepCnt >= 10) {
                    console.error("The deepCoverObject deepCnt over 10 !!!");
                    continue;
                }
                KvLib.deepCoverObject(toObj[fromKeys[i]], fromObj[fromKeys[i]], deepCnt);
                deepCnt--;
                continue;
            }
            toObj[fromKeys[i]] = fromObj[fromKeys[i]];
        }
    }

    static getKvText(istr, defaultOut) {
        return istr;
    }

    static minMax(iData, min, max) {
        if (iData < min)
            return min;
        if (iData > max)
            return max;
        return iData;
    }

    static  scrollVExist(elem) {
        return elem.scrollHeight > elem.clientHeight;
    }
    static  scrollHExist(elem) {
        return elem.scrollWidth > elem.clientWidth;
    }

    static transUnit(istr, defaultOut, w, h) {
        if (istr === null || istr === undefined)
            return defaultOut;
        if(istr==="")
            return defaultOut;
        if (!isNaN(istr))
            return parseInt(istr);
        if (istr === "rest")
            return 9999;
        if (istr === undefined || istr === null) {
            return defaultOut;
        }
        var stra = istr.substr(0, istr.length - 2);
        var strb = istr.substr(istr.length - 2, 2);
        if (strb === "px") {
            var od = parseInt(stra);
            if (isNaN(od)) {
                return defaultOut;
            }
            return od;
        }
        if (strb === "rw") {
            var od = KvLib.parseNumber(stra, w, h);
            if (isNaN(od)) {
                return defaultOut;
            }
            return (od * w) | 0;
        }
        if (strb === "rh") {
            var od = KvLib.parseNumber(stra, w, h);
            if (isNaN(od)) {
                return defaultOut;
            }
            return (od * h) | 0;
        }
         return defaultOut;

    }

    //=========================================
    static myString1(_str) {
        var strA, strB;
        var str, style;
        var num;
        var textSize, type, textColor, error, begin;
        var str = "";
        var second = 0;
        strA = _str.split("~!");
        if (strA.length > 1) {
            if (strA[0] !== "") {
                str += "<p>" + strA[0] + "</p>";
                second = 1;
            }
            for (let i = 1; i < strA.length; i++) {
                type = "";
                textColor = "";
                textSize = "";
                error = 1;
                begin = 0;
                for (let j = 0; j < strA[i].length; j++) {
                    if (strA[i].charAt(j) === "]") {
                        begin = j + 1;
                        error = 0;
                        break;
                    }
                    num = parseInt(strA[i].charAt(j + 1));
                    if (isNaN(num))
                        break;
                    switch (strA[i].charAt(j)) {
                        case 'p':
                            textSize = KvLib.textSizeTbl[num];
                            type = "p";
                            break;
                        case 'h':
                            textSize = KvLib.textSizeTbl[num];
                            type = "h";
                            break;
                        case 'c':
                            textColor = KvLib.textColorTbl[num];
                            break;
                        default:
                            j = strA[i].length;
                            break;
                    }
                    j++;
                }
                if (error) {
                    str += "<p>" + strA[i] + "</p>";
                } else {
                    if (type === "") {
                        type = "p";
                    }
                    style = " style='";
                    if (textColor !== "") {
                        style += "color:" + textColor + ";";
                    }
                    if (textSize !== "") {
                        style += "font-size:" + textSize + "px;";
                    }
                    if (second) {
                        type = "span";
                        //style+="display:"+"inline;";
                    }
                    type = "span";

                    style += "'";
                    str += "<" + type + style + ">";
                    str += strA[i].slice(begin);
                    str += "</" + type + ">";
                }
                second = 1;
            }

        } else {
            str += "<p>";
            str += _str;
            str += "</p>";
        }
        return str;
    }
    //=========================================


    static myString(_str) {
        var strA, strB;
        var str, style;
        var num;
        var textSize, type, textColor, error, begin;
        var str = "<p>";
        var second = 0;
        strA = _str.split("~!");
        if (strA.length > 1) {
            if (strA[0] !== "") {
                str += strA[0];
            }
            for (let i = 1; i < strA.length; i++) {
                type = "";
                textColor = "";
                textSize = "";
                error = 1;
                begin = 0;
                for (let j = 0; j < strA[i].length; j++) {
                    if (strA[i].charAt(j) === "]") {
                        begin = j + 1;
                        error = 0;
                        break;
                    }
                    num = parseInt(strA[i].charAt(j + 1));
                    if (isNaN(num))
                        break;
                    switch (strA[i].charAt(j)) {
                        case 'p':
                            textSize = KvLib.textSizeTbl[num];
                            break;
                        case 'c':
                            textColor = KvLib.textColorTbl[num];
                            break;
                        default:
                            j = strA[i].length;
                            break;
                    }
                    j++;
                }
                if (error) {
                    str += strA[i];
                } else {
                    style = " style='";
                    if (textColor !== "") {
                        style += "color:" + textColor + ";";
                    }
                    if (textSize !== "") {
                        style += "font-size:" + textSize + "px;";
                    }
                    if (second) {
                        type = "span";
                        //style+="display:"+"inline;";
                    }
                    type = "span";

                    style += "'";
                    str += "<" + type + style + ">";
                    str += strA[i].slice(begin);
                    str += "</" + type + ">";
                }
            }

        } else {
            str += _str;
        }
        str += "<p>";
        return str;
    }
    //=========================================




    static incId(idStr) {
        var str = "" + idStr;
        var stra = str.split("");
        var len = stra.length;
        const char = "012345678901";
        for (let i = 0; i < len; i++) {
            if (stra[len - i - 1] < "0" || stra[len - i - 1] > "9")
                return stra.join("");
            var k = 0;
            for (; k < 10; k++) {
                if (stra[len - i - 1] === char[k])
                    break;
            }
            stra[len - i - 1] = char[k + 1];
            if (k !== 9)
                return stra.join("");
        }
        return stra.join("");
    }

    static evalPrgA(obj, name, errorKey) {
        try {
            if (obj["error_f"])
                return false;
            eval(obj[name]);
            return true;
        } catch (e) {
            obj["error_f"] = 1;
            var obj = {};
            obj.name = errorKey;
            obj.error = e.toString();
            obj.Content = obj[name];
            gr.errorObjs.push(obj);
            return false;
        }
    }

    static evalPrgB(evalStr, errorKey, ioValue) {
        try {
            eval(evalStr);
            return true;
        } catch (e) {
            var obj = {};
            obj.name = errorKey;
            obj.error = e.toString();
            obj.Content = evalStr;
            gr.errorObjs.push(obj);
            return false;
        }
    }

    static evalPrgC(errorKey, errorStr, content) {
        var obj = {};
        obj.name = errorKey;
        obj.error = errorStr;
        obj.Content = content;
        gr.errorObjs.push(obj);
    }

    static logErr(errorKey, errorStr, content) {
        var obj = {};
        obj.name = errorKey;
        obj.error = errorStr;
        obj.Content = content;
        gr.errorObjs.push(obj);
    }

    static popWindow(_name, _type, _opts, _paras) {
        var classStr = "new " + _paras.className + "(myName, type, opts, paras)";
        var paras = {
            newClass: classStr,
            width: _paras.width,
            height: _paras.height,
            end: 0
        };
        sysMaskShow("mask", "base", {opacity: '0.7'});
        var instObj = sysPopShow(_name, "base", _opts, paras);
        return instObj;
    }

    static bodyMouseDown() {
        var rightclick;
        var e = window.event;
        if (e.which)
            rightclick = (e.which === 3);
        else if (e.button)
            rightclick = (e.button === 2);
        if (rightclick) {
            KvLib.exeFunc(gr.rightMouseFunc, null);
            gr.rightMouseFunc = null;
            console.log("right mouse button");
        } else {
            gr.rightMouseFunc = null;
            console.log("left mouse button");
        }
    }

    static checkMouseRight() {
        var rightclick;
        var e = window.event;
        if (e.which)
            rightclick = (e.which === 3);
        else if (e.button)
            rightclick = (e.button === 2);
        return rightclick;

    }

    static isFileName(_str) {
        var str = _str.trim();
        if (str.length === 0)
            return false;
        var strA = str.split("");
        var ascii;
        for (let i = 0; i < strA.length; i++)
        {
            ascii = strA[i].charCodeAt(0) & 255;
            if (strA[i] === '_')
                continue;
            if (ascii >= 0x30 && ascii <= 0x39)
            {
                if (i === 0)
                    return false;
                continue;
            }
            if (ascii >= 0x41 && ascii <= 0x5a)//A~Z
                continue;
            if (ascii >= 0x61 && ascii <= 0x7a)//a~z
                continue;
            return false;
        }
        return true;
    }

    static isFloat(x) {
        if (typeof x === "number")
            return !!(x % 1);
        return false;
    }
    static isInteger(x) {
        if (typeof x === "number")
            return !(x % 1);
        return false;
    }
    static isFloat(x) {
        if (typeof x === "number")
            return !!(x % 1);
        return false;
    }
    static parseNumber(x) {
        var n = parseFloat(x);
        if (Number.isNaN(n))
            return n;
        if (KvLib.isFloat(n))
            return n;
        else
            return parseInt(n);
    }

    static fullScreen(elemId) {
        var elem = document.getElementById(elemId);
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    }

    //字元檢測函式 
    static char_test(chr) {
        var i;
        var smallch = "abcdefghijklmnopqrstuvwxyz";
        var bigch = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (i = 0; i < 26; i++)
            if (chr === smallch.charAt(i) || chr === bigch.charAt(i))
                return(1);
        return(0);
    }
    //數字和特殊字元檢測函式 
    static spchar_test(chr) {
        var i;
        var spch = "_-.0123456789";
        for (i = 0; i < 13; i++)
            if (chr === spch.charAt(i))
                return(1);
        return(0);
    }

    static email_test(str)
    {
        var i, flag = 0;
        //“@”檢測的位置 
        var at_symbol = 0;
        //“.”檢測的位置 
        var dot_symbol = 0;
        //首字元必須用字母 
        if (KvLib.char_test(str.charAt(0)) === 0)
            return (1);
        //檢測“@”的位置 
        for (i = 1; i < str.length; i++) {
            if (str.charAt(i) === '@') {
                at_symbol = i;
                break;
            }
        }
        //沒有郵件伺服器域名 
        if (at_symbol === str.length - 1 || at_symbol === 0)
            return(2);
        //帳號少於三個字元 
        if (at_symbol < 3)
            return(3);
        //帳號多於十九個字元 
        if (at_symbol > 19)
            return(4);
        //不能用其它的特殊字元  
        for (i = 1; i < at_symbol; i++) {
            if (KvLib.char_test(str.charAt(i)) === 0 && KvLib.spchar_test(str.charAt(i)) === 0)
                return (5);
        }
        for (i = at_symbol; i < str.length; i++) {
            if (KvLib.char_test(str.charAt(i)) === 0 && KvLib.spchar_test(str.charAt(i)) === 0)
                return (5);
        }
        for (i = at_symbol; i < str.length; i++)
            if (str.charAt(i) === '.')
                dot_symbol = i;
        //簡單的檢測有沒有“.”，以確定伺服器名是否合法 
        for (i = at_symbol; i < str.length; i) {
            if (dot_symbol === 0 || dot_symbol === str.length - 1)
                return (6);
        }
        //郵件名合法 
        return (0);
    }

    static exeFunc(_func, event) {
        if (!_func)
            return;
        if (typeof _func === 'function') {
            _func(event);
            return;
        } else {
            var func = getInstByString(_func);
            if (func) {
                func(event);
                return;
            }
            return;
        }
    }

    static exe(_func, para0, para1, para2, para3) {
        if (!_func)
            return;
        if (typeof _func === 'function') {
            _func(para0, para1, para2, para3);
        } else {
            var func = getInstByString(_func);
            if (func) {
                func(para0, para1, para2, para3);
            }
        }
    }

    static deepEqual(x, y) {
        if (x === y) {
            return true;
        } else if ((typeof x === "object" && x !== null) && (typeof y === "object" && y !== null)) {
            if (Object.keys(x).length !== Object.keys(y).length)
                return false;

            for (var prop in x) {
                if (y.hasOwnProperty(prop))
                {
                    if (!KvLib.deepEqual(x[prop], y[prop]))
                        return false;
                } else
                    return false;
            }

            return true;
        } else
            return false;
    }

    static exeFilter(_func, _valueObj) {
        if (!_func)
            return null;
        if (typeof _func === 'function') {
            return _func(_valueObj);
        } else {
            var func = getInstByString(_func);
            if (func) {
                return func(_valueObj);
            }
            return null;
        }
    }

    static evalFunc(_func, inputObj, retFunc) {
        var retObj;
        try {
            if (!_func)
                return null;
            retObj = eval(_func + "(inputObj,retFunc);");
            return retObj;
        } catch (except) {
            console.error(except);
            return null;
        }
    }

    static numToHex2b(num) {
        var str = "";
        num = num % 256;
        str += gr.hexTable[parseInt(num / 16)];
        str += gr.hexTable[num % 16];
        return str;
    }

    static pt1(num) {
        var str = "";
        num = num % 256;
        str += gr.hexTable[parseInt(num / 16)];
        str += gr.hexTable[num % 16];
        return str;
    }

    static isColor(_colorStr) {
        var colorValue = {type: 0, cr: 0, cg: 0, cb: 0, opacity: 1};
        var strb = "";
        if (!_colorStr)
            return null;
        if ((typeof _colorStr) !== "string")
            return null;
        var colorStr = _colorStr.trim();

        if (/^#[0-9A-F]{3}$/i.test(colorStr)) {
            colorValue.type = 1;
            strb = "0x" + colorStr[1];
            colorValue.cr = parseInt(strb);
            strb = "0x" + colorStr[2];
            colorValue.cg = parseInt(strb);
            strb = "0x" + colorStr[3];
            colorValue.cb = parseInt(strb);
            return colorValue;
        }
        if (/^#[0-9A-F]{6}$/i.test(colorStr)) {
            colorValue.type = 2;
            strb = "0x" + colorStr[1] + colorStr[2];
            colorValue.cr = parseInt(strb);
            strb = "0x" + colorStr[3] + colorStr[4];
            colorValue.cg = parseInt(strb);
            strb = "0x" + colorStr[5] + colorStr[6];
            colorValue.cb = parseInt(strb);
            return colorValue;
        }
        if (colorStr[0] !== 'r')
            return null;
        if (colorStr[1] !== 'g')
            return null;
        if (colorStr[2] !== 'b')
            return null;
        if (colorStr[3] === '(') {
            if (colorStr[colorStr.length - 1] !== ')')
                return null;
            colorStr = colorStr.slice(4, colorStr.length - 1);
            var strA = colorStr.split(',');
            if (strA.length !== 3)
                return null;
            for (let i = 0; i < 3; i++) {
                if (Number.isNaN(parseInt(strA[i])))
                    return null;
            }
            colorValue.type = 3;
            colorValue.cr = parseInt(strA[0]);
            colorValue.cg = parseInt(strA[1]);
            colorValue.cb = parseInt(strA[2]);
            return colorValue;

        }
        if (colorStr[3] !== 'a')
            return null;
        if (colorStr[4] === '(') {
            colorStr = colorStr.slice(5, colorStr.length - 1);
            var strA = colorStr.split(',');
            if (strA.length !== 4)
                return null;
            var num;
            for (let i = 0; i < 3; i++) {
                if (Number.isNaN(parseInt(strA[i])))
                    return null;
            }
            if (Number.isNaN(parseFloat(strA[3])))
                return null;
            colorValue.type = 4;
            colorValue.cr = parseInt(strA[0]);
            colorValue.cg = parseInt(strA[1]);
            colorValue.cb = parseInt(strA[2]);
            colorValue.opacity = parseFloat(strA[3]);
            return colorValue;
        }
        return null;
    }

    static toNumber(str) {
        str = "" + str;
        if (str.match(/^-{0,1}\d+$/)) {
            //valid integer (positive or negative)
            return parseInt(str);
        } else if (str.match(/^\d+\.\d+$/)) {
            //valid float
            return parseFloat(str);
        } else {
            //not valid number
            return null;
        }
    }

    //if error return null else return number
    static trsStrToNum(_str) {
        if (_str === "")
            return null;
        var str = _str.trim();
        var strA = str.split("");
        var float_f = false;
        if (strA[0] === '0' && strA[1] === 'x') {
            return parseInt(str, 16);
        }


        for (let i = 0; i < strA.length; i++)
        {
            if (strA[i] === '-')
            {
                continue;
            }
            if (strA[i] === '.')
            {
                if (float_f)
                    return NaN;
                float_f = true;
                continue;
            }
            if ((strA[i].charCodeAt(0) & 255) < 0x30)
                return NaN;
            if ((strA[i].charCodeAt(0) & 255) > 0x39)
                return NaN;
        }
        if (float_f)
            return parseFloat(str);
        return parseInt(str);
    }

    static trsStrToStr(_str) {
        var str = _str.trim();
        if (str[0] === "\'" || str[0] === "\"")
        {
            if (str[str.length - 1] === "\'" || str[str.length - 1] === "\"")
            {
                var retStr = "";
                for (let i = 0; i < str.length - 2; i++)
                    retStr += str[i + 1];
                return retStr;
            }
        }
        return str;
    }

    static getObjType(obj) {
        var objType = obj.constructor.name;
        var myType = "null";
        while (true) {
            if (objType === "Number") {
                myType = "number";
                break;
            }
            if (objType === "String") {
                myType = "string";
                break;
            }
            if (objType === "Object") {
                myType = "object";
                break;
            }
            if (objType === "Array") {
                myType = "nullArray";
                if (!obj.length)
                    break;
                if (obj[0] === null || obj[0] === undefined)
                    break;

                objType = obj[0].constructor.name;
                if (objType === "Number") {
                    myType = "numberArray";
                    break;
                }
                if (objType === "String") {
                    myType = "stringArray";
                    break;
                }
                if (objType === "Object") {
                    myType = "objectArray";
                    break;
                }
                if (objType === "Array") {
                    myType = "nullArray2D";
                    if (!obj[0].length)
                        break;
                    objType = obj[0][0].constructor.name;
                    if (objType === "Number") {
                        myType = "numberArray2D";
                        break;
                    }
                    if (objType === "String") {
                        myType = "stringArray2D";
                        break;
                    }
                    if (objType === "Object") {
                        myType = "objectArray2D";
                        break;
                    }
                    break;
                }
                break;
            }
            break;
        }
        return myType;
    }

    static editToValue(type, inputValue) {
        var outObj = {error_f: 1, outValue: ""};
        switch (type) {
            case "free":
                outObj.outValue = inputValue;
                outObj.error_f = 0;
                return outObj;
            case 'number':
                var num = KvLib.trsStrToNum(inputValue);
                if (Number.isNaN(num))
                    return outObj;
                outObj.outValue = num;
                outObj.error_f = 0;
                return outObj;
            case 'userInput':
            case 'color':
            case 'string':
            case 'text':
            case 'shortString':
            case 'longString':
                outObj.outValue = KvLib.trsStrToStr(inputValue);
                outObj.error_f = 0;
                return outObj;
            case 'numberArray':
                strA = inputValue.split("\n");
                array = [];
                for (let i = 0; i < strA.length; i++) {
                    str = KvLib.trsStrToStr(strA[i]);
                    if (str.charAt(0) === ",") {
                        str = str.slice(1);
                    }
                    if (str.charAt(str.length - 1) === ",") {
                        str = str.slice(0, -1);
                    }
                    array.push(str);
                }
                str = "";
                for (let i = 0; i < array.length; i++) {
                    if (array[i] === "")
                        continue;
                    if (i !== 0)
                        str += ",";
                    str += array[i];
                }
                var strA = str.split(",");
                var array = [];
                for (let i = 0; i < strA.length; i++) {
                    num = KvLib.trsStrToNum(strA[i]);
                    if (Number.isNaN(num))
                        return outObj;
                    if (num === null)
                        return outObj;
                    array.push(num);
                }
                outObj.outValue = array;
                outObj.error_f = 0;
                return outObj;
            case 'freeArray':
            case 'imageUrls':
            case 'stringArray':
                array = [];
                var strA = inputValue.split("\n");
                for (let i = 0; i < strA.length; i++) {
                    var strB = strA[i].split(",");
                    for (let j = 0; j < strB.length; j++) {
                        var str = strB[j].trim();
                        if (str === "")
                            continue;
                        if (str.charAt(0) === '"' && str.charAt(str.length - 1) === '"') {
                            var nstr = str.slice(1, str.length - 1);
                            array.push(nstr);
                        } else {
                            array.push(str);
                        }
                    }
                }


                /*
                 var str = inputValue.replace("\n", ",");
                 strA = str.split(",");
                 array = [];
                 for (let i = 0; i < strA.length; i++) {
                 str = KvLib.trsStrToStr(strA[i]);
                 array.push(str);
                 }
                 
                 if(array.length===1){
                 if(array[0]==="")
                 array=[];
                 }
                 */
                outObj.outValue = array;
                outObj.error_f = 0;
                return outObj;
            case 'longStringArray':
                strA = inputValue.split("\n");
                array = [];
                for (let i = 0; i < strA.length; i++) {
                    str = KvLib.trsStrToStr(strA[i]);
                    array.push(str);
                }
                outObj.outValue = array;
                outObj.error_f = 0;
                return outObj;
            case 'numberArray2D':
                var strb;
                var strB;
                var arrbuf;
                strA = inputValue.split("\n");
                array = [];
                for (let i = 0; i < strA.length; i++) {
                    strb = strA[i].trim();
                    if (!strb.length)
                        continue;
                    arrbuf = [];
                    strB = strA[i].split(",");
                    for (let j = 0; j < strB.length; j++) {
                        num = KvLib.trsStrToNum(strB[j]);
                        if (Number.isNaN(num))
                            return outObj;
                        arrbuf.push(num);
                    }
                    array.push(arrbuf);
                }
                outObj.outValue = array;
                outObj.error_f = 0;
                return outObj;
            case 'freeArray2D':
            case 'stringArray2D':
                var strb;
                var strB;
                var arrbuf;
                strA = inputValue.split("\n");
                array = [];
                for (let i = 0; i < strA.length; i++) {
                    strb = strA[i].trim();
                    if (!strb.length)
                        continue;
                    arrbuf = [];
                    strB = strA[i].split(",");
                    for (let j = 0; j < strB.length; j++) {
                        str = KvLib.trsStrToStr(strB[j]);
                        arrbuf.push(str);
                    }
                    array.push(arrbuf);
                }
                outObj.outValue = array;
                outObj.error_f = 0;
                return outObj;
            case 'object':
                if (inputValue === "" || inputValue === "null") {
                    outObj.outValue = null;
                    outObj.error_f = 0;
                    return outObj;
                }
                try {
                    outObj.outValue = JSON.parse(inputValue);
                    outObj.error_f = 0;
                } catch (error) {
                    outObj.error_f = 1;
                    outObj.outValue = {};
                }
                return outObj;
            case 'objectArray':
            case 'objectArray2D':
                if (inputValue === "" || inputValue === "null") {
                    outObj.outValue = null;
                    outObj.error_f = 0;
                    return outObj;
                }
                try {
                    outObj.outValue = JSON.parse(inputValue);
                    if (!Array.isArray(outObj.outValue)) {
                        outObj.error_f = 1;
                        outObj.outValue = [];
                        return outObj;
                    }
                    outObj.error_f = 0;
                } catch (error) {
                    outObj.error_f = 1;
                    outObj.outValue = [];

                }
                return outObj;
        }
        return outObj;
    }

    static valueToEdit(type, inputValue) {
        var outObj = {error_f: 1, outValue: ""};
        switch (type) {
            case "free":
                outObj.outValue = inputValue;
                outObj.error_f = 0;
                return outObj;
            case 'number':
                if ((typeof inputValue) === "number") {
                    outObj.outValue = "" + inputValue;
                    outObj.error_f = 0;
                } else {
                    outObj.outValue = "0";
                    outObj.error_f = 1;
                }
                return outObj;
            case 'userInput':
            case 'color':
            case 'string':
            case 'text':
                outObj.outValue = inputValue;
                outObj.error_f = 0;
                return outObj;
            case 'numberArray':
                outObj.error_f = 0;
                if (Array.isArray(inputValue)) {
                    var str = "";
                    for (var i = 0; i < inputValue.length; i++) {
                        if (i !== 0)
                            str += ",";
                        if ((typeof inputValue[i]) !== "number") {
                            str += "0";
                            outObj.error_f = 1;
                        } else {
                            str += inputValue[i];
                        }
                    }
                    outObj.outValue = str;
                } else
                {
                    outObj.outValue = "";
                    outObj.error_f = 1;
                }
                return outObj;
            case 'freeArray':
            case 'imageUrls':
            case 'stringArray':
                outObj.error_f = 0;
                if (Array.isArray(inputValue)) {
                    var str = "";
                    for (var i = 0; i < inputValue.length; i++) {
                        if (i !== 0)
                            str += ",";
                        str += inputValue[i];
                    }
                    outObj.outValue = str;
                } else
                {
                    outObj.outValue = "";
                    outObj.error_f = 1;
                }
                return outObj;
            case 'longStringArray':
                outObj.error_f = 0;
                if (Array.isArray(inputValue)) {
                    var str = "";
                    for (var i = 0; i < inputValue.length; i++) {
                        if (i !== 0)
                            str += "\n";
                        str += inputValue[i];
                    }
                    outObj.outValue = str;
                } else
                {
                    outObj.outValue = "";
                    outObj.error_f = 1;
                }
                return outObj;

            case 'numberArray2D':
                outObj.error_f = 0;
                if (Array.isArray(inputValue)) {
                    var str = "";
                    for (var i = 0; i < inputValue.length; i++) {
                        if (i !== 0)
                            str += "\n";
                        var strB = inputValue[i];
                        if (Array.isArray(strB)) {
                            for (var j = 0; j < strB.length; j++) {
                                if (j !== 0)
                                    str += ",";
                                if ((typeof strB[j]) !== "number") {
                                    str += "0";
                                    outObj.error_f = 1;
                                } else {
                                    str += strB[j];
                                }

                            }
                        } else
                        {
                            str += "";
                            outObj.error_f = 1;
                        }
                    }
                    outObj.outValue = str;

                } else
                {
                    outObj.outValue = "";
                    outObj.error_f = 1;
                }
                return outObj;
            case 'freeArray2D':
            case 'stringArray2D':
                outObj.error_f = 0;
                if (Array.isArray(inputValue)) {
                    var str = "";
                    for (var i = 0; i < inputValue.length; i++) {
                        if (i !== 0)
                            str += "\n";
                        var strB = inputValue[i];
                        if (Array.isArray(strB)) {
                            for (var j = 0; j < strB.length; j++) {
                                if (j !== 0)
                                    str += ",";
                                str += strB[j];
                            }
                        } else
                        {
                            str += "";
                            outObj.error_f = 1;
                        }
                    }
                    outObj.outValue = str;

                } else
                {
                    outObj.outValue = "";
                    outObj.error_f = 1;
                }
                return outObj;
            case 'object':
            case 'objectArray':
            case 'objectArray2D':
                outObj.outValue = JSON.stringify(inputValue);
                outObj.error_f = 0;
                return outObj;
            default:
                return outObj;
        }
    }

    static textToValue(type, inputValue) {
        var outObj = {error_f: 1, outValue: ""};
        switch (type) {
            case "free":
                outObj.outValue = inputValue;
                outObj.error_f = 0;
                return outObj;
            case 'number':
                var num = KvLib.trsStrToNum(inputValue);
                if (Number.isNaN(num)) {
                    outObj = {error_f: 1, outValue: 0};
                    return outObj;
                }
                outObj.outValue = num;
                outObj.error_f = 0;
                return outObj;
            case 'font':
            case 'enum':
            case 'userInput':
            case 'color':
            case 'text':
            case 'string':
            case 'shortString':
            case 'longString':
                outObj.outValue = KvLib.trsStrToStr(inputValue);
                outObj.error_f = 0;
                return outObj;
            case 'numberArray':
                strA = inputValue.trim().split("\n");
                var array = [];
                for (let i = 0; i < strA.length; i++) {
                    str = strA[i].trim();
                    if (str.charAt(0) === ",") {
                        str = str.slice(1);
                    }
                    if (str.charAt(str.length - 1) === ",") {
                        str = str.slice(0, -1);
                    }
                    strB = str.split(",");
                    for (let j = 0; j < strB.length; j++) {
                        num = KvLib.trsStrToNum(strB[j]);
                        if (Number.isNaN(num))
                            return outObj;
                        if (num === null)
                            return outObj;
                        array.push(num);
                    }
                }
                outObj.outValue = array;
                outObj.error_f = 0;
                return outObj;
            case 'freeArray':
            case 'imageUrls':
            case 'stringArray':
                var strA = inputValue.trim().split("\n");
                array = [];
                for (let i = 0; i < strA.length; i++) {
                    str = strA[i].trim();
                    if (str.charAt(0) === ",") {
                        str = str.slice(1);
                    }
                    if (str.charAt(str.length - 1) === ",") {
                        str = str.slice(0, -1);
                    }
                    strB = str.split(",");
                    for (let j = 0; j < strB.length; j++)
                        array.push(KvLib.trsStrToStr(strB[j]));
                }
                outObj.outValue = array;
                outObj.error_f = 0;
                return outObj;
            case 'longStringArray':
                strA = inputValue.split("\n");
                array = [];
                for (let i = 0; i < strA.length; i++) {
                    var str = KvLib.trsStrToStr(strA[i]);
                    array.push(str);
                }
                outObj.outValue = array;
                outObj.error_f = 0;
                return outObj;
            case 'numberArray2D':
                var strb;
                var strB;
                var arrbuf;
                strA = inputValue.split("\n");
                array = [];
                for (let i = 0; i < strA.length; i++) {
                    strb = strA[i].trim();
                    if (!strb.length)
                        continue;
                    arrbuf = [];
                    strB = strA[i].split(",");
                    for (let j = 0; j < strB.length; j++) {
                        num = KvLib.trsStrToNum(strB[j]);
                        if (Number.isNaN(num))
                            return outObj;
                        arrbuf.push(num);
                    }
                    array.push(arrbuf);
                }
                outObj.outValue = array;
                outObj.error_f = 0;
                return outObj;
            case 'freeArray2D':
            case 'stringArray2D':
                var strb;
                var strB;
                var arrbuf;
                strA = inputValue.split("\n");
                array = [];
                for (let i = 0; i < strA.length; i++) {
                    strb = strA[i].trim();
                    if (!strb.length)
                        continue;
                    arrbuf = [];
                    strB = strA[i].split(",");
                    for (let j = 0; j < strB.length; j++) {
                        str = KvLib.trsStrToStr(strB[j]);
                        arrbuf.push(str);
                    }
                    array.push(arrbuf);
                }
                outObj.outValue = array;
                outObj.error_f = 0;
                return outObj;
            case 'object':
                try {
                    outObj.outValue = JSON.parse(inputValue);
                    outObj.error_f = 0;
                } catch (error) {
                    outObj.error_f = 1;
                    outObj.outValue = {};
                }
                return outObj;
            case 'objectArray':
            case 'objectArray2D':
                try {
                    outObj.outValue = JSON.parse(inputValue);
                    if (!Array.isArray(outObj.outValue)) {
                        outObj.error_f = 1;
                        outObj.outValue = [];
                        return outObj;
                    }
                    outObj.error_f = 0;
                } catch (error) {
                    outObj.error_f = 1;
                    outObj.outValue = [];

                }
                return outObj;
        }
        return outObj;
    }

    static valueToMemo(_dataType, _inputValue, _inType) {
        var inputValue = _inputValue;
        var inType = _inType;
        var dataType = _dataType;
        if (_inType === "json") {
            inputValue = JSON.parse(_inputValue);
            inType = "value";
        }
        var outObj = {error_f: 1, outValue: ""};
        switch (dataType) {
            case "direct":
            case "string":
            case "color":
            case "text":
            case 'userInput':
                outObj.outValue = inputValue;
                outObj.error_f = 0;
                return outObj;
            case 'number':
                if ((typeof inputValue) === "number") {
                    outObj.outValue = "" + inputValue;
                    outObj.error_f = 0;
                } else {
                    outObj.outValue = "0";
                    outObj.error_f = 1;
                }
                return outObj;
            case 'numberArray':
                if (inType === "editStr") {
                    outObj.outValue = inputValue;
                    outObj.error_f = 0;
                    return outObj;
                }
                outObj.error_f = 0;
                if (Array.isArray(inputValue)) {
                    var str = "";
                    for (var i = 0; i < inputValue.length; i++) {
                        if (i === 0) {
                        } else {
                            if (i % 20)
                                str += ",";
                            else
                                str += "\n";
                        }
                        if ((typeof inputValue[i]) !== "number") {
                            str += "---";
                            outObj.error_f = 1;
                        } else {
                            str += inputValue[i];
                        }
                    }
                    outObj.outValue = str;
                } else
                {
                    outObj.outValue = "";
                    outObj.error_f = 1;
                }
                return outObj;



            case 'freeArray':
            case 'imageUrls':
            case 'stringArray':
                outObj.error_f = 0;
                if (Array.isArray(inputValue)) {
                    var str = "";
                    for (var i = 0; i < inputValue.length; i++) {
                        if (i !== 0)
                            str += ",";
                        str += inputValue[i];
                    }
                    outObj.outValue = str;
                } else
                {
                    outObj.outValue = "";
                    outObj.error_f = 1;
                }
                return outObj;
            case 'longStringArray':
                outObj.error_f = 0;
                if (Array.isArray(inputValue)) {
                    var str = "";
                    for (var i = 0; i < inputValue.length; i++) {
                        if (i !== 0)
                            str += "\n";
                        str += inputValue[i];
                    }
                    outObj.outValue = str;
                } else
                {
                    outObj.outValue = "";
                    outObj.error_f = 1;
                }
                return outObj;

            case 'numberArray2D':
                outObj.error_f = 0;
                if (Array.isArray(inputValue)) {
                    var str = "";
                    for (var i = 0; i < inputValue.length; i++) {
                        if (i !== 0)
                            str += "\n";
                        var strB = inputValue[i];
                        if (Array.isArray(strB)) {
                            for (var j = 0; j < strB.length; j++) {
                                if (j !== 0)
                                    str += ",";
                                if ((typeof strB[j]) !== "number") {
                                    str += "0";
                                    outObj.error_f = 1;
                                } else {
                                    str += strB[j];
                                }

                            }
                        } else
                        {
                            str += "";
                            outObj.error_f = 1;
                        }
                    }
                    outObj.outValue = str;

                } else
                {
                    outObj.outValue = "";
                    outObj.error_f = 1;
                }
                return outObj;
            case 'freeArray2D':
            case 'stringArray2D':
                outObj.error_f = 0;
                if (Array.isArray(inputValue)) {
                    var str = "";
                    for (var i = 0; i < inputValue.length; i++) {
                        if (i !== 0)
                            str += "\n";
                        var strB = inputValue[i];
                        if (Array.isArray(strB)) {
                            for (var j = 0; j < strB.length; j++) {
                                if (j !== 0)
                                    str += ",";
                                str += strB[j];
                            }
                        } else
                        {
                            str += "";
                            outObj.error_f = 1;
                        }
                    }
                    outObj.outValue = str;

                } else
                {
                    outObj.outValue = "";
                    outObj.error_f = 1;
                }
                return outObj;
            case 'object':
            case 'objectArray':
            case 'objectArray2D':
                outObj.outValue = JSON.stringify(inputValue);
                outObj.error_f = 0;
                return outObj;
            default:
                return outObj;
        }
    }

    static getCursorPosition(e)
    {
        var posx = 0;
        var posy = 0;
        if (!e)
            var e = window.event;
        if (e.pageX || e.pageY) {
            posx = e.pageX - document.documentElement.scrollLeft - document.body.scrollLeft;
            posy = e.pageY - document.documentElement.scrollTop - document.body.scrollTop;
        } else if (e.clientX || e.clientY) {//for fucking IE
            posx = e.clientX;//+ document.body.scrollLeft+ document.documentElement.scrollLeft;
            posy = e.clientY;//+ document.body.scrollTop + document.documentElement.scrollTop;
            //如果想取得目前的捲動值 就把後面的註解拿掉
        }
        return {x: posx, y: posy};//posx posy就是游標的X,Y值了
    }

    static getPosition(el) {
        var xPos = 0;
        var yPos = 0;
        while (el) {
            if (el.tagName === "body") {
// deal with browser quirks with body/window/document and page scroll
                var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                var yScroll = el.scrollTop || document.documentElement.scrollTop;
                xPos += (el.offsetLeft - xScroll + el.clientLeft);
                yPos += (el.offsetTop - yScroll + el.clientTop);
            } else {
// for all other non-BODY elements
                xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                yPos += (el.offsetTop - el.scrollTop + el.clientTop);
            }

            el = el.offsetParent;
        }
        return {
            x: xPos,
            y: yPos
        };
    }

    static changeMarkerPosition(marker, lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng);
        marker.setPosition(latlng);
    }

    static centerScreen(elem) {
        elem.style.left = ((window.innerWidth - elem.offsetWidth) / 2) + "px";
        elem.style.top = ((window.innerHeight - elem.offsetHeight) / 2) + "px";
    }

    static toHex(int) {
        var hex = int.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    static  watchFilter(inData, filterStr, sourceObj)
    {
        if (inData === null || inData === undefined) {
            return inData;
        }
        var outData = inData;
        try {
            eval(filterStr);
            return outData;
        } catch (e) {
            return inData;
        }
    }

    static toggle(flag)
    {
        if (flag)
            return false;
        else
            return true;
    }

    static toBoolean(obj)
    {
        if (obj)
            return true;
        else
            return false;
    }

    static toInt(_str, reti)
    {
        var type = typeof _str;
        if (type !== "string")
            return reti;
        var str = _str.trim();
        if (str === "")
            return reti;
        var strA = str.split("");
        if (strA[0] === '0' && strA[1] === 'x') {
            var num = parseInt(str, 16);
        } else {
            var num = parseInt(str);
        }
        if (!isNaN(num))
            return num;
        return reti;
    }

    static getScrollbarWidth() {
        var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
        $('body').append(div);
        var w1 = $('div', div).innerWidth();
        div.css('overflow-y', 'scroll');
        var w2 = $('div', div).innerWidth();
        $(div).remove();
        return (w1 - w2);
    }

    static getImageSize(_src, retFunc) {
        const img = new Image();
        img.onload = function () {
            var wh = "" + this.width + "x" + this.height;
            var obj = {w: this.width, h: this.height, wh: wh};
            KvLib.exeFunc(retFunc, obj);
        };
        img.src = _src;
    }
}

