import './Addworkers.css';
import { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

export default function Addworkers() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        district: '',
        pincode: '',
        categoryOfWork: '',
        yearOfExperience: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/addworker', form);
            alert(response.data);

            setForm({
                name: '',
                email: '',
                password: '',
                address: '',
                district: '',
                pincode: '',
                categoryOfWork: '',
                yearOfExperience: ''
            });
            navigate("/");

        } catch (error) {
            console.error("Error:", error);
            alert("Failed to add worker");
        }
    };


    return (
        <div className="addworker-container">
            <h2 className="addworker-title">Add Worker</h2>
            <form onSubmit={handleSubmit} className="addworker-form">
                <input className="addworker-input" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                <input className="addworker-input" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input className="addworker-input" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                <input className="addworker-input" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
                <input className="addworker-input" name="district" placeholder="District" value={form.district} onChange={handleChange} required />
                <input className="addworker-input" name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required />
                <select className="addworker-input" name="categoryOfWork" value={form.categoryOfWork} onChange={handleChange} required>
                    <option value="">Select Category of Work</option>
                    <option value="electrician">Electrician</option>
                    <option value="plumber">Plumber</option>
                    <option value="carpenter">Carpenter</option>
                    <option value="painter">Painter</option>
                    <option value="fullstackdeveloper">Full Stack Developer</option>
                    <option value="mobileappdeveloper">Mobile App Developer</option>
                    <option value="housecleaner">House Cleaner</option>
                    <option value="actechnician">AC Technician</option>
                    <option value="graphicdesigner">Graphic Designer</option>
                    <option value="frontenddeveloper">Frontend Developer</option>
                </select>
                <input className="addworker-input" name="yearOfExperience" placeholder="Years of Experience" value={form.yearOfExperience} onChange={handleChange} required />
                <button type="submit" className="addworker-button">Add Worker</button>
            </form>
        </div>
    );
}
