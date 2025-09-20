import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(), // React + Fast Refresh
    tailwindcss(), // Tailwind CSS
    visualizer({ open: true }), // Optional: bundle visualizer
  ],

  // Prevent multiple React instances
  resolve: {
    dedupe: ["react", "react-dom"],
  },

  build: {
    rollupOptions: {
      output: {
        // Custom chunk splitting
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("mapbox-gl")) return "mapbox"; // Mapbox separate chunk
            return "vendor"; // all other node_modules
          }
        },
      },
    },
  },

  optimizeDeps: {
    include: ["react", "react-dom"], // Ensure single React instance at dev time
  },
});
