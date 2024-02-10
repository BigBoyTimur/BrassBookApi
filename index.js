import express from 'express';
import 'dotenv/config';
import './dbConnect.js';
import {authRouter} from "./routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//routes
app.use('/', authRouter)

const port = 8000;
app.listen(port, () => console.log(`server is running on port: ${port}`));
