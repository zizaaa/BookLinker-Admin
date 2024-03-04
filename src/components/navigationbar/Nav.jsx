import React from 'react'

function Nav() {
    return (
        <nav className='w-full flex flex-row items-center justify-between drop-shadow-sm py-5 px-10 max-[500px]:px-2 bg-cream'>
            <h1 className='text-3xl text-deepred' id='title'>
                BookLinker
            </h1>
            <div>
                <img 
                    src='/logo/logo3.png'
                    className='w-28'
                />
            </div>
        </nav>
    )
}

export default Nav