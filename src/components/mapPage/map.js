import React, { useEffect, useState, useCallback } from "react";
import MapIntegration from "./mapIntegration";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import Navbar from "../navbar/navbar";
import InfoOverlay from "./infoOverlay";
import Icon from "@mdi/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

import {
  mdiMagnify,
  mdiInformationOutline,
  mdiStorefrontOutline,
  mdiCar,
} from "@mdi/js";

function Map({ logoData, storeLocations, updateUserSelectedStore }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [userLocation, setUserLocation] = useState({ lat: 39.5, lon: -98.35 });
  const [storeDistances, setStoreDistances] = useState([]);
  const [sortedStoreDistances, setSortedStoreDistances] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);
  const [selectedStoreIndex, setSelectedStoreIndex] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [hasSetLocation, setHasSetLocation] = useState(false);
  const [loading, setLoading] = useState(false);

  let location = useLocation();

  const centerMapToLocation = (index, lat, lon) => {
    setSelectedStoreIndex(index);
    setMapCenter({ lat, lon });
  };

  const apiKey = process.env.REACT_APP_TOMTOM_API_KEY;

  const handleDropdownSelect = useCallback((selectedOption) => {
    setLoading(true);
    setMapCenter(null);
    if (selectedOption.value === "useLocation") {
      console.log("pop up should happen here");
      navigator.geolocation.getCurrentPosition(function (position) {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setHasSetLocation(true);
        setLoading(false);
      });
    } else {
      setUserLocation(selectedOption.value);
      setHasSetLocation(true);
      setLoading(false);
      console.log("userLocation" + userLocation);
    }
  }, []);

  useEffect(() => {
    if (userLocation && hasSetLocation) {
      setLoading(true);
      const fetchData = async () => {
        const results = [];
        for (const store of storeLocations) {
          const response = await fetch(
            `https://api.tomtom.com/routing/1/calculateRoute/${userLocation.lat},${userLocation.lon}:${store.lat},${store.lon}/json?avoid=unpavedRoads&key=${apiKey}`
          );
          const data = await response.json();
          results.push({
            ...store,
            distance: convertMetersToMiles(
              data.routes[0].summary.lengthInMeters
            ),
            time: convertSecondsToMinutes(
              data.routes[0].summary.travelTimeInSeconds
            ),
          });
        }
        setStoreDistances(results);
        console.log("Results before storing in state:", results);
        setLoading(false);
      };
      fetchData();
    }
  }, [userLocation, storeLocations, hasSetLocation]);

  const convertMetersToMiles = (meters) => {
    let miles = meters * 0.000621371;
    return Math.round(miles * 10) / 10;
  };

  const convertSecondsToMinutes = (seconds) => {
    let totalMinutes = Math.round(seconds / 60);
    let hours = Math.floor(totalMinutes / 60);
    let remainingMinutes = totalMinutes % 60;

    return totalMinutes < 60
      ? `${totalMinutes} mins`
      : `${hours} hr ${remainingMinutes} mins`;
  };

  useEffect(() => {
    const newSortedStoreDistances = [...storeDistances].sort(
      (a, b) => a.distance - b.distance
    );
    setSortedStoreDistances(newSortedStoreDistances);
  }, [storeDistances]);

  console.log(storeDistances);

  if (userLocation === undefined) {
    return <div>Loading</div>;
  }

  const loadOptions = useCallback(
    async (inputValue) => {
      if (inputValue.length > 11) {
        const response = await fetch(
          `https://api.tomtom.com/search/2/search/${inputValue}.json?key=${apiKey}`
        );

        const data = await response.json();
        return data.results.map((result) => ({
          value: { lat: result.position.lat, lon: result.position.lon },
          label: result.address.freeformAddress,
        }));
      }
      return [];
    },
    [apiKey]
  );

  const DropdownIndicator = () => {
    return <Icon path={mdiMagnify} size={1} />;
  };

  const SearchStyle = {
    control: (provided) => ({
      ...provided,
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      borderBottom: "1px solid gray",
      boxShadow: "none",
      "&:hover": {
        borderBottom: "1px solid gray",
      },
      minHeight: "30px",
      height: "30px",
      paddingLeft: "none",
      display: "flex",
      alignItems: "start",
    }),

    container: (provided) => ({
      ...provided,
      width: "70%",
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "10px",
      borderLeft: "none",
      svg: { display: "none" },
    }),

    indicatorsContainer: (provided) => ({
      ...provided,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }),

    menu: (provided) => ({
      ...provided,
      margin: 0,
    }),
  };

  const toggleInfoOverlay = (index) => {
    setSelectedInfo(index);
  };

  const handleStoreSelection = async (store) => {
    try {
      await updateUserSelectedStore(currentUser.uid, store);

      if (location.state && location.state.redirect) {
        switch (location.state.redirect) {
          case "menu":
            navigate(`/menu`);
            break;
          case "cart":
            navigate(`/menu/cart`);
            break;
          default:
            break;
        }
      } else {
        navigate(`/menu`);
      }
    } catch (error) {
      console.error("Failed to update user's selected store:", error);
    }
  };

  return (
    <div>
      <Navbar data={logoData} />
      <div className="map-and-sidebar-main-container">
        <div className="search-and-sidebar">
          <div className="location-search-bar">
            <AsyncSelect
              loadOptions={loadOptions}
              onChange={handleDropdownSelect}
              placeholder="Find a Store"
              defaultOptions={[{ value: "useLocation", label: "Use Location" }]}
              styles={SearchStyle}
              components={{
                DropdownIndicator,
                IndicatorSeparator: () => null,
              }}
            />
            <div>
              <button className="orange default-button">Filter</button>
            </div>
          </div>
          <div className="location-page-sidebar">
            {loading ? (
              <div className="loading-placeholder">
                <div className="loading-circle"></div>
              </div>
            ) : sortedStoreDistances.length > 0 ? (
              sortedStoreDistances.map((store, index) => (
                <div
                  key={index}
                  onClick={() =>
                    centerMapToLocation(index, store.lat, store.lon)
                  }
                  className={`store-location-info ${
                    selectedStoreIndex === index ? "selected" : ""
                  }`}
                >
                  <div className="address-and-icons">
                    <div className="store-headers-and-addresses">
                      <p className="store-header-text">{store.header}</p>
                      <p className="store-address-text">{store.abvAdd}</p>
                    </div>
                    <div
                      className="info-icon"
                      onClick={() => toggleInfoOverlay(index)}
                    >
                      <Icon path={mdiInformationOutline} size={1} />
                    </div>
                  </div>
                  <div className="distance-and-travel-time-container">
                    <p className="store-distance">
                      {store.distance} miles away
                    </p>
                  </div>
                  <div className="location-order-icons">
                    <div className="location-in-store">
                      <Icon path={mdiStorefrontOutline} size={1.2} />
                      <p className="location-in-store-text">In store</p>
                    </div>
                    {store.driveThru && (
                      <div className="location-drive-thru">
                        <Icon path={mdiCar} size={1.2} />
                        <p className="location-drive-thru-text">Drive-Thru</p>
                      </div>
                    )}
                    {selectedStoreIndex === index && currentUser && (
                      <button
                        className="selected-store-button default-button orange"
                        onClick={() => handleStoreSelection(store)}
                      >
                        Order Here
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-coords-placeholder">
                No stores located near you. Please type or use your location to
                view nearby stores.
              </div>
            )}
          </div>
          <InfoOverlay
            store={
              selectedInfo !== null ? sortedStoreDistances[selectedInfo] : null
            }
            onClose={() => setSelectedInfo(null)}
          />
        </div>
        <MapIntegration
          userLat={userLocation.lat}
          userLon={userLocation.lon}
          storeDistances={storeDistances}
          centerMapToLocation={mapCenter ? mapCenter : userLocation}
        />
      </div>
    </div>
  );
}

Map.propTypes = {
  logoData: PropTypes.object.isRequired,
  storeLocations: PropTypes.array.isRequired,
  updateUserSelectedStore: PropTypes.func.isRequired,
};

export default Map;
