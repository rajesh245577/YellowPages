import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import LoginWorker from "../LoginWorker/LoginWorker";
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:5000/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.text();
        alert(data);

        console.log(data);

        setEmail('');
        setPassword('');

        if (data === "Login success") {
            navigate(`/UserHome/${email}`);
        }

    };

    return (
        <>
        <div className="login-container">
            <h2>Login Uers</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Email</label>
                    <input
                        type="email"
                        id="username"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-btn">Login</button>
            </form>
            <br />
            <h5>Create a <Link to="/Create">New Account</Link></h5>
        </div>
        <LoginWorker />
        </>
    );
}
