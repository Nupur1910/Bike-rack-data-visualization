var svg = d3.select("#timeArc") 
.append("g") 
.attr("transform", "translate(200,200)"); 
var verticalSeconds=88
var horizontalSeconds=44
// An arc will be created 
function drawArcPlot(){
var svg = d3.select("#timeArc").selectAll("g").data([null]);
svg.enter().append("g")
.attr("transform", "translate(150,150)")
.merge(svg)
.selectAll("*").remove();
const timeDropdown = d3.select('#timeDropdown').property('value');
if(timeDropdown=="Simple Bike Lockup Times")
{
verticalSeconds=41
horizontalSeconds=21
document.getElementById("Time Text").innerHTML="Lockup Time For Horizontal= 0:21<br>Lockup Time For Vertical = 0:41";
}
else{
verticalSeconds=88
horizontalSeconds=44
document.getElementById("Time Text").innerHTML="Lockup Time For Horizontal= 0:44<br>Lockup Time For Vertical = 1:28";
}
var horizontalArc = d3.arc() 
.innerRadius(0) 
.outerRadius(90) 
.startAngle(0) 
.endAngle(function () { 
    return horizontalSeconds/60*(Math.PI * 2)}); 
var verticalArc = d3.arc() 
  .innerRadius(0) 
  .outerRadius(100) 
  .startAngle(0) 
  .endAngle(function () { 
    if(verticalSeconds>60)
    {return Math.PI * 2}
    else{
      return verticalSeconds/60*(Math.PI * 2)
    }
    ;}); 
var verticalArc2 = d3.arc() 
  .innerRadius(100) 
  .outerRadius(200) 
  .startAngle(0)
  .endAngle(function () {
    if(verticalSeconds>60)
    {return Math.PI*2*(verticalSeconds-60)/60}
    else
    {return 0}
  }); 
svg.append("path") 
  .attr("class", "arc") 
  .attr("d", verticalArc) 
  .attr("fill","red"); 
svg.append("path") 
  .attr("class", "arc") 
  .attr("d", verticalArc2) 
  .attr("fill","red"); 
svg.append("path") 
  .attr("class", "arc") 
  .attr("d", horizontalArc) 
  .attr("fill","blue"); 

}
drawArcPlot()
