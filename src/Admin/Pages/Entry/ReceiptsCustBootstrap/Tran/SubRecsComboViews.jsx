import React, { useState } from 'react'

import Moment from 'moment'

import { HiOutlineViewGridAdd, HiOutlineViewList } from 'react-icons/hi'
import { TfiViewList } from 'react-icons/tfi'
import NumberFormat from 'react-number-format'
import MyAvatar from '../../../../../Utils/MyAvatar'

export default function SubRecsComboViews({ RecAll, HandleListItemClicked }) {
    const [DispType, setDispType] = useState(false)
    const [SelectedRec, setSelectedRec] = useState('')

    return (<>
        {/* {AlertRec(RecAll, 'Rec to Display Voucher')} */}
        <div className='card w-100'>

            {/* <div className="d-flex flex-wrap justify-content-evenly " style={{overflow:'hidden'}}> */}
            <div className="card-header py-0 w-100 d-flex align-items-center" style={{ background: '#e0e0e0' }}>
                <div>Suppliers</div>
                {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}><TbWiperWash /></span> */}
                {/* <span className='ms-auto ' onClick={() => HandleDatabase('Add')}><AiFillAccountBook /></span> */}
                {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}>Edit<AiFillAccountBook /></span> */}

                <div className='ms-auto mx-2 fs-6 ' onClick={() => setDispType(p => !p)}><TfiViewList /></div>
                <div className='fs-5 ' onClick={() => setDispType(p => !p)}><HiOutlineViewGridAdd /></div>
            </div>

            <div className="card-body p-2" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                {/* List-View or Card-View */}
                {DispType
                    ? <div className="btn-group d-flex flex-column m-0" role="group" aria-label="First group">
                        {RecAll.map((E, I) => {
                            // return <button className='d-flex mb-2 ' key={E.id} onClick={() =>{DispRecInAlert(E,'Selected'); HandleListItemClicked(E)}}>
                            return (
                                <button className='btn btn-sm d-flex px-1 py-0 text-start border-bottom '
                                    style={{ fontSize: '10px' }} key={E.Id} onClick={() => { setSelectedRec(E.Id); HandleListItemClicked(E) }}>

                                    <span style={{ width: '10%' }}>{E.Id}</span>
                                    <span style={{ width: '60%' }}>{E.Title}  </span>
                                    <span style={{ width: '30%', textAlign: 'end' }}>{E.City}</span>
                                    {/* <span style={{ width: '15%', textAlign: 'end' }}>{E.ContactPh1}</span> */}
                                </button>
                            )
                        }).reverse()
                        }
                    </div>

                    :
                    <div className=" d-flex gap-2 flex-wrap  justify-content-evenly " >
                        {RecAll.map((E, I) => {
                            return (
                                <div key={E.Id} className={"p-0 mb-1 "+(E.Id === SelectedRec ? ' border border-danger ' : ' border-0 ')}
                                    // style={{ width: "75px", minHeight: '75px', maxHeight: '100px', borderColor: (E.Id === SelectedRec ? 'red' : 'none') }}
                                    style={{ width: "75px",  height: '100px' }}
                                    value={E.Id} onClick={(e) => { setSelectedRec(E.Id); HandleListItemClicked(E) }}>

                                    <div className="card shadow  p-2 m-0"  >
                                        {/* <span style={{ position: 'absolute', top: '0px', left: '0px', fontSize: '8px' }}
                                        className={" text-secondary "} >
                                        {E.Id}
                                        </span> */}

                                        <div className="card-img-top px-0 pt-0 mb-0 text-center " >
                                            {/* <img src={`Images/ItemsStore/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="..." */}
                                            {/* <img src={'Images/AdminPanel/Default/DefaultSupplier.png'} style={{ width: "75%", height: '100px', color: '#e040fb' }} alt="..." /> */}

                                            {/* <img src={process.env.REACT_APP_API_URL + `Traders/GetFile/${E.PicURL}`} style={{ width: "100%", height: '50px', color: '#e040fb' }} alt="..." /> */}


                                            {(E.PicURL && E.PicURL.trim())
                                                ? <img src={
                                                    (E.PicURL && E.PicURL.trim())
                                                        ? (process.env.REACT_APP_API_URL + `Traders/GetFile/${E.PicURL}`)
                                                        : ''
                                                    // :ImgDefault
                                                }
                                                    style={{ width: "100%", height: '50px' }} alt="..." />
                                                : <span className='d-flex justify-content-center' > <MyAvatar Text={E.Title[0]} Size={50} /> </span>
                                            }

                                        </div>

                                        <div className="card-body p-0 m-0" >

                                            <div className="mt-1 text-center text-black" style={{ fontSize: '10px', lineHeight: '1' }}>{E.Title} </div>
                                            {/* <div className="mt-1 text-center text-black" style={{ fontSize: '10px', lineHeight: '1' }}>{E.Code}</div> */}
                                            {/* <div className="mt-1 text-center text-black" style={{ fontSize: '8px', lineHeight: '1' }}>{E.City}</div> */}

                                            {/* <div className="card-title text-center text-primary" style={{ fontSize: '10px' }}>{E.Title.trim()}</div> */}
                                        </div>

                                    </div>
                                </div>
                            )
                        }).reverse()
                        }
                    </div>
                }

            </div >
        </div >

    </>)
}

