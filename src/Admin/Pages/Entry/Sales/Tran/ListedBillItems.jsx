// setCartItems(
//     cartItems.find((item) => {
//       return item.id === exist.id
//         ? {...exist, qnty: exist.qnty + 1}
//         : item;
//       })
//   );

import React, { useEffect } from 'react'
import { useState } from 'react'
import Moment from 'moment'
import ReactDatePicker from 'react-datepicker'
import NumberFormat from 'react-number-format';

//Two file needed for toasify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// [.....................START: Calls Prgs: ..................................................]
// import Modal4Del from '../Components/Modal4Del.jsx';
// import TabbedBillMenuTabs from './TabbedBillMenuTabs.jsx'
import TabbedBillVoucherDetail from './TabbedBillVoucherDetail.jsx'
// import TabbedBillVoucher from '../Components/Tran/TabbedBillVoucher.jsx'

import { AlertConfirm, AlertRec, GetNewID, GetTot4mArray } from '../../../../../StdLib.jsx'
// import Basket from '../Components/Basket.jsx'
// import { Data } from '../SiteData/SiteData.js'
// import { NewData } from '../SiteData/SiteData.js'
// import { Data } from '../../../../AdminData/WarehouseData/KitchenData.js'
// import { Trader } from '../../../../AdminData/TraderData.js'
// [.....................END: Calls Prgs: ..................................................]

import { FaSave, FaUserPlus, FaUserEdit, FaUsers, FaUserCog, FaUserSlash, FaFolder } from 'react-icons/fa'
import { FcCancel } from 'react-icons/fc'

//Play, back, next, fwwd
import { FaStepBackward, FaBackward, FaForward, FaStepForward } from 'react-icons/fa'

import { TbWiperWash } from 'react-icons/tb'

import { BsSortNumericUpAlt } from 'react-icons/bs'
import { BsSortNumericDownAlt } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'
import { FaMinus } from 'react-icons/fa'

//Mangement or Manage Records
import { TbManualGearbox } from 'react-icons/tb'

import { FcDeleteDatabase } from 'react-icons/fc'
import { CgCloseO } from 'react-icons/cg';
import { GiExitDoor } from 'react-icons/gi';
import { ImEnter } from 'react-icons/im';
import { useCtxMainContextHook } from '../../../../../CtxMain.jsx';
import MyCustomModal from '../../../../../Components/MyCustomModal.jsx';

// import TabbedBillVoucherPaymentSection from './TabbedBillVoucherPaymentSection.jsx';
// import TabbedBillVoucherDetail from './TabbedBillVoucherDetail.jsx'
import TabbedBillVoucherHeader from './TabbedBillVoucherHeader.jsx';
import ListedBillItemsMenu from './ListedBillItemsMenu.jsx';
import ListedBillParties from './ListedBillParties.jsx';
import AccordianCard from '../Components/Accordion4Parties/AccordianCard.jsx';
import { FaTrashCan } from 'react-icons/fa6';

const _VCat = "3147"
const _VCat2 = "3133"
const _PrgID = "3147"
const _PrgTitle = "Inventory Sales --->(Combo sales and receipt) Transactions"


//Table: TranM - { VID, VNo, VDte, VCat, PatId, Desc, Rem, VQtyTxt, VAmt, RefVID, RefVNo, RefVDte, RefVCat, RefVAmt, RecType, RecStatus, Priority }
//Table: TranR - { VID, VNo, VDte, VCat, AccType, AccCode, Title, Desc, Rem, VAmt, }
//Table: TranD - { Id/Auto, VID, VNo, VDte, VCat, PatId, PId, Unit, Qty, Price }

//Table: Item - { Id/Auto, Code, Title, TitleU, Desc, Rem, CatCode, PatId, PicURL, Unit, QtyDef, QtyInc, QtyStep, Price, PreBal, CrntBal, QtyMin, QtyMax, RecType, RecStatus, Priority, EntryBy, EntryDte
//Table: Category - { Code, Title, Desc, Rem, RecType, RecStatus, Priority, EntryBy, EntryDte}

//Table: AccRec - {Code, Title, Desc, Rem, PreBal, CrntBal, RecType, RecStatus, Priority, EntryBy, EntryDte}
//Table: Supplier - {Id/Auto, Code, RecType, RecStatus, Priority, Title, TitleU, Desc, Rem, Address, Phone, Contact1, ContactPh1, Contact2, ContactPh2, PicURL, PreBal, CrntBal, EntryBy, EntryDte}

//DEconstruct the Data from file
// const { Products } = Data
const RecDefault = {
    VID: '',
    VNo: '',
    MRNo: '',
    VType: '',
    VDte: new Date(),   //Moment(new Date()).format('DD MMM YY ddd'),
    VCat: _VCat,     //Sales Invoice Transaction Voucher
    // VCat2: _VCat2,     //Sales Invoice Transaction Voucher

    PatId: '',       //PatientId -- one of CustomerOrSupplier/ConsumerOrVender/
    DocRefId: '',
    DocDutyId: '',
    TId: '',       //TraderId -- one of CustomerOrSupplier/ConsumerOrVender/

    Desc: 'Receipt Description',
    Rem: 'Payment In Cash',

    RefPatient: '',
    RefDocDuty: '',
    RefDocRef: '',


    RefVID: '',
    RefVNo: '',
    RefVDte: '',
    RefVCat: '',

    VQtyTxt: '',
    VAmtDoc: '',
    VAmtRef: '',
    VAmtPaid: 0,
    VAmtBal: '',
    VAmt: 0,
    VAmtMargin: 0,

    VItems: [],
}


const ToastWaitTime = 5000

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
const TabbedBillItems = ({ CrntRec, AccRec, VoucherMode, HandleBtnVoucherMode, Traders, Products, Categories }) => {
    const { CtxMainState, CtxMainDispatch } = useCtxMainContextHook()
    const { _Patients, _DocsRef, _DocsDuty, _Cats } = CtxMainState

    // const { VItems, VDte, VNo, Desc, PatId, VAmt, VQty } =iniRec
    const [Need2Refresh, setNeed2Refresh] = useState(false);

    const [VoucherCart, setVoucherCart] = useState(CrntRec ? CrntRec : RecDefault)
    // { VItems: [], VDte: new Date().toDateString(), VNo: 'xxx', VCat: '31', Desc: '', PatId: 'SAB', VAmt: -9, VQty: -9 })
    // const [VoucherCart, setVoucherCart] = useState({ VItems:iniRec.VItems, VDte:iniRec.VDte, VNo:iniRec.VNo, Desc: '', PatId: 'SAB', VAmt: -9, VQty: -9 })

    const [ShowCustDetail, setShowCustDetail] = useState(false)
    const [ShowDeleteModal, setShowDeleteModal] = useState(false);


    useEffect(() => {
        // if (!VoucherMode ) { alert('Empty VoucherMode- trying to return'); return }
        // console.log('Rcvd CrntRec', CrntRec)
        // DispRecInAlert(CrntRec,'Rcvd CrntRec')

        if (CrntRec) {
            setVoucherCart(() => CrntRec);
            // AlertRec(CrntRec, 'CrntRec: Rcvd for Add/Edit with VoucherMode: '+VoucherMode )
        }

    }, [Need2Refresh]);

    // // ==================[  Fn: GET ALL by VoucherCategory  ]=====================  
    // const DataFetchTrader = async () => {
    //     alert('please get me detail for StateSupplier ')

    //     const res = await fetch(`/api/Trader}`);
    //     const data = await res.json();

    //     setStateSupplier(p => p = data);

    //     // // fetch(`/api/VoucherDetail/${VID}`).then ((d)=>d.json()).then(dt=>data=dt);
    //     // const data =async fetch(`/api/VoucherDetail/${VID}`)
    //     //   .then(async response => { 
    //     //     const d = await response.json(); 
    //     //     console.log('XXXXXXX Received in then of Fn; Records Returned:', d) 

    //     //     alert('in side fn. '+d)
    //     //     return ( d)
    //     //   })

    //     // AlertRec(data, 'Rcvd Detail TranD')
    //     return (data)
    //     // let str = ''; Object.entries(data).forEach((k, i) => { str += i + ' ' + k + ' : ' + data[k] + '\n' })
    // }


    const OrderItemAdd4mMenu = (itmId, Eye, itm2Add) => {
        // AlertRec(itm2Add,'FromMenu [DataBase-Table Item itm2Add] Rcvd: with Crnt-ItemId: '+itmId+ 'qty:'+ itm2Add.Qty + '  Eye:'+Eye)

        // in Purchase do not check prev qty
        // if ((qty === undefined) || (+qty > itm2Add.CrntBal)) return
        //if (qty === undefined) return       //no matter current balance is
        const itmExisted = VoucherCart.VItems.find((E) => E.PId === itmId)

        let UpdatedItemsList = []
        if (itmExisted) {
            // AlertRec(itm2Add, 'FromMenu ExistedEntry [DataBase-Table Item itm2Add] Rcvd: with Crnt-ItemId: ' + itmId + 'qty:' + itm2Add.Qty + '  Eye:' + Eye)

            // in Purchase do not check prev qty
            //if ((+qty + +itmExisted.Qty) > itm2Add.CrntBal) return

            const qtyER = (Eye === 'R' || Eye === 'B') ? (itmExisted.ER === 0 ? 1 : 0) : itmExisted.ER
            const qtyEL = (Eye === 'L' || Eye === 'B') ? (itmExisted.EL === 0 ? 1 : 0) : itmExisted.EL
            const qty = ((Eye === 'R' || Eye === 'B') ? (itmExisted.ER === 0 ? 1 : 0) : itmExisted.ER) + ((Eye === 'L' || Eye === 'B') ? (itmExisted.EL === 0 ? 1 : 0) : itmExisted.EL)

            const price = qty >= 2 ? itm2Add.Price2 : itm2Add.Price

            // alert(`
            //     [Existed Entry: 
            //     qty=${qty} 
            //     price=${price} 
            //     RefShare=${itm2Add.ShareRef} 
            //     DocShare=${itm2Add.ShareDoc} 
            //     amtDoc=${((price * qty) * VoucherCart.RefDocDuty.RefShare) / 100}
            //     `)

            const amtRef = qty * itm2Add.ShareRef
            const amtDoc = ((VoucherCart.VType === '1001') && VoucherCart.RefDocDuty.RefShare > 0)
                ? ((price * qty) * VoucherCart.RefDocDuty.RefShare) / 100
                : qty * itm2Add.ShareDoc

            // alert(`From Menu- Existed-Entry amtDoc/amtRef setup: 
            //     RefShare % = ${VoucherCart.RefDocDuty.RefShare} 
            //     New qty= ${qty} 
            //     New price=${price} 

            //     RefShare-in-DB=${itm2Add.ShareRef}      New amtRef=${amtRef}
            //     DocShare-in-DB=${itm2Add.ShareDoc}      New amtDoc=${amtDoc}
            //     `)

            UpdatedItemsList = VoucherCart.VItems.map((E) => (E.PId === itmExisted.PId)
                ? {
                    ...itmExisted,
                    // Qty: +itmExisted.ER + itmExisted.EL,

                    // ER: (Eye === 'R' || Eye === 'B') ? (itmExisted.ER === 0 ? 1 : 0) : itmExisted.ER,
                    // EL: (Eye === 'L' || Eye === 'B') ? (itmExisted.EL === 0 ? 1 : 0) : itmExisted.EL,
                    // Qty: ((Eye === 'R' || Eye === 'B') ? (itmExisted.ER === 0 ? 1 : 0) : itmExisted.ER) + ((Eye === 'L' || Eye === 'B') ? (itmExisted.EL === 0 ? 1 : 0) : itmExisted.EL)

                    ER: qtyER,
                    EL: qtyEL,
                    Qty: qty,

                    Price: price,            //itm2Add.Price,

                    // // ShareRef: itm2Add.ShareRef,
                    // // ShareDoc: itm2Add.ShareDoc,
                    AmtRef: amtRef,
                    AmtDoc: amtDoc,


                    //RefProd: itm2Add,             //being old rec, it is already added
                }
                : E)

            // AlertRec(UpdatedItemsList, 'FromMenu ExistedEntry-All DetailRecs processed [UpdatedItemsList] Rcvd: with Crnt-ItemId: ' + itmId + 'qty:' + itm2Add.Qty + '  Eye:' + Eye)
            setVoucherCart(() => ({
                ...VoucherCart, VItems: UpdatedItemsList,
                // VAmt: vamt, VAmtPaid: vamt, VQtyTxt: vqty,
                // VAmtRef: vAmtRef, VAmtDoc: vAmtDoc
            }))

        }
        else {
            // AlertRec(itm2Add, 'FromMenu NewEntry [DataBase-Table Item itm2Add] Rcvd: with Crnt-ItemId: ' + itmId + 'qty:' + itm2Add.Qty + '  Eye:' + Eye)

            // UpdatedItemsList = [...VoucherCart.VItems, { ...itm2Add, Qty: itm2Add.QtyDef }]
            const qtyER = (Eye === 'R' || Eye === 'B') ? 1 : 0
            const qtyEL = (Eye === 'L' || Eye === 'B') ? 1 : 0
            const qty = ((Eye === 'R' || Eye === 'B') ? 1 : 0) + ((Eye === 'L' || Eye === 'B') ? 1 : 0)

            const price = qty >= 2 ? itm2Add.Price2 : itm2Add.Price
            // alert(`
            //     RefShare=${VoucherCart.RefDocDuty.RefShare} 
            //     qty=${qty} 
            //     price=${price} 
            //     RefShare=${itm2Add.ShareRef} 
            //     DocShare=${itm2Add.ShareDoc} 
            //     amtDoc=${((price * qty) * VoucherCart.RefDocDuty.RefShare) / 100}
            //     `)

            const amtRef = qty * itm2Add.ShareRef
            // const amtDoc = (VoucherCart.VType === '1001')
            //     ? VoucherCart.RefDocDuty.RefShare > 0
            //         ? ((price * qty) * VoucherCart.RefDocDuty.RefShare) / 100
            //         : qty * itm2Add.ShareDoc
            //     : qty * itm2Add.ShareDoc
            const amtDoc = ((VoucherCart.VType === '1001') && VoucherCart.RefDocDuty.RefShare > 0)
                ? ((price * qty) * VoucherCart.RefDocDuty.RefShare) / 100
                : qty * itm2Add.ShareDoc

            // alert(`From Menu- Fresh-Entry amtDoc/amtRef setup: 
            //     RefShare % =${VoucherCart.RefDocDuty.RefShare} 
            //     New qty=${qty} 
            //     New price=${price} 

            //     RefShare-in-DB=${itm2Add.ShareRef}      New amtRef=${amtRef}
            //     DocShare-in-DB=${itm2Add.ShareDoc}      New amtDoc=${amtDoc}
            //     `)


            UpdatedItemsList = [
                ...VoucherCart.VItems,
                {
                    PId: itm2Add.Id,
                    Unit: itm2Add.Unit,

                    // ER: (Eye === 'R' || Eye === 'B') ? 1 : 0,
                    // EL: (Eye === 'L' || Eye === 'B') ? 1 : 0,                    
                    // Qty: ((Eye === 'R' || Eye === 'B') ? 1 : 0) + ((Eye === 'L' || Eye === 'B') ? 1 : 0),
                    ER: qtyER,
                    EL: qtyEL,
                    Qty: qty,

                    Price: price,           //itm2Add.Price,

                    // AmtRef: itm2Add.ShareRef,
                    // AmtDoc: itm2Add.ShareDoc,
                    AmtRef: amtRef,
                    AmtDoc: amtDoc,

                    RefItem: itm2Add,
                }]

            // const { vamt, vqty } = UpdatedItemsList.reduce(
            //     (accum, crntValue) => {
            //         const { Qty, Price } = crntValue;
            //         accum.vamt += (Qty * Price)
            //         accum.vqty += Qty;
            //         return accum;
            //     }, { vamt: 0, vqty: 0 })

            // DELETE EMPTY QTYs .........................
            //if itmExisted.Qty-qty is ZERO then remove from list
            // UpdatedItemsList = UpdatedItemsList.filter((E) => (E.Qty >0 ))
            //.........................

            // AlertRec(UpdatedItemsList, 'FromMenu All DetailRecs processed [New UpdatedItemsList] ===  before calculation START of VAmt,  vAmtDoc, vAmtDoc+ ')

            const vamt = UpdatedItemsList.reduce((t, E) => t + (Number(E.Qty) * Number(E.Price)), 0)
            const vqty = UpdatedItemsList.reduce((t, E) => Number(t) + Number(E.Qty), 0)

            // const vAmtRef = UpdatedItemsList.reduce((t, E) => t + (Number(E.Qty) * Number(E.RefProd.ShareRef)), 0)
            // const vAmtDoc = UpdatedItemsList.reduce((t, E) => t + (Number(E.Qty) * Number(E.RefProd.ShareDoc)), 0)
            const vAmtRef = UpdatedItemsList.reduce((t, E) => t + (Number(E.AmtRef)), 0)
            const vAmtDoc = UpdatedItemsList.reduce((t, E) => t + (Number(E.AmtDoc)), 0)

            // // alert('add:' +vqty +' '+ typeof(vqty))
            // alert(` FromMenu final for Voucher Cart NEW-TOTAL Values: 
            //         TotRefShare-VAmtRef = ${vAmtRef} 
            //         TotDocShare-VAmtDoc = ${vAmtDoc} 
            //         Tot Qty = ${vqty} 
            //         Tot Amt = ${vamt} 
            //         `)

            setVoucherCart(() => ({
                ...VoucherCart, VItems: UpdatedItemsList,
                VAmt: vamt, VAmtPaid: vamt, VQtyTxt: vqty,
                VAmtRef: vAmtRef, VAmtDoc: vAmtDoc
            }))

            // AlertRec(UpdatedItemsList, 'FromMenu Fresh Entry<--[New UpdatedItemsList] ===  VAmt: ' + vamt + ' , VAmtRef: ' + vAmtRef + ' , VAmtDoc: ' + vAmtDoc + ' , VQtyTxt: ' + vqty)

            // setVoucherCart(() => ({ ...VoucherCart, VItems: UpdatedItemsList, VAmt: -9999, Desc: "Description is here", VNo: UpdatedItemsList.length }))
            // setProducts(p=>p=Products.map(E=>(E.Id===itm2Add.Id) ? { ...E, crntBal: E.crntBal - qty } : E))
        }
    }

    const OrderItemAdd4mDetail = (itmId, Eye, itm2Add) => {
        // AlertRec(itm2Add,'FromDetail [Existed itm2Add] Rcvd: with Crnt-ItemId: '+itmId+ 'qty:'+ itm2Add.Qty + '  Eye:'+Eye)

        // in Purchase do not check prev qty
        // if ((qty === undefined) || (+qty > itm2Add.CrntBal)) return
        //if (qty === undefined) return       //no matter current balance is
        const itmExisted = VoucherCart.VItems.find((E) => E.PId === itmId)

        let UpdatedItemsList = []
        if (itmExisted) {
            // AlertRec(itm2Add, 'FromDetail ExistedEntry [Existed itm2Add] Rcvd: with Crnt-ItemId: ' + itmId + 'qty:' + itm2Add.Qty + '  Eye:' + Eye)

            // in Purchase do not check prev qty
            //if ((+qty + +itmExisted.Qty) > itm2Add.CrntBal) return

            const qtyER = (Eye === 'R' || Eye === 'B') ? (itmExisted.ER === 0 ? 1 : 0) : itmExisted.ER
            const qtyEL = (Eye === 'L' || Eye === 'B') ? (itmExisted.EL === 0 ? 1 : 0) : itmExisted.EL
            const qty = ((Eye === 'R' || Eye === 'B') ? (itmExisted.ER === 0 ? 1 : 0) : itmExisted.ER) + ((Eye === 'L' || Eye === 'B') ? (itmExisted.EL === 0 ? 1 : 0) : itmExisted.EL)

            //if price is taken from DB-Items/Procedures
            // const price = qty >= 2 ? itm2Add.RefProd.Price2 : itm2Add.RefProd.Price

            //if price is taken from current existed item/Procedures
            const price = itmExisted.Price

            // alert(`
            //     [Existed Entry: 
            //     qty=${qty} 
            //     price=${price} 
            //     RefShare=${itm2Add.ShareRef} 
            //     DocShare=${itm2Add.ShareDoc} 
            //     amtDoc=${((price * qty) * VoucherCart.RefDocDuty.RefShare) / 100}
            //     `)

            const amtRef = qty * itm2Add.RefProd.ShareRef
            const amtDoc = ((VoucherCart.VType === '1001') && VoucherCart.RefDocDuty.RefShare > 0)
                ? ((price * qty) * VoucherCart.RefDocDuty.RefShare) / 100
                : qty * itm2Add.RefProd.ShareDoc


            UpdatedItemsList = VoucherCart.VItems.map((E) => (E.PId === itmExisted.PId)
                ? {
                    ...itmExisted,
                    // Qty: +itmExisted.ER + itmExisted.EL,

                    // ER: (Eye === 'R' || Eye === 'B') ? (itmExisted.ER === 0 ? 1 : 0) : itmExisted.ER,
                    // EL: (Eye === 'L' || Eye === 'B') ? (itmExisted.EL === 0 ? 1 : 0) : itmExisted.EL,
                    // Qty: ((Eye === 'R' || Eye === 'B') ? (itmExisted.ER === 0 ? 1 : 0) : itmExisted.ER) + ((Eye === 'L' || Eye === 'B') ? (itmExisted.EL === 0 ? 1 : 0) : itmExisted.EL)

                    ER: qtyER,
                    EL: qtyEL,
                    Qty: qty,

                    // // ShareRef: itm2Add.ShareRef,
                    // // ShareDoc: itm2Add.ShareDoc,
                    AmtRef: amtRef,
                    AmtDoc: amtDoc,

                    Price: price,            //itm2Add.Price,

                    //being old rec, it is already added
                    //RefProd: itm2Add,
                }
                : E)

            // AlertRec(UpdatedItemsList, 'UpdatedItemsListn being old')
        }
        else {
            // AlertRec(itm2Add, 'FromDetail FRESH ENTRY [Existed itm2Add] Rcvd: with Crnt-ItemId: ' + itmId + 'qty:' + itm2Add.Qty + '  Eye:' + Eye)

            // // UpdatedItemsList = [...VoucherCart.VItems, { ...itm2Add, Qty: itm2Add.QtyDef }]
            // const qtyER = (Eye === 'R' || Eye === 'B') ? 1 : 0
            // const qtyEL = (Eye === 'L' || Eye === 'B') ? 1 : 0
            // const qty = ((Eye === 'R' || Eye === 'B') ? 1 : 0) + ((Eye === 'L' || Eye === 'B') ? 1 : 0)

            // const price = qty >= 2 ? itm2Add.RefProd.Price2 : itm2Add.RefProd.Price
            // // alert(`
            // //     RefShare=${VoucherCart.RefDocDuty.RefShare} 
            // //     qty=${qty} 
            // //     price=${price} 
            // //     RefShare=${itm2Add.ShareRef} 
            // //     DocShare=${itm2Add.ShareDoc} 
            // //     amtDoc=${((price * qty) * VoucherCart.RefDocDuty.RefShare) / 100}
            // //     `)

            // const amtRef = qty * itm2Add.RefProd.ShareRef
            // // const amtDoc = (VoucherCart.VType === '1001')
            // //     ? VoucherCart.RefDocDuty.RefShare > 0
            // //         ? ((price * qty) * VoucherCart.RefDocDuty.RefShare) / 100
            // //         : qty * itm2Add.ShareDoc
            // //     : qty * itm2Add.ShareDoc
            // const amtDoc = ((VoucherCart.VType === '1001') && VoucherCart.RefDocDuty.RefShare > 0)
            //     ? ((price * qty) * VoucherCart.RefDocDuty.RefShare) / 100
            //     : qty * itm2Add.RefProd.ShareDoc

            // // alert(` final: 
            // //     RefShare=${VoucherCart.RefDocDuty.RefShare} 
            // //     qty=${qty} 
            // //     price=${price} 
            // //     RefShare=${itm2Add.ShareRef} 
            // //     amtRef=${amtRef}
            // //     DocShare=${itm2Add.ShareDoc} 
            // //     amtDoc=${amtDoc}
            // //     `)


            // UpdatedItemsList = [
            //     ...VoucherCart.VItems,
            //     {
            //         PId: itm2Add.Id,
            //         Unit: itm2Add.Unit,

            //         // ShareRef: itm2Add.ShareRef,
            //         // ShareDoc: itm2Add.ShareDoc,
            //         AmtRef: amtRef,
            //         AmtDoc: amtDoc,

            //         // ER: (Eye === 'R' || Eye === 'B') ? 1 : 0,
            //         // EL: (Eye === 'L' || Eye === 'B') ? 1 : 0,                    
            //         // Qty: ((Eye === 'R' || Eye === 'B') ? 1 : 0) + ((Eye === 'L' || Eye === 'B') ? 1 : 0),
            //         ER: qtyER,
            //         EL: qtyEL,
            //         Qty: qty,

            //         Price: price,           //itm2Add.Price,

            //         RefProd: itm2Add,
            //     }]
        }

        // const { vamt, vqty } = UpdatedItemsList.reduce(
        //     (accum, crntValue) => {
        //         const { Qty, Price } = crntValue;
        //         accum.vamt += (Qty * Price)
        //         accum.vqty += Qty;
        //         return accum;
        //     }, { vamt: 0, vqty: 0 })

        // DELETE EMPTY QTYs .........................
        //if itmExisted.Qty-qty is ZERO then remove from list
        // UpdatedItemsList = UpdatedItemsList.filter((E) => (E.Qty >0 ))
        //.........................

        // AlertRec(UpdatedItemsList, 'FromDetail All DetailRecs processed [New UpdatedItemsList] ===  before calculation START of VAmt,  vAmtDoc, vAmtDoc+ ')

        const vamt = UpdatedItemsList.reduce((t, E) => t + (Number(E.Qty) * Number(E.Price)), 0)
        const vqty = UpdatedItemsList.reduce((t, E) => Number(t) + Number(E.Qty), 0)

        // const vAmtRef = UpdatedItemsList.reduce((t, E) => t + (Number(E.Qty) * Number(E.RefProd.ShareRef)), 0)
        // const vAmtDoc = UpdatedItemsList.reduce((t, E) => t + (Number(E.Qty) * Number(E.RefProd.ShareDoc)), 0)
        const vAmtRef = UpdatedItemsList.reduce((t, E) => t + (Number(E.AmtRef)), 0)
        const vAmtDoc = UpdatedItemsList.reduce((t, E) => t + (Number(E.AmtDoc)), 0)

        // // alert('add:' +vqty +' '+ typeof(vqty))
        // alert(` FromDetail final for Voucher Cart NEW-TOTAL Values: 
        //         TotRefShare-VAmtRef = ${vAmtRef} 
        //         TotDocShare-VAmtDoc = ${vAmtDoc} 
        //         Tot Qty = ${vqty} 
        //         Tot Amt = ${vamt} 
        //         `)

        // AlertRec(UpdatedItemsList, 'FromDetail <--[New UpdatedItemsList] ===  VAmt: ' + vamt + ' , VAmtRef: ' + vAmtRef + ' , VAmtDoc: ' + vAmtDoc + ' , VQtyTxt: ' + vqty)
        setVoucherCart(() => ({ ...VoucherCart, VItems: UpdatedItemsList, VAmt: vamt, VAmtPaid: vamt, VAmtRef: vAmtRef, VAmtDoc: vAmtDoc, VQtyTxt: vqty }))
        // setVoucherCart(() => ({ ...VoucherCart, VItems: UpdatedItemsList, VAmt: -9999, Desc: "Description is here", VNo: UpdatedItemsList.length }))
        // setProducts(p=>p=Products.map(E=>(E.Id===itm2Add.Id) ? { ...E, crntBal: E.crntBal - qty } : E))
    }

    const OrderItemDel = (itmId, qty) => {
        // E.PID/ is voucher Itm.Id,     crntItem.Id/is ORIGINAL Full Crnt Item
        // const itmExisted = VoucherCart.VItems.find((E) => E.PId === itmId)
        let UpdatedItemsList = []

        // alert('Qty: ' + itmExisted.Qty + '    qty: ' + qty)
        // AlertRec(crntItem, 'CrntItem for qty Deletion:')


        // if (itmExisted.Qty > qty) {
        //     UpdatedItemsList = VoucherCart.VItems.map((E) => (E.PId === itmId) ? { ...itmExisted, Qty: +itmExisted.Qty - qty } : E)
        // }
        // else {      //if itmExisted.Qty-qty is ZERO then remove from list
        UpdatedItemsList = VoucherCart.VItems.filter((E) => (E.PId !== itmId))
        // }

        // const { vamt, vqty } = UpdatedItemsList.reduce(
        //     (accum, crntValue) => {
        //         const { Qty, Price } = crntValue;
        //         accum.vamt += (Qty * Price)
        //         accum.vqty += Qty;
        //         return accum;
        //     }, { vamt: 0, vqty: 0 })

        // const vqty = UpdatedItemsList.reduce((t, E) => Number(t) + Number(E.Qty), 0)
        // const vamt = UpdatedItemsList.reduce((t, E) => t + (E.Qty * E.Price), 0)

        const vqty = UpdatedItemsList.reduce((t, E) => Number(t) + Number(E.Qty), 0)

        const vamtgross = UpdatedItemsList.reduce((t, E) => t + (E.Qty * E.Price), 0)
        const vamtmargin = UpdatedItemsList.reduce((t, E) => t + (E.Qty * E.Price) * (E.Margin / 100), 0)
        const vamt = UpdatedItemsList.reduce((t, E) => t + ((E.Qty * E.Price) - ((E.Qty * E.Price) * (E.Margin / 100))), 0)


        // alert('del:' +vqty +' '+ typeof(vqty))

        // const vAmtRef = UpdatedItemsList.reduce((t, E) => t + (Number(E.Qty) * Number(E.RefProd.ShareRef)), 0)
        // const vAmtDoc = UpdatedItemsList.reduce((t, E) => t + (Number(E.Qty) * Number(E.RefProd.ShareDoc)), 0)
        const vAmtRef = UpdatedItemsList.reduce((t, E) => t + (Number(E.AmtRef)), 0)
        const vAmtDoc = UpdatedItemsList.reduce((t, E) => t + (Number(E.AmtDoc)), 0)

        // alert('add:' +vqty +' '+ typeof(vqty))

        // AlertRec(UpdatedItemsList,'<--UpdatedItemsList ===  VAmt: '+vamt +' , VAmtRef: '+ vAmtRef+ ' , VAmtDoc: '+vAmtDoc+ ' , VQtyTxt: '+vqty)
        // setVoucherCart(() => ({ ...VoucherCart, VItems: UpdatedItemsList, VAmt: vamt, VAmtMargin: vamt * (10 / 100), VAmtPaid: vamt - (vamt * (10 / 100)), VAmtRef: vAmtRef, VAmtDoc: vAmtDoc, VQtyTxt: vqty }))

        setVoucherCart({
            ...VoucherCart,
            VItems: UpdatedItemsList,
            VQtyTxt: vqty,
            VAmt: vamt,
            VAmtPaid: vamt,
            VAmtGross: vamtgross,
            VAmtMargin: vamtmargin,
        })

        // setVoucherCart(() => ({ ...VoucherCart, VItems: UpdatedItemsList, VAmt: vamt, VQtyTxt: vqty }))
    }

    const OrderItemAdd_WorkingBest4mDetailVoucher = (crntItem, qty) => {
        // AlertRec(crntItem,'ORIGINAL Full Crnt Item')

        // if ((qty === undefined) || (+qty > crntItem.CrntBal)) return
        // in Purchase do not check prev qty
        if (qty === undefined) return       //no matter current balance is

        // E.PID/ is voucher Itm.Id,     crntItem.Id/is ORIGINAL Full Crnt Item
        const exist = VoucherCart.VItems.find((E) => E.PId === crntItem.Id)

        //alert('crntItem.Id: '+ crntItem.Id + '    existed: ' + exist)
        // AlertRec(crntItem, 'CrntItem:'+'crntItem.Id: '+ crntItem.Id + '    existed: ' + exist)

        let UpdatedItemsList = []
        if (exist) {

            // in Purchase do not check prev qty
            //if ((+qty + +exist.Qty) > crntItem.CrntBal) return

            UpdatedItemsList = VoucherCart.VItems.map((E) => (E.PId === crntItem.Id) ? { ...exist, Qty: +exist.Qty + qty } : E)
        }
        else {
            // UpdatedItemsList = [...VoucherCart.VItems, { ...crntItem, Qty: crntItem.QtyDef }]
            // UpdatedItemsList = [...VoucherCart.VItems, { ...crntItem, Qty: qty }]
            UpdatedItemsList = [...VoucherCart.VItems, { RefProd: crntItem, PId: crntItem.Id, Qty: qty, Unit: crntItem.Unit, Price: crntItem.Price, Title: crntItem.Title }]
        }

        // const vamt = UpdatedItemsList.reduce((t, E) => t + (Number(E.Qty) * Number(E.Price)), 0)
        // const vqty = UpdatedItemsList.reduce((t, E) => Number(t) + Number(E.Qty), 0)
        const { vamt, vqty } = UpdatedItemsList.reduce(
            (accum, crntElement) => {
                const { Qty, Price } = crntElement;
                accum.vamt += (Qty * Price)
                accum.vqty += Qty;
                return accum;
            }, { vamt: 0, vqty: 0 })



        setVoucherCart({ ...VoucherCart, VItems: UpdatedItemsList, VAmt: vamt, VQtyTxt: vqty, VAmtMargin: vamt * (10 / 100), VAmtPaid: vamt - (vamt * (10 / 100)) })
        // setVoucherCart(() => ({ ...VoucherCart, VItems: UpdatedItemsList, VAmt: -9999, Desc: "Description is here", VNo: UpdatedItemsList.length }))
        // setProducts(p=>p=Products.map(E=>(E.Id===crntItem.Id) ? { ...E, crntBal: E.crntBal - qty } : E))
    }

    const OrderItemAdd = (chkID, qty, itm2Add) => {
        //chkID is (Id when called from Menu or List of Items)
        //chkID is (PId when called from Voucher Detail Section/ItemsCart)

        // AlertRec(itm2Add,'ORIGINAL Full Crnt Item')
        //  AlertRec(itm2Add, 'Full Rec4Addition:' + 'chkID: '+ chkID + '  qty: ' + qty)

        // ==== in Purchase do not check prev qty
        // if ((qty === undefined) || (+qty > crntItem.CrntBal)) return
        if (qty === undefined) return       //no matter current balance is

        const exist = VoucherCart.VItems.find((E) => E.PId === chkID)
        if (exist && (+exist.Qty + qty < 0)) return

        // AlertRec(itm2Add, 'CrntItem:' + 'chkID: '+ chkID + '    existed: ' + exist)

        let UpdatedItemsList = []
        if (exist) {

            // in Purchase do not check prev qty
            //if ((+qty + +exist.Qty) > crntItem.CrntBal) return

            UpdatedItemsList = VoucherCart.VItems.map((E) => (E.PId === chkID)
                ? { ...exist, Qty: +exist.Qty + qty }
                : E)
        }
        else {
            // UpdatedItemsList = [...VoucherCart.VItems, { ...crntItem, Qty: crntItem.QtyDef }]
            // UpdatedItemsList = [...VoucherCart.VItems, { ...crntItem, Qty: qty }]
            UpdatedItemsList = [
                ...VoucherCart.VItems,
                { RefItem: itm2Add, PId: itm2Add.Id, Qty: qty, Unit: itm2Add.Unit, Price: itm2Add.Price, Title: itm2Add.Title, Margin: itm2Add.Margin, PackSize: itm2Add.PackSize, PackType: itm2Add.PackType }
            ]
        }

        //// const vamt = UpdatedItemsList.reduce((t, E) => t + (Number(E.Qty) * Number(E.Price)), 0)
        //// const vqty = UpdatedItemsList.reduce((t, E) => Number(t) + Number(E.Qty), 0)
        // const { vamt, vqty } = UpdatedItemsList.reduce(
        //     (accum, crntElementOfArray) => {
        //         const { Qty, Price } = crntElementOfArray;
        //         accum.vamt += (Qty * Price)
        //         accum.vqty += Qty;

        //         // accum.vmargin += (Qty * Price) *(10/100)

        //         return accum;
        //     }, { vamt: 0, vqty: 0 })

        const { vamt, vqty, vamtgross, vamtmargin } = UpdatedItemsList.reduce(
            (accum, crntElementOfArray) => {
                const { Qty, Price, Margin } = crntElementOfArray;

                accum.vamtgross += (Qty * Price)
                accum.vamtmargin += (Qty * Price) * (Margin / 100)
                accum.vamt += (Qty * Price) - ((Qty * Price) * (Margin / 100))
                accum.vqty += Qty;

                // accum.vmargin += (Qty * Price) *(10/100)

                return accum;
            }, { vamt: 0, vqty: 0, vamtgross: 0, vamtmargin: 0 })

        setVoucherCart({
            ...VoucherCart,
            VItems: UpdatedItemsList,
            VQtyTxt: vqty,
            VAmt: vamt,
            VAmtPaid: vamt,
            VAmtGross: vamtgross,
            VAmtMargin: vamtmargin,
        })
        // setVoucherCart(() => ({ ...VoucherCart, VItems: UpdatedItemsList, VAmt: -9999, Desc: "Description is here", VNo: UpdatedItemsList.length }))
        // setProducts(p=>p=Products.map(E=>(E.Id===crntItem.Id) ? { ...E, crntBal: E.crntBal - qty } : E))
    }


    const OrderItemDelAll = () => {
        // alert('Delete All is pressed...')
        setVoucherCart({ ...VoucherCart, VItems: [], PatId: 0, VAmt: 0, Desc: "", VQtyTxt: 0 })
    }


    // ==================[  Fn: Handle Inputs  ]=====================
    const HandleSubListItemClicked = (rec) => {
        // AlertRec(rec, 'Party Selected')
        setVoucherCart({ ...VoucherCart, TId: rec.Id, RefTrader: rec });
    }

    const HandleDefaultTrader = () => {
        // const temp = Trader.at(-1).Id
        const temp = Traders.at(0).Id
        // AlertRec(Trader, 'Setting Default Trader :' + temp)
        setVoucherCart({ ...VoucherCart, TId: temp })
        // setVoucherCart(() => ({ ...VoucherCart, PatId: '' }));
        return temp
    }

    // Handle Voucher-Header VNo, VDte etc
    const HandleInputsVoucherHeader = (e, FieldName = '') => {
        // AlertRec(e, 'OnChange of InputBox :'+ FieldName  )

        if (FieldName) {
            switch (FieldName) {
                //                // (e.target.value) ? { ...VoucherCart, VDte: e.target.value } : { ...VoucherCart, VDte: '' }
                // case 'VDte': setVoucherCart(() => ({ ...VoucherCart, VDte: _value })); break;
                // case 'VNo': setVoucherCart(() => ({ ...VoucherCart, VNo: _value })); break;
                case 'PatId': setVoucherCart(() => ({
                    ...VoucherCart,
                    PatId: Number(e.value),
                    RefPatient: _Patients.Data.find((E) => E.Id === e.value),
                    // PatIdLabel:_Patients.Data.find((E) => E.Id === e.value).Title.substr(0, e.label.indexOf(';'))
                    //PatIdLabel: e.label.substr(0, e.label.indexOf(';'))+'*'
                })); break;
                case 'TId': setVoucherCart(() => ({
                    ...VoucherCart,
                    TId: Number(e.value),
                    RefTrader: Traders.find((E) => E.Id === e.value)
                })); break;

                // case 'Desc': setVoucherCart(() => ({ ...VoucherCart, Desc: _value })); break;
                default:
                    // AlertRec(e,'e: from Select Type of Voucher')
                    setVoucherCart(() => ({ ...VoucherCart, [e.target.label]: e.target.value }))
                    break;
            }

        }
        else {
            // console.log('Input Done:', e.target.name, e.target.value);
            // alert(e.target.name + '  ' + e.target.value)
            // AlertRec(e.target, 'e.target')
            const _key = e.target.name;
            const _value = e.target.value;

            // setRec4M({ ...Rec4M, [e.target.name]: e.target.value });
            switch (_key) {
                // (e.target.value) ? { ...VoucherCart, VDte: e.target.value } : { ...VoucherCart, VDte: '' }
                case 'VDte': setVoucherCart(() => ({ ...VoucherCart, VDte: _value })); break;
                case 'VNo': setVoucherCart(() => ({ ...VoucherCart, VNo: Number(_value) })); break;
                // case 'PatId': setVoucherCart(() => ({ ...VoucherCart, PatId: Number(_value) })); break;
                // case 'DocRefId': setVoucherCart(() => ({ ...VoucherCart, DocRefId: Number(_value) })); break;
                // case 'DocDutyId': setVoucherCart(() => ({ ...VoucherCart, DocDutyId: Number(_value) })); break;
                case 'Desc': setVoucherCart(() => ({ ...VoucherCart, Desc: _value })); break;
                case 'Rem': setVoucherCart(() => ({ ...VoucherCart, Rem: _value })); break;
                case 'VType': setVoucherCart(() => ({ ...VoucherCart, VType: _value })); break;

                default:
                    // alert( [_key] + '  ' +  _value)
                    setVoucherCart(() => ({ ...VoucherCart, [_key]: _value }))
                    break;
            }

        }

    }


    const HandleInputsVoucherDetailNumberFormat = (crntItem, obj) => {

        const itmExisted = VoucherCart.VItems.find((E) => E.PId === crntItem.PId)
        let UpdatedItemsList = []

        // alert(` HandleInputsVoucherDetailNumberFormat: \n
        //         called by : ${obj.name}
        //         with Value: ${obj.value}

        //         TotRefShare-VAmtRef = ${VoucherCart.VAmtRef} 
        //         TotDocShare-VAmtDoc = ${VoucherCart.VAmtDoc} 
        //         `)




        // if (obj.value > 0) {
        //UpdatedItemsList = VoucherCart.VItems.map((E) => (E.PId === crntItem.PId) ? { ...itmExisted, [obj.name]: obj.value } : E)
        // }
        // else {          //Remove if amt is ZERO
        // UpdatedItemsList = VoucherCart.VItems.filter((E) => (E.PId !== crntItem.PId))
        // }


        //const amtRef = qty * itm2Add.ShareRef
        // const amtDoc = (VoucherCart.VType === '1001')
        //     ? VoucherCart.RefDocDuty.RefShare > 0
        //         ? (( obj.value *  itmExisted.Qty) * VoucherCart.RefDocDuty.RefShare) / 100
        //         :  itmExisted.Qty * crntItem.ShareDoc
        //     :   itmExisted.Qty * crntItem.ShareDoc

        if (obj.name === 'XPriceX') {
            UpdatedItemsList = VoucherCart.VItems.map((E) =>
                (E.PId === crntItem.PId)
                    ? {
                        ...itmExisted,
                        //[obj.name]: obj.value,
                        Price: obj.value,

                        //ShareRef: same as it is
                        //ShareDoc: amtDoc,
                        // AmtDoc: ((VoucherCart.VType === '1001') && VoucherCart.RefDocDuty.RefShare > 0)
                        //     ? ((obj.value * itmExisted.Qty) * VoucherCart.RefDocDuty.RefShare) / 100
                        //     // : itmExisted.Qty * crntItem.RefProd.ShareDoc
                        //     : itmExisted.Qty * itmExisted.RefProd.ShareDoc
                    }
                    : E
            )
        }
        else {            //obj.name = AmtDoc or AmtRef
            UpdatedItemsList = VoucherCart.VItems.map((E) => (E.PId === crntItem.PId) ? { ...itmExisted, [obj.name]: obj.value } : E)
        }

        // const { vamt, vqty } = UpdatedItemsList.reduce(
        //     (accum, crntValue) => {
        //         const { Qty, Price } = crntValue;
        //         accum.vamt += (Qty * Price)
        //         accum.vqty = Number(accum.vqty) + Number(Qty);
        //         alert('Qty:' + '[' + Qty + '] double is:[' + (Qty + Qty) + ' ]' + typeof (Qty) + ' & accum: ' + '[' + accum.vqty + '] type is:' + typeof (accum.vqty))
        //         return accum;
        //     }, { vamt: 0, vqty: 0 })

        // const vamt = UpdatedItemsList.reduce((t, E) => t + (E.Qty * E.Price), 0)
        // const vqty = UpdatedItemsList.reduce((t, E) => Number(t) + Number(E.Qty), 0)
        // // alert('InputDetail: qty:' +vqty +' '+ typeof(vqty)+'\nInputDetail: amt:' +vamt +' '+ typeof(vamt))

        const vqty = UpdatedItemsList.reduce((t, E) => Number(t) + Number(E.Qty), 0)

        const vamtgross = UpdatedItemsList.reduce((t, E) => t + (E.Qty * E.Price), 0)
        const vamtmargin = UpdatedItemsList.reduce((t, E) => t + (E.Qty * E.Price) * (E.Margin / 100), 0)
        const vamt = UpdatedItemsList.reduce((t, E) => t + ((E.Qty * E.Price) - ((E.Qty * E.Price) * (E.Margin / 100))), 0)


        // const vAmtRef = UpdatedItemsList.reduce((t, E) => t + (Number(E.Qty) * Number(E.RefProd.ShareRef)), 0)
        // const vAmtDoc = UpdatedItemsList.reduce((t, E) => t + (Number(E.Qty) * Number(E.RefProd.ShareDoc)), 0)
        const vAmtRef = UpdatedItemsList.reduce((t, E) => t + (Number(E.AmtRef)), 0)
        const vAmtDoc = UpdatedItemsList.reduce((t, E) => t + (Number(E.AmtDoc)), 0)

        // alert('add:' +vqty +' '+ typeof(vqty))
        // alert(` When price changed---  Voucher Cart Values: 
        //     TotRefShare=${vAmtRef} 
        //     TotDocShare=${vAmtDoc} 
        //     Tot Qty=${vamt} 
        //     Tot Amt=${vamt} 
        //     `)

        //setVoucherCart(() => ({ ...VoucherCart, VItems: UpdatedItemsList, VAmt: vamt, VQtyTxt: vqty }))
        // setVoucherCart(() => ({ ...VoucherCart, VItems: UpdatedItemsList, VAmt: vamt, VAmtPaid: vamt - (vamt * (10 / 100)), VAmtMargin: vamt * (10 / 100), VAmtRef: vAmtRef, VAmtDoc: vAmtDoc, VQtyTxt: vqty }))
        setVoucherCart({
            ...VoucherCart,
            VItems: UpdatedItemsList,
            VQtyTxt: vqty,
            VAmt: vamt,
            VAmtPaid: vamt,
            VAmtGross: vamtgross,
            VAmtMargin: vamtmargin,
        })

    }

    // Handle Voucher-Detail VItem Qty Price etc
    const HandleInputsVoucherDetail = (crntItem, e) => {
        const itmExisted = VoucherCart.VItems.find((E) => E.PId === crntItem.PId)

        let UpdatedItemsList = []
        if (itmExisted) {
            if (e.target.value > 0) {
                UpdatedItemsList = VoucherCart.VItems.map((E) => (E.PId === crntItem.PId) ? { ...itmExisted, [e.target.name]: e.target.value } : E)
            }
            else {
                UpdatedItemsList = VoucherCart.VItems.filter((E) => (E.PId !== crntItem.PId))
            }

            // const { vamt, vqty } = UpdatedItemsList.reduce(
            //     (accum, crntValue) => {
            //         const { Qty, Price } = crntValue;
            //         accum.vamt += (Qty * Price)
            //         accum.vqty = Number(accum.vqty) + Number(Qty);
            //         alert('Qty:' + '[' + Qty + '] double is:[' + (Qty + Qty) + ' ]' + typeof (Qty) + ' & accum: ' + '[' + accum.vqty + '] type is:' + typeof (accum.vqty))
            //         return accum;
            //     }, { vamt: 0, vqty: 0 })

            const vamt = UpdatedItemsList.reduce((t, E) => t + (E.Qty * E.Price), 0)
            const vqty = UpdatedItemsList.reduce((t, E) => Number(t) + Number(E.Qty), 0)
            // alert('InputDetail: qty:' +vqty +' '+ typeof(vqty)+'\nInputDetail: amt:' +vamt +' '+ typeof(vamt))

            setVoucherCart(() => ({ ...VoucherCart, VItems: UpdatedItemsList, VAmt: vamt, VQtyTxt: vqty }))
        }
    }
    // ==============================================================

    // const GetTot4mArray = (array, field) => {
    //     // const tot = array.reduce( (accum, E) => {    
    //     //     // alert(field + '['+ E[field]+ '] ['+ (E[field]+E[field]) +' ]' + typeof(E[field]) + '  accum: '+ '['+ accum+ '] ' + typeof(accum))
    //     //     accum = Number(accum) + Number(E[field]);         // accum += Number(E[field]);
    //     //         return (accum);
    //     //     }, 0)            
    //     // return tot

    //     return array.reduce((tot, E) => Number(tot) + Number(E[field]), 0)
    // }

    // ==============================================================
    //CLEAR Rec is clicked
    //   const HandleBtnClear = () => { alert('Clear pressed'); setRec4M(RecDefault) }
    // const HandleBtnClear = () => { alert('Clear pressed'); setNeed2Refresh(!Need2Refresh) }
    const HandleBtnReset = () => { setNeed2Refresh(p => !p) }

    // ==============================================================
    //CANCEL changes is clicked
    //   const HandleBtnCancel = () => { alert('Cancelled pressed'); setBtnEditClicked(false); setBtnAddnewClicked(false); setInputReadOnly(true); setRec4M(RecDefault) }
    const HandleBtnCancel = (Flag2Refresh) => {
        HandleBtnVoucherMode(VoucherMode, false, Flag2Refresh);
    }

    // ==============================================================
    //SAVE changes is clicked
    //   const HandleBtnSave = () => { setBtnEditClicked(false); setBtnAddnewClicked(false); setInputReadOnly(true); setRec4M(RecDefault) }
    const HandleBtnSave = () => {
        // AlertRec(VoucherCart, 'Saving Data is Proceeded.'); 
        switch (VoucherMode) {
            case 'Add': CallDotAPI2SaveAddNew(); break;
            case 'Edit': CallDotAPI2SaveUpdate(); break;
            default: break;
        }
    }

    // ==============================================================
    //DELETE is clicked
    const HandleBtnDelete = (btnStatus) => {
        // AlertRec(Rec4M, 'DELETE Record: Rec4M')

        CallDotAPI2Delete()
    }



    // =======================================================================
    // ==================[  Fns: DATABASE/ API Handling ]=====================
    // =======================================================================

    // ------------- AddNew/Create RECORD ----------------
    const CallDotAPI2SaveAddNew = async () => {

        // ------------- CREATE ADDNEW RECORD ----------------
        // AlertRec(VoucherCart, 'Rcvd Data for Addition')
        // AlertRec(_Cats, 'Cats Data in Addition ['+VoucherCart.VType+']')

        const { VID, VNo, VDte, VCat, VCat2, VType, TId, Desc, Rem, VQtyTxt, VAmt, VAmtGross, VAmtMargin, VAmtPaid, VAmtDoc, RecStatus, Priority, VItems, } = VoucherCart
        const { VCat: vcat, AccD, AccC, VCat2: vcat2, AccD2, AccC2, } = AccRec
        // AlertRec(AccRec, 'Data Ready to Send -  AccRec')
        // if (!AlertConfirm(VoucherCart, `new Date()====VDte:  newDte= ${new Date()} VDte=  ${VDte}   ===?  ${new Date()===VDte}  FreshTime: ${ VDte.setHours((new Date()).getHours(), (new Date()).getMinutes())}  ` )) return

        //-----------------------------------
        // DELETE EMPTY QTYs .........................
        //if itmExisted.Qty-qty is ZERO then remove from list
        if ((VoucherCart.VItems.filter(E => E.Qty <= 0)).length > 0) {
            toast.error('Invalid/Blank Quantity Observed. \nPlz check voucher entry. ', { theme: 'colored', autoClose: ToastWaitTime, })
            return
        }
        // DELETE EMPTY Price .........................
        //if itmExisted.Price is ZERO then remove from list
        if ((VoucherCart.VItems.filter(E => E.Price <= 0)).length > 0) {
            toast.error('Invalid/Blank Price Observed. \nPlz check voucher entry. ', { theme: 'colored', autoClose: ToastWaitTime, })
            return
        }
        //-----------------------------------

        // // if (VNo.trim() == '') {
        // //     toast.error('Voucher Number (VNo) is EMPTY. \nThis Number is only for Reference.\nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
        // //     return
        // // }// AlertRec(Trader, 'suppliers: PatId[' + PatId + '] ' + typeof (+PatId))

        // if (!VType || !_Cats.Data.find(s => s.Code === VType)) {
        //     //alert('VType is invalid. \nPlz check voucher entry. ' + [PatId]); return
        //     toast.error('Voucher Type is invalid. \nPlz check voucher entry. ' + '[ ' + VType + ' ]', { theme: 'colored', autoClose: ToastWaitTime, })
        //     return
        // }

        if (!TId || !Traders.find(s => s.Id === TId)) {
            //alert('Supplier is invalid. \nPlz check voucher entry. ' + [PatId]); return
            toast.error('Customer is invalid. \nPlz check voucher entry. ' + '[ ' + TId + ' ]', { theme: 'colored', autoClose: ToastWaitTime, })
            return
        }

        // let tmpDoc
        // // if (!DocDutyId || !(tmpDoc = _DocsDuty.Data.find(s => s.Id === DocDutyId))) {
        // if (!DocDutyId || !(_DocsDuty.Data.find(s => s.Id === DocDutyId))) {
        //     //alert('Supplier is invalid. \nPlz check voucher entry. ' + [PatId]); return
        //     toast.error('Center Consultant Doctor is invalid. \nPlz check voucher entry. ' + '[ ' + DocDutyId + ' ]', { theme: 'colored', autoClose: ToastWaitTime, })
        //     return
        // }
        // // else {      // Hold/Retain this Entry to be Default for  next Input
        // //     // AlertRec(tmpDoc, 'Must be DutyDoc Record here')
        // //     setLastEntryDutyDoc({ Id: tmpDoc.Id, Title: tmpDoc.Title })
        // // }


        // if (!DocRefId || !_DocsRef.Data.find(s => s.Id === DocRefId)) {
        //     //alert('Supplier is invalid. \nPlz check voucher entry. ' + [PatId]); return
        //     toast.error('Referral Doctor is invalid. \nPlz check voucher entry. ' + '[ ' + DocRefId + ' ]', { theme: 'colored', autoClose: ToastWaitTime, })
        //     return
        // }

        if (VAmt <= 0) {
            toast.error('Voucher Amount is NEGATIVE/ZERO. \nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
            return
        }

        // AlertRec(AccRec, 'Full AccRec')
        let AccDx = [], AccCx = [], AccDx2 = [], AccCx2 = []
        if (AccD.length <= 0 || AccC.length <= 0 || AccD2.length <= 0 || AccC2.length <= 0) {
            AlertRec(AccRec, `AccD/C is invalid. \nPlz check voucher entry.\n  AccD: ${AccD.length}  AccC: ${AccC.length} AccD2: ${AccD2.length} AccC2: ${AccC2.length}`)
            toast.error('AccD/C is invalid. \nPlz check voucher entry.', { theme: 'colored', autoClose: ToastWaitTime, })
            return
        }
        else {

            //  AccDx is here:> _AccRecs.Data.filter(E => E.Code === '11111' || E.Code === '51211')   //ASSETS-Cash & SalesDiscount
            //  AccCx is here:> _AccRecs.Data.filter(E => E.Code === '41011')   // 4101 REVENUE-Sales/Diagnostics/ShareConsultancy
            //---------------------------------------------------------------------
            // AccCx = AccC.find(E => { return (E.Code === '41011') ? { ...E, VAmt: VAmt, No: 'Nooooooo' } : E })
            AccDx = AccD.map(E => (E.Code === '11111') ? { ...E, VAmt: VAmt } : E)
            AccCx = AccC.map(E => (E.Code === '41211') ? { ...E, VAmt: VAmt } : E)   //REVENUE-Sales -Inventory Items
            // AlertRec(AccCx, 'AccCx Standard')
            //-----------------------------------------------------------------------------
            // AlertRec(AccDx, 'AccDx Standard: Befor Filtration- ' + VAmtPaid)
            //Remove ZERO Record ; if DISCOUNT is ZERO then Remove from ArrayList
            // AccDx = AccDx.filter(E => E.VAmt > 0)
            //AccDx = AccDx.filter(E => !(E.Code === '51211' && E.VAmt <= 0))      //only remove 
            // AlertRec(AccDx, 'AccDx Final to send in Database')

            //---------- 
            //  Acc/Payable if any
            //---------- 
            //  AccDx2 is here:> _AccRecs.Data.filter(E => E.Code === '51121' || E.Code === '51131')  //Consultancy & Referal Services Used
            //  AccCx2 is here:> _AccRecs.Data.filter(E => E.Code === '22121' || E.Code === '22131') //AccPayable  Consultant & Referral

            //'12511' )  //Purchase of Services/ ServicesAvailed
            // AccDx2 = AccD2.map(E => (E.Code === '12511') ? { ...E, VAmt: (amtRef + amtDoc) } : E)

            let AmtCOGS = 0
            for (let i = 0; i < VItems.length; i++) {
                // alert(i + ':   ' + VItems[i].RefItem.PPrice + ' qty:' + VItems[i].Qty + ' = ' + (VItems[i].Qty * VItems[i].RefItem.PPrice))
                AmtCOGS += (VItems[i].Qty * VItems[i].RefItem.PPrice);
            }

            AccDx2 = AccD2.map(E => (E.Code === '51111') ? { ...E, VAmt: AmtCOGS } : E)    //COGS -- SalesOfInventoryItems
            AccCx2 = AccC2.map(E => (E.Code === '12111') ? { ...E, VAmt: AmtCOGS } : E)    //Less: InventoryItems Purchased

            // //Remove ZERO Record
            // AccDx2 = AccDx2.filter(E => E.VAmt > 0)
            // AccCx2 = AccCx2.filter(E => E.VAmt > 0)
        }


        //  if (!AlertConfirm(AccDx2, 'AccDx2 ?: ' + process.env.REACT_APP_API_URL)) return


        // if (!AlertConfirm(VoucherCart, 'Proceed further ?: ' )) return
        const _VID = GetNewID()  //20chrs                //DateTimeStamp()

        //Table: TranM - { VID, VNo, VDte, VCat, PatId, Desc, Rem, VQtyTxt, VAmt, RefVID, RefVNo, RefVDte, RefVCat, RefVAmt, RecType, RecStatus, Priority }
        //Table: TranR - { VID, VNo, VDte, VCat, AccType, AccCode, Title, Desc, Rem, VAmt, }
        //Table: TranD - { Id/Auto, VID, VNo, VDte, VCat, PatId, PId, Unit, Qty, Price }

        // AlertRec(VoucherCart, 'Addition of Data: Ready to Send Rec')

        const _VDte = VDte.setHours((new Date()).getHours(), (new Date()).getMinutes())

        const Data2SendInDatabase =
        {
            VID: _VID,

            // One Record in TranM
            TranM: {
                VID: _VID,
                VDte: (new Date(VDte)).toDateString(),

                VNo: VNo,        //VNo.substr(0, 10),
                MRNo: '',
                VCat: _VCat,     //Capital Transaction Voucher
                VType: VType,

                // PatId: PatId,
                // DocRefId: DocRefId,
                // DocDutyId: DocDutyId,
                TId: TId,

                Desc: Desc.substr(0, 50),
                Rem: Rem.substr(0, 50),

                RefVID: '',
                RefVNo: '',
                RefVDte: '',
                RefVCat: '',

                VQtyTxt: VItems.reduce((t, E) => Number(t) + Number(E.Qty), 0) + '/' + VItems.length,
                VAmtRef: 0,
                VAmtDoc: Number(VAmtDoc),
                VAmtPaid: Number(VAmtPaid),

                VAmt: Number(VAmt),
                VAmtGross: Number(VAmtGross),
                VAmtMargin: Number(VAmtMargin),


                VItems: [],

                RecType: '',
                RecStatus: '',        //RecStatus.substr(0, 10),
                Priority: '',        //RecStatus.substr(0, 10),

                EntryBy: "xUSERx",
                EntryDte: new Date()
            },

            // Two Records in TranR
            // TranRs: [...AccD.map((E, I) => (
            TranRs: [...AccDx.map((E, I) => (
                {   //ID = Auto,
                    VID: _VID,
                    VDte: (new Date(VDte)).toDateString(),
                    VNo: VNo,
                    VCat: _VCat,

                    AccType: '0',
                    AccCode: E.Code,

                    Title: E.Title.substr(0, 50),
                    Desc: Desc.substr(0, 50),
                    Rem: Rem.substr(0, 50),

                    VAmt: Number(E.VAmt)            //VAmtPaid          //E.VAmt
                }
            ))
                ,
            // ...AccC.map((E, I) => (
            ...AccCx.map((E, I) => (
                {
                    //ID = Auto,
                    VID: _VID,
                    VDte: (new Date(VDte)).toDateString(),
                    VNo: VNo,
                    VCat: _VCat,

                    AccType: '1',
                    AccCode: E.Code,

                    Title: E.Title.substr(0, 50),
                    Desc: Desc.substr(0, 50),
                    Rem: Rem.substr(0, 50),

                    VAmt: Number(E.VAmt)
                }
            ))
            ],

            // Two Records in TranR2
            // TranRs: [...AccD.map((E, I) => (
            TranRs2: [...AccDx2.map((E, I) => (
                {   //ID = Auto,
                    VID: _VID,
                    VDte: (new Date(VDte)).toDateString(),
                    VNo: VNo,
                    VCat: _VCat2,

                    AccType: '0',
                    AccCode: E.Code,

                    Title: E.Title.substr(0, 50),
                    Desc: Desc.substr(0, 50),
                    Rem: Rem.substr(0, 50),

                    VAmt: Number(E.VAmt)            //VAmtPaid          //E.VAmt
                }
            ))
                ,
            // ...AccC.map((E, I) => (
            ...AccCx2.map((E, I) => (
                {
                    //ID = Auto,
                    VID: _VID,
                    VDte: (new Date(VDte)).toDateString(),
                    VNo: VNo,
                    VCat: _VCat2,

                    AccType: '1',
                    AccCode: E.Code,

                    Title: E.Title.substr(0, 50),
                    Desc: Desc.substr(0, 50),
                    Rem: Rem.substr(0, 50),

                    VAmt: Number(E.VAmt)
                }
            ))
            ],

            // Multiple Records in TranD
            TranDs: (VItems.map((E, I) => (
                {
                    //ID = Auto,
                    VID: _VID,
                    VDte: (new Date(VDte)).toDateString(),
                    VNo: VNo,
                    VCat: _VCat,

                    PatId: Number(TId),
                    // ER: Number(E.ER),  //0 or 1
                    // EL: Number(E.EL),  //0 or 1
                    PId: Number(E.PId),
                    Unit: E.Unit,
                    PackSize: E.PackSize,
                    PackType: E.PackType,

                    Qty: Number(E.Qty),
                    Price: Number(E.Price),
                    Margin: Number(E.Margin),

                    AmtGross: E.Qty * E.Price,
                    AmtMargin: (E.Qty * E.Price) * (E.Margin / 100),
                    Amt: (E.Qty * E.Price) - ((E.Qty * E.Price) * (E.Margin / 100)),

                    AmtRef: 0,
                    AmtDoc: 0
                }
            )))
        }

        // if (!AlertConfirm(Data2SendInDatabase, 'Add New Record ?: ' + process.env.REACT_APP_API_URL)) return

        //=====[   READY to send data in Database   ]========  
        //-------------------------------------------------------

        //=====[   PARTs-All 3 parts of 3/3  TranM   ]========    
        fetch(process.env.REACT_APP_API_URL + 'TrxSales', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(Data2SendInDatabase)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    //alert('Add-New Action Success-Result: ' + result);
                    // AlertRec(result)
                    toast.success('Record Saved Successfully: ', { theme: 'colored', autoClose: ToastWaitTime, position: "top-left" })
                    HandleBtnCancel(true)
                    // GetRecs() //Update Fresh Records
                }
                // , (error) => { alert('ERROR--- Add-New Action Result: ' + 'Failed'); })
                , (error) => { toast.error('ERROR--- Failed, Add-New Action Result: ' + error, { theme: 'colored', autoClose: ToastWaitTime, }) }
            )


        //     //History.push("/Home");

        // alert('Data is Sent in Database')
        // setNeed2Refresh(!Need2Refresh)
        HandleBtnCancel(true)
    }

    // ------------- Update RECORD ----------------
    // const CallAPI2SaveUpdate = async () => {
    //     alert('Now Updating Data in Database ')

    //     const { VID, VNo, VDte, VCat, PatId, Desc, Rem, VQtyTxt, VAmt, VRef, VItems, } = VoucherCart
    //     const { VCat: vcat, AccD, AccC } = AccRec
    //     // alert('VDate: '+(new Date(VDte)).toDateString())

    //     if (!Trader.find(s => s.Id === PatId)) {
    //         alert('Supplier is invalid. \nPlz check voucher entry.'); return
    //     }

    //     const Data2SendInDatabase = {
    //         TranM: {
    //             // "VDte": (new Date(VDte)).toDateString(),
    //             // "VNo": VNo,
    //             // "VCat": VCat,
    //             "Desc": Desc,
    //             "PatId": PatId,
    //             "VRem": VQtyTxt + '/' + VItems.length,
    //             "VQtyTxt": VQtyTxt,
    //             "VAmt": VAmt,

    //             "RefVDte": '',
    //             "RefVNo": '',
    //             "RefVCat": '',
    //             "RefVid": '',

    //             "EntryBy": "xUSERx",
    //             "EntryDte": new Date()
    //         },

    //         TranR: [...AccD.map((E, I) => (
    //             {
    //                 // Vid: 'id',
    //                 // VDte: (new Date(VDte)).toDateString(),
    //                 // VNo: VNo,
    //                 // VCat: VCat,
    //                 AccType: '0',
    //                 AccCode: E.Code,

    //                 Title: E.Title,
    //                 Desc: Desc,
    //                 Rem: Rem,

    //                 VAmt: VAmt
    //             }))
    //             ,
    //         ...AccC.map((E, I) => (
    //             {
    //                 // Vid: 'id',
    //                 // VDte: (new Date(VDte)).toDateString(),
    //                 // VNo: VNo,
    //                 // VCat: VCat,
    //                 AccType: '1',
    //                 AccCode: E.Code,

    //                 Title: E.Title,
    //                 Desc: Desc,
    //                 Rem: Rem,

    //                 VAmt: VAmt
    //             }))],

    //         TranD: (VItems.map((E, I) => (
    //             {
    //                 VID: VID,
    //                 VDte: (new Date(VDte)).toDateString(),
    //                 VNo: VNo,
    //                 VCat: VCat,
    //                 PatId: PatId,
    //                 PId: E.PId,

    //                 Qty: E.Qty,
    //                 Unit: E.Unit,
    //                 Price: E.Price

    //             })))
    //     }

    //     // console.log('Data2SendInDatabase:', Data2SendInDatabase)
    //     // AlertRec(Data2SendInDatabase, 'Data2SendInDatabase')
    //     // return

    //     //===================================================  
    //     //=====[   READY to Update/send data in Database   ]========  
    //     //===================================================  
    //     //=====[   PART-1/3  TranM   ]========  
    //     //   const res = await fetch('/api/staff', {
    //     const res = await fetch(`/api/TranPurchase/${VID}`, {
    //         method: 'PUT', headers: { 'Content-Type': "application/json" },
    //         body: JSON.stringify(Data2SendInDatabase)
    //     })

    //     const data = await res.json();
    //     // console.log('Saved Record Returned:', data);

    //     // if (res.status === 422 || !data) { window.alert("Transaction Invalid."); }
    //     // else {
    //     //     window.alert("Transaction Successful.");
    //     //     //History.push("/Home");
    //     // }

    //     alert('Data is Sent in Database')
    //     // setNeed2Refresh(!Need2Refresh)
    //     HandleBtnCancel(true)
    // }

    // ------------- Update RECORD ----------------
    const CallDotAPI2SaveUpdate = async () => {
        // AlertRec(VoucherCart, 'UPDATING of Data: Ready to Send Rec')
        const { VID, VNo, VDte, VCat, VCat2, VType, TId, Desc, Rem, VQtyTxt, VAmt, VAmtGross, VAmtMargin, VAmtPaid, VAmtDoc, RecStatus, Priority, VItems, } = VoucherCart
        const { VCat: vcat, AccD, AccC, VCat2: vcat2, AccD2, AccC2, } = AccRec
        //  AlertRec(AccRec, 'Data Ready to Send -  AccRec')

        //-----------------------------------
        // DELETE EMPTY QTYs .........................
        //if itmExisted.Qty-qty is ZERO then remove from list
        if ((VoucherCart.VItems.filter(E => E.Qty <= 0)).length > 0) {
            toast.error('Invalid/Blank Procedure Observed. \nPlz check voucher entry. ', { theme: 'colored', autoClose: ToastWaitTime, })
            return
        }
        // DELETE EMPTY Price .........................
        //if itmExisted.Price is ZERO then remove from list
        if ((VoucherCart.VItems.filter(E => E.Price <= 0)).length > 0) {
            toast.error('Invalid/Blank Price Observed. \nPlz check voucher entry. ', { theme: 'colored', autoClose: ToastWaitTime, })
            return
        }
        //-----------------------------------
        //-----------------------------------
        if (!TId || !Traders.find(s => s.Id === TId)) {
            //alert('Supplier is invalid. \nPlz check voucher entry. ' + [PatId]); return
            toast.error('Customer is invalid. \nPlz check voucher entry. ' + '[ ' + TId + ' ]', { theme: 'colored', autoClose: ToastWaitTime, })
            return
        }

        if (VAmt <= 0) {
            toast.error('Voucher Amount is ZERO. \nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
            return
        }

        let AccDx = [], AccCx = [], AccDx2 = [], AccCx2 = []
        if (AccD.length <= 0 || AccC.length <= 0 || AccD2.length <= 0 || AccC2.length <= 0) {
            // AlertRec(AccRec, 'AccD/C is invalid. \nPlz check voucher entry.'); return
            toast.error('AccD/C is invalid. \nPlz check voucher entry.', { theme: 'colored', autoClose: ToastWaitTime, })
            return
        }
        else {
            //  AccDx is here:> _AccRecs.Data.filter(E => E.Code === '11111' || E.Code === '51211')   //ASSETS-Cash & SalesDiscount
            //  AccCx is here:> _AccRecs.Data.filter(E => E.Code === '41011')   // 4101 REVENUE-Sales/Diagnostics/ShareConsultancy
            //---------------------------------------------------------------------
            // AccCx = AccC.find(E => { return (E.Code === '41011') ? { ...E, VAmt: VAmt, No: 'Nooooooo' } : E })
            AccDx = AccD.map(E => (E.Code === '11111') ? { ...E, VAmt: VAmt } : E)
            AccCx = AccC.map(E => (E.Code === '41211') ? { ...E, VAmt: VAmt } : E)
            // AlertRec(AccCx, 'AccCx Standard')
            //-----------------------------------------------------------------------------
            // AlertRec(AccDx, 'AccDx Standard: Befor Filtration- ' + VAmtPaid)
            //Remove ZERO Record ; if DISCOUNT is ZERO then Remove from ArrayList
            // AccDx = AccDx.filter(E => E.VAmt > 0)
            //AccDx = AccDx.filter(E => !(E.Code === '51211' && E.VAmt <= 0))      //only remove 
            // AlertRec(AccDx, 'AccDx Final to send in Database')

            //---------- 
            //  Acc/Payable if any
            //---------- 
            //  AccDx2 is here:> _AccRecs.Data.filter(E => E.Code === '51121' || E.Code === '51131')  //Consultancy & Referal Services Used
            //  AccCx2 is here:> _AccRecs.Data.filter(E => E.Code === '22121' || E.Code === '22131') //AccPayable  Consultant & Referral

            //'12511' )  //Purchase of Services/ ServicesAvailed
            // AccDx2 = AccD2.map(E => (E.Code === '12511') ? { ...E, VAmt: (amtRef + amtDoc) } : E)

            let AmtCOGS = 0
            for (let i = 0; i < VItems.length; i++) {
                // alert(i + ':   ' + VItems[i].RefItem.PPrice + ' qty:' + VItems[i].Qty + ' = ' + (VItems[i].Qty * VItems[i].RefItem.PPrice))
                AmtCOGS += (VItems[i].Qty * VItems[i].RefItem.PPrice);
            }

            AccDx2 = AccD2.map(E => (E.Code === '51111') ? { ...E, VAmt: AmtCOGS } : E)    //COGS -- SalesOfInventoryItems
            AccCx2 = AccC2.map(E => (E.Code === '12111') ? { ...E, VAmt: AmtCOGS } : E)    //InventoryItems Purchased

            // //Remove ZERO Record
            // AccDx2 = AccDx2.filter(E => E.VAmt > 0)
            // AccCx2 = AccCx2.filter(E => E.VAmt > 0)
        }


        // if (!AlertConfirm(AccDx2, 'AccDx2 ?: ' + process.env.REACT_APP_API_URL)) return


        const Data2SendInDatabase =
        {
            VID: VID,

            // One Record in TranM

            TranM: {
                VID: VID,
                VDte: (new Date(VDte)).toDateString(),
                VNo: VNo,        //VNo.substr(0, 10),
                // MRNo: PatId,
                VCat: _VCat,     //Capital Transaction Voucher
                // VType: VType,

                TId: TId,
                // PatId: PatId,
                // DocRefId: DocRefId,
                // DocDutyId: DocDutyId,

                Desc: Desc.substr(0, 50),
                Rem: Rem.substr(0, 50),

                RefVID: '',
                RefVNo: '',
                RefVDte: '',
                RefVCat: '',

                VQtyTxt: VItems.reduce((t, E) => Number(t) + Number(E.Qty), 0) + '/' + VItems.length,
                VAmtRef: 0,
                VAmtDoc: Number(VAmtDoc),
                VAmtPaid: Number(VAmtPaid),

                VAmt: Number(VAmt),
                VAmtGross: Number(VAmtGross),
                VAmtMargin: Number(VAmtMargin),


                VItems: [],

                RecType: '',
                RecStatus: '',        //RecStatus.substr(0, 10),
                Priority: '',        //RecStatus.substr(0, 10),

                EntryBy: "xUSERx",
                EntryDte: new Date()
            }
            ,

            // Two Records in TranR
            // TranRs: [...AccD.map((E, I) => (
            TranRs: [...AccDx.map((E, I) => (
                {   //ID = Auto,
                    VID: VID,
                    VDte: (new Date(VDte)).toDateString(),
                    VNo: VNo,
                    VCat: _VCat,

                    AccType: '0',
                    AccCode: E.Code,

                    Title: E.Title.substr(0, 50),
                    Desc: Desc.substr(0, 50),
                    Rem: Rem.substr(0, 50),

                    VAmt: Number(E.VAmt)            //VAmtPaid          //E.VAmt
                }
            ))
                ,
            // ...AccC.map((E, I) => (
            ...AccCx.map((E, I) => (
                {
                    //ID = Auto,
                    VID: VID,
                    VDte: (new Date(VDte)).toDateString(),
                    VNo: VNo,
                    VCat: _VCat,

                    AccType: '1',
                    AccCode: E.Code,

                    Title: E.Title.substr(0, 50),
                    Desc: Desc.substr(0, 50),
                    Rem: Rem.substr(0, 50),

                    VAmt: Number(E.VAmt)
                }
            ))
            ],

            // Two Records in TranR2
            // TranRs: [...AccD.map((E, I) => (
            TranRs2: [...AccDx2.map((E, I) => (
                {   //ID = Auto,
                    VID: VID,
                    VDte: (new Date(VDte)).toDateString(),
                    VNo: VNo,
                    VCat: _VCat2,

                    AccType: '0',
                    AccCode: E.Code,

                    Title: E.Title.substr(0, 50),
                    Desc: Desc.substr(0, 50),
                    Rem: Rem.substr(0, 50),

                    VAmt: Number(E.VAmt)            //VAmtPaid          //E.VAmt
                }
            ))
                ,
            // ...AccC.map((E, I) => (
            ...AccCx2.map((E, I) => (
                {
                    //ID = Auto,
                    VID: VID,
                    VDte: (new Date(VDte)).toDateString(),
                    VNo: VNo,
                    VCat: _VCat2,

                    AccType: '1',
                    AccCode: E.Code,

                    Title: E.Title.substr(0, 50),
                    Desc: Desc.substr(0, 50),
                    Rem: Rem.substr(0, 50),

                    VAmt: Number(E.VAmt)
                }
            ))
            ],


            // Multiple Records in TranD
            TranDs: (VItems.map((E, I) => (
                {
                    //ID = Auto,
                    VID: VID,
                    VDte: (new Date(VDte)).toDateString(),
                    VNo: VNo,
                    VCat: _VCat,

                    PatId: Number(TId),
                    // ER: Number(E.ER),  //0 or 1
                    // EL: Number(E.EL),  //0 or 1
                    PId: Number(E.PId),
                    Unit: E.Unit,
                    PackSize: E.PackSize,
                    PackType: E.PackType,

                    Qty: Number(E.Qty),
                    Price: Number(E.Price),
                    Margin: Number(E.Margin),

                    AmtGross: E.Qty * E.Price,
                    AmtMargin: (E.Qty * E.Price) * (E.Margin / 100),
                    Amt: (E.Qty * E.Price) - ((E.Qty * E.Price) * (E.Margin / 100)),

                    AmtRef: 0,
                    AmtDoc: 0
                }
            )))
        }


        // if (!AlertConfirm(Data2SendInDatabase, 'Add New Record ?: ' + process.env.REACT_APP_API_URL)) return

        //===================================================  
        //=====[   PARTs-3/3  TranM   ]========  
        fetch(process.env.REACT_APP_API_URL + `TrxSales/${VID}`, {
            method: 'PUT', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            // body: JSON.stringify({LocalId:101, LocalCode:Data2SendInDatabase})
            body: JSON.stringify(Data2SendInDatabase)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    //alert('UPDATE Action Success-Result: ' + result);
                    toast.success('Record Saved Successfully: ', { theme: 'colored', autoClose: ToastWaitTime, position: "top-left" })
                    HandleBtnCancel(true)
                    // GetRecs() //Update Fresh Records
                }
                // , (error) => { alert('ERROR--- Add-New Action Result: ' + 'Failed'); })
                , (error) => {
                    toast.error('ERROR--- Failed, Update/Edit Action Result: ' + error, { theme: 'colored', autoClose: ToastWaitTime, })
                    console.log('*******************************\nAPI FETCH-PUT ERROR--- Failed, Update/Edit Action Result: ', error)
                }
            )

        //alert('Data is Sent in Database')
        // setNeed2Refresh(!Need2Refresh)
        HandleBtnCancel(true)
    }


    // // ------------- AddNew/Create RECORD ----------------
    // const CallAPI2SaveAddNew = async () => {
    //     // ------------- CREATE ADDNEW RECORD ----------------
    //     // alert('Now Saving Data in Database')

    //     // AlertRec(VoucherCart, 'Data Ready to Send')
    //     const { VID, VNo, VDte, VCat, PatId, Desc, Rem, VQtyTxt, VAmt, VRef, VItems, } = VoucherCart
    //     const { VCat: vcat, AccD, AccC } = AccRec

    //     if (!Trader.find(s => s.Id === PatId)) {
    //         alert('Supplier is invalid. \nPlz check voucher entry.'); return
    //     }
    //     if (AccD.length <= 0 || AccD.length <= 0) {
    //         alert('AccD/C is invalid. \nPlz check voucher entry.'); return
    //     }
    //     const Data2SendInDatabase = {
    //         // One Record in TranM
    //         TranM: {
    //             "VDte": (new Date(VDte)).toDateString(),
    //             "VNo": VNo,
    //             "VCat": VCat,
    //             "Desc": Desc,
    //             "PatId": PatId,
    //             "VRem": VQtyTxt + '/' + VItems.length,
    //             "VQtyTxt": VQtyTxt,
    //             "VAmt": VAmt,

    //             "RefVDte": '',
    //             "RefVNo": '',
    //             "RefVCat": '',
    //             "RefVid": '',

    //             "EntryBy": "xUSERx",
    //             "EntryDte": new Date()
    //         },

    //         // Two Records in TranR
    //         TranR: [...AccD.map((E, I) => (
    //             {
    //                 Vid: 'id',
    //                 VDte: (new Date(VDte)).toDateString(),
    //                 VNo: VNo,
    //                 VCat: VCat,
    //                 AccType: '0',
    //                 AccCode: E.Code,
    //                 AccTitle: E.Title,
    //                 VAmt: VAmt
    //             }))
    //             ,
    //         ...AccC.map((E, I) => (
    //             {
    //                 Vid: 'id',
    //                 VDte: (new Date(VDte)).toDateString(),
    //                 VNo: VNo,
    //                 VCat: VCat,
    //                 AccType: '1',
    //                 AccCode: E.Code,
    //                 AccTitle: E.Title,
    //                 VAmt: VAmt
    //             }))],

    //         // Multiple Records in TranD
    //         TranD: (VItems.map((E, I) => (
    //             {
    //                 Vid: '...',
    //                 VDte: (new Date(VDte)).toDateString(),
    //                 VNo: VNo,
    //                 VCat: VCat,
    //                 Desc: Desc,
    //                 PatId: PatId,
    //                 Code: E.Code,
    //                 Qty: E.Qty,
    //                 Unit: E.Unit,
    //                 Price: E.Price,
    //                 VAmt: VAmt
    //             })))
    //     }

    //     // console.log('Data2SendInDatabase:', Data2SendInDatabase)
    //     // AlertRec(Data2SendInDatabase, 'Data2SendInDatabase')
    //     //  return


    //     //=====[   READY to send data in Database   ]========  
    //     //-------------------------------------------------------

    //     //=====[   PART-1/3  TranM   ]========  
    //     const res = await fetch('/api/TranPurchase', {
    //         method: 'POST', headers: { 'Content-Type': "application/json" },
    //         body: JSON.stringify(Data2SendInDatabase)
    //     })

    //     const data = await res.json();
    //     // const data = res.json();
    //     // console.log('Saved Record Returned:', data);

    //     // if (res.status === 422 || !data) { window.alert("Transaction Invalid."); }
    //     // else {
    //     //     window.alert("Transaction Successful.");
    //     //     //History.push("/Home");
    //     // }

    //     // alert('Data is Sent in Database')
    //     // setNeed2Refresh(!Need2Refresh)
    //     HandleBtnCancel(true)
    // }
    // // =======================================================================


    // --------------------------------------------------------------------------------------------------------------------
    // ------------- Delete  RECORD ----------------
    // --------------------------------------------------------------------------------------------------------------------
    const CallDotAPI2Delete = async () => {
        const { VID } = VoucherCart

        //=====[   READY to Delete data from Database   ]========  
        //-------------------------------------------------------
        //const res = await fetch(`/api/TranPurchase/${VID}`, { method: 'DELETE', headers: { 'Content-Type': "application/json" }        })
        fetch(process.env.REACT_APP_API_URL + `TrxSales/${VID}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(
                (result) => {                //alert('DELETE Action Success-Result: ' + result);
                    toast.warn('Record Deleted Successfully: ', { theme: 'colored', autoClose: ToastWaitTime, })
                    HandleBtnCancel(true)
                    // GetRecs() //Update Fresh Records
                }
                // , (error) => { alert('ERROR--- Add-New Action Result: ' + 'Failed'); })
                , (error) => { toast.error('ERROR--- Failed, Delete Action Result: ' + error, { theme: 'colored', autoClose: ToastWaitTime, }) }
            )

        // alert('Record is DELETED from Database')
        HandleBtnCancel(true)
    }

    const CallAPI2Delete = async () => {
        const { VID } = VoucherCart

        //=====[   READY to Delete data from Database   ]========  
        //-------------------------------------------------------
        //=====[   PART-1/3  TranM   ]========  
        const res = await fetch(`/api/TranPurchase/${VID}`, {
            method: 'DELETE', headers: { 'Content-Type': "application/json" }
        })
        // if (res.status === 422 || !data) { window.alert("Transaction Invalid."); }
        // else {  window.alert("Transaction Successful.");
        //     //History.push("/Home");
        // }

        // alert('Record is DELETED from Database')
        HandleBtnCancel(true)
    }

    // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
    return (<>
        {/* {AlertRec(VoucherCart, 'VoucherCart: Rcvd for Add/Edit')} */}
        {/* <div>
            <p>AccRecs Detail AccD: {AccRec.AccD?.length}</p>
            <p>AccRecs Detail AccC: {AccRec.AccC?.length}</p>
            <p>AccRecs Detail AccD2: {AccRec.AccD2?.length}</p>
            <p>AccRecs Detail AccC2: {AccRec.AccC2?.length}</p>
        </div> */}

        {/* ======== [ BILL-VOUCHER Both-(1&2) Parts] ======== */}
        {/* This div/card to group (Tabbed-Menu & Voucher+Sheet) works as background for both */}
        {/* <div className='card shadow flex flex-row gap-2 w-full' style={{ background: '#F3E5F5' }}>   */}
        <div className='flex flex-wrap md:flex-nowrap  gap-2 w-full ' >
            {/* <div> <h2>Transaction Bill <span className='me-5 text-end'>Voucher Items: {'x'}</span></h2>  </div> */}

            {/* ======================================================================== */}
            {/* ========= [Left-Part]  ITEMS TABS-MENU/LIST for Selection PART ========= */}
            {/* ======================================================================== */}

            {/* [  Left-Part  ]  ==> MAIN ITEMS CATALOG MENU COLUMN */}
            {/* <div className='m-1 p-1' style={{ flex: '2', background: '#e0e0e0', borderRadius: '5px' }}> */}
            {/* This div/card for background NAV PILLS of CATEGORIES */}
            <div className='m-0 p-0 flex flex-col gap-2 w-full' style={{ borderRadius: '5px' }}>
                {/* <span className='flex justify-start mb-2'>
                    <strong>Menu Items</strong></span> */}

                {/* {AlertRec(Categories, 'Cats  for  Ordered Items Sheet')} */}


                {/* OrderSheetItems, OrderItemAdd, Traders  */}
                {/* < Traders */}
                <div className='' style={{ maxHeight: '40vh', overflowY: 'auto' }}>

                    <AccordianCard key={'E.TId'} REC={''} setShowCustDetail={setShowCustDetail}>
                        <ListedBillParties
                            HandleListItemClicked={HandleSubListItemClicked}

                            Traders={Traders}
                            // Traders={_Patients.Data}
                            OrderSheet={VoucherCart}
                        />
                    </AccordianCard>

                </div>


                <ListedBillItemsMenu
                    // HandleListItemClicked

                    Products={Products}
                    OrderSheetItems={VoucherCart.VItems}

                    OrderItemAdd={OrderItemAdd}
                    //OrderItemAdd={OrderItemAdd4mMenu}
                    OrderItemDel={OrderItemDel} />

                {/* <TabbedBillMenuTabs
                    Categories={Categories}
                    Products={Products}
                    OrderSheetItems={VoucherCart.VItems}
                    OrderItemAdd={OrderItemAdd}
                    OrderItemDel={OrderItemDel} /> */}
            </div>

            {/* =================================================================== */}
            {/* ========= [Right-Part]   FULL VOUCHER - BASKET/CART PART ========= */}
            {/* =================================================================== */}
            {(VoucherCart.VItems.length < 0)
                ? null
                // : <div className='flex  m-1 p-2 flex-col text-start' style={{ flex: '1', background: '#e0e0e0', borderRadius: '5px' }}>
                :
                // style={{ background: '#ebecf0' }}

                // This card to group (Buttons Row & VoucherHeader & OrderSheet) works as background for both
                // <div className='card flex  m-0 p-0 ms-auto flex-col text-start' style={{ width: '650px', fontSize: '12px', background: '#e0e0e0', borderRadius: '5px' }}>
                <div className='card flex  m-0 p-0 ms-auto flex-col text-start w-full' style={{ fontSize: '12px', background: '#e0e0e0', borderRadius: '5px' }}>

                    {/* =================================================================================== */}
                    {/* =====[    Main Prg /CARD HEADDER start            ]===========================================  */}
                    {/* =================================================================================== */}
                    <div className='card-header flex gap-1 px-2  m-0 items-center ' style={{ background: '#bebebe' }}>
                        <span className='text-base md:text-xl font-bold'>Items Sales Voucher</span>

                        {/* <button className='btn btn-sm btn-info py-0 px-1  ms-auto' style={{ height: '25px' }} onClick={() => HandlePrinting()}>
            <span style={{ fontSize: 'smaller' }}>Print</span> <GrPrint />
          </button> */}


                        <button type="button" class="ms-auto py-0 px-2 flex justify-center items-center text-white text-center text-base font-semibold  bg-amber-500 hover:bg-amber-700 focus:ring-amber-500 focus:ring-offset-amber-200 transition ease-in duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
                            onClick={() => HandleBtnReset()}>
                            <span style={{ fontSize: 'smaller' }}>Reset Changes</span> <TbWiperWash className='ms-1' />
                        </button>


                        <button type="button" class="py-0 px-2 flex justify-center items-center text-white text-center text-base font-semibold  bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 transition ease-in duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
                            onClick={(e) => HandleBtnSave(e)}>
                            <span style={{ fontSize: 'smaller' }}>Save {(VoucherMode === 'Edit') ? 'Changes ' : 'Record'}</span> <FaSave className='ms-1' />
                        </button>


                        {(VoucherMode === 'Edit') &&
                            <button type="button" class="py-0 px-2 flex justify-center items-center text-white text-center text-base font-semibold  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 transition ease-in duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
                                onClick={() => setShowDeleteModal(true)}>
                                <span style={{ fontSize: 'smaller' }}>Delete Record</span> <FaTrashCan className='ms-1' />
                            </button>
                        }
                    </div>


                    {/* =================================================================================== */}
                    {/* =====[    Main Prg /CARD BODY start            ]===================================  */}
                    {/* =================================================================================== */}
                    <div className="card-body flex flex-col py-1 px-2 gap-2">
                        {/* {AlertRec(VoucherCart, 'VoucherCart')} */}
                        {/* For Input of Header Part of Voucher*/}
                        <TabbedBillVoucherHeader
                            VoucherCart={VoucherCart}
                            setVoucherCart={setVoucherCart}
                            HandleInputsVoucherHeader={HandleInputsVoucherHeader}
                            HandleDefaultTrader={HandleDefaultTrader}
                            Traders={Traders}
                            GetTot4mArray={GetTot4mArray}

                            ShowCustDetail={ShowCustDetail}
                            setShowCustDetail={setShowCustDetail}

                        />

                        {/* ========= [         VOUCHER Transaction Records/Rows PART       ============================== */}
                        {/* <Basket Products={Products} /> */}

                        {/* <div className='flex gap-2 w-full '>
                            <div style={{ width: '100%' }}> */}
                        {/* {AlertRec(VoucherCart.VItems, 'Ordered Items Sheet')} */}

                        {/* For Input of Detail Part of Voucher*/}
                        <TabbedBillVoucherDetail
                            OrderSheetItems={VoucherCart.VItems}
                            OrderItemDel={OrderItemDel}
                            // OrderItemAdd={OrderItemAdd4mDetail}
                            OrderItemAdd={OrderItemAdd}
                            HandleInputsVoucherDetailNumberFormat={HandleInputsVoucherDetailNumberFormat}
                        // HandleInputsVoucherDetail={HandleInputsVoucherDetail} 
                        />
                        {/* </div> */}

                        {/* {false && VoucherCart.VItems.length > 0 && */}
                        {/* {false && VoucherCart.VItems.length > 0 &&
                                // <div style={{ width: '170px' }}>
                                     <TabbedBillVoucherPaymentSection
                                        VoucherCart={VoucherCart}
                                        setVoucherCart={setVoucherCart}
                                    /> 

                                // </div>
                            } */}
                        {/* </div> */}
                    </div>
                </div>
            }
        </div >
        {/* END .Main-Prg */}




        {/* ==========Start===========  MODAL for Deletion =========================*/}
        {/*     MODAL for Deletion                                                  */}
        {/* ==========Start===========  MODAL for Deletion =========================*/}
        <MyCustomModal isOpen={ShowDeleteModal} onClose={() => setShowDeleteModal(false)} ShowCloseButton={true} >

            <div className="card w-full md:w-[600px] ">
                <div className="card-header h-14 px-2 flex  justify-between items-center bg-gradient-to-r from-red-700 ">
                    <div className='text-3xl'>Are You Sure To DELETE This Record ?</div>
                    {/* <button onClick={() => setShowDeleteModal(false)}>&times;</button> */}
                </div>

                <div className="card-body py-4 md:px-4 text-left w-full " style={{}}>


                    <div className='flex  w-full'>
                        <div className='flex flex-col ' style={{ width: '30%' }}>
                            <table><tbody>
                                <tr>
                                    {/* <th  style={{border: '1px solid black' }} >{Rec.PatId} </th> */}
                                    <th> <span >Date:  </span></th>
                                    <td> <span >{Moment(VoucherCart.VDte).format('DD MMM YY ddd')}  </span> </td>
                                </tr>

                                <tr>
                                    <th> <span >V No:  </span></th>
                                    <td> <span >{VoucherCart.VNo}   </span> </td>
                                </tr>

                            </tbody></table>
                        </div>

                        <div className='flex flex-col ' style={{ width: '40%' }}>
                            <table><tbody>
                                <tr>
                                    <th style={{ width: '40%' }} > <span >Supplier: </span></th>
                                    <td  >{VoucherCart.PatId} </td>
                                </tr>

                                <tr>
                                    <th> <span >Description:  </span></th>
                                    <td> <span >{VoucherCart.Desc} </span> </td>
                                </tr>

                            </tbody></table>
                        </div>

                        <div className='flex flex-col ' style={{ width: '30%' }}>
                            <table><tbody>
                                <tr>
                                    <th style={{ width: '60%' }} > <span >Items Count: </span></th>
                                    <td align="left" > <span  >
                                        {/* VoucherCart.VItems.reduce((accum, crntValue) => { accum += crntValue.Qty; return accum; }, 0) */}
                                        {GetTot4mArray(VoucherCart.VItems, 'Qty')} / {VoucherCart.VItems.length}  </span> </td>
                                </tr>

                                <tr>
                                    <th> <span >Amount: </span></th>
                                    <td align="left" > <span  >{VoucherCart.VAmt} </span> </td>
                                </tr>

                            </tbody></table>
                        </div>
                    </div>
                </div>

                <div className="card-footer h-14 px-2 flex gap-4  justify-center items-center bg-gradient-to-r from-teal-600 ">
                    <button className="p-2 bg-blue-600 text-white rounded" onClick={() => setShowDeleteModal(false)}>
                        No. Do Not Delete
                    </button>

                    <button className="p-2 bg-red-500 text-white rounded" onClick={() => { setShowDeleteModal(false); HandleBtnDelete(true) }}>
                        Delete This Record
                    </button>
                </div>
            </div>
        </MyCustomModal>
        {/* ===========END==========  MODAL for Deletion =========================*/}

        {/* ---------------------------- */}


    </>)
}

export default TabbedBillItems