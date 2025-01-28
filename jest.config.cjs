
export default {
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    extensionToTreatAsEsm: ['.js'],
    testEnvironment: 'node',
};