
// Load the data from the CSV file
d3.csv("Data for CSE 478.csv").then(function(data) {

    // Extract the counts for each category
    var horizontalCount = d3.sum(data, function(d) { return +d.Horizontal; });
    var verticalCount = d3.sum(data, function(d) { return +d.Vertical; });
    var wrongCount = d3.sum(data, function(d) { return +d['Vertical Rack Parked Wrong']; });
  
    // Combine the counts into an array
    var counts = [horizontalCount, verticalCount, wrongCount];
  
    // Set up the pie chart dimensions
    var width = 500;
    var height = 300;
    var radius = Math.min(width, height) / 2;
  
    // Set up the color scale
    var color = d3.scaleOrdinal(d3.schemeSet3)
      .domain(["Horizontal", "Vertical", "Parked Wrong"]);
  
    // Create the pie chart
    var pie = d3.pie();
    var arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);
  
    var svg = d3.select("#pieSVG")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
    var arcs = svg.selectAll("arc")
      .data(pie(counts))
      .enter()
      .append("g")
      .attr("class", "arc");
  
    var tooltip = d3.select("#tooltip-pie");

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", function(d, i) { return color(i); })
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .on("mouseover", function(event, d) {
          //get the color of the current arc
          var arcColor = color(d.index);

          //dhow the tooltip on mouseover with the arc's color as background
          tooltip.style("visibility", "visible")
                 .style("background-color", arcColor)
                 .text((["Parked in Horizontal racks", "Parked in Vertical racks", "Vertical racks Parked Wrong"][d.index]) + ": " + d.data);

          //update the border thickness
          d3.select(this).attr("stroke-width", 4);
      })
      .on("mousemove", function(event) {
          // Position the tooltip near the mouse cursor
          tooltip.style("top", (event.pageY - 10) + "px")
                 .style("left",(event.pageX + 10) + "px");
      })
      .on("mouseout", function() {
          // Hide the tooltip and reset border thickness on mouseout
          tooltip.style("visibility", "hidden");
          d3.select(this).attr("stroke-width", 1);
      });
});

  
