import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

// import './AdminLayout.css'
import Dashbard from './Dashboard'
// import StatusPanel from './Components/StatusPanel'

// import Sidenav from './Components/SideNav/SideNav'
import { ImFacebook2, ImInstagram, ImWhatsapp, ImYoutube } from 'react-icons/im'
import { FaFacebook, FaInstagram, FaSkype, FaSnapchatGhost, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa'
// import StatusBar from './StatusBar'

const SocialIcons = {
    // backgroundColor:'yellow',
    // border:'0px', borderRadius:'0px',
    width: '30px !important'
}
const AdminLayout = () => {
    return (
        <>
            <div className="container-fluid d-flex flex-row admin-panel">

                {/* <div ><Sidenav /></div> */}

                {/* <div className="w-100 "> */}
                    {/* <StatusBar/> */}

                    {/* <div className="p-2 status-panel ">
                        <StatusPanel />
                    </div> */}

                    <div className="px-2 pt-1">  {/* sec-content*/}
                        <Outlet />
                    </div>
                {/* </div> */}

            </div>

        </>
    )
}

export default AdminLayout
