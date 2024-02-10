import {Sequelize} from "sequelize";
import 'dotenv/config';

export const sequelize = new Sequelize(`postgres://nahvcimm:${process.env.DB_PASS}@surus.db.elephantsql.com/nahvcimm`);


