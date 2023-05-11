import React from "react";
import PropTypes from "prop-types";

function RewardsExtrasInfo({ rewardItems }) {
  const itemMap = rewardItems.reduce((acc, item) => {
    acc[item.name] = { src: item.src, name: item.name };
    return acc;
  }, {});

  const avaExtra = itemMap["fillerAv"];
  const phoneExtra = itemMap["fillerPhone"];
  const cofExtra = itemMap["fillerCoffee"];

  const extras = [avaExtra, phoneExtra, cofExtra];

  return (
    <div className="extras-main">
      <div className="extras-container">
        <div className="extras-hero">
          <h2 className="extras-hero-title">Endless Extras</h2>
          <p className="extras-hero-text">
            Joining GrindStone® Rewards means unlocking access to exclusive
            benefits. Say hello to easy ordering, tasty Rewards and—yes, free
            coffee.
          </p>
        </div>
        <div className="extras-info-container">
          {extras.map((item) => (
            <div key={item.src} className="extras-info-item">
              <div className="class-info-image">
                <img className="extras-img" src={item.src} />
              </div>
              {item.name === "fillerAv" && (
                <div className="extras-info-text">
                  <h3 className="extras-text-title">Fun Freebies</h3>
                  <p className="extras-text">
                    Not only can you earn free coffee, look forward to a
                    birthday treat plus coffee and tea refills.
                  </p>
                  <button className="extras-button">learn more</button>
                </div>
              )}
              {item.name === "fillerCoffee" && (
                <div className="extras-info-text">
                  <h3 className="extras-text-title">Order & pay ahead</h3>
                  <p className="extras-text">
                    Enjoy the convenience of in-store, curbside or drive-thru
                    pickup at select stores.
                  </p>
                  <button className="extras-button">learn more</button>
                </div>
              )}
              {item.name === "fillerPhone" && (
                <div className="extras-info-text">
                  <h3 className="extras-text-title">Get to free faster</h3>
                  <p className="extras-text">
                    Earn Stars even quicker with Bonus Star challenges, Double
                    Star Days and exciting games.
                  </p>
                  <button className="extras-button">learn more</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

RewardsExtrasInfo.propTypes = {
  rewardItems: PropTypes.array.isRequired,
};

export default RewardsExtrasInfo;
