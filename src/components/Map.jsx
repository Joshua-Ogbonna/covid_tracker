import React from "react";
// import { TileLayer } from 'react-leaflet'
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from "../utils";
import { ChangeMap } from "./ChangeMap";
import "./Map.css";

function Map({ center, zoom, countries, casesType }) {
  return (
    <div className="container map">
      <LeafletMap center={center} zoom={zoom}>
      <ChangeMap center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy;{" "}<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        { showDataOnMap(countries, casesType) }
      </LeafletMap>
    </div>
  );
}

export default Map;
