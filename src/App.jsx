import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Protected from "./pages/Protected";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/protected" element={<Protected />} />
      </Routes>
    </>
  );
}

export default App;
