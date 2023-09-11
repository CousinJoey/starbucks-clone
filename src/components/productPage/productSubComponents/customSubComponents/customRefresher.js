import React, { useState } from "react";
import CustomOverlay from "./customOverlay/customOverlay";
import PropTypes from "prop-types";

function CustomRefresher({ customType }) {
  const [customFilter, setCustomFilter] = useState("none");

  const handleCustomLabelClick = (value) => {
    setCustomFilter(value);
    document.body.classList.add("overlay-visible");
  };

  const handleOverlayClose = () => {
    setCustomFilter("none");
    document.body.classList.remove("overlay-visible");
  };

  return (
    <div>
      {customFilter !== "none" ? (
        <div>
          <div className="custom-overlay">
            <CustomOverlay
              handleExitClick={handleOverlayClose}
              customFilter={customFilter}
              customType={customType}
            />
          </div>
          <div className="custom-overlay-transparent"></div>
        </div>
      ) : null}
      <div
        className="custom-label-item-container"
        onClick={() => handleCustomLabelClick("milk")}
      >
        <div className="custom-label-item">
          <div className="label-and-button">
            <label className="custom-label">Milk</label>
          </div>
          <ul></ul>
          <button className="custom-button">Edit</button>
        </div>
      </div>
      <div
        className="custom-label-item-container"
        onClick={() => handleCustomLabelClick("flavors")}
      >
        <div className="custom-label-item">
          <div className="label-and-button">
            <label className="custom-label">Flavors</label>
          </div>
          <ul></ul>
          <button className="custom-button">Edit</button>
        </div>
      </div>
      <div
        className="custom-label-item-container"
        onClick={() => handleCustomLabelClick("addsRefresher")}
      >
        <div className="custom-label-item">
          <div className="label-and-button">
            <label className="custom-label">Add-Ins</label>
          </div>
          <ul></ul>
          <button className="custom-button">Edit</button>
        </div>
      </div>
      <div
        className="custom-label-item-container"
        onClick={() => handleCustomLabelClick("juice")}
      >
        <div className="custom-label-item">
          <div className="label-and-button">
            <label className="custom-label">Juice Options</label>
          </div>
          <ul></ul>
          <button className="custom-button">Edit</button>
        </div>
      </div>
      <div
        className="custom-label-item-container"
        onClick={() => handleCustomLabelClick("toppings")}
      >
        <div className="custom-label-item">
          <div className="label-and-button">
            <label className="custom-label">Toppings</label>
          </div>
          <ul></ul>
          <button className="custom-button">Edit</button>
        </div>
      </div>
      <div
        className="custom-label-item-container"
        onClick={() => handleCustomLabelClick("sweeteners")}
      >
        <div className="custom-label-item">
          <div className="label-and-button">
            <label className="custom-label">Sweeteners</label>
          </div>
          <ul></ul>
          <button className="custom-button">Edit</button>
        </div>
      </div>
    </div>
  );
}

CustomRefresher.propTypes = {
  customType: PropTypes.string.isRequired,
};

export default CustomRefresher;
