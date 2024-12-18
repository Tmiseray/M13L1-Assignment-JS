import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { SECRETKEY } = process.env;

export const generateToken = (userId, roleName) => {
    const payload = {
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
        iat: Math.floor(Date.now() / 1000),
        sub: userId,
        role: roleName
    };
    return jwt.sign(payload, SECRETKEY);
};

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ 
            message: 'Authentication Token is missing', 
            error: 'Unauthorized' 
        });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRETKEY);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                message: 'Token has expired', 
                error: 'Unauthorized' 
            });
        }
        return res.status(401).json({ 
            message: 'Invalid token', 
            error: 'Unauthorized' 
        });
    }
};

export const requireRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ 
                message: 'User does not have the required role', 
                error: 'Unauthorized' 
            });
        }
        next();
    };
};