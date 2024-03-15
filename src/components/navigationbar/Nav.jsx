import React from 'react'
import { GiHamburgerMenu,RxCross2 } from '../icons'
function Nav({handleShowNav,setHandleShowNav}) {
    return (
        <nav className='w-full drop-shadow-sm py-5 px-10 max-[500px]:px-2 bg-cream'>
            <div className='w-full flex flex-row items-center justify-between'>
                <h1 className='text-3xl text-deepred' id='title'>
                    BookLinker
                </h1>
                <div className='max-[300px]:hidden'>
                    <img 
                        src='/logo/logo3.png'
                        className='w-28'
                    />
                </div>
                <button 
                    className={`font-medium text-2xl text-gray-800 hidden max-[300px]:block ${handleShowNav ? '-rotate-180 ':'rotate-180'} transition-transform duration-200`}
                    onClick={()=>{setHandleShowNav(handleShowNav ? false:true)}}
                >
                    {
                        handleShowNav ?
                        (
                            <RxCross2/>
                        ):(
                            <GiHamburgerMenu/>
                        )
                    }
                </button>
            </div>
            <button 
                className={`font-medium text-2xl text-gray-800 hidden max-[800px]:block max-[300px]:hidden ${handleShowNav ? '-rotate-180 ':'rotate-180'} transition-transform duration-200`}
                onClick={()=>{setHandleShowNav(handleShowNav ? false:true)}}
            >
                {
                    handleShowNav ?
                    (
                        <RxCross2/>
                    ):(
                        <GiHamburgerMenu/>
                    )
                }
            </button>
        </nav>
    )
}

export default Nav