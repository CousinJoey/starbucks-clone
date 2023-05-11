import React from "react";

function RewardsGettingStarted() {
  return (
    <div className="getting-started-main">
      <div className="getting-started-container">
        <div className="getting-started-header-container">
          <h2 className="getting-started-header">Getting started is easy</h2>
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
                To get started, <span className="rewards-span">join now</span>.
                You can also{" "}
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
  );
}

export default RewardsGettingStarted;
