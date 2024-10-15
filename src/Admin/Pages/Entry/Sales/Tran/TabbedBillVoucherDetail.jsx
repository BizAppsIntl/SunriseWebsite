import React from 'react'
import { AlertRec, DispAPIInAlert, DispArrayInAlert, DispRecInAlert } from '../../../../../StdLib'

import { BsSortNumericUpAlt } from 'react-icons/bs'
import { BsSortNumericDownAlt } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'
import { FaMinus } from 'react-icons/fa'
import NumberFormat from 'react-number-format'
import ImgMale from '../../../../ImagesAdminPanel/default/Male.png'

import EyeLtOpen from '../../../../ImagesAdminPanel/default/Eyes/eyeLt-Open.png'
import EyeLtShut from '../../../../ImagesAdminPanel/default/Eyes/eyeLt-Shut.png'
import EyeRtOpen from '../../../../ImagesAdminPanel/default/Eyes/eyeRt-Open.png'
import EyeRtShut from '../../../../ImagesAdminPanel/default/Eyes/eyeRt-Shut.png'

import EyeLtOpenOutline from '../../../../ImagesAdminPanel/default/Eyes/EyeLtOpenOutline.jpg'
import EyeLtShutOutline from '../../../../ImagesAdminPanel/default/Eyes/EyeLtShutOutline.jpg'
import EyeRtOpenOutline from '../../../../ImagesAdminPanel/default/Eyes/EyeRtOpenOutline.jpg'
import EyeRtShutOutline from '../../../../ImagesAdminPanel/default/Eyes/EyeRtShutOutline.jpg'
import { useCtxMainContextHook } from '../../../../../CtxMain'
import EyeCircled from '../Components/EyeCircled'
import { MdDeleteSweep } from 'react-icons/md'
import { FaArrowTurnDown } from 'react-icons/fa6'

export default function TabbedBillVoucherDetail(props) {
  const { OrderSheetItems, OrderItemAdd, OrderItemDel, HandleInputsVoucherDetailNumberFormat } = props
  const { CtxMainState, CtxMainDispatch } = useCtxMainContextHook()
  const { _Procedures, _Patients, _DocsRef } = CtxMainState

  // AlertRec(OrderSheetItems, 'TabbedBillVoucherDetail Order-Sheet:')


  // ==================[  Fn: Handle Inputs  ]=====================
  const handleFocus = (event) => event.target.select();


  // {/* ========= [         VOUCHER Transavtion Records/Rows PART       ============================== */}
  return (
    <>
      {/* {AlertRec(OrderSheetItems,'*****OrderSheetItems*****')} */}
      <div className="pe-2 w-full border border-gray-300 rounded-lg shadow-lg overflow-hidden ">
      <div className='text-lg font-bold text-blue-600 leading-none ' >Invoice Detail</div>

      {OrderSheetItems.map((E, I) =>
        <div className='card shadow flex flex-col  items-center m-1 w-full' style={{ fontSize: '12px' }} key={I}>
          {/* {AlertRec(E.RefItem, '*****  E.RefItem  *****')} */}

          <table ><tbody><tr>

            <td width="3%" className='ps-1' style={{ lineHeight: '1' }}>
              {I + 1} <br />
              <span className='btn p-0 m-0 fs-5 text-red-600' style={{ lineHeight: '1' }} onClick={() => OrderItemDel(E.PId, E.Qty)} ><MdDeleteSweep /></span>
            </td>

            {/* <td width="11%" ><img src={`Uploads/Items/${E.PicURL}`} alt={E.URL} width='40px' height='40px' /></td> */}
            <td width="7%" ><img src={process.env.REACT_APP_API_URL + `Items/GetFile/${E.RefItem?.PicURL}`} alt={E.RefItem?.PicURL} width='40px' height='40px' /></td>

            {/* <td width="30%" >{E.RefItem.Title}<br />{E.RefItem.TitleU}</td> */}
            {/* <td >{E.RefItem.Title}  <br />Qty:{E.Qty}  ER:{E.ER} EL:{E.EL}</td> */}
            <td style={{ verticalAlign: 'middle' }} >{E.RefItem?.Title} </td>


            {/* qty +  */}
            <td width="10%" className=''>
              {/* ---[ Input VAmount ]--- */}
              {/* <div style={{ width: '75px' }}> */}
              <div className=" w-full " >
                {/* <input type="number" value={VAmt} className="form-control  text-end " name='VAmt' id="VAmt" placeholder="Father Name" readOnly={false}
                                    onChange={(e) => HandleInputs(e)} onFocus={handleFocus} /> */}



                <div className='p-0 flex justify-evenly ' htmlFor="Qty" style={{ lineHeight: '1' }} >
                  {/* PLUS +  <FaPlus /> */}
                  <button className='p-0 m-0 text-base w-4 text-center bg-blue-600 rounded-full text-white' style={{ lineHeight: '1' }}
                    onClick={() => { OrderItemAdd(E.PId, E.RefItem.QtyInc, E.RefItem) }}>+</button>
                  Qty
                  <button className='p-0 m-0 text-base w-4 text-center bg-blue-600 rounded-full text-white' style={{ lineHeight: '1' }}
                    onClick={() => { OrderItemAdd(E.PId, -E.RefItem.QtyInc, E.RefItem) }}>-</button>

                </div>

                <NumberFormat value={E.Qty} name='Qty' id="Qty" thousandSeparator={true} thousandsGroupStyle="lakh"
                  className="h-6 px-0 text-base text-center font-bold text-blue-600 border-none outline-none w-full"
                  // style={{ fontSize: '16px', outline: 'none' }}
                  // style={{border:'none' , outline: 'none'                  }}

                  // label={"1 FTE"}
                  // customInput={TextField}
                  // isNumericString={true}   //for value output is number value
                  // decimalScale={2}

                  onValueChange={(values) => {
                    HandleInputsVoucherDetailNumberFormat(E, { name: 'Qty', value: values.value })
                  }}
                />

              </div>

            </td>



            {/* <td width="11%" className='pt-1'> */}

            {/* QUANTITY   */}
            {/* Toggle Left Eye +  */}

            {/* <div className='flex flex-row text-center justify-center items-center mx-0 px-0 ' > */}

            {/* RIGHT Eye  */}
            {/* <div className='btn p-0 m-0 ' onClick={() => OrderItemAdd(E.PId, 'R', E)}>
                  <EyeCircled RL={'R'} Mode={E.ER === 0 ? false : true} Size={30} />
                </div> */}

            {/* LEFT Eye  */}
            {/* <div className='btn p-0 m-0 ' onClick={() => OrderItemAdd(E.PId, 'L', E)}>
                  <EyeCircled RL={'L'} Mode={E.EL === 0 ? false : true} Size={30} />
                </div> */}

            {/* </div> */}
            {/* </td> */}



            {/* UNIT +  */}
            {/* <td width="5%" className=' text-center' >{E.Unit.trim()}<br/>@ &nbsp;</td> */}
            {/* <td width="10%" className=' text-center' >{E.Unit.trim()} &nbsp;@ &nbsp;</td> */}

            {/* Qty +  */}
            {/* <td width="15%" >
              <div className='flex'> @ &nbsp;
                <NumberFormat value={E.Price} name='Price' id="Price" thousandSeparator={true} thousandsGroupStyle="lakh"
                  className="w-full text-red-600 text-center text-decoration-underline "
                  style={{ fontSize: '14px' }}

                  decimalScale={1}

                  onValueChange={(values) => {
                    HandleInputsVoucherDetailNumberFormat(E, { name: 'Price', value: values.value })
                  }}
                />
              </div>
            </td> */}

            {/* PRICE +  */}
            <td width="11%" className=''>
              {/* ---[ Input VAmount ]--- */}
              {/* <div style={{ width: '75px' }}> */}
              <div className='text-center ' htmlFor="Price" style={{ fontSize: '12px' }}  >@</div>
              <div className="w-full" >
                {/* <input type="number" value={VAmt} className="form-control  text-end " name='VAmt' id="VAmt" placeholder="Father Name" readOnly={false}
                                    onChange={(e) => HandleInputs(e)} onFocus={handleFocus} /> */}

                <NumberFormat value={E.Price} name='Price' id="Price" thousandSeparator={true} thousandsGroupStyle="lakh"
                  className="h-6 px-0 text-base text-center font-bold text-red-600 border-none outline-none w-full"
                  // style={{ fontSize: '16px' }}
                  // style={{border:'none' , outline: 'none'                  }}

                  // label={"1 FTE"}
                  // customInput={TextField}
                  // isNumericString={true}   //for value output is number value
                  // decimalScale={2}

                  onValueChange={(values) => {
                    HandleInputsVoucherDetailNumberFormat(E, { name: 'Price', value: values.value })
                  }}
                />

              </div>
              {/* </div> */}
            </td>


            {/* AMOUNT +  */}
            <td width="13%" className=''>
              {/* ---[ Input VAmount ]--- */}
              {/* <div style={{ width: '75px' }}> */}
              <div className='text-center ' htmlFor="VAmtGross" style={{ fontSize: '12px' }}  >
                Am<span className='hidden md:inline'>oun</span>t
              </div>
              <div className="w-full text-end" >
                {/* <input type="number" value={VAmt} className="form-control  text-end " name='VAmt' id="VAmt" placeholder="Father Name" readOnly={false}
                                    onChange={(e) => HandleInputs(e)} onFocus={handleFocus} /> */}

                <NumberFormat name='VAmtGross' thousandSeparator={true} thousandsGroupStyle="lakh"
                  className="h-6 px-2 text-base font-bold text-Black border-none outline-none w-full"
                  value={E.Qty * E.Price}
                  // style={{ fontSize: '16px' }}
                  // style={{border:'none' , outline: 'none'                  }}                  

                  // label={"1 FTE"}
                  // customInput={TextField}
                  // isNumericString={true}   //for value output is number value
                  decimalScale={2}
                  displayType={'text'}
                />

              </div>
              {/* </div> */}
            </td>


            {/* Margin +  */}
            <td width="11%" className=''>
              {/* ---[ Input VAmount ]--- */}
              {/* <div style={{ width: '75px' }}> */}

              {/* <div className=' flex  items-center justify-center text-sx'  >Margin <span><FaArrowTurnDown/> </span></div> */}
              <div className=' flex  items-center justify-center text-sx'  >Margin<span className='hidden md:inline'>{` (${E.Margin}%)`}</span></div>
              <div className="w-full text-center" >
                {/* <input type="number" value={VAmt} className="form-control  text-end " name='VAmt' id="VAmt" placeholder="Father Name" readOnly={false}
                                    onChange={(e) => HandleInputs(e)} onFocus={handleFocus} /> */}

                <NumberFormat name='Margin' id="Margin" thousandSeparator={true} thousandsGroupStyle="lakh"
                  className="h-6 px-0 text-base text-center font-bold text-green-600 border-none outline-none w-full"
                  value={(E.Qty * E.Price) * (E.Margin / 100)}
                  // style={{ fontSize: '16px' }}
                  // style={{border:'none' , outline: 'none'                  }}

                  // prefix={'Rs. '}
                  //suffix={` (${E.Margin}%)`}
                  // label={"1 FTE"}
                  // customInput={TextField}
                  // isNumericString={true}   //for value output is number value
                  decimalScale={2}
                  displayType={'text'}

                />

              </div>
              {/* </div> */}
            </td>


            {/* Amount  */}
            <td width="15%" className=''>
              {/* ---[ Input VAmount ]--- */}
              {/* <div style={{ width: '75px' }}> */}
              <div className='text-center ' htmlFor="VAmt" >Net Am<span className='hidden md:inline'>oun</span>t</div>
              <div className="w-full text-end" >
                {/* <input type="number" value={VAmt} className="form-control  text-end " name='VAmt' id="VAmt" placeholder="Father Name" readOnly={false}
                                    onChange={(e) => HandleInputs(e)} onFocus={handleFocus} /> */}

                <NumberFormat name='VAmt' thousandSeparator={true} thousandsGroupStyle="lakh"
                  className="h-6 px-1 text-base font-bold text-Black border-none outline-none w-full"
                  value={(E.Qty * E.Price) - ((E.Qty * E.Price) * (E.Margin / 100))}
                  // style={{ fontSize: '16px' }}
                  // style={{border:'none' , outline: 'none'                  }}                  

                  // label={"1 FTE"}
                  // customInput={TextField}
                  // isNumericString={true}   //for value output is number value
                  decimalScale={2}
                  displayType={'text'}
                />

              </div>
              {/* </div> */}
            </td>

          </tr></tbody></table>
        </div>
      )}

</div>
</>
  )
}