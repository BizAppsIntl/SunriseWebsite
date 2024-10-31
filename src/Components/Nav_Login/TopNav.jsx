import React, { useEffect, useState } from 'react';

//Two file needed for toasify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import Link from 'next/link';
// import Image from 'next/image';

import BgColors from '../../Utils/BgColors.json'

import { Link } from "react-router-dom";
// {/* <Link to={user.id}>{user.name}</Link> */}

// import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Dropdown } from "flowbite-react";

import FindCrntMedia from '../../FindCrntMedia'

// import logo from '../../SiteImages/BizApps.jpg'
// import WaterMark from '@/public/SiteImages/Default/UC-7.jpg'

import { FaFolderTree } from "react-icons/fa6";
import { MdFolderOff } from "react-icons/md";
import { MdOutlineFolderOff } from "react-icons/md";


import Img4Tran from '../../SiteImages/Default/Trans.png'
import Img4RptM from '../../SiteImages/Default/Rpt1.png'
import Img4RptA from '../../SiteImages/Default/Rpt2.png'
import Img4RptF from '../../SiteImages/Default/AccFolder3.jpg'

import RptA from '../../SiteImages/Default/RptA.jpg'
import RptB from '../../SiteImages/Default/RptB.png'


import Img4AccStt1 from '../../SiteImages/Default/AccStt.jpg'
import Img4AccStt2 from '../../SiteImages/Default/AccStt2.jpg'

import Img4HK from '../../SiteImages/Default/housekeeping.png'
import Img4Wallet from '../../SiteImages/Default/Wallet.jpg'
import Img4Maintenance from '../../SiteImages/Default/Maintenance.jpg'
import LedgerA from '../../SiteImages/Default/LedgerA.png'
import LedgerB from '../../SiteImages/Default/LedgerB.png'
import LedgerC from '../../SiteImages/Default/LedgerC.png'
import LedgerD from '../../SiteImages/Default/LedgerD.png'
import LedgerE from '../../SiteImages/Default/LedgerE.png'
import LedgerF from '../../SiteImages/Default/LedgerF.png'

import EditA from '../../SiteImages/Default/EditA.png'
import EditB from '../../SiteImages/Default/EditB.jpeg'


//import SignIn from '../../Pages/SignIn/SignInCard'


// Dashboard
import { BsSpeedometer2 } from 'react-icons/bs'

// Transactions
import { BsNewspaper } from 'react-icons/bs'

// Housekeeping
import { FaLaptopHouse } from 'react-icons/fa'

// Reports
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'

// Maintenance
import { FaCogs } from 'react-icons/fa'

// Security & Privacy
import { GiArrowsShield } from 'react-icons/gi'

import Accordion from './Accordion';
import { TfiWallet } from 'react-icons/tfi';
import { BiCog } from 'react-icons/bi';
import { useCtxMainContextHook } from '../../CtxMain';
import { AlertRec } from '../../StdLib';
// import GetWindowDimensions from '@/app/Lib/GetWindowDimensions';


function getCurrentWindowDimensions() {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }
  else return { width: '', height: '' };
}

const TW_COLORS_SET = [{
  "transparent": "transparent",
  "black": "#000000",
  "white": "#ffffff",
  "red": "#f44336",
  "pink": "#e91e63",
  "purple": "#9c27b0",
  "deep-purple": "#673ab7",
  "indigo": "#3f51b5",
  "blue": "#2196f3",
  "light-blue": "#03a9f4",
  "cyan": "#00bcd4",
  "teal": "#009688",
  "green": "#4caf50",
  "light-green": "#8bc34a",
  "lime": "#cddc39",
  "yellow": "#ffeb3b",
  "amber": "#ffc107",
  "orange": "#ff9800",
  "deep-orange": "#ff5722",
  "brown": "#795548",
  "grey": "#9e9e9e",
  "blue-grey": "#607d8b"
}]

// "transparent",
// "black",
// "white",
// 19 colors, 0 to 18
const TW_COLORS = [
  "red",
  "pink",
  "purple",
  "deep-purple",
  "indigo",
  "blue",
  "light-blue",
  "cyan",
  "teal",
  "green",
  "light-green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deep-orange",
  "brown",
  "grey",
  "blue-grey",
]
const RandomNumberInRange = (min, max) => {
  // inclusive of min and max
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const ToastWaitTime = 5000

// ************************ Start Program *******************************************
export default function TopNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [CrntWindow, setCrntWindow] = useState(getCurrentWindowDimensions())
  // const [IsMobile, setIsMobile]=useState(CrntWindow.width<=768) //if device is Mobile

  const IsMobile = FindCrntMedia('(max-width: 768px)'); // Define mobile screen width

  const { CtxMainState, CtxMainDispatch } = useCtxMainContextHook()
  const { _SysUser } = CtxMainState

  const onClose = () => (setIsOpen(false));

  // useEffect(() => {
  //   toast.success('Successfully Logged In:  [' + _SysUser.Data?.ID + ']', { theme: 'colored', autoClose: ToastWaitTime, position: "top-center" })
  // }, [])

  useEffect(() => {
    function handleResize() {
      // const x= getCurrentWindowDimensions()
      // alert(`Window Size is ${x} and ${x<=768?'True':'False'}`)
      setCrntWindow(getCurrentWindowDimensions());
      // setCrntWindow(x)
      // setIsMobile(x<=768)   //set either device is mobile on not
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close modal on pressing the Escape key
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  // Close modal when clicking outside the modal content
  const HandleOutsideClick = (e) => {
    // alert(`id=${e.target.id} name=${e.target.name}` )
    // name="MyMegaMenuName"
    if (e.target.id === 'FullPageArea') {
      onClose();
    }
  };

  const HandleSignOut = () => {
    // const id = (!_SysUser.Data?.ID || _SysUser.Data?.ID === undefined) ? '' : _SysUser.Data?.ID
    const id = (!_SysUser.Data || !_SysUser.Data.ID) ? '' : _SysUser.Data?.ID
    localStorage.setItem('_TOKEN', '');
    localStorage.setItem('_USER', '');
    CtxMainDispatch({ type: 'SYSUSER_FETCH_SUCCESS', payload: '' });
    toast.info('Logging Out: ' + `${id ? '[' + id + ']' : ''}`, { theme: 'colored', autoClose: ToastWaitTime, position: "top-right" })
  }


  return (
    <div id='FullPageArea' name='EmptAreaName' onClick={(e) => HandleOutsideClick(e)}>
      <nav className="py-0 px-2 md:px-4 w-full flex items-center justify-between text-black border-b shadow-md" id='NAV' name='NavName'>

        {/* <div > */}
        <Link to='/' onClick={() => setIsOpen(false)}>
          <div className="flex gap-1 md:gap-3 items-center ">
            <img src="/Images/SunriseLogo.jpg" className="h-8 md:h-[38px]" alt="Logo" />
            <div className="self-center whitespace-nowrap text-2xl md:text-3xl leading-none font-poppins tracking-wide ">
              Sunrise Dairy <span className=" font-thin hidden md:inline" >Pvt Ltd</span>
            </div>
            {/* <div className="flex flex-col text-left justify-center">
              <div className="whitespace-nowrap text-3xl leading-none font-semibold tracking-widest ">Sunrise</div>
              <div className="whitespace-nowrap text-gray-700 hidden md:block text-sm md:text-base ">Diagnostic & Refrective Surgery Center</div>
            </div> */}
          </div>

          {/* <div className="self-center whitespace-nowrap text-gray-700 md:hidden block text-sm md:text-base ">Diagnostic & Refrective Surgery Center</div> */}
          {/* <div className="text-left self-center whitespace-nowrap text-gray-700 md:hidden block text-sm md:text-base ">Diagnostic & Refrective Surgery Center</div> */}
          {/* </div> */}
        </Link>



        {/* XCELLENT-SPECIAL DROP DOWN  */}
        {/* <div className={`flex  ${isOpen ? "block" : "hidden"}`}      >
          <div className='group '>
            <button>Options {CrntWindow.width}</button>
            <ul className="hidden group-hover:block bg-white absolute   p-3 text-black shadow-lg rounded">
              <li className=" px-2 h-8 flex justify-between items-center rounded-md hover:bg-black/30"> Check Check Item 1</li>
              <li className=" px-2 h-8 flex justify-between items-center rounded-md hover:bg-black/30"> Check Check Item disp;ay2</li>
              <li className=" px-2 h-8 flex justify-between items-center rounded-md hover:bg-black/30"> Check Check Item 3</li>
            </ul>
          </div>
        </div> */}
        {/* END--- Options */}




        {/* <div className="hidden md:inline-flex text-sm  gap-2 md:gap-6 ms-auto me-4"> */}
        <div className="hidden md:inline-flex text-sm  gap-2 md:gap-6 ">
          <Link to="/" onClick={() => setIsOpen(false)} className='hidden md:inline'>
            <img className="w-[30px] h-[30px] inline-flex" src="/assets/PanelImages/HomePage.png" alt="avatar" />
            Home
          </Link>

          {/* {(_SysUser.Data?.ID !== undefined && _SysUser.Data?.ID ) && */}
          {/* {    (!(!_SysUser.Data || !_SysUser.Data.ID)) && */}
          {(_SysUser.Data && _SysUser.Data.ID) &&
            <Link to="/Dashboard" onClick={() => setIsOpen(false)}>
              <img className="w-[30px] h-[30px] inline-flex" src="/assets/PanelImages/Meter.png" alt="avatar" />
              Dashboard
            </Link>
          }
        </div>


      </nav>

      {/* END NAV ----------------------------------------------------------------------------------------------------------- */}

    </div >
  );
}


