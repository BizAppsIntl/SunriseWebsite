import React from 'react'
import './Card.css'
import pic from '../../../SiteImages/Default/abc.bmp'

const Card = (props) => {
  return (
    <>
      <div className="card status-card shadow p-0 d-flex flex-row">
        <div>
          {/* <img src={'Images/pic.jpg'} alt={`${props.Img}`} /> */}
          {/* <img className="img-fluid rounded-start" src={'Images/AdminPanel/pic.jpg'} alt={`${props.Img}`} /> */}
          {/* <img className="img-fluid rounded-start" src={'Images/AdminPanel/default/pic.jpg'} alt={`111`} /> */}
          {/* <img className="img-fluid rounded-start" src={import('pic.jpg')}  alt={`${props.Img}`} /> */}


          <img className="img-fluid rounded-start" src={`Images/AdminPanel/Default/${props.Img}`}  alt={'...'} />
        </div>

        <div className="card-body card-content ps-2 py-0">
          <strong className="card-title">{props.Img}</strong>
          <span >{props.Desc}</span>
          <span><small className="text-muted">Updated: 3 mins ago</small></span>
        </div>
      </div>
    </>
  )
}

export default Card
