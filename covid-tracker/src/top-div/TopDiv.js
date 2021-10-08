import "./TopDiv.css";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";

//component for top nav
const TopDiv = ({ logout }) =>{
   const { currentUser } = useContext(UserContext);

   if(currentUser){
    return(
      <div id="top-div">
        <p>Welcome {currentUser.firstName}</p>
        <div id="login-signup">
          <Link to="/" onClick={logout}><p>logout</p></Link>
        </div>
      </div>
  )
   } else {
   return(
       <div id="top-div">
         <p>Welcome, please login/signup for more data...</p>
         <div id="login-signup">
           <NavLink to="/login">
             <p>login</p>
           </NavLink>
           <NavLink to="/signup">
             <p>signup</p>
           </NavLink>
         </div>
       </div>
   )
  }
}

export default TopDiv;