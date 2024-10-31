import React from 'react'
import { AlertRec } from '../StdLib'

export default function About() {

  // AlertRec(_AccRecs, 'ABOUT PAGE ******************** NEAT _AccRec in main prgb**********************')
  return (
    <>
      <div>
        <div className="w-full h-[150px]">
          {/* <img style={{ width: '100%', height: '150px' }} src={'/Images/SRD-Top4HomePage.jpg'} alt={''} /> */}
          <img className='w-full h-full' src={'/Images/SRD-Top4HomePage.jpg'} alt={''} />
        </div>

        <p className='text-2xl text-center mt-52'>Everything About Us is there</p>
      </div>
    </>
  )
}
