// server.js
import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import { userrouter } from './Router/UserRouter.js';
import { postrouter } from './Router/PostRouter.js';
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/BlogDatabase');

app.use(Cors())
app.use(express.json());
app.use("/posts",postrouter);
app.use("/auth",userrouter);



app.listen('5000',()=>{
        console.log("server running");
})
