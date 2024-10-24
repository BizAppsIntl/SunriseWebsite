import React from 'react'
import BizAppLogo from '../Assets/SiteImages/BizApps.jpg'
import { useCtxMainContextHook } from '../CtxMain'

import BgColors from '../Utils/BgColors.json'
import BgColorsLight50 from '../Utils/BgColorsSelective.json'
import BgColorsDark50 from '../Utils/BgColorsSelectiveStrong.json'

import BgColors4BG from '../Utils/BgColors4BG.json'

export default function Home() {
  //import { useCtxMainContextHook } from '../../CtxMain'
  const { CtxMainState, CtxMainDispatch } = useCtxMainContextHook()
  const { _Items, _AccRecs, _CatItems } = CtxMainState

  return (
    <div  >
      <div className="w-full ">
        <img style={{ width: '100%', height: '150px' }} src={'/Images/SRD-LetterTop.jpg'} alt={''} />
      </div>



      {/* {BgColors.LightBackgroundColors50.map((E, I) =>
          <div className={`w-96 p-4 m-2 rounded ${E} shadow-md`}> {E}</div>
        )} */}

      <p>BgColors4BG &lt; Bg44ColorsShade50and100 &gt;</p>
      <div className='w-full bg-white flex flex-wrap justify-evenly'>
        {BgColors4BG.Bg44ColorsShade50and100.map((color, index) => (
          <div
            key={index}
            className={`w-72 p-2 m-2 rounded ${color} shadow-md border border-gray-400 text-gray-800`}
          >
            {color}
          </div>
        ))}
      </div>

      <p>BgColors4BG &lt; Bg22ColorsShade100 &gt;</p>
      <div className='w-full bg-white flex flex-wrap justify-evenly'>
        {BgColors4BG.Bg22ColorsShade100.map((color, index) => (
          <div
            key={index}
            className={`w-72 p-2 m-2 rounded ${color} shadow-md border border-gray-400 text-gray-800`}
          >
            {color}
          </div>
        ))}
      </div>

      <p>ALL AVAILABLE COLORS: BackgroundColors &lt; From All Available-- Only Specific shade like 100 &gt;</p>
      <div className="">
        {Object.entries(BgColors.BackgroundColors).map(([colorName, shadesArray]) => (
          <div
          // key={`${colorName}-${index}`}
          // className={`w-96 p-4 m-2 rounded ${shadesArray[1]} shadow-md border border-gray-400 text-gray-800`}
          >
            {shadesArray[1]}
          </div>
        ))}
      </div>

      <p>ALL AVAILABLE COLORS Complete Tailwind: BackgroundColors &lt; All Available Shades like 100 &gt;</p>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(BgColors.BackgroundColors).map(([colorName, shadesArray]) => (
          shadesArray.map((shade, index) => (
            <div
              key={`${colorName}-${index}`}
              className={`w-96 p-4 m-2 rounded ${shade} shadow-md border border-gray-400 text-gray-800`}
            >
              {shade}
            </div>
          ))
        ))}
      </div>


      <p>Some Selective Random 50 COLORS: BackgroundColors &lt; random 50 and 100 shades &gt;</p>
      <div className='w-full bg-white flex flex-wrap justify-evenly'>
        {BgColorsLight50.LightBackgroundColors.map((color, index) => (
          <div
            key={index}
            className={`w-96 p-4 m-2 rounded ${color} shadow-md border border-gray-400 text-gray-800`}
          >
            {color}
          </div>
        ))}
      </div>

      <p>Some Selective Random 50 COLORS: BackgroundColors &lt; random 100 and 200 shades etc &gt;</p>
      <div className='w-full bg-white flex flex-wrap justify-evenly'>
        {BgColorsDark50.LightBackgroundColors.map((color, index) => (
          <div
            key={index}
            className={`w-96 p-4 m-2 rounded ${color} shadow-md border border-gray-400 text-gray-800`}
          >
            {color}
          </div>
        ))}
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

        {(
          _AccRecs.Loading ||
          _Items.Loading ||
          _CatItems.Loading
        )
          ? <div className=' '>
            {
              (_AccRecs.Loading ? '☆ ' : '★ ') +
              (_CatItems.Loading ? '☆ ' : '★ ') +
              (_Items.Loading ? '☆ ' : '★ ')
            }
          </div> : ''}


      </div>

    </div>
  )
}
