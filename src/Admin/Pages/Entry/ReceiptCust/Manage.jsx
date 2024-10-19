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

import React, { useState, useEffect, useReducer, createContext, createRef } from 'react'
import { useCtxMainContextHook } from '../../../../CtxMain.jsx';

import axios from 'axios'
// import './Create.css'
import Moment from 'moment'
// import * as fs from 'fs'

//Two file needed for toasify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Alert } from 'react-bootstrap';

import imgPortal from './AssetsLocal/Images/Trans.png'


import { AlertRec, SetPadLeftZero, DispAPIInAlert, DispArrayInAlert, DispRecInAlert } from '../../../../StdLib.jsx'

import { PrintableVoucher } from './Print/PrintableVoucher';

// import RecsComboViews from './Tran/RecsComboViews'
import RecsComboViewsSearch from './Tran/RecsComboViewsSearch'

// import BoxLoading from '../../../Components/BoxLoading.jsx';
// import BoxMessage from '../../../Components/BoxMessage.jsx';

import RecDetailDisp from './Tran/RecDetailDisp.jsx';

import { useReactToPrint } from 'react-to-print';


// [.....................START: Calls Prgs: ..................................................]
import EntryFormReceipt from './Tran/EntryFormReceipt.jsx'

// import { Data as DataAccRec } from '../../AdminData/DB-AccRec'
// import { Data as KitchenItems } from '../../AdminData/WarehouseData/KitchenData.js'
// import { DataCategories } from '../../AdminData/WarehouseData/DataCategories'
// import { Suppliers } from '../../AdminData/SuppliersData'

// import InfoCard from './Components/InfoCard'
// import PrintTestPageNew from './PrintTestPageNew'

// [.....................END: Calls Prgs: ..................................................]

// Two files needed for datepicker
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { FaSave, FaUserPlus, FaUserEdit, FaUsers, FaUserCog, FaUserSlash, FaFolder, FaEdit } from 'react-icons/fa'
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

import { MdOutlineDifference } from "react-icons/md";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { MdOutlineLibraryAddCheck } from "react-icons/md";

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


const _VCat = "3141"
const _PrgID = "3141"
const _PrgTitle = "Tran Receipt against Sales Entries"


// ==================[  useContext and useReducer Hooks  ]=====================

const reducerFn = (crntState, action) => {
  switch (action.type) {
    case 'FETCH_LOADING': return ({ ...crntState, Loading: true }); break;
    case 'FETCH_SUCCESS': return ({ ...crntState, Loading: false, DATA_RECS: action.payload }); break;
    case 'FETCH_ERROR': return ({ ...crntState, Loading: false, Error: action.payload }); break;

    default: return (crntState)
  }
}

// *******************************************************************************************************************
//                                  M A N A G E
// *******************************************************************************************************************
export default function Manage() {
  Moment.locale('en');
  const { CtxMainState, CtxMainDispatch } = useCtxMainContextHook()
  const { _Procedures, _Patients, _DocsDuty, _AccRecs } = CtxMainState
  const [{ Loading, Error, DATA_RECS }, dispatch] = useReducer(reducerFn, { Loading: false, Error: '', DATA_RECS: [] })

  //Single Record for Manage PRG
  const [RecDefault, setRecDefault] = useState({
    VID: '',
    VNo: '',
    VDte: new Date(),   //Moment(new Date()).format('DD MMM YY ddd'),
    VCat: _VCat,     //Capital Transaction Voucher

    DocDutyId: '',       //Trader -- one of CustomerOrSupplier/ConsumerOrVender/
    DocRefId: '',       //Trader -- one of CustomerOrSupplier/ConsumerOrVender/
    Desc: '',
    Rem: '',

    RefVID: '',
    RefVNo: '',
    RefVDte: '',
    RefVCat: '',

    VQtyTxt: '',
    VAmt: '',

    // VItems: [],
    RefDocDuty: '',
    RefDocRef: '',
    AccD: [],
    AccC: []
  });

  //Single Record for Manage PRG
  const [Rec, setRec] = useState({});
  //All Records for Manage PRG
  const [RecAll, setRecAll] = useState([]);
  const [TransAll, setTransAll] = useState([]);

  const [Traders, setTraders] = useState([]);

  const [AccRec, setAccRec] = useState('');
  const [AccRecs, setAccRecs] = useState('');

  const [Need2Refresh, setNeed2Refresh] = useState(false);

  //Search items
  const [Txt2Search, setTxt2Search] = useState(103)
  const [SearchInput, setSearchInput] = useState({ DteFrom: new Date('01 July 2023'), DteTo: new Date() });

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
  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   // DataFetchAccRecs(signal)
  //   // DataFetchSuppliers(signal)
  //   // DataFetchAccRecAndSuppliers(signal)

  //   //....  ABORT  ......................................
  //   return () => { controller.abort() };
  // }, [])


  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // Get Fresh Data from Tran Database 
    // DataFetchAll(signal)
    //DataFetchPaymentTrans(signal)
    DataFetchAllTrans(signal)

    DataFetchTraders(signal)
    DataFetchAccRecs(signal)

    setRec(RecDefault);

    //....  ABORT  ......................................
    return () => { controller.abort() };
  }, [Need2Refresh])


  // //On Select List Record
  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   if (Rec.VNo) {
  //     //  AlertRec(Rec, 'useEFFECT- Now Fetching for REC- on click item')

  //     fetch(`/api/VoucherRecDetail/${Rec._id}`, { signal })
  //       .then(async response => {
  //         const RecR = await response.json();

  //         // AccCodeD: RecR.filter(F => F.AccType === '0').map(E => { return (E.Code, E.Title, E.VAmt) }),
  //         setRec({
  //           ...Rec,
  //           AccCodeC: RecR.filter(E => E.AccType === '1'),
  //           AccCodeD: RecR.filter(E => E.AccType === '0')
  //         })
  //       })
  //     //   setRec({
  //     //   ...Rec,
  //     //   AccCodeD: RecR.filter(F => F.AccType === '0').map(E => { return (E.Code, E.Title, E.VAmt) }),
  //     //   AccCodeC: RecR.filter(F => F.AccType !== '0').map(E => { return (E.Code, E.Title, E.VAmt) })
  //     // })
  //   }

  //   //....  ABORT  ......................................
  //   return () => { controller.abort() };
  // }, [Rec.VNo])


  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  // ==============================================================



  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=
  // =-.-==-.-==-.-==-.-=[  Fns: DATABASE/ API Handling ] =-.-==-.-==-.-==-.-==
  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=
  const DataFetchAllTrans = async (signal) => {

    dispatch({ type: 'FETCH_LOADING' })
    try {
      //New on 01August
      // const res = await axios.get(process.env.REACT_APP_API_URL + `TrxInvoice/GetGroupBy/${'VDte'}`, {
      // const res = await axios.get(process.env.REACT_APP_API_URL + `TranPaymentSplr/${_VCat}`,)
      const res = await axios.get(process.env.REACT_APP_API_URL + `TrxFundsTraders/${_VCat}`,)
      // const res = await axios.get(process.env.REACT_APP_API_URL + `TranPaymentSplr/${_VCat}`
      //, { params: { DteFrom: Moment(SearchInput.DteFrom).format('YYYY-MM-DDTHH:mm◘:ss'), DteTo: Moment(SearchInput.DteTo).format('YYYY-MM-DDTHH:mm:ss') } }
      //, { params: { DteFrom: '', DteTo: '' } }
      //)

      //  AlertRec(res.data , 'Data Fetched ...')
      //setTransAll( data)
      //if ( res.length > 0) setLastEntryDutyDoc({ Id:  data[data.length - 1].TranM.DocDutyId, RefDocDuty: data[data.length - 1].TranM.RefDocDuty })

      dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
      // if ( res.data.length > 0) setLastEntryDutyDoc({ Id:  res.data[res.data.length - 1].TranM.DocDutyId, RefDocDuty: res.data[res.data.length - 1].TranM.RefDocDuty }) 
    }
    catch (error) {
      AlertRec(error, 'errorr in Data Fetching ...')
      dispatch({ type: 'FETCH_ERROR', payload: error })
    }
  }

  // const DataFetchPaymentTrans = async (signal) => {

  //   fetch(process.env.REACT_APP_API_URL + `TranPaymentSplr/${_VCat}`, { method: 'GET' })
  //     .then(res => res.json())
  //     // .then(data => { setRecAll(data) })
  //     .then(data => {
  //       // AlertRec(data, 'DataRcvd')
  //       // console.log('Trans Purchase Full Data', data)
  //       setTransAll(data)
  //     })
  // }


  // ==================[  Fn: GET ALL RECORDS  ]=====================
  const DataFetchAll = async (signal) => {
    const res = await fetch(`/TrxFundsTraders/${_VCat}`, { signal });
    const data = await res.json();

    // data.map((itm) => {
    //   itm.VDte = (Date.parse(itm.VDte)) ? Date.parse(itm.VDte) : ''
    //   itm.RefVDte = (Date.parse(itm.RefVDte)) ? Date.parse(itm.RefVDte) : ''
    // })
    // console.log('Received Records from Database:', data);
    //  AlertRec(data, 'Received Records from Database:')
    //  console.log('********************************************************',data)
    setRecAll(data)
  }

  // ==================[  Fn: GET Suppliers ALL RECORDS  ]=====================
  // const fetchData = () => {
  //   return axios.get("https://jsonplaceholder.typicode.com/users")
  //         .then((response) => setUser(response.data));
  // }

  const DataFetchTraders = async (signal) => {
    // alert('trying to fetch customers from: ' + process.env.REACT_APP_API_URL + `Traders/C`)

    try {
      //New on 01August
      // const res = await axios.get(process.env.REACT_APP_API_URL + `TrxPurchase/GetGroupBy/${'VDte'}`, {
      // const res = await axios.get(process.env.REACT_APP_API_URL + `Suppliers`)
      const res = await axios.get(process.env.REACT_APP_API_URL + `Traders/C`)
      // AlertRec(res.data, 'Customers Data Fetched ...')

      setTraders(res.data)
    }
    catch (error) {
      console.log('error', error)
    }
  }


  // const DataFetchSuppliers = async (signal) => {
  //   //  window.alert((Txt2Search4B)?`/api/staff/${Txt2Search4B}`:'/api/staff')
  //   // const res = await fetch((Txt2Search4B)?`/api/staff/${Txt2Search4B}`:'/api/staff');
  //   const res = await fetch('/api/Suppliers', { signal });
  //   const data = await res.json();
  //   // data.map((itm) => {
  //   //   itm.VDte = (Date.parse(itm.VDte)) ? Date.parse(itm.VDte) : ''
  //   //   itm.RefVDte = (Date.parse(itm.RefVDte)) ? Date.parse(itm.RefVDte) : ''
  //   // })
  //   // console.log('Received Records from Database:', data);
  //   //  AlertRec(data, 'Received Records from Database:')
  //   //  console.log('********************************************************',data)

  //   //Ascending Order
  //   setSuppliers(data.sort((a, b) => a.Priority > b.Priority ? 1 : -1))
  //   // alert('Suppliers '+Suppliers.length)

  //   alert('setting values of Supplier in RecDefault')
  //   // AlertRec(RecDefault, 'Before setting splr : RecDefault')

  //   // setRecDefault({
  //   //   ...RecDefault,VAmt:-99,
  //   //   DocDutyId: (data.sort((a, b) => a.Priority > b.Priority ? 1 : -1))[0].Code       //Trader -- one of CustomerOrSupplier/ConsumerOrVender/
  //   // })
  //   // AlertRec(RecDefault, 'After setting splr : RecDefault')

  // }

  // ==================[  Fn: GET Products ALL RECORDS  ]=====================

  // const DataFetchAccRecAndSuppliers = async (signal) => {
  //   const res = await fetch('/api/AccRecs', { signal });
  //   const data = await res.json();

  //   const res2 = await fetch('/api/Suppliers', { signal });
  //   const data2 = await res2.json();

  //   //alert('setting values of Both splr and RecDefault')
  //   setSuppliers(data2.sort((a, b) => a.Priority > b.Priority ? 1 : -1))

  //   const defaultSupplier = (data2.sort((a, b) => a.Priority > b.Priority ? 1 : -1))[0]

  //   const rec = {
  //     ...RecDefault,
  //     VNo: '',
  //     VDte: Moment(new Date()).format('DD MMM YY ddd'),
  //     VCat: _VCat,     //Capital Transaction Voucher
  //     Desc: '',
  //     VAmt: 0,
  //     DocDutyId: defaultSupplier.Code,
  //     TRec: defaultSupplier,

  //     // AccCodeD: data.filter(E => E.Code === '22121')[0].Code,
  //     // AccCodeC: data.filter(E => E.Code > '11000' && E.Code < '12000')[0].Code,
  //     AccCodeD: [data.filter(E => E.Code === '22121')[0]],
  //     AccCodeC: [data.filter(E => E.Code > '11000' && E.Code < '12000')[0]]
  //   }

  //   setAccRecs({
  //     VCat: _VCat,
  //     AccR: data,
  //     AccD: data.filter(E => E.Code === '22121'),
  //     AccC: data.filter(E => E.Code > '11000' && E.Code < '12000')
  //   })

  //   setRecDefault(rec)
  //   setRec(rec)
  // }

  // ==================[  Fn: GET AccRecs ALL RECORDS  ]=====================
  const DataFetchAccRecs = async (signal) => {
    // const res = await fetch('/api/AccRecs', { signal });
    // const data = await res.json();

    //   //                 ╔══»(2211)	Acc / Payable			Splr
    //   //               D ╠═»
    //   // 3151	Payment	     ║
    //   //               C ╠══»(1111)	Cash / (1121)Banks etc		...

    //       ╔══»(2212)	Acc/Payable Consultant		... Db in Doctor Consultant
    //     D ╠═» 
    // 3152	Payment	Duty/Consultant Docs    ║
    //     C ╠══»(1111)	Cash/(1121)Banks etc		...
    //       ╚═» (2521)	Income Tax, W/Holding Tax in Purchases...


    //       ╔══»(11111)	Cash/(11121)Banks etc		...
    //     D ╠═» ()	Income Tax Deducted, W/Held Tax in Sales...
    // 3141 Receipts	    ║
    //     C ╠══»(11211)	Acc/Receivable			Cust
    //       ╚═»

    // Theoretical/Original/Factual
    // (D)Cash/Banks -->Rs500
    // (C)Receivable -->Rs500  


    fetch(process.env.REACT_APP_API_URL + `AccRec`, { method: 'GET' })
      .then(res => res.json())
      .then(data => {

        // AlertRec(data, 'AccRec-Data Rcvd')
        setAccRecs(data)
        const AccDx = data.filter(E => E.Code > '11100' && E.Code < '11200' && E.Code.slice(-1) !== '0')  //Cash-Banks
        const AccCx = data.filter(E => E.Code === '11211')   // Acc Receivable against Sales

        setAccRecs({
          VCat: _VCat,
          AccD: AccDx,
          AccC: AccCx
        })

        //TABLE: AccRec.'Code' ===>> converts into 'AccCode' in Rec & RecDefault; OrderSheet
        setRecDefault({
          ...RecDefault,
          AccD: [{ ...AccDx[0], AccCode: AccDx[0].Code }],
          AccC: [{ ...AccCx[0], AccCode: AccCx[0].Code }]
        })
        // AlertRec(RecDefault, 'DefaultRec')
      })

    // console.log('data.filter(E => E.Code === 1311):', AccD)
    // console.log('data.filter(E => E.Code === 2211):', AccC)
    // AlertRec(data, 'DATA')      

    //   AccD: data.filter(E => E.Code === '1311'),
    //   AccC: data.filter(E => E.Code === '22121')
  }

  // // ==================[  Fn: GET Products ALL RECORDS  ]=====================
  // const DataFetchAccRecs = async (signal) => {
  //   const res = await fetch('/api/AccRecs', { signal });
  //   const data = await res.json();

  //   //                 ╔══»(2211)	Acc / Payable			Splr
  //   //               D ╠═»
  //   // 3151	Payment	     ║
  //   //               C ╠══»(1111)	Cash / (1121)Banks etc		...

  //   setAccRecs({
  //     VCat: _VCat,
  //     AccR: data,
  //     AccD: data.filter(E => E.Code === '22121'),
  //     AccC: data.filter(E => E.Code > '11000' && E.Code < '12000')
  //   })
  //   alert('setting values of RecDefault')
  //   AlertRec(RecDefault, 'Before settin Rec: RecDefault')

  //   setRecDefault({
  //     ...RecDefault,
  //     VNo: '',
  //     VDte: Moment(new Date()).format('DD MMM YY ddd'),
  //     VCat: _VCat,     //Capital Transaction Voucher
  //     Desc: '',
  //     VAmt: 0,
  //     DocDutyId: Suppliers.length > 0 ? Suppliers[0].Code : Suppliers.length,       //Trader -- one of CustomerOrSupplier/ConsumerOrVender/

  //     AccCodeD: data.filter(E => E.Code === '22121')[0].Code,
  //     AccCodeC: data.filter(E => E.Code > '11000' && E.Code < '12000')[0].Code,
  //   })

  //   AlertRec(RecDefault, 'After  settin Rec: RecDefault')

  // }






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
    setRec({ ...Rec, VNo: '', VID: '' })
  }
  // -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-
  //VoucherSelect is clicked
  const HandleListItemClicked = (E) => {
    // console.log('HandleListItemClicked Original props: ', E.VNo, E.VDte, E.VCat, E)
    // AlertRec(E, 'This Items is clicked as E')

    // Now Add-- Items Detail and Titles etc 
    let RecR = []
    //const { VID, VNo, VDte, VCat, DocDutyId, Desc, Rem, VAmt, VQtyTxt, AccD, AccC } = OrderSheet
    setRec({
      //...Rec,
      VID: E.VID,
      // VNo: (E.TranM.VNo.trim()) == '' ? '--' : E.TranM.VNo.trim(),
      VNo: E.TranM.VNo,
      // VDte: Moment(new Date(E.TranM.VDte)).format('DD MMM YY ddd'),
      VDte: E.TranM.VDte,  //Moment(new Date(E.TranM.VDte)).format('DD MMM YY ddd'),
      VCat: E.TranM.VCat,     //Capital Transaction Voucher

      Desc: E.TranM.Desc.trim(),
      Rem: E.TranM.Rem.trim(),

      VQtyTxt: E.TranM.VQtyTxt.trim(),
      VAmt: E.TranM.VAmt,

      RefTrader: E.TranM.RefTrader,
      TId: E.TranM.TId,

      //TABLE:Account-Code is Recvd as 'AccCode'; same as saved in Rec & RecDefault; OrderSheet
      AccD: E.TranRs.filter(E => E.AccType === '0'),
      AccC: E.TranRs.filter(E => E.AccType === '1'),

      // AccC: AccC 
      // AccCodeD: RecR.filter(F => F.AccType === '0').map(E => { return (E.Code, E.Title, E.VAmt) }),
      // AccCodeC: RecR.filter(E => E.AccType === '1')
    })

  }

  // ==============================================================
  const Handle2SendData4Addition = (E) => {
    if (E.Code) {
      // alert('Items data was Empty')
      // setRec({...E, PicURL: E.Pic, Pic:''})
      setRec(E)
      HandleBtnAddnew(true)
    }
  }

  const HandleDatabase = (opt) => {
    console.log('handle data base')
    //   switch (opt) {
    //     case 'Empty':
    //       RecAll.map(async itm => {
    //         // //=====[   READY to Delete data from Database   ]========  
    //         const res = await fetch(`/api/AccRec/${itm.Code}`, { method: 'DELETE' })
    //       })

    //       alert('All Data has been deleted')
    //           setNeed2Refresh(p => !p)
    //       break;

    //     case 'Edit':
    //       alert('Editing data')
    //       RecAll.map(async itm => {
    //         // //=====[   READY to EDIT data from Database   ]========  
    //         console.log('Seding data for Code:', itm.Code);

    //         const res = await fetch(`/api/Item/${itm.Code}`, {
    //           method: 'PATCH', headers: { 'Content-Type': "application/json" },
    //           body: JSON.stringify(
    //             {
    //               "CrntBal": 15,
    //               "QtyMin": 10,
    //               "QtyMax": 20
    //             }
    //           )
    //         })

    //         // body:JSON.stringify({UID,  Title,  Desc,  Work,  Email,  PW})});      
    //         const data = await res.json();
    //         console.log('Saved Record Returned:', data);
    //       })
    //       break;

    //     case 'Add':
    //       alert('adding data')
    //       // setSetupDBArray(true)

    //       break;

    //     default:
    //       break;
    //   }
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
  // [Printing ]\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

  const PRINT_REF = createRef();
  const PRINT_VOUCHER = createRef();    //PRINT_INVOICE for Sale
  // const chartRef = createRef();

  // TRIGGER normal Printing 
  const HandlePrint = () => {
    // alert('Printing must be started')
    HandlePrintNormal()
    // HandleElectronPrint()
    // HandleElectronPreviewPrint()
  }

  const HandlePrintNormal = useReactToPrint({
    // content: () => PRINT_REF.current,
    content: () => PRINT_VOUCHER.current,

    //documentTitle: "List component",
    // print: handlePreview,
  });


  // [END Printing ]\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/


  // -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-
  //VoucherSelect is clicked 2 CloseWindow
  const HandleCloseWindow = (msg) => {
    if (msg) setRec({ ...Rec, VID: '' })
  }
  // -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-



  // ==============================================================




  // *******************************************************************************************************************
  //                                  M A N A G E/ Return
  // *******************************************************************************************************************

  // let SelectedItems = []
  return (<>
    {/* {console.log('Entering in return:', RecAll)} */}

    <div className="card w-[calc(100%-4px)] mt-[2px] md:w-[calc(100%-16px)] md:mt-[8px] mx-auto">

      {/* ====================================================== */}
      {/* MAIN HEADER - PRG  */}  {/* background-color:F3E5F5 */}
      {/* ====================================================== */}
      <div className="card-header px-2 flex flex-wrap md:flex-nowrap justify-between items-center BG-PortalHeaderGradient">

        {/* ............. Display ICON & TITLE  ............. */}
        <div className="flex  gap-2  items-center w-full">
          <img className="p-0 m-0" style={{ width: 28, height: 28 }} src={imgPortal} />

          <span className=' text-2xl mb-1 text-white'>Portal: </span>
          <span className=' text-2xl mb-1 text-slate-200'>Collection Receipts</span>

          {/* <span className='fs-4'> DispRecIndex {CrntIdx2DisplayRec} </span> */}
        </div>

        {/* ............. Display BUTTONS toolbar  ............. */}
        <div className="flex  gap-2 items-center justify-end w-full relative">

          {/* ............. Display BUTTON SEARCH text and Icon  ............. */}
          {/* Only if ADD-NEW is Not Clicked */}
          <span>

            {(BtnEditClicked || BtnAddnewClicked) &&
              <>
                <button type="button" className=" py-0 me-10 text-black" onClick={() => { HandleBtnCancel(false) }}>
                  {/* {BtnAddnewClicked ? 'Addition' : 'Update'} Process <FcCancel className='text-xl mb-1' /> */}
                  <span className=' md:hidden'>{BtnAddnewClicked ? 'Addition' : 'Update'} Mode</span>
                  <span className=' hidden md:block'>Exit {BtnAddnewClicked ? 'Addition' : 'Update'} Mode</span>

                </button>

                {/* EXIT GATE BUTTON */}
                {/* <div style={{ position: 'absolute', top: '-5px', right: '0px', zIndex: '999' }} onClick={() => HandleBtnCancel(true)}> */}
                <div className='cursor-pointer absolute top-[-30px] md:top-[-8px] right-0 ' style={{ zIndex: '1' }} onClick={() => HandleBtnCancel(true)}>
                  <strong className='text-red-600'> EXIT</strong><br /><ImEnter className='text-3xl  text-red-600' />
                  {/* <CgCloseO className='text-xl  text-danger '  /> */}
                  {/* <SlClose className='text-xl ms-auto text-danger '  /> */}
                </div>

              </>
            }

            {/* Display BUTTON ADD-NEW & CLEAR */}
            {(!(BtnEditClicked || BtnAddnewClicked) && Rec.VID) &&
              <button type="button" class="px-2 md:px-4 py-1 md:py-1 mb-1 md:mx-2 text-white text-xs text-center font-medium rounded-lg inline-flex items-center bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 "
                onClick={() => { HandleBtnEdit(true) }}>
                Update &nbsp;
                <span className='hidden md:flex'> &nbsp; <FaEdit className='' style={{ width: '20px', height: '20px' }} /></span>
              </button>
            }
            {!(BtnEditClicked || BtnAddnewClicked) &&
              <button type="button" class="px-2 md:px-4 py-1 md:py-1  mx-2 mb-1 text-white text-xs text-center font-medium rounded-lg inline-flex items-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow-purple-500/50 "
                onClick={() => { HandleBtnAddnew(true) }}>
                Add New &nbsp;
                {/* <FaUserPlus className='mb-1' style={{ width: '20px', height: '20px' }} /> */}
                <span className='hidden md:flex'> &nbsp; <MdOutlineLibraryAdd className='' style={{ width: '20px', height: '20px' }} /></span>
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
      <div className="card-body p-1 flex flex-wrap gap-2 w-full BG-PortalBody " >

        {/* Transaction List */}
        {/* LEFT-PART for Vouchers List */}
        {/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. */}
        <div className={
          (BtnAddnewClicked || BtnEditClicked || Rec.VID)
            ? 'w-full md:w-[25%] p-0'
            : 'w-full md:w-[70%] p-0 md:p-4 mx-auto'
        }>


          {/* {TransAll.length <= 0
            ? <div>No Data Found... </div>
            : <>              <RecsComboViews RecAll={TransAll} HandleListItemClicked={HandleListItemClicked} SizeFlagFS={(BtnAddnewClicked || Rec.Id) ? 'S' : 'F'} />            </>
          } */}

          {Loading
            ? <div className='text-center w-full'>
              {/* <BoxLoading className='w-full' txt={'Processing ...'} /> */}
              Loading Box
            </div>
            : DATA_RECS.length <= 0 ?
              // <BoxMessage variant='danger' >Seems, There is No Data...</BoxMessage>
              <p>BoxMessage</p>
              : <>
                {/* <RecsComboViews RecAll={DATA_RECS} HandleListItemClicked={HandleListItemClicked} SizeFlagFS={(BtnAddnewClicked || BtnEditClicked || Rec.VID) ? 'S' : 'F'} /> */}
                {/* <div className='text-center w-full'> */}
                  <RecsComboViewsSearch
                    RecAll={DATA_RECS}
                    HandleListItemClicked={HandleListItemClicked}
                    SizeFlagFS={(BtnAddnewClicked || BtnEditClicked || Rec.VID) ? 'S' : 'F'}
                    FetchData={DataFetchAllTrans}
                    SearchInput={SearchInput}
                    setSearchInput={setSearchInput}

                    TriggerShow={!(BtnAddnewClicked || BtnEditClicked)}
                  />
                {/* </div> */}
              </>
          }

        </div>


        {/* RIGHT-PART for Selected Voucher Detail */}
        {/* Dont Show if No Action is taken. Only if any buttn ADD-NEW/Edit/Delete is Clicked */}
        {(BtnAddnewClicked || Rec.VID) &&

          // <div style={{ width: '70%' }}>
          // <div className="p-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden" >
          <div className="p-2 flex-grow bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden  relative" >


            {/* ======================================================================================================================= */}
            {/* {(SelectedItems = TranD4RecAll.filter((E) => E.Vid === Rec._id)).length > 0 */}

            {(!BtnAddnewClicked) && (!Rec.VID) &&
              <button className="w-full " style={{ color: 'black', background: '#f0c040', border: '1px solid #404040' }}>
                No Item Selected for Detail
              </button>
            }

            {!(BtnEditClicked || BtnAddnewClicked) && (Rec.VID) &&
              <>
                {/* <div className='card d-flex  m-0 p-1 flex-column text-start' style={{ width: '450px', fontSize: '12px', background: '#e0e0e0', borderRadius: '5px' }}> */}

                <span className=' md:hidden'>
                <RecDetailDisp Rec={Rec} HandleCloseWindow={HandleCloseWindow} />
                </span>
                <span className='hidden md:inline'>
                  <PrintableVoucher ref={PRINT_VOUCHER} Rec={Rec} HandleCloseWindow={HandleCloseWindow} HandlePrint={HandlePrint} />
                </span>
              </>
            }


            {/* Only if ADD-NEW/Update is Clicked */}
            {((BtnAddnewClicked || BtnEditClicked)) &&

              // {/* EXIT GATE BUTTON ============*/}
              // {/* <div style={{ position: 'absolute', top: '-5px', right: '0px', zIndex: '999' }} onClick={() => HandleBtnCancel(true)}> */}
              // <div className='md:hidden cursor-pointer absolute top-[40px] right-[0px] ' style={{zIndex: '1' }} onClick={() => HandleBtnCancel(true)}>
              <div className='md:hidden cursor-pointer absolute right-[0px] ' style={{ top: `${BtnAddnewClicked ? "40px" : "60px"}`, zIndex: '1' }} onClick={() => HandleBtnCancel(true)}>
                <strong className='text-red-600'> EXIT</strong><br /><ImEnter className='text-3xl  text-red-600' />
              </div>
              // {/* End- EXIT GATE BUTTON ============*/}
            }
            {/* ======================================================================================================================= */}


            {/* Only if ADD-NEW/Update is Clicked */}
            {((BtnAddnewClicked || BtnEditClicked)) &&

              < EntryFormReceipt

                // CrntRec={BtnAddnewClicked ? SetupDBArray ? Rec : RecDefault : Rec}
                CrntRec={BtnAddnewClicked ? RecDefault : Rec}

                // AccRec={AccRec}
                AccRecs={AccRecs}

                Traders={Traders}

                // VoucherMode={BtnAddnewClicked ? 'Add' : BtnEditClicked ? 'Edit' :  BtnDeleteClicked ? 'Del':''}
                VoucherMode={BtnAddnewClicked ? 'Add' : BtnEditClicked ? 'Edit' : ''}
                HandleBtnVoucherMode={HandleBtnVoucherMode}

              // HandleInputs={HandleInputs}
              // setNeed2Refresh={setNeed2Refresh}
              // Need2Refresh={Need2Refresh}                
              />
            }
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
