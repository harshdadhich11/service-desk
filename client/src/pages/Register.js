import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Register</h1>
      <div>
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          name="name" 
          value={name} 
          onChange={onChange} 
          required 
          placeholder="Enter your name"
        />
      </div>
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
