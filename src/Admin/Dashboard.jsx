import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
// import './Dashboard.css';
// import Mainbody from './Components/MainBody/Mainbody.jsx';
// import Rightbar from './Components/RightBar/Rightbar.jsx';
// import Sidebar from './Components/Sidebar/Sidebar.jsx';

// import PortalUsers from './Pages/Users/PortalUsers';
// import About from '../Pages/AboutUs/About';

import DashboardBackgroudImg from '../SiteImages/Default/DashboardBackgroudImg.jpg'
import DashboardPanel from './Components/DashboardComponents/DashboardPanel';


const XSignInFormX = () => (<span>SignInForm</span>);
const XNewPasswordX = () => (<span>NewPassword </span>);

const Dashbard = () => {
  return (
    <div  style={{paddingTop:'100px'}}>
      {/* XSignInFormX */}
      {/* <h1>Dashboard is here</h1> */}



      <div className='d-flex justify-content-center align-items-center mx-auto' style={{width: '90%'}}>
        {/* <DashboardPanel /> */}
      </div>

      {/* <Mainbody/> */}
    </div>
  )
}

export default Dashbard
