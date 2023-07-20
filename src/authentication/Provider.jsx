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
  const [isAdmin, setIsAdmin] = useState(false); // New state to store admin status
  const [userData, setUserData] = useState(null);
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

  const googleRegister = (googleProvider) => {
    return signInWithPopup(auth, googleProvider);
  };

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
        axios
          .post(
            "http://localhost:5000/jwt",
            { email: loggedUser.email },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((data) => {
            console.log(data);
            localStorage.setItem("token", data.data.token);
          });
        setUserFound(true);

        axios
          .get("http://localhost:5000/users")
          .then((response) => {
            const data = response.data;
            const foundUser = data.find(
              (item) => item.email === loggedUser.email
            );
            setUserData(foundUser);
            if (foundUser && foundUser.role === "admin") {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      } else {
        localStorage.removeItem("token");
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
    isAdmin,
    userData,
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
