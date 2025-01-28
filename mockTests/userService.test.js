import userService from '../services/userService.js';
import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/authUtils.js';
import { faker } from '@faker-js/faker';
import { afterAll, beforeAll, expect, jest } from '@jest/globals';

jest.mock('../database.js', () => ({
    sequelize: {
        authenticate: jest.fn().mockResolvedValue('mocked authenticate'),
        sync: jest.fn().mockResolvedValue('mocked sync'),
    },
}));

jest.mock('../config.js', () => ({
    config: {
        DATABASE_URL: 'mysql://mock:mock@localhost:3306/mock_db',
        CACHE_TYPE: 'simple',
        DEBUG: false,
        SECRETKEY: 'mock-secret-key'
    },
}));

// jest.mock('../.env', () => ({
//     NODE_ENV: 'test',
//     MYPASSWORD: 'mock-password',
//     MYUSERNAME: 'mock-user',
//     SECRETKEY: 'mock-secret-key',
// }));
// test('should use mocked environment variables', () => {
//     console.log(process.env.NODE_ENV)
//     expect(process.env.NODE_ENV).toBe('test');
// });


jest.mock('../models/index.js', () => ({
    User: {
        findOne: jest.fn(),
        findAll: jest.fn(),
    },
}));

jest.mock('../utils/authUtils.js', () => ({
    generateToken: jest.fn(),
}));

describe('userService.login', () => {
    let fakePassword;
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV };
        fakePassword = faker.internet.password();  // Generate random password 
    });
    
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    afterAll(() => {
        process.env = OLD_ENV;
    });

    test('should receive process.env variables', () => {
        process.env.NODE_ENV = 'test';
        process.env.MYPASSWORD = 'mock-password';
        process.env.MYUSERNAME = 'mock-user';
        process.env.SECRETKEY = 'mock-secret-key';

        expect(process.env.NODE_ENV).toBe('test');
    })
    
    test('should return success when login is valid', async () => {
        const hashedPassword = bcrypt.hashSync(fakePassword, 10); // Hash a password for testing
        const mockUser = {
            id: 1,
            username: faker.internet.username(), // Generate random username
            password: hashedPassword,
            role: 'admin',
        };

        // Mock `User.findOne` to return the mock user
        User.findOne.mockResolvedValue(mockUser);

        // Mock `generateToken`
        const mockToken = faker.string.uuid();  // Generate a random token
        generateToken.mockReturnValue(mockToken);

        const result = await userService.login(mockUser.username, fakePassword);

        expect(User.findOne).toHaveBeenCalledWith({ where: { username: mockUser.username } });
        expect(bcrypt.compareSync(fakePassword, mockUser.password)).toBe(true);
        expect(result).toEqual({
            status: 'success',
            message: 'Successfully logged in',
            authToken: mockToken,
        });
    });

    test('should return null when user is not found', async () => {
        // Mock `User.findOne` to return null
        User.findOne.mockResolvedValue(null);

        const result = await userService.login(faker.internet.username(), fakePassword);

        expect(User.findOne).toHaveBeenCalledWith({
            where: { username: expect.any(String) }
        });
        expect(result).toBeNull();
    });

    test('should return null when password is invalid', async () => {
        const hashedPassword = bcrypt.hashSync(fakePassword, 10);
        const mockUser = {
            id: 1,
            username: faker.internet.username(),
            password: hashedPassword,
            role: 'admin',
        };

        // Mock `User.findOne` to return the mock user
        User.findOne.mockResolvedValue(mockUser);

        const result = await userService.login(mockUser.username, faker.internet.password());

        expect(User.findOne).toHaveBeenCalledWith({ where: { username: mockUser.username } });
        expect(bcrypt.compareSync(faker.internet.password(), mockUser.password)).toBe(false);
        expect(result).toBeNull();
    });

    test('should throw an error when there is an issue with the database', async () => {
        // Mock `User.findOne` to throw an error
        User.findOne.mockRejectedValue(new Error('Database error'));

        const username = faker.internet.username();
        await expect(userService.login(username, fakePassword)).rejects.toThrow(
            'Login error: Database error'
        );

        expect(User.findOne).toHaveBeenCalledWith({
            where: { username: username }
        });
    });
});
