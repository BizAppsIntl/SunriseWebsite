import React from 'react'
import { AlertRec } from '../StdLib'

export default function Contact() {

  // AlertRec(_AccRecs, 'ABOUT PAGE ******************** NEAT _AccRec in main prgb**********************')
  return (
    <>
      <div >
        <div className="w-full h-[150px]">
          {/* <img style={{ width: '100%', height: '150px' }} src={'/Images/SRD-Top4HomePage.jpg'} alt={''} /> */}
          <img className='w-full h-full' src={'/Images/SRD-Top4HomePage.jpg'} alt={''} />
        </div>

        <div className='w-full flex '>
          <div className='px-40 w-1/2'>
            <p className='text-4xl mt-10 font-poppins'>You Are Welcome!</p>

            <div className='mt-4'>
              <p className='text-2xl font-roboto'>Head Office</p>
              <p className='text-base font-poppins'># 12345</p>
              <p className='text-base font-poppins'>Zeroth Floor, Mall o Mall Plaza,</p>
              <p className='text-base font-poppins'>Multan City </p>
              <p className='text-base font-poppins'>Multan </p>
              <p className='text-base font-poppins'>Phone: +92 11 1122334455 </p>
            </div>

            <div className='mt-4'>
              <p className='text-2xl font-roboto'>Factory</p>
              <p className='text-base font-poppins'># 12345</p>
              <p className='text-base font-poppins'>Zeroth Floor, Mall o Mall Plaza,</p>
              <p className='text-base font-poppins'>Multan City </p>
              <p className='text-base font-poppins'>Multan </p>
              <p className='text-base font-poppins'>Phone: +92 11 1122334455 </p>
            </div>
          </div>
          <div className='mx-auto  w-1/2 p-10 '>
            <div className='mx-auto w-full  rounded-xl shadow-xl overflow-hidden'>
              <img className='w-full h-full object-fill' src={'/Images/UnderConstruction/webpage-UC.webp'} alt={''} />
            </div>
          </div>

        </div>
      </div>

    </>
  )
}
