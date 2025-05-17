'use client';
import { useEffect, useState } from 'react';
import API from '@/lib/axios';
import { getToken } from '@/utils/auth';
import { useRouter } from 'next/navigation';

export default function ProtectedPage() {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      if (!token) return router.push('/login');

      try {
        const res = await API.get('/protected', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data.message);
      } catch (err) {
        alert("Access denied. Please login again.");
        localStorage.removeItem("token");
        router.push('/login');
      }
    };

    fetchData();
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md text-center">
        <h1 className="text-xl font-bold">Protected Page</h1>
        <p className="mt-4">{data || "Loading..."}</p>
      </div>
    </div>
  );
}
