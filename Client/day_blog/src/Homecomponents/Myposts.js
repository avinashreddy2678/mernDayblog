import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { BASEURL } from "../helper";
import Header from "../Header/Header";

function Myposts({}) {
  const [data, setdata] = useState([]);

  let userid = window.localStorage.getItem("userid");
  const [cookies, Setcookiet] = useCookies(["access_token"]);
  const [, Setcookie] = useCookies(["name"]);
  const [c,setc]=useState();
  let navigate = useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`${BASEURL}/posts/mypost/${userid}`, {
          headers: { authorization: cookies.access_token },
        });
        
        setdata(response.data.response.slice().reverse());
        
      } catch (error) {
        navigate("/auth/login");
      }
    };
    fetchdata();
    return()=>{
      
    }
  }, [c]);

  return (
    <div className="background">

      {/* Nav bar components */}
     <Header/>
      
      <div className="HomePosts">
      <div className="posts">
        {data.length === 0 ? (
          <h1>No Posts</h1>
        ) : 
        
        (
          data.map((item) => (
            <>
            <div
              className="singlepost shadow  bg-#aaa8a7 rounded" key={item.id}>
              <Post item={item} mypost={true} setc={setc}/>
            </div>
            </>
          ))
        )}
      </div>
    </div>
    </div>
  );
}

export default Myposts;
