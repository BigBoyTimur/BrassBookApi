import express from "express";
import {registerUser} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post('/v1/registration', registerUser);


export { authRouter }