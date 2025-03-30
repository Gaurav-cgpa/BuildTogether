import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './db/connection.js';

import connectionRoute from './routes/connection.route.js';
import authRoute from './routes/auth.route.js';
import projectRoute from './routes/project.route.js';
import taskRoute from './routes/task.route.js';
import userRoute from './routes/user.route.js';

dotenv.config();

const PORT=process.env.PORT||5000;

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));

app.use("/api/auth",authRoute);
app.use("/api/project",projectRoute);
app.use("/api/task",taskRoute);
app.use("/api/connection",connectionRoute);
app.use("/api/user",userRoute);

app.listen(PORT,()=>{
    console.log("Mongo db connected at the port:"+PORT);
    connectDB();
});