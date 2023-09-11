import React, { useContext } from "react";
import PropTypes from "prop-types";
import DropDown from "./dropdown";
import Increment from "./increment";
import { CustomizationContext } from "../../../context/customizationContext";

function IncrementComponent({
  customizationData,
  category,
  onIncrementChange,
  label,
}) {
  const { dispatch } = useContext(CustomizationContext);

  const handleDropdownChange = (title, text, value) => {
    const payload = {
      type: "SET_DROPDOWN_VALUE",
      label: title,
      key: text,
      value: value,
    };

    dispatch(payload);
  };

  const subCategories = customizationData[0].options[category];

  return (
    <>
      <div className="label-section">
        {subCategories.map((item) => (
          <React.Fragment key={item.name}>
            {item.type === "increment" && (
              <Increment
                subCategories={item}
                onIncrementChange={onIncrementChange}
                label={label}
              />
            )}
            {item.type === "dropdown" && (
              <DropDown
                key={item}
                subCategories={item}
                onDropdownChange={handleDropdownChange}
                label={label}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

IncrementComponent.propTypes = {
  customizationData: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  onIncrementChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default IncrementComponent;
