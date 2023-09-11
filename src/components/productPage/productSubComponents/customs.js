import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTest from "./customTest";

function Customs({ product, customizationData, handleSizeChange }) {
  const [activeSize, setActiveSize] = useState("medium");

  const handleClick = (size) => {
    setActiveSize(size);
    handleSizeChange(size);
  };

  console.log(customizationData);

  return (
    <div className="product-customs-container">
      <div className="product-customs-and-size">
        <div className="product-size">
          <h2 className="custom-heading">Size Options</h2>
          {product.type === "Drinks" && (
            <div className="product-sizing-container">
              <div
                className={`product-sizing-item ${
                  activeSize === "small" ? "active-size" : ""
                }`}
                onClick={() => handleClick("small")}
              >
                <div className="background-circle"></div>
                <img
                  src={
                    activeSize === "small"
                      ? "https://firebasestorage.googleapis.com/v0/b/starbucks-clone-34c1a.appspot.com/o/Images%2FProductPage%2Fsmall-s.png?alt=media&token=3860a717-11d5-49aa-9785-d8ea7be6bcb4"
                      : "https://firebasestorage.googleapis.com/v0/b/starbucks-clone-34c1a.appspot.com/o/Images%2FProductPage%2Fsmall.png?alt=media&token=7e0126f6-e323-48a7-ae4c-c610dc564da7"
                  }
                  className="product-size-img"
                />
                <div className="product-size-container">
                  <p className="product-sizing-text">Small</p>
                  <p className="product-measurement-text">12 Fl Oz</p>
                </div>
              </div>
              <div
                className={`product-sizing-item ${
                  activeSize === "medium" ? "active-size" : ""
                }`}
                onClick={() => handleClick("medium")}
              >
                <div className="background-circle"></div>
                <img
                  src={
                    activeSize === "medium"
                      ? "https://firebasestorage.googleapis.com/v0/b/starbucks-clone-34c1a.appspot.com/o/Images%2FProductPage%2Fmedium-s.png?alt=media&token=64be0117-325e-4f02-822c-66b7441e45aa"
                      : "https://firebasestorage.googleapis.com/v0/b/starbucks-clone-34c1a.appspot.com/o/Images%2FProductPage%2Fmedium.png?alt=media&token=f014d1c6-1589-4cda-9fdd-66f10e7f87e2"
                  }
                  className="product-size-img"
                />
                <div className="product-size-container">
                  <p className="product-sizing-text">Medium</p>
                  <p className="product-measurement-text">18 Fl Oz</p>
                </div>
              </div>
              <div
                className={`product-sizing-item ${
                  activeSize === "large" ? "active-size" : ""
                }`}
                onClick={() => handleClick("large")}
              >
                <div className="background-circle"></div>
                <img
                  src={
                    activeSize === "large"
                      ? "https://firebasestorage.googleapis.com/v0/b/starbucks-clone-34c1a.appspot.com/o/Images%2FProductPage%2Flarge-s.png?alt=media&token=91c2d56a-f176-424a-82d1-4bc98b9797c8"
                      : "https://firebasestorage.googleapis.com/v0/b/starbucks-clone-34c1a.appspot.com/o/Images%2FProductPage%2Flarge.png?alt=media&token=bb32b3d4-37e3-411e-ba15-1b7f4af1f332"
                  }
                  className="product-size-img"
                />
                <div className="product-size-container">
                  <p className="product-sizing-text">Large</p>
                  <p className="product-measurement-text">22 Fl Oz</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="product-customs">
          <h2 className="custom-heading">Customizations</h2>
          <CustomTest product={product} customizationData={customizationData} />
        </div>
      </div>
    </div>
  );
}

Customs.propTypes = {
  customType: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  customizationData: PropTypes.array.isRequired,
  handleSizeChange: PropTypes.func.isRequired,
};

export default Customs;
