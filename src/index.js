import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { fetchMenu, fetchLogo, fetchFeatured, fetchRewards } from "./firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Index() {
  const [menuItems, setMenuItems] = useState([]);
  const [logoItems, setLogoItems] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [rewardItems, setRewardItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const menuData = await fetchMenu();
      const logoData = await fetchLogo();
      const featuredData = await fetchFeatured();
      const rewardData = await fetchRewards();
      setMenuItems(menuData);
      setLogoItems(logoData);
      setFeaturedItems(featuredData);
      setIsLoading(false);
      setRewardItems(rewardData);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
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
      />
    </React.StrictMode>
  );
}

root.render(<Index />);
