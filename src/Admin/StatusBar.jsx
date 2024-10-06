import React from 'react'
import { FaFacebook, FaInstagram, FaSnapchatGhost, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa'

export default function StatusBar() {
    return (
        // <div className=" d-flex flex-row justify-content-center" style={{ backgroundColor: '#B2BEB5' }}>
        <div className='mt-1 mb-0' >
            {/* <div className="mw-auto">
                Status Bar
            </div> */}

            <div className="d-flex flex-wrap gap-1 justify-content-center">
                {/* <span   className="ms-2 " style={{SocialIcons}}> <ImWhatsapp className="text-success " /></span>
    <span   className="ms-2 " style={SocialIcons}><ImInstagram  className="text-danger "/></span>
    <span className="ms-2 "  style={SocialIcons}><ImFacebook2 className="text-primary "/></span>
    <span className="mx-2 "  style={SocialIcons}><ImYoutube className="text-danger "/></span> */}

                {/* <FaFacebook/>
            <FaTwitter/>
            <FaYoutube/>
            <FaInstagram/>
            <FaSnapchatGhost/>
            <FaWhatsapp/>
            <FaSkype/> */}
                <div style={{ backgroundColor: '#20f000', }} className="social-icon-container " ><a href="#" className="social-icon  "><FaWhatsapp /></a></div>
                <div style={{ backgroundColor: '#3B5998', }} className="social-icon-container " ><a href="#" className="social-icon  "><FaFacebook /></a></div>
                <div style={{ backgroundColor: '#55ACEE', }} className="social-icon-container " ><a href="#" className="social-icon  "><FaTwitter /></a></div>
                <div style={{ backgroundColor: '#fffc00', }} className="social-icon-container bg-white" ><a href="#" className="social-icon text-warning "><FaSnapchatGhost /></a></div>
                <div style={{ backgroundColor: '#bb0000', }} className="social-icon-container " ><a href="#" className="social-icon  "><FaYoutube /></a></div>
                <div style={{ backgroundColor: '#125688', }} className="social-icon-container " ><a href="#" className="social-icon  "><FaInstagram /></a></div>

            </div>
        </div>
    )
}
