import { initializeApp } from 'firebase/app';
import {  getAuth, 
          signInWithRedirect, 
          signInWithPopup, 
          GoogleAuthProvider, 
          createUserWithEmailAndPassword, 
          signInWithEmailAndPassword,
          signOut,
          onAuthStateChanged,
        } from 'firebase/auth';
import {  getFirestore, 
          doc, 
          setDoc, 
          getDoc,
          collection,
          writeBatch, 
          query,
          getDocs
       } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJHp2HcxrTj31FcLN89ISp1AS50HxCI5U",
  authDomain: "crown-clothing-d6a90.firebaseapp.com",
  projectId: "crown-clothing-d6a90",
  storageBucket: "crown-clothing-d6a90.appspot.com",
  messagingSenderId: "159845042708",
  appId: "1:159845042708:web:b8353d9b79661834d6b501"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
export const db = getFirestore();

export const addDocumentsAndCollection = async (collectionKey, objectsToAdd, field ) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  //console.log("Done");
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot) => {
    const {title, items} = docSnapshot.data();
    accumulator[title.toLowerCase()] = items;
    return accumulator;
  }, {});

  return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  ////console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  ////console.log(userSnapshot);
  ////console.log(userSnapshot?.exists());
  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      //console.log("error creatring doc: "+err.message);
    }
  }
  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => signOut(auth);

export const onAuthChangeListener = (callback) => onAuthStateChanged(auth, callback);