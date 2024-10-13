import React, { useState } from 'react'

import Moment from 'moment'

import { HiOutlineViewGridAdd, HiOutlineViewList } from 'react-icons/hi'
import { TfiViewList } from 'react-icons/tfi'
import NumberFormat from 'react-number-format'
import { useCtxMainContextHook } from '../../../../../CtxMain'
import EyeCircled from '../Components/EyeCircled'
import { AlertRec } from '../../../../../StdLib'
import { FaBackward, FaForward, FaMinus, FaPlus } from 'react-icons/fa'


// export default function ListedBillItemsMenu({ Products, HandleListItemClicked, SizeFlagFS }) {
export default function ListedBillItemsMenu(props) {
    // const { Products, Categories, OrderSheetItems, OrderItemAdd, OrderItemDel, HandleListItemClicked } = props
    const { Products, Categories, OrderSheetItems, OrderItemAdd, OrderItemDel } = props

    const { CtxMainState, CtxMainDispatch } = useCtxMainContextHook()
    // const { _Procedures: Products, _Patients, _DocsRef } = CtxMainState



    const [DispType, setDispType] = useState(false)
    const [SelectedRec, setSelectedRec] = useState('')

    let SelectedItem = ''
    return (<>
        {/* {AlertRec(Products, 'Product Items for list display')} */}

        {/* <div className="flex flex-wrap justify-evenly " style={{overflow:'hidden'}}> */}
        <div className='card'>

            <div className="card-header py-1 px-2 w-full flex items-center" style={{ background: '#e0e0e0' }}>
                <strong className='fs-5'>Inventory Items</strong>
                {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}><TbWiperWash /></span> */}
                {/* <span className='ms-auto ' onClick={() => HandleDatabase('Add')}><AiFillAccountBook /></span> */}
                {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}>Edit<AiFillAccountBook /></span> */}

                <div className='ms-auto mx-2 fs-6 ' onClick={() => setDispType(p => !p)}><TfiViewList /></div>
                <div className='fs-5 ' onClick={() => setDispType(p => !p)}><HiOutlineViewGridAdd /></div>
            </div>

            <div className="card-body py-2 m-0" style={{ height: '75vh', overflowY: 'auto' }}>
                {DispType
                    ?
                    // List View
                    <div className="btn-group flex flex-col m-0" role="group" aria-label="First group" >
                        {Products.map((ITM, I) => {
                            // return <button className='flex mb-2 ' key={E.id} onClick={() =>{DispRecInAlert(E,'Selected'); HandleListItemClicked(E)}}>
                            return (
                                <button className='btn btn-sm flex px-1 py-0 text-start border-b '
                                    style={{ fontSize: '12px' }} key={ITM.Id}
                                    // onClick={(e) => { OrderItemAdd(ITM.Id, 'B', ITM) }}>
                                    onClick={(e) => { OrderItemAdd(ITM.Id, ITM.QtyDef, ITM) }}>
                                    {/* onClick={() => { setSelectedRec(ITM.Id); HandleListItemClicked(ITM.Id) }}> */}

                                    {(SelectedItem = OrderSheetItems.find((E) => E.PId === ITM.Id))
                                        ?
                                        <>
                                            {/* <span style={{ width: '30%' }}> {SelectedItem ? <strong> {ITM.Title.trim()} </strong> : ITM.Title.trim()}</span> */}
                                            <span style={{ width: '65%', fontSize: '14px' }}> <strong> {ITM.Title.trim()} </strong></span>
                                            {/* <span style={{ width: '25%', fontSize: '14px', border:'1px solid' }}><strong> {ITM.Desc.trim()} </strong></span> */}

                                            <span style={{ width: '20%', fontSize: '14px' }} >
                                                <strong>
                                                    @ <NumberFormat value={ITM.Price} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" /> /                                             <strong>
                                                        <NumberFormat value={ITM.PPrice} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                                    </strong>

                                                </strong>
                                            </span>

                                            {/* <span className="flex gap-2 justify-end items-center" style={{ width: '10%' , fontSize: '16px' }} >
                                            <div onClick={(e) => { e.stopPropagation(); setSelectedRec(ITM.Id); OrderItemAdd(ITM.Id, 'R', ITM) }}>
                                                <EyeCircled RL={'R'} Mode={SelectedItem.ER === 0 ? false : true} Size={20} />
                                            </div>

                                            <div onClick={(e) => { e.stopPropagation(); setSelectedRec(ITM.Id); OrderItemAdd(ITM.Id, 'L', ITM) }}>
                                                <EyeCircled RL={'L'} Mode={SelectedItem.EL === 0 ? false : true} Size={20} />
                                            </div>
                                        </span> */}

                                            <div className='flex gap-1 items-center justify-center'>
                                                <button className='bg-blue-500 p-0 m-0  flex items-center justify-center' style={{ height: '16px', width: '15px' }}
                                                    onClick={(e) => { e.stopPropagation(); OrderItemAdd(ITM.Id, ITM.QtyStep, ITM) }}><span style={{ fontSize: '8px' }} ><FaBackward /></span></button>
                                                {/* onClick={() => HandleStockLevel(ITM, ITM.QtyStep, SelectedItem.Qty)}><span style={{ fontSize: '8px' }} ><FaBackward /></span></button> */}

                                                <button className='bg-blue-500 p-0 m-0  flex items-center justify-center' style={{ height: '16px', width: '15px' }}
                                                    onClick={(e) => { e.stopPropagation(); OrderItemAdd(ITM.Id, ITM.QtyInc, ITM) }}><span style={{ fontSize: '8px' }} ><FaPlus /></span></button>
                                                {/* onClick={() => HandleStockLevel(ITM, ITM.QtyInc, SelectedItem.Qty)}><span style={{ fontSize: '8px' }} ><FaPlus /></span></button> */}

                                                <span className='p-0 m-0 mx-1 fs-6 fw-bold text-red-600' >  {SelectedItem.Qty} </span>

                                                <button className='bg-indigo-300 p-0 m-0  flex items-center justify-center' style={{ height: '16px', width: '15px' }}
                                                    onClick={(e) => { e.stopPropagation(); OrderItemAdd(ITM.Id, -ITM.QtyInc) }}><span style={{ fontSize: '8px' }} ><FaMinus /></span></button>

                                                <button className='bg-indigo-300 p-0 m-0  flex items-center justify-center' style={{ height: '16px', width: '15px' }}
                                                    onClick={(e) => { e.stopPropagation(); OrderItemAdd(ITM.Id, -ITM.QtyStep) }}><span style={{ fontSize: '8px' }} ><FaForward /></span></button>

                                            </div>

                                        </>
                                        :
                                        <>
                                            {/* <span style={{ width: '30%' }}> {SelectedItem ? <strong> {ITM.Title.trim()} </strong> : ITM.Title.trim()}</span> */}
                                            <span style={{ width: '50%' }}> {ITM.Title}</span>
                                            {/* <span style={{ width: '25%', border:'1px solid'}}>{ITM.Desc.trim()} </span> */}

                                            <span className='borderX' style={{ width: '10%' }}> {ITM.Code}</span>
                                            {/* <span className='border' style={{ width: '25%' }}> {ITM.CatItemTitle.substr(0, 1)}</span> */}
                                            <span className='borderX' style={{ width: '25%' }}> {ITM.CatItemTitle}</span>
                                            <span className='text-end borderX' style={{ width: '15%' }} >
                                                @ <NumberFormat value={ITM.Price} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                            </span>

                                            {/* <span className="flex gap-2 justify-end items-center" style={{ width: '10%' , fontSize: '12px' }} >
                                            <div onClick={(e) => { e.stopPropagation(); setSelectedRec(ITM.Id); OrderItemAdd(ITM.Id, 'R', ITM) }}>
                                                <EyeCircled RL={'R'} Mode={false} Size={15} />
                                            </div>

                                            <div onClick={(e) => { e.stopPropagation(); setSelectedRec(ITM.Id); OrderItemAdd(ITM.Id, 'L', ITM) }}>
                                                <EyeCircled RL={'L'} Mode={false} Size={15} />
                                            </div>
                                        </span> */}
                                        </>
                                    }


                                </button>
                            )
                            // }).reverse()
                        })
                        }
                    </div>

                    :
                    // Card View
                    <div className=" flex flex-row gap-2 flex-fill flex-wrap m-0 justify-evenly " >
                        {Products.map((ITM, I) => {
                            return (<>
                                <div className={"card overflow-visible  shadow-lg  p-0 mb-1 relative " + ((SelectedItem = OrderSheetItems.find((E) => E.PId === ITM.Id)) ? ' border-2 border-red-600 shadow-lg ' : '')} style={{ maxWidth: '100px', minWidth: '90px' }} >
                                    {/* <span style={{ position: 'absolute', top: '0px', left: '0px', fontSize: '8px' }} className={" text-secondary "} >
                                    {ITM.Id}
                                </span> */}
                                    <div
                                        // style={{ position: 'absolute', top: '-10px', right: '2px', zIndex: '10' }}
                                        className={'text-xs px-1 absolute top-[-12px] right-0 z-10 bg-white border rounded-full ' + 
                                        ((ITM.CrntBal >= ITM.QtyMax) 
                                        ? 'text-blue-600  border-blue-600 animate-blink ' 
                                        : (ITM.CrntBal <= ITM.QtyMin) 
                                        ? 'text-red-600  border-red-600 animate-blink ' 
                                        : 'text-black-600  border-black-600')}
>
                                        {ITM.CrntBal}
                                    </div>



                                    <div className="card-img-top p-1" >
                                        {/* <img src={`Images/ItemsStore/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="..." */}
                                        {/* <img src={`Uploads/Items/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="..." */}
                                        <img src={process.env.REACT_APP_API_URL + `Items/GetFile/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="..."
                                            onClick={(e) => OrderItemAdd(ITM.Id, ITM.QtyDef, ITM)} />
                                    </div>

                                    <div className="card-body p-0 text-center">
                                        <div className="card-title m-0 p-0" style={{ lineHeight: 1 }}>{ITM.Title.trim()}</div>
                                        {/* <div className="card-title m-0 p-0 fs-5 fw-bolder ">{ITM.TitleU.trim()}</div> */}
                                        {/* <p className="card-text my-0">{ITM.Desc}</p> */}

                                        {/* {alert('Ready to Disp- ItIsCartItem.Id: '+ItIsCartItem.Id +'   ItIsCartItem.Qty:'+ItIsCartItem.Qty)} */}
                                        {/* // Is it selected for VoucherOrderCard ? */}

                                    </div >

                                    {(SelectedItem = OrderSheetItems.find((E) => E.PId === ITM.Id))
                                        ? <>
                                            <div className='flex gap-1 items-center justify-center'>
                                                <button className='bg-blue-500 p-0 m-0  flex items-center justify-center' style={{ height: '16px', width: '15px' }}
                                                    onClick={(e) => { e.stopPropagation(); OrderItemAdd(ITM.Id, ITM.QtyStep, ITM) }}><span style={{ fontSize: '8px' }} ><FaBackward /></span></button>
                                                {/* onClick={() => HandleStockLevel(ITM, ITM.QtyStep, SelectedItem.Qty)}><span style={{ fontSize: '8px' }} ><FaBackward /></span></button> */}

                                                <button className='bg-blue-500 p-0 m-0  flex items-center justify-center' style={{ height: '16px', width: '15px' }}
                                                    onClick={(e) => { e.stopPropagation(); OrderItemAdd(ITM.Id, ITM.QtyInc, ITM) }}><span style={{ fontSize: '8px' }} ><FaPlus /></span></button>
                                                {/* onClick={() => HandleStockLevel(ITM, ITM.QtyInc, SelectedItem.Qty)}><span style={{ fontSize: '8px' }} ><FaPlus /></span></button> */}

                                                <span className='p-0 m-0 mx-1 fs-6 fw-bold text-red-600' > {SelectedItem.Qty} </span>

                                                <button className='bg-indigo-300 p-0 m-0  flex items-center justify-center' style={{ height: '16px', width: '15px' }}
                                                    onClick={(e) => { e.stopPropagation(); OrderItemAdd(ITM.Id, -ITM.QtyInc) }}><span style={{ fontSize: '8px' }} ><FaMinus /></span></button>

                                                <button className='bg-indigo-300 p-0 m-0  flex items-center justify-center' style={{ height: '16px', width: '15px' }}
                                                    onClick={(e) => { e.stopPropagation(); OrderItemAdd(ITM.Id, -ITM.QtyStep) }}><span style={{ fontSize: '8px' }} ><FaForward /></span></button>

                                            </div>

                                        </>
                                        : <>
                                            {(ITM.CrntBal <= 0)
                                                ? <button className="bg-red-400 border  mt-1 p-0 w-full">Out of Stock</button>
                                                : <button className=" mt-1 p-0 w-full"
                                                    // style={{ color: 'black', background: '#f0c040', border: '1px solid #404040', fontSize: '13px' }}
                                                    // style={{ color: 'black', background: '#f5d948', border: '1px solid #404040', fontSize: '13px' }}
                                                    style={{ color: 'black', background: '#ff9900', border: '1px solid #404040', fontSize: '12px' }}
                                                    onClick={(e) => { e.stopPropagation(); OrderItemAdd(ITM.Id, ITM.QtyDef, ITM) }}>Add in Voucher
                                                </button>
                                            }

                                        </>
                                    }
                                </div >
                            </>)
                            // }).reverse()
                        })
                        }
                    </div >
                }

            </div >
        </div>

    </>)
}

