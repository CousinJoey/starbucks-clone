import React from "react";
import PropTypes from "prop-types";

function HowItWorks({ rewardItems }) {
  const itemMap = rewardItems.reduce((acc, item) => {
    acc[item.name] = { src: item.src, name: item.name };
    return acc;
  }, {});

  const avaExtra = itemMap["fillerAv"];
  const phoneExtra = itemMap["fillerPhone"];
  const cofExtra = itemMap["fillerCoffee"];

  const extras = [phoneExtra, cofExtra, avaExtra];

  console.log(phoneExtra, cofExtra, avaExtra);

  return (
    <div>
      <div className="works-header">
        <div className="works-header-content-container">
          <h3 className="works-header-text">Welcome</h3>
        </div>
        <div className="works-header-text-container">
          <p>
            As a member you’ll collect Bees on almost everything you buy, and
            those Bees add up to (some really delicious) Rewards. Look out for
            some surprises and members-only extras.
          </p>
        </div>
      </div>
      <div className="works-content-container">
        {extras.map((item) => (
          <div key={item.src} className="works-info-item">
            <div className="works-info-image">
              <img className="works-img" src={item.src} />
            </div>
            {item.name === "fillerAv" && (
              <div className="works-info-text">
                <h3 className="works-text-title">Enjoy Rewards</h3>
                <p className="works-text">
                  Redeem your Bees for Rewards—like free food, drinks and more
                </p>
                <p className="works-text-dull">
                  Each Reward will be applied to the most expensive eligible
                  item.
                </p>
              </div>
            )}
            {item.name === "fillerCoffee" && (
              <div className="works-info-text">
                <h3 className="works-text-title">Earn Stars</h3>
                <p className="works-text">
                  Two Stars for every dollar you spend.
                </p>
                <p className="works-text-dull">
                  Or earn one Bee per dollar by paying with cash or credit/debit
                  card using the GrindStone® app.
                </p>
              </div>
            )}
            {item.name === "fillerPhone" && (
              <div className="works-info-text">
                <h3 className="works-text-title">Order & pay</h3>
                <p className="works-text">
                  Select the &quot;Scan in store&quot; button to use your
                  digital GrindStone Card at the register. Or order ahead for
                  pickup. Download the GrindStone® app for even more payment
                  options.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

HowItWorks.propTypes = {
  rewardItems: PropTypes.array.isRequired,
};

export default HowItWorks;
