import React from 'react'
import Moment from 'moment'
import { CgCloseO } from 'react-icons/cg'
import { ImEnter } from 'react-icons/im'

const RecDetailDisp = ({ Rec, HandleCloseWindow }) => {

  return (
    <>

      {/* Voucher Detail- Header */}
      <div className='card-header  p-2 flex relative'>
        {/* {console.log('Selected', Rec)} */}

        {/* Header- Fields Input part */}
        <div className='flex gap-4'>
          <div className='flex  items-center' style={{ }}>
            <span className='text-xl font-bold  mx-2' >Item #:</span>
            <span className='text-xl me-auto' >[{Rec.Id}]</span>
          </div>

          <div className='flex  items-center' style={{ }}>
            <span className='text-xl font-bold mx-2' >Item-Id:</span>
            <span className='text-xl me-auto' >[{Rec.Code}]</span>
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
      <div className='card-body shadow px-2 py-4 flex gap-2 justify-between  items-start  w-full'>

        {/* {SelectedItems.map((ITM, I) => {
  let Product = Products.find((P) => P.Code === ITM.Code)
  ITM.Title = Product.Title
  ITM.TitleU = Product.TitleU
  ITM.Pic = Product.Pic */}

        {/* <div className="card shadow  p-0 mb-1" style={{ width: "100%", maxWidth: '125px', minWidth: '100px' }} > */}
        <div className=" p-0 mb-1" style={{ width: "50%" }} >

          <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '33%', fontSize: '14px' }}>Title:</span>
            <span className='me-auto border-b ' style={{ width: '66%' }}>{Rec.Title}</span>
          </div>

          {/* <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '33%', fontSize: '14px' }}>نام :</span>
            <span className='me-auto border-b fs-5 font-bold' style={{ width: '66%' }}>{Rec.TitleU}</span>
          </div> */}

          {/* <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '33%', fontSize: '14px' }}>Supplier:</span>
            <span className='me-auto border-b ' style={{ width: '66%' }}>{'Code'}</span>
          </div> */}

          {/* <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '33%', fontSize: '14px' }}>Supplier:</span>
            <span className='me-auto border-b ' style={{ width: '66%' }}>{'Suppler Title'}</span>
          </div> */}

          <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '33%', fontSize: '14px' }}>Detail :</span>
            <span className='me-auto border-b ' style={{ width: '66%' }}>{Rec.Desc}</span>
          </div>

          <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '33%', fontSize: '14px' }}>Type:</span>
            <span className='me-auto border-b ' style={{ width: '66%' }}>{Rec.RefCatItem.Title}</span>
          </div>

          <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '33%', fontSize: '14px' }}>Remarks:</span>
            <span className='me-auto border-b ' style={{ width: '66%' }}>{Rec.Rem}</span>
          </div>

          <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '33%', fontSize: '14px' }}>Contracted:</span>
            <span className={`me-auto border-b  ${(Rec.Contracted === '1') && ' text-danger'} `} style={{ width: '66%' }}>{Rec.Contracted === '1' ? 'YES- Zero Rated.' : 'No'}</span>
          </div>

        </div> {/* */}


        <div className=" p-0 mb-1" style={{ width: "30%" }} >

          <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '50%', fontSize: '14px' }}>Priority:</span>
            <span className='me-auto border-b ' style={{ width: '50%' }}>{Rec.Priority}</span>
          </div>

          <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '50%', fontSize: '14px' }}>Unit:</span>
            <span className='me-auto border-b ' style={{ width: '50%' }}>{Rec.Unit}</span>
          </div>

          <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '50%', fontSize: '14px' }}>Purchase Price:</span>
            <span className='me-auto border-b ' style={{ width: '50%' }}>{Rec.PPrice}</span>
          </div>

          <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '50%', fontSize: '14px' }}>Sale Rate:</span>
            <span className='me-auto border-b ' style={{ width: '50%' }}>{Rec.Price}</span>
          </div>

          <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '50%', fontSize: '14px' }}>Balance</span>
            <span className='me-auto border-b ' style={{ width: '50%' }}>{Rec.CrntBal}</span>
          </div>
        </div> {/* */}

        {/* <div className=" p-0 mb-1" style={{ width: "20%" }} >
          <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '50%', fontSize: '14px' }}>Qty-Std </span>
            <span className='me-auto border-b text-center' style={{ width: '50%' }}> {Rec.QtyDef}</span>
          </div>

          <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '50%', fontSize: '14px' }}>Qty-Plus </span>
            <span className='me-auto border-b text-center' style={{ width: '50%' }}> {Rec.QtyInc}</span>
          </div>

          <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '50%', fontSize: '14px' }}>Qty-Step </span>
            <span className='me-auto border-b text-center' style={{ width: '50%' }}> {Rec.QtyInc}</span>
          </div>

          <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '50%', fontSize: '14px' }}>Level Min </span>
            <span className='me-auto border-b text-center' style={{ width: '50%' }}> {Rec.QtyMin}</span>
          </div>

          <div className='flex  mb-2 ' >
            <span className='font-bold' style={{ width: '50%', fontSize: '14px' }}>Level Max </span>
            <span className='me-auto border-b text-center' style={{ width: '50%' }}> {Rec.QtyMax}</span>
          </div>
        </div>  */}

        <div className=' ' style={{ width: '20%' }} >
          <div className="card-img-top p-1" >
            {/* <img src={`Images/ItemsStore/${Rec.Pic}`} style={{ width: "100%", height: '100%', cursor: 'pointer' }} alt="..." /> */}
            {/* <img src={`Uploads/Items/${Rec.PicURL}`} style={{ width: "100%", height: '100%', cursor: 'pointer' }} alt="..." /> */}
            <img src={process.env.REACT_APP_API_URL + `Items/GetFile/${Rec.PicURL}`} style={{ width: "100%", height: '100%', cursor: 'pointer' }} alt="..." />
          </div>
        </div>

      </div> {/* parent card body */}


    </>
  )
}

export default RecDetailDisp




