import React from "react";
import PropTypes from "prop-types";
import Navbar from "../navbar/navbar";

function Rewards({ logoData }) {
  return (
    <div>
      <Navbar data={logoData} />
      <div>
        <p>This is the rewards page</p>
      </div>
    </div>
  );
}

Rewards.propTypes = {
  logoData: PropTypes.array.isRequired,
};

export default Rewards;
