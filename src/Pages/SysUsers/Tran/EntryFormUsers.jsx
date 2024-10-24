import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import axios from 'axios'

import Moment from 'moment'
// Two files needed for datepicker
import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
import NumberFormat from 'react-number-format'
//<NumberFormat value={"12345678"} displayType="text" format="####-####" />


//Two file needed for toasify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImgMale from '../../../ImagesAdminPanel/default/Male.png'
import ImgFemale from '../../../ImagesAdminPanel/default/Female.png'

import { AlertRec, SetPadLeftZero, DispAPIInAlert, DispArrayInAlert, DispRecInAlert, AlertConfirm, CurrentTime, DateTimeStamp, GetNewID } from '../../../../StdLib'

import { PiTextIndentFill } from "react-icons/pi"
import { BsGenderAmbiguous, BsSortNumericUpAlt, BsTextParagraph } from 'react-icons/bs'
import { BsSortNumericDownAlt } from 'react-icons/bs'
import { FaSave, FaUserPlus, FaUserEdit, FaUsers, FaUserCog, FaUserSlash, FaFolder, FaRegIdCard, FaBicycle, FaMapMarkerAlt, FaPhoneVolume } from 'react-icons/fa'
import { FcCancel } from 'react-icons/fc'
import { FaPlus } from 'react-icons/fa'
import { FaMinus } from 'react-icons/fa'
import { TbPasswordUser, TbWiperWash } from 'react-icons/tb'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { FaEnvelopeOpenText } from 'react-icons/fa'
import { ImExit, ImListNumbered } from 'react-icons/im'

//Description Detail -Text  Records
import { TbTextWrapDisabled } from 'react-icons/tb'

//ID Card for Trader
import { FaRegAddressCard } from 'react-icons/fa'

//Titles
import { TbListDetails } from 'react-icons/tb'

import { FaRegCalendarAlt } from 'react-icons/fa'

//Text-Desc
import { GrCertificate, GrPrint, GrTextAlignFull, GrTextAlignLeft, GrUser, GrUserExpert, GrUserManager } from 'react-icons/gr'

//job category
import { TbIcons } from 'react-icons/tb'
// import { MdOutlineCategory } from 'react-icons/md'

//Currency Rs Dollar
import { TbCurrencyReal } from 'react-icons/tb'

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
import { AiOutlineFieldNumber, AiOutlineNumber } from 'react-icons/ai'
import { CgUserList } from 'react-icons/cg'
import { IoIosConstruct } from 'react-icons/io'
import { SiGooglesearchconsole } from 'react-icons/si'


//=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*
//const process.env.REACT_APP_API_URL = process.env.REACT_APP_DOTNET_API_DEV
//const process.env.REACT_APP_API_URL = process.env.REACT_APP_DOTNET_API_PUB
//=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*

const ToastWaitTime = 5000
// ==================[  useContext and useReducer Hooks  ]=====================


// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
//                                  P R G  ---   START
// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
export default function EntryFormStaff(props) {
  //destructuring    props

  // const { VoucherMode, CrntRec, Categories, HandleInputs, HandleInputsMode, HandleBtnVoucherMode} = props
  const { VoucherMode, CrntRec, Categories, Suppliers, HandleBtnVoucherMode } = props

  const [VoucherCart, setOrderSheet] = useState(CrntRec ? CrntRec : '')
  const [Need2Refresh, setNeed2Refresh] = useState(false)
  const [ShowHiddenOps, setShowHiddenOps] = useState(false)

  // const [selectedImage, setSelectedImage] = useState(null);
  // const [ImgURL, setImgURL] = useState('')
  const DefaultImgURL = require('../AssetsLocal/Images/Default.jpg')


  const _VCat = "0000"
  const _PrgID = "2211"
  const _PrgTitle = "Staff Record Entries"

  // const { VDte, Id, Code, RecType, RecStatus, Priority, Title, TitleU, Desc, Rem, CatCode, TId, Pic, PicURL, Unit, Price, QtyDef, QtyInc, QtyStep, QtyMin, QtyMax, CrntBal } = VoucherCart
  const {
    ID, PW, Title, Desc, Rem, RoleId, TId,
    Pic,
    PicURL,
    // PicURL4Edit,  
    RecType, RecStatus, Priority, EntryBy, EntryDte
  } = VoucherCart

  // const [VoucherCart, setVoucherCart] = useState(CrntRec ? CrntRec : RecDefault4M)
  // { VItems: [], VDte: new Date().toDateString(), VNo: 'xxx', VCat: '31', VDesc: '', TCode: 'SAB', VAmt: -9, VQty: -9 })

  // const [VoucherCart, setVoucherCart] = useState({ VItems:iniRec.VItems, VDte:iniRec.VDte, VNo:iniRec.VNo, VDesc: '', TCode: 'SAB', VAmt: -9, VQty: -9 })

  useEffect(() => {
    // if (!VoucherMode ) { alert('Empty VoucherMode- trying to return'); return }
    // console.log('Rcvd CrntRec', CrntRec)
    // DispRecInAlert(CrntRec,'Rcvd CrntRec')

    // if (CrntRec) {    AlertRec (CrntRec, 'crntRec');setOrderSheet(CrntRec)}
    setOrderSheet(VoucherMode == 'Add' ? { ...CrntRec, ID: '', PW: '', PicURL: '' } : CrntRec)
    // document.getElementById('SelectPhoto').focus();
  }, [Need2Refresh]);

  // ==================[  Fn: Handle Inputs  ]=====================

  const handleFocus = (event) => event.target.select();
  const Input = (props) => <input type="text" value="Some something" onFocus={handleFocus} />


  const HandleDefaultCat = () => {
    // const temp = Categories.at(-1).Id //last
    const temp = Categories.at(0).Code //first
    // AlertRec(Suppliers, 'Setting Default Suppliers :' + temp)
    setOrderSheet({ ...VoucherCart, CatCode: temp })
    // setOrderSheet(() => ({ ...VoucherCart, TId: '' }));
    return temp
  }
  
  const HandleDefaultTrader = () => {
    // const temp = Suppliers.at(-1).Id   //Last
    const temp = Suppliers.at(0).Id
    // AlertRec(Suppliers, 'Setting Default Suppliers :' + temp)
    setOrderSheet({ ...VoucherCart, TId: temp })
    // setOrderSheet(() => ({ ...VoucherCart, TId: '' }));
    return temp
  }

  const HandleInputs = (e) => {
    // let key = '', value = '';
    // console.log('Input Done:', e.target.name, e.target.value);
    // alert(e.target.name + '  ' + e.target.value)
    // key = e.target.name; value = e.target.value;

    switch (e.target.name) {
      case ID:
        setOrderSheet({ ...VoucherCart, [e.target.name]: e.target.value.toUpperCase() });
        break;
      case RoleId:
        setOrderSheet({ ...VoucherCart, [e.target.name]: Number(e.target.value) });
        break;
      case TId:
        //const tRec = Suppliers.find(P => P.Id === Number(e.target.value))
        // [{ Id: e.target.value, Title: e.target.options[e.target.selectedIndex].text }]
        setOrderSheet({ ...VoucherCart, [e.target.name]: Number(e.target.value) });
        break;

      default:
        setOrderSheet({ ...VoucherCart, [e.target.name]: e.target.value });
        break;
    }
  }

  // const HandleInputsVoucherDetailNumberFormat = (crntItem, KVobj) => {
  //   //AlertRec (KVobj, 'ONCHANGE Event--- crntItem KV-Obj:')
  //   // alert(` HandleInputsVoucherDetailNumberFormat: \n
  //   //         called by : ${obj.name}
  //   //         with Value: ${obj.value}

  //   //         TotRefShare-VAmtRef = ${VoucherCart.VAmtRef} 
  //   //         TotDocShare-VAmtDoc = ${VoucherCart.VAmtDoc} 
  //   //         `)

  //   // const itmExisted = AccRecsSal.find((E) => E.Code === crntItem.Code)
  //   // console.log('********' ,'KVobj',KVobj , 'AccRecsSal: ', AccRecsSal.map(E => (E.Code === crntItem.Code) ? { ...E, VAmt: KVobj.value } : E))
  //   setAccRecsSal(AccRecsSal.map(E => (E.Code === crntItem.Code) ? { ...E, VAmt: KVobj.value } : E))

  // }

  // ==============================================================
  //CLEAR Rec is clicked
  //   const HandleBtnClear = () => { alert('Clear pressed'); setRec4M(RecDefault4M) }
  const HandleBtnReset = () => { setNeed2Refresh(p => !p) }

  // ==============================================================
  //CANCEL changes is clicked
  //   const HandleBtnCancel = () => { alert('Cancelled pressed'); setBtnEditClicked(false); setBtnAddnewClicked(false); setInputReadOnly(true); setRec4M(RecDefault4M) }
  const HandleBtnCancel = (Flag2Refresh) => {
    // alert('Editing is finished')
    HandleBtnVoucherMode(VoucherMode, false, Flag2Refresh);
    // setAccRecsSal(AccRecsSal.map((E, I) => ({ ...E, VAmt: 0 })))

  }

  // ==============================================================
  //SAVE changes is clicked
  const HandleBtnSave = (e) => {
    e.preventDefault();

    // AlertRec(VoucherCart, 'Saving Data is Proceeded.');
    switch (VoucherMode) {
      case 'Add': CallDotAPI2SaveAddNew(); break;
      case 'Edit': CallDotAPI2SaveUpdate(); break;
      default: break;
    }
  }

  // ==============================================================
  //DELETE is clicked
  const HandleBtnDelete = (btnStatus) => {
    // AlertRec(Rec4M, 'DELETE Record: Rec4M')

    CallDotAPI2Delete()
  }


  // =======================================================================
  // ==================[  Fns: DATABASE/ API Handling ]=====================
  // =======================================================================
  // --------------------------------------------------------------------------------------------------------------------
  // ------------- AddNew/Create RECORD ----------------
  // --------------------------------------------------------------------------------------------------------------------

  const CallDotAPI2SaveAddNew = async () => {
    // AlertRec(VoucherCart, 'Data Ready to Send')

    const {
      ID, PW, Title, Desc, Rem, RoleId, TId,
      Pic,
      PicURL,
      // PicURL4Edit,  
      RecType, RecStatus, Priority, EntryBy, EntryDte
    } = VoucherCart


    // if (!(Code)) {
    //   alert('CODE is invalid. \nPlz Check CODE entered.'); return
    // }

    if (ID.trim() === '') {
      toast.error('User ID/Email is EMPTY. \nThis is Mandatory Field.\nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }
    // if (!(Title || TitleU)) {
    if (Title.trim() === '') {
      toast.error('User Title is EMPTY. \nThis is Mandatory for Reference.\nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }

    // -----[  Salary Accounts Section   ]--------------------------------------------------------
    // AlertRec(AccDx, 'AccDx Standard: Befor Filtration- ' + VAmtPaid)
    // Remove ZERO Record ; if DISCOUNT is ZERO then Remove from ArrayList
    // const AccRecs = AccRecsSal.filter(E => E.VAmt > 0)
    // AccDx = AccDx.filter(E => !(E.Code === '51211' && E.VAmt <= 0))      //only remove 
    // AlertRec(AccRecs, 'AccRecs 4 Salary Final to send in Database')

    const _VID = GetNewID()  //20chrs                //DateTimeStamp()

    // const Data2SendInDatabase = {
    const Data2SendMainRec = {
      "ID": ID,
      "PW": PW,

      "Title": Title.substr(0, 50),
      "Desc": Desc.substr(0, 50),
      "Rem": Rem.substr(0, 50),

      "RoleId": RoleId,
      "TId": TId,

      // "Pic": Pic,
      // "PicURL": (Pic ? Title.trim().substr(0, Math.min(Title.trim().length, 10)) + DateTimeStamp() + '.png': ''),      
      "PicURL": (Pic ? _VID + '.png' : ''),

      "RecType": RecType.substr(0, 10),         //RecType.Substring(0, Math.min(RecType.Length, 10)) ,
      "RecStatus": RecStatus.substr(0, 10),
      "Priority": Priority.substr(0, 4),

      "EntryBy": "xUSERx",
      "EntryDte": new Date()
    }


    // Two Records in TranR
    // TranRs: [...AccD.map((E, I) => (

    // const Data2SendInDatabase = {
    //   RecMain: Data2SendMainRec,
    //   RecAcc: Data2SendAccRec,
    // }

    const Data2SendInDatabase = Data2SendMainRec

    //  if (!AlertConfirm(Data2SendInDatabase, 'Add New Record ?')) return

    //=*=*=*=*=*=*=*=*=*=*=*=[ Get New Next Available Code ]=*=*=*=*=*=*=*=*=*=*=*=
    const VNO_NEW = 'VNO' //SetPadLeftZero((await (await fetch(`/api/VNoTrack/${VCat}`, { method: 'GET' })).json()).VNo, 3)
    // alert('VNoTrack.VNo VNO_NEW: ' + SetPadLeftZero(VNO_NEW,3))
    //=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=



    //=====[   READY to send data in Database   ]========  
    //-------------------------------------------------------

    // //'.'.'.'.'.'.'   DUPLICATE CHECK.............
    // const rec = await fetch(`/api/Item/${VoucherCart.Code}`, { method: 'GET' })

    // if (rec.status === 200) {
    //   // const data = await rec.json();
    //   // AlertRec(data, 'Available Code')

    //   alert('Entered CODE is already available.\nDuplication of CODE is not allowed.');
    //   return
    // }
    // // else { alert('Status Check: Entered CODE is Not available. ' + rec.status); return }
    // //'.'.'.'.'.'.'   END- DUPLICATE CHECK.............


    //[ Part -1/2 >>> Data uploading ]
    //-------------------------------------------------------
    fetch(process.env.REACT_APP_API_URL + 'Users', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(Data2SendInDatabase)
    })
      .then(res => res.json())
      .then((result) => {
        HandleBtnCancel(true)
        // alert('Returned Successfully Saved: \n' + "Response: " + result)

        //-------------------------------------------------------
        //[ Part -2/2 >>> Image uploading ]
        if (Pic) {
          // var ext =  fileName.split('.').pop();
          // const FILENAME = VNO_NEW + '.jpg'    //+ '.' + PicURL.split('.').pop()
          //const filename = Data2SendMainRec.Title + DateTimeStamp() + '.png'    //product.PicURL

          // setPhotofilename(e.target.files[0].name);
          const formData = new FormData();
          //     // formData.append('username', 'Chris');
          //     // formData.append('userpic', myFileInput.files[0], 'chris1.jpg');
          // for (let [key, value] of fd.entries()) { console.log(key, value);}
          formData.append("ImageFile", Pic, Data2SendMainRec.PicURL);

          fetch(process.env.REACT_APP_API_URL + 'Users/SaveFile', { method: 'POST', body: formData })
            .then(res => res.json())
            .then((result) => {
              // alert('Photo Successfully Saved: ' + Data2SendMainRec.PicURL + '\n' + "Response: " + result)
              toast.success('Record Saved Successfully:* [' + Title + ']', { theme: 'colored', autoClose: ToastWaitTime, position: "top-left" })

            }, (error) => { alert('ERROR--- Photo Uploading is Failed: ' + Data2SendMainRec.PicURL); Data2SendMainRec.PicURL = '' })
        }
        else {
          toast.success('Record Saved Successfully: [' + Title + ']', { theme: 'colored', autoClose: ToastWaitTime, position: "top-left" })
        }
        //-------------------------------------------------------

        //toast.success('Record Saved Successfully: Bypassing Image Section', { theme: 'colored', autoClose: ToastWaitTime, })
      }

        , (error) => { alert('ERROR--- Add-New Action Result: ' + 'Failed'); })

    //     //History.push(CatCode"/Home");
    HandleBtnCancel(true)
  }



  // --------------------------------------------------------------------------------------------------------------------
  // ------------- Update RECORD ----------------
  // --------------------------------------------------------------------------------------------------------------------
  const CallDotAPI2SaveUpdate = async () => {
    // AlertRec(VoucherCart, 'Data Ready to Send')

    const {
      ID, PW, Title, Desc, Rem, RoleId, TId,
      Pic,
      PicURL,
      PicURL4Edit,
      RecType, RecStatus, Priority, EntryBy, EntryDte
    } = VoucherCart

    if (ID.trim() === '') {
      toast.error('User ID/Email is EMPTY. \nThis is Mandatory Field.\nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }
    // if (!(Title || TitleU)) {
    if (Title.trim() === '') {
      toast.error('User Title is EMPTY. \nThis is Mandatory for Reference.\nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }


    // // -----[  Salary Accounts Section   ]--------------------------------------------------------
    // // AlertRec(AccDx, 'AccDx Standard: Befor Filtration- ' + VAmtPaid)
    // // Remove ZERO Record ; if DISCOUNT is ZERO then Remove from ArrayList
    // const AccRecs = AccRecsSal.filter(E => E.VAmt > 0)
    // // AccDx = AccDx.filter(E => !(E.Code === '51211' && E.VAmt <= 0))      //only remove 
    // // AlertRec(AccRecs, 'AccRecs 4 Salary Final to send in Database')

    const _VID = GetNewID()  //20chrs                //DateTimeStamp()


    // const Data2SendInDatabase = {
    const Data2SendMainRec = {
      "ID": ID,
      "PW": PW,

      "Title": Title.substr(0, 50),
      "Desc": Desc.substr(0, 50),
      "Rem": Rem.substr(0, 50),

      "RoleId": RoleId,
      "TId": TId,

      // "Pic": Pic,
      // "PicURL": (Pic ? Title.trim().substr(0, Math.min(Title.trim().length, 10)) + DateTimeStamp() + '.png': ''),      
      "PicURL": (Pic ? _VID + '.png' : PicURL),

      "RecType": RecType.substr(0, 10),         //RecType.Substring(0, Math.min(RecType.Length, 10)) ,
      "RecStatus": RecStatus.substr(0, 10),
      "Priority": Priority.substr(0, 4),

      "EntryBy": "xUSERx",
      "EntryDte": new Date()

    }

    // Two Records in TranR
    // TranRs: [...AccD.map((E, I) => (

    // const Data2SendInDatabase = {
    //   RecMain: Data2SendMainRec,
    //   RecAcc: Data2SendAccRec,
    // }
    const Data2SendInDatabase = Data2SendMainRec

    // if (!AlertConfirm(Data2SendInDatabase, 'Record Ready to Update? ')) return

    //[ Part -1/2 >>> Image uploading ]
    //-------------------------------------------------------
    // alert('Yes Image is present for Update')
    if (Pic) {

      // Data2SendMainRec.PicURL= PicURL4Edit ? PicURL4Edit  : Title.replace(/ /g, '').substr(0, 10) + DateTimeStamp() + '.png' 
      // Data2SendMainRec.PicURL = Title.replace(/ /g, '').substr(0, 10) + DateTimeStamp() + '.png'

      const formData = new FormData();
      //     // formData.append('username', 'Chris');
      //     // formData.append('userpic', myFileInput.files[0], 'chris1.jpg');
      // for (let [key, value] of fd.entries()) { console.log(key, value);}
      formData.append("ImageFile", Pic, Data2SendMainRec.PicURL);

      fetch(process.env.REACT_APP_API_URL + 'Users/SaveFile', { method: 'POST', body: formData })
        .then(res => res.json())
        .then((result) => {
          // alert('Photo Successfully Saved: ' + Data2SendMainRec.PicURL + '\n' + "Response: " + result)
          //setImageSrc('')
          // GetRecs() //Update Fresh Records
        }, (error) => { alert('ERROR--- Photo Uploading is Failed: ' + Data2SendMainRec.PicURL); Data2SendMainRec.PicURL = '' })
    }

    // alert('Previous Image is present for Update')
    if ((!PicURL && PicURL4Edit) || (Pic && PicURL4Edit)) {
      //Name Removed && Old-Still-present then Remove Image of Old-Still-present name
      //Destroy Old Image [ Part ----- >>> Delete Image ]

      fetch(process.env.REACT_APP_API_URL + 'Users/RemoveFile/' + PicURL4Edit.trim(), { method: 'DELETE' })
        .then(res => res.json())
        .then((result) => {
          // console.log('result: ', result);
          // alert('DELETE Old-Photo Action Success-Result: ' + result);
        }
          , (error) => { alert('ERROR--- DELETE Photo Action Result: ' + { PicURL4Edit } + 'Failed\n' + error); })
    }


    //[ Part -2/2 >>> Data uploading ]
    //-------------------------------------------------------
    fetch(process.env.REACT_APP_API_URL + `Users/${ID}`, {
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
    // AlertConfirm(VoucherCart, 'VocherCard for Deletion')

    const { ID, PW, Title, PicURL, PicURL4Edit } = VoucherCart

    //[ Part -1/2 >>> Data uploading ]
    //-------------------------------------------------------
    fetch(process.env.REACT_APP_API_URL + `Users/${ID}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then((result) => {        // GetRecs()
        // alert('DELETE Action Success-Result: ' + result);
        toast.warn('Record Deleted Successfully: [' + Title + ']', { theme: 'colored', autoClose: ToastWaitTime, })

        HandleBtnCancel(true)

        //Destroy Old Image [ Part 2/2 ----- >>> Delete Image ]
        //-------------------------------------------------------
        if (PicURL4Edit) {
          fetch(process.env.REACT_APP_API_URL + 'Users/RemoveFile/' + PicURL4Edit.trim(), { method: 'DELETE' })
            .then(res => res.json())
            .then((result) => {
              // alert('DELETE Old-Photo Action Success-Result: ' + result);
              //toast.warn('Record Deleted Successfully: W/- Photo', { theme: 'colored', autoClose: ToastWaitTime, })
            }
              , (error) => { alert('ERROR--- DELETE Photo Action Result: ' + 'Failed'); })
        }

      }
        // , (error) => { alert('ERROR--- DELETE Photo Action Result: ' + 'Failed'); })
        , (error) => { toast.error('ERROR--- Failed, Delete Action Result: ' + error, { theme: 'colored', autoClose: 10000, }) }
      )


    // alert('Record is DELETED from Database')
    HandleBtnCancel(true)
  }


  // useEffect(() => {
  //   // // const searchQuery = document.querySelector("#searchQ").value;
  //   // // console.log(searchQuery);
  //   // // loadURLToInputFiled('f:/bilal.png')    

  //   // //     alert('VoucherCart.PicURL :'+VoucherCart.PicURL)
  //   // //     AlertRec(VoucherCart,'VoucherCart')
  //   // // alert('../ItemsStore/' + VoucherCart.PicURL)

  //   // LoadImg2InputField('F:/bilal.png', VoucherCart.PicURL)

  //   // // loadTemp('F:/bilal.png')
  // }, []);

  // // function LoadImg2InputField(img, fileName) {
  // //   // Load img blob to input
  // //   // WIP: UTF8 character error
  // //   // let fileName = 'hasFilename.jpg'
  // //   // let file = new File([imgBlob], fileName,{type:"image/jpeg", lastModified:new Date().getTime()}, 'utf-8');
  // //   // let file = new File(['../ItemsStore/' +'BigBird.png'], fileName, { type: "image/jpeg", lastModified: new Date().getTime() }, 'utf-8');
  // //   // let file = new File(['F:/MyReactApps/MyProjects/daSys/client/public/Images/ItemsStore/' +'BigBird.png'], fileName, { type: "image/jpeg", lastModified: new Date().getTime() }, 'utf-8');
  // //   // let fileName = 'hasFilename.jpg'
  // //   let file = new File([img], fileName, { type: "image/jpeg", lastModified: new Date().getTime() }, 'utf-8');
  // //   let container = new DataTransfer();
  // //   container.items.add(file);
  // //   document.querySelector('#inputPhoto').files = container.files;
  // //   // ERR: setOrderSheet({ ...VoucherCart, Pic: container.files[0] });

  // //   // inputPhoto.files = container.files;
  // // }

  function loadTemp(img) {
    // getImgURL('https://cloudinary-res.cloudinary.com/image/upload/dpr_2.0,c_scale,f_auto,q_auto,w_156/cloudinary_logo_for_white_bg.svg', (imgBlob)=>{
    // getImgURL(url, (imgBlob) => {
    // Load img blob to input
    // WIP: UTF8 character error
    let fileName = 'hasFilename.jpg'
    let file = new File([img], fileName, { type: "image/jpeg", lastModified: new Date().getTime() }, 'utf-8');
    let container = new DataTransfer();
    container.items.add(file);
    document.querySelector('#inputPhoto').files = container.files;
    // inputPhoto.files = container.files;

    // })
  }


  function loadURLToInputFiled(url) {
    // getImgURL('https://cloudinary-res.cloudinary.com/image/upload/dpr_2.0,c_scale,f_auto,q_auto,w_156/cloudinary_logo_for_white_bg.svg', (imgBlob)=>{
    getImgURL(url, (imgBlob) => {
      // Load img blob to input
      // WIP: UTF8 character error
      let fileName = 'hasFilename.jpg'
      // let file = new File(['F:/bilal.png' ], fileName, { type: "image/jpeg", lastModified: new Date().getTime() }, 'utf-8');
      let file = new File([imgBlob], fileName, { type: "image/jpeg", lastModified: new Date().getTime() }, 'utf-8');
      let container = new DataTransfer();
      container.items.add(file);
      document.querySelector('#inputPhoto').files = container.files;
      // inputPhoto.files = container.files;

    })
  }

  // xmlHTTP return blob respond
  function getImgURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      callback(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }




  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  return (
    <>

      <div className='card d-flex  m-0 p-1 flex-column text-start' style={{ width: '100%', fontSize: '12px', background: '#e0e0e0', borderRadius: '5px' }}>

        {/* =================================================================================== */}
        {/* =====[    Main Prg /CARD HEADDER start            ]===========================================  */}
        {/* =================================================================================== */}
        <div className='card-header d-flex gap-1 py-1 m-0 justify-content-between ' style={{ background: '#bebebe' }}>
          <div className='fs-6' onDoubleClick={() => setShowHiddenOps(p => !p)} ><strong>Application User Authentication</strong></div>

          {/* <button className='btn btn-sm btn-info py-0 px-1  ms-auto' style={{ height: '25px' }} onClick={() => HandlePrinting()}>
              <span style={{ fontSize: 'smaller' }}>Print</span> <GrPrint />
            </button> */}

          <div className=' d-flex gap-2 py-0 m-0  '>
            <button className='btn btn-sm btn-warning py-0 px-1' style={{ height: '25px' }} onClick={() => { HandleBtnReset() }}>
              <span style={{ fontSize: 'smaller' }}>Reset Changes</span> <TbWiperWash />
            </button>
            <button className='btn btn-sm btn-success py-0 px-1' style={{ height: '25px' }} onClick={(e) => { HandleBtnSave(e) }} type="submit" >
              <span style={{ fontSize: 'smaller' }}>Save {(VoucherMode === 'Edit') ? 'Changes ' : 'Record'}</span> <FaSave className='mb-1' />
            </button>
            {(VoucherMode === 'Edit' && ShowHiddenOps) &&
              <button className='btn btn-sm btn-danger py-0 px-1' style={{ height: '25px' }}
                data-bs-toggle="modal" data-bs-target="#exampleModal"
                onClick={() => { HandleBtnDelete(true) }}
              >
                <span style={{ fontSize: 'smaller' }}>Delete Record</span> <FaUserSlash className='mb-1' />
              </button>
            }
          </div>
        </div>


        {/* =================================================================================== */}
        {/* =====[    Main Prg /CARD BODY start            ]===================================  */}
        {/* =================================================================================== */}
        <div className="card-body d-flex flex-column p-0 mt-1 gap-1">

          {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-= [        ROW  1/2       ]-=-=-=-=-=-=-=-=-=-=-=-=-=-= */}

          <div className="d-flex p-0 gap-1 m-0 justify-content-between ">

            {/* ----------------------- [        ROW  1/2,  Col 1/3       ]----------------------------------- */}
            <div className="card p-1 " style={{ width: "70%" }} >
              <div className="card mx-auto " style={{ width: "80%" }}  >

                <div className='card-header py-2 mb-2 d-flex gap-2 ' style={{ background: '#e0e0e0' }}>
                  <div>
                    <img src={'images/default/UsersMix3.png'} alt="..." width={"100%"} />
                  </div>
                  <div className=' d-flex flex-column gap-2  justify-content-center align-items-center ' >


                    {/* ---[ Input ID ]--- */}
                    <div className="d-flex " style={{ width: '250px' }} >  {/* <div className="input-group"> */}
                      <div className="input-group-text d-flex flex-column py-1 my-auto"><TbListDetails /><AiOutlineNumber /></div>
                      <div className="form-floating w-100" >
                        <input type="text" value={ID} className="form-control  text-end" name='ID' placeholder="ID"
                          readOnly={VoucherMode === 'Add' ? false : true}
                          onChange={(e) => HandleInputs(e)}
                        />
                        <label htmlFor="ID"  >User ID</label>
                      </div>
                    </div>

                    {/* ---[ Input PW ]--- */}
                    <div className="d-flex " style={{ width: '250px' }} >  {/* <div className="input-group"> */}
                      <div className="input-group-text "><TbPasswordUser /></div>
                      <div className="form-floating w-100" >
                        <input type="password" value={PW} className="form-control  text-end" name='PW' placeholder="PW" onChange={(e) => HandleInputs(e)} />
                        <label htmlFor="PW"  >Password</label>
                      </div>
                    </div>


                  </div>
                </div>{/* [END Card Header ]--- */}

                <div className="d-flex p-0 m-0 mx-auto justify-content-center w-100">
                  <div className="card d-flex p-2 gap-2 justify-content-center " style={{ width: "80%" }} >

                    {/* ---[ Input Title ]--- */}
                    <div className="d-flex "  >  {/* <div className="input-group"> */}
                      <div className="input-group-text "><PiTextIndentFill /></div>
                      <div className="form-floating w-100" >
                        <input type="text" value={Title} className="form-control  text-end" name='Title' placeholder="Title" onChange={(e) => HandleInputs(e)} />
                        <label htmlFor="Title"  >Title</label>
                      </div>
                    </div>

                    {/* ---[ Input Desc ]--- */}
                    <div className="d-flex "  >  {/* <div className="input-group"> */}
                      <div className="input-group-text "><GrTextAlignLeft /></div>
                      <div className="form-floating w-100" >
                        <input type="text" value={Desc} className="form-control  text-end" name='Desc' placeholder="Desc" onChange={(e) => HandleInputs(e)} />
                        <label htmlFor="Desc"  >Description</label>
                      </div>
                    </div>

                    {/* ---[ Input Remarks ]--- */}
                    <div className="d-flex "  >  {/* <div className="input-group"> */}
                      <div className="input-group-text"><BsTextParagraph /></div>
                      <div className="form-floating w-100" >
                        <input type="text" value={Rem} className="form-control  text-end" name='Rem' placeholder="Rem" onChange={(e) => HandleInputs(e)} />
                        <label htmlFor="Rem"  >Notes/Remarks</label>
                      </div>
                    </div>


                  </div>
                </div>


                {/* ============= Protion/Block for RecStatus ^& UserRoles & Staff/Doctor Name ================== */}
                <div className="d-flex p-0 m-0 my-2 gap-2 justify-content-center border border-danger w-100">

                  {/* ------- Protion/Block for RecStatus ^& UserRoleAccess ------- */}
                  <div className="card d-flex p-2 flex-column gap-2 justify-content-center " style={{ width: "50%" }} >

                    {/* ---[ Input RoleAccess ]--- */}
                    <div className="d-flex ">  {/* <div className="input-group"> */}
                      <div className="input-group-text"><TbIcons /></div>
                      <div className="form-floating w-100" >
                        {/* <input type="text" value={Category} className="form-control  text-end" name='Category' placeholder="Category" onChange={(e) => HandleInputs(e)} /> */}
                        <select className="form-control ps-2 pb-0 pt-3 text-end"
                          // value={RecStatus ? RecStatus : HandleDefaultCat()}
                          value={RoleId ? RoleId : '4000'}
                          name="RoleId" placeholder="Access Role"
                          // disabled={InputReadOnly}
                          onChange={(e) => {
                            // console.log(e.target.name, e.target.value);
                            HandleInputs(e)
                            // setRec4M({ ...VoucherCart, Cat: { ...Cat, Code: e.target.value } })
                          }}  >
                          {/* <option key={0} value={'Mgt'} >{'Management'} </option>
                        <option key={1} value={'Admin'} >{'Administration'} </option>
                        <option key={2} value={'Support'} >{'Office Support'} </option>
                        <option key={3} value={'Med'} >{'Medical Assistants'} </option>
                        <option key={4} value={'Mkt'} >{'Marketing'} </option> */}
                          <option key={0} value={1} >{'Sys. Admin.'} </option>
                          <option key={1} value={2} >{'Management'} </option>
                          <option key={2} value={3} >{'Administration'} </option>
                          <option key={3} value={4} >{'Support'} </option>
                          <option key={4} value={5} >{'Operator'} </option>
                          <option key={5} value={6} >{'User'} </option>
                          <option key={6} value={7} >{'Doctor'} </option>
                        </select>

                        <label htmlFor="RoleId"  >Access Role</label>

                      </div>
                    </div>

                    RecStatus:{RecStatus}
                    RoleId:{RoleId}
                    {/* Hr line */}
                    <div style={{ borderTop: "1px solid blue ", margin: 'auto', width: '80%' }}></div>

                    {/* ---[ Select Status ]--- */}
                    <div className="d-flex ">  {/* <div className="input-group"> */}
                      <div className="input-group-text"><HiStatusOffline /></div>
                      <div className="form-floating w-100" >
                        {/* <input type="text" value={Cat.Code} className="form-control  text-end" name='Cat' id='Cat' placeholder="Account Title" readOnly={InputReadOnly} onChange={(e) => HandleInputs4M(e)} /> */}
                        <select className="form-control ps-2 pb-0 pt-3 text-end"
                          // value={RecStatus ? RecStatus : HandleDefaultCat()}
                          value={RecStatus ? RecStatus : 'Active'}
                          name="RecStatus" placeholder="Record Status"
                          // disabled={InputReadOnly}
                          onChange={(e) => {
                            // console.log(e.target.name, e.target.value);
                            HandleInputs(e)
                            // setRec4M({ ...VoucherCart, Cat: { ...Cat, Code: e.target.value } })
                          }}  >
                          <option key={0} value={'Active'} >{'Active Rec'} </option>
                          <option key={1} value={'Dormant'} >{'Dormant Rec'} </option>
                          <option key={2} value={'Inactive'} >{'Inactive Rec'} </option>
                        </select>

                        <label htmlFor="RecStatus"  >Record Status</label>
                      </div>
                    </div>


                  </div>


                  {/* ------- Protion/Block Staff/Doctor Name ------- */}
                  {(RoleId === '7') &&
                    <div className="card d-flex p-2 gap-2 justify-content-start" style={{ width: "50%" }} >

                      {/* ---[ Input Title ]--- */}
                      <div className="d-flex "  >  {/* <div className="input-group"> */}
                        <div className="input-group-text d-flex flex-column py-1 my-auto"><TbListDetails /><AiOutlineNumber /></div>
                        <div className="form-floating w-100" >
                          <input type="text" value={TId} className="form-control  text-end" name='TId' placeholder="TId" onChange={(e) => HandleInputs(e)} />
                          <label htmlFor="TId"  >Doctor Id</label>
                        </div>
                      </div>

                      {/* ---[ Display Details & Title ]--- */}
                      <div>
                        name
                        {RecStatus}
                      </div>

                    </div>
                  }
                </div>
              </div>
            </div>

            {/* ----------------------- [        ROW  1/2,  Col 3/3       ]----------------------------------- */}
            <div className="card p-1" style={{ width: "30%" }} >

              <div className="card p-1"  >

                {/* -----Photo Section------  */}
                <div className='d-flex  mt-0 flex-column justify-content-center align-items-center '>

                  {/* <input type="file" name="inputPhoto" id='inputPhoto' */}
                  <input type="file" hidden name="inputPhoto" id='inputPhoto'
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                      // setImgURL(URL.createObjectURL(event.target.files[0]))
                      // setOrderSheet({ ...VoucherCart, PicURL: event.target.files[0].name, pic: URL.createObjectURL(event.target.files[0]) });
                      // setOrderSheet({ ...VoucherCart, PicURL: event.target.files[0].name, Pic: event.target.files[0] });
                      setOrderSheet({ ...VoucherCart, Pic: event.target.files[0] });
                    }} />

                  {/* Working {selectedImage4E &&<img src={URL.createObjectURL(selectedImage4E)} alt="not found" width={"200px"} />} */}
                  {/* {<img src={(VoucherCart.PicURL) ? ImgURL : DefaultImgURL} alt="Image not found" width={"100%"} />} */}

                  {/* {<img src={(VoucherCart.PicURL) ? URL.createObjectURL(VoucherCart.Pic) : DefaultImgURL} alt="Image not found" width={"100%"} />} */}
                  {/* {VoucherCart.PicURL} */}

                  {<img alt="Image not found" width={"100%"}
                    src={(VoucherCart.Pic)
                      ? URL.createObjectURL(VoucherCart.Pic)
                      : (VoucherCart.PicURL)
                        ? process.env.REACT_APP_API_URL + 'Staff/GetFile/' + VoucherCart.PicURL
                        : DefaultImgURL} />}

                </div>

                <div className=' d-flex mt-3 justify-content-between align-items-center' style={{ height: '30px' }}>
                  <label htmlFor='inputPhoto' id='SelectPhoto' className='btn btn-info m-0 p-0 btn-sm' >
                    Select Photo
                  </label>

                  {/* {(selectedImage) && <label className=' m-0 p-0 fs-3 text-danger'
                      onClick={() => { setSelectedImage(null); setImgURL(null) }}> <FiDelete /> */}
                  {(VoucherCart.PicURL || VoucherCart.Pic) && <label className=' m-0 p-0 fs-3 text-danger'
                    // onClick={() => { setOrderSheet({ ...VoucherCart, PicURL: '' }); setImgURL(null) }}> <FiDelete />
                    onClick={() => {
                      (VoucherCart.Pic)
                        ? setOrderSheet({ ...VoucherCart, Pic: '', PicURL: '' })
                        : setOrderSheet({ ...VoucherCart, PicURL: '' })
                    }}>
                    <FiDelete />
                  </label>}
                </div>

              </div>
            </div>

          </div>


        </div>  {/* END- Card Body Ends Here */}



        {/* =================================================================================== */}
        {/* =====[    END   --- Main Prg /CARD BODY            ]===================================  */}
        {/* =================================================================================== */}
      </div> {/* END- Main Card Ends Here */}


    </>
  )
}