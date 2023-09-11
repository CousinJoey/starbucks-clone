import React, { useContext, useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiPlusCircleOutline, mdiMinusCircleOutline } from "@mdi/js";
import PropTypes from "prop-types";
import { CustomizationContext } from "../../../context/customizationContext";

function Increment({ label, subCategories }) {
  const [value, setValue] = useState(0);

  const { state, dispatch } = useContext(CustomizationContext);

  useEffect(() => {
    let newValue = 0;

    if (state.stagingB && state.stagingB[label]) {
      const stagingValue =
        state.stagingB[label][`${subCategories.title}-${subCategories.text}`];
      if (stagingValue !== undefined) {
        newValue = stagingValue;
      }
    }

    setValue(newValue);
  }, [state.stagingB, label, subCategories.title, subCategories.text]);

  const handleIncrement = () => {
    const newValue = value + 1;
    dispatch({
      type: "SET_INCREMENT_VALUE",
      payload: {
        label: label,
        title: subCategories.title,
        text: subCategories.text,
        value: newValue,
      },
    });
    setValue(newValue);
  };

  const handleDecrement = () => {
    if (value > 0) {
      const newValue = value - 1;
      dispatch({
        type: "SET_INCREMENT_VALUE",
        payload: {
          label: label,
          title: subCategories.title,
          text: subCategories.text,
          value: newValue,
        },
      });
      setValue(newValue);
    }
  };

  return (
    <>
      <div
        key={subCategories.title}
        className={`custom-label-item custom-dropdown ${
          value === 0 || value === undefined ? "" : "active-label"
        }`}
      >
        <div className="label-and-button">
          {value === 0 && (
            <label className="custom-label">
              Add {subCategories.title} {subCategories.text}
            </label>
          )}
          {value === 1 && (
            <label className="custom-label">
              {subCategories.title} {subCategories.text}
            </label>
          )}
          {value > 1 && (
            <label className="custom-label">
              {subCategories.title} {subCategories.text}s
            </label>
          )}
          <div className="custom-increment">
            {value >= 1 && (
              <span onClick={handleDecrement}>
                <Icon path={mdiMinusCircleOutline} size={1} />
              </span>
            )}
            {value >= 1 && <p className="custom-increment-value">{value}</p>}
            <span onClick={handleIncrement}>
              <Icon path={mdiPlusCircleOutline} size={1} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

Increment.propTypes = {
  subCategories: PropTypes.object.isRequired,
  onIncrementChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default Increment;
