import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Navbar from "../navbar/navbar";
import MenuSidebar from "./menuSidebar/menuSidebar";
import MenuSections from "./menuSubcomponents/menuSections";
import MenuBanner from "./menuStatic/menuBanner";
import MenuAllView from "./menuStatic/menuAllView";
import Favorites from "./menuStatic/menuBannerSubComponents/favorites";
import PreviousOrders from "./menuStatic/menuBannerSubComponents/previousOrders";
import { useLocation } from "react-router-dom";

function Menu({
  menuItems,
  logoData,
  fetchUserFavorites,
  addItemToCart,
  removeFromFavorites,
  fetchUserHistory,
}) {
  const location = useLocation();

  const [menuBannerValue, setMenuBannerValue] = useState("all");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (location.state && location.state.filter) {
      setMenuBannerValue(location.state.filter);
    }
  }, [location.state]);

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const handleBannerChange = (value) => {
    setMenuBannerValue(value);
    setFilter("all");
  };

  const handleBackClick = () => {
    setFilter("all");
  };

  const menuMap = {};
  const specificMap = {};
  const subHeadingMap = {};

  menuItems.forEach((item) => {
    menuMap[item.general] = item.header;
    specificMap[item.specific] = item.general;
    subHeadingMap[item.specific] = item.sub;
  });

  const keyValues = [];
  const filteringMap = {};

  for (let key in specificMap) {
    if (filter === "all") {
      specificMap === [];
    } else if (specificMap[key] === filter) {
      keyValues.push(key);
    }
  }

  for (let i = 0; i < keyValues.length; i++) {
    const key = keyValues[i];
    const subHeadingKey = subHeadingMap[key];
    filteringMap[subHeadingKey] = key;
  }

  return (
    <div>
      <Navbar data={logoData} from={"menu"} />
      <MenuBanner onBannerChange={handleBannerChange} />
      {menuBannerValue === "all" ? (
        <main className="menu-main">
          <MenuSidebar
            className="menu-side-bar"
            onFilterChange={handleFilterChange}
            menuItems={menuItems}
          />
          <div className="main-display-container">
            {filter === "all" ? (
              <MenuAllView onFilterChange={handleFilterChange} />
            ) : (
              <div>
                <div className="main-display">
                  {filter in menuMap && (
                    <section key={menuMap[filter]}>
                      <h2 className="menu-path">Menu/{menuMap[filter]}</h2>
                      <h1 className="menu-item-title">{menuMap[filter]}</h1>
                      <>
                        <MenuSections
                          menuItems={menuItems}
                          keyValues={keyValues}
                          subHeadingMap={subHeadingMap}
                          filteringMap={filteringMap}
                          data={logoData}
                          handleBack={handleBackClick}
                        />
                      </>
                    </section>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      ) : null}
      {menuBannerValue === "previous" && (
        <PreviousOrders
          fetchUserHistory={fetchUserHistory}
          addItemToCart={addItemToCart}
        />
      )}
      {menuBannerValue === "favorite" && (
        <Favorites
          fetchUserFavorites={fetchUserFavorites}
          addItemToCart={addItemToCart}
          removeFromFavorites={removeFromFavorites}
        />
      )}
    </div>
  );
}

Menu.propTypes = {
  menuItems: PropTypes.array.isRequired,
  logoData: PropTypes.array.isRequired,
  fetchUserFavorites: PropTypes.func.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  fetchUserHistory: PropTypes.func.isRequired,
};

export default Menu;
