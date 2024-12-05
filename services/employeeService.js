import Employee from "../models/employee.js";

// Save a new Employee
const saveEmployee = async (employeeData) => {
    try {
        const newEmployee = await Employee.create(employeeData);
        return newEmployee;
    } catch (error) {
        throw new Error("Error saving the Employee: " + error.message);
    }
};

// Find all Employees
const findEmployees = async () => {
    try {
        const employees = await Employee.findAll();
        return employees;
    } catch (error) {
        throw new Error("Error retrieving Employees: " + error.message);
    }
};

export default { saveEmployee, findEmployees };