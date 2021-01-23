import React from 'react'
import Dashboard from './DashboardComponents/Dashboard'
import Login from './Login/Login'
import auth from '../FrontServices/auth'


function Home() {
const isAuthenticated = auth.isAuthenticated();

  return (
       isAuthenticated
        ? (
        
            <Dashboard />
            
        ) : (
          <Login />   
        ) 
         
  );
}

export default Home
