import { useState } from "react";
import API from "../utils/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", { username, password });
      localStorage.setItem("token", res.data.token);
      setMsg("Login successful!");
      window.location.href = "/protected";
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 px-4">
     <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full cursor-pointer bg-green-600 text-white p-2 rounded" type="submit">
          Login
        </button>
      </form>
      {msg && <p className="mt-4 text-center text-red-600">{msg}</p>}
    </div>
   </div>
  );
};

export default Login;
