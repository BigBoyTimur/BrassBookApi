import {sequelize} from "../dbConnect.js";
import {DataTypes, INTEGER} from "sequelize";

const Composition = sequelize.define('CompositionModel', {
  composition_id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
  name: {type: DataTypes.CHAR(50), allowNull: false},
  author: {type: DataTypes.CHAR(50), allowNull: false},
  image: {type: DataTypes.CHAR(255), allowNull: false},
  audio: {type: DataTypes.CHAR(255), allowNull: false}
}, {tableName: 'compositions', timestamps: false});

// создаст таблицу в бд, если ее нет
async function createTable(){
  await Composition.sync();
}

createTable();

export { Composition };