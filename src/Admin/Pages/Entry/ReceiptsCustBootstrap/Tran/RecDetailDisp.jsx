import React from 'react'
import Moment from 'moment'
import { CgCloseO } from 'react-icons/cg'
import { ImEnter } from 'react-icons/im'
import InfoCard from '../Components/InfoCard'
import { AlertRec } from '../../../../../StdLib'
import NumberFormat from 'react-number-format'

const RecDetailDisp = ({ Rec, HandleCloseWindow }) => {

  return (

    <>
      {/* {AlertRec(Rec, 'Rec to Display Voucher')} */}
      {/* <div className='card d-flex  m-0 p-1 flex-column text-start' style={{ width: '450px', fontSize: '12px', background: '#e0e0e0', borderRadius: '5px' }}> */}
      {/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.- */}
      {/* Voucher Detail- Header */}
      {/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.- */}

      <div className=' w-100'>

        {/* Header- Close button part */}
        <div style={{ position: 'absolute', top: '0px', right: '2px' }}>
          {/* <ImEnter className='fs-3  text-danger ' onClick={() => HandleCloseWindow(true)} /> */}
          <CgCloseO className='fs-3  text-danger ' onClick={() => HandleCloseWindow(true)} />
          {/* <SlClose className='fs-3 ms-auto text-danger '  /> */}
        </div>


        <div className='card' style={{ width: '100%' }}>
          <div className='card-header  p-2 d-flex  w-100' style={{ background: '#bebebe' }}>
            <div className='d-flex flex-column  flex-grow-1'>
              <div className='d-flex  align-items-center' >
                <div className='fs-5 fw-bolder w-50' >Voucher No:</div>
                <div className='fs-6 ' >[{Rec.VNo}]</div>
              </div>

              <div className='d-flex  align-items-center' >
                <div className='fs-5 fw-bolder w-50' >Voucher Date:</div>
                <div className='fs-6 ' >{Moment(Rec.VDte).format('DD MMM YY, dddd')} </div>
              </div>
            </div>

            {/* Header- Close button part */}
            {/* <div style={{ position: 'absolute', top: '0px', right: '2px' }}> */}
            {/* <CgCloseO className='fs-3  text-danger ' onClick={() => HandleCloseWindow(true)} /> */}
            {/* <SlClose className='fs-3 ms-auto text-danger '  /> */}
            {/* </div> */}
          </div>


          {/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.- */}
          {/* Body- Voucher Detail- Body */}
          {/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.- */}
          <div className='card-body shadow d-flex gap-2 justify-justify-content-evenly  align-items-start  w-100' style={{ background: '#ebecf0' }}>
            {/* <div className="card shadow  p-0 mb-1" style={{ width: "100%", maxWidth: '125px', minWidth: '100px' }} > */}

            <div className=" p-0 mb-1 mx-auto pt-3" style={{ width: "100%" }} >

              {/* <div className='d-flex  mb-3 gap-2' > */}
              {/* <div className='fs-6 fw-bolder' style={{ width: '34%', lineHeight: '1' }}>Supplier:</span> */}
              {/* <span className='me-auto border-bottom ' >[ {Rec.TId} ]  {Rec.RefTrader.Title} </span> */}
              {/* </div> */}

              <div className='d-flex  mb-3 gap-2' >
                <div className='fs-6 fw-bolder' style={{ width: '34%', lineHeight: '1' }}>Consultant:</div>
                {/* <div className='me-auto border-bottom ' >[ {Rec.DocDutyId} ]  {Rec.RefTrader.Title} </div> */}
                <div className='me-auto border-bottom ' > {Rec.RefTrader?.Title} </div>
                {/* <div className='fs-5 me-auto' >{Rec.Cat} - {(DataCategories.find((P) => P.Id === Rec.Cat)).Title}</div> */}
              </div>

              <div className='d-flex  mb-3 gap-2' >
                <div className='fs-6 fw-bolder' style={{ width: '34%', lineHeight: '1' }}>Account Head/Title:</div>
                {/* <div className='me-auto border-bottom ' >[ {Rec.AccC[0].AccCode} ] - {Rec.AccC[0].Title}</div> */}
                <div className='me-auto border-bottom ' > {Rec.AccC[0].Title}</div>
              </div>

              <div className='d-flex  mb-3 gap-2' >
                <div className='fs-6 fw-bolder' style={{ width: '34%', lineHeight: '1' }}>Description:</div>
                <div className='me-auto border-bottom ' > {Rec.Desc}</div>
              </div>

              <div className='d-flex  mb-3 gap-2' >
              <div className='fs-6 fw-bolder' style={{ width: '34%', lineHeight: '1' }}>Detail</div>
              <div className='me-auto border-bottom ' > {Rec.Rem}</div>
            </div>

              <div className='d-flex  mb-3 gap-2' >
                <div className='fs-6 fw-bolder' style={{ width: '34%', lineHeight: '1' }}>Voucher Amount:</div>

                <div className='me-auto border-bottom ' >
                  <NumberFormat value={Rec.VAmt} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" />
                </div>
              </div>


            </div> {/* parent card body */}

          </div>
        </div>

        {/* <div style={{width:'350px'}}><InfoCard InfoRec={Rec.RefTrader} /> </div> */}

      </div>

    </>
  )
}

export default RecDetailDisp




