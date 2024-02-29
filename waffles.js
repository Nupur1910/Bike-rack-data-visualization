const waffleSVG = d3.select('#waffleSVG');
                
                var margin = {top:10,right:100,bottom:30,left:155},
                    width  = 600 - margin.left - margin.right,
                    height = 300 - margin.top - margin.bottom,
                    boxSize = 55, //size of each box
                    boxGap = 5, //space between each box
                    howManyAcross = 5;

                let rackData;
                var svg = d3.select("#waffleSVG")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom));
                var categoryHeading = "Rating";
                var value= "Comment";
                var g = svg.append("g")
                    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

                //rainbow colors
                var colors = d3.scaleSequential(d3.interpolateCubehelixDefault);
                d3.csv('RackUserComments.csv').then(function(data, i){
                    console.log(data);
                    //sort data alphabetically
                data.sort(function(a,b){ return d3.ascending(a[categoryHeading], b[categoryHeading])});
                // SOMETHING HERE IS WRONG FOR COLOR SCALE!
                //get all of the unique values in the column for the scale
                //var keys = d3.map(data, function(d){ return d[categoryHeading];}).keys();
                
                //set domain on category
                //colors.domain([0, keys.length]);

                //convert to a categorical scale
                //var categoryScale = d3.scaleOrdinal(keys.map(function(d, i){ return colors(i);}));
                //.domain(keys);//set the scale domain
                //make the main chart
                const tooltip = d3.select("#waffle-tooltip");
                g.selectAll(".square")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("class", "square")
                    .attr("x", function(d,i){ return boxSize * (i % howManyAcross); })
                    .attr("y", function(d,i){ return Math.floor(i/howManyAcross) * boxSize; })
                    .attr("width", boxSize - 3)
                    .attr("height", boxSize - 3)
                    .attr("fill", function(d){ 
                        if(d[categoryHeading]=="Negative") 
                        {
                            return "red";
                        }
                        else{
                            return "green";
                        }
                    ;})
                    
                    .on("mouseover", function (event, d) {
                      // Display the tooltip on mouseover
                      console.log(d)
                      console.log(d.Comment)
                      tooltip.style("display", "block")
                          .style("left", (event.pageX + 10) + "px")
                          .style("top", (event.pageY - 20) + "px")
                          .style("position", "absolute")
                          .style("background-color", "white")
                          .style("border", 2) 
                          .style("border-radius", 5)
                          .style("padding", 5)
                          .html(`${d.Comment} `+`-${d.Degree}`);
                  })
                  .on("mousemove", function (event, d) {
                      tooltip.style('visibility','visible')
                      // Update the tooltip's position on mousemove
                      tooltip.style("left", (event.pageX + 10) + "px")
                          .style("top", (event.pageY - 20) + "px");
                  })
                  .on("mouseout", function () {
                      // Hide the tooltip on mouseout
                      tooltip.style("visibility", "hidden");
                      
                  })
                    .exit();
                
                });
