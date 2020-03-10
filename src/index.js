import "./styles/index.scss";
import {initMap, ctaLayer} from "./scripts/map";
import {svgDropdown, testDD} from "./scripts/dropdown";
import {locations} from './scripts/util';
import {fetchZipData} from './scripts/api';

window.addEventListener("DOMContentLoaded", () => {
  initMap();
  const dropdown = d3.select(".boro-selector")
    dropdown.append("svg")
    .attr("id", "dropdownSVG")
    .attr("height", 500)
    .attr("width", 320)
  
  const boroughs = Object.keys(locations);
  const zips = locations.Manhattan["Chelsea and Clinton"];
  // const zipData = fetchZipData();
  debugger
  svgDropdown(boroughs);
  debugger
});