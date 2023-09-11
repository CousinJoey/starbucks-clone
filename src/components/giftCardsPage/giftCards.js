import React from "react";
import Navbar from "../navbar/navbar";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Icon from "@mdi/react";
import { mdiBee } from "@mdi/js";

function GiftCards({ logoData, giftCards }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const types = [...new Set(giftCards.map((card) => card.type))];

  const order = ["featured", "fall", "winter", "spring", "summer"];

  return (
    <div>
      <Navbar data={logoData} />

      {order.map((type) => {
        if (types.includes(type)) {
          const relevantCards = giftCards.filter((card) => card.type === type);

          return (
            <React.Fragment key={type}>
              <div className="giftcard-container">
                <div className="giftcard-hero">
                  <p className="giftcard-text giftcard-cat">{type}</p>
                  {relevantCards.length > 4 && (
                    <p className="giftcard-text giftcard-link">See All...</p>
                  )}
                </div>
                <Slider {...settings}>
                  {relevantCards.map((card) => (
                    <div
                      key={card.id}
                      className="giftcard-item"
                      onClick={console.log("clicked")}
                    >
                      <img
                        className="giftcard-img"
                        src={card.src}
                        alt={card.title}
                      />
                    </div>
                  ))}
                </Slider>
              </div>

              {type === "featured" && (
                <div key={`${type}-featured`} className="reload-container">
                  <div className="reload-details">
                    <p className="got-gift-cards-text">Got a Gift Card?</p>
                    <p className="bee-text bee-gift">
                      Earns 2{" "}
                      <span className="bee-svg bee-gift-svg">
                        <Icon path={mdiBee} size={1} />
                      </span>{" "}
                      <span className="bee-gift">per $1</span>
                    </p>
                    <button className="default-button giftcard-button">
                      Add or Reload
                    </button>
                    <button className="default-button black">
                      Check Balance
                    </button>
                  </div>
                  <div className="reload-support">
                    <p className="reload-support-text">
                      Card Terms & Conditions
                    </p>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        }
        return null;
      })}
    </div>
  );
}

GiftCards.propTypes = {
  giftCards: PropTypes.array.isRequired,
  logoData: PropTypes.array.isRequired,
};

export default GiftCards;
