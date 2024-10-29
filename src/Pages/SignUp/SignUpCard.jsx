import React, { useState, useEffect, useReducer, createContext, createRef } from 'react'
// import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
// import Image from "next/image";
import { useLocation } from 'react-router-dom';

import axios from 'axios';

import { FaUser, FaUserPlus } from "react-icons/fa";
import { FaKey, FaTrashCan } from "react-icons/fa6"
import { RiIdCardLine } from "react-icons/ri";
import { useCtxMainContextHook } from '../../CtxMain';

//Two file needed for toasify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AlertRec, GetNewID } from '../../StdLib';
import { useNavigate } from 'react-router-dom';
import { CgCloseO } from 'react-icons/cg';

import DefaultImgURL from '../../SiteImages/Default/DefaultUsersMix.jpg'


// ==================[  useContext and useReducer Hooks  ]=====================

const reducerFn = (crntState, action) => {
  switch (action.type) {
    case 'FETCH_LOADING': return ({ ...crntState, Loading: true }); break;
    case 'FETCH_SUCCESS': return ({ ...crntState, Loading: false, DATA_RECS: action.payload }); break;
    case 'FETCH_ERROR': return ({ ...crntState, Loading: false, Error: action.payload }); break;

    default: return (crntState)
  }
}

const DefaultRec = {
  ID: '', PW: '', PW2: '',
  Title: '',
  Desc: '',

  Rem: '',
  RoleId: 6,

  PicURL: '',
  Pic: '',         //added for dev only: picture file 
  PicURL4Edit: '',

  RecType: '',
  RecStatus: '',
  Priority: ''

}
const ToastWaitTime = 5000

export default function SignUpCard() {
  const [{ Loading, Error, DATA_RECS }, dispatch] = useReducer(reducerFn, { Loading: false, Error: '', DATA_RECS: [] })
  const { CtxMainState, CtxMainDispatch } = useCtxMainContextHook()
  const { _SysUser } = CtxMainState

  // parameter state received from nave menu
  const location = useLocation();
  const TriggerPrg = location.state?.Trigger || "View"; //SignUp, Edit, View--- Get the Trigger value from the state



  const [OpenModal, setOpenModal] = useState(true);
  const [OpenModal4Product, setOpenModal4Product] = useState(false);
  const [OrderSheet, setOrderSheet] = useState({ DefaultRec });

  // const [Desc, setDesc] = useState('Sunny itehad council');


  const navigate = useNavigate();

  const HandleCloseWindow = () => {
    navigate('/'); // Navigate to another route, e.g., home
  };

  useEffect(() => {
    // Retrieve the object from the storage
    const data = localStorage.getItem("_USER");

    // AlertRec(_SysUser, '_SysUser in useEffect')

    if (TriggerPrg === 'SignUp') setOrderSheet(DefaultRec)
    else
      setOrderSheet({
        ID: _SysUser.Data.ID?.trim(), PW: _SysUser.Data.PW?.trim(), PW2: _SysUser.Data.PW?.trim(),
        Title: _SysUser.Data?.Title?.trim(),
        Desc: _SysUser.Data?.Desc?.trim(),

        Rem: _SysUser.Data?.Rem?.trim(),
        RoleId: _SysUser.Data?.RoleId,

        PicURL: _SysUser.Data?.PicURL?.trim(),
        Pic: '',         //added for dev only: picture file 
        PicURL4Edit: _SysUser.Data?.PicURL?.trim(),


        RecType: _SysUser.Data?.RecType?.trim(),
        RecStatus: _SysUser.Data?.RecStatus?.trim(),
        Priority: _SysUser.Data?.Priority?.trim()
      })
  }, [])


  // useEffect( () => {
  //  // fetchUsers()
  // }, [])


  // =_=_=_=.[ Handle INPUTs ].=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_-
  const fetchUsers = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + 'Users')
      AlertRec(response, "axios Get Users")
    }
    catch (err) {
      console.log('err', err)
    }
  }

  // ==============================================================
  //CANCEL changes is clicked
  //   const HandleBtnCancel = () => { alert('Cancelled pressed'); setBtnEditClicked(false); setBtnAddnewClicked(false); setInputReadOnly(true); setRec4M(RecDefault4M) }
  const HandleBtnCancel = (Flag2Refresh) => {
    // // alert('Editing is finished')
    // HandleBtnVoucherMode(VoucherMode, false, Flag2Refresh);
    // // setAccRecsSal(AccRecsSal.map((E, I) => ({ ...E, VAmt: 0 })))

    HandleCloseWindow()
  }

  // ==============================================================

  const HandleLogin = async (flag = false) => {
    if (!flag) { alert('it is auto called'); return }
    // alert(flag?'called':'not called')

    //e.preventDefault();
    localStorage.setItem('_TOKEN', '');
    localStorage.setItem('_USER', '');

    if (OrderSheet.ID === '' || OrderSheet.ID === null) return

    // const headers = {
    //   'Content-Type': 'application/json',
    //   'Authorization': 'JWT fefege...'
    // }
    // axios.post(Helper.getUserAPI(), data, {
    //   headers: headers
    // })
    //   .then((response) => { dispatch({ type: FOUND_USER, data: response.data[0] }) })
    //   .catch((error) => { dispatch({ type: ERROR_FINDING_USER }) })


    // console.log('FETCHING: Login seeking. \n')

    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + 'SignIn'
        , OrderSheet
        , {
          // headers: { Authorization: token && `Bearer ${token}` },

          headers: {
            "access-control-allow-origin": "*",
            "Access-Control-Allow-Credentials": true,
            'Content-Type': 'application/json'
          }
        }
      )
      // Save the token in localStorage
      //localStorage.setItem('_TOKEN', token);

      // Save the token in localStorage
      localStorage.setItem('_TOKEN', response.data.Token);
      //localStorage.setItem('_USER', response.data.User); //only for String Data
      localStorage.setItem('_USER', JSON.stringify(response.data?.User));  //incase for Object Data
      // // Retrieve the object from the storage
      // // const data = localStorage.getItem("userData");
      // console.log("\nAfter AxiosFetch (dataRSVD): ", response.data.User)

      // CtxMainDispatch({ type: 'SYSUSER_FETCH_SUCCESS', payload: JSON.parse(localStorage.getItem('_USER')) })  
      CtxMainDispatch({
        type: 'SYSUSER_FETCH_SUCCESS', payload: response.data?.User
      })

      // console.log('SUCCESS: Login credentials. \n', response.data.User)
      toast.success('Logging In:  [' + response.data?.User?.ID + ']', { theme: 'colored', autoClose: ToastWaitTime, position: "top-left" })
      // alert('Login Successful')
      //    // Redirect to home page after login
      //    navigate('/home');
    } catch (err) {
      localStorage.setItem('_TOKEN', '')
      localStorage.setItem('_USER', '')
      console.log('ERROR: Login failed. Please check your credentials. \n', err)
      //setError('Login failed. Please check your credentials.');

      CtxMainDispatch({ type: 'SYSUSER_FETCH_SUCCESS', payload: '' })
      toast.error('LOGIN FAILED. \nPlz Check Credentials.', { theme: 'colored', autoClose: ToastWaitTime, })
      // alert('Login Failed')
    }

    // alert('Finished Login')
  };

  // --------------------------------------------------------------------------------------------------------------------
  // ------------- AddNew/Create RECORD ----------------
  // --------------------------------------------------------------------------------------------------------------------
  const HandleSave = () => {
    if (TriggerPrg === 'SignUp') CallDotAPI2SaveAddNew()
    else CallDotAPI2SaveUpdate()
  }

  const CallDotAPI2SaveAddNew = async () => {
    const {
      ID, PW, PW2, Title, Desc, Rem, RoleId,
      Pic,
      PicURL,
      PicURL4Edit,
      RecType, RecStatus, Priority, EntryBy, EntryDte
    } = OrderSheet

    if (ID?.trim() === '') {
      toast.error('User ID/Email is EMPTY. \nThis is Mandatory Field.\nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }
    // if (!(Title || TitleU)) {
    if (Title?.trim() === '') {
      toast.error('User Title is EMPTY. \nThis is Mandatory for Reference.\nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }

    if (PW !== PW2) {
      toast.error('Passwords are not confirmed.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }

    const _VID = GetNewID()  //20chrs                //DateTimeStamp()

    // const Data2SendInDatabase = {
    const Data2SendMainRec = {
      "ID": ID,
      "PW": PW,

      "Title": Title.substr(0, 50),
      "Desc": Desc.substr(0, 50),
      "Rem": Rem.substr(0, 50),

      "RoleId": RoleId,
      // "TId": TId,

      // "Pic": Pic,
      // "PicURL": (Pic ? Title.trim().substr(0, Math.min(Title.trim().length, 10)) + DateTimeStamp() + '.png': ''),      
      "PicURL": (Pic ? _VID + '.png' : ''),

      "RecType": RecType.substr(0, 10),         //RecType.Substring(0, Math.min(RecType.Length, 10)) ,
      "RecStatus": RecStatus.substr(0, 10),
      "Priority": Priority.substr(0, 4),

      "EntryBy": "xUSERx",
      "EntryDte": new Date()
    }

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


    dispatch({ type: 'FETCH_LOADING' })

    //[ Part -1/2 >>> Data uploading ]
    //-------------------------------------------------------
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + 'Users', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(Data2SendInDatabase)
      })


      // [   ERROR RESPONSE   ]   ***********************************************************************
      // Check if the response status is not in the 200 range
      if (!response.ok) {
        //throw new Error(`HTTP error! Status: ${response.status}`);

        if (response.status === 400) {
          // console.error("Bad Request: Please check the data you've sent.");

          // toast.error(`Invalid Request for Addition \n${response.status}\n${response.statusText}`, { theme: 'colored', autoClose: ToastWaitTime, })
          toast.error(`Invalid Request for Addition `, { theme: 'colored', autoClose: ToastWaitTime, })

          //     //History.push(CatCode"/Home");
          // HandleBtnCancel(true)

        } else { console.error(`Error ${response.status}: ${response.statusText}`) }

        dispatch({ type: 'FETCH_ERROR', payload: response.statusText })
        return;
      }
      // [ End---  ERROR RESPONSE   ]   ***********************************************************************



      // const result = await response.json();
      // setData(result);


      // HandleBtnCancel(true)
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

          }, (error) => {
            alert('ERROR--- Photo Uploading is Failed: ' + Data2SendMainRec.PicURL); Data2SendMainRec.PicURL = ''
            dispatch({ type: 'FETCH_ERROR', payload: error })
          })
      }
      else {
        toast.success('Record Saved Successfully: [' + Title + ']', { theme: 'colored', autoClose: ToastWaitTime, position: "top-left" })

      }
      //-------------------------------------------------------

      //toast.success('Record Saved Successfully: Bypassing Image Section', { theme: 'colored', autoClose: ToastWaitTime, })
      dispatch({ type: 'FETCH_SUCCESS', payload: Data2SendMainRec })
      HandleBtnCancel(true)

    }
    catch (error) {
      // Catch network or other unexpected errors
      //console.error("Request Error:", error.message);

      // setError(error.message)
      toast.error('ERROR--- Add-New Action Result: \n' + error.message, { theme: 'colored', autoClose: ToastWaitTime, })
      // alert('ERROR--- Add-New Action Result: ' + error.message)
      dispatch({ type: 'FETCH_ERROR', payload: error })
    }
    finally {
      //setLoading(false);
      // HandleBtnCancel(true)
    }


    // fetch(process.env.REACT_APP_API_URL + 'Users', {
    //   method: 'POST',
    //   headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    //   body: JSON.stringify(Data2SendInDatabase)
    // })
    //   .then(res => res.json())
    //   .then((result) => {
    //     // HandleBtnCancel(true)
    //     // alert('Returned Successfully Saved: \n' + "Response: " + result)

    //     //-------------------------------------------------------
    //     //[ Part -2/2 >>> Image uploading ]
    //     if (Pic) {
    //       // var ext =  fileName.split('.').pop();
    //       // const FILENAME = VNO_NEW + '.jpg'    //+ '.' + PicURL.split('.').pop()
    //       //const filename = Data2SendMainRec.Title + DateTimeStamp() + '.png'    //product.PicURL

    //       // setPhotofilename(e.target.files[0].name);
    //       const formData = new FormData();
    //       //     // formData.append('username', 'Chris');
    //       //     // formData.append('userpic', myFileInput.files[0], 'chris1.jpg');
    //       // for (let [key, value] of fd.entries()) { console.log(key, value);}
    //       formData.append("ImageFile", Pic, Data2SendMainRec.PicURL);

    //       fetch(process.env.REACT_APP_API_URL + 'Users/SaveFile', { method: 'POST', body: formData })
    //         .then(res => res.json())
    //         .then((result) => {
    //           // alert('Photo Successfully Saved: ' + Data2SendMainRec.PicURL + '\n' + "Response: " + result)
    //           toast.success('Record Saved Successfully:* [' + Title + ']', { theme: 'colored', autoClose: ToastWaitTime, position: "top-left" })

    //         }, (error) => { alert('ERROR--- Photo Uploading is Failed: ' + Data2SendMainRec.PicURL); Data2SendMainRec.PicURL = '' })
    //     }
    //     else {
    //       toast.success('Record Saved Successfully: [' + Title + ']', { theme: 'colored', autoClose: ToastWaitTime, position: "top-left" })
    //     }
    //     //-------------------------------------------------------

    //     //toast.success('Record Saved Successfully: Bypassing Image Section', { theme: 'colored', autoClose: ToastWaitTime, })
    //   }

    //     , (error) => { alert('ERROR--- Add-New Action Result: ' + 'Failed'); })

    // //     //History.push(CatCode"/Home");
    // // HandleBtnCancel(true)
  }

  // --------------------------------------------------------------------------------------------------------------------
  // ------------- Update RECORD ----------------
  // --------------------------------------------------------------------------------------------------------------------
  const CallDotAPI2SaveUpdate = async () => {
    // AlertRec(OrderSheet, 'OrderSheet Data Rcvd for Update')


    const {
      ID, PW, PW2, Title, Desc, Rem, RoleId, TId,
      Pic,
      PicURL,
      PicURL4Edit,
      RecType, RecStatus, Priority, EntryBy, EntryDte
    } = OrderSheet


    if (ID?.trim() === '') {
      toast.error('User ID/Email is EMPTY. \nThis is Mandatory Field.\nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }
    // if (!(Title || TitleU)) {
    if (Title?.trim() === '') {
      toast.error('User Title is EMPTY. \nThis is Mandatory for Reference.\nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
      return
    }

    if (PW !== PW2) {
      toast.error('Passwords are not confirmed.', { theme: 'colored', autoClose: ToastWaitTime, })
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

      "Title": Title?.substr(0, 50),
      "Desc": Desc?.substr(0, 50),
      "Rem": Rem?.substr(0, 50),

      "RoleId": RoleId,
      // "TId": TId,

      // "Pic": Pic,
      // "PicURL": (Pic ? Title.trim().substr(0, Math.min(Title.trim().length, 10)) + DateTimeStamp() + '.png': ''),      
      "PicURL": (Pic ? _VID + '.png' : PicURL),

      "RecType": RecType?.substr(0, 10),         //RecType.Substring(0, Math.min(RecType.Length, 10)) ,
      "RecStatus": RecStatus?.substr(0, 10),
      "Priority": Priority?.substr(0, 4),

      "EntryBy": "xUSERx",
      "EntryDte": new Date()

    }


    const Data2SendInDatabase = Data2SendMainRec

    // if (!AlertConfirm(Data2SendInDatabase, 'Record Ready to Update? ')) return

    dispatch({ type: 'FETCH_LOADING' })
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

        dispatch({ type: 'FETCH_SUCCESS', payload: Data2SendMainRec })

        HandleSignout()
        HandleBtnCancel(true)
      }
        , (error) => {
          toast.error('ERROR--- Failed, Update Action Result: ' + error, { theme: 'colored', autoClose: ToastWaitTime, })
          dispatch({ type: 'FETCH_ERROR', payload: error })
        }
      )

    // //History.push("/Home");
    // // setNeed2Refresh4M(!Need2Refresh4M)
    // HandleBtnCancel(true)
  }


  const HandleSignout = () => {
    const id = _SysUser.Data?.ID
    localStorage.setItem('_TOKEN', '');
    localStorage.setItem('_USER', '');
    CtxMainDispatch({ type: 'SYSUSER_FETCH_SUCCESS', payload: '' });
    toast.info('Logged Out:  [' + id + ']', { theme: 'colored', autoClose: ToastWaitTime, position: "top-right" })
    HandleCloseWindow()
  }

  // =_=_=_=.[ Handle INPUTs ].=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_-
  // -.-.-.-.[ Handle INPUTs ]  -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-
  const HandleInputs = (key, value) => {
    console.log(`****Key= ${key} with Value: ${value} **************** `)
    // alert('Received for : '+e.target.name+ ' value: '+e.target.value)
    setOrderSheet({ ...OrderSheet, [key]: value })
  }

  return (

    // {/* START *************     STANDARD MODAL ********************************/}
    // {/* <Modal dismissible show={OpenModal} size="xl" popup onClose={() => setOpenModal(false)} > */}
    <div className="flex flex-col px-0 py-0 relative w-full md:w-[450px]" >
      <div style={{ position: 'absolute', top: '-10px', right: '0px', zIndex: '99' }}>
        {/* <ImEnter className='text-2xl  text-red-600 ' onClick={() => HandleCloseWindow(true)} /> */}
        <CgCloseO className='text-2xl  text-red-600 ' onClick={() => HandleCloseWindow(true)} />
        {/* <SlClose className='text-2xl ms-auto text-red-600 '  /> */}
      </div>

      {/* ---------------header--------------- */}
      <div className="flex flex-row gap-2 items-center " style={{ borderBottom: '1px solid lightgray' }} >
        {/* <div><img src="/Images/Logo.jpg" alt="Logo" style={{ height: '48px' }} />      </div> */}
        <div><img src="/Images/SunriseLogo.jpg" alt="Logo" style={{ height: '48px' }} />      </div>
        <div className="" style={{ fontSize: '30px', letterSpacing: '1px' }}>Welcome! </div>

        <div className="ms-auto mt-auto text-base md:text-xl text-blue-600" >
          {TriggerPrg === 'SignUp' ? "Sign Up Profile" : TriggerPrg === 'Edit' ? "Edit Profile":"User Profile"}
        </div>

      </div>

      {/* ---------------content body--------------- */}
      <div className="p-0 md:p-2">
        <div className="mt-1 ">

          {/* <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3> */}
          <div className="flex gap-4 py-1 px-0 md:px-2 items-center ">
            {/* <div className="" style={{ width: '150px', height: '100px' }}>
              <img src={'/Images/Users/UsersMix3.jpeg'} alt="" />
            </div> */}
            {/* ***************************************** */}

            {/* --PHOTO SESCTION--------------------- [        ROW  1/1,  Col 2/2       ]----------------------------------- */}
            <div className="card p-1  w-[40%]">


              {TriggerPrg !== 'View' &&
                <div className=' flex gap-2 justify-between items-center h-[20px] md:h-[30]'>

                  <label htmlFor='inputPhoto' id='SelectPhoto' className="p-2 text-sm leading-none text-white rounded bg-blue-500 hover:bg-blue-600 cursor-pointer" >
                    Change Photo
                  </label>

                  {/* {(selectedImage) && <label className=' m-0 p-0 fs-3 text-danger'
                onClick={() => { setSelectedImage(null); setImgURL(null) }}> <FiDelete /> */}
                  {(OrderSheet.PicURL || OrderSheet.Pic) && 
                  <button className=' m-0 p-0 text-xl text-red-600 hover:text-red-800'
                    // onClick={() => { setOrderSheet({ ...OrderSheet, PicURL: '' }); setImgURL(null) }}> <FiDelete />
                    onClick={() => {
                      (OrderSheet.Pic)
                        ? setOrderSheet({ ...OrderSheet, Pic: '', PicURL: '' })
                        : setOrderSheet({ ...OrderSheet, PicURL: '' })
                    }}>
                    {/* <FiDelete /> */}
                    <FaTrashCan />
                  </button>}
                </div>
              }

              {/* -----Photo Section------  */}
              <div className='flex  mt-3 flex-col justify-center items-center '>

                {/* <input type="file" name="inputPhoto" id='inputPhoto' */}
                <input type="file" hidden name="inputPhoto" id='inputPhoto'
                  onChange={(event) => {
                    // console.log(event.target.files[0]);
                    // setImgURL(URL.createObjectURL(event.target.files[0]))
                    // setOrderSheet({ ...OrderSheet, PicURL: event.target.files[0].name, pic: URL.createObjectURL(event.target.files[0]) });
                    // setOrderSheet({ ...OrderSheet, PicURL: event.target.files[0].name, Pic: event.target.files[0] });
                    setOrderSheet({ ...OrderSheet, Pic: event.target.files[0] });
                  }} />

                {/* Working {selectedImage4E &&<img src={URL.createObjectURL(selectedImage4E)} alt="not found" width={"200px"} />} */}
                {/* {<img src={(OrderSheet.PicURL) ? ImgURL : DefaultImgURL} alt="Image not found" width={"100%"} />} */}

                {/* {<img src={(OrderSheet.PicURL) ? URL.createObjectURL(OrderSheet.Pic) : DefaultImgURL} alt="Image not found" width={"100%"} />} */}
                {/* {OrderSheet.PicURL} */}

                {<img alt="Pic not found" width={"100%"} className='max-h-[150px]'
                  src={(OrderSheet.Pic)
                    ? URL.createObjectURL(OrderSheet.Pic)
                    : (OrderSheet.PicURL)
                      ? process.env.REACT_APP_API_URL + 'Users/GetFile/' + OrderSheet.PicURL
                      : DefaultImgURL} />}

              </div>

            </div>

            {/* ***********************************  Input Details ****************************************** */}
            <div className="flex-grow mt-0">

              {/* Input Code/ID  */}
              {/* <div className=' '> */}
              {/* <MyInputText Label='ID/ Email' Name='ID' Icon={<FaUser />} Val={OrderSheet?.ID} setVal={HandleInputs} className={' text-md text-left text-red-600'} /> */}
              {/* //<InputByAdaamSelect Options={BizType} TextKey='BizType' Icon={<FaUserPlus/>} ValueKey='Value' /> */}
              {/* </div> */}

              {/* Input Descriptions  */}
              {/* <div className='mt-4'> */}
              {/* <MyInputText Label='Pass Code' Name='PW' Icon={<FaUserPlus />} Val={OrderSheet?.PW} setVal={HandleInputs} /> */}
              {/* </div> */}


              {/* ---[ Input ID ]--- */}
              <div className='flex '>
                <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                  <RiIdCardLine />
                </span>
                <div className="relative w-full">
                  <input type="text" id="ID" name="ID" className={`block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer  ${TriggerPrg === 'SignUp' ? '' : ' cursor-not-allowed'}`}
                    disabled={TriggerPrg === 'SignUp' ? false : true}
                    placeholder="" maxLength={30}
                    value={OrderSheet.ID} onChange={e => setOrderSheet({ ...OrderSheet, [e.target.name]: e.target.value })} />
                  <label for="ID" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    User ID</label>
                </div>
              </div>

              {/* ---[ Input Title ]--- */}
              <div className='flex mt-2'>
                <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                  <FaUser />
                </span>
                <div className="relative w-full">
                  <input type="text" id="Title" name="Title" className="block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    disabled={TriggerPrg === 'View' ? true : false}
                    placeholder="" maxLength={30}
                    value={OrderSheet.Title} onChange={e => setOrderSheet({ ...OrderSheet, [e.target.name]: e.target.value })} />
                  <label for="Title" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    User Title</label>
                </div>
              </div>

              {/* ---[ Input PW ]--- */}
              {TriggerPrg !== 'View' &&
                <div className='flex mt-4'>
                  <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                    <FaKey style={{ width: '14px' }} />
                  </span>
                  <div className="relative w-full">
                    <input type="password" id="PW" name="PW" className="block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=""
                      value={OrderSheet.PW} maxLength={30} onChange={e => setOrderSheet({ ...OrderSheet, [e.target.name]: e.target.value })} />

                    <label for="PW" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                      Password</label>
                  </div>
                </div>
              }

              {/* ---[ Confirm Input PW ]--- */}
              {TriggerPrg !== 'View' &&
                <div className='flex mt-2'>
                  <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                    <FaKey style={{ width: '14px' }} />
                  </span>
                  <div className="relative w-full">
                    <input type="password" id="PW2" name="PW2" className="block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=""
                      value={OrderSheet.PW2} maxLength={30} onChange={e => setOrderSheet({ ...OrderSheet, [e.target.name]: e.target.value })} />

                    <label for="PW2" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                      Confirm Password </label>
                  </div>
                </div>
              }

            </div>
          </div>

        </div>
        {/* any other div */}
      </div>

      {/* --------------- footer --------------- */}
      <div className="flex items-center justify-between mt-1 p-2" style={{ borderTop: '1px solid lightgray' }}>
        {/* <a href="#" className=" text-black-50" style={{ fontSize: '12px' }}>
          Guest Login ?&nbsp;
        </a> */}

        <div className="flex gap-4 ms-auto">
          {/* <Button onClick={() => 'setOpenModal(false)'}>Sign In</Button> */}

          {TriggerPrg !== 'View' &&

            <button type="button" class="py-2 px-4 flex justify-center items-center text-white text-center text-base font-semibold  bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 transition ease-in duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
              // onClick={()=>{HandleLogin(true);HandleCloseWindow()}}>
              onClick={() => { HandleSave() }}>
              Save
              {/* {(_SysUser.Loading? 'Loading True':'Loading False')} */}
              {/* {_SysUser.Loading && */}
              {Loading &&

                <div role="status" className="ms-2" >
                  <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  {/* // <span className='sr-only'> {txt}</span> */}
                </div>
              }
            </button>
          }
          {TriggerPrg !== 'View' &&
            <button type="button" class="py-2 px-4 flex justify-center items-center text-white text-center text-base font-semibold  bg-gray-400 hover:bg-gray-600 focus:ring-green-500 focus:ring-offset-green-200 transition ease-in duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
              onClick={HandleCloseWindow}>
              Cancel
            </button>
          }

          {TriggerPrg === 'View' &&
            <button type="button" class="py-2 px-4 flex justify-center items-center text-white text-center text-base font-semibold  bg-blue-400 hover:bg-blue-600 focus:ring-green-500 focus:ring-offset-green-200 transition ease-in duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
              onClick={HandleCloseWindow}>
              Close
            </button>
          }

        </div>

        {/* <Button onClick={() => 'setOpenModal4Del(true)'}>Toggle modal</Button> */}
      </div>

      {/* <div className='d-hidden'><ToastContainer /></div> */}
    </div >
    // {/* END *************     STANDARD MODAL ********************************/}


  )
}

