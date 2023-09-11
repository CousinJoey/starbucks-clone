import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiBee } from "@mdi/js";

function RewardsChoice() {
  const [beeValue, setBeeValue] = useState(25);

  const handleButtonClick = (value) => {
    setBeeValue(value);
  };

  return (
    <div className="rewards-choice-main">
      <div className="rewards-choice-header-container">
        <div className="rewards-choice-header">
          <h2 className="rewards-header">Get your favorites for free</h2>
        </div>
      </div>
      <div className="rewards-choice-text-and-buttons">
        <div className="reward-buttons-container">
          <button
            className={
              beeValue === 25 ? "reward-button active" : "reward-button"
            }
            onClick={() => handleButtonClick(25)}
          >
            {" "}
            25
            <Icon className="rewards-bee" path={mdiBee} size={1.5} />
          </button>
          <button
            className={
              beeValue === 100 ? "reward-button active" : "reward-button"
            }
            onClick={() => handleButtonClick(100)}
          >
            {" "}
            100
            <Icon className="rewards-bee" path={mdiBee} size={1.5} />
          </button>
          <button
            className={
              beeValue === 200 ? "reward-button active" : "reward-button"
            }
            onClick={() => handleButtonClick(200)}
          >
            {" "}
            200
            <Icon className="rewards-bee" path={mdiBee} size={1.5} />
          </button>
          <button
            className={
              beeValue === 300 ? "reward-button active" : "reward-button"
            }
            onClick={() => handleButtonClick(300)}
          >
            {" "}
            300
            <Icon className="rewards-bee" path={mdiBee} size={1.5} />
          </button>
        </div>
        <div className="rewards-text-container">
          {beeValue === 25 && (
            <div className="reward-text">
              <h3 className="reward-title">Customize your drink</h3>
              <p className="reward-subtext">
                Make your drink just right with an extra espresso shot, nondairy
                milk or a dash of your favorite syrup.
              </p>
            </div>
          )}
          {beeValue === 100 && (
            <div className="reward-text">
              <h3 className="reward-title">
                Brewed hot or iced coffee or tea, bakery item, packaged snack
                and more
              </h3>
              <p className="reward-subtext">
                Treat yourself to an iced coffee, buttery croissant, bag of
                chips and more.
              </p>
            </div>
          )}
          {beeValue === 200 && (
            <div className="reward-text">
              <h3 className="reward-title">
                Handcrafted drink (Cold Brew, lattes and more) or hot breakfast
              </h3>
              <p className="reward-subtext">
                Turn good mornings great with a delicious handcrafted drink of
                your choice, breakfast sandwich or oatmeal on us.
              </p>
            </div>
          )}
          {beeValue === 300 && (
            <div className="reward-text">
              <h3 className="reward-title">Select GrindStone® merchandise</h3>
              <p className="reward-subtext">
                Take home a signature cup, drink tumbler or your choice of
                coffee merch. All exlcusive via our point system.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RewardsChoice;
