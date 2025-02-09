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
        relative w-16 h-8 rounded-full p-1 border border-slate-500 shadow
        transition-colors duration-300
        ${colorMode === "dark" ? "" : ""}
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
          <Moon className="w-6 h-6 text-slate-300" />
        ) : (
          <Sun className="w-6 h-6 text-slate-700" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
