// import { set } from 'mongoose'
import React, { useEffect, useState } from 'react'

import { FaPlus, FaMinus } from 'react-icons/fa'
//Play, back, next, fwwd
import { FaStepBackward, FaBackward, FaForward, FaStepForward } from 'react-icons/fa'
import { AlertRec } from '../../../../../StdLib'

export default function TabbedBillMenuTabContent(props) {
    const { ITM, OrderSheetItems, OrderItemAdd, OrderItemDel } = props

    let SelectedItem = null
    return (
        <>
            <div className="card shadow  p-0 mb-1" style={{  maxWidth: '100px', minWidth: '90px' }} >
                <span style={{ position: 'absolute', top: '0px', left: '0px', fontSize:'8px' }}
                    className={" text-secondary "} >
                    {ITM.Id} 
                </span>
                <div className="card-img-top p-1" >
                    {/* <img src={`Images/ItemsStore/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="..." */}
                    {/* <img src={`Uploads/Items/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="..." */}
                    <img src={process.env.REACT_APP_API_URL + `Procedures/GetFile/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="..."
                        onClick={() => OrderItemAdd(ITM.Id, ITM.QtyInc, ITM)} />
                </div>
                <span style={{ position: 'absolute', top: '0px', right: '2px' }}
                    className={((ITM.CrntBal >= ITM.QtyMax) ? 'text-primary ' : (ITM.CrntBal <= ITM.QtyMin) ? 'text-danger ' : 'text-success')} >
                    {ITM.CrntBal}
                </span>
                <div className="card-body p-0 text-center">
                    <div className="card-title m-0 p-0" style={{ lineHeight: 1 }}>{ITM.Title.trim()}</div>
                    {/* <div className="card-title m-0 p-0 fs-5 fw-bolder ">{ITM.TitleU.trim()}</div> */}
                    {/* <p className="card-text my-0">{ITM.Desc}</p> */}

                    {/* {alert('Ready to Disp- ItIsCartItem.Id: '+ItIsCartItem.Id +'   ItIsCartItem.Qty:'+ItIsCartItem.Qty)} */}
                    {/* // Is it selected for VoucherOrderCard ? */}
                    {(SelectedItem = OrderSheetItems.find((E) => E.PId === ITM.Id))
                        ? <div className='mt-1 d-flex gap-1 align-items-center justify-content-center'>
                            <button className='btn btn-success p-0 m-0  d-flex align-items-center justify-content-center' style={{ height: '16px', width: '15px' }}
                                onClick={() => OrderItemAdd(ITM.Id, ITM.QtyStep, ITM)}><span style={{ fontSize: '8px' }} ><FaBackward /></span></button>
                            {/* onClick={() => HandleStockLevel(ITM, ITM.QtyStep, SelectedItem.Qty)}><span style={{ fontSize: '8px' }} ><FaBackward /></span></button> */}

                            <button className='btn btn-success p-0 m-0  d-flex align-items-center justify-content-center' style={{ height: '16px', width: '15px' }}
                                onClick={() => OrderItemAdd(ITM.Id, ITM.QtyInc, ITM)}><span style={{ fontSize: '8px' }} ><FaPlus /></span></button>
                            {/* onClick={() => HandleStockLevel(ITM, ITM.QtyInc, SelectedItem.Qty)}><span style={{ fontSize: '8px' }} ><FaPlus /></span></button> */}

                            <span className='p-0 m-0 mx-1 fs-6 fw-bold text-danger' > {SelectedItem.Qty} </span>
                            
                            <button className='btn btn-primary p-0 m-0  d-flex align-items-center justify-content-center' style={{ height: '16px', width: '15px' }}
                                onClick={() => OrderItemDel(ITM.Id, ITM.QtyInc)}><span style={{ fontSize: '8px' }} ><FaMinus /></span></button>

                            <button className='btn btn-primary p-0 m-0  d-flex align-items-center justify-content-center' style={{ height: '16px', width: '15px' }}
                                onClick={() => OrderItemDel(ITM.Id, ITM.QtyStep)}><span style={{ fontSize: '8px' }} ><FaForward /></span></button>

                        </div>
                        : (ITM.CrntBal <= 0)
                            ? <button className="btn btn-sm btn-secondary  mt-1 p-0 w-100"> Out of Stock </button>
                            : <button className="btn btn-sm btn-primary mt-1 p-0 w-100"
                                // style={{ color: 'black', background: '#f0c040', border: '1px solid #404040', fontSize: '13px' }}
                                // style={{ color: 'black', background: '#f5d948', border: '1px solid #404040', fontSize: '13px' }}
                                style={{ color: 'black', background: '#ff9900', border: '1px solid #404040', fontSize: '13px' }}
                                onClick={() => OrderItemAdd(ITM.Id, ITM.QtyDef, ITM)}> Add in Voucher
                            </button>

                        // <div className="mx-1 p-0">
                        //     <button className="btn btn-primary m-0 p-0 w-100"
                        //         style={{ color: 'black', background: '#f0c040', border: '1px solid #404040' }}
                        //         onClick={() => OrderItemAdd(ITM)}>Select
                        //     </button>
                        // </div>
                    }
                </div>
            </div>

        </>)
}