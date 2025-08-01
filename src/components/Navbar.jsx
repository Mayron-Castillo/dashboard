import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav className="bg-blue-600 text-white p-3 shadow-md">
      <div className="w-10/12 mx-auto flex justify-between items-center">
        <div className="flex gap-4">
          <Link
            to="/"
            className="hover:bg-blue-700 px-3 py-1 rounded font-bold"
          >
            Inicio
          </Link>
          {user.role === "admin" && (
            <Link
              to="/users"
              className="hover:bg-blue-700 px-3 py-1 rounded font-bold"
            >
              Usuarios
            </Link>
          )}
        </div>

        <div className="flex items-center">
          <span className="text-sm hidden sm:inline">{user.email}</span>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded cursor-pointer font-bold"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
