function makePieChart() {
    d3.select("input[value=\"opt1\"]").property("checked", true);

    var svg = d3.select("#pie-chart-area")
    .attr("width", "100%")
        .attr("height", "100%")    
        .append("svg")
        .append("g")
        ;
    d3.select("#pie-chart-area").selectAll("svg").attr("width", "100%").attr("height", "100%");
    svg.append("g")
        .attr("class", "slices");
    svg.append("g")
        .attr("class", "label_names");
    svg.append("g")
        .attr("class", "label_values");
    svg.append("g")
        .attr("class", "label_lines");

    var width = 400,
        height = 300,
        radius = Math.min(width, height) / 2;

    var pie = d3.layout.pie()
        .sort(null)
        .value(function (d) {
            return d.value;
        });

    var arc = d3.svg.arc()
        .outerRadius(radius * 0.8)
        .innerRadius(radius * 0.4);

    var outerArc = d3.svg.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

    var legendRectSize = (radius * 0.05);
    var legendSpacing = radius * 0.02;


    var div = d3.select("#pie-chart-area").append("div").attr("class", "toolTip");

    svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scale.ordinal()
        .range(["#1B4F72", "#239B56"]);


    data_categ1 = [
        { label: "Male", value: 83.25 },
        { label: "Female", value: 16.74 }
    ];

    data_categ2 = [
        { label: "Male", value: 85.99 },
        { label: "Female", value: 14.00 }
    ];

    data_categ3 = [
        { label: "Male", value: 80.65 },
        { label: "Female", value: 19.34 }
    ];

    data_categ4 = [
        { label: "Male", value: 88.16 },
        { label: "Female", value: 11.83 }
    ];

    data_categ5 = [
        { label: "Male", value: 81.59 },
        { label: "Female", value: 18.40 }
    ];

    cit_data1 = [
        { Area: "Citations", Prof_Count: 9496 }
    ];

    cit_data2 = [
        { Area: "Citations", Prof_Count: 7126 }
    ];

    cit_data3 = [
        { Area: "Citations", Prof_Count: 5124 }
    ];

    cit_data4 = [
        { Area: "Citations", Prof_Count: 4507 }
    ];

    cit_data5 = [
        { Area: "Citations", Prof_Count: 3335 }
    ];

    h_data1 = [
        { Area: "H-Index", Prof_Count: 41 }
    ];

    h_data2 = [
        { Area: "H-Index", Prof_Count: 37 }
    ];

    h_data3 = [
        { Area: "H-Index", Prof_Count: 31 }
    ];

    h_data4 = [
        { Area: "H-Index", Prof_Count: 31 }
    ];

    h_data5 = [
        { Area: "H-Index", Prof_Count: 26 }
    ];



    change(data_categ1);
    d3.csv("area_gender_count1.csv", function (data) {
        makeStackedBarChart(data);
    });

    d3.csv("research_details_college.csv", function (data) {
        makeParallel(data);
    });

    makeBarChart(cit_data1);
    makeBarChart1(h_data1);

    d3.selectAll("#gender_categ_data")
        .on("change", selectDataset);

    function selectDataset() {
        var value = this.value;

        if (value == "opt1") {
            change(data_categ1);
            d3.csv("area_gender_count1.csv", function (data) {
                makeStackedBarChart(data);
            });
            makeBarChart(cit_data1);
            makeBarChart1(h_data1);
            d3.csv("research_details_college1.csv", function (data) {
                makeParallel(data);
            });
        }
        else if (value == "opt2") {
            change(data_categ2);
            d3.csv("area_gender_count2.csv", function (data) {
                makeStackedBarChart(data);
            });
            makeBarChart(cit_data2);
            makeBarChart1(h_data2);
            d3.csv("research_details_college2.csv", function (data) {
                makeParallel(data);
            });
            
        }
        else if (value == "opt3") {
            change(data_categ3);
            d3.csv("area_gender_count3.csv", function (data) {
                makeStackedBarChart(data);
            });
            makeBarChart(cit_data3);
            makeBarChart1(h_data3);
            d3.csv("research_details_college3.csv", function (data) {
                makeParallel(data);
            });
        }
        else if (value == "opt4") {
            change(data_categ4);
            d3.csv("area_gender_count4.csv", function (data) {
                makeStackedBarChart(data);
            });
            makeBarChart(cit_data4);
            makeBarChart1(h_data4);
            d3.csv("research_details_college4.csv", function (data) {
                makeParallel(data);
            });
        }
        else if (value == "opt5") {
            change(data_categ5);
            d3.csv("area_gender_count5.csv", function (data) {
                makeStackedBarChart(data);
            });
            makeBarChart(cit_data5);
            makeBarChart1(h_data5);
            d3.csv("research_details_college5.csv", function (data) {
                makeParallel(data);
            });
        }
    }

    function change(data) {

        /* ------- PIE SLICES -------*/
        var slice = svg.select(".slices").selectAll("path.slice")
            .data(pie(data), function (d) { return d.data.label });

        slice.enter()
            .insert("path")
            .style("fill", function (d) { return color(d.data.label); })
            .attr("class", "slice");

        slice
            .transition().duration(1000)
            .attrTween("d", function (d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function (t) {
                    return arc(interpolate(t));
                };
            })

        var legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function (d, i) {
                var height = legendRectSize + legendSpacing;
                var offset = height * color.domain().length / 2;
                var horz = -3 * legendRectSize;
                var vert = i * height - offset;
                return 'translate(' + horz + ',' + vert + ')';
            });

        legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', color)
            .style('stroke', color);

        legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function (d) { return d; });

        var text = svg.select(".label_names").selectAll("text")
            .data(pie(data), function (d) { return d.data.label });

        text.enter()
            .append("text")
            .attr("dy", ".35em")
            .text(function (d) {
                return (d.value + "%");
            });

        function midAngle(d) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2;
        }

        text
            .transition().duration(1000)
            .attrTween("transform", function (d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function (t) {
                    var d2 = interpolate(t);
                    var pos = outerArc.centroid(d2);
                    pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                    return "translate(" + pos + ")";
                };
            })
            .styleTween("text-anchor", function (d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function (t) {
                    var d2 = interpolate(t);
                    return midAngle(d2) < Math.PI ? "start" : "end";
                };
            })
            .text(function (d) {
                return (d.value + "%");
            });


        text.exit()
            .remove();


        var polyline = svg.select(".label_lines").selectAll("polyline")
            .data(pie(data), function (d) { return d.data.label });

        polyline.enter()
            .append("polyline");

        polyline.transition().duration(1000)
            .attrTween("points", function (d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function (t) {
                    var d2 = interpolate(t);
                    var pos = outerArc.centroid(d2);
                    pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                    return [arc.centroid(d2), outerArc.centroid(d2), pos];
                };
            });

        polyline.exit()
            .remove();
    };
}