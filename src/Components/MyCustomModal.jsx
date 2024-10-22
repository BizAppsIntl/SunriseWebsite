import React, { useEffect } from 'react';
import { CgCloseO } from 'react-icons/cg';

export default function MyCustomModal({ isOpen, onClose, ShowCloseButton, children }) {

  // Close modal on pressing the Escape key
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  // Close modal when clicking outside the modal content
  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      onClick={handleOutsideClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      {/* <div className="bg-white  rounded-lg overflow-hidden shadow-lg max-w-lg w-full p-0 relative "> */}

      {/* with maxWidth */}
      {/* <div className={`bg-white rounded-lg overflow-hidden shadow-lg w-full p-0 relative md:${maxWidth}`}> */}

      <div className="bg-white  rounded-lg overflow-hidden shadow-lg p-0 relative ">
        {/* Close Button */}
        {ShowCloseButton && <button
          onClick={onClose}
          className="absolute top-2 right-2  text-red-600 hover:text-red-800 text-2xl  "
        >
          {/* &times; */}
          <CgCloseO />
        </button>
        }

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
