import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

console.log(firebaseConfig)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const navigate = useNavigate();


  useEffect(()=>{

    userObserver()
  }, [])

  const createUser = async (email, password, displayName) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName });
      navigate("/");
      toast.success("Registered Successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
        toast.success("Logged in Successfully!");
      } catch (error) {
        toast.error(error.message);
      }
  };

  const userObserver = ()=>{
    onAuthStateChanged(auth, (user)=>{
        if(user){
            const {email, displayName, photoURL} = user;
            setCurrentUser({email, displayName, photoURL})
        }else{
            setCurrentUser(false)
        }

    })
  }
  const logOut = () => {
    signOut(auth)
    toast.success('Logged out successfully !')
  };

  const signUpProvider = async () => {
    try{
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider)
        navigate('/')
        toast.success('Logged in successfully !')
    }catch(error){
        toast.error(error.message);  
    }

  };
  const forgotPassword = async(email) => {
   try{
       await sendPasswordResetEmail(auth, email)
       toast.warn('Please check your email!')
   }catch(error){
    toast.error(error.message);  
   }
  };

  const values = {
    currentUser,
    createUser,
    signIn,
    logOut,
    signUpProvider,
    forgotPassword,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
