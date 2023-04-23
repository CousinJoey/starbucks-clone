import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { fetchMenu, fetchLogo, fetchFeatured } from "./firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Index() {
  const [menuItems, setMenuItems] = useState([]);
  const [logoItems, setLogoItems] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const menuData = await fetchMenu();
      const logoData = await fetchLogo();
      const featuredData = await fetchFeatured();
      setMenuItems(menuData);
      setLogoItems(logoData);
      setFeaturedItems(featuredData);
      setIsLoading(false);
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
      />
    </React.StrictMode>
  );
}

root.render(<Index />);
