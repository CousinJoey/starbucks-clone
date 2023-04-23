import React from "react";
import Homepage from "./components/homepage/homepage";
import Menu from "./components/menu/menu";
import Rewards from "./components/rewards/rewards";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";

function App({ menuItems, featuredItems, logoItems }) {
  console.log(menuItems);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            default
            path="/"
            element={<Homepage newItems={featuredItems} logoData={logoItems} />}
          />
          <Route
            path="/menu"
            element={<Menu menuItems={menuItems} logoData={logoItems} />}
          />
          <Route path="/rewards" element={<Rewards logoData={logoItems} />} />
        </Routes>
      </div>
    </Router>
  );
}

App.propTypes = {
  menuItems: PropTypes.object.isRequired,
  logoItems: PropTypes.object.isRequired,
  featuredItems: PropTypes.object.isRequired,
};

export default App;
