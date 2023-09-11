import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { faker } from "@faker-js/faker";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  async function googleSignIn() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    const CardExpDate = faker.date.future({ years: 4 });
    const DateManipulation = new Date(CardExpDate);
    const month = DateManipulation.getMonth() + 1;
    let year = DateManipulation.getFullYear();
    year = year.toString().substring(2);
    const newCardExpDate = `${month}/${year}`;

    const userFinanceData = {
      creditCard: {
        name: user.displayName,
        number: faker.finance.creditCardNumber({
          issuer: "11[1-4]#-11[1-4]#-11[1-4]#-###L",
        }),
        cvv: faker.finance.creditCardCVV(),
        expiryDate: newCardExpDate,
        funds: faker.finance.amount({ min: 75, max: 125 }),
        default: false,
      },
      rewardsCard: {
        number: faker.finance.creditCardNumber({
          issuer: "77[7-9]#-77[7-9]#-77[7-9]#-###L",
        }),
        sc: faker.finance.creditCardCVV(),
        funds: "0",
        default: true,
        nick: "Rewards Card",
      },
      rewardPoints: {
        amount: 200,
      },
    };

    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        displayName: user.displayName,
        email: user.email,
        finance: userFinanceData,
        favorites: [],
        history: [],
        cart: [],
        selectedStore: "undefined",
      });
    }
  }

  async function testSignIn() {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;

    const CardExpDate = faker.date.future({ years: 4 });
    const DateManipulation = new Date(CardExpDate);
    const month = DateManipulation.getMonth() + 1;
    let year = DateManipulation.getFullYear();
    year = year.toString().substring(2);
    const newCardExpDate = `${month}/${year}`;

    const userFinanceData = {
      creditCard: {
        name: user.displayName || `Guest_${user.uid.substring(0, 8)}`,
        number: faker.finance.creditCardNumber({
          issuer: "11[1-4]#-11[1-4]#-11[1-4]#-###L",
        }),
        cvv: faker.finance.creditCardCVV(),
        expiryDate: newCardExpDate,
        funds: faker.finance.amount({ min: 75, max: 125 }),
        default: false,
      },
      rewardsCard: {
        number: faker.finance.creditCardNumber({
          issuer: "77[7-9]#-77[7-9]#-77[7-9]#-###L",
        }),
        sc: faker.finance.creditCardCVV(),
        funds: "0",
        default: true,
        nick: "Rewards Card",
      },
      rewardPoints: {
        amount: 200,
      },
    };

    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        displayName: user.displayName || `Guest_${user.uid.substring(0, 8)}`,
        email: user.email || null,
        finance: userFinanceData,
        favorites: [],
        history: [],
        cart: [],
        selectedStore: "undefined",
      });
    }

    setCurrentUser(user);
  }

  async function signOut() {
    await firebaseSignOut(auth);
    setCurrentUser(null);
  }

  const value = {
    googleSignIn,
    signOut,
    testSignIn,
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
