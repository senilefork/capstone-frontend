import "./SiteNav.css";
import { RiVirusLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";
import React from "react";

//darker blue nav bar
const SiteNav = () =>{
  const { currentUser } = useContext(UserContext);

   return(
    
       <div id="site-nav"> 
         <div id="virus-logo">
           <RiVirusLine size="48px" color="white" />   
           <h4 id="site-nav-header">CARONA VIRUS DASHBOARD</h4> 
         </div>
         <div id="links">
          <NavLink to="/">
           <p>World Map</p>
          </NavLink>
            <p> | </p>
          {currentUser ? <NavLink to="/us-page"><p>U.S. Map</p></NavLink> : <NavLink to="/login"><p>U.S. Map</p></NavLink> } 
         </div> 
       </div>
    
   )
}

export default SiteNav;