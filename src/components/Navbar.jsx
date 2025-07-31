import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  if (!user) return null;
  return (
    <div className="flex bg-blue-300 p-4 justify-center gap-4 text-white font-bold text-xl">
      {user ? (
        <>
          <p>{user.name}</p>
          <Link to="/">Home</Link>
          <Link to="/login" onClick={logout}>
            Cerrar Sesion
          </Link>
        </>
      ) : (
        <Link to="/login">Iniciar Sesion</Link>
      )}
      {user.role === "admin" && <Link to="/users">Gestion de usuarios</Link>}
    </div>
  );
}

export default Navbar;
