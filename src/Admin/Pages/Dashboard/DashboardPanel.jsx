
import { useEffect, useState } from 'react';
import SalesInvoices from './PanelCards/SalesInvoices/SalesInvoices'
import PurchaseBills from './PanelCards/PurchaseBills/PurchaseBills';
import PayableDoc from './PanelCards/PayableDoc/PayableDoc';
// import Funds from './PanelCards/Funds/Funds';
import FundsBank from './PanelCards/FundsBank/FundsBank';
import FundsCash from './PanelCards/FundsCash/FundsCash';
import AccReceivable from './PanelCards/AccRcvable/AccRcvable';
import AccRcvable from './PanelCards/AccRcvable/AccRcvable';
import AccPayable from './PanelCards/AccPayable/AccPayable';

// import AccPayable from './PanelCards/AccRcvable/AccPayable'
// import AccPayments from './PanelCards/AccRcvable/AccPayments'
// import AccRcvable from './PanelCards/AccRcvable/AccRcvable'
// import AccReceipts from './PanelCards/AccRcvable/AccReceipts'
// import SalesInvoices from './PanelCards/SalesInvoices/SalesInvoices'




// import Card from '../Components/PanelCards/Card'
// import ph from 'Images/AdminPanel/default/FolderColoredA.bmp'
//import p from 'mages/AdminPanel//SiteImages/Default'
// import p from './pic.jpg'

// const RefreshInterval = 1000      //1 Seconds
// const RefreshInterval = (1000 * 10)      //10 Seconds
const RefreshInterval = (1000 * 120)      //5 minute - 300Seconds
// const RefreshInterval = 10000000000      //10 Seconds

export default function DashboardPanel({ Refresh }) {
  const [Need2Refresh, setNeed2Refresh] = useState(false);
  const [Rec, setRec] = useState([]);
  const [RecAll, setRecAll] = useState([]);
  const [PgRenderCount, setPgRenderCount] = useState(0);


  // \/\/\/\/\/\/\/\/\/\/\[    UseEffect      ]/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  useEffect(() => {

    //************* [Start--     Callable Function]
    const IntervalID = setInterval(() => {
      // console.log('Rendering this Page- Befor setCount:' + PgRenderCount)
      // console.log('Rendering this Page- Befor setCount:' + _AccRecs.Data)

      setPgRenderCount(p => p + 1)
      // AlertRec(_AccRecs.Data, '_AccRecs.Data')

      // setRec(_AccRecs.Data.find(E => E.Code === AccCodeMain))


      // Get Fresh Data from Tran Database 
      DataFetchAccRec()

      // console.log('Rendering this Page- After & Inside setCount:' + PgRenderCount)
    }, RefreshInterval);      //RefreshInterval = 10000 =10Seconds
    //************ [END--     Callable Function]


    return () => {
      clearInterval(IntervalID)
    }

    // }, [Need2Refresh])
  }, [])

  useEffect(() => {
    DataFetchAccRec()
  }, [Refresh])

  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=
  //  =-.-==-.-==-    Start   -==-.-=[  Fns: DATABASE/ API Handling ] =-.-==-.-==-.-==-.-==
  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=

  // console.log('WHOLE PAGE RENDER ' + PgRenderCount)

  // ==================[  Fn: GET ALL RECORDS  ]=====================
  const DataFetchAccRec = async (e) => {
    // alert(`REACT_APP_API_URL: ${process.env.REACT_APP_API_URL} `)
    
    // const res = await fetch((Txt2Search4B)?`/api/staff/${Txt2Search4B}`:'/api/staff');
    // fetch(process.env.NEXT_PUBLIC_API_URL_BACKEND + `AccRec/${AccCodeMain}`, { method: 'GET' })
    // fetch(process.env.NEXT_PUBLIC_API_URL_BACKEND + `AccRec`, { method: 'GET' })
    fetch(process.env.REACT_APP_API_URL + `AccRec`, { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        // console.log('ACCREC data rcvd:', data)
        // AlertRec(data,'AccRec Data')
        setRecAll(data)
      })

    // data.map((itm) => {
    //   itm.VDte = (Date.parse(itm.VDte)) ? Date.parse(itm.VDte) : ''
    //   itm.RefVDte = (Date.parse(itm.RefVDte)) ? Date.parse(itm.RefVDte) : ''
    // })
    // console.log('Received Records from Database:', data);
    //  AlertRec(data, 'Received Records from Database:')
    //  console.log('********************************************************',data)
  }

  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=
  //  =-.-==-.-==-    END     -==-.-=[  Fns: DATABASE/ API Handling ] =-.-==-.-==-.-==-.-==
  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=


  return (
    <>

      {/* {Refresh?'true':'false'} */}
      <div className="px-5 md:px-1 flex flex-col md:flex-row gap-4 md:gap-6  md:justify-evenly">
        <div className='md:w-1/5'><SalesInvoices Rec={(RecAll?.find(E => E.Code === '41211'))} /></div>
        <div className='md:w-1/5'><PurchaseBills Rec={(RecAll?.find(E => E.Code === '22131'))} /></div>
        {/* <div className='md:w-1/5'><PayableDoc Rec={(RecAll?.find(E => E.Code === '22121'))} /></div> */}
        {/* <div className='md:w-1/5'><Funds Recs={(RecAll?.find(E => {E.Code === '11111' || E.Code === '11121')))}/></div> */}
        <div className='md:w-1/5'><FundsCash Rec={(RecAll?.find(E => E.Code === '11111'))} /></div>
        <div className='md:w-1/5'><FundsBank Rec={(RecAll?.find(E => E.Code === '11121'))} /></div>
      </div>

      <div className="mt-4 px-5 md:px-1 flex flex-col md:flex-row gap-4 md:gap-6  md:justify-evenly">
        <div className='md:w-1/5'><AccRcvable Rec={(RecAll?.find(E => E.Code === '11211'))} /></div>
        <div className='md:w-1/5'><AccPayable Rec={(RecAll?.find(E => E.Code === '22131'))} /></div>
        {/* <div className='md:w-1/5'><PayableDoc Rec={(RecAll?.find(E => E.Code === '22121'))} /></div> */}
        {/* <div className='md:w-1/5'><Funds Recs={(RecAll?.find(E => {E.Code === '11111' || E.Code === '11121')))}/></div> */}
        <div className='md:w-1/5'><FundsCash Rec={(RecAll?.find(E => E.Code === '11111'))} /></div>
        <div className='md:w-1/5'><FundsBank Rec={(RecAll?.find(E => E.Code === '11121'))} /></div>
      </div>

      {/* <AccReceipts /> 
      <AccPayable />
      <AccPayments /> */}

    </>
  )
}