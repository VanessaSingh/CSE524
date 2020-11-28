function makeMap() {

  var w = 900, h = 700;

  var svg = d3.select('#map-area').append('svg')
      .attr('width', w)
      .attr('height', h);
  
  var color_range = d3.scale.linear().range(["#DCEDC8", "#80CBC4"]).interpolate(d3.interpolateLab);

  var states_data = d3.map();

  var tool_tip = d3.tip()
  .attr('class', 'd3-tool_tip')
  .offset([-5, 0])
  .html(function(d) {
      var data = states_data.get(d.properties.name);
      if (data) {
        var tip_msg = data.states + ": " + data.ratio + '\n' + "Male: " + data.male + '\n' + "Female: " + data.female;
        return tip_msg;
      } else {
          return "No school in this state";
      }
      
  })

  svg.call(tool_tip);

  var states_map = d3.geo.albersUsa()
  .scale(900)
  .translate([w / 2, h / 2]);

  var path = d3.geo.path()
  .projection(states_map);


  queue()
      .defer(d3.json, "USA.json")
      .defer(d3.csv, "state_gender_ratio_data.csv", setStatesData) // process
      .await(loadStatesData);

  function setStatesData(d) {
      d.ratio = +d.ratio;
      states_data.set(d.states, d);
      return d;
  }

function getColor(d) {
  var data = states_data.get(d.properties.name);
  if (data) {
      if (data.ratio === 0) {
        return "#330066";    
      } else {
            return color_range(data.ratio * 10);
      }
      
  } else {
      return "#E0F7FA";
  }
}


function loadStatesData(error, usa, ratio) {

  color_range.domain(d3.extent(ratio, function(d) {return d.ratio;}));

  var states = topojson.feature(usa, usa.objects.units).features;

  svg.selectAll('path.states')
      .data(states)
      .enter()
      .append('path')
      .attr('class', 'states')
      .attr('d', path)
      .on('mouseover', tool_tip.show)
      .on('mouseout', tool_tip.hide)
      .attr('fill', function(d,i) {
          return getColor(d);
      })
      .append("title");

  var linear = color_range;

  svg.append("g")
    .attr("class", "legendLinear")
    .attr("transform", "translate(20,20)");

  var legendLinear = d3.legend.color()
    .shapeWidth(30)
    .orient('horizontal')
    .scale(linear);


  svg.select(".legendLinear")
    .call(legendLinear)
    .on('click', function(d, i){
      // alert("hey");
      legendLinear.filter(legendLinear => legendLinear !== d).style('opacity', 0.5);
    });
}
}