import React from "react";
import PropTypes from "prop-types";
import Navbar from "../navbar/navbar";
import RewardsHeader from "./rewardsStatic/rewardsHeader";
import RewardsGettingStarted from "./rewardsStatic/rewardsGettingStarted";
import RewardsChoice from "./rewardsStatic/rewardsChoice";
import RewardsExtrasInfo from "./rewardsStatic/rewardsExtrasInfo";
import RewardsSavings from "./rewardsStatic/rewardsSavings";
import RewardsDelta from "./rewardsStatic/rewardsDelta";

function Rewards({ logoData, rewardItems }) {
  return (
    <div>
      <Navbar data={logoData} />
      <main>
        <div className="banner">
          <p className="banner-text">GrindStone Rewards</p>
        </div>
        <RewardsHeader rewardItems={rewardItems} />
        <RewardsGettingStarted />
        <RewardsChoice />
        <RewardsExtrasInfo rewardItems={rewardItems} />
        <RewardsSavings rewardItems={rewardItems} />
        <RewardsDelta rewardItems={rewardItems} />
      </main>
    </div>
  );
}

Rewards.propTypes = {
  logoData: PropTypes.array.isRequired,
  rewardItems: PropTypes.array.isRequired,
};

export default Rewards;
