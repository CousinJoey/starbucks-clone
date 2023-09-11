import React from "react";
import PropTypes from "prop-types";
import Icon from "@mdi/react";
import { mdiBee } from "@mdi/js";

function ItemInfo({ itemBees, itemDesc, itemCal, itemSugar, itemFat }) {
  return (
    <div className="product-info-main">
      <div className="product-info-container">
        <div className="product-info">
          <p className="bee-text-info-page">
            <span className="white-border">
              {itemBees}{" "}
              <span className="bee-svg">
                <Icon path={mdiBee} size={1} />
              </span>{" "}
              <span>Item</span>
            </span>
          </p>
          <p className="item-info-desc">{itemDesc}</p>
          <div className="item-info-nut">
            <p>
              {itemCal} calories, {itemSugar}g sugar, {itemFat}g fat
            </p>
          </div>
          <button className="default-button white">
            Full nutrition and ingredients list
          </button>
        </div>
        <div className="product-info-filler"></div>
      </div>
    </div>
  );
}

ItemInfo.propTypes = {
  itemBees: PropTypes.number.isRequired,
  itemDesc: PropTypes.string.isRequired,
  itemCal: PropTypes.string.isRequired,
  itemSugar: PropTypes.string.isRequired,
  itemFat: PropTypes.string.isRequired,
};

export default ItemInfo;
