import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiPlusCircleOutline, mdiMinusCircleOutline } from "@mdi/js";
import PropTypes from "prop-types";

function Flavors({ customType }) {
  const [pumps, setPumps] = useState([
    {
      title: "Brown Sugar",
      pumps: 0,
    },
    {
      title: "Vanilla",
      pumps: 0,
    },
    {
      title: "Hazelnut",
      pumps: 0,
    },
    {
      title: "Mocha",
      pumps: 0,
    },
    {
      title: "Lavender",
      pumps: 0,
    },
    {
      title: "Caramel",
      pumps: 0,
    },
    {
      title: "Raspberry",
      pumps: 0,
    },
  ]);

  const [sauces, setSauces] = useState([
    {
      title: "Mocha",
      sauces: 0,
    },
    {
      title: "Caramel",
      sauces: 0,
    },
    {
      title: "White Mocha",
      sauces: 0,
    },
  ]);

  const handlePumpAdd = (pumpName) => {
    setPumps((prevState) =>
      prevState.map((pump) => {
        if (pump.title === pumpName) {
          return {
            ...pump,
            pumps: Math.min(pump.pumps + 1, 10),
          };
        } else {
          return pump;
        }
      })
    );
  };

  const handlePumpSub = (pumpName) => {
    setPumps((prevState) =>
      prevState.map((pump) => {
        if (pump.title === pumpName) {
          return {
            ...pump,
            pumps: Math.min(pump.pumps - 1),
          };
        } else {
          return pump;
        }
      })
    );
  };

  const handleSauceAdd = (sauceName) => {
    console.log(sauceName);
    setSauces((prevState) =>
      prevState.map((sauce) => {
        if (sauce.title === sauceName) {
          return {
            ...sauce,
            sauces: Math.min(sauce.sauces + 1, 10),
          };
        } else {
          return sauce;
        }
      })
    );

    console.log(sauces);
  };

  const handleSauceSub = (sauceName) => {
    setSauces((prevState) =>
      prevState.map((sauce) => {
        if (sauce.title === sauceName) {
          return {
            ...sauce,
            sauces: Math.min(sauce.sauces - 1),
          };
        } else {
          return sauce;
        }
      })
    );
  };

  return (
    <div className="custom-options-main">
      <p>Syrups</p>
      {pumps.map((pump, index) => (
        <div key={index} className="custom-label-item">
          <div className="label-and-button">
            {pump.pumps === 0 && (
              <label className="custom-label">Add {pump.title} Syrup</label>
            )}
            {pump.pumps === 1 && (
              <label className="custom-label">{pump.title} Syrup Pump</label>
            )}
            {pump.pumps > 1 && (
              <label className="custom-label">{pump.title} Syrup Pumps</label>
            )}
          </div>
          <div>
            {pump.pumps >= 1 && (
              <span onClick={() => handlePumpSub(pump.title)}>
                <Icon path={mdiMinusCircleOutline} size={1} />
              </span>
            )}
            {pump.pumps >= 1 && <p>{pump.pumps}</p>}
            <span onClick={() => handlePumpAdd(pump.title)}>
              <Icon path={mdiPlusCircleOutline} size={1} />
            </span>
          </div>
        </div>
      ))}
      {customType !== "refresher" ||
        (customType !== "teas" && (
          <>
            <p>Sauces</p>
            {sauces.map((sauce, index) => (
              <div key={index} className="custom-label-item">
                <div className="label-and-button">
                  {sauce.sauces === 0 && (
                    <label className="custom-label">
                      Add {sauce.title} Sauce
                    </label>
                  )}
                  {sauce.sauces === 1 && (
                    <label className="custom-label">
                      {sauce.title} Sauce Pump
                    </label>
                  )}
                  {sauce.sauces > 1 && (
                    <label className="custom-label">
                      {sauce.title} Sauce Pumps
                    </label>
                  )}
                </div>
                <div>
                  {sauce.sauces >= 1 && (
                    <span onClick={() => handleSauceSub(sauce.title)}>
                      <Icon path={mdiMinusCircleOutline} size={1} />
                    </span>
                  )}
                  {sauce.sauces >= 1 && <p>{sauce.sauces}</p>}
                  <span onClick={() => handleSauceAdd(sauce.title)}>
                    <Icon path={mdiPlusCircleOutline} size={1} />
                  </span>
                </div>
              </div>
            ))}
          </>
        ))}
    </div>
  );
}

Flavors.propTypes = {
  customType: PropTypes.string.isRequired,
};

export default Flavors;
