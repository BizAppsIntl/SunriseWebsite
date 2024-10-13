import Moment from "moment";
import ReactDatePicker from "react-datepicker";
import NumberFormat from "react-number-format";
import Select from 'react-select'

import ImgMale from '../../../../ImagesAdminPanel/default/Male.png'
import ImgFemale from '../../../../ImagesAdminPanel/default/Female.png'
import ImgUser from '../../../../ImagesAdminPanel/default/Muffi.png'
import { useCtxMainContextHook } from "../../../../../CtxMain";
import { AlertRec } from "../../../../../StdLib";

import { FaSave, FaUserPlus, FaUserEdit, FaUsers, FaUserCog, FaUserSlash, FaFolder } from 'react-icons/fa'
// import EntryModal from "../../../Patients/EntryModal";

export default function TabbedBillVoucherPaymentSection(props) {
    const {
        VoucherCart,
        setVoucherCart,
    } = props

    const HandleInputsNumberFormat = (obj) => {
        //AlertRec(obj, obj)
        const amt = Number(obj.value)
        //Voucher Amount VAmt
        //setVoucherCart({ ...VoucherCart, [obj.name]: obj.value });

        switch (obj.name) {
            case 'VAmtPaid':
        
            AlertRec(obj, 'WARNING: VAmtPaid is about to change');

            setVoucherCart({
                    ...VoucherCart,
                    'VAmtPaid': amt,
                    'VAmtBal': VoucherCart.VAmt - amt,

                    'VAmtRef': VoucherCart.VItems.reduce((t, E) => Number(t) + Number(E.ShareRef), 0),

                    'VAmtDoc': VoucherCart.VItems.reduce((t, E) => Number(t) + Number(E.ShareDoc), 0)
                    // // if Doc Share is made on Total/Last paid-Amt
                    // 'VAmtDoc':
                    //     (VoucherCart.VType === '1001')
                    //         ? VoucherCart.RefDocDuty.RefShare > 0
                    //             ? (amt * VoucherCart.RefDocDuty.RefShare) / 100
                    //             : VoucherCart.VAmtDoc
                    //         : VoucherCart.VAmtDoc
                });

                break;

            case 'VAmt':
                setVoucherCart({ ...VoucherCart, 'VAmt': amt, 'VAmtBal': amt - VoucherCart.VAmtPaid });
                break;

            default:
                setVoucherCart({ ...VoucherCart, [obj.name]: amt });
                break;
        }
    }

    return (
        <>
            <div className='card p-2 d-flex flex-column gap-2 '>
                {/* <div style={{ flex: '1' }}>
                    <div ><strong>Procedures Count:</strong></div>
                    <div width='100%' className=' px-1 text-center fs-6 fw-bolder'>
                        {GetTot4mArray(VoucherCart.VItems, 'Qty')} / {VoucherCart.VItems.length}
                    </div>
                </div> */}

                {/* <div style={{ flex: '2' }}>
                    <div ><strong>Payment Remarks:</strong></div>
                    <div width='100%' className='  fw-bolder'>
                        <input type="text" value={VoucherCart.Rem}
                            name="Rem" id="Rem" style={{ width: '100%' }}
                            onChange={(e) => {
                                // console.log(e.target.name, e.target.value);
                                HandleInputsVoucherHeader(e)
                            }} />
                    </div>
                </div> */}

                {/*[     Total Amount     ]*/}
                {/* <div style={{ flex: '1' }}>
                    <div ><strong>Total Amount:</strong></div>
                    <div width='100%' className=' px-1 text-end fs-6 fw-bolder'>
                        <NumberFormat
                            value={VoucherCart.VAmt}
                            displayType={'text'}
                            thousandSeparator={true} thousandsGroupStyle="lakh" prefix={''}
                            decimalScale={2} />
                    </div>
                </div> */}

                {/* ---[ Input VAmount ]--- */}
                <div >  {/* <div className="input-group"> */}
                    <div className="form-floating w-100" >
                        {/* <input type="number" value={VAmt} className="form-control  text-end " name='VAmt' id="VAmt" placeholder="Father Name" readOnly={false}
                    onChange={(e) => HandleInputs(e)} onFocus={handleFocus} /> */}

                        <NumberFormat
                            value={VoucherCart.VAmt} name='VAmt' id="VAmt"
                            displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh"
                            decimalScale={2}

                            className=" form-control  text-end text-black "
                            style={{ fontSize: '18px', paddingTop: '20px' }}

                            onValueChange={(values) => { HandleInputsNumberFormat({ name: 'VAmt', value: values.value }) }}

                        />
                        <label htmlFor="VAmt"  >Total Payable:</label>
                    </div>
                </div>

                {/* ---[ Input VAmount ]--- */}
                <div >  {/* <div className="input-group"> */}
                    <div className="form-floating w-100" >
                        {/* <input type="number" value={VAmtBal className="form-control  text-end " name='VAmtBal' id="VAmtBal" placeholder="Father Name" readOnly={false}
                    onChange={(e) => HandleInputs(e)} onFocus={handleFocus} /> */}

                        <NumberFormat
                            value={VoucherCart.VAmtMargin} name='VAmtMargin' id="VAmtMargin"
                            displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh"
                            decimalScale={2}

                            className=" form-control  text-end"
                        // onValueChange={(values) => {
                        //     HandleInputsNumberFormat({ name: 'VAmtBal', value: values.value })

                        />
                        <label htmlFor="VAmtMargin"  >Balance:</label>
                    </div>
                </div>

                {/* ---[ Input VAmount ]--- */}
                <div >  {/* <div className="input-group"> */}
                    <div className="form-floating w-100" >
                        {/* <input type="number" value={VAmtPaid} className="form-control  text-end " name='VAmtPaid' id="VAmtPaid" placeholder="Father Name" readOnly={false}
                    onChange={(e) => HandleInputs(e)} onFocus={handleFocus} /> */}

                        <NumberFormat value={VoucherCart.VAmtPaid} name='VAmtPaid' id="VAmtPaid" thousandSeparator={true} thousandsGroupStyle="lakh"
                            // label={"1 FTE"}
                            // customInput={TextField}
                            // isNumericString={true}   //for value output is number value
                            // decimalScale={2}

                            // style={{border:'none' , outline: 'none'                  }}
                            className=" form-control  text-end text-primary"
                            style={{ fontWeight: 'bold', fontSize: '18px', paddingTop: '20px' }}
                            //onChange={(e) =>{ HandleInputs(e); console.log('**************\nVAmtPaid : ',VAmtPaid)}}
                            onValueChange={(values) => {
                                HandleInputsNumberFormat({ name: 'VAmtPaid', value: values.value })
                            }}
                        />

                        <label htmlFor="VAmtPaid"  >Received:</label>
                    </div>
                </div>

                {/* ---[ Input VAmount ]--- */}
                {/* <div > 
                    <div className="form-floating w-100" >

                        <NumberFormat
                            value={VoucherCart.VAmtBal} name='VAmtBal' id="VAmtBal"
                            displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh"
                            decimalScale={2}

                            className=" form-control  text-end"
                        // onValueChange={(values) => {
                        //     HandleInputsNumberFormat({ name: 'VAmtBal', value: values.value })

                        />
                        <label htmlFor="VAmtBal"  >Balance:</label>
                    </div>
                </div> */}

            </div>

        </>
    )
}
