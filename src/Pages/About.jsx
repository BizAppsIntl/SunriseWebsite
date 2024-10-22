import React from 'react'
import { useCtxMainContextHook } from '../CtxMain'
import { AlertRec } from '../StdLib'

export default function About() {
    const { CtxMainState, CtxMainDispatch } = useCtxMainContextHook()
    // const { _Procedures, _Patients, _DocsRef, _AccRecs, _CatItems } = CtxMainState
    const { _Items, _AccRecs, _CatItems } = CtxMainState
  

    // AlertRec(_AccRecs, 'ABOUT PAGE ******************** NEAT _AccRec in main prgb**********************')
    return (
    <>

<div>
    Welcome in the wonderful world of music
{/* <p>_AccRecs Loading: {_AccRecs.Loading}</p>
<p>_AccRecs Data Length: {_AccRecs.Data.length}</p> */}

</div>


    </>
  )
}
