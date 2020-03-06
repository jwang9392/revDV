export const initMap = () => {

  const options = {
    zoom: 11,
    center: { 
      lat: 40.7118186,
      lng: -74.050329
     }, 
    disableDefaultUI: true
  };

  window.map = new google.maps.Map(document.getElementById("map"), options);
}

export const moveToLocation = (lat, lng) => {
  const center = new google.maps.LatLng(lat, lng);
  window.map.panTo(center);
  window.map.setZoom(15)
}

export const ctaLayer = new google.maps.KmlLayer({
  url: "",
  map: window.map
})