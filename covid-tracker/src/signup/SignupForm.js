import React, { useState } from "react";
import "./Signup.css";
import { useHistory } from "react-router";

const SignupForm = ({ signup }) =>{

  const history = useHistory();

  const [signupErrors, setSignupErrors] = useState([]);

  const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  }

  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = e =>{
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }

  async function handleSubmit(e){
    e.preventDefault();
    let res = await signup(formData);
    if(res.signedUp){
      history.push('/');
    } else {
      setSignupErrors(res.errors)
      console.log(signupErrors)
    }
  }

  return(
      <div id="form-container">
        <h1 id="signup-header">Sign up</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
         <p>First name</p>
         <input 
           type="text" 
           name="firstName"
           onChange={handleChange}
           value={formData.firstName}/>
         <p>Last name</p>
         <input 
           type="text" 
           name="lastName"
           onChange={handleChange}
           value={formData.lastName}/>
         <p>Username</p>
         <input 
           type="text" 
           name="username"
           onChange={handleChange}
           value={formData.username}/>
         <p>Email</p>
         <input 
           type="email" 
           name="email"
           onChange={handleChange}
           value={formData.email}/>
         <p>Password</p>
         <input 
           type="password" 
           name="password"
           onChange={handleChange}
           value={formData.password}/>
         <div className="button-div">
           <button className="signup-button">Sign up</button>
         </div>  
         {signupErrors.map(e => (<p style={{color:'red'}}>{e}</p>))}
        </form>
      </div>
  )  
};

export default SignupForm;

