const imageWidth = 800;
const imageHeight = 600;
const boxWidth = 150;
const boxHeight = 80;

function updateData(svg, data, time) {
  const filteredData = data.filter(d => d.Time === time);

  const points = svg.selectAll(".heatmap-point")
    .data(filteredData, d => d.Horizontal + d.Vertical);

  points.exit().remove();

  const newPoints = points.enter()
    .append("g")
    .attr("class", "heatmap-point")
    .attr("transform", d => `translate(${imageWidth / 2}, ${imageHeight / 2})`);

  newPoints.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 5)
    .attr("fill", "red")
    .transition()
    .duration(500)
    .attr("cx", d => d.Horizontal)
    .attr("cy", d => d.Vertical);

  newPoints.append("foreignObject")
    .attr("x", 10)
    .attr("y", -boxHeight / 2)
    .attr("width", boxWidth)
    .attr("height", boxHeight)
    .html(d => `
      <div style="max-width: ${boxWidth}px; word-wrap: break-word;">
        <strong>Data:</strong><br>
        Horizontal: ${d.Horizontal}<br>
        Vertical: ${d.Vertical}<br>
        Time: ${d.Time}<br>
      </div>
    `);
}

function startAnimation() {
    d3.text("Data for CSE 478.csv").then(function (data) {
      const parsedData = d3.csvParse(data);
  
      const armstrongHallData = parsedData.filter(d => d.Location === 'Armstrong Hall');
  
      d3.select("#heatmapSVG").select("svg").remove();
  
      const svg = d3.select("#heatmapSVG")
        .append("svg")
        .attr("width", imageWidth)
        .attr("height", imageHeight);
  
      // Load the map image
      svg.append("image")
        .attr("href", "map.png")
        .attr("width", imageWidth)
        .attr("height", imageHeight);
  
      const uniqueTimes = Array.from(new Set(armstrongHallData.map(d => d.Time)));
  
      let index = 0;
      const interval = setInterval(() => {
        updateData(svg, armstrongHallData, uniqueTimes[index]);
  
        index++;
  
        if (index >= uniqueTimes.length) {
          clearInterval(interval);
        }
      }, 1000);
    });
  }