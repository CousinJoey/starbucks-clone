import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiMapMarker } from "@mdi/js";
import "../../style.css";

function Navbar({ data }) {
  return (
    <header className="header">
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
                    <a className="link">Featured</a>
                  </li>
                </ul>
              </div>
              <div className="function-links-container">
                <div className="function-link-items">
                  <a className="store-link function-link">
                    <Icon className="store-svg" path={mdiMapMarker} size={1} />
                    Find a Store
                  </a>
                  <a className="default-button function-acc">Sign in</a>
                  <a className="default-button black function-acc">Join now</a>
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
};

export default Navbar;
