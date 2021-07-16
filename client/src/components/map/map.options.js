import L from "leaflet";
const TILE_LAYER =
  "http://{s}.sm.mapstack.stamen.com/" +
  "(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/" +
  "{z}/{x}/{y}.png";
const TILE_LAYER_CONFIG = {
  attribution: "Tiles &copy; Esri &mdash;",
};
const BOUNDS = new L.LatLngBounds(
  new L.LatLng(-20.1470544, -78.2535974),
  new L.LatLng(-25.1217061, -71.60004932)
);
const VISCOSITY = 0.1;
const MAX_ZOOM_MAP = 14;
const INITIAL_ZOOM = 5;
const MAP_OPTIONS = {
  zoom: INITIAL_ZOOM,
  center: BOUNDS.getCenter(),
  minZoom: INITIAL_ZOOM - 1,
  maxZoom: MAX_ZOOM_MAP,
  preferCanvas: true,
  maxBoundsViscosity: VISCOSITY,
};
export { TILE_LAYER, TILE_LAYER_CONFIG };
export default MAP_OPTIONS;
