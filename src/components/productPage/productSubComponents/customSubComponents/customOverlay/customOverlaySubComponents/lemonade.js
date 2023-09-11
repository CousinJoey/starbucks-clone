import React, { useState } from "react";

function Lemonade() {
  const [lemonade, setLemonade] = useState([
    {
      title: "Lemonade",
      value: "none",
    },
  ]);

  const handleLemonadeChange = (index, value) => {
    setLemonade((prevLemonade) =>
      prevLemonade.map((lemonade, i) =>
        i === index ? { ...lemonade, value } : lemonade
      )
    );
  };

  return (
    <div className="custom-options-main">
      <h3>Juice Options</h3>
      {lemonade.map((lemonade, index) => (
        <div key={index} className="dropdown-container">
          <div key={index} className="custom-label-and-button">
            <select
              className="custom-label-item custom-dropdown"
              value={lemonade.value}
              onChange={(e) => handleLemonadeChange(index, e.target.value)}
            >
              <option value="none">No {lemonade.title}</option>
              <option value="light">Light {lemonade.title}</option>
              <option value="regular">{lemonade.title}</option>
              <option value="extra">Extra {lemonade.title}</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Lemonade;
