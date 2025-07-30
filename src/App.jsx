import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/users" element={<h1>Users</h1>} />
      </Routes>
    </>
  );
}

export default App;
