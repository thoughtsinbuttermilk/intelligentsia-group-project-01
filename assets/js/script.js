// Initialize and add the map
let map;

async function initMap() {
  // Starting location
  const position = {lat: 41.9666998, lng: -87.6466127};
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at a location
  map = new Map(document.getElementById("map"), {
    zoom: 16,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // Map marker
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Wilson",
  });
}

initMap();