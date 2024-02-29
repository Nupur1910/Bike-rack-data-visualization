d3.csv("Data for CSE 478.csv").then(function(data) 
{
      // Extract unique locations for the x-axis
  var locations = [...new Set(data.map(d => d.Location))];

  // Create an array to store the data in a format suitable for a stacked bar chart
  var stackedData = locations.map(location => {
    return {
      location: location,
      horizontal: d3.sum(data.filter(d => d.Location === location), d => +d.Horizontal),
      vertical: d3.sum(data.filter(d => d.Location === location), d => +d.Vertical),
      verticalRackParkedWrong: d3.sum(data.filter(d => d.Location === location), d => +d["Vertical Rack Parked Wrong"])
    };
  });

  // Set up the dimensions for the chart
  var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 1100 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // Create the SVG container
  var svg = d3.select("#barSVG")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Set up the x and y scales
  var x = d3.scaleBand()
    .range([0, width])
    .domain(locations)
    .padding(0.1);

  var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(stackedData, d => d.horizontal + d.vertical + d.verticalRackParkedWrong)]);

  // Set up the color scale for each category
  var color = d3.scaleOrdinal()
    .domain(["horizontal", "vertical", "verticalRackParkedWrong"])
    .range(["#1f77b4", "#ff7f0e", "#2ca02c"]);

  // Stack the data
  var stackedData = d3.stack()
    .keys(["horizontal", "vertical", "verticalRackParkedWrong"])(stackedData);

    var tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

  // Draw the bars
  svg.selectAll(".bar")
    .data(stackedData)
    .enter().append("g")
    .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(d => d)
    .enter().append("rect")
    .attr("x", d => x(d.data.location))
    .attr("y", d => y(d[1]))
    .attr("height", d => y(d[0]) - y(d[1]))
    .attr("width", x.bandwidth())
      .on("mouseover", function (event, d) {
      var category = d3.select(this.parentNode).datum().key; // Get the category (horizontal, vertical, etc.)
      var count = d.data[category]; // Get the count for the specific category
  
      tooltip.transition()
        .duration(200)
        .style("opacity", .9);
  
      tooltip.html(`${category}: ${count}`)
        .style("left", (event.pageX) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function (d) {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });

  // Add x-axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add y-axis
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add legend
  var legend = svg.append("g")
    .attr("transform", "translate(" + (width - 100) + "," + 0 + ")");

  var keys = ["horizontal", "vertical", "verticalRackParkedWrong"];
  keys.forEach((key, i) => {
    legend.append("rect")
      .attr("x", -200)
      .attr("y", i * 20)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", color(key));

    legend.append("text")
      .attr("x", -170)
      .attr("y", i * 20 + 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(key);

  

  });

});
