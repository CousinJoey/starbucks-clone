import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function MenuBanner({ onBannerChange }) {
  const [bannerValue, setBannerValue] = useState("all");

  const handleMenuBannerClick = (value) => {
    onBannerChange(value);
    setBannerValue(value);
  };

  return (
    <div className="banner-menu">
      <ul className="banner-menu-items">
        <li className="menu-link">
          <a
            className={
              bannerValue === "all"
                ? "menu-link-text selected-menu-link"
                : "menu-link-text"
            }
            onClick={() => handleMenuBannerClick("all")}
          >
            All Products
          </a>
        </li>
        <li className="menu-link">
          <Link to={"/"}>
            <a
              className={
                bannerValue === "featured"
                  ? "menu-link-text selected-menu-link"
                  : "menu-link-text"
              }
            >
              Featured
            </a>
          </Link>
        </li>
        <li className="menu-link">
          <a
            className={
              bannerValue === "previous"
                ? "menu-link-text selected-menu-link"
                : "menu-link-text"
            }
            onClick={() => handleMenuBannerClick("previous")}
          >
            Previous Orders
          </a>
        </li>
        <li className="menu-link">
          <a
            className={
              bannerValue === "favorite"
                ? "menu-link-text selected-menu-link"
                : "menu-link-text"
            }
            onClick={() => handleMenuBannerClick("favorite")}
          >
            Favorite Products
          </a>
        </li>
      </ul>
    </div>
  );
}

MenuBanner.propTypes = {
  onBannerChange: PropTypes.func.isRequired,
};

export default MenuBanner;
