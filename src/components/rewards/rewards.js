import React, { useState } from "react";
import PropTypes from "prop-types";
import Navbar from "../navbar/navbar";
import Icon from "@mdi/react";
import { mdiBee } from "@mdi/js";

function Rewards({ logoData, rewardItems }) {
  const [beeValue, setBeeValue] = useState(25);

  const handleButtonClick = (value) => {
    setBeeValue(value);
  };

  const itemMap = rewardItems.reduce((acc, item) => {
    acc[item.name] = { src: item.src, name: item.name };
    return acc;
  }, {});

  const headerImg = itemMap["headerImg"];

  const card = itemMap["card"];
  const giftCard = itemMap["giftCard"];
  const phone = itemMap["phone"];
  const phoneCard = itemMap["phoneCard"];

  const avaExtra = itemMap["fillerAv"];
  const phoneExtra = itemMap["fillerPhone"];
  const cofExtra = itemMap["fillerCoffee"];
  const deltaBackground = itemMap["deltaBackground"];
  const fakeDelta = itemMap["fakeDelta"];

  const extras = [avaExtra, phoneExtra, cofExtra];

  return (
    <div>
      <Navbar data={logoData} />
      <main>
        <div className="banner">
          <p className="banner-text">GrindStone Rewards</p>
        </div>
        <header className="header-container">
          <div className="header-img-container">
            <div
              className="header-img"
              style={{ backgroundImage: `url(${headerImg.src})` }}
            >
              <div className="header-text-container">
                <p className="header-text-big">
                  free coffee <br></br> is a tap away
                </p>
                <p className="header-text-small">
                  Join Now to Start Earning Rewards
                </p>
                <p className="default-button orange">Join Now</p>
                <p className="header-text-app">
                  Or <span className="rewards-span">join in the app</span> for
                  the best experience
                </p>
              </div>
            </div>
          </div>
        </header>
        <div className="getting-started-main">
          <div className="getting-started-container">
            <div className="getting-started-header-container">
              <h2 className="getting-started-header">
                Getting started is easy
              </h2>
              <p className="getting-started-header-subtext">
                Earn Bees and get rewarded in a few easy steps
              </p>
            </div>
            <div className="getting-started-steps-container">
              <div className="getting-started-item">
                <div className="circle-container">
                  <div className="circle">1</div>
                </div>
                <div className="item-content">
                  <h3 className="item-title">Create an Account</h3>
                  <p className="item-text">
                    To get started,{" "}
                    <span className="rewards-span">join now</span>. You can also{" "}
                    <span className="rewards-span">join in the app</span> to get
                    access to the full range of GrindStone® Rewards benefits.
                  </p>
                </div>
              </div>
              <div className="getting-started-item">
                <div className="circle-container">
                  <div className="circle">2</div>
                </div>
                <div className="item-content">
                  <h3 className="item-title">Order and pay how you’d like</h3>
                  <p className="item-text">
                    Use cash, credit/debit card or save some time and pay right
                    through the app. You’ll collect Bees all ways.{" "}
                    <span className="rewards-span">Learn how</span>
                  </p>
                </div>
              </div>
              <div className="getting-started-item">
                <div className="circle-container">
                  <div className="circle">3</div>
                </div>
                <div className="item-content">
                  <h3 className="item-title">Earn Bees, get Rewards</h3>
                  <p className="item-text">
                    As you earn Bees, you can redeem them for Rewards—like free
                    food, drinks, and more. Start redeeming with as little as 25
                    Bees!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rewards-choice-main">
          <div className="rewards-choice-header-container">
            <div className="rewards-choice-header">
              <h2 className="rewards-header">Get your favorites for free</h2>
            </div>
          </div>
          <div className="rewards-choice-text-and-buttons">
            <div className="reward-buttons-container">
              <button
                className={
                  beeValue === 25 ? "reward-button active" : "reward-button"
                }
                onClick={() => handleButtonClick(25)}
              >
                {" "}
                25
                <Icon path={mdiBee} size={1.5} />
              </button>
              <button
                className={
                  beeValue === 100 ? "reward-button active" : "reward-button"
                }
                onClick={() => handleButtonClick(100)}
              >
                {" "}
                100
                <Icon path={mdiBee} size={1.5} />
              </button>
              <button
                className={
                  beeValue === 200 ? "reward-button active" : "reward-button"
                }
                onClick={() => handleButtonClick(200)}
              >
                {" "}
                200
                <Icon path={mdiBee} size={1.5} />
              </button>
              <button
                className={
                  beeValue === 300 ? "reward-button active" : "reward-button"
                }
                onClick={() => handleButtonClick(300)}
              >
                {" "}
                300
                <Icon path={mdiBee} size={1.5} />
              </button>
            </div>
            <div className="rewards-text-container">
              {beeValue === 25 && (
                <div className="reward-text">
                  <h3 className="reward-title">Customize your drink</h3>
                  <p className="reward-subtext">
                    Make your drink just right with an extra espresso shot,
                    nondairy milk or a dash of your favorite syrup.
                  </p>
                </div>
              )}
              {beeValue === 100 && (
                <div className="reward-text">
                  <h3 className="reward-title">
                    Brewed hot or iced coffee or tea, bakery item, packaged
                    snack and more
                  </h3>
                  <p className="reward-subtext">
                    Treat yourself to an iced coffee, buttery croissant, bag of
                    chips and more.
                  </p>
                </div>
              )}
              {beeValue === 200 && (
                <div className="reward-text">
                  <h3 className="reward-title">
                    Handcrafted drink (Cold Brew, lattes and more) or hot
                    breakfast
                  </h3>
                  <p className="reward-subtext">
                    Turn good mornings great with a delicious handcrafted drink
                    of your choice, breakfast sandwich or oatmeal on us.
                  </p>
                </div>
              )}
              {beeValue === 300 && (
                <div className="reward-text">
                  <h3 className="reward-title">
                    Select GrindStone® merchandise
                  </h3>
                  <p className="reward-subtext">
                    Take home a signature cup, drink tumbler or your choice of
                    coffee merch. All exlcusive via our point system.
                  </p>
                </div>
              )}
            </div>
            <div className="extras-main">
              <div className="extras-container">
                <div className="extras-hero">
                  <h2 className="extras-hero-title">Endless Extras</h2>
                  <p className="extras-hero-text">
                    Joining GrindStone® Rewards means unlocking access to
                    exclusive benefits. Say hello to easy ordering, tasty
                    Rewards and—yes, free coffee.
                  </p>
                </div>
                <div className="extras-info-container">
                  {extras.map((item) => (
                    <div key={item.src} className="extras-info-item">
                      <div className="class-info-image">
                        <img className="extras-img" src={item.src} />
                      </div>
                      {item.name === "fillerAv" && (
                        <div className="extras-info-text">
                          <h3 className="extras-text-title">Fun Freebies</h3>
                          <p className="extras-text">
                            Not only can you earn free coffee, look forward to a
                            birthday treat plus coffee and tea refills.
                          </p>
                          <button className="extras-button">learn more</button>
                        </div>
                      )}
                      {item.name === "fillerCoffee" && (
                        <div className="extras-info-text">
                          <h3 className="extras-text-title">
                            Order & pay ahead
                          </h3>
                          <p className="extras-text">
                            Enjoy the convenience of in-store, curbside or
                            drive-thru pickup at select stores.
                          </p>
                          <button className="extras-button">learn more</button>
                        </div>
                      )}
                      {item.name === "fillerPhone" && (
                        <div className="extras-info-text">
                          <h3 className="extras-text-title">
                            Get to free faster
                          </h3>
                          <p className="extras-text">
                            Earn Stars even quicker with Bonus Star challenges,
                            Double Star Days and exciting games.
                          </p>
                          <button className="extras-button">learn more</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="savings-main">
              <div className="savings-hero">
                <h2>Cash or card, you earn Bees</h2>
                <p className="savings-hero-subtext">
                  No matter how you pay, you can earn Bees with your morning
                  coffee. Those Bees add up to (really delicious) Rewards.
                </p>
              </div>
              <div className="one-bee-grid">
                <div className="pay-as-you-go">
                  <p className="bee-text">
                    1{" "}
                    <span className="bee-svg">
                      <Icon path={mdiBee} size={1.2} />
                    </span>{" "}
                    <span>Per dollar</span>
                  </p>
                  <p className="bee-subtext">Pay as you go</p>
                </div>
                <div className="savings-grid-item-container">
                  <div className="savings-grid-item">
                    <div className="savings-grid-image-container">
                      <img className="savings-grid-image" src={phoneCard.src} />
                    </div>
                    <div className="savings-grid-text-container">
                      <div className="savings-grid-text-title-container">
                        <h3 className="savings-title">
                          Scan and pay seperately
                        </h3>
                        <p className="savings-text">
                          Use cash or credit/debit card at the register.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="savings-grid-item-container">
                  <div className="savings-grid-item">
                    <div className="savings-grid-image-container">
                      <img className="savings-grid-image" src={phone.src} />
                    </div>
                    <div className="savings-grid-text-container">
                      <div className="savings-grid-text-title-container">
                        <h3 className="savings-title">
                          Save payment in the app
                        </h3>
                        <p className="savings-text">
                          Check-out faster by saving a credit/debit card or
                          PayPal to your account. You’ll be able to order ahead
                          or scan and pay at the register in one step.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="savings-hr"></hr>
              <div className="two-bee-grid">
                <div className="add-funds">
                  <p className="bee-text">
                    2{" "}
                    <span className="bee-svg">
                      <Icon path={mdiBee} size={1.2} />
                    </span>{" "}
                    <span>Per dollar</span>
                  </p>
                  <p className="bee-subtext">Add funds in the app</p>
                </div>
                <div className="savings-grid-item-container">
                  <div className="savings-grid-item">
                    <div className="savings-grid-image-container">
                      <img className="savings-grid-image" src={card.src} />
                    </div>
                    <div className="savings-grid-text-container">
                      <div className="savings-grid-text-title-container">
                        <h3 className="savings-title">Preload</h3>
                        <p className="savings-text">
                          To save time and earn Bees twice as fast, add money to
                          your digital GrindStone Card using any payment option.
                          Scan and pay in one step or order ahead in the app.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="savings-grid-item-container">
                  <div className="savings-grid-item">
                    <div className="savings-grid-image-container">
                      <img className="savings-grid-image" src={giftCard.src} />
                    </div>
                    <div className="savings-grid-text-container">
                      <div className="savings-grid-text-title-container">
                        <h3 className="savings-title">
                          Register your gift card
                        </h3>
                        <p className="savings-text">
                          Then use it to pay through the app. You can even
                          consolidate balances from multiple cards in one place.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="delta-main">
              <div className="delta-container">
                <div className="delta-img-and-text-container">
                  <div
                    className="delta-background-img"
                    style={{ backgroundImage: `url(${deltaBackground.src})` }}
                  ></div>
                  <div className="hero-and-delta-container">
                    <div className="hero-container">
                      <h2 className="delta-hero-title">
                        Keep the Rewards Coming
                      </h2>
                      <p className="delta-hero-text">
                        The Rewards don’t stop at your morning coffee. Join
                        GrindStone® Rewards and unlock perks from our partners,
                        all while earning more Bees.
                      </p>
                    </div>
                    <div className="delta-text-and-logo-container">
                      <div className="delta-text-and-logo-subcontainer">
                        <div className="delta-logo-container">
                          <img className="delta-logo" src={fakeDelta.src} />
                        </div>
                        <p className="delta-text">
                          Link your Omega SkyMiles® and GrindStone® Rewards
                          accounts to earn 1 mile per $1* spent at GrindStone
                          and double Bees on Omega travel days.
                        </p>
                      </div>
                    </div>
                    <div className="delta-button-container">
                      <button className="default-button orange">
                        Join GrindStone Rewards
                      </button>
                    </div>
                  </div>
                  <div
                    className="delta-background-img"
                    style={{ backgroundImage: `url(${deltaBackground.src})` }}
                  ></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

Rewards.propTypes = {
  logoData: PropTypes.array.isRequired,
  rewardItems: PropTypes.object.isRequired,
};

export default Rewards;
