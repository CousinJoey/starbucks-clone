import React from "react";
import Flavors from "./customOverlaySubComponents/flavors";
import Toppings from "./customOverlaySubComponents/toppings";
import PropTypes from "prop-types";
import Sweeteners from "./customOverlaySubComponents/sweeteners";
import Adds from "./customOverlaySubComponents/adds";
import Milk from "./customOverlaySubComponents/milk";
import AddsRefresher from "./customOverlaySubComponents/addsRefresher";
import Juice from "./customOverlaySubComponents/juice";
import Lemonade from "./customOverlaySubComponents/lemonade";

function CustomOverlay({ handleExitClick, customFilter, customType }) {
  console.log(customFilter);

  const onButtonClick = () => {
    handleExitClick();
  };

  return (
    <div>
      {customFilter === "flavors" && <Flavors customType={customType} />}
      {customFilter === "toppings" && <Toppings customType={customType} />}
      {customFilter === "sweeteners" && <Sweeteners />}
      {customFilter === "adds" && <Adds customType={customType} />}
      {customFilter === "milk" && <Milk />}
      {customFilter === "addsRefresher" && <AddsRefresher />}
      {customFilter === "juice" && <Juice />}
      {customFilter === "lemonade" && <Lemonade />}
      <button onClick={() => onButtonClick()}>Close</button>
    </div>
  );
}

CustomOverlay.propTypes = {
  handleExitClick: PropTypes.func.isRequired,
  customFilter: PropTypes.string.isRequired,
  customType: PropTypes.string.isRequired,
};

export default CustomOverlay;
