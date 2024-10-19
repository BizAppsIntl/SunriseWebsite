import { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'

import axios from 'axios'

import Moment from 'moment'
// Two files needed for datepicker
import ReactDatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'

import Select from 'react-select'

import ImgMale from '../../../../ImagesAdminPanel/default/Male.png'
import ImgFemale from '../../../../ImagesAdminPanel/default/Female.png'
import ImgDefault from '../AssetsLocal/Images/Suppliers.png'

//Two file needed for toasify
import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';


// [.....................START: Calls Prgs: ..................................................]
// import SuppliersCardsGroup from './SuppliersCardsGroup'
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
// import RecsListView from './RecsListView'
import SubRecsComboViews from './SubRecsComboViews'
import MyCustomModal from '../../../../../Components/MyCustomModal'
import { FaTrashCan } from 'react-icons/fa6';

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
  RefTrader: '',
  // VItems: [],

  AccD: [],
  AccC: []
}

const ToastWaitTime = 5000
// ==================[  useContext and useReducer Hooks  ]=====================


// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
//                                  P R G  ---   START
// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
export default function EntryFormReceipt(props) {
  //destructuring    props
  // const { VoucherMode, CrntRec, Categories, HandleInputs, HandleInputsMode, HandleBtnVoucherMode} = props
  const { CrntRec, AccRecs, Traders, VoucherMode, HandleBtnVoucherMode } = props

  const { CtxMainState, CtxMainDispatch } = useCtxMainContextHook()
  const { _Procedures: Products, _Patients, _DocsRef, _DocsDuty, _Cats } = CtxMainState

  const [OrderSheet, setOrderSheet] = useState(CrntRec ? CrntRec : '')
  const [Need2Refresh, setNeed2Refresh] = useState(false);

  const [ShowDeleteModal, setShowDeleteModal] = useState(false);

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

    if (!AlertConfirm(Data2SendInDatabase, 'Add New Record ?: ' + process.env.REACT_APP_API_URL)) return


    //=====[   READY to send data in Database   ]========  
    //-------------------------------------------------------

    //=====[   PART-1-2/2  TranM   ]========  
    fetch(process.env.REACT_APP_API_URL + `TrxFundsTraders`, {
      method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(Data2SendInDatabase)
    })
      .then(res => res.json())
      .then(
        (result) => {
          //alert('Add-New Action Success-Result: ' + result);
          // AlertRec(result)
          toast.success('Record Saved Successfully: ', { theme: 'colored', autoClose: ToastWaitTime, position: "top-left" })
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
    fetch(process.env.REACT_APP_API_URL + `TrxFundsTraders/${VID}`, {
      method: 'PUT', headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(Data2SendInDatabase)
    })
      .then(res => res.json())
      .then(
        (result) => {
          //alert('UPDATE Action Success-Result: ' + result);
          toast.success('Record Saved Successfully: ', { theme: 'colored', autoClose: ToastWaitTime, position: "top-left" })
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
    fetch(process.env.REACT_APP_API_URL + `TrxFundsTraders/${VID}`, { method: 'DELETE' })
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
    <div className='card w-full  m-0 p-1 ' style={{ fontSize: '12px', background: '#e0e0e0' }}>

      {/* =================================================================================== */}
      {/* =====[    Main Prg /CARD HEADDER start            ]===========================================  */}
      {/* =================================================================================== */}
      <div className='card-header flex gap-1 px-2  m-0 items-center ' style={{ background: '#bebebe' }}>
          <span className='text-xl'><strong>Sales Receipt Voucher Detail</strong></span>


          <button type="button" class="ms-auto py-0 px-2 flex justify-center items-center text-white text-center text-base font-semibold  bg-amber-500 hover:bg-amber-700 focus:ring-amber-500 focus:ring-offset-amber-200 transition ease-in duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
            onClick={() => HandleBtnReset()}>
            <span style={{ fontSize: 'smaller' }}>Reset Changes</span> <TbWiperWash />
          </button>


          <button type="button" class="py-0 px-2 flex justify-center items-center text-white text-center text-base font-semibold  bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 transition ease-in duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
            onClick={(e) => HandleBtnSave(e)}>
            <span style={{ fontSize: 'smaller' }}>Save {(VoucherMode === 'Edit') ? 'Changes ' : 'Record'}</span> <FaSave className='mb-1, ms-1' />
          </button>


          {(VoucherMode === 'Edit') &&
            <button type="button" class="py-0 px-2 flex justify-center items-center text-white text-center text-base font-semibold  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 transition ease-in duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
              onClick={() => setShowDeleteModal(true)}>
              <span style={{ fontSize: 'smaller' }}>Delete Record</span> <FaTrashCan className='mb-1, ms-1' />
            </button>
          }
        </div>


      {/* =================================================================================== */}
      {/* =====[    Main Prg /CARD BODY start            ]===================================  */}
      {/* =================================================================================== */}

      <div className="card-body p-1 mb-1 w-full ">
        <div className=" gap-2 grid grid-cols-1 md:grid-cols-2">

          {/*[   Consultant/Doctors List for Selection   ]*/}
          {/* ----------[  Group 1/2  ]----------------------------------- */}
          {/* <div style={{ width: "40%" }} style={{  flexGrow: '1' }}> */}
          {/* <div className=' w-[50%]' > */}
          <div className='w-full ' >
            {/* <SuppliersCardsGroup TRecs={Traders} HandleBtnClick={HandleSubListItemClicked} /> */}
            {/* <RecsListView RecAll={Traders} HandleListItemClicked={HandleSubListItemClicked} /> */}

            <SubRecsComboViews RecAll={Traders} HandleListItemClicked={HandleSubListItemClicked} />
          </div>

          {/* ----------[  Group 2/2  ]----------------------------------- */}
          {/* <div className=' ' > */}
          <div className="card w-full" >

            {/* ---[ Input HEADER VNO VDTE ]--- */}
            <div className='card-header p-2 flex gap-2 ' >

              {/* ---[ Input HEADER VDTE ]--- */}
              <div className='flex  w-[50%] '>
                <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                  {/* <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg> */}
                  <FaRegCalendarAlt />
                </span>
                <div className="relative">
                  {/* <input type="text" id="SNo" disabled className=" cursor-not-allowed block rounded-e-md px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  placeholder="" value={VNo} maxLength={5}
                                  onChange={(dte) => setVoucherCart((e) => ({ ...VoucherCart, VNo: e.target.value }))}
                              /> */}
                  <ReactDatePicker className=" rounded-e-md px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    // name="VDte" value={VDte === ''
                    //     // ? `${ (new Date()).getDate() } /${(new Date()).getMonth()+1}/${ (new Date()).getFullYear() } `
                    //     ? `${ (new Date()).getDate() } ${ (new Date()).toDateString().substr(4, 1) } ${ (new Date()).getFullYear() } `
                    //     : VDte} dateFormat='d MMM yy' id="VDte"

                    // selected={new Date((VDte) ? VDte : Date())}
                    name="VDte" value={VDte === ''
                      ? Moment(VDte).format('DD MMM YY, ddd')
                      : Moment(VDte).format('DD MMM YY, ddd')}
                    // : VDte} dateFormat='d MMM yy'
                    // ? `${(new Date()).getDate()} /${(new Date()).getMonth() + 1}/${(new Date()).getFullYear()} `


                    dateFormat='d MMM yy'
                    selected={new Date((VDte) ? VDte : Date())}
                    // readOnly={(VoucherMode === 'Edit') ? true : false} //; isClearable={true}   //This is only for X-ClearIcon
                    readOnly={false}
                    allowClear={true}        //; placeholderText="No Date is entered!"
                    onChange={date => { (date) ? setOrderSheet({ ...OrderSheet, VDte: date }) : setOrderSheet({ ...OrderSheet, VDte: '' }) }}
                  />
                  <label for="SNo" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    Voucher Date
                  </label>
                </div>
              </div>

              {/* ---[ Input HEADER VNO ]--- */}
              <div className='flex w-[50%]'>
                <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                  <ImListNumbered />
                </span>
                <div className="relative">
                  <input type="text" name="VNo" id="VNo" disabled className=" cursor-not-allowed block rounded-e-md px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="" value={VNo} maxLength={5}
                  //   onChange={(e) => HandleInputs(e)} 
                  // onChange={(dte) => setVoucherCart((e) => ({ ...VoucherCart, VNo: e.target.value }))}
                  />
                  <label for="VNo" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    VNo
                  </label>
                </div>
              </div>


            </div>

            {/* ---[ Input DETAIL Title Desc VAmt VDetail ]--- */}
            <div className='card-body p-2 flex  flex-col  gap-3'>

              {/* ---[ Debit Account ]--- */}
              {/* <input type="text" value={ACCodeD.Code} className="form-control  text-end " name='ACCodeD' id='ACCodeD' placeholder="Account Title" readOnly={InputReadOnly} onChange={(e) => HandleInputs(e)} /> */}
              {/* <div className=" flex">  
    <div className="input-group-text"><FaRegMoneyBillAlt /></div>
    <div className="form-floating w-full" >

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
              {/* <div className=" flex mb-1">  
                  <div className="input-group-text"><FaRegAddressCard /></div>
                  <div className="form-floating w-full" >

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

              {/* ---[ Input Traders ]--- */}
              <div className="flex gap-2  w-full items-end"
              // style={{ height: '42px', width: '100%' }}
              >
                <div className="px-0 py-0 my-auto  w-[50px]" >
                  <img alt="Default" className=" w-full"
                    src={
                      (RefTrader?.PicURL && RefTrader?.PicURL?.trim())
                        ? process.env.REACT_APP_API_URL + `Traders/GetFile/${RefTrader?.PicURL}`
                        : ImgDefault
                    }
                  />
                </div>

                <div className="relative w-full ">
                  {/* <input type="text" id="City" name="City" className="block rounded-e-md px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder="" value={City} maxLength={30} onChange={(e) => HandleInputs(e)} /> */}

                  {/* <Select className=" rounded-e-md px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" */}
                  <Select className=" rounded-e-md px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    // defaultValue={DocDutyId ? DocDutyId : _DocsDuty.Data[0].Id}
                    // isRtl={true}

                    value={
                      TId
                        // ? { value: TId, label: RefTrader?.Title }
                        // ?{const   E = options.find((option) => option.value === optionValue);
                        // ? Traders.find (E => { if (E.value === TId) return ({  value: Number(E.Id), label: E.Title , ID: E.Id, city: E.City, phone: E.Phone }) })

                        // const traderDetails = Traders.find(({ TId }) => TId === 'T002') && 
                        //  (({ Id, Title, City, Phone }) => ({ Id, Title, City, Phone }))(Traders.find(({ TId }) => TId === 'T002'));
                        //? Traders.find(E => E.TId === TId) && { value: E.Id, label: E.Title, ID: E.Id, city: E.City, phone: E.Phone }

                        ? (() => {
                          const { Id, Title, City, Phone } = Traders.find(E => E.Id === Number(TId)) || {};
                          return Id ? { value: Id, label: Title, ID: Id, city: City, phone: Phone } : '';
                          // AlertRec(Traders , 'Traders ')
                          // const v = Traders.find(E => E.Id === Number(TId)) 

                          // AlertRec(v , 'Found rec in Traders for '+ TId )

                          // return v?.Id ? { value: v.Id, label: v.Title, ID: v.Id, city: v.City, phone: v.Phone } : 'null';
                        })()

                        // : { value: _Patients.Data[0].Id, label: 'DefaultPatient: ' + _Patients.Data[0].Title }
                        // : { value: '', label: '' }
                        // :_Patients.Data[0].Id
                        : ''
                    }

                    name="TId"
                    placeholder="Select Distributor"
                    // isClearable={true}
                    // isRtl={true}

                    // Custom Option component to display image and text in the dropdown
                    // components={{ Option: CustomOptionWithImages }}
                    components={{
                      Option:
                        ({ innerRef, innerProps, data }) => (
                          <div ref={innerRef} {...innerProps}
                            className="text-[11px] md:text-xs px-1 md:px-2 py-0 w-full flex  justify-between items-center z-50 hover:bg-gray-200"
                          >
                            {/* <img src={data.img} alt={data.label} className="w-4 h-4 object-cover rounded-full mr-2"                                                       /> */}
                            {/* <span className="w-[10%]">{innerProps.isSelected */}

                            {/* <span className="w-[10%]">{props.isSelected
                                                          ? (<img className="custom-option__img w-[16px]" src={'/assets/default/Male.png'} alt="" />)
                                                          : (<img className="custom-option__img w-[16px]" src={'/assets/default/Female.png'} alt="" />)}
                                                      </span> */}

                            {/* <span className="w-[20%]">{data.value}</span> */}


                            <div className="w-[7%]  ">
                              <img alt={'.'} className="w-4 h-4 object-cover "
                                src={
                                  (data.img)
                                    ? process.env.REACT_APP_API_URL + `Traders/GetFile/${data.img}`
                                    : ImgDefault
                                }

                              />
                            </div>

                            <div className="md:w-[48%] w-[58%]  ">{data.label}</div>
                            <div className="hidden  w-[20%]  ">{data.phone}</div>
                            <div className="md:w-[20%] w-[30%]  ">{data.city}</div>
                            <div className="w-[5%]  ">{data.ID}</div>
                          </div>
                        )
                    }}

                    getOptionValue={(option) => option.value} // Use value for internal tracking

                    getOptionLabel={(option) => {
                      // Modify label as needed (e.g., adding "VIP" for certain customers)
                      // return option.label.includes('1') ? `${option.label} (VIP)` : option.label;

                      // return <div><img src={'/assets/p1.png'} height="30px" width="30px"/> Hello </div>
                      return (
                        <div className="flex items-center p-0 ">
                          {/* {AlertRec(option, "option")} */}
                          {/* <img src={option.img} height="30px" width="30px" /> */}
                          {/* <img src={option.img} className='w-4 h-4 border border-red-600' /> */}
                          {option.label}, {option.city}
                        </div>

                      )
                    }}

                    // styles={customStyles}  
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        background: '#fff',
                        minHeight: '22px  !important',
                        height: '26px',
                        marginTop: '0px',
                        marginBottom: '0px',

                        // padding: '0.25rem', // Tailwind equivalent: 'p-1'
                        padding: '0px',

                        width: '100%',

                        //boxShadow: state.isFocused ? null : null,
                        // boxShadow: 'none',

                        // borderColor: '#9e9e9e',
                        lineHeight: '1',

                        borderRadius: '0.375rem', // Tailwind equivalent: 'rounded-md'

                        //   borderColor: state.isFocused ? '#3b82f6' : '#e5e7eb', // Tailwind: focus:ring-blue-500
                        //   borderColor: state.isFocused ? 'red' : 'green', // Tailwind: focus:ring-blue-500
                        borderColor: state.isFocused ? 'none' : 'none',
                        // borderColor: 'white',
                        // borderColor: 'none',

                        //   boxShadow: state.isFocused ? '0 0 0 2px #3b82f6' : 'none', // Tailwind: focus:ring-blue-500
                        boxShadow: state.isFocused ? 'none' : 'none', // Removes blue outline (ring)
                        outline: 'none', // Ensures no outline shows
                        // border: 'none',
                        // border: state.isFocused ? '1.5px solid #60B3D1' : '1.5px solid #cbd5e1'                                            
                        border: 'none',

                        '&:hover': {
                          color: '#60B3D1'
                          // borderColor: '#3b82f6' // Tailwind hover effect
                          // borderColor: 'red' // Tailwind hover effect
                        },

                      }),

                      valueContainer: (provided, state) => ({
                        ...provided,
                        minHeight: '22px  !important',
                        height: '26px',
                        lineHeight: '1',

                        padding: '0px 6px   !important',
                        // padding:'0 !important',
                        // borderColor: 'white',
                        border: 'none',
                        boxShadow: 'none',   // Remove box shadow on the value container
                      }),

                      input: (provided) => ({
                        ...provided,
                        minHeight: '22px  !important',
                        height: '26px',
                        margin: '0px',
                        padding: '0px',
                        borderColor: 'white',

                        lineHeight: '1',

                        // border: '5px solid red',
                        border: 'none',
                        boxShadow: 'none',
                        outline: 'none',
                        "input:focus": {
                          boxShadow: "none",
                        },
                        '&:focus': {
                          boxShadow: 'none',
                          outline: 'none',
                        },
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
                        backgroundColor: state.isSelected ? '#60B3D1' : styles.color,

                        // borderBottom: '1px solid rgba(0, 0, 0, 0.125)',
                        lineHeight: '1',
                        border: 'none',

                        '&:hover': {
                          color: '#FFF',
                          backgroundColor: '#60B3D1'
                        }
                      }),

                      menuPortal: (base) => ({ ...base, zIndex: 9999 })

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

                    }}

                    // filterOption={filterOptions} // Use the custom filter function
                    filterOption={(option, inputValue) => {
                      const { label, value, city, phone } = option.data;
                      const lowerInput = inputValue.toLowerCase();

                      // Search in label, value, and additionalInfo
                      return (
                        String(value).toLowerCase().includes(lowerInput) ||
                        label.toLowerCase().includes(lowerInput) ||
                        city?.toLowerCase().includes(lowerInput) ||
                        phone?.toLowerCase().includes(lowerInput)
                      );
                    }}

                    onChange={(e) => { HandleInputs(e, 'TId') }}

                    // options={OptionsWithImages}
                    // options={Traders.map((E, I) => { return ({ key: I, value: Number(E.Id), label: E.Title + ';  ' + E.Id + ';  ' + E.City + ';  ' + E.Phone }) })}
                    options={Traders.map((E, I) => { return ({ key: I, value: Number(E.Id), label: E.Title, ID: E.Id, city: E.City, phone: E.Phone, img: E.PicURL }) })}
                  // components={{ Option: CustomOptionWithImages }}

                  />
                  <label for="TId" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    Customer</label>
                </div>
              </div>

              {/* -------------------------------------------------- */}
              {/* ---[ Credit Account ]--- */}
              {/* {AlertRec(AccRecs.AccC,'AccRecs')} */}
              <div className='flex'>
                <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                  <IoCashOutline />
                </span>
                <div className="relative w-full">
                  <select value={AccD[0].AccCode} className="text-end block rounded-e-md px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    name="AccD" id="AccD.AccCode" placeholder="Credit Account Title"
                    // disabled={InputReadOnly}
                    onChange={e => { setOrderSheet({ ...OrderSheet, AccD: [{ AccCode: e.target.value, Title: e.target.options[e.target.selectedIndex].text }] }) }}
                  >

                    {(AccRecs.AccD.length > 0)
                      ? AccRecs.AccD.map((E) => {
                        return (<option value={E.Code} >{E.Title} </option>)
                      })
                      : ''
                    }
                  </select>

                  {/* <input type="text" id="Rem" name="Rem" className="block rounded-e-md px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="" value={Rem} maxLength={30} onChange={(e) => HandleInputs(e)} /> */}
                  <label for="AccD" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    From Account Head/Title</label>
                </div>
              </div>




              {/* -------------------------------------------------- */}
              {/* ---[ Input Desc ]--- */}
              <div className='flex'>
                <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                  <GrTextAlignFull />
                </span>
                <div className="relative w-full">
                  <input type="text" id="Desc" name="Desc" className="text-end block rounded-e-md px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="" value={Desc} maxLength={30} onChange={(e) => HandleInputs(e)} />
                  <label for="Desc" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    Voucher Description</label>
                </div>
              </div>

              {/* ---[ Input Rem ]--- */}
              <div className='flex'>
                <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                  <TbTextWrapDisabled />
                </span>
                <div className="relative w-full">
                  <input type="text" id="Rem" name="Rem" className="text-end block rounded-e-md px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="" value={Rem} maxLength={30} onChange={(e) => HandleInputs(e)} />
                  <label for="Rem" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    Rem</label>
                </div>
              </div>


              {/* -------------------------------------------------- */}
              {/* ---[ Input VAmount ]--- */}
              <div className='flex'>
                <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                  <TbCurrencyReal />
                </span>
                <div className="relative w-full">

                  <NumberFormat value={VAmt} name='VAmt' id="VAmt" thousandSeparator={true} thousandsGroupStyle="lakh"
                    // className="w-full text-end border-b-2  bg-gray-50 rounded-e-md block border-0 outline-none focus:border-0 focus:outline-none"
                    className="text-end block rounded-e-md px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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

                  {/* <input type="text" id="VAmt" name="VAmt" className="text-end block rounded-e-md px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder="" value={VAmt} onChange={(e) => HandleInputs(e)} onFocus={handleFocus} /> */}
                  <label for="VAmt" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    <span className=''>Voucher Amount</span>
                    {/* <span className=' hidden md:block'>VAmt</span> */}
                  </label>
                </div>
              </div>

              {/* -------------------------------------------------- */}

            </div>


          </div>
          {/* </div> */}

        </div>

      </div>



      {/* =================================================================================== */}
      {/* =====[    END   --- Main Prg /CARD BODY start            ]===================================  */}
      {/* =================================================================================== */}

    </div>

        {/* ==========Start===========  MODAL for Deletion =========================*/}
        {/*     MODAL for Deletion                                                  */}
        {/* ==========Start===========  MODAL for Deletion =========================*/}
        <MyCustomModal isOpen={ShowDeleteModal} onClose={() => setShowDeleteModal(false)} ShowCloseButton={true} >

            <div className="card w-full md:w-[600px] ">
                <div className="card-header h-14 px-2 flex  justify-between items-center bg-gradient-to-r from-red-700 ">
                    <div className='text-3xl'>Are You Sure To DELETE This Record ?</div>
                    {/* <button onClick={() => setShowDeleteModal(false)}>&times;</button> */}
                </div>

                <div className="card-body py-4 md:px-4 text-left w-full " style={{}}>

                <div>
                    <table><tbody>
                      <tr>
                        <th> <span className='text-lg font-bold  ' >Distributor:  </span></th>
                        <td> <span className='fs- ' > {OrderSheet?.RefTrader?.Title} - [ {OrderSheet?.TId} ]</span> </td>
                        {/* {OrderSheet.RefTrader.Title && <td> <span className='fs- ' > [ {OrderSheet.RefTrader.Code} ]   - {OrderSheet.RefTrader.Title}</span> </td>} */}
                        {/* <td> <span className='fs- ' > [ {OrderSheet.RefTrader.Code} ]   - {OrderSheet.RefTrader.Title}</span> </td> */}
                      </tr>

                      <tr>
                        <th> <span className='text-lg font-bold fs- ' >From Account:  </span></th>
                        {/* {OrderSheet.AccC[0].Title && <td> <span className='fs- ' > {OrderSheet.AccC[0].Title}   </span> </td>} */}
                        <td> <span className='fs- ' > {OrderSheet?.AccD[0]?.Title}   </span> </td>
                      </tr>

                      <tr>
                        <th> <span className='text-lg font-bold  ' >Desciption:  </span></th>
                        <td> <span className='fs- ' > {OrderSheet.Desc}   </span> </td>
                      </tr>

                      <tr>
                        <th> <span className='text-lg font-bold  ' >Detail/ Remarks:  </span></th>
                        <td> <span className='fs- ' > {OrderSheet.Rem}   </span> </td>
                      </tr>

                      <tr>
                        <th> <span className='text-lg font-bold  ' >Voucher Amount:  &ensp;  </span></th>
                        <td> <span className='fs- ' ><NumberFormat value={OrderSheet.VAmt} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" decimalScale={2}/>   </span> </td>
                      </tr>

                    </tbody></table>
                  </div>

                    </div>

                <div className="card-footer h-14 px-2 flex gap-4  justify-center items-center bg-gradient-to-r from-teal-600 ">
                    <button className="p-2 bg-blue-600 text-white rounded" onClick={() => setShowDeleteModal(false)}>
                        No. Do Not Delete
                    </button>

                    <button className="p-2 bg-red-500 text-white rounded" onClick={() => { setShowDeleteModal(false); HandleBtnDelete(true) }}>
                        Delete This Record
                    </button>
                </div>
            </div>
        </MyCustomModal>
        {/* ===========END==========  MODAL for Deletion =========================*/}

        {/* ---------------------------- */}

  </>)
}