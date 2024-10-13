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

import React, { useState, useEffect, createRef, useReducer, createContext } from 'react'
import axios from 'axios'
// import './Create.css'
import Moment from 'moment'

import { useReactToPrint } from "react-to-print";

// Two files needed for datepicker
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

//Two file needed for toasify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { AlertRec, SetPadLeftZero, DispAPIInAlert, DispArrayInAlert, DispRecInAlert } from '../../../../StdLib'

// [.....................START: Calls Prgs: ..................................................]
// import EntryFormItems from './Tran/EntryFormItems'
// import { Data as AccRecs } from '../../../AdminData/DB-AccRec'

// import TabbedBillItems from './Tran/TabbedBillItems'
import RecDetailDisp from './Tran/RecDetailDisp'
// import RecsComboViews from './Tran/RecsComboViews';
import ListedBillItems from './Tran/ListedBillItems';
import { PrintableInvoice } from './Print/PrintableInvoice';

import RecsComboViewsSearch from './Tran/RecsComboViewsSearch';
// import ListedBillParties from './Tran/ListedBillParties';


import { useCtxMainContextHook } from '../../../../CtxMain';
import BoxLoading from '../../../Components/BoxLoading'
import BoxMessage from '../../../Components/BoxMessage'
import imgPortal from './AssetsLocal/Images/Trans.png'

// import { Data as KitchenItems } from '../../../AdminData/WarehouseData/KitchenData.js'
// import { Categories } from '../../../AdminData/WarehouseData/DataCategories'
// import { Trader } from '../../../AdminData/TraderData'
// [.....................END: Calls Prgs: ..................................................]

import { FaSave, FaUserPlus, FaUserEdit, FaUsers, FaUserCog, FaUserSlash, FaFolder, FaEdit } from 'react-icons/fa'
import { FcCancel } from 'react-icons/fc'

//Play, back, next, fwwd
import { FaStepBackward, FaBackward, FaForward, FaStepForward } from 'react-icons/fa'

import { TbWiperWash } from 'react-icons/tb'

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
import IconSearch from '../../../ImagesAdminPanel/default/IconSearch.png'
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

// import { Alert } from 'react-bootstrap';

import { RiFunctionAddLine, RiSearchEyeLine } from 'react-icons/ri';


//Table: TranM - { VID, VNo, VDte, VCat, TId, Desc, Rem, VQtyTxt, VAmt, RefVID, RefVNo, RefVDte, RefVCat, RefVAmt, RecType, RecStatus, Priority }
//Table: TranR - { VID, VNo, VDte, VCat, AccType, AccCode, Title, Desc, Rem, VAmt, }
//Table: TranD - { Id/Auto, VID, VNo, VDte, VCat, TId, PId, Unit, Qty, Price }

//Table: Item - { Id/Auto, Code, Title, TitleU, Desc, Rem, CatCode, TId, PicURL, Unit, QtyDef, QtyInc, QtyStep, Price, PreBal, CrntBal, QtyMin, QtyMax, RecType, RecStatus, Priority, EntryBy, EntryDte
//Table: Category - { Code, Title, Desc, Rem, RecType, RecStatus, Priority, EntryBy, EntryDte}

//Table: AccRec - {Code, Title, Desc, Rem, PreBal, CrntBal, RecType, RecStatus, Priority, EntryBy, EntryDte}
//Table: Supplier - {Id/Auto, Code, RecType, RecStatus, Priority, Title, TitleU, Desc, Rem, Address, Phone, Contact1, ContactPh1, Contact2, ContactPh2, PicURL, PreBal, CrntBal, EntryBy, EntryDte}

const _VCat = "3147"
const _VCat2 = "3133"
const _PrgID = "3147"
const _PrgTitle = "Inventory Sales --->(Combo sales and receipt) Transactions"

//Default settings for dropDowns
//TCode: 'SAB', Cat: '11'

const RecDefault = {

  VID: '',
  VNo: '',
  MRNo: '',
  VType: '',
  VDte: new Date(),   //Moment(new Date()).format('DD MMM YY ddd'),
  VCat: _VCat,     //Capital Transaction Voucher
  VCat2: _VCat2,     //Capital Transaction Voucher

  PatId: '',       //PatientId -- one of CustomerOrSupplier/ConsumerOrVender/
  DocRefId: '',
  DocDutyId: '',
  TId: '62',       //TraderId -- one of CustomerOrSupplier/ConsumerOrVender/

  Desc: '',
  Rem: 'Sales Transaction',

  RefPatient: '',
  RefDocDuty: '',
  RefDocRef: '',


  RefVID: '',
  RefVNo: '',
  RefVDte: '',
  RefVCat: '',

  VQtyTxt: '',
  VAmtDoc: '',
  VAmtRef: '',
  VAmtPaid: 0,
  VAmtBal: '',
  VAmt: 0,
  VAmtMargin: 0,

  VItems: [],
}

const AccRecDefault = {
  // ID: '',
  VCat: _VCat,     //Purchase Transaction Voucher
  // AccD: { Code: '', Title: '', Desc: '' },
  // // AccTypeD: ACTypeD,      //0 or 1 debt or credit
  // AccC: { Code: '', Title: '', Desc: '' },
  // // AccTypeC: ACTypeC,      //0 or 1 debt or credit
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
  const { _Procedures, _Patients, _DocsRef, _AccRecs } = CtxMainState
  const [{ Loading, Error, DATA_RECS }, dispatch] = useReducer(reducerFn, { Loading: false, Error: '', DATA_RECS: [] })



  //Single Record for Manage PRG
  const [Rec, setRec] = useState({});
  //All Records for Manage PRG
  const [RecAll, setRecAll] = useState([]);


  const [TransAll, setTransAll] = useState([]);

  const [AccRec, setAccRec] = useState('');
  const [AccRecs, setAccRecs] = useState('');

  const [Traders, setTraders] = useState([]);
  const [Cats, setCats] = useState([]);

  const [LastEntryDutyDoc, setLastEntryDutyDoc] = useState({ Id: '', RefDocDuty: '' });
  const [Products, setProducts] = useState('');
  const [ProductItems, setProductItems] = useState('');

  const [Categories, setCategories] = useState('');

  const [TranD4RecAll, setTranD4RecAll] = useState([])
  const [Need2Refresh, setNeed2Refresh] = useState(false);

  //Search items
  const [Txt2Search, setTxt2Search] = useState(103)

  // const [SearchInput, setSearchInput] = useState({ DteFrom: new Date(new Date().setDate(new Date().getDate() - 50)), DteTo: new Date() });
  const [SearchInput, setSearchInput] = useState({ DteFrom: new Date('01 July 2023'), DteTo: new Date() });

  // const [selectedImage4E, setSelectedImage4E] = useState('./AssetsLocal/Images/Default.jpg');
  // const [selectedImage4E, setSelectedImage4E] = useState(null);
  const [BtnAddnewClicked, setBtnAddnewClicked] = useState(false)
  const [BtnEditClicked, setBtnEditClicked] = useState(false)
  // const [BtnDeleteClicked, setBtnDeleteClicked] = useState(false)

  const DefaultImgURL4E = require('./AssetsLocal/Images/Default.jpg')


  // \/\/\/\/\/\/\/\/\/\/\[    UseEffect      ]/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;


    DataFetchAccRecs(signal)
    DataFetchTraders(signal)
    // DataFetchCategories(signal)

    //....  ABORT  ......................................
    return () => { controller.abort() };
    // }, [CtxMainState._Patients, CtxMainDispatch])
  }, [])

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    // document.title = "PizzaByChef"+process.env.REACT_APP_API_URL
    // document.title = process.env.REACT_APP_API_URL

    DataFetchAllTrans(signal)

    DataFetchProductItems(signal)
    // DataFetchTrader(signal)
    // DataFetchProducts(signal)

    //DataFetchAllRecs(signal)
    // DataFetchComboAllRecs(signal)

    setRec(RecDefault);

    // setRec({ ...Rec, ACCodeC: { ...ACCodeC, Code: C[0].VNo }, ACCodeD: { ...ACCodeD, Code: D[0].VNo } })
    // RecDefault.ACCodeC.VNo = C[0].VNo; RecDefault.ACCodeD.VNo = D[0].VNo

    //....  ABORT  ......................................
    return () => { controller.abort() };
  }, [Need2Refresh])

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/



  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=
  // =-.-==-.-==-.-==-.-=[  Fns: DATABASE/ API Handling ] =-.-==-.-==-.-==-.-==
  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=
  const DataFetchAllTransWithoutPeriod = async (signal) => {
    dispatch({ type: 'FETCH_LOADING' })

    try {
      //New on 01August
      // const res = await axios.get(process.env.REACT_APP_API_URL + `TrxPurchase/GetGroupBy/${'VDte'}`, {
      const res = await axios.get(process.env.REACT_APP_API_URL + `TrxSales/GetTrx/${'VDte'}`
        //, { params: { DteFrom: Moment(SearchInput.DteFrom).format('YYYY-MM-DDTHH:mm◘:ss'), DteTo: Moment(SearchInput.DteTo).format('YYYY-MM-DDTHH:mm:ss') } }
        , { params: { DteFrom: '', DteTo: '' } }
      )

      //  AlertRec(res.data, 'Data Fetched ...')

      //setTransAll( data)
      //if ( res.length > 0) setLastEntryDutyDoc({ Id:  data[data.length - 1].TranM.DocDutyId, RefDocDuty: data[data.length - 1].TranM.RefDocDuty })

      dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
      // if (res.data.length > 0) setLastEntryDutyDoc({ Id: res.data[res.data.length - 1].TranM.DocDutyId, RefDocDuty: res.data[res.data.length - 1].TranM.RefDocDuty })

    }
    catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error })
    }


    //------ [  OLD Fetching B4 01August2023  ]
    /*
          fetch(process.env.REACT_APP_API_URL + `TrxPurchase`, { method: 'GET' })
            .then(res => res.json())
            .then(data => {
              // .then(data => { setRecAll(data) })
              // AlertRec(data, 'Data Fetched ...')
              // console.log('\n\n\nFETCHED: ', {Id: data[data.length-1].TranM.DocDutyId, Title: data[data.length-1].TranM.RefDocDuty.Title})
              // AlertRec({Id: data[data.length-1].TranM.DocDutyId, Title: data[data.length-1].TranM.RefDocDuty.Title}, 'FETCHED: Id:data[data.length-1].Id, Title: data[data.length-1].RefDutyDoc.Title')
      
              setTransAll(data)
              if (data.length > 0) {
                setLastEntryDutyDoc({ Id: data[data.length - 1].TranM.DocDutyId, RefDocDuty: data[data.length - 1].TranM.RefDocDuty })
              }
            }
              // , (error) => { AlertRec(error, 'FETCH REPLIED ERROR ') }
            )
      */
  }

  const DataFetchAllTrans = async (signal) => {
    dispatch({ type: 'FETCH_LOADING' })

    try {
      //New on 01August
      // const res = await axios.get(process.env.REACT_APP_API_URL + `TrxPurchase/GetGroupBy/${'VDte'}`, {
      const res = await axios.get(process.env.REACT_APP_API_URL + `TrxSales/GetTrx/${'VDte'}`
        //, { params: { DteFrom: Moment(SearchInput.DteFrom).format('YYYY-MM-DDTHH:mm◘:ss'), DteTo: Moment(SearchInput.DteTo).format('YYYY-MM-DDTHH:mm:ss') } }
        , {
          params: {
            DteFrom: Moment(SearchInput.DteFrom).format('YYYY-MM-DDTHH:mm:ss'),
            DteTo: Moment(SearchInput.DteTo).format('YYYY-MM-DDTHH:mm:ss'),
          }
        }
      )

      // AlertRec(res.data, 'Data Fetched ...')

      //setTransAll( data)
      //if ( res.length > 0) setLastEntryDutyDoc({ Id:  data[data.length - 1].TranM.DocDutyId, RefDocDuty: data[data.length - 1].TranM.RefDocDuty })

      dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
      //if (res.data.length > 0) setLastEntryDutyDoc({ Id: res.data[res.data.length - 1].TranM.DocDutyId, RefDocDuty: res.data[res.data.length - 1].TranM.RefDocDuty })

    }
    catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error })
    }


    //------ [  OLD Fetching B4 01August2023  ]
    /*
          fetch(process.env.REACT_APP_API_URL + `TrxPurchase`, { method: 'GET' })
            .then(res => res.json())
            .then(data => {
              // .then(data => { setRecAll(data) })
              // AlertRec(data, 'Data Fetched ...')
              // console.log('\n\n\nFETCHED: ', {Id: data[data.length-1].TranM.DocDutyId, Title: data[data.length-1].TranM.RefDocDuty.Title})
              // AlertRec({Id: data[data.length-1].TranM.DocDutyId, Title: data[data.length-1].TranM.RefDocDuty.Title}, 'FETCHED: Id:data[data.length-1].Id, Title: data[data.length-1].RefDutyDoc.Title')
      
              setTransAll(data)
              if (data.length > 0) {
                setLastEntryDutyDoc({ Id: data[data.length - 1].TranM.DocDutyId, RefDocDuty: data[data.length - 1].TranM.RefDocDuty })
              }
            }
              // , (error) => { AlertRec(error, 'FETCH REPLIED ERROR ') }
            )
      */
  }

  // ==================[  Fn: GET ALL RECORDS  ]=====================


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

  const DataFetchProductItems = async (signal) => {

    try {
      //New on 01August
      // const res = await axios.get(process.env.REACT_APP_API_URL + `TrxPurchase/GetGroupBy/${'VDte'}`, {
      const res = await axios.get(process.env.REACT_APP_API_URL + `Items`)
      // AlertRec(data, 'Data Fetched ...')

      setProductItems(res.data)
    }
    catch (error) {
      console.log('error', error)
    }
  }


  // ==================[  Fn: GET AccRecs ALL RECORDS  ]=====================
  const DataFetchAccRecs = async (signal) => {
    // const res = await fetch('/api/AccRecs', { signal });
    // const data = await res.json();

    let AccD = ''
    let AccC = ''


    //         ╔══»(11111)	//ASSETS-Cash/(1121)Banks etc ...
    //       D ╠══»()	Sales Discount Acc 			...	
    //       D ╠═» 
    // 3147	Sales Itemse  (Combo Voucher ---> Sales + Receipt)
    //       C*╠══»(41211)	REVENUE-Sales/Diagnostics/ShareConsultancy
    //         ╚═» //()	Sales Tax invoiced in Sales	f...

    //        *╔══»(51111)	//AmtCOGS//COGS -- SalesOfInventoryItems   ...	ItemsDetail
    //       D ╠═» //()	Sales Tax Paid in Purchase	...
    // 3133	COGS --Services Availed------- Sales/Services Rendered
    //       C ╠══» ()	Acc/Payable Consultant		... Doctor Consultant
    //         ╚═»	(12111)	//InventoryItems Purchased		... Doctor Referral

    // fetch(process.env.REACT_APP_API_URL + `AccRec`, { method: 'GET' })
    // .then(res => res.json())
    // .then(data => {

    // setAccRecs(data)
    // AlertRec(_AccRecs, '_AccRecs')      
    const AccDx = _AccRecs.Data.filter(E => E.Code === '11111')   //ASSETS-Inventory Purchase 
    const AccCx = _AccRecs.Data.filter(E => E.Code === '41211')   //REVENUE-Sales -Inventory Items

    const AccDx2 = _AccRecs.Data.filter(E => E.Code === '51111')  //AmtCOGS//COGS -- SalesOfInventoryItems
    const AccCx2 = _AccRecs.Data.filter(E => E.Code === '12111')  //Less: InventoryItems Purchased
    // AlertRec(AccCx, 'AccCx')   
    if (AccDx.length <= 0 || AccCx.length <= 0 || AccDx2.length <= 0 || AccCx2.length <= 0) {
      AlertRec(_AccRecs, `AccD/C is invalid. \nPlz CHK Database.\n  AccD: ${AccDx.length} \n AccC: ${AccCx.length} \n AccD2: ${AccDx2.length} \n AccC2: ${AccCx2.length}`)
      return
    }

    setAccRec({
      // ...AccRec,
      VCat: _VCat,
      AccD: AccDx,
      AccC: AccCx,

      VCat2: _VCat2,
      AccD2: AccDx2,
      AccC2: AccCx2
      // })
    })

    // console.log('data.filter(E => E.Code === 1311):', AccD)
    // console.log('data.filter(E => E.Code === 2211):', AccC)
    // AlertRec(data, 'DATA')      

    //   AccD: data.filter(E => E.Code === '1311'),
    //   AccC: data.filter(E => E.Code === '22111')
  }

  // // ==================[  Fn: GET ALL by VoucherCategory  ]=====================  
  // const DataFetchTranD = async () => {
  //   // alert('please let me search for VCat')
  //   const res = await fetch('/api/TranD/Cat', {
  //     method: 'POST', headers: { 'Content-Type': "application/json" },
  //     body: JSON.stringify(
  //       {
  //         "VCat": VCat
  //       }
  //     )
  //   })
  //   // body:JSON.stringify({UID,  Title,  Desc,  Work,  Email,  PW})});

  //   const data = await res.json();

  //   // alert(data); console.log('Received Records Returned:', data);
  //   // AlertRec(data, 'Rcvd Detail TranD')
  //   setTranD4RecAll(data)
  //   // let str = ''; Object.entries(data).forEach((k, i) => { str += i + ' ' + k + ' : ' + data[k] + '\n' })
  // }

  // // ==================[  Fn: GET ALL by VoucherCategory  ]=====================  
  // const DataFetchVidDetail = async (VID) => {
  //   alert('please get me detail for VID ' + VID)

  //   const res = await fetch(`/api/TranD/${VID}`);
  //   const data = await res.json();

  //   // // fetch(`/api/TranD/${VID}`).then ((d)=>d.json()).then(dt=>data=dt);
  //   // const data =async fetch(`/api/TranD/${VID}`)
  //   //   .then(async response => { 
  //   //     const d = await response.json(); 
  //   //     console.log('XXXXXXX Received in then of Fn; Records Returned:', d) 

  //   //     alert('in side fn. '+d)
  //   //     return ( d)
  //   //   })

  //   // AlertRec(data, 'Rcvd Detail TranD')
  //   return (data)
  //   // let str = ''; Object.entries(data).forEach((k, i) => { str += i + ' ' + k + ' : ' + data[k] + '\n' })
  // }
  // ==============================================================


  // ==============================================================

  // -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-
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
    // setNeed2Refresh(p => p = !Need2Refresh)
    setNeed2Refresh(p => !p)

    switch (Mode) {
      case 'Add': HandleBtnAddnew(BtnStatus); break;
      case 'Edit': HandleBtnEdit(BtnStatus); break;

      default: break;
    }
  }

  // -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-
  //VoucherSelect is clicked
  const HandleListItemClicked = (E) => {
    // console.log('HandleListItemClicked Original props: ', E.VNo, E.VDte, E.VCat, E)
    //  AlertRec(E, 'Clicked - Selected Rec')

    //  //var t={}; Object.keys(E).forEach(k => t[k]= typeof (E[k]) === 'string' ? E[k].trim() : E[k])
    //Object.keys(E).forEach(k => E[k] = typeof (E[k]) === 'string' ? E[k].trim() : E[k])

    setRec({
      //...Rec,
      VID: E.VID,
      // VNo: (E.TranM.VNo.trim()) == '' ? '--' : E.TranM.VNo.trim(),
      // VNo: E.TranM.VNo ? E.TranM.VNo.trim() : '',
      VNo: E.TranM.VNo ? E.TranM.VNo : '',
      MRNo: E.TranM.MRNo ? E.TranM.MRNo : '',

      // VDte: Moment(new Date(E.TranM.VDte)).format('DD MMM YY ddd'),
      VDte: E.TranM.VDte,  //Moment(new Date(E.TranM.VDte)).format('DD MMM YY ddd'),
      VCat: E.TranM.VCat,     //Transaction specific Voucher
      VType: E.TranM.VType,     //Transaction specific Voucher
      VTypeTitle: E.TranM.VTypeTitle,     //Transaction specific Voucher

      Desc: E.TranM.Desc ? E.TranM.Desc.trim() : '',
      Rem: E.TranM.Rem ? E.TranM.Rem.trim() : '',

      VQtyTxt: E.TranM.VQtyTxt ? E.TranM.VQtyTxt.trim() : '',
      VAmtDoc: E.TranM.VAmtDoc,
      VAmtRef: E.TranM.VAmtRef,
      VAmt: E.TranM.VAmt,
      VAmtPaid: E.TranM.VAmtPaid,
      VAmtBal: E.TranM.VAmt - E.TranM.VAmtPaid,

      PatId: E.TranM.PatId,       //Trader -- one of CustomerOrSupplier/ConsumerOrVender/
      DocDutyId: E.TranM.DocDutyId,       //Trader -- one of CustomerOrSupplier/ConsumerOrVender/
      DocRefId: E.TranM.DocRefId,       //Trader -- one of CustomerOrSupplier/ConsumerOrVender/
      TId: E.TranM.TId,      //Trader.find(s => s.Id === E.TranM.TId),

      RefPatient: E.TranM.RefPatient,
      RefDocDuty: E.TranM.RefDocDuty,
      RefDocRef: E.TranM.RefDocRef,
      RefTrader: E.TranM.RefTrader,

      // RefVID: '',
      // RefVDte: '',
      // RefVNo: '',
      // RefVCat: '',

      // RecType: '',
      // RecStatus: '',        //RecStatus.substr(0, 10),
      // Priority: '',        //RecStatus.substr(0, 10),

      // AccD: E.TranRs.filter(E => E.AccType === '0'),
      // AccC: E.TranRs.filter(E => E.AccType === '1'),

      VItems: E.TranDs

      // "EntryBy": "xUSERx",
      // "EntryDte": new Date()

    })
  }


  const HandleListItemClickedB4TranRecs = (E) => {
    // console.log('HandleListItemClicked Original props: ', E.VNo, E.VDte, E.VCat, E)
    // AlertRec(E, 'SelectedRec')

    if (E.VID) {
      // Now Add-- Items Detail and Titles etc 
      // console.log('***********Rec E.VItems Detail: ', E.VItems)
      // if (!E.VItems) {
      // alert('byDefault Items data was Empty')
      // E.VItems = TranD4RecAll
      //   .filter((D) => D.Vid === E._id)
      //   .map((ITM) => {
      //     let Product = Products.find((P) => P.Code === ITM.Code)
      //     ITM.Title = Product.Title
      //     ITM.UTitle = Product.UTitle
      //     ITM.PicURL = Product.PicURL
      //     ITM.QtyDef = Product.QtyDef
      //     ITM.QtyInc = Product.QtyInc
      //     ITM.QtyStep = Product.QtyStep
      //     return (ITM)
      //   })


      //Table: TranD - { Id/Auto, VID, VNo, VDte, VCat, TId, PId, Unit, Qty, Price }
      //Table: Item - { Id/Auto, Code, Title, TitleU, Desc, Rem, CatCode, TId, PicURL, Unit, QtyDef, QtyInc, QtyStep, Price, PreBal, CrntBal, QtyMin, QtyMax, RecType, RecStatus, Priority, EntryBy, EntryDte

      fetch(process.env.REACT_APP_API_URL + `TranD/GetByVID/${E.VID}`, { method: 'GET' })
        .then(res => res.json())
        .then(data => {
          // console.log('Rcvd Data: ', data)
          E.VItems = data.map((ITM) => {
            // AlertRec(ITM, 'Detail Single Element')
            const itm = Products.find(P => P.Id === ITM.PId)
            ITM.RefItem = itm
            // ITM.CatCode= itm.CatCode
            // ITM.Title = Product.Title
            // ITM.TitleU = Product.TitleU
            // ITM.PicURL = Product.PicURL

            // ITM.QtyDef = Product.QtyDef
            // ITM.QtyInc = Product.QtyInc
            // ITM.QtyStep = Product.QtyStep

            // AlertRec(ITM, 'Detail Single Element')
            return (ITM)
          })

          setRec(E)
          // alert('Seting Rec here')
        })
    }
  }

  // ==============================================================
  const Handle2SendData4Addition = (E) => {
    if (E.VID) {
      // alert('Items data was Empty')
      // setRec({...E, PicURL: E.Pic, Pic:''})
      setRec(E)
      HandleBtnAddnew(true)

    }
  }

  const HandleDatabase = (opt) => {
    switch (opt) {
      case 'Empty':
        RecAll.map(async itm => {
          // //=====[   READY to Delete data from Database   ]========  
          // const res = await fetch(`/api/Item/${itm.VNo}`, { method: 'DELETE' })
        })

        alert('All Data has been deleted')
        setNeed2Refresh(p => !p)
        break;

      case 'Edit':
        alert('Editing data')
        // setSetupDBArray(true)
        break;

      case 'Add':
        alert('adding data')
        // setSetupDBArray(true)
        break;

      default:
        break;
    }
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

  // -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-
  //DetailVoucherDisplay Window Close
  const HandleCloseWindow = (msg) => {
    if (msg) setRec({ ...Rec, VID: '' })
  }
  // -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-


  // [Printing ]\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

  const PRINT_REF = createRef();
  const PRINT_INVOICE = createRef();
  // const chartRef = createRef();


  // TRIGGER Electron --- Defint & Declare print request to the Electron Main process
  const TriggerElectron_handlePrint = function (target) {
    return new Promise(() => {
      console.log("forwarding print request to the Electron main process...");

      const data = target.contentWindow.document.documentElement.outerHTML;
      //console.log(data);

      const blob = new Blob([data], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      window.electronAPI.printComponent(url, (response) => {
        console.log("Main: ", response);
      });
      //console.log('Main: ', data);
    });
  };

  // TRIGGER Electron --- Defint & Declare print preview request to the Electron Main process
  const TriggerElectron_handlePreview = function (target) {
    return new Promise(() => {
      console.log("forwarding print preview  Electron request...");

      const data = target.contentWindow.document.documentElement.outerHTML;
      console.log('Data for printing', data);

      const blob = new Blob([data], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      window.electronAPI.previewComponent(url, (response) => {
        console.log("Main: ", response);
      });
      //console.log('Main: ', data);
    });
  };


  // Handle Printing 
  const HandleElectronPrint = useReactToPrint({
    content: () => PRINT_REF.current,
    documentTitle: "List component",
    print: TriggerElectron_handlePrint,
  });

  // TRIGGER Electron Handle Preview Printing 
  const HandleElectronPreviewPrint = useReactToPrint({
    content: () => PRINT_REF.current,
    documentTitle: "List component",
    print: TriggerElectron_handlePreview,
  });

  // const handleChartPrint = useReactToPrint({
  //   content: () => chartRef.current,
  //   documentTitle: "Chart component",
  //   print: handlePrint,
  // });

  // const handleChartPreview = useReactToPrint({
  //   content: () => chartRef.current,
  //   documentTitle: "Chart component",
  //   print: handlePreview,
  // });

  // TRIGGER normal Printing 
  const HandlePrint = () => {
    // alert('Printing must be started')
    HandlePrintNormal()
    // HandleElectronPrint()
    // HandleElectronPreviewPrint()
  }

  const HandlePrintNormal = useReactToPrint({
    // content: () => PRINT_REF.current,
    content: () => PRINT_INVOICE.current,

    //documentTitle: "List component",
    // print: handlePreview,
  });


  // [END Printing ]\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/














  // ==============================================================

  // //SAVE changes is clicked
  // const HandleBtnSave = () => { setBtnEditClicked(false); setBtnAddnewClicked(false); setInputReadOnly(true); setRec(RecDefault) }
  // // ==============================================================



  // *******************************************************************************************************************
  //                                  M A N A G E/ Return
  // *******************************************************************************************************************
  // let SelectedItems = []
  return (<>
    {/* {console.log('Inv. CtxMainState._DocsRef: ', CtxMainState._DocsRef)} */}
    {/* {console.log('Inv. CtxMainState._Patients: ', CtxMainState._Patients)} */}
    {/* Total Doctors are: {CtxMainState._DocsRef.length} <br /> */}
    {/* Total Patients are: {CtxMainState._Patients.length} <br /> */}
    {/* Current Docs   at: {CtxMainState._D} */}
    {/* {CtxMainState._Patients && CtxMainState._Patients.map(E => <div>{E.Title}</div>)} */}

    {/* {AlertRec(Rec, 'This [Rec] is Ready to Send for MAIN-PAGE Rec')} */}


    <div className="card w-[calc(100%-4px)] mt-[2px] md:w-[calc(100%-16px)] md:mt-[8px] mx-auto">

      {/* ====================================================== */}
      {/* MAIN HEADER - PRG  */}  {/* background-color:F3E5F5 */}
      {/* ====================================================== */}
      <div className="card-header px-2 flex flex-wrap md:flex-nowrap justify-between items-center BG-PortalHeaderGradient">

        {/* ............. Display ICON & TITLE  ............. */}
        <div className="flex  gap-2  items-center w-full">
          {/* <span className="p-0 mb-2 text-xl text-danger" ><TbManualGearbox /></span> */}
          <img className="p-0 m-0" style={{ width: 28, height: 28, borderRadius: '50%' }} src={imgPortal} />

          <span className=' text-2xl mb-1 text-white'>Portal: </span>
          <span className=' text-2xl mb-1 text-slate-200'>Sales Invoices</span>
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
            {(!(BtnEditClicked || BtnAddnewClicked) && Rec.VID != '') &&
              // <button type="button" class="px-3 py-0 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              <button type="button" class="px-2 md:px-4 py-1 md:py-1 mb-1 md:mx-2 text-white text-xs text-center font-medium rounded-lg inline-flex items-center bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 "
                onClick={() => { HandleBtnEdit(true) }}>
                Update &nbsp;
                <span className='hidden md:flex'> &nbsp; <FaEdit className='' style={{ width: '20px', height: '20px' }} /></span>
              </button>
            }
            {!(BtnEditClicked || BtnAddnewClicked) &&
              // <button type="button" className=" mx-2"
              // <button type="button" class="px-3 py-0 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              <button type="button" class="px-2 md:px-4 py-1 md:py-1  mx-2 mb-1 text-white text-xs text-center font-medium rounded-lg inline-flex items-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow-purple-500/50 "
                onClick={() => { HandleBtnAddnew(true) }}>
                Add New &nbsp;
                {/* <FaUserPlus className='mb-1' style={{ width: '20px', height: '20px' }} /> */}
                <span className='hidden md:flex'> &nbsp; <RiFunctionAddLine className='' style={{ width: '20px', height: '20px' }} /></span>
              </button>
            }
            {/* {!(BtnEditClicked || BtnAddnewClicked) && (Rec.VID != '') &&
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
      <div className="card-body p-1 flex flex-wrap md:flex-nowrap BG-PortalBody gap-x-1" >

        {/* Transaction List */}
        {/* LEFT-PART for Vouchers List */}
        {/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. */}

        {/* Not Add/Edit Key pressed. only display Records */}
        {(!(BtnAddnewClicked || BtnEditClicked)) &&
          <>
            <div className={
              (Rec.VID != '')
                ? 'w-full md:w-[45%] p-0'
                : 'w-full md:w-[70%] p-0 md:p-4 mx-auto'
            }>

              {Loading ? <div className='text-center w-full'><BoxLoading className='w-full' txt={'Processing ...'} /></div>
                : DATA_RECS.length <= 0 ? <BoxMessage variant='danger' >Seems, There is No Data...</BoxMessage>
                  : <>
                    {/* <RecsComboViews RecAll={DATA_RECS} HandleListItemClicked={HandleListItemClicked} SizeFlagFS={(BtnAddnewClicked || BtnEditClicked || Rec.VID) ? 'S' : 'F'} /> */}
                    {(!(BtnEditClicked || BtnAddnewClicked)) ? "True" : "false"} {Rec.VID}
                    <RecsComboViewsSearch
                      RecAll={DATA_RECS}
                      HandleListItemClicked={HandleListItemClicked}
                      SizeFlagFS={(BtnAddnewClicked || BtnEditClicked || Rec.VID) ? 'S' : 'F'}
                      FetchData={DataFetchAllTrans}
                      SearchInput={SearchInput}
                      setSearchInput={setSearchInput}
                    />
                  </>
              }


              {/* RIGHT-PART for Selected Voucher Detail */}
              {/* Dont Show if No Action is taken. Only if any buttn ADD-NEW/Edit/Delete is Clicked */}
              {/* {(BtnAddnewClicked || (Rec.VID != '')) && */}

            </div>

            {(Rec.VID !== undefined) && (Rec.VID !== '') &&
              <div className="card p-2 items-start w-full  relative" >

                {/* {(SelectedItems = TranD4RecAll.filter((E) => E.Vid === Rec._id)).length > 0 */}

                {(!BtnAddnewClicked) && (!Rec.VID) &&
                  <button className="w-full " style={{ color: 'black', background: '#f0c040', border: '1px solid #404040' }}>
                    No Item Selected for Detail
                  </button>
                }

                {!(BtnEditClicked || BtnAddnewClicked) && (Rec.VID != '') &&
                  <>
                    {/* {AlertRec(Rec, 'This Rec is Ready to Send for DISPLAY Rec')} */}
                    {/* <RecDetailDisp  Rec={Rec} HandleCloseWindow={HandleCloseWindow} HandlePrint={HandlePrint} /> */}

                    <PrintableInvoice ref={PRINT_INVOICE} Rec={Rec} HandleCloseWindow={HandleCloseWindow} HandlePrint={HandlePrint} />
                  </>
                }

                {/* Only if ADD-NEW/Update is Clicked */}
                {/* {((BtnAddnewClicked || BtnEditClicked)) &&
                < EntryFormItems
                  // VoucherMode={BtnAddnewClicked ? 'Add' : BtnEditClicked ? 'Edit' :  BtnDeleteClicked ? 'Del':''}
                  VoucherMode={BtnAddnewClicked ? 'Add' : BtnEditClicked ? 'Edit' : ''}

                  CrntRec={BtnAddnewClicked ? RecDefault : Rec}
                  // CrntRec={BtnAddnewClicked ? SetupDBArray ? Rec : RecDefault : Rec}
                  Trader={Trader}
                  Categories={Categories}

                  // HandleInputs={HandleInputs}
                  // HandleInputsMode={HandleInputsMode}
                  HandleBtnVoucherMode={HandleBtnVoucherMode}
                // setNeed2Refresh={setNeed2Refresh}
                // Need2Refresh={Need2Refresh}
                />
              } */}

              </div>
            }
          </>
        }

        {/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.- */}
        {/* Only VOUCHER EDIT/ADDnew Record  
        {/* Only if ADD-NEW/Update is Clicked */}
        {/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. */}
        {((BtnAddnewClicked || BtnEditClicked)) &&
          <>
            {/* {console.log('Calling Entry Voucher AccRec:', AccRec)}*/}
            {/* {AlertRec(Rec, 'This Rec is Ready to Send for UPDATE Rec')}  */}
            {/* AlertRec( AccRec, 'AccRec- Accounts Array- Before Sending to Bill-Formation' ) */}

            {/* Voucher Input Both Header and Detail Part*/}
            {/* AlertRec([{...RecDefault, DocDutyId: LastEntryDutyDoc.Id}], '{...RecDefault, DocDutyId: LastEntryDutyDoc.Id} '+ LastEntryDutyDoc.Title) */}

            {/* < TabbedBillItems */}
            <ListedBillItems

              // CrntRec={BtnAddnewClicked ? RecDefault : Rec}
              CrntRec={BtnAddnewClicked ? { ...RecDefault, DocDutyId: LastEntryDutyDoc.Id, RefDocDuty: LastEntryDutyDoc.RefDocDuty } : Rec}
              AccRec={AccRec}

              Traders={Traders}
              Categories={Categories}

              Products={ProductItems}

              // setProducts={setProducts}

              //VoucherMode={BtnAddnewClicked ? 'Add' : BtnEditClicked ? 'Edit' :  BtnDeleteClicked ? 'Del':''}
              VoucherMode={BtnAddnewClicked ? 'Add' : BtnEditClicked ? 'Edit' : ''}
              HandleBtnVoucherMode={HandleBtnVoucherMode}

            // setNeed2Refresh={setNeed2Refresh}
            // Need2Refresh={Need2Refresh}
            />

          </>
        }







        {/* =================================================================================== */}
        {/* =====[    Main CARD BODY ends here            ]===========================================  */}
        {/* =================================================================================== */}
      </div > {/* /.Main-card-body */}


    </div >{/* /.Main-card */}

  </>)
}
