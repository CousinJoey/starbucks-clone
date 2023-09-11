import { initializeApp } from "firebase/app";
import { formatISO } from "date-fns";
import {
  getFirestore,
  getDocs,
  getDoc,
  collection,
  doc,
  updateDoc,
  setDoc,
  arrayUnion,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRkB1TmAeWettYTaD6Hz_-lLYbImhRFdk",
  authDomain: "starbucks-clone-34c1a.firebaseapp.com",
  projectId: "starbucks-clone-34c1a",
  storageBucket: "starbucks-clone-34c1a.appspot.com",
  messagingSenderId: "495668121087",
  appId: "1:495668121087:web:8e44ad669cb5d24175ebca",
  measurementId: "G-NG42RLYGKQ",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export async function fetchLogo() {
  const colRef = collection(db, "logo");
  const docsSnap = await getDocs(colRef);

  const items = [];

  docsSnap.forEach((doc) => {
    const data = doc.data();
    items.push({
      name: data.name,
      src: data.src,
    });
  });

  return items;
}

export async function fetchFeatured() {
  const colRef = collection(db, "featured");
  const docsSnap = await getDocs(colRef);

  const items = [];

  docsSnap.forEach((doc) => {
    const data = doc.data();
    items.push({
      name: data.name,
      src: data.src,
      title: data.title,
    });
  });

  return items;
}

export async function fetchMenu() {
  const colRef = collection(db, "menuCurrent");
  const docsSnap = await getDocs(colRef);

  const items = [];

  docsSnap.forEach((doc) => {
    const data = doc.data();
    items.push({
      bees: data.bees,
      cal: data.calories,
      desc: data.desc,
      fat: data.fat,
      general: data.general,
      inc: data.inc || "null",
      price: data.price,
      specific: data.specific || "null",
      src: data.src,
      sugar: data.sugar,
      title: data.title,
      type: data.type,
      header: data.header,
      sub: data.sub,
      alt: data.alt,
      custom: data.custom,
      customOptions: data.customOptions,
      customCategories: data.customCategories,
      edit: data.edit,
      flavors: data.flavors || null,
      toppings: data.toppings || null,
      additions: data.additions || null,
      sweeteners: data.sweeteners || null,
      sizes: data.sizes || null,
    });
  });

  return items;
}

export async function fetchRewards() {
  const colRef = collection(db, "rewards");
  const docsSnap = await getDocs(colRef);

  const items = [];

  docsSnap.forEach((doc) => {
    const data = doc.data();
    items.push({
      name: data.name,
      src: data.src,
    });
  });

  return items;
}

export async function fetchCustomization() {
  const colRef = collection(db, "customizationOptionsTable");
  const docsSnap = await getDocs(colRef);

  const items = [];

  docsSnap.forEach((doc) => {
    const data = doc.data();
    items.push({
      options: data.options,
    });
  });

  return items;
}

export async function fetchStoreLocations() {
  const colRef = collection(db, "storeLocations");
  const docsSnap = await getDocs(colRef);

  const items = [];

  docsSnap.forEach((doc) => {
    const data = doc.data();
    items.push({
      address: data.address,
      header: data.header || null,
      abvAdd: data.abvAdd || null,
      driveThru: data.driveThru,
      lat: data.lat,
      lon: data.lon,
      closing: data.closing,
      twentyfour: data.twentyfour,
      phone: data.phone,
    });
  });

  return items;
}

export async function fetchGiftCards() {
  const colRef = collection(db, "giftCards");
  const docsSnap = await getDocs(colRef);

  const items = [];

  docsSnap.forEach((doc) => {
    const data = doc.data();
    items.push({
      src: data.src,
      type: data.type,
    });
  });

  return items;
}

export const addItemToCart = async (userId, item) => {
  const userDocRef = doc(db, "users", userId);
  try {
    await updateDoc(userDocRef, {
      cart: arrayUnion(item),
    });
    console.log("Item added to cart successfully!");
  } catch (error) {
    console.error("Error adding item to cart: ", error);
  }
};

export async function fetchUserCart(userId) {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    return userData.cart ? userData.cart : [];
  } else {
    return [];
  }
}

export const removeFromCart = async (userId, itemId) => {
  const userDocRef = doc(db, "users", userId);
  try {
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const updatedCart = userData.cart
        ? userData.cart.filter((item) => item.product.id !== itemId)
        : [];
      await setDoc(userDocRef, { cart: updatedCart }, { merge: true });
      console.log("Item removed from cart successfully!");
    } else {
      console.log("No such user exists!");
    }
  } catch (error) {
    console.error("Error removing item from cart: ", error);
  }
};

export const editCartItem = async (
  userId,
  productId,
  newCustomization,
  newSize
) => {
  const userDocRef = doc(db, "users", userId);
  try {
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      if (userData.cart) {
        const updatedCart = userData.cart.map((item) => {
          if (item.product.id === productId) {
            return {
              ...item,
              product: {
                ...item.product,
                size: newSize,
              },
              customization: newCustomization,
            };
          }
          return item;
        });
        await setDoc(userDocRef, { cart: updatedCart }, { merge: true });
        console.log("Item updated successfully!");
      } else {
        console.log("User does not have a cart!");
      }
    } else {
      console.log("No such user exists!");
    }
  } catch (error) {
    console.error("Error updating item in cart: ", error);
  }
};

export const clearCart = async (userId) => {
  console.log("Trying to clear cart");
  const userDocRef = doc(db, "users", userId);
  try {
    await setDoc(userDocRef, { cart: [] }, { merge: true });
    console.log("Cart cleared successfully!");
  } catch (error) {
    console.error("Error clearing cart: ", error);
  }
};

export const getDefaultCard = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    if (userData.finance.creditCard.default) {
      return "credit";
    } else if (userData.finance.rewardsCard.default) {
      return "rewards";
    } else {
      console.error("No default card set!");
      return null;
    }
  } else {
    console.error("No such user exists!");
    return null;
  }
};

export const setDefaultCreditCard = async (userId) => {
  console.log(userId);
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    await updateDoc(userDocRef, {
      "finance.creditCard.default": true,
      "finance.rewardsCard.default": false,
    });
    console.log("Credit card set as default successfully!");
  } else {
    console.error("No such user exists!");
  }
};

export const setDefaultRewardsCard = async (userId) => {
  console.log(userId);
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    await updateDoc(userDocRef, {
      "finance.creditCard.default": false,
      "finance.rewardsCard.default": true,
    });
    console.log("Rewards card set as default successfully!");
  } else {
    console.error("No such user exists!");
  }
};

export const getCreditCardInfo = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    return userData.finance.creditCard;
  } else {
    console.error("No such user exists!");
    return null;
  }
};

export const getRewardsCardInfo = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    return userData.finance.rewardsCard;
  } else {
    console.error("No such user exists!");
    return null;
  }
};

export const getCardFunds = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    return {
      creditCardFunds: userData.finance.creditCard.funds,
      rewardsCardFunds: userData.finance.rewardsCard.funds,
    };
  } else {
    console.error("No such user exists!");
    return null;
  }
};

export const removeFundsDebitCard = async (userId, amount) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    let updatedCreditCardFunds =
      parseFloat(userData.finance.creditCard.funds) - amount;

    if (updatedCreditCardFunds < 0) {
      console.error("Insufficient funds!");
      return null;
    } else {
      await updateDoc(userDocRef, {
        "finance.creditCard.funds": updatedCreditCardFunds.toString(),
      });
      console.log("Funds deducted successfully!");
      return updatedCreditCardFunds;
    }
  } else {
    console.error("No such user exists!");
    return null;
  }
};

export const addFundsRewardsCard = async (userId, amount) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    let updatedRewardsCardFunds =
      parseFloat(userData.finance.rewardsCard.funds) + amount;

    await updateDoc(userDocRef, {
      "finance.rewardsCard.funds": updatedRewardsCardFunds.toString(),
    });
    console.log("Funds added successfully!");
    return updatedRewardsCardFunds;
  } else {
    console.error("No such user exists!");
    return null;
  }
};

export const removeFundsRewardsCard = async (userId, amount) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    let updatedRewardsCardFunds =
      parseFloat(userData.finance.rewardsCard.funds) - amount;

    if (updatedRewardsCardFunds < 0) {
      console.error("Insufficient funds!");
      return null;
    } else {
      await updateDoc(userDocRef, {
        "finance.rewardsCard.funds": updatedRewardsCardFunds.toString(),
      });
      console.log("Funds deducted successfully!");
      return updatedRewardsCardFunds;
    }
  } else {
    console.error("No such user exists!");
    return null;
  }
};

export const addToFavorites = async (userId, itemData) => {
  const userDocRef = doc(db, "users", userId);
  try {
    await setDoc(
      userDocRef,
      { favorites: arrayUnion(itemData) },
      { merge: true }
    );
    console.log("Item added to favorites successfully!");
  } catch (error) {
    console.error("Error adding item to favorites: ", error);
  }
};

export const removeFromFavorites = async (userId, itemId) => {
  const userDocRef = doc(db, "users", userId);
  try {
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const updatedFavorites = userData.favorites
        ? userData.favorites.filter((item) => item.product.id !== itemId)
        : [];
      await setDoc(
        userDocRef,
        { favorites: updatedFavorites },
        { merge: true }
      );
      console.log("Item removed from favorites successfully!");
    } else {
      console.log("No such user exists!");
    }
  } catch (error) {
    console.error("Error removing item from favorites: ", error);
  }
};

export const addCartToHistory = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  try {
    const userDoc = await getDoc(userDocRef);
    const cartItems = userDoc.data().cart || [];

    await setDoc(
      userDocRef,
      { history: arrayUnion(...cartItems) },
      { merge: true }
    );
    console.log("Cart items added to history successfully!");
  } catch (error) {
    console.error("Error adding cart to history: ", error);
  }
};

export async function fetchUserFavorites(userId) {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    return userData.favorites ? userData.favorites : [];
  } else {
    return [];
  }
}

export async function fetchUserHistory(userId) {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    return userData.history ? userData.history : [];
  } else {
    return [];
  }
}

export const addOrderToHistory = async (userId, cartItems, total) => {
  const userDocRef = doc(db, "users", userId);

  try {
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const currentOrders = userData.orders || [];

      const newOrder = {
        items: cartItems,
        total: total,
        timestamp: formatISO(new Date()),
      };

      const updatedOrders = [...currentOrders, newOrder];

      await setDoc(userDocRef, { orders: updatedOrders }, { merge: true });
      console.log("Order added to history successfully!");
    } else {
      console.log("No such user exists!");
    }
  } catch (error) {
    console.error("Error adding order to history: ", error);
  }
};

export async function fetchUserOrderHistory(userId) {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    return userData.orders ? userData.orders : [];
  } else {
    return [];
  }
}

export async function fetchUserSelectedStore(userId) {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    return userData.selectedStore ? userData.selectedStore : undefined;
  } else {
    return undefined;
  }
}

export const updateUserSelectedStore = async (userId, store) => {
  const userDocRef = doc(db, "users", userId);

  await updateDoc(userDocRef, {
    selectedStore: store,
  });
};
