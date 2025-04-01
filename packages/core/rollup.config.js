// @ts-check
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import { getFullySpecifiedEnvs } from "@redsun-vn/easyblocks-build-tools";
import path from "node:path";
import visualizer from "rollup-plugin-visualizer";
import preserveDirectives from "rollup-plugin-preserve-directives";
import packageJson from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const getPlugins = (stat, isFullBundle = false) => {
  const preserveDirectivesPlugin = preserveDirectives();

  /**
   * @type {Array<import('rollup').Plugin>}
   */

  const plugins = [
    replace({
      values: getFullySpecifiedEnvs(),
      preventAssignment: true,
    }),

    {
      name: "handle-parser",
      resolveId(source, importer) {
        if (source === "./parser" && importer?.includes("reduce-css-calc")) {
          return path.resolve(path.dirname(importer), "parser.js");
        }
        return null;
      },
    },

    babel({
      configFile: "./.babelrc.json",
      extensions,
      exclude: [/(node_modules|(editor|compiler)\/dist)/],
      babelHelpers: "runtime",
      presets: [
        "@babel/preset-env",
        "@babel/preset-typescript",
        "@babel/preset-react",
      ],
    }),
    nodeResolve({
      extensions,
      browser: isFullBundle,
      resolveOnly: [/^(?!@redsun-vn\/easyblocks-utils)/],
    }),

    commonjs(),
    json(),

    visualizer({
      filename: stat,
      gzipSize: true,
    }),

    {
      ...preserveDirectivesPlugin,
      renderChunk: preserveDirectivesPlugin.renderChunk.handler,
    },
  ];

  return plugins;
};

const dependencyKeys = Object.keys(packageJson.dependencies || {});
const peerDependencyKeys = Object.keys(packageJson.peerDependencies || {});

const allDependenciesKeys = [
  ...dependencyKeys,
  ...peerDependencyKeys.map((key) => new RegExp(`^${key}`)),
  /@babel\/runtime/,
  /^lodash\//,
  /@redsun-vn\/easyblocks-utils/,
];

function createRollupConfigs({
  inputFile,
  baseOutputDir,
  baseStatOutputDir,
  isFullBundle = false,
}) {
  const banner = "/* with love from shopstory */";
  const external = isFullBundle ? [] : allDependenciesKeys;

  const onwarn = (warning, warn) => {
    if (
      warning.message.includes(
        "Module level directives cause errors when bundled, 'use client' was ignored."
      )
    ) {
      return;
    }

    // parser file is automatically generated and we don't have control over it
    if (
      warning.message.includes(
        `Entry module "../reduce-css-calc/src/parser.js" is implicitly using "default" export mode`
      )
    ) {
      return;
    }

    warn(warning);
  };

  /** @type import('rollup').RollupOptions */
  const esBundleConfig = {
    input: inputFile,
    output: {
      format: "es",
      dir: `${baseOutputDir}/es`,
      banner,
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    plugins: getPlugins(
      path.join(baseStatOutputDir, "es/index.html"),
      isFullBundle
    ),
    external,
    onwarn,
  };

  /** @type import('rollup').RollupOptions */
  const cjsBundleConfig = {
    input: inputFile,
    output: {
      format: "cjs",
      dir: `${baseOutputDir}/cjs`,
      banner,
      preserveModules: true,
      preserveModulesRoot: "src",
      entryFileNames: "[name].cjs",
    },
    plugins: getPlugins(
      path.join(baseStatOutputDir, "cjs/index.html"),
      isFullBundle
    ),
    external,
    onwarn,
  };

  return [esBundleConfig, cjsBundleConfig];
}

export default createRollupConfigs({
  inputFile: ["src/index.ts", "src/_internals.ts"],
  baseOutputDir: "dist",
  baseStatOutputDir: "stats",
});
