import React from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

export const GoogleMap = GoogleApiWrapper({
  apiKey: "AIzaSyC7xBuCDDl5oBu9STBHrELrpuBWYQGhI5I",
})(({ google }) => {
  return (
    <div className="google-map" style={{ width: "100%", height: "400px" }}>
      <Map
        google={google}
        zoom={18}
        style={{
          width: "100%",
          height: "100%",
        }}
        initialCenter={{
          lat: 46.77,
          lng: 23.5948,
        }}
      >
        <Marker name={"iDesign"}>
          <InfoWindow visible={true}>
            <div>
              <p>{"iDesign"}</p>
            </div>
          </InfoWindow>
        </Marker>
      </Map>
    </div>
  );
});
