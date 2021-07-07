// @TODO: YOUR CODE HERE!
// The code for the chart is wrapped inside a function that
// automatically resizes the chart
function makeResponsive() {
    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("#scatter");
    // clear svg is not empty
    if (!svgArea.empty()) {
        svgArea.remove();
    }
    // SVG wrapper dimensions are determined by the current width and
    // height of the browser window.
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;
    var margin = {
        top: 50,
        bottom: 50,
        right: 50,
        left: 50
    };
    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;
    // Append SVG element
    var svg = d3
        .select("#scatter")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);
    // Append group element
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // read in csv and start data function
    d3.csv("../data/data.csv").then(function(statedata){
        //create scales function
        console.log(statedata);
        var xscale = d3.scaleLinear().domain(d3.extent(statedata, d => d.poverty)).range([0,width]);
        var yscale = d3.scaleLinear().domain(d3.extent(statedata, d => d.obesity)).range([height,0]);

        //create axes function
        var bottomAxis = d3.axisBottom(xscale);
        var leftAxis = d3.leftAxis(yscale);

        //append axes to chart group
        chartGroup.append("g").attr("transform",`translate(0,${height}`).call(bottomAxis);
        chartGroup.append("g").call(leftAxis);

        //create circles
        var circlesGroup = chartGroup.selectAll("circle").data(statedata).enter().append("circle")
        .attr("cx", d => xscale(d.poverty))
        .attr("cy", d => yscale(d.obesity))
        .attr("r","15")
        .attr("fill","pink")
        .attr("opacity",".5");

        //initialize tooltip

        //create tooltip in the chart

        //create event listeners to display and hide tooltip

        //create axes labels
    })
    .catch(function(error){
        console.log(error);
    })




}