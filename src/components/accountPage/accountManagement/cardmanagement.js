import React, { useState, useEffect } from "react";
import Navbar from "../../navbar/navbar";
import { useAuth } from "../../../context/authContext";
import CardManagementOverlay from "./cardManagementSubComponent/cardManagementOverlay";
import PropTypes from "prop-types";

function CardManagement({
  logoData,
  getCardFunds,
  removeFundsDebitCard,
  addFundsRewardsCard,
  getRewardsCardInfo,
  getCreditCardInfo,
}) {
  const { currentUser } = useAuth();

  const [reloadOverlay, setReloadOverlay] = useState(false);

  const [funds, setFunds] = useState({
    creditCardFunds: "",
    rewardsCardFunds: "",
  });

  const handleOpenOverlay = () => {
    setReloadOverlay(true);
    console.log(reloadOverlay);
  };

  const handleCloseOverlay = () => {
    setReloadOverlay(false);
  };

  useEffect(() => {
    async function fetchCardInfo() {
      const fundsData = await getCardFunds(currentUser.uid);
      setFunds(fundsData);
    }
    fetchCardInfo();
  }, [getCardFunds, currentUser]);

  if (funds.rewardsCardFunds === "") {
    return (
      <div className="loading-placeholder loading-centered">
        <div className="loading-circle"></div>
      </div>
    );
  }

  return (
    <div>
      <Navbar data={logoData} />
      <main className="card-management-main">
        <div className="leftside-card-management-container">
          <div className="leftside-card-management-text-container">
            <h1 className="leftside-header">GrindStone Card</h1>
            <h4 className="leftside-text">Pay</h4>
          </div>
        </div>
        <div className="rightside-card-management-container">
          <div className="card-management-card-display-container">
            <div className="card-management-info-container">
              <div className="card-management-info">
                <p className="card-management-amount">
                  $
                  {parseFloat(
                    parseFloat(funds.rewardsCardFunds).toFixed(2)
                  ).toString()}
                </p>
                <p className="card-management-text">Manage</p>
              </div>
            </div>
            <div className="card-management-gift-card-container">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/starbucks-clone-34c1a.appspot.com/o/Images%2FgiftCards%2F3.png?alt=media&token=c4bb3e01-c73e-450c-8581-56cb843a0f63"
                className="card-management-gift-card-img"
              />
            </div>
          </div>
          <div className="card-management-outline-container">
            <div className="card-management-outline">
              <p className="card-management-outline-text">+ Add Card</p>
            </div>
          </div>
          <div className="card-management-static-button">
            <button
              onClick={() => handleOpenOverlay()}
              className="default-button orange card-management-button"
            >
              Add Money
            </button>
          </div>
          {reloadOverlay === true ? (
            <CardManagementOverlay
              handleCloseOverlay={handleCloseOverlay}
              getCardFunds={getCardFunds}
              removeFundsDebitCard={removeFundsDebitCard}
              addFundsRewardsCard={addFundsRewardsCard}
              getCreditCardInfo={getCreditCardInfo}
              getRewardsCardInfo={getRewardsCardInfo}
            />
          ) : (
            <></>
          )}
        </div>
      </main>
    </div>
  );
}

CardManagement.propTypes = {
  logoData: PropTypes.array.isRequired,
  getCardFunds: PropTypes.func.isRequired,
  removeFundsDebitCard: PropTypes.func.isRequired,
  addFundsRewardsCard: PropTypes.func.isRequired,
  getRewardsCardInfo: PropTypes.func.isRequired,
  getCreditCardInfo: PropTypes.func.isRequired,
};

export default CardManagement;
