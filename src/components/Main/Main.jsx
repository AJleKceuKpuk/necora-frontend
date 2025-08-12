import React, { Component } from 'react'
import { Outlet } from 'react-router-dom';
import "./css/main.css";

const Main  = ({game, isAuthenticated}) => {

    // если вошел и в игре
    if (game && isAuthenticated) {
        return (
            <main className='main main-start-page'>   
                <div className='main-left game'></div>
                <div className='main-center'>
                    game and auth
                </div>
            <div className='main-right game'></div>
            
        </main>
        );
      }
    
    // Если вошел но не в игре
    if(isAuthenticated) {
        return (
            <main className='main main-start-page'>   
                <div className='main-left'></div>
                <div className='main-center'>
                    Вошел
                </div>
            <div className='main-right'></div>
            
        </main>
        );
    }

    // для неавторизованных
    return (
    <main className='main main-start-page'>   
        <div className='main-left'></div>
        
            <Outlet />
       
        <div className='main-right'></div>
        
    </main>
    )
  }

export default Main;