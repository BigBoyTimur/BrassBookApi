import {User} from "../models/User.js";

export const registerUser = async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    res.status(400);
    return res.json({error: 'Заполнены не все поля'})
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

  const user = await User.create(req.body);
  return res.json(user.dataValues.user_id);
}