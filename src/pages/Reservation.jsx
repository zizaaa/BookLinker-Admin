import React from 'react'
import { Outlet } from 'react-router-dom'

function Reservation() {
    return (
        <section>
            <Outlet/>
        </section>
    )
}

export default Reservation