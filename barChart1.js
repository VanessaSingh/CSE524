function makeBarChart(data) {
  d3.select("#bar-cit-area").selectAll("svg").remove();
  // d3.select("#cit-bar").remove();
  var margin = { top: 5, right: 10, bottom: 10, left: 50 },
    width = 100 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  var svg = d3.select("#bar-cit-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + 100 + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");


  var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);
  var y = d3.scale.linear().range([height, 0]);

  x.domain(data.map(function (d) { return d.Area; }));
  y.domain([0, 9500]);

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-5, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);
    
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.2em")
    .style("font-size", ".5rem")
    .attr("transform", "rotate(-45)");

  svg.call(tip);

  svg.selectAll("bar")
    .data(data)
    .enter().append("rect")
    .attr("id", "cit-bar")
    .style("fill", "#1B4F72")
    .attr("x", function (d) { return x(d.Area); })
    .attr("width", x.rangeBand())
    .attr("y", function (d) { return y(d.Prof_Count); })
    .attr("height", function (d) { return height - y(d.Prof_Count); })
    .on("mouseover", function (d) {
      d3.select(this).style("fill", "steelblue")
        .attr("x", function (d) { return x(d.Area); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.Prof_Count); })
        .attr("height", function (d) { return (height - y(d.Prof_Count)); })
      tip.html("<span style='color:whiteline'>" + d.Prof_Count + "</span>");
      tip.show();
    })
    .on("mouseout", function (d) {
      d3.select(this).style("fill", '#1B4F72')
        .attr("x", function (d) { return x(d.Area); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.Prof_Count); })
        .attr("height", function (d) { return (height - y(d.Prof_Count)); })
      tip.hide();
    });    
}

function makeBarChart1(data) {

  var margin = { top: 150, right: 30, bottom: 10, left: 30 },
    width = 100 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  var svg = d3.select("#bar-cit-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + 100 + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");


  var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);
  var y = d3.scale.linear().range([height, 0]);

  x.domain(data.map(function (d) { return d.Area; }));
  y.domain([0, 50]);

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-5, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);
    
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.2em")
    .style("font-size", ".5rem")
    .attr("transform", "rotate(-45)");

  svg.call(tip);

  svg.selectAll("bar")
    .data(data)
    .enter().append("rect")
    .attr("id", "h-bar")
    .style("fill", "#1B4F72")
    .attr("x", function (d) { return x(d.Area); })
    .attr("width", x.rangeBand())
    .attr("y", function (d) { return y(d.Prof_Count); })
    .attr("height", function (d) { return height - y(d.Prof_Count); })
    .on("mouseover", function (d) {
      d3.select(this).style("fill", "steelblue")
        .attr("x", function (d) { return x(d.Area); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.Prof_Count); })
        .attr("height", function (d) { return (height - y(d.Prof_Count)); })
      tip.html("<span style='color:whiteline'>" + d.Prof_Count + "</span>");
      tip.show();
    })
    .on("mouseout", function (d) {
      d3.select(this).style("fill", '#1B4F72')
        .attr("x", function (d) { return x(d.Area); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.Prof_Count); })
        .attr("height", function (d) { return (height - y(d.Prof_Count)); })
      tip.hide();
    });    
}



