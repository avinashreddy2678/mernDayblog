import React, { useEffect, useState } from "react";
import "./Home.css";
import Post from "./Post";
import Modalops from "./Modalops";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Home() {
  let userid = window.localStorage.getItem("name");
  const [mydata, setdata] = useState([]);
  const [open, setopen] = useState(false);
  const [cookies, Setcookiet] = useCookies(["access_token"]);
  const [, Setcookie] = useCookies(["name"]);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/posts/Home", {
          headers: { authorization: cookies.access_token },
        });
        setdata(response.data.response);
      } catch (error) {
        navigate("/auth/login");
      }
    };

    fetchPosts();
  }, [mydata]);

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
  const logout = () => {
    Setcookiet("access_token", "");
    Setcookie("name", "");
    window.localStorage.removeItem("userid");
    window.localStorage.removeItem("name");
    navigate("/");
  };
 

  return (
    <div className="homebackground">
    <div className="Homepage-container">
      <nav class="navbar navbar-expand-lg bg-body-tertiary px-5 ">
        <div class="container-fluid">
          <a class="navbar-brand" href="/posts/Home">
            Daily-Journels
          </a>

          <div>
            <ul class="navbar-nav">
            <li class="nav-item px-5 py-3" className="nav-link">
              <Link
                  to={`/posts/Home`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <b>Home</b>
                </Link>
              </li>
              <li class="nav-item px-5 py-3" className="nav-link">
                <Link
                  to={`/posts/mypost/${userid}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <b>Myposts</b>
                </Link>
              </li>
              
              <li class="nav-item px-5 py-3" className="nav-link">
                <b onClick={logout} style={{ cursor: "pointer", font: "bold" }}>
                  logout
                </b>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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
      <div className="posts ">
        {mydata.map((item) => (
          <div className="singlepost shadow  bg-#aaa8a7 rounded" >
            <Post key={item.id} item={item} />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Home;
