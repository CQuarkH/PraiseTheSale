import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-LXPO6WvDpuWPs5IloYG87R4ayAm3DdM",
  authDomain: "praisethesale-c921f.firebaseapp.com",
  projectId: "praisethesale-c921f",
  storageBucket: "praisethesale-c921f.appspot.com",
  messagingSenderId: "277300227155",
  appId: "1:277300227155:web:f08c0f0cb3a420552eaaa6"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };
