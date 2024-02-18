import {sequelize} from "../dbConnect.js";
import {DataTypes, INTEGER} from "sequelize";

const User = sequelize.define('UserModel', {
  user_id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
  email: {type: DataTypes.CHAR(100), allowNull: false, unique: true},
  password: {type: DataTypes.CHAR(200), allowNull: false},
  role_name: {type: DataTypes.ENUM('ROLE_COMPANY', 'ROLE_PERSONAL'), allowNull: false},
  status: {type: DataTypes.ENUM('deactivate', 'activate'), allowNull: false, defaultValue: 'deactivate'},
  code: {type: DataTypes.INTEGER, allowNull: true},
  code_date: {type: DataTypes.BIGINT, allowNull: true}
}, {tableName: 'users', timestamps: false});

// создаст таблицу, если ее нет в бд почему-то
async function createTable(){
  await User.sync();
}

createTable();

export { User };