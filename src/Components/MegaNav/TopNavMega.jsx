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


import Signin from '../../Pages/Signin/SigninCard'


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
export default function TopNavMega() {
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
    const id = (!_SysUser.Data?.ID || _SysUser.Data?.ID === undefined) ? '' : _SysUser.Data?.ID
    localStorage.setItem('_TOKEN', '');
    localStorage.setItem('_USER', '');
    CtxMainDispatch({ type: 'SYSUSER_FETCH_SUCCESS', payload: '' });
    toast.info('Logging Out: ' + `${id ? '[' + id + ']' : ''}`, { theme: 'colored', autoClose: ToastWaitTime, position: "top-right" })
  }


  return (
    <div id='FullPageArea' name='EmptAreaName' onClick={(e) => HandleOutsideClick(e)}>
      <nav className="py-0 px-2 md:px-4 w-full flex items-center  text-black border-b shadow-md" id='NAV' name='NavName'>

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




        <div className="hidden md:inline-flex text-sm  gap-2 md:gap-6 ms-auto me-4">
          <Link to="/" onClick={() => setIsOpen(false)} className='hidden md:inline'>
            <img className="w-[30px] h-[30px] inline-flex" src="/assets/PanelImages/HomePage.png" alt="avatar" />Home</Link>

          <Link to="/Dashboard" onClick={() => setIsOpen(false)}>
            <img className="w-[30px] h-[30px] inline-flex" src="/assets/PanelImages/Meter.png" alt="avatar" />Dashboard</Link>
        </div>





        {/* <div className='flex gap-3 items-center '> */}
        {/* OPEN/CLOSE Mega Menu */}
        <button className="ms-auto me-1 md:me-4 font-bold   text-black" onClick={() => setIsOpen(!isOpen)}>
          {(_SysUser.Data?.ID && _SysUser.Data?.ID !== undefined)
            ? isOpen ? <MdOutlineFolderOff className="w-[28px] h-[28px] text-red-700" /> : <FaFolderTree className="w-[28px] h-[28px] text-blue-700" />
            : ""}
        </button>
        {/* </div> */}

        {/* LOGGED-IN USER ====================================== */}

        {/* *********************************************************************************************************** */}
        {/* for MD appears at end */}
        {/* <div className="flex gap-1 align-middle md:order-2"> */}
        {/* <div className="flex gap-1 " onClick={() => setIsOpen(false)}> */}

        <div className='md:ps-3 md:pe-2 z-50  flex justify-between gap-1 h-[35px]  overflow-visible  md:bg-slate-300 md:rounded-3xl'
          onClick={() => setIsOpen(false)}
        >

          <Dropdown
            arrowIcon={false}
            inline
            label={
              <div className='my-auto leading-none hidden md:block'>
                <span className='block font-bold ' >
                  {/* {localStorage.getItem('_USER') ? JSON.parse(localStorage.getItem('_USER')).Title : 'Mufakhar'} */}
                  {_SysUser.Data ? _SysUser.Data?.ID : 'Mufakhar'}
                </span>
                <span className='text-xs text-slate-600'>
                  {/* {localStorage.getItem('_USER') ? JSON.parse(localStorage.getItem('_USER')).Desc : 'The Developer'} */}
                  {_SysUser.Data ? _SysUser.Data?.Title : 'The Developer'}
                </span>
              </div>
            }
          >
            {/* <Dropdown.Header className='px-2 py-0 '>
              <Link to={{ pathname: "/Signin", state: { Trigger: 'true1234' } }}>User Login</Link>
              <SigninCard />
            </Dropdown.Header> */}

            {/* // Pass Trigger in state */}
            <Link to="/Signin" state={{ Trigger: true }}    >
              <Dropdown.Item >User Login</Dropdown.Item>
            </Link>

          </Dropdown>

          {/* ************ AVATAR for User ************** */}
          <div className="my-auto  md:mt-[-2px]">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                // <Avatar alt="User settings" className="h-9" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />                  
                <img className="w-[50px] h-[50px] rounded-full border-4 border-slate-300" alt="avatar"
                  // src="/Images/Users/User2015-11-19.jpg" 
                  src={
                    _SysUser.Data
                      ? _SysUser.Data?.PicURL?.trim()
                        ? process.env.REACT_APP_API_URL + `Users/GetFile/${_SysUser.Data?.PicURL}`
                        : '/Images/Users/Users.png'
                      : '/Images/Users/Mufakhar.jpg'
                  }
                />

              }
            >
              <Dropdown.Header>
                <span className="block truncate text-sm font-medium">www.BizApps.pk</span>
                {/* <span className="block text-sm">User Profile</span> */}
                <span className="block text-sm">User! {_SysUser.Data?.ID}</span>
              </Dropdown.Header>
              {/* <Dropdown.Item href="@/app/(routes)/Signin/Signin" >Dashboard</Dropdown.Item> */}

              {/* <Dropdown.Item href={`/Signin`}> */}

              {/* <Link to="/Signout"                > */}
              {_SysUser.Data?.ID && <Dropdown.Item onClick={HandleSignOut}>Sign Out</Dropdown.Item>}
              {/* </Link> */}

              {_SysUser.Data?.ID && <Dropdown.Divider />}

              {/* Pass Trigger in state */}
              <Link to="/Signin" state={{ Trigger: true }} >
                <Dropdown.Item >User Login</Dropdown.Item>
              </Link>

              <Link to="/SignUp" state={{ Trigger: 'Edit' }} >
                <Dropdown.Item >Edit Profile</Dropdown.Item>
              </Link>

              <Link to="/SignUp" state={{ Trigger: 'SignUp' }} >
                <Dropdown.Item >User Sign Up</Dropdown.Item>
              </Link>

              {/* <Dropdown.Item href={`/Dashboard`}>Item-href Dashboard</Dropdown.Item>
                <Dropdown.Item><Link to="/Dashboard" > Item-Link Dashboard</Link> </Dropdown.Item>
F                <Link to="/Dashboard" > <Dropdown.Item>Link-Item Dashboard</Dropdown.Item></Link> */}

              {/* <Dropdown.Item>Change Password</Dropdown.Item> */}
            </Dropdown>
          </div>
        </div>

        {/* </div> */}
        {/* END ------ LOGGED-IN USER ====================================== */}


      </nav>

      {/* END NAV ----------------------------------------------------------------------------------------------------------- */}



      {!isOpen
        ? null
        :
        // {/* **************************** */}
        //      [ NAV MAGA MENU]
        // {/* **************************** */}
        <div style={{ '--image-urlBase': `url(${'/Images/UnderConstruction/UC-3.png'})`, '--image-urlHover': `url(${'/Images/UnderConstruction/UC-4.png'})` }}
          className={'font-poppins ' +
            "mt-1 px-2 w-full md:w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-2 "
            + " md:bg-[image:var(--image-urlBase)] bg-no-repeat bg-center "
            + " hover:bg-[image:var(--image-urlHover)]  focus:bg-[image:var(--image-urlHover)] hover:bg-top hover:z-50 hover:bg-contain "
          }
          // + " hover:bg-[image: `url(${'/SiteImages/Default/UC-5.png'})`] " } 

          id="MyMegaMenu"
          name="MyMegaMenuName"
          onClick={(e) => HandleOutsideClick(e)}

        >

          {/* {[...Array(50)].map((E,I) => 
       <div className={"w-52 border  bg-gradient-to-l " + `${'from-'+ TW_COLORS[ I] +'-300' } `} > {TW_COLORS[I]} </div>) 
    } */}




          {/* {BgColors.LightBackgroundColors50.map((E, I) =>
            <div className={`w-52 p-4 m-2 rounded ${E} shadow-md`}> {E}</div>
          )} */}

          {/* <p>BgColors &lt; BgColors.BgColorNames &gt;</p>
          <div className='w-full bg-white flex flex-wrap justify-evenly'>
            {BgColors.BgColorNames.map((color, index) => (
              <div
                key={index}
                // className={`w-72 p-2 m-2 rounded bg-${color}-200  shadow-md border border-gray-400 text-gray-800`}
                className={`w-72 p-2 m-2 rounded bg-gradient-to-r from-${color}-200  shadow-md border border-gray-400 text-gray-800`}
              >
                {color}
              </div>
            ))}
          </div> */}



          {/* XxXxXxXxXx[   COL-1   ]XxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx*/}
          {/* XxXxXxXxXx[   COL-1   ]                                                       /} */}
          {/* XxXxXxXxXx[   COL-1   ]XxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx*/}
          <div className=' flex flex-col gap-2' id="MyMegaMenuCol1" name="MyMegaMenuNameCol1" >

            {/* <p>BgColors4BG &lt; Bg22ColorsShade100 &gt;</p>
            <div className='w-full bg-white flex flex-wrap justify-evenly'>
              {BgColors.BgColorNames.map((color, index) => (
                <div
                  key={index}
                  className={`w-72 p-2 m-2 rounded ${color} shadow-md border border-gray-400 text-gray-800`}
                >
                  {color}
                </div>
              ))}
            </div> */}

            {/* Start: -----------Card for Transactions   ----------------------  */}
            <Accordion title={'Hot links '}
              AlwaysOpen={false}
              DefaultOpen={true}    //false for IsMobile, true for Desktops etc
              content={''}
              title_icon={<BsNewspaper />}

              header={<div className='flex items-center gap-2' >
                <span className="  "><img src={Img4Wallet} className=" size-7" alt="Logo" /></span> <span className=' text-black'>Wallet Links  </span>
                {/* <span className="  "><BsNewspaper /></span> <span className=' text-black'>tran {`CrntWindow:${CrntWindow.width}, IsMobile?: ${IsMobile ?'TRUE': 'FALSE'} `}</span> */}
              </div>
              }

              ExtraCSS4Header='py-1 px-4 text-2xl md:text-xl bg-slate-700/10 '
              ExtraCSS4Div=' flex flex-col gap-1 border-2 border-gray-400 shadow-lg rounded-md bg-white/50'
              ExtraCSS4Content=''
            >

              {/* Card Body */}
              <div className='mx-2 mb-2 mt-1 p-2  bg-slate-100/10 shadow-lg rounded-lg border border-gray-300 flex flex-col gap-1 '
                onClick={() => setIsOpen(!isOpen)}
              >
                {/* <div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}><BsNewspaper /> Sales Invoices </div> */}
                <Link to={'/Dashboard'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsSpeedometer2 /> */}
                  {/* <img src={RptB} className=" size-4" alt="Logo" /> */}
                  <img className="w-[60px] h-[30px] inline-flex" src="/assets/PanelImages/DashboardMeters.png" alt="" />
                  Business Dashboad </div></Link>

                {/* Divider Line */}
                <div className="mx-auto w-[90%] border-t border-yellow-400" ></div>
                {/* ------------------------------------------------------------------------- */}

                <Link to={'/Sales'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptB} className=" size-4" alt="Logo" />
                  Sales Invoices</div></Link>

                <Link to={'/Receipts'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptB} className=" size-4" alt="Logo" />
                  Sales Receipts</div></Link>

                {/* Divider Line */}
                <div className="mx-auto w-[90%] border-t border-red-400" ></div>
                {/* ------------------------------------------------------------------------- */}

                <Link to={'/Distributors'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptB} className=" size-4" alt="Logo" />
                  Distributors/ Customers Profiles</div></Link>

                <Link to={'/Vendors'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptB} className=" size-4" alt="Logo" />
                  Venders/ Suppliers Profiles</div></Link>

                {/* Divider Line */}
                <div className="mx-auto w-[90%] border-t border-blue-400" ></div>
                {/* ------------------------------------------------------------------------- */}

                <Link to={'/Items'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptB} className=" size-4" alt="Logo" />
                  Inventory Items Profiles </div></Link>

              </div>
            </Accordion>
            {/* End: -----------Card ----------------------  */}

            {/* Start: -----------Card for Transactions   ----------------------  */}
            <Accordion title={'Business Transactions'}
              AlwaysOpen={false}
              DefaultOpen={!IsMobile}    //false for IsMobile, true for Desktops etc
              content={''}
              title_icon={<BsNewspaper />}

              header={<div className='flex items-center gap-2' >
                <span className="  "><img src={Img4Tran} className=" size-7" alt="Logo" /></span> <span className=' text-black'>Business Transactions</span>
                {/* <span className="  ">
                // <BsNewspaper /></
                                  <img src={RptB} className=" size-4" alt="Logo" />

                span> <span className=' text-black'>tran {`CrntWindow:${CrntWindow.width}, IsMobile?: ${IsMobile ?'TRUE': 'FALSE'} `}</span> */}
              </div>
              }

              ExtraCSS4Header='py-1 px-4 text-2xl md:text-xl bg-slate-700/10 '
              ExtraCSS4Div=' flex flex-col gap-1 border-2 border-gray-400 shadow-lg rounded-md bg-white/50'
              ExtraCSS4Content=''
            >

              {/* Card Body */}
              <div className='mx-2 mb-2 mt-1 p-2  bg-slate-100/10 shadow-lg rounded-lg border border-gray-300 flex flex-col gap-1 '
                onClick={() => setIsOpen(!isOpen)}
              >
                {/* <div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                // <BsNewspaper />
                                  <img src={RptB} className=" size-4" alt="Logo" />

                 Sales Invoices </div> */}
                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptB} className=" size-4" alt="Logo" />

                  Sales Invoices </div></Link>
                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptB} className=" size-4" alt="Logo" />

                  Pruchase Bills</div></Link>

                {/* Divider Line */}
                <div className="mx-auto w-[90%] border-t border-yellow-400" ></div>
                {/* ------------------------------------------------------------------------- */}

                <Link to={'/Receipts'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptB} className=" size-4" alt="Logo" />

                  Sales Receipts </div></Link>
                <Link to={'/Receipts'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptB} className=" size-4" alt="Logo" />

                  Bills Payments</div></Link>


                {/* Divider Line */}
                <div className="mx-auto w-[90%] border-t border-red-400" ></div>
                {/* ------------------------------------------------------------------------- */}

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptB} className=" size-4" alt="Logo" />

                  Funds Transferx</div></Link>

                {/* Divider Line */}
                <div className="mx-auto w-[90%] border-t border-blue-400" ></div>
                {/* ------------------------------------------------------------------------- */}

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptB} className=" size-4" alt="Logo" />

                  Capital Transactions </div></Link>
                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptB} className=" size-4" alt="Logo" />

                  Equity Withdrawal</div></Link>

              </div>
            </Accordion>
            {/* End: -----------Card ----------------------  */}

          </div>
          {/*========= End Col1 ====================== */}



          {/* XxXxXxXxXx[   COL-2   ]XxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx*/}
          {/* XxXxXxXxXx[   COL-2   ]                                                       /} */}
          {/* XxXxXxXxXx[   COL-2   ]XxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx*/}
          <div className='flex flex-col gap-2' >


            {/* Start: -----------Card for  Administrativ Reports  ----------------------  */}
            {/* Start: ======== Managerial Reports   ========================================================== */}
            <Accordion title={'Managerial Reports'}
              AlwaysOpen={false}
              DefaultOpen={!IsMobile}    //false for IsMobile, true for Desktops etc
              content={''}
              title_icon={<HiOutlineClipboardDocumentList />}

              header={<div className='flex items-center gap-2' >
                <span className="  "><img src={Img4RptM} className=" size-7" alt="Logo" /></span> <span className=' text-black'>Managerial Reports</span>
                {/* <span className="  "><BsNewspaper /></span> <span className=' text-black'>tran {`CrntWindow:${CrntWindow.width}, IsMobile?: ${IsMobile ?'TRUE': 'FALSE'} `}</span> */}
              </div>
              }

              ExtraCSS4Header='py-1 px-4 text-2xl md:text-xl bg-slate-700/10 '
              ExtraCSS4Div=' flex flex-col gap-1 border-2 border-gray-400 shadow-lg rounded-md bg-white/50'
              ExtraCSS4Content=''
            >

              {/* Card Body */}
              <div className='mx-2 mb-2 mt-1 p-2  bg-slate-100/10 shadow-lg rounded-lg border border-gray-300 flex flex-col gap-1 '
                onClick={() => setIsOpen(!isOpen)}
              >
                {/* ========[ START body of Accordion]================================== */}

                {/* <div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}><BsNewspaper /> Sales Invoices </div> */}
                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptA} className=" size-4" alt="Logo" />
                  Sales Reports </div></Link>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptA} className=" size-4" alt="Logo" />
                  Purchase Reports</div></Link>

                {/* Divider Line  ------------------------------------------------------------------------- */}
                <div className="mx-auto w-[90%] border-t border-yellow-400" ></div>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptA} className=" size-4" alt="Logo" />
                  Sales Collection Reports</div></Link>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptA} className=" size-4" alt="Logo" />
                  Payments to Parties Reports</div></Link>

                {/* Divider Line  ------------------------------------------------------------------------- */}
                <div className="mx-auto w-[90%] border-t border-yellow-400" ></div>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptA} className=" size-4" alt="Logo" />
                  Funds Transfer Reports</div></Link>

                {/* Divider Line */}
                <div className="mx-auto w-[90%] border-t border-yellow-400" ></div>
                {/* ------------------------------------------------------------------------- */}

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptA} className=" size-4" alt="Logo" />
                  Cash Day Book</div></Link>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptA} className=" size-4" alt="Logo" />
                  Business Expenses Reports</div></Link>

                {/* Divider Line  ------------------------------------------------------------------------- */}
                <div className="mx-auto w-[90%] border-t border-yellow-400" ></div>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptA} className=" size-4" alt="Logo" />
                  Inventory Reports </div></Link>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptA} className=" size-4" alt="Logo" />
                  Stock Ledger </div></Link>

                {/* ========[ END body o Accordion ]================================== */}
              </div>
            </Accordion>

            {/* End: -----------Card ----------------------  */}



            {/* Start: ======== Administrative Reports   ========================================================== */}
            <Accordion title={'Administrative Reports'}
              AlwaysOpen={false}
              DefaultOpen={false}    //false for IsMobile, true for Desktops etc
              content={''}
              title_icon={<BsNewspaper />}

              header={<div className='flex items-center gap-2' >
                <span className="  "><img src={Img4RptA} className=" size-7" alt="Logo" /></span> <span className=' text-black'>Administrative Reports</span>
                {/* <span className="  "><BsNewspaper /></span> <span className=' text-black'>tran {`CrntWindow:${CrntWindow.width}, IsMobile?: ${IsMobile ?'TRUE': 'FALSE'} `}</span> */}
              </div>
              }

              ExtraCSS4Header='py-1 px-4 text-2xl md:text-xl bg-slate-700/10 '
              ExtraCSS4Div=' flex flex-col gap-1 border-2 border-gray-400 shadow-lg rounded-md bg-white/50'
              ExtraCSS4Content=''
            >

              {/* Card Body */}
              <div className='mx-2 mb-2 mt-1 p-2  bg-slate-100/10 shadow-lg rounded-lg border border-gray-300 flex flex-col gap-1 '
                onClick={() => setIsOpen(!isOpen)}
              >
                {/* ========[ START body of Accordion]================================== */}

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptB} className=" size-4" alt="Logo" />

                  Inventory Items Detail </div></Link>

                {/* -----Divider Line  ------------------------------------------------------------------------- */}
                <div className="mx-auto w-[90%] border-t border-yellow-400" ></div>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptB} className=" size-4" alt="Logo" />

                  Distributors Detail </div></Link>

                {/* -----Divider Line  ------------------------------------------------------------------------- */}
                <div className="mx-auto w-[90%] border-t border-yellow-400" ></div>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptB} className=" size-4" alt="Logo" />

                  Suppliers Detail  </div></Link>

                {/* -----Divider Line  ------------------------------------------------------------------------- */}
                <div className="mx-auto w-[90%] border-t border-yellow-400" ></div>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={RptB} className=" size-4" alt="Logo" />

                  Chart of Accounts</div></Link>


                {/* ========[ END body o Accordion ]================================== */}

              </div>
            </Accordion>

            {/* End: -----------Card ----------------------  */}



            {/* Start: -----------Card for  Financial Statement  ----------------------  */}
            {/* Start: ======== Financial Statement   ========================================================== */}
            <Accordion title={'Financial Statement'}
              AlwaysOpen={false}
              DefaultOpen={false}    //false for IsMobile, true for Desktops etc
              content={''}
              title_icon={<BsNewspaper />}

              header={<div className='flex items-center gap-2' >
                <span className="  "><img src={Img4RptF} className=" size-7" alt="Logo" /></span> <span className=' text-black'>
                  Financial Books & Statements</span>
                {/* <span className="  "><BsNewspaper /></span> <span className=' text-black'>tran {`CrntWindow:${CrntWindow.width}, IsMobile?: ${IsMobile ?'TRUE': 'FALSE'} `}</span> */}
              </div>
              }


              ExtraCSS4Header='py-1 px-4 text-2xl md:text-xl bg-slate-700/10 '
              ExtraCSS4Div=' flex flex-col gap-1 border-2 border-gray-400 shadow-lg rounded-md bg-white/50'
              ExtraCSS4Content=''
            >

              {/* Card Body */}
              <div className='mx-2 mb-2 mt-1 p-2  bg-slate-100/10 shadow-lg rounded-lg border border-gray-300 flex flex-col gap-1 '
                onClick={() => setIsOpen(!isOpen)}
              >
                {/* ========[ START body of Accordion]================================== */}

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={Img4Tran} className=" size-4" alt="Logo" />
                  Cash Flow </div></Link>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={Img4Tran} className=" size-4" alt="Logo" />
                  Banks Reconciliation </div></Link>

                {/* -----Divider Line  ------------------------------------------------------------------------- */}
                <div className="mx-auto w-[90%] border-t border-yellow-400" ></div>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={LedgerA} className=" size-4" alt="Logo" />
                  Distributors Ledger </div></Link>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={LedgerB} className=" size-4" alt="Logo" />
                  Supplier Ledger </div></Link>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={LedgerC} className=" size-4" alt="Logo" />
                  Inventory Item Ledger </div></Link>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={LedgerD} className=" size-4" alt="Logo" />
                  Staff Ledger </div></Link>

                {/* -----Divider Line  ------------------------------------------------------------------------- */}
                <div className="mx-auto w-[90%] border-t border-yellow-400" ></div>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={LedgerC} className=" size-4" alt="Logo" />
                  Business Expenses </div></Link>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={LedgerD} className=" size-4" alt="Logo" />
                  Account Ledger </div></Link>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={LedgerE} className=" size-4" alt="Logo" />
                  General Ledger </div></Link>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={LedgerF} className=" size-4" alt="Logo" />
                  General Journal </div></Link>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={Img4AccStt2} className=" size-4" alt="Logo" />
                  Business Profit & Loss Statement </div></Link>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={Img4AccStt1} className=" size-4" alt="Logo" />
                  Business Trial Balance </div></Link>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={Img4AccStt1} className=" size-4" alt="Logo" />
                  Business Balance sheet </div></Link>

                {/* ========[ END body o Accordion ]================================== */}
              </div>
            </Accordion>

            {/* End: -----------Card ----------------------  */}

          </div>
          {/*========= End Col2 ====================== */}


          {/* XxXxXxXxXx[   COL-3   ]XxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx*/}
          {/* XxXxXxXxXx[   COL-3   ]                                                       /} */}
          {/* XxXxXxXxXx[   COL-3   ]XxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx*/}
          {/*========= Col3 ====================== */}
          <div className=' flex flex-col gap-2' >

            {/* Start: -----------Card for Maintenance   ----------------------  */}
            <Accordion title={'Maintenance'}
              AlwaysOpen={false}
              DefaultOpen={!IsMobile}    //false for IsMobile, true for Desktops etc
              content={''}
              title_icon={<FaCogs />}

              header={<div className='flex items-center gap-2' >
                <span className="  "><img src={Img4Maintenance} className=" size-7" alt="Logo" /></span> <span className=' text-black'>
                  Maintenance</span>
                {/* <span className="  "><BsNewspaper /></span> <span className=' text-black'>tran {`CrntWindow:${CrntWindow.width}, IsMobile?: ${IsMobile ?'TRUE': 'FALSE'} `}</span> */}
              </div>
              }


              ExtraCSS4Header='py-1 px-4 text-2xl md:text-xl bg-slate-700/10 '
              ExtraCSS4Div=' flex flex-col gap-1 border-2 border-gray-400 shadow-lg rounded-md bg-white/50'
              ExtraCSS4Content=''
            >

              {/* Card Body */}
              <div className='mx-2 mb-2 mt-1 p-2  bg-slate-100/10 shadow-lg rounded-lg border border-gray-300 flex flex-col gap-1 '
                onClick={() => setIsOpen(!isOpen)}
              >
                {/* <div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}><BsNewspaper /> Sales Invoices </div> */}
                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={EditB} className=" size-4" alt="Logo" />
                  Inventory Items </div></Link>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={EditB} className=" size-4" alt="Logo" />
                  Distributors Profiles</div></Link>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={EditB} className=" size-4" alt="Logo" />
                  Suppliers Profiles</div></Link>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={EditB} className=" size-4" alt="Logo" />
                  Staffing</div></Link>

                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={EditB} className=" size-4" alt="Logo" />

                  Items Categories</div></Link>

                {/* Divider Line */}
                <div className="mx-auto w-[90%] border-t border-yellow-400" ></div>
                {/* ------------------------------------------------------------------------- */}
                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}>
                  {/* <BsNewspaper /> */}
                  <img src={EditA} className=" size-4" alt="Logo" />

                  Chart of Accounts</div></Link>

              </div>
            </Accordion>
            {/* End: -----------Card ----------------------  */}




            {/* Start: -----------Card for  House Keeping  ----------------------  */}
            <Accordion title={'House Keeping'}
              AlwaysOpen={false}
              DefaultOpen={!IsMobile}    //false for IsMobile, true for Desktops etc
              content={''}
              title_icon={<FaLaptopHouse />}

              header={<div className='flex items-center gap-2' >
                <span className="  "><img src={Img4HK} className=" size-7" alt="Logo" /></span> <span className=' text-black'>
                  House Keeping</span>
                {/* <span className="  "><BsNewspaper /></span> <span className=' text-black'>tran {`CrntWindow:${CrntWindow.width}, IsMobile?: ${IsMobile ?'TRUE': 'FALSE'} `}</span> */}
              </div>
              }

              ExtraCSS4Header='py-1 px-4 text-2xl md:text-xl bg-slate-700/10 '
              ExtraCSS4Div=' flex flex-col gap-1 border-2 border-gray-400 shadow-lg rounded-md bg-white/50'
              ExtraCSS4Content=''
            >

              {/* Card Body */}
              <div className='mx-2 mb-2 mt-1 p-2  bg-slate-100/10 shadow-lg rounded-lg border border-gray-300 flex flex-col gap-1 '
                onClick={() => setIsOpen(!isOpen)}
              >
                {/* <div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}><BsNewspaper /> Sales Invoices </div> */}
                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}><BsNewspaper />Backup Procedure </div></Link>
                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}><BsNewspaper />Accidental Restore</div></Link>

                {/* Divider Line */}
                <div className="mx-auto w-[90%] border-t border-yellow-400" ></div>
                {/* ------------------------------------------------------------------------- */}
                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}><BiCog />System Settings</div></Link>

              </div>
            </Accordion>
            {/* End: -----------Card ----------------------  */}


            {/* Start: -----------Card for Secutity/Administration  ----------------------  */}
            <Accordion title={'Security/Administration'}
              AlwaysOpen={false}
              DefaultOpen={false}    //false for IsMobile, true for Desktops etc
              content={''}
              title_icon={<BsNewspaper />}

              header={<div className='flex items-center gap-3' >
                <span className="  "><GiArrowsShield /></span> <span className=' text-black'>Security/Administration</span>
                {/* <span className="  "><BsNewspaper /></span> <span className=' text-black'>Business {`CrntWindow:${CrntWindow.width}, IsMobile: ${IsMobile}, IsMobile?: ${IsMobile ?'TRUE': 'FALSE'} `}</span> */}
              </div>
              }

              ExtraCSS4Header='py-1 px-4 text-2xl md:text-xl bg-slate-700/10 '
              ExtraCSS4Div=' flex flex-col gap-1 border-2 border-gray-400 shadow-lg rounded-md bg-white/50'
              ExtraCSS4Content=''
            >

              {/* Card Body */}
              <div className='mx-2 mb-2 mt-1 p-2  bg-slate-100/10 shadow-lg rounded-lg border border-gray-300 flex flex-col gap-1 '
                onClick={() => setIsOpen(!isOpen)}
              >
                {/* <div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}><BsNewspaper /> Sales Invoices </div> */}
                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}><BsNewspaper />System Sign out </div></Link>
                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}><BsNewspaper />Users Signin</div></Link>
                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}><BsNewspaper />Users Signup</div></Link>
                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}><BsNewspaper />Change Password</div></Link>
                <Link to={'/'}><div className={"my-0 flex gap-3 items-center border-b rounded-md bg-gradient-to-l " + `${'from-' + BgColors.BgColorNames[RandomNumberInRange(0, BgColors.BgColorNames.length - 1)] + '-200'} `}><BsNewspaper />System Users</div></Link>

              </div>
            </Accordion>
            {/* End: -----------Card ----------------------  */}

            {/*========= End Col3 ====================== */}
          </div>
          {/*========= End Col3 ====================== */}

        </div >

        // {/* **************************** */}
        //    END ---  [ NAV MAGA MENU]
        // {/* **************************** */}
      }

    </div >
  );
}


