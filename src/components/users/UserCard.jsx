import React, { useState } from "react";

function UserCard({
  user,
  onEdit,
  onDelete,
  onSave,
  editing,
  theme = "light",
}) {
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  // Actualiza el estado de los campos mientras el usuario escribe
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  // Función que se ejecuta al dar clic en guardar
  const handleSave = () => {
    onSave(editData);
  };

  // Deja los valores como estaban y sale de editar el usuario
  const handleCancel = () => {
    setEditData({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    onEdit(null);
  };

  return (
    <div
      className={`${
        theme === "light"
          ? "bg-white text-gray-600"
          : "bg-gray-800 text-gray-300"
      } rounded-lg p-6 border-2 border-gray-600`}
    >
      {/* Renderizado por si está editando */}
      {editing ? (
        <>
          <input
            type="text"
            value={editData.name}
            onChange={handleChange}
            className="text-xl font-semibold mb-3 border border-gray-600"
          />
          <hr className={theme === "light" ? "p-2" : "p-2 text-gray-600"} />
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-medium pr-2">Email:</span>
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
                className="border border-gray-600"
              />
            </p>
            <p>
              <span className="font-medium pr-2">Teléfono:</span>
              <input
                type="phone"
                name="phone"
                value={editData.phone}
                onChange={handleChange}
                className="border border-gray-600"
              />
            </p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded cursor-pointer"
              >
                Guardar
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1 rounded cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </>
      ) : (
        // Renderizado que se muestra la card normal, donde no se está editando
        <>
          <h2 className="text-xl font-semibold mb-3">{user.name}</h2>
          <hr className={theme === "light" ? "p-2" : "p-2 text-gray-600"} />
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-medium pr-2">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium pr-2">Teléfono:</span> {user.phone}
            </p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => onEdit(user.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded cursor-pointer"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserCard;
