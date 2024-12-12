import Customer from "./customer.js";
import Employee from "./employee.js";
import Product from "./product.js";
import Order from "./order.js";
import Production from "./production.js";

// Associations
Customer.hasMany(Order, { foreignKey: 'customerId', sourceKey: 'id', as: 'orderByCustomer' });
Order.belongsTo(Customer, { foreignKey: 'customerId', as: 'customerOrder' });

Product.hasMany(Order, { foreignKey: 'productId', sourceKey: 'id', as: 'productForOrder' });
Order.belongsTo(Product, { foreignKey: 'productId', as: 'orderedProduct' });

Product.hasMany(Production, { foreignKey: 'productId', sourceKey: 'id', as: 'producedProduct' });
Production.belongsTo(Product, { foreignKey: 'productId', as: 'productFromProduction' });

Employee.hasMany(Production, { foreignKey: 'createdBy', sourceKey: 'id', as: 'createdProduction' });
Production.belongsTo(Employee, { foreignKey: 'createdBy', as: 'productionCreator' });

Employee.hasMany(Product, { foreignKey: 'createdBy', sourceKey: 'id', as: 'createdProduct' });
Product.belongsTo(Employee, { foreignKey: 'createdBy', as: 'productCreator' });

Employee.hasMany(Production, { foreignKey: 'updatedBy', sourceKey: 'id', as: 'updatedProduction' });
Production.belongsTo(Employee, { foreignKey: 'updatedBy', as: 'productionUpdater' });

Employee.hasMany(Product, { foreignKey: 'updatedBy', sourceKey: 'id', as: 'updatedProduct' });
Product.belongsTo(Employee, { foreignKey: 'updatedBy', as: 'productUpdater' });


export { Customer, Employee, Order, Product, Production };