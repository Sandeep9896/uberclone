import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from "rollup-plugin-visualizer";


export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer({ open: true })],
  build: {
    rollupOptions: {
      output: {
        // manualChunks tells Rollup how to split chunks
        manualChunks(id) {
          // 1. All node_modules → vendor
          if (id.includes("node_modules")) {
            if (id.includes("mapbox-gl")) {
              // 2. Special case: put mapbox in its own chunk
              return "mapbox";
            }
            if (id.includes("react")) {
              // Put react + react-dom together
              return "react";
            }
            return "vendor";
          }
        },
      },
    },
  },
});

