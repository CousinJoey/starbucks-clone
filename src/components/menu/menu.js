import React from "react";
import PropTypes from "prop-types";
import Navbar from "../navbar/navbar";

function Menu({ menuItems, logoData }) {
  console.log(menuItems);

  return (
    <div>
      <Navbar data={logoData} />
      <p>This is the menu</p>
    </div>
  );
}

Menu.propTypes = {
  menuItems: PropTypes.array.isRequired,
  logoData: PropTypes.array.isRequired,
};

export default Menu;
