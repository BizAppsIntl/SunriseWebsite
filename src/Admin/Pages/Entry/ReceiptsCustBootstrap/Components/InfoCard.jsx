import React from 'react'

import ImgMale from '../../../../ImagesAdminPanel/default/Male.png'
import ImgFemale from '../../../../ImagesAdminPanel/default/Female.png'
import MyAvatar from '../../../../../Utils/MyAvatar'


const InfoCard = ({ InfoRec }) => {
    const { Code, Title, PicURL, RecType, Gender, Desc, Rem, Priority, Address, Phone, City, Contact1, ContactPh1, Contact2, ContactPh2, PreBal, CrntBal } = InfoRec
    return (
        <>
            <div className="card shadow  p-0 mb-1" style={{ width: '500px' }} >
                <div className="card-img-top p-3  text-center " >
                    {/* <img src={`Images/ItemsStore/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="..." */}
                    {/* <img src={'Images/AdminPanel/Default/DefaultSupplier.png'} style={{ width: "75%", height: '100px', color: '#e040fb' }} alt="..." /> */}

                    {/* <img src={process.env.REACT_APP_API_URL + `Supplier/GetFile/${PicURL}`} style={{ width: "75%", height: '100px', color: '#e040fb' }} alt="..." /> */}

                        {(PicURL && PicURL.trim())
                            ? <img src={
                                (PicURL && PicURL.trim())
                                    ? (process.env.REACT_APP_API_URL + `Traders/GetFile/${PicURL}`)
                                    : ''
                                    // :ImgDefault
                            }
                                style={{ width: "100%", height: '125px' }}  alt="..."   />
                            : <span className='d-flex justify-content-center' > <MyAvatar Text={Title[0]} Size={124} /> </span>
                        }
                </div>

                <div className="card-body px-3 pb-3 pt-0">

                    {/* <div className="card-title m-0 p-0" style={{ lineHeight: 1 }}>{Title.trim()}</div> */}
                    <div className="card-title fs-4 text-center" >{Title.trim()}</div>

                    <div>
                        <table><tbody>
                            {/* <tr>
                                <th> <span className='fs-6 fw-bold ' >Code:  </span></th>
                                <td> <span className='fs- ' >{Code}  </span> </td>
                            </tr> */}

                            <tr height='24px'>
                                <th> <span className='fs-6 fw-bold  ' >Description:</span></th>
                                <td> <span className='fs- ' > {Desc}   </span> </td>
                            </tr>

                            <tr height='24px'>
                                <th> <span className='fs-6 fw-bold  ' >Remarks:  </span></th>
                                <td> <span className='fs- ' > {Rem}   </span> </td>
                            </tr>

                            <tr height='24px'>
                                <th> <span className='fs-6 fw-bold  ' >Phone:  </span></th>
                                <td> <span className='fs- ' > {Phone}   </span> </td>
                            </tr>
                            <tr height='24px'>
                                <th> <span className='fs-6 fw-bold  ' >Address:  </span></th>
                                <td> <span className='fs- ' style={{ lineHeight: '1' }}> {Address}   </span> </td>
                            </tr>
                            <tr height='24px'>
                                <th> <span className='fs-6 fw-bold  ' >City:  </span></th>
                                <td> <span className='fs- ' > {City}   </span> </td>
                            </tr>
                            <tr height='24px'>
                                <th> <span className='fs-6 fw-bold ' style={{ lineHeight: '1' }}>Contact/Person:</span></th>
                                <td> <span className='fs- ' style={{ lineHeight: '1' }}> {Contact1 + ', ' + ContactPh1}   </span> </td>
                            </tr>
                            {/* <tr height='24px'>
                                <th> <span className='fs-6 fw-bold ' >Other Contact:</span></th>
                                <td> <span className='fs- '  style={{lineHeight:'1'}}> {Contact2 + ', ' + ContactPh2}   </span> </td>
                            </tr> */}


                        </tbody></table>
                    </div>

                </div>
            </div>
        </>
    )
}

export default InfoCard
