import React, { useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setColorMode } from "@/state/app";

const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const colorMode = useSelector((state: any) => state.app.colorMode);

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);
  }, [colorMode]);

  return (
    <button
      onClick={() =>
        dispatch(setColorMode(colorMode === "light" ? "dark" : "light"))
      }
      className={`
        relative w-16 h-8 rounded-full p-1
        transition-colors duration-300
        ${colorMode === "dark" ? "bg-blue-900" : "bg-blue-100"}
        focus:outline-none focus:ring-2 focus:ring-blue-500
      `}
      aria-label={`Switch to ${colorMode === "dark" ? "light" : "dark"} mode`}
    >
      <div
        className={`
          absolute top-1 left-1
          transform transition-transform duration-300
          ${colorMode === "dark" ? "translate-x-8" : "translate-x-0"}
        `}
      >
        {colorMode === "dark" ? (
          <Moon className="w-6 h-6 text-yellow-300" />
        ) : (
          <Sun className="w-6 h-6 text-yellow-500" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
