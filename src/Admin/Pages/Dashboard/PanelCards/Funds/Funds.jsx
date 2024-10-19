import React, { useEffect, useState } from 'react'

// import { Link } from 'react-router-dom';
import { AlertRec, CurrentTime, TimeLapsed } from '../../../../../StdLib'
//import PanelImage from '../PanelImages/RcvAble.png'
import PanelCard from '../PenalCard'
import Link from 'next/link';
import NumberFormat from 'react-number-format';

// const RefreshInterval = 10000      //10 Seconds
const RefreshInterval = 10000000000      //10 Seconds
const AccCodeMain = '41011'

// export default function SalesInvoices(props) {
export default function PayableDoc({Recs}) {

  const [Need2Refresh, setNeed2Refresh] = useState(false);
  // const [Rec, setRec] = useState([]);
  // const [RecAll, setRecAll] = useState([]);
  // const [PgRenderCount, setPgRenderCount] = useState(0);


  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=
  //  =-.-==-.-==-    Start   -==-.-=[  Fns: DATABASE/ API Handling ] =-.-==-.-==-.-==-.-==
  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=




  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=
  //  =-.-==-.-==-    END     -==-.-=[  Fns: DATABASE/ API Handling ] =-.-==-.-==-.-==-.-==
  // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  return (
    <>

      <PanelCard Img={'fundsTransfer.png'}>
        <div className='flex flex-col '>

          {/* <strong className="card-title  " style={{ color: '#ffa500' }}>Sales Invoices</strong>
          <table border='0' cellpadding="0" className="w-full">
            <tbody>
              <tr className='text-red' ><th> Total: </th><td style={{ textAlign: 'right' }} >1000</td></tr>
              <tr className='text-blue' ><th> Major: </th><td style={{ textAlign: 'right' }} >1000</td></tr>
              <tr className='text-green' ><th> This Week: </th><td style={{ textAlign: 'right' }} >1000</td></tr>
              <tr className='text-teal' ><th> This Month: </th><td style={{ textAlign: 'right' }} >1000</td></tr>
              <tr className='text-gray' ><th>  </th><td style={{ textAlign: 'right' }} >More...</td></tr>
            </tbody>

            <span><small className="text-muted">Updated: 3 mins ago</small></span>
          </table> */}

          <strong className="text-center">Funds In Bank</strong>
          {/* <strong className="card-title">A{props.Img}</strong> */}
          {/* <span >{props.Desc}</span> */}

          <div className="pe-2 " style={{ fontSize: '12px' }}>

            {/* <div> Tot Payable: <span >{(GiveAccDetail('PAY')).CrntBal}</span></div> */}
            {/* <div> All Records: <span >{RecAll.length}</span></div> */}

            <div className="flex justify-between">
              <div>Balance: </div>
              <div className=''>
                <NumberFormat
                  value={(Recs?.CrntBal * -1) >= 0 ? Recs?.CrntBal * -1 : '(' + (Recs?.CrntBal) + ')'}
                  // value={5000}
                  displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh"
                  decimalScale={2}
                />
              </div>
            </div>

                        <div className="flex justify-between ">

                        <div className="text-xs"><small>Updated:</small></div>
                        <small><div>{Recs?.EntryDte ? TimeLapsed(Recs?.EntryDte, new Date()) : ''} Ago </div> </small>
              {/* <small><div>4h 30m Ago </div> </small> */}
            </div>

            {/* moment().startOf('hour').fromNow();       // 29 minutes ago */}
            {/* <div className="text-muted"><span> <small>Last: </small></span> <span>{Rec.EntryDte}</span> ... </div>         */}
            {/* <div className="text-muted"><span> <small>Updated: </small></span> <span>{CurrentTime()}</span> Tics </div> */}

            {/* <div className="text-end"><span> <small><Link to="/Invoice">More ...</Link></small></span>     </div> */}
            <div className="text-end"><span> <small><Link href="/">More ...</Link></small></span>     </div>
          </div>

        </div>
      </PanelCard>
    </>
  )
}

