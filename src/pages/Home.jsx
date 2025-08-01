import React from "react";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col justify-center items-center h-full">
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
