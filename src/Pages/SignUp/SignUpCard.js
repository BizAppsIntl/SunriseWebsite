// import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
// import Image from "next/image";
import axios from 'axios';
import React, { useState } from 'react'
import { FaUser, FaUserPlus } from "react-icons/fa";
import { FaKey } from "react-icons/fa6"
import { useCtxMainContextHook } from '../../CtxMain';

//Two file needed for toasify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastWaitTime = 5000

export default function SignUpCard() {
  const { CtxMainState, CtxMainDispatch } = useCtxMainContextHook()
  const { _SysUser } = CtxMainState

  const [OpenModal, setOpenModal] = useState(true);
  const [OpenModal4Product, setOpenModal4Product] = useState(false);
  const [OrderSheet, setOrderSheet] = useState({ ID: '', PW: '' });


  // =_=_=_=.[ Handle INPUTs ].=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_-
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


    console.log('FETCHING: Login seeking. \n')

    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + 'SignIn'
        , OrderSheet
        , {
          // headers: { Authorization: token && `Bearer ${token}` },

          headers: {
            "access-control-allow-origin": "*",
            'Content-Type': 'application/json'
          }
        }
      )
      // Save the token in localStorage
      //localStorage.setItem('_TOKEN', token);

      // Save the token in localStorage
      localStorage.setItem('_TOKEN', response.data.Token);
      //localStorage.setItem('_USER', response.data.User); //only for String Data
      localStorage.setItem('_USER', JSON.stringify(response.data.User));  //incase for Object Data
      // // Retrieve the object from the storage
      // // const data = localStorage.getItem("userData");
      // console.log("\nAfter AxiosFetch (dataRSVD): ", response.data.User)

      // CtxMainDispatch({ type: 'SYSUSER_FETCH_SUCCESS', payload: JSON.parse(localStorage.getItem('_USER')) })  
      CtxMainDispatch({
        type: 'SYSUSER_FETCH_SUCCESS', payload: response.data.User
      })



      // console.log('SUCCESS: Login credentials. \n', response.data.User)
      toast.success('Successfully Logged In:  [' + response.data.User.ID + ']', { theme: 'colored', autoClose: ToastWaitTime, position: "top-left" })
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
    <div className="d-flex flex-column px-2 py-2" style={{ width: '400px' }} >
      {/* ---------------header--------------- */}
      <div className="d-flex flex-row pb-2 gap-2 align-items-center " style={{ borderBottom: '1px solid lightgray' }} >
        <div><img src="/Images/Logo.jpg" alt="Logo" style={{ height: '48px' }} />      </div>
        <div className="" style={{ fontSize: '30px', letterSpacing: '1px' }}>Welcome! </div>

        <div className="ms-auto text-danger" style={{ fontSize: '12px', cursor: 'pointer' }}
          onClick={() => {
            localStorage.setItem('_TOKEN', '');
            localStorage.setItem('_USER', '');
            CtxMainDispatch({ type: 'SYSUSER_FETCH_SUCCESS', payload: '' });
          }}
        >
          Sign Out
        </div>

      </div>

      {/* ---------------content body--------------- */}
      <div className="p-2">
        <div className="mt-1 ">

          {/* <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3> */}

          <div className="d-flex gap-4 px-2  ">
            <div className="" style={{ width: '150px', height: '100px' }}>
              <img src={'/Images/Users/UsersMix3.jpeg'} alt="" />
            </div>

            <div className="w-100 mt-1">

              {/* Input Code/ID  */}
              {/* <div className=' '> */}
              {/* <MyInputText Label='ID/ Email' Name='ID' Icon={<FaUser />} Val={OrderSheet?.ID} setVal={HandleInputs} className={' text-md text-left text-red-600'} /> */}
              {/* //<InputByAdaamSelect Options={BizType} TextKey='BizType' Icon={<FaUserPlus/>} ValueKey='Value' /> */}
              {/* </div> */}

              {/* Input Descriptions  */}
              {/* <div className='mt-4'> */}
              {/* <MyInputText Label='Pass Code' Name='PW' Icon={<FaUserPlus />} Val={OrderSheet?.PW} setVal={HandleInputs} /> */}
              {/* </div> */}

              {/* ---[ Input Title ]--- */}
              <div className="d-flex ">  {/* <div className="input-group"> */}
                <div className="input-group-text"><FaUser /></div>
                <div className="form-floating w-100" >
                  {/* <input type="text" value={Title} className="form-control  text-end" name='Title' placeholder="Title" onChange={(e) => HandleInputs(e)} /> */}
                  <input type="text" className="form-control  text-end" name='ID' placeholder="ID"
                    value={OrderSheet.ID}
                    onChange={e => setOrderSheet({ ...OrderSheet, [e.target.name]: e.target.value })}
                  />
                  <label htmlFor="ID"  >User ID</label>
                </div>
              </div>

              {/* ---[ Input PW ]--- */}
              <div className="d-flex mt-3">  {/* <div className="input-group"> */}
                <div className="input-group-text" ><FaKey style={{ width: '14px' }} /></div>
                <div className="form-floating w-100" >
                  {/* <input type="text" value={Title} className="form-control  text-end" name='Title' placeholder="Title" onChange={(e) => HandleInputs(e)} /> */}
                  <input type="password" className="form-control " name='PW' placeholder="PW"
                    value={OrderSheet.PW}
                    onChange={e => setOrderSheet({ ...OrderSheet, [e.target.name]: e.target.value })}
                  />
                  <label htmlFor="PW"  >Password</label>
                </div>
              </div>

            </div>
          </div>


          <div className="d-flex justify-content-between mt-3" >
            <div className="d-flex align-items-center gap-2">
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
      <div className="d-flex align-items-center justify-content-between mt-1 p-2" style={{ borderTop: '1px solid lightgray' }}>
        <a href="#" className=" text-black-50" style={{ fontSize: '12px' }}>
          Guest Login ?&nbsp;
        </a>
        <div className="d-flex gap-4 ">
          {/* <Button onClick={() => 'setOpenModal(false)'}>Sign In</Button> */}
          <button className='btn btn-success'
            onClick={()=>handleLogin(true)}
          >
            Sign In
          </button>

          {/* <Button color="gray" onClick={() => 'setOpenModal(false)'}> Decline </Button> */}
          <button className='btn btn-secondary'> Decline</button>
        </div>

        {/* <Button onClick={() => 'setOpenModal4Del(true)'}>Toggle modal</Button> */}
      </div>

      <div className='d-hidden'><ToastContainer /></div>
    </div >
    // {/* END *************     STANDARD MODAL ********************************/}


  )
}






