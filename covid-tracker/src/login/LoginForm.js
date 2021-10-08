import React, { useState } from "react";
import { useHistory } from "react-router";
import "./Login.css"

//log in form inherits login function from app component
const LoginForm = ( { login } ) =>{
  
  const INITIAL_STATE = {
    username: "",
    password: ""
  }

  const [loginErrors, setLoginErrors] = useState([])

  const history = useHistory();

  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = e =>{
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  }

  async function handleSubmit(e){
    e.preventDefault();
    let res = await login(formData);
    if(res.loggedIn){
      history.push('/');
    } else {
      console.log("errors",res.errors);
      setLoginErrors(res.errors)
    }
  }

  return(
      <div id="login-form-container">
        <h1 id="login-header">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-inputs">
           <p className="input-header">Username</p>
           <input 
           type="text"
           name="username"
           value={formData.username}
           onChange={handleChange}/>
           <p className="input-header">Password</p>
           <input 
           type="password"
           name="password"
           value={formData.password}
           onChange={handleChange}/>
           <div className="button-div">
             <button className="login-button">Login</button>
           </div>
           {loginErrors.length > 0 ? <p style={{color:'red'}}>{loginErrors}</p> : null}
          </div>
        </form>      
      </div>
  )
}

export default LoginForm;