import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { data, useParams } from 'react-router-dom';
import './WorkersProfile.css';

const WorkerProfile = () => {
    const { id } = useParams(); // email passed as :id
    const [worker, setWorker] = useState(null);
    const [editable, setEditable] = useState(false);
    const [booking,setBooking]=useState([]);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        district: '',
        pincode: '',
        categoryOfWork: '',
        yearOfExperience: '',
        bookedDetails: '',  // New field for booked details
        workType: ''        // New field for work type
    });

    useEffect(() => {
        if (!id) return;

        const fetchWorker = async () => {
            try {
                const response = await axios.get(`https://yellowpages-backend-ixbs.onrender.com/worker/${id}`);
                const workerData = response.data;
                setWorker(workerData);
                setForm({
                    name: workerData.name || '',
                    email: workerData.email || '',
                    password: workerData.password || '',
                    address: workerData.address || '',
                    district: workerData.district || '',
                    pincode: workerData.pincode || '',
                    categoryOfWork: workerData.categoryOfWork || '',
                    yearOfExperience: workerData.yearOfExperience || '',
                    bookedDetails: workerData.bookedDetails || '',   // Assuming it's in the worker data
                    workType: workerData.workType || ''               // Assuming it's in the worker data
                });
            } catch (error) {
                console.error("Error fetching worker details:", error);
                alert("Failed to load worker profile.");
            }
            
        };

        fetchWorker();
          
        

    }, [id]);

    const getdata = async () => {
        try {
          const res = await fetch(`https://yellowpages-backend-ixbs.onrender.com/bookingdata/${id}`);
          const data = await res.json();
          setBooking(data); // Assuming data is an array
        } catch (err) {
          console.log("Error getting user data..", err);
        }
      };
      

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`https://yellowpages-backend-ixbs.onrender.com/updateworker/${id}`, form);
            alert("Profile updated successfully!");
            setWorker(response.data);
            setEditable(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

    if (!worker) return <div>Loading profile...</div>;

    return (
        <div className="worker-profile-container1">
            <h2>Worker Profile</h2>
            <form onSubmit={handleSubmit} className="worker-profile-form">
                {Object.entries(form).map(([key, value]) => (
                    (key !== 'bookedDetails' && key !== 'workType') && ( // Exclude bookedDetails and workType from the loop
                        <input
                            key={key}
                            name={key}
                            value={value}
                            onChange={handleChange}
                            disabled={!editable}
                            required
                            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                        />
                    )
                ))}

                {/* Additional fields for booked details and work type */}
                {editable && (
                    <>
                        <input
                            name="bookedDetails"
                            value={form.bookedDetails}
                            onChange={handleChange}
                            disabled={!editable}
                            placeholder="Booked Details (e.g., upcoming tasks)"
                        />
                        <input
                            name="workType"
                            value={form.workType}
                            onChange={handleChange}
                            disabled={!editable}
                            placeholder="Type of Work"
                        />
                        <br/>
                    </>
                )}

                {editable && <button type="submit" style={{
    backgroundColor: '#fdd835',
    color: '#333',
    height: '50px',
    width: '150px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.3)',
    transition: 'background-color 0.3s ease, transform 0.2s ease'
  }}>Save</button>}
            </form> 
            <br/>
            <button onClick={() => setEditable(prev => !prev)}  style={{
    backgroundColor: '#cc0000',  // darker red
    color: 'white',
    height: '60px',
    width: '120px',
    border: '2px solid white',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '2px 2px 8px rgba(40, 37, 37, 0.8)',
    transition: 'background-color 0.3s ease, transform 0.2s ease'
  }}>
                {editable ? 'Cancel' : 'Edit Profile'}
            </button><br/>
            <br/>
            <br/>
            <div className='container-booking'>
<br/>
            <button
  onClick={getdata}
  style={{
    backgroundColor: '#60df66',
    height: '50px',
    width: '200px',
    bordercolor:'white',
    fontSize:'17px',
    boxShadow: '2px 2px 2px 2px rgb(40, 37, 37)'
  }}
>
  See Booked Persons
</button><br/>

                {
                  booking.map((data, index) => {
                    return (
                    <div key={index} className="booking-card">
                        <h3>Name: {data.name}</h3>
                        <h3>Email: {data.email}</h3>
                        <h3>Phone No: {data.phone}</h3>
                        <h3>District: {data.district}</h3>
                        <h3>Address: {data.address}</h3>
                        <h3>Pincode: {data.pincode}</h3>
                    </div>
                    );
                })
                }
                
            </div>
        </div>
    );
};

export default WorkerProfile;
