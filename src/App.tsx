import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login.js";
import PrivateRoute from "./routes/PrivateRoute.js";
import Home from "./pages/Home.js";
import Navbar from "./layout/Navbar.js";
import Users from "./pages/Users.js";
import { useTheme } from "./auth/ThemeContext.js";

function App() {
  const { theme } = useTheme();
  return (
    <>
      <Navbar></Navbar>
      <div
        className={`${
          theme === "light" ? "bg-gray-100" : "bg-gray-800"
        } w-full h-full`}
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
