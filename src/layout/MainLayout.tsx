import ReposList from "../components/ReposList.js";
import Profile from "../components/Profile.js";
import { useTheme } from "../auth/ThemeContext.js";
import Weather from "../components/Weather.js";
import RecentCommits from "../components/RecentCommits.js";

function MainLayout() {
  const { theme } = useTheme();
  // Este componente muestra todo lo que se ve en la parte del inicio
  return (
    <div
      className={`${
        theme === "light" ? "bg-gray-300 text-black" : " bg-gray-900 text-white"
      } w-11/12 mx-auto flex flex-col rounded-lg h-auto p-4`}
    >
      <div className="flex flex-col lg:flex-row gap-4 mt-2">
        <div className="flex flex-col flex-1 gap-4 w-full lg:w-auto">
          <div
            className={`${
              theme === "light" ? "bg-gray-200" : "bg-gray-700"
            } rounded p-2 sm:p-4`}
          >
            <div
              className={`${
                theme === "light" ? "bg-gray-200" : "bg-gray-700"
              } rounded grid grid-cols-1 md:grid-cols-2 gap-4`}
            >
              {/* Aqui se muestra la parte del Clima, se trae el componente weather */}
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold mb-2">
                  Clima de Costa Rica
                </h3>
                <Weather></Weather>
              </div>
              {/* Aqui se muestran los últimos commits, se llama al componente de commits recientes */}
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold mb-2">Últimos Commits</h3>
                <RecentCommits></RecentCommits>
              </div>
            </div>
          </div>
          {/* Aqui se muestra el componente de Repositorios */}
          <div
            className={`${
              theme === "light" ? "bg-gray-200" : "bg-gray-700"
            } rounded p-2 sm:p-4`}
          >
            <h2 className="text-xl sm:text-2xl pb-2 font-bold pt-2 sm:pt-4">
              Proyectos
            </h2>
            <ReposList></ReposList>
          </div>
        </div>

        {/* En este aside es para mostrar el perfil, llamando al componete profile */}
        <aside
          className={`${
            theme === "light" ? "bg-gray-200" : "bg-gray-700"
          } w-full lg:w-1/4 rounded p-4 flex flex-col items-center h-auto`}
        >
          <p
            className={`${
              theme === "light" ? "text-black" : "text-white"
            } text-2xl font-bold pb-2`}
          >
            Frontend Developer
          </p>
          <Profile></Profile>
        </aside>
      </div>
    </div>
  );
}

export default MainLayout;
