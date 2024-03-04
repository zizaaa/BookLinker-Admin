import React, { useEffect, useState } from 'react'
import { Nav,SideNav, admin } from '../components/linkImports'
import { Outlet } from 'react-router-dom'

function RootLayout() {
    const { adminData,getAdminAccount } = admin();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        setIsLoading(true)

        const callAdminAccount = async()=>{
            await getAdminAccount();
            setIsLoading(false)
        }
        callAdminAccount();
    },[])

    return (
        <main className='w-full bg-cream'>
            <Nav/>
            <section className='w-full flex flex-row h-[85.4vh] overflow-hidden'>
                <SideNav
                    isLoading={isLoading}
                    adminData={adminData}
                />
                <div className='p-5 w-full overflow-auto'>
                    <Outlet/>
                </div>
            </section>
        </main>
    )
}

export default RootLayout