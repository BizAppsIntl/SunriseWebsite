// import './Card.css'
// import pic from '../../../SiteImages/Default/abc.bmp'

// import Image from "next/image"

const Card = (props) => {
  return (
    <>

      <div className="flex gap-2 border border-gray-200 shadow-md rounded-lg h-[80px] overflow-hidden "  >


        {/* <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3> */}

          <div className="w-[80px] h-[80px] h-full" >
            {/* <img className="img-fluid rounded-start" src={`Images/AdminPanel/Default/${props.Img}`}  alt={'...'} /> */}
            <img
              // src={`Images/AdminPanel/Default/${props.Img}`} width="0"
              // src={'/assets/PanelImages/RcvAble.png'} 
              // src={`${props.Img}`} 
              // src={process.env.NEXT_PUBLIC_API_URL_BACKEND + `SiteMgt/GetFile/${props.Img}`} 
              src={`/assets/PanelImages/${props.Img}`} 
              // width="0"
              // height="0"
              // sizes="100vw"
              // className="w-full h-auto" />
              className=" h-full w-full" />
          </div>

          <div className="flex-1  h-full">
            {/* <strong >{props.Title}</strong> */}
            {props.children }
          </div>
        
      </div>
    </>
  )
}

export default Card
