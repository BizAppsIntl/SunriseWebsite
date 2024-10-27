import React, { useEffect, useState } from 'react'
import BizAppLogo from '../Assets/SiteImages/BizAppsSlim.jpg'
import { useCtxMainContextHook } from '../CtxMain'

function getCurrentWindowDimensions() {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }
  else return { width: '', height: '' };
}


export default function Home() {
  //import { useCtxMainContextHook } from '../../CtxMain'
  const { CtxMainState, CtxMainDispatch } = useCtxMainContextHook()
  const { _Items, _AccRecs, _CatItems } = CtxMainState
  const [IsMobile, setIsMobile] = useState(false);
  const [contentHeight, setContentHeight] = useState("100vh");
  const [CrntWindow, setCrntWindow] = useState(getCurrentWindowDimensions())

  useEffect(() => {
    // Get the heights of navbar and footer
    const navbarHeight = document.getElementById("TopNavMega1")?.offsetHeight || 0;
    const footerHeight = document.getElementById("Footer1")?.offsetHeight || 0;

    // alert(navbarHeight + footerHeight)
    // Set the remaining height dynamically
    setContentHeight(`calc(100vh - ${navbarHeight + footerHeight}px)`);
  }, []);



  useEffect(() => {
    const handleResize = () => {
      // OTHER STEP- Only for CrntWindow Status
      //setCrntWindow(getCurrentWindowDimensions());
      if (typeof window !== "undefined") {
        const { innerWidth: width, innerHeight: height } = window;
        setCrntWindow({ width, height });
      }
      else setCrntWindow({ width: '', height: '' });
      // ---------------------------------



      // OTHER STEP
      // Check if the screen width is at least 'md' size (768px or more)
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Run the check initially
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (
    // <main className="flex-grow flex flex-col  items-center "
    //   //  This is Direct calculation
    //   //  style={{ minHeight: 'calc(100vh - 88px)' }}
    //   style={{ minHeight: `${IsMobile ? 'calc(100vh - 100px)' : 'calc(100vh - 72px)'}` }}
    // >
    <main className="flex-grow flex flex-col justify-center" style={{ minHeight: contentHeight }}>

      <div className="w-full ">
        {/* <img style={{ width: '100%', height: '150px' }} src={'/Images/SRD-Top4HomePage.jpg'} alt={''} /> */}
        <img className='w-full' src={'/Images/SRD-Top4HomePage.jpg'} alt={''} />
      </div>

      {/* {BgColors.LightBackgroundColors50.map((E, I) =>
          <div className={`w-96 p-4 m-2 rounded ${E} shadow-md`}> {E}</div>
        )} */}

      {/* <div className='mt-[calc(100vh-345px)] flex gap-2  justify-center items-center' > */}
      <div className='mt-auto flex gap-2  justify-center items-center' >
        <div className=' '>
          {/* <img src={LogoUnderConstruction} height={100} width={150} alt="UC" /> */}
          {/* <img src={'../Assets/SiteImages/BizApps.jpg'} style={{height:'100px', width:'150px'}} alt="BizApps" /> */}

          {/* <img src={BizAppLogo} style={{ height: '100px', width: '150px' }} alt="BizApps" /> */}
          <img src={BizAppLogo} alt="BizApps" />
        </div>

        {/* <div className='mb-2 font-poppins leading-1 font-thin' style={{ fontSize: '32px' }}> */}
        <div className=' font-poppins leading-none font-thin text-xl md:text-3xl' >
          {/* Consultancy & Diagnostics <br /> Management Information System */}
          Management Information System <small>V10.01-{CrntWindow.width}</small>
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

    </main>
  )
}
