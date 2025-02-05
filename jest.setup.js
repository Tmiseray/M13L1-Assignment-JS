import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

process.env.NODE_ENV = 'test';

const jestConfig = {
    transform: {},
    testEnvironment: "node",
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1"
    },
    setupFiles: ['./__mocks__/setup.js']
};

export default jestConfig;