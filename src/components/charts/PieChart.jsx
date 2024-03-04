import React from 'react'
import CanvasJSReact from '@canvasjs/react-charts';

function PieChart() {
    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const options1 = {
        title: {
            text: "Top borrowed books",
            fontColor:'#6D2932'
        },
        backgroundColor: "#C7B7A3",
        data: [{
            type: "column",
            dataPoints: [
                { label: "Information...",  y: 10  },
                { label: "Web Design...", y: 15  },
                { label: "Principle of web...", y: 25  },
                { label: "Data Structure...",  y: 30  },
                { label: "Advanced Accounting...",  y: 28  }
            ]
        }],
    }
    const options2 = {
        title: {
            text: "Top reader/borrower",
            fontColor:'#6D2932'
        },
        backgroundColor: "#C7B7A3",
        data: [{
            type: "column",
            dataPoints: [
                { label: "Jay Ar",  y: 10  },
                { label: "Ellen", y: 15  },
                { label: "Ange", y: 25  },
                { label: "Jayson",  y: 30  },
                { label: "Dianne",  y: 28  }
            ]
        }],
    }
    const options3 = {
        title: {
            text: "Borrowed Books",
            fontColor:'#6D2932'
        },
        backgroundColor: "#C7B7A3",
        data: [{
            type: "column",
            dataPoints: [
                { label: "November",  y: 18  },
                { label: "December",  y: 10  },
                { label: "January",  y: 20  },
                { label: "February", y: 23  },
                { label: "March", y: 18  },
            ]
        }],
    }
    return (
        <div>
            <div className='grid grid-cols-2 gap-2 mb-5'>
                <CanvasJSChart options = {options1} />
                <CanvasJSChart options = {options2} />
            </div>
            <CanvasJSChart options = {options3} />
        </div>
    )
}

export default PieChart