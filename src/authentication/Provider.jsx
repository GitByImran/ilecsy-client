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
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);
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

  const googleRegister = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
      setLoading(false);
      if (loggedUser) {

        axios
          .get("http://localhost:5000/users")
          .then((response) => {
            const data = response.data;
            const foundUser = data.find(
              (item) => item.email === loggedUser.email
            );
            setUserData(foundUser);
            // console.log(userData);
            if (foundUser && foundUser?.role === "admin") {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      } else {
        setIsAdmin(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const updateUserProfile = (displayName) => {
    // console.log(displayName);
    return updateProfile(auth.currentUser, { displayName });
  };

  const authInfo = {
    auth,
    user,
    isAdmin,
    userData,
    createUser,
    signIn,
    logOut,
    loading,
    setLoading,
    googleRegister,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Provider;
