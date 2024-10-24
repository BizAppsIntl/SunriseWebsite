import React, { useState, useRef, useEffect } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa6"

export default function Accordion({ DefaultOpen = false, AlwaysOpen = false, header = '', title = '', title_icon = null, content = '', ExtraCSS4Div = '', ExtraCSS4Header = '', ExtraCSS4Content = '', children }) {
  const [isOpened, setOpened] = useState(AlwaysOpen || DefaultOpen)
  const [height, setHeight] = useState("0px")
  const contentElement = useRef(null)

  useEffect(() => {
    if (AlwaysOpen || DefaultOpen) {
      // alert(`${title}--- UseEffect isOpened: ${isOpened?'true': 'false'}, DefaultOpen: ${DefaultOpen?'true': 'false'} `  )
      setOpened(! (AlwaysOpen || DefaultOpen))
      HandleOpening(!(AlwaysOpen || DefaultOpen))
    }
  }, [])

  // const HandleOpening = () => {
  //   setOpened(!isOpened)
  //   setHeight(!isOpened ? `${contentElement.current.scrollHeight}px` : "0px")
  // }

  const HandleOpening = (state) => {
    if (AlwaysOpen) state = false
    // alert(`HandlingWindow StateRcvd:  ${state?'true': 'false'}, isOpened: ${isOpened?'true': 'false'}, DefaultOpen: ${DefaultOpen?'true': 'false'} `  )
    setOpened(!state)
    setHeight(!state ? `${contentElement.current.scrollHeight}px` : "0px")
  }
  return (
    <div onClick={() => HandleOpening(isOpened)} className={ExtraCSS4Div || " border border-gray-200"}>
      <div className={"flex justify-between items-center " + ExtraCSS4Header}>
        {/* {isOpened ? 'isOpened: true' : 'isOpened: false'} */}
        {header ? header
          : <div className="px-3 flex gap-3 items-center"><span>{title_icon}</span> <h4 className="font-semibold">{title}</h4></div>
        }
        {AlwaysOpen || (isOpened ? <FaChevronUp /> : <FaChevronDown />)}
      </div>

      <div
        ref={contentElement}
        style={{ height: height }}
        className={" overflow-hidden transition-all duration-200 " + ExtraCSS4Content || " bg-gray-200"}
      >
        {/* <p className="p-4">{content}</p> */}
        {children}
      </div>
    </div>
  )
}


