import { useEffect, useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const generate10DigitToken = () => {
  let token = '';
  for (let i = 0; i < 10; i++) {
    token += Math.floor(Math.random() * 10);
  }
  return token;
};

const Protected = () => {
  const [data, setData] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      const newToken = generate10DigitToken();
      localStorage.setItem("token", newToken);
      setToken(newToken);
      return; 
    }

    API.get("/protected", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setData(res.data.message))
      .catch(() => setData("Access denied or token expired."));
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setData("");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Protected Route</h2>
        <p className="text-gray-700 mb-6 break-words">Token (10-digit number): {token || "No token found"}</p>
        <p className="text-gray-700 mb-6">{data}</p>

        {token && (
          <button
            onClick={handleLogout}
            className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Protected;
