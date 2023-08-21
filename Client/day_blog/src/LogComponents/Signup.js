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
      <section class="vh-100">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-12 col-xl-11">
              <div class="card text-black">
                <div class="card-body p-md-5">
                  <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form class="mx-1 mx-md-4" onSubmit={onSubmit}>
                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <label class="form-label" for="form3Example1c">
                              Your Name
                            </label>
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

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <label class="form-label" for="form3Example3c">
                              Your Email
                            </label>
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

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <label class="form-label" for="form3Example4c">
                              Password
                            </label>
                            <input
                              type="password"
                              className="form-control wd-50"
                              id="exampleInputPassword1"
                              onChange={handlepassword}
                              name="password"
                            />
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <label class="form-label" for="form3Example4cd">
                              Repeat your password
                            </label>
                            <input
                              type="password"
                              className="form-control wd-50"
                              id="exampleInputPassword2"
                              name="confirmpassword"
                              onChange={handleconfirm}
                            />
                          </div>
                        </div>

                        <div class="d-flex justify-content-center align-items-center mx-4 ">
                          <button type="submit" class="btn btn-primary">
                            Register
                          </button>
                          <p class="text-center text-muted mx-3 mb-0">
                            Have already an account?{" "}
                            <a href="#!" class="fw-bold text-body">
                              <u>
                                <Link to={"/auth/login"} className="text-dark">
                                  Login
                                </Link>
                              </u>
                            </a>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="background">
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
      </div> */}
    </>
  );
}

export default Signup;
