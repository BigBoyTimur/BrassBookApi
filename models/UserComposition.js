// модель пользователь и композиции, которые он добавил в избранное.
import {sequelize} from "../dbConnect.js";
import {DataTypes, INTEGER} from "sequelize";

const UserComposition = sequelize.define('UserCompositionModel', {
  user_composition_id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
  user_id: {type: DataTypes.BIGINT, allowNull: false},
  composition_id: {type: DataTypes.BIGINT, allowNull: false},
}, {tableName: 'users_compositions', timestamps: false});

// создаст таблицу в бд, если ее нет
async function createTable(){
  await UserComposition.sync();
}

createTable();

export { UserComposition };