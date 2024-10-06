import React from 'react'
import BizAppLogo from '../Assets/SiteImages/BizApps.jpg'

export default function Home() {
  return (
      <div  >
        <div className="w-full ">
          <img style={{ width: '100%', height: '150px' }} src={'/Images/SRD-LetterTop.jpg'} alt={''} />
        </div>
        
        <div className='mt-[calc(100vh-345px)] flex gap-2  justify-center items-center' >
          <div>
            {/* <img src={LogoUnderConstruction} height={100} width={150} alt="UC" /> */}
            {/* <img src={'../Assets/SiteImages/BizApps.jpg'} style={{height:'100px', width:'150px'}} alt="BizApps" /> */}
            <img src={BizAppLogo} style={{ height: '100px', width: '150px' }} alt="BizApps" />
          </div>

          {/* <div className='mb-2 font-poppins leading-1 font-thin' style={{ fontSize: '32px' }}> */}
          <div className='mb-2 font-poppins leading-1 font-thin text-xl md:text-3xl' >
            {/* Consultancy & Diagnostics <br /> Management Information System */}
            Management Information System V10.01
          </div>
        </div>

    </div>
  )
}
