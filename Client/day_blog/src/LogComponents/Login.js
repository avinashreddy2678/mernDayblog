import React, { useState } from 'react'
import axios from 'axios';
import {useCookies} from 'react-cookie';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { BASEURL } from '../helper';
function Login() {
  let navigate=useNavigate();
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [_,Setcookie]=useCookies(["access_token"]);
  const[,setcookiename]=useCookies(["name"]);
  const handlechangeemail=(e)=>{
      setemail(e.target.value);
  }
  const handlechangepassword=(e)=>{
    setpassword(e.target.value);
}
 const  onSubmit=async (e)=>{
      e.preventDefault();
      try{
   let response=await axios.post(`${BASEURL}/auth/login`,{
          email,password
      });
      if(response.data.Userid){
        
        Setcookie("access_token",response.data.token);
        setcookiename("name",response.data.name);
        window.localStorage.setItem("userid",response.data.Userid);
        window.localStorage.setItem("name",response.data.name);
        navigate("/posts/Home");
      }
      else{
        alert(response.data.message);
      }
    }
    catch(err){
      console.error(err);
    }

  



  }
  return (
    <>
    <section class="h-100 gradient-form">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-xl-10">
        <div class="card rounded-3 text-black">
          <div class="row g-0">
            <div class="col-lg-6">
              <div class="card-body p-md-5 mx-md-4">

                
              <form  onSubmit={onSubmit}>
                  <p>Please login to your account</p>

                  <div class="form-outline mb-4">
                  <label class="form-label my-4" for="form2Example11">Username</label>
                  <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={handlechangeemail}
              name='email'
              autocomplete="off"
            />
                    
                  </div>

                  <div class="form-outline mb-4">
                  <label class="form-label" for="form2Example22">Password</label>
                  <input
              type="password"
              className="form-control wd-50"
              id="exampleInputPassword1"
              value={password}
              onChange={handlechangepassword}
              name='password'
            />
                    
                  </div>

                  <div class="text-center pt-1 mb-5 pb-1">
                    <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Log
                      in</button>
                  </div>

                  <div class="d-flex align-items-center justify-content-center pb-4">
                    <p class="mb-0 me-2">Don't have an account?</p>
                    <button type="button" class="btn btn-outline-danger"><Link to={'/auth/signup'} style={{color:"black"}}> signup
        </Link></button>
                  </div>

                </form>

              </div>
            </div>
            <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 class="mb-4">We are more than just a _________</h4>
                <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    {/* <div>
        <div className="login_background background">
      <form className=" w-50 mx-auto my-auto  p-4 bg-light" onSubmit={onSubmit}>
        <div className="Logintitle mx-5  px-2 py-3">
            <h1>Login</h1>
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
              onChange={handlechangeemail}
              name='email'
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
              value={password}
              onChange={handlechangepassword}
              name='password'
            />
          </div>
        </div>
        <div className='submit-btn'>
        <button type="submit" className=" btn btn-primary m-5">
          Submit
        </button>
        <Link to={'/auth/signup'}> signup
        </Link>
        </div>
      </form>
      </div>
    </div> */}
    </>
  )
}

export default Login
