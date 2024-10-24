import React, { useState } from 'react'
import { HiOutlineViewGridAdd, HiOutlineViewList } from 'react-icons/hi'
import { TfiViewList } from 'react-icons/tfi'

export default function RecsComboViews({ RecAll, HandleListItemClicked, SizeFlagFS }) {
    const [DispType, setDispType] = useState(true)
    const [SelectedRec, setSelectedRec] = useState('')

    return (<>
        {/* <div className="d-flex flex-wrap justify-content-evenly " style={{overflow:'hidden'}}> */}
        <div className="card-header py-0 w-100 d-flex align-items-center" style={{ background: '#e0e0e0' }}>
            <div>System Users</div>
            {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}><TbWiperWash /></span> */}
            {/* <span className='ms-auto ' onClick={() => HandleDatabase('Add')}><AiFillAccountBook /></span> */}
            {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}>Edit<AiFillAccountBook /></span> */}

            <div className='ms-auto mx-2 fs-6 ' onClick={() => setDispType(p => !p)}><TfiViewList /></div>
            <div className='fs-5 ' onClick={() => setDispType(p => !p)}><HiOutlineViewGridAdd /></div>
        </div>

        <div className="card-body p-0" style={{ height: '75vh', overflowY: 'auto' }}>
            {DispType
                ? <div className="btn-group d-flex flex-column m-0" role="group" aria-label="First group">
                    {RecAll.map((E, I) => {
                        // return <button className='d-flex mb-2 ' key={E.iD} onClick={() =>{DispRecInAlert(E,'Selected'); HandleListItemClicked(E)}}>
                        return (
                            <button className='btn btn-sm d-flex px-1 py-0 text-start border-bottom '
                            style={{ fontSize: '10px' }} key={E.ID} onClick={() => { setSelectedRec(E.ID); HandleListItemClicked(E) }}>

                                {(SizeFlagFS == 'F') &&
                                    <>
                                        <span style={{ width: '20%' }}>{E.ID} </span>
                                        {/* <span style={{ width: '15%' }}>{E.Code} </span> */}
                                        <span style={{ width: '25%' }}>{E.Title}</span>
                                        <span style={{ width: '25%' }}>{E.Desc}</span>
                                        <span style={{ width: '20%' }}>{E.Rem}</span>
                                        <span style={{ width: '10%' }}>{E.RollId}</span>
                                        {/* <span style={{ width: '10%' }}>{E.RecStatus}</span> */}

                                        {/* <span style={{ width: '20%' }}>{Rec.ID ? (Cats.find((P) => P.Code.trim() === E.CatCode.trim())).Title.substr(0,10) : (Cats.find((P) => P.Code.trim() === E.CatCode.trim())).Title }</span> */}
                                        {/* <span style={{ width: '10%' }} className=' text-end'>@Rs. {E.Price}</span> */}
                                        {/* <span style={{ width: '10%' }} className=' text-end'>{E.Unit}</span> */}
                                        {/* <span style={{ width: '15%', textAlign: 'end' }}>{E.ContactPh1}</span> */}
                                    </>}

                                {(SizeFlagFS != 'F') &&
                                    <>
                                        <span style={{ width: '20%' }}>{E.ID}</span>
                                        {/* <span style={{ width: '15%' }}>{E.Code} </span> */}
                                        <span style={{ width: '40%' }}>{E.Title}  </span>
                                        <span style={{ width: '35%' }}>{E.Desc}</span>
                                        <span style={{ width: '5%' }}>{E.RollId}</span>
                                        {/* <span style={{ width: '10%' }}>{E.RecStatus}</span> */}

                                        {/* <span style={{ width: '20%' }} className=' text-end'>@Rs. {E.Price}</span> */}
                                    </>}

                            </button>
                        )
                    }).reverse()
                    }
                </div>

                :
                <div className="btn-group d-flex flex-row flex-wrap m-0 justify-content-between" role="group" aria-label="First group">
                    {RecAll.map((E, I) => {
                        return (
                            <button key={E.ID} className="p-1 mb-1 " 
                                style={{ width: "75px", minHeight: '75px', maxHeight: '100px' , borderColor: (E.ID === SelectedRec?'red':'black') }} 
                                value={E.ID} onClick={(e) => {setSelectedRec(E.ID); HandleListItemClicked(E)}}>

                                <div className="card shadow  p-0 m-0"  >
                                    <span style={{ position: 'absolute', top: '0px', left: '0px', fontSize: '8px' }}
                                        className={" text-secondary "} >
                                        {E.ID}
                                    </span>

                                    <div className="card-img-top px-0 pt-0 mb-0 text-center " >
                                        {/* <img src={`Images/ItemsStore/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="..." */}
                                        {/* <img src={'Images/AdminPanel/Default/DefaultSupplier.png'} style={{ width: "75%", height: '100px', color: '#e040fb' }} alt="..." /> */}

                                        <img src={process.env.REACT_APP_API_URL + `Staff/GetFile/${E.PicURL}`} style={{ width: "100%", height: '50px', color: '#e040fb' }} alt="..." />
                                    </div>

                                    <div className="card-body p-0">
                                        {/* <div className="card-title m-0 p-0" style={{ lineHeight: 1 }}>{Title.trim()}</div> */}
                                        <div className="card-title text-center text-black" style={{ fontSize: '8px', lineHeight: '1' }}>{E.Title.trim()}</div>
                                        <div className="card-title text-center text-black" style={{ fontSize: '10px', lineHeight: '1' }}>{E.Desc.trim()}</div>
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

