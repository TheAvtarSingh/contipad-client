import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Bottombar from "../BottomBar/bottombar";
import axios from "axios";
import Loader from "../Loader/loader";
import Cookies from 'js-cookie';

function Login() {
  const [result, setResult] = useState('');
  const [submitFlag, setSubmitFlag] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Basic validation
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Please enter your password.";
    }


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {

      setSubmitFlag(true);
      
      axios.post('https://contipad-server.vercel.app/api/login-user', formData).then((res) => {
   
      
      if(res.data.message) setResult(res.data.message);
      if(res.data.error) setResult(res.data.error);

      Cookies.set('user', res.data.savedUser.name, { expires: 7 });
      Cookies.set('isLoggedIn', true, { expires: 7 });
  
      setSubmitFlag(false);
      
    })
    .catch((err) => {
      setResult(err);
      setSubmitFlag(false);
    });
    }
  };

  return (
    <>
    {submitFlag && <Loader />}
    
      <main>
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login Form</h1>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label><span className='text-danger'>*</span>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <div className="form-text text-danger">{errors.email}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label><span className='text-danger'>*</span>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <div className="form-text text-danger">{errors.password}</div>
          </div>
          <div className="mb-3">
          
          <span> {result}</span>
         
        </div>

    
        
          <div className="buttons my-1">
            <button type="submit" className="btn btn-primary mx-2">
              Submit
            </button>
            <button
            type="reset"
              onClick={() => {
                setFormData({
                  email: "",
                  password: "",
                });
              }}
              className="btn btn-primary mx-2"
            >
              Clear
            </button>
          </div>
          <button type="button" className="btn btn-primary mx-2" onClick={()=>{setResult("Contact Me On LinkedIn/in/theavtarsingh")}}>
            Reset Password
          </button>
          <Link to={"/signup"} type="button" className="btn btn-primary mx-2 my-2" >
            Signup
          </Link>
        </form>
      </main>
      <Bottombar />
    </>
  );
}

export default Login;
