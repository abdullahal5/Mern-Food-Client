import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
const auth = getAuth(app);

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../Hook/useAxiosPublic";

export const AuthContext = createContext(null);

const Authprovider = ({ children }) => {
  const axiosPublic = useAxiosPublic()
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const googleProvider = new GoogleAuthProvider();
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (CUser) => {
      setUser(CUser);
      if(CUser){
        const userInfo = { email: CUser.email };
        axiosPublic.post('/jwt', userInfo)
        .then((res) => {
          if(res.data.token){
            localStorage.setItem("access-token", res.data.token)
            setLoading(false);
          }
        });
      }
      else{
        localStorage.removeItem("access-token");
        setLoading(false)
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    createUser,
    googleSignIn,
    logout,
    updateUserProfile,
    user,
    signIn,
    loading,
    setLoading
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Authprovider;
