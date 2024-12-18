import e from 'express';
import userController from '../controllers/userController.js';
import { verifyToken, requireRole } from '../utils/authUtils.js';
import cache from '../caching.js';

const router = e.Router();

router.post('/login', userController.login);
router.post('/', userController.saveUser);
router.get('/', [
    verifyToken,
    requireRole('admin'),
    cache.cacheMiddleware(60)
], userController.findUsers);

export default router;