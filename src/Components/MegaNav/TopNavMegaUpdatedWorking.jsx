import React, { useEffect, useState } from 'react';

// import Link from 'next/link';
// import Image from 'next/image';

import { Link } from "react-router-dom";
// {/* <Link to={user.id}>{user.name}</Link> */}

// import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Dropdown } from "flowbite-react";

import logo from '../../SiteImages/BizApps.jpg'
// import WaterMark from '@/public/SiteImages/Default/UC-7.jpg'

import { FaFolderTree } from "react-icons/fa6";
import { MdFolderOff } from "react-icons/md";
import { MdOutlineFolderOff } from "react-icons/md";


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
// 19 colors
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
const randomNumberInRange = (min, max) => {
  return Math.floor(Math.random()
    * (max - min + 1)) + min;
};

// ************************ Start Program *******************************************
export default function TopNavMega() {
  const [isOpen, setIsOpen] = useState(false);
  const [CrntWindow, setCrntWindow] = useState(getCurrentWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setCrntWindow(getCurrentWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  let clr = 0
  return (
    <>
      <nav className="py-0 px-2 md:px-4 w-full flex items-center  text-black border-b shadow-md">

        {/* <div > */}
        <Link to='/'>
          <div className="flex gap-1 md:gap-3 items-center ">
            <img src="/Images/SunriseLogo.jpg" className="h-8 md:h-[38px]" alt="Logo" />
            <div className="self-center whitespace-nowrap text-3xl leading-none font-poppins tracking-wide ">
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
        <div className={`flex  ${isOpen ? "block" : "hidden"}`}      >
          <div className='group '>
            <button>Options {CrntWindow.width}</button>
            <ul className="hidden group-hover:block bg-white absolute   p-3 text-black shadow-lg rounded">
              <li className=" px-2 h-8 flex justify-between items-center rounded-md hover:bg-black/30"> Check Check Item 1</li>
              <li className=" px-2 h-8 flex justify-between items-center rounded-md hover:bg-black/30"> Check Check Item disp;ay2</li>
              <li className=" px-2 h-8 flex justify-between items-center rounded-md hover:bg-black/30"> Check Check Item 3</li>
            </ul>
          </div>
        </div>
        {/* END--- Options */}




        <div className="text-sm flex gap-2 md:gap-4 ms-auto me-4">
          <Link to="/Home" className='hidden md:inline'>Home</Link>
          <Link to="/Dashboard">Dashboard</Link>
        </div>





        {/* <div className='flex gap-3 items-center '> */}
          {/* OPEN/CLOSE Mega Menu */}
          <button className=" me-4 font-bold   text-black" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <MdOutlineFolderOff className="w-[28px] h-[28px] text-red-700" /> : <FaFolderTree className="w-[28px] h-[28px] text-blue-700" />}
          </button>
        {/* </div> */}

        {/* LOGGED-IN USER ====================================== */}
        {/* for MD appears at end */}
        {/* <div className="flex gap-1 align-middle md:order-2"> */}
        <div className="flex gap-1 ">

          <div className='md:ps-3 md:pe-2 z-50  flex justify-between gap-1 h-[35px]  overflow-visible  md:bg-slate-300 md:rounded-3xl'>

            <Dropdown
              arrowIcon={false}
              inline
              label={
                <div className='my-auto leading-none hidden md:block'>
                  <span className='block font-bold ' >Mufakhar</span> <span className='text-xs text-slate-600'>The Developer</span>
                </div>
              }
            >
              <Dropdown.Header>
                {/* <Signin /> */}
                Signin Window
              </Dropdown.Header>

            </Dropdown>

            {/* ************ AVATAR for User ************** */}
            <div className="my-auto  md:mt-[-2px]">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  // <Avatar alt="User settings" className="h-9" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />                  
                  <img className="w-[50px] h-[50px] rounded-full border-4 border-slate-300" src="/Images/Users/User2015-11-19.jpg" alt="avatar" />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">User Profile</span>
                  <span className="block truncate text-sm font-medium">Mufakhar@BizApps.pk</span>
                </Dropdown.Header>
                {/* <Dropdown.Item href="@/app/(routes)/Signin/Signin" >Dashboard</Dropdown.Item> */}

                <Dropdown.Item href={`/Security/Signin`}>
                  Sign In
                </Dropdown.Item>


                <Dropdown.Item href={`/Dashboard`}>Item-href Dashboard</Dropdown.Item>
                <Dropdown.Item><Link to="/Dashboard" > Item-Link Dashboard</Link> </Dropdown.Item>
                <Link to="/Dashboard" > <Dropdown.Item>Link-Item Dashboard</Dropdown.Item></Link>


                <Dropdown.Item>Change Pass Code</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Sign out</Dropdown.Item>
              </Dropdown>
            </div>
          </div>

        </div>
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
          className={
            "mt-1 w-full md:w-[75%] mx-auto grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-2 "
            + " bg-[image:var(--image-urlBase)] bg-no-repeat bg-center "
            + " hover:bg-[image:var(--image-urlHover)]  focus:bg-[image:var(--image-urlHover)] hover:bg-top hover:z-50 hover:bg-contain "
          }
        // + " hover:bg-[image: `url(${'/SiteImages/Default/UC-5.png'})`] " } 
        >

          {/*========= Col1 ====================== */}
          <div className=' flex flex-col gap-2' >

            {/* Start: -----------Card for Secutity/Administration  ----------------------  */}
            <div className=' flex flex-col gap-1 border-2 border-gray-400 shadow-lg rounded-md bg-white/50'>

              {/* Card Header */}
              <div className='py-1 px-4 w-full text-2xl bg-slate-700/10 flex items-center gap-3'>
                <span className="  "><BsNewspaper /></span> <span className=' text-blue-700'>Hot links {CrntWindow.width} </span>
              </div>

              {/* Card Body */}
              <div className='p-2 bg-slate-100/10'>
                <div className='p-2 bg-slate-100/10 shadow-lg rounded-lg border border-gray-300 flex flex-col gap-1 '>

                  <div className='px-2 flex flex-col ' onClick={() => setIsOpen(!isOpen)}>
                    <div className='my-1 flex gap-3 items-center border-b'><BsNewspaper /><Link to={'/Pages/About'}>Business Dashboad</Link></div>

                    {/* Divider Line */}
                    <div className="mx-auto w-[90%] border-t border-amber-400" ></div>

                    <div className='my-1 flex gap-3 items-center border-b'><BsNewspaper /><Link to={'/Pages/About'}>Sales Invoices </Link></div>
                    <div className='my-1 flex gap-3 items-center border-b'><BsNewspaper /><Link to={'/Pages/Items'}>Pruchase Items</Link></div>

                    {/* Divider Line */}
                    <div className="mx-auto w-[90%] border-t border-blue-400" ></div>
                    {/* ------------------------------------------------------------------------- */}

                    <div className='my-1 flex gap-3 items-center border-b'><BsNewspaper /><Link to={'/Pages/About'}>Customer Profiles</Link></div>

                    {/* Divider Line */}
                    <div className="mx-auto w-[90%] border-t border-blue-400" ></div>
                    {/* ------------------------------------------------------------------------- */}

                    <div className='my-1 flex gap-3 items-center border-b'><BsNewspaper /><Link to={'/Pages/Suppliers'}>Vender Profiles</Link></div>

                  </div>
                </div>

              </div>
            </div>
            {/* End: -----------Card ----------------------  */}

            {/* Start: -----------Card for Transaction  ----------------------  */}
            {/* Card for Transaction  */}
            <div className=' flex flex-col gap-1 border-2 border-gray-400 shadow-lg rounded-md bg-white/50'>

              {/* Card Header */}
              <div className='py-1 px-4 w-full text-2xl bg-slate-700/10 flex items-center gap-3'>
                <span className="  "><BsNewspaper /></span> <span className=' text-blue-700'>Transactions</span>
              </div>

              {/* Card Body */}
              <div className='p-2 bg-slate-100/10'>
                <div className='p-2 bg-slate-100/10 shadow-lg rounded-lg border border-gray-300 flex flex-col gap-1 '>
                  <Accordion title={'Transaction1 Entries'}
                    ExtraCSS4Div='border-indigo-300 rounded' ExtraCSS4Header='text-black bg-gradient-to-l from-indigo-300' ExtraCSS4Content=''
                    content={''}
                    title_icon={<BsNewspaper />}

                  > <div className='flex flex-col' onClick={() => setIsOpen(!isOpen)}>
                      <Link to={'/Pages/About'}>About Us0</Link>
                      <Link to={'/Pages/About'}>About Us1</Link>
                      <Link to={'/Pages/About'}>About Us2</Link>
                      <Link to={'/Pages/About'}>About Us3</Link>
                      <Link to={'/Pages/About'}>About Us4</Link>
                    </div>
                  </Accordion>


                  <Accordion title={'Transaction2 Entries'}
                    ExtraCSS4Div='border-pink-300 rounded' ExtraCSS4Header='text-black bg-gradient-to-l from-pink-300' ExtraCSS4Content=''
                    content={'adfskjkl'}

                  > <div>content here</div>
                  </Accordion>

                  <Accordion title={'Transaction2 Entries'}
                    ExtraCSS4Div='border-lime-300 rounded' ExtraCSS4Header='text-black bg-gradient-to-l from-lime-300' ExtraCSS4Content=''
                    content={'adfskjkl'}

                  > <div>content here</div>
                  </Accordion>

                  <Accordion title={'Transaction2 Entries'}
                    ExtraCSS4Div='border-cyan-300 rounded' ExtraCSS4Header='text-black bg-gradient-to-l from-cyan-300' ExtraCSS4Content=''
                    content={'adfskjkl'}

                  > <div>content here</div>
                  </Accordion>

                  <Accordion title={'Transaction2 Entries'}
                    ExtraCSS4Div='border-amber-300 rounded' ExtraCSS4Header='text-black bg-gradient-to-l from-amber-300' ExtraCSS4Content=''
                    content={'adfskjkl'}

                  > <div>content here</div>
                  </Accordion>


                </div>
              </div>
            </div>
            {/* End: -----------Card ----------------------  */}

          </div>
          {/*========= End Col1 ====================== */}

          {/*========= Col2 ====================== */}
          <div className='flex flex-col gap-2' >

            {/* Start: -----------Card for Testing   ----------------------  */}
            <Accordion title={'Main Testng Entries'}
              AlwaysOpen={true}
              DefaultOpen={false}

              header={<div className='flex items-center gap-3' >
                <span className="  "><BsNewspaper /></span> <span className=' text-blue-700'>Hot Links 2</span>
              </div>
              }
              
              ExtraCSS4Header='py-1 px-4 text-2xl bg-slate-700/10 '
              ExtraCSS4Div=' flex flex-col gap-1 border-2 border-gray-400 shadow-lg rounded-md bg-white/50'
              ExtraCSS4Content=''
              content={''}
              title_icon={<BsNewspaper />}

            > 


 {/* Card Body */}
 <div className='p-2 bg-slate-100/10'>
                <div className='p-2 bg-slate-100/10 shadow-lg rounded-lg border border-gray-300 flex flex-col gap-1 '>

                  <div className='px-2 flex flex-col ' onClick={() => setIsOpen(!isOpen)}>
                    <div className='my-1 flex gap-3 items-center border-b'><BsNewspaper /><Link to={'/Dashboard'}>Business Dashboad</Link></div>

                    {/* Divider Line */}
                    <div className="mx-auto w-[90%] border-t border-amber-400" ></div>

                    <div className='my-1 flex gap-3 items-center border-b'><BsNewspaper /><Link to={'/Pages/About'}>Sales Invoices </Link></div>
                    <div className='my-1 flex gap-3 items-center border-b'><BsNewspaper /><Link to={'/Pages/Items'}>Pruchase Items</Link></div>

                    {/* Divider Line */}
                    <div className="mx-auto w-[90%] border-t border-blue-400" ></div>
                    {/* ------------------------------------------------------------------------- */}

                    <div className='my-1 flex gap-3 items-center border-b'><BsNewspaper /><Link to={'/Pages/About'}>Customer Profiles</Link></div>

                    {/* Divider Line */}
                    <div className="mx-auto w-[90%] border-t border-blue-400" ></div>
                    {/* ------------------------------------------------------------------------- */}

                    <div className='my-1 flex gap-3 items-center border-b'><BsNewspaper /><Link to={'/Pages/Suppliers'}>Vender Profiles</Link></div>

                  </div>
                </div>

              </div>              
            </Accordion>




            {/* Start: -----------Card for Reports  ----------------------  */}
            <div className=' flex flex-col gap-1 border-2 border-gray-400 shadow-lg rounded-md bg-white/50'>

              {/* Card Header */}
              <div className='py-1 px-4 w-full text-2xl bg-slate-700/10 flex items-center gap-3'>
                <span className="  "><BsNewspaper /></span> <span className=' text-blue-700'>Reports</span>
              </div>

              {/* Card Body */}
              <div className='p-2 bg-slate-100/10'>
                <div className='p-2 bg-slate-100/10 shadow-lg rounded-lg border border-gray-300 flex flex-col gap-1 '>

                  <Accordion title={'Group 1 of Reports'}
                    ExtraCSS4Div='border-purple-300 rounded' ExtraCSS4Header='text-black bg-gradient-to-l from-purple-300' ExtraCSS4Content=''
                    content={''}

                  > <div className='flex flex-col' onClick={() => setIsOpen(!isOpen)}>
                      <Link to={'/Pages/About'}>About Us0</Link>
                      <Link to={'/Pages/About'}>About Us1</Link>
                      <Link to={'/Pages/About'}>About Us2</Link>
                      <Link to={'/Pages/About'}>About Us3</Link>
                      <Link to={'/Pages/About'}>About Us4</Link>
                    </div>
                  </Accordion>


                  <Accordion title={'Group 2 of Reports'}
                    ExtraCSS4Div='border-yellow-300 rounded' ExtraCSS4Header='text-black bg-gradient-to-l from-yellow-300' ExtraCSS4Content=''
                    content={'adfskjkl'}

                  > <div>content here</div>
                  </Accordion>

                  <Accordion title={'Group 3 of Reports'}
                    ExtraCSS4Div='border-blue-300 rounded' ExtraCSS4Header='text-black bg-gradient-to-l from-blue-300' ExtraCSS4Content=''
                    content={'adfskjkl'}

                  > <div>content here</div>
                  </Accordion>

                  <Accordion title={'Group 4 of Reports'}
                    ExtraCSS4Div='border-orange-300 rounded' ExtraCSS4Header='text-black bg-gradient-to-l from-orange-300' ExtraCSS4Content=''
                    content={'adfskjkl'}

                  > <div>content here</div>
                  </Accordion>

                  <Accordion title={'Group 5 of Reports'}
                    ExtraCSS4Div='border--green-300 rounded' ExtraCSS4Header='text-black bg-gradient-to-l from-green-300' ExtraCSS4Content=''
                    content={'adfskjkl'}

                  > <div>content here</div>
                  </Accordion>


                  <Accordion title={'Group 6 of Reports'} content={'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur maxime, obcaecati exercitationem asperiores debitis voluptatum fuga? Doloribus, doloremque suscipit dignissimos ipsum reprehenderit ea, alias quae maxime fugiat ratione architecto inventore.'} />
                  <Accordion title={'Group 7 of Reports'} content={'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur maxime, obcaecati exercitationem asperiores debitis voluptatum fuga? Doloribus, doloremque suscipit dignissimos ipsum reprehenderit ea, alias quae maxime fugiat ratione architecto inventore.'} />
                  <Accordion title={'Group 8 of Reports'} content={'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur maxime, obcaecati exercitationem asperiores debitis voluptatum fuga? Doloribus, doloremque suscipit dignissimos ipsum reprehenderit ea, alias quae maxime fugiat ratione architecto inventore.'} />
                </div>
              </div>
            </div>
          </div>
          {/*========= End Col2 ====================== */}

          {/*========= Col3 ====================== */}
          <div className=' flex flex-col gap-2' >

            {/* Start: -----------  Card for Maintenance  ----------------------  */}
            {/* */}
            <div className=' flex flex-col gap-1 border-2 border-gray-400 shadow-lg rounded-md bg-white/50'>

              {/* Card Header */}
              <div className='py-1 px-4 w-full text-2xl bg-slate-700/10 flex items-center gap-3'>
                <span className="  "><BsNewspaper /></span> <span className=' text-blue-700'>Maintenance</span>
              </div>

              {/* Card Body */}
              <div className='p-2 bg-slate-100/10'>
                <div className='p-2 bg-slate-100/10 shadow-lg rounded-lg border border-gray-300 flex flex-col gap-1 '>
                  <Accordion title={'Maintenance Entries Group 1'}
                    ExtraCSS4Div='border-indigo-300 rounded' ExtraCSS4Header='text-black bg-gradient-to-l from-indigo-300' ExtraCSS4Content=''
                    content={''}

                  > <div className='flex flex-col' onClick={() => setIsOpen(!isOpen)}>
                      <Link to={'/Pages/About'}>About Us0</Link>
                      <Link to={'/Pages/About'}>About Us1</Link>
                      <Link to={'/Pages/About'}>About Us2</Link>
                      <Link to={'/Pages/About'}>About Us3</Link>
                      <Link to={'/Pages/About'}>About Us4</Link>
                    </div>
                  </Accordion>


                  <Accordion title={'Maintenance Entries Group 1'}
                    ExtraCSS4Div='border-red-300 rounded' ExtraCSS4Header='text-black bg-gradient-to-l from-red-300' ExtraCSS4Content=''
                    content={'adfskjkl'}

                  > <div>content here</div>
                  </Accordion>

                  <Accordion title={'Maintenance Entries Group 1'}
                    ExtraCSS4Div='border-blue-300 rounded' ExtraCSS4Header='text-black bg-gradient-to-l from-blue-300' ExtraCSS4Content=''
                    content={'adfskjkl'}

                  > <div>content here</div>
                  </Accordion>

                </div>
              </div>
            </div>
            {/* End: -----------Card ----------------------  */}

            {/* Start: -----------Card for  House Keeping  ----------------------  */}
            <div className=' flex flex-col gap-1 border-2 border-gray-400 shadow-lg rounded-md bg-white/50'>

              {/* Card Header */}
              <div className='py-1 px-4 w-full text-2xl bg-slate-700/10 flex items-center gap-3'>
                <span className="  "><BsNewspaper /></span> <span className=' text-blue-700'>House Keeping</span>
              </div>

              {/* Card Body */}
              <div className='p-2 bg-slate-100/10'>
                <div className='p-2 bg-slate-100/10 shadow-lg rounded-lg border border-gray-300 flex flex-col gap-1 '>
                  <Accordion title={'Transaction1 Entries'}
                    ExtraCSS4Div='border-indigo-300 rounded' ExtraCSS4Header='text-black bg-gradient-to-l from-indigo-300' ExtraCSS4Content=''
                    content={''}

                  > <div className='flex flex-col' onClick={() => setIsOpen(!isOpen)}>
                      <Link to={'/Pages/About'}>About Us0</Link>
                      <Link to={'/Pages/About'}>About Us1</Link>
                      <Link to={'/Pages/About'}>About Us2</Link>
                      <Link to={'/Pages/About'}>About Us3</Link>
                      <Link to={'/Pages/About'}>About Us4</Link>
                    </div>
                  </Accordion>


                  <Accordion title={'Transaction2 Entries'}
                    ExtraCSS4Div='border-yellow-300 rounded' ExtraCSS4Header='text-black bg-gradient-to-l from-yellow-300' ExtraCSS4Content=''
                    content={'adfskjkl'}

                  > <div>content here</div>
                  </Accordion>

                  <Accordion title={'Transaction2 Entries'}
                    ExtraCSS4Div='border-green-300 rounded' ExtraCSS4Header='text-black bg-gradient-to-l from-green-300' ExtraCSS4Content=''
                    content={'adfskjkl'}

                  > <div>content here</div>
                  </Accordion>
                </div>
              </div>
            </div>

            {/* Start: -----------Card for Secutity/Administration  ----------------------  */}
            <div className=' flex flex-col gap-1 border-2 border-gray-400 shadow-lg rounded-md bg-white/50'>

              {/* Card Header */}
              <div className='py-1 px-4 w-full text-2xl bg-slate-700/10 flex items-center gap-3'>
                <span className="  "><BsNewspaper /></span> <span className=' text-blue-700'>Scrurity & Privacy</span>
              </div>

              {/* Card Body */}
              <div className='p-2 bg-slate-100/10'>
                <div className='p-2 bg-slate-100/10 shadow-lg rounded-lg border border-gray-300 flex flex-col gap-1 '>
                  <Accordion title={'Transaction1 Entries'}
                    ExtraCSS4Div='border-teal-300 rounded' ExtraCSS4Header='text-black bg-gradient-to-l from-teal-300' ExtraCSS4Content=''
                    content={''}

                  > <div className='flex flex-col' onClick={() => setIsOpen(!isOpen)}>
                      <Link to={'/Pages/About'}>About Us0</Link>
                      <Link to={'/Pages/About'}>About Us1</Link>
                      <Link to={'/Pages/About'}>About Us2</Link>
                      <Link to={'/Pages/About'}>About Us3</Link>
                      <Link to={'/Pages/About'}>About Us4</Link>
                    </div>
                  </Accordion>


                </div>
              </div>
            </div>
            {/* End: -----------Card ----------------------  */}

            {/*========= End Col3 ====================== */}
          </div>

        </div>

        // {/* **************************** */}
        //    END ---  [ NAV MAGA MENU]
        // {/* **************************** */}
      }

    </>
  );
}


