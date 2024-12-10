import Customer from "./customer.js";
import Employee from "./employee.js";
import Product from "./product.js";
import Order from "./order.js";
import Production from "./production.js";

// Associations
Customer.hasMany(Order, { foreignKey: 'customerId', as: 'orders' });
Order.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });

Product.hasMany(Order, { foreignKey: 'productId', as: 'orders' });
Order.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

Product.hasMany(Production, { foreignKey: 'productId', as: 'production' });
Production.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

Employee.hasMany(Production, { foreignKey: 'createdBy', as: 'productionCreated' });
Production.belongsTo(Employee, { foreignKey: 'createdBy', as: 'creator' });

Employee.hasMany(Product, { foreignKey: 'createdBy', as: 'productCreated' });
Product.belongsTo(Employee, { foreignKey: 'createdBy', as: 'creator' });

Employee.hasMany(Production, { foreignKey: 'updatedBy', as: 'productionUpdated' });
Production.belongsTo(Employee, { foreignKey: 'updatedBy', as: 'updater' });

Employee.hasMany(Product, { foreignKey: 'updatedBy', as: 'productUpdated' });
Product.belongsTo(Employee, { foreignKey: 'updatedBy', as: 'updater' });


export { Customer, Employee, Order, Product, Production };