import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASEURL } from "../helper";
function Signup() {
  let navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const handleusername = (e) => {
    setusername(e.target.value);
  };
  const handlemail = (e) => {
    setemail(e.target.value);
  };
  const handlepassword = (e) => {
    setpassword(e.target.value);
  };

  const handleconfirm = (e) => {
    setconfirmpassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmpassword) {
      try {
        const response = await axios.post(`${BASEURL}/auth/signup`, {
          username,
          email,
          password,
        });
        alert(response.data.message);
        console.log(response.status);
        if (response.status === 200) {
          navigate("/auth/login");
        }
      } catch (error) {
        console.error("Error signing up:", error);
      }
    } else {
      alert("password mismatches");
    }
  };

  return (
    <>
      <div className="background">
        <div className="logintitle p-4 text-info d-flex align-items-center justify-content-center">
          <h2>Make the most of Professional life</h2>
        </div>
        <form className=" w-50 mx-auto bg-light my-3 p-4" onSubmit={onSubmit}>
          <div className="mx-5 p-2">
            <label for="exampleInputName" className="form-label">
              Name
            </label>
            <div class="col-8">
              <input
                type="text"
                className="form-control"
                id="exampleInputName"
                value={username}
                name="username"
                onChange={handleusername}
                autocomplete="off"
              />
            </div>
          </div>
          <div className="mx-5 p-2">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <div class="col-8">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                name="email"
                onChange={handlemail}
                autocomplete="off"
              />
            </div>
          </div>
          <div className="mx-5 p-2">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <div class="col-8">
              <input
                type="password"
                className="form-control wd-50"
                id="exampleInputPassword1"
                onChange={handlepassword}
                name="password"
              />
            </div>
          </div>
          <div className="mx-5 p-2">
            <label for="exampleInputPassword2" className="form-label">
              Confirm Password
            </label>
            <div class="col-8">
              <input
                type="password"
                className="form-control wd-50"
                id="exampleInputPassword2"
                name="confirmpassword"
                onChange={handleconfirm}
              />
            </div>
          </div>
          <div className="submit-btn">
            <button type="submit" className=" btn btn-primary m-5">
              Submit
            </button>
            <Link to={"/auth/login"}>
              <a>Login</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
