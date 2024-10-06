import React from 'react'
import './DashboardPanel.css'
import AccPayable from './PanelCards/AccRcvable/AccPayable'
import AccPayments from './PanelCards/AccRcvable/AccPayments'
import AccRcvable from './PanelCards/AccRcvable/AccRcvable'
import AccReceipts from './PanelCards/AccRcvable/AccReceipts'
import SalesInvoices from './PanelCards/SalesInvoices/SalesInvoices'




// import Card from '../Components/PanelCards/Card'
// import ph from 'Images/AdminPanel/default/FolderColoredA.bmp'
//import p from 'mages/AdminPanel//SiteImages/Default'
// import p from './pic.jpg'


export default function  DashboardPanel() {
  return (
    <>

    <div className="px-1 d-flex flex-wrap justify-content-evenly align-items-center gap-1 w-100">
      <div className='auto-width-25TO100'><SalesInvoices /></div>
      <div className='auto-width-25TO100'><AccReceipts /> </div>
      <div className='auto-width-25TO100'><AccPayable /></div>
      <div className='auto-width-25TO100'><AccPayments /></div>
      kajfklasdjfaklsdjfkl dklsjf adsklf
      adskfjakls dfjkldsjfklasdjf klasdjfkl asdfj kalsdj f
    </div>
    </>
  )
}