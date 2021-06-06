import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapContainer = () => {
  const mapStyles = {
    height: "400px",
    width: "100%",
    borderRadius: "10px",
  };

  const location = {
    lat: 5.88737,
    lng: 10.01176,
  };

  return (
    <LoadScript googleMapsApiKey={process.env.GG_MAP_API_KEY}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={7} center={location}>
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};
export default MapContainer;
