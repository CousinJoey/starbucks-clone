import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../context/authContext";
import PropTypes from "prop-types";

function PreviousOrders({ fetchUserHistory, addItemToCart }) {
  const { currentUser } = useAuth();

  const [history, setHistory] = useState(undefined);
  const [customizationKeys, setCustomizationKeys] = useState([]);

  useEffect(() => {
    if (history) {
      const keys = new Set();

      history.forEach((item) => {
        if (item.customization) {
          Object.keys(item.customization).forEach((key) => {
            keys.add(key);
          });
        }
      });

      setCustomizationKeys(Array.from(keys));
    }
  }, [history]);

  useEffect(() => {
    const fetchHistory = async () => {
      const history = await fetchUserHistory(currentUser.uid);
      setHistory(history);
    };

    fetchHistory();
  }, [currentUser]);

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

  function formatSize(sizeValue, productType) {
    console.log(productType);

    if (productType !== "Drinks") {
      return;
    }

    if (sizeValue === "small") {
      return "12 fl oz";
    } else if (sizeValue === "medium") {
      return "18 fl oz";
    } else {
      return "22 fl oz";
    }
  }

  async function handleAddToCart(item) {
    try {
      await addItemToCart(currentUser.uid, item);
      console.log("Added to cart successfully.");
    } catch (error) {
      console.error("Error adding item to cart: ", error);
    }
  }

  if (history === undefined) {
    return (
      <div className="loading-placeholder loading-centered">
        <div className="loading-circle"></div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="empty-previous-container">
        <p>No Previous Orders</p>
      </div>
    );
  }

  return (
    <div className="favorites-main">
      <div className="favorites-header-container">
        <p className="favoirtes-header-text">Previous Orders</p>
      </div>
      <div className="favorites-item-container">
        <div className="favorite-item">
          {history.map((item, index) => (
            <div
              className="item-info-and-img-container item-info-and-img-favorites"
              key={index}
            >
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
                      {formatSize(item.product.size, item.product.type)}
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
                              key={`${key}-${index}-${subKey}-${subIndex}`}
                            >
                              {formatCustomizationOption(subKey, value)}
                            </p>
                          )
                        )
                    )}
                  </div>
                </div>
                <div className="checkout-item-extras previous-orders-extras">
                  <div className="checkout-item-svg-container">
                    <button
                      className="default-button orange reorder-button"
                      onClick={() => handleAddToCart(item)}
                    >
                      Express Reorder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

PreviousOrders.propTypes = {
  fetchUserHistory: PropTypes.func.isRequired,
  addItemToCart: PropTypes.func.isRequired,
};

export default PreviousOrders;
