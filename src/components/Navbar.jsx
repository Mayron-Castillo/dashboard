import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Navbar() {
  const { user } = useAuth();
  if (!user) return <p>Cargando...</p>;
  return (
    <div className="flex bg-blue-300 p-4 justify-center gap-4 text-white font-bold text-xl">
      <Link to="/login">Iniciar Sesion</Link>
      {user.role === "admin" && <Link to="/users">Gestion de usuarios</Link>}
    </div>
  );
}

export default Navbar;
