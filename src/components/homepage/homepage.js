import React from "react";
import PropTypes from "prop-types";
import Navbar from "../navbar/navbar";
import { useNavigate } from "react-router-dom";
function Homepage({ newItems, logoData, menuItems }) {
  let navigate = useNavigate();

  const nameToTitleMapping = {
    toast: "Avocado Toast",
    smoothie: "Triple Berry Smoothie",
    cupcakes: "Cupcake",
    yogurt: "Parfait",
  };

  const handleClick = (name) => {
    const title = nameToTitleMapping[name];
    const matchedMenuItem = menuItems.find(
      (menuItem) => menuItem.title === title
    );

    if (matchedMenuItem) {
      const data = logoData;

      const state = { product: matchedMenuItem, data };
      navigate(`/product/${matchedMenuItem.title}`, { state });
    }
  };

  return (
    <div>
      <Navbar data={logoData} />
      <div className="homepage">
        <header className="homepage-header">
          <p className="homepage-header-text">Cue that breakfast feeling</p>
        </header>
        <div className="featured-item-main">
          {newItems.map((items) => (
            <div className="featured-item-container" key={items.name}>
              <div className="featured-img-container">
                <img className="featured-img" src={items.src} />
              </div>
              <div className="featured-text">
                {items.name === "toast" && (
                  <div>
                    <h3 className="featured-title">{items.title}</h3>
                    <p className="featured-desc">
                      Fresh hand-cut avocado ontop of Cherub tomatos and
                      arugula, with seasonings and spices to match your cravings
                    </p>
                  </div>
                )}
                {items.name === "smoothie" && (
                  <div>
                    <h3 className="featured-title">{items.title}</h3>
                    <p className="featured-desc">
                      Blueberry, blackberry, and raspberry all blended to a
                      sweet and tangy perfection
                    </p>
                  </div>
                )}
                {items.name === "cupcakes" && (
                  <div>
                    <h3 className="featured-title">{items.title}</h3>
                    <p className="featured-desc">
                      Looking for a sweet treat to satisfy your cravings? Our
                      cupcakes are the perfect solution
                    </p>
                  </div>
                )}
                {items.name === "yogurt" && (
                  <div>
                    <h3 className="featured-title">{items.title}</h3>
                    <p className="featured-desc">
                      The perfect mixture of yogurt and granola topped with the
                      fresh fruits of your choice
                    </p>
                  </div>
                )}
                <div
                  className="default-button"
                  onClick={() => handleClick(items.name)}
                >
                  Order Now
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Homepage.propTypes = {
  newItems: PropTypes.array.isRequired,
  logoData: PropTypes.array.isRequired,
  menuItems: PropTypes.array.isRequired,
};

export default Homepage;
