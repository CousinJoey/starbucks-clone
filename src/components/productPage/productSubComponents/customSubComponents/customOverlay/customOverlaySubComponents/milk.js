import React, { useState } from "react";

function Milk() {
  const [selectedMilk, setSelectedMilk] = useState("none");

  const handleMilkChange = (e) => {
    setSelectedMilk(e.target.value);
  };

  return (
    <div className="custom-options-main">
      <div className="dropdown-container">
        <div className="custom-label-and-button">
          <select
            className="custom-label-item custom-dropdown"
            value={selectedMilk}
            onChange={handleMilkChange}
          >
            <option value="none">Select a milk option</option>
            <option value="whole">Whole Milk</option>
            <option value="2%">2% Milk</option>
            <option value="nonfat">Nonfat Milk</option>
            <option value="oat">Oat Milk</option>
            <option value="coconut">Coconut Milk</option>
            <option value="almond">Almond Milk</option>
            <option value="soy">Soy Milk</option>
            <option value="half-and-half">Half & Half</option>
            <option value="heavy-cream">Heavy Cream</option>
            <option value="vanilla-sweet">Vanilla Sweet Cream</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Milk;
