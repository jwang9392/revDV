import { fetchData } from "./api";
import {dataParse} from "./util";
import {chart} from "./pie";

export const svgDropdown = (locality) => {
  var svgDD = d3.select("#dropdownSVG");
  const options = {};
  options.locality = locality;
  options.container = svgDD;
  options.width = 200;
  options.fontSize = 20;
  options.color = "#333";
  options.fontFamily = "calibri";
  options.x = 0;
  options.y= 0;
  options.optionHeight= 40;
  options.height= 28;
  options.width= 200;
  options.hoverColor= "#0c56f5";
  options.hoverTextColor= "#fff";
  options.backgroundColor= "#fff";
  options.padding = 5;
  options.changeHandler = selection => {
    // document.getElementById("selectedInput").value = option;
    // console.log(selection);
    // return (fetchData(selection));
    fetchData(selection).then(data => {
      let parsed = dataParse(data);
      chart(parsed);
    });
  };

  const g = svgDD
    .append("svg")
    .attr("x", 0)
    .attr("y", 0)
    .attr("shape-rendering", "optimizeSpeed")
    .append("g")
    .attr("transform", "translate(1,1)")
    .attr("font-family", options.fontFamily);

  let selectedOption = options.locality[0];

  const selectField = g.append("g");

  selectField
    .append("rect")
    .attr("width", options.width)
    .attr("height", options.height)
    .attr("class", "option select-field")
    .attr("fill", options.backgroundColor)
    .style("stroke", "#a0a0a0")
    .style("stroke-width", "1");

  const activeText = selectField
    .append("text")
    .text(selectedOption)
    .attr("x", options.padding)
    .attr("y", options.height / 2 + options.fontSize / 3)
    .attr("font-size", options.fontSize)
    .attr("fill", options.color);

  // arrow symbol at the end of the select box
  selectField
    .append("text")
    .text("▼")
    .attr("x", options.width - options.fontSize - options.padding)
    .attr("y", options.height / 2 + (options.fontSize - 2) / 3)
    .attr("font-size", options.fontSize - 2)
    .attr("fill", options.color);

  // transparent surface to capture actions
  selectField
    .append("rect")
    .attr("width", options.width)
    .attr("height", options.height)
    .style("fill", "transparent")
    .on("click", handleSelectClick);

  // rendering options
  const optionGroup = g
    .append("g")
    .attr("transform", `translate(0, ${options.height})`)
    .attr("opacity", 0); //.attr("display", "none"); Issue in IE/Firefox: Unable to calculate textLength when display is none.

  // Rendering options group
  const optionEnter = optionGroup
    .selectAll("g")
    .data(options.locality)
    .enter()
    .append("g")
    .on("click", handleOptionClick);

  // Rendering background
  optionEnter
    .append("rect")
    .attr("width", options.width)
    .attr("height", options.optionHeight)
    .attr("y", function (d, i) {
      return i * options.optionHeight;
    })
    .attr("class", "option")
    .style("stroke", options.hoverColor)
    .style("stroke-dasharray", (d, i) => {
      let stroke = [
        0,
        options.width,
        options.optionHeight,
        options.width,
        options.optionHeight
      ];
      if (i === 0) {
        stroke = [
          options.width + options.optionHeight,
          options.width,
          options.optionHeight
        ];
      } else if (i === options.locality.length - 1) {
        stroke = [0, options.width, options.optionHeight * 2 + options.width];
      }
      return stroke.join(" ");
    })
    .style("stroke-width", 1)
    .style("fill", options.backgroundColor);

  optionEnter
    .append("text")
    .attr("x", options.padding)
    .attr("y", function (d, i) {
      return (
        i * options.optionHeight +
        options.optionHeight / 2 +
        options.fontSize / 3
      );
    })
    .text(function (d) {
      return d;
    })
    .attr("font-size", options.fontSize)
    .attr("fill", options.color)

  optionEnter
    .append("rect")
    .attr("width", options.width)
    .attr("height", options.optionHeight)
    .attr("y", function (d, i) {
      return i * options.optionHeight;
    })
    .style("fill", "transparent")
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

  optionGroup.attr("display", "none").attr("opacity", 1);

  d3.select("body").on("click", function () {
    optionGroup.attr("display", "none");
  });

  function handleMouseOver() {
    d3.select(d3.event.target.parentNode)
      .select(".option")
      .style("fill", options.hoverColor);

    d3.select(d3.event.target.parentNode)
      .select("text")
      .style("fill", options.hoverTextColor);
  }

  function handleMouseOut() {
    d3.select(d3.event.target.parentNode)
      .select(".option")
      .style("fill", options.backgroundColor);

    d3.select(d3.event.target.parentNode)
      .select("text")
      .style("fill", options.color);
  }

  function handleOptionClick(d) {
    d3.event.stopPropagation();
    selectedOption = d;
    activeText.text(selectedOption)
    options.changeHandler.call(this, d);
    optionGroup.attr("display", "none");
  }

  function handleSelectClick() {
    d3.event.stopPropagation();
    const visibility = optionGroup.attr("display") === "block" ? "none" : "block";
    optionGroup.attr("display", visibility);
  }

}
