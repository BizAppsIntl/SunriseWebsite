import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import NavAdmin from './Components/Nav_Admin/NavAdmin'

export default function LayoutAdmin() {
  return (
    <>
      {/* <div ><Sidenav /></div> */}

      <div className="w-full px-0 flex flex-col ">
        <div className="px-0 md:xl:px-2 ">
          <NavAdmin />
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
