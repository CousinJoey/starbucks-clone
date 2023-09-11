import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CustomizationContext } from "../../../context/customizationContext";

function DropDown({ label, subCategories, onDropdownChange }) {
  const { state, dispatch } = useContext(CustomizationContext);
  const [value, setValue] = useState("none");
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let stagingValueA =
      (state.stagingA &&
        state.stagingA[label] &&
        state.stagingA[label][
          `${subCategories.title}-${subCategories.text}`
        ]) ||
      "none";

    let stagingValueB =
      (state.stagingB &&
        state.stagingB[label] &&
        state.stagingB[label][
          `${subCategories.title}-${subCategories.text}`
        ]) ||
      "none";

    let newValue;
    if (stagingValueA === "none_selected") {
      newValue = "none";
    } else {
      newValue = stagingValueA !== "none" ? stagingValueA : stagingValueB;
    }

    setValue(newValue);
    setDisplayText(
      newValue === "none" || newValue === undefined
        ? `No ${subCategories.title}`
        : newValue === "Regular"
        ? `${subCategories.text !== "none" ? subCategories.text + " " : ""}${
            subCategories.title
          }`
        : `${newValue} ${
            subCategories.text !== "none" ? subCategories.text + " " : ""
          }${subCategories.title}`
    );
  }, [
    state.stagingA,
    state.stagingB,
    label,
    subCategories.title,
    subCategories.text,
  ]);

  const handleDropdownChange = (event) => {
    let newValue = event.target.value;

    if (newValue === "none") newValue = "none_selected";

    setValue(newValue);
    setDisplayText(
      newValue === "none" || newValue === undefined
        ? `No ${subCategories.title}`
        : newValue === "Regular"
        ? `${subCategories.text !== "none" ? subCategories.text + " " : ""}${
            subCategories.title
          }`
        : `${newValue} ${
            subCategories.text !== "none" ? subCategories.text + " " : ""
          }${subCategories.title}`
    );

    dispatch({
      type: "SET_DROPDOWN_VALUE",
      label: label,
      key: `${subCategories.title}-${subCategories.text}`,
      value: newValue,
    });
    onDropdownChange(
      label,
      `${subCategories.title}-${subCategories.text}`,
      newValue
    );
  };

  return (
    <div
      key={subCategories.title}
      className={`custom-label-item custom-dropdown ${
        value === "none" || value === undefined ? "" : "active-label"
      }`}
    >
      <div className="custom-label-and-button">
        <select
          key={value}
          className="empty-class"
          value={value}
          onChange={handleDropdownChange}
        >
          <option value="none">
            {value === "none_selected"
              ? displayText
              : `No ${subCategories.title}`}
          </option>
          <option value="Light">
            {value === "Light"
              ? displayText
              : `Light ${
                  subCategories.text !== "none" ? subCategories.text : ""
                } ${subCategories.title}`}
          </option>
          <option value="Regular">
            {value === "Regular"
              ? displayText
              : `${subCategories.text !== "none" ? subCategories.text : ""} ${
                  subCategories.title
                }`}
          </option>
          <option value="Extra">
            {value === "Extra"
              ? displayText
              : `Extra ${
                  subCategories.text !== "none" ? subCategories.text : ""
                } ${subCategories.title}`}
          </option>
        </select>
        <div className="dropdown-chev-container">
          <p className="chev-180">›</p>
        </div>
      </div>
    </div>
  );
}

DropDown.propTypes = {
  subCategories: PropTypes.object.isRequired,
  onDropdownChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default DropDown;
