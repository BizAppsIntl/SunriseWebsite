import React from 'react'
import { FaFacebook, FaInstagram, FaSnapchatGhost, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa'

export default function Footer() {
    return (
        <div className="flex py-1 w-full  justify-center items-between" style={{ backgroundColor: '#B2BEB5' }}>
            {/* <div className="mw-auto">
                Status Bar
            </div> */}

            <div className='px-2'>            All Rights Reserved to BizApps, Multan, Pakistan. (92) 334 4373507</div>

            <div className="flex flex-wrap gap-1 justify-center">

                {/* <FaFacebook/>
            <FaTwitter/>
            <FaYoutube/>
            <FaInstagram/>
            <FaSnapchatGhost/>
            <FaWhatsapp/>
            <FaSkype/> */}

                <div style={{ backgroundColor: '#20f000', }} className=" rounded-full m-auto" ><a href="#" className=""><FaWhatsapp /></a></div>
                <div style={{ backgroundColor: '#3B5998', }} className='rounded-full m-auto' ><a href="#" className=""><FaFacebook /></a></div>
                <div style={{ backgroundColor: '#55ACEE', }} className='rounded-full m-auto' ><a href="#" className=""><FaTwitter /></a></div>
                <div style={{ backgroundColor: '#fffc00', }} className='rounded-full m-auto bg-white' ><a href="#" className=" text-yellow-400"><FaSnapchatGhost /></a></div>
                <div style={{ backgroundColor: '#bb0000', }} className='rounded-full m-auto' ><a href="#" className=""><FaYoutube /></a></div>
                <div style={{ backgroundColor: '#125688', }} className='rounded-full m-auto' ><a href="#" className=""><FaInstagram /></a></div>

            </div>
        </div>
    )
}



