import React from "react";
import { Sparkle } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const PageLoader = () => {
  const { theme } = useThemeStore();

  return (
    <div
      className="flex items-center justify-center h-screen"
      data-theme={theme}
    >
      <Sparkle className="size-10 animate-spin text-primary" />
    </div>
  );
};

export default PageLoader;
