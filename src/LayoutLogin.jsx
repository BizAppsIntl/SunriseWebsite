import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Nav4mFlowbite from './Components/Nav_Login/Nav4mFlowbite'

export default function LayoutLogin() {
  return (
    <>
      {/* <div ><Sidenav /></div> */}
      {/* <div className="w-full px-0 md:xl:px-16  flex flex-col justify-between "> */}
      {/* <div className="w-full px-0 flex flex-col "> */}
      <div className="w-full px-0 ">
        <div className="px-0 md:xl:px-16 ">
          <Nav4mFlowbite />
        </div>

        {/* <StatusBar/> */}
        {/* <div className="p-2 status-panel ">   <StatusPanel />   </div> */}

        {/* <div className="px-2 pt-1">  sec-content */}
        <Outlet />
        {/* </div> */}

      </div>
    </>
  )
}
