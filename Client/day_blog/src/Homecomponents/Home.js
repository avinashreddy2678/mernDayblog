import React, { useEffect, useState } from "react";
import "./Home.css";
import Post from "./Post";
import Modalops from "./Modalops";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../helper";
import Header from "../Header/Header";
function Home() {
  let userid = window.localStorage.getItem("userid");
  const [mydata, setdata] = useState([]);
  const [open, setopen] = useState(false);
  const [cookies, Setcookiet] = useCookies(["access_token"]);

  const [, Setcookie] = useCookies(["name"]);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BASEURL}/posts/Home`, {
          headers: { authorization: cookies.access_token },
        });
        if (mydata.length !== response.data.response.length) {
          setdata(response.data.response.slice().reverse());
        }
      } catch (error) {
        navigate("/auth/login");
      }
    };

    fetchPosts();
    return () => {};
  }, []);

  const hanldeonclick = () => {
    setopen(true);
  };
  const handleclose = () => {
    setopen(false);
  };
  const handlecancel = () => {
    setopen(false);
  };
  const handlepost = (postArray) => {
    setdata([...mydata, ...postArray]);
  };


  return (
    <div className="homebackground">
      <div className="Homepage-container">

        {/* Nav bar */}
      <Header/>
      
        <div className="input-box">
          <div className="inputbox">
            <input
              type="none"
              placeholder="Start a Post"
              value=""
              onClick={hanldeonclick}
            />
          </div>
          <Modalops
            open={open}
            handleclose={handleclose}
            handlecancel={handlecancel}
            handlePostData={handlepost}
            home={true}
          />
        </div>
        <div className="HomePosts">
          <div className="posts ">
            {mydata.map((item) => (
              <div className="singlepost shadow  bg-#aaa8a7 rounded">
                <Post key={item.id} item={item} setc={" "} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
