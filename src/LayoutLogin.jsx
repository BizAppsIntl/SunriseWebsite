import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Nav4mFlowbite from './Components/Nav_Login/Nav4mFlowbite'
import Footer from './Components/Footer'

export default function LayoutLogin() {
  return (
    <>
      {/* <div ><Sidenav /></div> */}
      {/* <div className="w-full px-0 md:xl:px-16  flex flex-col justify-between "> */}
      {/* <div className="w-full px-0 flex flex-col "> */}
      <div className="w-full px-0 min-h-screen flex flex-col ">
        {/* <div className="px-0 md:xl:px-16 "> */}
        <div className="px-0 md:xl:px-0 ">
          <Nav4mFlowbite />
        </div>

        {/* <StatusBar/> */}
        {/* <div className="p-2 status-panel ">   <StatusPanel />   </div> */}

        {/* <div className="px-2 pt-1">  sec-content */}
        <Outlet />
        {/* </div> */}

        <Footer className='mt-auto' />
      </div>
    </>
  )
}
