import express from "express";
import {getAudio} from "../controllers/staticFilesController.js";
import cors from "cors";

const staticFilesRouter = express.Router();
staticFilesRouter.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
);
staticFilesRouter.get('/audio/:id', getAudio)

export { staticFilesRouter }