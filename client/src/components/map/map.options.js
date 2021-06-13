import L from "leaflet";
const token =
  "pk.eyJ1IjoiYW5kcmVzOTYxOSIsImEiOiJjanExdTFodjMwYXQyNDNuMmVvazV6eHBlIn0.kOpHKEx5EBGD8YIXmKRQWA";
const center = new L.LatLng(3.399992, -76.516708);
const TILE_LAYER = `https://api.mapbox.com/styles/v1/andres9619/ckhjmykyt17vf19mx0tn74dzg/tiles/256/{z}/{x}/{y}@2x?access_token=${token}`;
const VISCOSITY = 0.5;
const MAX_ZOOM_MAP = 18;
const INITIAL_ZOOM = 4;
const MAP_OPTIONS = {
  center,
  zoom: INITIAL_ZOOM,
  minZoom: INITIAL_ZOOM,
  maxZoom: MAX_ZOOM_MAP,
  maxBoundsViscosity: VISCOSITY,
};
export { TILE_LAYER };
export default MAP_OPTIONS;
