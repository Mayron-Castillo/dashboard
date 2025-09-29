import React, { useState } from "react";

function UserForm({ onSave, onCancel, theme = "light" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [formError, setFormError] = useState("");

  // Actualiza el estado de formData copiando lo que se pasa en los inputs
  // y modifica solo el campo que coincide con el name que tiene el input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //Valida que todos los campos estén completos, si hay un error muestra el mensaje y si todo está bien ejecuta el onSvae con los datos
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setFormError("Por favor complete todos los campos requeridos");
      return;
    }
    onSave(formData);
  };

  //clase para los inputs, para no tener que repetir en cada input
  const inputClasses = `w-full p-2 border-2 ${
    theme === "light"
      ? "border-gray-600 bg-white"
      : "border-gray-600 bg-gray-700"
  } rounded`;

  return (
    <div
      className={`${
        theme === "light"
          ? "bg-white text-gray-600"
          : "bg-gray-800 text-gray-300"
      } rounded-lg p-6 border-2 border-gray-600`}
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Nuevo Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Nombre"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Tu correo"
          />
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Teléfono"
          />
        </div>

        {/* Error para cuando no se llenan todos los campos */}
        {formError && (
          <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-center">
            {formError}
          </div>
        )}

        {/* Botones crear usuario y cancelar */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-medium cursor-pointer transition-colors"
          >
            Crear Usuario
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-medium cursor-pointer transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
