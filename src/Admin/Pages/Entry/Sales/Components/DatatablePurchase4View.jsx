import { useEffect, useState } from 'react'
import axios from 'axios'
import Moment from 'moment'


import DataTable from 'react-data-table-component'
import { AlertRec, Dte2YMD } from '../../../../../StdLib'

//Table: Item - { Id/Auto, Code, Title, TitleU, Desc, Rem, CatCode, TId, PicURL, Unit, QtyDef, QtyInc, QtyStep, Price, PreBal, CrntBal, QtyMin, QtyMax, RecType, RecStatus, Priority, EntryBy, EntryDte


export default function DatatablePurchase4View({SearchInput,  Data2Rpt }) {

    // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

    // const getCountries = async () => {
    //     try {
    //         const res = await axios.get("https://restcountries.com/v2/all")
    //         setRecsAll(res.data)
    //         setFilteredRec(res.data)
    //     }
    //     catch (err) { alert(err) }
    // }



    const GridCols = [
        // {
        //     name: 'Actions',
        //     cell: (r) =>
        //         <button className='btn btn-primary' onClick={() => alert(r.VID+' ' + r.TTitle+'  , ' + r.VAmt)}>
        //             edit
        //         </button>
        // },
        {
            name: 'SNo',
            selector: r => r.SNO,
            sortable: true,
            width: '50px',
            style: { fontWeight:'bold', color:'blue' }
        },
        {
            name: 'VDte',
            selector: r => Moment(new Date(r.TranM.VDte)).format('DD MMM, ddd'),
            sortable: true,
            width: '100px',
            // style: { margin: '0', padding: '0' }
        },
        {
            name: 'Bill #',
            selector: r => r.TranM.VNo,
            width: '50px',

            // style: { margin: '0', padding: '0' }
        },
        // {
        //     name: 'VID',
        //     // selector: r => <span>{r.Id} <img src={process.env.REACT_APP_API_URL + `Item/GetFile/${r.PicURL}`} width={25} height={25} /> </span>,
        //     selector: r => <span>{r.VID}  </span>,
        //     sortable: true,
        //     // style: { color: 'red', margin: '0', padding: '0' }
        // },
        {
            name: 'Logo',
            selector: r => <img src={process.env.REACT_APP_API_URL + `Supplier/GetFile/${r.TranM.RefTrader.PicURL}`} width={50} height={25} />,
            width: '70px',
            // style: { color: 'red', margin: '0', padding: '0' }
        },
        {
            name: 'Party',
            selector: r => r.TranM.RefTrader.Title,
            // style: { margin: '0', padding: '0' }
            // selector: r => <img src={r.flag} width={50} height={50} />
        },
        {
            name: 'Description',
            selector: r => r.TranM.Desc,
        },

        {
            name: 'Items Count',
            selector: r => r.TranM.VQtyTxt,
            width: '100px',
            // style: { margin: '0', padding: '0' }
        },
        {
            name: 'Amount',
            selector: r => r.TranM.VAmt,
            // cell: r => <div> <div style={{ fontWeight: 'bold' }}>{r.Unit}</div>@ {r.Price}</div>,
            width: '100px',
            style: { color: 'blue', display: 'flex', alignItems: 'center', justifyContent: 'end', paddingRight: '20px' }

        },

    ]

    // const exportData=() => {
    //     const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);

    //     return <DataTable title="Movie List" columns={columns} data={data} actions={actionsMemo} />;
    // }

    const conditionalRowStyles = [
        {
            when: row => row.Id > 3000,
            style: {
                backgroundColor: 'green',
                paddingTop: '0',
                marginTop: '0',
                lineHeight: '1',
                height: '10px',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        }
        ,
        // You can also pass a callback to style for additional customization
        {
            when: row => row.Id < 300,
            style: row => ({ backgroundColor: 'pink' }),
        },
    ];

    // "data" is MUST ********provides access to your row data
    //   const ExpandedComponent = ( {data}  ) => <pre> {data.TTitle} === r ---{JSON.stringify(data, null, 2)}</pre>;
    //   const ExpandedComponent = ( r ) => <pre> {r.data.TTitle} ---{JSON.stringify(r, null, 2)}</pre>;
    // GOOOOOOOOOOD4checking r:   const ExpandedComponent = ( r ) => <pre> {JSON.stringify(r, null, 2)}</pre>;
    const ExpandedComponent = (r) => <>

        <div className='d-flex justify-content-center '  >
            <div className='card shadow d-flex flex-col px-1 py-1 mb-2' style={{ width: '60%', fontSize: '12px', background: '#bebebe' }}>

            <table ><tbody>
                    {r.data.TranDs.map((E, I) => {
                        return <>
                            <tr key={I}>
                                <td width="3%" className='ps-0'> {I + 1}</td>
                                <td width="10%" className='ps-0'> {E.Id}</td>
                                {/* <td width="11%" ><img src={process.env.REACT_APP_API_URL + `Item/GetFile/${E.RefItem.PicURL}`} alt={E.RefItem.PicURL} width='40px' height='40px' /></td> */}
                                <td width="20%" >{E.RefItem.Title}</td>
                                <td width="12%" >{E.RefItem.TitleU}</td>
                                <td width="15%" >{E.RefItem.CTitle}</td>

                                {/* UNIT +  */}
                                <td width="10%"  className='text-end' >{E.Qty} {E.Unit} </td>

                                {/* PRICE +  */}
                                <td width="15%"  className='text-end' >@ Rs {E.Price}                    </td>

                                {/* AMOUNT +  */}
                                <td width="15%"  className='text-end' > {E.Qty * E.Price}            </td>
                            </tr>

                        </>
                    })}
                </tbody></table>
            </div>

        </div>
    </>


    //  Internally, customStyles will deep merges your customStyles with the default styling.
    const customStyles = {
        rows: {
            style: {
                minHeight: '25px', // override the row height
                paddingTop: '0',
                paddingBottom: '0',
                marginTop: '5px',
                lineHeight: '1'
            },
        },
        headRow: {
            style: {
                minHeight: '32px',
                borderBottomWidth: '1px',
                borderBottomStyle: 'solid',
                backgroundColor:'#ebecf0'
            },
            denseStyle: {
                minHeight: '32px',
            },
        },

        headCells: {
            style: {
                paddingLeft: '5px', // override the cell padding for head cells
                paddingRight: '5px',
                // lineHeight: '1',
                fontWeight: 'bolder',
                color: 'blue'

            },
        },
        cells: {
            style: {
                paddingLeft: '5px', // override the cell padding for data cells
                paddingRight: '5px',
                paddingTop: '0',
                paddingBottom: '0',
                lineHeight: '1',
                margin: '0'
            },
        },
    };

    // const rowPreExpanded = row => row.defaultExpanded = true     //auto open detail
    const rowPreExpanded = row => row.defaultExpanded = false       //Don't auto open detail

    return (
        <>
{/* {AlertRec(RecsGrouped, '\n\n\n\nRecsGrouped')} */}

            <DataTable
                // title={'Items list'}
                noHeader
                columns={GridCols}
                // data={FilteredRec}
                data={Data2Rpt}
                conditionalRowStyles={conditionalRowStyles}
                customStyles={customStyles}

                // data={Rec}
                // pagination
                // paginationPerPage={15}
                // paginationRowsPerPageOptions={[15, 20, 25, 30, 50]}

                fixedHeader
                fixedHeaderScrollHeight='500px'
                // selectableRows
                // selectableRowsHighlight
                highlightOnHover
                // actions={<button className='btn btn-info'>Export</button>}

                // dense
                //   for filtering enable subheader first
                // subHeader
                // subHeaderComponent={
                //     <input type='text' placeholder={'Search'}
                //         className="form-control w-25"
                //         value={SearchTxt}
                //         onChange={(e) => setSearchTxt(e.target.value)}
                //     />
                // }
                // subHeaderAlign='center'

                // expandableRows
                // // expandableRowExpanded={row => row.defaultExpanded = true}
                // expandableRowExpanded={rowPreExpanded}
                // expandableRowsComponent={ExpandedComponent}

                // // onRowClicked={(row) => setCurrentRow(row)}   //const onRowClicked = (row, event) => { onMeetingTitleClick(event, row.id); };
                // expandOnRowClicked


            // noHeader
            pagination
            //paginationComponent={CustomPagination}
            paginationPerPage={12}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            // className={dataTableStyles}
            // columns={columns}
            // noDataComponent={<img src={EmptyState}/>}
            // progressPending={spinner}
            // paginationDefaultPage={currentPage}
            // progressComponent={<Spinner color="primary" size="md" className="justify-self-center align-self-center"/>}
            // conditionalRowStyles={customDisabledStyle ? customDisabledStyle : disabledStyle}
            // sortIcon={<ChevronDown size={10} />}
            // data={dataToRender()}                

            />
        </>
    )
}


