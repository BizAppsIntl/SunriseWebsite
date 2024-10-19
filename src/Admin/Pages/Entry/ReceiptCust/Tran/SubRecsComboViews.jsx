import React, { useState } from 'react'

import Moment from 'moment'

import { HiOutlineViewGridAdd, HiOutlineViewList } from 'react-icons/hi'
import { TfiViewList } from 'react-icons/tfi'
import NumberFormat from 'react-number-format'
import MyAvatar from '../../../../../Utils/MyAvatar'

export default function SubRecsComboViews({ RecAll, HandleListItemClicked }) {
    const [DispType, setDispType] = useState(true)            //List-View or Card-View 
    const [SelectedRec, setSelectedRec] = useState('')

    return (<>
        {/* {AlertRec(RecAll, 'Rec to Display Voucher')} */}
        <div className='card w-full'>

            {/* <div className="flex flex-wrap justify-evenly " style={{overflow:'hidden'}}> */}
            {/* <div className="card-header py-0 text-base w-full flex items-center" style={{ background: '#e0e0e0' }}> */}
            <div className="card-header px-2 py-1 w-full flex items-center bg-slate-400" >
                <div className="text-xl text-black" >Distributors/ Customers</div>
                {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}><TbWiperWash /></span> */}
                {/* <span className='ms-auto ' onClick={() => HandleDatabase('Add')}><AiFillAccountBook /></span> */}
                {/* <span className='ms-auto ' onClick={() => HandleDatabase('Empty')}>Edit<AiFillAccountBook /></span> */}

                <div className='ms-auto mx-2 text-base ' onClick={() => setDispType(p => !p)}><TfiViewList /></div>
                <div className='text-base ' onClick={() => setDispType(p => !p)}><HiOutlineViewGridAdd /></div>
            </div>

            {/* <div className="card-body p-2" style={{ maxHeight: '75vh', overflowY: 'auto' }}> */}
            <div className="card-body p-2 bg-slate-100" >
                {/* List-View or Card-View */}
                {DispType
                    ? <div className="flex flex-col m-0" >
                        {RecAll.map((E, I) => {
                            // return <button className='flex mb-2 ' key={E.id} onClick={() =>{DispRecInAlert(E,'Selected'); HandleListItemClicked(E)}}>
                            return (
                                <div className='flex px-1 py-0 text-base border border-bottom cursor-pointer'
                                    // style={{ fontSize: '10px' }} key={E.Id} onClick={() => { setSelectedRec(E.Id); HandleListItemClicked(E) }}>
                                    key={E.Id} onClick={() => { setSelectedRec(E.Id); HandleListItemClicked(E) }}>

                                    <span style={{ width: '7%' }}>{E.Id}</span>
                                    <span style={{ width: '8%', margin: 'auto' }}>
                                        {(E.PicURL && E.PicURL?.trim())
                                            ? <img style={{ width: "20px", height: '20px' }} alt="..."
                                                src={
                                                    (E.PicURL && E.PicURL.trim())
                                                        ? (process.env.REACT_APP_API_URL + `Traders/GetFile/${E.PicURL}`)
                                                        : ''
                                                    // :ImgDefault
                                                }
                                            />
                                            : <span className='flex justify-center' > <MyAvatar Text={E.Title[0]} Size={10} /> </span>
                                        }
                                    </span>
                                    <span style={{ width: '55%' }}>{E.Title}  </span>
                                    <span style={{ width: '30%', textAlign: 'end' }}>{E.City}</span>
                                    {/* <span style={{ width: '15%', textAlign: 'end' }}>{E.ContactPh1}</span> */}
                                </div>
                            )
                        }).reverse()
                        }
                    </div>

                    :
                    // <div className="flex justify-center items-center h-screen">
                    <div className="flex justify-center items-start ">
                        <div className="w-full grid grid-flow-row auto-rows-auto grid-cols-[repeat(auto-fit,minmax(75px,1fr))] gap-2">
                            {/* Grid system:
grid-flow-row: Ensures the cards are placed in rows.
grid-cols-[repeat(auto-fit,minmax(120px,1fr))]: This sets up the grid to automatically fit as many 120px wide cards as possible in a row, based on the available space, and if needed, cards will wrap to the next row. The minmax(120px, 1fr) ensures that each card has a minimum width of 120px but can grow to take up more space if available. 

In the context of minmax(120px, 1fr) within a CSS Grid layout, 1fr represents a "fraction of the available space."
Detailed Explanation:
fr (fractional unit): The fr unit is a flexible length unit in CSS Grid that divides the available space in a grid container into proportional fractions. When you use 1fr, it means "one fraction of the remaining available space" after accounting for other fixed or intrinsic widths (like margins, paddings, or grid gaps).
minmax(120px, 1fr): This means that the grid item (card in your case) should have a minimum width of 120px, but if more space is available (in the container), it can grow to occupy a flexible portion of that space (up to 1fr, which means it will share the space equally with other fr units).

If there are 3 cards in a row and each has a width of minmax(120px, 1fr):
The cards will never shrink below 120px in width.
If there's more room available beyond 3 x 120px (360px total), the cards will expand proportionally to fill the remaining space, with each card getting an equal fraction of that space (because of the 1fr).
This creates a responsive layout where cards stay at least 120px wide, but can expand when there's more available space.

*/}
                            {RecAll.map((E, I) => {
                                return (

                                    <div key={E.Id} className={"p-0 mb-1 w-[75px] h-[100px] shadow-md " + (E.Id === SelectedRec ? ' border border-red-600 ' : ' border-0 ')}
                                        // style={{ width: "75px", minHeight: '75px', maxHeight: '100px', borderColor: (E.Id === SelectedRec ? 'red' : 'none') }}
                                        // style={{ width: "75px",  height: '100px' }}
                                        onClick={(e) => { setSelectedRec(E.Id); HandleListItemClicked(E) }}>

                                        {/* Card Inage */}
                                        <div className=" px-0 pt-0 mb-0 text-center " >
                                            {/* <img src={`Images/ItemsStore/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="..." */}
                                            {/* <img src={'Images/AdminPanel/Default/DefaultSupplier.png'} style={{ width: "75%", height: '100px', color: '#e040fb' }} alt="..." /> */}

                                            {/* <img src={process.env.REACT_APP_API_URL + `Traders/GetFile/${E.PicURL}`} style={{ width: "100%", height: '50px', color: '#e040fb' }} alt="..." /> */}

                                            {(E.PicURL && E.PicURL.trim())
                                                ? <img src={
                                                    (E.PicURL && E.PicURL.trim())
                                                        ? (process.env.REACT_APP_API_URL + `Traders/GetFile/${E.PicURL}`)
                                                        : ''
                                                    // :ImgDefault
                                                }
                                                    style={{ width: "100%", height: '50px' }} alt="..." />
                                                : <span className='flex justify-center' > <MyAvatar Text={E.Title[0]} Size={50} /> </span>
                                            }

                                        </div>

                                        <div className="card-body p-0 m-0" >

                                            <div className="mt-1 text-center text-black" style={{ fontSize: '10px', lineHeight: '1' }}>{E.Title} </div>
                                            {/* <div className="mt-1 text-center text-black" style={{ fontSize: '10px', lineHeight: '1' }}>{E.Code}</div> */}
                                            {/* <div className="mt-1 text-center text-black" style={{ fontSize: '8px', lineHeight: '1' }}>{E.City}</div> */}

                                            {/* <div className="card-title text-center text-primary" style={{ fontSize: '10px' }}>{E.Title.trim()}</div> */}
                                        </div>
                                    </div>
                                )
                            }).reverse()
                            }
                        </div>
                    </div>
                }






            </div >
        </div >

    </>)
}

