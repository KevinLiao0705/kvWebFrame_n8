class GlobalRes {
    constructor() {
        this.kid=0;
        this.kidMap=new Map();
        this.mouseAct={};
        this.baseColor="#27282c";
        this.language="chinese";
        this.minFontSize=10;
        this.maxFontSize=100;
        this.mdTestInx=0;
        this.scrollWidth=0;
        this.debugCnt=0;
        this.mouseDown_f=0;
        this.addSubTimer=null;
        //============================
        this.message="";
        this.messageKobj=null;
        this.messageTime=0;
        this.messageColor="#000";
        //============================
        this.animates=[];
        this.compOpts={};
        this.compBaseOpts={};
        //============================
        this.repaint_f=0;
        this.window_innerWidth_old=0;
        this.window_innerHeight_old=0;
        this.webPage="webFramePage";
        this.mouseFuncPara=null;
        
        
        
        
        this.colorTable = [
            "#ffffff",
            "#cccccc",
            "#888888",
            "#444444",
            "#000000",
            "#ff0000",
            "#aa0000",
            "#440000",
            "#00ff00",
            "#00aa00",
            "#004400",
            "#0000ff",
            "#0000aa",
            "#000044",
            "#00ffff",
            "#00aaaa",
            "#004444",
            "#ffff00",
            "#aaaa00",
            "#444400",
            "#000000",
            "#000000",
            "#000000"
        ];

        this.colorSetTbl = [//B/f
            "#4f4", "#000", //0
            "#ff0", "#000", //1
            "#f33", "#000", //2
            "#66f", "#000", //3
            "#000", "#4f4", //0
            "#000", "#ff0", //1
            "#000", "#f33", //2
            "#000", "#66f", //3

            "#060", "#fff", //0
            "#660", "#fff", //1
            "#800", "#fff", //2
            "#008", "#fff", //3
            "#fff", "#000", //0
            "#000", "#fff", //1
            "#fff", "#800", //2
            "#fff", "#008", //3

            "#000", "#000"  //end
        ];

        this.chartColors = {
            red: 'rgb(255, 99, 132)',
            orange: 'rgb(255, 159, 64)',
            yellow: 'rgb(255, 205, 86)',
            green: 'rgb(75, 192, 192)',
            blue: 'rgb(54, 162, 235)',
            purple: 'rgb(153, 102, 255)',
            grey: 'rgb(201, 203, 207)'
        };

        this.hexTable = [
            '0', '1', '2', '3',
            '4', '5', '6', '7',
            '8', '9', 'a', 'b',
            'c', 'd', 'e', 'f'
        ];


        var self = this;
    }
}



var gr = new GlobalRes();
//disable mouse right key
document.addEventListener('contextmenu', event => event.preventDefault());


/*================================================================*/
var gbStyle = document.createElement('style');
gbStyle.innerHTML = `
/*================================================================*/
@font-face {
        font-family: digital_1;
        src: url(DS-DIGIT.TTF);
}
@font-face {
        font-family: digital_2;
        src: url(digital-7.ttf);
}
@font-face {
        font-family: digital_3;
        src: url(digital-7a.ttf);
}

@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: local('Material Icons'),
    local('MaterialIcons-Regular'),
    url(iconfont/MaterialIcons-Regular.woff2) format('woff2'),
    url(iconfont/MaterialIcons-Regular.woff) format('woff'),
    url(iconfont/MaterialIcons-Regular.ttf) format('truetype');
}
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  text-overflow: hidden;  
  pointer-events:none;  


  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}

/*================================================================*/
 `;
document.head.appendChild(gbStyle);
document.addEventListener('mousedown', e => gr.mouseDown_f=1);
document.addEventListener('mouseup', e => gr.mouseDown_f=0);
/*================================================================*/
