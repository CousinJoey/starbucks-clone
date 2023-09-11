import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import ProductCheckoutOverlay from "./productCheckoutSubComponents/productCheckoutOverlay";
import Icon from "@mdi/react";
import { v4 as uuidv4 } from "uuid";
import {
  mdiCar,
  mdiStore,
  mdiBee,
  mdiPencil,
  mdiHeartOutline,
  mdiMinusCircleOutline,
  mdiPlusCircleOutline,
} from "@mdi/js";
import PropTypes from "prop-types";

function ProductCheckout({
  logoData,
  fetchUserCart,
  removeFromCart,
  addItemToCart,
  clearCart,
  getDefaultCard,
  getCreditCardInfo,
  getRewardsCardInfo,
  removeFundsDebitCard,
  removeFundsRewardsCard,
  getCardFunds,
  addCartToHistory,
  addToFavorites,
  addOrderToHistory,
  fetchUserSelectedStore,
}) {
  const { currentUser } = useAuth();

  const [cartItems, setCartItems] = useState(undefined);

  const [customizationKeys, setCustomizationKeys] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0.0);

  const [paymentOverlay, setPaymentOverlay] = useState(false);

  const [selectedStore, setSelectedStore] = useState("undefined");

  const [animatingOutItems, setAnimatingOutItems] = useState([]);

  const handleOpenOverlay = () => {
    setPaymentOverlay(true);
  };

  const handleCloseOverlay = () => {
    setPaymentOverlay(false);
  };

  const navigate = useNavigate();

  const handleEditProduct = (item) => {
    navigate(`/product/${item.product.title}`, {
      state: {
        product: {
          size: item.product.size,
          customization: item.customization,
          customCategories: item.product.customCategories,
          editing: "editing",
          alt: item.product.alt,
          src: item.product.src,
          title: item.product.title,
          header: item.product.header,
          fat: item.product.fat,
          cal: item.product.cal,
          sugar: item.product.sugar,
          desc: item.product.desc,
          id: item.product.id,
          edit: item.product.edit,
          type: item.product.type,
        },
        data: logoData,
        customizationData: item.customizationData,
      },
    });
  };

  const calcPrice = (sizeValue, price, inc) => {
    let finalPrice;

    if (sizeValue === "small") {
      finalPrice = price;
    } else if (sizeValue === "medium") {
      finalPrice = price + inc;
    } else {
      finalPrice = price + inc * 2;
    }

    return finalPrice;
  };

  useEffect(() => {
    if (cartItems) {
      const keys = new Set();

      cartItems.forEach((item) => {
        console.log(item);
        if (item.customization) {
          Object.keys(item.customization).forEach((key) => {
            keys.add(key);
          });
        }
      });

      setCustomizationKeys(Array.from(keys));
    }
  }, [cartItems]);

  useEffect(() => {
    let total = 0;
    if (cartItems) {
      cartItems.forEach((item) => {
        total += calcPrice(
          item.product.size,
          item.product.price,
          item.product.inc
        );
      });
    }
    setTotalPrice(total);
  }, [cartItems]);

  useEffect(() => {
    const fetchCart = async () => {
      const cart = await fetchUserCart(currentUser.uid);
      setCartItems(cart);
    };
    const fetchStore = async () => {
      const selectedStore = await fetchUserSelectedStore(currentUser.uid);
      setSelectedStore(selectedStore);
    };

    fetchStore();
    fetchCart();
  }, [currentUser, paymentOverlay]);

  if (cartItems === undefined) {
    return <p>Loading...</p>;
  }

  if (cartItems.length === 0) {
    return (
      <div>
        <Navbar data={logoData} />
        <div className="empty-cart-main">
          <div className="empty-cart-styled-div">
            <p>
              It seems your cart is feeling lonely. Let&#39;s find it some
              company!
            </p>
          </div>
        </div>
      </div>
    );
  }

  function formatCustomizationOption(key, value) {
    const [title, modifier] = key.split("-");
    const titleFormatted = title
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    let formattedValue = value;

    let result;
    if (modifier === "none") {
      result = `${formattedValue} ${titleFormatted}`;
    } else {
      const modifierFormatted = modifier
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      if (typeof value === "number") {
        result = `${formattedValue} ${modifierFormatted}(s) ${titleFormatted}`;
      } else {
        result = `${formattedValue} ${modifierFormatted} ${titleFormatted}`;
      }
    }

    return result;
  }

  function formatSize(sizeValue, productType) {
    if (productType !== "Drinks") {
      return;
    }

    if (sizeValue === "small") {
      return "12 fl oz";
    } else if (sizeValue === "medium") {
      return "18 fl oz";
    } else if (sizeValue === "large") {
      return "22 fl oz";
    } else {
      return;
    }
  }

  function formatPrice(sizeValue, price, inc) {
    console.log(sizeValue, price, inc);
    let finalPrice = calcPrice(sizeValue, price, inc);

    return `$ ${finalPrice.toFixed(2)}`;
  }

  async function handleAddToCart(item) {
    const newItem = {
      ...item,
      product: {
        ...item.product,
        id: uuidv4(),
      },
    };

    try {
      await addItemToCart(currentUser.uid, newItem);
      console.log("Added to cart successfully.");
      const updatedCart = await fetchUserCart(currentUser.uid);
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error adding item to cart: ", error);
    }
  }

  async function handleRemoveFromCart(itemId) {
    try {
      await removeFromCart(currentUser.uid, itemId);
      console.log("Item removed from cart successfully.");
      const updatedCart = await fetchUserCart(currentUser.uid);
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error removing item from cart: ", error);
    }
  }

  const handleFavoriteClick = (item) => {
    const itemData = {
      product: {
        size: item.product.size,
        customCategories: item.product.customCategories,
        alt: item.product.alt,
        src: item.product.src,
        title: item.product.title,
        header: item.product.header,
        fat: item.product.fat,
        cal: item.product.cal,
        sugar: item.product.sugar,
        desc: item.product.desc,
        id: uuidv4(),
        price: item.product.price,
        bees: item.product.bees,
        inc: item.product.inc,
        edit: item.product.edit,
        type: item.product.type,
      },
      customization: item.customization,
      customizationData: item.customizationData,
    };

    addToFavorites(currentUser.uid, itemData);
  };

  function handleRemoveFromCartWithAnimation(id) {
    setAnimatingOutItems([...animatingOutItems, id]);

    setTimeout(() => {
      handleRemoveFromCart(id);
      setAnimatingOutItems((prevAnimating) =>
        prevAnimating.filter((itemId) => itemId !== id)
      );
    }, 300);
  }

  return (
    <div>
      <Navbar data={logoData} />
      <main className="main-checkout">
        <div className="main-checkout-leftside-container">
          <div className="main-checkout-leftside-nav">
            <div className="checkout-header-img-container">
              <Link to={"/"}>
                <img src={logoData[0].src} className="checkout-page-logo-img" />
              </Link>
            </div>
            <div className="checkout-header-text-container">
              <Link to={"/menu"}>
                <p className="back-to-menu">back to menu</p>
              </Link>
            </div>
          </div>
          <div className="checkout-location-info-container">
            <div className="review-and-reward-points-container">
              <p className="review-order-text">Review Order (2)</p>
              <p className="user-bee-amount-checkout">
                200{" "}
                <span className="bee-flex">
                  <Icon path={mdiBee} size={1.5} />
                </span>
              </p>
            </div>
            <div className="store-info-container">
              <div className="static-store-text-container">
                <p className="static-store-text">Pickup Store</p>
              </div>
              <div className="actual-store-location-text-container">
                {selectedStore !== "undefined" ? (
                  <Link
                    to={"/locations"}
                    state={{
                      redirect: "cart",
                    }}
                  >
                    <p className="actual-store-location-text clickable">
                      {selectedStore.abvAdd}
                    </p>
                  </Link>
                ) : (
                  <Link
                    to={"/locations"}
                    state={{
                      redirect: "cart",
                    }}
                  >
                    <p className="actual-store-location-text clickable">
                      Selected A Store
                    </p>
                  </Link>
                )}
              </div>
            </div>
            {selectedStore !== "undefined" && (
              <div className="pickup-options-container">
                <div className="static-pickup-text-container">
                  <p className="pickup-options-static-text">Pickup Options</p>
                </div>
                <div className="pickup-options-choice-container">
                  <div className="in-store-pickup-container">
                    <div className="pickup-icon">
                      <Icon path={mdiStore} size={2} />
                    </div>
                    <div className="pickup-text">
                      <p>In Store</p>
                    </div>
                  </div>
                  <div className="drive-thru-pickup-container">
                    <div className="drive-thru-icon">
                      <Icon path={mdiCar} size={2} />
                    </div>
                    <div className="drive-thru-text">
                      <p>Drive Thru</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="main-checkout-rightside-container">
          {cartItems.map((item, index) => (
            <div
              className={`item-info-and-img-container ${
                animatingOutItems.includes(item.product.id)
                  ? "pop-out"
                  : "pop-in"
              }`}
              key={index}
            >
              <div className="item-checkout-img-container">
                <img className="item-checkout-img" src={item.product.src} />
              </div>
              <div className="checkout-item-info-container">
                <div className="checkout-item-title-and-price">
                  <p>{item.product.title}</p>
                  <p>
                    {formatPrice(
                      item.product.size,
                      item.product.price,
                      item.product.inc
                    )}
                  </p>
                </div>
                <div className="checkout-customs-and-sizing-container">
                  <div className="sizing-text-container">
                    <p className="checkout-size-text">
                      {formatSize(item.product.size, item.product.type)}
                    </p>
                  </div>
                  <div className="customs-text-container">
                    {customizationKeys.map(
                      (key) =>
                        item.customization &&
                        item.customization[key] &&
                        Object.entries(item.customization[key]).map(
                          ([subKey, value], subIndex) => (
                            <p
                              className="checkout-customs-text"
                              key={`${key}-${index}-${subKey}-${subIndex}`}
                            >
                              {formatCustomizationOption(subKey, value)}
                            </p>
                          )
                        )
                    )}
                  </div>
                </div>
                <div className="checkout-item-extras">
                  <div className="checkout-bees-amount-container">
                    <p className="checkout-bees-amount">
                      {item.product.bees}{" "}
                      <span className="bee-flex">
                        <Icon path={mdiBee} size={1} />
                      </span>
                    </p>
                  </div>
                  <div className="checkout-item-svg-container">
                    {item.product.edit === true && (
                      <button
                        onClick={() => handleEditProduct(item)}
                        className="svg-button"
                      >
                        <Icon
                          className="checkout-item-svg"
                          path={mdiPencil}
                          size={1}
                        />
                      </button>
                    )}
                    <button
                      className="svg-button"
                      onClick={() => handleFavoriteClick(item)}
                    >
                      <Icon
                        className="checkout-item-svg"
                        path={mdiHeartOutline}
                        size={1}
                      />
                    </button>
                    <button className="svg-button">
                      <Icon
                        className="checkout-item-svg"
                        path={mdiMinusCircleOutline}
                        onClick={() =>
                          handleRemoveFromCartWithAnimation(item.product.id)
                        }
                        size={1}
                      />
                    </button>
                    <button className="svg-button">
                      <Icon
                        className="checkout-item-svg"
                        path={mdiPlusCircleOutline}
                        onClick={() => handleAddToCart(item)}
                        size={1}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="checkout-page-total-container">
            <div className="checkout-subtotal-container">
              <p className="subtotal-static-text">Subtotal</p>
              <p className="subtotal-amount">{totalPrice.toFixed(2)}</p>
            </div>
            <div className="checkout-taxes-container">
              <p className="taxes-static-text">Taxes</p>
              <p className="taxes-amount">
                {(totalPrice * 1.09 - totalPrice).toFixed(2)}
              </p>
            </div>
            <div className="checkout-total-container">
              <p className="total-static-text">Total</p>
              <p className="total-amount">{(totalPrice * 1.09).toFixed(2)}</p>
            </div>
          </div>
          {selectedStore !== "undefined" ? (
            <div className="product-checkout-button-container">
              <button
                className="default-button light-orange checkout-button"
                onClick={() => handleOpenOverlay()}
              >
                Checkout ${(totalPrice * 1.09).toFixed(2)}
              </button>
            </div>
          ) : (
            <div className="product-checkout-button-container">
              <Link
                to={"/locations"}
                state={{
                  redirect: "cart",
                }}
              >
                <button className="default-button light-orange checkout-button">
                  Selected A Store
                </button>
              </Link>
            </div>
          )}
          {paymentOverlay === true ? (
            <ProductCheckoutOverlay
              handleCloseOverlay={handleCloseOverlay}
              subTotal={totalPrice.toFixed(2)}
              total={(totalPrice * 1.09).toFixed(2)}
              taxes={(totalPrice * 1.09 - totalPrice).toFixed(2)}
              clearCart={clearCart}
              getDefaultCard={getDefaultCard}
              getCreditCardInfo={getCreditCardInfo}
              getRewardsCardInfo={getRewardsCardInfo}
              removeFundsDebitCard={removeFundsDebitCard}
              removeFundsRewardsCard={removeFundsRewardsCard}
              getCardFunds={getCardFunds}
              addCartToHistory={addCartToHistory}
              addOrderToHistory={addOrderToHistory}
              cartItems={cartItems}
            />
          ) : (
            <></>
          )}
        </div>
      </main>
    </div>
  );
}

ProductCheckout.propTypes = {
  logoData: PropTypes.array.isRequired,
  fetchUserCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  getDefaultCard: PropTypes.func.isRequired,
  getCreditCardInfo: PropTypes.func.isRequired,
  getRewardsCardInfo: PropTypes.func.isRequired,
  removeFundsDebitCard: PropTypes.func.isRequired,
  removeFundsRewardsCard: PropTypes.func.isRequired,
  getCardFunds: PropTypes.func.isRequired,
  addCartToHistory: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  addOrderToHistory: PropTypes.func.isRequired,
  fetchUserSelectedStore: PropTypes.func.isRequired,
};

export default ProductCheckout;
