// Inside Login.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import './Login.css';
import logo from '../../../assets/logo.png';

// Load API base URL from environment (Vite) or fallback to localhost:3000
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

    const result = await response.json();

    if (!response.ok) {
      setErrorMsg(result.error);
    } else {
      alert("Login successful!");
      localStorage.setItem('access_token', result.session.access_token);
      localStorage.setItem('refresh_token', result.session.refresh_token);
      localStorage.setItem('user', JSON.stringify(result.user));
      navigate("/home");
      window.location.reload();
    }
  } catch (error) {
    console.error('Login error:', error);
    setErrorMsg('Unable to connect to the server. Please try again later.');
  }
};

  return (
    <div className="overlay" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img
        src={logo}
        alt="EggRoll Logo"
        style={{ width: '230px', marginBottom: '1.5rem' }}
      />
  
      <form onSubmit={handleLogin}>
        <div className="auth-form">
          <div className="con">
            <header className="head-form">
              <h2>Login</h2>
              <p>Let's get egged together!</p>
            </header>
  
            <div className="other">
              <input
                className="form-input"
                id="txt-input"
                type="text"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                className="form-input"
                type="password"
                placeholder="Password"
                id="pwd"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button type="submit" className="log-in btn">Log In</button>
            </div>
  
            <div className="signup">
              <p>
                Don’t have an account?{' '}
                <Link to="/signup" className="signup-link">Sign up here</Link>
              </p>
            </div>
  
            {errorMsg && (
              <div style={{
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
                padding: '0.75rem 0.5rem',
                backgroundColor: '#ffe5e5',
                color: '#b00020',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: '500'
              }}>
                {errorMsg}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );  
}
