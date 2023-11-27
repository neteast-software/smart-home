import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/smartHome",
    build: {
        outDir: "dist/smartHome",
    },
    plugins: [vue(), legacy()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@images": path.resolve(__dirname, "./src/assets/images"),
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
    },
});
