import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function MenuItem({ item, data }) {
  let navigate = useNavigate();

  const handleClick = () => {
    let product = item;
    const state = { product, data };

    console.log(data);

    navigate(`/product/${item.title}`, { state });
  };

  return (
    <div
      key={item.title}
      onClick={handleClick}
      className="menu-item menu-specific"
    >
      <img className="menu-item-img specific-img" src={item.src} />
      <h3 className="menu-item-text">{item.title}</h3>
    </div>
  );
}

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default MenuItem;
