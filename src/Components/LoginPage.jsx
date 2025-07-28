import React, { useState} from 'react';
import '../App.css';
import LoginIcon from '../assets/LoginIcon.png'; // image import
import axios from '../api/axios.js'

const LoginPage = () => {
    
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async(e) => {
    e.preventDefault();

    const updatedusername = username.trim().replace(/\s+/g, '').toLowerCase()

    if((username === "")|| (password === "")){
      alert("all fields must be filled")
    }
    else{
    try {
      const userdata = await axios.post('/api/login', {username: updatedusername , password: password});
      if(userdata.data.islogin){
        alert("login Succesfull");
      }
      else{
        alert("failed fool u fool")
      }
      setPassword('');
      setUsername('');
       } catch (error) {
               console.error(error);
       }
      }
};





  return (
    <div className="login-wrapper">
      <div className="image-container">
        <img src={LoginIcon} alt="Login visual" />
      </div>

      <div className="login-container">
        <h1>Sign in to ARBITO</h1>
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
              type="password" 
              id="password"
              className="input-field"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />

          
        </div>
        <div className="forgot-password">
  <a href="#" onClick={(e) => {
    e.preventDefault();
    alert('Redirecting to password reset 🔐');
    // You can navigate or trigger modal here
  }}>
    Forgot Password?
  </a>
</div>


        <button className="login-btn" onClick={handleLogin}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default LoginPage;