import express from "express";
import compositionsController from "../controllers/compositionsController.js";
import cors from "cors";
import authenticate from "../middlwares/auth.js";

const compositionsRouter = express.Router();
compositionsRouter.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
);

compositionsRouter.get('/page=:page&size=:size', authenticate, compositionsController.getAllCompositions)

export default compositionsRouter