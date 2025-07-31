import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Navbar() {
  const { user } = useAuth();
  if (!user) return <p>Cargando...</p>;
  console.log(user);
  return (
    <div>
      <Link to="/login">Iniciar Sesion</Link>
      {user.role === "admin" && <Link to="/users">Gestion de usuarios</Link>}
    </div>
  );
}

export default Navbar;
