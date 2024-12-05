import { Sequelize } from "sequelize";
import { config } from "./config.js";

const sequelize = new Sequelize(config.DATABASE_URL, {
    dialect: 'mysql',
    logging: config.DEBUG ? console.log : false,
});

export default sequelize;