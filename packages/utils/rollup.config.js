import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

/** @type import('rollup').RollupOptions */
const config = {
  input: "src/index.ts",
  output: [
    {
      format: "es",
      dir: "dist/es",
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    {
      format: "cjs",
      dir: "dist/cjs",
      preserveModules: true,
      preserveModulesRoot: "src",
      entryFileNames: "[name].cjs",
    },
  ],
  plugins: [
    babel({
      extensions,
      babelHelpers: "bundled",
      presets: [
        "@babel/preset-env",
        "@babel/preset-typescript",
        "@babel/preset-react",
      ],
    }),
    nodeResolve({
      extensions,
    }),
    commonjs(),
  ],
  external: ["react"],
};

export default config;
