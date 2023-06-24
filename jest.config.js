module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "^@/db(.*)$": "<rootDir>/db/$1",
    "^@/utils(.*)$": "<rootDir>/utils/$1",
    "^@/pages(.*)$": "<rootDir>/pages/$1",
    "^@/components(.*)$": "<rootDir>/components/$1",
  },
  // Other configs
}