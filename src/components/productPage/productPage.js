import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CustomizationContext } from "../../context/customizationContext";
import { useAuth } from "../../context/authContext";
import { v4 as uuidv4 } from "uuid";
import { mdiHeartOutline, mdiBagPersonal } from "@mdi/js";
import Icon from "@mdi/react";
import Navbar from "../navbar/navbar";
import Customs from "./productSubComponents/customs";
import ItemInfo from "./productSubComponents/itemInfo";
import PropTypes from "prop-types";

function ProductPage({
  customizationData,
  addItemToCart,
  editCartItem,
  fetchUserCart,
  fetchUserSelectedStore,
  addToFavorites,
}) {
  let location = useLocation();
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const product = location.state.product;

  const customData = customizationData || location.state.customizationData[0];

  const { state: incrementValue } = useContext(CustomizationContext);

  const [size, setSize] = useState(product.size || "medium");
  const [editing] = useState(product.editing || false);
  const [cartItems, setCartItems] = useState([]);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [storeLocation, setStoreLocation] = useState("undefined");
  const [currentProductId, setCurrentProductId] = useState(product.id || null);

  const handleSizeChange = (value) => {
    setSize(value);
  };

  const header = location.state.product.header;
  const title = location.state.product.title;

  const fat = location.state.product.fat;
  const cal = location.state.product.cal;
  const sugar = location.state.product.sugar;
  const bees = location.state.product.bees;
  const desc = location.state.product.desc;

  const img = location.state.product.alt || product.alt;

  const customType = location.state.product.custom;

  const { dispatch } = useContext(CustomizationContext);

  const testOnClick = () => {
    if (currentUser) {
      const newProductId = product.id || uuidv4();
      setCurrentProductId(newProductId);

      const newProductObject = {
        product: {
          id: newProductId,
          title: location.state.product.title,
          src: location.state.product.src,
          alt: location.state.product.alt,
          bees: location.state.product.bees,
          inc: location.state.product.inc,
          price: location.state.product.price,
          size: size,
          type: location.state.product.type,
          header: location.state.product.header,
          fat: location.state.product.fat,
          cal: location.state.product.cal,
          sugar: location.state.product.sugar,
          desc: location.state.product.desc,
          edit: location.state.product.edit,

          customCategories: location.state.product.customCategories || "none",
        },
        customization: incrementValue["stagingB"] || "none",
        customizationData: customizationData || customData || "none",
      };
      addItemToCart(currentUser.uid, newProductObject)
        .then(() => {
          setCartUpdated((prevState) => !prevState);
        })
        .catch((error) => {
          console.error("Error adding item to cart: ", error);
        });
    } else {
      console.error("No user is currently signed in");
    }
  };

  const editProduct = () => {
    if (currentUser) {
      const updatedProduct = {
        product: {
          id: currentProductId,
          title: location.state.product.title,
          src: location.state.product.src,
          alt: location.state.product.alt,
          bees: location.state.product.bees,
          inc: location.state.product.inc,
          price: location.state.product.price,
          size: size,
          header: location.state.product.header,
          fat: location.state.product.fat,
          cal: location.state.product.cal,
          sugar: location.state.product.sugar,
          desc: location.state.product.desc,
          type: location.state.product.type,
          edit: location.state.product.edit,
          customCategories: location.state.product.customCategories || "none",
        },
        customization: incrementValue["stagingB"] || "none",
        customizationData: customizationData || customData || "none",
      };

      editCartItem(
        currentUser.uid,
        currentProductId,
        updatedProduct.customization,
        updatedProduct.product.size
      )
        .then(() => {
          console.log("Product updated successfully");
          setTimeout(() => {
            navigate("/menu/cart");
          }, 300);
        })
        .catch((error) => console.error("Error updating product: ", error));
    } else {
      console.error("No user is currently signed in");
    }
  };

  useEffect(() => {
    return () => {
      dispatch({ type: "RESET" });
    };
  }, [dispatch]);

  useEffect(() => {
    if (editing) {
      const customizationData = product.customization;

      dispatch({
        type: "SET_STAGING_B_DATA",
        data: customizationData,
      });
    }
  }, [editing, location]);

  useEffect(() => {
    const fetchCart = async () => {
      const cart = await fetchUserCart(currentUser.uid);
      setCartItems(cart);
    };

    const fetchStore = async () => {
      const storeLocation = await fetchUserSelectedStore(currentUser.uid);
      setStoreLocation(storeLocation);
    };

    fetchStore();
    fetchCart();
  }, [currentUser, cartUpdated]);

  const handleFavoriteClick = (item) => {
    const itemData = {
      product: {
        size: size,
        customCategories: item.customCategories,
        alt: item.alt,
        src: item.src,
        title: item.title,
        header: item.header,
        fat: item.fat,
        cal: item.cal,
        sugar: item.sugar,
        desc: item.desc,
        id: uuidv4(),
        price: item.price,
        bees: item.bees,
        inc: item.inc,
        type: item.type,
        edit: item.edit,
      },
      customization: incrementValue["stagingB"],
      customizationData: customizationData || customData,
    };

    addToFavorites(currentUser.uid, itemData);
  };

  return (
    <div>
      <Navbar data={location.state.data} />
      <div className="banner-menu">
        <p className="banner-menu-items">
          Menu / {header} / {title}
        </p>
      </div>
      <main className="product-page-main">
        <div className="product-display-container">
          <div className="product-display">
            <div className="product-img">
              <img className="product-display-img" src={img} />
            </div>
            <div className="product-title-container">
              <h1 className="product-title">{location.state.product.title}</h1>
              <p className="product-calories">
                {location.state.product.cal} Calories
              </p>
            </div>
          </div>
        </div>
        <Customs
          customType={customType}
          product={product}
          customizationData={customData}
          handleSizeChange={handleSizeChange}
        />
        <ItemInfo
          itemBees={bees}
          itemDesc={desc}
          itemCal={cal}
          itemSugar={sugar}
          itemFat={fat}
        />
        <div className="product-page-add-to-cart-button">
          {editing !== false ? (
            <>
              <Link to={"/menu/cart"}>
                <button className="default-button light-orange return-button">
                  Return
                </button>
              </Link>
              <button
                className="default-button light-orange product-button"
                onClick={() => editProduct()}
              >
                Edit Item
              </button>
            </>
          ) : (
            <>
              {currentUser && (
                <button
                  className="default-button light-orange favorite-button"
                  onClick={() => handleFavoriteClick(location.state.product)}
                >
                  <Icon
                    className="favorite-icon"
                    path={mdiHeartOutline}
                    size={1}
                  />
                </button>
              )}
              {currentUser ? (
                <button
                  className="default-button light-orange product-button"
                  onClick={() => testOnClick()}
                >
                  Add To Order
                </button>
              ) : (
                <Link to={"/sign-in"}>
                  <button className="default-button light-orange product-button">
                    Sign in
                  </button>
                </Link>
              )}
            </>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="product-page-location-info-container">
            <div className="store-info-container">
              <div className="static-store-text-container">
                <p className="static-store-text">Pickup Store</p>
              </div>
              <div className="actual-store-location-text-container">
                {storeLocation !== "undefined" ? (
                  <Link
                    to={"/locations"}
                    state={{
                      redirect: "menu",
                    }}
                  >
                    <p className="actual-store-location-text clickable">
                      {storeLocation.abvAdd}
                    </p>
                  </Link>
                ) : (
                  <Link
                    to={"/locations"}
                    state={{
                      redirect: "menu",
                    }}
                  >
                    <p className="actual-store-location-text clickable">
                      Select a Store
                    </p>
                  </Link>
                )}
              </div>
            </div>
            <Link to="/menu/cart">
              <div className="product-page-bag-icon-container">
                <div className="bag-icon">
                  <Icon
                    className="shopping-bag-icon"
                    path={mdiBagPersonal}
                    size={2}
                  />
                </div>
                <div className="cart-count-overlay">
                  <p className="cart-count-overlay-text">{cartItems.length}</p>
                </div>
              </div>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

ProductPage.propTypes = {
  customizationData: PropTypes.array.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  editCartItem: PropTypes.func.isRequired,
  fetchUserCart: PropTypes.func.isRequired,
  fetchUserSelectedStore: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
};

export default ProductPage;
