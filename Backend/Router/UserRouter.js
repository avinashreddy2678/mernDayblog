import express from "express";
import { UserModal } from "../Models/User.js";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
const saltRounds = 10;


router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        const newUser = new UserModal({
            username: username,
            email: email,
            password: hash,
        });
    
         newUser.save();
        res.status(200).json({ message: "Signup success" });
    });
    
    const user = await UserModal.findOne({ email });
    if (user) {
        return res.status(201).json({ message: "User exists" });
    }
    
    

});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
   
    const user = await UserModal.findOne({ email });
    if (!user) {
        return res.status(201).json({ message: "User not exists" });
    }


    bcrypt.compare(password, user.password, function(err, result) {
        if (!result) {
            return res.status(201).json({ message: "User password incorrect" });
        }
    
        console.log("User logged in successfully");
        const token=jwt.sign({id:user._id},"secreat");
        res.json({token,Userid:user._id,name:user.username,message:"User logged in successfully"});
    });
    

});

export { router as userrouter };
export const verifyToken=(req,res,next)=>{
    const token =req.headers.authorization;   
    if(token){
        
    jwt.verify(token,"secreat",(err)=>{
        if(err){
            return res.sendStatus(404);
        }
        next();
    })
}
else{
    res.sendStatus(405)
}
};
