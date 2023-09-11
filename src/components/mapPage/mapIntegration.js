import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import testImage from "../../images/map-marker.png";

function MapIntegration({
  userLat,
  userLon,
  storeDistances,
  centerMapToLocation,
}) {
  const mapInstance = useRef(null);

  useEffect(() => {
    mapInstance.current = tt.map({
      key: process.env.REACT_APP_TOMTOM_API_KEY,
      container: "map",
      center: [centerMapToLocation.lon, centerMapToLocation.lat],
      zoom: userLat && userLon ? 14 : 3,
    });

    storeDistances.forEach((store) => {
      const storeMarker = document.createElement("div");
      storeMarker.style.backgroundImage = `url(${testImage})`;
      storeMarker.style.backgroundSize = "cover";
      storeMarker.style.width = "50px";
      storeMarker.style.height = "50px";
      storeMarker.style.borderRadius = "50%";

      new tt.Marker({ element: storeMarker })
        .setLngLat([store.lon, store.lat])
        .addTo(mapInstance.current);
    });

    mapInstance.current.on("click", (event) => {
      const store = storeDistances.find(
        (s) => s.lon === event.lngLat.lng && s.lat === event.lngLat.lat
      );
      if (store) {
        centerMapToLocation(store.lat, store.lon);
      }
    });
  }, [userLat, userLon, storeDistances]);

  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.flyTo({
        center: [centerMapToLocation.lon, centerMapToLocation.lat],
        zoom: userLat === 39.5 && userLon === -98.35 ? 3 : 14,
      });
    }
  }, [centerMapToLocation]);

  return (
    <div
      id="map"
      className="map"
      style={{ width: "60vw", height: "100%" }}
    ></div>
  );
}

MapIntegration.propTypes = {
  userLat: PropTypes.number.isRequired,
  userLon: PropTypes.number.isRequired,
  storeDistances: PropTypes.array.isRequired,
  centerMapToLocation: PropTypes.object.isRequired,
};

export default MapIntegration;
