import React from "react";
import Homepage from "./components/homepage/homepage";
import Menu from "./components/menu/menu";
import Rewards from "./components/rewards/rewards";
import PropTypes from "prop-types";
import ProductPage from "./components/productPage/productPage";
import GiftCards from "./components/giftCardsPage/giftCards";
import SignIn from "./components/accountPage/signIn";
import SignUp from "./components/accountPage/signUp";
import CardManagement from "./components/accountPage/accountManagement/cardmanagement";
import MyRewards from "./components/accountPage/accountManagement/myRewards";
import PaymentMethods from "./components/accountPage/accountManagement/paymentMethods";
import ProductCheckout from "./components/cartPage/productCheckout";
import History from "./components/accountPage/accountManagement/history";
import Map from "./components/mapPage/map";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CustomizationProvider } from "./context/customizationContext";
import { AuthProvider } from "./context/authContext";
import "./style.css";

function App({
  menuItems,
  featuredItems,
  logoItems,
  rewardItems,
  customizationData,
  giftCards,
  addItemToCart,
  fetchUserCart,
  removeFromCart,
  clearCart,
  editCartItem,
  getDefaultCard,
  getCreditCardInfo,
  getRewardsCardInfo,
  getCardFunds,
  removeFundsDebitCard,
  addFundsRewardsCard,
  removeFundsRewardsCard,
  setDefaultCreditCard,
  setDefaultRewardsCard,
  addCartToHistory,
  addToFavorites,
  fetchUserFavorites,
  removeFromFavorites,
  fetchUserHistory,
  addOrderToHistory,
  fetchUserOrderHistory,
  storeLocations,
  fetchUserSelectedStore,
  updateUserSelectedStore,
}) {
  return (
    <Router>
      <AuthProvider>
        <CustomizationProvider>
          <div>
            <Routes>
              <Route
                default
                path="/"
                element={
                  <Homepage
                    newItems={featuredItems}
                    logoData={logoItems}
                    menuItems={menuItems}
                  />
                }
              />
              <Route
                path="/menu"
                element={
                  <Menu
                    menuItems={menuItems}
                    logoData={logoItems}
                    fetchUserFavorites={fetchUserFavorites}
                    addItemToCart={addItemToCart}
                    removeFromFavorites={removeFromFavorites}
                    fetchUserHistory={fetchUserHistory}
                  />
                }
              />
              <Route
                path="/rewards"
                element={
                  <Rewards rewardItems={rewardItems} logoData={logoItems} />
                }
              />
              <Route
                path="/gift-cards"
                element={
                  <GiftCards giftCards={giftCards} logoData={logoItems} />
                }
              />
              <Route
                path="/product/:productTitle"
                element={
                  <ProductPage
                    customizationData={customizationData}
                    addItemToCart={addItemToCart}
                    editCartItem={editCartItem}
                    fetchUserCart={fetchUserCart}
                    fetchUserSelectedStore={fetchUserSelectedStore}
                    addToFavorites={addToFavorites}
                  />
                }
              />
              <Route
                path="/sign-in"
                element={<SignIn logoData={logoItems} />}
              />
              <Route
                path="/sign-up"
                element={<SignUp logoData={logoItems} />}
              />
              <Route
                path="account/card-management"
                element={
                  <CardManagement
                    logoData={logoItems}
                    getCardFunds={getCardFunds}
                    addFundsRewardsCard={addFundsRewardsCard}
                    removeFundsDebitCard={removeFundsDebitCard}
                    getCreditCardInfo={getCreditCardInfo}
                    getRewardsCardInfo={getRewardsCardInfo}
                  />
                }
              />
              <Route
                path="account/my-rewards"
                element={
                  <MyRewards logoData={logoItems} rewardItems={rewardItems} />
                }
              />
              <Route
                path="account/history"
                element={
                  <History
                    logoData={logoItems}
                    fetchUserOrderHistory={fetchUserOrderHistory}
                  />
                }
              />
              <Route
                path="account/payment-methods"
                element={
                  <PaymentMethods
                    logoData={logoItems}
                    getCreditCardInfo={getCreditCardInfo}
                    getDefaultCard={getDefaultCard}
                    setDefaultCreditCard={setDefaultCreditCard}
                    setDefaultRewardsCard={setDefaultRewardsCard}
                  />
                }
              />
              <Route
                path="/locations"
                element={
                  <Map
                    logoData={logoItems}
                    storeLocations={storeLocations}
                    updateUserSelectedStore={updateUserSelectedStore}
                  />
                }
              />
              <Route
                path="menu/cart"
                element={
                  <ProductCheckout
                    logoData={logoItems}
                    fetchUserCart={fetchUserCart}
                    removeFromCart={removeFromCart}
                    clearCart={clearCart}
                    addItemToCart={addItemToCart}
                    getDefaultCard={getDefaultCard}
                    getCreditCardInfo={getCreditCardInfo}
                    getRewardsCardInfo={getRewardsCardInfo}
                    removeFundsDebitCard={removeFundsDebitCard}
                    removeFundsRewardsCard={removeFundsRewardsCard}
                    getCardFunds={getCardFunds}
                    addCartToHistory={addCartToHistory}
                    addToFavorites={addToFavorites}
                    addOrderToHistory={addOrderToHistory}
                    fetchUserOrderHistory={fetchUserOrderHistory}
                    fetchUserSelectedStore={fetchUserSelectedStore}
                  />
                }
              />
            </Routes>
          </div>
        </CustomizationProvider>
      </AuthProvider>
    </Router>
  );
}

App.propTypes = {
  menuItems: PropTypes.array.isRequired,
  logoItems: PropTypes.array.isRequired,
  featuredItems: PropTypes.array.isRequired,
  rewardItems: PropTypes.array.isRequired,
  customizationData: PropTypes.array.isRequired,
  giftCards: PropTypes.array.isRequired,
  storeLocations: PropTypes.array.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  fetchUserCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  editCartItem: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  getDefaultCard: PropTypes.func.isRequired,
  getCreditCardInfo: PropTypes.func.isRequired,
  getCardFunds: PropTypes.func.isRequired,
  removeFundsDebitCard: PropTypes.func.isRequired,
  addFundsRewardsCard: PropTypes.func.isRequired,
  removeFundsRewardsCard: PropTypes.func.isRequired,
  setDefaultCreditCard: PropTypes.func.isRequired,
  setDefaultRewardsCard: PropTypes.func.isRequired,
  getRewardsCardInfo: PropTypes.func.isRequired,
  addCartToHistory: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  fetchUserFavorites: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  fetchUserHistory: PropTypes.func.isRequired,
  addOrderToHistory: PropTypes.func.isRequired,
  fetchUserOrderHistory: PropTypes.func.isRequired,
  fetchUserSelectedStore: PropTypes.func.isRequired,
  updateUserSelectedStore: PropTypes.func.isRequired,
};

export default App;
