//2 react functions to implement react hooks effect and state

import { useEffect, useState } from "react";
import { auth } from "../firebase";

//uses react hooks at:https://reactjs.org/docs/hooks-intro.html
const useAuth=()=>{
    const [user, setUser]= useState(null);
    const [isLoggedIn, setIsLoggedIn]= useState(false);
    useEffect(
        ()=>{
            auth.onAuthStateChanged(
                //passing anonymous function to firebase's onAuthState
                (user)=>{
                    //sets react state variable isLoggedIn
                    setIsLoggedIn(user && user.uid ? true:false);
                    //set variable user
                    setUser(user);
                }
            );
        }

    );
    //return for useAuth function
    return {user, isLoggedIn};
}
export default useAuth;