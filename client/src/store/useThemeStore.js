import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("neurodiary-theme") || "nord",
  setTheme: (theme) => {
    localStorage.setItem("neurodiary-theme", theme);
    set({ theme });
  },
}));