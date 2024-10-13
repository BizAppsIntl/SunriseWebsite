import React from 'react'

const Modal4Del = ({HandleBtnDelete, children}) => {
  return (
    <>
    
            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete This Record</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body d-flex justify-content-center ">
                            {children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No. Do Not Delete</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => { HandleBtnDelete(true) }}>Delete This Record</button>
                        </div>
                    </div>
                </div>
            </div>
    
    </>
  )
}

export default Modal4Del