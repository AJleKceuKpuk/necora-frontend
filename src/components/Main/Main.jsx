import React, { Component } from 'react'
import { Outlet } from 'react-router-dom';
import "./css/main.css";

const Main  = ({game, isAuthenticated}) => {





    return (
    <main className='main main-start-page'>   
        <div className='main-left'></div>
        <div className='main-center'>
            <Outlet />
        </div>
        <div className='main-right'></div>
        
    </main>
    )
  }

export default Main;