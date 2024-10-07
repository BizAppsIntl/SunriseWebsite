import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'

import axios from 'axios'
// import '../Create.css'

import Moment from 'moment'
// Two files needed for datepicker
import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'

import Select from 'react-select'
import SelectCreatable from 'react-select/creatable';

//Two file needed for toasify
import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import defaultIcon from '../../../ImagesAdminPanel/default/Customers.png'


// [.....................START: Calls Prgs: ..................................................]
import SuppliersCardsGroup from '../Components/SuppliersCardsGroup'
// [.....................END: Calls Prgs: ..................................................]

import { AlertRec, SetPadLeftZero, DispAPIInAlert, DispArrayInAlert, DispRecInAlert, AlertConfirm, GetNewID, DateTimeStamp, Str2TitleCase } from '../../../../StdLib'

import ImgMale from '../../../ImagesAdminPanel/default/Male.png'
import ImgFemale from '../../../ImagesAdminPanel/default/Female.png'
import { BsGenderAmbiguous } from 'react-icons/bs'

import { BsSortNumericUpAlt } from 'react-icons/bs'
import { BsSortNumericDownAlt } from 'react-icons/bs'
import { FaSave, FaUserPlus, FaUserEdit, FaUsers, FaUserCog, FaUserSlash, FaFolder, FaHouseUser } from 'react-icons/fa'
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
import { useCtxMainContextHook } from '../../../../CtxMain'

//Table: TranM - { VID, VNo, VDte, VCat, TId, Desc, Rem, VQtyTxt, VAmt, RefVID, RefVNo, RefVDte, RefVCat, RefVAmt, RecType, RecStatus, Priority }
//Table: TranR - { VID, VNo, VDte, VCat, AccType, AccCode, Title, Desc, Rem, VAmt, }
//Table: TranD - { Id/Auto, VID, VNo, VDte, VCat, TId, PId, Unit, Qty, Price }

//Table: Item - { Id/Auto, Code, Title, TitleU, Desc, Rem, CatCode, TId, PicURL, Unit, QtyDef, QtyInc, QtyStep, Price, CrntBal, QtyMin, QtyMax, RecType, RecStatus, Priority, EntryBy, EntryDte
//Table: Category - { Code, Title, Desc, Rem, RecType, RecStatus, Priority, EntryBy, EntryDte}

//Table: AccRec - {Code, Title, Desc, Rem, PreBal, CrntBal, RecType, RecStatus, Priority, EntryBy, EntryDte}
//Table: Doctor - {Id/Auto, Code, RecType, RecStatus, Priority, Title, TitleU, Gender, Desc, Rem, Address, City, Phone, Contact1, ContactPh1, Contact2, ContactPh2, PicURL, CrntBal, EntryBy, EntryDte}
// document.title = process.env.REACT_APP_API_URL + 'Cat'

const _VCat = "2211"
const _PrgID = "2211"
const _PrgTitle = "Customer Record Entries"


const ToastWaitTime = 5000
// ==================[  useContext and useReducer Hooks  ]=====================


// ======= GET UNIQUE LIST
const uniqueBy = (arr, prop) => {
  const result = arr.reduce((a, d) => {
    if (!a.includes(d[prop])) { a.push(d[prop]); }
    return a;
  }, []);

  // AlertRec (result, 'Unique results ')
  return result
}
//  var categories = uniqueBy(array, 'category')
//  console.log(ages); //['General Questions', 'Pricing'  ]

// An elegant solution using ES6:
const GetUniqueList = (ArrOfObj, field) => {
  const list = ArrOfObj.map(x => x[field]);
  return ([...new Set(list)])
}

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
//                                  P R G  ---   START
// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
export default function EntryFormSplr(props) {
  //destructuring    props
  // const { VoucherMode, CrntRec, Categories, HandleInputs, HandleInputsMode, HandleBtnVoucherMode} = props
  const { CrntRec, VoucherMode, HandleBtnVoucherMode } = props
  // {AlertRec(CrntRec, 'Record Rcvd Update/Addition')} 

  const { CtxMainState, CtxMainDispatch } = useCtxMainContextHook()
  const { _DocsRef, _Patients } = CtxMainState


  const [OrderSheet, setOrderSheet] = useState(CrntRec ? CrntRec : '')
  const [Need2Refresh, setNeed2Refresh] = useState(false);

  // const [CitiesList, setCitiesList] = useState(uniqueBy(_DocsRef.Data, 'City') || []);
  const [CitiesList, setCitiesList] = useState(GetUniqueList(_Patients.Data, 'City') || []);
  const [TempShow, setTempShow] = useState(false);   //for Auto Focus

  // const [selectedImage, setSelectedImage] = useState(null);
  // const [ImgURL, setImgURL] = useState('')
  const DefaultImgURL = require('../AssetsLocal/Images/Default.jpg')

  // CrntRec received is
  // VID,  VNo,  VDte,  VCat,  Desc,  TId, VQtyTxt,  VAmt
  // AccC  :   [{…}]   RefAcc includes
  // AccD  :   [{…}]   RefAcc includes
  // RefTrader:  {Id: 1, Code: 'MKT       ', Title: 'Local Market                                      ', TitleU: 'لوکل مارکیٹ                                       ', Desc: 'Local Market in Area                              ', …}
  const { Id, Code, Title, TitleU, Gender, Desc, Rem, RefType, RefShare, Address, City, Pic, PicURL, PreBal, CrntBal, Phone, Contact1, ContactPh1, Contact2, ContactPh2, RecType, RecStatus, Priority, EntryBy, EntryDte } = OrderSheet

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


  // ==================[  Handle Printing  ]=====================
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



  // ==================[  Fn: Handle Inputs  ]=====================

  // const handleFocus = (event) => event.target.select();
  const HandleFocusIn = (obj, focusState = 'OUT') => {
    // setIsLoading(true);
    // if (focusState==='IN')
    setTimeout(() => {


      // setIsLoading(false);
      // setOptions((prev) => [...prev, newValLabel_Option]);
      // setOrderSheet({ ...OrderSheet, RefType: '1' }) 
      setTempShow(true)
    }, 1000);
  }
  const HandleFocusOut = (obj, focusState = 'OUT') => {
    setTimeout(() => {


      // setIsLoading(false);
      // setOptions((prev) => [...prev, newValLabel_Option]);
      // setOrderSheet({ ...OrderSheet, RefType: '0' }) 
      // setOrderSheet(p => ({ ...p, RefType: '0' })) 
      setTempShow(false)
    }, 1000);

  }

  const HandleDefaultCity = (city = '') => {
    if (city === '' && CitiesList.length <= 0) return

    // const temp = Customers.at(-1).Id   //Last
    //const temp = CitiesList[0] 
    //setOrderSheet({ ...OrderSheet, City: temp })

    // const temp= city || CitiesList[0] 
    // console.log ("city || CitiesList[ ???????.includes('Mul') ] || CitiesList[2] ", CitiesList,  city ,CitiesList.includes('Mul') ,CitiesList[ CitiesList.includes('Mul') ] , CitiesList[2] )
    const temp = city || CitiesList.find(e => e.includes('Multan')) || CitiesList[0] || ''
    // AlertRec(Customers, 'Setting Default Customers :' + temp)
    setOrderSheet({ ...OrderSheet, City: temp })

    return temp
  }

  // const Input = (props) => <input type="text" value="Some something" onFocus={handleFocus} />

  const HandleInputs = (e) => {
    // let key = '', value = '';
    // console.log('\n\n\nInput Done:', e.target.name, e.target.value,'\n',e);
    //  alert('Key: '+e.target.name + '    value: ' + e.target.value)
    //  AlertRec(e,'Rcvd Input as e:')
    // const key = e.target.name; const value = e.target.value;

    setOrderSheet({ ...OrderSheet, [e.target.name]: e.target.value });

  }
  const HandleSelectInputs = (e, obj) => {
    // let key = '', value = '';
    // console.log('\n\n\nInput Done:', obj, e.label, e.value," e.label.indexOf(';'): ",e.label.indexOf(';'));

    if (e.label.indexOf(';') >= 0)
      setOrderSheet({ ...OrderSheet, [obj]: e.label.substr(0, e.label.indexOf(';')) });

    else
      setOrderSheet({ ...OrderSheet, [obj]: e.label });
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
  // ------------- AddNew/Create RECORD ----------------
  // --------------------------------------------------------------------------------------------------------------------
  const CallDotAPI2SaveAddNew = async () => {
    // ------------- CREATE ADDNEW RECORD ----------------

      //  AlertRec(OrderSheet, 'RAW-Data Ready to ADD in Database')
    const { Id, Code, Title, TitleU, Gender, Desc, Rem, RefType, Address, City, Pic, PicURL, CrntBal, Phone, Contact1, ContactPh1, Contact2, ContactPh2, RecType, RecStatus, Priority, EntryBy, EntryDte } = OrderSheet

    if (Code.trim() === '') {
      toast.error('Category Code (Code) is EMPTY. \nThis is Mandatory for Reference.\nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }

    if (Title.trim() === '') {
      toast.error('Customer Name (Name) is EMPTY. \nThis is Mandatory for Reference.\nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }

    if (City.trim() === '') {
      toast.error('Customer City (City) is EMPTY. \nThis is Mandatory for Reference.\nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }

    const Data2SendInDatabase =
    {
      "Id": 0,
      "TType": 'C',           //TType.substr(0, 1),
      "Code": Code.substr(0, 10),
      "Title": Str2TitleCase(Title.substr(0, 50)),
      "TitleU": TitleU.substr(0, 50),

      // "Gender": Gender.substr(0, 1),
      "Desc": Desc.substr(0, 50),
      "Rem": Rem.substr(0, 50),

      "RecType": RecType.substr(0, 10),
      "RecStatus": RecStatus.substr(0, 10),
      "Priority": Priority.substr(0, 10),

      "Address": Address.substr(0, 50),
      "City": Str2TitleCase(City.substr(0, 50)),
      "Phone": Phone.substr(0, 50),
      "Contact1": Contact1.substr(0, 50),
      "ContactPh1": ContactPh1.substr(0, 50),
      "Contact2": Contact2.substr(0, 50),
      "ContactPh2": ContactPh2.substr(0, 50),

      //"PicURL": PicURL.substr(0, 50),
      "PicURL": (Pic ? Title.replace(/ /g, '').substr(0, 10) + DateTimeStamp() + '.png' : ''),

      "PreBal": 0,        //Number(PreBal),
      "CrntBal": 0,       //Number(CrntBal),       // Not allowed in update

      EntryBy: '',
      EntryDte: ''
    }

    //  if (!AlertConfirm(Data2SendInDatabase, 'Add New Record ?: ' + process.env.REACT_APP_API_URL)) return


    //=====[   READY to send data in Database   ]========  
    //-------------------------------------------------------

    fetch(process.env.REACT_APP_API_URL + 'Traders', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(Data2SendInDatabase)
    })
      .then(res => res.json())
      .then(
        (result) => {
          // alert('Add-New Action Success-Result: ' + result);
          // AlertRec(result)
          HandleBtnCancel(true)
          //toast.success('Record Saved Successfully: ', { theme: 'colored', autoClose: ToastWaitTime, })

          //-------------------------------------------------------
          //[ Part -2/2 >>> Image uploading ]
          if (Pic) {
            // var ext =  fileName.split('.').pop();
            // const FILENAME = VNO_NEW + '.jpg'    //+ '.' + PicURL.split('.').pop()
            // setPhotofilename(e.target.files[0].name);

            const formData = new FormData();
            //     // formData.append('username', 'Chris');
            //     // formData.append('userpic', myFileInput.files[0], 'chris1.jpg');
            // for (let [key, value] of fd.entries()) { console.log(key, value);}
            formData.append("ImageFile", Pic, Data2SendInDatabase.PicURL);

            fetch(process.env.REACT_APP_API_URL + 'Traders/SaveFile', { method: 'POST', body: formData })
              .then(res => res.json())
              .then((result) => {
                //alert('Photo Successfully Saved: ' + Data2SendInDatabase.PicURL + '\n' + "Response: " + result)
                toast.success('Record Saved Successfully:* [' + Title + ']', { theme: 'colored', autoClose: ToastWaitTime, position: "top-left"})

              }, (error) => { alert('ERROR--- Photo Uploading is Failed: ' + Data2SendInDatabase.PicURL); Data2SendInDatabase.PicURL = '' })
          }

          //if not (Pic) then else
          else {
            toast.success('Record Saved Successfully: [' + Title + ']', { theme: 'colored', autoClose: ToastWaitTime, position: "top-left" })
          }
          //-------------------------------------------------------

          //toast.success('Record Saved Successfully: Bypassing Image Section', { theme: 'colored', autoClose: ToastWaitTime, })
        }

        // , (error) => { alert('ERROR--- Add-New Action Result: ' + 'Failed'); })
        , (error) => { toast.error('ERROR--- Failed, Add-New Action Result: ' + error, { theme: 'colored', autoClose: ToastWaitTime, }) }
      )

    // setNeed2Refresh(!Need2Refresh)
    HandleBtnCancel(true)
  }


  // =======================================================================
  // ==================[  Fns: DATABASE/ API Handling ]=====================
  // =======================================================================

  // ------------- Update RECORD ----------------
  const CallDotAPI2SaveUpdate = async () => {

    const { Id, Code, Title, TitleU, Gender, Desc, Rem, RefType, Address, City, Pic, PicURL, PicURL4Edit, CrntBal, Phone, Contact1, ContactPh1, Contact2, ContactPh2, RecType, RecStatus, Priority, EntryBy, EntryDte } = OrderSheet

    // if (Code.trim() == '') {
    //   toast.error('Category Code (Code) is EMPTY. \nThis is Mandatory for Reference.\nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
    //   return
    // }

    if (Title.trim() === '') {
      toast.error('Customer Name (Name) is EMPTY. \nThis is Mandatory for Reference.\nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }

    if (City.trim() === '') {
      toast.error('Customer City (City) is EMPTY. \nThis is Mandatory for Reference.\nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }

    const Data2SendInDatabase =
    {
      "Id": Id,
      "TType": 'C',           //TType.substr(0, 1),
      "Code": Code.substr(0, 10),
      "Title": Str2TitleCase(Title.substr(0, 50)),
      "TitleU": TitleU.substr(0, 50),

      "Desc": Desc.substr(0, 50),
      "Rem": Rem.substr(0, 50),

      "RecType": RecType.substr(0, 10),
      "RecStatus": RecStatus.substr(0, 10),
      "Priority": Priority.substr(0, 10),

      "Address": Address.substr(0, 50),
      "City": Str2TitleCase(City.substr(0, 50)),
      "Phone": Phone.substr(0, 50),
      "Contact1": Contact1.substr(0, 50),
      "ContactPh1": ContactPh1.substr(0, 50),
      "Contact2": Contact2.substr(0, 50),
      "ContactPh2": ContactPh2.substr(0, 50),

      //"PicURL": PicURL.substr(0, 50),
      "PicURL": (Pic ? Title.replace(/ /g, '').substr(0, 10) + DateTimeStamp() + '.png' : PicURL),

      "PreBal": Number(PreBal),
      "CrntBal": Number(CrntBal),       // Not allowed in update

      EntryBy: '',
      EntryDte: ''
    }

    // if (!AlertConfirm(Data2SendInDatabase, 'UPDATE This Record ?: ' + process.env.REACT_APP_API_URL)) return

    //===================================================  
    //=====[   READY to Update/send data in Database   ]========  
    //===================================================  



    //[ Part -1/2 >>> Image uploading ]
    //-------------------------------------------------------
    // alert('Yes Image is present for Update')
    if (Pic) {

      // Data2SendInDatabase.PicURL= PicURL4Edit ? PicURL4Edit  : Title.replace(/ /g, '').substr(0, 10) + DateTimeStamp() + '.png' 
      // Data2SendInDatabase.PicURL = Title.replace(/ /g, '').substr(0, 10) + DateTimeStamp() + '.png'

      const formData = new FormData();
      //     // formData.append('username', 'Chris');
      //     // formData.append('userpic', myFileInput.files[0], 'chris1.jpg');
      // for (let [key, value] of fd.entries()) { console.log(key, value);}
      formData.append("ImageFile", Pic, Data2SendInDatabase.PicURL);

      fetch(process.env.REACT_APP_API_URL + 'Traders/SaveFile', { method: 'POST', body: formData })
        .then(res => res.json())
        .then((result) => {
          // alert('Photo Successfully Saved: ' + Data2SendInDatabase.PicURL + '\n' + "Response: " + result)
          //setImageSrc('')
          // GetRecs() //Update Fresh Records
        }, (error) => { alert('ERROR--- Photo Uploading is Failed: ' + Data2SendInDatabase.PicURL); Data2SendInDatabase.PicURL = '' })
    }

    // alert('Previous Image is present for Update')
    if ((!PicURL && PicURL4Edit) || (Pic && PicURL4Edit)) {
      //Name Removed && Old-Still-present then Remove Image of Old-Still-present name
      //Destroy Old Image [ Part ----- >>> Delete Image ]

      fetch(process.env.REACT_APP_API_URL + 'Traders/RemoveFile/' + PicURL4Edit, { method: 'DELETE' })
        .then(res => res.json())
        .then((result) => {
          // console.log('result: ', result);
          // alert('DELETE Old-Photo Action Success-Result: ' + result);
        }
          , (error) => { alert('ERROR--- DELETE Photo Action Result: ' + 'Failed'); })
    }


    //[ Part -2/2 >>> Data uploading ]
    //-------------------------------------------------------
    fetch(process.env.REACT_APP_API_URL + `Traders/${Id}`, {
      method: 'PUT',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(Data2SendInDatabase)
    })
      .then(res => res.json())
      .then((result) => {
        // alert('Update Action Success-Result: ' + result);
        // GetRecs()
        toast.success('Record Updated Successfully: [' + Title + ']', { theme: 'colored', autoClose: ToastWaitTime, position: "top-left" })
        HandleBtnCancel(true)
      }
        , (error) => { toast.error('ERROR--- Failed, Update Action Result: ' + error, { theme: 'colored', autoClose: ToastWaitTime, }) }
      )

    //History.push("/Home");
    // setNeed2Refresh4M(!Need2Refresh4M)
    HandleBtnCancel(true)
  }



  // --------------------------------------------------------------------------------------------------------------------
  // ------------- Delete  RECORD ----------------
  // --------------------------------------------------------------------------------------------------------------------
  const CallDotAPI2Delete = async () => {
    const { Id, Title, PicURL, PicURL4Edit } = OrderSheet
    //=====[   READY to Delete data from Database   ]========  
    //-------------------------------------------------------
    // if (!AlertConfirm(OrderSheet, 'Delete This Record ?: ' + process.env.REACT_APP_API_URL)) return

    fetch(process.env.REACT_APP_API_URL + `Traders/${Id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(
        (result) => {                //alert('DELETE Action Success-Result: ' + result);
          toast.warn('Record Deleted Successfully: ', { theme: 'colored', autoClose: ToastWaitTime, })
          HandleBtnCancel(true)

          //Destroy Old Image [ Part 2/2 ----- >>> Delete Image ]
          //-------------------------------------------------------
          if (PicURL4Edit) {
            fetch(process.env.REACT_APP_API_URL + 'Traders/RemoveFile/' + PicURL4Edit, { method: 'DELETE' })
              .then(res => res.json())
              .then((result) => {
                // alert('DELETE Old-Photo Action Success-Result: ' + result);
                //toast.warn('Record Deleted Successfully: W/- Photo', { theme: 'colored', autoClose: ToastWaitTime, })
              }
                , (error) => { alert('ERROR--- DELETE Photo Action Result: ' + 'Failed'); })
          }

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
      {/* <div className='card d-flex  m-0 p-1 flex-column text-start ' style={{ width: '100%', fontSize: '12px', background: '#e0e0e0', borderRadius: '5px' }}> */}
      <div className='card d-flex  m-0 p-1 flex-column  ' style={{ width: '100%', fontSize: '12px', background: '#e0e0e0', borderRadius: '5px' }}>

        {/* =================================================================================== */}
        {/* =====[    Main Prg /CARD HEADDER start            ]===========================================  */}
        {/* =================================================================================== */}
        <div className='card-header d-flex gap-1 py-1 justify-content-between ' style={{ background: '#bebebe' }}>
          <span className='fs-6'><strong>Customer's Detail</strong></span>

          {/* <button className='btn btn-sm btn-info py-0 px-1  ms-auto' style={{ height: '25px' }} onClick={() => HandlePrinting()}>
            <span style={{ fontSize: 'smaller' }}>Print</span> <GrPrint />
          </button> */}

          <button className='btn btn-sm btn-warning ms-auto py-0 px-1' style={{ height: '25px' }} onClick={() => { HandleBtnReset() }}>
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

        <div className="card-body d-flex flex-column p-0 mt-1 gap-1">

          {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-= [        ROW  1/2       ]-=-=-=-=-=-=-=-=-=-=-=-=-=-= */}

          <div className="d-flex p-0 gap-1 m-0 justify-content-between ">
            {/* ----------------------- [        ROW  1/2,  Col 1/3       ]----------------------------------- */}
            <div className="card p-1" style={{ width: "38%" }} >

              <div className='card-header d-flex gap-1 px-0 py-1 mb-2 ' >

                {/* ---[ Input ID ]--- */}
                {/* <div className="d-flex  align-items-center text-primary" style={{ width: '40%' }} > */}
                <div className="d-flex  mt-0 text-primary" style={{ width: '40%' }} >
                  <div className="input-group-text  text-primary fs-4" style={{ padding: '8px 8px' }} ><ImListNumbered /></div>
                  <div className="form-floating"  >
                    <input type="text" value={Id} name="Id" className="form-control  text-end" placeholder="Code" onChange={(e) => HandleInputs(e)} />
                    <label htmlFor="Id"  >Ref Id</label>
                  </div>
                </div>

                {/* ---[ Input Code ]--- */}
                <div className="d-flex mt-0 " style={{ width: '60%' }} >
                  <div className="input-group-text"><MdLowPriority /></div>
                  <div className="form-floating w-100" >
                    <input type="text" value={Code} className="form-control  text-end" name='Code' placeholder="Code" onChange={(e) => HandleInputs(e)} />
                    <label htmlFor="Code"  >Smart Code</label>
                  </div>
                </div>

              </div>


              {/* ---[ Input Title ]--- */}
              <div className="d-flex mt-3">  {/* <div className="input-group"> */}
                <div className="input-group-text"><TbListDetails /></div>
                <div className="form-floating w-100" >
                  <input type="text" value={Title} className="form-control  text-end" name='Title' placeholder="Title" onChange={(e) => HandleInputs(e)} />
                  <label htmlFor="Title"  >Title</label>
                </div>
              </div>



              {/* ---[ Input TitleU ]--- */}
              {/* <div className="d-flex mt-1">  
                <div className="input-group-text"><TbListDetails /></div>
                <div className="form-floating w-100" >
                  <input type="text" value={TitleU} className="form-control fs-4 text-end" name='TitleU' placeholder="Title" onChange={(e) => HandleInputs(e)} />
                  <label htmlFor="TitleU"  >نام</label>
                </div>
              </div> */}


              {/* ---[ Input Desc ]--- */}
              <div className="d-flex mt-3">  {/* <div className="input-group"> */}
                <div className="input-group-text"><GrTextAlignFull /></div>
                <div className="form-floating w-100" >
                  <input type="text" value={Desc} className="form-control  text-end" maxLength={50} name='Desc' placeholder="Desc" onChange={(e) => HandleInputs(e)} />
                  <label htmlFor="Desc"  >Description</label>
                </div>
              </div>

              {/* ---[ Input Remarks ]--- */}
              <div className="d-flex mt-1">  {/* <div className="input-group"> */}
                <div className="input-group-text"><TbTextWrapDisabled /></div>
                <div className="form-floating w-100" >
                  <input type="text" value={Rem} className="form-control  text-end" maxLength={50} name='Rem' placeholder="Rem" onChange={(e) => HandleInputs(e)} />
                  <label htmlFor="Rem"  >Remarks</label>
                </div>
              </div>






            </div>





            {/* ----------------------- [        ROW  1/2,  Col 2/3       ]----------------------------------- */}
            <div className="card p-1" style={{ width: "38%" }} >


              {/* ---[ Input Phone ]--- */}
              <div className="d-flex mt-1">  {/* <div className="input-group"> */}
                <div className="input-group-text"><TbTextWrapDisabled /></div>
                <div className="form-floating w-100" >
                  <input type="text" value={Phone} className="form-control  text-end" name='Phone' placeholder="Phone" onChange={(e) => HandleInputs(e)} />
                  <label htmlFor="Phone"  >Phone</label>
                </div>
              </div>

              {/* ---[ Input Address ]--- */}
              <div className="d-flex mt-2">  {/* <div className="input-group"> */}
                <div className="input-group-text"><GrTextAlignFull /></div>
                <div className="form-floating w-100" >
                  <input type="text" value={Address} className="form-control  text-end" name='Address' placeholder="Address" onChange={(e) => HandleInputs(e)} />
                  <label htmlFor="Address"  >Address</label>
                </div>
              </div>

              {/* ---[ Input  City ]--- */}
              {/* <div className="d-flex mt-1">  
                <div className="input-group-text"><GrTextAlignFull /></div>
                <div className="form-floating w-100" >
                  <input type="text" value={City} className="form-control  text-end" name='City' placeholder="City" onChange={(e) => HandleInputs(e)} />
                  <label htmlFor="City"  >City</label>
                </div>
              </div> */}

              {/* ---[ Input  City ]--- */}
              <div className="d-flex mt-2">  {/* <div className="input-group"> */}
                <div className="input-group-text"><GrTextAlignFull /></div>

                <div className="d-flex w-100 flex-column align-items-stretch w-100 border border-1 rounded-2 " style={{ width: '70%' }}>
                  <span className='px-3' style={{ fontSize: 'smaller' }}  >City Name</span>
                  {/* <input type="text" value={Title} className="form-control  text-end" name='Title' placeholder="Title" onChange={(e) => HandleInputs(e)} /> */}
                  <SelectCreatable className='w-100 '
                    // defaultValue={VoucherCart.DocRefId ? VoucherCart.DocRefId : _DocsRef.Data[0].Id}
                    value={City
                      ? { value: 0, label: City }
                      // : { value: _Patients.Data[0].Id, label: 'DefaultPatient: ' + _Patients.Data[0].Title }
                      // : _DocsRef.Data[0].Id
                      //: ''
                      : HandleDefaultCity()

                    }

                    name="City"
                    placeholder="Select City"
                    // isClearable={true}
                    // isDisabled={isLoading}
                    // isLoading={isLoading}
                    isRtl={false}

                    // styles={customStyles}  
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        background: '#fff',
                        minHeight: '22px  !important',
                        height: '22px',
                        marginTop: '0px',
                        padding: '0px  !important',

                        // boxShadow: state.isFocused ? null : null,
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
                        margin: '0px  !important',
                        padding: '0px  !important',
                        borderColor: 'white',
                      }),

                      indicatorSeparator: state => ({
                        ...state,
                        marginTop: '2px',
                        marginBottom: '3px',
                        // display: 'none',

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

                        // '&:hover': {
                        //     color: '#FFF',
                        //     backgroundColor: '#60B3D1'
                        // }
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

                    }}

                    //onFocus={this.handleFocus}
                    // onBlur={this.handleBlur}
                    //onFocus={HandleFocusIn('Title','IN')}
                    // onBlur={HandleFocusOut('Title','OUT')}

                    // onChange={(newValue) => setValue(newValue)}
                    onChange={(e) => HandleSelectInputs(e, 'City')}
                    // onChange={(e) => { HandleInputsVoucherHeader(e, 'DocRefId') }}
                    // onCreateOption={handleCreate}

                    // options={_DocsRef.Data.filter(r => r.City ).map((E, I) => { return ({ key: I, value: Number(E.Id), label: E.City }) })}
                    // options={_DocsRef.Data
                    // .filter((r, idx) => _DocsRef.Data.indexOf(r) === idx)
                    // .map((E, I) => { return ({ key: I, value: I, label: E }) })}

                    options={CitiesList.map((E, I) => { return ({ key: I, value: I, label: E }) })}
                  />
                </div>
              </div>


              {/* ---[ Input Contact1 ]--- */}
              <div className="d-flex mt-3">  {/* <div className="input-group"> */}
                <div className="input-group-text"><GrTextAlignFull /></div>
                <div className="form-floating w-100" >
                  <input type="text" value={Contact1} className="form-control  text-end" name='Contact1' placeholder="Contact1" onChange={(e) => HandleInputs(e)} />
                  <label htmlFor="Contact1"  >Contact Person</label>
                </div>
              </div>

              {/* ---[ Input ContactPh1 ]--- */}
              <div className="d-flex mt-1">  {/* <div className="input-group"> */}
                <div className="input-group-text"><GrTextAlignFull /></div>
                <div className="form-floating w-100" >
                  <input type="text" value={ContactPh1} className="form-control  text-end" name='ContactPh1' placeholder="ContactPh1" onChange={(e) => HandleInputs(e)} />
                  <label htmlFor="ContactPh1"  >Contact Phone</label>
                </div>
              </div>


              {/* ---[ Input Contact2 ]--- */}
              {/* <div className="d-flex mt-3">  
                <div className="input-group-text"><GrTextAlignFull /></div>
                <div className="form-floating w-100" >
                  <input type="text" value={Contact2} className="form-control  text-end" name='Contact2' placeholder="Contact2" onChange={(e) => HandleInputs(e)} />
                  <label htmlFor="Contact2"  >Contact Person</label>
                </div>
              </div> */}

              {/* ---[ Input ContactPh2 ]--- */}
              {/* <div className="d-flex mt-1">  
                <div className="input-group-text"><GrTextAlignFull /></div>
                <div className="form-floating w-100" >
                  <input type="text" value={ContactPh2} className="form-control  text-end" name='ContactPh2' placeholder="ContactPh2" onChange={(e) => HandleInputs(e)} />
                  <label htmlFor="ContactPh2"  >Contact Phone</label>
                </div>
              </div> */}




            </div>

            {/* ----------------------- [        ROW  1/2,  Col 3/3       ]----------------------------------- */}
            <div className="card p-1" style={{ width: "24%" }} >

              <div className="card p-1"  >

                {/* HEADER of -----Photo Section------  */}
                <div className=' d-flex justify-content-between align-items-center' style={{ height: '30px' }}>
                  <label htmlFor='inputPhoto' id='SelectPhoto' className='btn btn-info m-0 p-0 btn-sm' >
                    Select Photo
                  </label>

                  {/* {(selectedImage) && <label className=' m-0 p-0 fs-3 text-danger'
                        onClick={() => { setSelectedImage(null); setImgURL(null) }}> <FiDelete /> */}
                  {(OrderSheet.PicURL || OrderSheet.Pic) && <label className=' m-0 p-0 fs-3 text-danger'
                    // onClick={() => { setOrderSheet({ ...OrderSheet, PicURL: '' }); setImgURL(null) }}> <FiDelete />
                    onClick={() => {
                      (OrderSheet.Pic)
                        ? setOrderSheet({ ...OrderSheet, Pic: '', PicURL: '' })
                        : setOrderSheet({ ...OrderSheet, PicURL: '' })
                    }}>
                    <FiDelete />
                  </label>}
                </div>

                {/* FRAME-----Photo Section------  */}
                <div className='d-flex  mt-3 flex-column justify-content-center align-items-center '>

                  {/* <input type="file" name="inputPhoto" id='inputPhoto' */}
                  <input type="file" hidden name="inputPhoto" id='inputPhoto'
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                      // setImgURL(URL.createObjectURL(event.target.files[0]))
                      // setOrderSheet({ ...OrderSheet, PicURL: event.target.files[0].name, pic: URL.createObjectURL(event.target.files[0]) });
                      // setOrderSheet({ ...OrderSheet, PicURL: event.target.files[0].name, Pic: event.target.files[0] });
                      setOrderSheet({ ...OrderSheet, Pic: event.target.files[0] });
                    }} />

                  {/* Working {selectedImage4E &&<img src={URL.createObjectURL(selectedImage4E)} alt="not found" width={"200px"} />} */}
                  {/* {<img src={(OrderSheet.PicURL) ? ImgURL : DefaultImgURL} alt="Image not found" width={"100%"} />} */}

                  {/* {<img src={(OrderSheet.PicURL) ? URL.createObjectURL(OrderSheet.Pic) : DefaultImgURL} alt="Image not found" width={"100%"} />} */}
                  {/* {OrderSheet.PicURL} */}

                  {<img alt="Pic not found" width={"100%"} height={'100px'}
                    src={(OrderSheet.Pic)
                      ? URL.createObjectURL(OrderSheet.Pic)
                      : (OrderSheet.PicURL)
                        ? process.env.REACT_APP_API_URL + 'Traders/GetFile/' + OrderSheet.PicURL
                        : DefaultImgURL} />}
                </div>
                {/* END-----Photo Section------  */}

              </div>



              <div className="d-flex flex-column gap-1 mt-4">

                {/* ---[ Input Status ]--- */}
                <div className="d-flex mt-0 ">  {/* <div className="input-group"> */}
                  <div className="input-group-text"><HiStatusOffline /></div>
                  <div className="form-floating w-100" >
                    <input type="text" value={RecStatus} disabled className="form-control  text-end" name='RecStatus' placeholder="RecStatus" onChange={(e) => HandleInputs(e)} />
                    <label htmlFor="RecStatus"  >Status</label>
                  </div>
                </div>

                {/* ---[ Input Priority ]--- */}
                <div className="d-flex mt-0 ">  {/* <div className="input-group"> */}
                  <div className="input-group-text"><MdLowPriority /></div>
                  <div className="form-floating w-100" >
                    <input type="text" value={Priority} className="form-control  text-end" name='Priority' placeholder="Priority" onChange={(e) => HandleInputs(e)} />
                    <label htmlFor="Priority"  >Priority</label>
                  </div>
                </div>


              </div>


              {/* ---[ Input CrntBal ]--- */}
              <div className="d-flex mt-4">  {/* <div className="input-group"> */}
                <div className="input-group-text"><GrTextAlignFull /></div>
                <div className="form-floating text-primary w-100" >
                  {/* <input type="number" value={CrntBal} className="form-control  text-end" name='CrntBal' placeholder="CrntBal" onChange={(e) => HandleInputs(e)} /> */}
                  <input type="number" value={CrntBal} disabled className="form-control  text-end" name='CrntBal' placeholder="CrntBal" onChange={(e) => ''} />
                  <label htmlFor="CrntBal"  >Current Balance</label>
                </div>
              </div>



            </div>

            {/* END ROW------ [        ROW  1/2,  Col 3/3       ]----------------------------------- */}
          </div>

        </div>  {/* END- Card Body Ends Here */}



        {/* =================================================================================== */}
        {/* =====[    END   --- Main Prg /CARD BODY            ]===================================  */}
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
                      {/* <tr> */}
                      {/* <th> <span className='fs-6 fw-bold  ' >Code:  </span></th> */}
                      {/* //<td> <span className='fs- ' > [ {OrderSheet.TId} ]   - {OrderSheet.RefTrader.Title}</span> </td> */}
                      {/* //{OrderSheet.RefTrader.Title && <td> <span className='fs- ' > [ {OrderSheet.RefTrader.Code} ]   - {OrderSheet.RefTrader.Title}</span> </td>} */}
                      {/* <td> <span className='fs- ' > {OrderSheet.Code} </span> </td> */}
                      {/* </tr> */}

                      <tr>
                        <th> <span className='fs-5 fw-bold fs- ' >Name:  </span></th>
                        {/* {OrderSheet.AccC[0].Title && <td> <span className='fs- ' > {OrderSheet.AccC[0].Title}   </span> </td>} */}
                        <td> <span className='fs- ' > {OrderSheet.Title}   </span> </td>
                      </tr>

                      <tr>
                        <th> <span className='fs-5 fw-bolder fs- ' >نام :  </span></th>
                        {/* {OrderSheet.AccC[0].Title && <td> <span className='fs- ' > {OrderSheet.AccC[0].Title}   </span> </td>} */}
                        <td> <span className='fs- ' > {OrderSheet.Title}   </span> </td>
                      </tr>

                      <tr>
                        <th> <span className='fs-5 fw-bold  ' >Desciption: &ensp;&ensp; </span></th>
                        <td> <span className='fs- ' > {OrderSheet.Desc}   </span> </td>
                      </tr>


                      <tr>
                        <th> <span className='fs-6 fw-bold  ' >Rem  &ensp;  </span></th>
                        <td> <span className='fs- ' > {OrderSheet.Rem}   </span> </td>
                      </tr>

                      <tr>
                        <th> <span className='fs-6 fw-bold  ' >Address  &ensp;  </span></th>
                        <td> <span className='fs- ' > {OrderSheet.Address}   </span> </td>
                      </tr>

                      <tr>
                        <th> <span className='fs-6 fw-bold  ' >City  &ensp;  </span></th>
                        <td> <span className='fs- ' > {OrderSheet.City}   </span> </td>
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
            {/* <tr>
              <th> <span className='fs-6 fw-bold  ' >Code:  </span></th>
              <td> <span className='fs- ' > {OrderSheet.Code} </span> </td>
            </tr> */}

            <tr>
              <th> <span className='fs-6 fw-bold fs- ' >Name:  </span></th>
              <td> <span className='fs- ' > {OrderSheet.Title}   </span> </td>
            </tr>

            <tr>
              <th> <span className='fs-6 fw-bold fs- ' >نام:  </span></th>
              <td> <span className='fs- ' > {OrderSheet.TitleU}   </span> </td>
            </tr>

            <tr>
              <th> <span className='fs-6 fw-bold  ' >Desciption:  </span></th>
              <td> <span className='fs- ' > {OrderSheet.Desc}   </span> </td>
            </tr>

            <tr>
              <th> <span className='fs-6 fw-bold  ' >Rem  &ensp;  </span></th>
              <td> <span className='fs- ' > {OrderSheet.Rem}   </span> </td>
            </tr>

            <tr>
              <th> <span className='fs-6 fw-bold  ' >Address  &ensp;  </span></th>
              <td> <span className='fs- ' > {OrderSheet.Address}   </span> </td>
            </tr>
            <tr>
              <th> <span className='fs-6 fw-bold  ' >City  &ensp;  </span></th>
              <td> <span className='fs- ' > {OrderSheet.City}   </span> </td>
            </tr>

          </tbody></table>
        </div>
      </div>

      {/* ============END===========  PRINTING of VOUCHER =========================*/}

      <div className='d-hidden'><ToastContainer /></div>
    </>)
}
