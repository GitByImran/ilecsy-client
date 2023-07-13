import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase.config";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [userFound, setUserFound] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  const [loading, setLoading] = useState(true);

  const createUser = (displayName, email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, displayName, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //

  const googleRegister = (googleProvider) => {
    return signInWithPopup(auth, googleProvider);
  };

  //

  const logOut = () => {
    setLoading(true);
    setUserNotFound(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
      setLoading(false);
      if (loggedUser) {
        setUserFound(true);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const updateUserProfile = (displayName) => {
    console.log(displayName);
    return updateProfile(auth.currentUser, { displayName });
  };

  const authInfo = {
    auth,
    user,
    createUser,
    signIn,
    logOut,
    loading,
    setLoading,
    googleRegister,
    updateUserProfile,
    userFound,
    userNotFound,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Provider;
