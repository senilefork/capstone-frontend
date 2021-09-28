import "./SiteNav.css";
import { RiVirusLine } from "react-icons/ri";
import React from "react";

const SiteNav = () =>{

   return(
    
       <div id="site-nav"> 
         <div id="virus-logo">
           <RiVirusLine size="48px" color="white" />   
           <h4 id="site-nav-header">CARONA VIRUS DASHBOARD</h4> 
         </div>
         <div id="links">
           <p>World Map</p> 
           <p>U.S. Map</p> 
         </div> 
       </div>
    
   )
}

export default SiteNav;