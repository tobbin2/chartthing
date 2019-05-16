var animationDuration = 0.5;

export function makeSvg(width,height) {
    let svg = document.createElementNS(`http://www.w3.org/2000/svg`, `svg`);
    svg.setAttribute(`width`, width);
    svg.setAttribute(`height`, height);

    return svg;
}

export function makeCircle(x,y,r,color){
    var circle = document.createElementNS(`http://www.w3.org/2000/svg`, `circle`);
    circle.setAttribute(`cx`, x);
    circle.setAttribute(`cy`, y);
    circle.setAttribute(`r`, r);
    circle.setAttribute(`fill`, color);

    return circle;
}

export function makeSlice(radius, xStart,yStart,xEnd,yEnd,percent,color){
    var slice = document.createElementNS(`http://www.w3.org/2000/svg`, `path`);
    const xRadius = radius;
    const yRadius = radius;
    const xAxisRotation = 0;
    const largeArcFlag = (percent <= 0.5 ? `0` : `1`);
    const sweepFlag = 1;
    const xCenter = 0;
    const yCenter = 0;
    
    slice.setAttribute(`d`,`M ${yStart} ${xStart} A ${yRadius} ${xRadius} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${yEnd} ${xEnd} L ${yCenter} ${xCenter}`);
    slice.setAttribute(`fill`, color);
    
    return slice;
}

export function makeRectangle(x,y,width,height,color) {
    var box = document.createElementNS(`http://www.w3.org/2000/svg`, `rect`);
    box.setAttribute(`width`, width);
    box.setAttribute(`height`, height);
    box.setAttribute(`x`, x);
    box.setAttribute(`y`, y);
    box.setAttribute(`style`, `fill:` + color);

    return box;
}

export function makeText(x,y,color) {
    var text = document.createElementNS(`http://www.w3.org/2000/svg`, `text`);
    text.setAttribute(`x`, x);
    text.setAttribute(`y`, y);
    text.setAttribute(`fill`, color);

    return text;
}

export function makeLine(x1,y1,x2,y2,width,color){
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);

    line.setAttribute("style", `stroke:${color};stroke-width:${width}`);

    return line;
}

export function makeAnimation(attributeName,from,to,animationDuration,delay){
    var animate = document.createElementNS(`http://www.w3.org/2000/svg`, `animate`);
    animate.setAttribute("attributeName",attributeName);
    animate.setAttribute("from",from);
    animate.setAttribute("to",to);
    animate.setAttribute("dur",animationDuration);
    animate.setAttribute("keyTimes","0;1");
    animate.setAttribute("calcMode","spline");
    //animate.setAttribute("keySplines",".65 .15 .35 .85");
    animate.setAttribute("keySplines",".3 0 .3 1");
    animate.setAttribute("begin",delay);
    animate.setAttribute("fill","freeze");

    return animate;
}

export function graphColors(amount){

    var startColor = {r:0,g:71,b:122};
    var endColor = {r:0,g:226,b:242};

    var colors = [];
    for(var i = 0; i < amount; i++){
        var rColor = Math.round(startColor.r + (i+1)*((endColor.r-startColor.r)/(amount+1)));
        var gColor = Math.round(startColor.g + (i+1)*((endColor.g-startColor.g)/(amount+1)));
        var bColor = Math.round(startColor.b + (i+1)*((endColor.b-startColor.b)/(amount+1)));

        var rHex = rColor.toString(16);
        if(rHex.length < 2){
            rHex = `0` + rHex;
        }
        var gHex = gColor.toString(16);
        if(gHex.length < 2){
            gHex = `0` + gHex;
        }
        var bHex = bColor.toString(16);
        if(bHex.length < 2){
            bHex = `0` + bHex;
        }

        colors.push(`#` + rHex + gHex + bHex);
    }
    return colors;
}

export function makePiechart(width, height, pieDataPoints, doSort, showText){
    if(doSort){
        pieDataPoints.sort(function(a,b){return a.value-b.value}).reverse();
    }

    var svg = makeSvg(width, height);
    svg.setAttribute(`viewBox`, `-1 -1 2 2`);
    svg.setAttribute(`style`, `transform: rotate(-0.25turn)`);

    var radius = 1;
    var angle = 0;
    var valueSum = 0;

    for(var pieDataPoint of pieDataPoints){
        valueSum += pieDataPoint.value;
    }

    var colors = graphColors(pieDataPoints.length);

    for(var i = 0; i < pieDataPoints.length; i++){
        pieDataPoint = pieDataPoints[i];

        if(i==0){
            pieDataPoint.xStart = 0;
            pieDataPoint.yStart = radius;
        }
        else{
            pieDataPoint.xStart = pieDataPoints[i-1].xEnd;
            pieDataPoint.yStart = pieDataPoints[i-1].yEnd;
        }
        var thisAngle = 2*Math.PI*(pieDataPoint.value/valueSum)
        angle += thisAngle;
        pieDataPoint.midAngle = angle - thisAngle/2;
        pieDataPoint.yEnd = Math.cos(angle) * radius;
        pieDataPoint.xEnd = Math.sin(angle) * radius;

        var slice = makeSlice(radius, pieDataPoint.xStart,pieDataPoint.yStart,pieDataPoint.xEnd,pieDataPoint.yEnd,pieDataPoint.value/valueSum, colors[i]);
        
        slice.appendChild(makeAnimation("d",makeSlice(0, 0,0,0,0,pieDataPoint.value/valueSum, colors[i]).getAttribute("d"),slice.getAttribute("d"),animationDuration,0));

        svg.appendChild(slice);

        
        if(showText) {
            var textRadius = 0.7;
            var midAngle = angle - thisAngle/2;
            var x=textRadius*Math.cos(midAngle);
            var y=textRadius*Math.sin(midAngle);
            var textSize = height/2000;

            var text = makeText(x,y,"white");

            text.setAttribute(`text-anchor`,`middle`);
            text.setAttribute(`style`, `font: normal ${0}px sans-serif`);
            text.setAttribute(`transform`, `rotate(90 ${x} ${y})`);
            text.innerHTML = pieDataPoints[i].value;
            text.appendChild(makeAnimation("font-size",0,textSize,animationDuration/2,animationDuration/2));
            

            svg.appendChild(text);
        }
    }

    return svg;
}

export function makeBarChart(totalWidth,height,barDataPoints,doSort,showText){
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

    for(var i = 0; i < barAmount; i++) {
        let barHeight = f * barDataPoints[i].value;

        let barXPos = (i + 1) * spaceWidth + (i * barWidth) + marginLeft*totalWidth;
    
        let barYPos = height - barHeight;
        if (showText){
            let valueText = makeText(barXPos+(barWidth/2),barYPos + textSpace,`darkblue`);
            valueText.innerHTML = barDataPoints[i].value; 
            valueText.setAttribute(`text-anchor`, `middle`); 
            valueText.setAttribute(`style`, `font: normal ${textSize}px arial`);  
            valueText.appendChild(makeAnimation("y",height + textSpace, (barYPos + textSpace), animationDuration,0));
            svg.appendChild(valueText);
        }

        var rect = makeRectangle(barXPos, barYPos, barWidth, barHeight, colors[i]);
                
        rect.appendChild(makeAnimation("height",0, barHeight, animationDuration,0));
        rect.appendChild(makeAnimation("y",height, height - barHeight, animationDuration,0));
        
        svg.appendChild(rect);        
    }

    return svg;
}

export function makeHorizontalBarChart(width, height, barHorizontalData, doSort, showText) {
    var svg = makeSvg(width, height);
    var textSize = (height+width)/40;

    if(doSort){
        barHorizontalData.sort(function(a,b){
            var aWidth = 0;
            var bWidth = 0;
            for(var i = 0; i < a.barWidth.length; i++){
                aWidth += a.barWidth[i];
            }
            for(var i = 0; i < b.barWidth.length; i++){
                bWidth += b.barWidth[i];
            }
            return aWidth - bWidth;
        }).reverse();
    }

    var barsPercent = 0.5;
    var spacePercent = 1-barsPercent;

    var barHeight = (barsPercent*height)/barHorizontalData.length;
    var spaceHeight = (spacePercent*height)/(barHorizontalData.length+1);
    
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

    var f = width / biggestTotalValue;

    var currentYPos = spaceHeight;
    for (var i = 0; i < barHorizontalData.length; i++) {
        var currentXPos = 0;
        var numberOfSections = barHorizontalData[i].barWidth.length
        var colors = graphColors(numberOfSections);

        for (let j = 0; j < barHorizontalData[i].barWidth.length; j++) {
            
            var barWidth = barHorizontalData[i].barWidth[j];
            var rectangle = makeRectangle(currentXPos,currentYPos,barWidth * f, barHeight, colors[j]);
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

    var animationRectangle = makeRectangle(0,0,width,height,"white");
    animationRectangle.appendChild(makeAnimation("width",width,0,animationDuration,0));
    animationRectangle.appendChild(makeAnimation("x",0,width,animationDuration,0));
    svg.appendChild(animationRectangle);

    return svg;
}

export function makeLineChart(width, height, lines){
    var svg = makeSvg(width,height);
    var colors = graphColors(lines.length);

    var xMargin = 0.1*width;
    var yMargin = 0.1*height;
    var circleSize = height/40;

    var topCoord = getTopCoord(lines);
    var xFactor = (width-xMargin)/topCoord.x;
    var yFactor = (height-yMargin)/topCoord.y;

    for(var i = 0; i < lines.length; i++){
        var line = lines[i];

        animationDuration /= (line.length-1);

        let circle = makeCircle(xMargin/2 + line[0].x*xFactor, height - yMargin/2 - line[0].y*yFactor, 0, colors[i]);
        circle.appendChild(makeAnimation("r", 0, circleSize, animationDuration/5,0));
        svg.appendChild(circle);
        
        for(var j = 1; j < line.length; j++){
            var coordPrev = line[j-1];
            var coordCurr = line[j];

            var x1 = xMargin/2 + coordPrev.x*xFactor;
            var y1 = height - yMargin/2 - coordPrev.y*yFactor;
            var x2 = xMargin/2 + coordCurr.x*xFactor;
            var y2 = height - yMargin/2 - coordCurr.y*yFactor;

            let circle = makeCircle(x2, y2, 0, colors[i])
            circle.appendChild(makeAnimation("r", 0, circleSize, animationDuration/5,animationDuration*(j)));
            svg.appendChild(circle);

            let lineWidth = height/50;
            let svgLine = makeLine(x1,y1,x1,y1,lineWidth,colors[i]);
            svgLine.appendChild(makeAnimation("x2",x1,x2,animationDuration,animationDuration*(j-1)));
            svgLine.appendChild(makeAnimation("y2",y1,y2,animationDuration,animationDuration*(j-1)));
            svg.appendChild(svgLine);
        }

        animationDuration *= (line.length-1);
    }

    return svg;    
}

export function makeAreaGraph(width, height, lines){
    var svg = makeSvg(width,height);
    var colors = graphColors(lines.length);

    var xMargin = 0.1*width;
    var yMargin = 0.1*height;

    var topCoord = getTopCoord(lines);

    var xFactor = (width-xMargin)/topCoord.x;
    var yFactor = (height-yMargin)/topCoord.y;

    for(var i = 0; i < lines.length; i++){
        var line = lines[i];

        var area = document.createElementNS(`http://www.w3.org/2000/svg`, `path`);

        var pathStringTo = `M 0 ${height}`
        var pathStringFrom = `M 0 ${height}`
    
        
        
        for(var j = 0; j < line.length; j++){
            var y = height - line[j].y*yFactor
            pathStringTo += ` L ${line[j].x*xFactor} ${y}`
            pathStringFrom += ` L ${line[j].x*xFactor} ${height}`
        }

        pathStringTo += ` L ${line[line.length-1].x*xFactor} ${height}`
        pathStringFrom += ` L ${line[line.length-1].x*xFactor} ${height}`


        area.setAttribute(`d`,pathStringFrom);
        area.setAttribute(`fill`, colors[i]);
        area.appendChild(makeAnimation("d", pathStringFrom, pathStringTo, animationDuration/2, (animationDuration/2)/lines.length*i));

        svg.appendChild(area);
    }
    return svg;
}

export function backgroundLines(svg,topY,width,height,marginTop,marginRight,marginBottom,marginLeft){
    var yFactor = (height-marginTop-marginBottom)/topY;
    var yStepGoal = topY/5;
    var yStep10 = Math.pow(10,Math.round(Math.log10(yStepGoal)));
    var yStep = yStep10;

    if(Math.abs(yStepGoal - yStep10/5) < Math.abs(yStepGoal - yStep10)){yStep = yStep10/5;}
    if(Math.abs(yStepGoal - yStep10/2) < Math.abs(yStepGoal - yStep10)){yStep = yStep10/2;}
    if(Math.abs(yStepGoal - yStep10*2) < Math.abs(yStepGoal - yStep10)){yStep = yStep10*2;}
    if(Math.abs(yStepGoal - yStep10*5) < Math.abs(yStepGoal - yStep10)){yStep = yStep10*5;}

    var numberOfLines = topY/yStep;
    var numberOfSpaces = numberOfLines+1;
    for(var i = 0; i < numberOfSpaces; i++){
        var y = height-marginBottom - yStep*i*yFactor;
        
        if(y<height*0.003){break;}
        
        let text = makeText(width*marginLeft*0.8,y,`#bbbbbb`);
        var textNumber = yStep*i;

        if(textNumber < 1){
            var numberOfDecimals = Math.ceil(Math.abs(Math.log10(yStep)));
            var roundingFactor = Math.pow(10,numberOfDecimals);

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

export function getTopCoord(lines){
    var topX = 0;
    var topY = 0;
    for(var line of lines){
        for(var coord of line){
            if(coord.x > topX){topX = coord.x}
            if(coord.y > topY){topY = coord.y}
        }
    }

    return {x:topX,y:topY};
}