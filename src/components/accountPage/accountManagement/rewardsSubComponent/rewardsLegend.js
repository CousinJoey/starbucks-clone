import React from "react";
import Icon from "@mdi/react";
import { mdiBee } from "@mdi/js";

function RewardsLegend() {
  return (
    <div className="rewards-legend-container">
      <h2 className="rewards-legend-header">Bees add up to rewards</h2>
      <div className="reward-legend-item">
        <div className="reward-legend-amount">
          <p
            className="reward-legend-amount-and-svg"
            style={{ color: "white" }}
          >
            25{" "}
            <span
              style={{ color: "black" }}
              className="bee-svg bee-rewards-svg"
            >
              <Icon path={mdiBee} size={1.1} />
            </span>{" "}
          </p>
        </div>
        <div className="reward-legend-text">
          <p>
            Customize your drink (espresso shot, nondairy milk, syrup and more)
          </p>
        </div>
      </div>
      <div className="reward-legend-item">
        <div className="reward-legend-amount">
          <p
            className="reward-legend-amount-and-svg"
            style={{ color: "white" }}
          >
            100{" "}
            <span
              className="bee-svg bee-rewards-svg"
              style={{ color: "black" }}
            >
              <Icon path={mdiBee} size={1.1} />
            </span>{" "}
          </p>
        </div>
        <div className="reward-legend-text">
          <p>Brewed hot or iced coffee or tea, bakery item and more</p>
        </div>
      </div>
      <div className="reward-legend-item">
        <div className="reward-legend-amount">
          <p
            className="reward-legend-amount-and-svg"
            style={{ color: "white" }}
          >
            200{" "}
            <span
              className="bee-svg bee-rewards-svg"
              style={{ color: "black" }}
            >
              <Icon path={mdiBee} size={1.1} />
            </span>{" "}
          </p>
        </div>
        <div className="reward-legend-text">
          <p>Handcrafted drink (Cold Brew, lattes and more) or hot breakfast</p>
        </div>
      </div>
      <div className="reward-legend-item">
        <div className="reward-legend-amount">
          <p
            className="reward-legend-amount-and-svg"
            style={{ color: "white" }}
          >
            300{" "}
            <span
              className="bee-svg bee-rewards-svg"
              style={{ color: "black" }}
            >
              <Icon path={mdiBee} size={1.1} />
            </span>{" "}
          </p>
        </div>
        <div className="reward-legend-text">
          <p>
            Select GrindStone® merchandise (Only redeemable in-store at
            participating locations){" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RewardsLegend;
