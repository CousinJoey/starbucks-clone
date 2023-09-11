import React, { useState, useEffect } from "react";
import Navbar from "../../navbar/navbar";
import PropTypes from "prop-types";
import { useAuth } from "../../../context/authContext";
import Icon from "@mdi/react";
import { mdiIntegratedCircuitChip } from "@mdi/js";

function PaymentMethods({
  logoData,
  getCreditCardInfo,
  getDefaultCard,
  setDefaultRewardsCard,
  setDefaultCreditCard,
}) {
  const { currentUser } = useAuth();

  const [isDefault, setIsDefault] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [card, setCard] = useState(null);
  const [defaultStatus, setDefaultStatus] = useState(null);

  useEffect(() => {
    if (defaultStatus) {
      setIsDefault(defaultStatus.defaultCreditCard);
    }
  }, [defaultStatus]);

  useEffect(() => {
    async function fetchData() {
      const fetchedCard = await getCreditCardInfo(currentUser.uid);
      const fetchedDefaultStatus = await getDefaultCard(currentUser.uid);

      setCard(fetchedCard);
      setDefaultStatus(fetchedDefaultStatus);
    }
    fetchData();
  }, [getCreditCardInfo, getDefaultCard]);

  const toggleSwitch = async () => {
    if (isToggling) {
      return;
    }
    setIsToggling(true);
    setIsDefault(!isDefault);
  };

  const updateDefaultStatus = async () => {
    if (isDefault) {
      await setDefaultCreditCard(currentUser.uid);
    } else {
      await setDefaultRewardsCard(currentUser.uid);
    }
    setIsToggling(false);
  };

  useEffect(() => {
    if (isToggling) {
      updateDefaultStatus();
    }
  }, [isDefault, isToggling]);

  if (!card || !defaultStatus) {
    return (
      <div className="loading-placeholder loading-centered">
        <div className="loading-circle"></div>
      </div>
    );
  }

  return (
    <div>
      <Navbar data={logoData} />
      <main className="payment-methods-main">
        <div className="leftside-payment-method-container">
          <div className="leftside-card-management-text-container">
            <h1 className="leftside-header">Payment Methods</h1>
          </div>
        </div>
        <div className="rightside-payment-method-container">
          <div className="payment-method-header-container">
            <h3 className="payment-method-header">Credit/Debit Card</h3>
            <p className="faker-disclaimer">
              *All credit card information displayed on this website is
              simulated and generated using the Faker React library. No real
              transactions are being processed or recorded. The displayed data
              is for demonstration purposes only and should not be considered as
              genuine or used for any financial transactions.
            </p>
          </div>
          <div className="payment-method-display-container">
            <div className="payment-method-display">
              <div className="payment-method-info-container">
                <div className="payment-method-display-header">Debit Card</div>
                <div className="chip-icon">
                  <Icon path={mdiIntegratedCircuitChip} size={2} />
                </div>
                <div className="payment-method-display-number">
                  <p>{card.number}</p>
                </div>
                <div className="payment-method-extra-info">
                  <div className="payment-method-display-name">
                    <p>{card.name}</p>
                  </div>
                  <div className="payment-method-code-and-exp">
                    <p>{card.expiryDate}</p>
                    <p>{card.cvv}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="default-toggle-container">
            <p className="default-toggle-text">Make this your default card?</p>
            <div
              className={`default-toggle-switch ${
                isDefault ? "default-toggle-on" : "default-toggle-off"
              }`}
              onClick={toggleSwitch}
            >
              <div
                className={`default-toggle-handle ${
                  isDefault
                    ? "default-toggle-handle-on"
                    : "default-toggle-handle-off"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

PaymentMethods.propTypes = {
  logoData: PropTypes.array.isRequired,
  getCreditCardInfo: PropTypes.func.isRequired,
  getDefaultCard: PropTypes.func.isRequired,
  setDefaultRewardsCard: PropTypes.func.isRequired,
  setDefaultCreditCard: PropTypes.func.isRequired,
};

export default PaymentMethods;
