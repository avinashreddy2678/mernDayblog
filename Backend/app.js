// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Cors from 'cors';
import { userrouter } from './Router/UserRouter.js';
import { postrouter } from './Router/PostRouter.js';
dotenv.config();
const app = express();
mongoose.connect(process.env.MONGODB);

app.use(Cors())
app.use(express.json());
app.use("/posts",postrouter);
app.use("/auth",userrouter);



app.listen(process.env.PORT,()=>{
        console.log("server running");
})
