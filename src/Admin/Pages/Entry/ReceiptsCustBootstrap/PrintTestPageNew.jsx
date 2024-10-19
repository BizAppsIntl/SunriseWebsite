import React, { useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'


export default function PrintTestPageNew() {

    // const compRef = useRef < HTMLDivElement > (null)
    const compRefX = useRef();

    const handlePrint = useReactToPrint({
        content: () => compRefX.current,
        // content: () => 'Bismillah',
        onAfterPrint: () => alert('Print succeeded')
    })

    return (
        <>
            <div ref={compRefX}>
                <h1>Bismillah</h1>
                <p>WWWWWWWWWM WWWWWWWWWMW WWWWWWWWMW WWWWWWWWM</p>
                <p>WWWWWWWWWM WWWWWWWWWM WWWWWWWWWM WWWWWWWWWM</p>
            </div>

            <button onClick={() => handlePrint()}>Start Print This</button>

            <div className='print-source'>
                <table>
                    <thead>
                        <tr>
                            <th>column 1</th>
                            <th>column 2</th>
                            <th>column 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>عبداللہ</td>
                            <td>data 2</td>
                            <td>data 3</td>
                        </tr>
                        <tr>
                            <td>data 1</td>
                            <td>data 2</td>
                            <td>data 3</td>
                        </tr>
                        <tr>
                            <td>data 1</td>
                            <td>data 2</td>
                            <td>data 3</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
