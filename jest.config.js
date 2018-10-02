module.exports = {
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.vue$": "vue-jest"
  },
  "setupFiles": [
    "<rootDir>/node_modules/reflect-metadata",
    "<rootDir>/test/unit/setup.ts"
  ],
  "testRegex": "(test|spec)\\.(jsx?|tsx?)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "vue"
  ],
  "moduleNameMapper": {
    "^~/(.*)$": "<rootDir>/$1"
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
  },
  "coveragePathIgnorePatterns": [
    "test/unit/setup.ts"
  ]
}
