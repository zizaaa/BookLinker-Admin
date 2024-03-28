import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner';

function BookSwapSender({serverURL,dataInformations,isLoading}) {
    const [src, setSrc] = useState('');

    useEffect(()=>{
        if(!dataInformations?.information?.sender?.avatar){
            setSrc('/imgs/avatar.png')
        }else{
            setSrc(`${serverURL}/${dataInformations?.information?.sender?.avatar}`)
        }
    },[dataInformations])

    const handleImgError =()=>{
        setSrc('/imgs/avatar.png')
    }
    
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${day}/${month}`;
    }

    return (
        <div className='pb-2 h-[30rem] overflow-auto'>
            {
                !isLoading ?
                (
                    <>
                        <div className='w-full flex flex-col items-center justify-center my-2'>
                            <img src={src}
                                className='h-20 w-20 rounded-full object-cover'
                                loading='lazy'
                                onError={handleImgError}
                            />
                            <h1 className='font-medium mt-1'>
                                {
                                    `${dataInformations?.information?.sender?.firstName} ${dataInformations?.information?.sender.lastName}`
                                }
                            </h1>
                        </div>
                        <div className='w-full px-2 flex flex-col gap-1 h-[6rem] overflow-auto'>
                            <span className='flex flex-row gap-1 text-[0.9rem]'>
                                <h1 className='font-medium'>
                                    {
                                        dataInformations?.information?.sender?.role === 'Student' ?
                                        ('USN:'):('Faculty ID:')
                                    }
                                </h1>
                                <h2>
                                    {
                                        dataInformations?.information?.sender?.userID
                                    }
                                </h2>
                            </span>
                            {
                                dataInformations?.information?.sender.role === 'Student' ?
                                (
                                    <span className='flex flex-row gap-1 text-[0.9rem]'>
                                        <h1 className='font-medium'>
                                            Program:
                                        </h1>
                                        <h2>
                                            {
                                                dataInformations?.information?.sender?.program
                                            }
                                        </h2>
                                    </span>
                                ):(null)
                            }
                            {
                                dataInformations?.information?.sender.role === 'Student' ?
                                (
                                    <span className='flex flex-row gap-1 text-[0.9rem]'>
                                        <h1 className='font-medium'>
                                            Year level:
                                        </h1>
                                        <h2>
                                            {
                                                dataInformations?.information?.sender?.userID
                                            }
                                        </h2>
                                    </span>
                                ):(null)
                            }
                            {
                                dataInformations?.information?.sender.role === 'Faculty' ?
                                (
                                    <span className='flex flex-row gap-1 text-[0.9rem]'>
                                        <h1 className='font-medium'>
                                            Position:
                                        </h1>
                                        <h2>
                                            {
                                                dataInformations?.information?.sender?.position
                                            }
                                        </h2>
                                    </span>
                                ):(null)
                            }
                            <span className='flex flex-row gap-1 text-[0.9rem]'>
                                <h1 className='font-medium'>
                                    Level: 
                                </h1>
                                <h2>
                                    {
                                        dataInformations?.information?.sender?.level
                                    }
                                </h2>
                            </span>
                        </div>

                        <div className='mt-2'>
                            <div className='w-full bg-deepred text-white font-medium p-2 text-center'>
                                <h1>Book information</h1>
                            </div>
                            <div className='px-2 mt-2 flex flex-col gap-1 text-[0.9rem]'>
                                <span className='flex gap-2'>
                                    <h1 className='font-medium'>Title:</h1>
                                    <h2 className='font-bold'>
                                        {dataInformations?.information?.senderBook.title}
                                    </h2>
                                </span>
                                <span className='flex gap-2'>
                                    <h1 className='font-medium'>Author:</h1>
                                    <h2>
                                        {dataInformations?.information?.senderBook.author}
                                    </h2>
                                </span>
                                <span className='flex gap-2'>
                                    <h1 className='font-medium'>Quantity:</h1>
                                    <h2>
                                        {dataInformations?.data?.sender?.quantity}
                                    </h2>
                                </span>
                                <span className='flex gap-2'>
                                    <h1 className='font-medium'>Borrowed date:</h1>
                                    <h2>
                                        {formatDate(dataInformations?.information?.senderBook.borrowedDate)}
                                    </h2>
                                </span>
                                <span className='flex gap-2'>
                                    <h1 className='font-medium'>Return date:</h1>
                                    <h2>
                                        {formatDate(dataInformations?.information?.senderBook.returnDate)}
                                    </h2>
                                </span>
                                <span className='flex gap-2'>
                                    <h1 className='font-medium'>Book condition:</h1>
                                    <h2>
                                        {dataInformations?.information?.senderBook.condition}
                                    </h2>
                                </span>
                            </div>
                        </div>
                    </>
            ):(
                <div className='w-full h-full flex items-center justify-center'>
                    <Spinner/>
                </div>
            )
        }
        </div>
    )
}

export default BookSwapSender