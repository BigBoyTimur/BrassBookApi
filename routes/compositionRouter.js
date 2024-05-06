import express from "express";
import compositionController from "../controllers/compositionController.js";
import cors from "cors";
import authenticate from "../middlwares/auth.js";
import multer from 'multer'

const storage = multer.diskStorage({
  destination: 'compositions/userOwnAudio',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage })

const compositionRouter = express.Router();
compositionRouter.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
);

compositionRouter.post('/own/:id', authenticate, upload.single('audio'), compositionController.saveOwnComposition)

export default compositionRouter