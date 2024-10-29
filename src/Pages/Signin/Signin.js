import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import SigninCard from './SignInCard';

export default function StandardInputPage() {
  const location = useLocation();
  const TriggerValue = location.state?.Trigger || false; // Get the Trigger value from the state

  const [contentHeight, setContentHeight] = useState("100vh");
  const [IsMobile, setIsMobile] = useState(false);

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
      // Check if the screen width is at least 'md' size (768px or more)
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Run the check initially
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // -.-.-.-.[ Handle INPUTs ]  -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-
  return (
    //  <main className="flex items-center justify-center" style={{ minHeight: contentHeight }}> 
     
     <main className="flex-grow flex flex-col  items-center justify-center  "
     //  This is Direct calculation
     //  style={{ minHeight: 'calc(100vh - 88px)' }}

     style={{ minHeight: `${IsMobile ? "": 'calc(100vh - 88px)'}` }}
     > 

      {/* <div className='w-full h-[(h-screen)-100px] border border-red-600 flex justify-center items-center'> */}
      {/* {TriggerValue ? <p>Trigger is true</p> : <p>Trigger is false</p>} */}
      {/* <p> {location.state?.Trigger ? ' location.state?.Trigger is true' : 'location.state?.Trigger isfalse'}</p> */}

      {/* START *************     STANDARD MODAL ********************************/}
      {/* <Modal dismissible show={OpenModal} size="xl" popup onClose={() => setOpenModal(false)} > */}

      {/* <h1 className="text-4xl font-bold">Text in the Middle of the Screen</h1> */}

      <div className='border p-4 border-gray-300 shadow-lg rounded-md'>
        <SigninCard />
      </div>
    </main>
  )
}






