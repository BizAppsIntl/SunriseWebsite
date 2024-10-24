// import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
// import Image from "next/image";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaUser, FaUserPlus } from "react-icons/fa";
import { FaKey } from "react-icons/fa6"
import { useCtxMainContextHook } from '../../CtxMain';

//Two file needed for toasify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AlertRec } from '../../StdLib';
import { useNavigate } from 'react-router-dom';
import { CgCloseO } from 'react-icons/cg';

const ToastWaitTime = 5000

export default function SigninCard() {
  const { CtxMainState, CtxMainDispatch } = useCtxMainContextHook()
  const { _SysUser } = CtxMainState

  const [OpenModal, setOpenModal] = useState(true);
  const [OpenModal4Product, setOpenModal4Product] = useState(false);
  const [OrderSheet, setOrderSheet] = useState({ ID: 'Id1', PW: '' });

  const [Desc, setDesc] = useState('Sunny itehad council');

  const navigate = useNavigate();

  const HandleCloseWindow = () => {
    navigate('/'); // Navigate to another route, e.g., home
  };
  
  
  // useEffect( () => {
//  // fetchUsers()
// }, [])


  // =_=_=_=.[ Handle INPUTs ].=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_-
  const fetchUsers = async ()=>{
    try {
      const response   = await axios.get(process.env.REACT_APP_API_URL + 'Users' )
      AlertRec(response, "axios Get Users")
    }
    catch (err) {
      console.log('err', err)
    } 
  }

  const handleLogin = async (flag=false) => {
    if (!flag) {alert('it is auto called');return}
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
      toast.success('XXXSuccessfully Logged In:  [' + response.data?.User?.ID + ']', { theme: 'colored', autoClose: ToastWaitTime, position: "top-left" })
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
  
const HandleSignout =()=>{
  const id=_SysUser.Data?.ID
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
    <div className="flex flex-col px-0 py-0 relative" style={{ width: '450px' }} >
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

        <div className="ms-auto mt-auto text-red-600" style={{ fontSize: '12px', cursor: 'pointer' }}
          onClick={HandleSignout}
        >
          Sign Out
        </div>

      </div>

      {/* ---------------content body--------------- */}
      <div className="p-2">
        <div className="mt-1 ">

          {/* <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3> */}

          <div className="flex gap-4 px-2 items-center ">
            <div className="" style={{ width: '150px', height: '100px' }}>
              <img src={'/Images/Users/UsersMix3.jpeg'} alt="" />
            </div>

            <div className="w-full mt-1">

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
                    <FaUser />
                  </span>
                  <div className="relative w-full">
                    <input type="text" id="ID" name="ID" className="block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=""  maxLength={30}
                      value={OrderSheet.ID} onChange={e => setOrderSheet({ ...OrderSheet, [e.target.name]: e.target.value })} />
                    <label for="ID" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                      User ID</label>
                  </div>
                </div>

                {/* ---[ Input PW ]--- */}
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
            </div>
          </div>


          <div className="flex justify-between mt-3" >
            <div className="flex items-center gap-2">
              {/* <Ch   <Label htstyle={{height:'48px'}}mlFor="remember">Remember me</Label> */}
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={true} />
                <label for="flexCheckChecked" className="form-check-label text-black-50" style={{ fontSize: '12px' }}>
                  Remember me
                </label>
              </div>
            </div>

            <div >
              <a href="#" className=" text-black-50" style={{ fontSize: '12px' }}>
                Lost Password?&nbsp;<br />
              </a>
              <a href="#" className=" text-black-50" style={{ fontSize: '12px' }}>
                Create account?
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* --------------- footer --------------- */}
      <div className="flex items-center justify-between mt-1 p-2" style={{ borderTop: '1px solid lightgray' }}>
        <a href="#" className=" text-black-50" style={{ fontSize: '12px' }}>
          Guest Login ?&nbsp;
        </a>
        <div className="flex gap-4 ">
          {/* <Button onClick={() => 'setOpenModal(false)'}>Sign In</Button> */}

          <button type="button" class="py-2 px-4 flex justify-center items-center text-white text-center text-base font-semibold  bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 transition ease-in duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
            // onClick={()=>{handleLogin(true);HandleCloseWindow()}}>
            onClick={()=>{handleLogin(true)}}>
              Sign In- {(_SysUser.Loading? 'Loading True':'Loading False')}
 { _SysUser.Loading && 

        // <div role="status">
          <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          // <span className='sr-only'> {txt}</span>
        // </div>
}              
          </button>

          <button type="button" class="py-2 px-4 flex justify-center items-center text-white text-center text-base font-semibold  bg-gray-400 hover:bg-gray-600 focus:ring-green-500 focus:ring-offset-green-200 transition ease-in duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
           onClick={HandleCloseWindow}>
              Decline
          </button>

        </div>

        {/* <Button onClick={() => 'setOpenModal4Del(true)'}>Toggle modal</Button> */}
      </div>

      {/* <div className='d-hidden'><ToastContainer /></div> */}
    </div >
    // {/* END *************     STANDARD MODAL ********************************/}


  )
}









// const handleLogin = async (flag=false) => {
//   localStorage.setItem('_TOKEN', '');
//   localStorage.setItem('_USER', '');

//   try {
//     const response = await axios.post(process.env.REACT_APP_API_URL + 'SignIn'
//       , OrderSheet
//       , {
//         headers: {
//           "access-control-allow-origin": "*",
//           "Access-Control-Allow-Credentials": true,
//           'Content-Type': 'application/json'
//         }
//       }
//     )
//     localStorage.setItem('_TOKEN', response.data.Token);
//     localStorage.setItem('_USER', JSON.stringify(response.data.User));  //incase for Object Data
//     toast.success('XXXSuccessfully Logged In:  [' + response.data.User.ID + ']', { theme: 'colored', autoClose: ToastWaitTime, position: "top-left" })

//   } catch (err) {
//     localStorage.setItem('_TOKEN', '')
//     localStorage.setItem('_USER', '')
//     console.log('ERROR: Login failed. Please check your credentials. \n', err)

//     toast.error('LOGIN FAILED. \nPlz Check Credentials.', { theme: 'colored', autoClose: ToastWaitTime, })
//   }

// };


