import userService from '../services/userService.js';
import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/authUtils.js';
import { faker } from '@faker-js/faker';

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

    beforeEach(() => {
        fakePassword = faker.internet.password();  // Generate random password 
    });
    
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });
    
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
        const mockToken = faker.datatype.uuid();  // Generate a random token
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

        expect(User.findOne).toHaveBeenCalledWith();
        expect(result).toBeNull();
    });

    test('should return null when password is invalid', async () => {
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

        await expect(userService.login(faker.internet.username(), fakePassword)).rejects.toThrow(
            'Login error: Database error'
        );

        expect(User.findOne).toHaveBeenCalledWith();
    });
});
