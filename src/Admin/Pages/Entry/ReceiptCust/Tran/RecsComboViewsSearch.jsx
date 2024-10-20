import React, { useEffect, useState } from 'react'

import Moment from 'moment'

import { HiOutlineViewGridAdd, HiOutlineViewList } from 'react-icons/hi'
import { TfiViewList } from 'react-icons/tfi'
import NumberFormat from 'react-number-format'
import ReactDatePicker from 'react-datepicker'
import { RiSearchEyeLine } from 'react-icons/ri'
import { MdFindReplace } from 'react-icons/md'
import { FaLayerGroup } from 'react-icons/fa'
import { AlertRec } from '../../../../../StdLib'
// import { Alert } from 'react-bootstrap'

export default function RecsComboViewsSearch({ RecAll, HandleListItemClicked, SizeFlagFS, FetchData, SearchInput, setSearchInput, TriggerShow }) {
    const [DispType, setDispType] = useState(true)
    const [SelectedRec, setSelectedRec] = useState('')

    const [Txt2Search, setTxt2Search] = useState('')
    const [FilteredRecs, setFilteredRecs] = useState(RecAll && RecAll)


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

    // AlertRec(RecAll, 'RecAll in RecsComboViewsSearch')
    return (<>
        <div className={`card  ${TriggerShow ? "block" : " hidden md:block"}`} >
            {/* SizeFlagFS:{SizeFlagFS} */}
            {/* <div className="flex flex-wrap justify-evenly " style={{overflow:'hidden'}}> */}
            <div className="card-header py-0 " style={{ background: '#e0e0e0' }}>

                {SizeFlagFS == 'S'
                    ? <div className='flex justify-between items-center w-full'>

                        <div className='flex '>
                            <div className='text-2xl leading-none'>Sales<br /> Invoices</div>
                            <div>
                                <table >
                                    <tr>
                                        <th className='text-end'>Period</th>
                                        <td>
                                            <ReactDatePicker className='text-blue-500 w-[100px] p-0 mx-1 text-sm z-10 ' id='DteFrom'
                                                // style={{height:'20px'}}
                                                // name="VDte" value={VoucherCart.VDte === ''
                                                //     // ? `${ (new Date()).getDate() } /${(new Date()).getMonth()+1}/${ (new Date()).getFullYear() } `
                                                //     ? `${ (new Date()).getDate() } ${ (new Date()).toDateString().substr(4, 1) } ${ (new Date()).getFullYear() } `
                                                //     : VoucherCart.VDte} dateFormat='d MMM yy' id="VDte"

                                                // selected={new Date((VoucherCart.VDte) ? VoucherCart.VDte : Date())}
                                                name="DteFrom" value={SearchInput.DteFrom === ''
                                                    ? Moment(SearchInput.DteFrom).format('DD MMM YY, ddd')
                                                    : Moment(SearchInput.DteFrom).format('DD MMM YY, ddd')}
                                                // : VoucherCart.VDte} dateFormat='d MMM yy'
                                                // ? `${(new Date()).getDate()} /${(new Date()).getMonth() + 1}/${(new Date()).getFullYear()} `

                                                dateFormat='d MMM yy'
                                                selected={new Date((SearchInput.DteFrom) ? SearchInput.DteFrom : Date())}
                                                readOnly={false}
                                                allowClear={true}
                                                onChange={(dte) => setSearchInput(() => ({ ...SearchInput, DteFrom: dte }))}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className='text-end'>To</th>
                                        <td>
                                            <ReactDatePicker className='text-blue-500 w-[100px] p-0 mx-1 text-sm z-10 ' id='DteTo'
                                                // style={{height:'20px'}}
                                                // name="VDte" value={VoucherCart.VDte === ''
                                                //     // ? `${ (new Date()).getDate() } /${(new Date()).getMonth()+1}/${ (new Date()).getFullYear() } `
                                                //     ? `${ (new Date()).getDate() } ${ (new Date()).toDateString().substr(4, 1) } ${ (new Date()).getFullYear() } `
                                                //     : VoucherCart.VDte} dateFormat='d MMM yy' id="VDte"

                                                // selected={new Date((VoucherCart.VDte) ? VoucherCart.VDte : Date())}
                                                name="DteTo" value={SearchInput.DteTo === ''
                                                    ? Moment(SearchInput.DteTo).format('DD MMM YY, ddd')
                                                    : Moment(SearchInput.DteTo).format('DD MMM YY, ddd')}
                                                // : VoucherCart.VDte} dateFormat='d MMM yy'
                                                // ? `${(new Date()).getDate()} /${(new Date()).getMonth() + 1}/${(new Date()).getFullYear()} `
        
                                                dateFormat='d MMM yy'
                                                selected={new Date((SearchInput.DteTo) ? SearchInput.DteTo : Date())}
                                                readOnly={false}
                                                allowClear={true}
                                                onChange={(dte) => setSearchInput(() => ({ ...SearchInput, DteTo: dte }))}
                                            />
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <div>
                                <RiSearchEyeLine className='text-amber-700' style={{ width: '26px', height: '22px' }} onClick={() => { FetchData() }} />
                            </div>

                        </div>

                        <div >
                            <div className='mb-2' onClick={() => setDispType(0)}><TfiViewList /></div>
                            <div className='' onClick={() => setDispType(1)}><HiOutlineViewGridAdd /></div>
                        </div>
                    </div>
                    :
                    <div className="card-header py-0 md:px-2 gap-2 flex flex-wrap md:flex-nowrap items-center leading-1">


                        {/*header text-part left */}
                        <div className='flex gap-2 md:gap-4 w-full md:w-auto items-center'>
                            <div className='text-xl font-bold'> Sales <span className='hidden md:inline-flex'> Invoices</span> </div>
                            {/* -----------PERIOD & SEARCH----------- */}

                            {/* ............. Display BUTTON SEARCH text and Icon  ............. */}
                            <div className='flex gap-1 items-center border'>

                                <div className='flex'>
                                    <label>Period:</label>
                                    <ReactDatePicker className='text-blue-500 w-[100px] p-0 mx-1 text-sm z-10 ' id='DteFrom'
                                        // style={{height:'20px'}}
                                        // name="VDte" value={VoucherCart.VDte === ''
                                        //     // ? `${ (new Date()).getDate() } /${(new Date()).getMonth()+1}/${ (new Date()).getFullYear() } `
                                        //     ? `${ (new Date()).getDate() } ${ (new Date()).toDateString().substr(4, 1) } ${ (new Date()).getFullYear() } `
                                        //     : VoucherCart.VDte} dateFormat='d MMM yy' id="VDte"

                                        // selected={new Date((VoucherCart.VDte) ? VoucherCart.VDte : Date())}
                                        name="DteFrom" value={SearchInput.DteFrom === ''
                                            ? Moment(SearchInput.DteFrom).format('DD MMM YY, ddd')
                                            : Moment(SearchInput.DteFrom).format('DD MMM YY, ddd')}
                                        // : VoucherCart.VDte} dateFormat='d MMM yy'
                                        // ? `${(new Date()).getDate()} /${(new Date()).getMonth() + 1}/${(new Date()).getFullYear()} `

                                        dateFormat='d MMM yy'
                                        selected={new Date((SearchInput.DteFrom) ? SearchInput.DteFrom : Date())}
                                        readOnly={false}
                                        allowClear={true}
                                        onChange={(dte) => setSearchInput(() => ({ ...SearchInput, DteFrom: dte }))}
                                    />
                                </div>

                                <div className='flex'>
                                    <label >To:</label>
                                    <ReactDatePicker className='text-blue-500 w-[100px] p-0 mx-1 text-sm z-10 ' id='DteTo'
                                        // name="VDte" value={VoucherCart.VDte === ''
                                        //     // ? `${ (new Date()).getDate() } /${(new Date()).getMonth()+1}/${ (new Date()).getFullYear() } `
                                        //     ? `${ (new Date()).getDate() } ${ (new Date()).toDateString().substr(4, 1) } ${ (new Date()).getFullYear() } `
                                        //     : VoucherCart.VDte} dateFormat='d MMM yy' id="VDte"

                                        // selected={new Date((VoucherCart.VDte) ? VoucherCart.VDte : Date())}
                                        name="DteTo" value={SearchInput.DteTo === ''
                                            ? Moment(SearchInput.DteTo).format('DD MMM YY, ddd')
                                            : Moment(SearchInput.DteTo).format('DD MMM YY, ddd')}
                                        // : VoucherCart.VDte} dateFormat='d MMM yy'
                                        // ? `${(new Date()).getDate()} /${(new Date()).getMonth() + 1}/${(new Date()).getFullYear()} `

                                        dateFormat='d MMM yy'
                                        selected={new Date((SearchInput.DteTo) ? SearchInput.DteTo : Date())}
                                        readOnly={false}
                                        allowClear={true}
                                        onChange={(dte) => setSearchInput(() => ({ ...SearchInput, DteTo: dte }))}
                                    />
                                </div>

                                {/* ............. Display BUTTON SEARCH text and Icon  ............. */}


                                <RiSearchEyeLine className='text-amber-700' style={{ width: '26px', height: '22px' }} onClick={() => { FetchData() }} />

                            </div>
                        </div>

                        {/* -----------END PERIOD & SEARCH------- */}

                        {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}><TbWiperWash /></span> */}
                        {/* <span className='ms-auto ' onClick={() => HandleDatabase('Add')}><AiFillAccountBook /></span> */}
                        {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}>Edit<AiFillAccountBook /></span> */}


                        {/*header text-part right */}
                        <div className=' flex w-full md:w-auto px-1 ms-auto items-center justify-between md:justify-end'>
                            {/* .............................................................................. */}
                            {/* ............. Fiter SELECT Search Button  ............. */}
                            {/* <div className='flex '>
                            <input type="checkbox" checked={ShowTotal} onChange={() => setShowTotal(p => !p)} />
                            &nbsp;Show Total
                            </div> */}

                            <div className='flex items-center me-6'>
                                <input type="text" value={Txt2Search} name="Txt2Search"
                                    className=' text-blue-500 w-[150px] p-0 mx-1 text-sm '
                                    placeholder='Text to search'
                                    onChange={(e) => {
                                        // console.log(e.target.name, e.target.value);
                                        // HandleInputsVoucherHeader(e)
                                        setTxt2Search(e.target.value)
                                    }} />

                                <MdFindReplace className='px-0 mx-0 text-green-500' style={{ width: '30px', height: '28px' }} onClick={() => { HandleBtnRefilter() }} />
                            </div>
                            {/* .............................................................................. */}

                            <div className='ms-auto  ' onClick={() => setDispType(0)}><TfiViewList /></div>
                            <div className='ms-2' onClick={() => setDispType(1)}><HiOutlineViewGridAdd /></div>
                            {/* <div className=' ' onClick={() => setDispType(2)}><FaLayerGroup /></div> */}

                            {/* {PrintButton &&
                <button className='btn btn-sm btn-info py-0 px-1 ' style={{ height: '25px' }} onClick={() => HandlePrinting()}>
                    <span style={{ fontSize: 'smaller' }}>Print</span> <GrPrint />
                </button>
            } */}
                        </div>
                    </div>

                }


            </div>



            <div className="card-body p-0" style={{ height: '80vh', overflowY: 'auto' }}>
                {DispType
                    ? <div className="flex flex-col m-0" role="group" aria-label="First group">
                        {FilteredRecs.length <= 0 ?
                            // <BoxMessage variant='danger' className='text-black' >Seems, There is No Data...</BoxMessage>
                            // <Alert variant='info' className='text-black'> Check Period and Click  <RiSearchEyeLine className='mb-1 text-black' style={{ width: '26px', height: '26px' }} /> again    </Alert>
                            <p>There was a special No Data alert</p>
                            : <>
                                {FilteredRecs.map((E, I) => {
                                    // return <button className='flex mb-2 ' key={E.id} onClick={() =>{DispRecInAlert(E,'Selected'); HandleListItemClicked(E)}}>
                                    return (
                                        <button className='flex px-1 py-0 text-start border border-b-gray-100 '
                                            style={{ fontSize: '10px' }} key={E.VID} onClick={() => { setSelectedRec(E.VID); HandleListItemClicked(E) }}>

                                            {(SizeFlagFS === 'F') &&
                                                <>
                                                    <span style={{ width: '7%' }}>{E.TranM.VNo} </span>
                                                    <span style={{ width: '15%' }}>{Moment(E.TranM.VDte).format('DD MMM YY ddd')}</span>

                                                    <span style={{ width: '7%' }}>
                                                        <img src={process.env.REACT_APP_API_URL + `Traders/GetFile/${E.TranM.RefTrader.PicURL}`} style={{ width: "15px", height: '15px', color: '#e040fb' }} alt="..." />
                                                    </span>                                                    <span style={{ width: '20%' }}>{E.TranM.RefTrader.Title}</span>

                                                    {/* <span style={{ width: '20%' }}>{Rec.Id ? (Cats.find((P) => P.Code.trim() === E.CatCode.trim())).Title.substr(0,10) : (Cats.find((P) => P.Code.trim() === E.CatCode.trim())).Title }</span> */}
                                                    <span style={{ width: '25%' }} className=' text-start'>{E.TranM.Desc}</span>
                                                    <span style={{ width: '25%' }} className=' text-start'>{E.TranM.Rem}</span>

                                                    <span style={{ width: '5%', textAlign: 'center' }}>{E.TranRs[0].Title.slice(0, 5)}</span>

                                                    <span style={{ width: '16%' }} className=' text-end'>
                                                        <NumberFormat value={E.TranM.VAmt} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                                                    </span>
                                                    {/* <span style={{ width: '15%', textAlign: 'end' }}>{E.ContactPh1}</span> */}

                                                </>}

                                            {(SizeFlagFS !== 'F') &&
                                                <>
                                                    <span style={{ width: '6%' }}>{E.TranM.VNo} </span>
                                                    <span style={{ width: '7%' }}>
                                                        <img src={process.env.REACT_APP_API_URL + `Traders/GetFile/${E.TranM.RefTrader.PicURL}`} style={{ width: "15px", height: '15px', color: '#e040fb' }} alt="..." />
                                                    </span>
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
                    <div className="flex flex-row flex-wrap m-0 justify-evenly" >
                        {FilteredRecs.length <= 0 ?
                            // <BoxMessage variant='danger' className='text-black' >Seems, There is No Data...</BoxMessage>
                            // < variant='info' className='text-black'> Check Period and Click  <RiSearchEyeLine className='mb-1 text-black' style={{ width: '26px', height: '26px' }} /> again    </A>
                            <p>Alert for NO DATA</p>
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
        </div >

    </>)
}

