import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import PropTypes from "prop-types";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

function SignUp({ logoData }) {
  const { googleSignIn, testSignIn } = useAuth();

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    cardNumber: false,
    securityCode: false,
  });

  const [showForm, setFormShown] = useState(false);

  console.log(showForm);

  const handleSubmit = () => {
    const isCardNumberInvalid = isNaN(cardNumber) || cardNumber.length !== 16;
    const isSecurityCodeInvalid =
      isNaN(securityCode) || securityCode.length !== 8;

    setErrors({
      firstName: !firstName,
      lastName: !lastName,
      email: !email,
      password: !password,
      cardNumber: isCardNumberInvalid,
      securityCode: isSecurityCodeInvalid,
    });
  };

  const handleCardClick = () => {
    setFormShown(!showForm);
  };

  const handleGoogle = async () => {
    await googleSignIn();
    navigate("/");
  };

  const handleTest = async () => {
    await testSignIn();
    navigate("/");
  };

  return (
    <div>
      <Navbar data={logoData} from={"accountStatus"}></Navbar>
      <header className="sign-up-header-container">
        <h1 className="sign-up-header">Create an Account</h1>
        <h2 className="sub-header">GrindStone Rewards</h2>
        <p className="sub-header-text">
          Join GrindStone Rewards to earn Bees for free food and drinks, any way
          you pay. Get access to mobile ordering, a birthday Reward, and more.
        </p>
      </header>
      <main className="sign-in-main">
        <div className="sign-out-container">
          <div className="sign-in-legend">
            <p>* indicates required field</p>
          </div>
          <div className="sign-up-form-header">
            <h2 className="sign-up-header-text">Personal Information</h2>
          </div>
          <form>
            <div className="first-name-input-container">
              <input
                className={`first-name-input ${
                  errors.firstName ? "error" : ""
                }`}
                type="text"
                placeholder="* First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="last-name-input-container">
              <input
                className={`last-name-input ${errors.lastName ? "error" : ""}`}
                type="text"
                placeholder="* Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </form>
          <div className="sign-up-form-header">
            <h2 className="sign-up-header-text">Account Security</h2>
          </div>
          <form>
            <div className="email-input-container">
              <input
                className={`email-input ${errors.email ? "error" : ""}`}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password-input-container">
              <input
                className={`password-input ${errors.password ? "error" : ""}`}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>
          <div className="sign-up-form-header sign-up-form-header-special">
            <h2 className="sign-up-header-text sign-up-text-special">
              Already Have a Gift Card?
            </h2>
            <span className="span-orange" onClick={handleCardClick}>
              ›
            </span>
          </div>
          {showForm && (
            <>
              <div className="add-giftcard-container">
                <p className="add-giftcard-text">
                  Add your gift card (with no spaces or dashes) to earn Bees
                  when you pay and order ahead.
                </p>
              </div>
              <form className="giftcard-conditional-form">
                <div className="card-number-input-container">
                  <input
                    className={`card-number-input ${
                      errors.cardNumber ? "error" : ""
                    }`}
                    type="text"
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                <div className="security-code-input-container">
                  <input
                    className={`security-code-input ${
                      errors.securityCode ? "error" : ""
                    }`}
                    type="text"
                    placeholder="Security Code"
                    value={securityCode}
                    onChange={(e) => setSecurityCode(e.target.value)}
                  />
                </div>
              </form>
            </>
          )}
          <div className="sign-up-form-header">
            <h2 className="sign-up-header-text">Terms of Use</h2>
          </div>
          <div className="checkbox-overlay-container sign-up-overlay-container">
            <input type="checkbox" id="keep-signin" name="keep-signin" />
            <p>
              I agree to the{" "}
              <span className="orange-color-and-underline">
                GrindStone® Rewards Terms
              </span>{" "}
              and the{" "}
              <span className="orange-color-and-underline">
                GrindStone Card Terms
              </span>{" "}
              and have read the{" "}
              <span className="orange-color-and-underline">
                GrindStone Privacy Statement
              </span>
              .
            </p>
          </div>
          <div
            className={
              showForm
                ? "sign-out-button-adjust-container"
                : "sign-out-button-container"
            }
          >
            <button
              type="submit"
              onClick={handleSubmit}
              className="default-button orange sign-up-button"
            >
              <span>Create Account</span>
            </button>
          </div>
        </div>
      </main>
      <section className="actual-sign-up-section">
        <div className="actual-sign-up-container sign-out-container">
          <div className="actual-sign-up-header-container">
            <h1 className="actual-sign-up-header">Actual Sign In Process</h1>
          </div>
          <div className="actual-sign-up-text-container">
            <p className="actual-sign-up-text">
              Firebase allows sign-in via Google accounts, and given the scope
              of this project and overall development time, the above is just
              how the front-end should appear but has no back-end functionality.
              Please use one of the two following buttons to sign in.
            </p>
          </div>
          <div className="actual-sign-up-button-container">
            <button
              className="actual-sign-up-button default-button orange"
              onClick={() => handleGoogle()}
            >
              Sign In
            </button>
            <button
              className="test-button default-button orange"
              onClick={() => handleTest()}
            >
              Sign in as Test Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

SignUp.propTypes = {
  logoData: PropTypes.array.isRequired,
};

export default SignUp;
