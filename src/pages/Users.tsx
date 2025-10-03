import React, { useState, useEffect } from "react";
import { useTheme } from "../auth/ThemeContext.js";
import UserForm from "../components/users/UserForm.js";
import UserCard from "../components/users/UserCard.js";

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
}

function Users() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [addForm, setAddForm] = useState<boolean>(false);
  const { theme } = useTheme();

  // Llamada a la API de jsonplaceholder
  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Hubo un error al cargar los usuarios");
        }
        const data: UserData[] = await response.json();
        setUsers(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Hubo un error";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Validaciones por si se tarda en cargar y por si hay un error
  if (loading)
    return (
      <p
        className={`${
          theme === "light" ? "bg-white" : "bg-gray-800"
        } min-h-screen`}
      >
        Cargando...
      </p>
    );
  if (error)
    return (
      <p
        className={`${
          theme === "light" ? "bg-white" : "bg-gray-800"
        } min-h-screen`}
      >
        {error}
      </p>
    );

  // Filtro para buscar a los usuarios en el input
  const filterUsers = users.filter((user: UserData) => {
    return user.name.toLowerCase().includes(filter.toLowerCase());
  });

  // Crear nuevo usuario, Omit, omite el id porque ya genera uno nuevo
  const handleAddUser = (userData: Omit<UserData, "id">): void => {
    setUsers([...users, { ...userData, id: Date.now() }]);
    setAddForm(false);
  };

  // Actualizar usuario existente, Partial, es opcional las propiedades
  const handleUpdateUser = (
    userId: number,
    updatedUser: Partial<UserData>
  ): void => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...updatedUser } : u))
    );
    setEditId(null);
  };

  // Eliminar usuario
  const handleDeleteUser = (userId: string | number): void => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  //Editar usuario, recibe ID, si es string lo convierte a numero
  const handleEditUser = (userId: string | number | null): void => {
    setEditId(typeof userId === "string" ? parseInt(userId) : userId);
  };

  return (
    <div
      className={`${
        theme === "light" ? "bg-gray-100" : "bg-gray-800"
      } min-h-screen p-6`}
    >
      <h1
        className={`${
          theme === "light" ? "text-gray-700" : "text-gray-300"
        } text-3xl font-bold text-center mb-8`}
      >
        Usuarios
      </h1>

      {/* Botón para mostrar formulario de nuevo usuario */}
      {!addForm && (
        <div className="w-full flex justify-center mb-8">
          <button
            onClick={() => setAddForm(true)}
            className="px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer bg-green-500 hover:bg-green-600 text-white"
          >
            Agregar nuevo usuario
          </button>
        </div>
      )}

      {/* Formulario para crear nuevo usuario */}
      {addForm && (
        <div className="w-full max-w-2xl mx-auto mb-8">
          <UserForm
            onSave={handleAddUser}
            onCancel={() => setAddForm(false)}
            theme={theme}
          />
        </div>
      )}

      <div className="w-full flex justify-center">
        {/* Input para buscar a los usuarios */}
        <input
          type="text"
          placeholder="Buscar usuario"
          className={`${
            theme === "light"
              ? "text-gray-700 placeholder:text-gray-700"
              : "text-gray-300 placeholder:text-gray-300"
          } border-2 border-gray-600 w-4/12 p-2 mb-5 flex justify-center items-center`}
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </div>

      <div className="min-h-screen">
        {filterUsers.length === 0 ? (
          <p
            className={`${
              theme === "light" ? "text-black" : "text-gray-400"
            } text-center text-2xl mt-4`}
          >
            No se encontraron usuarios
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filterUsers.map((user: UserData) => (
              <UserCard
                key={user.id}
                user={user}
                editing={editId === user.id}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                onSave={(updatedUser) => handleUpdateUser(user.id, updatedUser)}
                theme={theme}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
