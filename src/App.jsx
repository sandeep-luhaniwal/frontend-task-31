import { Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./components/Login";
import ProtectedPage from "./components/ProtectedPage";
import SignUp from "./components/SignUp";

function App() {


  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/protected" element={<ProtectedPage />} />
      </Routes>
    </div>
  );
}

export default App;
