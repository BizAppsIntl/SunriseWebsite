import React from 'react'
import Moment from 'moment'
import { CgCloseO } from 'react-icons/cg'
import { ImEnter } from 'react-icons/im'
// import { Col, ListGroup, Row } from 'react-bootstrap'

import ImgMale from '../../../ImagesAdminPanel/default/Male.png'
import ImgFemale from '../../../ImagesAdminPanel/default/Female.png'
import defaultIcon from '../../../ImagesAdminPanel/default/Suppliers.png'
import MyAvatar from '../../../../Utils/MyAvatar'

const RecDetailDisp = ({ Rec, HandleCloseWindow }) => {

  return (
    <>
      {/* {console.log('Selected', Rec)} */}

      {/*  ========================   Voucher Detail- Header */}
      <div className='card-header  p-2 relative'>
        {/* <img src={(Rec.Gender > 0) ? ImgMale : ImgFemale} alt="Gender" width='40px' height='40px' /> */}
        <div className='flex gap-4'>
          <img src={defaultIcon} alt="Default" width='40px' height='40px' />
          <span className='text-2xl font-bold '>Vendor Profile</span>
        </div>

        {/* Header- Fields Input part */}
        <div className='flex gap-4'>
          <div className='flex  items-center' style={{}}>
            <span className='text-lg font-bold ' >Item ID#:</span>
            <span className='text-xl mx-2' >[{Rec.Code}/{Rec.Id}]</span>
          </div>

          <div className='flex  items-center' style={{}}>
            <span className='text-lg font-bold mx-2' >Rec Status:</span>
            <span className='text-xl ' >[{Rec.RecStatus}]</span>
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
      <div className='card-body shadow px-2 py-4 text-left  w-full flex '>

        <div className=" p-0 mb-1 mx-auto pt-3" style={{ width: "70%" }} >
          {/* <div className='flex  mb-3 ' > */}
          {/* <span className='text-lg font-bold' style={{ width: '33%', lineHeight: '1' }}>Title:</span> */}
          {/* <span className='me-auto border-b ' style={{ width: '66%' }}>{Rec.Title} </span> */}
          {/* <span className='text-lg me-auto' >{Rec.Cat} - {(DataCategories.find((P) => P.Id === Rec.Cat)).Title}</span> */}
          {/* </div>  */}


          <ul >
            <li className=' flex gap-2'>
              <div className='text-lg font-bold text-end' style={{ width: '33%', lineHeight: '1' }}>Name:</div>
              <div className='me-auto text-lg border-b ' style={{ width: '66%' }}>{Rec.Title} </div>
            </li>

            {/* <li className=' flex mt-2'>
              <div className='text-lg font-bold' style={{ width: '33%', lineHeight: '1' }}>نام</div>
              <div className='me-auto text-lg border-b ' style={{ width: '66%' }}>{Rec.TitleU} </div>
            </li> */}

            <li className=' flex gap-2 mt-4'>
              <div className='text-lg font-bold text-end' style={{ width: '33%', lineHeight: '1' }}>Desciption:</div>
              <div className='me-auto text-lg border-b ' style={{ width: '66%' }}>{Rec.Desc} </div>
            </li>

            <li className=' flex gap-2 mt-2'>
              <div className='text-lg font-bold text-end' style={{ width: '33%', lineHeight: '1' }}>Remarks:</div>
              <div className='me-auto text-lg border-b ' style={{ width: '66%' }}>{Rec.Rem} </div>
            </li>

            <li className=' flex gap-2 mt-4'>
              <div className='text-lg font-bold text-end' style={{ width: '33%', lineHeight: '1' }}>Phones:</div>
              <div className='me-auto text-lg border-b ' style={{ width: '66%' }}>{Rec.Phone} </div>
            </li>

            <li className=' flex gap-2 mt-2'>
              <div className='text-lg font-bold text-end' style={{ width: '33%', lineHeight: '1' }}>Address:</div>
              <div className='me-auto text-lg border-b ' style={{ width: '66%' }}>{Rec.Address} </div>
            </li>

            <li className=' flex gap-2 mt-2'>
              <div className='text-lg font-bold text-end' style={{ width: '33%', lineHeight: '1' }}>City:</div>
              <div className='me-auto text-lg border-b ' style={{ width: '66%' }}>{Rec.City} </div>
            </li>

            <li className=' flex gap-2 mt-4'>
              <div className='text-lg font-bold text-end' style={{ width: '33%', lineHeight: '1' }}>Other Contact :</div>
              <div className='me-auto text-lg border-b ' style={{ width: '66%' }}>{Rec.Contact1} </div>
            </li>

            <li className=' flex gap-2 mt-2'>
              <div className='text-lg font-bold text-end' style={{ width: '33%', lineHeight: '1' }}>Contact Phone:</div>
              <div className='me-auto text-lg border-b ' style={{ width: '66%' }}>{Rec.ContactPh1} </div>
            </li>

          </ul>


          {/* <div className='flex  mb-3 ' >
            <span className='text-lg font-bold' style={{ width: '33%', lineHeight: '1' }}>Desciption:</span>
            <span className='me-auto border-b ' style={{ width: '66%' }}>{Rec.Desc}</span>
          </div> */}

          {/* <div className='flex  mb-3 ' >
            <span className='text-lg font-bold' style={{ width: '33%', lineHeight: '1' }}>Remarks:</span>
            <span className='me-auto border-b ' style={{ width: '66%' }}>{Rec.Rem}</span>
          </div> */}

          {/* <div className='flex  mb-3 ' >
            <span className='text-lg font-bold' style={{ width: '33%', lineHeight: '1' }}>Priority:</span>
            <span className='me-auto border-b ' style={{ width: '66%' }}>{Rec.Priority}</span>
          </div> */}

          {/* <div className='flex  mb-3 ' >
            <span className='text-lg font-bold' style={{ wCustomers33%', lineHeight: '1' }}>Record Type:</span>
            <span className='me-auto border-b ' style={{ width: '66%' }}>{Rec.RecType}</span>
          </div> */}

          {/* <div className='flex  mb-3 ' >
            <span className='text-lg font-bold' style={{ wCustomers33%', lineHeight: '1' }}>Record Status:</span>
            <span className='me-auto border-b ' style={{ width: '66%' }}>{Rec.RecStatus}</span>
          </div> */}

        </div> {/* Detail body  col part */}

        <div style={{ width: '30%' }} >
          <div className="card-img-top p-1" >
            {/* <img src={`Images/ItemsStore/${Rec.Pic}`} style={{ width: "100%", height: '100%', cursor: 'pointer' }} alt="..." /> */}
            {/* <img src={`Uploads/Items/${Rec.PicURL}`} style={{ width: "100%", height: '100%', cursor: 'pointer' }} alt="..." /> */}

            {/* <img src={process.env.REACT_APP_API_URL + `Traders/GetFile/${Rec.PicURL}`} style={{ width: "100%", height: '100%', cursor: 'pointer' }} alt="..." /> */}

            {(Rec.PicURL !== null && Rec.PicURL.trim())
              ? <img style={{ width: "100%", height: '100%', color: '#e040fb' }} alt="..."
                src={
                  Rec.PicURL !== null && Rec.PicURL.trim()
                    ? process.env.REACT_APP_API_URL + `Traders/GetFile/${Rec.PicURL}`
                    : ''
                } />

              : <MyAvatar Text={Rec.Title[0]} Size={100} />
            }

          </div>
        </div>

        <div >
          {/* <InfoCard InfoRec={Rec.RefTrader} /> */}
        </div>

      </div> {/* parent card body */}

    </>
  )
}

export default RecDetailDisp
