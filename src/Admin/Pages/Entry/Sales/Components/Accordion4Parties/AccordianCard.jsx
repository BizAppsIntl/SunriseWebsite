import { useEffect, useState } from 'react'
import Moment from 'moment'
import NumberFormat from 'react-number-format'

import Chevron from './chevron.svg'
import { AlertRec } from '../../../../../../StdLib'

const AccordianCard = ({ REC, setShowCustDetail, children}) => {

  const [AccordianToggle, setAccordianToggle] = useState(false)

  const handleAccordianToggle = (e) => {
     setAccordianToggle(!AccordianToggle) 
     setShowCustDetail(!AccordianToggle) 
    }

  return (
    <>
      <div className="card" >
        {/* Card Header */}
        <div className="card-header flex justify-between py-0 px-2 bg-[#7177ca]  hover:bg-blue-700" onClick={(e) => handleAccordianToggle(e)} style={{ color: 'white' }} >

          <div className='flex '>
            {/* <span> <img src={(REC.Gender===0)?ImgFemale:ImgMale}   style={{margin:'1px 10px'}} alt="Male" width={'20px'}/> </span>   */}
            {/* <div style={{ width: '100px' }}> [ {Moment(new Date(REC.TranM.VDte)).format('DD MMM, ddd')} ]  </div>
            <div> <img src={process.env.REACT_APP_API_URL + `Supplier/GetFile/${REC.TranM.RefTrader.PicURL}`} alt="..." width='20px' height='20px' className='mx-3 ' /></div>
            <div style={{ color: 'black' }}> {REC.TranM.RefTrader.Title}</div> */}
            Distributors/ Customers {REC}

          </div>

          {/* >< Up/Down Image ---------------------------- */}
          <img className={(AccordianToggle ? AccordianToggle : '') && "active"} width='20px' src={Chevron}
            style={{
              transform: (AccordianToggle && "active") ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 0.2s ease-in-out'
            }}
            alt=">" />

        </div>

        {/* Card Body */}
        <div className="card-body p-1" style={{ fontSize: '14px', display: (AccordianToggle) ? 'block' : 'none', background: '#bebebe' }}>
          {children}
        </div> {/* Card Body */}

      </div>
    </>
  )
}
export default AccordianCard
