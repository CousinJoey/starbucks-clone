import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRkB1TmAeWettYTaD6Hz_-lLYbImhRFdk",
  authDomain: "starbucks-clone-34c1a.firebaseapp.com",
  projectId: "starbucks-clone-34c1a",
  storageBucket: "starbucks-clone-34c1a.appspot.com",
  messagingSenderId: "495668121087",
  appId: "1:495668121087:web:8e44ad669cb5d24175ebca",
  measurementId: "G-NG42RLYGKQ",
};

initializeApp(firebaseConfig);

const db = getFirestore();

export async function fetchLogo() {
  const colRef = collection(db, "logo");
  const docsSnap = await getDocs(colRef);

  const items = [];

  docsSnap.forEach((doc) => {
    const data = doc.data();
    items.push({
      name: data.name,
      src: data.src,
      type: data.type,
      item: data.item,
      featured: data.featured,
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
  const colRef = collection(db, "menu");
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

const storage = getStorage();
const fileRefs = [
  ref(
    storage,
    "gs://starbucks-clone-34c1a.appspot.com/Images/rewards-how-to-earn/giftCard2.png"
  ),
  ref(
    storage,
    "gs://starbucks-clone-34c1a.appspot.com/Images/rewards-delta/delta-background.png"
  ),
  ref(
    storage,
    "gs://starbucks-clone-34c1a.appspot.com/Images/rewards-filler/1.png"
  ),
  ref(
    storage,
    "gs://starbucks-clone-34c1a.appspot.com/Images/rewards-filler/3.png"
  ),
  ref(
    storage,
    "gs://starbucks-clone-34c1a.appspot.com/Images/rewards-filler/2.png"
  ),
  ref(
    storage,
    "gs://starbucks-clone-34c1a.appspot.com/Images/rewards-how-to-earn/card.png"
  ),
  ref(
    storage,
    "gs://starbucks-clone-34c1a.appspot.com/Images/rewards-how-to-earn/gift-card.png"
  ),
  ref(
    storage,
    "gs://starbucks-clone-34c1a.appspot.com/Images/rewards-how-to-earn/phone-card.png"
  ),
  ref(
    storage,
    "gs://starbucks-clone-34c1a.appspot.com/Images/rewards-how-to-earn/phone.png"
  ),
  ref(
    storage,
    "gs://starbucks-clone-34c1a.appspot.com/Images/rewards-delta/fake-delta.png"
  ),
];

fileRefs.forEach((fileRef) => {
  getDownloadURL(fileRef)
    .then((url) => {
      console.log("File download URL:", url);
    })
    .catch((error) => {
      console.error("Error getting file download URL:", error);
    });
});
