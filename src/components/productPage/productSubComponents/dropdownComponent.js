import React from "react";
import PropTypes from "prop-types";

function DropdownComponent({ item, product, customCategory }) {
  let currentItem = product[customCategory][item];

  return (
    <>
      <div className="label-category-section">
        {currentItem.map((itemData, index) => (
          <div
            key={index}
            className="dropdown-container custom-dropdown custom-label-item"
          >
            <div className="custom-label-and-button">
              <select className="custom-dropdown">
                <option value="none">No {itemData.title}</option>
                <option value="light">Light {itemData.title}</option>
                <option value="regular">{itemData.title}</option>
                <option value="extra">Extra {itemData.title}</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

DropdownComponent.propTypes = {
  item: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  customCategory: PropTypes.string.isRequired,
};

export default DropdownComponent;
