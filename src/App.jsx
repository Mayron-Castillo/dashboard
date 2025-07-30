import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/login" element={<Login></Login>} />
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/users" element={<h1>Users</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
