import React from "react";
import ReposList from "./ReposList";
import Profile from "./Profile";
import { useTheme } from "../auth/ThemeContext";
import Weather from "./Weather";
import RecentCommits from "./RecentCommits";

function Dash() {
  const { theme } = useTheme();
  return (
    <div
      className={`${
        theme === "light" ? "bg-gray-300 text-black" : " bg-gray-900 text-white"
      } w-11/12 mx-auto flex flex-col rounded-lg h-auto p-4`}
    >
      <div className="flex gap-4 mt-2">
        <div className="flex flex-col flex-1 gap-4">
          <div
            className={`${
              theme === "light" ? "bg-gray-200" : "bg-gray-700"
            } rounded p-4`}
          >
            <div
              className={`${
                theme === "light" ? "bg-gray-200" : "bg-gray-700"
              } rounded grid grid-cols-2 gap-4`}
            >
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold mb-2">
                  Clima de Costa Rica
                </h3>
                <Weather></Weather>
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold mb-2">Últimos Commits</h3>
                <RecentCommits></RecentCommits>
              </div>
            </div>
          </div>
          <div
            className={`${
              theme === "light" ? "bg-gray-200" : "bg-gray-700"
            } rounded p-4`}
          >
            <h2 className="text-2xl font-bold pt-4">Proyectos</h2>
            <ReposList></ReposList>
          </div>
        </div>
        <aside
          className={`${
            theme === "light" ? "w-1/4 bg-gray-200" : "w-1/4 bg-gray-700"
          } w-1/4 rounded p-4 flex flex-col items-center h-auto`}
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

export default Dash;
