import express from "express";
import {loginUser, registerUser, verifyUser, sendCode, refreshToken, passwordUpdate} from "../controllers/authController.js";
import cors from "cors";

const authRouter = express.Router();
authRouter.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
);

authRouter.post('/registration', registerUser);
authRouter.post('/login', loginUser);
authRouter.put('/verifyuser', verifyUser);
authRouter.put('/sendcode', sendCode);
authRouter.get('/refresh', refreshToken);
authRouter.put('/registration', passwordUpdate)


export { authRouter }