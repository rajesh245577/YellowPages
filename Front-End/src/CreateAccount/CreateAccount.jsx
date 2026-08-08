import { useState } from 'react';
import './CreateAccount.css';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

export default function CreateAccount() {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        pincode: "",
        district: "",
        mobileno: "",
        telephoneno: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/register', form);
            alert(response.data); // shows backend message
            navigate("/");
        } catch (error) {
            console.error("Error:", error);
            alert("Registration failed");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={form.password} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" value={form.address} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="pincode">Pincode</label>
                        <input type="text" name="pincode" value={form.pincode} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="district">District</label>
                        <input type="text" name="district" value={form.district} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="mobileno">Mobile No</label>
                        <input type="text" name="mobileno" value={form.mobileno} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="telephoneno">Telephone No</label>
                        <input type="text" name="telephoneno" value={form.telephoneno} onChange={handleChange} />
                    </div>

                    <button type="submit" className="btn">Create Account</button>
                </form>
            </div>
        </div>
    );
}
