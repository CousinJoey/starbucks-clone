import React from "react";
import PropTypes from "prop-types";

function RewardsHeader({ rewardItems }) {
  const itemMap = rewardItems.reduce((acc, item) => {
    acc[item.name] = { src: item.src, name: item.name };
    return acc;
  }, {});

  const headerImg = itemMap["headerImg"];

  return (
    <header className="header-container">
      <div className="header-img-container">
        <div
          className="header-img"
          style={{ backgroundImage: `url(${headerImg.src})` }}
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
              Or <span className="rewards-span">join in the app</span> for the
              best experience
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

RewardsHeader.propTypes = {
  rewardItems: PropTypes.array.isRequired,
};

export default RewardsHeader;
