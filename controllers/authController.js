import {User} from "../models/User.js";
import {comparePassword, generateAccessToken, generateRefreshToken, hashPassword} from "../helpers/auth.js";
import * as crypto from "crypto";
import {codeSend} from "../helpers/mail.js";
import jwt from "jsonwebtoken";
import 'dotenv/config'


export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400);
    return res.json({error: 'email обязятелен'})
  }

  if (!password) {
    res.status(400);
    return res.json({error: 'пароль обязятелен'})
  }

  if ((await User.findAll({
    where: {
      email: email
    }
  })).length > 0) {
    res.status(400);
    return res.json({error: 'Такой пользователь уже есть'});
  }
  //TODO
  //остальная валидация

  const hashedPassword = await hashPassword(password);
  const code = crypto.randomInt(100000, 999999);
  // const date = new Date();
  // const codeDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const codeDate = Date.now();

  const user = await User.create({...req.body, password: hashedPassword, code, code_date: codeDate});
  await codeSend(email, code).catch(console.error);
  return res.json({id: user.dataValues.user_id});
}

export const verifyUser = async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if ((Date.now() - user.code_date) / 1000 > 15 * 60) {
    res.status(400);
    return res.json({error: 'код устарел'});
  }
  if (code === user.code) {
    user.status = 'activate';
    await user.save();
    return res.sendStatus(200);
  }

  res.status(400);
  return res.json({error: 'Неправильный код'});
}

export const sendCode = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (!user){
    res.status(400);
    return res.json({error: 'Такого пользователя не существует.'})
  }
  const code = crypto.randomInt(100000, 999999);
  user.code = code;
  user.code_date = Date.now();
  user.save();
  await codeSend(email, code).catch(console.error);
  return res.sendStatus(200);
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400);
    return res.json({error: 'email обязятелен'})
  }

  if (!password) {
    res.status(400);
    return res.json({error: 'пароль обязятелен'})
  }

  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    res.status(400);
    return res.json({ error: 'Такого пользователя не существует' });
  }
  const isPasswordValid = await comparePassword(password, user.dataValues.password.trim());

  if (!isPasswordValid) {
    res.status(400);
    return res.json({ error: 'Неправильный пароль' });
  }

  const accessToken = await generateAccessToken(user.dataValues.user_id, email);
  const refreshToken = await generateRefreshToken(user.dataValues.user_id, email);
  res.cookie('refreshToken', refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true });
  return res.json({'access_token': accessToken, 'refresh_token': refreshToken});
}

export const refreshToken = async (req, res) => {
  let user;
  if (!req.cookies.refreshToken){
    res.status(400);
    return res.json({error: 'в куках нет рефреш токена'});
  }
  await jwt.verify(req.cookies.refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      res.status(400);
      return res.json({error: 'токен не валиден, необходимо войти еще раз'});
    }
    user = await User.findOne({ where: { user_id: +decoded.user_id } });
  })
  const accessToken = await generateAccessToken(user.dataValues.user_id, user.dataValues.email);
  const refreshToken = await generateRefreshToken(user.dataValues.user_id, user.dataValues.email);
  res.cookie('refreshToken', refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true });
  return res.json({'access_token': accessToken, 'refresh_token': refreshToken});
}


export const passwordUpdate = async (req, res) => {
  const { email, code, newPassword } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if ((Date.now() - user.code_date) / 1000 > 15 * 60) {
    res.status(400);
    return res.json({error: 'код устарел'});
  }
  if (code !== user.code) {
    res.status(400)
    return res.json({error: 'Неправильный код'})
  }
  console.log(newPassword)
  user.password = await hashPassword(newPassword)
  user.save();
  return res.sendStatus(200)
}