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

export { Customer, Employee, Order, Product, Production };