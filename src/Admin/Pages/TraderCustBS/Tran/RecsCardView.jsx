import React, { useState } from 'react'

import ImgMale from '../../../ImagesAdminPanel/default/Male.png'
import ImgFemale from '../../../ImagesAdminPanel/default/Female.png'

import { HiOutlineViewGridAdd, HiOutlineViewList } from 'react-icons/hi'
import { TfiViewList } from 'react-icons/tfi'
import { AlertRec } from '../../../../StdLib'
import MyAvatar from '../../../../Utils/MyAvatar'
import defaultIcon from '../../../ImagesAdminPanel/default/Customers.png'

export default function RecsCardView({ RecsAll, HandleListItemClicked, SizeFlag }) {
    const [DispType, setDispType] = useState(true)


    return (<>

        {/* {AlertRec(RecsAll, 'RecsAll')} */}

        {/* <div className="d-flex flex-wrap justify-content-evenly " style={{overflow:'hidden'}}> */}
        <div className="card-header py-0 w-100 d-flex align-items-center" style={{ background: '#e0e0e0' }}>
        <img src={defaultIcon} alt="Default" width='40px' height='24px' />
            <div className='ms-2 '>Customers</div>
            {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}><TbWiperWash /></span> */}
            {/* <span className='ms-auto ' onClick={() => HandleDatabase('Add')}><AiFillAccountBook /></span> */}
            {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}>Edit<AiFillAccountBook /></span> */}

            <div className='ms-auto mx-2 fs-6 ' onClick={() => setDispType(p => !p)}><TfiViewList /></div>
            <div className='fs-5 ' onClick={() => setDispType(p => !p)}><HiOutlineViewGridAdd /></div>
        </div>

        <div className="card-body p-0" style={{ height: '75vh', overflowY: 'auto' }}>
            {DispType
                ? <div className="btn-group d-flex flex-column m-0" role="group" aria-label="First group">
                    {RecsAll?.map((E, I) => {
                        // return <button className='d-flex mb-2 ' key={E.id} onClick={() =>{DispRecInAlert(E,'Selected'); HandleListItemClicked(E)}}>
                        return (

                            <button className='btn btn-sm d-flex px-1 py-0 text-start border-bottom '
                                style={{ fontSize: '10px' }} key={E.Id} onClick={() => { HandleListItemClicked(E) }}>

                                {(SizeFlag == 'F') && <>
                                    <span style={{ width: '5%' }}>{E.Id}</span>

                                    <span className='d-flex justify-content-center' style={{ width: '7%' }}>
                                        {/* <img src={(E.Gender > 0) ? ImgMale : ImgFemale} style={{ width: "15px", height: '10px', color: '#e040fb' }} alt="..." /> */}

                                        {(E.PicURL !== null && E.PicURL.trim())
                                            ? <img style={{ width: "26px", height: '16px', color: '#e040fb' }} alt="..."
                                                src={
                                                    E.PicURL !== null && E.PicURL.trim()
                                                        ? process.env.REACT_APP_API_URL + `Traders/GetFile/${E.PicURL}`
                                                        : ''
                                                } />

                                            : <MyAvatar Text={E.Title[0]} Size={16} />
                                        }
                                    </span>

                                    <span style={{ width: '15%' }}>{E.Code}</span>

                                    {/* {E.RefType === '1'
                                        ? <span style={{ width: '45%' }}> <strong>{E.Title}</strong>  </span>
                                        : <span style={{ width: '45%' }}>{E.Title}  </span>
                                    } */}

                                    <span style={{ width: '43%' }}>{E.Title}  </span>
                                    <span style={{ width: '20%' }}>{E.Desc}</span>
                                    {/* <span style={{ width: '20%' }}>{E.Contact1}</span> */}
                                    <span style={{ width: '20%', textAlign: 'end' }}>{E.City}</span>
                                </>}

                                {(SizeFlag != 'F') && <>
                                    <span style={{ width: '8%' }}>{E.Id}</span>
                                    <span className='d-flex justify-content-center' style={{ width: '10%' }}>
                                        {/* <img src={(E.Gender > 0) ? ImgMale : ImgFemale} style={{ width: "15px", height: '10px', color: '#e040fb' }} alt="..." /> */}

                                        {(E.PicURL !== null && E.PicURL.trim())
                                            ? <img style={{ width: "26px", height: '16px', color: '#e040fb' }} alt="..."
                                                src={
                                                    E.PicURL !== null && E.PicURL.trim()
                                                        ? process.env.REACT_APP_API_URL + `Traders/GetFile/${E.PicURL}`
                                                        : ''
                                                } />

                                            : <MyAvatar Text={E.Title[0]} Size={16} />
                                        }
                                    </span>

                                    {/* {E.RefType === '1'
                                        ? <span style={{ width: '60%' }}> <strong>{E.Title}</strong>  </span>
                                        : <span style={{ width: '60%' }}>{E.Title}  </span>
                                    } */}
                                    <span style={{ width: '42%' }}>{E.Title}  </span>

                                    {/* <span style={{ width: '30%' }}>{E.Desc}</span> */}
                                    <span style={{ width: '25%', textAlign: 'end' }}>{E.City}</span>
                                </>}

                            </button>
                        )
                    }).reverse()
                    }
                </div>

                :
                <div className="btn-group d-flex flex-row flex-wrap m-0 justify-content-evenly " role="group" aria-label="First group">
                    {RecsAll?.map((E, I) => {
                        return (
                            <button key={E.Id} className="p-1 mb-1 " style={{ width: "75px", minHeight: '75px', maxHeight: '100px' }}
                                value={E.Id} onClick={(e) => HandleListItemClicked(E)}>

                                <div className="card shadow  p-0 m-0 h-100"  >
                                    <div className="card-img-top px-0 pt-0 mb-2 " >
                                        {/* <img src={`Images/ItemsStore/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="..." */}
                                        {/* <img src={'Images/AdminPanel/Default/DefaultCustomer.png'} style={{ width: "75%", height: '100px', color: '#e040fb' }} alt="..." /> */}
                                        {/* <img src={process.env.REACT_APP_API_URL + `Customers/GetFile/${E.PicURL}`}  style={{ width: "100%", height: '50px', color: '#e040fb' }} alt="..." /> */}

                                        {/* WORKING ============{E.PicURL.trim()
                                            ? <img src={process.env.REACT_APP_API_URL + `Customers/GetFile/${E.PicURL}`} style={{ width: "100%", height: '50px', color: '#e040fb' }} alt="..." />
                                            : <img src={(E.Gender > 0) ? ImgMale : ImgFemale} style={{ width: "100%", height: '50px', color: '#e040fb' }} alt="..." />
                                        } */}


                                        {(E.PicURL !== null && E.PicURL.trim())
                                            ? <img style={{ width: "100%", height: '50px', color: '#e040fb' }} alt="..."
                                                src={
                                                    E.PicURL !== null && E.PicURL.trim()
                                                        ? process.env.REACT_APP_API_URL + `Traders/GetFile/${E.PicURL}`
                                                        : ''
                                                } />

                                        : <span className='d-flex justify-content-center' > <MyAvatar Text={E.Title[0]} Size={50} /> </span>
                                        }

                                    </div>

                                    <div className="card-body p-0" >
                                        {/* <div className="card-title m-0 p-0" style={{ lineHeight: 1 }}>{Title.trim()}</div> */}
                                        <div className="card-title text-center text-black" style={{ lineHeight: '1', fontSize: '10px' }}>{E.Title.trim()}</div>
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

