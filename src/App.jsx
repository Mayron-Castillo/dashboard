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
      <div className="bg-gray-100 w-full h-full">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/login" element={<Login></Login>} />
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
