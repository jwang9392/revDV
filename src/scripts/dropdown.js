import { fetchData } from "./api";
import {locations, dataParse, zipLatLong} from "./util";
import {chart} from "./pie";
import {moveToLocation} from "./map";

export const svgDropdown = (locality, parents = []) => {
  debugger
  var svgDD = d3.select("#dropdownSVG");
  const options = {};
  options.locations = locations;
  options.locality = locality;
  options.parents = parents;
  options.container = svgDD;
  options.fontSize = 20;
  options.color = "#333";
  options.fontFamily = "calibri";
  options.x = 0;
  options.y= 0;
  options.optionHeight= 40;
  options.height= 40;
  options.width= 280;
  options.hoverColor= "#0c56f5";
  options.hoverTextColor= "#fff";
  options.backgroundColor= "#fff";
  options.padding = 5;
  options.changeHandler = selection => {
    if (options.parents.length === 2) {
      debugger
      console.log(zipLatLong[selection]);
      let lat = zipLatLong[selection][0];
      let long = zipLatLong[selection][1];
      moveToLocation(lat, long);
      fetchData(selection).then(data => {
        d3.select("#pieSVG").remove();
        let parsed = dataParse(data);
        chart(parsed);
      });
    } else {
      console.log("here")
      let selectionLocales;
      if (options.parents.length === 0) {
        let boro = selection;
        options.parents.push(selection)
        selectionLocales = Object.keys(options.locations[boro]);
        svgDropdown(selectionLocales, options.parents)
      } else if (options.parents.length === 1) {
        let neighborhood = selection;
        options.parents.push(selection)
        let boro = options.parents[0];
        selectionLocales = options.locations[boro][neighborhood];
        svgDropdown(selectionLocales, options.parents)
      }
      
    }
  };

  const svgId = parentSize => {
    if (!parentSize) {
      return "svgBoroDD";
    } else if (parentSize === 1) {
      return "svgNeighborhoodDD";
    } else if (parentSize === 2) {
      return "svgZipDD";
    }
  }
  const g = svgDD
    .append("svg")
    .attr("x", 0)
    .attr("y", 9)
    .attr("shape-rendering", "optimizeSpeed")
    .attr("id", svgId(options.parents.length))
    .append("g")
    .attr("font-family", options.fontFamily);

  let selectedOption = parentSize => {
    if (!parentSize) {
      return "Select a Borough";
    } else if (parentSize === 1) {
      return "Select a Neighborhood";
    } else if (parentSize === 2) {
      return "Select a Zip Code";
    }
  }

  const selectField = g.append("g");

  selectField
    .append("rect")
    .attr("x", "1")
    .attr("width", options.width)
    .attr("height", options.height)
    .attr("class", "option select-field")
    .attr("fill", options.backgroundColor)
    .style("stroke", "#a0a0a0")
    .style("stroke-width", "1");

  const activeText = selectField
    .append("text")
    .text(selectedOption(options.parents.length))
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

  // back button

  const backMessage = () => {
    if (options.parents.length === 1) {
      return "Boroughs"
    } else if (options.parents.length === 2) {
      return "Neighborhoods"
    }
  }
  
  if (options.parents.length > 0) {
    const backField = selectField.append("g")
      .attr("id", "select-back-button");

    backField.append("rect")
      .attr("width", "110")
      .attr("height", options.height)
      .attr("x", options.width + 6)
      .attr("fill", options.backgroundColor)
      .style("stroke", "#a0a0a0")
      .style("stroke-width", "1");

    backField.append("text")
      .text("Back to")
      .attr("width", "110")
      .attr("height", options.height)
      .attr("x", options.width + 10)
      .attr("y", options.height / 2 + options.fontSize / 3 - 8)
      .attr("font-size", options.fontSize / 1.2)
      .attr("fill", options.color)

    backField.append("text")
      .text(backMessage())
      .attr("width", "110")
      .attr("height", options.height)
      .attr("x", options.width + 10)
      .attr("y", options.height / 2 + options.fontSize / 3 + 7)
      .attr("font-size", options.fontSize / 1.2)
      .attr("fill", options.color)

    backField
      .append("rect")
      .attr("width", "110")
      .attr("height", options.height)
      .attr("x", options.width + 10)
      .style("fill", "transparent")
      .on("click", handleBackClick);    
  }

  // rendering options
  const optionGroup = g
    .append("g")
    .attr("id", "option-selectors")
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
    // .attr("x", "1")            <----------- THE ALIGNMENT OF DROPDOWN AND ITS OPTIONS IS OFF BY 1 PX WHEN ZOOMING
    .attr("y", function (d, i) {
      return i * options.optionHeight;
    })
    .attr("class", "option")
    .style("stroke", "#a0a0a0")
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
    // selectedOption = d;
    // activeText.text(selectedOption)
    options.changeHandler.call(this, d);
    optionGroup.attr("display", "none");
  }

  function handleSelectClick() {
    d3.event.stopPropagation();
    const visibility = optionGroup.attr("display") === "block" ? "none" : "block";
    optionGroup.attr("display", visibility);
  }
  
  function handleBackClick() {
    d3.event.stopPropagation();
    let level = "";

    if (options.parents.length === 1) {
      level = "#svgNeighborhoodDD";
    } else if (options.parents.length === 2) {
      level = "#svgZipDD";
    }
    d3.select(level).remove();
    options.parents.pop();
  }
}