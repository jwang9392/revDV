export const initMap = () => {

  const options = {
    zoom: 11,
    center: { 
      lat: 40.7118186,
      lng: -74.050329
     }
  };

  const map = new google.maps.Map(document.getElementById("map"), options);
}