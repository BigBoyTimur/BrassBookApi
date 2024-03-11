import express from "express";
import {getAudio} from "../controllers/staticFilesController.js";

const staticFilesRouter = express.Router();
staticFilesRouter.get('/audio/:id', getAudio)

export { staticFilesRouter }