import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  fetchMenu,
  fetchLogo,
  fetchFeatured,
  fetchRewards,
  fetchCustomization,
  fetchGiftCards,
  addItemToCart,
  fetchUserCart,
  removeFromCart,
  editCartItem,
  clearCart,
  getDefaultCard,
  getCreditCardInfo,
  getRewardsCardInfo,
  getCardFunds,
  addFundsRewardsCard,
  removeFundsRewardsCard,
  removeFundsDebitCard,
  setDefaultCreditCard,
  setDefaultRewardsCard,
  addCartToHistory,
  addToFavorites,
  fetchUserFavorites,
  removeFromFavorites,
  fetchUserHistory,
  addOrderToHistory,
  fetchUserOrderHistory,
  fetchStoreLocations,
  fetchUserSelectedStore,
  updateUserSelectedStore,
} from "./firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Index() {
  const [menuItems, setMenuItems] = useState([]);
  const [logoItems, setLogoItems] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [rewardItems, setRewardItems] = useState([]);
  const [customizationData, setCustomizationData] = useState([]);
  const [giftCards, setGiftCards] = useState([]);
  const [storeLocations, setStoreLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const menuData = await fetchMenu();
      const logoData = await fetchLogo();
      const featuredData = await fetchFeatured();
      const rewardData = await fetchRewards();
      const customizationData = await fetchCustomization();
      const giftCardData = await fetchGiftCards();
      const storeLocationsData = await fetchStoreLocations();
      setStoreLocations(storeLocationsData);
      setGiftCards(giftCardData);
      setMenuItems(menuData);
      setLogoItems(logoData);
      setFeaturedItems(featuredData);
      setIsLoading(false);
      setRewardItems(rewardData);
      setCustomizationData(customizationData);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-placeholder loading-centered">
        <div className="loading-circle"></div>
      </div>
    );
  }

  return (
    <React.StrictMode>
      <App
        menuItems={menuItems}
        logoItems={logoItems}
        featuredItems={featuredItems}
        rewardItems={rewardItems}
        customizationData={customizationData}
        giftCards={giftCards}
        storeLocations={storeLocations}
        addItemToCart={addItemToCart}
        fetchUserCart={fetchUserCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        editCartItem={editCartItem}
        getDefaultCard={getDefaultCard}
        getCreditCardInfo={getCreditCardInfo}
        getRewardsCardInfo={getRewardsCardInfo}
        getCardFunds={getCardFunds}
        removeFundsDebitCard={removeFundsDebitCard}
        addFundsRewardsCard={addFundsRewardsCard}
        removeFundsRewardsCard={removeFundsRewardsCard}
        setDefaultCreditCard={setDefaultCreditCard}
        setDefaultRewardsCard={setDefaultRewardsCard}
        addCartToHistory={addCartToHistory}
        addToFavorites={addToFavorites}
        fetchUserFavorites={fetchUserFavorites}
        removeFromFavorites={removeFromFavorites}
        fetchUserHistory={fetchUserHistory}
        addOrderToHistory={addOrderToHistory}
        fetchUserOrderHistory={fetchUserOrderHistory}
        fetchUserSelectedStore={fetchUserSelectedStore}
        updateUserSelectedStore={updateUserSelectedStore}
      />
    </React.StrictMode>
  );
}

root.render(<Index />);
