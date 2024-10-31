import React, { useEffect } from 'react'
import logo from './logo.svg';
// import './App.css';
// import { MyNavbar } from './Components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { NavLink, Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom';

import { AlertRec, GetPositionInStr } from './StdLib';

import LayoutLogin from './LayoutLogin'
import Home from './Pages/Home'
import About from './Pages/About'
import Items from './Pages/Items';
import Contact from './Pages/Contact';


function App() {
  // now we can call our Command!
  // Right-click the application background and open the developer tools.
  // You will see "Hello, World!" printed in the console!
  // invoke('greet', { name: 'World' })
  // // `invoke` returns a Promise
  // .then((response) => console.log(response))


  // document.title = process.env.REACT_APP_API_URL
  // document.title    = "Consultancy & Diagnostics Management Information System; By BizApps, Multan. Pakistan " + "@"+ process.env.REACT_APP_API_URL.substr(18,4)
  // document.title    = "Consultancy & Diagnostics Management Information System; By BizApps, Multan. Pakistan " + "@"+ process.env.REACT_APP_API_URL.substr(process.env.REACT_APP_API_URL.indexOf('localhost:')+10,4)

  const port = process.env.REACT_APP_API_URL?.substr(GetPositionInStr(process.env.REACT_APP_API_URL, ':', 2) + 1, 4)

  // ORIGINAL WORKING ************************************
  // if (process.env.REACT_APP_API_URL.substr(process.env.REACT_APP_API_URL.indexOf('localhost:') + 10, 4) === '8088')
  //   document.title = "Consultancy & Diagnostics Management Information System; By BizApps, Multan. Pakistan " + process.env.REACT_APP_API_VER
  // else
  //   document.title = "Consultancy & Diagnostics Management Information System; By BizApps, Multan. Pakistan "
  //     + " @" + process.env.REACT_APP_API_URL.substr(process.env.REACT_APP_API_URL.indexOf('localhost:') + 10, 4)


  // document.title = "Sun Rise Dairies Pvt Ltd.  Management Information System By BizApps, Multan. Pakistan " + process.env.REACT_APP_API_VER + ' @' + (port === '8088' ? '88' : port)
  document.title = "Sun Rise Dairies Pvt Ltd. Pakistan "




  // start ==================[  Fn: GET ALL RECORDS  ]=====================
  


  return (
    <div className="w-full ">
      {/* <FontsTesting /> */}
{/* <MyNavbar/> */}

      <Routes>
        <Route element={<LayoutLogin />}>
          <Route exact path='/' element={<Home />} />
          {/* <Route path='Dashboard' element={<Dashboard />} /> */}

          <Route path='Items' element={<Items />} />
          <Route path='About' element={<About />} />
          <Route path='Home' element={<Home />} />
          <Route path='Contact' element={<Contact />} />
          {/* <Route path='Services' element={<Services />} /> */}

          {/* <Route path='Services' element={<About />} /> */}

        </Route>
      </Routes>

    </div>
  );
}

export default App;
