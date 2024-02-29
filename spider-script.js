//Creates the margins for the svg
var margin = { top: 50, right: 100, bottom: 100, left: 100 },
    width = Math.min(600, window.innerWidth - margin.left - margin.right),
    height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 100),
    radius = Math.min(width / 2, height / 2),
    rScale = d3.scaleLinear().range([0, radius]).domain([0, 63]),
    angleSlice = Math.PI * 2 / 9;

//Creates the svg
var svg = d3.select("#spider-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + 100)
    .append("g")
    .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

//creates the radarlines
var radarLine = d3.lineRadial()
    .radius(d => rScale(d.value))
    .angle((d, i) => i * angleSlice);

//sets the colors im using
var colorScheme = {
    "Horizontal": "rgba(140, 29, 64, 0.7)", // ASU Maroon with some transparency
    "Vertical": "rgba(255, 198, 39, 0.7)", // ASU Gold with some transparency
    //"Wrong Parking": "rgba(140, 29, 64, 0.7)" // ASU Maroon (or another color if you prefer)
};
// Data arrays for parking types at each location
var horizontalData = [
    { axis: "Armstrong Hall", value: 8.43 },
    { axis: "Bulldog Hall", value: 0.43 },
    { axis: "CAVC", value: 1.33 },
    { axis: "Center Point A", value: 6.25 },
    { axis: "Light Rail", value: 3.4 },
    { axis: "Noble Library", value: 24.67 },
    { axis: "Palo Verde East", value: 38.0 },
    { axis: "Schwada building", value: 21.43 },
    { axis: "Tooker/Palo Verde West", value: 31.0 }
];

var verticalData = [
    { axis: "Armstrong Hall", value: 0.14 },
    { axis: "Bulldog Hall", value: 1.14 },
    { axis: "CAVC", value: 9.0 },
    { axis: "Center Point A", value: 2.0 },
    { axis: "Light Rail", value: 1.0 },
    { axis: "Noble Library", value: 7.0 },
    { axis: "Palo Verde East", value: 7.0 },
    { axis: "Schwada building", value: 0 },
    { axis: "Tooker/Palo Verde West", value: 24.0 }
];
var wrongData = [
    { value: 0.0 }, { value: 0.57 }, { value: 3.67 }, { value: 0.0 }, { value: 0.0 },
    { value: 4.0 }, { value: 3.0 }, { value: 0.0 }, { value: 11.0 }
];
var locationLabels = [
    "Armstrong Hall", "Bulldog Hall", "CAVC", "Center Point A", "Light Rail",
    "Noble Library", "Palo Verde East", "Schwada building", "Tooker/Palo Verde West"
];

//calls all the functions to design the svg and add whats needed
function initRadarChart(horizontalData, verticalData, axisLabels) {
    svg.selectAll("*").remove();
    addBackground();
    drawRadarPolygon(horizontalData, "horizontal", colorScheme["Horizontal"]);
    drawRadarPolygon(verticalData, "vertical", colorScheme["Vertical"]);
    //drawRadarPolygon(wrongData, "wrongParking", colorScheme["Wrong Parking"]);
    drawRadarDots(horizontalData, "horizontal", colorScheme["Horizontal"]);
    drawRadarDots(verticalData, "vertical", colorScheme["Vertical"]);
    //drawRadarDots(wrongData, "wrongParking", colorScheme["Wrong Parking"]);
    drawAxisLabels(axisLabels);
    addLegend();
}
//this function draws all the dots and sets tooltip functions and creating the tooltip
function drawRadarDots(data, className, color) {
    var tooltip = d3.select("#tooltip-spider");

    svg.selectAll("." + className + "-dot")
        .data(data)
        .enter().append("circle")
        .filter(d => d.value > 0) //only draw dots for non-zero values
        .attr("class", className + "-dot")
        .attr("r", 4)
        .attr("cx", (d, i) => {
            var originalIndex = locationLabels.findIndex(label => label === d.axis);
            return rScale(d.value) * Math.cos(angleSlice * originalIndex - Math.PI / 2);
        })
        .attr("cy", (d, i) => {
            var originalIndex = locationLabels.findIndex(label => label === d.axis);
            return rScale(d.value) * Math.sin(angleSlice * originalIndex - Math.PI / 2);
        })
        .style("fill", color)
        .on("mouseover", function(event, d) {
            tooltip.transition().duration(200).style("opacity", 1);
            tooltip.html("Value: " + d.value)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 28) + "px")
                .style("background", color); // Set the tooltip background to the dot's color
        })
        .on("mouseout", function() {
            tooltip.transition().duration(500).style("opacity", 0);
        });
}

//This function draws the polygons/light background areas
function drawRadarPolygon(data, className, color) {
    var filteredPoints = [];
    data.forEach(function(d, i) {
        if (d.value > 0) {
            filteredPoints.push({
                angle: i * angleSlice,
                radius: rScale(d.value)
            });
        }
    });

    var line = d3.lineRadial()
        .angle(d => d.angle)
        .radius(d => d.radius)
        .curve(d3.curveLinearClosed);

    svg.append("path")
        .datum(filteredPoints)
        .attr("class", className)
        .attr("d", line)
        .style("stroke-width", 2)
        .style("stroke", color)
        .style("fill", color)
        .style("fill-opacity", 0.7);
}
rScale = d3.scaleLinear().range([0, radius]).domain([0, 40]);
//This function is in charge of creating the axis lines and the labels for the lines(the numbers)
function addBackground() {
    var levels = 5;
    var maxValue = 40;
    var stepValue = maxValue / levels;

    var levelFactor = radius / levels;
    for (var i = 0; i < levels; i++) {
        var levelValue = stepValue * (i + 1);

        svg.append("circle")
            .attr("r", levelFactor * (i + 1))
            .attr("class", "grid-circle")
            .style("fill", "none")
            .style("stroke", "grey")
            .style("stroke-opacity", 0.75)
            .style("stroke-width", "0.5px");

        svg.append("text")
            .attr("class", "label")
            .attr("x", 5) 
            .attr("y", -levelFactor * (i + 1)) 
            .attr("fill", "#000000") 
            .text(Math.round(levelValue * 10) / 10);
    }

    svg.selectAll(".axis-line")
        .data(d3.range(9))
        .enter().append("line")
        .attr("class", "axis-line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", (d, i) => rScale(40) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y2", (d, i) => rScale(40) * Math.sin(angleSlice * i - Math.PI / 2))
        .attr("stroke", "black")
        .attr("stroke-width", "1px");
}

//draws the radar lines onto the svg and creates the second tooltip/functions to be shown so it feels more interactive
function drawRadarLines(data, className, color) {
    svg.append("path")
        .datum(data)
        .attr("class", className)
        .attr("d", radarLine.curve(d3.curveLinearClosed))
        .style("stroke-width", 2)
        .style("stroke", color)
        .style("fill", color)
        .style("fill-opacity", 0.3);

    var tooltip = d3.select("#tooltip-spider");

    svg.selectAll("." + className + "-hitarea")
        .data(data)
        .enter().append("circle")
        .attr("class", className + "-hitarea")
        .attr("r", 10) 
        .attr("cx", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("cy", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
        .style("fill", "none")
        .style("pointer-events", "all") 
        .on("mouseover", function(event, d) {
            console.log("Mouseover on dot", d);
            tooltip.transition().duration(200).style("opacity", 1);
            tooltip.html("Value: " + d.value)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition().duration(500).style("opacity", 0);
        });

    svg.selectAll("." + className + "-dot")
        .data(data)
        .enter().append("circle")
        .attr("class", className + "-dot")
        .attr("r", 4)
        .attr("cx", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("cy", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
        .style("fill", color)
        .on("mouseover", function(event, d) {
            tooltip.transition().duration(200).style("opacity", 1);
            tooltip.html("Value: " + d.value)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition().duration(500).style("opacity", 0);
        });
}

//draws axis labels onto the chart
function drawAxisLabels(labels) {
    svg.selectAll(".axis-label")
        .data(labels)
        .enter().append("text")
        .attr("class", "axis-label")
        .text(d => d)
        .attr("text-anchor", "middle")
        .attr("x", (d, i) => (radius + 20) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y", (d, i) => {
            var offset = (d === "Sauropod") ? 60 : 20;
            return (radius + offset) * Math.sin(angleSlice * i - Math.PI / 2);
        })
        .style("font-size", "11px");
}

function addLegend() {
    var legendX = margin.left;
    var legendY = margin.top;

    var legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(-130, 350)`);

    var legendItemWidth = 200;
    // Use only the keys from the colorScheme that are being used
    var keys = Object.keys(colorScheme);
    keys.forEach(function(key, index) {
        var legendItem = legend.append("g")
            .attr("class", "legend-item")
            .attr("transform", `translate(${index * legendItemWidth}, 0)`);

        legendItem.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 40)
            .attr("height", 10)
            .style("fill", colorScheme[key]);

        legendItem.append("text")
            .attr("x", 50)
            .attr("y", 10)
            .attr("font-size", "11px")
            .attr("fill", "#000000")
            .text(key);
    });
}

//this block is in charge of updating the chart when the button is clicked as well as initializing the first data set onto the chart upon loading up, also changes legend description
/*var currentDataset = 'first';
function updateChart() {
    var description = document.getElementById('dataset-description');
    if (currentDataset === 'first') {
        initRadarChart(carnivorousData2, herbivorousData2, omnivorousData2, labels2);
        currentDataset = 'second';
        description.textContent = 'Diet vs Length Relationship';
    } else {
        initRadarChart(carnivorousData1, herbivorousData1, omnivorousData1, labels1);
        currentDataset = 'first';
        description.textContent = 'Diet Category Distribution';
    }
}*/
initRadarChart(horizontalData, verticalData, locationLabels);
//document.getElementById('toggleData').addEventListener('click', updateChart);
