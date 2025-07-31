import React from "react";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router";

function Home() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-4 ml-4">
      <h1>Hola</h1>
      <Link
        to="/login"
        className=" bg-blue-300 text-white p-2 rounded-lg flex w-[120px]"
      >
        Iniciar sesion
      </Link>
      {user && (
        <div>
          <h1>Hola, bienvenido {user.name}</h1>
          <p>
            Tu rol es {user.role} y tu token es {user.token}
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
