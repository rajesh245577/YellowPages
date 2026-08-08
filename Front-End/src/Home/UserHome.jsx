
import WorkerCard from './WorkerCard';
import { useParams } from 'react-router-dom';

const workerTypes = [
  { title: 'Electrician', image: '/images/electrician.jpg' },
  { title: 'Plumber', image: '/images/plumber.jpeg' },
  { title: 'Carpenter', image: '/images/carpenter.jpeg' },
  { title: 'Painter', image: '/images/painter.jpeg' },
  { title: 'AC Technician', image: '/images/acTechnician.png' },
  { title: 'Frontend Developer', image: '/images/frontend.jpeg' },
  { title: 'Full StackDeveloper', image: '/images/fullstack.jpeg' },
  { title: 'Mobile App Developer', image: '/images/mobileapp.jpeg' },
  { title: 'Graphic Designer', image: '/images/graphicdesign.jpeg' },
  { title: 'House Cleaner', image: '/images/housecleaner.jpg' },
];

export default function UserHome() {
  const { email } = useParams()

  return (
    <div className="p-6">
      <br></br>
      <br></br>
      <h1 className="text-3xl font-bold mb-6 text-center">Select a Worker Type</h1>
      <br></br>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
        {workerTypes.map(worker => (
          <WorkerCard key={worker.title} title={worker.title} image={worker.image} email={email}/>
        ))}
      </div>
    </div>
  );
}
