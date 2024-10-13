import React, { useState } from 'react'

import Moment from 'moment'

import { HiOutlineViewGridAdd, HiOutlineViewList } from 'react-icons/hi'
import { TfiViewList } from 'react-icons/tfi'
import NumberFormat from 'react-number-format'

export default function RecsComboViews({ RecAll, HandleListItemClicked, SizeFlagFS }) {
    const [DispType, setDispType] = useState(true)
    const [SelectedRec, setSelectedRec] = useState('')

    return (<>
        {/* <div className="d-flex flex-wrap justify-content-evenly " style={{overflow:'hidden'}}> */}
        <div className="card-header py-0 w-100 d-flex align-items-center" style={{ background: '#e0e0e0' }}>
            <div>Purchase Bill</div>
            {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}><TbWiperWash /></span> */}
            {/* <span className='ms-auto ' onClick={() => HandleDatabase('Add')}><AiFillAccountBook /></span> */}
            {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}>Edit<AiFillAccountBook /></span> */}



            {/* <div className='ms-auto mx-2 fs-6 ' onClick={() => setDispType(p => !p)}><TfiViewList /></div> */}
            {/* <div className='fs-5 ' onClick={() => setDispType(p => !p)}><HiOutlineViewGridAdd /></div> */}
            <div className='ms-auto mx-2 fs-6 ' onClick={() => ''}><TfiViewList /></div>
            <div className='fs-5 ' onClick={() =>'' }><HiOutlineViewGridAdd /></div>
        </div>

        <div className="card-body p-0" style={{ height: '75vh', overflowY: 'auto' }}>
            {DispType
                ? <div className="btn-group d-flex flex-column m-0" role="group" aria-label="First group">
                    {RecAll.map((E, I) => {
                        // return <button className='d-flex mb-2 ' key={E.id} onClick={() =>{DispRecInAlert(E,'Selected'); HandleListItemClicked(E)}}>
                        return (
                            <button className='btn btn-sm d-flex px-1 py-0 text-start border-bottom '
                                style={{ fontSize: '10px' }} key={E.VID} onClick={() => { setSelectedRec(E.VID); HandleListItemClicked(E) }}>

                                {(SizeFlagFS === 'F') &&
                                    <>

                                        <span style={{ width: '4%' }}>{E.TranM.VNo} </span>
                                        <span style={{ width: '9%' }}>{Moment(E.TranM.VDte).format('DD MMM YY ddd')}</span>
                                        {/* <span style={{ width: '30%' }}>[{E.TranM.RefTrader.Code}]-{E.TranM.RefTrader.Title}</span> */}

                                        {/* <span style={{ width: '7%' }}>{E.TranM.VTypeTitle }</span> */}
                                        <span style={{ width: '15%' }} >{E.TranM.Desc}</span>
                                        <span style={{ width: '5%' }}>{E.TranM.VQtyTxt}</span>

                                        <span style={{ width: '16%' }}>{E.TranM.RefPatient.Title}</span>

                                        <span style={{ width: '17%' }}>{E.TranM.RefDocDuty.Title}</span>
                                        <span style={{ width: '17%' }}>{E.TranM.RefDocRef.Title}</span>

                                        {/* <span style={{ width: '15%' }} className=' text-end'>Rs. {E.TranM.VAmt}</span> */}
                                        {/* <span style={{ width: '15%', textAlign: 'end' }}>{E.ContactPh1}</span> */}
                                        <span style={{ width: '10%' }} className=' text-end'>
                                            <NumberFormat value={E.TranM.VAmt} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'R. '} />
                                        </span>

                                    </>}

                                {(SizeFlagFS !== 'F') &&
                                    <>
                                        <span style={{ width: '12%', fontWeight:'bold' }}>{E.TranM.VNo} </span>
                                        <span style={{ width: '20%' }}>{Moment(E.TranM.VDte).format('DD MMM')}</span>
                                        {/* <span style={{ width: '43%' }}>[{E.TranM.RefTrader.Code}]-{E.TranM.RefTrader.Title}</span> */}

                                        {/* <span style={{ width: '20%' }}>{Rec.Id ? (Cats.find((P) => P.Code.trim() === E.CatCode.trim())).Title.substr(0,10) : (Cats.find((P) => P.Code.trim() === E.CatCode.trim())).Title }</span> */}
                                        {/* <span style={{ width: '25%' }}>{E.TranM.Desc}</span> */}
                                        <span style={{ width: '10%' }}>{E.TranM.VQtyTxt}</span>
                                        <span style={{ width: '40%' }}>{E.TranM.RefPatient.Title}</span>
                                        <span style={{ width: '18%' }} className=' text-end'>
                                            <NumberFormat value={E.TranM.VAmt} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                            </span>
                                        {/* <span style={{ width: '15%', textAlign: 'end' }}>{E.ContactPh1}</span> */}

                                    </>}

                            </button>
                        )
                    }).reverse()
                    }
                </div>

                :
                <div className="btn-group d-flex flex-row flex-wrap m-0 justify-content-evenly" role="group" aria-label="First group">
                    {RecAll.map((E, I) => {
                        return (
                            <button key={E.VID} className="p-1 mb-1 "
                                style={{ width: "75px", minHeight: '75px', maxHeight: '100px', borderColor: (E.VID === SelectedRec ? 'red' : 'black') }}
                                value={E.VID} onClick={(e) => { setSelectedRec(E.VID); HandleListItemClicked(E) }}>

                                <div className="card shadow  p-0 m-0"  >
                                    {/* <span style={{ position: 'absolute', top: '0px', left: '0px', fontSize: '8px' }}
                                        className={" text-secondary "} >
                                        {E.Id}
                                    </span> */}

                                    <div className="card-img-top px-0 pt-0 mb-0 text-center " >
                                        {/* <img src={`Images/ItemsStore/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="..." */}
                                        {/* <img src={'Images/AdminPanel/Default/DefaultSupplier.png'} style={{ width: "75%", height: '100px', color: '#e040fb' }} alt="..." /> */}

                                        {/* <img src={process.env.REACT_APP_API_URL + `Suppliers/GetFile/${E.TranM.RefTrader.PicURL}`} style={{ width: "100%", height: '50px', color: '#e040fb' }} alt="..." /> */}
                                    </div>

                                    <div className="card-body p-0 m-0" >
                                        {/* <div className="card-title m-0 p-0" style={{ lineHeight: 1 }}>{Title.trim()}</div> */}
                                        <div className="mt-1 text-center text-black" style={{ fontSize: '8px', lineHeight: '1' }}>{E.TranM.VNo}</div>
                                        <div className="mt-1 text-center text-black" style={{ fontSize: '8px', lineHeight: '1' }}>{Moment(E.TranM.VDte).format('DD MMM YY, ddd')}</div>
                                        <div className="mt-1 text-center text-black" style={{ fontSize: '10px', lineHeight: '1' }}>Rs. {E.TranM.VAmt}</div>
                                        {/* <div className="card-title text-center text-primary" style={{ fontSize: '10px' }}>{E.Title.trim()}</div> */}
                                    </div>

                                </div>
                            </button>
                        )
                    }).reverse()
                    }
                </div>
            }

        </div >

    </>)
}

