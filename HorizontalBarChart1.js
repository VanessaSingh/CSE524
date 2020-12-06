function makeHorizontalBarChart() {

    var barPadding = 0.2;
    var barPaddingOuter = 0.1;

    var xColumn = "Count";
    var yColumn = "Country";
    // var xAxisLabelText = "Population";
    // var xAxisLabelOffset = 75;

    var width  = 600;
    var height = 410;

    var svg = d3.select("#horizontal-bar-chart-area").append("svg")
      .attr("width",  width)
      .attr("height", height);
    var g = svg.append("g")
      .attr("transform", "translate(100, 0)");
    var xAxisG = g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      
    // var xAxisLabel = xAxisG.append("text")
    //   .style("text-anchor", "middle")
    //   .attr("x", width / 2)
    //   .attr("y", xAxisLabelOffset)
    //   .attr("class", "label")
    //   .text(xAxisLabelText);
    var yAxisG = g.append("g")
      .attr("class", "y axis");

    var xScale = d3.scale.linear().range([0, width]);
    var yScale = d3.scale.ordinal().rangeRoundBands([0, height], barPadding, barPaddingOuter);

    var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
      .ticks(5)
      .tickFormat(d3.format("s"))
      .outerTickSize(1);
    var yAxis = d3.svg.axis().scale(yScale).orient("left")
      .outerTickSize(1);

    function render(data){

      xScale.domain([0, d3.max(data, function (d){ return d[xColumn]; })]);
      yScale.domain(data.map( function (d){ return d[yColumn]; }));

      xAxisG.call(xAxis);
      yAxisG.call(yAxis);

      var bars = g.selectAll("rect").data(data);
      bars.enter().append("rect")
        .attr("height", yScale.rangeBand());
      bars
        .attr("x", 0)
        .attr("y",     function (d){ return yScale(d[yColumn]); })
        .attr("width", function (d){ return xScale(d[xColumn]); })
        .style("fill", "#1B4F72")
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.2em")
            .style("font-size", ".8rem")
            .attr("transform", "rotate(-45)" );;
      bars.exit().remove();

    }

    function type(d){
      d.Count = +d.Count;
      return d;
    }

    d3.csv("popular_countries_non_USA_BS.csv", type, render);
    d3.selectAll("input")
    .on("change", selectDataset);

    function selectDataset() {
        var value = this.value;
        if (value == "opt1") {
            d3.csv("popular_countries_non_USA_BS.csv", type, render);
        }
        else if (value == "opt2") {
            d3.csv("popular_countries_non_USA_MS.csv", type, render);
        }
        else if (value == "opt3") {
          d3.csv("popular_countries_non_USA_Phd.csv", type, render);
      }
    }

    
}