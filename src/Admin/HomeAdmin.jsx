import React, { useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

// import './Dashboard.css';
// import './FloatInputs.css'

// import Mainbody from './Components/MainBody/Mainbody.jsx';
// import Rightbar from './Components/RightBar/Rightbar.jsx';
// import Sidebar from './Components/Sidebar/Sidebar.jsx';

// import PortalUsers from './Pages/Users/PortalUsers';
// import About from '../Pages/AboutUs/About';

import DashboardBackgroudImg from '../SiteImages/Default/DashboardBackgroudImg.jpg'
import Logo from '../SiteImages/Logo.jpg'
import LogoUnderConstruction from '../SiteImages/UnderConstruction.avif'

import { useCtxMainContextHook } from '../CtxMain';


const XSignInFormX = () => (<span>SignInForm</span>);
const XNewPasswordX = () => (<span>NewPassword </span>);



export default function HomeAdmin() {

  // const { CtxMainState, CtxMainDispatch } = useCtxMainContextHook()


  // useEffect(() => {
  //   CtxMainDispatch({ type: 'DOCTORS_RELOAD' })
  //   // alert(CtxMainState._DocsRef.length)

  // }, [CtxMainDispatch])


  return (
    <div className='d-flex flex-column justify-content-center align-items-center  dashboardX'>
      {/* XSignInFormX */}
      {/* <h1>Dashboard is here</h1> */}

      {/* {console.log('HomeAdmin--- CtxMainState._DocsRef: ',CtxMainState._DocsRef)} */}
      {/* HomeAdmin---Total Doctors are: {CtxMainState._DocsRef.length}  */}
      {/* HomeAdmin---Current Docs   at: {CtxMainState._D} */}

      {/* {CtxMainState._DocsRef && CtxMainState._DocsRef.map((E, I) => <div>E.Title</div>)} */}



      {/* *******[   Eye GREY/Dim  ]********** */}
      <div className='d-flex'>
        {/* <div className='d-flex flex-column justify-content-center align-items-center '
          style={{ border: '1px solid silver', backgroundColor: 'Gainsboro', borderRadius: '50%', width: '30px', height: '30px' }}>

          <div className='d-flex flex-column justify-content-end align-items-center'
            style={{ border: '0px solid Gainsboro', backgroundColor: 'white', borderRadius: '50%', width: '80%', height: '80%' }}>
            <div className='d-flex flex-column justify-content-end align-items-center'
              style={{ border: '1px solid Silver', backgroundColor: 'Gainsboro', marginBottom: '-1px', borderRadius: '50%', width: '60%', height: '60%' }}>

              <div
                style={{ border: '0px solid Silver', backgroundColor: 'Gainsboro', marginBottom: '0px', borderRadius: '50%', width: '100%', height: '100%' }}>

              </div>
            </div>
          </div>
        </div> */}


        {/* *******[   Eye BLACK  ]********** */}
        {/* <div className='d-flex flex-column justify-content-center align-items-center '
          style={{ border: '1px solid Silver', backgroundColor: 'black', borderRadius: '50%', width: '30px', height: '30px' }}>

          <div className='d-flex flex-column justify-content-end align-items-center'
            style={{ border: '1px solid Silver', backgroundColor: 'white', borderRadius: '50%', width: '80%', height: '80%' }}>

            <div className='d-flex flex-column justify-content-end align-items-center'
              style={{ border: '0px solid Silver', backgroundColor: 'beige', marginBottom: '-2px', borderRadius: '50%', width: '60%', height: '60%' }}>

              <div
                style={{ border: '1px solid black', backgroundColor: 'black', marginBottom: '-1px', borderRadius: '50%', width: '100%', height: '100%' }}>

              </div>
            </div>
          </div>
        </div> */}

        {/* *******[   Eye RED  ]********** */}
        {/* <div className='d-flex flex-column justify-content-center align-items-center '
          style={{ border: 'px solid Silver', backgroundColor: 'red', borderRadius: '50%', width: '30px', height: '30px' }}>

          <div className='d-flex flex-column justify-content-end align-items-center'
            style={{ border: '0px solid Silver', backgroundColor: 'white', borderRadius: '50%', width: '80%', height: '80%' }}>

            <div className='d-flex flex-column justify-content-end align-items-center'
              style={{ border: '0px solid Silver', backgroundColor: 'red', marginBottom: '0px', borderRadius: '50%', width: '60%', height: '60%' }}>

              <div
                style={{ border: '0px solid black', backgroundColor: 'red', marginBottom: '-1px', borderRadius: '50%', width: '100%', height: '100%' }}>

              </div>
            </div>
          </div>
        </div> */}
        {/* *******[ END  Eye RED  ]********** */}


        {/* <div className='d-flex flex-column justify-content-center align-items-center '
          style={{ border: '1px solid Silver', backgroundColor: 'White', borderRadius: '50%', width: '30px', height: '30px' }}>

          <div className='d-flex flex-column justify-content-end align-items-center'
            style={{ border: '1px solid Silver', backgroundColor: 'white', borderRadius: '50%', width: '82%', height: '82%' }}>
            <div className='d-flex flex-column justify-content-end align-items-center'
              style={{ border: '1px solid Silver', backgroundColor: 'beige', marginBottom: '-2px', borderRadius: '50%', width: '60%', height: '60%' }}>

              <div
                style={{ border: '1px solid Silver', backgroundColor: 'white', marginBottom: '-2px', borderRadius: '50%', width: '100%', height: '100%' }}>

              </div>
            </div>
          </div>
        </div> */}

      </div>

      {/* ....................................... */}
      <div className='d-flex'>
        {/* <div className='d-flex flex-column justify-content-center align-items-center '
          style={{ border: '1px solid Gainsboro', backgroundColor: 'WhiteSmoke', borderRadius: '50%', width: '200px', height: '200px' }}>

          <div className='d-flex flex-column justify-content-end align-items-center'
            style={{ border: '1px solid Gainsboro', backgroundColor: 'white', borderRadius: '50%', width: '82%', height: '82%' }}>
            <div className='d-flex flex-column justify-content-end align-items-center'
              style={{ border: '0px solid Gainsboro', backgroundColor: 'WhiteSmoke', marginBottom: '-15px', borderRadius: '50%', width: '60%', height: '60%' }}>

            </div>
          </div>
        </div> */}

        {/* <div className='d-flex flex-column justify-content-center align-items-center '
          style={{ border: '1px solid Silver', backgroundColor: 'White', borderRadius: '50%', width: '200px', height: '200px' }}>

          <div className='d-flex flex-column justify-content-end align-items-center'
            style={{ border: '1px solid Silver', backgroundColor: 'white', borderRadius: '50%', width: '82%', height: '82%' }}>
            <div className='d-flex flex-column justify-content-end align-items-center'
              style={{ border: '1px solid Silver', backgroundColor: 'beige', marginBottom: '-15px', borderRadius: '50%', width: '60%', height: '60%' }}>

              <div
                style={{ border: '1px solid Silver', backgroundColor: 'white', marginBottom: '-2px', borderRadius: '50%', width: '100%', height: '100%' }}>

              </div>
            </div>
          </div>
        </div> */}

        {/* <div className='d-flex flex-column justify-content-center align-items-center '
          style={{ border: '1px solid Silver', backgroundColor: 'black', borderRadius: '50%', width: '200px', height: '200px' }}>

          <div className='d-flex flex-column justify-content-end align-items-center'
            style={{ border: '1px solid Silver', backgroundColor: 'white', borderRadius: '50%', width: '82%', height: '82%' }}>

            <div className='d-flex flex-column justify-content-end align-items-center'
              style={{ border: '0px solid Silver', backgroundColor: 'beige', marginBottom: '-15px', borderRadius: '50%', width: '60%', height: '60%' }}>

              <div
                style={{ border: '1px solid black', backgroundColor: 'black', marginBottom: '-2px', borderRadius: '50%', width: '100%', height: '100%' }}>

              </div>
            </div>
          </div>
        </div> */}
      </div>
      {/* ===================================================== */}


      {/* <Mainbody/> */}
      <div style={{ marginTop: '30px' }}>

        <div className='d-flex  text-end gap-2 justify-content-end align-items-center'>
          <div className='mb-2'>
            <h1 > Consultancy & Diagnostics <br /> Management Information System </h1>
          </div>
          <div>
            <img src={LogoUnderConstruction}  height={100} width={150} alt="UC" />
          </div>
        </div>

        <div className='card shadow-lg' style={{ fontFamily: 'initial' }}>
          <div className='d-flex p-4 gap-4 justify-content-center align-items-center ' >
            <div className=''>
              <img src={Logo} alt={'logo'} height={300} width={400} />
            </div>
            <div className={'d-flex flex-column justify-content-center align-items-center'} style={{ fontSize: '48px' }}>
              <div>WAVELAZ<div>
              </div> Diagnostic </div>
              <div>& </div>
              <div>Refrective Surgery</div>
              <div>Centre</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

