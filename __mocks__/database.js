import { jest } from '@jest/globals';

const sequelize = {
    define: jest.fn(),
    sync: jest.fn(),
    authenticate: jest.fn().mockResolvedValue(true),
    model: jest.fn(),
    query: jest.fn(),
    close: jest.fn(),
};

export default sequelize;