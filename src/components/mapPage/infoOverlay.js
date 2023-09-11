import React from "react";
import PropTypes from "prop-types";
import Icon from "@mdi/react";
import {
  mdiDirectionsFork,
  mdiCellphoneCheck,
  mdiStorefrontOutline,
  mdiCar,
  mdiBeeFlower,
  mdiWifi,
} from "@mdi/js";

function InfoOverlay({ store, onClose }) {
  if (!store) return null;

  return (
    <div className="sidebar-location-info-main">
      <div className="sidebar-location-container">
        <div className="location-overlay-padding">
          <h2 className="">{store.header}</h2>
          {store.twentyfour ? (
            <p className="store-hours-intro">Open 24 hours</p>
          ) : (
            <p className="store-hours-intro">Open Until: {store.closing}</p>
          )}
          <div className="location-overlay-full-address-container">
            <p className="location-overlay-address-text">{store.address}</p>
            <p className="location-overlay-distance">
              {store.distance} miles away
            </p>
          </div>
          <div className="phone-and-direction-button">
            <p className="location-overlay-phone">Call: {store.phone}</p>
            <button className="default-button orange location-info-direction-button">
              Get Directions{" "}
              <span>
                <Icon path={mdiDirectionsFork} size={1} />
              </span>
            </button>
          </div>
        </div>
        <div className="overlay-break">
          <p className="overlay-break-text">STORE HOURS</p>
        </div>
        <div className="location-overlay-padding">
          <div className="store-hours-container">
            <div className="store-hours-main">
              <div className="store-hours-day-and-time">
                <p className="store-day">Sunday</p>
                {store.twentyfour ? (
                  <p className="store-hours">Open 24 Hours</p>
                ) : (
                  <p className="store-hours">5:30 AM - {store.closing} PM</p>
                )}
              </div>
              <div className="store-hours-day-and-time">
                <p className="store-day">Monday</p>
                {store.twentyfour ? (
                  <p className="store-hours">Open 24 Hours</p>
                ) : (
                  <p className="store-hours">5:30 AM - {store.closing} PM</p>
                )}
              </div>
              <div className="store-hours-day-and-time">
                <p className="store-day">Tuesday</p>
                {store.twentyfour ? (
                  <p className="store-hours">Open 24 Hours</p>
                ) : (
                  <p className="store-hours">5:30 AM - {store.closing} PM</p>
                )}
              </div>
              <div className="store-hours-day-and-time">
                <p className="store-day">Wednesday</p>
                {store.twentyfour ? (
                  <p className="store-hours">Open 24 Hours</p>
                ) : (
                  <p className="store-hours">5:30 AM - {store.closing} PM</p>
                )}
              </div>
              <div className="store-hours-day-and-time">
                <p className="store-day">Thursday</p>
                {store.twentyfour ? (
                  <p className="store-hours">Open 24 Hours</p>
                ) : (
                  <p className="store-hours">5:30 AM - {store.closing} PM</p>
                )}
              </div>
              <div className="store-hours-day-and-time">
                <p className="store-day">Friday</p>
                {store.twentyfour ? (
                  <p className="store-hours">Open 24 Hours</p>
                ) : (
                  <p className="store-hours">5:30 AM - {store.closing} PM</p>
                )}
              </div>
              <div className="store-hours-day-and-time">
                <p className="store-day">Saturday</p>
                {store.twentyfour ? (
                  <p className="store-hours">Open 24 Hours</p>
                ) : (
                  <p className="store-hours">5:30 AM - {store.closing} PM</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="overlay-break">
          <p className="overlay-break-text">ORDER AND PICKUP OPTIONS</p>
        </div>
        <div className="location-overlay-padding">
          <div className="order-and-pickup-options-container">
            <div className="location-text-and-icon-item">
              <p className="location-text-and-icon">
                <span>
                  <Icon path={mdiCellphoneCheck} size={1.4} />
                </span>
                Mobile Order and Pay
              </p>
            </div>
            <div className="location-text-and-icon-item">
              <p className="location-text-and-icon">
                <span>
                  <Icon path={mdiStorefrontOutline} size={1.4} />
                </span>
                In store
              </p>
            </div>
            {store.driveThru && (
              <div className="location-text-and-icon-item">
                <p className="location-text-and-icon">
                  <span>
                    <Icon path={mdiCar} size={1.4} />
                  </span>
                  Drive-Thru
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="overlay-break">
          <p className="overlay-break-text">AMENITIES</p>
        </div>
        <div className="location-overlay-padding">
          <div className="amenities-container">
            <div className="location-text-and-icon-item">
              <p className="location-text-and-icon">
                <span>
                  <Icon path={mdiBeeFlower} size={1.4} />
                </span>
                Redeem Rewards
              </p>
            </div>
            <div className="location-text-and-icon-item">
              <p className="location-text-and-icon">
                <span>
                  <Icon path={mdiWifi} size={1.4} />
                </span>
                Redeem Rewards
              </p>
            </div>
          </div>
        </div>
      </div>
      <button className="location-info-overlay-close" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

InfoOverlay.propTypes = {
  store: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InfoOverlay;
