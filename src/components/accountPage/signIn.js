import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import PropTypes from "prop-types";
import { useAuth } from "../../context/authContext";
import Icon from "@mdi/react";
import { mdiEyeOutline, mdiEyeOffOutline } from "@mdi/js";
import { useNavigate } from "react-router-dom";

function SignIn({ logoData }) {
  const { googleSignIn, testSignIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [errors, setErrors] = useState({ email: false, password: false });

  const handleLogin = () => {
    setErrors({ email: !email, password: !password });
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
      <main className="sign-in-main">
        <div className="sign-in-title-container">
          <h1>Sign In or Create an Account</h1>
        </div>
        <div className="sign-in-container">
          <div className="sign-in-legend">
            <p>* indicates required field</p>
          </div>
          <form>
            <div className="email-input-container">
              <input
                className={`email-input ${errors.email ? "error" : ""}`}
                type="email"
                placeholder="* Username or Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password-input-container">
              <input
                className={`password-input ${errors.password ? "error" : ""}`}
                type={showPassword ? "text" : "password"}
                placeholder="* Password"
                value={password}
                onChange={(e) => setPassword(e.target.value.replace(/\s/g, ""))}
              />
              <button
                type="button"
                className="show-hide-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Icon
                    path={mdiEyeOutline}
                    size={1}
                    className="sign-in-icon"
                  />
                ) : (
                  <Icon
                    path={mdiEyeOffOutline}
                    size={1}
                    className="sign-in-icon"
                  />
                )}
              </button>
            </div>
            <div className="checkbox-overlay-container">
              <input type="checkbox" id="keep-signin" name="keep-signin" />
              <p>Keep me signed in.</p>
              <span
                onClick={() => setShowDetails(true)}
                className="orange-color-and-underline"
              >
                Details
              </span>
              {showDetails && (
                <div className="overlay">
                  <p>
                    Checking this box will reduce the number of times you’re
                    asked to sign in. To keep your account secure, use this
                    option only on your personal devices.
                  </p>
                  <div className="overlay-button-container">
                    <button
                      onClick={() => setShowDetails(false)}
                      className="default-button orange"
                    >
                      Got It
                    </button>
                  </div>
                </div>
              )}
            </div>
            <span className="orange-color-and-underline">
              {" "}
              Forgot your username?
            </span>
            <span className="orange-color-and-underline">
              Forgot your password?
            </span>
            <div className="sign-in-button-container">
              <button
                type="button"
                onClick={handleLogin}
                className="sign-in-button default-button orange"
              >
                Sign In
              </button>
            </div>
          </form>
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

SignIn.propTypes = {
  logoData: PropTypes.array.isRequired,
};

export default SignIn;
