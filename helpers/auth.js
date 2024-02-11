import bcrypt from "bcrypt";
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import {UserToken} from "../models/UserToken.js";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, process.env.SALT);
}

export const comparePassword = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
}

export const generateAccessToken = async (user_id, email) => {
  return jwt.sign({user_id, email}, process.env.JWT_SECRET, {expiresIn: '15m'});
}

export const generateRefreshToken = async (user_id, email) => {
  const token = await jwt.sign({user_id, email}, process.env.JWT_SECRET, {expiresIn: '60d'});
  await UserToken.create({user_id, token});
  return token;
}
