import React, { useState } from "react";
import CustomOverlay from "./customOverlay/customOverlay";

function CustomCoffee() {
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
            />
          </div>
          <div className="custom-overlay-transparent"></div>
        </div>
      ) : null}
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
        onClick={() => handleCustomLabelClick("sweetners")}
      >
        <div className="custom-label-item">
          <div className="label-and-button">
            <label className="custom-label">Sweetners</label>
          </div>
          <ul></ul>
          <button className="custom-button">Edit</button>
        </div>
      </div>
      <div
        className="custom-label-item-container"
        onClick={() => handleCustomLabelClick("adds")}
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
    </div>
  );
}

export default CustomCoffee;
