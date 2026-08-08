import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios'; // Import axios

export default function LoginWorker() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make POST request using axios
            const res = await axios.post('http://localhost:5000/loginWorker', {
                email,
                password
            });

            const data = res.data; // Getting the response from axios
            console.log(data);

            if (data.message === "Login successful") {
                const workerId = data.data.email; 
                console.log(workerId);
                alert("Login Success !")
                navigate(`/worker/${workerId}`); // Navigate to worker profile page
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Invalid credentials. Please try again");
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div className="login-container">
            <h2>Login For Workers</h2>
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
        </div>
    );
}
