import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './WorkerListPage.css';

export default function WorkerListPage() {
  const { type, email } = useParams();
  const [workers, setWorkers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch(`http://localhost:5000/workers/${type}`)
      .then(res => res.json())
      .then(data => {
        setWorkers(data);
        setLoading(false); // Finished loading
      })
      .catch(err => {
        console.error(err);
        setLoading(false); // Even if error, stop loading
      });
  }, [type]);

  const handleData = async (emailW) => {
    try {
      const response = await fetch(`http://localhost:5000/workerbook/${email}/${emailW}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Booking failed');
      }
      const data = await response.json();
      if (data.message === 'Booking successful') {
        console.log('Booking successful:', data);
        alert("Booking Successful");
      }
    } catch (error) {
      console.error('Error during booking:', error);
    }
  };

  const filteredWorkers = workers.filter((worker) =>
    (worker.address && worker.address.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page-container">
      <h1 className="page-title">Available {type}</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Address "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <ul className="worker-list">
        {loading ? (
          <p>Loading workers...</p>
        ) : filteredWorkers.length > 0 ? (
          filteredWorkers.map((w) => (
            <li key={w._id} className="worker-item">
              <p><strong>Name:</strong> {w.name}</p>
              <p><strong>Email:</strong> {w.email}</p>
              <p><strong>Address:</strong> {w.address}</p>
              <p><strong>District:</strong> {w.district}</p>
              <p><strong>Pincode:</strong> {w.pincode}</p>
              <p><strong>Year of Experience:</strong> {w.yearOfExperience}</p>
              <button className="btn-book" onClick={() => handleData(w.email)}>Book</button>
            </li>
          ))
        ) : (
          <p>No workers found.</p>
        )}
      </ul>
    </div>
  );
}
