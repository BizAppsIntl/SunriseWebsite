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
// import SuppliersCardsGroup from '../Components/SuppliersCardsGroup'
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
import { IoBarcodeOutline, IoCashOutline } from 'react-icons/io5'

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
import MyCustomModal from '../../../../Components/MyCustomModal'
import { FaTrashCan } from 'react-icons/fa6'

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
export default function EntryFormCust(props) {
  //destructuring    props
  // const { VoucherMode, CrntRec, Categories, HandleInputs, HandleInputsMode, HandleBtnVoucherMode} = props
  const { CrntRec, VoucherMode, HandleBtnVoucherMode } = props
  // {AlertRec(CrntRec, 'Record Rcvd Update/Addition')} 

  const { CtxMainState, CtxMainDispatch } = useCtxMainContextHook()
  const { _DocsRef, _Patients } = CtxMainState


  const [OrderSheet, setOrderSheet] = useState(CrntRec ? CrntRec : '')
  const [Need2Refresh, setNeed2Refresh] = useState(false);

  const [ShowDeleteModal, setShowDeleteModal] = useState(false);

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
                toast.success('Record Saved Successfully:* [' + Title + ']', { theme: 'colored', autoClose: ToastWaitTime, position: "top-left" })

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
      <div className='card flex  m-0 p-1 flex-col text-start ' style={{ width: '100%', fontSize: '12px', background: '#e0e0e0', borderRadius: '5px' }}>

        {/* =================================================================================== */}
        {/* =====[    Main Prg /CARD HEADDER start            ]===========================================  */}
        {/* =================================================================================== */}
        <div className='card-header flex gap-1 px-2  m-0 items-center ' style={{ background: '#bebebe' }}>
          <span className='text-base md:text-xl font-bold'>Distributor's Detail</span>

          {/* <button className='btn btn-sm btn-info py-0 px-1  ms-auto' style={{ height: '25px' }} onClick={() => HandlePrinting()}>
            <span style={{ fontSize: 'smaller' }}>Print</span> <GrPrint />
          </button> */}


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

        <div className="card-body flex flex-wrap p-0 mt-1 gap-1">

          {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-= [        ROW  1/1       ]-=-=-=-=-=-=-=-=-=-=-=-=-=-= */}
          <div className="flex  flex-wrap md:flex-nowrap p-0 gap-1 m-0 ">
            {/* ----------------------- [        ROW  1/2,  Col 1/3       ]----------------------------------- */}
            <div className="card p-1  w-full md:w-[70%]" >
              <div className='card-header py-1 flex gap-3' >

                {/* ---[ Input ID ]--- */}
                {/* <div className="flex  items-center text-primary" style={{ width: '75%' }} >
                  <div className="input-group-text  text-primary fs-4" style={{ padding: '8px 8px' }} ><ImListNumbered /></div>
                  <div className="form-floating"  >
                    <input type="text" value={Id} name="Id" className="form-control  text-end" placeholder="ID"
                      readOnly={true} onChange={(e) => HandleInputs(e)} />
                    <label htmlFor="Id"  >Ref Id</label>
                  </div>
                </div> */}

                <div className='flex'>
                  <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                    {/* <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg> */}
                    <ImListNumbered />
                  </span>
                  <div className="relative">
                    <input type="text" id="SNo" disabled className=" cursor-not-allowed block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label for="SNo" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                      SNo
                    </label>
                  </div>
                </div>


                {/* ---[ Input Code ]--- */}
                <div className='flex'>
                  <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                    <IoBarcodeOutline />
                  </span>
                  <div className="relative">
                    <input type="text" id="Code" name="Code" className="block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="" value={Code} maxLength={5} onChange={(e) => HandleInputs(e)} />
                    <label for="Code" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                      ID#</label>
                  </div>
                </div>

              </div>

              <div className='card-body p-2  flex flex-col gap-1' >

                {/* ---[ Input Title ]--- */}
                <div className='flex'>
                  <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                    <TbListDetails />
                  </span>
                  <div className="relative w-full">
                    <input type="text" id="Title" name="Title" className="block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="" value={Title} maxLength={30} onChange={(e) => HandleInputs(e)} />
                    <label for="Title" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                      Title</label>
                  </div>
                </div>


                {/* ---[ Input Desc ]--- */}
                <div className='flex'>
                  <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                    <TbTextWrapDisabled />
                  </span>
                  <div className="relative w-full">
                    <input type="text" id="Desc" name="Desc" className="block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="" value={Desc} maxLength={30} onChange={(e) => HandleInputs(e)} />
                    <label for="Desc" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                      Description</label>
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


                {/* ---[ Input Rem ]--- */}
                <div className='flex'>
                  <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                    <GrTextAlignFull />
                  </span>
                  <div className="relative w-full">
                    <input type="text" id="Rem" name="Rem" className="block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="" value={Rem} maxLength={30} onChange={(e) => HandleInputs(e)} />
                    <label for="Rem" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                      Rem</label>
                  </div>
                </div>

                {/* ============================================================== */}
                {/* divider line --------------------------------------------------------------------------*/}
                <div className="mx-auto my-1 " style={{ width: '70%', borderTop: "2px solid gray " }}></div>
                {/* ============================================================== */}

                {/* ---[ Input Phone ]--- */}
                <div className='flex'>
                  <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                    <TbTextWrapDisabled />
                  </span>
                  <div className="relative w-full">
                    <input type="text" id="Phone" name="Phone" className="block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="" value={Phone} maxLength={30} onChange={(e) => HandleInputs(e)} />
                    <label for="Phone" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                      Phones</label>
                  </div>
                </div>


                {/* ---[ Input Address ]--- */}
                <div className='flex'>
                  <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                    <GrTextAlignFull />
                  </span>
                  <div className="relative w-full">
                    <input type="text" id="Address" name="Address" className="block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="" value={Address} maxLength={30} onChange={(e) => HandleInputs(e)} />
                    <label for="Address" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                      Address</label>
                  </div>
                </div>

                {/* ---[ Input City ]--- */}
                <div className='flex'>
                  <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                    <TbTextWrapDisabled />
                  </span>

                  <div className="relative w-full">
                    {/* <input type="text" id="City" name="City" className="block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="" value={City} maxLength={30} onChange={(e) => HandleInputs(e)} /> */}

                    <SelectCreatable className="block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                    <label for="City" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                      City</label>
                  </div>
                </div>

                {/* ============================================================== */}
                {/* divider line --------------------------------------------------------------------------*/}
                <div className="mx-auto my-1 " style={{ width: '70%', borderTop: "2px solid gray " }}></div>
                {/* ============================================================== */}

                {/* ---[ Input Contact1 ]--- */}
                <div className='flex'>
                  <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                    <TbTextWrapDisabled />
                  </span>
                  <div className="relative w-full">
                    <input type="text" id="Contact1" name="Contact1" className="block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="" value={Contact1} maxLength={30} onChange={(e) => HandleInputs(e)} />
                    <label for="Contact1" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                      Contact Person</label>
                  </div>
                </div>


                {/* ---[ Input ContactPh1 ]--- */}
                <div className='flex'>
                  <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                    <TbTextWrapDisabled />
                  </span>
                  <div className="relative w-full">
                    <input type="text" id="ContactPh1" name="ContactPh1" className="block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="" value={ContactPh1} maxLength={30} onChange={(e) => HandleInputs(e)} />
                    <label for="ContactPh1" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                      Contact Phones</label>
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
            </div>

            {/* --PHOTO SESCTION--------------------- [        ROW  1/1,  Col 2/2       ]----------------------------------- */}
            <div className="card p-1 w-full md:w-[30%]">

              <div className="card p-1"  >

                <div className=' flex justify-between items-center' style={{ height: '30px' }}>

                  <label htmlFor='inputPhoto' id='SelectPhoto' className="px-2 py-1 bg-blue-500 text-white rounded" >
                    Change Photo
                  </label>

                  {/* {(selectedImage) && <label className=' m-0 p-0 fs-3 text-danger'
        onClick={() => { setSelectedImage(null); setImgURL(null) }}> <FiDelete /> */}
                  {(OrderSheet.PicURL || OrderSheet.Pic) && <label className=' m-0 p-0 text-xl text-red-600'
                    // onClick={() => { setOrderSheet({ ...OrderSheet, PicURL: '' }); setImgURL(null) }}> <FiDelete />
                    onClick={() => {
                      (OrderSheet.Pic)
                        ? setOrderSheet({ ...OrderSheet, Pic: '', PicURL: '' })
                        : setOrderSheet({ ...OrderSheet, PicURL: '' })
                    }}>
                    {/* <FiDelete /> */}
                    <FaTrashCan />
                  </label>}
                </div>

                {/* -----Photo Section------  */}
                <div className='flex  mt-3 flex-col justify-center items-center '>

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

                  {<img alt="Pic not found" width={"100%"}
                    src={(OrderSheet.Pic)
                      ? URL.createObjectURL(OrderSheet.Pic)
                      : (OrderSheet.PicURL)
                        ? process.env.REACT_APP_API_URL + 'Traders/GetFile/' + OrderSheet.PicURL
                        : DefaultImgURL} />}

                </div>

              </div>




            </div>

          </div>  {/* END ROW------ [        ROW  1/1,  Col 2/2       ]----------------------------------- */}
        </div>  {/* END- Card Body Ends Here */}



        {/* =================================================================================== */}
        {/* =====[    END   --- Main Prg /CARD BODY            ]===================================  */}
        {/* =================================================================================== */}

      </div>

      {/* ==========Start===========  MODAL for Deletion =========================*/}
      {/* ========================================================================*/}

      <MyCustomModal isOpen={ShowDeleteModal} onClose={() => setShowDeleteModal(false)} ShowCloseButton={true} >

        <div className="card w-full md:w-[600px] ">
          <div className="card-header h-14 px-2 flex  justify-between items-center bg-gradient-to-r from-red-700 ">
            <div className='text-3xl'>Delete This Record ?</div>
            {/* <button onClick={() => setShowDeleteModal(false)}>&times;</button> */}
          </div>

          <div className="card-body py-4 md:px-4 text-left w-full " style={{}}>

            {/* ........................................... */}
            {/* ONLY FOR MOBILE, NOT FOR DESKTOP */}
            {/* ........................................... */}
            <div className='flex justify-center  md:hidden'>
              <div className="card  p-2 m-0 w-[150px]  relative"  >
                <span style={{ position: 'absolute', top: '0px', left: '0px', fontSize: '10px' }}
                  className={" text-blue-600  "} >
                  {/* {E.Id} */}
                  {OrderSheet.Code}
                </span>

                <div className=" px-0 pt-0 " >
                  {/* <img src={`Images/ItemsStore/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="..." */}
                  {/* <img src={'Images/AdminPanel/Default/DefaultSupplier.png'} style={{ width: "75%", height: '100px', color: '#e040fb' }} alt="..." /> */}

                  <img src={process.env.REACT_APP_API_URL + `Traders/GetFile/${OrderSheet.PicURL}`} style={{ width: "100%", height: '100%' }} alt="..." />
                </div>

                <div className="card-body p-0 ">
                  {/* <div className="card-title m-0 p-0" style={{ lineHeight: 1 }}>{Title.trim()}</div> */}
                  <div className="mt-auto text-center text-black" style={{ fontSize: '12px', lineHeight: '1' }}>{OrderSheet.Title}</div>
                  {/* <div className="card-title text-center text-black" style={{ fontSize: '10px', lineHeight: '1' }}>{E.TitleU.trim()}</div> */}
                  {/* <div className="card-title text-center text-primary" style={{ fontSize: '10px' }}>{E.Title.trim()}</div> */}
                </div>

              </div>

            </div>


            {/* ........................................... */}
            {/* NOT FOR MOBILE, ONLY DISPLAY ON DESKTOP */}
            {/* ........................................... */}
            <div className='w-full hidden md:flex'>

              <div className='flex-grow '>
                <table className='w-full'><tbody>
                  <tr>
                    <th> <span className='text-xl font-bold ' >Ref Id#:  </span></th>
                    {/* <td> <span className='fs- ' > [ {OrderSheet.TId} ]   - {OrderSheet.RefTrader.Title}</span> </td> */}
                    {/* {OrderSheet.RefTrader.Title && <td> <span className='fs- ' > [ {OrderSheet.RefTrader.Code} ]   - {OrderSheet.RefTrader.Title}</span> </td>} */}
                    <td> <span className='' > {OrderSheet.Code} </span> </td>
                  </tr>

                  <tr>
                    <th> <span className='text-xl font-bold ' >Ref No.:  </span></th>
                    {/* <td> <span className='fs- ' > [ {OrderSheet.TId} ]   - {OrderSheet.RefTrader.Title}</span> </td> */}
                    {/* {OrderSheet.RefTrader.Title && <td> <span className='fs- ' > [ {OrderSheet.RefTrader.Code} ]   - {OrderSheet.RefTrader.Title}</span> </td>} */}
                    <td> <span className='' > {OrderSheet.Id} </span> </td>
                  </tr>

                  <tr>
                    <th> <span className='text-xl font-bold  ' >Title:  </span></th>
                    {/* {OrderSheet.AccC[0].Title && <td> <span className='fs- ' > {OrderSheet.AccC[0].Title}   </span> </td>} */}
                    <td> <span className='' > {OrderSheet.Title}   </span> </td>
                  </tr>

                  <tr>
                    <th> <span className='text-xl font-bold  ' >Description:  </span></th>
                    <td> <span className='' > {OrderSheet.Desc}   </span> </td>
                  </tr>

                  <tr>
                    <th> <span className='text-xl font-bold  ' >Remarks:  </span></th>
                    <td> <span className='' > {OrderSheet.Rem}   </span> </td>
                  </tr>
                </tbody></table>
              </div>

              <div className='w-[30%]'>
                <img src={process.env.REACT_APP_API_URL + `Traders/GetFile/${OrderSheet.PicURL}`} style={{ width: "100%", height: '100%' }} alt="..." />
              </div>

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


    </>)
}
