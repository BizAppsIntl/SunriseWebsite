import React from 'react'
import Moment from 'moment'
import { CgCloseO } from 'react-icons/cg'
import { ImEnter } from 'react-icons/im'

export default function  RecsListView ({ RecAll, HandleListItemClicked }) {

  return (
    <>

              <div className="card-header w-100 d-flex" style={{ background: '#e0e0e0' }}>
                <span>Payment Vouchers</span>
                {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}><TbWiperWash /></span> */}
                {/* <span className='ms-auto ' onClick={() => HandleDatabase('Add')}><AiFillAccountBook /></span> */}
                {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}>Edit<AiFillAccountBook /></span> */}
              </div>

              <div className="card-body p-0" style={{ height: '75vh', overflowY: 'auto' }}>
                <div className="btn-group d-flex flex-column m-0" role="group" aria-label="First group">
                  {RecAll.map((E, I) => {
                    // return <button className='d-flex mb-2 ' key={E.id} onClick={() =>{DispRecInAlert(E,'Selected'); HandleListItemClicked(E)}}>
                    return (

                      <button className='btn btn-sm d-flex px-1 py-0 text-start border-bottom ' style={{ fontSize: '10px' }}
                        key={E.Id} onClick={() => { HandleListItemClicked(E) }}>
                        <span style={{ width: '3%' }}>{E.Id}</span>
                        <span style={{ width: '10%' }}>{E.Code}</span>
                        <span style={{ width: '25%' }}>{E.Title}  </span>
                        <span style={{ width: '25%' }}>{E.Desc}</span>
                        <span style={{ width: '25%' }}>{E.Contact1}</span>
                        <span style={{ width: '15%', textAlign: 'end' }}>{E.ContactPh1}</span>

                        {/* <span style={{ width: '15%' }} className=' text-end'>{E.CrntBal}</span> */}
                      </button>
                    )
                  })
                  }
                </div>
              </div>
            
    </>
  )
}

