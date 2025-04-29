import {defineConfig} from "vite";

export default defineConfig({
    base: "https://synidle.github.io/sprite-shop/",
    build: {
        outDir: "../docs",
        emptyOutDir: true,
    }
});