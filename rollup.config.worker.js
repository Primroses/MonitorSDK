import typescript from "@rollup/plugin-typescript";
// import sourceMaps from "rollup-plugin-sourcemaps"; // 生成sourceMap
import resolve from "rollup-plugin-node-resolve"; // for using third party modules in node_modules
import { terser } from "rollup-plugin-terser"; // Rollup plugin to minify generated es bundle.
// 这个 rollup-plugin-commonjs 插件就是用来将 CommonJS 转换成 ES2015 模块的。
import { uglify } from "rollup-plugin-uglify"; // 这个东西不支持ES6的构建的时候 得target是ES5

export default {
  plugins: [
    typescript({
      exclude: "node_modules/**",
      // typescript: require("typescript"),
    }),
    // sourceMaps(),
    resolve(),
    terser(),
    uglify(),
  ],
  input: "src/client/worker/index.ts",
  // sourceMap: true,
  output: [
    // {
    //   file: "./dist/monitor.umd.js",
    //   format: "umd", //"amd", "cjs", "system", "esm", "iife" or "umd".
    //   name: "monitor",
    //   env: "production",
    // },
    // {
    //   file: "./dist/monitor.iife.js",
    //   format: "iife",
    //   name: "monitor",
    //   env: "production",
    // },
    // {
    //   file: "./playground/worker.cjs.js",
    //   format: "umd",
    //   name: "index",
    //   env: "production",
    // },
    {
      file: "./playground/worker.js",
      format: "umd",
      name: "index",
      env: "production",
    },
  ],
};
