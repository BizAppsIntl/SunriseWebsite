import { useEffect, useReducer, useState } from 'react'

import DashboardPanel from './DashboardPanel';
// import StatusPanel from './Components/StatusPanel/StatusPanel';
import { LuRefreshCw } from "react-icons/lu"
import { BsSpeedometer2 } from 'react-icons/bs'

// import ImgMale from  '@/app/assets/default/Male.png'
// import ImgFemale from '@/app/assets/default/Female.png'

//----------------------------------------------------------------
//----------------------------------------------------------------

const ToastWaitTime = 5000
const SMALL_WIDTH = 800

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
//                                  P R G  ---   START
// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
export default function Dashboard() {
  const [Refresh, setRefresh] = useState(false)

  //----------------------------------------------------------
  return (
    <>

        {/* START---  Detail Subject Body  =========================================================================*/}
        <div className="my-4 w-full bg-white border rounded-xl overflow-hidden shadow-lg ">
          {/* header */}
          <div className="h-[35px] bg-purple-300 flex items-center justify-between">
            {/* <h1 className="text-white ml-4 border-2 py-2 px-4 rounded-full">2</h1> */}
            <div className="px-4 bg-purple-300 text-2xl tracking-wide flex items-center gap-4">
               <BsSpeedometer2/> <span>Business Dashboard </span>
               </div>
            <div onClick={()=>setRefresh((p)=>!p)}><LuRefreshCw className='text-2xl me-4' /></div>
          </div>

          {/* header */}


          {/* body */}
          <div className="p-2 md:p-4 mx-auto">

          <DashboardPanel Refresh={Refresh}/>
        {/* <StatusPanel/> */}

          </div>

          {/* Card Ends here */}
        </div>


    </>
  )
}

