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
import Modal4Del from '../Components/Modal4Del.jsx';
import TabbedBillMenuTabs from './TabbedBillMenuTabs.jsx'
// import TabbedBillVoucherDetail from './TabbedBillVoucherDetail.jsx'
import TabbedBillVoucherDetail from './TabbedBillVoucherDetail.jsx'
// import TabbedBillVoucher from '../Components/Tran/TabbedBillVoucher.jsx'

import { AlertConfirm, AlertRec, GetNewID } from '../../../../../StdLib'
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
import TabbedBillVoucherHeader from './TabbedBillVoucherHeader.jsx';

const _VCat = "3141"
const _PrgID = "3141"
const _PrgTitle = "Sales Receipt Transactions"

//Table: TranM - { VID, VNo, VDte, VCat, TId, Desc, Rem, VQtyTxt, VAmt, RefVID, RefVNo, RefVDte, RefVCat, RefVAmt, RecType, RecStatus, Priority }
//Table: TranR - { VID, VNo, VDte, VCat, AccType, AccCode, Title, Desc, Rem, VAmt, }
//Table: TranD - { Id/Auto, VID, VNo, VDte, VCat, TId, PId, Unit, Qty, Price }

//Table: Item - { Id/Auto, Code, Title, TitleU, Desc, Rem, CatCode, TId, PicURL, Unit, QtyDef, QtyInc, QtyStep, Price, PreBal, CrntBal, QtyMin, QtyMax, RecType, RecStatus, Priority, EntryBy, EntryDte
//Table: Category - { Code, Title, Desc, Rem, RecType, RecStatus, Priority, EntryBy, EntryDte}

//Table: AccRec - {Code, Title, Desc, Rem, PreBal, CrntBal, RecType, RecStatus, Priority, EntryBy, EntryDte}
//Table: Supplier - {Id/Auto, Code, RecType, RecStatus, Priority, Title, TitleU, Desc, Rem, Address, Phone, Contact1, ContactPh1, Contact2, ContactPh2, PicURL, PreBal, CrntBal, EntryBy, EntryDte}

//DEconstruct the Data from file
// const { Products } = Data
const RecDefault = {
    VID: '',
    VNo: '',
    VDte: new Date(),   //Moment(new Date()).format('DD MMM YY ddd'),
    VCat: _VCat,     //Capital Transaction Voucher

    TId: '',       //Trader -- one of CustomerOrSupplier/ConsumerOrVender/
    Desc: '',
    Rem: '',

    RefVID: '',
    RefVNo: '',
    RefVDte: '',
    RefVCat: '',

    VQtyTxt: '',
    VAmt: '',

    VItems: [],
}


const ToastWaitTime = 5000

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
const TabbedBillItems = ({ CrntRec, AccRec, VoucherMode, HandleBtnVoucherMode, Trader, Categories, Products }) => {

    // const { VItems, VDte, VNo, Desc, TId, VAmt, VQty } =iniRec
    const [Need2Refresh, setNeed2Refresh] = useState(false);

    const [VoucherCart, setVoucherCart] = useState(CrntRec ? CrntRec : RecDefault)
    // { VItems: [], VDte: new Date().toDateString(), VNo: 'xxx', VCat: '31', Desc: '', TId: 'SAB', VAmt: -9, VQty: -9 })
    // const [VoucherCart, setVoucherCart] = useState({ VItems:iniRec.VItems, VDte:iniRec.VDte, VNo:iniRec.VNo, Desc: '', TId: 'SAB', VAmt: -9, VQty: -9 })

    const [StateSupplier, setStateSupplier] = useState('');

    useEffect(() => {
        // if (!VoucherMode ) { alert('Empty VoucherMode- trying to return'); return }
        // console.log('Rcvd CrntRec', CrntRec)
        // DispRecInAlert(CrntRec,'Rcvd CrntRec')

        if (CrntRec) { setVoucherCart(() => CrntRec); }

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


    const OrderItemAdd = (itmId, qty, itm2Add) => {
        //AlertRec(itm2Add,'ORIGINAL Full with Crnt ItemId: '+itmId+ 'qty:'+ qty)

        // if ((qty === undefined) || (+qty > itm2Add.CrntBal)) return
        // in Purchase do not check prev qty
        if (qty === undefined) return       //no matter current balance is

        // E.PID/ is voucher Itm.Id,     itm2Add.Id/is ORIGINAL Full Crnt Item
        //const exist = VoucherCart.VItems.find((E) => E.PId === itm2Add.Id)
        const itmExisted = VoucherCart.VItems.find((E) => E.PId === itmId)

        // alert('itmId :'+itmId+ '    existed: ' + itmExisted)
        // AlertRec(itm2Add, 'itm2Add for qty addition:')

        let UpdatedItemsList = []
        if (itmExisted) {

            // in Purchase do not check prev qty
            //if ((+qty + +itmExisted.Qty) > itm2Add.CrntBal) return

            //UpdatedItemsList = VoucherCart.VItems.map((E) => (E.PId === itm2Add.Id) ? { ...itmExisted, Qty: +itmExisted.Qty + qty } : E)
            UpdatedItemsList = VoucherCart.VItems.map((E) => (E.PId === itmExisted.PId) ? { ...itmExisted, Qty: +itmExisted.Qty + qty } : E)
        }
        else {
            // UpdatedItemsList = [...VoucherCart.VItems, { ...itm2Add, Qty: itm2Add.QtyDef }]
            UpdatedItemsList = [...VoucherCart.VItems, { RefItem: itm2Add, Qty: qty, PId: itm2Add.Id, Unit: itm2Add.Unit, Price: itm2Add.Price }]
        }

        // const { vamt, vqty } = UpdatedItemsList.reduce(
        //     (accum, crntValue) => {
        //         const { Qty, Price } = crntValue;
        //         accum.vamt += (Qty * Price)
        //         accum.vqty += Qty;
        //         return accum;
        //     }, { vamt: 0, vqty: 0 })


        const vamt = UpdatedItemsList.reduce((t, E) => t + (E.Qty * E.Price), 0)
        const vqty = UpdatedItemsList.reduce((t, E) => Number(t) + Number(E.Qty), 0)
        // alert('add:' +vqty +' '+ typeof(vqty))

        setVoucherCart(() => ({ ...VoucherCart, VItems: UpdatedItemsList, VAmt: vamt, VQtyTxt: vqty }))
        // setVoucherCart(() => ({ ...VoucherCart, VItems: UpdatedItemsList, VAmt: -9999, Desc: "Description is here", VNo: UpdatedItemsList.length }))
        // setProducts(p=>p=Products.map(E=>(E.Id===itm2Add.Id) ? { ...E, crntBal: E.crntBal - qty } : E))
    }

    const OrderItemDel = (itmId, qty) => {
        // E.PID/ is voucher Itm.Id,     crntItem.Id/is ORIGINAL Full Crnt Item
        const itmExisted = VoucherCart.VItems.find((E) => E.PId === itmId)
        let UpdatedItemsList = []

        // alert('Qty: ' + itmExisted.Qty + '    qty: ' + qty)
        // AlertRec(crntItem, 'CrntItem for qty Deletion:')

        if (itmExisted.Qty > qty) {
            UpdatedItemsList = VoucherCart.VItems.map((E) => (E.PId === itmId) ? { ...itmExisted, Qty: +itmExisted.Qty - qty } : E)
        }
        else {      //if itmExisted.Qty-qty is ZERO then remove from list
            UpdatedItemsList = VoucherCart.VItems.filter((E) => (E.PId !== itmId))
        }

        // const { vamt, vqty } = UpdatedItemsList.reduce(
        //     (accum, crntValue) => {
        //         const { Qty, Price } = crntValue;
        //         accum.vamt += (Qty * Price)
        //         accum.vqty += Qty;
        //         return accum;
        //     }, { vamt: 0, vqty: 0 })

        const vamt = UpdatedItemsList.reduce((t, E) => t + (E.Qty * E.Price), 0)
        const vqty = UpdatedItemsList.reduce((t, E) => Number(t) + Number(E.Qty), 0)
        // alert('del:' +vqty +' '+ typeof(vqty))

        setVoucherCart(() => ({ ...VoucherCart, VItems: UpdatedItemsList, VAmt: vamt, VQtyTxt: vqty }))
    }

    const OrderItemAdd_OLD = (crntItem, qty) => {
        // AlertRec(crntItem,'ORIGINAL Full Crnt Item')

        // if ((qty === undefined) || (+qty > crntItem.CrntBal)) return
        // in Purchase do not check prev qty
        if (qty === undefined) return       //no matter current balance is

        // E.PID/ is voucher Itm.Id,     crntItem.Id/is ORIGINAL Full Crnt Item
        const exist = VoucherCart.VItems.find((E) => E.PId === crntItem.Id)

        // alert('crntItem.Id: '+ crntItem.Id + '    existed: ' + exist)
        // AlertRec(crntItem, 'CrntItem for qty addition:')

        let UpdatedItemsList = []
        if (exist) {

            // in Purchase do not check prev qty
            //if ((+qty + +exist.Qty) > crntItem.CrntBal) return

            UpdatedItemsList = VoucherCart.VItems.map((E) => (E.PId === crntItem.Id) ? { ...exist, Qty: +exist.Qty + qty } : E)
        }
        else {
            // UpdatedItemsList = [...VoucherCart.VItems, { ...crntItem, Qty: crntItem.QtyDef }]
            // UpdatedItemsList = [...VoucherCart.VItems, { ...crntItem, Qty: qty }]
            UpdatedItemsList = [...VoucherCart.VItems, { RefItem: crntItem, Qty: qty, PId: crntItem.Id, Unit: crntItem.Unit, Price: crntItem.Price, Title: crntItem.Title }]
        }

        const { vamt, vqty } = UpdatedItemsList.reduce(
            (accum, crntValue) => {
                const { Qty, Price } = crntValue;
                accum.vamt += (Qty * Price)
                accum.vqty += Qty;
                return accum;
            }, { vamt: 0, vqty: 0 })

        setVoucherCart({ ...VoucherCart, VItems: UpdatedItemsList, VAmt: vamt, VQtyTxt: vqty })
        // setVoucherCart(() => ({ ...VoucherCart, VItems: UpdatedItemsList, VAmt: -9999, Desc: "Description is here", VNo: UpdatedItemsList.length }))
        // setProducts(p=>p=Products.map(E=>(E.Id===crntItem.Id) ? { ...E, crntBal: E.crntBal - qty } : E))
    }


    const OrderItemDelAll = () => {
        // alert('Delete All is pressed...')
        setVoucherCart({ ...VoucherCart, VItems: [], TId: 0, VAmt: 0, Desc: "", VQtyTxt: 0 })
    }


    // ==================[  Fn: Handle Inputs  ]=====================
    const HandleDefaultTrader = () => {
        // const temp = Trader.at(-1).Id
        const temp = Trader.at(0).Id
        // AlertRec(Trader, 'Setting Default Trader :' + temp)
        setVoucherCart({ ...VoucherCart, TId: temp })
        // setVoucherCart(() => ({ ...VoucherCart, TId: '' }));
        return temp
    }

    // Handle Voucher-Header VNo, VDte etc
    const HandleInputsVoucherHeader = (e) => {
        // console.log('Input Done:', e.target.name, e.target.value);
        // alert(e.target.name + '  ' + e.target.value)
        const _key = e.target.name;
        const _value = e.target.value;

        // setRec4M({ ...Rec4M, [e.target.name]: e.target.value });
        switch (_key) {
            // (e.target.value) ? { ...VoucherCart, VDte: e.target.value } : { ...VoucherCart, VDte: '' }
            case 'VDte': setVoucherCart(() => ({ ...VoucherCart, VDte: _value })); break;
            case 'VNo': setVoucherCart(() => ({ ...VoucherCart, VNo: _value })); break;
            case 'TId': setVoucherCart(() => ({ ...VoucherCart, TId: Number(_value) })); break;
            case 'Desc': setVoucherCart(() => ({ ...VoucherCart, Desc: _value })); break;

            default:
                // setVoucherCart(() => ({ ...VoucherCart, VItems: UpdatedItemsList, VAmt: vamt, VQty: vqty }))
                break;
        }
    }


    const HandleInputsVoucherDetailNumberFormat = (crntItem, obj) => {
        const itmExisted = VoucherCart.VItems.find((E) => E.PId === crntItem.PId)

        let UpdatedItemsList = []
        if (itmExisted) {
            if (obj.value > 0) {
                UpdatedItemsList = VoucherCart.VItems.map((E) => (E.PId === crntItem.PId) ? { ...itmExisted, [obj.name]: obj.value } : E)
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

    const GetTot4mArray = (array, field) => {
        // const tot = array.reduce( (accum, E) => {    
        //     // alert(field + '['+ E[field]+ '] ['+ (E[field]+E[field]) +' ]' + typeof(E[field]) + '  accum: '+ '['+ accum+ '] ' + typeof(accum))
        //     accum = Number(accum) + Number(E[field]);         // accum += Number(E[field]);
        //         return (accum);
        //     }, 0)            
        // return tot

        return array.reduce((tot, E) => Number(tot) + Number(E[field]), 0)
    }

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
        // AlertRec(VoucherCart, 'Addition of Data: Ready to Send Rec')

        const { VID, VNo, VDte, VCat, TId, Desc, Rem, VQtyTxt, VAmt, RecStatus, Priority, VItems, } = VoucherCart
        const { VCat: vcat, AccD, AccC } = AccRec
        // AlertRec(AccRec, 'Data Ready to Send -  AccRec')

        if (VNo.trim() == '') {
            toast.error('Voucher Number (VNo) is EMPTY. \nThis Number is only for Reference.\nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
            return
        }// AlertRec(Trader, 'suppliers: TId[' + TId + '] ' + typeof (+TId))

        if (!Trader.find(s => s.Id === TId)) {
            //alert('Supplier is invalid. \nPlz check voucher entry. ' + [TId]); return
            toast.error('Supplier is invalid. \nPlz check voucher entry. ' + '[ ' + TId + ' ]', { theme: 'colored', autoClose: ToastWaitTime, })
            return
        }
        if (AccD.length <= 0 || AccD.length <= 0) {
            // alert('AccD/C is invalid. \nPlz check voucher entry.'); return
            toast.error('AccD/C is invalid. \nPlz check voucher entry.', { theme: 'colored', autoClose: ToastWaitTime, })
            return
        }
        if (VAmt <= 0) {
            toast.error('Voucher Amount is ZERO. \nEmpty Voucher is Not Acceptable.', { theme: 'colored', autoClose: ToastWaitTime, })
            return
        }

        const _VID = GetNewID()  //20chrs                //DateTimeStamp()

        //Table: TranM - { VID, VNo, VDte, VCat, TId, Desc, Rem, VQtyTxt, VAmt, RefVID, RefVNo, RefVDte, RefVCat, RefVAmt, RecType, RecStatus, Priority }
        //Table: TranR - { VID, VNo, VDte, VCat, AccType, AccCode, Title, Desc, Rem, VAmt, }
        //Table: TranD - { Id/Auto, VID, VNo, VDte, VCat, TId, PId, Unit, Qty, Price }
        // const Dat =
        // {
        //     "VID": "V01",
        //     "TranM": {
        //         "VID": "23022014033950919509",
        //         "VDte": "Mon Feb 20 2023",
        //         "VDte": "2023-02-13T14:24:17.951Z",
        //         "VNo": "VNo01",
        //         "VCat": "_VCat",

        //         "VQtyTxt": "VQtyTxt",
        //         "VAmt": 786
        //     },

        //     "TranDs": [{
        //         //Id:auto,
        //         "VID": "23022014033950919509",
        //         "VDte": "Mon Feb 20 2023",
        //         "VNo": "V01",
        //         "VCat": "_VCat",
        //         "TId": 9,
        //         "PId": 2008,
        //         "Unit": "KG        ",
        //         "Qty": 1,
        //         "Price": 1

        //     }]
        //     ,
        //     "TranRs": [
        //         {
        //             "VID": "23022014033950919509",
        //             "VDte": "Mon Feb 20 2023",
        //             "VNo": "V01",
        //             "VCat": "_VCat",
        //             "AccCode": "1311",
        //             "AccType": "0",
        //             "Desc": "",
        //             "Rem": "",
        //             "Title": "Inventory/Purchase                                ",
        //             "VAmt": 1
        //         },
        //         {
        //             "VID": "23022014033950919509",
        //             "VDte": "Mon Feb 20 2023",
        //             "VNo": "V01",
        //             "VCat": "_VCat",
        //             "AccCode": "2211",
        //             "AccType": "1",
        //             "Desc": "",
        //             "Rem": "",
        //             "Title": "Inventory/Purchase                                ",
        //             "VAmt": 1
        //         }]
        // }

        const Data2SendInDatabase =
        {
            "VID": _VID,

            // One Record in TranM
            "TranM": {
                "VID": _VID,
                "VDte": (new Date(VDte)).toDateString(),
                "VNo": VNo.substr(0, 10),
                "VCat": VCat.substr(0, 4),

                "TId": TId,
                "Desc": Desc.substr(0, 50),
                "Rem": Rem.substr(0, 50),

                "VQtyTxt": VItems.reduce((t, E) => Number(t) + Number(E.Qty), 0) + '/' + VItems.length,
                "VAmt": VAmt,

                "RefVID": '',
                "RefVDte": '',
                "RefVNo": '',
                "RefVCat": '',

                "RecType": '',
                "RecStatus": '',        //RecStatus.substr(0, 10),
                "Priority": '',        //RecStatus.substr(0, 10),

                "EntryBy": "xUSERx",
                "EntryDte": new Date()
            },

            // Two Records in TranR
            "TranRs": [...AccD.map((E, I) => (
                {
                    //ID = Auto,
                    "VID": _VID,
                    "VDte": (new Date(VDte)).toDateString(),
                    "VNo": VNo,
                    "VCat": VCat,

                    "AccType": '0',
                    "AccCode": E.Code,

                    "Title": E.Title.substr(0, 50),
                    "Desc": Desc.substr(0, 50),
                    "Rem": Rem.substr(0, 50),

                    "VAmt": VAmt
                }))
                ,
            ...AccC.map((E, I) => (
                {
                    //ID = Auto,
                    "VID": _VID,
                    "VDte": (new Date(VDte)).toDateString(),
                    "VNo": VNo,
                    "VCat": VCat,

                    "AccType": '1',
                    "AccCode": E.Code,

                    "Title": E.Title.substr(0, 50),
                    "Desc": Desc.substr(0, 50),
                    "Rem": Rem.substr(0, 50),

                    "VAmt": VAmt
                }))],

            // Multiple Records in TranD
            "TranDs": (VItems.map((E, I) => (
                {
                    //ID = Auto,
                    "VID": _VID,
                    "VDte": (new Date(VDte)).toDateString(),
                    "VNo": VNo,
                    "VCat": VCat,

                    "TId": TId,
                    "PId": E.PId,
                    "Unit": E.Unit,
                    "Qty": E.Qty,
                    "Price": E.Price
                }
            )))
        }

        //  if (!AlertConfirm(Data2SendInDatabase, 'Add New Record ?: ' + process.env.REACT_APP_API_URL)) return

        //=====[   READY to send data in Database   ]========  
        //-------------------------------------------------------

        //=====[   PARTs-All 3 parts of 3/3  TranM   ]========        
        fetch(process.env.REACT_APP_API_URL + 'TranPurchase', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(Data2SendInDatabase)
            // body: JSON.stringify(Dat)
            // body: JSON.stringify({"LocalId":101, "LocalCode":"Data2SendInDatabase"})

        })
            .then(res => res.json())
            .then(
                (result) => {
                    //alert('Add-New Action Success-Result: ' + result);
                    // AlertRec(result)
                    toast.success('Record Saved Successfully: ', { theme: 'colored', autoClose: ToastWaitTime,  position: "top-left" })
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

    //     const { VID, VNo, VDte, VCat, TId, Desc, Rem, VQtyTxt, VAmt, VRef, VItems, } = VoucherCart
    //     const { VCat: vcat, AccD, AccC } = AccRec
    //     // alert('VDate: '+(new Date(VDte)).toDateString())

    //     if (!Trader.find(s => s.Id === TId)) {
    //         alert('Supplier is invalid. \nPlz check voucher entry.'); return
    //     }

    //     const Data2SendInDatabase = {
    //         TranM: {
    //             // "VDte": (new Date(VDte)).toDateString(),
    //             // "VNo": VNo,
    //             // "VCat": VCat,
    //             "Desc": Desc,
    //             "TId": TId,
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
    //                 TId: TId,
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
        //AlertRec(VoucherCart, 'UPDATING of Data: Ready to Send Rec')

        const { VID, VNo, VDte, VCat, TId, Desc, Rem, VQtyTxt, VAmt, RecStatus, Priority, VItems, } = VoucherCart
        const { VCat: vcat, AccD, AccC } = AccRec
        // AlertRec(AccRec, 'Data Ready to Send -  AccRec')

        // AlertRec(Trader, 'suppliers: TId[' + TId + '] ' + typeof (+TId))
        if (!Trader.find(s => s.Id === TId)) {
            // alert('Supplier is invalid. \nPlz check voucher entry. ' + [TId]); return
            toast.error('Supplier is invalid. \nPlz check voucher entry. ' + '[ ' + TId + ' ]', { theme: 'colored', autoClose: ToastWaitTime, })
            return
        }
        if (AccD.length <= 0 || AccD.length <= 0) {
            // alert('AccD/C is invalid. \nPlz check voucher entry.'); return
            toast.error('AccD/C is invalid. \nPlz check voucher entry.', { theme: 'colored', autoClose: ToastWaitTime, })
            return
        }


        const Data2SendInDatabase =
        {
            "VID": VID,

            // One Record in TranM

            "TranM": {
                "VID": VID,
                "VDte": (new Date(VDte)).toDateString(),
                "VNo": VNo.substr(0, 10),
                "VCat": VCat.substr(0, 4),

                "TId": TId,
                "Desc": Desc.substr(0, 50),
                "Rem": Rem.substr(0, 50),

                "VQtyTxt": VItems.reduce((t, E) => Number(t) + Number(E.Qty), 0) + '/' + VItems.length,
                "VAmt": VAmt,

                "RefVID": '',
                "RefVDte": '',
                "RefVNo": '',
                "RefVCat": '',

                "RecType": '',
                "RecStatus": '',        //RecStatus.substr(0, 10),
                "Priority": '',        //RecStatus.substr(0, 10),

                "EntryBy": "xUSERx",
                "EntryDte": new Date()
            }
            ,

            // Two Records in TranR
            "TranRs": [...AccD.map((E, I) => (
                {
                    //ID = Auto,
                    "VID": VID,
                    "VDte": (new Date(VDte)).toDateString(),
                    "VNo": VNo.substr(0, 10),
                    "VCat": VCat.substr(0, 4),

                    "AccType": '0',
                    "AccCode": E.Code,

                    "Title": E.Title.substr(0, 50),
                    "Desc": Desc.substr(0, 50),
                    "Rem": Rem.substr(0, 50),

                    "VAmt": VAmt
                }))
                ,
            ...AccC.map((E, I) => (
                {
                    //ID = Auto,
                    "VID": VID,
                    "VDte": (new Date(VDte)).toDateString(),
                    "VNo": VNo.substr(0, 10),
                    "VCat": VCat.substr(0, 4),

                    "AccType": '1',
                    "AccCode": E.Code,

                    "Title": E.Title.substr(0, 50),
                    "Desc": Desc.substr(0, 50),
                    "Rem": Rem.substr(0, 50),

                    "VAmt": VAmt
                }))]
            ,

            // Multiple Records in TranD
            "TranDs": (VItems.map((E, I) => (
                {
                    //ID = Auto,
                    "VID": VID,
                    "VDte": (new Date(VDte)).toDateString(),
                    "VNo": VNo.substr(0, 10),
                    "VCat": VCat.substr(0, 4),

                    "TId": TId,
                    "PId": E.PId,
                    "Unit": E.Unit.substr(0, 10),
                    "Qty": E.Qty,
                    "Price": E.Price
                }
            )))
        }

        //  if (!AlertConfirm(Data2SendInDatabase, 'UPDATE This Record ?: ' + process.env.REACT_APP_API_URL)) return


        //===================================================  
        //=====[   READY to Update/send data in Database   ]========  
        //===================================================  
        //=====[   PARTs-3/3  TranM   ]========  
        fetch(process.env.REACT_APP_API_URL + `TranPurchase/${VID}`, {
            method: 'PUT', headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(Data2SendInDatabase)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    //alert('UPDATE Action Success-Result: ' + result);
                    toast.success('Record Saved Successfully: ', { theme: 'colored', autoClose: ToastWaitTime,  position: "top-left" })
                    HandleBtnCancel(true)
                    // GetRecs() //Update Fresh Records
                }
                // , (error) => { alert('ERROR--- Add-New Action Result: ' + 'Failed'); })
                , (error) => { toast.error('ERROR--- Failed, Add-New Action Result: ' + error, { theme: 'colored', autoClose: ToastWaitTime, }) }
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
    //     const { VID, VNo, VDte, VCat, TId, Desc, Rem, VQtyTxt, VAmt, VRef, VItems, } = VoucherCart
    //     const { VCat: vcat, AccD, AccC } = AccRec

    //     if (!Trader.find(s => s.Id === TId)) {
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
    //             "TId": TId,
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
    //                 TId: TId,
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
        fetch(process.env.REACT_APP_API_URL + `TranPurchase/${VID}`, { method: 'DELETE' })
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
        {/* ======== [ BILL-VOUCHER Both-(1&2) Parts] ======== */}
        {/* This div/card to group (Tabbed-Menu & Voucher+Sheet) works as background for both */}
        {/* <div className='card shadow d-flex flex-row gap-2 w-100' style={{ background: '#F3E5F5' }}>   */}
        <div className='d-flex flex-row gap-2 w-100' >
            {/* <div> <h2>Transaction Bill <span className='me-5 text-end'>Voucher Items: {'x'}</span></h2>  </div> */}

            {/* ======================================================================== */}
            {/* ========= [Left-Part]  ITEMS TABS-MENU/LIST for Selection PART ========= */}
            {/* ======================================================================== */}

            {/* [  Left-Part  ]  ==> MAIN ITEMS CATALOG MENU COLUMN */}
            {/* <div className='m-1 p-1' style={{ flex: '2', background: '#e0e0e0', borderRadius: '5px' }}> */}
            {/* This div/card for background NAV PILLS of CATEGORIES */}
            <div className='m-0 p-0' style={{ flex: '2', borderRadius: '5px' }}>
                {/* <span className='d-flex justify-content-start mb-2'>
                    <strong>Menu Items</strong></span> */}

                {/* {AlertRec(Categories, 'Cats  for  Ordered Items Sheet')} */}
                <TabbedBillMenuTabs
                    Categories={Categories}
                    Products={Products}
                    OrderSheetItems={VoucherCart.VItems}
                    OrderItemAdd={OrderItemAdd}
                    OrderItemDel={OrderItemDel} />
            </div>

            {/* =================================================================== */}
            {/* ========= [Right-Part]   FULL VOUCHER - BASKET/CART PART ========= */}
            {/* =================================================================== */}
            {(VoucherCart.VItems.length <= 0)
                ? null
                // : <div className='d-flex  m-1 p-2 flex-column text-start' style={{ flex: '1', background: '#e0e0e0', borderRadius: '5px' }}>
                :
                // style={{ background: '#ebecf0' }}

                // This card to group (Buttons Row & VoucherHeader & OrderSheet) works as background for both
                <div className='card d-flex  m-0 p-0 flex-column text-start' style={{ width: '650px', fontSize: '12px', background: '#e0e0e0', borderRadius: '5px' }}>

                    {/*  =================================================================================== */}
                    {/* =====[    Main Prg /CARD HEADDER start            ]===========================================  */}
                    {/* =================================================================================== */}

                    <div className='card-header d-flex gap-1 pt-0 pb-1 px-1 mb-1 justify-content-between ' style={{ background: '#bebebe' }}>
                        <span style={{ fontSize: 'small', lineHeight: '1' }} ><strong>Purchase <br />Voucher</strong></span>

                        {/* <button className='btn btn-sm btn-outline-secondary pt-0 ms-auto' style={{ height: '25px' }}
                                    onClick={() => HandleBtnClear() }>
                                    Empty <TbWiperWash className='mb-1' />
                                </button> */}
                        {/* <button className='btn btn-sm btn-warning pt-0  ms-auto' style={{ height: '25px' }}
                            onClick={() => OrderItemDelAll()}>
                            Clear All <TbWiperWash />
                        </button> */}


                        {/* <button className='btn btn-sm btn-warning pt-0  ms-auto' style={{ height: '25px' }} */}
                        <button className='btn btn-sm btn-warning py-0  px-1 ms-auto'
                            onClick={() => { HandleBtnReset() }}>
                            <span style={{ fontSize: 'smaller' }}>Reset Changes</span> <TbWiperWash />
                        </button>

                        <button className='btn btn-sm btn-success py-0 px-1'
                            onClick={(e) => { HandleBtnSave(e) }} type="submit" >
                            <span style={{ fontSize: 'smaller' }}>Save {(VoucherMode === 'Edit') ? 'Changes ' : 'Record'} </span> <FaSave className='mb-1' />
                        </button>
                        {(VoucherMode === 'Edit') &&

                            <button className='btn btn-sm btn-danger py-0 px-1'
                                data-bs-toggle="modal" data-bs-target="#Modal4Delete">
                                {/* onClick={() => { HandleBtnDelete(true) }}> */}
                                <span style={{ fontSize: 'smaller' }}>Delete Record </span> <FaUserSlash className='mb-1' />
                            </button>
                        }

                    </div>


                    {/* =================================================================================== */}
                    {/* =====[    Main Prg /CARD BODY start            ]===================================  */}
                    {/* =================================================================================== */}
                    <div className="card-body py-1 px-2">

                        {/* For Input of Header Part of Voucher*/}
                        <TabbedBillVoucherHeader
                            VoucherCart={VoucherCart}
                            setVoucherCart={setVoucherCart}
                            HandleInputsVoucherHeader={HandleInputsVoucherHeader}
                            HandleDefaultTrader={HandleDefaultTrader}
                            Trader={Trader}
                            GetTot4mArray={GetTot4mArray}
                        />


                        {/* ========= [         VOUCHER Transaction Records/Rows PART       ============================== */}
                        {/* <Basket Products={Products} /> */}
                        <div>
                            {/* {AlertRec(VoucherCart.VItems, 'Ordered Items Sheet')} */}

                            {/* For Input of Detail Part of Voucher*/}
                            <TabbedBillVoucherDetail
                                OrderSheetItems={VoucherCart.VItems}
                                OrderItemDel={OrderItemDel}
                                OrderItemAdd={OrderItemAdd}
                                HandleInputsVoucherDetailNumberFormat={HandleInputsVoucherDetailNumberFormat}
                            // HandleInputsVoucherDetail={HandleInputsVoucherDetail} 
                            />
                        </div>
                    </div>
                </div>
            }
        </div >
        {/* END .Main-Prg */}

        {/* ==========Start===========  MODAL for Deletion =========================*/}
        <div>
            {/* Button trigger modal */}
            {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal4Delete">
          Launch demo modal
        </button> */}


            {/* Modal */}
            <div className="modal fade" id="Modal4Delete" tabIndex={-1} aria-labelledby="Modal4DeleteLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-primary" id="Modal4DeleteLabel">Are You Sure To DELETE This Record ?</h5>
                            <button type="button" className="btn-close text-primary" data-bs-dismiss="modal" aria-label="Close" style={{ color: 'red' }} />
                        </div>
                        <div className="modal-body d-flex justify-content-center ">

                            <div className='d-flex  w-100'>
                                <div className='d-flex flex-column ' style={{ width: '30%' }}>
                                    <table><tbody>
                                        <tr>
                                            {/* <th  style={{border: '1px solid black' }} >{Rec.TId} </th> */}
                                            <th> <span >Date:  </span></th>
                                            <td> <span >{Moment(VoucherCart.VDte).format('DD MMM YY ddd')}  </span> </td>
                                        </tr>

                                        <tr>
                                            <th> <span >V No:  </span></th>
                                            <td> <span >{VoucherCart.VNo}   </span> </td>
                                        </tr>

                                    </tbody></table>
                                </div>

                                <div className='d-flex flex-column ' style={{ width: '40%' }}>
                                    <table><tbody>
                                        <tr>
                                            <th style={{ width: '40%' }} > <span >Supplier: </span></th>
                                            <td  >{VoucherCart.TId} </td>
                                        </tr>

                                        <tr>
                                            <th> <span >Description:  </span></th>
                                            <td> <span >{VoucherCart.Desc} </span> </td>
                                        </tr>

                                    </tbody></table>
                                </div>

                                <div className='d-flex flex-column ' style={{ width: '30%' }}>
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
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No. Do Not Delete</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => { HandleBtnDelete(true) }}>Yes! Remove It.</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        {/* ===========END==========  MODAL for Deletion =========================*/}

        <div className='d-hidden'><ToastContainer /></div>
    </>)
}

export default TabbedBillItems