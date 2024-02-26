import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login/Login';
import Pad from './Pad/Pad';
import Signup from './Signup/Signup';
import Loader from './Loader/loader';
import AnonymousUser from './AnonymousUser/AnonymousUser';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/pad" exactPath element={<Pad />} />
      <Route path="/user" element={<AnonymousUser />} />
      <Route path="*" element={<Login />} />
      
      
       
   
   
    </Routes>
  </BrowserRouter>
  );
}

export default App;
