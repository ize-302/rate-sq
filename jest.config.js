module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "^@/utils(.*)$": "<rootDir>/utils/$1",
    "^@/pages(.*)$": "<rootDir>/pages/$1",
    "^@/components(.*)$": "<rootDir>/components/$1",
    "^@/neondb": "<rootDir>/neondb.js",
    "^@/helpers(.*)$": "<rootDir>/helpers/$1",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  // Other configs
  "collectCoverage": true,
  "testMatch": ['**/__tests__/**/*.js'],
  "globalSetup": "<rootDir>/jest.setup.js",
}