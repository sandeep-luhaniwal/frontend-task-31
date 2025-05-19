import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import API from '../lib/axios';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/login', form); // ✅ using API.post
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
      navigate('/protected');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md w-full max-w-md shadow-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>
        <input
          name="username"
          placeholder="Username"
          required
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
}
