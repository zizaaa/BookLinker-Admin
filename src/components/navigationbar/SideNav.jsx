import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { 
    GrAnalytics,
    FaUser,
    GiBookshelf,
    HiOutlineInboxIn,
    FaBook,
    IoMdSwap,
    CgProfile,
    IoExitOutline, 
    SiGitextensions,
} from '../icons'
import { Spinner } from '../linkImports'

function SideNav({isLoading,adminData,setHandleShowNav}) {
    const [data, setData] = useState({});
    useEffect(()=>{

        if(!isLoading){
            setData(adminData);
        }

    },[isLoading,adminData])
    return (
        <div className='bg-sandstone py-5 px-10'>
                <div className='flex flex-row items-center gap-2 p-2 border-b border-[rgb(223,207,188)]'>
                    {
                        isLoading ?
                        (
                            <div className='h-[3.3rem] flex items-center justify-center w-full'>
                                <Spinner/>
                            </div>
                        ):(
                            <>
                                <img 
                                    src={data?.profile ? data?.profile:'/imgs/userAlt.png'}
                                    className='w-[3.3rem] h-[3.3rem] bg-deepred rounded-full'
                                />
                                <h1 className='font-medium text-gray-700'>
                                    {`${data?.firstName} ${data?.lastName}`}
                                </h1>
                            </>
                        )
                    }
                </div>
                <NavLink 
                    to='/' 
                    className={({isActive}) => isActive ? 'flex flex-row items-center p-2 mt-3 rounded-sm bg-deepred':'group flex flex-row items-center p-2 mt-3 hover:bg-deepred transition-all duration-200 rounded-sm'}
                    onClick={()=>{setHandleShowNav(false)}}
                >
                    {({ isActive }) => (
                        <>
                            <span 
                                className={isActive ? 'text-[1.2rem] text-white':'text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'}
                            >
                                <GrAnalytics/>
                            </span>
                            <span 
                                className={isActive ? 'ms-3 text-[1.2rem] text-white':'ms-3 text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'}
                            >
                                Dashboard
                            </span>
                        </>
                    )}
                </NavLink>
                <NavLink
                    to='/inbox'
                    className={({isActive}) => isActive ? 'flex flex-row items-center p-2 rounded-sm bg-deepred':'group flex flex-row items-center p-2 hover:bg-deepred transition-all duration-200 rounded-sm'}
                    onClick={()=>{setHandleShowNav(false)}}
                >
                    {({ isActive }) => (
                        <>
                            <span 
                                className={isActive ? 'text-[1.2rem] text-white':'text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'}
                            >
                                <HiOutlineInboxIn/>
                            </span>
                            <span 
                                className={isActive ? 'ms-3 text-[1.2rem] text-white':'ms-3 text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'}
                            >
                                Inbox
                            </span>
                        </>
                    )}
                </NavLink>
                <div className='mt-2'>
                    <span className='text-sm font-medium text-gray-600'>
                        Data entry
                    </span>
                    <NavLink
                        to='/student'
                        className={({isActive}) => isActive ? 'flex flex-row items-center p-2 rounded-sm bg-deepred':'group flex flex-row items-center p-2 hover:bg-deepred transition-all duration-200 rounded-sm'}
                        onClick={()=>{setHandleShowNav(false)}}
                    >
                        {({ isActive }) => (
                            <>
                                <span 
                                    className={isActive ? 'text-[1.2rem] text-white':'text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'}
                                >
                                    <FaUser/>
                                </span>
                                <span 
                                    className={isActive ? 'ms-3 text-[1.2rem] text-white':'ms-3 text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'}
                                >
                                    Student
                                </span>
                            </>
                        )}
                    </NavLink>
                    <NavLink
                        to='/faculty'
                        className={({isActive}) => isActive ? 'flex flex-row items-center p-2 rounded-sm bg-deepred':'group flex flex-row items-center p-2 hover:bg-deepred transition-all duration-200 rounded-sm'}
                        onClick={()=>{setHandleShowNav(false)}}
                    >
                        {({ isActive }) => (
                            <>
                                <span 
                                    className={isActive ? 'text-[1.2rem] text-white':'text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'}
                                >
                                    <FaUser/>
                                </span>
                                <span 
                                    className={isActive ? 'ms-3 text-[1.2rem] text-white':'ms-3 text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'}
                                >
                                    Faculty
                                </span>
                            </>
                        )}
                        
                    </NavLink>
                    <NavLink
                        to='/books'
                        className={({isActive}) => isActive ? 'flex flex-row items-center p-2 rounded-sm bg-deepred':'group flex flex-row items-center p-2 hover:bg-deepred transition-all duration-200 rounded-sm'}
                        onClick={()=>{setHandleShowNav(false)}}
                    >
                        {({ isActive }) => (
                            <>
                                <span 
                                    className={isActive ? 'text-[1.2rem] text-white':'text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'}
                                >
                                    <GiBookshelf/>
                                </span>
                                <span 
                                    className={isActive ? 'ms-3 text-[1.2rem] text-white':'ms-3 text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'}
                                >
                                    Books
                                </span>
                            </>
                        )}
                        
                    </NavLink>
                </div>
                <div className=''>
                    <span className='text-sm font-medium text-gray-600'>
                        Transactions
                    </span>
                    <NavLink 
                        to='/book-borrow/request'
                        className={({isActive}) => isActive ? 'flex flex-row items-center p-2 rounded-sm bg-deepred':'group flex flex-row items-center p-2 hover:bg-deepred transition-all duration-200 rounded-sm'}
                        onClick={()=>{setHandleShowNav(false)}}
                    >
                        {({ isActive }) => (
                            <>
                                <span 
                                    className={isActive ? 'text-[1.2rem] text-white':'text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'}
                                >
                                    <FaBook/>
                                </span>
                                <span 
                                    className={isActive ? 'ms-3 text-[1.2rem] text-white':'ms-3 text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'}
                                >
                                    Book borrow
                                </span>
                            </>
                        )}
                        
                    </NavLink>
                    <NavLink 
                        to='/reservation-request/list'
                        className={({isActive}) => isActive ? 'flex flex-row items-center p-2 rounded-sm bg-deepred':'group flex flex-row items-center p-2 hover:bg-deepred transition-all duration-200 rounded-sm'}
                        onClick={()=>{setHandleShowNav(false)}}
                    >
                        {({ isActive }) => (
                            <>
                                <span 
                                    className={isActive ? 'text-[1.2rem] text-white':'text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'}
                                >
                                    <FaBook/>
                                </span>
                                <span 
                                    className={isActive ? 'ms-3 text-[1.2rem] text-white':'ms-3 text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'}
                                >
                                    Book reservation
                                </span>
                            </>
                        )}
                        
                    </NavLink>
                    <NavLink
                        to='/swap-request'
                        className={({isActive}) => isActive ? 'flex flex-row items-center p-2 rounded-sm bg-deepred':'group flex flex-row items-center p-2 hover:bg-deepred transition-all duration-200 rounded-sm'}
                        onClick={()=>{setHandleShowNav(false)}}
                    >
                        {({ isActive }) => (
                            <>
                                <span 
                                    className={isActive ? 'text-[1.2rem] text-white':'text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'}
                                >
                                    <IoMdSwap/>
                                </span>
                                <span 
                                    className={isActive ? 'ms-3 text-[1.2rem] text-white':'ms-3 text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'}
                                >
                                    Swap request
                                </span>
                            </>
                        )}
                    </NavLink>
                    <NavLink
                        to='/extension-request/list'
                        className={({isActive}) => isActive ? 'flex flex-row items-center p-2 rounded-sm bg-deepred':'group flex flex-row items-center p-2 hover:bg-deepred transition-all duration-200 rounded-sm'}
                        onClick={()=>{setHandleShowNav(false)}}
                    >
                        {({ isActive }) => (
                            <>
                                <span 
                                    className={isActive ? 'text-[1.2rem] text-white':'text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'}
                                >
                                    <SiGitextensions/>
                                </span>
                                <span 
                                    className={isActive ? 'ms-3 text-[1.2rem] text-white':'ms-3 text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'}
                                >
                                    Extension request
                                </span>
                            </>
                        )}
                    </NavLink>
                </div>
                <div className=''>
                    <span className='text-sm font-medium text-gray-600'>
                        Setting
                    </span>
                    <NavLink 
                        to='/profile'
                        className={({isActive}) => isActive ? 'flex flex-row items-center p-2 rounded-sm bg-deepred':'group flex flex-row items-center p-2 hover:bg-deepred transition-all duration-200 rounded-sm'}
                        onClick={()=>{setHandleShowNav(false)}}
                    >
                        {({ isActive }) => (
                            <>
                                <span 
                                    className={isActive ? 'text-[1.2rem] text-white':'text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'}
                                >
                                    <CgProfile/>
                                </span>
                                <span 
                                    className={isActive ? 'ms-3 text-[1.2rem] text-white':'ms-3 text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'}
                                >
                                    Profile
                                </span>
                            </>
                        )}

                    </NavLink>
                </div>
                <button 
                    className='group flex flex-row items-center p-2 hover:bg-deepred transition-all duration-200 rounded-sm w-full'
                >
                    <span 
                        className='text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'
                    >
                        <IoExitOutline/>
                    </span>
                    <span 
                        className='ms-3 text-[1.2rem] text-gray-700 group-hover:text-white transition-all duration-200'
                    >
                        Log out
                    </span>
            </button>
        </div>
    )
}

export default SideNav