import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../context/authContext";
import Icon from "@mdi/react";
import { mdiPlusCircleOutline, mdiHeartRemoveOutline } from "@mdi/js";
import PropTypes from "prop-types";

function Favorites({ fetchUserFavorites, addItemToCart, removeFromFavorites }) {
  const { currentUser } = useAuth();

  const [favorites, setFavorites] = useState(undefined);
  const [customizationKeys, setCustomizationKeys] = useState([]);

  useEffect(() => {
    if (favorites) {
      const keys = new Set();

      favorites.forEach((item) => {
        if (item.customization) {
          Object.keys(item.customization).forEach((key) => {
            keys.add(key);
          });
        }
      });

      setCustomizationKeys(Array.from(keys));
    }
  }, [favorites]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await fetchUserFavorites(currentUser.uid);
      setFavorites(favorites);
    };

    fetchFavorites();
    console.log("Favorites:", favorites);
    console.log("Customization keys:", customizationKeys);
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

  async function handleFavoriteClick(item) {
    try {
      await removeFromFavorites(currentUser.uid, item.product.id);
      const updatedFavorites = await fetchUserFavorites(currentUser.uid);
      setFavorites(updatedFavorites);
      console.log("Favorite item removed successfully.");
    } catch (error) {
      console.error("Error removing favorite item: ", error);
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

  if (favorites === undefined) {
    return (
      <div className="loading-placeholder loading-centered">
        <div className="loading-circle"></div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="empty-favorites-container">
        <p className="empty-favorites-text">No Favorite Items</p>
      </div>
    );
  }

  return (
    <div className="favorites-main">
      <div className="favorites-header-container">
        <p className="favoirtes-header-text">Favorite Products</p>
      </div>
      <div className="favorites-item-container">
        <div className="favorite-item">
          {favorites.map((item, index) => (
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
                <div className="checkout-item-extras">
                  <div className="checkout-item-svg-container">
                    <button
                      className="svg-button"
                      onClick={() => handleFavoriteClick(item)}
                    >
                      <Icon
                        className="checkout-item-svg"
                        path={mdiHeartRemoveOutline}
                        size={1}
                      />
                    </button>
                    <button className="svg-button">
                      <Icon
                        className="checkout-item-svg"
                        path={mdiPlusCircleOutline}
                        onClick={() => handleAddToCart(item)}
                        size={1}
                      />
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

Favorites.propTypes = {
  fetchUserFavorites: PropTypes.func.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
};

export default Favorites;
