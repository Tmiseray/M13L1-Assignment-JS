import userService from '../services/userService.js';
import userSchema from '../models/schemas/userSchema.js';
import { validateSchema } from '../utils/validationUtils.js';
import cache from '../caching.js';

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await userService.login(username, password);
        
        if (!result) {
            return res.status(404).json({
                status: 'error',
                message: 'User does not exist'
            });
        }
        
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const saveUser = async (req, res) => {
    const { error } = validateSchema(req.body, userSchema);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const user = await userService.saveUser(req.body);
        if (!user) {
            return res.status(400).json({ 
                message: 'Fallback method error activated', 
                body: req.body 
            });
        }
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const findUsers = async (req, res) => {
    try {
        const users = await userService.findUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default { login, saveUser, findUsers };
