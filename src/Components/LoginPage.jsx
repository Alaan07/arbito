import React, { useState} from 'react';
import '../App.css';
import LoginIcon from '../assets/LoginIcon.png'; 
import axios from '../api/axios.js'
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
    
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();



  const handleLogin = async(e) => {
    e.preventDefault();

    const updatedusername = username.trim().replace(/\s+/g, '').toLowerCase()

    if((username === "")|| (password === "")){
      alert("all fields must be filled")
    }
    else{
    try {
  const userdata = await axios.post('/api/login', { username: updatedusername, password });
  if (userdata.data.islogin) {
    alert("Login Successful");
    sessionStorage.setItem("redirectedOnce", "true");
    window.location.href = "/dashbord";
  }
} catch (error) {
  if (error.response && error.response.status === 401) {
    alert(error.response.data.message || "Invalid username or password");
  } else {
    alert("Server error, please try again later");
  }
  setUsername('');
  setPassword('');
} }
};



  return (
    <div className="login-wrapper">
      <div className="image-container">
        <img src={LoginIcon} alt="Login visual" />
      </div>

      <div className="login-container">
        <h1>Sign in to <span className="arbito-hover">ARBITO</span></h1>

        <p>Welcome back! Please sign in to continue</p>

        <label htmlFor="username" className="email-label">Username</label>
        <input
          type="text"
          id="username"
          className="input-field"
          placeholder="Enter your username"
          value={username}
          onChange={(e)=> {setUsername(e.target.value)}}
        />

        <label htmlFor="password" className="email-label">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"} 
              id="password"
              className="input-field"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        

        <button className="login-btn" onClick={handleLogin}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default LoginPage;