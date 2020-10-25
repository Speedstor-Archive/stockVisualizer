console.log("loaded")
window.onload = function(){
    console.log("loadded, on the onload function")
    initCanvas("visualizer");
}


var canvasElem;
var canvasId;

var canvasWidth;
var canvasHeight;
var stockObject;

var background = "day";

var shapeObjects = {}
function initCanvas(id){
    fetch("http://http.speedstor.net:88/getData").then(response => response.json()).then(stockJson => {
        console.log(stockJson);


        window.stockObject = stockJson
        stockObject = stockJson
    
        document.getElementById("loadDiv").style.display = "none";
        document.getElementById("appWrap").style.display = "block";
    
        canvasElem = document.getElementById(id);
        window.canavsElem = canvasElem;
        canvasId = id;
        
        //sync width height with the browser window size
        canvasElem.width = canavsElem.clientWidth;
        canvasElem.height = canavsElem.clientHeight;
        
        //check width and height
        canvasWidth = canvasElem.width;
        canvasHeight = canvasElem.height;
    
        var ctx = canvasElem.getContext("2d");
        window.ctx = ctx;
        
        console.log(canvasWidth, canvasHeight)
    
        let colorTemp = genGradient("radial", canvasWidth/2, canvasHeight/2, 5, canvasWidth/3*4, [[0, "black"], [1, "#454d80"]], ctx);
        drawRect(ctx, 0, 0, canvasWidth, canvasHeight, colorTemp);
    
        testBlock(ctx);

        Object.keys(stockJson).map(key => {
            if (Object.keys(stockJson[key]).length < 2) {
                stockJson[key]["avoid"] = true
            }else{
                let stockColor = hslToHex(Math.floor(Math.random() * 360), 60, 48)
                stockJson[key]["color"] = stockColor
                addOption(key, stockColor)
                
                let stockItem = stockJson[key]

                let stockPricePerc = Math.abs((stockItem["c"]-stockItem["pc"])/stockItem["pc"] * 10000)
                if(stockPricePerc > 640) stockPricePerc = 640

                //stockPricePerc = applyExpontRatio(stockPricePerc)
                
                let highPricePerc = (stockItem["h"]-stockItem["pc"])/stockItem["pc"] * 30000
                highPricePerc = 300 + highPricePerc/2
                if(highPricePerc > 640) highPricePerc = 640
                else if(highPricePerc < 0) highPricePerc = 0
                //highPricePerc = applyExpontRatio(highPricePerc)

                let lowPricePerc = (stockItem["l"]-stockItem["pc"])/stockItem["pc"] * 30000
                lowPricePerc = 600 + lowPricePerc/2
                if(lowPricePerc > 640) lowPricePerc = 640
                else if(lowPricePerc < 0) lowPricePerc = 0
                //lowPricePerc = applyExpontRatio(lowPricePerc)

                console.log(stockPricePerc, highPricePerc, lowPricePerc)

                shapeObjects[key] = new Shape(ctx, key, 3, 2, {
                    1: applyExpontRatio(stockItem["h"]), //high price
                    2: stockItem["c"] - stockItem["pc"] >= 0 ? applyExpontRatio(Math.abs(stockItem["c"])) : 0, //current price positive
                    3: applyExpontRatio(stockItem["l"]), //low price
                    4: stockItem["c"] - stockItem["pc"] >= 0 ? stockPricePerc : 0, //current price in % +
                    5: highPricePerc, //high price in %
                    6: lowPricePerc, //low price in %
                    7: stockItem["c"] - stockItem["pc"] < 0 ? applyExpontRatio(Math.abs(stockItem["c"])) : 0, //current price negative
                    8: stockItem["c"] - stockItem["pc"] < 0 ? stockPricePerc : 0, //current price in % -
                })
            }
            
        })
    
        setInterval(() => {
            fetch("http://http.speedstor.net:88/getData").then(response => response.json()).then(stockJsonNew => {
                updateStockJson(stockJsonNew);
            })
        }, 3000)
    
        tick();
    })
}

function applyExpontRatio(x){
    return -Math.exp(-0.001 * x + 6.41) + 600
}

var updatePoints = []

function updateStockJson(newJson){
    //Object.keys(newJson).map(symbol => {
    //    if(symbol in stockObject){
//
    //    }else{
    //        if (Object.keys(newJson[symbol]).length < 2) stockJson[symbol]["avoid"] = true
    //        else{
//
    //        }
    //    }
    //})
    let stockJson = newJson
    Object.keys(stockJson).map(key => {
        
        if(stockJson[key]["c"] != stockObject[key]["c"]){
            console.log("updated "+key)
            let stockItem = stockJson[key]
    
            let stockPricePerc = Math.abs((stockItem["c"]-stockItem["pc"])/stockItem["pc"] * 10000)
            if(stockPricePerc > 640) stockPricePerc = 640
    
            //stockPricePerc = applyExpontRatio(stockPricePerc)
            
            let highPricePerc = (stockItem["h"]-stockItem["pc"])/stockItem["pc"] * 30000
            highPricePerc = 300 + highPricePerc/2
            if(highPricePerc > 640) highPricePerc = 640
            else if(highPricePerc < 0) highPricePerc = 0
            //highPricePerc = applyExpontRatio(highPricePerc)
    
            let lowPricePerc = (stockItem["l"]-stockItem["pc"])/stockItem["pc"] * 30000
            lowPricePerc = 600 + lowPricePerc/2
            if(lowPricePerc > 640) lowPricePerc = 640
            else if(lowPricePerc < 0) lowPricePerc = 0
            //lowPricePerc = applyExpontRatio(lowPricePerc)
    
            console.log(highPricePerc, lowPricePerc)
    
            shapeObjects[key].gotoPoint = {
                1: applyExpontRatio(stockItem["h"]), //high price
                2: stockItem["c"] - stockItem["pc"] >= 0 ? applyExpontRatio(Math.abs(stockItem["c"])) : 0, //current price positive
                3: applyExpontRatio(stockItem["l"]), //low price
                4: stockItem["c"] - stockItem["pc"] >= 0 ? stockPricePerc : 0, //current price in % +
                5: highPricePerc, //high price in %
                6: lowPricePerc, //low price in %
                7: stockItem["c"] - stockItem["pc"] < 0 ? applyExpontRatio(Math.abs(stockItem["c"])) : 0, //current price negative
                8: stockItem["c"] - stockItem["pc"] < 0 ? stockPricePerc : 0, //current price in % -
            }
        }

    })
}



window.onresize = function(){
    canvasElem.width = canavsElem.clientWidth;
    canvasElem.height = canavsElem.clientHeight;

    canvasWidth = canvasElem.width;
    canvasHeight = canvasElem.height;
    console.log(canvasWidth, canvasHeight);
}

function addOption(symbol, color){
    let optionItem = document.createElement("label")
    optionItem.classList.add("control", "control-checkbox")

    optionItem.id = "symbolOption-"+symbol;

    optionItem.innerHTML = "<span style='color: "+color+"'>"+symbol+"</span>"+
            "<input type='checkbox' id='symbolOption-"+symbol+"-checkbox' checked/>"+
        "<div class='control_indicator'></div>"


    document.getElementById("selectBox-inner").appendChild(optionItem)
}

function closeOptions(){
    let focusedButton = document.getElementById("selectBox-toggle")
    if(focusedButton.innerText == "Close"){
        focusedButton.innerText = "Open"
        document.getElementById("selectBox-inner").style.height = "0px"
        document.getElementById("keyOverlay").style.display = "none";
    }else{
        focusedButton.innerText = "Close"
        document.getElementById("selectBox-inner").style.height = "unset"
        document.getElementById("keyOverlay").style.display = "block";
    }
}
function nightDayToggle(){
    let focusedButton = document.getElementById("dayNight-toggle")
    if(focusedButton.innerText == "Night"){
        background = "night"
        focusedButton.innerText = "Day"
    }else{
        background = "day"
        focusedButton.innerText = "Night"
    }
}

function testBlock(ctx){
    var myPoints = [10,10, 1000,400, 100,800]; //minimum two points
    var tension = 0.1;

    ctx.strokeStyle = "green";
    ctx.lineWidth = 10;
    ctx.shadowBlur = 15;
    ctx.shadowColor = "white";
    drawCurve(ctx, myPoints); //default tension=0.5
    //drawCurve(ctx, myPoints, tension);
}

var toIndex;


var tick = function(timestamp){ //timestamp is the program runtime in millisseconds
    let ctx = canvasElem.getContext("2d");

    ctx.fillStyle = "green";
    ctx.rect(0, 0, 1000, 1000)

    drawBackground(ctx);

    //drawStock(ctx, stockObject, color)

    //testBlock(ctx);

    Object.keys(shapeObjects).map(key=>{
        shapeObjects[key].tick()

        if(document.getElementById("symbolOption-"+key+"-checkbox").checked){
            ctx.strokeStyle = stockObject[key].color;
            ctx.lineWidth = 10;
            ctx.shadowBlur = 9;
            ctx.shadowColor = stockObject[key].color;
            ctx.shadowColor = "white";
    
            drawCurve(ctx, shapeObjects[key].getPoints(canvasWidth, canvasHeight), 0.2); 
        }

    })

    
    window.requestAnimationFrame(tick);
}
//window.requestAnimationFrame(tick);

function drawBackground(ctx){
    let darkBlue = "#454d80"
    let darkOrange = "#e3a300"
    let black = "black"
    let grey = "#b8a581"

    let colorTemp
    if(background == "day"){
        colorTemp = genGradient("radial", canvasWidth/2, canvasHeight/2, 5, canvasWidth/3*4, [[0, grey], [1, darkOrange]], ctx);
    }else{
        colorTemp = genGradient("radial", canvasWidth/2, canvasHeight/2, 5, canvasWidth/3*4, [[0, black], [1, darkBlue]], ctx);
    }
    drawRect(ctx, 0, 0, canvasWidth, canvasHeight, colorTemp);
}

/**
 * 
 * @param {string} type 
 * @param {number} x0 
 * @param {number} y0 
 * @param {number} x1 
 * @param {number} y1 
 * @param {Array} colorStopArray 
 * 
 * @return {ctx color} idk
 */
function genGradient(type, x0, y0, x1, y1, colorStopArray, ctx){
    let returnColor;
    switch(type){
        case "linear":
        default:
            returnColor = ctx.createLinearGradient(x0, y0, x1, y1);
            break;
        case "radial":
            let toRadial = x1 > y1 ? y1 : x1;
            returnColor = ctx.createRadialGradient(x0, y0, x1, x0, y0, y1);
            break;
    }
    for(let i = 0; i < colorStopArray.length; i++){
        let item = colorStopArray[i];

        returnColor.addColorStop(item[0], item[1]);
    }
    return returnColor;
}

function drawRect(ctx, x, y, width, height, fillColor){
    //version 1
    ctx.beginPath()
    ctx.rect(x, y, width, height);
    ctx.fillStyle = fillColor;
    //ctx.fill();
    //ctx.strokeStyle = fillColor;
    //ctx.stroke();

    //version 2
    ctx.fillRect(x, y, width, height);
}


//help make curve lines natural
//from:: https://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas

function drawCurve(ctx, ptsa, tension, isClosed, numOfSegments, showPoints) {

    ctx.beginPath();
  
    drawLines(ctx, getCurvePoints(ptsa, tension, isClosed, numOfSegments));
    
    if (showPoints) {
      ctx.beginPath();
      for(var i=0;i<ptsa.length-1;i+=2) 
        ctx.rect(ptsa[i] - 2, ptsa[i+1] - 2, 4, 4);
    }
  
    ctx.stroke();
  }

  function getCurvePoints(pts, tension, isClosed, numOfSegments) {

    // use input value if provided, or use a default value	 
    tension = (typeof tension != 'undefined') ? tension : 0.5;
    isClosed = isClosed ? isClosed : false;
    numOfSegments = numOfSegments ? numOfSegments : 16;
  
    var _pts = [], res = [],	// clone array
        x, y,			// our x,y coords
        t1x, t2x, t1y, t2y,	// tension vectors
        c1, c2, c3, c4,		// cardinal points
        st, t, i;		// steps based on num. of segments
  
    // clone array so we don't change the original
    //
    _pts = pts.slice(0);
  
    // The algorithm require a previous and next point to the actual point array.
    // Check if we will draw closed or open curve.
    // If closed, copy end points to beginning and first points to end
    // If open, duplicate first points to befinning, end points to end
    if (isClosed) {
      _pts.unshift(pts[pts.length - 1]);
      _pts.unshift(pts[pts.length - 2]);
      _pts.unshift(pts[pts.length - 1]);
      _pts.unshift(pts[pts.length - 2]);
      _pts.push(pts[0]);
      _pts.push(pts[1]);
    }
    else {
      _pts.unshift(pts[1]);	//copy 1. point and insert at beginning
      _pts.unshift(pts[0]);
      _pts.push(pts[pts.length - 2]);	//copy last point and append
      _pts.push(pts[pts.length - 1]);
    }
  
    // ok, lets start..
  
    // 1. loop goes through point array
    // 2. loop goes through each segment between the 2 pts + 1e point before and after
    for (i=2; i < (_pts.length - 4); i+=2) {
      for (t=0; t <= numOfSegments; t++) {
  
        // calc tension vectors
        t1x = (_pts[i+2] - _pts[i-2]) * tension;
        t2x = (_pts[i+4] - _pts[i]) * tension;
  
        t1y = (_pts[i+3] - _pts[i-1]) * tension;
        t2y = (_pts[i+5] - _pts[i+1]) * tension;
  
        // calc step
        st = t / numOfSegments;
  
        // calc cardinals
        c1 =   2 * Math.pow(st, 3) 	- 3 * Math.pow(st, 2) + 1; 
        c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2); 
        c3 = 	   Math.pow(st, 3)	- 2 * Math.pow(st, 2) + st; 
        c4 = 	   Math.pow(st, 3)	- 	  Math.pow(st, 2);
  
        // calc x and y cords with common control vectors
        x = c1 * _pts[i]	+ c2 * _pts[i+2] + c3 * t1x + c4 * t2x;
        y = c1 * _pts[i+1]	+ c2 * _pts[i+3] + c3 * t1y + c4 * t2y;
  
        //store points in array
        res.push(x);
        res.push(y);
  
      }
    }
  
    return res;
  }
  
  function drawLines(ctx, pts) {
    ctx.moveTo(pts[0], pts[1]);
    for(i=2;i<pts.length-1;i+=2) ctx.lineTo(pts[i], pts[i+1]);
  }


//from: https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
  /**
     * Converts an HSL color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h, s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param   {number}  h       The hue
     * @param   {number}  s       The saturation
     * @param   {number}  l       The lightness
     * @return  {Array}           The RGB representation
     */
    function hslToRgb(h, s, l){
        var r, g, b;

        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            var hue2rgb = function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    function hslToHex(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        let r, g, b;
        if (s === 0) {
          r = g = b = l; // achromatic
        } else {
          const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
          };
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }
        const toHex = x => {
          const hex = Math.round(x * 255).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      }