import React from 'react'
import Moment from 'moment'
import { CgCloseO } from 'react-icons/cg'
import { ImEnter } from 'react-icons/im'
// import { Col, ListGroup, Row } from 'react-bootstrap'

// import ImgMale from '../../../ImagesAdminPanel/default/Male.png'
// import ImgFemale from '../../../ImagesAdminPanel/default/Female.png'
import defaultIcon from'../AssetsLocal/Images/Customers.png'
import MyAvatar from '../../../../../Utils/MyAvatar'
import { AlertRec, AmountInWords } from '../../../../../StdLib'
import NumberFormat from 'react-number-format'

const RecDetailDisp = ({ Rec, HandleCloseWindow }) => {
// AlertRec(Rec, 'Rec in RecDetailDisp Receipts')
  return (
    <>
      {/* {console.log('Selected', Rec)} */}

      {/*  ========================   Voucher Detail- Header */}
      <div className='card-header  p-2 relative leading-none bg-gray-100'>
        {/* <img src={(Rec.Gender > 0) ? ImgMale : ImgFemale} alt="Gender" width='40px' height='40px' /> */}
        <div className='flex gap-4'>
          <img src={defaultIcon} alt="Default" width='40px' height='40px' />
          <span className='text-xl font-bold '>Sales Collection Receipt</span>
        </div>

        {/* Header- Fields Input part */}
        <div className='flex justify-between md:justify-start md:gap-4'>
          <div className='flex  items-center' style={{}}>
            <span className='text-base font-bold ' >VNo#:</span>
            <span className='text-base mx-2' >[{Rec.VNo}]</span>
          </div>

          <div className='flex  items-center' style={{}}>
            <span className='text-base font-bold mx-2' >Date:</span>
            <span className='text-base ' >{Moment(Rec.VDte).format('DD MMM YY, dddd')}</span>
          </div>

        </div>

        {/* Header- Close button part */}
        {/* <div className='-mt-[15px] -mr-[15px]'> */}
        <div
          // style={{display:'block', position: 'absolute', top: '0px', right: '2px' }}
          // className="absolute top-0 right-0 mt-1 mr-1 p-1 bg-red-500 text-white rounded-full"
          className="cursor-pointer absolute top-0 right-0 -mt-2 -mr-2 "   //-mt-2 due to p-2
        >
          {/* &times; */}

          {/* <ImEnter className='fs-3  text-danger ' onClick={() => HandleCloseWindow(true)} /> */}
          <CgCloseO className='text-3xl text-red-600 ' onClick={() => HandleCloseWindow(true)} />
          {/* <SlClose className='fs-3 ms-auto text-danger '  /> */}
        </div>
      </div>


      {/* ========================   Voucher Detail- Body */}
      {/* <div className='card-body shadow flex gap-2 justify-evenly  items-start  w-100' style={{ background: '#ebecf0' }}> */}
      <div className='card-body shadow px-2 py-4 text-left  w-full'>

          {/* <div className='flex  mb-3 ' > */}
          {/* <span className='text-lg font-bold' style={{ width: '33%' }}>Title:</span> */}
          {/* <span className='me-auto border-b ' style={{ width: '66%' }}>{Rec.Title} </span> */}
          {/* <span className='text-lg me-auto' >{Rec.Cat} - {(DataCategories.find((P) => P.Id === Rec.Cat)).Title}</span> */}
          {/* </div>  */}



            {/* ------------- Distributor DATA*/}
            <div className="card p-2 mb-4 shadow-md " >

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

          <ul  >
            <li className=' flex gap-2'>
              <div className='text-base font-bold text-end leading-none' style={{ width: '33%' }}>Account Head/Title:</div>
              <div className='me-auto text-lg border-b ' style={{ width: '66%' }}>{Rec.AccD[0].Title} </div>
            </li>

            {/* <li className=' flex mt-2'>
              <div className='text-lg font-bold' style={{ width: '33%' }}>نام</div>
              <div className='me-auto text-lg border-b ' style={{ width: '66%' }}>{Rec.TitleU} </div>
            </li> */}

            <li className=' flex gap-2 mt-4'>
              <div className='text-base font-bold text-end leading-none' style={{ width: '33%' }}>Description:</div>
              <div className='me-auto text-lg border-b ' style={{ width: '66%' }}>{Rec.Desc} </div>
            </li>

            <li className=' flex gap-2 mt-2 '>
              <div className='text-base font-bold text-end leading-none' style={{ width: '33%' }}>Detail/Ref:</div>
              <div className='me-auto text-lg border-b' style={{ width: '66%' }}>{Rec.Rem} </div>
            </li>


            <li className=' flex gap-2 mt-2'>
              <div className='text-base font-bold text-end leading-none' style={{ width: '33%' }}>Voucher Amount:</div>
              <div className='me-auto text-lg border-b ps-4' style={{ width: '66%' }}>
              <NumberFormat value={Rec.VAmt} name='VAmt' id="VAmt" thousandSeparator={true} thousandsGroupStyle="lakh"
                displayType='text'                

                //// label={"1 FTE"}
                //// customInput={TextField}
                //// isNumericString={true}   //for value output is number value
                decimalScale={2}
                readOnly
                //// style={{border:'none' , outline: 'none'                  }}
                className=""

              />
                </div>
            </li>
            <li className=' flex gap-2 mt-2'>
              <div className='text-base font-bold text-end leading-none' style={{ width: '33%' }}>Amount In Words:</div>
              <div className='me-auto text-lg border-b ' style={{ width: '66%' }}>
              {AmountInWords(Rec.VAmt)}
                              </div>
            </li>


          </ul>


          {/* <div className='flex  mb-3 ' >
            <span className='text-lg font-bold' style={{ width: '33%' }}>Desciption:</span>
            <span className='me-auto border-b ' style={{ width: '66%' }}>{Rec.Desc}</span>
          </div> */}

          {/* <div className='flex  mb-3 ' >
            <span className='text-lg font-bold' style={{ width: '33%' }}>Remarks:</span>
            <span className='me-auto border-b ' style={{ width: '66%' }}>{Rec.Rem}</span>
          </div> */}

          {/* <div className='flex  mb-3 ' >
            <span className='text-lg font-bold' style={{ width: '33%' }}>Priority:</span>
            <span className='me-auto border-b ' style={{ width: '66%' }}>{Rec.Priority}</span>
          </div> */}

          {/* <div className='flex  mb-3 ' >
            <span className='text-lg font-bold' style={{ wCustomers33%' }}>Record Type:</span>
            <span className='me-auto border-b ' style={{ width: '66%' }}>{Rec.RecType}</span>
          </div> */}

          {/* <div className='flex  mb-3 ' >
            <span className='text-lg font-bold' style={{ wCustomers33%' }}>Record Status:</span>
            <span className='me-auto border-b ' style={{ width: '66%' }}>{Rec.RecStatus}</span>
          </div> */}

        

      </div> {/* parent card body */}

    </>
  )
}

export default RecDetailDisp
