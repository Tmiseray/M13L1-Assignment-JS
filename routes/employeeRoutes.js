import e from "express";
import employeeController from "../controllers/employeeController.js";

const router = e.Router();

// Save a New Employee
router.post('/', employeeController.saveEmployee);

// Get All Employees
router.get('/', employeeController.findEmployees);

// Employees Total Productions
router.get('/total-productions', employeeController.employeesTotalProductions);

export default router;