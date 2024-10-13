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
            <div className="card px-2 shadow-sm " style={{ width: '45%' }} >

              <div className='text-xl font-bolder text-blue-600 ' >
                {/* <img alt="Gender" width='36px' height='36px'
                  src={Rec?.RefPatient?.PicURL &&
                    Rec.RefPatient?.PicURL?.trim()
                    ? process.env.REACT_APP_API_URL + `Patients/GetFile/${Rec.RefPatient?.PicURL}`
                    : Rec.RefPatient?.Gender === '0'
                      ? ImgFemale : ImgMale
                  }
                /> */}
                <span className="text-xl font-bolder text-blue-600 " >Distributor Profile </span>
              </div>

              <div className="flex gap-2">
                {/* <img style={{ width: '50px', height: '50px' }} src={'/Images/pic.jpg'} alt={''} /> */}

                {(Rec?.RefTrader?.PicURL && Rec?.RefTrader?.PicURL?.trim())
                  ? <img alt="Default" width='50px' height='50px' src={process.env.REACT_APP_API_URL + `Traders/GetFile/${Rec.RefTrader.PicURL}`} />
                  : <span className='flex justify-center' > <MyAvatar Text={Rec?.RefTrader?.Title[0]} Size={50} /> </span>
                }

                <div className='text-lg' style={{ fontWeight: 'bold' }}> {Rec.RefTrader?.Title}  </div>
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
            <div className='flex flex-col ' style={{ fontSize: '14px', width: '43%' }}>

              {/* ------------- Invoice Detail*/}
              <div className='flex flex-col '>

                <div className='flex'>
                  <div style={{ width: '100px', fontWeight: 'bolder' }}>Printed At: </div>{Moment(new Date()).format('DD MMM YY ddd, hh:mm a')}
                </div>

                <div className='flex'>
                  {/* <div style={{ width: '100px', fontWeight: 'bolder' }}>Invoice Date: </div>{Moment(Rec.VDte).format('DD MMM YY ddd')} */}
                  <div style={{ width: '100px', fontWeight: 'bolder' }}>Invoice Date: </div>{Moment(Rec.VDte).format('DD MMM YY ddd')}
                </div>

                <div className='flex '>
                  <div style={{ width: '100px', fontWeight: 'bolder' }}>Invoice No: </div>{Rec.VNo}{Rec.VTypeTitle?.substr(0, 1)}
                </div>

                {/* <div className='flex '>
                  <div style={{ width: '100px', fontWeight: 'bolder' }}>Description:</div>{Rec.Desc}
                </div> */}
              </div>

              {/* ------------- Referral Doctor Profile */}
              <div className="card px-2 mt-2 py-1  shadow-sm">
                <div className=" flex flex-row items-center" >
                  <div>
                    <img alt="..." width='42px' height='42px'
                      src={'/Images/PO.jpeg'}
                    />
                  </div>

                  <div className='flex ps-3 pb-1  w-full' style={{ lineHeight: '1' }}>
                    {/* <div className='w-75' > */}
                    <div className='w-full' >
                      <div className="text-green-600 font-bold mb-1" style={{ fontSize: '14px' }}>Purchase Order Detail </div>
                      <div style={{ fontSize: '11px' }}>PO#:  12345, Dated: 25 September 2024 </div>
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

            <div className="flex px-2 w-full font-bolder " style={{ textDecoration: 'underline ', fontSize: '12px', background: '#ebecf0' }}>
              <div className=" borderX border-primary" style={{ width: '3%' }}>S#</div>
              <div className=" borderX border-primary" style={{ width: '7%' }}>Pack</div>
              <div className=" borderX border-primary" style={{ width: '35%' }}>Products</div>
              <div className=" borderX border-primary" style={{ width: '8%' }}>PackSize</div>
              <div className="text-center borderX border-primary" style={{ width: '7%' }}>Qty</div>
              <div className="text-center borderX border-primary" style={{ width: '7%' }}>T/P</div>
              <div className="text-center borderX border-primary" style={{ width: '10%' }}>Amount</div>
              <div className="text-center borderX border-primary" style={{ width: '12%' }}>Margin</div>
              {/* <div style={{ width: '20%' }}>Charges</div> */}
              <div className="text-center borderX border-primary" style={{ width: '11%' }}>Invoice Amt</div>
            </div>

            {/* <div className='shadow flex flex-col justify-around  items-start  w-full' style={{ background: '#ebecf0', fontSize:'11px' }}> */}

            {Rec.VItems.map((ITM, I) => {
              // let Product = Products.find((P) => P.Code === ITM.Code)
              return (
                <div key={I} className="shadow flex px-2 mt-2 items-center" style={{ width: "100%", fontSize: '11px' }} >
                  <div className="" style={{ width: '3%' }}> {I + 1} </div>
                  <div className="" style={{ width: '7%' }}> <img src={process.env.REACT_APP_API_URL + `Items/GetFile/${ITM.RefItem?.PicURL}`} alt={''} width='40px' height='40px' /> </div>

                  <div className="" style={{ width: '35%' }}> {ITM.RefItem?.Code} <br /> <strong style={{ fontSize: '12px' }}>{ITM.RefItem?.Title}</strong> </div>

                  <div className="text-center borderX border-danger" style={{ width: '8%' }}>{ITM.Unit} </div>
                  <div className="text-center borderX border-danger" style={{ width: '7%' }}>{ITM.Qty} </div>
                  <div className="text-end borderX border-danger" style={{ width: '7%' }}><NumberFormat value={ITM.Price} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={''} decimalScale={2} /> </div>
                  <div className="text-end borderX border-danger" style={{ width: '10%' }}><NumberFormat value={ITM.Qty * ITM.Price} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={''} decimalScale={2} /> </div>
                  {/* <div className=" borderX border-danger" style={{ width: '10%' }}>{`(10%) ${ITM.Qty * ITM.Price * (10 / 100)}`} </div> */}
                  <div className="text-end borderX border-danger" style={{ width: '12%' }}>(10%) <NumberFormat value={ITM.Qty * ITM.Price * (10 / 100)} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={''} decimalScale={2} /></div>





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
                  <div className="text-end borderX border-danger" style={{ width: '11%' }}>
                    <NumberFormat
                      // value={ITM.Qty * ITM.Price}
                      value={ITM.Qty * ITM.Price - (ITM.Qty * ITM.Price * (10 / 100))}
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

            {/*================================================================*/}
            {/* Tot Items/ Examinations Total and Payment Remarks*/}
            {/*================================================================*/}
            <div className='flex mt-3 justify-between'>
              {/* <div style={{ width: '25%' }}> */}

              <div className="card px-2 py-1  shadow-sm" style={{ lineHeight: '1' }}>
                <div className="text-blue-600 font-bold mb-1" style={{ fontSize: '14px' }}>Shipping Detail </div>
                <div ><strong>Consignment:</strong>
                  <span className=' px-1 text-xl'>
                    {GetTot4mArray(Rec.VItems, 'Qty')} / {Rec.VItems.length}
                  </span>
                </div>
                <br />
                {"...  ...  ...  ...  ...  ...  ...  ...  ...  ..."}
              </div>


              {/* <div style={{ width: '30%' }}> */}
              <div>
                {/* <span ><strong>Remarks:</strong></span> */}
                {/* <span >  {Rec.Rem}  </span> */}
              </div>

              {/* <div className='text-end ' style={{ width: '40%' }}>
              <span ><strong>Tot. Payable:</strong></span>
              <span className=' text-xl font-bolder'>
                <NumberFormat
                  value={Rec.VAmt}
                  displayType={'text'}
                  thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'   Rs. '}
                  decimalScale={2} />
              </span>
            </div> */}


              {/*--------------------------------*/}
              {/* Invoice Payment Section        */}
              {/*--------------------------------*/}
              <div style={{}}>
                <div className='card p-2 flex flex-row gap-2 shadow-sm'>

                  {/* ---[ Input VAmount ]--- */}
                  <div style={{ width: '150px' }}>  {/* <div className="input-group"> */}
                    <div className="form-floating w-full" >
                      {/* <input type="number" value={VAmt} className="form-control  text-end " name='VAmt' id="VAmt" placeholder="Father Name" readOnly={false}
                    onChange={(e) => HandleInputs(e)} onFocus={handleFocus} /> */}

                      <NumberFormat
                        value={Rec.VAmt} name='VAmt' id="VAmt"
                        displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh"
                        decimalScale={2}

                        className=" form-control  text-end text-black "
                        style={{ fontSize: '18px', paddingTop: '20px' }}
                      />
                      <label htmlFor="VAmt"  >Total Amount</label>
                    </div>
                  </div>

                  {/* ---[ Input VAmount ]--- */}
                  <div style={{ width: '150px' }} >  {/* <div className="input-group"> */}
                    <div className="form-floating w-full" >
                      {/* <input type="number" value={VAmtBal className="form-control  text-end " name='VAmtBal' id="VAmtBal" placeholder="Father Name" readOnly={false}
                    onChange={(e) => HandleInputs(e)} onFocus={handleFocus} /> */}

                      <NumberFormat
                        value={Rec.VAmtDoc} name='VAmtBal' id="VAmtBal"
                        displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh"
                        decimalScale={2}

                        className=" form-control  text-end"
                      // onValueChange={(values) => {
                      //     HandleInputsNumberFormat({ name: 'VAmtBal', value: values.value })

                      />
                      <label htmlFor="VAmtBal"  >Margin</label>
                    </div>
                  </div>

                  {/* ---[ Input VAmount ]--- */}
                  <div style={{ width: '150px' }} >  {/* <div className="input-group"> */}
                    <div className="form-floating w-full" >
                      {/* <input type="number" value={VAmtPaid} className="form-control  text-end " name='VAmtPaid' id="VAmtPaid" placeholder="Father Name" readOnly={false}
                    onChange={(e) => HandleInputs(e)} onFocus={handleFocus} /> */}

                      <NumberFormat value={Rec.VAmtPaid} name='VAmtPaid' id="VAmtPaid" thousandSeparator={true} thousandsGroupStyle="lakh"
                        // label={"1 FTE"}
                        // customInput={TextField}
                        // isNumericString={true}   //for value output is number value
                        // decimalScale={2}

                        // style={{border:'none' , outline: 'none'                  }}
                        className=" form-control  text-end text-blue-600"
                        style={{ fontWeight: 'bold', fontSize: '18px', paddingTop: '20px' }}
                      //onChange={(e) =>{ HandleInputs(e); console.log('**************\nVAmtPaid : ',VAmtPaid)}}
                      />

                      <label htmlFor="VAmtPaid"  >Inv. Amount</label>
                    </div>
                  </div>

                </div>
              </div>
              {/*--------------------------------*/}
              {/* END of Invoice Payment Section        */}
              {/*--------------------------------*/}


            </div>   {/* END txt-line of Tot Items/ Examinations */}

          </div>{/*[END Detail Section]  */}


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

