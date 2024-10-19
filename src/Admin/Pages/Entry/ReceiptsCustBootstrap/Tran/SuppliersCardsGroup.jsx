import React from 'react'

const SuppliersCardsGroup = ({ TRecs, HandleBtnClick }) => {
    const { Id, Title, PicURL } = TRecs
    return (
        <>
            <div className="d-flex p-1 gap-1 flex-wrap justify-content-evenly " style={{ overflow: 'hidden' }}>
                {TRecs.map(E =>
                    // <button key={E.Id} className="p-1 mb-1 " style={{ width: "75px", minHeight: '75px', maxHeight: '100px' }}
                        // value={E.Id} onClick={(e) => HandleBtnClick(E)}>

                     <div key={E.Id} className='mb-2 border p-1'  style={{ width: '75px', height: '80px' }}>
                        {/* <div className="card shadow  p-0 m-0"  > */}
                        <div className="card  fine-card card-body m-0 p-1  animated fadeInLeft "  style={{ width: '75px', height: '80px' }}
                        onClick={(e) => HandleBtnClick(E)}>

                            <div className="card-img-top px-0 pt-0 mb-2 text-center " >
                                {/* <img src={`Images/ItemsStore/${ITM.PicURL}`} style={{ width: "100%", height: '75px', cursor: 'pointer' }} alt="..." */}
                                {/* <img src={'Images/AdminPanel/Default/DefaultSupplier.png'} style={{ width: "75%", height: '100px', color: '#e040fb' }} alt="..." /> */}

                                <img src={process.env.REACT_APP_API_URL + `Traders/GetFile/${E.PicURL}`} style={{ width: "100%", height: '50px', color: '#e040fb' }} alt="..." />
                            </div>

                            <div className="card-body p-0">
                                {/* <div className="card-title m-0 p-0" style={{ lineHeight: 1 }}>{Title.trim()}</div> */}
                                <div className="card-title text-center" style={{ fontSize: '10px' }}>{E.Code.trim()}</div>
                            </div>

                        </div>
                     </div>
                    // </button>
                )}
            </div>
        </>
    )
}

export default SuppliersCardsGroup
