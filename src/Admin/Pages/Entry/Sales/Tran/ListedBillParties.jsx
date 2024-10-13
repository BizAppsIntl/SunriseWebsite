import React, { useState } from 'react'

import Moment from 'moment'

import { HiOutlineViewGridAdd, HiOutlineViewList } from 'react-icons/hi'
import { TfiViewList } from 'react-icons/tfi'
import NumberFormat from 'react-number-format'
import { useCtxMainContextHook } from '../../../../../CtxMain'
import EyeCircled from '../Components/EyeCircled'
import { AlertRec } from '../../../../../StdLib'

// import ImgDefault from '../AssetsLocal/Images/Customers.png'
import ImgDefault from '../../../../ImagesAdminPanel/default/Customers.png'
import MyAvatar from '../../../../../Utils/MyAvatar'

// export default function ListedBillItemsMenu({ Products, HandleListItemClicked, SizeFlagFS }) {
export default function ListedBillParties(props) {
    const { OrderSheet, Traders, HandleListItemClicked } = props

    const { CtxMainState, CtxMainDispatch } = useCtxMainContextHook()
    const { _Procedures: Products, _Patients, _DocsRef } = CtxMainState



    const [DispType, setDispType] = useState(true)
    const [SelectedRec, setSelectedRec] = useState('')

    let SelectedItem = ''
    return (<>
        {/* <div className="flex flex-wrap justify-evenly " style={{overflow:'hidden'}} px-2> */}

        <div className="card-header px-2 py-0 w-100 flex items-center" style={{ background: '#e0e0e0' }}>
            <img src={ImgDefault} alt="Default" width='40px' height='24px' />
            <span className='text-xl  mx-2'>Customers</span>
            {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}><TbWiperWash /></span> */}
            {/* <span className='ms-auto ' onClick={() => HandleDatabase('Add')}><AiFillAccountBook /></span> */}
            {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}>Edit<AiFillAccountBook /></span> */}

            <div className='ms-auto mx-2 text-lg ' onClick={() => setDispType(p => !p)}><TfiViewList /></div>
            <div className='text-lg ' onClick={() => setDispType(p => !p)}><HiOutlineViewGridAdd /></div>
        </div>

        {/* <div className="card-body p-0 mt-1" style={{ height: '25vh', overflowY: 'auto' }}> */}
        <div className="card-body p-0 mt-1" style={{ overflowY: 'auto' }}>
            {DispType
            // List of Recs View 
                ? <div className=" flex flex-col m-0" >
                    {Traders.map((ITM, I) => {
                        // return <button className='flex mb-2 ' key={E.id} onClick={() =>{DispRecInAlert(E,'Selected'); HandleListItemClicked(E)}}>
                        return (
                            <button className='flex px-1 py-0 text-start border-b '
                                style={{ fontSize: '12px' }} key={ITM.Id}
                                onClick={(e) => { HandleListItemClicked(ITM) }}>
                                {/* onClick={() => { setSelectedRec(ITM.Id); HandleListItemClicked(ITM.Id) }}> */}

                                {(SelectedItem = OrderSheet.TId === ITM.Id)
                                    ?
                                    <>
                                        <span className='borderX text-center' style={{ width: '10%' }}>
                                            {(ITM.PicURL && ITM.PicURL.trim())
                                                ? <img src={
                                                    (ITM.PicURL && ITM.PicURL.trim())
                                                        ? (process.env.REACT_APP_API_URL + `Traders/GetFile/${ITM.PicURL}`)
                                                        : ImgDefault
                                                }
                                                    style={{ width: "30px", height: '24px', cursor: 'pointer' }}
                                                    alt="..." onClick={(e) => HandleListItemClicked(ITM)}
                                                />
                                                : <span className='flex justify-center' onClick={(e) => HandleListItemClicked(ITM)}> <MyAvatar Text={ITM.Title[0]} Size={24} /> </span>
                                            }
                                        </span>
                                        {/* <span style={{ width: '30%' }}> {SelectedItem ? <strong> {ITM.Title.trim()} </strong> : ITM.Title.trim()}</span> */}
                                        <span style={{ width: '35%', fontSize: '14px' }}> <strong> {ITM.Title.trim()} </strong></span>
                                        {/* <span style={{ width: '25%', fontSize: '14px', border:'1px solid' }}><strong> {ITM.Desc.trim()} </strong></span> */}

                                        <span style={{ width: '25%', fontSize: '14px' }} >
                                            <strong>
                                                {ITM.Phone}
                                                {/* <NumberFormat value={ITM.Price} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" /> */}
                                            </strong>
                                        </span>

                                        <span className='borderX fw-bold' style={{ width: '30%', fontSize: '14px' }}> {ITM.City}</span>

                                        {/* <span className="flex gap-2 justify-end items-center" style={{ width: '10%' , fontSize: '16px' }} >
                                            <div onClick={(e) => { e.stopPropagation(); setSelectedRec(ITM.Id); OrderItemAdd(ITM.Id, 'R', ITM) }}>
                                                <EyeCircled RL={'R'} Mode={SelectedItem.ER === 0 ? false : true} Size={20} />
                                            </div>

                                            <div onClick={(e) => { e.stopPropagation(); setSelectedRec(ITM.Id); OrderItemAdd(ITM.Id, 'L', ITM) }}>
                                                <EyeCircled RL={'L'} Mode={SelectedItem.EL === 0 ? false : true} Size={20} />
                                            </div>
                                        </span> */}
                                    </>
                                    :
                                    <>
                                        <span className='borderX text-center' style={{ width: '5%' }}>
                                            {(ITM.PicURL && ITM.PicURL.trim())
                                                ? <img src={
                                                    (ITM.PicURL && ITM.PicURL.trim())
                                                        ? (process.env.REACT_APP_API_URL + `Traders/GetFile/${ITM.PicURL}`)
                                                        : ImgDefault
                                                }
                                                    style={{ width: "20px", height: '15px', cursor: 'pointer' }}
                                                    alt="..." onClick={(e) => HandleListItemClicked(ITM)}
                                                />
                                                : <span className='flex justify-center' onClick={(e) => HandleListItemClicked(ITM)}> <MyAvatar Text={ITM.Title[0]} Size={15} /> </span>
                                            }
                                        </span>

                                        {/* <span style={{ width: '30%' }}> {SelectedItem ? <strong> {ITM.Title.trim()} </strong> : ITM.Title.trim()}</span> */}
                                        <span style={{ width: '35%' }}> {ITM.Title}</span>
                                        {/* <span style={{ width: '25%', border:'1px solid'}}>{ITM.Desc.trim()} </span> */}

                                        <span className='borderX' style={{ width: '15%' }}> {ITM.Code}</span>
                                        <span className='borderX' style={{ width: '30%' }}> {ITM.City}</span>
                                        <span className='borderX' style={{ width: '15%' }}> {ITM.Phone}</span>

                                        {/* <span className='border' style={{ width: '3%' }}> {ITM.CatTitle.substr(0,1)}</span> */}
                                        {/* <span className='text-end border' style={{ width: '12%'  }} > */}
                                        {/* <NumberFormat value={ITM.Price} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" /> */}
                                        {/* </span> */}

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
            // Cards of Recs View 
            <div className="flex flex-row gap-2 flex-grow flex-wrap m-0 justify-evenly" >
                    {Traders.map((ITM, I) => {
                        return (<>

                            <div className={`card shadow  p-0 mb-1 ` + ((SelectedItem = OrderSheet.TId === ITM.Id) ? ' border-4 border-red-600 shadow-lg ' : '')} style={{ maxWidth: '100px', minWidth: '90px' }} >
                                {/* <span style={{ position: 'absolute', top: '0px', left: '0px', fontSize: '8px' }} className={" text-secondary "} >
                                    {ITM.Id}
                                </span> */}

                                {(SelectedItem = OrderSheet.TId === ITM.Id)
                                    ? <>
                                        {/* <div className='btn p-0 m-0 ' style={{ position: 'absolute', top: '0px', left: '0px', fontSize: '12px' }}
                                            onClick={(e) => { e.stopPropagation(); setSelectedRec(ITM.Id); OrderItemAdd(ITM.Id, 'R', ITM) }} >
                                            <EyeCircled RL={'R'} Mode={SelectedItem.ER === 0 ? false : true} Size={15} BakGrnd={1} />
                                        </div> */}

                                        {/* <div className='btn p-0 m-0 ' style={{ position: 'absolute', top: '0px', right: '0px', fontSize: '12px' }}
                                            onClick={(e) => { e.stopPropagation(); setSelectedRec(ITM.Id); OrderItemAdd(ITM.Id, 'L', ITM) }}>
                                            <EyeCircled RL={'L'} Mode={SelectedItem.EL === 0 ? false : true} Size={15} BakGrnd={1} />
                                        </div> */}
                                    </>
                                    : <>
                                        {/* <div className='btn p-0 m-0 ' style={{ position: 'absolute', top: '0px', left: '0px', fontSize: '10px' }}
                                            onClick={(e) => { e.stopPropagation(); setSelectedRec(ITM.Id); OrderItemAdd(ITM.Id, 'R', ITM) }}>
                                            <EyeCircled RL={'R'} Mode={false} Size={15} BakGrnd={1} />
                                        </div>

                                        <div className='btn p-0 m-0 ' style={{ position: 'absolute', top: '0px', right: '0px', fontSize: '10px' }}
                                            onClick={(e) => { e.stopPropagation(); setSelectedRec(ITM.Id); OrderItemAdd(ITM.Id, 'L', ITM) }}>
                                            <EyeCircled RL={'L'} Mode={false} Size={15} BakGrnd={1} />
                                        </div> */}
                                    </>
                                }

                                <div className="card-img-top p-1" >
                                    {/* <img src={`Images/ItemsStore/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="..." */}
                                    {/* <img src={`Uploads/Items/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="..." */}

                                    {/* <img src={process.env.REACT_APP_API_URL + `Patients/GetFile/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="..."
                                        onClick={(e) => HandleListItemClicked(ITM) } /> */}

                                    {(ITM.PicURL && ITM.PicURL.trim())
                                        ? <img src={
                                            (ITM.PicURL && ITM.PicURL.trim())
                                                ? (process.env.REACT_APP_API_URL + `Traders/GetFile/${ITM.PicURL}`)
                                                : ImgDefault
                                        }
                                            style={{ width: "100%", height: '75px', cursor: 'pointer' }}
                                            alt="..." onClick={(e) => HandleListItemClicked(ITM)}
                                        />
                                        : <span className='flex justify-center' onClick={(e) => HandleListItemClicked(ITM)}> <MyAvatar Text={ITM.Title[0]} Size={75} /> </span>
                                    }


                                </div>

                                <div className="card-body p-0 text-center">
                                    <div className="card-title m-0 p-0" style={{ lineHeight: 1 }}>{ITM.Title.trim()}</div>
                                    {/* <div className="card-title m-0 p-0 fs-5 fw-bolder ">{ITM.TitleU.trim()}</div> */}
                                    {/* <p className="card-text my-0">{ITM.Desc}</p> */}

                                    {/* {alert('Ready to Disp- ItIsCartItem.Id: '+ItIsCartItem.Id +'   ItIsCartItem.Qty:'+ItIsCartItem.Qty)} */}
                                    {/* // Is it selected for VoucherOrderCard ? */}

                                </div >
                            </div >
                        </>)
                        // }).reverse()
                    })
                    }
                </div >
            }

        </div >

    </>)
}

