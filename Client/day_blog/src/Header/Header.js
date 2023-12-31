import React, { useEffect, useState } from "react";

import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../helper";

function Header() {
  let userid = window.localStorage.getItem("userid");
  const [mydata, setdata] = useState([]);
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

  const logout = () => {
    Setcookiet("access_token", "");
    Setcookie("name", "");
    window.localStorage.removeItem("userid");
    window.localStorage.removeItem("name");
    navigate("/");
  };
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid d-flex">
          <div>
            <a class="navbar-brand" href="/posts/Home">
              Daily-Journels
            </a>
          </div>
          <button
            class="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse float-end" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li
                class="nav-item px-5 py-3"
                className="nav-link nav-item active px-5 py-3"
              >
                <Link
                  to={`/posts/Home`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <b>Home</b>
                </Link>
              </li>
              <li
                class="nav-item px-5 py-3"
                className="nav-link nav-item px-5 py-3"
              >
                <Link
                  to={`/posts/private`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <b>Private</b>
                </Link>
              </li>
              <li
                class="nav-item px-5 py-3"
                className="nav-link nav-item px-5 py-3"
              >
                <Link
                  to={`/posts/mypost/${userid}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <b>Myposts</b>
                </Link>
              </li>
              <li class="nav-item " className="nav-link nav-item px-5 py-3">
                <b onClick={logout} style={{ cursor: "pointer", font: "bold" }}>
                  logout
                </b>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
