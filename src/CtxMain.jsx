import { createContext, useContext, useReducer, useState } from 'react'
import { AlertRec, CurrentTime } from './StdLib'
import axios from 'axios'
// import { GLOBAL_data } from './App'

// ==================[  Fn: GET ALL RECORDS  ]=====================
const DataFetchDoctors = async () => {
    // fetch(process.env.REACT_APP_API_URL + `Doctors`, { method: 'GET' })
    //     .then(res => res.json())
    //     // .then(data => { setRecAll(data) })
    //     .then(data => {
    //          AlertRec(data, 'DataRcvd')
    //         // console.log('Trans Purchase Full Data', data)
    //         return(data)
    //     })

    const res = await fetch(process.env.REACT_APP_API_URL + `Doctors`, { method: 'GET' })
    return (await res.json())

}
// ==================[  Fn: GET Products ALL RECORDS  ]=====================



const CtxMainInitialState = {
    _Procedures: { Loading: false, Error: '', Data: [] },
    _Items: { Loading: false, Error: '', Data: [] },
    _Patients: { Loading: false, Error: '', Data: [] },
    _DocsRef: { Loading: false, Error: '', Data: [] },
    _DocsDuty: { Loading: false, Error: '', Data: [] },
    _AccRecs: { Loading: false, Error: '', Data: [] },
    _Cats: { Loading: false, Error: '', Data: [] },
    _CatItems: { Loading: false, Error: '', Data: [] },

    _SysUser: { Loading: false, Error: '', Data: [] },

    _D: 'Started at:' + CurrentTime()
}
// const [{ Loading, Error, Procedures }, dispatch] = useReducer(reducerFn, { Loading: false, Error: '', Procedures: [] })

const CtxMainReducer = (state, action) => {
    // console.log('In reducer function: ', state, action)
    //alert('payload-type: '+action.payload.type)
    //alert('action.payload.CartItems.length: '+action.payload.CartItems.length)

    switch (action.type) {
        case 'PROCEDURES_FETCH_LOADING': return ({ ...state, _Procedures:{...state._Procedures, Loading: true} }); break;
        case 'PROCEDURES_FETCH_SUCCESS': return ({ ...state, _Procedures:{...state._Procedures, Loading: false, Data: action.payload }}); break;
        case 'PROCEDURES_FETCH_ERROR': return ({ ...state, _Procedures:{...state._Procedures, Loading: false, Error: action.payload }}); break;

        case 'ITEMS_FETCH_LOADING': return ({ ...state, _Items:{...state._Items, Loading: true} }); break;
        case 'ITEMS_FETCH_SUCCESS': return ({ ...state, _Items:{...state._Items, Loading: false, Data: action.payload }}); break;
        case 'ITEMS_FETCH_ERROR': return ({ ...state, _Items:{...state._Items, Loading: false, Error: action.payload }}); break;

        case 'DOCSREF_FETCH_LOADING': return ({ ...state, _DocsRef:{...state._DocsRef, Loading: true} }); break;
        case 'DOCSREF_FETCH_SUCCESS': return ({ ...state, _DocsRef:{...state._DocsRef, Loading: false, Data: action.payload }}); break;
        case 'DOCSREF_FETCH_ERROR': return ({ ...state, _DocsRef:{...state._DocsRef, Loading: false, Error: action.payload }}); break;

        case 'DOCSDUTY_FETCH_LOADING': return ({ ...state, _DocsDuty:{...state._DocsDuty, Loading: true} }); break;
        case 'DOCSDUTY_FETCH_SUCCESS': return ({ ...state, _DocsDuty:{...state._DocsDuty, Loading: false, Data: action.payload }}); break;
        case 'DOCSDUTY_FETCH_ERROR': return ({ ...state, _DocsDuty:{...state._DocsDuty, Loading: false, Error: action.payload }}); break;

        case 'PATIENTS_FETCH_LOADING': return ({ ...state, _Patients:{...state._Patients, Loading: true} }); break;
        case 'PATIENTS_FETCH_SUCCESS': return ({ ...state, _Patients:{...state._Patients, Loading: false, Data: action.payload }}); break;
        case 'PATIENTS_FETCH_ERROR': return ({ ...state, _Patients:{...state._Patients, Loading: false, Error: action.payload }}); break;

        case 'ACCRECS_FETCH_LOADING': return ({ ...state, _AccRecs:{...state._AccRecs, Loading: true} }); break;
        case 'ACCRECS_FETCH_SUCCESS': return ({ ...state, _AccRecs:{...state._AccRecs, Loading: false, Data: action.payload }}); break;
        case 'ACCRECS_FETCH_ERROR': return ({ ...state, _AccRecs:{...state._AccRecs, Loading: false, Error: action.payload }}); break;

        case 'CATS_FETCH_LOADING': return ({ ...state, _Cats:{...state._Cats, Loading: true} }); break;
        case 'CATS_FETCH_SUCCESS': return ({ ...state, _Cats:{...state._Cats, Loading: false, Data: action.payload }}); break;
        case 'CATS_FETCH_ERROR': return ({ ...state, _Cats:{...state._Cats, Loading: false, Error: action.payload }}); break;

        case 'CATITEMS_FETCH_LOADING': return ({ ...state, _CatItems:{...state._CatItems, Loading: true} }); break;
        case 'CATITEMS_FETCH_SUCCESS': return ({ ...state, _CatItems:{...state._CatItems, Loading: false, Data: action.payload }}); break;
        case 'CATITEMS_FETCH_ERROR': return ({ ...state, _CatItems:{...state._CatItems, Loading: false, Error: action.payload }}); break;

        case 'SYSUSER_FETCH_LOADING': return ({ ...state, _SysUser:{...state._SysUser, Loading: true} }); break;
        case 'SYSUSER_FETCH_SUCCESS': return ({ ...state, _SysUser:{...state._SysUser, Loading: false, Data: action.payload }}); break;
        case 'SYSUSER_FETCH_ERROR': return ({ ...state, _SysUser:{...state._SysUser, Loading: false, Error: action.payload }}); break;

        // case 'DOCTORS_RELOAD': {
        //     const itmNew = action.payload
        //     const d = DataFetchDoctors()
        //     alert('Reload for ctx--- before:' + state._DocsRef.length + '  NewResponse for ctx=' + d.length)
        //     // return { ...state, _Cart: { ...state._Cart, CartItems: [...state._Cart.CartItems, action.payload] } }
        //     return { ...state, _DocsRef: d }
        // }

        case 'D_L': {
            return { ...state, _D: 'value changed in Reducer' + CurrentTime() }
        }

        // case 'CART_ITEM_ADD':{        
        // const itmNew = action.payload
        // const itmExist = state._Cart.CartItems.find((E) => E._id === itmNew._id)

        // const cartItems =
        //     itmExist
        //         ? state._Cart.CartItems.map(E => E._id === itmExist._id ? itmNew : E)
        //         : [...state._Cart.CartItems, itmNew]

        // //set values to Main in local storage
        // localStorage.setItem('CartItems', JSON.stringify(cartItems))

        // // return { ...state, _Cart: { ...state._Cart, CartItems: [...state._Cart.CartItems, action.payload] } }
        // return { ...state, _Cart: { ...state._Cart, CartItems: cartItems } }
        // }

        // case 'CART_ITEM_DEL': {
        // const itmNew = action.payload
        // const cartItems = state._Cart.CartItems.filter(E => E._id !== itmNew._id)

        // //set values to Main in local storage
        // localStorage.setItem('CartItems', JSON.stringify(cartItems))

        // // return { ...state, _Cart: { ...state._Cart, CartItems: [...state._Cart.CartItems, action.payload] } }
        // return { ...state, _Cart: { ...state._Cart, CartItems: cartItems } }
        // }

        // case 'USER_SIGNIN': {
        // localStorage.setItem('UserInfo', JSON.stringify(action.payload))
        // return { ...state, _UserInfo: action.payload }
        // }

        // case 'USER_SIGNOUT': {
        //localStorage.setItem('UserInfo', null)
        // localStorage.removeItem('UserInfo')
        // localStorage.removeItem('ShippingInfo')

        // return { ...state, _UserInfo: null }
        // }

        // case 'SHIPPING_INFO_SAVE': {
        // localStorage.setItem('ShippingInfo', JSON.stringify(action.payload))
        // return { ...state, _Cart: { ...state._Cart, ShippingInfo: action.payload } }
        // }

        // case 'PAYMENT_MODE_SAVE': {
        // localStorage.setItem('PaymentMode', JSON.stringify(action.payload))
        // return { ...state, _Cart: { ...state._Cart, PaymentMode: action.payload } }
        // }


        default:
            return state;
    }
}

export const CtxMain = createContext()

//-----------------------------------------------------------
// export const CtxMainProvider = ({ children }) => {
export const CtxMainProvider = (props) => {
    const [CtxMainState, CtxMainDispatch] = useReducer(CtxMainReducer, CtxMainInitialState)
    const value = { CtxMainState, CtxMainDispatch }


    return (
        // <AppCtx.Provider value={{_id:'VID', _title:'VTitle'}}>{children}</AppCtx.Provider>
        <CtxMain.Provider value={value}>{props.children}</CtxMain.Provider>
    )
}

// My Global Custom Hook
// call this Hook and save extra two calls of (useContext and AppCtx)
export const useCtxMainContextHook = () => {
    return (useContext(CtxMain))
}
//-----------------------------------------------------------

