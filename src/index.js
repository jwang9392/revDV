import "./styles/index.scss";
import locations from './util/locations';
import {fetchData} from './scripts/fetchData';


window.addEventListener("DOMContentLoaded", () => {
  const title = document.createElement("h1");
  title.classList.add("header-title");
  title.innerHTML = `revDV`;
  document.body.append(title);

  const data = fetchData(locations.Queens.Jamaica[1]);
  console.log(data);
});
