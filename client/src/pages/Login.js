// src/pages/Login.js
import React, { useState, useContext } from 'react';
import AuthContext from '../context/authContext';

const Login = () => {
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Login</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          name="email" 
          value={email} 
          onChange={onChange} 
          required 
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          name="password" 
          value={password} 
          onChange={onChange} 
          required 
          placeholder="Enter your password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
