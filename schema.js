import { DataTypes, Model } from "sequelize";
import sequelize from "./database";

class BaseModel extends Model {}

export { sequelize, DataTypes, BaseModel };