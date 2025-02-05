import userService from '../services/userService.js';
import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/authUtils.js';
import { faker } from '@faker-js/faker';
import { afterAll, beforeAll, expect, jest } from '@jest/globals';


jest.mock('../config.js', () => {
    return {
        __esModule: true,
        config: {
            DATABASE_URL: 'mysql://mock:mock@localhost:3306/mock_db',
            CACHE_TYPE: 'simple',
            DEBUG: false,
            SECRETKEY: 'mock-secret-key'
        }
    };
});

jest.mock('../database.js', () => {
    return {
        __esModule: true,
        default: {
            define: jest.fn(),
            sync: jest.fn(),
            authenticate: jest.fn().mockResolvedValue(true),
            model: jest.fn(),
            query: jest.fn(),
            close: jest.fn()
        }
    };
});

jest.mock('../models/index.js', () => ({
    User: {
        findOne: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
    },
}));

jest.mock('../utils/authUtils.js', () => ({
    generateToken: jest.fn(() => 'dummy_token'),
}));

describe('User Service Tests', () => {
    beforeAll(() => {
        console.log('Before All Tests');
    });

    beforeEach(() => {
        console.log('Before Each Test');
        jest.resetModules(); 
        // Reset modules before each test
    });
    
    afterEach(() => {
        console.log('After Each Test');
        jest.clearAllMocks(); 
        // Clear mocks after each test
    });

    afterAll(() => {
        console.log('After All Tests');
    });

    test('should receive process.env variables', () => {
        console.log('running test for process.env variables');
        process.env.NODE_ENV = 'test';
        process.env.MYPASSWORD = 'mock-password';
        process.env.MYUSERNAME = 'mock-user';
        process.env.SECRETKEY = 'mock-secret-key';

        expect(process.env.NODE_ENV).toBe('test');
    })
    
    test('should return success when login is valid', async () => {
        console.log('running valid login test');
        // Arrange
        const username = faker.internet.userName();
        const password = faker.internet.password();
        const hashedPassword = bcrypt.hashSync(password, 10);
        const mockUser = {
            id: faker.datatype.number(),
            username,
            password: hashedPassword,
            role: 'admin',
        };

        User.findOne.mockResolvedValue(mockUser);

        // Act
        const response = await userService.login(username, password);

        // Assert
        expect(response.status).toBe('success');
        expect(response.authToken).toBe('dummy_token');
    });

    test('should return null when user is not found', async () => {
        console.log('running user not found test');
        // Mock `User.findOne` to return null
        User.findOne.mockResolvedValue(null);

        const result = await userService.login(faker.internet.username(), fakePassword);

        expect(User.findOne).toHaveBeenCalledWith({
            where: { username: expect.any(String) }
        });
        expect(result).toBeNull();
    });

    test('should fail login with incorrect password', async () => {
        console.log('running invalid password test');
        // Arrange
        const username = faker.internet.userName();
        const password = faker.internet.password();
        const hashedPassword = bcrypt.hashSync(password, 10);
        const mockUser = {
            id: faker.datatype.number(),
            username,
            password: hashedPassword,
            role: 'admin',
        };

        User.findOne.mockResolvedValue(mockUser);

        const incorrectPassword = faker.internet.password();

        // Act
        const response = await userService.login(username, incorrectPassword);

        // Assert
        expect(response).toBeNull();
    });

    test('should throw an error when there is an issue with the database', async () => {
        console.log('running database error test');
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
