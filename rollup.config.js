import typescript from "rollup-plugin-typescript2";
import sourceMaps from "rollup-plugin-sourcemaps";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import { string } from "rollup-plugin-string";
// 这个 rollup-plugin-commonjs 插件就是用来将 CommonJS 转换成 ES2015 模块的。
import { uglify } from 'rollup-plugin-uglify';
export default {
  plugins: [
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript")
    }),
    // sourceMaps(),
    // resolve(),
    // terser(),
    // string({
    //     // Required to be specified
    //     include: "./src/*.tmp",
    //   })
    // uglify()
  ],
  input: "./src/error/core.ts",
  sourceMap: true,
  output: {
    file: "./dist/monitor.js",
    format: "umd", //"amd", "cjs", "system", "esm", "iife" or "umd".
    name: "utils",
    env: "production"
  }
};
