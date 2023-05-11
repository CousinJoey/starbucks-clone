import React from "react";
import PropTypes from "prop-types";

function MenuSidebar({ onFilterChange, menuItems }) {
  const handleFilterChange = (category) => {
    onFilterChange(category);
  };

  const categoryMap = {};
  const onClickMap = {};
  const typeMap = {};
  const type = [];

  menuItems.forEach((item) => {
    categoryMap[item.header] = item.general;
    onClickMap[item.general] = item.header;
    typeMap[item.header] = item.type;
    if (!type.includes(item.type)) {
      type.push(item.type);
    }
  });

  const categoryKeys = [];

  for (let key in categoryMap) {
    categoryKeys.push(key);
  }

  return (
    <div className="sidebar-main">
      <ul className="sidebar-container">
        {type.map((itemType) => (
          <li className="sidebar-cat" key={itemType}>
            <span className="sidebar-cat-span">{itemType}</span>
            <ul className="sidebar-subcat-container">
              {categoryKeys
                .filter((itemCategory) => typeMap[itemCategory] === itemType)
                .map((itemCategory) => (
                  <li
                    key={itemCategory}
                    className="sidebar-subcat"
                    onClick={() => {
                      handleFilterChange(categoryMap[itemCategory]);
                    }}
                  >
                    {itemCategory}
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

MenuSidebar.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  menuItems: PropTypes.array.isRequired,
};

export default MenuSidebar;
