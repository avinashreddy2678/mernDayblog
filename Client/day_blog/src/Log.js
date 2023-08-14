import React from 'react'
import Login from './LogComponents/Login'
import Signup from './LogComponents/Signup'
import LogSign from './LogComponents/LogSign'
import { Routes,Route } from 'react-router-dom'
import Home from './Homecomponents/Home'
import Myposts from './Homecomponents/Myposts'
function Log() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<LogSign/>}></Route>
            <Route path='/posts/Home' element={<Home/>}></Route>
            <Route path='/posts/mypost/:userid' element={<Myposts/>}></Route>
            <Route path='/auth/signup' element={<Signup/>}/>
            <Route path='/auth/login' element={<Login/>}/>
        </Routes>
    </div>
  )
}

export default Log
