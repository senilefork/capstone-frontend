import { useState, useEffect } from "react";

//custom hook for handeling user login
const PutTokenInLS = () =>{
   const initialVal = window.localStorage.getItem("currentUserToken") || null;
   const [currentUserToken, setCurrentUserToken] = useState(initialVal);

   useEffect(() =>{
       window.localStorage.setItem("currentUserToken", currentUserToken);
   }, [currentUserToken]);
   
   return [currentUserToken, setCurrentUserToken];
}

export default PutTokenInLS;