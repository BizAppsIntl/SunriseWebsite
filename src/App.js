import React, { useEffect } from 'react'
import logo from './logo.svg';
// import './App.css';
// import { MyNavbar } from './Components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { NavLink, Outlet } from 'react-router-dom'

import axios from 'axios';
import { useCtxMainContextHook } from './CtxMain';
import { AlertRec, GetPositionInStr } from './StdLib';

import FontsTesting from './FontsTesting'
import LayoutLogin from './LayoutLogin'
import Home from './Pages/Home'
import About from './Pages/About'
import ManageItems from './Admin/Pages/Items/Manage';
import { MobApp1 } from './Pages/MobApp1';
import CodeTestPage from './Pages/CodeTestPage';


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


  document.title = "Sun Rise Dairies Pvt Ltd.  Management Information System By BizApps, Multan. Pakistan " + process.env.REACT_APP_API_VER + ' @' + (port === '8088' ? '88' : port)

  const { CtxMainState, CtxMainDispatch } = useCtxMainContextHook()



  // start ==================[  Fn: GET ALL RECORDS  ]=====================
  
  const FetchItems = async () => {
    CtxMainDispatch({ type: 'ITEMS_FETCH_LOADING' })

    try {
      const result = await axios.get(process.env.REACT_APP_API_URL + `Items`
        //   ,
        //   {
        //     headers: {
        //       "access-control-allow-origin" : "*",
        //        'Content-Type': 'application/json'
        //     } 
        //  }
      )
      // AlertRec(result.data, 'Items')
      // console.log('*****************result: ', result); alert(result.data)                    
      CtxMainDispatch({ type: 'ITEMS_FETCH_SUCCESS', payload: result.data })
    } catch (error) {
      CtxMainDispatch({ type: 'ITEMS_FETCH_ERROR', payload: error })
    }
  }
  
  
  const FetchAccRecs = async () => {
    CtxMainDispatch({ type: 'ACCRECS_FETCH_LOADING' })

    try {
      const result = await axios.get(process.env.REACT_APP_API_URL + `AccRec`
        //   ,
        //   {
        //     headers: {
        //       "access-control-allow-origin" : "*",
        //        'Content-Type': 'application/json'
        //     } 
        //  }
      )
      // console.log('*****************result: ', result); alert(result.data)                    
      CtxMainDispatch({ type: 'ACCRECS_FETCH_SUCCESS', payload: result.data })
    } catch (error) {
      CtxMainDispatch({ type: 'ACCRECS_FETCH_ERROR', payload: error })
    }
  }
  

  const FetchCatItems = async () => {
    CtxMainDispatch({ type: 'CATITEMS_FETCH_LOADING' })

    try {
      const result = await axios.get(process.env.REACT_APP_API_URL + `CatItems`
        //   ,
        //   {
        //     headers: {
        //       "access-control-allow-origin" : "*",
        //        'Content-Type': 'application/json'
        //     } 
        //  }
      )
      // console.log('*****************result: ', result); alert(result.data)                    
      CtxMainDispatch({ type: 'CATITEMS_FETCH_SUCCESS', payload: result.data })
    } catch (error) {
      CtxMainDispatch({ type: 'CATITEMS_FETCH_ERROR', payload: error })
    }
  }

  // END ==================[  Fn: GET CURRENT USER  ]=====================


  function getItemsFromLocalStorage() {
    try {
      const items = localStorage.getItem('_USER');
      return JSON.parse(items, null, -1);
    } catch (err) {
      return []
    }
  }


  const GetSysUser = () => {
    // console.log('\n\n\n\n=============================================')
    // console.log('Getting Data from localStorage in App.js: ', localStorage.getItem('_USER'))
    // console.log('JSON.Parse  Data from localStorage in App.js: ', JSON.parse(localStorage.getItem('_USER')))

    var json = ''
    // if (localStorage.getItem('_USER')) {
    //   //    var json = '{ "name": "J\\":ohn Smith" }'
    //   json = localStorage.getItem('_USER')
    //   json.replace(/\\"/g, "\uFFFF");  // U+ FFFF
    //   json = json.replace(/"([^"]+)":/g, '$1:').replace(/\uFFFF/g, '\\\"');
    //   // '{ name: "J\":ohn Smith" }'
    // }

    json=getItemsFromLocalStorage()
    // console.log('Converted JSON from fn in App.js: ', json)

    //CtxMainDispatch({ type: 'SYSUSER_FETCH_LOADING' })
    CtxMainDispatch({
      type: 'SYSUSER_FETCH_SUCCESS',
      // payload: localStorage.getItem('_USER') !== ''? JSON.parse(localStorage.getItem('_USER')) : '' 
      // payload: localStorage.getItem('_USER') ? localStorage.getItem('_USER') : '' 

      payload: json
    })
  }
  // END ==================[  Fn: GET ALL RECORDS  ]=====================

  useEffect(() => {

    // Get sys-user from Previous LocalStorage
    GetSysUser()


    FetchItems()
    // FetchItems4Tauri()


    FetchAccRecs()
    // FetchAccRecs4Tauri()

    FetchCatItems()
    // FetchCatItems4Tauri()

    // alert(CtxMainState._DocsRef.length)

  }, [])

  return (
    <div className="w-full ">
      {/* <FontsTesting /> */}
{/* <MyNavbar/> */}

      <Routes>
        <Route element={<LayoutLogin />}>
          <Route exact path='/' element={<Home />} />
          <Route path='About' element={<About />} />
          <Route path='Contact' element={<Home />} />
          {/* <Route path='Services' element={<Services />} /> */}
          <Route path='Items' element={<ManageItems />} />
          <Route path='Test1' element={<MobApp1 />} />

          <Route path='CodeTestPage' element={<CodeTestPage />} />

          {/* <Route path='Services' element={<About />} /> */}

        </Route>
      </Routes>

    </div>
  );
}

export default App;
