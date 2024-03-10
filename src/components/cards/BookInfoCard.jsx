import React from 'react'

function BookInfoCard({serverURL,bookInfo,bookBorrowedBy}) {
    return (
        <div className='w-full'>
            <div className='w-full flex flex-col items-center justify-center mt-5'>
                <img 
                    src={bookInfo.cover ? `${serverURL}/${bookInfo.cover}`:'/imgs/userAlt.png'}
                    className='h-36 w-36 object-contain rounded-md'
                    loading='lazy'
                />
            </div>
            <div className='p-5 flex flex-col gap-2'>
                <div className='flex flex-col'>
                    <div className='text-sm text-start flex gap-1'>
                        <span className='font-medium'>
                            Title:
                        </span> 
                        {bookInfo.title}
                    </div>
                    <div className='text-sm text-start flex gap-1'>
                        <span className='font-medium'>
                            Author:
                        </span> 
                        {bookInfo.author}
                    </div>
                </div>
                <div className='text-sm text-start flex gap-1'>
                    <span className='font-medium'>
                        Quantity:
                    </span> 
                    {bookInfo.quantity}
                </div>
                <div className='text-sm text-start flex gap-1'>
                    <span className='font-medium'>
                        Borrowed:
                    </span> 
                    {
                        bookBorrowedBy.totalQuantity ?
                        (
                            bookBorrowedBy.totalQuantity
                        ):('0')
                    }
                </div>
                <div className='text-sm text-start flex gap-1'>
                    <span className='font-medium'>
                        Status:
                    </span> 
                    {
                        !bookBorrowedBy.totalQuantity ?
                        (
                            <span class="inline-flex items-center bg-green-300 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                Available
                            </span>
                        ):
                        bookInfo.quantity > bookBorrowedBy.totalQuantity ?
                        (
                            <span class="inline-flex items-center bg-green-300 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                Available
                            </span>
                            
                        ):(
                            <span class="inline-flex items-center bg-red-300 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                                <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                                Unavailable
                            </span>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default BookInfoCard