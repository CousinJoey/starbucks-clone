import React from "react";
import PropTypes from "prop-types";

function MenuAllView({ onFilterChange }) {
  const handleFilterChange = (category) => {
    onFilterChange(category);
  };

  return (
    <div className="main-display">
      <h1 className="menu-header">Menu</h1>
      <section>
        <h2 className="menu-item-hero">Drinks</h2>
        <hr></hr>
        <div className="menu-grid-all">
          <div
            className="menu-item"
            onClick={() => {
              handleFilterChange("hot");
            }}
          >
            <img
              className="menu-item-img"
              src="https://firebasestorage.googleapis.com/v0/b/starbucks-clone-34c1a.appspot.com/o/Images%2FmenuCurrent%2F7.png?alt=media&token=dc466edf-cfe2-4602-b069-e7e1f7fd24b5"
            />
            <h3 className="menu-item-header">Hot Drinks</h3>
          </div>
          <div
            onClick={() => {
              handleFilterChange("cold");
            }}
            className="menu-item"
          >
            <img
              className="menu-item-img"
              src="https://firebasestorage.googleapis.com/v0/b/starbucks-clone-34c1a.appspot.com/o/Images%2FmenuCurrent%2F10.png?alt=media&token=fce0c14a-8486-4074-872d-a4bf3a5874c8"
            />
            <h3 className="menu-item-hero">Cold Drinks</h3>
          </div>
          <div
            onClick={() => {
              handleFilterChange("frap");
            }}
            className="menu-item"
          >
            <img
              className="menu-item-img"
              src="https://firebasestorage.googleapis.com/v0/b/starbucks-clone-34c1a.appspot.com/o/Images%2FmenuCurrent%2F13.png?alt=media&token=c95367c9-5ff2-4adb-8ef4-3de518609c6f"
            />
            <h3>Frappuccinos</h3>
          </div>
          <div
            onClick={() => {
              handleFilterChange("smoothie");
            }}
            className="menu-item"
          >
            <img
              className="menu-item-img"
              src="https://firebasestorage.googleapis.com/v0/b/starbucks-clone-34c1a.appspot.com/o/Images%2FmenuCurrent%2F15.png?alt=media&token=b1fffc0d-499e-469f-92af-93e99102dcfb"
            />
            <h3>Smoothies</h3>
          </div>
        </div>
      </section>
      <section>
        <h2>Food</h2>
        <hr></hr>
        <div className="menu-grid-all">
          <div
            onClick={() => {
              handleFilterChange("hotBreak");
            }}
            className="menu-item"
          >
            <img
              className="menu-item-img"
              src="https://firebasestorage.googleapis.com/v0/b/starbucks-clone-34c1a.appspot.com/o/Images%2FmenuCurrent%2F29.png?alt=media&token=0374e450-2f0e-44fb-ba64-d66402a44e02"
            />
            <h3 className="menu-item-header">Hot Breakfast</h3>
          </div>
          <div
            onClick={() => {
              handleFilterChange("fruit");
            }}
            className="menu-item"
          >
            <img
              className="menu-item-img"
              src="https://firebasestorage.googleapis.com/v0/b/starbucks-clone-34c1a.appspot.com/o/Images%2FmenuCurrent%2F38.png?alt=media&token=b2fc1bb0-9a4a-43c2-8fcf-d88ea0627d3b"
            />
            <h3>Fruit and Yogurt</h3>
          </div>
          <div
            onClick={() => {
              handleFilterChange("bakery");
            }}
            className="menu-item"
          >
            <img
              className="menu-item-img"
              src="https://firebasestorage.googleapis.com/v0/b/starbucks-clone-34c1a.appspot.com/o/Images%2FmenuCurrent%2F32.png?alt=media&token=c9260203-2ffb-445a-ae01-f2d64b381746"
            />
            <h3>Bakery</h3>
          </div>
        </div>
      </section>
    </div>
  );
}

MenuAllView.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default MenuAllView;
