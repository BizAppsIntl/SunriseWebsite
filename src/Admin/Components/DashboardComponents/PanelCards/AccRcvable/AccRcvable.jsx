import React, { useEffect, useState } from 'react'
import PanelImage from '../PanelImages/RcvAble.png'


// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

export default function AccRcvable(props) {

  const [Need2Refresh, setNeed2Refresh] = useState(false);
  const [RecAll, setRecAll] = useState([]);
  const [PgRenderCount, setPgRenderCount] = useState(0);

  // \/\/\/\/\/\/\/\/\/\/\[    UseEffect      ]/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  useEffect(() => {
    const IntervalID = setInterval(() => {
      console.log('Rendering this Page- Befor setCount:' + PgRenderCount)

      setPgRenderCount(p => p + 1)

      // Get Fresh Data from Tran Database 
      DataFetchAll()
      // DataFetchTranD()

      console.log('Rendering this Page- After & Inside setCount:' + PgRenderCount)
    }, 10000);

    return () => {
      clearInterval(IntervalID)
    }

  }, [Need2Refresh])


  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=
  //  =-.-==-.-==-    Start   -==-.-=[  Fns: DATABASE/ API Handling ] =-.-==-.-==-.-==-.-==
  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=

  console.log('WHOLE PAGE RENDER ' + PgRenderCount)

  // ==================[  Fn: GET ALL RECORDS  ]=====================
  const DataFetchAll = async (e) => {
    // const res = await fetch((Txt2Search4B)?`/api/staff/${Txt2Search4B}`:'/api/staff');
    const res = await fetch('/api/AccRecs');
    const data = await res.json();

    // data.map((itm) => {
    //   itm.VDte = (Date.parse(itm.VDte)) ? Date.parse(itm.VDte) : ''
    //   itm.RefVDte = (Date.parse(itm.RefVDte)) ? Date.parse(itm.RefVDte) : ''
    // })
    // console.log('Received Records from Database:', data);
    //  AlertRec(data, 'Received Records from Database:')
    //  console.log('********************************************************',data)
    setRecAll(data)
  }

  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=
  //  =-.-==-.-==-    END     -==-.-=[  Fns: DATABASE/ API Handling ] =-.-==-.-==-.-==-.-==
  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=

  const GiveAccDetail = (code) => {
    if (RecAll.length <= 0) return 'xxx'
    // console.log('RecAll: in Panel :', RecAll)

    switch (code) {
      case 'PAY':
        return (RecAll.find(E => E.Code === '22111')); break;

      default:
        break;
    }
  }



  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  return (
    <>
      <div className="card status-card shadow p-0 mb-2 d-flex flex-row w-100">
        <div className="..." style={{
          width: '40%',
          // backgroundImage: `url(${process.env.PUBLIC_URL + '/Images/AdminPanel/StatusPanel/RcvAble.png'})`,
          backgroundImage: `url(${PanelImage})`,
          backgroundSize: " 100% 100%",
          backgroundRepeat: 'no-repeat'
        }}>

          {/* <strong className="card-title  " style={{ color: '#ffa500' }}>Accounts Receivable</strong> */}
          <strong className="card-title  " style={{ color: 'black' }}>Daily Appointments</strong>
        </div>

        <div className="card-body card-content px-1 py-0">
          {/* <span >{props.Desc}</span> */}
          {/* <div> Total: <span className='ms-auto'>{(GiveAccDetail('PAY')).CrntBal}</span></div> */}

          {/* ✅   ⛔️  👇️ */}
          <table border='0' cellpadding="0" className="w-100">
            <tbody>
              <tr className='text-danger' ><th> Total: </th><td style={{ textAlign: 'right' }} >1000</td></tr>
              <tr className='text-primary' ><th> Major: </th><td style={{ textAlign: 'right' }} >1000</td></tr>
              <tr className='text-success' ><th> This Week: </th><td style={{ textAlign: 'right' }} >1000</td></tr>
              <tr className='text-info' ><th> This Month: </th><td style={{ textAlign: 'right' }} >1000</td></tr>
              <tr className='text-secondary' ><th>  </th><td style={{ textAlign: 'right' }} >More...</td></tr>
            </tbody>
          </table>

        </div>
      </div>
    </>
  )
}
