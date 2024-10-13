import { useEffect, useState } from 'react'
import Moment from 'moment'
import NumberFormat from 'react-number-format'

import Chevron from './chevron.svg'
import { AlertRec } from '../../../../../../StdLib'

const AccordianCard = ({ REC }) => {

  const [AccordianToggle, setAccordianToggle] = useState(false)

  const handleAccordianToggle = (e) => { setAccordianToggle(!AccordianToggle) }

  return (
    <>
      <div className="card" >
        {/* Card Header */}
        <div className="card-header d-flex justify-content-between py-0" onClick={(e) => handleAccordianToggle(e)} style={{ background: '#7177ca', color: 'white' }} >

          <div className='d-flex'>
            {/* <span> <img src={(REC.Gender===0)?ImgFemale:ImgMale}   style={{margin:'1px 10px'}} alt="Male" width={'20px'}/> </span>   */}
            <div style={{ width: '100px' }}> [ {Moment(new Date(REC.TranM.VDte)).format('DD MMM, ddd')} ]  </div>
            <div> <img src={process.env.REACT_APP_API_URL + `Supplier/GetFile/${REC.TranM.RefTrader.PicURL}`} alt="..." width='20px' height='20px' className='mx-3 ' /></div>
            <div style={{ color: 'black' }}> {REC.TranM.RefTrader.Title}</div>
          </div>

          <img className={(AccordianToggle?AccordianToggle: '') && "active"} width='20px' src={Chevron}
            style={{
              transform: (AccordianToggle && "active") ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 0.2s ease-in-out'
            }}
            alt=">" />

        </div>

        {/* Card Body */}
        <div className="card-body p-1" style={{ fontSize: '14px', display: (AccordianToggle) ? 'block' : 'none', background: '#bebebe' }}>
          <div className="card shadow p-1 d-flex flex-row gap-1 " style={{ fontSize: '12px', background: '#D3D3D3' }} >

            <div className="d-flex flex-column  " style={{ width: '20%' }}>
              <img src={process.env.REACT_APP_API_URL + `Supplier/GetFile/${REC.TranM.RefTrader.PicURL}`} alt="..." width='100px' height='100px' className='border shadow' />

              <div className='mt-2 ' >
                <div className='text-black text-center' > {Moment(new Date(REC.TranM.VDte)).format('DD MMM, ddd')}   </div>
                <div className='text-danger text-center'>Bill#: <span className='text-black' >{REC.TranM.VNo}</span>  </div>
              </div>
            </div>

            {/* <div className="d-flex" style={{ width:'28%' }}> */}
            <div className="d-flex  flex-column ms-1" style={{ width: '20%' }}>
              <div className="d-flex  flex-column mt-2 border-bottom " ><div className="fw-bolder" >Description</div> <div>{REC.TranM.Desc}</div> </div>
              <div className="d-flex  flex-column mt-2 border-bottom " ><div className="fw-bolder" >Items Count</div> <div>{REC.TranM.VQtyTxt}</div> </div>
              <div className="d-flex  flex-column mt-2 " ><div className="fw-bolder" >Amount</div> <div>{REC.TranM.VAmt}</div> </div>
            </div>

            <div className="d-flex  flex-column" style={{ width: '60%', fontSize: '10px' }}>

              <table width='100%'>
                <tr style={{ borderBottom: '2px solid #ddd' }}>
                  <th width="25%" >Title </th>
                  <th width="20%" >Title </th>
                  <th width="20%" >Quantity</th>
                  <th width="20%" >Price </th>
                  <th width="15%" > Amount </th>
                </tr>

                {REC.TranDs.map((E, I) => {
                  return(
                  <tr style={{ borderBottom: '1px solid #ddd' }}>
                    <td width="35%" >{E.RefItem.Title}</td>
                    <td width="20%" >{E.RefItem.TitleU}</td>

                    {/* UNIT +  */}
                    <td width="15%"  className='text-center' >{E.Qty} {E.Unit} </td>

                    {/* PRICE +  */}
                    <td width="15%"  className='text-center' >@ {E.Price}                    </td>

                    {/* AMOUNT +  */}
                    <td width="15%"  className='text-end' ><NumberFormat value={E.Qty * E.Price} displayType={'text'} thousandSeparator={true}  thousandsGroupStyle="lakh" />  </td>
                                        
                  </tr>)
                })}
              </table>
            </div>

          </div>
        </div> {/* Card Body */}

      </div>
    </>
  )
}
export default AccordianCard
