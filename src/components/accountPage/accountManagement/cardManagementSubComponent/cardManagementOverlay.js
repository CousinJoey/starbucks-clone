import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../context/authContext";
import PropTypes from "prop-types";

function CardManagementOverlay({
  handleCloseOverlay,
  getCardFunds,
  removeFundsDebitCard,
  addFundsRewardsCard,
  getRewardsCardInfo,
  getCreditCardInfo,
}) {
  const { currentUser } = useAuth();

  const [funds, setFunds] = useState({
    creditCardFunds: 0,
    rewardsCardFunds: 0,
  });
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [creditCard, setCreditCard] = useState({});
  const [rewardsCard, setRewardsCard] = useState({});

  const [insufficientFundsText, setInsufficientFundsText] = useState(false);

  useEffect(() => {
    async function fetchCardInfo() {
      const fundsData = await getCardFunds(currentUser.uid);
      setFunds(fundsData);
      const creditCardData = await getCreditCardInfo(currentUser.uid);
      setCreditCard(creditCardData);
      const rewardsCardData = await getRewardsCardInfo(currentUser.uid);
      setRewardsCard(rewardsCardData);
    }
    fetchCardInfo();
  }, [getCardFunds, getCreditCardInfo, getRewardsCardInfo, currentUser]);

  const handleExitClick = () => {
    handleCloseOverlay();
  };

  const handleTransferFunds = async () => {
    if (funds.creditCardFunds >= selectedAmount) {
      await removeFundsDebitCard(currentUser.uid, selectedAmount);
      await addFundsRewardsCard(currentUser.uid, selectedAmount);
      const updatedFundsData = await getCardFunds(currentUser.uid);
      setFunds(updatedFundsData);
      handleCloseOverlay();
    } else {
      setInsufficientFundsText(true);
      setTimeout(() => {
        setInsufficientFundsText(false);
      }, 3000);
    }
  };

  if (!funds) {
    return <div>Loading...</div>;
  }

  const lastFourCreditCard = creditCard.number?.slice(-4);
  const lastFourRewardsCard = rewardsCard.number?.slice(-4);

  return (
    <div className="card-management-overlay-container">
      <div className="card-management-overlay-gray"></div>
      <div className="card-management-overlay-content">
        <div className="card-management-padding">
          <div className="card-management-overlay-header-container">
            <h4 className="card-management-overlay-header">
              Add money to your GrindStone Card
            </h4>
            <div className="card-management-overlay-close-container">
              <p className="x-close" onClick={() => handleExitClick()}>
                X
              </p>
            </div>
          </div>
          <div className="dropdown-container card-management-dropdown">
            <div className="custom-label-and-button">
              <div className="custom-label-category-header">
                <p className="category-header-text">GrindStone Card</p>
              </div>
              <select className="custom-label-item custom-dropdown">
                <option value="none">Select Card</option>
                <option value="none">
                  GrindStone Card ({lastFourRewardsCard} - $
                  {parseFloat(funds.rewardsCardFunds).toFixed(2)})
                </option>
              </select>
            </div>
            <div className="custom-label-and-button">
              <div className="custom-label-category-header">
                <p className="category-header-text">Amount</p>
              </div>
              <select
                className="custom-label-item custom-dropdown"
                onChange={(e) => setSelectedAmount(Number(e.target.value))}
              >
                <option value="10">$10.00</option>
                <option value="25">$25.00</option>
                <option value="50">$50.00</option>
                <option value="100">$100.00</option>
              </select>
            </div>
            <div className="custom-label-and-button">
              <div className="custom-label-category-header">
                <p className="category-header-text">Payment Method</p>
              </div>
              <select className="custom-label-item custom-dropdown">
                <option value="none">Select Card</option>
                <option value="none">
                  Debit Card ({lastFourCreditCard} - $
                  {parseFloat(funds.creditCardFunds).toFixed(2)})
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="card-management-overlay-button-container">
          <button
            onClick={() => handleTransferFunds()}
            className="default-button orange card-management-button"
          >
            Continue
          </button>
        </div>
        {insufficientFundsText === true && (
          <div className="card-management-insufficient-funds-container">
            <p className="insufficient-funds-text">
              *Transaction failed, insufficient funds
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

CardManagementOverlay.propTypes = {
  handleCloseOverlay: PropTypes.func.isRequired,
  getCardFunds: PropTypes.func.isRequired,
  removeFundsDebitCard: PropTypes.func.isRequired,
  addFundsRewardsCard: PropTypes.func.isRequired,
  getRewardsCardInfo: PropTypes.func.isRequired,
  getCreditCardInfo: PropTypes.func.isRequired,
};

export default CardManagementOverlay;
