import React from "react";
import PropTypes from "prop-types";
import MenuItem from "./menuItem";

function MenuSections({
  menuItems,
  keyValues,
  subHeadingMap,
  filteringMap,
  data,
  handleBack,
}) {
  const clickedBack = () => {
    handleBack();
  };

  return (
    <>
      <p className="menu-back-arrow" onClick={() => clickedBack()}>
        {" "}
        <span>←</span> Back
      </p>
      {keyValues.map((values) => (
        <>
          <h3 className="menu-item-heading">{subHeadingMap[values]}</h3>
          <hr></hr>
          <div className="menu-grid-general">
            {menuItems
              .filter(
                (item) => item.specific === filteringMap[subHeadingMap[values]]
              )
              .map((item) => (
                <MenuItem key={item.title} item={item} data={data} />
              ))}
          </div>
        </>
      ))}
    </>
  );
}

MenuSections.propTypes = {
  menuItems: PropTypes.array.isRequired,
  keyValues: PropTypes.array.isRequired,
  subHeadingMap: PropTypes.object.isRequired,
  filteringMap: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  handleBack: PropTypes.func.isRequired,
};

export default MenuSections;
