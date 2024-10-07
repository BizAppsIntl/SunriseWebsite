import React from 'react'

const COLORS_BG = ['#a2b9bc', '#6b5b95', '#feb236', '#d64161', '#ff7b25', '#b2ad7f', '#878f99']
const COLORS_FG = ['white', 'black']

export default function MyAvatar({Text='M', Size = 50, BG = '', FG = '' }) {

  return (
  // <div className='flex justify-center items-center  rounded-circle' 
  //  style={{ width: `${Size}px`, height: `${Size}px`,
  //   border:'1px solid', 
  //   color:  `${BG ? BG : (COLORS_BG[Math.floor(Math.random() * COLORS_BG.length)])}`
  //   }}>

    <div className='flex justify-center items-center border rounded-full leading-1'
      style={
        {
          // width: `${Size-6}px`, height: `${Size-4}px`,
          width: `${Size}px`, height: `${Size}px`,
          background: `${BG ? BG : (COLORS_BG[Math.floor(Math.random() * COLORS_BG.length)])}`,
          color: `${FG ? FG : (COLORS_FG[Math.floor(Math.random() * COLORS_FG.length)])}`
        }}
    >

      <span style={{ fontSize: `${(Size * 0.60)}px`, }}>{Text}</span>
    </div>
    // </div>
  )
}
