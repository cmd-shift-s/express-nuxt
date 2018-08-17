module.exports = {
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "setupFiles": [
    "<rootDir>/node_modules/reflect-metadata"
  ],
  "testRegex": "(test|spec)\\.(jsx?|tsx?)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json"
  ],
  "moduleNameMapper": {
    "~/(.*)$": "<rootDir>/server/$1"
  }
}
