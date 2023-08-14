// server.js
import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import { userrouter } from './Router/UserRouter.js';
import { postrouter } from './Router/PostRouter.js';
const app = express();
mongoose.connect('mongodb+srv://avinashreddie777:ZPNDnzyuaGU8jOjU@cluster0.nwjrlfp.mongodb.net/BlogDatabase');

app.use(Cors())
app.use(express.json());
app.use("/posts",postrouter);
app.use("/auth",userrouter);



app.listen('5000',()=>{
        console.log("server running");
})
