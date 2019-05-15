/*makeSvg = function(width,height) {
    let svg = document.createElementNS(`http://www.w3.org/2000/svg`, `svg`);
    svg.setAttribute(`width`, width);
    svg.setAttribute(`height`, height);

    return svg;
}

makeCircle = function(x,y,r,color){
    var circle = document.createElementNS(`http://www.w3.org/2000/svg`, `circle`);
    circle.setAttribute(`cx`, x);
    circle.setAttribute(`cy`, y);
    circle.setAttribute(`r`, r);
    circle.setAttribute(`fill`, color);

    return circle;
}

makeSlice = function(xStart,yStart,xEnd,yEnd,percent,color){
    var slice = document.createElementNS(`http://www.w3.org/2000/svg`, `path`);
    const xRadius = 1;
    const yRadius = 1;
    const xAxisRotation = 0;
    const largeArcFlag = (percent <= 0.5 ? `0` : `1`);
    const sweepFlag = 1;
    const xCenter = 0;
    const yCenter = 0;
    
    slice.setAttribute(`d`,`M ${yStart} ${xStart} A ${yRadius} ${xRadius} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${yEnd} ${xEnd} L ${yCenter} ${xCenter}`);
    slice.setAttribute(`fill`, color);
    
    return slice;
}


makeRectangle = function(width,height,x,y,color) {
    var box = document.createElementNS(`http://www.w3.org/2000/svg`, `rect`);
    box.setAttribute(`width`, width);
    box.setAttribute(`height`, height);
    box.setAttribute(`x`, x);
    box.setAttribute(`y`, y);
    box.setAttribute(`style`, `fill:` + color);

    return box;
}

makeText = function(x,y,color) {
    var text = document.createElementNS(`http://www.w3.org/2000/svg`, `text`);
    text.setAttribute(`x`, x);
    text.setAttribute(`y`, y);
    text.setAttribute(`fill`, color);

    return text;
}


graphColors = function(amount){

    startColor = new Color(0,71,122);
    endColor = new Color(0,226,242);


    colors = [];
    for(var i = 0; i < amount; i++){
        rColor = Math.round(startColor.r + (i+1)*((endColor.r-startColor.r)/(amount+1)));
        gColor = Math.round(startColor.g + (i+1)*((endColor.g-startColor.g)/(amount+1)));
        bColor = Math.round(startColor.b + (i+1)*((endColor.b-startColor.b)/(amount+1)));

        rHex = rColor.toString(16);
        if(rHex.length < 2){
            rHex = `0` + rHex;
        }
        gHex = gColor.toString(16);
        if(gHex.length < 2){
            gHex = `0` + gHex;
        }
        bHex = bColor.toString(16);
        if(bHex.length < 2){
            bHex = `0` + bHex;
        }

        colors.push(`#` + rHex + gHex + bHex);
    }
    return colors;
}

makePiechart = function(width, height, pieDataPoints, doSort, showText){
    if(doSort){
        pieDataPoints.sort(function(a,b){return a.value-b.value}).reverse();
    }

    var svg = makeSvg(width, height);
    svg.setAttribute(`viewBox`, `-1 -1 2 2`);
    svg.setAttribute(`style`, `transform: rotate(-0.25turn)`);

    angle = 0;
    valueSum = 0;

    for(pieDataPoint of pieDataPoints){
        valueSum += pieDataPoint.value;
    }

    colors = graphColors(pieDataPoints.length);

    for(var i = 0; i < pieDataPoints.length; i++){
        pieDataPoint = pieDataPoints[i];

        if(i==0){
            pieDataPoint.xStart = 0;
            pieDataPoint.yStart = 1;
        }
        else{
            pieDataPoint.xStart = pieDataPoints[i-1].xEnd;
            pieDataPoint.yStart = pieDataPoints[i-1].yEnd;
        }
        thisAngle = 2*Math.PI*(pieDataPoint.value/valueSum)
        angle += thisAngle;
        pieDataPoint.midAngle = angle - thisAngle/2;
        pieDataPoint.yEnd = Math.cos(angle);
        pieDataPoint.xEnd = Math.sin(angle);

        svg.appendChild(makeSlice(pieDataPoint.xStart,pieDataPoint.yStart,pieDataPoint.xEnd,pieDataPoint.yEnd,pieDataPoint.value/valueSum, colors[i]));

        

    }
    if(showText){
        for(pieDataPoint of pieDataPoints){
            


            var text = document.createElementNS(`http://www.w3.org/2000/svg`, `text`);
            radius = 0.7;
            x=radius*Math.cos(pieDataPoint.midAngle);
            y=radius*Math.sin(pieDataPoint.midAngle);
            text.setAttribute(`x`, x);
            text.setAttribute(`y`, y);
            text.setAttribute(`text-anchor`,`middle`);
            text.setAttribute(`fill`, `white`);
            text.setAttribute(`style`, `font: normal 0.08px sans-serif`);
            text.setAttribute(`transform`, `rotate(90 ${x} ${y})`);
            text.innerHTML = pieDataPoint.name;

            svg.appendChild(text);
        }
    }
    //svg.appendChild(textSvg);
    return svg;
}

makeBarChart = function(totalWidth,height,barDataPoints,doSort,showText){
    if(doSort) {
        barDataPoints.sort(function(a, b){return a.value - b.value}).reverse();
    }
    

    var svg = makeSvg(totalWidth, height);
    var barAmount = barDataPoints.length;
    var colors = graphColors(barDataPoints.length);
    var textSize = (totalWidth+height)/40;
    var textSpace = -(height/40);
    var marginTop = showText ? 0.8 : 0.95;
    var biggestValue = 0;
    
    for(i = 0; i < barAmount; i++){
        if(barDataPoints[i].value > biggestValue)
        {
            biggestValue = barDataPoints[i].value;
        }
    }

    var marginLeft = Math.ceil(Math.log10(biggestValue) + 1)*0.035;
    if(biggestValue/5 < 1){
        marginLeft = Math.ceil(Math.abs(Math.log10(biggestValue/5)) + 2)*0.035;
    }
    var width = totalWidth - marginLeft*totalWidth;
    var f = height / biggestValue;
    f = f * marginTop;


    backgroundLines(svg,biggestValue,totalWidth,height,height*(1-marginTop),0,0,marginLeft);

    
    
    
    switch(barAmount)
    {
        case 1:
        var barsPercent = 0.175;
        break;
        
        case 2:
        var barsPercent = 0.35;
        break;

        case 3:
        var barsPercent = 0.525;
        break;

        default:
        var barsPercent = 0.7;
        var spacePercent = 1 - barsPercent;
        break;
    }

    var barWidth = (width * barsPercent) / barAmount;
    
    if(barAmount < 4) {
        var spaceWidth = (width * 0.06);
    }else {
        var spaceWidth = (width * spacePercent) / (barAmount + 1)
    }

    for(i = 0; i < barAmount; i++) {
        let barHeight = f * barDataPoints[i].value;

        let barXPos = (i + 1) * spaceWidth + (i * barWidth) + marginLeft*totalWidth;
    
        let barYPos = height - barHeight;
        if (showText){
            let valueText = makeText(barXPos+(barWidth/2),barYPos + textSpace,`darkblue`);
            valueText.innerHTML = barDataPoints[i].value; 
            valueText.setAttribute(`text-anchor`, `middle`); 
            valueText.setAttribute(`style`, `font: normal ${textSize}px arial`);  
            svg.appendChild(valueText);
        }
        
        svg.appendChild(makeRectangle(barWidth, barHeight, barXPos, barYPos, colors[i]));
        
    }
    return svg;
}

makeHorizontalBarChart = function(width, height, barHorizontalData, doSort, showText) {
    var svg = makeSvg(width, height);
    var textSize = (height+width)/40;
    var textSpace = -(width/40);

    if(doSort){
        barHorizontalData.sort(function(a,b){
            var aWidth = 0;
            var bWidth = 0;
            for(i = 0; i < a.barWidth.length; i++){
                aWidth += a.barWidth[i];
            }
            for(i = 0; i < b.barWidth.length; i++){
                bWidth += b.barWidth[i];
            }
            return aWidth - bWidth;
        }).reverse();
    }

    barsPercent = 0.5;
    spacePercent = 1-barsPercent;

    barHeight = (barsPercent*height)/barHorizontalData.length;
    spaceHeight = (spacePercent*height)/(barHorizontalData.length+1);
    
    var biggestTotalValue = 0;

    for (var i = 0; i < barHorizontalData.length; i++) {
        var totalValue = 0;
        for (var j = 0; j < barHorizontalData[i].barWidth.length; j++) {
            totalValue += barHorizontalData[i].barWidth[j];
        }
        if (totalValue > biggestTotalValue) {
            biggestTotalValue = totalValue;
        }
    }

    console.log(`Biggest total value: ` + biggestTotalValue);
    var f = width / biggestTotalValue;

    var currentYPos = spaceHeight;
    for (var i = 0; i < barHorizontalData.length; i++) {
        var currentXPos = 0;
        var colors = graphColors(barHorizontalData[i].barWidth.length);

        for (let j = 0; j < barHorizontalData[i].barWidth.length; j++) {
            
            var rectangle = makeRectangle(barHorizontalData[i].barWidth[j] * f, barHeight, currentXPos, currentYPos, colors[j]);
            svg.appendChild(rectangle);
            
            if (showText){
                let valueText = makeText(currentXPos+barHorizontalData[i].barWidth[j]*f/2, currentYPos+barHeight/2, `white`);
                valueText.innerHTML = barHorizontalData[i].barWidth[j]; 
                valueText.setAttribute(`text-anchor`, `middle`); 
                valueText.setAttribute(`style`, `font: normal ${textSize}px arial`);  
                valueText.setAttribute(`dominant-baseline`, `central`);  
                svg.appendChild(valueText);
            }
            
            currentXPos += barHorizontalData[i].barWidth[j] * f;
        }
        
        currentYPos += (spaceHeight + barHeight);
    }

    return svg;
}

makeLineChart = function(width, height, lines){
    svg = makeSvg(width,height);
    colors = graphColors(lines.length);

    xMargin = 0.1*width;
    yMargin = 0.1*height;

    topCoord = topCoord(lines);
    xFactor = (width-xMargin)/topCoord.x;
    yFactor = (height-yMargin)/topCoord.y;

    for(i = 0; i < lines.length; i++){
        var line = lines[i];

        svg.appendChild(makeCircle(xMargin/2 + line[0].x*xFactor, height - yMargin/2 - line[0].y*yFactor, height/40, colors[i]));
        
        for(j = 1; j < line.length; j++){
            coordPrev = line[j-1];
            coordCurr = line[j];

            x1 = xMargin/2 + coordPrev.x*xFactor;
            y1 = height - yMargin/2 - coordPrev.y*yFactor;
            x2 = xMargin/2 + coordCurr.x*xFactor;
            y2 = height - yMargin/2 - coordCurr.y*yFactor;

            svg.appendChild(makeCircle(x2, y2, height/40, colors[i]));

            svg.appendChild(makeLine(x1,y1,x2,y2,height/50,colors[i]));
        }
    }
    return svg;
}

makeLine = function(x1,y1,x2,y2,width,color){
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);

    line.setAttribute("style", `stroke:${color};stroke-width:${width}`);

    return line;
}

backgroundLines = function(svg,topY,width,height,marginTop,marginRight,marginBottom,marginLeft){
    yFactor = (height-marginTop-marginBottom)/topY;
    console.log("height",height-marginTop-marginBottom);
    yStepGoal = topY/5;
    yStep10 = Math.pow(10,Math.round(Math.log10(yStepGoal)));
    yStep = yStep10;

    if(Math.abs(yStepGoal - yStep10/5) < Math.abs(yStepGoal - yStep10)){yStep = yStep10/5;}
    if(Math.abs(yStepGoal - yStep10/2) < Math.abs(yStepGoal - yStep10)){yStep = yStep10/2;}
    if(Math.abs(yStepGoal - yStep10*2) < Math.abs(yStepGoal - yStep10)){yStep = yStep10*2;}
    if(Math.abs(yStepGoal - yStep10*5) < Math.abs(yStepGoal - yStep10)){yStep = yStep10*5;}

    console.log("yStep",yStep);
    numberOfLines = topY/yStep;
    numberOfSpaces = numberOfLines+1;
    for(i = 0; i < numberOfSpaces; i++){
        y = height-marginBottom - yStep*i*yFactor;
        
        if(y<height*0.003){break;}
        
        let text = makeText(width*marginLeft*0.8,y,`#bbbbbb`);
        textNumber = yStep*i;

        if(textNumber < 1){
            numberOfDecimals = Math.ceil(Math.abs(Math.log10(yStep)));
            roundingFactor = Math.pow(10,numberOfDecimals);

            textNumber = Math.round(textNumber*roundingFactor)/roundingFactor;
        }

        text.innerHTML = textNumber;
        if(i != 0){
            text.setAttribute(`dominant-baseline`, `central`);
            svg.appendChild(makeLine(width*marginLeft,y,width,y,height/400,"#bbbbbb"));
        } 
        if(y<height*0.05){
            text.setAttribute(`dominant-baseline`, `hanging`)
        }
        text.setAttribute(`text-anchor`, `end`); 
        text.setAttribute(`style`, `font: normal ${(width+height)/40}px arial`);  
        svg.appendChild(text);
    }
    return svg;
}

topCoord = function(lines){
    topX = 0;
    topY = 0;
    for(line of lines){
        for(coord of line){
            if(coord.x > topX){topX = coord.x}
            if(coord.y > topY){topY = coord.y}
        }
    }

    return new Coord(topX,topY);
}


//  Classes


function BarDataPoint(name, value) {
    this.name = name;
    this.value = value;
}

function PieDataPoint(name, value){
    this.name = name;
    this.value = value;
    this.xStart;
    this.yStart;
    this.xEnd;
    this.yEnd;
    this.midAngle;
}

function Coord(x,y){
    this.x = x;
    this.y = y;
}

var Color = function(r,g,b) {
    this.r = r;
    this.g = g;
    this.b = b;
};*/