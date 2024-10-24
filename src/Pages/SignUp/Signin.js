'use client'
import MyInputText from "@/app/components/MyInput/MyInputText";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import Image from "next/image";
import React, { useState } from 'react'
import { FaUser, FaUserPlus } from "react-icons/fa";

export default function StandardInputPage() {
  const [OpenModal, setOpenModal] = useState(true);
  const [OpenModal4Product, setOpenModal4Product] = useState(false);
  const [OrderSheet, setOrderSheet] = useState({ ID: '', PW: '' });

  // -.-.-.-.[ Handle INPUTs ]  -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-
  const HandleInputs = (key, value) => {
    console.log(`****Key= ${key} with Value: ${value} **************** `)
    // alert('Received for : '+e.target.name+ ' value: '+e.target.value)
    setOrderSheet({ ...OrderSheet, [key]: value })
  }

  return (

    // {/* START *************     STANDARD MODAL ********************************/}
    // {/* <Modal dismissible show={OpenModal} size="xl" popup onClose={() => setOpenModal(false)} > */}
    <Modal show={OpenModal} size="xl" popup onClose={() => setOpenModal(false)} >
      <Modal.Header>
        <div className="flex gap-4 items-center justify-evenly" >
          <div><img src="/Logo.png" className="h-8 sm:h-9 md:h-12" alt="Logo" />      </div>
          <div className="text-3xl fw-bold tracking-wider">Welcome! </div>
        </div>
      </Modal.Header>
      <Modal.Body className="py-0">
        <div className="mt-4 ">

          {/* <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3> */}

          <div className="flex gap-4 md:px-4  ">
            <div className="w-[100px] h-[100px] ">
              <Image src={'/assets/default/DrCouple.png'} width="0"
                height="0"
                sizes="100vw"
                className="w-full h-auto" />
            </div>

            <div className="w-full">

              {/* Input Code/ID  */}
              <div className=' '>
                <MyInputText Label='ID/ Email' Name='ID' Icon={<FaUser />} Val={OrderSheet?.ID} setVal={HandleInputs} className={' text-md text-left text-red-600'} />
                {/* <InputByAdaamSelect Options={BizType} TextKey='BizType' Icon={<FaUserPlus/>} ValueKey='Value' /> */}
              </div>

              {/* Input Descriptions  */}
              <div className='mt-4'>
                <MyInputText Label='Pass Code' Name='PW' Icon={<FaUserPlus />} Val={OrderSheet?.PW} setVal={HandleInputs} />
              </div>

            </div>
          </div>

          <div className="flex justify-between " >
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
                <div >
                  <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                    Lost Password?&nbsp;<br />
                  </a>
                  <a href="#" className="text-gray-500 hover:underline dark:text-cyan-500">
                    Create account
                  </a>
                </div>
              </div>

        </div>

      </Modal.Body>

      <Modal.Footer className=" flex items-center justify-end">
        <Button onClick={() => 'setOpenModal(false)'}>Sign In</Button>
        <Button color="gray" onClick={() => 'setOpenModal(false)'}>            Decline          </Button>

        {/* <Button onClick={() => 'setOpenModal4Del(true)'}>Toggle modal</Button> */}
      </Modal.Footer>

    </Modal>
    // {/* END *************     STANDARD MODAL ********************************/}


  )
}






