import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import path from "path";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/smartHome",
  // build: {
  //   outDir: "dist/smartHome",
  // },
  plugins: [vue(), legacy(), UnoCSS()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@images": path.resolve(__dirname, "./src/assets/images"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.3.254:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
