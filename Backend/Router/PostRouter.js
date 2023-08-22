import express from "express";
import { PostModal } from "../Models/Posts.js";
import { verifyToken } from "./UserRouter.js";

const router = express.Router();
router.get("/Home",async (req,res)=>{
  try {
    let response=await PostModal.find({});
    res.json({response});
  } catch (error) {
    
  }
})
router.get("/mypost/:userid",verifyToken,async (req,res)=>{
  try {
    let find=req.params.userid;
    let response=await PostModal.find({owner:find});
    res.json({response});
  } catch (error) {
    
  }
})
router.post("/Home", async (req, res) => {
  const { title, post,select,author,owner } = req.body;
  const newpost = new PostModal({
    title: title,
    post: post,
    select:select,
    author:author,
    owner:owner
  });
  await newpost.save();
});
router.delete("/delete/:postid", verifyToken, async (req, res) => {
  try {
    const postId = req.params.postid;
    const deletedPost = await PostModal.findByIdAndDelete(postId);

    if (deletedPost) {
      res.json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the post' });
  }
});

router.get("/update/:postid",async (req,res)=>{
  const postId=req.params.postid;
  const singlePost=await PostModal.find({_id:postId});
  // singlePost.title=req.body.title,
  // singlePost.post=req.body.post,
  // await singlePost.save();
  res.json({singlePost});

})
router.patch("/update/:postid",async (req,res)=>{
  const postId=req.params.postid;
  // const singlePost=await PostModal.filter({_id:postId});
  const filter={_id:postId};
  // singlePost.title=req.body.title,
  // singlePost.post=req.body.post,
    const update={$set:{title:req.body.title,post:req.body.post}};
    const result=await PostModal.updateOne(filter,update);

  res.json({result});

})


router.patch("/update/:postid", async (req, res) => {
  try {
    const postId = req.params.postid;

    const updatepost = await PostModal.findOneAndUpdate(postId);
    
    if (updatepost) {
      
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the post' });
  }
});



export { router as postrouter };
