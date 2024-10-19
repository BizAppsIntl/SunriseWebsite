import React, { useState } from 'react'
import Moment from 'moment'

import Chevron from './chevron.svg'
// import ImgMale from '../../../../ImagesAdminPanel/default/Male.png'
// import ImgFemale from '../../../../ImagesAdminPanel/default/Female.png'

const AccordianCard = ({ RecItm }) => {
  Moment.locale('en');


  const [AccordianToggle, setAccordianToggle] = useState(false)

  console.log('AccordianToggle', AccordianToggle)
  const handleAccordianToggle = (e) => {
    console.log('New Value AccordianToggle:', AccordianToggle)
    setAccordianToggle(!AccordianToggle)
  }

  return (
    <>
      <div className="card" >
        {/* Card Header */}
        <div className="card-header d-flex  py-0" onClick={(e) => handleAccordianToggle(e)} style={{ background: '#7177ca', color: 'white' }} >
          {/* <span> <img src={(RecItm.Gender===0)?ImgFemale:ImgMale}   style={{margin:'1px 10px'}} alt="Male" width={'20px'}/> </span>   */}

          {/* <button className='btn btn-sm d-flex px-1 py-0 text-start border-bottom ' key={E.Code} onClick={() => { HandleListItemClicked(E) }}> */}
          <span >[{RecItm.VNo}] </span>
          
          {/* Regular space: &nbsp;
          Two spaces gap: &ensp;
          Four spaces gap: &emsp; */}

          <span > &ensp; &emsp; {Moment(RecItm.VDte).format('DD MMM YY ddd')}  </span>
          <span > &ensp; &emsp; [{RecItm.TCode}]</span>
          <span > &ensp; &emsp; {RecItm.VAmt}</span>
          {/* </button> */}

          <span className='ms-auto'>
            <img className={(AccordianToggle?AccordianToggle: '') && "active"} width='20px' src={Chevron}
              style={{
                transform: (AccordianToggle && "active") ? 'rotate(0deg)' : 'rotate(-90deg)',
                transition: 'transform 0.2s ease-in-out'
              }}
              alt=">" />
          </span>

        </div>

        {/* Card Body */}
        <div className="card-body " style={{ fontSize: '14px', display: (AccordianToggle) ? 'block' : 'none' }}>
          <div className="container d-flex gap-1 shadow" style={{ fontSize: '12px' }}>

            <div className="d-flex flex-column flex-fill " >
              <img src="" alt="" width='100px' height='100px' className='border shadow' />
              <div className="card-img-top px-2 pt-2 text-center " >
                {/* <img src={`Images/AdminPanel/Suppliers/${PicURL}`} style={{ width: "75%", height: '100px', color: '#e040fb' }} alt="..." /> */}
              </div>
            </div>

            {/* <div className="d-flex" style={{ width:'28%' }}> */}
            <div className="d-flex  flex-fill" >
              <table width='100%'>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th >Voucher No</th>    <td >{RecItm.VNo} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Voucher Date</th>    <td>{Moment(RecItm.VDte).format('DD MMM YY ddd')} </td>  </tr>
                {/* <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Supplier</th>    <td>[ {RecItm.TCode} ]  {RecItm.TRec.Title} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Payment Account:</th>    <td>{RecItm.Code}  {RecItm.AccCodeC[0].Title}</td>  </tr> */}
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Description</th>    <td>{RecItm.VDesc} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Voucher Amount</th>    <td>{RecItm.VAmt} </td>  </tr>
              </table>
            </div>
            --------

            ----------
            <div className="d-flex  flex-fill" >
              <table width='100%'>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Title</th>    <td>{RecItm.Title} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Description</th>    <td>{RecItm.Desc} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Remarks: </th>    <td>{RecItm.Rem} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Address:</th>    <td>{RecItm.Address} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Phones:</th>    <td>{RecItm.Phone} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Contact Person:</th>    <td>{RecItm.ContactPerson} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Person Phones:</th>    <td> ContactPhone </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Contact Assistant:</th>    <td>{RecItm.ContactPerson2} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Assistant Phones:</th>    <td>{RecItm.ContactPhone2} </td>  </tr>
              </table>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
export default AccordianCard
