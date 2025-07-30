import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/login" element={<Login></Login>} />
          <Route path="/unauthorized" element={<h1>unauthorized</h1>} />
          <Route
            path="/"
            element={<PrivateRoute>componente tipo home</PrivateRoute>}
          />
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
