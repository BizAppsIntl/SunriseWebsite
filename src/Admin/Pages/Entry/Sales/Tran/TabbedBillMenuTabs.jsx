import React from 'react'

import { Container, Row, Col, Tab, Tabs, Nav } from 'react-bootstrap'
// import { Categories } from '../../../../AdminData/WarehouseData/DataCategories'
import TabbedBillMenuTabContent from './TabbedBillMenuTabContent'
import AccordianCard4Menu from '../Components/Accordion/AccordianCard4Menu'
// import AccordianCard4Menu from '../Components/Accordion/AccordianCard4Menu'
import Chevron from '../Components/Accordion/chevron.svg'

import { FaSave, FaUserPlus, FaUserEdit, FaUsers, FaUserCog, FaUsersSlash } from 'react-icons/fa'
import { TfiLayoutAccordionList } from 'react-icons/tfi'
import { TbManualGearbox } from 'react-icons/tb'
import { AiOutlineWeibo } from 'react-icons/ai'
import { HiOutlineQueueList } from 'react-icons/hi2'
import { FaPlus, FaMinus } from 'react-icons/fa'

//Play, back, next, fwwd
import { FaStepBackward, FaBackward, FaForward, FaStepForward } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { AlertRec } from '../../../../../StdLib'

export default function TabbedBillMenuTabs(props) {
    const { Categories, Products, OrderSheetItems, OrderItemAdd, OrderItemDel } = props

    // const [UniqueCategories, setUniqueCategories] = useState(Categories.filter(r => { return (r.Code.substr(1, 1) === '0') }))
    // const [CategoryHeads, setCategoryHeads] = useState(Categories.filter(r => { return (r.Code.substr(-1, 1) === '0') }))
    // console.log('\n\n\n\n\nPurchase********************', '\nProducts Rcvd', Products, '\nCategory Rcvd', Categories, '\n Filtered: ',Categories.filter(r => r.Code.substr(-1, 1) === '0'))
    const [CategoryHeads, setCategoryHeads] = useState(Categories ? Categories.filter(r => r.Code.substr(-1, 1) === '0') : '')

    // Accordian Menu ============================
    const [AccordianToggle, setAccordianToggle] = useState(false)
    const handleAccordianToggle = (e) => { setAccordianToggle(!AccordianToggle) }
    // Accordian Menu ============================

    let SelectedItem = ''
    let crntCat = ''

    return (<>
        {/* {AlertRec(CategoryHeads, 'CategoryHeads')} */}
        {/* onSelect={(k) => setKey(k)}  //when const [key, setKey] = useState('home'); */}

        {CategoryHeads &&
            <Tab.Container defaultActiveKey={CategoryHeads.at(0).Code}>

                <div className="card shadow-lg" >
                    <div >
                        <Nav variant="pills" style={{ fontSize: '12px' }} >
                            {CategoryHeads.map((E, I) => (
                                <Nav.Item key={I} style={{ cursor: 'pointer' }}> <Nav.Link eventKey={E.Code}  >{E.Title} </Nav.Link> </Nav.Item>))}
                        </Nav>
                    </div>

                </div >

                <div className="card-body p-0 " style={{ fontSize: '12px' }}>
                    <Tab.Content >
                        {CategoryHeads.map((E, I) => (
                            <Tab.Pane eventKey={E.Code} key={I} >
                                {/* {console.log('UNIQUE CATEGORIES ARRAY: ', [...new Set(Products.filter(r => r.Code.substr(0, 1) === E.Code.substr(0, 1)).map(R => R.CatCode))])} */}
                                <div className='d-flex flex-column ' >
                                    {/* <div className='d-flex flex-row flex-wrap'> */}
                                    {(E.Code.substr(0, 2) === '80')
                                        ? (
                                            [...new Set(Products
                                                .filter(r => r.CatCode.substr(0, 1) === E.Code.substr(0, 1))
                                                .map(R => R.CatCode)
                                            )].map((CAT, I) => (
                                                // <div style={{ width: '50%' }}>
                                                <AccordianCard4Menu
                                                    key={I}
                                                    CAT={CAT}
                                                    Categories={Categories}
                                                    Products={Products}
                                                    OrderSheetItems={OrderSheetItems}
                                                    OrderItemAdd={OrderItemAdd}
                                                    OrderItemDel={OrderItemDel} />
                                                // </div>
                                            ))
                                        )
                                        : (<>
                                            {[...new Set(Products.filter(r => r.CatCode.substr(0, 1) === E.Code.substr(0, 1)).map(R => R.CatCode))]
                                                .map((CAT, I) => (
                                                    <div key={I} className='card mb-1 d-flex flex-row flex-wrap  justify-content-evenly w-100' style={{ backgroundColor: '#ebecf0' }}>
                                                        {Products.filter(r => r.CatCode === CAT).map((ITM, IDX) => {
                                                            return (<TabbedBillMenuTabContent
                                                                key={IDX}
                                                                ITM={ITM}
                                                                OrderSheetItems={OrderSheetItems}
                                                                OrderItemAdd={OrderItemAdd}
                                                                OrderItemDel={OrderItemDel} />)
                                                        })}
                                                    </div>
                                                ))}
                                        </>)
                                    }
                                </div>
                            </Tab.Pane>
                        ))}
                    </Tab.Content>
                </div>

            </Tab.Container >
        }
    </>)
}