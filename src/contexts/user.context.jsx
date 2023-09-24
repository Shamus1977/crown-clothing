import { createContext, useState, useEffect } from "react";
import { onAuthChangeListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

//Actual value to access.
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//Actual component to wrap around needed components
export const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser};

  useEffect(() => {
    const unsubscribe = onAuthChangeListener((user) => {
      if(user){
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}