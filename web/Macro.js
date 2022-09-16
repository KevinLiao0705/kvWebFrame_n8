/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Macro{
    constructor(){
        
    }
    setFootBar(layouts,lyMap,comps,cname){
        var opts = {};
        opts.xc = 4;
        opts.iwO = {};
        opts.iwO.c0 = 9999;
        opts.iwO.c1 = 100;
        opts.iwO.c2 = 100;
        opts.iwO.c3 = 100;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("footBar_0", cname + "~0");
        lyMap.set("footBar_1", cname + "~1");
        lyMap.set("footBar_2", cname + "~2");
        lyMap.set("footBar_3", cname + "~3");
        //========================
        var cname = lyMap.get("footBar_0");
        var opts = {};
        opts.innerText = "";
        comps[cname] = {name: "message", type: "label~message", opts: opts};
        //========================
        var cname = lyMap.get("footBar_1");
        var opts = {};
        opts.innerText = "status1";
        comps[cname] = {name: "", type: "label~message", opts: opts};
        //========================
        var cname = lyMap.get("footBar_2");
        var opts = {};
        opts.innerText = "status2";
        comps[cname] = {name: "", type: "label~message", opts: opts};
        //========================
        var cname = lyMap.get("footBar_3");
        var opts = {};
        opts.innerText = "status3";
        comps[cname] = {name: "", type: "label~message", opts: opts};
    }
    
    setMainMenu(md,cname){
        var menuFunc = function (actObj) {
            var itemId = actObj.kvObj.opts.itemId;
            if (itemId === "menu0~menu0") {
                gr.mdMain.opts.pageName = "testComponent_1";
                gr.mdMain.reCreate();
                return;
            }
            if (itemId === "menu0~menu1") {
                gr.mdMain.opts.pageName = "testComponent_2";
                gr.mdMain.reCreate();
                return;
            }

            if (itemId === "menu1~menu0") {
                gr.mdMain.opts.pageName = "testModel_1";
                gr.mdMain.reCreate();
                return;
            }
            if (itemId === "menu1~menu1") {
                var actionFunc = function (iobj) {
                    console.log(iobj);
                };
                var opts = {};
                opts.color = "#0ff";
                opts.actionFunc = actionFunc;
                var mod = new Model("", "Md_colorPicker~sys", opts, {});
                sys.popModel(mod, 250, 380);
                return;
            }
            if (itemId === "menu1~menu2") {
                var actionFunc = function (iobj) {
                    console.log(iobj);
                };
                var opts = {};
                opts.color = "#0ff";
                opts.actionFunc = actionFunc;
                var mod = new Model("", "Md_filePicker~sys", opts, {});
                sys.popModel(mod, 0, 0);
                return;
            }



            if (itemId === "menu2~menu0") {
                Test.testServerResponse();
                return;
            }
            if (itemId === "menu2~menu1") {
                KvLib.hint("1234aaaaaaaaaaaaaaaaaaaaaaa", -1000, -1000);
                ani.setT("hintId", "moveX", 500, 600, 500);
                ani.setT("hintId", "moveY", 500, 600, 500);
                return;
            }
            if (itemId === "menu2~menu2") {
            }

            var kvObj = actObj.kvObj;
            console.log(actObj);
            if (actObj.act === "menuClick") {
                if (actObj.itemId === "menu0~menu0") {
                    var cname = "c~2~0";
                    md.clear(cname);
                    return;
                }
                if (itemId === "menu1") {
                    if (gr.mdMain.modelRefs["testList"]) {
                        gr.mdMain.modelRefs["testList"].opts.baseColor = "#0f0";
                        gr.mdMain.modelRefs["testList"].reCreate();
                    }
                    return;
                }
                if (itemId === "menu2") {
                    if (gr.mdMain.compRefs["testLabel"]) {
                        gr.mdMain.compRefs["testLabel"].opts.innerTextColor = "#0f0";
                        gr.mdMain.compRefs["testLabel"].reCreate();
                    }
                    return;
                }




                if (itemId === "menu5") {
                    gr.mdMain.clear("c~2~0");
                    return;
                }
                if (itemId === "menu6") {
                    gr.mdMain.reCreate("c~2~0");
                    return;
                }
            }

        };


        //var cname = lyMap.get("topMenu");
        var opts = {};
        opts.menuKexts = {};
        //==================
        var kexts = [];
        var head = "rootMenu";
        kexts.push(new Kext("menu0", "ComponentTest"));
        kexts.push(new Kext("menu1", "modelTest"));
        kexts.push(new Kext("menu2", "FunctionTest"));
        kexts.push(new Kext("sepLineV", "kvd:sepLineV"));
        kexts.push(new Kext("menu4", "Menu4"));
        kexts.push(new Kext("menu5", "Menu5"));
        kexts.push(new Kext("menu6", '<i class="material-icons">&#xe894;</i>', "", {enHint: "Language"}));
        opts.menuKexts[head] = kexts;
        //==================
        var kexts = [];
        var head = "menu0";
        kexts.push(new Kext(head + "~menu0", "Test 1"));
        kexts.push(new Kext(head + "~menu1", "Test 2"));
        kexts.push(new Kext(head + "~menu2", "Test 3"));
        kexts.push(new Kext(head + "~menu3", "Test 4"));
        kexts.push(new Kext(head + "~menu4", "Test 5"));
        kexts.push(new Kext(head + "~menu5", "Test 6"));
        opts.menuKexts[head] = kexts;
        //==================
        var kexts = [];
        var head = "menu0~menu5";
        kexts.push(new Kext(head + "~menu0", "Test 1"));
        kexts.push(new Kext(head + "~menu1", "Test 2"));
        kexts.push(new Kext(head + "~menu2", "Test 3"));
        kexts.push(new Kext(head + "~menu3", "Test 4"));
        kexts.push(new Kext(head + "~menu4", "Test 5"));
        kexts.push(new Kext(head + "~menu5", "Test 6"));
        opts.menuKexts[head] = kexts;
        //==================
        var kexts = [];
        var head = "menu1";
        kexts.push(new Kext(head + "~menu0", "Md_test"));
        kexts.push(new Kext(head + "~menu1", "Md_colorPicker"));
        kexts.push(new Kext(head + "~menu2", "Md_filePicker"));
        kexts.push(new Kext(head + "~menu3", "Test x"));
        kexts.push(new Kext(head + "~menu4", "Test x"));
        kexts.push(new Kext(head + "~menu5", "Test x"));
        kexts.push(new Kext(head + "~menu6", "Test x"));
        kexts.push(new Kext(head + "~menu7", "Test x"));
        kexts.push(new Kext(head + "~menu8", "Test x"));
        opts.menuKexts[head] = kexts;
        //==================
        var kexts = [];
        var head = "menu2";
        kexts.push(new Kext(head + "~menu0", "Test Server Response"));
        kexts.push(new Kext(head + "~menu1", "Test 2"));
        kexts.push(new Kext(head + "~menu2", "Test 3"));
        kexts.push(new Kext(head + "~menu3", "Test 4"));
        kexts.push(new Kext(head + "~menu4", "Test 5"));
        kexts.push(new Kext(head + "~menu5", "Test 6"));
        opts.menuKexts[head] = kexts;
        //==================
        opts.actionFunc = menuFunc;
        opts.fontSize="0.7rh";
        md.opts.models[cname] = {name: "", type: "Md_menu", opts: opts};
        
        
    }
    
    
}
var mac=new Macro();

