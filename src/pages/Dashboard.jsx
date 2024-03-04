import React from 'react'
import PieChart from '../components/charts/PieChart'
import BorrowedBookGraph from '../components/charts/BorrowedBookGraph'
import TransactionsHistory from '../components/tables/TransactionsHistory'

function Dashboard() {
    
    return (
        <section className='drop-shadow-md'>
            {/* <PieChart/> */}
            {/* <BorrowedBookGraph/> */}
            <TransactionsHistory/>
        </section>
    )
}

export default Dashboard