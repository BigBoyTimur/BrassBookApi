import express from "express";
import {loginUser, registerUser, checkMailCode, sendCode} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post('/registration', registerUser);
authRouter.post('/login', loginUser);
authRouter.put('/verifyuser', checkMailCode);
authRouter.put('/sendcode', sendCode);


export { authRouter }