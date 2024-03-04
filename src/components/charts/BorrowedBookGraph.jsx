import React from 'react'
import CanvasJSReact from '@canvasjs/react-charts';

function BorrowedBookGraph() {
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    
    return (
        <div className='grid grid-cols-2 gap-2'>
            <CanvasJSChart options = {options1} />
        </div>
    )
}

export default BorrowedBookGraph