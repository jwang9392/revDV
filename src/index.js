import "./styles/index.scss";
import {svgDropdown} from "./scripts/dropdown";
import {chart} from "./scripts/pie";
import {locations} from './scripts/util'

window.addEventListener("DOMContentLoaded", () => {
  d3.select(".boro-selector")
    .append("svg")
    .attr("id", "dropdownSVG")
    .attr("height", 500)
  const zips = locations.Manhattan["Chelsea and Clinton"];
  svgDropdown(zips);


});