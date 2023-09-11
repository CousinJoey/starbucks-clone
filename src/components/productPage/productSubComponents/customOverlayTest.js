import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import IncrementComponent from "./incrementComponent";
import { CustomizationContext } from "../../../context/customizationContext";

function CustomOverlayTest({
  handleExitClick,
  product,
  customFilter,
  customizationData,
  handleSubmitClick,
}) {
  const { state, dispatch } = useContext(CustomizationContext);
  const [incrementValue, setIncrementValue] = useState({});

  const customCategory = customFilter.customLabelTitle.toLowerCase();

  const handleIncrementChange = (title, text, value) => {
    setIncrementValue((prevValues) => ({
      ...prevValues,
      [`${title}-${text}`]: value,
    }));
  };

  const onButtonClick = () => {
    dispatch({ type: "RESET_STAGING" });
    handleExitClick();
  };

  const onSubmitClick = () => {
    dispatch({ type: "MOVE_TO_STAGING_B" });
    handleSubmitClick(incrementValue, state);
  };

  return (
    <>
      <div className="reset-button-container">
        <div className="close-button-container">
          <button onClick={onButtonClick} className="close-button">
            X
          </button>
        </div>
        <button
          className="reset-button"
          onClick={() => {
            dispatch({
              type: "RESET_TO_DEFAULT",
              label: customCategory,
            });
          }}
        >
          Reset
        </button>
      </div>
      <div className="custom-overlay-container">
        <div className="custom-options-main">
          {product.customCategories[customCategory].map((value) => (
            <div key={value}>
              <p className="ind-label-headers">{value}</p>
              <IncrementComponent
                product={product}
                customizationData={customizationData}
                customCategory={customCategory}
                category={value}
                label={customCategory}
                onIncrementChange={handleIncrementChange}
                className="increment-component"
              />
            </div>
          ))}
        </div>
        <button onClick={onSubmitClick} className="done-button">
          Done
        </button>
      </div>
    </>
  );
}

CustomOverlayTest.propTypes = {
  handleExitClick: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  customFilter: PropTypes.object.isRequired,
  customizationData: PropTypes.array.isRequired,
  handleSubmitClick: PropTypes.func.isRequired,
};

export default CustomOverlayTest;
