import './App.css';
import { BrowserRouter } from "react-router-dom";
import PutTokenInLS from "./hooks/PutTokenInLS";
import jwt from "jsonwebtoken";
import UsersApi from './usersApi';
import UserContext from "./context/UserContext";
import Routes from "./routes/Routes";
import TopDiv from './top-div/TopDiv';
import { useState, useEffect } from 'react';

function App() {
  //use custom hook to initialize state of token
  const [token, setToken] = PutTokenInLS(null);
  //create state for user
  const [currentUser, setCurrentUser] = useState(null);
  console.log(token)
  useEffect(function loadUserInfo(){
    //async function to get our user from usersApi model
    async function getCurrentUser(){
      if(token){
        try{
          let { username } = jwt.decode(token);
          UsersApi.token = token;
          let currentUser = await UsersApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        }catch(e){
          setCurrentUser(null);
        }
      }
    }
    getCurrentUser();
  }, [token]);
  
  //async login function to be passed to login route
  async function login(formData){
    try{
      let token = await UsersApi.login(formData);
      setToken(token);
      console.log(token);
      return { loggedIn : true }
    }catch(errors){
      return { loggedIn: false, errors}
    }
  }
  
  //async signup function to be passed to signup route
  async function signup(formData){
    try{
      let token = await UsersApi.register(formData);
      setToken(token);
    return { signedUp: true }
    }catch(errors){
      return { signedUp: false, errors }
    }
  }
  
  //logout function to be passed to navbar, sets token and user to null
  function logOut(){
    setToken(null);
    setCurrentUser(null);
  }

  return(
    <div>
      <BrowserRouter>
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
          <TopDiv logout={logOut} />
          <Routes login={login} signup={signup} />
        </UserContext.Provider>
     </BrowserRouter>
    </div>
  )
}

export default App;
