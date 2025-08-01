import React, { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Hubo un error al cargar los usuarios");
        }
        const data = await response.json();
        setUsers(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Usuarios
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-6">
            {editId === user.id ? (
              <input
                type="text"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="text-xl font-semibold text-gray-800 mb-3"
              />
            ) : (
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {user.name}
              </h2>
            )}
            <hr className="p-2" />
            <div className="flex flex-col gap-2">
              <p className="text-gray-600">
                <span className="font-medium pr-2">Email:</span>
                {editId === user.id ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                  />
                ) : (
                  user.email
                )}
              </p>

              <p className="text-gray-600">
                <span className="font-medium pr-2">Teléfono:</span>
                {editId === user.id ? (
                  <input
                    type="phone"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                  />
                ) : (
                  user.phone
                )}
              </p>

              {editId === user.id ? (
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => {
                      setUsers((prev) =>
                        prev.map((u) =>
                          u.id === user.id ? { ...u, ...editData } : u
                        )
                      );
                      setEditId(null);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded cursor-pointer"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1 rounded cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => {
                      setEditId(user.id);
                      setEditData({
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                      });
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      setUsers((prev) => prev.filter((u) => u.id !== user.id));
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded cursor-pointer"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
