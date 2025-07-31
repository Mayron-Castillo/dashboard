import React from "react";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-4 ml-4">
      {user ? (
        <div>
          <h1>Hola, bienvenido {user.name}</h1>
          <p>
            Tu rol es {user.role} y tu token es {user.token}
          </p>
        </div>
      ) : (
        <>
          <h1>Bienvenido, debes iniciar sesion</h1>
          <Link
            to="/login"
            className="bg-blue-200 w-[120px] p-2 text-center rounded"
          >
            Iniciar Sesion
          </Link>
        </>
      )}
    </div>
  );
}

export default Home;
