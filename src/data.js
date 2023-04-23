import "firebase/storage";
import "firebase/firestore";

import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

const imagesCollection = collection(db, "images");

const addImage = async (metadata, url) => {
  try {
    const docRef = await addDoc(imagesCollection, { metadata, url });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const updateImage = async (id, metadata, url) => {
  const imageRef = doc(db, "images", id);
  try {
    await updateDoc(imageRef, { metadata, url });
    console.log("Document updated with ID: ", id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

const deleteImage = async (id) => {
  const imageRef = doc(db, "images", id);
  try {
    await deleteDoc(imageRef);
    console.log("Document deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

const getImages = async () => {
  const images = [];
  const querySnapshot = await getDocs(imagesCollection);
  querySnapshot.forEach((doc) => {
    images.push({ id: doc.id, ...doc.data() });
  });
  return images;
};

const subscribeToImages = (callback) => {
  onSnapshot(imagesCollection, (querySnapshot) => {
    const images = [];
    querySnapshot.forEach((doc) => {
      images.push({ id: doc.id, ...doc.data() });
    });
    callback(images);
  });
};

export { addImage, updateImage, deleteImage, getImages, subscribeToImages };
