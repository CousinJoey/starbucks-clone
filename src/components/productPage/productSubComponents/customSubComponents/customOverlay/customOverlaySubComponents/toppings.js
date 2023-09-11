import React, { useState } from "react";
import PropTypes from "prop-types";

function Toppings({ customType }) {
  const [toppings, setToppings] = useState([
    {
      title: "Caramel Crunch Topping",
      value: "none",
    },
    {
      title: "Cookie Crumble Topping",
      value: "none",
    },
    {
      title: "Cinnamon Dolce Sprinkles",
      value: "none",
    },
  ]);

  const [drizzle, setDrizzle] = useState([
    {
      title: "Mocha Drizzle",
      value: "none",
    },
    {
      title: "Caramel Drizzle",
      value: "none",
    },
  ]);

  const [foam, setFoam] = useState([
    {
      title: "Mocha Cream Cold Foam",
      value: "none",
    },
    {
      title: "Salted Caramel Cream Cold Foam",
      value: "none",
    },
    {
      title: "Sweet Vanilla Cream Cold Foam",
      value: "none",
    },
  ]);

  const [whippedCream, setWhippedCream] = useState([
    {
      title: "Whipped Cream",
      value: "none",
    },
  ]);

  const handleToppingChange = (index, value) => {
    setToppings((prevToppings) =>
      prevToppings.map((topping, i) =>
        i === index ? { ...topping, value } : topping
      )
    );
  };

  const handleDrizzleChange = (index, value) => {
    setDrizzle((prevDrizzles) =>
      prevDrizzles.map((drizzle, i) =>
        i === index ? { ...drizzle, value } : drizzle
      )
    );
  };

  const handleFoamChange = (index, value) => {
    setFoam((prevFoams) =>
      prevFoams.map((foam, i) => (i === index ? { ...foam, value } : foam))
    );
  };

  const handleWhipChange = (index, value) => {
    setWhippedCream((prevWhips) =>
      prevWhips.map((whip, i) => (i === index ? { ...whip, value } : whip))
    );
  };

  return (
    <div className="custom-options-main">
      {customType !== "refresher" && (
        <>
          <h3>Toppings</h3>
          {toppings.map((topping, index) => (
            <div key={index} className="dropdown-container">
              <div key={index} className="custom-label-and-button">
                <select
                  className="custom-label-item custom-dropdown"
                  value={topping.value}
                  onChange={(e) => handleToppingChange(index, e.target.value)}
                >
                  <option value="none">No {topping.title}</option>
                  <option value="light">Light {topping.title}</option>
                  <option value="regular">{topping.title}</option>
                  <option value="extra">Extra {topping.title}</option>
                </select>
              </div>
            </div>
          ))}
        </>
      )}
      {customType !== "refresher" && (
        <>
          <h3>Drizzles</h3>
          {drizzle.map((topping, index) => (
            <div key={index} className="dropdown-container">
              <div key={index} className="custom-label-and-button">
                <select
                  className="custom-label-item custom-dropdown"
                  value={topping.value}
                  onChange={(e) => handleDrizzleChange(index, e.target.value)}
                >
                  <option value="none">No {topping.title}</option>
                  <option value="light">Light {topping.title}</option>
                  <option value="regular">{topping.title}</option>
                  <option value="extra">Extra {topping.title}</option>
                </select>
              </div>
            </div>
          ))}
        </>
      )}
      {customType !== "teas" && (
        <>
          <h3>Cold Foams</h3>
          {foam.map((foam, index) => (
            <div key={index} className="dropdown-container">
              <div key={index} className="custom-label-and-button">
                <select
                  className="custom-label-item custom-dropdown"
                  value={foam.value}
                  onChange={(e) => handleFoamChange(index, e.target.value)}
                >
                  <option value="none">No {foam.title}</option>
                  <option value="light">Light {foam.title}</option>
                  <option value="regular">{foam.title}</option>
                  <option value="extra">Extra {foam.title}</option>
                </select>
              </div>
            </div>
          ))}
        </>
      )}
      {customType !== "refresher" && (
        <>
          <h3>Whipped Cream</h3>
          {whippedCream.map((whip, index) => (
            <div key={index} className="dropdown-container">
              <div key={index} className="custom-label-and-button">
                <select
                  className="custom-label-item custom-dropdown"
                  value={whip.value}
                  onChange={(e) => handleWhipChange(index, e.target.value)}
                >
                  <option value="none">No {whip.title}</option>
                  <option value="light">Light {whip.title}</option>
                  <option value="regular">{whip.title}</option>
                  <option value="extra">Extra {whip.title}</option>
                </select>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

Toppings.propTypes = {
  customType: PropTypes.string.isRequired,
};

export default Toppings;
