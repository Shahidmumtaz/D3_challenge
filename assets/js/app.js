// @TODO: YOUR CODE HERE!

// Set SVG area dimensions
var svgWidth = 900;
var svgHeight = 600;
// Set the chart's margins as an object
var chartMargin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
};
//  Set dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);
// Append to the SVG area and translate it to right and bottom
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


// Load data from csv
d3.csv("./assets/data/data.csv").then(function(censusData) {
    // Save some arrays
    var states = censusData.map(d => d.state);
    var incomes = censusData.map(d => +d.income);
    var obesities = censusData.map(d => +d.obesity);
    // Display all states in console
    console.log("States: ", states)

    // Create a linear scale 
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(incomes) - 5000, d3.max(incomes) + 5000])
        .range([0, chartWidth])
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(obesities) - 4, d3.max(obesities) + 4])
        .range([chartHeight, 0]);
    // Create chart axis
    var bottomAxis = d3.axisBottom(xLinearScale).ticks(10);
    var leftAxis = d3.axisLeft(yLinearScale).ticks(10);
    chartGroup.append("g")
        .call(leftAxis);
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    // Add data points
    chartGroup.selectAll("circle")
        .data(censusData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(+d.income))
        .attr("cy", d => yLinearScale(+d.obesity))
        .attr("r", 14)
        .style("fill", "aqua")
        .attr("stroke", "#00e6e6");

    // add abreviations for states
    chartGroup.append("g")
        .selectAll("text")
        .data(censusData)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(+d.income))
        .attr("y", d => yLinearScale(+d.obesity) + 5)
        .style("text-anchor", "middle")
        .text(d => d.abbr);

    // text label for the x axis
    svg.append("text")
        .attr("y", svgHeight - 20)
        .attr("x", svgWidth / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Income ($)");
    // text label for the y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x", 0 - (svgHeight / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Obesity (%)");
});
