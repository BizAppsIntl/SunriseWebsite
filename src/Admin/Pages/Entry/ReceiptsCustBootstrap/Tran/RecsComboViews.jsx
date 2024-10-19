import React, { useEffect, useState } from 'react'

import Moment from 'moment'

import { HiOutlineViewGridAdd, HiOutlineViewList } from 'react-icons/hi'
import { TfiViewList } from 'react-icons/tfi'
import NumberFormat from 'react-number-format'
import { Alert } from 'react-bootstrap'
import { RiSearchEyeLine } from 'react-icons/ri'
import { MdFindReplace } from 'react-icons/md'

export default function RecsComboViews({ RecAll, HandleListItemClicked, SizeFlagFS }) {
    const [DispType, setDispType] = useState(true)
    const [SelectedRec, setSelectedRec] = useState('')

    const [Txt2Search, setTxt2Search] = useState('')
    const [FilteredRecs, setFilteredRecs] = useState(RecAll ? RecAll : [])

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if (RecAll) setFilteredRecs(RecAll)

        //....  ABORT  ......................................
        return () => { controller.abort() };
    }, [])


    //const HandleBtnRefilter = () => { setNeed2Refilter(p => !p) }
    const HandleBtnRefilter = () => {
        //setNeed2Refilter(p => !p)

        //SearchInputSelect && alert(`Yes SearchInputSelect length: ${SearchInputSelect.length}    witb some value: ${SearchInputSelect}` )
        // if (SearchInputSelect.length <= 0)
        //AlertRec(RecAll, 'DATA_RECS ' +Txt2Search)
        if (Txt2Search.length <= 0)
            setFilteredRecs(RecAll)
        else
        //  setFilteredRecs(DATA_RECS.filter(E => SearchInputSelect.includes(E.DocRefId)))
        {
            const recs = RecAll.filter(E =>
                E.TranM.Desc?.toLowerCase().includes(Txt2Search.toLowerCase())
                ||
                E.TranM.RefTrader.Title?.toLowerCase().includes(Txt2Search.toLowerCase())
            )
            // ).map((E, I) => { return ({ ...E, Idx: I + 1 }) })    

            // alert('Refilter-Text: ' + Txt2Search+ '  Records-Found:' + recs.length)
            setFilteredRecs(recs)

        }
    }

    return (<>
        {/* {AlertRec(RecAll, 'Rec to Display Voucher')} */}

        {/* <div className="d-flex flex-wrap justify-content-evenly " style={{overflow:'hidden'}}> */}
        <div className="card-header py-0 w-100 d-flex align-items-center" style={{ background: '#e0e0e0' }}>
            <div>Payment Vouchers</div>
            {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}><TbWiperWash /></span> */}
            {/* <span className='ms-auto ' onClick={() => HandleDatabase('Add')}><AiFillAccountBook /></span> */}
            {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}>Edit<AiFillAccountBook /></span> */}

            {/* .............................................................................. */}
            {/* ............. Fiter SELECT Search Button  ............. */}
            <div className='d-flex gap-3 align-items-center mx-auto' style={{ lineHeight: '1', zIndex: '10' }}>
                {/* <div className='d-flex '>
              <input type="checkbox" checked={ShowTotal} onChange={() => setShowTotal(p => !p)} />
              &nbsp;Show Total
            </div> */}

                <div style={{ display: 'flex', alignItems: 'center', lineHeight: '1', zIndex: '10' }}>
                    <div style={{ width: '150px' }}>
                        <input type="text" value={Txt2Search}
                            name="Txt2Search" style={{ width: '100%' }}
                            onChange={(e) => {
                                // console.log(e.target.name, e.target.value);
                                // HandleInputsVoucherHeader(e)
                                setTxt2Search(e.target.value)
                            }} />
                    </div>

                    <MdFindReplace className='px-0 mx-0 text-success' style={{ width: '30px', height: '28px' }} onClick={() => { HandleBtnRefilter() }} />
                </div>

            </div>
            {/* .............................................................................. */}

            <div className='ms-auto mx-2 fs-6 ' onClick={() => setDispType(p => !p)}><TfiViewList /></div>
            <div className='fs-5 ' onClick={() => setDispType(p => !p)}><HiOutlineViewGridAdd /></div>
        </div>

        <div className="card-body p-0" style={{ height: '75vh', overflowY: 'auto' }}>
            {DispType
                ? <div className="btn-group d-flex flex-column m-0" role="group" aria-label="First group">
                    {FilteredRecs.length <= 0 ?
                        // <BoxMessage variant='danger' className='text-black' >Seems, There is No Data...</BoxMessage>
                        <Alert variant='info' className='text-black'> Check Period and Click  <RiSearchEyeLine className='mb-1 text-black' style={{ width: '26px', height: '26px' }} /> again    </Alert>

                        : <>
                            {FilteredRecs.map((E, I) => {
                                // return <button className='d-flex mb-2 ' key={E.id} onClick={() =>{DispRecInAlert(E,'Selected'); HandleListItemClicked(E)}}>
                                return (
                                    <button className='btn btn-sm d-flex px-1 py-0 text-start border-bottom '
                                        style={{ fontSize: '10px' }} key={E.VID} onClick={() => { setSelectedRec(E.VID); HandleListItemClicked(E) }}>

                                        {(SizeFlagFS == 'F') &&
                                            <>

                                                <span style={{ width: '10%' }}>{E.TranM.VNo} </span>
                                                <span style={{ width: '15%' }}>{Moment(E.TranM.VDte).format('DD MMM YY ddd')}</span>
                                                <span style={{ width: '30%' }}>{E.TranM.RefTrader.Title}</span>

                                                {/* <span style={{ width: '20%' }}>{Rec.Id ? (Cats.find((P) => P.Code.trim() === E.CatCode.trim())).Title.substr(0,10) : (Cats.find((P) => P.Code.trim() === E.CatCode.trim())).Title }</span> */}
                                                <span style={{ width: '30%' }} className=' text-end'>{E.TranM.Desc}</span>
                                                {/* <span style={{ width: '15%' }}>{E.TranM.VQtyTxt}</span> */}
                                                <span style={{ width: '15%' }} className=' text-end'>
                                                    <NumberFormat value={E.TranM.VAmt} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                                </span>
                                                {/* <span style={{ width: '15%', textAlign: 'end' }}>{E.ContactPh1}</span> */}

                                            </>}

                                        {(SizeFlagFS != 'F') &&
                                            <>
                                                <span style={{ width: '8%' }}>{E.TranM.VNo} </span>
                                                <span style={{ width: '20%' }}>{Moment(E.TranM.VDte).format('DD MMM, ddd')}</span>
                                                <span style={{ width: '27%' }}>{E.TranM.RefTrader.Title}</span>

                                                {/* <span style={{ width: '20%' }}>{Rec.Id ? (Cats.find((P) => P.Code.trim() === E.CatCode.trim())).Title.substr(0,10) : (Cats.find((P) => P.Code.trim() === E.CatCode.trim())).Title }</span> */}
                                                <span style={{ width: '25%' }} >{E.TranM.Desc}</span>
                                                <span style={{ width: '15%' }} className=' text-end'>
                                                    <NumberFormat value={E.TranM.VAmt} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                                </span>
                                                {/* <span style={{ width: '15%', textAlign: 'end' }}>{E.ContactPh1}</span> */}

                                            </>}

                                    </button>
                                )
                            }).reverse()
                            }
                        </>
                    }
                </div>

                :
                <div className="btn-group d-flex flex-row flex-wrap m-0 justify-content-evenly" role="group" aria-label="First group">
                    {FilteredRecs.length <= 0 ?
                        // <BoxMessage variant='danger' className='text-black' >Seems, There is No Data...</BoxMessage>
                        <Alert variant='info' className='text-black'> Check Period and Click  <RiSearchEyeLine className='mb-1 text-black' style={{ width: '26px', height: '26px' }} /> again    </Alert>

                        : <>
                            {FilteredRecs.map((E, I) => {
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

                                                <img src={process.env.REACT_APP_API_URL + `Traders/GetFile/${E.TranM.RefTrader.PicURL}`} style={{ width: "100%", height: '50px', color: '#e040fb' }} alt="..." />
                                            </div>

                                            <div className="card-body p-0 m-0" >
                                                {/* <div className="card-title m-0 p-0" style={{ lineHeight: 1 }}>{Title.trim()}</div> */}
                                                <div className="mt-1 text-center text-black" style={{ fontSize: '8px', lineHeight: '1' }}>{E.TranM.VNo}</div>
                                                <div className="mt-1 text-center text-black" style={{ fontSize: '8px', lineHeight: '1' }}>{Moment(E.TranM.VDte).format('DD MMM YY, ddd')}</div>
                                                <div className="mt-1 text-center text-black" style={{ fontSize: '10px', lineHeight: '1' }}>
                                                    <NumberFormat value={E.TranM.VAmt} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                                </div>
                                                {/* <div className="card-title text-center text-primary" style={{ fontSize: '10px' }}>{E.Title.trim()}</div> */}
                                            </div>

                                        </div>
                                    </button>
                                )
                            }).reverse()
                            }
                        </>
                    }
                </div>
            }

        </div >

    </>)
}

