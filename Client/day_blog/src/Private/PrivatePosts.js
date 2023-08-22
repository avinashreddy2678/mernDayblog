
import Header from '../Header/Header'
import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { BASEURL } from "../helper";
import Post from '../Homecomponents/Post';



function PrivatePosts() {
  const [data, setdata] = useState([]);
  let userid = window.localStorage.getItem("userid");
  const [cookies, Setcookiet] = useCookies(["access_token"]);

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
  }, []);
  return (
    <div>
      <Header />
      <div className="HomePosts">
        <div className="posts">
          {data.length === 0 ? (
            <h1>No  Private Posts</h1>
          ) : (
            data.map((single) =>
              single.select === "private" ? (
                <div className="singlepost shadow bg-aaa8a7 rounded" key={single.id}>
                  <Post item={single} />
                </div>
              ) : (
                null
              )
            )
          )}
        </div>
      </div>
    </div>
  );
              }  

export default PrivatePosts
