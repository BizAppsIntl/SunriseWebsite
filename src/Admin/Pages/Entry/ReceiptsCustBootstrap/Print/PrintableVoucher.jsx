// import { Text, Page, Document, Font, View } from "@react-pdf/renderer";

import React, { forwardRef } from "react";
import Moment from 'moment'
import Logo from '../../../../../SiteImages/Logo.jpg'
import { AlertRec, GetTot4mArray } from "../../../../../StdLib";
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
        {/* <ImEnter className='fs-3  text-danger ' onClick={() => HandleCloseWindow(true)} /> */}
        <CgCloseO className='fs-3  text-danger ' onClick={() => HandleCloseWindow(true)} />
        {/* <SlClose className='fs-3 ms-auto text-danger '  /> */}
      </div>

      <div style={{ position: 'absolute', top: '5px', right: '50px', zIndex: '99' }}>
        {/* <ImEnter className='fs-3  text-danger ' onClick={() => HandleCloseWindow(true)} /> */}
        <ImPrinter className='fs-3  text-primary ' onClick={() => HandlePrint()}
        />
        {/* <SlClose className='fs-3 ms-auto text-danger '  /> */}
      </div>

      {/* <div ref={ref} className="d-flex w-100 flex-column border border-danger" style={{ padding: '50px' }}> */}
      <div ref={ref} className="d-flex w-100 flex-column m-0" style={{ paddingLeft: '50px', paddingRight: '50px', paddingTop: '30px', paddingBottom: '1px' }}>

        <div className="d-flex flex-column " style={{ height: '510px' }}>
          {/* ############################################################################################### */}
          {/*                      Invoice  Header/ Company Title                                             */}
          {/* ############################################################################################### */}

          {/* header line */}
          <div className="d-flex mb-3 w-100 justify-content-between align-items-start" style={{ lineHeight: '1' }}>

            {/* <div className="d-flex gap-2 align-items-center border " style={{ width: '70%' }}> */}
            <div className="d-flex gap-2 align-items-center  " >
              <div style={{ width: '150px' }}>
                <img src={Logo} style={{ width: "100%", height: '70px', cursor: 'pointer' }} alt="PicURL" />
              </div>
              <div style={{ fontSize: '32px', fontFamily: 'TimesNewRoman,Times New Roman,Times,Baskerville,Georgia,serif' }}>
                Wavelaz Diagnostic & <br />Refractive Surgery Center
              </div>
            </div>

            <div className="d-flex flex-column  " style={{ fontSize: '10px' }}>
              <div><span style={{ fontSize: '11px', marginRight: '5px', width: '100%' }}><ImLocation className='text-danger' /></span>Chungi No. 1, Suraj Miani Rd. Multan</div>
              <div><span style={{ fontSize: '11px', marginRight: '5px' }}><BsTelephoneInbound /></span>061-4580880, 4506313</div>
              <div><span style={{ fontSize: '11px', marginRight: '5px' }}><FaWhatsapp className='text-success' /></span>03364506313</div>
              <div><span style={{ fontSize: '11px', marginRight: '5px' }}><FaInstagram style={{ color: '#fcc201' }} /></span>WAVELAZ01 </div>
              <div><span style={{ fontSize: '11px', marginRight: '5px' }}><AiOutlineFacebook className='text-primary' /></span>www.facebook.com/Wavelaz </div>
              <div><span style={{ fontSize: '11px', marginRight: '5px' }}><FaGlobe /></span>www.wavelaz.com </div>
            </div>

          </div>

          <div className="mb-2 fs-5 fw-bolder text-info text-center" >SUPPLIER PAYMENT VOUCHER</div>


          {/* ############################################################################################### */}
          {/*                      Invoice  Particulars                                                       */}
          {/* ############################################################################################### */}
          {/*================================================================*/}
          {/* Two Parts, Left & Right */}
          {/* Invoice (1st Half)  For Patient line */}
          {/*================================================================*/}

          <div className='d-flex w-100  justify-content-between '>
            {/* ------------- Left Part- Voucher Header DATA*/}
            {/* <div className="card px-2 shadow-sm" style={{ width: '60%' }}> */}
            <div className="card px-2 shadow-sm" style={{ minWidth: '60%' }}>

              <div className='fs-5 fw-bolder text-primary  ' >
                <span className="fs-5 fw-bolder text-primary px-3" >Voucher Header </span>
              </div>

              {/* ------------- Invoice Detail*/}
              <div className='d-flex flex-column p-2'>

                <div className='d-flex '>
                  <div style={{ width: '100px', fontWeight: 'bolder' }}>Voucher No: </div>{Rec.VNo}{Rec.VTypeTitle}
                </div>

                <div className='d-flex'>
                  {/* <div style={{ width: '100px', fontWeight: 'bolder' }}>Invoice Date: </div>{Moment(Rec.VDte).format('DD MMM YY ddd')} */}
                  <div style={{ width: '100px', fontWeight: 'bolder' }}>Voucher Date: </div>{Moment(Rec.VDte).format('DD MMM YY ddd')}
                </div>


                <div className='d-flex mt-2'>
                  <div style={{ width: '100px', fontWeight: 'bolder' }}>Description:</div>{Rec.Desc}
                </div>

                <div className='d-flex mb-2'>
                  <div style={{ width: '100px', fontWeight: 'bolder' }}>Detail:</div>{Rec.Rem}
                </div>
              </div>

            </div>

            
            {/* -----------------  Right Part- Voucher Header Explanation DATA*/}
            
            
            {/* <div className='d-flex flex-column ' style={{ fontSize: '14px', width: '40%' }}> */}
            <div className='d-flex flex-column ' style={{ fontSize: '14px'}}>
                <div className=''>
                  <div style={{fontWeight: 'bolder' }}>Printed At: </div>  
                  {Moment(new Date()).format('DD MMM YY ddd, hh:mm a')}
                </div>

              {/* ------------- Referral Doctor Profile */}
              {/* <div className="card px-2 mt-2 py-1  shadow-sm">
              </div> */}

              {/* ------------- Consultant Doctor Profile */}

              {/* <div className="card px-2 mt-2">
              </div> */}

            </div>

          </div>
          {/*================================================================*/}



          {/*================================================================*/}
          {/* Invoice Detail line  &  Payment Section*/}
          {/*================================================================*/}
          <div className="d-flex gap-3 mt-3">

            {/*--------------------------------*/}
            {/* Invoice Detail line */}
            {/*--------------------------------*/}
            {/* Name: {props.Rec.RefPatient.Title} <p className='jameel-noori-nastaleeq'>محمدمحمدمحمد مفخر ادام</p> */}
            <div className="d-flex gap-3 justify-content-around  align-items-start w-100">
              {/* <div className='card-body shadow d-flex flex-column justify-content-around  align-items-start  w-100' style={{ background: '#ebecf0' }}> */}
              <div className='p-2 shadow d-flex flex-column   w-50' style={{minHeight:'100px', background: '#ebecf0' }}>

                {/* <div className="d-flex px-2 w-100 fw-bolder " style={{ textDecoration: 'underline ' }}> */}

                <div className="mb-2 text-center fs-5 fw-bold"  style={{ textDecoration: 'underline ' }}>Debit Entry</div>
                <div className="mb-2" ><span className="fw-bold" >Account Code:</span> <br/> <span>[{Rec.AccD[0].AccCode}]</span></div>
                <div className="mb-2" ><span className="fw-bold" >Account Title:</span> <br/> <span>{Rec.AccD[0].Title}</span></div>
                <div className="mb-0" ><span className="fw-bold" >Account Head:</span> <br/> <span>{Rec.AccD[0].RefAcc.Desc}</span></div>

              </div> {/* END- Detail card body */}
              <div className='p-2 shadow d-flex flex-column   w-50' style={{minHeight:'100px', background: '#ebecf0' }}>

                {/* <div className="d-flex px-2 w-100 fw-bolder " style={{ textDecoration: 'underline ' }}> */}
                <div className="mb-2 text-center fs-5 fw-bold" style={{ textDecoration: 'underline ' }}>Credit Entry</div>
                <div className="mb-2" ><span className="fw-bold" >Account Code:</span> <br/> <span>[{Rec.AccC[0].AccCode}]</span></div>
                <div className="mb-2" ><span className="fw-bold" >Account Title:</span> <br/> <span>{Rec.AccC[0].Title}</span></div>
                <div className="mb-0" ><span className="fw-bold" >Account Head:</span> <br/> <span>{Rec.AccC[0].RefAcc.Desc}</span></div>

              </div> {/* END- Detail card body */}

            </div>{/*[END Detail Section]  */}

            {/*--------------------------------*/}
            {/* Invoice Payment Section        */}
            {/*--------------------------------*/}
            <div style={{ width: '155px' }}>
              <div className='card p-2 d-flex flex-column gap-2 shadow-sm'>

                {/* ---[ Input VAmount ]--- */}
                <div >  {/* <div className="input-group"> */}
                  <div className="form-floating w-100" >
                    {/* <input type="number" value={VAmt} className="form-control  text-end " name='VAmt' id="VAmt" placeholder="Father Name" readOnly={false}
                    onChange={(e) => HandleInputs(e)} onFocus={handleFocus} /> */}

                    <NumberFormat
                      value={Rec.VAmt} name='VAmt' id="VAmt"
                      displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh"
                      decimalScale={2}

                      className=" form-control  text-end text-black "
                      style={{ fontSize: '18px', paddingTop: '20px' }}
                    />
                    <label htmlFor="VAmt"  >Tot. Amount</label>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* <div className="h-100 d-flex  justify-content-center align-items-center  ">
            <div className='jameel-noori-nastaleeq text-center text-danger' style={{ fontSize: '26px' }}>( عینک سے مکمل نجات  -  بذریعہ لیزر )</div>
          </div> */}
        </div> {/* HALF PAGE 500px or 510px ----------------------------------------- */}







        {/* <div className="text-center"> <RiScissorsCutLine /> ----------------------------------------------------------------------------------------------------------------</div> */}
        {/* <div > <RiScissorsCutLine /> ------------------------------------------------------------------------------------------------------------------</div> */}



      </div >
    </>
  )

})

