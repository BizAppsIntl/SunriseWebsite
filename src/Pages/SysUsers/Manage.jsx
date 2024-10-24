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
import axios from 'axios'
import Moment from 'moment'
// import * as fs from 'fs'

//Two file needed for toasify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// [START: Calls Prgs: ..................................................]
import EntryFormUsers from './Tran/EntryFormUsers'
import RecDetailDisp from './Tran/RecDetailDisp'
import RecsComboViews from './Tran/RecsComboViews';

import { AlertRec, SetPadLeftZero, DispAPIInAlert, DispArrayInAlert, DispRecInAlert, CurrentTime, GetNewID, AlertConfirm } from '../../../StdLib'
// [END: Calls Prgs: ....................................................]


// Two files needed for datepicker
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


// [START: Icons : ..................................................]
import imgPortal from './AssetsLocal/Images/Users.jpg'
import { FaSave, FaUserPlus, FaUserEdit, FaUsers, FaUserCog, FaUserSlash, FaFolder } from 'react-icons/fa'
import { FcCancel } from 'react-icons/fc'

//Play, back, next, fwwd
import { FaStepBackward, FaBackward, FaForward, FaStepForward } from 'react-icons/fa'

import { TbMapPin, TbWiperWash } from 'react-icons/tb'

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
import IconSearch from '../../ImagesAdminPanel/default/IconSearch.png'
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
import { useCtxMainContextHook } from '../../../CtxMain';
import BoxLoading from '../../Components/BoxLoading';
import BoxMessage from '../../Components/BoxMessage';


//=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*
//const process.env.REACT_APP_API_URL = process.env.REACT_APP_DOTNET_API_DEV
//const process.env.REACT_APP_API_URL = process.env.REACT_APP_DOTNET_API_PUB
//=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*


const VCat = "1311"
const PrgID = "1311"
const PrgTitle = "Staffing"
//const { Products } = KitchenItems


//Default settings for dropDowns
//TCode: 'SAB', Cat: '11'

// const RecDefault = {
//   Id:'',  Code:'',  Title:'',  TitleU:'',  FName:'',  FNameU:'',  Gender:'',  Desc:'',  Rem:'',

//   Pic: '',
//   PicURL: '',
//   PicURL4Edit: '',

//   DteBirth:'',  NIC:'',  Address:'',  Phone:'',  Contact:'',  ContactPh:'',  Ref:'',  RefDesc:'',
//   VehNo:'',  VehDesc:'',  DteJoin:'',  JobStatus:'',  Category:'',  
//   Department:'',  Designation:'',  JobDuty:'',  Experience:'',  DteLeave:'',  RemLeave:'',  
//   CrntBal:'',  RecType:'',  RecStatus:'',  Priority:'',  EntryBy:'',  EntryDte:''
// }


const RecDefault = {
  ID: '', PW: '', Title: '', Desc: '', Rem: '', RoleId:'', TId:'',
  Pic: '', PicURL: '', PicURL4Edit: '',
RecType: '', RecStatus: '', Priority: '0000', EntryBy: '', EntryDte: ''
}

// ==================[  useContext and useReducer Hooks  ]=====================
const reducerFn = (crntState, action) => {
  switch (action.type) {
    case 'FETCH_LOADING': return ({ ...crntState, Loading: true }); break;
    case 'FETCH_SUCCESS': return ({ ...crntState, Loading: false, DATA_RECS: action.payload }); break;
    case 'FETCH_ERROR': return ({ ...crntState, Loading: false, Error: action.payload }); break;

    default: return (crntState)
  }
}
// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
//                                  P R G  ---   START
//                                  M A N A G E
// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
export default function Manage() {
  Moment.locale('en');

  const { CtxMainState, CtxMainDispatch } = useCtxMainContextHook()
  // const { _DocsRef: RecsAll } = CtxMainState
  const [{ Loading, Error, DATA_RECS }, dispatch] = useReducer(reducerFn, { Loading: false, Error: '', DATA_RECS: [] })

  //Single Record for Manage PRG
  const [Rec, setRec] = useState(RecDefault);
  //All Records for Manage PRG
  const [RecAll, setRecAll] = useState([]);

  // const [AccRecsSal, setAccRecsSal] = useState([]);

  const [Traders, setTraders] = useState([]);
  const [UserRoles, setUserRoles] = useState([]);

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
  const [ImgURL4E, setImgURL4E] = useState(null)

  // \/\/\/\/\/\/\/\/\/\/\[    UseEffect      ]/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  //On First Loading
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    //setRec(RecDefault);

    DataFetchAllTraders()
    // DataFetchAllUserRoles()
    DataFetchUserRoles()   //for Salary Account Heads

    // DataFetchTranD()
    // setRec({ ...Rec, ACCodeC: { ...ACCodeC, Code: C[0].Code }, ACCodeD: { ...ACCodeD, Code: D[0].Code } })
    // RecDefault.ACCodeC.Code = C[0].Code; RecDefault.ACCodeD.Code = D[0].Code

    // const T = let (t=Suppliers.filter(E =>  E.Code==='22111')   //And Suplier

    //....  ABORT  ......................................
    return () => { controller.abort() };
  }, [])

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setRec(RecDefault);

    // Get Fresh Data from Tran Database 
    //DataFetchAll(signal)
    DataFetchAllTrans(signal)



    // DataFetchTranD()
    // setRec({ ...Rec, ACCodeC: { ...ACCodeC, Code: C[0].Code }, ACCodeD: { ...ACCodeD, Code: D[0].Code } })
    // RecDefault.ACCodeC.Code = C[0].Code; RecDefault.ACCodeD.Code = D[0].Code

    // const T = let (t=Suppliers.filter(E =>  E.Code==='22111')   //And Suplier

    //....  ABORT  ......................................
    return () => { controller.abort() };
  }, [Need2Refresh])

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/



  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=
  // =-.-==-.-==-.-==-.-=[  Fns: DATABASE/ API Handling ] =-.-==-.-==-.-==-.-==
  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=
  const DataFetchAllTrans = async (signal) => {
    dispatch({ type: 'FETCH_LOADING' })

    try {
      //New on 01August
      // const res = await axios.get(process.env.REACT_APP_API_URL + `TrxInvoice/GetTrx/${'VDte'}`
      //fetch(process.env.REACT_APP_API_URL + `TranJV`, { method: 'GET' })
      const res = await axios.get(process.env.REACT_APP_API_URL + `Users`
        //, { params: { DteFrom: Moment(SearchInput.DteFrom).format('YYYY-MM-DDTHH:mm◘:ss'), DteTo: Moment(SearchInput.DteTo).format('YYYY-MM-DDTHH:mm:ss') } }
        //, { params: { DteFrom: '', DteTo: '' } }
      )

      // AlertRec(data, 'Data Fetched ...')

      //setTransAll( data)
      //if ( res.length > 0) setLastEntryDutyDoc({ Id:  data[data.length - 1].TranM.DocDutyId, RefDocDuty: data[data.length - 1].TranM.RefDocDuty })

      dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
      // if ( res.data.length > 0) setLastEntryDutyDoc({ Id:  res.data[res.data.length - 1].TranM.DocDutyId, RefDocDuty: res.data[res.data.length - 1].TranM.RefDocDuty })

    }
    catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error })
    }

  }


  // ==================[  Fn: GET ALL RECORDS  ]=====================
  const DataFetchAll = async (e) => {
    //  window.alert((Txt2Search4B)?`/api/staff/${Txt2Search4B}`:'/api/staff')
    // const res = await fetch((Txt2Search4B)?`/api/staff/${Txt2Search4B}`:'/api/staff');

    //=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*
    //const res = await fetch('/api/Items');    //const data = await res.json();
    //(Id, Title, TitleU, Desc, Rem, CatCode, TId, Pic, PicURL, Unit, Price, QtyDef, QtyInc, QtyStep, QtyMin, QtyMax, PreBal, CrntBal, RecType, RecStatus, Priority, EntryBy, EntryDte)

    fetch(process.env.REACT_APP_API_URL + 'Staff', { method: 'GET' })
      .then(res => res.json())
      .then(data => { setRecAll(data) })

    //=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*


    // data.map((itm) => {
    //   itm.VDte = (Date.parse(itm.VDte)) ? Date.parse(itm.VDte) : ''
    //   itm.RefVDte = (Date.parse(itm.RefVDte)) ? Date.parse(itm.RefVDte) : ''
    // })
    // console.log('Received Records from Database:', data);
    //  AlertRec(data, 'Received Records from Database:')
    //  console.log('********************************************************',data)
    //setRecAll(data)
  }


  const DataFetchAllTraders = async (e) => {
    //=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*
    //(Id, Code, RecType, RecStatus, Priority, Title, TitleU, Desc, Rem, Address, Phone, Contact1, ContactPh1, Contact2, ContactPh2, PicURL, PreBalll, CrntBal, EntryBy, EntryDte)
    fetch(process.env.REACT_APP_API_URL + 'Doctors', { method: 'GET' })
      .then(res => res.json())
      .then(data => { setTraders(data) })

    //=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*    
  }
  const DataFetchUserRoles = async (e) => {
    //=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*
    fetch(process.env.REACT_APP_API_URL + 'UserRoles', { method: 'GET' })
      .then(res => res.json())
      // .then(data => { setUserRoles(data.filter(r => r.Code.substr(-1, 1) != '0')) })
      .then(data => { setUserRoles(data) })

    //=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*    
  }


  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=
  // =-.-==-.-==-.-==-.-=[  E N D       of            Fns: DATABASE/ API Handling ] =-.-==-.-==-.-==-.-==
  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=


  // ==============================================================



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
    //  alert('Edit button with: '+btnStatus)
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
  const HandleListItemClicked = (Itm) => {
    // console.log('HandleListItemClicked Original props: ', E.VNo, E.VDte, E.VCat, E)

    // Now Add-- Items Detail and Titles etc 
    if (Itm.ID) {
      // alert('Items data was Empty')
      //const t=Object.keys(E).map(k => E[k]=typeof (E[k]) === 'string' ? E[k].trim() : E[k])
      //const t=(Object.entries(E).map(([k,v],i) => v=typeof (v) === 'string' ? v.trim() : v))

      // AlertRec(E, "BEFORE:")
      //var t={}; Object.keys(E).forEach(k => t[k]= typeof (E[k]) === 'string' ? E[k].trim() : E[k])
      Object.keys(Itm).forEach(k =>
        Itm[k] = typeof (Itm[k]) === 'string'
          ? Itm[k].trim()
          : (Itm[k] === undefined || Itm[k] === null) ? '' : Itm[k])
      // AlertRec(E, "AFTER:")

      //setOrderSheet({ ...OrderSheet, [e.target.name]: e.target.value });
      Itm.PicURL4Edit = Itm.PicURL
      Itm.Priority = Itm.Priority ? Itm.Priority : '0000'
      // console.log('obj: ', E)
      setRec(Itm)

      // //AlertRec(Itm.SalDefaults, 'Itm.SalDefaults Existed')
      // setAccRecsSal(
      //   AccRecsSal.map(E => {
      //     const itmExisted = Itm.SalDefaults?.find(F => F.AccCode === E.Code)
      //     //AlertRec(itmExisted, 'Existed')
      //     return ({ ...E, VAmt: (itmExisted ? itmExisted.VAmt : E.VAmt) })
      //   })
     // )


      }
      // console.log('HandleListItemClicked Added Itms&Qty: ', E.VNo, E.VDte, E.VCat, E)
    }

    // =======Only for Dev Purpose: =======================================================
    const Handle2SendData4Addition = (E) => {
      //  AlertRec(E,'for Data2SendInDatabase')  

      if (E.Code) {

        // setRec({...E, PicURL: E.Pic, Pic:''})
        const Data2SendInDatabase = {
          "Id": E.Code,

          "RecType": '',
          "RecStatus": '',
          "Priority": '0000',

          "Title": E.Title,
          "TitleU": E.UTitle,
          "Desc": '',
          "Rem": '',

          "CatCode": E.Cat.substr(0, 1) + '0' + E.Cat.substr(1, 1),

          // "TId2": E.TCode,
          "TId": (Traders.find(s => s.Code.trim() === E.TCode.trim())).Id,
          // "Pic": Pic,

          "PicURL": E.PicURL,
          "PicURL4Edit": '',

          "Unit": 'KG',
          "QtyDef": 5,
          "QtyInc": 1,
          "QtyStep": 5,
          "QtyMin": 30,
          "QtyMax": 50,
          "Price": 1,

          "PreBal": 0,
          "CrntBal": 0,

          "EntryBy": "xUSERx",
          "EntryDte": new Date()
        }

        // if (!AlertConfirm(Data2SendInDatabase, 'Add New Record ?')) return
        setRec(Data2SendInDatabase)
        HandleBtnAddnew(true)

      }
    }


    // ==============================================================

    // //CLEAR Rec is clicked
    // const HandleBtnClear = () => { alert('Clear pressed'); setRec(RecDefault) }
    // // ==============================================================

    //CANCEL changes is clicked
    const HandleBtnCancel = () => {
      //  alert('Cancelled pressed'); 
      setBtnEditClicked(false);
      setBtnAddnewClicked(false);
      setRec(RecDefault)
      // setAccRecsSal(AccRecsSal.map((E, I) => (E.Code.slice(-1) === '0' ? { ...E, VAmt: 0 } : { ...E, VAmt: 0 })))
      // setAccRecsSal(AccRecsSal.map((E, I) => ( { ...E, VAmt: 0 } )))

    }

    // -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-
    //VoucherSelect is clicked 2 CloseWindow
    const HandleCloseWindow = (msg) => {
      if (msg) setRec({ ...Rec, ID: '' })
    }
    // -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-

    // ==============================================================

    // //SAVE changes is clicked
    // const HandleBtnSave = () => { setBtnEditClicked(false); setBtnAddnewClicked(false); setInputReadOnly(true); setRec(RecDefault) }
    // // ==============================================================



    // *******************************************************************************************************************
    //                                  M A N A G E/ Return
    // *******************************************************************************************************************
    // let SelectedItems = []
    let tmp = ''
    return (<>
      {/* {console.log('Entering in return:', RecAll)} */}

      <div className="card">

        {/* ====================================================== */}
        {/* MAIN HEADER - PRG  */}  {/* background-color:F3E5F5 */}
        {/* ====================================================== */}
        <div className="card-header px-2 d-flex  justify-content-between align-items-center" style={{ height: 30, backgroundColor: '#E1BEE7' }}>

          {/* ............. Display ICON & TITLE  ............. */}
          <div className="d-flex  gap-2 align-items-center">
            <span className="p-0 mb-2 fs-3 text-danger" ><TbManualGearbox /></span>
            <span className='fs-4'> Manage: System Users Profiles</span>
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
              {(!(BtnEditClicked || BtnAddnewClicked) && Rec.ID ) &&
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
              {/* {!(BtnEditClicked || BtnAddnewClicked) && (Rec.Code > 0) &&
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
        <div className="card-body p-1 d-flex flex-row justify-content-center  " style={{ background: '#F3E5F5' }}>

          {/* Transaction List */}
          {/* LEFT-PART for Vouchers List */}
          {/* <div className="card px-2 pt-2 shadow-lg" style={{ width: (SetupDBArray) ? '20%' : '30%' }}> */}
          <div className="card px-2 pt-2 shadow-lg" style={{ width: (BtnAddnewClicked || Rec.ID ) ? '50%' : '60%' }}>
            {/* {RecAll.length <= 0 */}
            {/* ? <div>No Data Found... </div> */}
            {Loading ? <div className='text-center w-100'><BoxLoading className='w-100' txt={'Processing ...'} /></div>
              : DATA_RECS.length <= 0 ? <BoxMessage variant='danger' >Seems, There is No Data...</BoxMessage>
                : <>
                  {/* <RecsListView RecAll={RecAll} HandleListItemClicked={HandleListItemClicked} /> */}
                  {/* <RecsCardView RecAll={RecsAll.Data} HandleListItemClicked={HandleListItemClicked} SizeFlag={(BtnAddnewClicked || Rec.Id) ? 'S' : 'F'} /> */}

                  <RecsComboViews RecAll={DATA_RECS} HandleListItemClicked={HandleListItemClicked} SizeFlagFS={(BtnAddnewClicked || Rec.ID) ? 'S' : 'F'} />
                </>
            }
          </div>

          {/* RIGHT-PART for Selected Voucher Detail */}
          {/* Dont Show if No Action is taken. Only if any buttn ADD-NEW/Edit/Delete is Clicked */}
          {(BtnAddnewClicked || Rec.ID) &&

            <div style={{ width: '80%' }}>
              <div className="card p-1 shadow-lg align-items-start " >

                {/* {(SelectedItems = TranD4RecAll.filter((E) => E.Vid === Rec._id)).length > 0 */}

                {(!BtnAddnewClicked) && (!Rec.ID) &&
                  <button className="w-100 " style={{ color: 'black', background: '#f0c040', border: '1px solid #404040' }}>
                    No Item Selected for Detail
                  </button>
                }

                {!(BtnEditClicked || BtnAddnewClicked) && (Rec.ID) &&
                  <>
                    {/* <div className='card d-flex  m-0 p-1 flex-column text-start' style={{ width: '450px', fontSize: '12px', background: '#e0e0e0', borderRadius: '5px' }}> */}
                    <RecDetailDisp Rec={Rec} UserRoles={UserRoles} HandleCloseWindow={HandleCloseWindow} />
                  </>
                }

                {/* Only if ADD-NEW/Update is Clicked */}
                {((BtnAddnewClicked || BtnEditClicked)) &&
                  < EntryFormUsers

                    //Only for Recs transfer in Database Dev purpose
                    CrntRec={BtnAddnewClicked ? Rec : Rec}
                    // CrntRec={BtnAddnewClicked ? SetupDBArray ? Rec : RecDefault : Rec}
                    //Set empty if AddNew otherwise populate Recs
                    //CrntRec={BtnAddnewClicked ? RecDefault : Rec}

                    // AccRecsSal={AccRecsSal.map((R,I)=>{return({...R, VAmt:I})})}
                    // AccRecsSal={AccRecsSal}
                    // setAccRecsSal={setAccRecsSal}

                    // VoucherMode={BtnAddnewClicked ? 'Add' : BtnEditClicked ? 'Edit' :  BtnDeleteClicked ? 'Del':''}
                    VoucherMode={BtnAddnewClicked ? 'Add' : BtnEditClicked ? 'Edit' : ''}

                    // HandleInputs={HandleInputs}
                    // HandleInputsMode={HandleInputsMode}
                    HandleBtnVoucherMode={HandleBtnVoucherMode}
                  // setNeed2Refresh={setNeed2Refresh}
                  // Need2Refresh={Need2Refresh}
                  />
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

    </>)
  }


