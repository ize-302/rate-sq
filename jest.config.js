module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "^@/db(.*)$": "<rootDir>/db/$1",
    "^@/utils(.*)$": "<rootDir>/utils/$1",
    "^@/pages(.*)$": "<rootDir>/pages/$1",
    "^@/components(.*)$": "<rootDir>/components/$1",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  // Other configs
  "collectCoverage": true
}