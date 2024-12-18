import { User } from '../models/index.js';
import { generateToken } from '../utils/authUtils.js';
import CircuitBreaker from 'opossum';

const breaker = new CircuitBreaker(async (userData) => {
    if (userData.username === 'Failure') {
        throw new Error('Failure condition triggered');
    }
    return await User.create(userData);
}, {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 10000
});

breaker.fallback(() => null);

const login = async (username, password) => {
    try {
        const user = await User.findOne({
            where: { username, password }
        });

        if (!user) return null;

        const authToken = generateToken(user.id, user.role);
        return {
            status: 'success',
            message: 'Successfully logged in',
            authToken
        };
    } catch (error) {
        throw new Error(`Login error: ${error.message}`);
    }
};

const saveUser = async (userData) => {
    try {
        return await breaker.fire(userData);
    } catch (error) {
        throw new Error(`Error saving user: ${error.message}`);
    }
};

const findUsers = async () => {
    try {
        return await User.findAll();
    } catch (error) {
        throw new Error(`Error finding users: ${error.message}`);
    }
};

export default { login, saveUser, findUsers };