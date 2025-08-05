import React from "react";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import { useTheme } from "../auth/ThemeContext";

function Home() {
  const { user } = useAuth();
  const { theme } = useTheme();
  return (
    <div
      className={
        theme === "light"
          ? "flex flex-col justify-center items-center h-full"
          : "flex flex-col justify-center items-center h-full bg-gray-800 text-white"
      }
    >
      {user ? (
        <div className="text-2xl">
          <h1>Hola, bienvenido {user.name}</h1>
          <p>
            Tu rol es {user.role} y tu token es {user.token}
          </p>
        </div>
      ) : (
        <div className="text-2xl flex flex-col gap-2">
          <h1>Bienvenido, debes iniciar sesión</h1>
          <Link
            to="/login"
            className="bg-blue-600 p-2 text-center rounded text-white hover:bg-blue-700"
          >
            Iniciar Sesión
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
