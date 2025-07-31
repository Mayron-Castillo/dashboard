import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <div>
        <Navbar></Navbar>

        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/unauthorized" element={<h1>unauthorized</h1>} />
          {/* <Route
            path="/"
            element={
              <PrivateRoute>
                <Home></Home>
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/users"
            element={<PrivateRoute role="admin">componente users</PrivateRoute>}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
