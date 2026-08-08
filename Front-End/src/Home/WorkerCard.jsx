import { useNavigate } from 'react-router-dom';
import "./WorkerCard.css";

export default function WorkerCard({ title, image ,email}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/userHome/${email}/workers/${title.toLowerCase().replace(/\s/g, '')}`);
  };

  return (
    <div className="worker-card">
      <img src={image} alt={title} className="worker-image" />
      <h2 className="worker-title">{title}</h2>
      <button onClick={handleClick} className="view-button">View Workers</button>
    </div>
  );
}
