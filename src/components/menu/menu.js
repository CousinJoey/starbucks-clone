import React, { useState } from "react";
import PropTypes from "prop-types";
import Navbar from "../navbar/navbar";
import MenuSidebar from "./menuSidebar/menuSidebar";
import MenuSections from "./menuSubcomponents/menuSections";
import MenuBanner from "./menuStatic/menuBanner";
import MenuAllView from "./menuStatic/menuAllView";

function Menu({ menuItems, logoData }) {
  const [menuBannerValue, setMenuBannerValue] = useState("all");
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const handleBannerChange = (value) => {
    setMenuBannerValue(value);
    setFilter("all");
  };

  // creating key:pair objects for filtering based upon different values

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
      <Navbar data={logoData} />
      <MenuBanner onBannerChange={handleBannerChange} />
      {menuBannerValue === "all" ? (
        <main className="menu-main">
          <MenuSidebar
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
        <main className="main-menu-alt">
          <div>
            <p>Previous </p>
          </div>
        </main>
      )}
      {menuBannerValue === "favorite" && (
        <main className="main-menu-alt">
          <div>
            <p>Favorites </p>
          </div>
        </main>
      )}
    </div>
  );
}

Menu.propTypes = {
  menuItems: PropTypes.array.isRequired,
  logoData: PropTypes.array.isRequired,
};

export default Menu;
