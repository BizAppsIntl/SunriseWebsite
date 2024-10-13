import Moment from "moment";
import ReactDatePicker from "react-datepicker";
import NumberFormat from "react-number-format";
import Select from 'react-select'

import ImgMale from '../../../../ImagesAdminPanel/default/Male.png'
import ImgFemale from '../../../../ImagesAdminPanel/default/Female.png'
import ImgUser from '../../../../ImagesAdminPanel/default/Muffi.png'
import ImgDefault from '../AssetsLocal/Images/Customers.png'

import { useCtxMainContextHook } from "../../../../../CtxMain";
import { AlertRec } from "../../../../../StdLib";

import { FaSave, FaUserPlus, FaUserEdit, FaUsers, FaUserCog, FaUserSlash, FaFolder, FaRegCalendarAlt } from 'react-icons/fa'
// import EntryModal from "../../../Patients/EntryModal";
// import Manage from "../../../Patients/Manage";
import { useEffect, useState } from "react";
// import MySelect from "../../../../../Utils/MySelect";
import MyDropDownApp from "../../../../../Utils/MyDropDown/MyDropDown";
import { ImListNumbered } from "react-icons/im";
import { GrTextAlignFull } from "react-icons/gr";
import { TbCurrencyReal, TbListDetails, TbTextWrapDisabled } from "react-icons/tb";
import { SiElasticstack } from "react-icons/si";
import { IoBarcodeOutline } from "react-icons/io5";

export default function TabbedBillVoucherHeader(props) {
    const {
        VoucherCart,
        setVoucherCart,
        HandleInputsVoucherHeader,
        HandleDefaultTrader,
        Traders,
        GetTot4mArray,

        ShowCustDetail,
        setShowCustDetail

    } = props

    const { CtxMainState, CtxMainDispatch } = useCtxMainContextHook()
    const { _Procedures, _Patients, _DocsRef, _DocsDuty, _Cats } = CtxMainState

    const [Obj, setObj] = useState({ value: '', label: '' })
    // const [ShowCustDetail, setShowCustDetail] = useState(false)

    // useEffect(() => {
    // VoucherCart && setObj({ value: VoucherCart.TId })
    // }, [])




    // -------------------------------------------------------------------------------------------------



    // -------------------------------------------------------------------------------------------------

    const HandleInputsNumberFormat = (obj) => {
        //AlertRec(obj, obj)

        //Voucher Amount VAmt
        setVoucherCart({ ...VoucherCart, [obj.name]: obj.value });

    }

    const HandleCurrentTrader = (CurrentPatient) => {
        // AlertRec(CurrentPatient, 'Now Becomes CurrentPatient is *************************************************')
        setVoucherCart({ ...VoucherCart, TId: CurrentPatient.Id, RefTrader: CurrentPatient })
    }

    // // for REACT-SELECT
    // const customStyles = {
    //     control: base => ({
    //         ...base,
    //         height: 35,
    //         minHeight: 35
    //     })
    // };

    const HandleDefaultCat = () => {
        // const temp = Categories.at(-1).Id //last
        const temp = _Cats.Data.at(0).Code //first
        // AlertRec(Suppliers, 'Setting Default Suppliers :' + temp)
        setVoucherCart({ ...VoucherCart, VType: temp })
        // setOrderSheet(() => ({ ...OrderSheet, TId: '' }));
        return temp
    }




    // const CustomOptionWithImages =Traders.map((E, I) => { return ({ key: I, value: Number(E.Id), label: E.Title , ID: E.Id, city: E.City, phone: E.Phone }) })


    // const rec = (() => {
    //     // const { Id, Title, City, Phone } = Traders.find(E => E.TId === VoucherCart.TId) || {};
    //     // return Id ? { value: Id, label: Title, ID: Id, city: City, phone: Phone } : '';
    //     AlertRec(Traders, 'Traders ')
    //     const v = Traders.find(E => E.Id === Number(VoucherCart.TId))

    //     AlertRec(v, 'Found rec in Traders for ' + VoucherCart.TId)

    //     return v?.Id ? { value: v.Id, label: v.Title, ID: v.Id, city: v.City, phone: v.Phone } : 'null';
    // })()
    // AlertRec(rec, 'Setup rec for TId: ' + VoucherCart.TId)

    return (
        <>
            {/* {AlertRec(VoucherCart, 'VoucherCart')} */}
            <div className='flex flex-col gap-1 border '>

                {/* ---[ Input HEADER VNO VDTE ]--- */}
                <div className='card-header py-1 md:flex gap-3'
                // style={{ height: '60px', fontSize: '14px' }}
                >

                    <div className="flex md:block w-full md:w-[25%]">
                        <div className='flex'>
                            <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                                {/* <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg> */}
                                <ImListNumbered />
                            </span>
                            <div className="relative">
                                <input type="text" id="SNo" disabled className=" cursor-not-allowed block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder="" value={VoucherCart.VNo} maxLength={5}
                                    //   onChange={(e) => HandleInputs(e)} 
                                    onChange={(dte) => setVoucherCart((e) => ({ ...VoucherCart, VNo: e.target.value }))}
                                />
                                <label for="SNo" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                                    SNo
                                </label>
                            </div>
                        </div>

                        <div className='flex'>
                            <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                                {/* <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg> */}
                                <FaRegCalendarAlt />
                            </span>
                            <div className="relative">
                                {/* <input type="text" id="SNo" disabled className=" cursor-not-allowed block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder="" value={VoucherCart.VNo} maxLength={5}
                                    onChange={(dte) => setVoucherCart((e) => ({ ...VoucherCart, VNo: e.target.value }))}
                                /> */}
                                <ReactDatePicker className=" rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    // name="VDte" value={VoucherCart.VDte === ''
                                    //     // ? `${ (new Date()).getDate() } /${(new Date()).getMonth()+1}/${ (new Date()).getFullYear() } `
                                    //     ? `${ (new Date()).getDate() } ${ (new Date()).toDateString().substr(4, 1) } ${ (new Date()).getFullYear() } `
                                    //     : VoucherCart.VDte} dateFormat='d MMM yy' id="VDte"

                                    // selected={new Date((VoucherCart.VDte) ? VoucherCart.VDte : Date())}
                                    name="VDte" value={VoucherCart.VDte === ''
                                        ? Moment(VoucherCart.VDte).format('DD MMM YY, ddd')
                                        : Moment(VoucherCart.VDte).format('DD MMM YY, ddd')}
                                    // : VoucherCart.VDte} dateFormat='d MMM yy'
                                    // ? `${(new Date()).getDate()} /${(new Date()).getMonth() + 1}/${(new Date()).getFullYear()} `


                                    dateFormat='d MMM yy'
                                    selected={new Date((VoucherCart.VDte) ? VoucherCart.VDte : Date())}
                                    // readOnly={(VoucherMode === 'Edit') ? true : false} //; isClearable={true}   //This is only for X-ClearIcon
                                    readOnly={false}
                                    allowClear={true}        //; placeholderText="No Date is entered!"
                                    onChange={(dte) => setVoucherCart(() => ({ ...VoucherCart, VDte: dte }))}
                                />
                                <label for="SNo" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                                    Voucher Date
                                </label>
                            </div>
                        </div>

                    </div>

                    {/* Patient Profile */}
                    <div className="px-2 w-full md:w-[75%] border rounded-lg bg-white p-0 relative py-0 flex gap-1 flex-col justify-center"
                        onMouseEnter={e => setShowCustDetail(true)}
                        onMouseLeave={e => setShowCustDetail(false)}
                    >
                        {/* <div className='text-lg font-bold text-blue-600 ' style={{ marginTop: '-10px' }}>Customer's Profile</div> */}
                        {/* <div className='text-lg font-bold text-blue-600 top-[-4px] absolute' >Customer's Profile</div> */}
                        <div className='text-lg font-bold text-blue-600 leading-none ' >Customer's Profile</div>

                        <div className='flex justify-between items-center' style={{ fontSize: '14px' }}>

                            {/* ---[ BUTTON AddNew ]--- */}
                            {/* <div className='btn btn-sm btn-info py-0 px-1' style={{ height: '26px' }}
                                data-bs-toggle="modal" data-bs-target="#Modal4AddNewPatient">
                                <span style={{ fontSize: 'smaller' }}>Add New</span> <FaUserPlus className='mb-1' />
                            </div> */}




                            {/* ---[ Input Traders ]--- */}
                            <div className="flex gap-2  w-full items-end"
                            // style={{ height: '42px', width: '100%' }}
                            >
                                <div className="px-0 py-0 my-auto  w-[50px]" >
                                    <img alt="Default" className=" w-full"
                                        src={
                                            (VoucherCart?.RefTrader?.PicURL && VoucherCart?.RefTrader?.PicURL?.trim())
                                                ? process.env.REACT_APP_API_URL + `Traders/GetFile/${VoucherCart.RefTrader?.PicURL}`
                                                : ImgDefault
                                        }
                                    />
                                </div>

                                <div className="relative w-full border-red-100 border">
                                    {/* <input type="text" id="City" name="City" className="block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                      placeholder="" value={City} maxLength={30} onChange={(e) => HandleInputs(e)} /> */}

                                    <Select className=" rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        // defaultValue={VoucherCart.DocDutyId ? VoucherCart.DocDutyId : _DocsDuty.Data[0].Id}

                                        value={
                                            VoucherCart.TId
                                                // ? { value: VoucherCart.TId, label: VoucherCart?.RefTrader?.Title }
                                                // ?{const   E = options.find((option) => option.value === optionValue);
                                                // ? Traders.find (E => { if (E.value === VoucherCart.TId) return ({  value: Number(E.Id), label: E.Title , ID: E.Id, city: E.City, phone: E.Phone }) })

                                                // const traderDetails = Traders.find(({ TId }) => TId === 'T002') && 
                                                //  (({ Id, Title, City, Phone }) => ({ Id, Title, City, Phone }))(Traders.find(({ TId }) => TId === 'T002'));
                                                //? Traders.find(E => E.TId === VoucherCart.TId) && { value: E.Id, label: E.Title, ID: E.Id, city: E.City, phone: E.Phone }

                                                ? (() => {
                                                    const { Id, Title, City, Phone } = Traders.find(E => E.Id === Number(VoucherCart.TId)) || {};
                                                    return Id ? { value: Id, label: Title, ID: Id, city: City, phone: Phone } : '';
                                                    // AlertRec(Traders , 'Traders ')
                                                    // const v = Traders.find(E => E.Id === Number(VoucherCart.TId)) 

                                                    // AlertRec(v , 'Found rec in Traders for '+ VoucherCart.TId )

                                                    // return v?.Id ? { value: v.Id, label: v.Title, ID: v.Id, city: v.City, phone: v.Phone } : 'null';
                                                })()

                                                // : { value: _Patients.Data[0].Id, label: 'DefaultPatient: ' + _Patients.Data[0].Title }
                                                // : { value: '', label: '' }
                                                // :_Patients.Data[0].Id
                                                : ''
                                        }

                                        name="TId"
                                        placeholder="Select Distributor"
                                        // isClearable={true}
                                        // isRtl={true}

                                        // Custom Option component to display image and text in the dropdown
                                        // components={{ Option: CustomOptionWithImages }}
                                        components={{
                                            Option:
                                                ({ innerRef, innerProps, data }) => (
                                                    <div ref={innerRef} {...innerProps}
                                                        className="text-[11px] md:text-xs px-1 md:px-2 py-0 w-full flex  justify-between items-center z-50 hover:bg-gray-200"
                                                    >
                                                        {/* <img src={data.img} alt={data.label} className="w-4 h-4 object-cover rounded-full mr-2"                                                       /> */}
                                                        {/* <span className="w-[10%]">{innerProps.isSelected */}

                                                        {/* <span className="w-[10%]">{props.isSelected
                                                            ? (<img className="custom-option__img w-[16px]" src={'/assets/default/Male.png'} alt="" />)
                                                            : (<img className="custom-option__img w-[16px]" src={'/assets/default/Female.png'} alt="" />)}
                                                        </span> */}

                                                        {/* <span className="w-[20%]">{data.value}</span> */}

                                                        
                                                        <div className="w-[7%]  ">
                                                            <img alt={'.'} className="w-4 h-4 object-cover " 
                                        src={
                                            (data.img)
                                                ? process.env.REACT_APP_API_URL + `Traders/GetFile/${data.img}`
                                                : ImgDefault
                                        }

/>
                                                            </div>

                                                            <div className="md:w-[48%] w-[58%]  ">{data.label}</div>
                                                            <div className="hidden  w-[20%]  ">{data.phone}</div>
                                                            <div className="md:w-[20%] w-[30%]  ">{data.city}</div>
                                                            <div className="w-[5%]  ">{data.ID}</div>
                                                        </div>                                               
                                                )
                                        }}

                                        getOptionValue={(option) => option.value} // Use value for internal tracking

                                        getOptionLabel={(option) => {
                                            // Modify label as needed (e.g., adding "VIP" for certain customers)
                                            // return option.label.includes('1') ? `${option.label} (VIP)` : option.label;

                                            // return <div><img src={'/assets/p1.png'} height="30px" width="30px"/> Hello </div>
                                            return (
                                                <div className="flex items-center p-0 ">
                                                    {/* {AlertRec(option, "option")} */}
                                                    {/* <img src={option.img} height="30px" width="30px" /> */}
                                                    {/* <img src={option.img} className='w-4 h-4 border border-red-600' /> */}
                                                    {option.label}, {option.city}
                                                </div>

                                            )
                                        }}

                                        // styles={customStyles}  
                                        styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                background: '#fff',
                                                minHeight: '22px  !important',
                                                height: '26px',
                                                marginTop: '0px',
                                                marginBottom: '0px',

                                                // padding: '0.25rem', // Tailwind equivalent: 'p-1'
                                                padding: '0px',

                                                width: '100%',

                                                //boxShadow: state.isFocused ? null : null,
                                                // boxShadow: 'none',

                                                // borderColor: '#9e9e9e',
                                                lineHeight: '1',

                                                borderRadius: '0.375rem', // Tailwind equivalent: 'rounded-md'

                                                //   borderColor: state.isFocused ? '#3b82f6' : '#e5e7eb', // Tailwind: focus:ring-blue-500
                                                //   borderColor: state.isFocused ? 'red' : 'green', // Tailwind: focus:ring-blue-500
                                                borderColor: state.isFocused ? 'none' : 'none',
                                                // borderColor: 'white',
                                                // borderColor: 'none',

                                                //   boxShadow: state.isFocused ? '0 0 0 2px #3b82f6' : 'none', // Tailwind: focus:ring-blue-500
                                                boxShadow: state.isFocused ? 'none' : 'none', // Removes blue outline (ring)
                                                outline: 'none', // Ensures no outline shows
                                                // border: 'none',
                                                // border: state.isFocused ? '1.5px solid #60B3D1' : '1.5px solid #cbd5e1'                                            
                                                border: 'none',

                                                '&:hover': {
                                                    color: '#60B3D1'
                                                    // borderColor: '#3b82f6' // Tailwind hover effect
                                                    // borderColor: 'red' // Tailwind hover effect
                                                },

                                            }),

                                            valueContainer: (provided, state) => ({
                                                ...provided,
                                                minHeight: '22px  !important',
                                                height: '26px',
                                                lineHeight: '1',

                                                padding: '0px 6px   !important',
                                                // padding:'0 !important',
                                                // borderColor: 'white',
                                                border: 'none',
                                                boxShadow: 'none',   // Remove box shadow on the value container
                                            }),

                                            input: (provided) => ({
                                                ...provided,
                                                minHeight: '22px  !important',
                                                height: '26px',
                                                margin: '0px',
                                                padding: '0px',
                                                borderColor: 'white',

                                                lineHeight: '1',

                                                // border: '5px solid red',
                                                border: 'none',
                                                boxShadow: 'none',
                                                outline: 'none',
                                                "input:focus": {
                                                    boxShadow: "none",
                                                },
                                                '&:focus': {
                                                    boxShadow: 'none',
                                                    outline: 'none',
                                                },
                                            }),

                                            indicatorSeparator: state => ({
                                                ...state,
                                                // display: 'none',
                                                marginTop: '2px',
                                                marginBottom: '3px',
                                            }),
                                            indicatorsContainer: (provided, state) => ({
                                                ...provided,
                                                height: '22px',
                                            }),

                                            // option: (styles: any, state: any) => ({
                                            option: (styles, state) => ({
                                                ...styles,
                                                // color: state.isSelected ? '#FFF' : styles.color,
                                                backgroundColor: state.isSelected ? '#60B3D1' : styles.color,

                                                // borderBottom: '1px solid rgba(0, 0, 0, 0.125)',
                                                lineHeight: '1',
                                                border: 'none',

                                                '&:hover': {
                                                    color: '#FFF',
                                                    backgroundColor: '#60B3D1'
                                                }
                                            }),

                                            menuPortal: (base) => ({ ...base, zIndex: 9999 })

                                            // dropdownIndicator: (styles) => ({
                                            //     ...styles,
                                            //     paddingTop: 7,
                                            //     paddingBottom: 7,
                                            // }),
                                            // clearIndicator: (styles) => ({
                                            //     ...styles,
                                            //     paddingTop: 7,
                                            //     paddingBottom: 7,
                                            // }),

                                            // option: (styles: any, state: any) => ({
                                            //     ...styles,
                                            //     color: state.isSelected ? '#FFF' : styles.color,
                                            //     backgroundColor: state.isSelected ? '#60B3D1' : styles.color,
                                            //     borderBottom: '1px solid rgba(0, 0, 0, 0.125)',
                                            //     '&:hover': {
                                            //         color: '#FFF',
                                            //         backgroundColor: '#60B3D1'
                                            //     }
                                            // }),

                                            // input: (base: any) => ({
                                            //     ...base,
                                            //     'input:focus': {
                                            //         boxShadow: 'none',
                                            //         border: '1px solid #60B3D1'
                                            //     }
                                            // }),

                                        }}

                                        // filterOption={filterOptions} // Use the custom filter function
                                        filterOption={(option, inputValue) => {
                                            const { label, value, city, phone } = option.data;
                                            const lowerInput = inputValue.toLowerCase();

                                            // Search in label, value, and additionalInfo
                                            return (
                                                String(value).toLowerCase().includes(lowerInput) ||
                                                label.toLowerCase().includes(lowerInput) ||
                                                city?.toLowerCase().includes(lowerInput) ||
                                                phone?.toLowerCase().includes(lowerInput)
                                            );
                                        }}

                                        onChange={(e) => { HandleInputsVoucherHeader(e, 'TId') }}

                                        // options={OptionsWithImages}
                                        // options={Traders.map((E, I) => { return ({ key: I, value: Number(E.Id), label: E.Title + ';  ' + E.Id + ';  ' + E.City + ';  ' + E.Phone }) })}
                                        options={Traders.map((E, I) => { return ({ key: I, value: Number(E.Id), label: E.Title, ID: E.Id, city: E.City, phone: E.Phone, img: E.PicURL }) })}
                                    // components={{ Option: CustomOptionWithImages }}

                                    />
                                    <label for="TId" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                                        Customer</label>
                                </div>
                            </div>

                        </div>

                        {ShowCustDetail && <div className="flex text-center mt-2">
                            <div style={{ width: '15%' }}>Code<br /><span className=" text-sm font-bold" style={{ fontSize: '10px' }}>{VoucherCart.TId ? VoucherCart.RefTrader?.Code : '...'} </span></div>
                            <div style={{ width: '45%' }}>Address<br /><span className=" text-sm font-bold" style={{ fontSize: '10px' }}>{VoucherCart.TId ? VoucherCart.RefTrader?.Address : '...'} </span></div>
                            <div style={{ width: '20%' }}>Contact<br /><span className=" text-sm font-bold" style={{ fontSize: '10px' }}>{VoucherCart.TId ? VoucherCart.RefTrader?.Phone : '...'} </span></div>
                            <div style={{ width: '20%' }}>City<br /><span className=" text-sm font-bold" style={{ fontSize: '10px' }}>{VoucherCart.TId ? VoucherCart.RefTrader?.City : '...'} </span></div>
                        </div>
                        }

                    </div>
                </div>


                <div className="flex gap-2 flex-wrap md:flex-nowrap w-full">
                    {/* ---[ Input Desc ]--- */}
                    <div className='flex w-full'>
                        <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                            <GrTextAlignFull />
                        </span>
                        <div className="relative w-full">
                            <input type="text" id="Desc" name="Desc" className="block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder="" value={VoucherCart.Desc} maxLength={30}
                                //   onChange={(e) => HandleInputs(e)} />
                                onChange={(e) => HandleInputsVoucherHeader(e)} />

                            <label for="Desc" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                                Cargo/Shipping Detail</label>
                        </div>
                    </div>

                    {/* ---[ Input Rem ]--- */}
                    <div className='flex w-full'>
                        <span className="inline-flex items-center px-2  text-lg text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                            <TbTextWrapDisabled />
                        </span>
                        <div className="relative w-full">
                            <input type="text" id="Rem" name="Rem" className="block rounded-t-lg px-2.5 pb-0 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder="" value={VoucherCart.Rem} maxLength={30}
                                onChange={(e) => HandleInputsVoucherHeader(e)} />
                            <label for="Rem" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                                Purchase Order Detail</label>
                        </div>
                    </div>

                </div>

                {/* [End Input] ======================================================== */}

                <div className='m-0 p-0 grid grid-cols-2 md:grid-cols-4 gap-2'>

                    {/* ---[ Display Items Count ]--- */}
                    {/* <div className="card px-2 " style={{ width: '250px' }} > */}
                    <div className="card px-2 " >
                        {/* <div className=' font-bold text-blue-600' style={{ marginTop: '-10px' }}>Total Amount</div> */}
                        <div className=' font-bold text-info' >Consignment</div>
                        <div className=" text-center text-xl font-bold text-teal-600 " >{`${GetTot4mArray(VoucherCart.VItems, 'Qty')} / ${VoucherCart.VItems.length}`} </div>
                    </div>

                    <div className="card px-2 ">

                        {/* <div className=' font-bold text-blue-600' style={{ marginTop: '-10px' }}>Total Amount</div> */}
                        <div className=' font-bold text-blue-600' >Total Amount</div>
                        <NumberFormat value={VoucherCart.VAmt} name='VAmt' id="VAmt" thousandSeparator={true} thousandsGroupStyle="lakh"

                            //// label={"1 FTE"}
                            //// customInput={TextField}
                            //// isNumericString={true}   //for value output is number value
                            decimalScale={2}
                            readOnly
                            //// style={{border:'none' , outline: 'none'                  }}
                            className="h-6 px-0 text-lg text-end font-bold text-blue-600 border-none outline-none w-full"

                        ////onChange={(e) =>{ HandleInputs(e); console.log('**************\nVAmt : ',VAmt)}}
                        // onValueChange={(values) => {
                        //     HandleInputsNumberFormat({ name: 'VAmt', value: values.value })
                        // }}
                        />
                    </div>

                    <div className="card px-2 ">
                        {/* <div className=' font-bold text-blue-600' style={{ marginTop: '-10px' }}>Total Amount</div> */}
                        <div className=' font-bold text-success' >Total Margin</div>
                        <NumberFormat value={VoucherCart.VAmtMargin} name='VAmtMargin' id="VAmtMargin" thousandSeparator={true} thousandsGroupStyle="lakh"

                            //// label={"1 FTE"}
                            //// customInput={TextField}
                            //// isNumericString={true}   //for value output is number value
                            decimalScale={2}
                            readOnly
                            //// style={{border:'none' , outline: 'none'                  }}
                            className="h-6 px-0 text-lg text-end font-bold text-green-600 border-none outline-none w-full"

                        ////onChange={(e) =>{ HandleInputs(e); console.log('**************\nVAmt : ',VAmtMargin)}}
                        // onValueChange={(values) => {
                        //     HandleInputsNumberFormat({ name: 'VAmtMargin', value: values.value })
                        // }}
                        />
                    </div>

                    <div className="card px-2 ">
                        {/* <div className=' font-bold text-blue-600' style={{ marginTop: '-10px' }}>Total Amount</div> */}
                        <div className=' font-bold text-red-600' >Inv. Amount</div>
                        <NumberFormat value={VoucherCart.VAmtPaid} name='VAmtPaid' id="VAmtPaid" thousandSeparator={true} thousandsGroupStyle="lakh"

                            //// label={"1 FTE"}
                            //// customInput={TextField}
                            //// isNumericString={true}   //for value output is number value
                            decimalScale={2}
                            readOnly
                            //// style={{border:'none' , outline: 'none'                  }}
                            className="h-6 px-0 text-lg text-end font-bold text-red-600 border-none outline-none  w-full"

                        ////onChange={(e) =>{ HandleInputs(e); console.log('**************\nVAmt : ',VAmtPaid)}}
                        // onValueChange={(values) => {
                        //     HandleInputsNumberFormat({ name: 'VAmtPaid', value: values.value })
                        // }}
                        />
                    </div>


                </div>


            </div>

        </>
    )
}
