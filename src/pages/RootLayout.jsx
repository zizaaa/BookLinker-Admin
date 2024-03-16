import React, { useEffect, useState } from 'react'
import { Nav,SideNav, admin } from '../components/linkImports'
import { Outlet } from 'react-router-dom'

function RootLayout() {
    const { adminData,getAdminAccount } = admin();
    const [isLoading, setIsLoading] = useState(false);
    const [handleShowNav, setHandleShowNav] = useState(false);

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
            <Nav
                handleShowNav={handleShowNav}
                setHandleShowNav={setHandleShowNav}
            />
            <section className='w-full flex flex-row h-full overflow-hidden relative'>
                <div className={`w-[20rem] max-[300px]:w-auto overflow-auto absolute z-10 max-[300px]:left-0 max-[300px]:right-0 transition-all duration-200 ${handleShowNav ? 'max-[800px]:translate-x-0':'max-[800px]:-translate-x-96'}`}>
                    <SideNav
                        isLoading={isLoading}
                        adminData={adminData}
                        setHandleShowNav={setHandleShowNav}
                    />
                </div>
                <div className='p-5 w-full overflow-auto ps-[22rem] max-[800px]:ps-5 max-[500px]:p-1 transition-all duration-200'>
                    <Outlet/>
                </div>
            </section>
        </main>
    )
}

export default RootLayout