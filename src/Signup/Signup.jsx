import React, { useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Bottombar from '../BottomBar/bottombar';
import Loader from '../Loader/loader';

function Signup() {
  const [submitFlag, setSubmitFlag] = useState(false);
  const [result, setResult] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Basic validation
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    }

    if (!formData.password.trim() || formData.password.length < 6) {
      newErrors.password = 'Please enter your password and minimun length should be 6.';
    }

    if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = 'Please enter appropiate phone number.';
    }


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setSubmitFlag(true);
      axios.post('https://contipad-server.vercel.app/api/signup-user', formData)
  .then((res) => {
  
    if(res.data.message) setResult(res.data.message);
    if(res.data.error) setResult(res.data.error);

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
    {submitFlag &&  <Loader />}
   
      <main>
        <form className='login-form' onSubmit={handleSubmit}>
          <h1>Signup Form</h1>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Your Name <span className='text-danger'>*</span></label>
            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} />
            <div className="form-text text-danger">{errors.name}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address <span className='text-danger'>*</span></label>
            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} />
            <div className="form-text text-danger">{errors.email}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password <span className='text-danger'>*</span></label>
            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleInputChange} />
            <div className="form-text text-danger">{errors.password}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">Phone Number <span className='text-danger'>*</span></label>
            <input type="number" className="form-control" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
            <div className="form-text text-danger">{errors.phoneNumber}</div>
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
                  name: "",
                  password: '',
                  phoneNumber: '',
                });
              }}
              className="btn btn-primary mx-2"
            >
              Clear
            </button>
          </div>
         
          <Link to={"/login"} type="button" className="btn btn-primary mx-2 my-2" >
            Login
          </Link>
        </form>
      </main>
      <Bottombar />
    </>
  );
}

export default Signup;
