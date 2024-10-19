import React, { useState, useEffect, useReducer, createContext, createRef } from 'react'
import { useCtxMainContextHook } from '../../../../CtxMain.jsx';

import axios from 'axios'
// import './Create.css'
import Moment from 'moment'
// import * as fs from 'fs'

//Two file needed for toasify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert } from 'react-bootstrap';


import { AlertRec, SetPadLeftZero, DispAPIInAlert, DispArrayInAlert, DispRecInAlert } from '../../../../StdLib.jsx'

import { PrintableVoucher } from './Print/PrintableVoucher';

import RecsComboViews from './Tran/RecsComboViews.jsx';
import BoxLoading from '../../../Components/BoxLoading.jsx';
import RecDetailDisp from './Tran/RecDetailDisp.jsx';
// import RecDetailDisp from './Tran/RecDetailDisp.jsx';

import { useReactToPrint } from 'react-to-print';


// [.....................START: Calls Prgs: ..................................................]
import EntryFormPayment from './Tran/EntryFormPayment'
// import { Data as DataAccRec } from '../../AdminData/DB-AccRec'
// import { Data as KitchenItems } from '../../AdminData/WarehouseData/KitchenData.js'
// import { DataCategories } from '../../AdminData/WarehouseData/DataCategories'
// import { Suppliers } from '../../AdminData/SuppliersData'
import InfoCard from './Components/InfoCard'
import PrintTestPageNew from './PrintTestPageNew'
// [.....................END: Calls Prgs: ..................................................]

// Two files needed for datepicker
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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


const _VCat = "3154"
const _PrgID = "3154"
const _PrgTitle = "Tran Payments Entries"


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
      const res = await axios.get(process.env.REACT_APP_API_URL + `TranPaymentSplr/${_VCat}`,)
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
    const res = await fetch(`/TranPaymentSplr/${_VCat}`, { signal });
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
      const res = await axios.get(process.env.REACT_APP_API_URL + `Traders/S`)
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



    fetch(process.env.REACT_APP_API_URL + `AccRec`, { method: 'GET' })
      .then(res => res.json())
      .then(data => {

        // AlertRec(data, 'AccRec-Data Rcvd')
        setAccRecs(data)
        const AccDx = data.filter(E => E.Code === '22111')   // REVENUE-Payble against purchase
        const AccCx = data.filter(E => E.Code > '11100' && E.Code < '11200' && E.Code.slice(-1) !== '0')  //Cash-Banks

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

    <div className="card">

      {/* ====================================================== */}
      {/* MAIN HEADER - PRG  */}  {/* background-color:F3E5F5 */}
      {/* ====================================================== */}
      <div className="card-header px-2 d-flex  justify-content-between align-items-center" style={{ height: 30, backgroundColor: '#E1BEE7' }}>

        {/* ............. Display ICON & TITLE  ............. */}
        <div className="d-flex  gap-2 align-items-center">
          <span className="p-0 mb-2 fs-3 text-danger" ><TbManualGearbox /></span>
          <span className='fs-4'> Manage: Payments Transactions</span>
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
            {(!(BtnEditClicked || BtnAddnewClicked) && Rec.VID) &&
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
            {/* {!(BtnEditClicked || BtnAddnewClicked) && (Rec.VNo > 0) &&
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
        <div className="card px-2 pt-2 shadow-lg" style={{ width: (BtnAddnewClicked || Rec.VID) ? '30%' : '50%' }}>
          {/* {TransAll.length <= 0
            ? <div>No Data Found... </div>
            : <>              <RecsComboViews RecAll={TransAll} HandleListItemClicked={HandleListItemClicked} SizeFlagFS={(BtnAddnewClicked || Rec.Id) ? 'S' : 'F'} />            </>
          } */}

          {Loading ? <div className='text-center w-100'><BoxLoading className='w-100' txt={'Processing ...'} /></div>
            : DATA_RECS.length <= 0 ?
              // <BoxMessage variant='danger' className='text-black' >Seems, There is No Data...</BoxMessage>
              <Alert variant='info' className='text-black'> No Data Found...       </Alert>
              : <>
                <RecsComboViews RecAll={DATA_RECS} HandleListItemClicked={HandleListItemClicked} SizeFlagFS={(BtnAddnewClicked || BtnEditClicked || Rec.VID) ? 'S' : 'F'} />
              </>
          }

        </div>

        {/* RIGHT-PART for Selected Voucher Detail */}
        {/* Dont Show if No Action is taken. Only if any buttn ADD-NEW/Edit/Delete is Clicked */}
        {(BtnAddnewClicked || Rec.VID) &&

          <div style={{ width: '70%' }}>
            <div className="card p-2 shadow-lg align-items-start " >

              {/* {(SelectedItems = TranD4RecAll.filter((E) => E.Vid === Rec._id)).length > 0 */}

              {(!BtnAddnewClicked) && (!Rec.VID) &&
                <button className="w-100 " style={{ color: 'black', background: '#f0c040', border: '1px solid #404040' }}>
                  No Item Selected for Detail
                </button>
              }

              {!(BtnEditClicked || BtnAddnewClicked) && (Rec.VID) &&
                <>
                {/* <div className='card d-flex  m-0 p-1 flex-column text-start' style={{ width: '450px', fontSize: '12px', background: '#e0e0e0', borderRadius: '5px' }}> */}
                {/* <RecDetailDisp Rec={Rec} HandleCloseWindow={HandleCloseWindow} /> */}
                <PrintableVoucher ref={PRINT_VOUCHER} Rec={Rec} HandleCloseWindow={HandleCloseWindow} HandlePrint={HandlePrint} />
              </>

              }

              {/* Only if ADD-NEW/Update is Clicked */}
              {((BtnAddnewClicked || BtnEditClicked)) &&
                <>
                  {/* {AlertRec(RecDefault,'Final for Addition of RecDefault')} */}
                  {/* {AlertRec(Suppliers)}
                  {AlertRec(AccRecs)} */}

                  < EntryFormPayment

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
  </>)
}
