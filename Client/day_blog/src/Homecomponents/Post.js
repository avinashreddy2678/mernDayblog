import React, { useState } from "react";
import Modalops from "./Modalops";
import axios from "axios";
import { useCookies } from "react-cookie";
function Post({ item, mypost }) {
  const [cookies, Setcookiet] = useCookies(["access_token"]);
  const [singlepost,setsinglepost]=useState();
  const [open, setopen] = useState(false);
  const handledeletepostid = async (postid) => {
    const fetchPosts = async () => {
      try {
        await axios.delete(`http://localhost:5000/posts/delete/${postid}`, {
          headers: { authorization: cookies.access_token },
        });
      } catch (error) {}
    };
    fetchPosts();
  };
  const handleedit = async(myid) => {
    window.localStorage.setItem("postid", myid);

    // let id = window.localStorage.getItem("postid");
    const editdata = await axios.get(
      `http://localhost:5000/posts/update/${myid}`
    );
    // console.log(editdata.data);
    setsinglepost(editdata.data);
   await setopen(true);
  };
  const handleclose = () => {
    setopen(false);
  };
  const handlecancel = () => {
    setopen(false);
  };
  const handlepost = (postAr) => {
    
  };

  return (
    <>
      <div>
        <h1>{item.title}</h1>
        <p>{item.post}</p>
        <h6 style={{ float: "right", marginRight: "10%" }}>-{item.author}</h6>
        <h6>{item.date}</h6>
        {mypost ? (
          <p onClick={() => handledeletepostid(item._id)}>delete</p>
        ) : (
          <p> </p>
        )}
        {mypost ? <p onClick={() => handleedit(item._id)}>edit</p> : <p> </p>}
        <Modalops
          open={open}
          handleclose={handleclose}
          handlecancel={handlecancel}
          handlePostData={handlepost}
          singlepost={singlepost}

        />
      </div>
    </>
  );
}

export default Post;
