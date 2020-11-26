function makeChoroplethMap(){
    var width = 960;
    var height = 500;
    var min_color = '#f9f9f9';
    var max_color = 'bc2a66';
    
    var usa_projection = d3.geoAlbersUSA()
                    .scale([1000]);
    
    var path = d3.geoPath()
                .projection(usa_projection);
    
    // TRY: append to some other div
    var svg = d3.select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", height);
    d3.csv("state_gender_ratio_data.csv", function(d) {
        var arr = [];
        //changed code here
        var male_count, female_count, ratio;
        for (var i = 0; i < d.length; i++) {
            male_count = parseFloat(d[i].male);
            female_count = parseFloat(d[i].female);
            ratio = parseFloat(d[i].ratio);
            arr.push(ratio);
        }

        var min_ratio = d3.min(arr);
        var max_ratio = d3.max(arr);

        //skipping ramp
        
        d3.json("us_states.json", function(j) {

            for (var i = 0; i < d.length; i++) {
                
                var state_data = d[i].state;
                var data_value = d[i].ratio;
                
                for (var k = 0; k < j.features.length; k++) {
                    var state_json = j.features[k].properties.name;
                    if (state_json == state_data) {
                        j.features[k].properties.value = data_value;
                        break;
                    }
                }
            }

            // Bind the data to the SVG and create one path per GeoJSON feature
    svg.selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("stroke", "#fff")
    .style("stroke-width", "1")
    .style("fill", function(d) { return ramp(d.properties.value) });
  
      // add a legend
      var w = 140, h = 300;

      var key = d3.select("body")
          .append("svg")
          .attr("width", w)
          .attr("height", h)
          .attr("class", "legend");

      var legend = key.append("defs")
          .append("svg:linearGradient")
          .attr("id", "gradient")
          .attr("x1", "100%")
          .attr("y1", "0%")
          .attr("x2", "100%")
          .attr("y2", "100%")
          .attr("spreadMethod", "pad");

      legend.append("stop")
          .attr("offset", "0%")
          .attr("stop-color", highColor)
          .attr("stop-opacity", 1);
          
      legend.append("stop")
          .attr("offset", "100%")
          .attr("stop-color", lowColor)
          .attr("stop-opacity", 1);

      key.append("rect")
          .attr("width", w - 100)
          .attr("height", h)
          .style("fill", "url(#gradient)")
          .attr("transform", "translate(0,10)");

      var y = d3.scaleLinear()
          .range([h, 0])
          .domain([minVal, maxVal]);

      var yAxis = d3.axisRight(y);

      key.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(41,10)")
          .call(yAxis)
});
        

    });
  
};