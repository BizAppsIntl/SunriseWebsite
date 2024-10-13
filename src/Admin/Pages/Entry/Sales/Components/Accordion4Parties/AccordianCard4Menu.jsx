import React, { useState } from 'react'
import TabbedBillMenuTabContent from '../../Tran/TabbedBillMenuTabContent'

import Chevron from './chevron.svg'
import ImgMale from '../../../../../ImagesAdminPanel/default/Male.png'
import ImgFemale from '../../../../../ImagesAdminPanel/default/Female.png'
import { AlertRec } from '../../../../../../StdLib'
// import { Categories } from '../../../../../AdminData/WarehouseData/DataCategories'

export default function AccordianCard4Menu(props) {
  const { CAT, Categories, Products, OrderSheetItems, OrderItemAdd, OrderItemDel } = props

  const [AccordianToggle, setAccordianToggle] = useState(false)
  const handleAccordianToggle = (e) => { setAccordianToggle(!AccordianToggle) }

  let SelectedItem = ''
  return (
    <>
      <div className="card ">
        {/* {alert('Entry in PRG Card by props of single CAT: ' + CAT)} */}

        {/* Card Header */}
        <div className="card-header d-flex justify-content-between py-0" onClick={(e) => handleAccordianToggle(e)} style={{ background: '#7177ca', color: 'white' }} >

          {/* <span> <img src={(Rec4TranMenuCat.Gender===0)?ImgFemale:ImgMale}   style={{margin:'1px 10px'}} alt="Male" width={'20px'}/> </span>   */}
          <span> [{CAT}]  {(SelectedItem = Categories.find((E) => E.Code === CAT)) ? <span className='text-white'>{SelectedItem.Title}  - {SelectedItem.Desc} </span> : <span>Supplier Not Registered</span>}</span>

          <img className={(AccordianToggle?AccordianToggle: '') && "active"} width='20px' src={Chevron} alt=">"
            style={{ transform: (AccordianToggle && "active") ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease-in-out' }} />

        </div>  {/* END- Card Header */}

        {/* Card Body */}
        <div className="card-body p-1" style={{ display: (AccordianToggle) ? 'block' : 'none' }}>
          {/* <div className="container d-flex gap-1 shadow" style={{ fontSize: '12px' }}> */}

          {/* <div className="d-flex" style={{ width:'28%' }}> */}
          {/* <div className="d-flex  flex-fill" > */}
          {/* <div className="d-flex   flex-column" > */}

          {/* ================================ */}

          {/* {alert ('open console now: '+CAT)}
          {console.log('Products: ', Products.Code,Products.CatCode,Products.Code  )}
          {console.log('Products.filter(r => r.CatCode === CAT):', Products.filter(r => r.CatCode === CAT) )}
          {console.log('Products.filter(r => r.CatCode === CAT).map(R => R.CatCode):', Products.filter(r => r.CatCode === CAT).map(R => R.CatCode) )}
          {console.log('...new Set(Products.filter(r => r.CatCode === CAT).map(R => R.CatCode)):', ...new Set(Products.filter(r => r.CatCode === CAT).map(R => R.CatCode)) )}
          {console.log('[...new Set(Products.filter(r => r.CatCode === CAT).map(R => R.CatCode))]:', [...new Set(Products.filter(r => r.CatCode === CAT).map(R => R.CatCode))] )}
          {AlertRec([...new Set(Products.filter(r => r.CatCode === CAT).map(R => R.CatCode))], "filtered by "+ CAT+ " then map by R.CatCode= list of Cats?")} */}

          {[...new Set(Products.filter(r => r.CatCode === CAT).map(R => R.CatCode))].map((CAT, I) => (
            <div key={I} className='card mb-1 d-flex flex-row flex-wrap  justify-content-evenly w-100'>

              {/* {alert('single CAT from Array'+CAT)} */}


              {Products.filter(r => r.CatCode === CAT).map((ITM, IDX) => {
                return (
                  <TabbedBillMenuTabContent
                    key={IDX}
                    ITM={ITM}
                    OrderSheetItems={OrderSheetItems}
                    OrderItemAdd={OrderItemAdd}
                    OrderItemDel={OrderItemDel}
                  />)
              })}
            </div>
          ))}
          {/* ================================ */}
          {/* </div> */}

          {/* </div> */}
        </div> {/* END- Card Body */}

      </div>
    </>
  )
}
