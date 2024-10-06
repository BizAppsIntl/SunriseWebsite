// \SampleCard.jsx

import React from 'react'

export default function SampleCard  ({ width = '100%'  }) {
  return (
    <>
            {/* <div className="card w-full sm:w-1/2 lg:w-1/4 p-4"> */}
      <div className="card "  style={{ width: width }}>
        {/* Card Header */}
        <div className="card-header p-1">
          <h2 className="text-lg font-semibold text-gray-700">This is Card Title</h2>
        </div>

        {/* Card Body */}
        <div className="p-6 card-body !text-red-600">
          <p>This is paragraph, this ti Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus quod nemo perspiciatis obcaecati iusto, consequatur ab, natus esse laboriosam vitae optio ratione maxime vero? Ex nesciunt quis tempore fugiat. Nesciunt.  </p>
        </div>

        {/* Card Footer */}
        {/* {footer && ( <div className="card-footer"> {footer}  </div>  )} */}
        <div className='card-footer'>Footer is here</div>
      </div>
    </>
  )
}
