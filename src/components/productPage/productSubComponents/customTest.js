import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import CustomOverlayTest from "./customOverlayTest";
import { CustomizationContext } from "../../../context/customizationContext";

function CustomTest({ product, customizationData }) {
  const { state: incrementValue, dispatch } = useContext(CustomizationContext);
  const [customFilter, setCustomFilter] = useState("none");

  const categoryKeys = product.customCategories
    ? Object.keys(product.customCategories)
    : [];
  const label = customFilter.customLabelTitle;

  const handleCustomLabelClick = (value) => {
    setCustomFilter(value);
    document.body.classList.add("overlay-visible");
  };

  useEffect(() => {
    if (label !== undefined) {
      dispatch({ type: "INIT_LABEL", label });
    }
  }, [customFilter]);

  const handleOverlayClose = () => {
    setCustomFilter("none");
    document.body.classList.remove("overlay-visible");
  };

  const handleSubmit = () => {
    setCustomFilter("none");
    document.body.classList.remove("overlay-visible");
  };

  return (
    <div className="main-custom-labels">
      {customFilter !== "none" && (
        <div>
          <div className="custom-overlay">
            <CustomOverlayTest
              customizationData={customizationData}
              product={product}
              customFilter={customFilter}
              handleExitClick={handleOverlayClose}
              handleSubmitClick={handleSubmit}
            />
          </div>
          <div className="custom-overlay-transparent"></div>
        </div>
      )}
      {categoryKeys.length > 0 &&
        categoryKeys.map((customLabelTitle) => {
          const currentCustomLabelData =
            incrementValue.stagingB[customLabelTitle] || {};
          const hasItems = Object.keys(currentCustomLabelData).length > 0;

          return (
            <div
              key={customLabelTitle}
              className={`custom-label-item-container ${
                hasItems ? "has-items" : ""
              }`}
              onClick={() => handleCustomLabelClick({ customLabelTitle })}
            >
              <div
                className={`custom-label-item ${
                  hasItems ? "active-label" : ""
                }`}
              >
                <div
                  className={`label-and-button ${hasItems ? "has-items" : ""}`}
                >
                  <label className="custom-label">{customLabelTitle}</label>
                </div>
                <ul
                  className={`custom-label-items ${
                    hasItems ? "has-items" : ""
                  }`}
                >
                  {Object.entries(currentCustomLabelData).map(
                    ([key, value]) => {
                      const [itemTitle, itemText] = key.split("-");
                      let listItem = "";
                      if (typeof value === "number") {
                        listItem = `${itemTitle} ${
                          itemText !== "none" ? itemText + "(s) " : ""
                        }${value}`;
                      } else {
                        listItem = `${value !== "Regular" ? value + " " : ""}${
                          itemText !== "none" ? itemText + " " : ""
                        }${itemTitle}`;
                      }
                      return <li key={key}>{listItem}</li>;
                    }
                  )}
                </ul>
                <button className="custom-button">Edit</button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

CustomTest.propTypes = {
  product: PropTypes.object.isRequired,
  customizationData: PropTypes.array.isRequired,
};

export default CustomTest;
