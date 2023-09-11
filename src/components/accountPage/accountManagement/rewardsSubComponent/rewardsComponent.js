import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiWater } from "@mdi/js";
import { mdiBee } from "@mdi/js";

function RewardsComponent() {
  const maxPoints = 400;
  const [points, setPoints] = useState(200);

  const scalePoints = (points) => {
    let scaledPoints;
    if (points <= 25) {
      scaledPoints = (points / 25) * 20;
    } else if (points <= 100) {
      scaledPoints = ((points - 25) / (100 - 25)) * 20 + 20;
    } else if (points <= 200) {
      scaledPoints = ((points - 100) / (200 - 100)) * 20 + 40;
    } else if (points <= 300) {
      scaledPoints = ((points - 200) / (300 - 200)) * 20 + 60;
    } else {
      scaledPoints = ((points - 300) / (400 - 300)) * 20 + 80;
    }
    return Math.min(scaledPoints, 100);
  };

  const scaledPoints = scalePoints(points);

  const markerStyle = {
    left: `${scaledPoints}%`,
  };

  const dynamicLineStyle = {
    width: `${scaledPoints}%`,
  };

  const handleTestClick = () => {
    let newPoints = points + 5;
    if (newPoints <= maxPoints) {
      setPoints(newPoints);
    }
    console.log(points);
    console.log(scaledPoints);
  };

  return (
    <div className="rewards-progression-container">
      <div className="rewards-progression-header">
        <h4>Reward Status</h4>
      </div>
      <div className="reward-progression-header-visual">
        <div className="reward-progression-header-amount">
          <p className="reward-legend-amount-and-svg progression-amount">
            {points}{" "}
            <span
              style={{ color: "black" }}
              className="bee-svg bee-rewards-svg"
            >
              <Icon path={mdiBee} size={1.5} />
            </span>{" "}
          </p>
        </div>
        <div className="reward-progression-header-subtext">
          <h5 className="bee-balance-rewards">Bee Balance</h5>
        </div>
      </div>
      <div className="milestone-track">
        <div className="milestone-line-static"></div>
        <div className="milestone-line-dynamic" style={dynamicLineStyle}></div>
        <div
          className="milestone-point"
          style={{
            backgroundColor: points >= 25 ? "#ffbd59" : "white",
            left: "20%",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        ></div>
        <div
          className="milestone-text"
          style={{
            left: "20%",
            transform: "translateX(-50%) translateY(20%)",
          }}
        >
          <p className="milestone-amount">25</p>
        </div>
        <div
          className="milestone-point"
          style={{
            backgroundColor: points >= 100 ? "#ffbd59" : "white",
            left: "40%",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        ></div>
        <div
          className="milestone-text"
          style={{
            left: "40%",
            transform: "translateX(-50%) translateY(20%)",
          }}
        >
          <p className="milestone-amount">100</p>
        </div>
        <div
          className="milestone-point"
          style={{
            backgroundColor: points >= 200 ? "#ffbd59" : "white",
            left: "60%",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        ></div>
        <div
          className="milestone-text"
          style={{
            left: "60%",
            transform: "translateX(-50%) translateY(20%)",
          }}
        >
          <p className="milestone-amount">200</p>
        </div>
        <div
          className="milestone-point"
          style={{
            backgroundColor: points >= 300 ? "#ffbd59" : "white",
            left: "80%",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        ></div>
        <div
          className="milestone-text"
          onClick={handleTestClick}
          style={{
            left: "80%",
            transform: "translateX(-50%) translateY(20%)",
          }}
        >
          <p className="milestone-amount">300</p>
        </div>
        <div className="milestone-marker" style={markerStyle}>
          <Icon className="marker-icon" path={mdiWater} size={1} />
        </div>
      </div>
    </div>
  );
}

export default RewardsComponent;
