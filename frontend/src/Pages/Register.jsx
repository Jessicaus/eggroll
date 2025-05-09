
import { Link } from 'react-router-dom';
import './Login.css';
export default function Login() {
    return (
        <div className="overlay">
            <form>
                <div className="con">
                    <header className="head-form">
                        <h2>Register</h2>
                        <p>Start your Egg-roll journey today!</p>
                    </header>
                    <div className="other">
                        <input className="form-input" id="name-input" type="text" placeholder="Name" required />
                        <br />
                        <input className="form-input" id="txt-input" type="text" placeholder="Email" required />
                        <br />
                        <input className="form-input" type="password" placeholder="Password" id="pwd"  name="password" required />
                        <br />
                        <button className="log-in"> Sign Up </button>
                    </div>
                    <div className="login">
                        <p>&gt; Return to <Link to="/" className="login-link">Login Page</Link></p>
                    </div>
                </div>
            </form>
        </div>
    )
}