import React from 'react'
import Moment from 'moment'
import { CgCloseO } from 'react-icons/cg'
import { ImEnter } from 'react-icons/im'

const RecDetailDisp = ({ Rec, HandleCloseWindow }) => {

  return (
    <>

      {/* Voucher Detail- Header */}
      <div className='card-header  p-2 relative'>
        {/* {console.log('Selected', Rec)} */}
        <div className='text-2xl font-bold '>Item Detail</div>

        {/* Header- Fields Input part */}
        <div className='flex gap-4'>
          <div className='flex  items-center' style={{}}>
            <span className='text-lg font-bold ' >Item ID#:</span>
            <span className='text-xl mx-2' >[{Rec.Code}/{Rec.Id}]</span>
          </div>

          <div className='flex  items-center' style={{}}>
            <span className='text-lg font-bold mx-2' >Rec Status:</span>
            <span className='text-xl ' >[{Rec.RecStatus}]</span>
          </div>

        </div>

        {/* Header- Close button part */}
        {/* <div className='-mt-[15px] -mr-[15px]'> */}
        <div
          // style={{display:'block', position: 'absolute', top: '0px', right: '2px' }}
          // className="absolute top-0 right-0 mt-1 mr-1 p-1 bg-red-500 text-white rounded-full"
          className="cursor-pointer absolute top-0 right-0 -mt-2 -mr-2 "   //-mt-2 due to p-2
        >
          {/* &times; */}

          {/* <ImEnter className='fs-3  text-danger ' onClick={() => HandleCloseWindow(true)} /> */}
          <CgCloseO className='text-3xl text-red-600 ' onClick={() => HandleCloseWindow(true)} />
          {/* <SlClose className='fs-3 ms-auto text-danger '  /> */}
        </div>
      </div>

      {/* Body- Voucher Detail- Body */}
      <div className='card-body shadow px-2 py-4 text-left  w-full'>

        {/* {SelectedItems.map((ITM, I) => {
  let Product = Products.find((P) => P.Code === ITM.Code)
  ITM.Title = Product.Title
  ITM.TitleU = Product.TitleU
  ITM.Pic = Product.Pic */}

        {/* <div className="card shadow  p-0 mb-1" style={{ width: "100%", maxWidth: '125px', minWidth: '100px' }} > */}
        <div className="p-0 mb-1 flex gap-2 justify-between  items-start "  >
          <div className=" p-0 mb-1 w-full" >

            <div className='flex  mb-2 ' >
              <span className='text-lg font-bold ' style={{ width: '25%' }}>Title:</span>
              <span className='me-auto border-b ' style={{ width: '75%' }}>{Rec.Title}</span>
            </div>

            {/* <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '25%', fontSize: '14px' }}>نام :</span>
            <span className='me-auto border-b fs-5 font-bold' style={{ width: '75%' }}>{Rec.TitleU}</span>
          </div> */}

            {/* <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '25%', fontSize: '14px' }}>Supplier:</span>
            <span className='me-auto border-b ' style={{ width: '75%' }}>{'Code'}</span>
          </div> */}

            {/* <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '25%', fontSize: '14px' }}>Supplier:</span>
            <span className='me-auto border-b ' style={{ width: '75%' }}>{'Suppler Title'}</span>
          </div> */}

            <div className='flex  mb-2 ' >
              <span className='text-lg font-bold ' style={{ width: '25%' }}>Detail :</span>
              <span className='me-auto border-b ' style={{ width: '75%' }}>{Rec.Desc}</span>
            </div>

            <div className='flex  mb-2 ' >
              <span className='text-lg font-bold ' style={{ width: '25%' }}>Type:</span>
              <span className='me-auto border-b ' style={{ width: '75%' }}>{Rec.RefCatItem.Title}</span>
            </div>

            <div className='flex  mb-2 ' >
              <span className='text-lg font-bold ' style={{ width: '25%' }}>Remarks:</span>
              <span className='me-auto border-b ' style={{ width: '75%' }}>{Rec.Rem}</span>
            </div>

            {/* <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '25%', fontSize: '14px' }}>Contracted:</span>
            <span className={`me-auto border-b  ${(Rec.Contracted === '1') && ' text-danger'} `} style={{ width: '75%' }}>{Rec.Contracted === '1' ? 'YES- Zero Rated.' : 'No'}</span>
          </div> */}

          </div> {/* */}


          <div className=' ' style={{ width: '20%' }} >
            <div className="card-img-top p-1" >
              {/* <img src={`Images/ItemsStore/${Rec.Pic}`} style={{ width: "100%", height: '100%', cursor: 'pointer' }} alt="..." /> */}
              {/* <img src={`Uploads/Items/${Rec.PicURL}`} style={{ width: "100%", height: '100%', cursor: 'pointer' }} alt="..." /> */}
              <img src={process.env.REACT_APP_API_URL + `Items/GetFile/${Rec.PicURL}`} style={{ width: "100%", height: '100%', cursor: 'pointer' }} alt="..." />
            </div>
          </div>
        </div>



        <div className="p-0 mb-1 flex gap-2 justify-around  items-start ">
          <div className='w-[40%]'>
            <table className='w-full'><tbody>
              <tr>
                <th> <span className='text-lg ' >Pack Size  </span></th>
                {/* <td> <span className='fs- ' > [ {OrderSheet.TId} ]   - {OrderSheet.RefTrader.Title}</span> </td> */}
                {/* {OrderSheet.RefTrader.Title && <td> <span className='fs- ' > [ {OrderSheet.RefTrader.Code} ]   - {OrderSheet.RefTrader.Title}</span> </td>} */}
                <td> <span className='' > {Rec.Unit} </span> </td>
              </tr>

              <tr>
                <th> <span className='text-lg ' >Packing Type  </span></th>
                {/* <td> <span className='fs- ' > [ {OrderSheet.TId} ]   - {OrderSheet.RefTrader.Title}</span> </td> */}
                {/* {OrderSheet.RefTrader.Title && <td> <span className='fs- ' > [ {OrderSheet.RefTrader.Code} ]   - {OrderSheet.RefTrader.Title}</span> </td>} */}
                <td> <span className='' > {Rec.Unit} </span> </td>
              </tr>

              <tr>
                <th> <span className='text-lg  ' >Purchase Price:  </span></th>
                {/* {OrderSheet.AccC[0].Title && <td> <span className='fs- ' > {OrderSheet.AccC[0].Title}   </span> </td>} */}
                <td> <span className='' > {Rec.PPrice}   </span> </td>
              </tr>

              <tr>
                <th> <span className='text-lg  ' >Sale Rate:  </span></th>
                <td> <span className='' > {Rec.Price}   </span> </td>
              </tr>

            </tbody></table>
          </div>

          <div className='w-[40%]'>
            <table className='w-full'><tbody>
              <tr>
                <th> <span className='text-lg ' >Default Addition  </span></th>
                {/* <td> <span className='fs- ' > [ {OrderSheet.TId} ]   - {OrderSheet.RefTrader.Title}</span> </td> */}
                {/* {OrderSheet.RefTrader.Title && <td> <span className='fs- ' > [ {OrderSheet.RefTrader.Code} ]   - {OrderSheet.RefTrader.Title}</span> </td>} */}
                <td> <span className='' > {Rec.QtyDef} </span> </td>
              </tr>

              <tr>
                <th> <span className='text-lg ' >Increase in Qty:  </span></th>
                {/* <td> <span className='fs- ' > [ {OrderSheet.TId} ]   - {OrderSheet.RefTrader.Title}</span> </td> */}
                {/* {OrderSheet.RefTrader.Title && <td> <span className='fs- ' > [ {OrderSheet.RefTrader.Code} ]   - {OrderSheet.RefTrader.Title}</span> </td>} */}
                <td> <span className='' > {Rec.QtyInc} </span> </td>
              </tr>

              <tr>
                <th> <span className='text-lg  ' >Incremental Step:  </span></th>
                {/* {OrderSheet.AccC[0].Title && <td> <span className='fs- ' > {OrderSheet.AccC[0].Title}   </span> </td>} */}
                <td> <span className='' > {Rec.QtyStep}   </span> </td>
              </tr>

              <tr>
                <th> <span className='text-lg  ' >Min Stock Level:  </span></th>
                <td> <span className='' > {Rec.QtyMin}   </span> </td>
              </tr>

              <tr>
                <th> <span className='text-lg  ' >Max Stock Level:  </span></th>
                <td> <span className='' > {Rec.QtyMax}   </span> </td>
              </tr>

            </tbody></table>

          </div>

        </div>


      </div> {/* parent card body */}


    </>
  )
}

export default RecDetailDisp




