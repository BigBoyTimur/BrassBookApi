// модель таблицы, содержащей данные о композициях, записанных самим пользователем
import {sequelize} from "../dbConnect.js";
import {DataTypes, INTEGER} from "sequelize";

const UserOwnComposition = sequelize.define('UserOwnCompositionModel', {
  user_own_composition_id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
  user_id: {type: DataTypes.BIGINT, allowNull: false},
  composition_id: {type: DataTypes.BIGINT, allowNull: false},
  name: {type: DataTypes.TEXT, allowNull: false},
  file: {type: DataTypes.TEXT, allowNull: false}
}, {tableName: 'user_own_compositions', timestamps: false});

// создаст таблицу в бд, если ее нет
async function createTable(){
  await UserOwnComposition.sync();
}

createTable();

export { UserOwnComposition };