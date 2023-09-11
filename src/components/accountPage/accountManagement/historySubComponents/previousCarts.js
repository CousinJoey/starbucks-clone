import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function PreviousCart({ item }) {
  console.log(item);
  const [customizationKeys, setCustomizationKeys] = useState([]);

  useEffect(() => {
    if (item) {
      const keys = new Set();
      if (item.customization) {
        Object.keys(item.customization).forEach((key) => {
          keys.add(key);
        });
      }
      setCustomizationKeys(Array.from(keys));
    }
  }, [item]);

  function formatCustomizationOption(key, value) {
    const [title, modifier] = key.split("-");
    const titleFormatted = title
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    let formattedValue = value;

    let result;
    if (modifier === "none") {
      result = `${formattedValue} ${titleFormatted}`;
    } else {
      const modifierFormatted = modifier
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      if (typeof value === "number") {
        result = `${formattedValue} ${modifierFormatted}(s) ${titleFormatted}`;
      } else {
        result = `${formattedValue} ${modifierFormatted} ${titleFormatted}`;
      }
    }

    return result;
  }

  function formatSize(sizeValue) {
    if (sizeValue === "small") {
      return "12 fl oz";
    } else if (sizeValue === "medium") {
      return "18 fl oz";
    } else {
      return "22 fl oz";
    }
  }

  return (
    <div className="history-item">
      <div className="item-info-and-img-history-container">
        <div className="item-checkout-img-container">
          <img className="item-checkout-img" src={item.product.src} />
        </div>
        <div className="checkout-item-info-container">
          <div className="checkout-item-title-and-price">
            <p className="favorites-title">{item.product.title}</p>
          </div>
          <div className="checkout-customs-and-sizing-container">
            <div className="sizing-text-container">
              <p className="checkout-size-text favorite-size-text">
                {formatSize(item.product.size)}
              </p>
            </div>
            <div className="customs-text-container favorites-text-container">
              {customizationKeys.map(
                (key) =>
                  item.customization &&
                  item.customization[key] &&
                  Object.entries(item.customization[key]).map(
                    ([subKey, value], subIndex) => (
                      <p
                        className="checkout-customs-text"
                        key={`${key}-${subKey}-${subIndex}`}
                      >
                        {formatCustomizationOption(subKey, value)}
                      </p>
                    )
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PreviousCart.propTypes = {
  item: PropTypes.object.isRequired,
};

export default PreviousCart;
