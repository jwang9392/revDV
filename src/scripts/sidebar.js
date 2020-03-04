import locations from "../util/locations";

var svg = d3.select("body").append("svg");

svg.attr("width", 250);
svg.attr("height", 250);
// svg.attr()

var rect = svg.append("rect");

rect.attr("x", 50);
rect.attr("y", 50);
rect.append("style", "fill:blue");
rect.attr("width", 80);
rect.attr("height", 80);