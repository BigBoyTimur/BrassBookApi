import {User} from "../models/User.js";
import {comparePassword, generateAccessToken, generateRefreshToken, hashPassword} from "../helpers/auth.js";

export const registerUser = async (req, res) => {
  const {email, password} = req.body;

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
  //проверка email кода
  //hash Пароля

  const hashedPassword = await hashPassword(password);
  const user = await User.create({...req.body, password: hashedPassword});
  return res.json({id: user.dataValues.user_id});
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
  res.json({'access_token': accessToken, 'refresh_token': refreshToken});
}