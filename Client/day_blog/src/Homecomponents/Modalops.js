import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import "./modalops.css";
import axios from "axios";
import { BASEURL } from "../helper";

function Modalops({
  open,
  handleclose,
  handlecancel,
  handlePostData,
  home,
  singlepost,
}) {
  // let id = window.localStorage.getItem("postid");
  let name = window.localStorage.getItem("name");
  let [postText, setpostText] = useState([
    {
      title: "",
      post: "",
    },
  ]);

  // for selcting pivate or public
  const [select, setselect] = useState("public");

  let [finalpost, setfinalpost] = useState([]);
  const handlechange = (e) => {
    const { name, value } = e.target;
    setpostText((prevPostText) => ({
      ...prevPostText,
      [name]: value,
    }));
  };
  // console.log(id);

  useEffect(() => {
    if (!home && singlepost !== undefined) {
      setpostText({
        title: singlepost.title,
        post: singlepost.post,
      });
    }
  }, [singlepost]);

  const handlePost = () => {
    postText = [postText];
    setfinalpost(postText);
    setpostText("");
    handleclose();
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (home) {
      axios.post(`${BASEURL}/posts/Home`, {
        title: postText.title,
        post: postText.post,
        select: select,
        author: window.localStorage.getItem("name"),
        owner: window.localStorage.getItem("userid"),
      });
    } else {
      let myid = window.localStorage.getItem("postid");
      axios.patch(`${BASEURL}/posts/update/${myid}`, {
        title: postText.title,
        post: postText.post,
        author: window.localStorage.getItem("name"),
      });
    }
    handlePost();
    handleclose();
  };

  useEffect(() => handlePostData(finalpost), [finalpost]);
  return (
    <>
      <Modal
        open={open}
        onClose={handleclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modals">
          <div className="modalcontent">
            <div className="navb">
              <div className="left">
                <div className="name">
                  <h1>
                    <b>Hi ,{name}</b>
                    <span>
                      <select
                        name="Public"
                        className="selectbtn"
                        onChange={(e) => {
                          setselect(e.target.value);
                        }}
                      >
                        <option value="public">public</option>
                        <option value="private">private</option>
                      </select>
                    </span>
                  </h1>
                  <p className="para">Start Writing anything</p>
                </div>
              </div>
              <div className="post">
                <button
                  type="button"
                  class="btn-close"
                  onClick={handlecancel}
                  aria-label="Close"
                ></button>
              </div>
            </div>

            <div className="Maincontainer">
              <form onSubmit={handlesubmit}>
                <input
                  type="text"
                  placeholder="title"
                  name="title"
                  value={postText.title}
                  onChange={handlechange}
                  className="input"
                />
                <textarea
                  type="text"
                  rows={20}
                  placeholder="What do you want to talk about ?"
                  name="post"
                  value={postText.post}
                  onChange={handlechange}
                  className="input"
                  maxLength={100}
                />
                <button type="submit" className="btn btn-primary">
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Modalops;
