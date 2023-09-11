import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiMapMarker, mdiAccountCircle } from "@mdi/js";
import { useAuth } from "../../context/authContext";
import "../../style.css";

function Navbar({ data, from, isSticky }) {
  const { currentUser, signOut } = useAuth();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownClicked, setdropdownClicked] = useState(false);
  const [accountDropdownClicked, setAccountDropdownClicked] = useState(false);
  const [closing, setClosing] = useState(false);
  const dropdownRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setClosing(true);
        setTimeout(() => {
          setDropdownVisible(false);
          setClosing(false);
        }, 200);
      }
    }

    if (dropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  useEffect(() => {
    if (menuVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuVisible]);

  const closeMenu = () => {
    setMenuVisible(false);
    setdropdownClicked(false);
  };

  console.log(from);

  if (from === "accountStatus") {
    return (
      <header className="header">
        <nav className="nav">
          <div className="gutters">
            <div className="nav-items-container">
              <div className="logo-container-main">
                <div className="logo-container">
                  {data.map((logo) => (
                    <Link key={logo.id} to="/">
                      <img className="logo" key={logo.id} src={logo.src} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header
      className={isSticky !== undefined ? "header header-sticky" : "header"}
    >
      <nav className="nav">
        <div className="gutters">
          <div className="nav-items-container">
            <div className="logo-container-main">
              <div className="logo-container">
                <div>
                  {data.map((logo) => (
                    <Link key={logo.id} to="/">
                      <img className="logo" key={logo.id} src={logo.src} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div
              className="hamburger-menu"
              onClick={() => {
                setMenuVisible(!menuVisible);
                setdropdownClicked(!dropdownClicked);
              }}
            >
              ☰
            </div>
            {dropdownClicked && (
              <div
                className="info-dropdown-overlay"
                onClick={() => closeMenu()}
              >
                <div
                  className="info-dropdown-menu"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className="hamburger-item"
                    onClick={() =>
                      setAccountDropdownClicked(!accountDropdownClicked)
                    }
                  >
                    <p>Account</p>
                    {accountDropdownClicked && (
                      <div className="account-dropdown">
                        <ul>
                          <li>
                            <Link to="/account/card-management">
                              Card Management
                            </Link>
                          </li>
                          <li>
                            <Link to="/account/my-rewards">My Rewards</Link>
                          </li>
                          <li>
                            <Link to="/account/history">History</Link>
                          </li>
                          <li>
                            <Link to="/account/payment-methods">
                              Payment Methods
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <hr className="hamburger-hr"></hr>
                  <div className="hamburger-item">
                    <p onClick={() => closeMenu()}>
                      <Link
                        to="/menu"
                        state={{
                          filter: "all",
                        }}
                      >
                        Menu
                      </Link>
                    </p>
                  </div>
                  <div className="hamburger-item">
                    <p>
                      <Link to="/rewards">Rewards</Link>
                    </p>
                  </div>
                  <div className="hamburger-item">
                    <p>
                      <Link to="/gift-cards">Gift Cards</Link>
                    </p>
                  </div>
                  {from === "menu" && (
                    <>
                      <hr className="hamburger-hr"></hr>
                      <div className="hamburger-item">
                        <p onClick={() => closeMenu()}>
                          <Link to={"/"}>Featured</Link>
                        </p>
                      </div>
                      <div className="hamburger-item">
                        <p onClick={() => closeMenu()}>
                          <Link
                            to={"/menu"}
                            state={{
                              filter: "favorite",
                            }}
                          >
                            Favorites
                          </Link>
                        </p>
                      </div>
                      <div className="hamburger-item">
                        <p onClick={() => closeMenu()}>
                          <Link
                            to={"/menu"}
                            state={{
                              filter: "previous",
                            }}
                          >
                            Previous Orders
                          </Link>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            <div className="nav-clickables-container">
              <div className="page-links-container">
                <ul>
                  <li className="first-page-link">
                    <Link to="/menu">
                      <a className="link">Menu</a>
                    </Link>
                  </li>
                  <li className="page-links">
                    <Link to="/rewards">
                      <a className="link">Rewards</a>
                    </Link>
                  </li>
                  <li className="page-links">
                    <Link to="/gift-cards">
                      <a className="link">Gift Cards</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="function-links-container">
                <div className="function-link-items">
                  <Link to="/locations">
                    <a className="store-link function-link">
                      <Icon
                        className="store-svg"
                        path={mdiMapMarker}
                        size={1}
                      />
                      Find a Store
                    </a>
                  </Link>
                  {currentUser ? (
                    <div
                      className="account-icon-container"
                      onClick={() => setDropdownVisible(!dropdownVisible)}
                    >
                      <Icon
                        className="account-svg"
                        path={mdiAccountCircle}
                        size={1.5}
                      />
                      <div className="account-icon-text">
                        <p className="nav-account-text">Account</p>
                        <p
                          className={
                            dropdownVisible
                              ? "nav-account-dropdown-icon icon-rotate"
                              : "nav-account-dropdown-icon"
                          }
                        >
                          ›
                        </p>
                      </div>
                      {dropdownVisible && (
                        <ul
                          ref={dropdownRef}
                          className={`account-dropdown-menu ${
                            closing ? "closing" : ""
                          }`}
                        >
                          <Link to="/account/card-management">
                            <li className="account-dropdown-item">
                              Card Management
                            </li>
                          </Link>
                          <Link to="/account/my-rewards">
                            <li className="account-dropdown-item">
                              My Rewards
                            </li>
                          </Link>
                          <Link to="/account/history">
                            <li className="account-dropdown-item">History</li>
                          </Link>
                          <Link to="/account/payment-methods">
                            <li className="account-dropdown-item">
                              Payment Methods
                            </li>
                          </Link>
                          <hr className="account-dropdown-hr"></hr>
                          <Link to="/">
                            <li
                              className="account-dropdown-item"
                              onClick={signOut}
                            >
                              Sign Out
                            </li>
                          </Link>
                        </ul>
                      )}
                    </div>
                  ) : (
                    <>
                      <Link to="/sign-in">
                        <a className="default-button function-acc">Sign in</a>
                      </Link>
                      <Link to="/sign-up">
                        <a className="default-button black function-acc">
                          Join now
                        </a>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

Navbar.propTypes = {
  data: PropTypes.array.isRequired,
  from: PropTypes.string,
  isSticky: PropTypes.string.isRequired,
};

export default Navbar;
