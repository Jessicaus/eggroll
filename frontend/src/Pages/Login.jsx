// Inside Login.jsx
import { useState } from "react";
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      setErrorMsg(result.error);
    } else {
      alert("Login successful!");
      // Save token/user info or redirect
    }
  };

  return (
    <div className="overlay">
      <form onSubmit={handleLogin}>
        <div className="con">
          <header className="head-form">
            <h2>Login</h2>
            <p>Let's get Egged together!</p>
          </header>
          <div className="other">
            <input className="form-input" type="text" placeholder="@UserName" required onChange={(e) => {setUsername(e.target.value); console.log("update username");}} />
            <br />
            <input className="form-input" type="password" placeholder="Password" required onChange={(e) => {setPassword(e.target.value); console.log("update password∆")}} />
            <br />
            <button type="submit" className="log-in">Log In</button>
            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
          </div>
          <div className="buttons">
            <button className="btn submits frgt-pass" type="button">Forgot Password</button>
            <button className="btn submits sign-up" type="button" onClick={() => window.location.href = "/signup"}>Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  );
}
