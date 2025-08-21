# 📊 Dashboard

Dashboard desarrollado con React que incluye autenticación, gestión de usuarios y visualización de datos.

## 🚀 Características Principales

- **Autenticación**

  - Inicio de sesión con usuario/contraseña
  - Diferentes niveles de acceso (admin/usuario)
  - Rutas protegidas

- **Interfaz de Usuario**

  - Diseño responsive con Tailwind CSS
  - Tema claro/oscuro
  - Navegación intuitiva

- **Módulos Principales**
  - Gestión de usuarios(admin)
  - Visualización de repositorios de GitHub
  - Clima actual
  - Últimos commits
  - Perfil de Github

## 🛠️ Tecnologías Utilizadas

- **Frontend**

  - React 19
  - React Router DOM
  - Tailwind CSS
  - Context API
  - React Hook Form

- **APIs Externas**

  - GitHub API (repositorios y commits)
  - Weatherapi (datos del clima de Costa Rica)

- **Herramientas de Desarrollo**
  - Vite
  - ESLint
  - Git

## 🚀 Cómo Empezar

1. **Clonar el repositorio**

   ```bash
   git clone [url-del-repositorio]
   cd my-app
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crea un archivo `.env` en la raíz con:

   ```
   VITE_GITHUB_TOKEN=tu_token_de_github
   VITE_WEATHER_API_KEY=tu_api_key_de_weatherAPI
   ```

4. **Iniciar el servidor de desarrollo**

   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 🔒Acceso

- **Admin:**

  - Usuario: `admin`
  - Contraseña: `admin`

- **Usuario Regular:**

  - Cualquier otro usuario/contraseña

## 👨‍💻 Autor

**Mayron Castillo** - Desarrollador Frontend
