module.exports = {
  // Ts 要转换成js？

  //   moduleFileExtensions: ["ts", "js"],
  //   transform: {
  //     ".*\\.(ts)$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
  //   },
  //   testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?)$",
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
    },
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "./node_modules/ts-jest/preprocessor.js",
  },
  testRegex: ["(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?)$"],
  testEnvironment: "node",
};
