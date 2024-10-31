import React from 'react'
import { AlertRec } from '../StdLib'
import AlternatingSections from '../Components/Sections/Sections'

export default function Items() {

  // AlertRec(_AccRecs, 'ABOUT PAGE ******************** NEAT _AccRec in main prgb**********************')
  return (
    <>
      <div>
        <div className="w-full h-[150px]">
          {/* <img style={{ width: '100%', height: '150px' }} src={'/Images/SRD-Top4HomePage.jpg'} alt={''} /> */}
          <img className='w-full h-full' src={'/Images/SRD-Top4HomePage.jpg'} alt={''} />
        </div>




        <AlternatingSections/>


      </div>
    </>
  )
}
