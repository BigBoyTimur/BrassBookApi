import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        return res.json({ error: 'Заполнены не все поля' });
    }

    const user = await User.findAll({ where: { email: email } });

    if (!user) {
        res.status(401);
        return res.json({ error: 'Неправильный email или пароль' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        res.status(401);
        return res.json({ error: 'Неправильный email или пароль' });
    }

    const token = generateAuthToken(user);
    res.json({ token });
}

const secretKey = 'WUdSy4SEzriILmiATCI2A8X0KEKUa9yh'

const generateAuthToken = (user) => {
    const payload = {
        userId: user_id,
        email: email
    };

    const token = jwt.sign(payload, secretKey, {expiresIn: '999h'});
    return token;
}

export default generateAuthToken;
