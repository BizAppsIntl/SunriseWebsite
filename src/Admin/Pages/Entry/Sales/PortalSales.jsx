import React from 'react';

import { Container, Row, Col, Tab, Tabs, Nav } from 'react-bootstrap'
// import './tempCSS.css';
import {FaSave,FaUserPlus,FaUserEdit,FaUsers,FaUserCog,FaUsersSlash} from 'react-icons/fa'
import {TfiLayoutAccordionList} from 'react-icons/tfi'
import {TbManualGearbox} from 'react-icons/tb'
import {FaMoneyBill} from 'react-icons/fa'
import {HiOutlineQueueList} from 'react-icons/hi2'

import imgPortal from './AssetsLocal/Images/Trans.png'

// import TranBill from './Tran/TranBill';
import Manage from './Manage';

// import Browse from './Browse';
// import DatabaseRecsSetting from './DatabaseRecsSetting';
// import View from './View';
// import TestingPage2 from './TestingPage2';

export default function PortalSales() {
  return (
    <>
        <Tab.Container defaultActiveKey="Manage">
        {/* <Tab.Container defaultActiveKey="DataSetup"> */}

          <div className="card shadow-lg">
            
            <div className='card-header px-2 py-0  d-flex justify-content-between align-items-center' style={{ height: '35px', backgroundColor:'cadetblue' }}>
             
              <div className="d-flex gap-2 align-items-center ">
                {/* <img className="p-0 m-0" style={{ width: 28, height: 28, borderRadius:'50%' }} src={imgPortal} /> */}
                <img className="p-0 m-0" style={{ width: 28, height: 28 }} src={imgPortal} />
                <div className='fs-3 fw-bold' style={{letterSpacing:'2px'}}> Inventory Sales Portal</div>
                {/* <span className='p-0' style={{ fontSize: '26px', fontWeight: 'bold' }}>
                      Users Management Portal
                </span> */}
              </div>
              <div >
                <Nav variant="pills" className="flex-row align-items-center" >
                  {/* <Nav.Item > <Nav.Link eventKey="Browse"  className='m-0 px-2 py-1  text-white' ><TfiLayoutAccordionList style={{fontSize:'22px'}} /> Browse</Nav.Link> </Nav.Item> */}
                  {/* <Nav.Item > <Nav.Link eventKey="View"  className='m-0 px-2 py-1 text-white' ><HiOutlineQueueList  style={{fontSize:'28px'}}/> Desk View</Nav.Link> </Nav.Item> */}
                  <Nav.Item > <Nav.Link eventKey="Manage"  className='m-0 px-2 py-1 text-white' ><TbManualGearbox style={{fontSize:'28px'}}/> Manage</Nav.Link> </Nav.Item>
                  {/* <Nav.Item > <Nav.Link eventKey="DataSetup"  className='m-0 px-2 py-1 text-white' ><TbManualGearbox style={{fontSize:'28px'}}/> Database</Nav.Link> </Nav.Item> */}

                  {/* <Nav.Item > <Nav.Link eventKey="AddNew"  className='m-0 px-2 py-1 text-white' ><FaUserPlus className='fs-5'/> Add New</Nav.Link> </Nav.Item> */}
                </Nav>
              </div>

            </div>

            <div className="card-body p-2" style={{ backgroundColor: 'gainsboro' }}>
              <Tab.Content>
                
                <Tab.Pane eventKey="Browse">
                  {/* <Browse/> */}
                </Tab.Pane>

                <Tab.Pane eventKey="View">
                  {/* <View/>                                  */}
                </Tab.Pane>

                <Tab.Pane eventKey="Manage">
                <Manage/>
                {/* <HandleBill/> */}
                </Tab.Pane>

                <Tab.Pane eventKey="AddNew">
                  {/* <Create/> */}
                </Tab.Pane>

              </Tab.Content>
            </div>

          </div>
        </Tab.Container>
    </>
  )
}
