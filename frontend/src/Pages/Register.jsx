import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
export default function Login() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload

        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        if (response.ok) {
            alert("Registration successful!");
            localStorage.setItem('access_token', result.session.access_token);
            localStorage.setItem('refresh_token', result.session.refresh_token);
            localStorage.setItem('user', JSON.stringify(result.user));
            navigate("/home");
        } else {
            const result = await response.json();
            alert("Registration failed: " + result.error); // ✅ WORKS
        }
    };

    return (
        <div className="overlay">
            <form onSubmit={handleSubmit}>
                <div className="auth-form">
                    <div className="con">
                        <header className="head-form">
                            <h2>Register</h2>
                            <p>Start your Egg-roll journey today!</p>
                        </header>
                        <div className="other">
                            <input className="form-input" type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
                            <br />
                            <input className="form-input" type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                            <br />
                            <input className="form-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                            <br />
                            <button className="log-in btn"> Sign Up </button>
                        </div>
                        <div className="login">
                            <p>&gt; Return to <Link to="/" className="login-link">Login Page</Link></p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}