import {sequelize} from "../dbConnect.js";
import {DataTypes} from "sequelize";

const UserToken = sequelize.define('UserTokenModel', {
  user_token_id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
  user_id: {type: DataTypes.BIGINT, allowNull: false},
  token: {type: DataTypes.TEXT, allowNull: true},
}, {tableName: 'users_tokens', timestamps: false});

// создаст таблицу, если ее нет в бд почему-то
async function createTable(){
  await UserToken.sync();
}

createTable();

export { UserToken };