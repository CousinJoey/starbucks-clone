import React, { useState } from "react";
import Navbar from "../../navbar/navbar";
import PropTypes from "prop-types";
import RewardsComponent from "./rewardsSubComponent/rewardsComponent";
import RewardsLegend from "./rewardsSubComponent/rewardsLegend";
import HowItWorks from "./rewardsSubComponent/howItWorks";

function MyRewards({ logoData, rewardItems }) {
  const [page, setPage] = useState("default");

  const handlePageChange = (value) => {
    setPage(value);
  };

  return (
    <div>
      <Navbar data={logoData} isSticky={"yes"} />
      <main className="account-rewards-main">
        <div className="leftside-rewards-container">
          <div className="leftside-card-management-text-container">
            <h1 className="leftside-header">Grindstone Rewards</h1>
            <h4
              className={
                page === "default"
                  ? "leftside-text active-leftside-text"
                  : "leftside-text"
              }
              onClick={() => handlePageChange("default")}
            >
              My Rewards
            </h4>
            <h4
              className={
                page === "secondary"
                  ? "leftside-text active-leftside-text"
                  : "leftside-text"
              }
              onClick={() => handlePageChange("secondary")}
            >
              How it works
            </h4>
          </div>
        </div>
        <div className="rightside-rewards-container">
          <div className="secondary-reward-buttons-container">
            <h4
              className={
                page === "default"
                  ? "leftside-text active-leftside-text"
                  : "leftside-text"
              }
              onClick={() => handlePageChange("default")}
            >
              My Rewards
            </h4>
            <h4
              className={
                page === "secondary"
                  ? "leftside-text active-leftside-text"
                  : "leftside-text"
              }
              onClick={() => handlePageChange("secondary")}
            >
              How it works
            </h4>
          </div>
          {page === "default" && (
            <>
              <RewardsComponent />
              <hr className="styled-hr" />
              <RewardsLegend />
            </>
          )}
          {page === "secondary" && <HowItWorks rewardItems={rewardItems} />}
        </div>
      </main>
    </div>
  );
}

MyRewards.propTypes = {
  logoData: PropTypes.array.isRequired,
  rewardItems: PropTypes.array.isRequired,
};

export default MyRewards;
