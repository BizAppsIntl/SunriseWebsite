import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Nav4mFlowbite from './Components/Nav_Login/Nav4mFlowbite'
import Footer from './Components/Footer.jsx'

// const Layout = ({ children }) => {
  export default function LayoutLogin() {
  return (
    <>
      {/* <div ><Sidenav /></div> */}
      {/* <div className="w-full px-0 md:xl:px-16  flex flex-col justify-between "> */}
      {/* <div className="w-full px-0 flex flex-col "> */}
      {/* <div className="w-full md:min-h-screen  "> */}
      
      <div className="flex flex-col min-h-screen">
        {/* Navbar at the top */}
        <Nav4mFlowbite />

        {/* Main Content in the middle */}
        <main className="flex-grow ">
          {/* {children} */}
          <Outlet />
        </main>

        {/* Footer at the bottom */}
         <Footer />
         {/* <div>This is footer line</div> */}
    </div >
    </>
  )
}

