import { useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '../lib/axios';

export default function SignUp() {
    const [form, setForm] = useState({ username: '', password: '' });
    const router = useRouter();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await API.post('/register', form);
            alert("Registered successfully");
            router.push('/login');
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md w-full max-w-md shadow-md space-y-4">
                <h2 className="text-xl font-bold text-center">Register</h2>
                <input name="username" placeholder="Username" required value={form.username} onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="password" type="password" placeholder="Password" required value={form.password} onChange={handleChange} className="w-full p-2 border rounded" />
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded cursor-pointer">Register</button>
            </form>
        </div>
    );
}
