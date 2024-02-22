import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login/Login';
import Pad from './Pad/Pad';
import Signup from './Signup/Signup';
import Loader from './Loader/loader';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/pad" element={<Pad />} />
      <Route path="*" element={<Login />} />
      
      
       
   
   
    </Routes>
  </BrowserRouter>
  );
}

export default App;
