import React from "react";
import PropTypes from "prop-types";

function RewardsDelta({ rewardItems }) {
  const itemMap = rewardItems.reduce((acc, item) => {
    acc[item.name] = { src: item.src, name: item.name };
    return acc;
  }, {});

  const deltaBackground = itemMap["deltaBackground"];
  const fakeDelta = itemMap["fakeDelta"];

  return (
    <div className="delta-main">
      <div className="delta-container">
        <div className="delta-img-and-text-container">
          <div
            className="delta-background-img"
            style={{ backgroundImage: `url(${deltaBackground.src})` }}
          ></div>
          <div className="hero-and-delta-container">
            <div className="hero-container">
              <h2 className="delta-hero-title">Keep the Rewards Coming</h2>
              <p className="delta-hero-text">
                The Rewards don’t stop at your morning coffee. Join GrindStone®
                Rewards and unlock perks from our partners, all while earning
                more Bees.
              </p>
            </div>
            <div className="delta-text-and-logo-container">
              <div className="delta-text-and-logo-subcontainer">
                <div className="delta-logo-container">
                  <img className="delta-logo" src={fakeDelta.src} />
                </div>
                <p className="delta-text">
                  Link your Omega SkyMiles® and GrindStone® Rewards accounts to
                  earn 1 mile per $1* spent at GrindStone and double Bees on
                  Omega travel days.
                </p>
              </div>
            </div>
            <div className="delta-button-container">
              <button className="default-button orange">
                Join GrindStone Rewards
              </button>
            </div>
          </div>
          <div
            className="delta-background-img"
            style={{ backgroundImage: `url(${deltaBackground.src})` }}
          ></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

RewardsDelta.propTypes = {
  rewardItems: PropTypes.array.isRequired,
};

export default RewardsDelta;
