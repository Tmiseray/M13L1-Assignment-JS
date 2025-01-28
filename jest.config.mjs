export default {
  transform: {
      '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
      'node_modules/(?!(@faker-js)/)',
  ],
  testEnvironment: 'node',
  setupFiles: [
    '<rootDir>/__mocks__/setEnvVars.js',
    'dotenv/config',
  ],
  moduleNameMapper: {
      '^config.js$': '<rootDir>/config.js',
      '^database.js$': '<rootDir>/database.js',
  },
};