import { Link } from 'react-router-dom';
import './Login.css';
export default function Login() {
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
            <form>
                <div className="con">
                    <header className="head-form">
                        <h2>Login</h2>
                        <p>Let's get Egged together!</p>
                    </header>
                    <div className="other">
                        <input className="form-input" id="txt-input" type="text" placeholder="Email" required />
                        <br />
                        <input className="form-input" type="password" placeholder="Password" id="pwd"  name="password" required />
                        <br />
                        <button className="log-in"> Log In </button>
                    </div>
                {/*<div class="buttons">
                    <button class="btn submits frgt-pass">Forgot Password</button>
                    <Link to="/signup" className="btn submits sign-up">Sign Up</Link>
                </div>*/}
                <div className="signup">
                    <p>Don’t have an account? <Link to="/signup" className="signup-link">Sign up here</Link></p>
                </div>
                </div>
            </form>
        </div>
    )
}