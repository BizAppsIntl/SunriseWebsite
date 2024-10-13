import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import DataTable from 'react-data-table-component'



const DatatableItems = () => {
    const [Rec, setRec] = useState([])
    const [FilteredRec, setFilteredRec] = useState([])
    const [SearchTxt, setSearchTxt] = useState('')

    

    const getCountries = async () => {
        try {
            const res = await axios.get("https://restcountries.com/v2/all")
            setRec(res.data)
            setFilteredRec(res.data)
        }
        catch (err) { alert(err) }
    }

    useEffect(() => {
        getCountries()
    }, [])

    useEffect(() => {
        const result = Rec.filter (itm => {
            return itm.name.toLowerCase().match (SearchTxt.toLocaleLowerCase())
        })
        setFilteredRec(result)

    }, [SearchTxt])

    const cols = [
        {
            name: 'Cournty Names',
            selector: r => r.name,
            sortable: true,
        },
        {
            name: 'Capital Names',
            selector: r => r.capital
        },
        {
            name: 'Flags',
            selector: r => <img src={r.flag} width={50} height={50} />
        },
        {
            name: 'Actions',
            cell: (r) =>
                <button className='btn btn-primary' onClick={() => alert(r.name + '   ' + r.capital)}>
                    edit
                </button>
        }

    ]


    return (
        <>
            <DataTable
                title={'countries list'}
                columns={cols} 
                // data={Rec}
                data={FilteredRec}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='300px'
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                actions={<button className='btn btn-info'>Export</button>}



                //   for filtering enable subheader first
                subHeader
                subHeaderComponent={
                    <input type='text' placeholder={'Search'} 
                    className="form-control w-25"
                    value={SearchTxt}
                    onChange={(e)=>setSearchTxt(e.target.value)}
                    />
                } 
                subHeaderAlign='center'
    />
    </>
  )
}

export default DatatableItems
