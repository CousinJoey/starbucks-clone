import React from "react";
import Icon from "@mdi/react";
import { mdiBee } from "@mdi/js";
import PropTypes from "prop-types";

function RewardsSavings({ rewardItems }) {
  const itemMap = rewardItems.reduce((acc, item) => {
    acc[item.name] = { src: item.src, name: item.name };
    return acc;
  }, {});

  const card = itemMap["card"];
  const giftCard = itemMap["giftCard"];
  const phone = itemMap["phone"];
  const phoneCard = itemMap["phoneCard"];

  return (
    <div className="savings-main">
      <div className="savings-hero">
        <h2>Cash or card, you earn Bees</h2>
        <p className="savings-hero-subtext">
          No matter how you pay, you can earn Bees with your morning coffee.
          Those Bees add up to (really delicious) Rewards.
        </p>
      </div>
      <div className="one-bee-grid">
        <div className="pay-as-you-go">
          <p className="bee-text">
            1{" "}
            <span className="bee-svg">
              <Icon path={mdiBee} size={1.2} />
            </span>{" "}
            <span>Per dollar</span>
          </p>
          <p className="bee-subtext">Pay as you go</p>
        </div>
        <div className="savings-grid-item-container">
          <div className="savings-grid-item">
            <div className="savings-grid-image-container">
              <img className="savings-grid-image" src={phoneCard.src} />
            </div>
            <div className="savings-grid-text-container">
              <div className="savings-grid-text-title-container">
                <h3 className="savings-title">Scan and pay seperately</h3>
                <p className="savings-text">
                  Use cash or credit/debit card at the register.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="savings-grid-item-container">
          <div className="savings-grid-item">
            <div className="savings-grid-image-container">
              <img className="savings-grid-image" src={phone.src} />
            </div>
            <div className="savings-grid-text-container">
              <div className="savings-grid-text-title-container">
                <h3 className="savings-title">Save payment in the app</h3>
                <p className="savings-text">
                  Check-out faster by saving a credit/debit card or PayPal to
                  your account. You’ll be able to order ahead or scan and pay at
                  the register in one step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="savings-hr"></hr>
      <div className="two-bee-grid">
        <div className="add-funds">
          <p className="bee-text">
            2{" "}
            <span className="bee-svg">
              <Icon path={mdiBee} size={1.2} />
            </span>{" "}
            <span>Per dollar</span>
          </p>
          <p className="bee-subtext">Add funds in the app</p>
        </div>
        <div className="savings-grid-item-container">
          <div className="savings-grid-item">
            <div className="savings-grid-image-container">
              <img className="savings-grid-image" src={card.src} />
            </div>
            <div className="savings-grid-text-container">
              <div className="savings-grid-text-title-container">
                <h3 className="savings-title">Preload</h3>
                <p className="savings-text">
                  To save time and earn Bees twice as fast, add money to your
                  digital GrindStone Card using any payment option. Scan and pay
                  in one step or order ahead in the app.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="savings-grid-item-container">
          <div className="savings-grid-item">
            <div className="savings-grid-image-container">
              <img className="savings-grid-image" src={giftCard.src} />
            </div>
            <div className="savings-grid-text-container">
              <div className="savings-grid-text-title-container">
                <h3 className="savings-title">Register your gift card</h3>
                <p className="savings-text">
                  Then use it to pay through the app. You can even consolidate
                  balances from multiple cards in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

RewardsSavings.propTypes = {
  rewardItems: PropTypes.array.isRequired,
};

export default RewardsSavings;
