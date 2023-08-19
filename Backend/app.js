// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Cors from 'cors';
import { userrouter } from './Router/UserRouter.js';
import { postrouter } from './Router/PostRouter.js';
dotenv.config();
const app = express(); 



// const uri = process.env.MONGODB_URL;
// mongoose.connect(uri);

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB Atlas!');
// });


mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

app.use(Cors())
app.use(express.json());
app.use("/posts",postrouter);
app.use("/auth",userrouter);

app.listen(process.env.PORT||'5000',()=>{
        console.log("server running");
})
