import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MAP_OPTIONS, { TILE_LAYER } from "./map.options";
import { makeStyles } from "@material-ui/core/styles";

export default function Map() {
  const myPosition = [3.399995, -76.517272];
  const classes = useStyles();

  const initMarker = (ref) => {
    if (ref && ref.leafletElement) {
      ref.leafletElement.openPopup();
    }
  };
  return (
    <MapContainer
      scrollWheelZoom={false}
      className={classes.map}
      {...MAP_OPTIONS}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={TILE_LAYER}
      />
      <Marker position={myPosition} ref={initMarker}>
        <Popup closeButton>{"I'm here"}</Popup>
      </Marker>
    </MapContainer>
  );
}

const useStyles = makeStyles(() => ({
  map: { height: "80vh", width: "100%" },
  popup: { minWidth: 300 },
}));
