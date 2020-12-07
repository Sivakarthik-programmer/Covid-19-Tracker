import React from 'react';
import { TileLayer, MapContainer as LeafletMap, useMap } from "react-leaflet";
import './Map.css';
import { showDataOnMap } from './util';


function ChangeMap({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

function Map({ countries, caseType, center, zoom }) {
    return (
        <div className="map">
            <LeafletMap>
                <ChangeMap center={center} zoom={zoom} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                ></TileLayer>
                {showDataOnMap(countries, caseType)}
            </LeafletMap>
        </div>
    );
}

// eslint-disable-next-line no-lone-blocks
{/*function Map({ countries, caseType, center, zoom }) {
    return (
        <div className='map'>
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(countries, caseType)}
            </LeafletMap>
        </div>
    );
}*/}

export default Map;







/*import React from "react";
import "./Map.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { showDataOnMap } from "./util";
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

function Map({ countries, casesType, center, zoom, selectedCountry }) {
  const iconMarkup = renderToStaticMarkup(
    <i className=" fa fa-map-marker-alt fa-3x" />
  );
  const customMarkerIcon = divIcon({
    html: iconMarkup,
  });
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} animate={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesType, selectedCountry)}
        {selectedCountry !== "worldwide" && (
          <Marker position={center} icon={customMarkerIcon}></Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default Map;
*/