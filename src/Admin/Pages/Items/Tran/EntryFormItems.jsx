import React, { useEffect, useRef, useState } from 'react'


//Two file needed for toasify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//ReactModal
import ReactModal from 'react-modal'

import { AlertRec, SetPadLeftZero, DispAPIInAlert, DispArrayInAlert, DispRecInAlert, AlertConfirm, CurrentTime, DateTimeStamp } from '../../../../StdLib'

import { BsSortNumericUpAlt } from 'react-icons/bs'
import { BsSortNumericDownAlt } from 'react-icons/bs'
import { FaSave, FaUserPlus, FaUserEdit, FaUsers, FaUserCog, FaUserSlash, FaFolder } from 'react-icons/fa'
import { FcCancel } from 'react-icons/fc'
import { FaPlus } from 'react-icons/fa'
import { FaMinus } from 'react-icons/fa'
import { TbWiperWash } from 'react-icons/tb'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { FaEnvelopeOpenText } from 'react-icons/fa'
import { ImEnter, ImListNumbered } from 'react-icons/im'

//Description Detail -Text  Records
import { TbTextWrapDisabled } from 'react-icons/tb'

//ID Card for Trader
import { FaRegAddressCard } from 'react-icons/fa'
import { FaTrashCan } from "react-icons/fa6"
import { TbPackages } from "react-icons/tb";
//Titles
import { TbListDetails } from 'react-icons/tb'
import { IoBarcodeOutline } from "react-icons/io5"
//Text-Desc
import { GrPrint, GrTextAlignFull } from 'react-icons/gr'

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
import { HiOutlineArrowDownOnSquareStack } from "react-icons/hi2"
import { HiOutlineSquaresPlus } from "react-icons/hi2"
import { HiOutlineSquares2X2 } from "react-icons/hi2"

import axios from 'axios'
import MyCustomModal from '../../../../Components/MyCustomModal';
// import FileInput from './FileInput'


//=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*
//const process.env.REACT_APP_API_URL = process.env.REACT_APP_DOTNET_API_DEV
//const process.env.REACT_APP_API_URL = process.env.REACT_APP_DOTNET_API_PUB
//=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*
const ToastWaitTime = 5000
// ==================[  useContext and useReducer Hooks  ]=====================


// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
//                                  P R G  ---   START
// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
export default function EntryFormItems(props) {
  //destructuring    props

  // const { VoucherMode, CrntRec, Categories, HandleInputs, HandleInputsMode, HandleBtnVoucherMode} = props
  const { VoucherMode, CrntRec, Categories, HandleBtnVoucherMode } = props

  const [OrderSheet, setOrderSheet] = useState(CrntRec ? CrntRec : '')
  const [Need2Refresh, setNeed2Refresh] = useState(false);

  const [ShowDeleteModal, setShowDeleteModal] = useState(false);

  // const [selectedImage, setSelectedImage] = useState(null);
  // const [ImgURL, setImgURL] = useState('')
  const DefaultImgURL = require('../AssetsLocal/Images/Default.jpg')


  const PrgID = '1311'
  const VCat = '1311'

  
  //const { Code, RecStatus, Cat, Title, TitleU, TCode, Priority, Pic, PicURL, Unit, QtyDef, QtyInc, QtyStep, Price, Desc, Rem,  CrntBal, QtyMin, QtyMax } = OrderSheet
  const { Id, Code, Title, Contracted, CatItemCode, Desc, Rem, Pic, PicURL, PicURL4Edit, Unit, PackSize, PackType, Margin, Price, PPrice, QtyDef, QtyInc, QtyStep, QtyMin, QtyMax, CrntBal, RecType, RecStatus, Priority, EntryBy, EntryDte } = OrderSheet

  // const [VoucherCart, setVoucherCart] = useState(CrntRec ? CrntRec : RecDefault4M)
  // { VItems: [], VDte: new Date().toDateString(), VNo: 'xxx', VCat: '31', VDesc: '', TCode: 'SAB', VAmt: -9, VQty: -9 })

  // const [VoucherCart, setVoucherCart] = useState({ VItems:iniRec.VItems, VDte:iniRec.VDte, VNo:iniRec.VNo, VDesc: '', TCode: 'SAB', VAmt: -9, VQty: -9 })

  useEffect(() => {
    // if (!VoucherMode ) { alert('Empty VoucherMode- trying to return'); return }
    // console.log('Rcvd CrntRec', CrntRec)
    // DispRecInAlert(CrntRec,'Rcvd CrntRec')

    // if (CrntRec) {    AlertRec (CrntRec, 'crntRec');setOrderSheet(CrntRec)}
    setOrderSheet(VoucherMode == 'Add' ? { ...CrntRec, Id: '', PicURL: '' } : CrntRec)
    // document.getElementById('SelectPhoto').focus();
  }, [Need2Refresh]);


  // ==================[  Fn: Handle Inputs  ]=====================

  const handleFocus = (event) => event.target.select();
  const Input = (props) => <input type="text" value="Some something" onFocus={handleFocus} />

  const HandleDefaultCat = () => {
    // const temp = Categories.at(-1).Id //last
    const temp = Categories.at(0).Code //first
    // AlertRec(Suppliers, 'Setting Default Suppliers :' + temp)
    setOrderSheet({ ...OrderSheet, CatItemCode: temp })
    // setOrderSheet(() => ({ ...OrderSheet, TId: '' }));
    return temp
  }

  const HandleInputs = (e) => {
    // let key = '', value = '';
    // console.log('Input Done:', e.target.name, e.target.value);
    // alert(e.target.name + '  ' + e.target.value)
    // key = e.target.name; value = e.target.value;


    // if (e.target.name === 'TId') {
    //   //const tRec = Suppliers.find(P => P.Id === Number(e.target.value))
    //   // [{ Id: e.target.value, Title: e.target.options[e.target.selectedIndex].text }]
    //   setOrderSheet({ ...OrderSheet, [e.target.name]: Number(e.target.value) });
    // }
    // else
    setOrderSheet({ ...OrderSheet, [e.target.name]: e.target.value });
  }


  // ==============================================================
  //CLEAR Rec is clicked
  //   const HandleBtnClear = () => { alert('Clear pressed'); setRec4M(RecDefault4M) }
  const HandleBtnReset = () => { setNeed2Refresh(p => !p) }

  // ==============================================================
  //CANCEL changes is clicked
  //   const HandleBtnCancel = () => { alert('Cancelled pressed'); setBtnEditClicked(false); setBtnAddnewClicked(false); setInputReadOnly(true); setRec4M(RecDefault4M) }
  const HandleBtnCancel = (Flag2Refresh) => {
    HandleBtnVoucherMode(VoucherMode, false, Flag2Refresh);
  }

  // ==============================================================
  //SAVE changes is clicked
  const HandleBtnSave = (e) => {
    e.preventDefault();

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
    // alert('DELETE Record: Rec4M')

    CallDotAPI2Delete()
  }


  // =======================================================================
  // ==================[  Fns: DATABASE/ API Handling ]=====================
  // =======================================================================
  // --------------------------------------------------------------------------------------------------------------------
  // ------------- AddNew/Create RECORD ----------------
  // --------------------------------------------------------------------------------------------------------------------

  const CallDotAPI2SaveAddNew = async () => {
    // AlertRec(OrderSheet, 'Data Ready to Send')
    // const { Code, RecStatus, CatItemCode, Title, TitleU, TCode, Priority, Pic, PicURL, Unit, QtyDef, QtyInc, QtyStep, Price, Desc, Rem,  CrntBal, QtyMin, QtyMax } = OrderSheet
    const { Id, Code, Title, Contracted, CatItemCode, Desc, Rem, Pic, PicURL, PicURL4Edit, Unit, PackSize, PackType, Margin, Price, PPrice, QtyDef, QtyInc, QtyStep, QtyMin, QtyMax, CrntBal, RecType, RecStatus, Priority, EntryBy, EntryDte } = OrderSheet

    // if (!(Code)) {
    //   alert('CODE is invalid. \nPlz Check CODE entered.'); return
    // }

    // if (!Categories.find(s => s.Code === CatItemCode)) {
    //   //alert('Supplier is invalid. \nPlz check voucher entry. ' + [TId]); return
    //   toast.error('Category is invalid. \nPlz Reset Category entry. [ ' + CatItemCode + ' ]', { theme: 'colored', autoClose: ToastWaitTime, })
    //   return
    // }

    if (!(Code)) {
      toast.error('Code is invalid. \nPlz Check Code entry.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }
    if (!(Title)) {
      toast.error('Title is invalid. \nPlz Check Title entry.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }
    if (!Categories.find(s => s.Code === CatItemCode)) {
      //alert('Supplier is invalid. \nPlz check voucher entry. ' + [TId]); return
      toast.error('Category is invalid. \nPlz Reset Category entry. [ ' + CatItemCode + ' ]', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }


    const Data2SendInDatabase = {
      "Id": 0,

      "RecType": RecType.substr(0, 10),         //RecType.Substring(0, Math.min(RecType.Length, 10)) ,
      "RecStatus": RecStatus.substr(0, 10),
      "Priority": Priority.substr(0, 10),

      "Code": Code.substr(0, 5),
      "Title": Title.substr(0, 50),
      "Desc": Desc.substr(0, 50),
      "Rem": Rem.substr(0, 50),

      "Contracted": Contracted,
      "CatItemCode": CatItemCode,
      // "TId": Number(TId),
      // "Pic": Pic,
      // "PicURL": (Pic ? Title.trim().substr(0, Math.min(Title.trim().length, 10)) + DateTimeStamp() + '.png': ''),      
      "PicURL": (Pic ? Title.replace(/ /g, '').substr(0, 10) + DateTimeStamp() + '.png' : ''),

      "Unit": Unit.substr(0, 10),
      "PackSize":PackSize.substr(0, 10),
      "PackType":PackType.substr(0, 10),
    
      "Margin": Number(Margin),

      "QtyDef": Number(QtyDef),
      "QtyInc": Number(QtyInc),
      "QtyStep": Number(QtyStep),
      "QtyMin": Number(QtyMin),
      "QtyMax": Number(QtyMax),

      "Price": Number(Price),
      "PPrice": Number(PPrice),

      "CrntBal": Number(CrntBal),

      "EntryBy": "xUSERx",
      "EntryDte": new Date()
    }

    // if (!AlertConfirm(Data2SendInDatabase, 'Add New Record ?')) return

    // DispAPIInAlert(Data2SendInDatabase, 'Data2SendInDatabase')
    // formData.append('username', 'Chris');
    // formData.append('userpic', myFileInput.files[0], 'chris1.jpg');
    // formData.append('userpic', myFileInput.files[1], 'chris2.jpg');

    //=*=*=*=*=*=*=*=*=*=*=*=[ Get New Next Available Code ]=*=*=*=*=*=*=*=*=*=*=*=
    const VNO_NEW = 'VNO' //SetPadLeftZero((await (await fetch(`/api/VNoTrack/${VCat}`, { method: 'GET' })).json()).VNo, 3)
    // alert('VNoTrack.VNo VNO_NEW: ' + SetPadLeftZero(VNO_NEW,3))
    //=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=



    //=====[   READY to send data in Database   ]========  
    //-------------------------------------------------------

    // //'.'.'.'.'.'.'   DUPLICATE CHECK.............
    // const rec = await fetch(`/api/Item/${OrderSheet.Code}`, { method: 'GET' })

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
    fetch(process.env.REACT_APP_API_URL + 'Items', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(Data2SendInDatabase)
    })
      .then(res => res.json())
      .then((result) => {
        HandleBtnCancel(true)

        //-------------------------------------------------------
        //[ Part -2/2 >>> Image uploading ]
        if (Pic) {
          // var ext =  fileName.split('.').pop();
          // const FILENAME = VNO_NEW + '.jpg'    //+ '.' + PicURL.split('.').pop()
          //const filename = Data2SendInDatabase.Title + DateTimeStamp() + '.png'    //product.PicURL

          // setPhotofilename(e.target.files[0].name);
          const formData = new FormData();
          //     // formData.append('username', 'Chris');
          //     // formData.append('userpic', myFileInput.files[0], 'chris1.jpg');
          // for (let [key, value] of fd.entries()) { console.log(key, value);}
          formData.append("ImageFile", Pic, Data2SendInDatabase.PicURL);

          fetch(process.env.REACT_APP_API_URL + 'Items/SaveFile', { method: 'POST', body: formData })
            .then(res => res.json())
            .then((result) => {
              // alert('Photo Successfully Saved: ' + Data2SendInDatabase.PicURL + '\n' + "Response: " + result)
              toast.success('Record Saved Successfully:* [' + Title + ']', { theme: 'colored', autoClose: ToastWaitTime, position: "top-left" })

            }, (error) => { alert('ERROR--- Photo Uploading is Failed: ' + Data2SendInDatabase.PicURL); Data2SendInDatabase.PicURL = '' })
        }
        else {
          toast.success('Record Saved Successfully: [' + Title + ']', { theme: 'colored', autoClose: ToastWaitTime, position: "top-left" })
        }
        //-------------------------------------------------------

        //toast.success('Record Saved Successfully: Bypassing Image Section', { theme: 'colored', autoClose: ToastWaitTime, })
      }

        , (error) => { alert('ERROR--- Add-New Action Result: ' + 'Failed'); })

    //     //History.push(CatItemCode"/Home");
    HandleBtnCancel(true)
  }



  // --------------------------------------------------------------------------------------------------------------------
  // ------------- Update RECORD ----------------
  // --------------------------------------------------------------------------------------------------------------------
  const CallDotAPI2SaveUpdate = async () => {
    // alert('Now Saving Data for Update in Database')

    // AlertRec(VoucherCart, 'Data Ready to Send')
    // const { Code, RecStatus, Cat, Title, TitleU, TCode, Priority, Pic, PicURL, Unit, QtyDef, QtyInc, QtyStep, Price, Desc, Rem, , CrntBal, QtyMin, QtyMax } = OrderSheet
    //const { Id, Code, Title, TitleU, Desc, Rem, CatItemCode, TId, Pic, PicURL, Unit, Price, QtyDef, QtyInc, QtyStep, QtyMin, QtyMax,  CrntBal, RecType, RecStatus, Priority, EntryBy, EntryDte } = OrderSheet
    const { Id, Code, Title, Contracted, CatItemCode, Desc, Rem, Pic, PicURL, PicURL4Edit, Unit, PackSize, PackType, Margin, Price, PPrice, QtyDef, QtyInc, QtyStep, QtyMin, QtyMax, CrntBal, RecType, RecStatus, Priority, EntryBy, EntryDte } = OrderSheet

    // if (!(Code)) {
    //   alert('CODE is invalid. \nPlz Check CODE entered.'); return
    // }

    // if (!Categories.find(s => s.Code === CatItemCode)) {
    //   //alert('Supplier is invalid. \nPlz check voucher entry. ' + [TId]); return
    //   toast.error('Category is invalid. \nPlz Reset Category entry. [ ' + CatItemCode + ' ]', { theme: 'colored', autoClose: ToastWaitTime, })
    //   return
    // }

    if (!(Code)) {
      toast.error('Code is invalid. \nPlz Check Code entry.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }
    if (!(Title)) {
      toast.error('Title is invalid. \nPlz Check Title entry.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }

    const Data2SendInDatabase = {
      "Id": Id,

      "RecType": RecType.substr(0, 10),         //RecType.Substring(0, Math.min(RecType.Length, 10)) ,
      "RecStatus": RecStatus.substr(0, 10),
      "Priority": Priority.substr(0, 10),

      "Code": Code.substr(0, 5),
      "Title": Title.substr(0, 50),
      "Desc": Desc.substr(0, 50),
      "Rem": Rem.substr(0, 50),

      "Contracted": Contracted,
      "CatItemCode": CatItemCode,
      // "TId": Number(TId),

      // "Pic": Pic,
      //"PicURL": PicURL.substr(0, 50),
      "PicURL": (Pic ? Title.replace(/ /g, '').substr(0, 10) + DateTimeStamp() + '.png' : PicURL),

      "Unit": Unit.substr(0, 10),
      "PackSize":PackSize.substr(0, 10),
      "PackType":PackType.substr(0, 10),
    
      "Margin": Number(Margin),

      "QtyDef": Number(QtyDef),
      "QtyInc": Number(QtyInc),
      "QtyStep": Number(QtyStep),
      "QtyMin": Number(QtyMin),
      "QtyMax": Number(QtyMax),

      "Price": Number(Price),
      "PPrice": Number(PPrice),

      "CrntBal": Number(CrntBal),

      "EntryBy": "xUSERx",
      "EntryDte": new Date()
    }

    //    if (!AlertConfirm(Data2SendInDatabase, 'Record Ready to Update? ')) return




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

      fetch(process.env.REACT_APP_API_URL + 'Items/SaveFile', { method: 'POST', body: formData })
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

      fetch(process.env.REACT_APP_API_URL + 'Items/RemoveFile/' + PicURL4Edit, { method: 'DELETE' })
        .then(res => res.json())
        .then((result) => {
          // console.log('result: ', result);
          // alert('DELETE Old-Photo Action Success-Result: ' + result);
        }
          , (error) => { alert('ERROR--- DELETE Photo Action Result: ' + 'Failed'); })
    }


    //[ Part -2/2 >>> Data uploading ]
    //-------------------------------------------------------
    fetch(process.env.REACT_APP_API_URL + `Items/${Id}`, {
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

  // const CallAPI2SaveUpdate = async () => {
  //   alert('Now Saving Data for Update in Database')

  //   // AlertRec(VoucherCart, 'Data Ready to Send')
  //   // const { Code, RecStatus, Cat, Title, TitleU, TCode, Priority, Pic, PicURL, Unit, QtyDef, QtyInc, QtyStep, Price, Desc, Rem,  CrntBal, QtyMin, QtyMax } = OrderSheet
  //   const { Id, Code, Title, TitleU, Desc, Rem, CatItemCode, TId, Pic, PicURL, Unit, Price, QtyDef, QtyInc, QtyStep, QtyMin, QtyMax,  CrntBal, RecType, RecStatus, Priority, EntryBy, EntryDte } = OrderSheet

  //   if (!(Code)) {
  //     alert('CODE is invalid. \nPlz Check CODE entered.'); return
  //   }

  //   if (!Suppliers.find(s => s.Id === TId)) {
  //     alert('Supplier is invalid. \nPlz Reset Supplier entry.'); return
  //   }
  //   if (!Categories.find(s => s.Code.trim()  === CatItemCode.trim() )) {
  //     alert('Category is invalid. \nPlz Reset Category entry.'); return
  //   }

  //   if (!(Title || TitleU)) {
  //     alert('Titles are invalid. \nPlz Check Title entries.'); return
  //   }

  //   // const Data2SendInDatabase = {
  //   //   // "Code": Code,
  //   //   "RecStatus": RecStatus,
  //   //   "Cat": Cat,
  //   //   "Title": Title,
  //   //   "TitleU": TitleU,
  //   //   "TCode": TCode,
  //   //   "Priority": Priority,
  //   //   "Pic": Pic,
  //   //   "PicURL": PicURL,
  //   //   "Unit": Unit,
  //   //   "QtyDef": QtyDef,
  //   //   "QtyInc": QtyInc,
  //   //   "QtyStep": QtyStep,
  //   //   "Price": Price,
  //   //   "Desc": Desc,
  //   //   "Rem": Rem,
  //   //   "CrntBal": CrntBal,
  //   //   "QtyMin": QtyMin,
  //   //   "QtyMax": QtyMax,

  //   //   "EntryBy": "xUSERx",
  //   //   "EntryDte": new Date()
  //   // }

  //   // AlertRec(Data2SendInDatabase, 'Data2SendInDatabase')
  //   // DispAPIInAlert(Data2SendInDatabase, 'Data2SendInDatabase')


  //   // var ext =  fileName.split('.').pop();
  //   const FILENAME = Code + '.jpg'    //+ '.' + PicURL.split('.').pop()

  //   const formData = new FormData
  //   // formData.append("Code", Code)
  //   formData.append("RecStatus", RecStatus)
  //   formData.append("Cat", CatItemCode)
  //   formData.append("Title", Title)
  //   formData.append("TitleU", TitleU)
  //   formData.append("TCode", TId)
  //   formData.append("Priority", Priority)
  //   //  formData.append(  "Pic", Pic)
  //   formData.append("PicURL", ((PicURL || Pic) ? FILENAME : ''))
  //   formData.append("Unit", Unit)
  //   formData.append("QtyDef", QtyDef === null ? 0 : QtyDef)
  //   formData.append("QtyInc", QtyInc === null ? 0 : QtyInc)
  //   formData.append("QtyStep", QtyStep === null ? 0 : QtyStep)
  //   formData.append("Price", Price === null ? 0 : Price)
  //   formData.append("Desc", Desc)
  //   formData.append("Rem", Rem)
  //   formData.append("CrntBal", CrntBal === null ? 0 : CrntBal)
  //   formData.append("QtyMin", QtyMin === null ? 0 : QtyMin)
  //   formData.append("QtyMax", QtyMax === null ? 0 : QtyMax)
  //   formData.append("EntryBy", 'xUSERx')
  //   formData.append("EntryDte", new Date())

  //   if (Pic) {
  //     // alert('Yes Image is present for Update')
  //     // formData.append('Pic', Pic, PicURL);
  //     formData.append('Pic', Pic, FILENAME);
  //   }

  //   // console.log('FORM DATA :', formData)
  //   // for (let [key, value] of formData.entries()) { console.log(key, value); }

  //   //=====[   READY to send data in Database   ]========  
  //   //-------------------------------------------------------
  //   // const res = await fetch(`/api/Procedure/${Vid}`, {
  //   const res = await fetch(`/api/Procedure/${Code}`, {
  //     method: 'PUT',
  //     body: formData
  //   })
  //   if (res.status === 201) {
  //     window.alert("Record Saved");
  //     const data = await res.json();
  //   }
  //   else {
  //     window.alert("Somthing is wrong in saving data.");
  //     //History.push("/Home");
  //   }

  //   // const data = await res.json();
  //   // const data = res.json();
  //   // console.log('Saved Record Returned:', data);
  //   // AlertRec(res, 'Returned Saved Record')

  //   // if (res.status === 422 || !data) { window.alert("Transaction Invalid."); }
  //   // else {
  //   //     window.alert("Transaction Successful.");
  //   //     //History.push("/Home");
  //   // }

  //   // alert('Data is Sent in Database')
  //   // setNeed2Refresh4M(!Need2Refresh4M)
  //   HandleBtnCancel(true)
  // }


  //  const CallAPI2SaveAddNew = async () => {
  //     // AlertRec(VoucherCart, 'Data Ready to Send')
  //     const { Code, RecStatus, Cat, Title, TitleU, TId, Priority, Pic, PicURL, Unit, QtyDef, QtyInc, QtyStep, Price, Desc, Rem,  CrntBal, QtyMin, QtyMax } = OrderSheet

  //     // if (!(Code)) {
  //     //   alert('CODE is invalid. \nPlz Check CODE entered.'); return
  //     // }
  //     if (!Suppliers.find(s => s.Code === TCode)) {
  //       alert('Supplier is invalid. \nPlz Reset Supplier entry.'); return
  //     }
  //     if (!Categories.find(s => s.Id === Cat)) {
  //       alert('Category is invalid. \nPlz Reset Category entry.'); return
  //     }

  //     if (!(Title || TitleU)) {
  //       alert('Titles are invalid. \nPlz Check Title entries.'); return
  //     }

  //     // const Data2SendInDatabase = {
  //     //   "Code": Code,
  //     //   "RecStatus": RecStatus,
  //     //   "Cat": Cat,
  //     //   "Title": Title,
  //     //   "TitleU": TitleU,
  //     //   "TCode": TCode,
  //     //   "Priority": Priority,
  //     //   // "Pic": Pic,
  //     //   "PicURL": PicURL,
  //     //   "Unit": Unit,
  //     //   "QtyDef": QtyDef,
  //     //   "QtyInc": QtyInc,
  //     //   "QtyStep": QtyStep,
  //     //   "Price": Price,
  //     //   "Desc": Desc,
  //     //   "Rem": Rem,
  //     //   "CrntBal": CrntBal,
  //     //   "QtyMin": QtyMin,
  //     //   "QtyMax": QtyMax,

  //     //   "EntryBy": "xUSERx",
  //     //   "EntryDte": new Date()
  //     // }
  //     // DispAPIInAlert(Data2SendInDatabase, 'Data2SendInDatabase')
  //     // formData.append('username', 'Chris');
  //     // formData.append('userpic', myFileInput.files[0], 'chris1.jpg');
  //     // formData.append('userpic', myFileInput.files[1], 'chris2.jpg');


  //     //=*=*=*=*=*=*=*=*=*=*=*=[ Get New Next Available Code ]=*=*=*=*=*=*=*=*=*=*=*=
  //     const VNO_NEW = SetPadLeftZero((await (await fetch(`/api/VNoTrack/${VCat}`, { method: 'GET' })).json()).VNo, 3)
  //     // alert('VNoTrack.VNo VNO_NEW: ' + SetPadLeftZero(VNO_NEW,3))
  //     //=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=

  //     // var ext =  fileName.split('.').pop();
  //     const FILENAME = VNO_NEW + '.jpg'    //+ '.' + PicURL.split('.').pop()

  //     const formData = new FormData
  //     formData.append("Code", VNO_NEW)
  //     formData.append("ItemStatus", ItemStatus)
  //     formData.append("Cat", Cat)
  //     formData.append("Title", Title)
  //     formData.append("TitleU", TitleU)
  //     formData.append("TCode", TCode)
  //     formData.append("Priority", Priority)
  //     //  formData.append(  "Pic", Pic)
  //     formData.append("PicURL", (Pic ? FILENAME : ''))
  //     formData.append("Unit", Unit)
  //     formData.append("QtyDef", QtyDef === null ? 0 : QtyDef)
  //     formData.append("QtyInc", QtyInc === null ? 0 : QtyInc)
  //     formData.append("QtyStep", QtyStep === null ? 0 : QtyStep)
  //     formData.append("Price", Price === null ? 0 : Price)
  //     formData.append("Desc", Desc)
  //     formData.append("Rem", Rem)
  //     formData.append("CrntBal", CrntBal === null ? 0 : CrntBal)
  //     formData.append("QtyMin", QtyMin === null ? 0 : QtyMin)
  //     formData.append("QtyMax", QtyMax === null ? 0 : QtyMax)
  //     formData.append("EntryBy", 'xUSERx')
  //     formData.append("EntryDte", new Date())

  //     if (Pic) {
  //       // formData.append('Pic', Pic, PicURL);
  //       // alert('Yes Image is present')
  //       formData.append('Pic', Pic, FILENAME);
  //     }
  //     // console.log('FORM DATA :',formData)
  //     // for (let [key, value] of fd.entries()) { console.log(key, value);}


  //     //=====[   READY to send data in Database   ]========  
  //     //-------------------------------------------------------

  //     // //'.'.'.'.'.'.'   DUPLICATE CHECK.............
  //     // const rec = await fetch(`/api/Item/${OrderSheet.Code}`, { method: 'GET' })

  //     // if (rec.status === 200) {
  //     //   // const data = await rec.json();
  //     //   // AlertRec(data, 'Available Code')

  //     //   alert('Entered CODE is already available.\nDuplication of CODE is not allowed.');
  //     //   return
  //     // }
  //     // // else { alert('Status Check: Entered CODE is Not available. ' + rec.status); return }


  //     // const res = await fetch('/api/Item', {
  //     //   method: 'POST', headers: { 'Content-Type': "application/json" },
  //     //   body: JSON.stringify(Data2SendInDatabase)
  //     // })
  //     // const data = await res.json();
  //     // // console.log('Saved Record Returned:', data);
  //     // AlertRec(data, 'Returned Saved Record')
  //     //..........................


  //     // axios.post('http://localhost:5000/api/Item',fd)
  //     // const res = await fetch('/save', {

  //     const res = await fetch('/api/Item', {
  //       method: 'POST',
  //       // enctype:"multipart/form-data",
  //       body: formData
  //     })
  //     const data = await res.json();


  //     // console.log('Saved Record Returned:', data);
  //     // AlertRec(data, 'Returned Saved Record')

  //     //...............................................
  //     // if (res.status === 422 || !data) { window.alert("Transaction Invalid."); }
  //     // else {
  //     //     window.alert("Transaction Successful.");
  //     //     //History.push("/Home");
  //     // }

  //     // alert('Data is Sent in Database')
  //     // setNeed2Refresh4M(!Need2Refresh4M)
  //     HandleBtnCancel(true)
  //   }


  // --------------------------------------------------------------------------------------------------------------------
  // ------------- Delete  RECORD ----------------
  // --------------------------------------------------------------------------------------------------------------------

  const CallDotAPI2Delete = async () => {
    // alert('Now Deleting Data from Database Section val:')

    const { Id, Title, PicURL, PicURL4Edit } = OrderSheet


    //[ Part -1/2 >>> Data uploading ]
    //-------------------------------------------------------
    fetch(process.env.REACT_APP_API_URL + `Items/${Id}`, {
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
          fetch(process.env.REACT_APP_API_URL + 'Items/RemoveFile/' + PicURL4Edit, { method: 'DELETE' })
            .then(res => res.json())
            .then((result) => {
              // alert('DELETE Old-Photo Action Success-Result: ' + result);
              //toast.warn('Record Deleted Successfully: W/- Photo', { theme: 'colored', autoClose: ToastWaitTime, })
            }
              , (error) => { alert('ERROR--- DELETE Photo Action Result: ' + 'Failed'); })
        }

      }
        // , (error) => { alert('ERROR--- DELETE Photo Action Result: ' + 'Failed'); })
        , (error) => { toast.error('ERROR--- Failed, Delete Action Result: ' + error, { theme: 'colored', autoClose: ToastWaitTime, }) }
      )


    // alert('Record is DELETED from Database')
    HandleBtnCancel(true)
  }





  useEffect(() => {
    // const searchQuery = document.querySelector("#searchQ").value;
    // console.log(searchQuery);
    // loadURLToInputFiled('f:/bilal.png')    

    //     alert('OrderSheet.PicURL :'+OrderSheet.PicURL)
    //     AlertRec(OrderSheet,'OrderSheet')
    // alert('../ItemsStore/' + OrderSheet.PicURL)

    LoadImg2InputField('F:/bilal.png', OrderSheet.PicURL)

    // loadTemp('F:/bilal.png')
  }, []);

  function LoadImg2InputField(img, fileName) {
    // Load img blob to input
    // WIP: UTF8 character error
    // let fileName = 'hasFilename.jpg'
    // let file = new File([imgBlob], fileName,{type:"image/jpeg", lastModified:new Date().getTime()}, 'utf-8');
    // let file = new File(['../ItemsStore/' +'BigBird.png'], fileName, { type: "image/jpeg", lastModified: new Date().getTime() }, 'utf-8');
    // let file = new File(['F:/MyReactApps/MyProjects/daSys/client/public/Images/ItemsStore/' +'BigBird.png'], fileName, { type: "image/jpeg", lastModified: new Date().getTime() }, 'utf-8');
    // let fileName = 'hasFilename.jpg'
    let file = new File([img], fileName, { type: "image/jpeg", lastModified: new Date().getTime() }, 'utf-8');
    let container = new DataTransfer();
    container.items.add(file);
    document.querySelector('#inputPhoto').files = container.files;
    // ERR: setOrderSheet({ ...OrderSheet, Pic: container.files[0] });

    // inputPhoto.files = container.files;
  }

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

      <div className='card flex  m-0 p-1 flex-col text-start ' style={{ width: '100%', fontSize: '12px', background: '#e0e0e0', borderRadius: '5px' }}>

        {/* =================================================================================== */}
        {/* =====[    Main Prg /CARD HEADDER start            ]===========================================  */}
        {/* =================================================================================== */}
        <div className='card-header flex gap-1 px-2  m-0 items-center ' style={{ background: '#bebebe' }}>
          <span className='text-xl'><strong>Items Detail</strong></span>


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

          {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-= [        ROW  1/2       ]-=-=-=-=-=-=-=-=-=-=-=-=-=-= */}
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
                    <TbListDetails />
                  </span>
                  <div className="relative w-full">
                    <input type="text" id="Desc" name="Desc" className="block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="" value={Desc} maxLength={30} onChange={(e) => HandleInputs(e)} />
                    <label for="Desc" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                      Description</label>
                  </div>
                </div>

                {/* ---[ Input Items Categories ]--- */}
                <div className='flex '>
                  <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                    <TbIcons />
                  </span>

                  <div className="relative w-full">
                    {/* <input type="text" id="Desc" name="Desc" className="block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="" value={Desc} maxLength={30} onChange={(e) => HandleInputs(e)} /> */}

                    <select class="block px-2.5 pb-0 pt-4  w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                      value={CatItemCode ? CatItemCode : HandleDefaultCat()}
                      id="CatItemCode" name="CatItemCode" placeholder=""
                      // disabled={InputReadOnly}
                      // <option value="01">Cheese</option>
                      // <option value="02">Milk</option>
                      // <option value="03">Fries</option>
                      // <option value="04">Other</option>

                      onChange={(e) => {
                        // console.log(e.target.name, e.target.value);
                        HandleInputs(e)
                        // setRec4M({ ...OrderSheet, Cat: { ...Cat, Code: e.target.value } })
                      }}  >
                      {Categories
                        ? Categories.map((E, I) => {
                          return (<option key={E.Code} value={E.Code} >{E.Title} </option>)
                        })
                        : ''
                      }

                    </select>
                    <label for="CatItemCode" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                      Item Category</label>
                  </div>
                </div>

                {/* ---[ Input Rem ]--- */}
                <div className='flex'>
                  <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                    <TbTextWrapDisabled />
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
                <div className="mx-auto my-1 " style={{ width: '70%', borderTop: "2px solid lightgray " }}></div>
                {/* ============================================================== */}


                {/* BLOCK -- Staus Priority */}
                <div className=" mt-0 flex gap-2">

                  {/* ---[ Input Unit ]--- */}
                  <div className='flex'>
                    <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                      <GiWeight />
                    </span>
                    <div className="relative">
                      <input type="text" id="PackSize" name="PackSize" className="block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="" value={PackSize} maxLength={10} onChange={(e) => HandleInputs(e)} onFocus={handleFocus} />
                      <label for="PackSize" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        Pack Size</label>
                    </div>
                  </div>

                  {/* ---[ Input Packing Type ]--- */}
                  <div className='flex'>
                    <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                      <TbPackages />
                    </span>
                    <div className="relative">
                      <input type="text" id="PackType" name="PackType" className="block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="" value={PackType} maxLength={10} onChange={(e) => HandleInputs(e)} onFocus={handleFocus} />
                      <label for="PackType" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        Packing Type</label>
                    </div>
                  </div>


                </div>


              </div>
            </div>

            {/* --PHOTO SESCTION--------------------- [        ROW  1/2,  Col 1/3       ]----------------------------------- */}
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
                        ? process.env.REACT_APP_API_URL + 'Items/GetFile/' + OrderSheet.PicURL
                        : DefaultImgURL} />}

                </div>

              </div>




            </div>

          </div>
          {/* END     -=-=-=-=-=-=-=-=-=-=-=-=-=-= [        ROW  1/2       ]-=-=-=-=-=-=-=-=-=-=-=-=-=-= */}


          {/* ----------------------- [        ROW  2/2       ]----------------------------------- */}
          <div className="flex p-0 gap-1 m-0 justify-between ">

            {/* ----------------------- [        ROW  2/2,  Col 1/3       ]----------------------------------- */}
            <div className="card p-2" style={{ width: "33%" }} >

              {/* ---[ Input Purchase Price ]--- */}
              <div className='flex'>
                <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                  <GiPriceTag />
                </span>
                <div className="relative">
                  <input type="text" id="PPrice" name="PPrice" className="text-end block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="" value={PPrice} onChange={(e) => HandleInputs(e)} onFocus={handleFocus} />
                  <label for="PPrice" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    <span className=' md:hidden'>P-Price</span>
                    <span className=' hidden md:block'>Purchase Price</span>
                  </label>
                </div>
              </div>

              {/* ---[ Input Sale Price ]--- */}
              <div className='flex mt-2'>
                <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                  <GiPriceTag />
                </span>
                <div className="relative">
                  <input type="text" id="Price" name="Price" className="text-end block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="" value={Price} onChange={(e) => HandleInputs(e)} onFocus={handleFocus} />
                  <label for="Price" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    Sale Price
                  </label>
                </div>
              </div>

              {/* ---[ Input Distributive Margin ]--- */}
              <div className='flex mt-2'>
                <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                  <GiPriceTag />
                </span>
                <div className="relative">
                  <input type="text" id="Margin" name="Margin" className="text-end block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="" value={Margin} onChange={(e) => HandleInputs(e)} onFocus={handleFocus} />
                  <label for="Margin" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    <span className=' md:hidden'>Margin</span>
                    <span className=' hidden md:block'>Distributive Margin</span>
                  </label>
                </div>
              </div>


            </div>

            {/* ----------------------- [        ROW  2/2,  Col 2/3       ]----------------------------------- */}


            <div className="card p-2" style={{ width: "33%" }} >

              {/* ---[ Input QtyDef ]--- */}
              <div className='flex'>
                <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                  <HiOutlineArrowDownTray />
                </span>
                <div className="relative">
                  <input type="text" id="QtyDef" name="QtyDef" className="text-end block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="" value={QtyDef} onChange={(e) => HandleInputs(e)} onFocus={handleFocus} />
                  <label for="QtyDef" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    <span className=' md:hidden'>Default</span>
                    <span className=' hidden md:block'>Default Addition</span>
                  </label>
                </div>
              </div>

              {/* ---[ Input QtyInc ]--- */}
              <div className='flex'>
                <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                  <HiOutlineSquaresPlus />
                </span>
                <div className="relative">
                  <input type="text" id="QtyInc" name="QtyInc" className="text-end block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="" value={QtyInc} onChange={(e) => HandleInputs(e)} onFocus={handleFocus} />
                  <label for="QtyInc" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    <span className=' md:hidden'>Increase</span>
                    <span className=' hidden md:block'>Increase in Qty</span>
                  </label>
                </div>
              </div>


              {/* ---[ Input QtyStep ]--- */}
              <div className='flex'>
                <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                  <HiOutlineSquares2X2 />
                </span>
                <div className="relative">
                  <input type="text" id="QtyStep" name="QtyStep" className="text-end block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="" value={QtyStep} onChange={(e) => HandleInputs(e)} onFocus={handleFocus} />
                  <label for="QtyStep" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    <span className=' md:hidden'>Increment</span>
                    <span className=' hidden md:block'>Incremental Step</span>
                  </label>
                </div>
              </div>


              {/* divider line --------------------------------------------------------------------------*/}
              <div className="mx-auto my-1 " style={{ width: '70%', borderTop: "2px solid lightgray " }}></div>

              {/* ---[ Input QtyMin ]--- */}
              <div className='flex'>
                <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                  <HiOutlineArrowDownOnSquareStack />
                </span>
                <div className="relative">
                  <input type="text" id="QtyMin" name="QtyMin" className="text-end block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="" value={QtyMin} onChange={(e) => HandleInputs(e)} onFocus={handleFocus} />
                  <label for="QtyMin" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    <span className=' md:hidden'>Min Stock</span>
                    <span className=' hidden md:block'>Min Stock Level</span>
                  </label>
                </div>
              </div>

              {/* ---[ Input QtyMax ]--- */}
              <div className='flex'>
                <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                  <HiOutlineArrowUpOnSquareStack />
                </span>
                <div className="relative">
                  <input type="text" id="QtyMax" name="QtyMax" className="text-end block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="" value={QtyMax} onChange={(e) => HandleInputs(e)} onFocus={handleFocus} />
                  <label for="QtyMax" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    <span className=' md:hidden'>Max Stock</span>
                    <span className=' hidden md:block'>Max Stock Level</span>
                  </label>
                </div>
              </div>


            </div>

            {/* ----------------------- [        ROW  2/2,  Col 3/3       ]----------------------------------- */}
            {/* ---[ Current Balance CrntBal ]--- */}
            <div className="card p-2" style={{ width: "33%" }} >

              {/* ---[ Input Items RecStatus ]--- */}
              <div className='flex w-full'>
                <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                  <HiStatusOffline />
                </span>

                <div className="relative w-full">
                  {/* <input type="text" id="Desc" name="Desc" className="text-end block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder="" value={Desc} maxLength={30} onChange={(e) => HandleInputs(e)} /> */}

                  <select class="block px-2.5 pb-0 pt-4  w-full text-end text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    // value={RecStatus ? RecStatus : HandleDefaultCat()}
                    value={RecStatus}
                    id="RecStatus" name="RecStatus" placeholder=""

                    onChange={(e) => {
                      // console.log(e.target.name, e.target.value);
                      HandleInputs(e)
                      // setRec4M({ ...OrderSheet, Cat: { ...Cat, Code: e.target.value } })
                    }}  >

                    {/* disabled={InputReadOnly} */}
                    <option value="01">Active</option>
                    <option value="02">Dorment</option>
                    <option value="03">Inactive</option>
                    <option value="04">Stopped</option>
                    <option value="05">Closed</option>

                    {/* {Categories
                          ? Categories.map((E, I) => {
                            return (<option key={E.Code} value={E.Code} >{E.Title} </option>)
                          })
                          : ''
                        } */}

                  </select>
                  <label for="RecStatus" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    Rec Status</label>
                </div>
              </div>

              {/* ---[ Input Priority ]--- */}
              <div className='flex mt-1'>
                <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                  <MdLowPriority />
                </span>
                <div className="relative w-full">
                  <input type="text" id="Priority" name="Priority" className="text-end block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="" value={Priority} maxLength={10} onChange={(e) => HandleInputs(e)} />
                  <label for="Priority" className="absolute text-end text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    Priority
                  </label>
                </div>
              </div>

              {/* ============================================================== */}
              {/* divider line --------------------------------------------------------------------------*/}
              <div className="mx-auto my-1 " style={{ width: '70%', borderTop: "2px solid lightgray " }}></div>


              {/* ---[ Input OpBal ]--- */}
              <div className='flex'>
                <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                  <HiOutlineArrowUpOnSquareStack />
                </span>
                <div className="relative">
                  <input type="text" id="OpBal" name="OpBal" className="text-end block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="" disabled value={CrntBal} onChange={(e) => HandleInputs(e)} onFocus={handleFocus} />
                  <label for="OpBal" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    <span className=' md:hidden'>Op Stock</span>
                    <span className=' hidden md:block'>Opening Stock</span>
                  </label>
                </div>
              </div>

              {/* ---[ Input CrntBal ]--- */}
              <div className='flex mt-1'>
                <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                  <HiOutlineArrowUpOnSquareStack />
                </span>
                <div className="relative">
                  <input type="text" id="CrntBal" name="CrntBal" className="text-end block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="" disabled value={CrntBal} onChange={(e) => HandleInputs(e)} onFocus={handleFocus} />
                  <label for="CrntBal" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    <span className=' md:hidden'>Stock Bal.</span>
                    <span className=' hidden md:block'>Stock Balance</span>
                  </label>
                </div>
              </div>





            </div>


            {/* ---- [   END OF VOUCHER INPUT DETAIL  ]----------------------------------- */}


          </div>


        </div>  {/* END- Card Body Ends Here */}



        {/* =================================================================================== */}
        {/* =====[    END   --- Main Prg /CARD BODY            ]===================================  */}
        {/* =================================================================================== */}
      </div> {/* END- Main Card Ends Here */}






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

                  <img src={process.env.REACT_APP_API_URL + `Items/GetFile/${OrderSheet.PicURL}`} style={{ width: "100%", height: '100%' }} alt="..." />
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
                <img src={process.env.REACT_APP_API_URL + `Items/GetFile/${OrderSheet.PicURL}`} style={{ width: "100%", height: '100%' }} alt="..." />
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

    </>
  )
}