import express from "express";
import {loginUser, registerUser, verifyUser, sendCode, refreshToken, passwordUpdate} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post('/registration', registerUser);
authRouter.post('/login', loginUser);
authRouter.put('/verifyuser', verifyUser);
authRouter.put('/sendcode', sendCode);
authRouter.get('/refresh', refreshToken);
authRouter.put('/registration', passwordUpdate)


export { authRouter }