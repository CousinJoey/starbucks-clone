import React, { useState } from "react";

function Juice() {
  const [juice, setJuice] = useState([
    {
      title: "Apple Juice",
      value: "none",
    },
    {
      title: "Peach Juice Blend",
      value: "none",
    },
  ]);

  const handleToppingChange = (index, value) => {
    setJuice((prevJuice) =>
      prevJuice.map((juice, i) => (i === index ? { ...juice, value } : juice))
    );
  };

  return (
    <div className="custom-options-main">
      <h3>Juice Options</h3>
      {juice.map((juice, index) => (
        <div key={index} className="dropdown-container">
          <div key={index} className="custom-label-and-button">
            <select
              className="custom-label-item custom-dropdown"
              value={juice.value}
              onChange={(e) => handleToppingChange(index, e.target.value)}
            >
              <option value="none">No {juice.title}</option>
              <option value="light">Light {juice.title}</option>
              <option value="regular">{juice.title}</option>
              <option value="extra">Extra {juice.title}</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Juice;
