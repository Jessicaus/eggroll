// Inside Login.jsx
import { Link } from 'react-router-dom';
import { useState } from "react";
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      setErrorMsg(result.error);
    } else {
      alert("Login successful!");
      // Save token/user info or redirect
      localStorage.setItem('access_token', result.session.access_token);
      localStorage.setItem('user', JSON.stringify(result.user));
    }
  };
  


  
  
  return (
    /*<div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-6">Login</h1>
        <form className="bg-[#FD9F02] shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Login
                </button>
            </div>
        </form>
    </div>*/

    <div className="overlay">
        <form onSubmit={handleLogin}>
            <div className="con">
                <header className="head-form">
                    <h2>Login</h2>
                    <p>Let's get Egged together!</p>
                </header>
                <div className="other">
                    <input className="form-input" id="txt-input" type="text" placeholder="Email" required onChange={(e) => {setEmail(e.target.value); console.log("update email");}} />
                    <br />
                    <input className="form-input" type="password" placeholder="Password" id="pwd" required onChange={(e) => {setPassword(e.target.value); console.log("update password")}} />
                    <br />
                    <button type="submit" className="log-in"> Log In </button>
                    
                </div>
            {/*<div class="buttons">
                    <button class="btn submits frgt-pass">Forgot Password</button>
                    <Link to="/signup" className="btn submits sign-up">Sign Up</Link>
                </div>*/}
                <div className="signup">
                    <p>Don’t have an account? <Link to="/signup" className="signup-link">Sign up here</Link></p>
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
        </form>
        </div>);






// return (
    /*<div className="overlay">
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
*/
}
