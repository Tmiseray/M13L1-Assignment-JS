import e from "express";
import employeeController from "../controllers/employeeController.js";

const router = e.Router();

// Save a new Employee
router.post('/', employeeController.saveEmployee);

// Get all Employees
router.get('/', employeeController.findEmployees);

// Employees Total Productions
router.get('/total-productions', employeeController.employeesTotalProductions);

export default router;