import React, { useEffect, useState } from 'react'
import BizAppLogo from '../Assets/SiteImages/BizAppsSlim.jpg'
import { Parallax } from 'react-parallax';
import Slider from 'react-slick';
import ImageSlider from '../Components/Slider/Slider';
import AlternatingSections from '../Components/Sections/Sections';

function getCurrentWindowDimensions() {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }
  else return { width: '', height: '' };
}

const images = [
  '/assets/HeroSec/E1.jpg',
  '/assets/HeroSec/L1.jpg',
  '/assets/HeroSec/L2.jpg',
  '/assets/HeroSec/L3.jpg',
  '/assets/HeroSec/OP1.jpg',
  '/assets/HeroSec/OP2.jpg',
];

const BannerImages = [
  '/assets/SRD/BannerSlider/CheeseCheddar.png',
  '/assets/SRD/BannerSlider/CheeseMozzarela.png',
  '/assets/SRD/BannerSlider/CheesePizza.png',
  '/assets/SRD/BannerSlider/CheeseShredded.png',
  '/assets/SRD/BannerSlider/CheezSlice.jpg',
  '/assets/SRD/BannerSlider/DesiGhee.png',
  '/assets/SRD/BannerSlider/FrenchFries.png',
  '/assets/SRD/BannerSlider/WhiteButter.jpg',
  '/assets/SRD/BannerSlider/WhiteButter.png',
  '/assets/SRD/BannerSlider/Yogurt.png',
  '/assets/SRD/BannerSlider/YogurtPack.png'
]


const Items = [
  '/assets/SRD/Items/Cheddarche240928014018137.png',
  '/assets/SRD/Items/Cheddarche240928014134883.png',
  '/assets/SRD/Items/CheddarPiz240928012137270.png',
  '/assets/SRD/Items/CheddarPiz240928012256448.png',
  '/assets/SRD/Items/CheddarPiz240928014239104.png',
  '/assets/SRD/Items/CheddarShr240928020111149.png',
  '/assets/SRD/Items/CheddarSli240928011050511.png',
  '/assets/SRD/Items/CheddarSli240928011323907.png',
  '/assets/SRD/Items/CheddarSli240928011519403.png',
  '/assets/SRD/Items/CheddarSup240928013824195.png',
  '/assets/SRD/Items/DesiGhee16240928020041862.png',
  '/assets/SRD/Items/DesiGhee1k240928015841166.png',
  '/assets/SRD/Items/DesiGhee50240928015743432.png',
  '/assets/SRD/Items/Mozzeralla240928010554817.png',
  '/assets/SRD/Items/Mozzeralla240928010620530.png',
  '/assets/SRD/Items/Mozzeralla240928010725581.png',
]



// ====================================================================================
export default function Home() {
  //import { useCtxMainContextHook } from '../../CtxMain'
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

  // <img src={BizAppLogo} alt="BizApps" />

  const MyParallaxComponent = () => (
    <Parallax bgImage="/assets/HeroSec/E1.jpg" strength={500}>
      <div style={{ height: 500 }}>
        <h1>My Parallax Content</h1>
      </div>
    </Parallax>
  );

  return (
    // <main className="flex-grow flex flex-col  items-center "
    //   //  This is Direct calculation
    //   //  style={{ minHeight: 'calc(100vh - 88px)' }}
    //   style={{ minHeight: `${IsMobile ? 'calc(100vh - 100px)' : 'calc(100vh - 72px)'}` }}
    // >
    // <main className="flex-grow flex flex-col justify-center" style={{ minHeight: contentHeight }}>
    <main className="w-full" style={{ minHeight: contentHeight }}>

      <div className="w-full h-[150px]">
        {/* <img style={{ width: '100%', height: '150px' }} src={'/Images/SRD-Top4HomePage.jpg'} alt={''} /> */}
        <img className='w-full h-full' src={'/Images/SRD-Top4HomePage.jpg'} alt={''} />
      </div>

      {/* {BgColors.LightBackgroundColors50.map((E, I) =>
          <div className={`w-96 p-4 m-2 rounded ${E} shadow-md`}> {E}</div>
        )} */}


      {/* <div className="w-full max-w-5xl mx-auto mt-2 overflow-hidden"> */}
      <div className="w-full mx-auto overflow-hidden">
        <ImageSlider />
      </div>


      {/* <div className='w-full grid grid-cols-1 md:grid-cols-2 mt-8 h-[350px] border border-red-600'>
        <div> <div className='text-3xl flex flex-col justify-center items-center'>Chadder Cheese</div></div>
        <div className='w-full h-full' > <img className='w-full h-full  '  src={'/assets/SRD/Items/Cheddarche240928014134883.png'} alt={''} /> </div>
      </div> */}


      <AlternatingSections />




      {/* <div>
        {images.map((image, index) => (
          <Parallax
            key={index}
            bgImage={image}
            strength={200 - index * 40} // Adjust strength for each image
            className="h-[500px]" // Adjust height as needed
          >
            <div className="h-full flex items-center justify-center text-white">
              <h1 className="text-2xl font-bold">
                Parallax Image {index + 1}
              </h1>
            </div>
          </Parallax>
        ))}
      </div> */}

    </main>
  )
}

