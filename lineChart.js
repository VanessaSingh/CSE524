function makeLineChart(){

d3.selectAll("svg").remove();
// Get the data
// d3.csv("us_non_us_profs.csv", function(data) {


// Get the data
d3.csv("us_non_us_profs.csv", function(data) {
    console.log(data);
    
var	margin = {top: 30, right: 50, bottom: 30, left: 50},
	width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    
var x = d3.scale.ordinal().rangePoints([0, width]);
var	y = d3.scale.linear().range([height, 0]);

var	xAxis = d3.svg.axis().scale(x)
	.orient("bottom").ticks(4);

var	yAxis = d3.svg.axis().scale(y)
	.orient("left").ticks(10);

var	valueline = d3.svg.line()
	.x(function(d) { return x(d.Degree); })
	.y(function(d) { return y(d.USA); });
	
var	valueline2 = d3.svg.line()
	.x(function(d) { return x(d.Degree); })
	.y(function(d) { return y(d.Non_USA); });
  
var	svg = d3.select("#line-chart-area")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Scale the range of the data
    x.domain(data.map(function(d) { return d.Degree; }));
    // x.domain(['BS', 'MS', 'Phd', 'PostDoc']);
	y.domain([0, d3.max(data, function(d) { return Math.max(d.USA, d.Non_USA); })]);

	svg.append("path")		// Add the valueline path.
        .attr("class", "line")
        .style("stroke", "steelblue")
        .style("fill","none")
		.attr("d", valueline(data));

	svg.append("path")		// Add the valueline2 path.
		.attr("class", "line")
        .style("stroke", "red")
        .style("fill","none")
		.attr("d", valueline2(data));

	svg.append("g")			// Add the X Axis
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.append("g")			// Add the Y Axis
		.attr("class", "y axis")
		.call(yAxis);

	svg.append("text")
		.attr("transform", "translate(" + (width+3) + "," + y(data[0].USA) + ")")
		.attr("dy", ".35em")
		.attr("text-anchor", "start")
		.style("fill", "red")
		.text("Non_USA");

	svg.append("text")
		.attr("transform", "translate(" + (width+3) + "," + y(data[0].Non_USA) + ")")
		.attr("dy", ".35em")
		.attr("text-anchor", "start")
		.style("fill", "steelblue")
        .text("USA");
    });

}