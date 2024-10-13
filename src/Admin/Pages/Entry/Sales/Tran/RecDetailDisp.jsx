import React from 'react'
import Moment from 'moment'
import { CgCloseO } from 'react-icons/cg'
import { ImEnter } from 'react-icons/im'
import { AlertRec } from '../../../../../StdLib'
import MyAvatar from '../../../../../Utils/MyAvatar'

const RecDetailDisp = ({ Rec, HandleCloseWindow }) => {

  return (
    <>
  {/* {AlertRec(Rec, 'SelectedRec')} */}

      <div className="p-2 w-100">
        {/* Voucher Detail- Header */}
        <div className='card-header  p-2 d-flex  w-100' style={{ background: '#bebebe' }}>
          {/* {console.log('Selected', Rec)} */}
          <div className='d-flex  w-100'>

            <div className='d-flex flex-column ' style={{ width: '50%' }}>
              <table><tbody>
                <tr>
                  {/* <th  style={{border: '1px solid black' }} >{Rec.TId} </th> */}
                  <th> <span >Date:  </span></th>
                  <td> <span >{Moment(Rec.VDte).format('DD MMM YY ddd')}  </span> </td>
                </tr>

                <tr>
                  <th> <span >Bill #:  </span></th>
                  <td> <span >{Rec.VNo}   </span> </td>
                </tr>

                <tr>
                  <th> <span >Description:  </span></th>
                  <td> <span >{Rec.Desc} </span> </td>
                </tr>

                <tr>
                  <th > <span >Consignment: </span></th>
                  <td align="left" > <span  >
                    {
                      Rec.VItems.reduce((accum, crntValue) => { accum += crntValue.Qty; return accum; }, 0)
                    } / {Rec.VItems.length}  </span> </td>
                </tr>

                <tr>
                  <th> <span >Total Amount: </span></th>
                  <td align="left" > <span  >{Rec.VAmt} </span> </td>
                </tr>

              </tbody></table>
            </div>

            <div className='d-flex gap-2' style={{ width: '50%' }}>

            {(Rec?.RefTrader?.PicURL && Rec?.RefTrader?.PicURL?.trim())
? <img alt="Default" width='100px' height='100px' src={ process.env.REACT_APP_API_URL + `Traders/GetFile/${Rec.RefTrader.PicURL}`}  />
: <span className='d-flex justify-content-center' > <MyAvatar Text={Rec?.RefTrader?.Title[0]} Size={100} /> </span>
}

              <table><tbody>
                <tr>
                  <th > <span >Customer: [{Rec.TId}] {Rec.RefTrader.Code}</span></th>
                </tr>

                <tr>
                  <td  >{Rec.RefTrader.Title}</td>
                </tr>

                <tr>
                  <td  >{Rec.RefTrader.City}</td>
                </tr>
                <tr>
                  <td  >{Rec.RefTrader.Phone}</td>
                </tr>

              </tbody></table>
            </div>

          </div>

          <div style={{ position: 'absolute', top: '0px', right: '2px' }}>
            {/* <ImEnter className='fs-3  text-danger ' onClick={() => HandleCloseWindow(true)} /> */}
            <CgCloseO className='fs-3  text-danger ' onClick={() => HandleCloseWindow(true)} />
            {/* <SlClose className='fs-3 ms-auto text-danger '  /> */}
          </div>
        </div>

        {/* #ffe7dc head for cornSilk, dce3ff */}
        {/* FF5733 --OrangeDark, FFF8DC-- cornSilk light orange/pink,  FFEEA9-- FFf3c3-- abit dark for Header of cornSilk*/}
        {/* Voucher Detail- Body [   #ebecf0 bright-gray, #e0e0e0 less-bright, #d3d3d3 less-dark, #bebebe dark-gray  ]  */}
        <div className='card-body shadow d-flex flex-wrap gap-2 justify-content-around  align-items-start  w-100' style={{ background: '#ebecf0' }}>

          {/* {SelectedItems.map((ITM, I) => {
                    let Product = Products.find((P) => P.VNo === ITM.VNo)
                    ITM.Title = Product.Title
                    ITM.UTitle = Product.UTitle
                    ITM.PicURL = Product.PicURL */}

          {Rec.VItems.map((ITM, I) => {
            // let Product = Products.find((P) => P.Code === ITM.Code)
            // ITM.Title = Product.Title
            // ITM.UTitle = Product.UTitle
            // ITM.PicURL = Product.PicURL

            // {/* Item Card /for SingleItem */}
            return (
              <div key={I} className="card shadow  p-0 mb-1" style={{ width: "100%", maxWidth: '125px', minWidth: '100px' }} >
                <div className="card-img-top p-1" >
                  {/* <img src={`Images/ItemsStore/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="PicURL" /> */}
                  {/* <img src={`Uploads/Items/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="PicURL" /> */}

                  <img src={process.env.REACT_APP_API_URL + `Items/GetFile/${ITM.RefItem.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt={ITM.RefItem.PicURL} />
                </div>

                <div className="card-body p-0 text-center">
                  <div className="card-title m-0 p-0" style={{ lineHeight: 1 }}>{ITM.RefItem.Title.trim()}</div>
                  <div className="card-title m-0 p-0 fs-5 fw-bolder ">{ITM.RefItem.Code}</div>
                  {/* <p className="card-text my-0">{ITM.Desc}</p> */}
                  <div className='p-0 m-0 mx-1 fs-6 fw-bold' >
                    <span className='text-primary'>{ITM.Qty} {ITM.Unit} </span>
                    <span className='text-success'> @ {ITM.Price} </span>
                  </div>
                  <div className='p-0 m-0 mx-1 fs-6 fw-bold' >
                    <span className='text-danger'> Rs. {ITM.Qty * ITM.Price}</span>
                  </div>
                </div>
                <span></span>  </div>
            )
          })}

        </div> {/* parent card body */}

      </div>
    </>
  )
}

export default RecDetailDisp
