import React, { useState } from "react";
import PropTypes from "prop-types";

function Adds({ customType }) {
  const [room, setRoom] = useState([
    {
      title: "Room",
      value: "none",
    },
  ]);

  const [ice, setIce] = useState([
    {
      title: "Ice",
      value: "none",
    },
  ]);

  const [creamer, setCreamer] = useState([
    {
      title: "Whole Milk",
      value: "none",
    },
    {
      title: "2% Milk",
      value: "none",
    },
    {
      title: "Nonfat Milk",
      value: "none",
    },
    {
      title: "Cream (Half & Half)",
      value: "none",
    },
    {
      title: "Heavy Cream",
      value: "none",
    },
    {
      title: "Almond Milk",
      value: "none",
    },
    {
      title: "Coconut Milk",
      value: "none",
    },
    {
      title: "Oat Milk",
      value: "none",
    },
    {
      title: "Soy Milk",
      value: "none",
    },
    {
      title: "Vanilla Sweet Cream",
      value: "none",
    },
  ]);

  const handleRoomChange = (index, value) => {
    setRoom((prevRoom) =>
      prevRoom.map((room, i) => (i === index ? { ...room, value } : room))
    );
  };

  const handleIceChange = (index, value) => {
    setIce((prevIce) =>
      prevIce.map((ice, i) => (i === index ? { ...ice, value } : ice))
    );
  };

  const handleCreamerChange = (index, value) => {
    setCreamer((prevCreamer) =>
      prevCreamer.map((creamer, i) =>
        i === index ? { ...creamer, value } : creamer
      )
    );
  };

  return (
    <div className="custom-options-main">
      <h3>Room</h3>
      {room.map((room, index) => (
        <div key={index} className="dropdown-container">
          <div className="custom-label-and-button">
            <select
              className="custom-label-item custom-dropdown"
              value={room.value}
              onChange={(e) => handleRoomChange(index, e.target.value)}
            >
              <option value="none">No {room.title}</option>
              <option value="light">Light {room.title}</option>
              <option value="regular">{room.title}</option>
              <option value="extra">Extra {room.title}</option>
            </select>
          </div>
        </div>
      ))}
      {customType !== "coffee" ||
        (customType !== "teas" && (
          <>
            <h3>Ice</h3>
            {ice.map((ice, index) => (
              <div key={index} className="dropdown-container">
                <div className="custom-label-and-button">
                  <select
                    className="custom-label-item custom-dropdown"
                    value={ice.value}
                    onChange={(e) => handleIceChange(index, e.target.value)}
                  >
                    <option value="none">No {ice.title}</option>
                    <option value="light">Light {ice.title}</option>
                    <option value="regular">{ice.title}</option>
                    <option value="extra">Extra {ice.title}</option>
                  </select>
                </div>
              </div>
            ))}
          </>
        ))}
      <h3>Creamers</h3>
      {creamer.map((creamer, index) => (
        <div key={index} className="dropdown-container">
          <div className="custom-label-and-button">
            <select
              className="custom-label-item custom-dropdown"
              value={creamer.value}
              onChange={(e) => handleCreamerChange(index, e.target.value)}
            >
              <option value="none">No {creamer.title}</option>
              <option value="light">Light Splash of {creamer.title}</option>
              <option value="regular">Splash of {creamer.title}</option>
              <option value="extra">Extra Splash of {creamer.title}</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

Adds.propTypes = {
  customType: PropTypes.string.isRequired,
};

export default Adds;
