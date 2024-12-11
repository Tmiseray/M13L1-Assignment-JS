import { col, Op, fn } from "sequelize";
// import Employee from "../models/employee.js";
// import Production from "../models/production.js";
import { Employee, Production } from "../models/index.js"


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


const employeesTotalProductions = async () => {
    try {
        const results = await Production.findAll({
            attributes: [
                [fn('SUM', col('quantityProduced')), 'totalItemsProduced'],
            ],
            include: [{
                model: Employee,
                attributes: ['name'],
                as: 'productionUpdater',
            }],
            group: ['productionUpdater.name'],
            raw: true,
        });

        return results.map(employee => ({
            employeeName: employee['productionUpdater.name'],
            totalItemsProduced: employee.totalItemsProduced,
        }));
    } catch (err) {
        throw new Error('Error fetching employee production data:' + err.message);
    }
};

export default { saveEmployee, findEmployees, employeesTotalProductions };