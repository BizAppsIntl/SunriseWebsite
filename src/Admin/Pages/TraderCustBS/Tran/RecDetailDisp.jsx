import React from 'react'
import Moment from 'moment'
import { CgCloseO } from 'react-icons/cg'
import { ImEnter } from 'react-icons/im'
import { Col, ListGroup, Row } from 'react-bootstrap'

import ImgMale from '../../../ImagesAdminPanel/default/Male.png'
import ImgFemale from '../../../ImagesAdminPanel/default/Female.png'
import defaultIcon from '../../../ImagesAdminPanel/default/Customers.png'
import MyAvatar from '../../../../Utils/MyAvatar'

const RecDetailDisp = ({ Rec, HandleCloseDispDetail }) => {

  return (
    <>

      {/*  ========================   Voucher Detail- Header */}
      <div className='card-header  p-2 d-flex  w-100'>
        {/* {console.log('Selected', Rec)} */}

        {/* -----------------   Header- Fields Input part */}
        <div className='d-flex  w-100'>

          <div className='d-flex ms-5 align-items-center' style={{ width: '90%' }}>
            {/* <img src={(Rec.Gender > 0) ? ImgMale : ImgFemale} alt="Gender" width='40px' height='40px' /> */}
            <img src={defaultIcon} alt="Default" width='40px' height='40px' />

            {/* <div> */}
            {/* //<th  style={{border: '1px solid black' }} >{Rec.TId} </th> */}
            {/* <span className=' ms-5 fs-5 fw-bold'>Doctor's Smart Code:  </span> */}
            {/* <span className=' ms-3 fs-5 '>{Rec.Code} </span> */}
            {/* </div> */}
            <div className=' fs-5'>
              {/* <th  style={{border: '1px solid black' }} >{Rec.TId} </th> */}
              <span className=' ms-5 fw-bold'>ID#: </span> <span className=' ms-2' >[{Rec.Id}]</span>
            </div>

            <div className=' fs-5 ms-5'>
              {/* <th  style={{border: '1px solid black' }} >{Rec.TId} </th> */}
              <span className=' ms-5 fw-bold'>Smart Code: </span> <span className=' ms-2' >{Rec.Code}</span>
            </div>

            {/* <tr>
                <th> <span >V No:  </span></th>
                <td> <span >{Rec.VNo}   </span> </td>
              </tr> */}
          </div>

        </div>

        {/* ----------------   Header- Close button part */}
        <div style={{ position: 'absolute', top: '0px', right: '2px' }}>
          {/* <ImEnter className='fs-3  text-danger ' onClick={() => HandleCloseDispDetail(true)} /> */}
          <CgCloseO className='fs-3  text-danger ' onClick={() => HandleCloseDispDetail(true)} />
          {/* <SlClose className='fs-3 ms-auto text-danger '  /> */}
        </div>
      </div>


      {/* ========================   Voucher Detail- Body */}
      <div className='card-body shadow d-flex gap-2 justify-justify-content-evenly  align-items-start  w-100' style={{ background: '#ebecf0' }}>
        {/* <div className="card shadow  p-0 mb-1" style={{ width: "100%", maxWidth: '125px', minWidth: '100px' }} > */}

        <div className=" p-0 mb-1 mx-auto pt-3" style={{ width: "70%" }} >
          {/* <div className='d-flex  mb-3 ' > */}
          {/* <span className='fs-5 fw-bolder' style={{ width: '33%', lineHeight: '1' }}>Title:</span> */}
          {/* <span className='me-auto border-bottom ' style={{ width: '66%' }}>{Rec.Title} </span> */}
          {/* <span className='fs-5 me-auto' >{Rec.Cat} - {(DataCategories.find((P) => P.Id === Rec.Cat)).Title}</span> */}
          {/* </div>  */}


          <ul >
            <li className=' d-flex gap-2'>
              <div className='fs-5 fw-bolder text-end' style={{ width: '33%', lineHeight: '1' }}>Name:</div>
              <div className='me-auto fs-5 border-bottom ' style={{ width: '66%' }}>{Rec.Title} </div>
            </li>

            {/* <li className=' d-flex mt-2'>
              <div className='fs-5 fw-bolder' style={{ width: '33%', lineHeight: '1' }}>نام</div>
              <div className='me-auto fs-5 border-bottom ' style={{ width: '66%' }}>{Rec.TitleU} </div>
            </li> */}

            <li className=' d-flex gap-2 mt-4'>
              <div className='fs-5 fw-bolder text-end' style={{ width: '33%', lineHeight: '1' }}>Desciption:</div>
              <div className='me-auto fs-5 border-bottom ' style={{ width: '66%' }}>{Rec.Desc} </div>
            </li>

            <li className=' d-flex gap-2 mt-2'>
              <div className='fs-5 fw-bolder text-end' style={{ width: '33%', lineHeight: '1' }}>Remarks:</div>
              <div className='me-auto fs-5 border-bottom ' style={{ width: '66%' }}>{Rec.Rem} </div>
            </li>

            <li className=' d-flex gap-2 mt-4'>
              <div className='fs-5 fw-bolder text-end' style={{ width: '33%', lineHeight: '1' }}>Phones:</div>
              <div className='me-auto fs-5 border-bottom ' style={{ width: '66%' }}>{Rec.Phone} </div>
            </li>

            <li className=' d-flex gap-2 mt-2'>
              <div className='fs-5 fw-bolder text-end' style={{ width: '33%', lineHeight: '1' }}>Address:</div>
              <div className='me-auto fs-5 border-bottom ' style={{ width: '66%' }}>{Rec.Address} </div>
            </li>

            <li className=' d-flex gap-2 mt-2'>
              <div className='fs-5 fw-bolder text-end' style={{ width: '33%', lineHeight: '1' }}>City:</div>
              <div className='me-auto fs-5 border-bottom ' style={{ width: '66%' }}>{Rec.City} </div>
            </li>

            <li className=' d-flex gap-2 mt-4'>
              <div className='fs-5 fw-bolder text-end' style={{ width: '33%', lineHeight: '1' }}>Other Contact :</div>
              <div className='me-auto fs-5 border-bottom ' style={{ width: '66%' }}>{Rec.Contact1} </div>
            </li>

            <li className=' d-flex gap-2 mt-2'>
              <div className='fs-5 fw-bolder text-end' style={{ width: '33%', lineHeight: '1' }}>Contact Phone:</div>
              <div className='me-auto fs-5 border-bottom ' style={{ width: '66%' }}>{Rec.ContactPh1} </div>
            </li>

          </ul>


          {/* <div className='d-flex  mb-3 ' >
            <span className='fs-5 fw-bolder' style={{ width: '33%', lineHeight: '1' }}>Desciption:</span>
            <span className='me-auto border-bottom ' style={{ width: '66%' }}>{Rec.Desc}</span>
          </div> */}

          {/* <div className='d-flex  mb-3 ' >
            <span className='fs-5 fw-bolder' style={{ width: '33%', lineHeight: '1' }}>Remarks:</span>
            <span className='me-auto border-bottom ' style={{ width: '66%' }}>{Rec.Rem}</span>
          </div> */}

          {/* <div className='d-flex  mb-3 ' >
            <span className='fs-5 fw-bolder' style={{ width: '33%', lineHeight: '1' }}>Priority:</span>
            <span className='me-auto border-bottom ' style={{ width: '66%' }}>{Rec.Priority}</span>
          </div> */}

          {/* <div className='d-flex  mb-3 ' >
            <span className='fs-5 fw-bolder' style={{ wCustomers33%', lineHeight: '1' }}>Record Type:</span>
            <span className='me-auto border-bottom ' style={{ width: '66%' }}>{Rec.RecType}</span>
          </div> */}

          {/* <div className='d-flex  mb-3 ' >
            <span className='fs-5 fw-bolder' style={{ wCustomers33%', lineHeight: '1' }}>Record Status:</span>
            <span className='me-auto border-bottom ' style={{ width: '66%' }}>{Rec.RecStatus}</span>
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

              : <MyAvatar Text={Rec.Title[0]} Size={200} />
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
