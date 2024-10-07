import { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import moment from "moment"

import { FaLayerGroup } from 'react-icons/fa'
import { GrPrint } from 'react-icons/gr'
import { HiOutlineViewGridAdd, HiOutlineViewList } from 'react-icons/hi'
import { TfiViewList } from 'react-icons/tfi'

import { AlertConfirm, AlertRec } from '../../../../StdLib'
// import Logo from '../../../../../SiteImages/Logo.jpg'
import Logo from '../../../../Assets/SiteImages/logo.png'

let CatCodeOld = ''
let newGroupTitle = ''

export default function RecsComboViews({ RecAll, HandleListItemClicked, HandleListItemClickedDbl, SizeFlagFS, ListDispTypeDefault }) {
    const [DispType, setDispType] = useState(ListDispTypeDefault)
    const [SelectedRec, setSelectedRec] = useState('')
    const [PrintButton, setPrintButton] = useState(false)

    // START   ==================[  Handle Printing  ]=====================
    const compRefX = useRef();
    // const compRef = useRef();
    // const handlePrint = useReactToPrint({
    //     content: () => compRefX.current,
    //     // content: () => 'Bismillah',
    //     onAfterPrint: () => alert('Print succeeded')
    // })

    const HandlePrinting = useReactToPrint({
        // content: () => compRef.current,
        //content: () => compRefX.current,
        content: () => compRefX.current,
        // onAfterPrint: () => alert('Print succeeded')
    })
    // END   ==================[  Handle Printing  ]=====================

    const PrintButtonToggle = () => setPrintButton(p => !p)

    const GroupSeperator = (E) => {
        if (CatCodeOld === E.CatCode) newGroupTitle = ''
        else {
            CatCodeOld = E.CatCode
            newGroupTitle = <div>{E.CatTitle}</div>
        }
        return (newGroupTitle)
    }

    return (<>
    <div className='card'>
        {/* <div className="flex flex-wrap justify-evenly " style={{overflow:'hidden'}}> */}
        <div className="card-header py-0  flex items-center" style={{ background: '#e0e0e0' }}>
            <div>Items <span onDoubleClick={() => PrintButtonToggle()}>List</span></div>
            {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}><TbWiperWash /></span> */}
            {/* <span className='ms-auto ' onClick={() => HandleDatabase('Add')}><AiFillAccountBook /></span> */}
            {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}>Edit<AiFillAccountBook /></span> */}

            <div className='ms-auto mx-2  ' onClick={() => setDispType(0)}><TfiViewList /></div>
            <div className=' ' onClick={() => setDispType(1)}><HiOutlineViewGridAdd /></div>
            <div className=' ' onClick={() => setDispType(2)}><FaLayerGroup /></div>

            {/* {PrintButton &&
                <button className='btn btn-sm btn-info py-0 px-1 ' style={{ height: '25px' }} onClick={() => HandlePrinting()}>
                    <span style={{ fontSize: 'smaller' }}>Print</span> <GrPrint />
                </button>
            } */}
        </div>

        <div className="card-body p-0" style={{maxHeight: '75vh', overflowY: 'auto' }}>
            {DispType === 0         //0-list, 1-Grid, 2-group
                ? <div className=" flex flex-col" >
                    {RecAll?.map((E, I) => {
                        // return <button className='flex mb-2 ' key={E.id} onClick={() =>{DispRecInAlert(E,'Selected'); HandleListItemClicked(E)}}>
                        return (
                            <button className='flex px-1 py-0 '
                                style={{ fontSize: '10px' }} key={I}
                                onClick={() => { setSelectedRec(E.Id); HandleListItemClicked(E) }}
                                onDoubleClick={() => { setSelectedRec(E.Id); HandleListItemClickedDbl(E) }} >

                                {(SizeFlagFS === 'F') &&
                                    <>
                                        <span style={{ width: '10%' }}>{E.Id} </span>
                                        <span style={{ width: '30%' }}>{E.Title}</span>
                                        {/* <span style={{ width: '20%' }}>{E.TitleU}</span> */}
                                        <span style={{ width: '20%' }}>{E.Desc}</span>
                                        {/* <span style={{ width: '20%' }}>{E.CatItemTitle}</span> */}

                                        {/* <span style={{ width: '20%' }}>{Rec.Id ? (Cats.find((P) => P.Code.trim() === E.CatCode.trim())).Title.substr(0,10) : (Cats.find((P) => P.Code.trim() === E.CatCode.trim())).Title }</span> */}
                                        <span style={{ width: '20%' }} className=' text-end'>{E.Unit} @ Rs. {E.Price}</span>
                                        {/* <span style={{ width: '10%' }} className=' text-end'>{E.Unit}</span> */}
                                        {/* <span style={{ width: '15%', textAlign: 'end' }}>{E.ContactPh1}</span> */}
                                    </>}

                                {(SizeFlagFS !== 'F') &&
                                    <>
                                        <span style={{ width: '15%' }}>{E.Id}</span>
                                        <span style={{ width: '35%' }}>{E.Title}  </span>
                                        {/* <span style={{ width: '20%' }}>{E.TitleU}</span> */}
                                        {/* <span style={{ width: '30%' }}>{E.CatItemTitle}</span> */}
                                        <span style={{ width: '20%' }} className=' text-end'>@ {E.Price}</span>
                                    </>}

                            </button>
                        )
                    }).reverse()
                    }
                </div>

                : DispType === 1            // //0-list, 1-Grid, 2-group
                    ? <div className="flex flex-row flex-wrap m-0 justify-between" >
                        {RecAll?.map((E, I) => {
                            return (
                                <button key={E.Id} className="p-1 mb-1 relative"
                                    // style={{ width: "100px", minHeight: '100px', maxHeight: '150px', borderColor: (E.Id === SelectedRec ? 'red' : 'black') }}
                                    style={{ width: "110px", borderColor: (E.Id === SelectedRec ? 'red' : 'black') }}
                                    value={E.Id}
                                    onClick={() => { setSelectedRec(E.Id); HandleListItemClicked(E) }}
                                    onDoubleClick={() => { setSelectedRec(E.Id); HandleListItemClickedDbl(E) }} >

                                    <div className="card shadow  p-0 m-0"  >
                                        <span style={{ position: 'absolute', top: '0px', left: '0px', fontSize: '8px' }}
                                            className={" text-secondary "} >
                                            {E.Code}/{E.Id}
                                        </span>

                                        <div className="card-img-top px-0 pt-0 mb-0 text-center " >
                                            {/* <img src={`Images/ItemsStore/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="..." */}
                                            {/* <img src={'Images/AdminPanel/Default/DefaultSupplier.png'} style={{ width: "75%", height: '100px', color: '#e040fb' }} alt="..." /> */}

                                            <img src={process.env.REACT_APP_API_URL + `Items/GetFile/${E.PicURL}`} style={{ width: "100%", height: '50px', color: '#e040fb' }} alt="..." />
                                        </div>

                                        <div className="card-body p-0">
                                            {/* <div className="card-title m-0 p-0" style={{ lineHeight: 1 }}>{Title.trim()}</div> */}
                                            <div className=" text-center text-black" style={{ fontSize: '10px', lineHeight: '1' }}>{E.Title}</div>
                                            {/* <div className="card-title text-center text-black" style={{ fontSize: '10px', lineHeight: '1' }}>{E.TitleU.trim()}</div> */}
                                            {/* <div className="card-title text-center text-primary" style={{ fontSize: '10px' }}>{E.Title.trim()}</div> */}
                                        </div>

                                    </div>
                                </button>
                            )
                        }).reverse()
                        }
                    </div>

                    :    // //0-list, 1-Grid, 2-group
                    <div className=" flex flex-row flex-wrap m-0 justify-around" >
                        {RecAll
                            .sort((a, b) => a.CatCode > b.CatCode ? 1 : -1)
                            .map((E, I) => {
                                return (
                                    <>
                                        {(newGroupTitle = GroupSeperator(E)) === '' ? '' :
                                            <div className='w-full my-1 '> <span className='text-xl'>{newGroupTitle}</span></div>
                                        }

                                        <button key={E.Id + E.Title} className="p-1 mb-1 relative"
                                            // style={{ width: "150px", minHeight: '150px', maxHeight: '150px', overflow: 'hidden', borderWidth:'1px', borderColor: (E.Id === SelectedRec ? 'red' : 'black') }}
                                            // style={{ width: "140px", minHeight: '150px', maxHeight: '150px', overflow: 'hidden', borderWidth: (E.Id === SelectedRec ? '2px' : '0px'), borderColor: (E.Id === SelectedRec ? 'red' : 'gray') }}
                                            style={{ width: "140px", borderWidth: (E.Id === SelectedRec ? '2px' : '0px'), borderColor: (E.Id === SelectedRec ? 'red' : 'gray') }}
                                            value={E.Id}
                                            onClick={() => { setSelectedRec(E.Id); HandleListItemClicked(E) }}
                                            onDoubleClick={() => { setSelectedRec(E.Id); HandleListItemClickedDbl(E) }} >

                                            <div className="card  p-0 m-0 w-full h-full relative"  >
                                                <span style={{ position: 'absolute', top: '0px', left: '0px', fontSize: '10px' }}
                                                    className={" text-blue-600  "} >
                                                    {/* {E.Id} */}
                                                    {E.Code}
                                                </span>

                                                {/* <div className=" px-0 pt-0 mb-0 text-center h-[90%]" > */}
                                                <div className=" px-0 pt-0 mb-0 text-center " >
                                                    {/* <img src={`Images/ItemsStore/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="..." */}
                                                    {/* <img src={'Images/AdminPanel/Default/DefaultSupplier.png'} style={{ width: "75%", height: '100px', color: '#e040fb' }} alt="..." /> */}

                                                    <img src={process.env.REACT_APP_API_URL + `Items/GetFile/${E.PicURL}`} style={{ width: "100%", height: '100%', color: '#e040fb' }} alt="..." />
                                                </div>

                                                <div className="card-body p-0">
                                                    {/* <div className="card-title m-0 p-0" style={{ lineHeight: 1 }}>{Title.trim()}</div> */}
                                                    <div className="card-title text-center text-black" style={{ fontSize: '12px', lineHeight: '1' }}>{E.Title.trim()}</div>
                                                    {/* <div className="card-title text-center text-black" style={{ fontSize: '10px', lineHeight: '1' }}>{E.TitleU.trim()}</div> */}
                                                    {/* <div className="card-title text-center text-primary" style={{ fontSize: '10px' }}>{E.Title.trim()}</div> */}
                                                </div>

                                            </div>
                                        </button>
                                    </>
                                )
                            })
                        }
                    </div>
            }

        </div >
</div>

    </>)
}




