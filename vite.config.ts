import path from "path";
import { defineConfig } from "vite";

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "Html",
      fileName: (format) => `boxes.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["Html"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          Html: "Html",
        },
      },
    },
  },
});
