import "./styles/index.scss";
import {initMap, ctaLayer} from "./scripts/map";
import {svgDropdown} from "./scripts/dropdown";
import {locations} from './scripts/util'

window.addEventListener("DOMContentLoaded", () => {
  initMap();
  
  d3.select(".boro-selector")
    .append("svg")
    .attr("id", "dropdownSVG")
    .attr("height", 500)
    .attr("width", 200)
  const zips = locations.Manhattan["Chelsea and Clinton"];
  svgDropdown(zips);
debugger

});