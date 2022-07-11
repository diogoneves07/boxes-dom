import path from "path";
import { defineConfig } from "vite";

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "BoxesDOM",
      fileName: (format) => `boxes-dom.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["BoxesDOM"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          Html: "BoxesDOM",
        },
      },
    },
  },
});
