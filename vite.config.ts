import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "utils",
      fileName: (format) => `index.${format}.js`,
    },
  },
  plugins: [
    dts({
      noEmitOnError: true,
    }),
  ],
});
