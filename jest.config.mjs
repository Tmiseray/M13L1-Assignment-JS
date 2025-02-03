export default {
  transform: {
      '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
      'node_modules/(?!(@faker-js)/)',
  ],
  testEnvironment: 'node',
  setupFiles: [
    '<rootDir>/jest.setup.js',
  ],
  moduleNameMapper: {
      '^config.js$': '<rootDir>/__mocks__/config.js',
      '^database.js$': '<rootDir>/__mocks__/database.js',
  },
};