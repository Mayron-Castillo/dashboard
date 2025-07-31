import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Users from "./pages/Users";
function App() {
  return (
    <>
      <div>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/unauthorized" element={<h1>unauthorized</h1>} />
          <Route
            path="/users"
            element={
              <PrivateRoute role="admin">
                <Users></Users>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
