// USAGE:    <AlertModal Open={true} Title={'My Alert Popup'} className='text-black' >Seems, There is No Data...</BoxMessage>
// // <pre>RecCount={Recs.length}<br /> {JSON.stringify({ RecordsReceived: Recs }, null, 2)}</pre>
// <pre>Rec: {JSON.stringify({ RecordsReceived: EofTrxs }, null, 2)}</pre>

import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'

export default function AlertModal(props) {
  console.log('**********************************************props Childern are:', props.children)
  const [ShowModalPopup, setShowModalPopup] = useState(props.Open)

  return (<>
    {/* // <Alert  variant={props.variant || 'info'}> {props.children}        </Alert> */}

    {/* ===========END==========  MODAL for Deletion =========================*/}
    <Modal show={ShowModalPopup} onHide={() => setShowModalPopup(false)}>
      <Modal.Header closeButton >
        <Modal.Title>{props.Title? props.Title:'Alert Popup'}</Modal.Title>
        {/* <button type="button" className="btn-close text-primary" data-bs-dismiss="modal" aria-label="Close" style={{ color: 'red' }} /> */}
      </Modal.Header>
      <Modal.Body>
        {/* {AlertRec(Selected4Del,'Selected4Del')} */}
        <div className='d-flex p-2  mx-auto  flex-column align-items-center border shadow' >
          {props.children}
        </div>

      </Modal.Body>

      <Modal.Footer>
        {/* <button type="button" className="btn btn-secondary" onClick={() => setShowModalPopup(false)}>No! Do Not Delete</button> */}
        {/* <button type="button" className="btn btn-danger" onClick={() => { CallDotAPI2Delete(Selected4Del); setShowModalPopup(false) }}>Yes! Remove It.</button> */}
      </Modal.Footer>
    </Modal>


  </>)
}

