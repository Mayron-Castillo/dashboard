import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Users from "./pages/Users";
import { useTheme } from "./auth/ThemeContext";

function App() {
  const { theme } = useTheme();
  return (
    <>
      <Navbar></Navbar>
      <div
        className={
          theme === "light"
            ? "bg-gray-100 w-full h-full"
            : "bg-gray-800 w-full h-full"
        }
      >
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
