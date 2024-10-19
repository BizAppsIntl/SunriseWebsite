import { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'

import axios from 'axios'

import Moment from 'moment'
// Two files needed for datepicker
import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'

import Select from 'react-select'

import ImgMale from '../../../../ImagesAdminPanel/default/Male.png'
import ImgFemale from '../../../../ImagesAdminPanel/default/Female.png'
import ImgDefault from '../AssetsLocal/Images/Suppliers.png'

//Two file needed for toasify
import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';


// [.....................START: Calls Prgs: ..................................................]
import SuppliersCardsGroup from './SuppliersCardsGroup'
// [.....................END: Calls Prgs: ..................................................]

import { AlertRec, SetPadLeftZero, DispAPIInAlert, DispArrayInAlert, DispRecInAlert, AlertConfirm, GetNewID } from '../../../../../StdLib'

import { BsSortNumericUpAlt } from 'react-icons/bs'
import { BsSortNumericDownAlt } from 'react-icons/bs'
import { FaSave, FaUserPlus, FaUserEdit, FaUsers, FaUserCog, FaUserSlash, FaFolder } from 'react-icons/fa'
import { FcCancel } from 'react-icons/fc'
import { FaPlus } from 'react-icons/fa'
import { FaMinus } from 'react-icons/fa'
import { TbWiperWash } from 'react-icons/tb'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { FaEnvelopeOpenText } from 'react-icons/fa'
import { ImListNumbered } from 'react-icons/im'

import { GrPrint } from 'react-icons/gr'
import { FaRegCalendarAlt } from 'react-icons/fa'

//Description Detail -Text  Records
import { TbTextWrapDisabled } from 'react-icons/tb'

//ID Card for Trader
import { FaRegAddressCard } from 'react-icons/fa'

//Titles
import { TbListDetails } from 'react-icons/tb'

//Text-Desc
import { GrTextAlignFull } from 'react-icons/gr'

//job category
import { TbIcons } from 'react-icons/tb'
// import { MdOutlineCategory } from 'react-icons/md'

//Currency Rs Dollar
import { TbCurrencyReal } from 'react-icons/tb'
import { IoCashOutline } from 'react-icons/io5'

//Cart Empty, Full
import { TfiShoppingCart, TfiShoppingCartFull } from 'react-icons/tfi'

//Price Tag
import { GiPriceTag } from 'react-icons/gi'

//Status offline
import { HiStatusOffline } from 'react-icons/hi'

//Priority
import { MdLowPriority } from 'react-icons/md'

//Weight
import { FiDelete } from 'react-icons/fi'

//Weight
import { GiWeight } from 'react-icons/gi'

//qty inc, step, default
import { HiOutlineArrowUpOnSquareStack, HiOutlineArrowUpOnSquare, HiOutlineArrowDownTray } from 'react-icons/hi2'
import NumberFormat from 'react-number-format'
import { useCtxMainContextHook } from '../../../../../CtxMain'
import RecsListView from './RecsListView'
import SubRecsComboViews from './SubRecsComboViews'

//Table: TranM - { VID, VNo, VDte, VCat, TId, Desc, Rem, VQtyTxt, VAmt, RefVID, RefVNo, RefVDte, RefVCat, RefVAmt, RecType, RecStatus, Priority }
//Table: TranR - { VID, VNo, VDte, VCat, AccType, AccCode, Title, Desc, Rem, VAmt, }
//Table: TranD - { Id/Auto, VID, VNo, VDte, VCat, TId, PId, Unit, Qty, Price }

//Table: Item - { Id/Auto, Code, Title, TitleU, Desc, Rem, CatCode, TId, PicURL, Unit, QtyDef, QtyInc, QtyStep, Price, PreBal, CrntBal, QtyMin, QtyMax, RecType, RecStatus, Priority, EntryBy, EntryDte
//Table: Category - { Code, Title, Desc, Rem, RecType, RecStatus, Priority, EntryBy, EntryDte}

//Table: AccRec - {Code, Title, Desc, Rem, PreBal, CrntBal, RecType, RecStatus, Priority, EntryBy, EntryDte}
//Table: Supplier - {Id/Auto, Code, RecType, RecStatus, Priority, Title, TitleU, Desc, Rem, Address, Phone, Contact1, ContactPh1, Contact2, ContactPh2, PicURL, PreBal, CrntBal, EntryBy, EntryDte}


const _VCat = "3152"
const _PrgID = "3152"
const _PrgTitle = "Chart of Account Entries"


const RecDefault = {
  VID: '',
  VNo: '',
  VDte: new Date(),   //Moment(new Date()).format('DD MMM YY ddd'),
  VCat: _VCat,     //Capital Transaction Voucher

  TId: '',       //Trader -- one of CustomerOrSupplier/ConsumerOrVender/
  DocRefId: '',       //Trader -- one of CustomerOrSupplier/ConsumerOrVender/

  Desc: '',
  Rem: '',

  RefVID: '',
  RefVNo: '',
  RefVDte: '',
  RefVCat: '',

  VQtyTxt: '',
  VAmt: '',
  RefDocDuty: '',
  RefDocRef: '',
RefTrader:'',
  // VItems: [],

  AccD: [],
  AccC: []
}

const ToastWaitTime = 5000
// ==================[  useContext and useReducer Hooks  ]=====================


// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
//                                  P R G  ---   START
// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
export default function EntryFormPayment(props) {
  //destructuring    props
  // const { VoucherMode, CrntRec, Categories, HandleInputs, HandleInputsMode, HandleBtnVoucherMode} = props
  const { CrntRec, AccRecs, Traders, VoucherMode, HandleBtnVoucherMode } = props

  const { CtxMainState, CtxMainDispatch } = useCtxMainContextHook()
  const { _Procedures: Products, _Patients, _DocsRef, _DocsDuty, _Cats } = CtxMainState

  const [OrderSheet, setOrderSheet] = useState(CrntRec ? CrntRec : '')
  const [Need2Refresh, setNeed2Refresh] = useState(false);

  // const [selectedImage, setSelectedImage] = useState(null);
  // const [ImgURL, setImgURL] = useState('')
  const DefaultImgURL = require('../AssetsLocal/Images/Default.jpg')

  // CrntRec received is
  // VID,  VNo,  VDte,  VCat,  Desc,  TId, VQtyTxt,  VAmt
  // AccC  :   [{…}]   RefAcc includes
  // AccD  :   [{…}]   RefAcc includes
  // RefTrader:  {Id: 1, Code: 'MKT       ', Title: 'Local Market                                      ', TitleU: 'لوکل مارکیٹ                                       ', Desc: 'Local Market in Area                              ', …}
  const { VID, VNo, VDte, VCat, TId, DocRefId, Desc, Rem, VAmt, VQtyTxt, AccD, AccC, RefTrader } = OrderSheet

  let InputReadOnly = true
  // useEffect(() => {
  //   AlertRec(CrntRec, 'Welcome -- Rcvd CrntRec at open')
  // }, []);

  useEffect(() => {
    // if (!VoucherMode ) { alert('Empty VoucherMode- trying to return'); return }

    // if (CrntRec) {    AlertRec (CrntRec, 'crntRec');setOrderSheet(CrntRec)}
    setOrderSheet(CrntRec)
    // document.getElementById('SelectPhoto').focus();
  }, [Need2Refresh]);


  // START   ==================[  Handle Printing  ]=====================
  const compRefX = useRef();
  const compRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => compRefX.current,
    // content: () => 'Bismillah',
    onAfterPrint: () => alert('Print succeeded')
  })

  const HandlePrinting = useReactToPrint({
    // content: () => compRef.current,
    content: () => compRefX.current,
    onAfterPrint: () => alert('Print succeeded')
  })
  // END   ==================[  Handle Printing  ]=====================



  // ==================[  Fn: Handle Inputs  ]=====================

  const handleFocus = (event) => event.target.select();
  // const Input = (props) => <input type="text" value="Some something" onFocus={handleFocus} />

  const HandleSubListItemClicked = (rec) => {
    // AlertRec(splr, 'Button Clicked')
    setOrderSheet({ ...OrderSheet, TId: rec.Id, RefTrader: rec });
  }

  const HandleDefaultTrader = () => {
    const id = _DocsDuty.Data.at(-1).Id
    // AlertRec(Suppliers, 'Setting Default Suppliers :' + id)
    setOrderSheet({ ...OrderSheet, TId: id });
    return id
  }


  // const HandleInputs = (e) => {
  //   // let key = '', value = '';
  //   // console.log('Input Done:', e.target.name, e.target.value);
  //   // alert('Key: '+e.target.name + '    value: ' + e.target.value)
  //   // const key = e.target.name; const value = e.target.value;

  //   console.log ('\n\n\n\ne.target.name: ', e.target.name, 'value: ', e.target.value)
  //   if (e.target.name === 'TId') {
  //     const tRec = _DocsDuty.Data.find(P => P.Id === Number(e.target.value))
  //     // [{ Id: e.target.value, Title: e.target.options[e.target.selectedIndex].text }]
  //     setOrderSheet({ ...OrderSheet, [e.target.name]: Number(e.target.value), RefTrader: tRec });
  //   }
  //   else
  //     setOrderSheet({ ...OrderSheet, [e.target.name]: e.target.value });
  // }

  const HandleInputs = (e, FieldName = '') => {
    //console.log ('\n\n\n\ne.target.name: ', e);    AlertRec(e, 'OnChange of InputBox :'+ FieldName  )

    if (FieldName) {
      // Select onChange result ---->    e = {key: 0, value: 102, label: 'Prof. Dr M Afzal Bodla'}  

      switch (FieldName) {
        case 'DocRefId': setOrderSheet(() => ({
          ...OrderSheet,
          DocRefId: Number(e.value),
          RefDocRef: _DocsRef.Data.find((E) => E.Id === e.value)
        })); break;
        case 'DocDutyId': setOrderSheet(() => ({
          ...OrderSheet,
          DocDutyId: Number(e.value),
          RefDocDuty: _DocsDuty.Data.find((E) => E.Id === e.value)
        })); break;
        case 'TId': setOrderSheet(() => ({
          ...OrderSheet,
          TId: Number(e.value),
          RefTrader: Traders.find((E) => E.Id === e.value)
        })); break;

        // case 'Desc': setOrderSheet(() => ({ ...OrderSheet, Desc: _value })); break;
        default: setOrderSheet(() => ({ ...OrderSheet, [e.target.label]: e.target.value })); break;
        // AlertRec(e,'e: from Select Type of Voucher')
      }
    }
    else {
      const _key = e.target.name;
      const _value = e.target.value;

      // setRec4M({ ...Rec4M, [e.target.name]: e.target.value });
      switch (_key) {
        // (e.target.value) ? { ...OrderSheet, VDte: e.target.value } : { ...OrderSheet, VDte: '' }
        case 'VDte': setOrderSheet(() => ({ ...OrderSheet, VDte: _value })); break;
        case 'VNo': setOrderSheet(() => ({ ...OrderSheet, VNo: Number(_value) })); break;
        // case 'PatId': setOrderSheet(() => ({ ...OrderSheet, PatId: Number(_value) })); break;
        // case 'DocRefId': setOrderSheet(() => ({ ...OrderSheet, DocRefId: Number(_value) })); break;
        // case 'DocDutyId': setOrderSheet(() => ({ ...OrderSheet, DocDutyId: Number(_value) })); break;
        case 'Desc': setOrderSheet(() => ({ ...OrderSheet, Desc: _value })); break;
        case 'Rem': setOrderSheet(() => ({ ...OrderSheet, Rem: _value })); break;
        case 'VType': setOrderSheet(() => ({ ...OrderSheet, VType: _value })); break;

        default:
          setOrderSheet(() => ({ ...OrderSheet, [e.target.label]: e.target.value }))
          break;
      }
    }
  }



  const HandleInputsNumberFormat = (obj) => {
    //AlertRec(obj, obj)

    //Voucher Amount VAmt
    setOrderSheet({ ...OrderSheet, [obj.name]: obj.value });

  }


  // ==============================================================
  //CLEAR Rec is clicked
  //   const HandleBtnClear = () => { alert('Clear pressed'); setRec(RecDefault) }
  const HandleBtnReset = () => {
    // AlertRec(OrderSheet, 'OrderSheet');
    setNeed2Refresh(p => !p)
  }

  // ==============================================================
  //CANCEL changes is clicked
  //   const HandleBtnCancel = () => { alert('Cancelled pressed'); setBtnEditClicked(false); setBtnAddnewClicked(false); setInputReadOnly(true); setRec(RecDefault) }
  const HandleBtnCancel = (Flag2Refresh) => {

    HandleBtnVoucherMode(VoucherMode, false, Flag2Refresh);
  }

  // ==============================================================
  //SAVE changes is clicked
  const HandleBtnSave = (e) => {
    // AlertRec(OrderSheet, 'Saving Data is Proceeded.');
    switch (VoucherMode) {
      case 'Add': CallDotAPI2SaveAddNew(); break;
      case 'Edit': CallDotAPI2SaveUpdate(); break;
      default: break;
    }
  }

  // ==============================================================
  //DELETE is clicked
  const HandleBtnDelete = (btnStatus) => {
    // AlertRec(Rec, 'DELETE Record: Rec')

    CallDotAPI2Delete()
  }


  // =======================================================================
  // ==================[  Fns: DATABASE/ API Handling ]=====================
  // =======================================================================

  // --------------------------------------------------------------------------------------------------------------------
  // ------------- Update RECORD ----------------
  // --------------------------------------------------------------------------------------------------------------------
  // const CallAPI2SaveUpdate = async () => {
  //   // alert('Now Updating Data in Database ')

  //   // AlertRec(OrderSheet, 'RAW-Data Ready to ADD in Database')
  //   const { _id: _VID, VNo, VDte, VCat, Desc, DocDutyId, VAmt, VRef, VRem, VQty, AccD, AccC } = OrderSheet

  //   if (!Suppliers.find(s => s.Id === DocDutyId)) {
  //     alert('Supplier is invalid. \nPlz check voucher entry.'); return
  //   }
  //   if (AccC.length <= 0 || AccD.length <= 0) {
  //     alert('AccD/C is invalid. \nPlz check voucher entry.'); return
  //   }
  //   if (VAmt <= 0) {
  //     alert('Voucher Amount is ZERO. \nEmpty Voucher is Not Acceptable.'); return
  //   }

  //   const Data2SendInDatabase = {
  //     TranM: {
  //       // "VDte": (new Date(VDte)).toDateString(),
  //       // "VNo": VNo,
  //       // "VCat": VCat,
  //       "Desc": Desc,
  //       "DocDutyId": DocDutyId,
  //       "VRem": VRem,
  //       "VQty": VQty,
  //       "VAmt": VAmt,

  //       "RefVDte": '',
  //       "RefVNo": '',
  //       "RefVCat": '',
  //       "RefVid": '',

  //       "EntryBy": "xUSERx",
  //       "EntryDte": new Date()
  //     },

  //     //   // Two Records in TranR
  //     //   TranR: [
  //     //     {
  //     //       // Vid: 'id',
  //     //       // VDte: (new Date(VDte)).toDateString(),
  //     //       // VNo: VNo,
  //     //       // VCat: VCat,
  //     //       AccType: '0',
  //     //       AccCode: AccD.Code,
  //     //       AccTitle: AccD.Title,
  //     //       VAmt: VAmt
  //     //     }
  //     //     ,
  //     //     {
  //     //       // Vid: 'id',
  //     //       // VDte: (new Date(VDte)).toDateString(),
  //     //       // VNo: VNo,
  //     //       // VCat: VCat,
  //     //       AccType: '1',
  //     //       AccCode: AccC.Code,
  //     //       AccTitle: AccC.Title,
  //     //       VAmt: VAmt
  //     //     }],

  //     // Min-Two Records in TranR
  //     TranR: [
  //       ...AccD.map((E, I) => ({ Code: E.Code, AccType: '0', Title: E.Title, VAmt: VAmt }))
  //       ,
  //       ...AccC.map((E, I) => ({ Code: E.Code, AccType: '1', Title: E.Title, VAmt: VAmt }))
  //     ],
  //   }
  //   // console.log('Data2SendInDatabase:', Data2SendInDatabase)
  //   // AlertRec(Data2SendInDatabase, 'Data2SendInDatabase')
  //   // return

  //   //===================================================  
  //   //=====[   READY to Update/send data in Database   ]========  
  //   //===================================================  
  //   //=====[   PART-1/3  TranM   ]========  
  //   //   const res = await fetch('/api/staff', {
  //   const res = await fetch(`/api/TranPayment/${_VID}`, {
  //     method: 'PUT', headers: { 'Content-Type': "application/json" },
  //     body: JSON.stringify(Data2SendInDatabase)
  //   })

  //   const data = await res.json();
  //   // console.log('Saved Record Returned:', data);

  //   // if (res.status === 422 || !data) { window.alert("Transaction Invalid."); }
  //   // else {
  //   //     window.alert("Transaction Successful.");
  //   //     //History.push("/Home");
  //   // }

  //   alert('This Record has been SAVED in Database')
  //   // setNeed2Refresh(!Need2Refresh)
  //   HandleBtnCancel(true)
  // }


  // --------------------------------------------------------------------------------------------------------------------
  // ------------- AddNew/Create RECORD ----------------
  // --------------------------------------------------------------------------------------------------------------------
  const CallDotAPI2SaveAddNew = async () => {
    // ------------- CREATE ADDNEW RECORD ----------------

    // AlertRec(OrderSheet, 'RAW-Data Ready to ADD in Database')
    const { VID, VNo, VDte, VCat, TId, DocRefId, Desc, Rem, VAmt, VQtyTxt, AccD, AccC } = OrderSheet

    // if (VNo.trim() == '') {
    //   toast.error('Voucher Number (VNo) is EMPTY. \nThis Number is only for Reference.\nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
    //   return
    // }

    if (!TId || !(Traders.find(s => s.Id === TId))) {
      //alert('Supplier is invalid. \nPlz check voucher entry. ' + [PatId]); return
      toast.error('Supplier is invalid. \nPlz check voucher entry. ' + '[ ' + TId + ' ]', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }

    //  { AlertRec(AccD, 'AccD: AccD.length:' + ' [' + AccD.length + ']') }
    if (AccD.length <= 0 || AccC.length <= 0) {
      AlertRec(AccD, `AccD/C is invalid. \nPlz CHK Database.\n  AccD: ${AccD.length} \n AccC: ${AccC.length} \n `)
      toast.error('AccD/C is invalid. \nPlz check voucher entry.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }

    if (VAmt <= 0) {
      toast.error('Voucher Amount is ZERO. \nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }

    const _VID = GetNewID()  //20chrs                //DateTimeStamp()

    const Data2SendInDatabase =
    {
      "VID": _VID,

      // One Record in TranM
      "TranM": {
        "VID": _VID,
        "VDte": (new Date(VDte)).toDateString(),
        "VNo": VNo,
        "VCat": VCat.substr(0, 4),

        "TId": TId,
        "Desc": Desc.substr(0, 50),
        "Rem": Rem.substr(0, 50),

        "VQtyTxt": '',
        "VAmt": VAmt,

        "RefVID": '',
        "RefVDte": '',
        "RefVNo": '',
        "RefVCat": '',

        "RecType": '',
        "RecStatus": '',        //RecStatus.substr(0, 10),
        "Priority": '',        //RecStatus.substr(0, 10),

        "EntryBy": "xUSERx",
        "EntryDte": new Date()
      },

      // Two Records in TranR
      "TranRs": [
        ...AccD.map((E, I) => (
          {
            //ID = Auto,
            "VID": _VID,
            "VDte": (new Date(VDte)).toDateString(),
            "VNo": VNo,
            "VCat": VCat,

            "AccType": '0',
            "AccCode": E.AccCode,

            "Title": E.Title.substr(0, 50),
            "Desc": Desc.substr(0, 50),
            "Rem": Rem.substr(0, 50),

            "VAmt": VAmt
          }))
        ,
        ...AccC.map((E, I) => (
          {
            //ID = Auto,
            "VID": _VID,
            "VDte": (new Date(VDte)).toDateString(),
            "VNo": VNo,
            "VCat": VCat,

            "AccType": '1',
            "AccCode": E.AccCode,

            "Title": E.Title.substr(0, 50),
            "Desc": Desc.substr(0, 50),
            "Rem": Rem.substr(0, 50),

            "VAmt": VAmt
          }))]

      // Multiple Records in TranD
    }

    //  if (!AlertConfirm(Data2SendInDatabase, 'Add New Record ?: ' + process.env.REACT_APP_API_URL)) return


    //=====[   READY to send data in Database   ]========  
    //-------------------------------------------------------

    //=====[   PART-1-2/2  TranM   ]========  
    fetch(process.env.REACT_APP_API_URL + `TranPaymentSplr`, {
      method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(Data2SendInDatabase)
    })
      .then(res => res.json())
      .then(
        (result) => {
          //alert('Add-New Action Success-Result: ' + result);
          // AlertRec(result)
          toast.success('Record Saved Successfully: ', { theme: 'colored', autoClose: ToastWaitTime,  position: "top-left" })
          HandleBtnCancel(true)
          // GetRecs() //Update Fresh Records
        }
        // , (error) => { alert('ERROR--- Add-New Action Result: ' + 'Failed'); })
        , (error) => { toast.error('ERROR--- Failed, Add-New Action Result: ' + error, { theme: 'colored', autoClose: ToastWaitTime, }) }
      )

    // setNeed2Refresh(!Need2Refresh)
    HandleBtnCancel(true)
  }

  // =======================================================================
  // const CallAPI2SaveAddNew = async () => {
  //   // ------------- CREATE ADDNEW RECORD ----------------
  //   // alert('Now Saving Data in Database')

  //   //    AlertRec(OrderSheet, 'RAW-Data Ready to ADD in Database')
  //   const { VNo, VDte, VCat, Desc, DocDutyId, VAmt, VRef, VQty, AccD, AccC } = OrderSheet

  //   if (!Suppliers.find(s => s.Id === DocDutyId)) {
  //     alert('Supplier is invalid. \nPlz check voucher entry.'); return
  //   }
  //   if (AccC.length <= 0 || AccD.length <= 0) {
  //     alert('AccD/C is invalid. \nPlz check voucher entry.'); return
  //   }
  //   if (VAmt <= 0) {
  //     alert('Voucher Amount is ZERO. \nEmpty Voucher is Not Acceptable.'); return
  //   }

  //   const Data2SendInDatabase = {
  //     // One Record in TranM
  //     TranM: {
  //       "VDte": (new Date(VDte)).toDateString(),
  //       "VNo": VNo,
  //       "VCat": VCat,
  //       "Desc": Desc,
  //       "DocDutyId": DocDutyId,
  //       "VRem": VQty,
  //       "VQty": VQty,
  //       "VAmt": VAmt,

  //       "RefVDte": '',
  //       "RefVNo": '',
  //       "RefVCat": '',
  //       "RefVid": '',

  //       "EntryBy": "xUSERx",
  //       "EntryDte": new Date()
  //     },

  //     // Min-Two Records in TranR
  //     TranR: [
  //       ...AccD.map((E, I) => ({
  //         Vid: 'id',
  //         VDte: (new Date(VDte)).toDateString(),
  //         VNo: VNo,
  //         VCat: VCat,
  //         AccType: '0',
  //         Code: E.Code,
  //         Title: E.Title,
  //         VAmt: VAmt
  //       }))
  //       ,
  //       ...AccC.map((E, I) => ({
  //         Vid: 'id',
  //         VDte: (new Date(VDte)).toDateString(),
  //         VNo: VNo,
  //         VCat: VCat,
  //         AccType: '1',
  //         Code: E.Code,
  //         Title: E.Title,
  //         VAmt: VAmt
  //       }))
  //     ]
  //   }

  //   // console.log('Data2SendInDatabase:', Data2SendInDatabase)
  //   // AlertRec(Data2SendInDatabase, 'Data2SendInDatabase')
  //   //  alert('fn returned before saving' );  return


  //   //=====[   READY to send data in Database   ]========  
  //   //-------------------------------------------------------

  //   //=====[   PART-1-2/2  TranM   ]========  
  //   const res = await fetch(`/api/TranPayment`, {
  //     method: 'POST', headers: { 'Content-Type': "application/json" },
  //     body: JSON.stringify(Data2SendInDatabase)
  //   })

  //   const data = await res.json();
  //   // const data = res.json();
  //   // console.log('Saved Record Returned:', data);

  //   // if (res.status === 422 || !data) { window.alert("Transaction Invalid."); }
  //   // else {
  //   //     window.alert("Transaction Successful.");
  //   //     //History.push("/Home");
  //   // }

  //   alert('This Record has been SAVED in Database')
  //   // setNeed2Refresh(!Need2Refresh)
  //   HandleBtnCancel(true)
  // }
  // =======================================================================









  // =======================================================================
  // ==================[  Fns: DATABASE/ API Handling ]=====================
  // =======================================================================

  // ------------- Update RECORD ----------------
  const CallDotAPI2SaveUpdate = async () => {

    // AlertRec(OrderSheet, 'UPDATING RAW-Data Ready for Database')
    const { VID, VNo, VDte, VCat, TId, Desc, Rem, VAmt, VQtyTxt, AccD, AccC } = OrderSheet


    // if (VNo.trim() == '') {
    //   toast.error('Voucher Number (VNo) is EMPTY. \nThis Number is only for Reference.\nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
    //   return
    // }

    if (!TId || !(Traders.find(s => s.Id === TId))) {
      //alert('Supplier is invalid. \nPlz check voucher entry. ' + [PatId]); return
      toast.error('Supplier is invalid. \nPlz check voucher entry. ' + '[ ' + TId + ' ]', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }

    //  { AlertRec(AccD, 'AccD: AccD.length:' + ' [' + AccD.length + ']') }
    if (AccD.length <= 0 || AccC.length <= 0) {
      AlertRec(AccD, `AccD/C is invalid. \nPlz CHK Database.\n  AccD: ${AccD.length} \n AccC: ${AccC.length} \n `)
      toast.error('AccD/C is invalid. \nPlz check voucher entry.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }

    if (VAmt <= 0) {
      toast.error('Voucher Amount is ZERO. \nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }


    const Data2SendInDatabase =
    {
      "VID": VID,

      // One Record in TranM
      "TranM": {
        "VID": VID,
        "VDte": (new Date(VDte)).toDateString(),
        "VNo": VNo,
        "VCat": VCat.substr(0, 4),

        "TId": TId,
        "Desc": Desc.substr(0, 50),
        "Rem": Rem.substr(0, 50),

        "VQtyTxt": '',
        "VAmt": VAmt,

        "RefVID": '',
        "RefVDte": '',
        "RefVNo": '',
        "RefVCat": '',

        "RecType": '',
        "RecStatus": '',        //RecStatus.substr(0, 10),
        "Priority": '',        //RecStatus.substr(0, 10),

        "EntryBy": "xUSERx",
        "EntryDte": new Date()
      },

      // Two Records in TranR
      "TranRs": [
        ...AccD.map((E, I) => (
          {
            //ID = Auto,
            "VID": VID,
            "VDte": (new Date(VDte)).toDateString(),
            "VNo": VNo,
            "VCat": VCat,

            "AccType": '0',
            "AccCode": E.AccCode,

            "Title": E.Title.substr(0, 50),
            "Desc": Desc.substr(0, 50),
            "Rem": Rem.substr(0, 50),

            "VAmt": VAmt
          }))
        ,
        ...AccC.map((E, I) => (
          {
            //ID = Auto,
            "VID": VID,
            "VDte": (new Date(VDte)).toDateString(),
            "VNo": VNo,
            "VCat": VCat,

            "AccType": '1',
            "AccCode": E.AccCode,

            "Title": E.Title.substr(0, 50),
            "Desc": Desc.substr(0, 50),
            "Rem": Rem.substr(0, 50),

            "VAmt": VAmt
          }))]

      // Multiple Records in TranD
    }


    //  if (!AlertConfirm(Data2SendInDatabase, 'UPDATE This Record ?: ' + process.env.REACT_APP_API_URL)) return


    //===================================================  
    //=====[   READY to Update/send data in Database   ]========  
    //===================================================  
    //=====[   PARTs-3/3  TranM   ]========  
    fetch(process.env.REACT_APP_API_URL + `TranPaymentSplr/${VID}`, {
      method: 'PUT', headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(Data2SendInDatabase)
    })
      .then(res => res.json())
      .then(
        (result) => {
          //alert('UPDATE Action Success-Result: ' + result);
          toast.success('Record Saved Successfully: ', { theme: 'colored', autoClose: ToastWaitTime,  position: "top-left" })
          HandleBtnCancel(true)
          // GetRecs() //Update Fresh Records
        }
        // , (error) => { alert('ERROR--- Add-New Action Result: ' + 'Failed'); })
        , (error) => { toast.error('ERROR--- Failed, Update Action Result: ' + error, { theme: 'colored', autoClose: ToastWaitTime, }) }
      )

    //alert('Data is Sent in Database')
    // setNeed2Refresh(!Need2Refresh)
    HandleBtnCancel(true)
  }




  // --------------------------------------------------------------------------------------------------------------------
  // ------------- Delete  RECORD ----------------
  // --------------------------------------------------------------------------------------------------------------------
  const CallDotAPI2Delete = async () => {
    const { VID } = OrderSheet
    //=====[   READY to Delete data from Database   ]========  
    //-------------------------------------------------------
    //const res = await fetch(`/api/TranPurchase/${VID}`, { method: 'DELETE', headers: { 'Content-Type': "application/json" }        })
    fetch(process.env.REACT_APP_API_URL + `TranPaymentSplr/${VID}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(
        (result) => {                //alert('DELETE Action Success-Result: ' + result);
          toast.warn('Record Deleted Successfully: ', { theme: 'colored', autoClose: ToastWaitTime, })
          HandleBtnCancel(true)
          // GetRecs() //Update Fresh Records
        }
        // , (error) => { alert('ERROR--- Add-New Action Result: ' + 'Failed'); })
        , (error) => { toast.error('ERROR--- Failed, Delete Action Result: ' + error, { theme: 'colored', autoClose: ToastWaitTime, }) }
      )

    // alert('Record is DELETED from Database')
    HandleBtnCancel(true)
  }




  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  return (
    <>
      {/* <div className='card d-flex  m-0 p-1 flex-column text-start' style={{ width: '100%', fontSize: '12px', background: '#e0e0e0', borderRadius: '5px' }}> */}
      <div className='card d-flex  m-0 p-1 flex-column text-start' style={{ width: '100%', fontSize: '12px', background: '#e0e0e0', borderRadius: '5px' }}>

        {/* =================================================================================== */}
        {/* =====[    Main Prg /CARD HEADDER start            ]===========================================  */}
        {/* =================================================================================== */}
        <div className='card-header d-flex gap-1 pt-0, pt-1 mb-1 justify-content-between ' style={{ background: '#bebebe' }}>
          <span className='fs-6'><strong>Payment Voucher Detail</strong></span>

          {/* <button className='btn btn-sm btn-info py-0 px-1  ms-auto' style={{ height: '25px' }} onClick={() => HandlePrinting()}>
            <span style={{ fontSize: 'smaller' }}>Print</span> <GrPrint />
          </button> */}

          <button className='btn btn-sm btn-warning py-0 px-1  ms-auto' style={{ height: '25px' }} onClick={() => { HandleBtnReset() }}>
            <span style={{ fontSize: 'smaller' }}>Reset Changes</span> <TbWiperWash />
          </button>
          <button className='btn btn-sm btn-success py-0 px-1' style={{ height: '25px' }} onClick={(e) => { HandleBtnSave(e) }} type="submit" >
            <span style={{ fontSize: 'smaller' }}>Save {(VoucherMode === 'Edit') ? 'Changes ' : 'Record'}</span> <FaSave className='mb-1' />
          </button>
          {(VoucherMode === 'Edit') &&
            <button className='btn btn-sm btn-danger py-0 px-1' style={{ height: '25px' }}
              data-bs-toggle="modal" data-bs-target="#exampleModal">
              {/* onClick={() => { HandleBtnDelete(true) }}> */}
              <span style={{ fontSize: 'smaller' }}>Delete Record</span> <FaUserSlash className='mb-1' />
            </button>
          }
        </div>

        {/* =================================================================================== */}
        {/* =====[    Main Prg /CARD BODY start            ]===================================  */}
        {/* =================================================================================== */}

        <div className="card-body p-1 mb-1 ">
          <div className="d-flex gap-2 ">

            {/*[   Consultant/Doctors List for Selection   ]*/}
            {/* ----------[  Group 1/2  ]----------------------------------- */}
            {/* <div style={{ width: "40%" }} style={{ flexGrow: '1' }}> */}
            <div className=' w-50' >
              {/* <SuppliersCardsGroup TRecs={Traders} HandleBtnClick={HandleSubListItemClicked} /> */}
              {/* <RecsListView RecAll={Traders} HandleListItemClicked={HandleSubListItemClicked} /> */}
              <SubRecsComboViews RecAll={Traders} HandleListItemClicked={HandleSubListItemClicked} /> 
            </div>

            {/* ----------[  Group 2/2  ]----------------------------------- */}
            <div className='' style={{ width: '50%' }} >
              <div className="card " >

                {/* ---[ Input HEADER VNO VDTE ]--- */}
                <div className='card-header d-flex gap-3 ' style={{ height: '60px' }}>

                  {/* ---[ Input VNo ]--- */}
                  <div className="d-flex  align-items-center text-primary" style={{ width: '30%' }} >
                    <div className="input-group-text  text-primary fs-4" style={{ padding: '8px 8px' }} ><ImListNumbered /></div>
                    <div className="form-floating"  >
                      {/* <input type="text" value={VNo} name="VNo" id="VNo" className="form-control  text-end " placeholder="VNo" readOnly={InputReadOnly} onChange={(e) => HandleInputs(e)} /> */}
                      <input type="text" value={VNo} name="VNo" id="VNo" className="form-control  text-end " placeholder="VNo" onChange={(e) => HandleInputs(e)} />
                      <label htmlFor="VNo"  >No</label>
                    </div>
                  </div>


                  {/* ---[ Input Entry Date]--- */}
                  <div className="d-flex align-items-center text-primary" style={{ width: '65%' }} >
                    <div className="d-flex align-items-center w-100">
                      <div className="input-group-text  text-primary fs-4" htmlFor='VDte' style={{ padding: '7px 8px' }} ><FaRegCalendarAlt /> <label style={{ fontSize: '12px', lineHeight: '1' }} >Entry<br />Date</label> </div>

                      <div className="form-floating w-100" >
                        <DatePicker className=" form-control  text-end"
                          name="VDte" value={VDte === ''
                            ? Moment(VDte).format('DD MMM YY, ddd')
                            : Moment(VDte).format('DD MMM YY, ddd')}

                          dateFormat='d MMM yy'
                          selected={new Date((VDte) ? VDte : Date())}
                          // readOnly={(VoucherMode === 'Edit') ? true : false} //; isClearable={true}   //This is only for X-ClearIcon
                          readOnly={false}
                          allowClear={true}        //; placeholderText="No Date is entered!"
                          onChange={date => { (date) ? setOrderSheet({ ...OrderSheet, VDte: date }) : setOrderSheet({ ...OrderSheet, VDte: '' }) }} />


                      </div>
                    </div>
                  </div>

                </div>

                {/* ---[ Input DETAIL Title Desc VAmt VDetail ]--- */}
                <div className='card-body d-flex flex-column  gap-3'>

                  {/* ---[ Debit Account ]--- */}
                  {/* <input type="text" value={ACCodeD.Code} className="form-control  text-end " name='ACCodeD' id='ACCodeD' placeholder="Account Title" readOnly={InputReadOnly} onChange={(e) => HandleInputs(e)} /> */}
                  {/* <div className="d-flex">  
      <div className="input-group-text"><FaRegMoneyBillAlt /></div>
      <div className="form-floating w-100" >

        <select value={ACCodeD.Code} className="form-control  text-end  ps-2 pb-0 pt-3"
          name="ACCodeD" id="ACCodeD.Code" placeholder="Credit Account Title"
          disabled={InputReadOnly}
          onChange={(e) => {
            console.log(e.target.name, e.target.value);
            setRec({ ...Rec, ACCodeD: { ...ACCodeD, Code: e.target.value } })
          }}  >
          {ACCodesD
            ? ACCodesD.map((E, I) => {
              return (<option value={E.Code} selected={I === 1} >{I + ' ' + E.Title} </option>)
            })
            : ''
          }

        </select>

        <label htmlFor="ACCodeD"  >Account Title</label>
      </div>
    </div> */}

                  {/* ---[ Debit Account ]--- */}
                  {/* ---[ Select Trader Code ]--- */}
                  {/* <div className="d-flex mb-1">  
                    <div className="input-group-text"><FaRegAddressCard /></div>
                    <div className="form-floating w-100" >

                      <select className="form-control  text-end  ps-2 pb-0 pt-3 "
                        value={DocDutyId ? DocDutyId : HandleDefaultTrader()}
                        name="DocDutyId" placeholder="Doctor"
                        onChange={(e) => {
                          HandleInputs({...e, target: {...e.target, name:'tumbakto'}})
                          HandleInputs({...e, target:{...(e.target), name:'skldfj', value:e.target.value}})
                        }}  >
                        {_DocsDuty.Data.map((E, I) => { return (<option key={I} value={E.Id} > {E.Title} </option>) })}
                      </select>

                      <label htmlFor="DocDutyId"  >Consultant Doctor</label>
                    </div>
                  </div> */}

                  {/* -------------------------------------------------- */}
                  {/* ---[ Input Duty Doctor ]--- */}
                  <div className="d-flex " style={{ height: '42px', width: '100%' }}>
                    <span className="input-group-text px-0 py-0" >

                      {/* <img alt="Gender" width='42px' height='42px' */}
                    <img alt="Default" width='56px' height='36px'
                                        src={
                                            (RefTrader?.PicURL && RefTrader?.PicURL?.trim())
                                                    ? process.env.REACT_APP_API_URL + `Traders/GetFile/${RefTrader.PicURL}`
                                                    : ImgDefault
                                        }
                                    />

                    </span>
                    <div className="d-flex w-100 flex-column align-items-stretch w-100 border border-1 rounded-2 " style={{ width: '70%' }}>
                      <span className='px-3' style={{ fontSize: 'smaller' }}  >Supplier</span>
                      <Select className='w-100 text-end'
                        // defaultValue={OrderSheet.TId ? OrderSheet.TId : _DocsDuty.Data[0].Id}
                        value={TId
                          ? { value: TId, label: RefTrader.Title }
                          // : { value: _Patients.Data[0].Id, label: 'DefaultPatient: ' + _Patients.Data[0].Title }
                          // : _DocsDuty.Data[0].Id
                          : ''
                        }

                        name="TId"
                        placeholder="Select Supplier"
                        // isClearable={true}
                        isRtl={true}

                        // styles={customStyles}  
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            background: '#fff',
                            minHeight: '22px  !important',
                            height: '22px',
                            marginTop: '0px',
                            padding: '0px',

                            //boxShadow: state.isFocused ? null : null,
                            // boxShadow: 'none',

                            // borderColor: '#9e9e9e',
                            borderColor: 'white',
                            // borderColor: 'none',
                            '&:hover': {
                              color: '#60B3D1'
                            },

                            // border: state.isFocused ? '1.5px solid #60B3D1' : '1.5px solid #cbd5e1'                                            
                            // border: '0px'
                          }),

                          valueContainer: (provided, state) => ({
                            ...provided,
                            minHeight: '22px  !important',
                            height: '22px',
                            padding: '0px 6px   !important',
                            borderColor: 'white',
                          }),

                          input: (provided, state) => ({
                            ...provided,
                            minHeight: '22px  !important',
                            height: '22px',
                            margin: '0px',
                            padding: '0px',
                            borderColor: 'white',
                          }),

                          indicatorSeparator: state => ({
                            ...state,
                            // display: 'none',
                            marginTop: '2px',
                            marginBottom: '3px',
                          }),
                          indicatorsContainer: (provided, state) => ({
                            ...provided,
                            height: '22px',
                          }),

                          // option: (styles: any, state: any) => ({
                          option: (styles, state) => ({
                            ...styles,
                            // color: state.isSelected ? '#FFF' : styles.color,
                            // backgroundColor: state.isSelected ? '#60B3D1' : styles.color,

                            // borderBottom: '1px solid rgba(0, 0, 0, 0.125)',
                            lineHeight: '1',

                            '&:hover': {
                              color: '#FFF',
                              backgroundColor: '#60B3D1'
                            }
                          }),

                          // dropdownIndicator: (styles) => ({
                          //     ...styles,
                          //     paddingTop: 7,
                          //     paddingBottom: 7,
                          // }),
                          // clearIndicator: (styles) => ({
                          //     ...styles,
                          //     paddingTop: 7,
                          //     paddingBottom: 7,
                          // }),

                          // option: (styles: any, state: any) => ({
                          //     ...styles,
                          //     color: state.isSelected ? '#FFF' : styles.color,
                          //     backgroundColor: state.isSelected ? '#60B3D1' : styles.color,
                          //     borderBottom: '1px solid rgba(0, 0, 0, 0.125)',
                          //     '&:hover': {
                          //         color: '#FFF',
                          //         backgroundColor: '#60B3D1'
                          //     }
                          // }),

                          // input: (base: any) => ({
                          //     ...base,
                          //     'input:focus': {
                          //         boxShadow: 'none',
                          //         border: '1px solid #60B3D1'
                          //     }
                          // }),

                          // menuPortal: (base: any) => ({ ...base, zIndex: 9999 })
                        }}

                        onChange={(e) => { HandleInputs(e, 'TId') }}
                        options={Traders.map((E, I) => { return ({ key: I, value: Number(E.Id), label: E.Title + ';  ' + E.City }) })}
                                      
                      />
                    </div>
                  </div>

                  {/* -------------------------------------------------- */}
                  {/* ---[ Credit Account ]--- */}
                  {/* {AlertRec(AccRecs.AccC,'AccRecs')} */}
                  <div className="d-flex">  {/* <div className="input-group"> */}
                    <div className="input-group-text"><IoCashOutline /></div>
                    <div className="form-floating w-100" >
                      <select value={AccC[0].AccCode} className="form-control   text-end ps-2 pb-0 pt-3"
                        name="AccC" id="AccC.AccCode" placeholder="Credit Account Title"
                        // disabled={InputReadOnly}
                        onChange={e => { setOrderSheet({ ...OrderSheet, AccC: [{ AccCode: e.target.value, Title: e.target.options[e.target.selectedIndex].text }] }) }}
                      >

                        {(AccRecs.AccC.length > 0)
                          ? AccRecs.AccC.map((E) => {
                            return (<option value={E.Code} >{E.Title} </option>)
                          })
                          : ''
                        }
                      </select>

                      {/* <label htmlFor="AccC"  >Credit Account Title</label> */}
                      <label htmlFor="AccC"  >From Account Head/Title</label>
                    </div>
                  </div>

                  {/* -------------------------------------------------- */}
                  {/* ---[ Input Desc ]--- */}
                  <div className="d-flex">  {/* <div className="input-group"> */}
                    <div className="input-group-text"><TbTextWrapDisabled /></div>
                    <div className="form-floating w-100" >
                      <input type="text" value={Desc} className="form-control  text-end " maxLength={50} name='Desc' id="Desc" placeholder="Father Name" readOnly={false} onChange={(e) => HandleInputs(e)} />
                      <label htmlFor="Desc"  >Voucher Description</label>
                    </div>
                  </div>

                  {/* ---[ Input Remarks ]--- */}
                  <div className="d-flex">  {/* <div className="input-group"> */}
                    <div className="input-group-text"><TbTextWrapDisabled /></div>
                    <div className="form-floating w-100" >
                      <input type="text" value={Rem} className="form-control  text-end " maxLength={50} name='Rem' id="Rem" placeholder="Detail" readOnly={false} onChange={(e) => HandleInputs(e)} />
                      <label htmlFor="Rem"  >Voucher Detail/Remarks</label>
                    </div>
                  </div>


                  {/* -------------------------------------------------- */}
                  {/* ---[ Input VAmount ]--- */}
                  <div className="d-flex">  {/* <div className="input-group"> */}
                    <div className="input-group-text"><TbCurrencyReal /></div>
                    <div className="form-floating w-100" >
                      {/* <input type="number" value={VAmt} className="form-control  text-end " name='VAmt' id="VAmt" placeholder="Father Name" readOnly={false}
                    onChange={(e) => HandleInputs(e)} onFocus={handleFocus} /> */}

                      <NumberFormat value={VAmt} name='VAmt' id="VAmt" thousandSeparator={true} thousandsGroupStyle="lakh"
                        className=" form-control  text-end"
                        // style={{border:'none' , outline: 'none'                  }}

                        // label={"1 FTE"}
                        // customInput={TextField}
                        // isNumericString={true}   //for value output is number value
                        // decimalScale={2}

                        //onChange={(e) =>{ HandleInputs(e); console.log('**************\nVAmt : ',VAmt)}}
                        onValueChange={(values) => {
                          HandleInputsNumberFormat({ name: 'VAmt', value: values.value })
                        }}
                      />

                      <label htmlFor="VAmt"  >Voucher Amount</label>
                    </div>
                  </div>
                  {/* -------------------------------------------------- */}

                </div>




              </div>
            </div>
          </div>

        </div>



        {/* =================================================================================== */}
        {/* =====[    END   --- Main Prg /CARD BODY start            ]===================================  */}
        {/* =================================================================================== */}

      </div>

      {/* ==========Start===========  MODAL for Deletion =========================*/}
      <div>
        {/* Button trigger modal */}
        {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button> */}

        {/* Modal */}
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Are You Sure, You Want To DELETE This Record ?</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body d-flex justify-content-center ">
                <div className="card-body px-3 pb-3 pt-0">

                  {/* <div className="card-title m-0 p-0" style={{ lineHeight: 1 }}>{Title.trim()}</div> */}
                  {/* <div className="card-title fs-4 text-center" >Voucher No: [ {OrderSheet.VNo} ]  of Date: {OrderSheet.VDte}</div> */}

                  <div>
                    <table><tbody>
                      <tr>
                        <th> <span className='fs-6 fw-bold  ' >Consultant:  </span></th>
                        <td> <span className='fs- ' > [ {OrderSheet?.TId} ]   - {OrderSheet?.RefTrader?.Title}</span> </td>
                        {/* {OrderSheet.RefTrader.Title && <td> <span className='fs- ' > [ {OrderSheet.RefTrader.Code} ]   - {OrderSheet.RefTrader.Title}</span> </td>} */}
                        {/* <td> <span className='fs- ' > [ {OrderSheet.RefTrader.Code} ]   - {OrderSheet.RefTrader.Title}</span> </td> */}
                      </tr>

                      <tr>
                        <th> <span className='fs-6 fw-bold fs- ' >From Account:  </span></th>
                        {/* {OrderSheet.AccC[0].Title && <td> <span className='fs- ' > {OrderSheet.AccC[0].Title}   </span> </td>} */}
                        <td> <span className='fs- ' > {OrderSheet?.AccC[0]?.Title}   </span> </td>
                      </tr>

                      <tr>
                        <th> <span className='fs-6 fw-bold  ' >Desciption:  </span></th>
                        <td> <span className='fs- ' > {OrderSheet.Desc}   </span> </td>
                      </tr>
                      <tr>
                        <th> <span className='fs-6 fw-bold  ' >Voucher Amount:  &ensp;  </span></th>
                        <td> <span className='fs- ' > {OrderSheet.VAmt}   </span> </td>
                      </tr>

                    </tbody></table>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">NO. Do Not Delete</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => { HandleBtnDelete(true) }}>Delete This Anyway</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ===========END==========  MODAL for Deletion =========================*/}


      {/* ===========START==========  PRINTING of VOUCHER =========================*/}
      {/*        FOR PRINTING       */}
      {/* ===========START==========  PRINTING of VOUCHER =========================*/}
      {/* <div ref={compRef1}> */}
      <div ref={compRefX} className="d-none">
        <h1>Bismillah</h1>

        {/* <div >Voucher No: [ {OrderSheet.VNo} ]  of Date: {OrderSheet.VDte}</div> */}

        <div>
          <table><tbody>
            <tr>
              <th> <span className='fs-6 fw-bold  ' >Consultant:  </span></th>
              <td> <span className='fs- ' > [ {OrderSheet?.RefTrader?.Id} ]   - {OrderSheet?.RefTrader?.Title}</span> </td>
            </tr>

            <tr>
              <th> <span className='fs-6 fw-bold fs- ' >From Account:  </span></th>
              {/* <td> <span className='fs- ' > {OrderSheet.AccC[0].Title}   </span> </td> */}
            </tr>

            <tr>
              <th> <span className='fs-6 fw-bold  ' >Desciption:  </span></th>
              <td> <span className='fs- ' > {OrderSheet.Desc}   </span> </td>
            </tr>
            <tr>
              <th> <span className='fs-6 fw-bold  ' >Voucher Amount:  &ensp;  </span></th>
              <td> <span className='fs- ' > {OrderSheet.VAmt}   </span> </td>
            </tr>

          </tbody></table>
        </div>
      </div>
      {/* ============END===========  PRINTING of VOUCHER =========================*/}

      <div className='d-hidden'><ToastContainer /></div>
    </>)
}