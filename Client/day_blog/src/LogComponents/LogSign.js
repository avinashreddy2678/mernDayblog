import React from 'react'
import './LogSign.css'
import { Link } from 'react-router-dom'
function LogSign() {
  return (
    <>
      <div className='login'>
        <div className="header">
            <div className="left">
            <img src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png" alt="" />
            </div>
            <div className="left">
            <Link to={'/auth/signup'}><button className='joinbtn'>Join Now</button></Link>
              <Link to={'/auth/login'} > <button className='signinbtn'>Sign in</button></Link>
            </div>
        </div>
        <div className="main">
            <div className="backgroundimg">
                <img src="https://img.freepik.com/premium-photo/scientific-molecule-background-with-flow-waves-medicine-science-technology-chemistry-wallpaper-o_230610-906.jpg" alt="" />
            </div>
            <div className="main-content">
                <div className="title">
                    Welcome to your ________ community
                </div>
                <div className="googleloginbtn">
                    <Link to={'/auth/signup'}>
                    <button style={{direction:"none"}}>Create Account</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default LogSign
