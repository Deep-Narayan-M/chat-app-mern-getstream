import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("xeno-theme") || "night",
  setTheme: (theme) => {
    localStorage.setItem("xeno-theme", theme);
    set({ theme });
  },
}));
