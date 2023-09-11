import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import PropTypes from "prop-types";

function ProductCheckoutOverlay({
  handleCloseOverlay,
  subTotal,
  total,
  taxes,
  clearCart,
  getDefaultCard,
  getCreditCardInfo,
  getRewardsCardInfo,
  removeFundsDebitCard,
  removeFundsRewardsCard,
  getCardFunds,
  addCartToHistory,
  addOrderToHistory,
  cartItems,
}) {
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const [selectedCard, setSelectedCard] = useState(null);
  const [insufficientFunds, setInsufficientFunds] = useState(false);
  const [funds, setFunds] = useState({
    creditCardFunds: 0,
    rewardsCardFunds: 0,
  });

  const handleContinueClick = async () => {
    if (
      parseFloat(total) > parseFloat(funds[`${selectedCard?.type}CardFunds`])
    ) {
      setInsufficientFunds(true);
      console.log("Not enough funds.");
    } else {
      try {
        if (selectedCard?.type === "credit") {
          await removeFundsDebitCard(currentUser.uid, total);
        } else {
          await removeFundsRewardsCard(currentUser.uid, total);
        }

        const fundsData = await getCardFunds(currentUser.uid);

        const formattedFundsData = {
          creditCardFunds: Number(fundsData.creditCardFunds).toFixed(2),
          rewardsCardFunds: Number(fundsData.rewardsCardFunds).toFixed(2),
        };

        setFunds(formattedFundsData);

        await addCartToHistory(currentUser.uid);

        await addOrderToHistory(currentUser.uid, cartItems, total);

        await clearCart(currentUser.uid);
        handleCloseOverlay();
        navigate("/menu/cart");
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  useEffect(() => {
    async function fetchDefaultCardInfo() {
      const defaultCard = await getDefaultCard(currentUser.uid);
      const fundsData = await getCardFunds(currentUser.uid);

      const formattedFundsData = {
        creditCardFunds: Number(fundsData.creditCardFunds).toFixed(2),
        rewardsCardFunds: Number(fundsData.rewardsCardFunds).toFixed(2),
      };

      console.log(defaultCard);

      if (defaultCard === "credit") {
        const creditCardInfo = await getCreditCardInfo(currentUser.uid);
        setSelectedCard({ ...creditCardInfo, type: "credit" });
      } else {
        const rewardsCardInfo = await getRewardsCardInfo(currentUser.uid);
        setSelectedCard({ ...rewardsCardInfo, type: "rewards" });
      }

      setFunds(formattedFundsData);
    }
    fetchDefaultCardInfo();
  }, [getDefaultCard, getCreditCardInfo, getRewardsCardInfo, getCardFunds]);

  const handleSelectCard = async (cardType) => {
    if (cardType === "credit") {
      const creditCardInfo = await getCreditCardInfo(currentUser.uid);
      setSelectedCard({ ...creditCardInfo, type: "credit" });
    } else {
      const rewardsCardInfo = await getRewardsCardInfo(currentUser.uid);
      setSelectedCard({ ...rewardsCardInfo, type: "rewards" });
    }
  };

  const handleExitClick = () => {
    handleCloseOverlay();
  };

  return (
    <div className="product-checkout-overlay-container">
      <div className="product-checkout-overlay-gray"></div>
      <div className="product-checkout-overlay-content">
        <div className="product-checkout-padding">
          <div className="product-checkout-overlay-header-container">
            <h4 className="product-checkout-overlay-header">Choose Payment</h4>
            <div className="product-checkout-overlay-close-container">
              <p className="x-close" onClick={() => handleExitClick()}>
                X
              </p>
            </div>
          </div>
          <div className="dropdown-container product-checkout-dropdown">
            <div className="custom-label-and-button">
              <div className="custom-label-category-header">
                <p className="category-header-text">Payment Method</p>
              </div>
              <select
                className="custom-label-item custom-dropdown"
                value={selectedCard?.type}
                onChange={(e) => handleSelectCard(e.target.value)}
              >
                <option value="none">Select Card</option>
                <option value="credit">
                  Debit Card (last 4 - ${funds.creditCardFunds})
                </option>
                <option value="rewards">
                  GrindStone Card (last 4 - ${funds.rewardsCardFunds})
                </option>
              </select>
            </div>
          </div>
          <div className="overlay-price-info-container">
            <div className="checkout-subtotal-container">
              <p className="subtotal-static-text">Subtotal</p>
              <p className="subtotal-amount">{subTotal}</p>
            </div>
            <div className="checkout-taxes-container">
              <p className="taxes-static-text">Taxes</p>
              <p className="taxes-amount">{taxes}</p>
            </div>
            <div className="checkout-total-container">
              <p className="total-static-text">Total</p>
              <p className="total-amount">{total}</p>
            </div>
          </div>
        </div>
        <div className="product-checkout-overlay-button-container">
          <button
            onClick={() => handleContinueClick()}
            className="default-button orange product-checkout-button"
          >
            Continue
          </button>
        </div>
        {insufficientFunds === true && (
          <div className="insufficient-funds-product-checkout-container">
            <p className="insufficient-funds-product-checkout-text">
              *Transaction failed, insufficient funds
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

ProductCheckoutOverlay.propTypes = {
  handleCloseOverlay: PropTypes.func.isRequired,
  subTotal: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  taxes: PropTypes.string.isRequired,
  clearCart: PropTypes.func.isRequired,
  getDefaultCard: PropTypes.func.isRequired,
  getCreditCardInfo: PropTypes.func.isRequired,
  getRewardsCardInfo: PropTypes.func.isRequired,
  removeFundsDebitCard: PropTypes.func.isRequired,
  removeFundsRewardsCard: PropTypes.func.isRequired,
  getCardFunds: PropTypes.func.isRequired,
  addCartToHistory: PropTypes.func.isRequired,
  addOrderToHistory: PropTypes.func.isRequired,
  cartItems: PropTypes.array.isRequired,
};

export default ProductCheckoutOverlay;
