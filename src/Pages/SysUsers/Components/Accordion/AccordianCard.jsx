import React, { useState } from 'react'
import Chevron from './chevron.svg'
import ImgMale from '../../../../ImagesAdminPanel/default/Male.png'
import ImgFemale from '../../../../ImagesAdminPanel/default/Female.png'
import { AlertRec } from '../../../../../StdLib'

const AccordianCard = ({ RecItm }) => {
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
        <div className="card-header d-flex justify-content-between py-0" onClick={(e) => handleAccordianToggle(e)} style={{ background: '#7177ca', color: 'white' }} >
          <div className='d-flex'>
            {/* <span> <img src={(RecItm.Gender===0)?ImgFemale:ImgMale}   style={{margin:'1px 10px'}} alt="Male" width={'20px'}/> </span>   */}
            <div style={{ width: '50px' }}> [{RecItm.Id}]  </div>
            <div> <img src={process.env.REACT_APP_API_URL + `Staff/GetFile/${RecItm.PicURL}`} alt="..." width='20px' height='20px'
              className='mx-3 ' /></div>

            {RecItm.Title} {RecItm.TitleU}
          </div>

          <img className={(AccordianToggle ? AccordianToggle : '') && "active"} width='20px' src={Chevron}
            style={{
              transform: (AccordianToggle && "active") ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 0.2s ease-in-out'
            }}
            alt=">" />

        </div>

        {/* Card Body */}
        <div className="card-body " style={{ fontSize: '14px', display: (AccordianToggle) ? 'block' : 'none' }}>
          <div className="d-flex gap-2 shadow" style={{ fontSize: '12px' }}>

            <div className="d-flex flex-column " style={{ width: '150px' }}>
              <img src={process.env.REACT_APP_API_URL + `Staff/GetFile/${RecItm.PicURL}`} alt="..." width='100px' height='100px' className='border shadow' />

              <div className='text-danger mt-2 d-flex  flex-fill' >
                <table width='60%'>
                  <tr> <th className='text-danger' >Ref. Code: </th> <td className='text-black' >{RecItm.Id}</td>  </tr>

                  {/* <tr> <td className='text-black' >{RecItm.Id}</td>  </tr> */}
                  {/* <tr> <th className='text-danger' >Remarks</th>  </tr> */}
                  {/* <tr> <td className='text-black' >RecItm.RemLeave</td>  </tr> */}
                </table>
              </div>
            </div>

            {/* const RecDefault = {
            Id: '', Code: '', Title: '', TitleU: '', FName: '', FNameU: '', Gender: '1', Desc: '', Rem: '',
            Pic: '', PicURL: '', PicURL4Edit: '',
            DteBirth: '', NIC: '', Address: '', Phone: '', Contact: '', ContactPh: '', Ref: '', RefDesc: '',
            DteJoin: '', Department: '', Designation: '', Category: '', JobStatus: '', JobDuty: '', Experience: '',
            DteLeave: '', RemLeave: '', VehNo: '', VehDesc: '',
            CrntBal: '', RecType: '', RecStatus: '', Priority: '0000', EntryBy: '', EntryDte: ''
            } */}


            {/* <div className="d-flex" style={{ width:'28%' }}> */}
            <div className="d-flex  flex-fill" >
              <table width='100%'>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th >Title</th>    <td >{RecItm.Title} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>نام </th>    <td>{RecItm.TitleU} </td>  </tr>
                {/* <tr style={{borderBottom:'1px solid #ddd'}}> <th>Gender</th>    <td>{RecItm.Gender} </td>  </tr> */}
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Father Name</th>    <td>{RecItm.FName} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Father Name U</th>    <td>{RecItm.FNameU} </td>  </tr>
                {/* <tr style={{borderBottom:'1px solid #ddd'}}> <th>Father Name</th>    <td>{RecItm.FName} </td>  </tr>
                <tr style={{borderBottom:'1px solid #ddd'}}> <th>Father Name U</th>    <td>{RecItm.FNameU} </td>  </tr> */}
              </table>
            </div>

            <div className="d-flex  flex-fill" >
              <table width='100%'>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Date Of Birth</th>    <td>{RecItm.DteBirth} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>NIC #</th>    <td>{RecItm.NIC} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>---</th>    <td>  </td> {' '} </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Phone</th>    <td>{RecItm.Phone} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Address</th>    <td>{RecItm.Address} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Other Contact</th>    <td>{RecItm.Contact} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Contact Phone</th>    <td>{RecItm.ContactPh} </td>  </tr>
                {/* <tr style={{borderBottom:'1px solid #ddd'}}> <th>Vehicle Type</th>    <td>{RecItm.VehDesc} </td>  </tr> */}
                {/* <tr style={{borderBottom:'1px solid #ddd'}}> <th>Address</th>    <td>{RecItm.Address} </td>  </tr> */}
                {/* <tr style={{borderBottom:'1px solid #ddd'}}> <th>References</th>    <td>{RecItm.Ref} </td>  </tr> */}
                {/* <tr style={{borderBottom:'1px solid #ddd'}}> <th>Detail</th>    <td>{RecItm.RefDesc} </td>  </tr> */}
              </table>
            </div>

            <div className="d-flex  flex-fill " >
              <table width='100%'>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Joining Date</th>    <td>{RecItm.DteJoin} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Department</th>    <td>{RecItm.Department} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Designation</th>    <td>{RecItm.Designation} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Category</th>    <td>{RecItm.Category} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>JobStatus</th>    <td>{RecItm.JobStatus} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>JobDuty</th>    <td>{RecItm.JobDuty} </td>  </tr>
                <tr style={{ borderBottom: '1px solid #ddd' }}> <th>Experience</th>    <td>{RecItm.Experience} </td>  </tr>
                {/* <tr style={{borderBottom:'1px solid #ddd'}}> <th>Vehicle Type</th>    <td>{RecItm.VehDesc} </td>  </tr> */}
                {/* <tr style={{borderBottom:'1px solid #ddd'}}> <th>Address</th>    <td>{RecItm.Address} </td>  </tr> */}
                {/* <tr style={{borderBottom:'1px solid #ddd'}}> <th>References</th>    <td>{RecItm.Ref} </td>  </tr> */}
                {/* <tr style={{borderBottom:'1px solid #ddd'}}> <th>Detail</th>    <td>{RecItm.RefDesc} </td>  </tr> */}
              </table>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
export default AccordianCard
