import React from 'react'

const InfoCard = ({ InfoRec }) => {
    const { Code, Title, PicURL, RecType, Desc, Rem, Priority, Address, Phone, Contact1, ContactPh1, Contact2, ContactPh2, PreBal, CrntBal } = InfoRec
    return (
        <>
            <div className="card shadow  p-0 mb-1" style={{ width: "100%", maxWidth: '325px', minWidth: '100px' }} >
                <div className="card-img-top px-2 pt-2 text-center " >
                    {/* <img src={`Images/ItemsStore/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="..." */}
                    {/* <img src={'Images/AdminPanel/Default/DefaultSupplier.png'} style={{ width: "75%", height: '100px', color: '#e040fb' }} alt="..." /> */}

                    <img src={process.env.REACT_APP_API_URL + `Suppliers/GetFile/${PicURL}`} style={{ width: "75%", height: '100px', color: '#e040fb' }} alt="..." />
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

                            <tr>
                                <th> <span className='fs-6 fw-bold  ' >Description:  </span></th>
                                <td> <span className='fs- ' > {Desc}   </span> </td>
                            </tr>

                            <tr>
                                <th> <span className='fs-6 fw-bold fs- ' >Remarks:  </span></th>
                                <td> <span className='fs- ' > {Rem}   </span> </td>
                            </tr>

                            <tr>
                                <th> <span className='fs-6 fw-bold  ' >Address:  </span></th>
                                <td> <span className='fs- ' > {Address + ', ' + Phone}   </span> </td>
                            </tr>
                            <tr>
                                <th> <span className='fs-6 fw-bold  ' >Contact Person:  &ensp;  </span></th>
                                <td> <span className='fs- ' > {Contact1 + ', ' + ContactPh1}   </span> </td>
                            </tr>
                            <tr>
                                <th> <span className='fs-6 fw-bold ' >Other Contact:  </span></th>
                                <td> <span className='fs- ' > {Contact2 + ', ' + ContactPh2}   </span> </td>
                            </tr>


                        </tbody></table>
                    </div>

                </div>
            </div>
        </>
    )
}

export default InfoCard
