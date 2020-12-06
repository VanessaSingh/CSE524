function makeStackedBarChart(){
d3.selectAll("svg").remove();
d3.csv("area_gender_count.csv", function(data) {

var margin = {top: 10, right: 160, bottom: 150, left: 30};

var width = 1500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#stacked-bar-chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right + 10)
  .attr("height", height + margin.top + margin.bottom + 10)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .style("display", "block")
  .style("margin", "auto");
// Transpose the data into layers
var dataset = d3.layout.stack()(["Male", "Female"].map(function(gender) {
  return data.map(function(d) {
    return {x: d.Area, y: +d[gender]};
  });
}));


// Set x, y and colors
var x = d3.scale.ordinal()
  .domain(dataset[0].map(function(d) { return d.x; }))
  .rangeRoundBands([10, width-10], 0.5);

var y = d3.scale.linear()
  .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
  .range([height, 0]);

var colors = ["#1B4F72", "#F1C40F"];


// Define and draw axes
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(5)
  .tickSize(-width, 0, 0)
  .tickFormat( function(d) { return d } );

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");


svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .selectAll("text")
        .style("text-anchor", "end")
        .style("font-size", "0.8rem")
        .attr("dx", "-.8em")
        .attr("dy", "-.2em")
        .attr("transform", "rotate(-60)" );


// Create groups for each series, rects for each segment 
var groups = svg.selectAll("g.cost")
  .data(dataset)
  .enter().append("g")
  .attr("class", "cost")
  .style("fill", function(d, i) { return colors[i]; });
  

var rect = groups.selectAll("rect")
  .data(function(d) { return d; })
  .enter()
  .append("rect")
  .attr("x", function(d) { return x(d.x); })
  .attr("y", function(d) { return y(d.y0 + d.y); })
  .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
  .attr("width", x.rangeBand())
  .attr("colour", function(d, i) { return colors[i]; })
  .on("mouseover", function() { 
    var xPos = +d3.select(this).attr("x")
    var wid = +d3.select(this).attr("width");
        d3.select(this)
        .attr("x", xPos - 5)
        .attr("width", wid + 10);
    tooltip.style("display", null); 
    })
  .on("mouseout", function() { 
    var xPos = +d3.select(this).attr("x")
    var wid = +d3.select(this).attr("width");
        d3.select(this)
        .attr("x", xPos + 5)
        .attr("width", wid - 10);
    tooltip.style("display", "none");
   });
  // .on("mousemove", function(d) {
  //   var xPosition = d3.mouse(this)[0] - 15;
  //   var yPosition = d3.mouse(this)[1] - 25;
  //   tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
  //   tooltip.select("text").text(d.y);
  //});


var legend = svg.selectAll(".legend")
  .data(colors)
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
 
legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", function(d, i) {return colors.slice().reverse()[i];});
 
legend.append("text")
  .attr("x", width + 5)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "start")
  .text(function(d, i) { 
    switch (i) {
      case 0: return "Female";
      case 1: return "Male";
    }
  });


// Prep the tooltip bits, initial display is hidden
// var tooltip = svg.append("g")
//   .attr("class", "tooltip")
//   .style("display", "none");
    
// tooltip.append("rect")
//   .attr("width", 30)
//   .attr("height", 20)
//   .attr("fill", "white")
//   .style("opacity", 0.5);

// tooltip.append("text")
//   .attr("x", 15)
//   .attr("dy", "1.2em")
//   .style("text-anchor", "middle")
//   .attr("font-size", "12px")
//   .attr("font-weight", "bold");


});
}
