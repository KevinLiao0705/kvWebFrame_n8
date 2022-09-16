/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global KvLib, gr, sys */

class Animate {
    constructor() {
        this.animates = [];
        this.debugCnt = 0;
        this.period = 16.5;
        this.preTime = 0;
    }

    setTimer() {
        var self=this;
        var callBackFunc = function (msTime) {
            window.requestAnimationFrame(callBackFunc);
            if (msTime) {
                if(self.preTime===0){
                    self.preTime=msTime;
                }
                else{
                    self.period=msTime-self.preTime;
                    self.preTime=msTime;
                }
            }
            if (++gr.debugCnt > 20) {
                gr.debugCnt = 0;
            }
            sys.baseTimer();
        };
        window.requestAnimationFrame(callBackFunc);
    }

    check() {
        var self = this;
        var len = self.animates.length;
        for (var i = len - 1; i >= 0; i--) {
            var aobj = self.animates[i];
            var elem = document.getElementById(aobj.elemId);
            if (!elem){
                self.animates.splice(i, 1);
                continue;
            }    
            var exist = 0;
            if (aobj["moveX"]) {
                self.moveX(elem, aobj);
                exist = 1;
            }
            if (aobj["moveY"]) {
                self.moveY(elem, aobj);
                exist = 1;
            }
            if (aobj["opacity"]) {
                self.opacity(elem, aobj);
                exist = 1;
            }
            
            
            if (!exist) {
                self.animates.splice(i, 1);
            }

        }

    }

    setT(elemId, mode, st, end, time, preDelay, afterDelay) {
        var self=this;
        var len = end - st;
        var cnt = time / self.period;
        var add = len / cnt;
        if(preDelay){
            preDelay=preDelay/self.period;
        }
        if(afterDelay){
            afterDelay=afterDelay/self.period;
        }
        this.set(elemId, mode, st, end, add, preDelay, afterDelay);
    }

    //moveX,moveY
    set(elemId, mode, st, end, add, preDelay, afterDelay) {
        var obj = {};
        obj.elemId = elemId;
        var aniObj = obj[mode] = {};
        aniObj.stV = st;
        aniObj.endV = end;
        aniObj.addV = add;
        if (preDelay)
            aniObj.preDelayTime = preDelay;
        if (afterDelay)
            aniObj.afterDelayTime = afterDelay;
        this.animates.push(obj);
    }

    checkDraw(mode, elem, obj) {
        if (obj.preDelayTime>0) {
            obj.preDelayTime--;
            return 0;
        }
        if (obj.end_f) {
            if (obj.afterDelayTime>0) {
                obj.afterDelayTime--;
                return 0;
            }
            KvLib.exe(obj.endFunc, {name: mode, endV: obj.v});
            return 2;
        }
        if (!obj.v) {
            obj.v = obj.stV;
        }
        var xx = obj.v + obj.addV;
        if (obj.addV >= 0) {
            if (xx >= obj.endV) {
                xx = obj.endV;
                obj.end_f = 1;
            }
        } else {
            if (xx <= obj.endV) {
                xx = obj.endV;
                obj.end_f = 1;
            }
        }
        obj.v = xx;
        return 1;
    }

    moveX(elem, obj) {
        var mode = "moveX";
        if (!obj[mode].stV) {
            obj[mode].stV = KvLib.toInt(elem.style.left.split("px")[0], -9999);
            if (obj[mode].stV === -9999) {
                delete obj[mode];
                return;
            }
        }
        var reti = this.checkDraw(mode, elem, obj[mode], "px");
        if (reti === 2) {
            delete obj[mode];
            return;
        }
        if (!reti)
            return;
        if (elem.style.left !== (obj[mode].v + "px"))
            elem.style.left = (obj[mode].v + "px");
    }

    moveY(elem, obj) {
        var mode = "moveY";
        if (!obj[mode].stV) {
            obj[mode].stV = KvLib.toInt(elem.style.left.split("px")[0], -9999);
            if (obj[mode].stV === -9999) {
                delete obj[mode];
                return;
            }
        }
        var reti = this.checkDraw(mode, elem, obj[mode]);
        if (reti === 2) {
            delete obj[mode];
            return;
        }
        if (!reti)
            return;
        if (elem.style.top !== (obj[mode].v + "px"))
            elem.style.top = (obj[mode].v + "px");
    }

    opacity(elem, obj) {
        var mode = "opacity";
        var reti = this.checkDraw(mode, elem, obj[mode]);
        if (reti === 2) {
            delete obj[mode];
            return;
        }
        if (!reti)
            return;
        if (elem.style.opacity !== (obj[mode].v ))
            elem.style.opacity = (obj[mode].v );
    }



}

var ani = new Animate();
