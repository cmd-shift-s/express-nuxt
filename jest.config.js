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
  },
  "collectCoverage": true,
  "coverageReporters": ["lcov", "text"],
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": -10
    }
  }
}
