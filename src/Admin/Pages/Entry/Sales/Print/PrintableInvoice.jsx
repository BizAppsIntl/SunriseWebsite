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
import EyeCircled from "../Components/EyeCircled";
import { FaGlobe, FaInstagram, FaPhone, FaPhoneVolume, FaWhatsapp } from "react-icons/fa";
import { AiOutlineFacebook } from "react-icons/ai";
import { BsFillTelephoneInboundFill, BsTelephoneInbound } from "react-icons/bs";
import MyAvatar from "../../../../../Utils/MyAvatar";
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

export const PrintableInvoice = forwardRef((props, ref) => {
  const { Rec, HandleCloseWindow, HandlePrint } = props
  // {(Rec.VID !== undefined) && (Rec.VID !== '') &&
  // AlertRec(props, 'props')
  // AlertRec(Rec, 'Rec- Inside Invoice Printing Session')

  const dt = Moment(new Date()).format('DD MMM YY ddd')

  return (
    <>
      {/* {AlertRec(Rec, 'Rec')} */}

      <div style={{ position: 'absolute', top: '5px', right: '2px', zIndex: '99' }}>
        {/* <ImEnter className='text-2xl  text-red-600 ' onClick={() => HandleCloseWindow(true)} /> */}
        <CgCloseO className='text-2xl  text-red-600 ' onClick={() => HandleCloseWindow(true)} />
        {/* <SlClose className='text-2xl ms-auto text-red-600 '  /> */}
      </div>

      <div style={{ position: 'absolute', top: '5px', right: '50px', zIndex: '99' }}>
        {/* <ImEnter className='text-2xl  text-red-600 ' onClick={() => HandleCloseWindow(true)} /> */}
        <ImPrinter className='text-2xl  text-blue-600 ' onClick={() => HandlePrint()}
        />
        {/* <SlClose className='text-2xl ms-auto text-red-600 '  /> */}
      </div>

      {/* <div ref={ref} className="flex w-full flex-col border border-danger" style={{ padding: '50px' }}> */}
      <div ref={ref} className="flex w-full flex-col m-0" style={{ paddingLeft: '50px', paddingRight: '50px', paddingTop: '20px', paddingBottom: '1px' }}>

        {/* ############################################################################################### */}
        {/*                      Invoice   (1st Half)  For Patient                                          */}
        {/* ############################################################################################### */}
        {/* <div className="flex flex-col " style={{ height: '510px' }}> */}
        <div className="flex flex-col " >

          {/* header line */}
          {/* <div className="flex mb-3 w-full justify-between items-start" style={{ lineHeight: '1' }}>

            //</div><div className="flex gap-2 items-center border " style={{ width: '70%' }}>
            <div className="flex gap-2 items-center  " >
              <div style={{ width: '150px' }}>
                <img src={Logo} style={{ width: "100%", height: '70px', cursor: 'pointer' }} alt="PicURL" />
              </div>
              <div style={{ fontSize: '32px', fontFamily: 'TimesNewRoman,Times New Roman,Times,Baskerville,Georgia,serif' }}>
                Wavelaz Diagnostic & <br />Refractive Surgery Center
              </div>
            </div>

            <div className="flex flex-col  " style={{ fontSize: '10px' }}>
              <div><span style={{ fontSize: '11px', marginRight: '5px', width: '100%' }}><ImLocation className='text-red-600' /></span>Chungi No. 1, Suraj Miani Rd. Multan</div>
              <div><span style={{ fontSize: '11px', marginRight: '5px' }}><BsTelephoneInbound /></span>061-4580880, 4506313</div>
              <div><span style={{ fontSize: '11px', marginRight: '5px' }}><FaWhatsapp className='text-green-600' /></span>03364506313</div>
              <div><span style={{ fontSize: '11px', marginRight: '5px' }}><FaInstagram style={{ color: '#fcc201' }} /></span>WAVELAZ01 </div>
              <div><span style={{ fontSize: '11px', marginRight: '5px' }}><AiOutlineFacebook className='text-blue-600' /></span>www.facebook.com/Wavelaz </div>
              <div><span style={{ fontSize: '11px', marginRight: '5px' }}><FaGlobe /></span>www.wavelaz.com </div>
            </div>

          </div> */}


          <div className="mb-1 w-full ">
            <img style={{ width: '100%', height: '100px' }} src={'/Images/SRD-LetterTop.jpg'} alt={''} />
          </div>


          {/*================================================================*/}
          {/* Invoice Particulars line */}
          {/*================================================================*/}

          <div className='flex w-full  justify-between '>

            {/* ------------- Distributor DATA*/}
            <div className="card px-2 shadow-sm  w-fit"  >

              <div className='text-xl font-bolder text-blue-600 ' >
                {/* <img alt="Gender" width='36px' height='36px'
                  src={Rec?.RefPatient?.PicURL &&
                    Rec.RefPatient?.PicURL?.trim()
                    ? process.env.REACT_APP_API_URL + `Patients/GetFile/${Rec.RefPatient?.PicURL}`
                    : Rec.RefPatient?.Gender === '0'
                      ? ImgFemale : ImgMale
                  }
                /> */}
                {/* <span className="text-xl font-bolder text-blue-600 " >Distributor Profile </span> */}
              </div>

              <div className="flex gap-2">
                {/* <img style={{ width: '50px', height: '50px' }} src={'/Images/pic.jpg'} alt={''} /> */}

                {(Rec?.RefTrader?.PicURL && Rec?.RefTrader?.PicURL?.trim())
                  ? <img alt="Default" width='50px' height='50px' src={process.env.REACT_APP_API_URL + `Traders/GetFile/${Rec.RefTrader.PicURL}`} />
                  : <span className='flex justify-center' > <MyAvatar Text={Rec?.RefTrader?.Title[0]} Size={50} /> </span>
                }

                <div>
                  <div className="text-xl font-bolder text-blue-600 " >Distributor Profile </div>
                  <div className='text-lg' style={{ fontWeight: 'bold' }}> {Rec.RefTrader?.Title}  </div>
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



            {/* ------------- Invoice Particulars*/}
            <div className='flex flex-col  w-fit' style={{ fontSize: '14px' }}>

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

              {/* ------------- Sales Oorder Detail */}
              <div className="card px-2 mt-2 py-1  shadow-sm">
                <div className=" flex flex-row items-center" >
                  <div className="w-[36px] h-[36px]">
                    <img alt="..." className="w-full h-full"
                      src={'/Images/PO.png'}
                    />
                  </div>

                  <div className='flex ps-3 pb-1  w-full' style={{ lineHeight: '1' }}>
                    {/* <div className='w-75' > */}
                    <div className='w-full' >
                      <div className="text-green-600 font-bold mb-1" style={{ fontSize: '14px' }}>Sales Order Detail </div>
                      <div style={{ fontSize: '11px' }}>{Rec.Rem}Rem </div>
                      {/* <div style={{ fontSize: '10px' }}>{Rec.RefDocRef.Address.trim() ? Rec.RefDocRef.Address : '... ... ...'}  </div> */}
                    </div>
                    {/* <div className='w-25' >
                      <div style={{ fontSize: '11px' }}>Trx Code: <br /> {Rec.VAmtRef} </div>
                    </div> */}

                  </div>

                </div>
              </div>

              {/* ------------- Shipping Detail */}
              <div className="card px-2 mt-2 py-1  shadow-sm">
                <div className=" flex flex-row items-center" >
                  <div className="w-[36px] h-[36px] ">
                    <img alt="..." className="h-full w-full"
                      src={'/Images/Cargo.png'}
                    />
                  </div>

                  <div className='flex ps-3 pb-1  w-full' style={{ lineHeight: '1' }}>
                    {/* <div className='w-75' > */}
                    <div className='w-full' >
                      <div className="text-green-600 font-bold mb-1" style={{ fontSize: '14px' }}>Cargo/Shipping Detail </div>
                      <div style={{ fontSize: '11px' }}>{Rec.Desc}Desc</div>
                      {/* <div style={{ fontSize: '10px' }}>{Rec.RefDocRef.Address.trim() ? Rec.RefDocRef.Address : '... ... ...'}  </div> */}
                    </div>
                    {/* <div className='w-25' >
                      <div style={{ fontSize: '11px' }}>Trx Code: <br /> {Rec.VAmtRef} </div>
                    </div> */}

                  </div>

                </div>
              </div>

              {/* ------------- Consultant Doctor Profile */}

              {/* <div className="card px-2 mt-2">
                <div className=" flex flex-row items-center" >
                  <div>
                    <img alt="..." width='42px' height='42px'
                      src={DocDuty}
                    />
                  </div>

                  <div className='flex ps-3 pb-1  w-full' style={{ lineHeight: '1' }}>
                    <div className='w-75' >
                      <div className="text-blue-600 font-bold mb-1" style={{ fontSize: '14px' }}>Consultant Doctor </div>
                      <div> {Rec.RefDocDuty.Title} </div>
                      <div style={{ fontSize: '10px' }}>{Rec.RefDocDuty.Desc.trim() ? Rec.RefDocDuty.Desc : '... ... ...'}  </div>
                    </div>
                    <div className='w-25' >
                      <div style={{ fontSize: '11px' }}>Trx Code: <br /> {Rec.VAmtDoc} </div>
                    </div>

                  </div>
                </div>
              </div> */}

            </div>


          </div>


          {/*================================================================*/}
          {/* Invoice Detail line  &  Payment Section*/}
          {/*================================================================*/}


          {/*--------------------------------*/}
          {/* Invoice Detail line */}
          {/*--------------------------------*/}
          {/* Name: {props.Rec.RefPatient.Title} <p className='jameel-noori-nastaleeq'>محمدمحمدمحمد مفخر ادام</p> */}
          <div className="w-full  mt-3">
            {/* <div className='card-body shadow flex flex-col justify-around  items-start  w-full' style={{ background: '#ebecf0' }}> */}

            <div className="flex px-2 w-full font-bold " style={{ textDecoration: 'underline ', fontSize: '14px', background: '#ebecf0' }}>
              <div className=" borderX border-primary" style={{ width: '3%' }}>S#</div>
              <div className=" borderX border-primary" style={{ width: '7%' }}>Pack</div>
              <div className=" borderX border-primary" style={{ width: '35%' }}>Products</div>
              <div className=" borderX border-primary" style={{ width: '8%' }}>PackSize</div>
              <div className="text-center borderX border-primary" style={{ width: '7%' }}>Qty</div>
              <div className="text-center borderX border-primary" style={{ width: '7%' }}>T/P</div>
              <div className="text-center borderX border-primary" style={{ width: '12%' }}>Amount</div>
              <div className="text-center borderX border-primary" style={{ width: '10%' }}>Margin</div>
              {/* <div style={{ width: '20%' }}>Charges</div> */}
              <div className="text-center borderX border-primary" style={{ width: '13%' }}>Invoice Amt</div>
            </div>

            {/* <div className='shadow flex flex-col justify-around  items-start  w-full' style={{ background: '#ebecf0', fontSize:'11px' }}> */}

            {Rec.VItems.map((ITM, I) => {
              // let Product = Products.find((P) => P.Code === ITM.Code)
              return (
                <div key={I} className="shadow flex px-2 mt-2 items-center" style={{ width: "100%", fontSize: '12px' }} >
                  <div className="" style={{ width: '3%' }}> {I + 1} </div>
                  <div className="" style={{ width: '7%' }}> <img src={process.env.REACT_APP_API_URL + `Items/GetFile/${ITM.RefItem?.PicURL}`} alt={''} width='40px' height='40px' /> </div>

                  {/* <div className="" style={{ width: '35%' }}> {ITM.RefItem?.Code} <br /> <strong style={{ fontSize: '13px' }}>{ITM.RefItem?.Title}</strong> </div> */}
                  <div className="" style={{ width: '35%', lineHeight: '1' }}> {ITM.RefItem?.Code} <br /> <span style={{ fontSize: '15px' }}>{ITM.RefItem?.Title}</span> </div>

                  <div className="text-center " style={{ width: '8%' }}>{ITM.Unit} </div>
                  <div className="text-center " style={{ width: '7%' }}>{ITM.Qty} </div>
                  <div className="text-end " style={{ width: '7%' }}><NumberFormat value={ITM.Price} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={''} decimalScale={2} /> </div>
                  <div className="text-end " style={{ width: '12%' }}><NumberFormat value={ITM.Qty * ITM.Price} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={''} decimalScale={2} /> </div>

                  {/* <div className="text-end " style={{ width: '12%' }}>{`(${ITM.Margin}%)`} <NumberFormat value={ITM.Qty * ITM.Price * (ITM.Margin / 100)} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={''} decimalScale={2} /> </div> */}
                  {/* <div className="text-end b" style={{ width: '12%' }}>{ ITM.Margin>0 && <span>{`(${ITM.Margin}%)`} <NumberFormat value={ITM.Qty * ITM.Price * (ITM.Margin / 100)} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={''} decimalScale={2} /></span>} </div> */}
                  <div className="text-end pr-2" style={{ width: '10%' }}>{ITM.Margin > 0 && <NumberFormat value={ITM.Qty * ITM.Price * (ITM.Margin / 100)} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={''} decimalScale={2} />} </div>





                  {/* <div className="flex gap-2" style={{ width: '10%' }}>
                        <EyeCircled RL={'R'} Mode={ITM.ER === 0 ? false : true} Size={15} />
                        <EyeCircled RL={'L'} Mode={ITM.EL === 0 ? false : true} Size={15} />
                      </div>
                      <div className="" style={{ width: '20%' }}> {ITM.Qty > 1 ? 'Both Eyes' : ITM.ER === 1 ? 'Right Eye' : 'Left Eye'}</div> */}

                  {/* <div className="" style={{ width: '20%' }}> {ITM.Unit} @ 
                  <NumberFormat
                            value={ITM.Price}
                            displayType={'text'}
                            thousandSeparator={true} thousandsGroupStyle="lakh" prefix={''}
                            decimalScale={2} />
                  
                  </div> */}
                  <div className="text-end borderX border-danger" style={{ width: '13%' }}>
                    <NumberFormat
                      // value={ITM.Qty * ITM.Price}
                      value={(ITM.Qty * ITM.Price) - (ITM.Qty * ITM.Price * (ITM.Margin / 100))}
                      displayType={'text'}
                      thousandSeparator={true} thousandsGroupStyle="lakh"
                      // prefix={'Rs. '}
                      decimalScale={2} />
                  </div>
                </div>
              )
            })}

            {/* </div>  */}
            {/* END- Detail card body */}

          </div>{/*[END Detail Section]  */}





          {/*================================================================*/}
          {/* Tot Items/ Examinations Total and Payment Remarks*/}
          {/*================================================================*/}

          {/* <div className='m-0 mt-4 p-0 grid grid-cols-2 md:grid-cols-5 gap-2'> */}
          <div className='m-0 mt-4 p-0 grid grid-cols-5 gap-2'>

            {/* ---[ Display Items Count ]--- */}
            {/* <div className="card px-2 " style={{ width: '250px' }} > */}
            <div className="card px-2 mr-[100px]" >
              {/* <div className=' font-bold text-blue-600' style={{ marginTop: '-10px' }}>Total Amount</div> */}
              <div className=' font-bold text-info' >Consignment</div>
              <div className=" text-center text-xl font-bold text-black " >{`${GetTot4mArray(Rec.VItems, 'Qty')} / ${Rec.VItems.length}`} </div>
            </div>

            {/* ---[ Empty Spaceer ]--- */}
            {/* <div className="card px-2 " style={{ width: '250px' }} > */}
            <div className="w-[100px] md:inline " >
            </div>

            {/* ---[ Display Gross Amount ]--- */}
            <div className="card px-2 ">
              {/* <div className=' font-bold text-blue-600' style={{ marginTop: '-10px' }}>Total Amount</div> */}
              <div className=' font-bold text-black' >Gross Total</div>
              <NumberFormat value={Rec.VAmtGross} name='VAmtGross' id="VAmtGross" thousandSeparator={true} thousandsGroupStyle="lakh"

                //// label={"1 FTE"}
                //// customInput={TextField}
                //// isNumericString={true}   //for value output is number value
                decimalScale={2}
                readOnly
                //// style={{border:'none' , outline: 'none'                  }}
                className="h-6 px-0 text-lg text-end font-bold text-black border-none outline-none w-full"

              ////onChange={(e) =>{ HandleInputs(e); console.log('**************\nVAmt : ',VAmt)}}
              // onValueChange={(values) => {
              //     HandleInputsNumberFormat({ name: 'VAmt', value: values.value })
              // }}
              />
            </div>

            {/* ---[ Display Margin Amount ]--- */}
            <div className="card px-2 ">
              {/* <div className=' font-bold text-blue-600' style={{ marginTop: '-10px' }}>Total Amount</div> */}
              <div className=' font-bold text-black' >Total Margin</div>
              <NumberFormat value={Rec.VAmtMargin} name='VAmtMargin' id="VAmtMargin" thousandSeparator={true} thousandsGroupStyle="lakh"

                //// label={"1 FTE"}
                //// customInput={TextField}
                //// isNumericString={true}   //for value output is number value
                decimalScale={2}
                readOnly
                //// style={{border:'none' , outline: 'none'                  }}
                className="h-6 px-0 text-lg text-end font-bold text-black border-none outline-none w-full"

              ////onChange={(e) =>{ HandleInputs(e); console.log('**************\nVAmt : ',VAmtMargin)}}
              // onValueChange={(values) => {
              //     HandleInputsNumberFormat({ name: 'VAmtMargin', value: values.value })
              // }}
              />
            </div>

            {/* ---[ Display Invoice Amount ]--- */}
            <div className="card px-0">
              {/* <div className=' font-bold text-blue-600' style={{ marginTop: '-10px' }}>Total Amount</div> */}
              <div className=' font-bold text-black pl-2' >Invoice Amount</div>
              <NumberFormat value={Rec.VAmt} name='VAmt' id="VAmt" thousandSeparator={true} thousandsGroupStyle="lakh"

                //// label={"1 FTE"}
                //// customInput={TextField}
                //// isNumericString={true}   //for value output is number value
                decimalScale={2}
                readOnly
                //// style={{border:'none' , outline: 'none'                  }}
                className="h-6 pr-2 text-lg text-end font-bold text-black border-none outline-none  w-full"

              ////onChange={(e) =>{ HandleInputs(e); console.log('**************\nVAmt : ',VAmtPaid)}}
              // onValueChange={(values) => {
              //     HandleInputsNumberFormat({ name: 'VAmtPaid', value: values.value })
              // }}
              />
            </div>


          </div>


          {/* <div className="h-100 flex  justify-center items-center  ">
            <div className='jameel-noori-nastaleeq text-center text-red-600' style={{ fontSize: '26px' }}>( عینک سے مکمل نجات  -  بذریعہ لیزر )</div>
          </div> */}

        </div> {/* HALF PAGE 500px or 510px ----------------------------------------- */}






        {/* <div >Signature ---------------------------------------------------------- </div> */}

        {/* <div className="text-center"> <RiScissorsCutLine /> ----------------------------------------------------------------------------------------------------------------</div> */}
        {/* <div > <RiScissorsCutLine /> ------------------------------------------------------------------------------------------------------------------</div> */}

      </div >
    </>
  )

})

