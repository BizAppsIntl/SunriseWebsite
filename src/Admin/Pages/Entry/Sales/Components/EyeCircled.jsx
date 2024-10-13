import React from 'react'

export default function EyeCircled({ RL = 'L', Mode = true, Size = 30, BakGrnd = 0 }) {
    return (
        <>
            {/* <div className="d-flex flex-column  align-items-center " style={{ border: '2px solid red', borderRadius: '50%', width: '30px', height: '30px' }}> */}

            {(BakGrnd === 0)
                ?
                Size >= 30      //outline display
                    ?
                    <div className=" text-center " style={{ lineHeight: '1', border: `3px solid  ${Mode ? 'red' : 'silver'}`, borderRadius: '50%', width: `${Size}px`, height: `${Size}px` }}>
                        <div style={{ lineHeight: '1', color: `${Mode ? 'blue' : 'silver'}` }}>{RL}</div>
                        <div className=" mx-auto"
                            style={{ border: '0px solid black', backgroundColor: `${Mode ? 'red' : 'silver'}`, borderRadius: '50%', width: '50%', height: '50%' }}>
                        </div>
                    </div>
                    :
                    <div className=" text-center " style={{ lineHeight: '1', border: `1px solid  ${Mode ? 'red' : 'silver'}`, borderRadius: '50%', width: `${Size}px`, height: `${Size}px` }}>
                        <div style={{ lineHeight: '1', color: `${Mode ? 'black' : 'silver'}` }}>{RL}</div>
                    </div>
                :
                Size >= 30
                    ?           //Solid display
                    <div className=" text-center "
                        style={{
                            lineHeight: '1',
                            border: `3px solid  ${Mode ? 'red' : 'silver'}`,
                            borderRadius: '50%',
                            width: `${Size}px`, height: `${Size}px`
                        }}>

                        <div style={{ lineHeight: '1', color: ` ${Mode ? 'blue' : 'silver'}` }}>{RL}</div>
                        <div className=" mx-auto"
                            style={{ border: '0px solid black', backgroundColor: `${Mode ? 'red' : 'silver'}`, borderRadius: '50%', width: '50%', height: '50%' }}>
                        </div>
                    </div>
                    :
                    <div className=" text-center "
                        style={{
                            lineHeight: '1',
                            color: `${Mode ? 'white' : 'black'}`,
                            background: `${Mode ? 'red' : 'silver'}`,
                            border: `1px solid  ${Mode ? 'red' : 'silver'}`,
                            borderRadius: '50%',
                            width: `${Size}px`, height: `${Size}px`
                        }}>

                        <div style={{ lineHeight: '1' }}>{RL}</div>
                    </div >

            }
        </>
    )
}


                    // {/* *******[  SELECTED           Eye RED  ]********** */}
                    // {/* <div className='d-flex flex-column justify-content-center align-items-center '
                    //   style={{ border: 'px solid Silver', backgroundColor: 'red', borderRadius: '50%', width: '30px', height: '30px' }}>

                    //   <div className='d-flex flex-column justify-content-end align-items-center'
                    //     style={{ border: '0px solid Silver', backgroundColor: 'white', borderRadius: '50%', width: '80%', height: '80%' }}>

                    //     <div className='d-flex flex-column justify-content-end align-items-center'
                    //       style={{ border: '0px solid Silver', backgroundColor: 'red', marginBottom: '0px', borderRadius: '50%', width: '60%', height: '60%' }}>

                    //       <div
                    //         style={{ border: '0px solid black', backgroundColor: 'red', marginBottom: '-1px', borderRadius: '50%', width: '100%', height: '100%' }}>

                    //       </div>
                    //     </div>
                    //   </div>
                    // </div> */}

                    // {/* <img src={EyeRtOpen} style={{ border: '2px solid red', borderRadius: '50%', width: '30px', height: '30px' }}  alt="Rt-Open" /> */}
                    // {/* <img src={EyeRtOpenOutline} style={{ border: '2px solid red', borderRadius: '50%', width: '30px', height: '30px' }}  alt="Rt-Open" /> */}

                    // {/* *******[ Not SELECTED            Eye GREY/Dim  ]********** */}
                    // {/* <div className='d-flex flex-column justify-content-center align-items-center '
                    //   style={{ border: '1px solid silver', backgroundColor: 'Gainsboro', borderRadius: '50%', width: '30px', height: '30px' }}>

                    //   <div className='d-flex flex-column justify-content-end align-items-center'
                    //     style={{ border: '0px solid Gainsboro', backgroundColor: 'white', borderRadius: '50%', width: '80%', height: '80%' }}>
                    //     <div className='d-flex flex-column justify-content-end align-items-center'
                    //       style={{ border: '1px solid Silver', backgroundColor: 'Gainsboro', marginBottom: '0px', borderRadius: '50%', width: '60%', height: '60%' }}>

                    //       <div
                    //         style={{ border: '0px solid Silver', backgroundColor: 'Gainsboro', marginBottom: '-1px', borderRadius: '50%', width: '100%', height: '100%' }}>

                    //       </div>
                    //     </div>
                    //   </div>
                    // </div> */}

                    // {/* <img src={EyeRtShut} style={{ border: '1px solid silver', borderRadius: '50%', width: '30px', height: '30px' }} alt="Rt-Shut" /> */}
                    // {/* <img src={EyeRtShutOutline} style={{ border: '1px solid silver', borderRadius: '50%', width: '30px', height: '30px' }} alt="Rt-Shut" /> */}
