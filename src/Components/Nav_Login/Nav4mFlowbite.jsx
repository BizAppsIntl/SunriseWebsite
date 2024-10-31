
// import Link from "next/link";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

// import Signin from '@/app/Pages/Signin/SigninCard'

// import { useRouter } from 'next/navigation'



const handleRedirect = () => {
  window.location.href = 'https://sunrisewebapp.vercel.app'; // open the external URL in the current tab

  // window.open('https://example.com', '_blank'); // open the external URL in the other tab

  // //Optionally, you can add a third argument, 'noopener noreferrer', to enhance security
  //window.open('https://example.com', '_blank', 'noopener noreferrer');

  //  noopener: prevents the new page from gaining a reference to the originating page. Without this, the new tab can access the original tab via window.opener.
  //  noreferrer: also blocks the referer header from being sent, so the new page cannot see the originating page's URL in the HTTP request headers.
  //Adding these options enhances security by ensuring that the new tab can't interact with the original page, which is especially important when linking to third-party or untrusted websites.

};



export default function Nav4mFlowbite() {
  // const router = useRouter()
  return (
    // <Navbar fluid rounded className="py-1">     
    // <Navbar className="py-1 border-b-2 w-full "> with px-wide...
    // <Navbar fluid className="py-1 border-b-2 w-full ">
    <Navbar className="py-1 border-b-2 w-full ">

      {/* <Navbar.Brand href="/" className="flex" data-tooltip-target="tooltip-signin" data-tooltip-placement="left"  > */}
      <Navbar.Brand className="flex" data-tooltip-target="tooltip-signin" data-tooltip-placement="left"
        // onClick={()=>handleRedirect()} 
      >
        <Link to="/">
          <div >
            <div className="flex gap-1 md:gap-3 items-center ">
              <img src="/Images/SunriseLogo.jpg" className="h-8 sm:h-9 md:h-12" alt="Flowbite React Logo" 
                      onDoubleClick={() => handleRedirect()}
              />
              <div className="self-center whitespace-nowrap text-xl md:text-3xl leading-none font-poppins  tracking-wide ">
                Sunrise Dairy <span className=" font-thin hidden md:inline" >Pvt Ltd</span>
                </div>
              {/* <div className="flex flex-col text-left justify-center">
              <div className="whitespace-nowrap text-3xl leading-none font-semibold tracking-widest ">Sunrise</div>
              <div className="whitespace-nowrap text-gray-700 hidden md:block text-sm md:text-base ">Diagnostic & Refrective Surgery Center</div>
            </div> */}
            </div>

            {/* <div className="self-center whitespace-nowrap text-gray-700 md:hidden block text-sm md:text-base ">Diagnostic & Refrective Surgery Center</div> */}
            {/* <div className="text-left self-center whitespace-nowrap text-gray-700 md:hidden block text-sm md:text-base ">Diagnostic & Refrective Surgery Center</div> */}
          </div>


          <div id="tooltip-signin" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Sign Out
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </Link>
      </Navbar.Brand>


      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        {/* <Navbar.Link href="/Services">Services</Navbar.Link> */}


        {/* <Navbar.Link href="/Items">Items</Navbar.Link>
        <Navbar.Link href="/About">About Us</Navbar.Link>
        <Navbar.Link href="/Contact">Contact Us</Navbar.Link> */}
        <Link to="/Items">Products</Link>
        <Link to="/About">About Us</Link>
        <Link to="/Contact">Contact Us</Link>

        {/* <div className="my-2 mx-3 md:m-0">
          <Dropdown
            arrowIcon={true}
            inline
            label={'Admin Panel'}
          >
            <Dropdown.Header>
                <span className="block text-sm">Mufakhar Adaam</span>
                <span className="block truncate text-sm font-medium">Mufakhar@BizApps.pk</span>
              </Dropdown.Header> 
            <Dropdown.Item href="/Sales">Sales Invoices</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/Receipts">Collection Receipts</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/Items">Items Detail</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/Distributors">Distributors Profiles</Dropdown.Item>
            <Dropdown.Item href="/Vendors">Vendors Profiles</Dropdown.Item>
          </Dropdown>
        </div> */}

      </Navbar.Collapse>

      <Navbar.Toggle />
    </Navbar>
  );
}



