
// import Link from "next/link";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";

// import Signin from '@/app/Pages/Signin/SigninCard'

// import { useRouter } from 'next/navigation'

export default function Nav4mFlowbite() {
  // const router = useRouter()
  return (
    // <Navbar fluid rounded className="py-1"> 
    <Navbar className="py-1 border-b-2 w-full">
      <Navbar.Brand href="/" className="flex" data-tooltip-target="tooltip-signin" data-tooltip-placement="left"  >

        <div >
          <div className="flex gap-1 md:gap-3 items-center ">
            <img src="/Images/SunriseLogo.jpg" className="h-8 sm:h-9 md:h-12" alt="Flowbite React Logo" />
              <div className="self-center whitespace-nowrap text-3xl leading-none font-poppins font-semibold tracking-widest ">
                Sunrise Dairy <span className=" font-thin" >Pvt Ltd</span>
                </div>
            {/* <div className="flex flex-col text-left justify-center">
              <div className="whitespace-nowrap text-3xl leading-none font-semibold tracking-widest ">Sunrise</div>
              <div className="whitespace-nowrap text-gray-700 hidden md:block text-sm md:text-base ">Diagnostic & Refrective Surgery Center</div>
            </div> */}
          </div>

          {/* <div className="self-center whitespace-nowrap text-gray-700 md:hidden block text-sm md:text-base ">Diagnostic & Refrective Surgery Center</div> */}
          <div className="text-left self-center whitespace-nowrap text-gray-700 md:hidden block text-sm md:text-base ">Diagnostic & Refrective Surgery Center</div>
        </div>


        <div id="tooltip-signin" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
          Sign Out
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </Navbar.Brand>

      <div className="flex gap-1 align-middle md:order-2">

        <div className='md:px-3 z-50  flex justify-between gap-1 h-[35px]  overflow-visible  md:bg-slate-300 md:rounded-3xl'>

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
            </Dropdown.Header>

          </Dropdown>

          <div className="my-auto  md:mt-1">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                // <Avatar alt="User settings" className="h-9" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                <span><img className="w-[40px] h-[40px] rounded-full" src="/Users/User2015-11-19.jpg" alt="Rounded avatar" /></span>
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
              <Dropdown.Item>Change Pass Code</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        </div>

        <Navbar.Toggle />
      </div>






      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/About">About</Navbar.Link>
        <Navbar.Link href="/Services">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
        <Navbar.Link href="/Dashboard">Admin Panel</Navbar.Link>
        {/* <Navbar.Link href="/Signin">Sign In</Navbar.Link> */}
      </Navbar.Collapse>


    </Navbar>
  );
}



