    import React, { useEffect, useState } from 'react'
    import { Link } from 'react-router-dom';
    import { AlertRec, CurrentTime, TimeLapsed } from '../../../../../StdLib';
import PanelImage from '../PanelImages/RcvAble.png'

    // import '../Card.css'
    // import pic from '../../../../../public/Images/AdminPanel/Site/PayAble550x512.png'
    
    // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
    
    // const styles = {
    //   statusCard: {
    //     backgroundColor: "#f1f1f1",
    //     width: '200px',
    //     height: '75px',
    //       padding: '10px',
    //       display: 'flex'
    //   },
    //   /* border: 1px solid red; */
    //   /* border-radius: 5px; */
    //   /* box-shadow:violet; */
    //   statusCardImg:{
    //     width: '75px',
    //     height: '73px',
    //   },
    
    //   cardContent:{
    //     fontSize: 'small',
    //     display: flex,
    //     flexDirection: 'column',
    //     justifyContent: 'center'
    //   }
    // };
    
    
    
    // const RefreshInterval = 10000      //10 Seconds
    const RefreshInterval = 10000000000      //10 Seconds
    const AccCodeMain ='41011'
    
    export default function SalesInvoices(props) {
    
      const [Need2Refresh, setNeed2Refresh] = useState(false);
      const [Rec, setRec] = useState([]);
      const [RecAll, setRecAll] = useState([]);
      const [PgRenderCount, setPgRenderCount] = useState(0);
    
      // \/\/\/\/\/\/\/\/\/\/\[    UseEffect      ]/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
      // useEffect(() => {
      //   const IntervalID = setInterval(() => {
      //     // console.log('Rendering this Page- Befor setCount:' + PgRenderCount)
    
      //     setPgRenderCount(p => p + 1)
    
      //     // Get Fresh Data from Tran Database 
      //     //DataFetchAccRec()
          
      //     // console.log('Rendering this Page- After & Inside setCount:' + PgRenderCount)
      //   }, RefreshInterval);      //RefreshInterval = 10000 =10Seconds
    
    
      //   return () => {
      //     clearInterval(IntervalID)
      //   }
    
      // }, [Need2Refresh])
    
    
      // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=
      //  =-.-==-.-==-    Start   -==-.-=[  Fns: DATABASE/ API Handling ] =-.-==-.-==-.-==-.-==
      // =-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-==-.-=
    
      console.log('WHOLE PAGE RENDER ' + PgRenderCount)
    
      // ==================[  Fn: GET ALL RECORDS  ]=====================
      const DataFetchAccRec = async (e) => {
        // const res = await fetch((Txt2Search4B)?`/api/staff/${Txt2Search4B}`:'/api/staff');
        fetch(process.env.REACT_APP_API_URL + `AccRec/${AccCodeMain}`, { method: 'GET' })
          .then(res => res.json())
          .then(data => {
            console.log('ACCREC data rcvd:', data)
            setRec(data)
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
    
      const GiveAccDetail = (code) => {
        if (RecAll.length <= 0) return 'xxx'
        // console.log('RecAll: in Panel :', RecAll)
    
        switch (code) {
          case 'PAY':
            return (RecAll.find(E => E.Code === 'AccCodeMain')); break;
    
          default:
            break;
        }
      }
    
    
    
      // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
      return (
        <>
        {/* {console.log('WHOLE PAGE Return Section RENDER ' + PgRenderCount)} */}
        <div className="card status-card shadow p-0 mb-2 d-flex flex-row w-100">
          <div className="..." style={{
            width:'40%',
            //backgroundImage: `url(${process.env.PUBLIC_URL + '/Images/AdminPanel/StatusPanel/PayAble.png'})`,
            backgroundImage: `url(${PanelImage})`,
            backgroundSize: " 100% 100%",
            backgroundRepeat: 'no-repeat'
          }}>
  
            <strong className="card-title  " style={{color:'#ffa500'}}>Sales Invoices</strong>
          </div>
  
          <div className="card-body card-content px-1 py-0">
            {/* <span >{props.Desc}</span> */}
            {/* <div> Total: <span className='ms-auto'>{(GiveAccDetail('PAY')).CrntBal}</span></div> */}
  
            <table  border='0' cellpadding="0" className="w-100">
              <tbody>
                <tr className='text-danger' ><th> Total: </th><td  style={{textAlign:'right'}} >1000</td></tr>
                <tr className='text-primary' ><th> Major: </th><td  style={{textAlign:'right'}} >1000</td></tr>
                <tr className='text-success' ><th> This Week: </th><td  style={{textAlign:'right'}} >1000</td></tr>
                <tr className='text-info' ><th> This Month: </th><td  style={{textAlign:'right'}} >1000</td></tr>
                <tr className='text-secondary' ><th>  </th><td style={{textAlign:'right'}} >More...</td></tr>
              </tbody>
            </table>
  
          </div>
        </div>




        </>
      )
    }
    