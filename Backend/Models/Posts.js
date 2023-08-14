import mongoose from "mongoose";

const PostSchema=new mongoose.Schema({
        title:{
            type:String,
           
            Max:10
        },
        post:{
            type:String,
            
        },
        author:{
            type:String, 
        }
        ,date: {
            type: Date,
            default: Date.now, 
          },
})
export const PostModal= mongoose.model("posts",PostSchema);