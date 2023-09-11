import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiPlusCircleOutline, mdiMinusCircleOutline } from "@mdi/js";

function AddsRefresher() {
  const [ice, setIce] = useState([
    {
      title: "Ice",
      value: "none",
    },
  ]);

  const [freezeDriedPineapple, setFreezeDriedPineapple] = useState([
    {
      title: "Freeze Dried Pineapple",
      scoops: 0,
    },
  ]);

  const handleIceChange = (index, value) => {
    setIce((prevIce) =>
      prevIce.map((ice, i) => (i === index ? { ...ice, value } : ice))
    );
  };

  const handleScoopPineappleAdd = (pumpName) => {
    setFreezeDriedPineapple((prevPineapple) =>
      prevPineapple.map((pineapple) => {
        if (pineapple.title === pumpName) {
          return {
            ...pineapple,
            scoops: Math.min(pineapple.scoops + 1, 10),
          };
        } else {
          return pineapple;
        }
      })
    );
  };

  const handleScoopPineappleSub = (pumpName) => {
    setFreezeDriedPineapple((prevPineapple) =>
      prevPineapple.map((pineapple) => {
        if (pineapple.title === pumpName) {
          return {
            ...pineapple,
            scoops: Math.max(pineapple.scoops - 1, 0),
          };
        } else {
          return pineapple;
        }
      })
    );
  };

  const [strawberryPuree, setStrawberryPuree] = useState([
    {
      title: "Strawberry Puree",
      value: "none",
    },
  ]);

  const handleStrawberryPureeChange = (index, value) => {
    setStrawberryPuree((prevPuree) =>
      prevPuree.map((puree, i) => (i === index ? { ...puree, value } : puree))
    );
  };

  const [dragonfruitInclusion, setDragonfruitInclusion] = useState([
    { title: "Dragonfruit Inclusion Scoop", scoops: 0 },
  ]);

  const handleScoopDragonAdd = () => {
    setDragonfruitInclusion((prevInclusion) => [
      {
        ...prevInclusion[0],
        scoops: Math.min(prevInclusion[0].scoops + 1, 10),
      },
    ]);
  };

  const handleScoopDragonSub = () => {
    setDragonfruitInclusion((prevInclusion) => [
      { ...prevInclusion[0], scoops: Math.max(prevInclusion[0].scoops - 1, 0) },
    ]);
  };

  const [strawberryScoop, setStrawberryScoop] = useState([
    { title: "Strawberry Scoop", scoops: 0 },
  ]);

  const handleScoopStrawberryAdd = () => {
    setStrawberryScoop((prevScoop) => [
      {
        ...prevScoop[0],
        scoops: Math.min(prevScoop[0].scoops + 1, 10),
      },
    ]);
  };

  const handleScoopStrawberrySub = () => {
    setStrawberryScoop((prevScoop) => [
      {
        ...prevScoop[0],
        scoops: Math.max(prevScoop[0].scoops - 1, 0),
      },
    ]);
  };

  return (
    <div className="custom-options-main">
      <p>Fruit Add-ins</p>
      {dragonfruitInclusion.map((dragon, index) => (
        <div key={index} className="custom-label-item">
          <div className="label-and-button">
            {dragon.scoops === 0 && (
              <label className="custom-label">Add {dragon.title} Syrup</label>
            )}
            {dragon.scoops === 1 && (
              <label className="custom-label">{dragon.title} Syrup Pump</label>
            )}
            {dragon.scoops > 1 && (
              <label className="custom-label">{dragon.title} Syrup Pumps</label>
            )}
          </div>
          <div>
            {dragon.scoops >= 1 && (
              <span onClick={() => handleScoopDragonSub(dragon.title)}>
                <Icon path={mdiMinusCircleOutline} size={1} />
              </span>
            )}
            {dragon.scoops >= 1 && <p>{dragon.scoops}</p>}
            <span onClick={() => handleScoopDragonAdd(dragon.title)}>
              <Icon path={mdiPlusCircleOutline} size={1} />
            </span>
          </div>
        </div>
      ))}
      {freezeDriedPineapple.map((pine, index) => (
        <div key={index} className="custom-label-item">
          <div className="label-and-button">
            {pine.scoops === 0 && (
              <label className="custom-label">Add {pine.title} Syrup</label>
            )}
            {pine.scoops === 1 && (
              <label className="custom-label">{pine.title} Syrup Pump</label>
            )}
            {pine.scoops > 1 && (
              <label className="custom-label">{pine.title} Syrup Pumps</label>
            )}
          </div>
          <div>
            {pine.scoops >= 1 && (
              <span onClick={() => handleScoopPineappleSub(pine.title)}>
                <Icon path={mdiMinusCircleOutline} size={1} />
              </span>
            )}
            {pine.scoops >= 1 && <p>{pine.scoops}</p>}
            <span onClick={() => handleScoopPineappleAdd(pine.title)}>
              <Icon path={mdiPlusCircleOutline} size={1} />
            </span>
          </div>
        </div>
      ))}
      {strawberryPuree.map((strawberry, index) => (
        <div key={index} className="dropdown-container">
          <div className="custom-label-and-button">
            <select
              className="custom-label-item custom-dropdown"
              value={strawberry.value}
              onChange={(e) =>
                handleStrawberryPureeChange(index, e.target.value)
              }
            >
              <option value="none">No {strawberry.title}</option>
              <option value="light">Light {strawberry.title}</option>
              <option value="regular">{strawberry.title}</option>
              <option value="extra">Extra {strawberry.title}</option>
            </select>
          </div>
        </div>
      ))}
      {strawberryScoop.map((strawberry, index) => (
        <div key={index} className="custom-label-item">
          <div className="label-and-button">
            {strawberry.scoops === 0 && (
              <label className="custom-label">
                Add {strawberry.title} Syrup
              </label>
            )}
            {strawberry.scoops === 1 && (
              <label className="custom-label">
                {strawberry.title} Syrup Pump
              </label>
            )}
            {strawberry.scoops > 1 && (
              <label className="custom-label">
                {strawberry.title} Syrup Pumps
              </label>
            )}
          </div>
          <div>
            {strawberry.scoops >= 1 && (
              <span onClick={() => handleScoopStrawberrySub(strawberry.title)}>
                <Icon path={mdiMinusCircleOutline} size={1} />
              </span>
            )}
            {strawberry.scoops >= 1 && <p>{strawberry.scoops}</p>}
            <span onClick={() => handleScoopStrawberryAdd(strawberry.title)}>
              <Icon path={mdiPlusCircleOutline} size={1} />
            </span>
          </div>
        </div>
      ))}
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
    </div>
  );
}

export default AddsRefresher;
