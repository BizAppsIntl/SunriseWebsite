// import { useHistory } from 'react-router-dom';
// import SearchAd from './SearchAd';

// function Homefilter() {
//   const [search, setSearch] = useState('');
//   const history = useHistory();

//   const Getsearch = () => {
//     console.log(search);
//     history.push(`/searchpage/${search}`);
//   };

// ?
// This will sort from newest to oldest document

// db.collection.find().sort({_id:-1})   

//...........................last rec
// db.collection('collectionName').findOne(
//   {},
//   { sort: { _id: -1 } },
//   (err, data) => {
//      console.log(data);
//   },
// );

import React, { useState, useEffect, useReducer, createContext } from 'react'
import { createRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import axios from 'axios'
import Moment from 'moment'
// import * as fs from 'fs'

// Two files needed for datepicker
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

//Two file needed for toasify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// [.....................START: Calls Prgs: ..................................................]
import { AlertRec, SetPadLeftZero, DispAPIInAlert, DispArrayInAlert, DispRecInAlert } from '../../../StdLib.jsx'
import RecDetailDisp from './Tran/RecDetailDisp.jsx';
//import EntryFormCat from './Tran/EntryFormDoctor.jsx';
import EntryFormSplr from './Tran/EntryFormCust.jsx';
import RecsListView from './Tran/RecsListView.jsx';
import RecsCardView from './Tran/RecsCardView.jsx';

// import EntryFormPayment from './Tran/EntryFormPayment'
// import { Data as DataAccRec } from '../../AdminData/DB-AccRec'
// import { Data as KitchenItems } from '../../AdminData/WarehouseData/KitchenData.js'
// import { DataCategories } from '../../AdminData/WarehouseData/DataCategories'
// import { Doctors } from '../../AdminData/DoctorsData'
// import InfoCard from './Components/InfoCard'
import PrintTestPageNew from './PrintTestPageNew'
// [.....................END: Calls Prgs: ..................................................]

import imgPortal from './AssetsLocal/Images/Users.jpg'
import { FaSave, FaUserPlus, FaUserEdit, FaUsers, FaUserCog, FaUserSlash, FaFolder } from 'react-icons/fa'
import { FcCancel } from 'react-icons/fc'

//Play, back, next, fwwd
import { FaStepBackward, FaBackward, FaForward, FaStepForward } from 'react-icons/fa'

import { TbWiperWash } from 'react-icons/tb'
import { SlClose } from 'react-icons/sl'
import { CgCloseO } from 'react-icons/cg'

import { AiFillAccountBook, AiOutlineNumber } from 'react-icons/ai'
import { ImEnter, ImListNumbered } from 'react-icons/im'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { BsGenderAmbiguous } from 'react-icons/bs'
import { GrUser } from 'react-icons/gr'
import { GrUserManager } from 'react-icons/gr'

import { FaRegIdCard } from 'react-icons/fa'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FaPhoneVolume } from 'react-icons/fa'

//Sear Icons
// import IconSearch from '../../ImagesAdminPanel/default/IconSearch.png'
import { TbListSearch } from 'react-icons/tb'

//Currency Rs Dollar
import { TbCurrencyReal } from 'react-icons/tb'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { IoCashOutline } from 'react-icons/io5'


//Description Detail -Text  Records
import { TbTextWrapDisabled } from 'react-icons/tb'

//List Detail -Select List Records
import { TbListDetails } from 'react-icons/tb'

//Mangement or Manage Records
import { TbManualGearbox } from 'react-icons/tb'

//Reference use
import { CgUserList } from 'react-icons/cg'

//Status
import { GrUserExpert } from 'react-icons/gr'

//Department
import { SiGooglesearchconsole } from 'react-icons/si'

//Rank/Designation
import { GiRank3 } from 'react-icons/gi'

//Work Duty
import { IoIosConstruct } from 'react-icons/io'

//job category
import { TbIcons } from 'react-icons/tb'

//Experience
import { GrCertificate } from 'react-icons/gr'

//vehicle
import { FaBicycle } from 'react-icons/fa'
import { AiOutlineFieldNumber } from 'react-icons/ai'

//tex bas aligned
import { GrTextAlignLeft } from 'react-icons/gr'

//msg desc
import { BiMessageAltDetail } from 'react-icons/bi'
import { TbTemplate } from 'react-icons/tb'
import { VscReplaceAll } from 'react-icons/vsc'
import { useCtxMainContextHook } from '../../../CtxMain.jsx';
import BoxLoading from '../../Components/BoxLoading.jsx';
import BoxMessage from '../../Components/BoxMessage.jsx';

const VCat = "1311"
const PrgID = "1311"
const PrgTitle = "Customer"


//Cats: Code, Title, Desc, Rem, RecType, RecStatus, Priority, EntryBy, EntryDte
//Sple:    Id, Code, Title, TitleU, Desc, Rem, Address, City, PicURL, CrntBal, Phone, Contact1, ContactPh1, Contact2, ContactPh2, RecType, RecStatus, Priority, EntryBy, EntryDte 

// ==================[  useContext and useReducer Hooks  ]=====================
const reducerFn = (crntState, action) => {
  switch (action.type) {
    case 'FETCH_LOADING': return ({ ...crntState, Loading: true }); break;
    case 'FETCH_SUCCESS': return ({ ...crntState, Loading: false, DATA_RECS: action.payload }); break;
    case 'FETCH_ERROR': return ({ ...crntState, Loading: false, Error: action.payload }); break;

    default: return (crntState)
  }
}

// ==================[  useContext and useReducer Hooks  ]=====================


// *******************************************************************************************************************
//                                  M A N A G E
// *******************************************************************************************************************
export default function Manage() {
  const { CtxMainState, CtxMainDispatch } = useCtxMainContextHook()
  // const { _DocsRef: RecsAll } = CtxMainState
  const [{ Loading, Error, DATA_RECS }, dispatch] = useReducer(reducerFn, { Loading: false, Error: '', DATA_RECS: [] })


  //Single Record for Manage PRG
  const [Rec, setRec] = useState({});
  //All Records for Manage PRG
  const [RecsAll, setRecsAll] = useState([]);

  //Single Record for Manage PRG
  const [RecDefault, setRecDefault] = useState({
    //Cats: Code, Title, Desc, Rem, RecType, RecStatus, Priority, EntryBy, EntryDte

    Id: '',
    TType: 'C',
    Code: '',
    Title: '',
    TitleU: '',
    Gender: '1',
    Desc: '',
    Rem: '',
    // RefType:'0',
    // RefShare: 0,
    Address: '',
    City: '',
    Phone: '',
    Contact1: '',
    ContactPh1: '',
    Contact2: '',
    ContactPh2: '',

    PicURL: '',
    Pic: '',         //added for dev only: picture file 

    PreBal: '',
    CrntBal: '',
    RecType: '',
    RecStatus: 'Active',
    Priority: '0000',
    // EntryBy: '',
    // EntryDte: ''
  });

  const [TransAll, setTransAll] = useState([]);

  const [AccRec, setAccRec] = useState('');
  const [AccRecs, setAccRecs] = useState('');

  const [Need2Refresh, setNeed2Refresh] = useState(false);

  //Search items
  const [Txt2Search, setTxt2Search] = useState(103)

  // const [selectedImage4E, setSelectedImage4E] = useState('./AssetsLocal/Images/Default.jpg');
  const [selectedImage4E, setSelectedImage4E] = useState(null);
  const [BtnAddnewClicked, setBtnAddnewClicked] = useState(false)
  const [BtnEditClicked, setBtnEditClicked] = useState(false)
  // const [BtnDeleteClicked, setBtnDeleteClicked] = useState(false)
  // const [SetupDBArray, setSetupDBArray] = useState(true)
  const [InputReadOnly, setInputReadOnly] = useState(true)

  const DefaultImgURL4E = require('./AssetsLocal/Images/Default.jpg')
  const [StartPrint, setStartPrint] = useState(false)

  // \/\/\/\/\/\/\/\/\/\/\[    UseEffect      ]/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  //On First Loading
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // DataFetchAccRecs(signal)
    // DataFetchDoctors(signal)
    // DataFetchAccRecAndDoctors(signal)

    //....  ABORT  ......................................
    return () => { controller.abort() };
  }, [])


  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setRec(RecDefault);

    // Get Fresh Data from Tran Database 
    // DataFetchAll(signal)
    DataFetchAllTrans(signal)

    //....  ABORT  ......................................
    return () => { controller.abort() };
  }, [Need2Refresh])


  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  // ==============================================================





  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=
  // =-.-==-.-==-.-==-.-=[  Fns: DATABASE/ API Handling ] =-.-==-.-==-.-==-.-==
  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=

  // ==================[  Fn: GET ALL RECORDS  ]=====================
  const DataFetchAllTrans = async (signal) => {
    dispatch({ type: 'FETCH_LOADING' })

    try {
      //New on 01August
      // const res = await axios.get(process.env.REACT_APP_API_URL + `TrxInvoice/GetTrx/${'VDte'}`
      //fetch(process.env.REACT_APP_API_URL + `TranJV`, { method: 'GET' })
      const res = await axios.get(process.env.REACT_APP_API_URL + `Traders/C`
        //, { params: { DteFrom: Moment(SearchInput.DteFrom).format('YYYY-MM-DDTHH:mm◘:ss'), DteTo: Moment(SearchInput.DteTo).format('YYYY-MM-DDTHH:mm:ss') } }
        //, { params: { DteFrom: '', DteTo: '' } }
      )

      // AlertRec(res.data, 'Data Fetched ...')

      //setTransAll( data)
      //if ( res.length > 0) setLastEntryDutyDoc({ Id:  data[data.length - 1].TranM.DocDutyId, RefDocDuty: data[data.length - 1].TranM.RefDocDuty })

      dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
      // if ( res.data.length > 0) setLastEntryDutyDoc({ Id:  res.data[res.data.length - 1].TranM.DocDutyId, RefDocDuty: res.data[res.data.length - 1].TranM.RefDocDuty })

    }
    catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error })
    }

  }

  const DataFetchAll = async (signal) => {
    // fetch(process.env.REACT_APP_API_URL + `Doctors`, { method: 'GET' })
    //   .then(res => res.json())
    //   .then(data => { setRecAll(data) })

    // CtxMainDispatch({ type: 'DOCSREF_FETCH_LOADING' })

    try {
      const result = await axios.get(process.env.REACT_APP_API_URL + `Customers`)
      // console.log('*****************result: ', result); alert(result.data)                    
      // CtxMainDispatch({ type: 'DOCSREF_FETCH_SUCCESS', payload: result.data })
      // CtxMainDispatch({ type: 'DOCSDUTY_FETCH_SUCCESS', payload: result.data.filter(E => E.RefType === '1') })
      
      // AlertRec(result.data, 'result.data')

      setRecsAll( result.data)

    } catch (error) {
      // CtxMainDispatch({ type: 'DOCSREF_FETCH_SUCCESS', payload: error })
    }
  }

  // ==================[  Fn: GET Products ALL RECORDS  ]=====================


  // ==============================================================
  // -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-
  //AddNew is clicked
  const HandleInputs = (btnStatus) => {
    // alert('Add button with: ' + btnStatus)
  }

  //AddNew is clicked
  const HandleBtnAddnew = (btnStatus) => {
    // alert('Add button with: '+btnStatus)

    // alert('Add New Clicked with: '+btnStatus)
    if (btnStatus) setBtnEditClicked(false);
    // if (btnStatus) setBtnDeleteClicked(false);

    setBtnAddnewClicked(btnStatus);
  }

  // -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-
  //EDIT is clicked
  const HandleBtnEdit = (btnStatus) => {
    // alert('Edit button with: '+btnStatus)
    if (btnStatus) setBtnAddnewClicked(false)
    // if (btnStatus) setBtnDeleteClicked(false)

    setBtnEditClicked(btnStatus);
    // setInputReadOnly(false)
  }

  // -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-

  // -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-
  const HandleBtnVoucherMode = (Mode, BtnStatus, Flag2Refresh = false) => {
    // if (Flag2Refresh) setNeed2Refresh(!Need2Refresh)
    setNeed2Refresh(p => !p)

    switch (Mode) {
      case 'Add': HandleBtnAddnew(BtnStatus); break;
      case 'Edit': HandleBtnEdit(BtnStatus); break;

      default: break;
    }
  }

  // -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-
  //VoucherSelect is clicked
  const HandleCloseDispDetail = (e) => {
    setRec({ ...Rec, Id: '' })
  }
  // -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-
  //VoucherSelect is clicked
  const HandleListItemClickedDbl = (E) => {
    HandleListItemClicked(E)
    HandleBtnEdit(true)
  }
  const HandleListItemClicked = (E) => {
    //const { VID, Id, VDte, VCat, TId, Desc, Rem, VAmt, VQtyTxt, AccD, AccC } = OrderSheet

    //    if (E.Id) {
    // alert('Items data was Empty')
    //const t=Object.keys(E).map(k => E[k]=typeof (E[k]) === 'string' ? E[k].trim() : E[k])
    //const t=(Object.entries(E).map(([k,v],i) => v=typeof (v) === 'string' ? v.trim() : v))

    //var t={}; Object.keys(E).forEach(k => t[k]= typeof (E[k]) === 'string' ? E[k].trim() : E[k])
    //Object.keys(E).forEach(k => E[k] = typeof (E[k]) === 'string' ? E[k].trim() : E[k])

    // AlertRec(E, "BEFORE:")
    Object.keys(E).forEach(k =>
      E[k] = typeof (E[k]) === 'string'
        ? E[k].trim()
        : (E[k] === undefined || E[k] === null) ? '' : E[k])
    // AlertRec(E, "AFTER:")

    //setOrderSheet({ ...OrderSheet, [e.target.name]: e.target.value });
    E.PicURL4Edit = E.PicURL      //console.log('obj: ', E)
    E.Priority = E.Priority ? E.Priority : '0000'

    setRec(E)
  }

  // ==============================================================

  // //CLEAR Rec is clicked
  // const HandleBtnClear = () => { alert('Clear pressed'); setRec(RecDefault) }
  // // ==============================================================

  //CANCEL changes is clicked
  const HandleBtnCancel = () => {
    // alert('Cancelled pressed'); 
    setBtnEditClicked(false);
    setBtnAddnewClicked(false);
    setRec(RecDefault)
  }
  // ==============================================================



  // START   ==================[  Handle Printing  ]=====================
  const compRefX = useRef();
  // const compRef = useRef();
  // const handlePrint = useReactToPrint({
  //     content: () => compRefX.current,
  //     // content: () => 'Bismillah',
  //     onAfterPrint: () => alert('Print succeeded')
  // })

  const localPrinting = useReactToPrint({
    // content: () => compRef.current,
    //content: () => compRefX.current,
    content: () => compRefX.current,
    onAfterPrint: () => alert('Print succeeded')
  })
  // END   ==================[  Handle Printing  ]=====================


  // *******************************************************************************************************************
  //                                  M A N A G E/ Return
  // *******************************************************************************************************************

  // let SelectedItems = []
  return (<>
    {/* {console.log('Entering in return:', RecAll)} */}

    <div className="card">

      {/* <button onClick={() => localPrinting()}> start print </button>
      <div ref={compRefX} className="d-none text-black">
        <h3>Title Page </h3>
        <p>para1</p>
        <p>para2</p>
      </div> */}

      {/* ====================================================== */}
      {/* MAIN HEADER - PRG  */}  {/* background-color:F3E5F5 */}
      {/* ====================================================== */}
      <div className="card-header px-2 d-flex  justify-content-between align-items-center" style={{ height: 30, backgroundColor: '#E1BEE7' }}>

        {/* ............. Display ICON & TITLE  ............. */}
        <div className="d-flex  gap-2 align-items-center">
          <span className="p-0 mb-2 fs-3 text-danger" ><TbManualGearbox /></span>
          <span className='fs-4'> Manage: Customers Profiles</span>
          {/* <span className='fs-4'> DispRecIndex {CrntIdx2DisplayRec} </span> */}
        </div>

        {/* ............. Display BUTTONS toolbar  ............. */}
        <div className="d-flex  gap-2 align-items-center">

          {/* ............. Display BUTTON SEARCH text and Icon  ............. */}
          {/* Only if ADD-NEW is Not Clicked */}
          <span>

            {(BtnEditClicked || BtnAddnewClicked) &&
              <>
                <button type="button" className="btn btn-sm btn-info py-0 me-4 text-black" onClick={() => { HandleBtnCancel(false) }}>
                  {/* {BtnAddnewClicked ? 'Addition' : 'Update'} Process <FcCancel className='fs-3 mb-1' /> */}
                  {BtnAddnewClicked ? 'Addition' : 'Update'} Process
                </button>

                <div style={{ position: 'absolute', top: '-5px', right: '0px', zIndex: '999' }} onClick={() => HandleBtnCancel(true)}>
                  <strong className='text-danger'> EXIT</strong><br /><ImEnter className='fs-3  text-success' />
                  {/* <CgCloseO className='fs-3  text-danger '  /> */}
                  {/* <SlClose className='fs-3 ms-auto text-danger '  /> */}
                </div>
              </>

            }

            {/* Display BUTTON ADD-NEW & CLEAR */}
            {(!(BtnEditClicked || BtnAddnewClicked) && Rec.Id) &&
              <button type="button" className="btn btn-sm btn-primary "
                onClick={() => { HandleBtnEdit(true) }}>
                Update <FaUserEdit className='mb-1' style={{ width: '20px', height: '20px' }} />
              </button>
            }
            {!(BtnEditClicked || BtnAddnewClicked) &&
              <button type="button" className="btn btn-sm btn-success mx-2"
                onClick={() => { HandleBtnAddnew(true) }}>
                Add New <FaUserPlus className='mb-1' style={{ width: '20px', height: '20px' }} />
              </button>
            }
            {/* {!(BtnEditClicked || BtnAddnewClicked) && (Rec.Id > 0) &&
              <button type="button" className="btn btn-sm btn-danger"
                onClick={() => { HandleBtnDelete(true) }}>
                Delete <FaUserSlash className='mb-1' style={{ width: '20px', height: '20px' }} />
              </button>
            } */}
          </span>

        </div>

      </div>    {/* END: Header for Search Input Selection  */}
      {/* ===========================[ END: Header for Search Input Selection ]===========================================  */}


      {/* =================================================================================== */}
      {/* =====[    Main content CARD BODY start            ]===========================================  */}
      {/* =================================================================================== */}
      <div className="card-body p-2 d-flex gap-2 flex-row justify-content-center  " style={{ background: '#F3E5F5' }}>

        {/* Transaction List */}
        {/* LEFT-PART for Vouchers List */}
        {/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. */}
        {/* <div className="card px-2 pt-2 shadow-lg" style={{ width: (SetupDBArray) ? '20%' : '30%' }}> */}


        <div className="card px-2 pt-2 shadow-lg" style={{ width: (BtnAddnewClicked || Rec.Id) ? '30%' : '50%' }}>


            {Loading ? <div className='text-center w-100'><BoxLoading className='w-100' txt={'Processing ...'} /></div>
            : DATA_RECS.length <= 0 ? <BoxMessage variant='danger' >Seems, There is No Data...</BoxMessage>
            : <>
                {/* <RecsListView RecAll={RecAll} HandleListItemClicked={HandleListItemClicked} /> */}
                {/* <RecsCardView RecAll={RecsAll.Data} HandleListItemClicked={HandleListItemClicked} SizeFlag={(BtnAddnewClicked || Rec.Id) ? 'S' : 'F'} /> */}

                <RecsCardView RecsAll={DATA_RECS} HandleListItemClicked={HandleListItemClicked} SizeFlag={(BtnAddnewClicked || Rec.Id) ? 'S' : 'F'} />
            </>
          }


        </div>

        {/* RIGHT-PART for Selected Voucher Detail */}
        {/* Dont Show if No Action is taken. Only if any buttn ADD-NEW/Edit/Delete is Clicked */}
        {(BtnAddnewClicked || Rec.Id) &&

          <div style={{ width: '70%' }}>
            <div className="card p-2 shadow-lg align-items-start " >

              {/* {(SelectedItems = TranD4RecAll.filter((E) => E.Vid === Rec._id)).length > 0 */}

              {(!BtnAddnewClicked) && (!Rec.Id) &&
                <button className="w-100 " style={{ color: 'black', background: '#f0c040', border: '1px solid #404040' }}>
                  No Item Selected for Detail
                </button>
              }

              {!(BtnEditClicked || BtnAddnewClicked) && (Rec.Id) &&
                <>
                  <RecDetailDisp Rec={Rec} HandleCloseDispDetail={HandleCloseDispDetail} />
                </>
              }

              {/* Only if ADD-NEW/Update is Clicked */}
              {((BtnAddnewClicked || BtnEditClicked)) &&
                <>
                  {/* {AlertRec(RecDefault,'Final for Addition of RecDefault')} */}
                  {/* {AlertRec(Doctors)} */}
                  {/* {AlertRec(Rec, 'Record to send for Update/Addition')}  */}

                  < EntryFormSplr
                    // CrntRec={BtnAddnewClicked ? SetupDBArray ? Rec : RecDefault : Rec}
                    CrntRec={BtnAddnewClicked ? RecDefault : Rec}

                    // VoucherMode={BtnAddnewClicked ? 'Add' : BtnEditClicked ? 'Edit' :  BtnDeleteClicked ? 'Del':''}
                    VoucherMode={BtnAddnewClicked ? 'Add' : BtnEditClicked ? 'Edit' : ''}
                    HandleBtnVoucherMode={HandleBtnVoucherMode}

                  // HandleInputs={HandleInputs}
                  // setNeed2Refresh={setNeed2Refresh}
                  // Need2Refresh={Need2Refresh}
                  />
                </>

              }
            </div>
          </div>
        }

      </div>{/* /.Main-card-body */}


      {/* =================================================================================== */}
      {/* =====[    Main CARD BODY ends here            ]===========================================  */}
      {/* =================================================================================== */}
    </div >
    {/* /.Main-card */}
    <ToastContainer />
  </>)
}