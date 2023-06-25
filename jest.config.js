module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "^@/db(.*)$": "<rootDir>/db/$1",
    "^@/utils(.*)$": "<rootDir>/utils/$1",
    "^@/pages(.*)$": "<rootDir>/pages/$1",
    "^@/components(.*)$": "<rootDir>/components/$1",
    "^@/supabase": "<rootDir>/supabase.js",
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