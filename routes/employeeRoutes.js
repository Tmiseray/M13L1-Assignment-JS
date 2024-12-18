import e from "express";
import employeeController from "../controllers/employeeController.js";
import { verifyToken, requireRole } from '../utils/authUtils.js';
import cache from '../caching.js';

const router = e.Router();

// Save a New Employee
router.post('/', [
    verifyToken,
    requireRole('admin')
], employeeController.saveEmployee);

// Get All Employees
router.get('/', [
    verifyToken,
    requireRole('admin'),
    cache.cacheMiddleware(60)
], employeeController.findEmployees);

// Employees Total Productions
router.get('/total-productions', [
    verifyToken,
    requireRole('admin'),
    cache.cacheMiddleware(60)
], employeeController.employeesTotalProductions);

export default router;