import React, { useState } from "react";
import PropTypes from "prop-types";
import Navbar from "../navbar/navbar";
import Icon from "@mdi/react";
import { mdiBee } from "@mdi/js";

function Rewards({ logoData, rewardItems }) {
  const [beeValue, setBeeValue] = useState(25);

  const handleButtonClick = (value) => {
    setBeeValue(value);
  };

  const itemMap = rewardItems.reduce((acc, item) => {
    acc[item.name] = item.src;
    return acc;
  }, {});

  const headerImg = itemMap["headerImg"];

  return (
    <div>
      <Navbar data={logoData} />
      <main>
        <div className="banner">
          <p className="banner-text">GrindStone Rewards</p>
        </div>
        <header className="header-container">
          <div className="header-img-container">
            <div
              className="header-img"
              style={{ backgroundImage: `url(${headerImg})` }}
            >
              <div className="header-text-container">
                <p className="header-text-big">
                  free coffee <br></br> is a tap away
                </p>
                <p className="header-text-small">
                  Join Now to Start Earning Rewards
                </p>
                <p className="default-button orange">Join Now</p>
                <p className="header-text-app">
                  Or <span className="rewards-span">join in the app</span> for
                  the best experience
                </p>
              </div>
            </div>
          </div>
        </header>
        <div className="getting-started-main">
          <div className="getting-started-container">
            <div className="getting-started-header-container">
              <h2 className="getting-started-header">
                Getting started is easy
              </h2>
              <p className="getting-started-header-subtext">
                Earn Bees and get rewarded in a few easy steps
              </p>
            </div>
            <div className="getting-started-steps-container">
              <div className="getting-started-item">
                <div className="circle-container">
                  <div className="circle">1</div>
                </div>
                <div className="item-content">
                  <h3 className="item-title">Create an Account</h3>
                  <p className="item-text">
                    To get started,{" "}
                    <span className="rewards-span">join now</span>. You can also{" "}
                    <span className="rewards-span">join in the app</span> to get
                    access to the full range of GrindStone® Rewards benefits.
                  </p>
                </div>
              </div>
              <div className="getting-started-item">
                <div className="circle-container">
                  <div className="circle">2</div>
                </div>
                <div className="item-content">
                  <h3 className="item-title">Order and pay how you’d like</h3>
                  <p className="item-text">
                    Use cash, credit/debit card or save some time and pay right
                    through the app. You’ll collect Bees all ways.{" "}
                    <span className="rewards-span">Learn how</span>
                  </p>
                </div>
              </div>
              <div className="getting-started-item">
                <div className="circle-container">
                  <div className="circle">3</div>
                </div>
                <div className="item-content">
                  <h3 className="item-title">Earn Bees, get Rewards</h3>
                  <p className="item-text">
                    As you earn Bees, you can redeem them for Rewards—like free
                    food, drinks, and more. Start redeeming with as little as 25
                    Bees!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                <Icon path={mdiBee} size={1.5} />
              </button>
              <button
                className={
                  beeValue === 100 ? "reward-button active" : "reward-button"
                }
                onClick={() => handleButtonClick(100)}
              >
                {" "}
                100
                <Icon path={mdiBee} size={1.5} />
              </button>
              <button
                className={
                  beeValue === 200 ? "reward-button active" : "reward-button"
                }
                onClick={() => handleButtonClick(200)}
              >
                {" "}
                200
                <Icon path={mdiBee} size={1.5} />
              </button>
              <button
                className={
                  beeValue === 300 ? "reward-button active" : "reward-button"
                }
                onClick={() => handleButtonClick(300)}
              >
                {" "}
                300
                <Icon path={mdiBee} size={1.5} />
              </button>
            </div>
            <div className="rewards-text-container">
              {beeValue === 25 && (
                <div className="reward-text">
                  <h3 className="reward-title">Customize your drink</h3>
                  <p className="reward-subtext">
                    Make your drink just right with an extra espresso shot,
                    nondairy milk or a dash of your favorite syrup.
                  </p>
                </div>
              )}
              {beeValue === 100 && (
                <div className="reward-text">
                  <h3 className="reward-title">
                    Brewed hot or iced coffee or tea, bakery item, packaged
                    snack and more
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
                    Handcrafted drink (Cold Brew, lattes and more) or hot
                    breakfast
                  </h3>
                  <p className="reward-subtext">
                    Turn good mornings great with a delicious handcrafted drink
                    of your choice, breakfast sandwich or oatmeal on us.
                  </p>
                </div>
              )}
              {beeValue === 300 && (
                <div className="reward-text">
                  <h3 className="reward-title">
                    Select GrindStone® merchandise
                  </h3>
                  <p className="reward-subtext">
                    Take home a signature cup, drink tumbler or your choice of
                    coffee merch. All exlcusive via our point system.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

Rewards.propTypes = {
  logoData: PropTypes.array.isRequired,
  rewardItems: PropTypes.array.isRequired,
};

export default Rewards;
