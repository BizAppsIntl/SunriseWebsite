// import { Text, Page, Document, Font, View } from "@react-pdf/renderer";

import React, { forwardRef } from "react";
import Moment from 'moment'
import Logo from '../../../../../SiteImages/SunriseLogo.jpg'
import { AlertRec, AmountInWords, GetTot4mArray } from "../../../../../StdLib";
import { CgCloseO } from "react-icons/cg";
import { ImEnter, ImLocation, ImPrinter } from "react-icons/im";
import { RiScissorsCutLine } from "react-icons/ri";


import ImgMale from '../../../../ImagesAdminPanel/default/Male.png'
import ImgFemale from '../../../../ImagesAdminPanel/default/Female.png'

import DocRef from '../../../../ImagesAdminPanel/default/DocRef.png'
import DocDuty from '../../../../ImagesAdminPanel/default/DocEye.png'

import NumberFormat from 'react-number-format'
// import EyeCircled from "../Components/EyeCircled";
import { FaGlobe, FaInstagram, FaPhone, FaPhoneVolume, FaWhatsapp } from "react-icons/fa";
import { AiOutlineFacebook } from "react-icons/ai";
import { BsFillTelephoneInboundFill, BsTelephoneInbound } from "react-icons/bs";
import MyAvatar from "../../../../../Utils/MyAvatar";
import { GrTextAlignFull } from "react-icons/gr";
import { TbTextWrapDisabled } from "react-icons/tb";
// import { AlertRec, GetTot4mArray } from '../../../../../StdLib.jsx'



let CatCodeOld = ''
let newGroupTitle = ''

const GroupSeperator = (E) => {
  if (CatCodeOld === E.CatCode) newGroupTitle = ''
  else {
    CatCodeOld = E.CatCode
    newGroupTitle = <div>{E.CTitle}</div>
  }
  return (newGroupTitle)
}

export const PrintableVoucher = forwardRef((props, ref) => {
  const { Rec, HandleCloseWindow, HandlePrint } = props
  // {(Rec.VID !== undefined) && (Rec.VID !== '') &&
  // AlertRec(props, 'props')

  const dt = Moment(new Date()).format('DD MMM YY ddd')

  return (
    <>
      {/* {AlertRec(Rec, 'Rec')} */}

      <div style={{ position: 'absolute', top: '5px', right: '2px', zIndex: '99' }}>
        {/* <ImEnter className='text-xl  text-red-600 ' onClick={() => HandleCloseWindow(true)} /> */}
        <CgCloseO className='text-xl  text-red-600 ' onClick={() => HandleCloseWindow(true)} />
        {/* <SlClose className='text-xl ms-auto text-red-600 '  /> */}
      </div>

      <div style={{ position: 'absolute', top: '5px', right: '50px', zIndex: '99' }}>
        {/* <ImEnter className='text-xl  text-red-600 ' onClick={() => HandleCloseWindow(true)} /> */}
        <ImPrinter className='text-xl  text-blue-600 ' onClick={() => HandlePrint()}
        />
        {/* <SlClose className='text-xl ms-auto text-red-600 '  /> */}
      </div>

      {/* <div ref={ref} className="flex w-full flex-col border border-danger" style={{ padding: '50px' }}> */}
      <div ref={ref} className="flex w-full flex-col m-0" style={{ paddingLeft: '50px', paddingRight: '50px', paddingTop: '30px', paddingBottom: '1px' }}>

        <div className="flex flex-col " style={{ height: '510px' }}>
          {/* ############################################################################################### */}
          {/*                      Invoice  Header/ Company Title                                             */}
          {/* ############################################################################################### */}

          {/* header line */}
          <div className="flex mb-0 w-full justify-between items-start" style={{ lineHeight: '1' }}>

            {/* <div className="flex gap-2 items-center border " style={{ width: '70%' }}> */}
            <div className="flex gap-2 items-center  " >
              <div style={{ width: '150px' }}>
                <img src={Logo} style={{ width: "100%", height: '70px', cursor: 'pointer' }} alt="PicURL" />
              </div>
              <div style={{ fontSize: '32px', fontFamily: 'TimesNewRoman,Times New Roman,Times,Baskerville,Georgia,serif' }}>
                {/* Sunrise Dairy <br/> Pvt Ltd. */}
                Sunrise Dairy Pvt Ltd.
              </div>
            </div>

            <div className="text-xs" >
              <div className="flex gap-2"><ImLocation className='text-red-600' /> Chungi No. 1, Suraj Miani Rd. Multan</div>
              <div className="flex gap-2"><BsTelephoneInbound />061-4517507, 4517507</div>
              <div className="flex gap-2"><FaWhatsapp className='text-green-600' />03344373507</div>
              <div className="flex gap-2"><FaInstagram style={{ color: '#fcc201' }} />SUNRISE </div>
              <div className="flex gap-2"><AiOutlineFacebook className='text-blue-600' />www.facebook.com/Sunrise </div>
              <div className="flex gap-2"><FaGlobe />www.sunrisedairy.com </div>
            </div>

          </div>

          <div className="mb-0 text-lg font-bold text-center" >SALES RECEIPT VOUCHER</div>


          {/* ############################################################################################### */}
          {/*                      Invoice  Particulars                                                       */}
          {/* ############################################################################################### */}
          {/*================================================================*/}
          {/* Two Parts, Left & Right */}
          {/* Invoice (1st Half)  For Patient line */}
          {/*================================================================*/}

          <div className='flex w-full  justify-between '>
            {/* ------------- Left Part- Voucher Header DATA*/}
            {/* <div className="card px-2 shadow-sm" style={{ width: '60%' }}> */}


            {/* ------------- Distributor DATA*/}
            {/* <div className="card px-2 shadow-sm " style={{ width: '45%' }} > */}
            <div className="card px-2 shadow-sm w-fit"  >

              {/* <div className='text-xl font-bolder text-blue-600 ' >
                <span className="text-xl font-bolder text-blue-600 " >Distributor Profile </span>
              </div> */}

              <div className="flex gap-2">
                {/* <img style={{ width: '50px', height: '50px' }} src={'/Images/pic.jpg'} alt={''} /> */}

                {(Rec?.RefTrader?.PicURL && Rec?.RefTrader?.PicURL?.trim())
                  ? <img alt="Default" width='50px' height='50px' src={process.env.REACT_APP_API_URL + `Traders/GetFile/${Rec.RefTrader.PicURL}`} />
                  : <span className='flex justify-center' > <MyAvatar Text={Rec?.RefTrader?.Title[0]} Size={50} /> </span>
                }

                <div>
                  <div className="text-xl font-bolder text-blue-600 " >Distributor Profile </div>
                  <div className='text-lg' style={{ fontWeight: 'bold', lineHeight:'1' }}> {Rec.RefTrader?.Title} </div>
                </div>
              </div>
              <div>
                <div className='flex ' >
                  <div style={{ width: "75px", fontWeight: 'bold' }}>Contact:</div>
                  {Rec.RefTrader?.Phone}
                </div>

                <div className='flex ' >
                  <div style={{ width: "75px", fontWeight: 'bold' }}>Address:</div>
                  {Rec.RefTrader?.Address}
                </div>
                <div className='flex ' >
                  <div style={{ width: "75px", fontWeight: 'bold' }}>City:</div>
                  {Rec.RefTrader?.City}
                </div>
              </div>

            </div>

            {/* -----------------  Right Part- Voucher Header Explanation DATA*/}
            {/* ------------- Invoice Particulars*/}
            {/* <div className='flex flex-col ' style={{ fontSize: '14px', width: '40%' }}> */}
            <div className='flex flex-col w-fit' style={{ fontSize: '14px' }}>

              {/* ------------- Invoice Detail*/}
              <div className='flex flex-col '>

                {/* <div className='flex'>
                    <div style={{ width: '100px', fontWeight: 'bolder' }}>Printed At: </div>{Moment(new Date()).format('DD MMM YY ddd, hh:mm a')}
                  </div> */}

                <div className='flex '>
                  <div style={{ width: '100px', fontWeight: 'bolder' }}>Invoice No: </div>{Rec.VNo}{Rec.VTypeTitle?.substr(0, 1)}
                </div>

                <div className='flex'>
                  {/* <div style={{ width: '100px', fontWeight: 'bolder' }}>Invoice Date: </div>{Moment(Rec.VDte).format('DD MMM YY ddd')} */}
                  <div style={{ width: '100px', fontWeight: 'bolder' }}>Invoice Date: </div>{Moment(Rec.VDte).format('DD MMM YY ddd')}
                </div>


                {/* <div className='flex '>
    <div style={{ width: '100px', fontWeight: 'bolder' }}>Description:</div>{Rec.Desc}
  </div> */}
              </div>

              {/* ------------- Purchase Oorder Detail */}
              <div className="card px-2 mt-2 py-1  shadow-sm">
                <div className=" flex flex-row items-center" >
                  <TbTextWrapDisabled className="text-2xl"/>

                  <div className='ps-3 pb-1  w-full' style={{ lineHeight: '1' }}>
                    <div className="text-green-600 font-bold mb-1" style={{ fontSize: '14px' }}>Description/ Particulars </div>
                    <div >{Rec.Rem}Rem </div>
                    {/* <div style={{ fontSize: '10px' }}>{Rec.RefDocRef.Address.trim() ? Rec.RefDocRef.Address : '... ... ...'}  </div> */}
                  </div>


                </div>
              </div>

              {/* ------------- Shipping Detail */}
              <div className="card px-2 mt-2 py-1  shadow-sm">
                <div className=" flex flex-row items-center" >
                  <GrTextAlignFull className="text-xl"/>

                  <div className='ps-3 pb-1  w-full' style={{ lineHeight: '1' }}>
                    <div className="text-green-600 font-bold mb-1" style={{ fontSize: '14px' }}>Reference/ Remarks </div>
                    <div >{Rec.Desc}Desc</div>
                    {/* <div style={{ fontSize: '10px' }}>{Rec.RefDocRef.Address.trim() ? Rec.RefDocRef.Address : '... ... ...'}  </div> */}
                  </div>

                </div>
              </div>

            </div>

          </div>
          {/*================================================================*/}



          {/*================================================================*/}
          {/* Invoice Detail line  &  Payment Section*/}
          {/*================================================================*/}
          <div className="flex gap-10 mt-3">

            {/*--------------------------------*/}
            {/* Invoice Detail line */}
            {/*--------------------------------*/}
            {/* Name: {props.Rec.RefPatient.Title} <p className='jameel-noori-nastaleeq'>محمدمحمدمحمد مفخر ادام</p> */}
            <div className="flex gap-5 flex-grow items-start ">
              {/* <div className='card-body shadow flex flex-col justify-around  items-start  w-full' style={{ background: '#ebecf0' }}> */}
              <div className='p-2 px-4 shadow-xl flex flex-col   w-[50%] rounded-xl' style={{ minHeight: '100px', background: '#ebecf0' }}>

                {/* <div className="flex px-2 w-full font-bolder " style={{ textDecoration: 'underline ' }}> */}

                <div className="mb-2 text-center text-2xl  underline" >Debit Entry</div>
                <div className="mb-2" ><span className="font-bold" >Account Code:</span> &nbsp; <span>[{Rec.AccD[0].AccCode}]</span></div>
                <div className="mb-2" ><span className="font-bold" >Account Title:</span> <br /> <span>{Rec.AccD[0].Title}</span></div>
                <div className="mb-0" ><span className="font-bold" >Account Head:</span> <br /> <span>{Rec.AccD[0].RefAcc.Desc}</span></div>

              </div> {/* END- Detail card body */}
              <div className='p-2 px-4 shadow-xl flex flex-col   w-[50%] rounded-xl' style={{ minHeight: '100px', background: '#ebecf0' }}>

                {/* <div className="flex px-2 w-full font-bolder " style={{ textDecoration: 'underline ' }}> */}
                <div className="mb-2 text-center text-2xl " style={{ textDecoration: 'underline ' }}>Credit Entry</div>
                <div className="mb-2" ><span className="font-bold" >Account Code:</span> &nbsp; <span>[{Rec.AccC[0].AccCode}]</span></div>
                <div className="mb-2" ><span className="font-bold" >Account Title:</span> <br /> <span>{Rec.AccC[0].Title}</span></div>
                <div className="mb-0" ><span className="font-bold" >Account Head:</span> <br /> <span>{Rec.AccC[0].RefAcc.Desc}</span></div>

              </div> {/* END- Detail card body */}

            </div>{/*[END Detail Section]  */}

            {/*--------------------------------*/}
            {/* Invoice Payment Section        */}
            {/*--------------------------------*/}
            <div style={{ width: '200px' }}>
              <div className='card p-2 flex flex-col gap-2 shadow-sm'>

                {/* ---[ Input VAmount ]--- */}
                <div className="mb-2 text-center text-2xl  underline" >Voucher Amount</div>

                <NumberFormat
                  value={Rec.VAmt } name='VAmt' id="VAmt"
                  // prefix="Rs "
                  displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh"
                  decimalScale={2}

                  className=" text-end text-black text-2xl"

                />

                {AmountInWords(Rec.VAmt)}
              </div>
            </div>

          </div>

          {/* <div className="h-100 flex  justify-center items-center  ">
            <div className='jameel-noori-nastaleeq text-center text-red-600' style={{ fontSize: '26px' }}>( عینک سے مکمل نجات  -  بذریعہ لیزر )</div>
          </div> */}
        </div> {/* HALF PAGE 500px or 510px ----------------------------------------- */}







        {/* <div className="text-center"> <RiScissorsCutLine /> ----------------------------------------------------------------------------------------------------------------</div> */}
        {/* <div > <RiScissorsCutLine /> ------------------------------------------------------------------------------------------------------------------</div> */}



      </div >
    </>
  )

})

