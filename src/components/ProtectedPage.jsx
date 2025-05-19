import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utlis/auth';
import API from '../lib/axios';


export default function ProtectedPage() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      if (!token) {
        return navigate('/login');
      }

      try {
        const res = await API.get('/protected', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data.message);
      } catch (err) {
        alert('Access denied. Please login again.');
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md text-center">
        <h1 className="text-xl font-bold">Protected Page</h1>
        <p className="mt-4">{data || 'Loading...'}</p>
      </div>
    </div>
  );
}
