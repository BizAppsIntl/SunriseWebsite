import { useState } from 'react';
import Modal from 'react-modal';

export default function MyModal({ handleClose, show, children }) {
alert('Yes i m in MyModel')
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue = () => {
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false)
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            //   backgroundColor       : '#F0AA89'      
        }
    };

    return (
        <>

            {/* <div className="card-header px-2 d-flex  justify-content-between align-items-center" style={{ height: 30 }}>
                <button onClick={setModalIsOpenToTrue}>Click to Open Modal</button>
            </div> */}

            <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={() => setModalIsOpen(false)}>
                <div className="card">
                    <div className="card-header px-2 d-flex  justify-content-between align-items-center" style={{ height: 30 }}>
                        <button onClick={setModalIsOpenToFalse}>x</button>
                    </div>

                    <div className="card-body p-1 d-flex flex-row justify-content-center  " style={{ }}>
                        {children}
                    </div>
                </div>
            </Modal>

        </>
    )


    // export default function Modal  ({ handleClose, show, children })  {
    //     const showHideClassName = show ? "modal display-block" : "modal display-none";

    //     return (
    //       <div className={showHideClassName}>
    //         <section className="modal-main" style={{}}>
    //           {children}
    //           <button type="button" onClick={handleClose}>
    //             Close
    //           </button>
    //         </section>
    //       </div>
    //     );
    //   };

    //   .modal {
    //     position: fixed,
    //     top: 0,
    //     left: 0;
    //     width:100%;
    //     height: 100%;
    //     background: rgba(0, 0, 0, 0.6);
    //   }

    //   .modal-main {
    //     position:fixed;
    //     background: white;
    //     width: 80%;
    //     height: auto;
    //     top:50%;
    //     left:50%;
    //     transform: translate(-50%,-50%);
    //   }

    //   .display-block {
    //     display: block;
    //   }

    //   .display-none {
    //     display: none;
    //   }

}
