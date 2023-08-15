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
    <div>
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
    </div>
  )
}

export default Login
