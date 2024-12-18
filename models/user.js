import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import { Employee, Customer } from "./index.js";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    role: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            isIn: [['admin', 'user']],
        },
    },
    accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});

// Custom instance method to get associated account
User.prototype.getAccount = async function() {
    if (this.role === 'admin') {
        return await Employee.findByPk(this.accountId);
    } else if (this.role === 'user') {
        return await Customer.findByPk(this.accountId);
    }
    return null;
};

// Define dynamic associations
User.addHook('afterFind', async (users) => {
    if (!users) return;
    
    const userArray = Array.isArray(users) ? users : [users];
    
    for (const user of userArray) {
        if (user.role === 'admin') {
            user.account = await Employee.findByPk(user.accountId);
        } else if (user.role === 'user') {
            user.account = await Customer.findByPk(user.accountId);
        }
    }
});

export default User;