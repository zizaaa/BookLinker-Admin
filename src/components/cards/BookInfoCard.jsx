import React from 'react'

function BookInfoCard({serverURL,bookInfo}) {
    return (
        <div className='w-full'>
            <div className='w-full flex flex-col items-center justify-center mt-5'>
                <img 
                    src={bookInfo.cover ? `${serverURL}/${bookInfo.cover}`:'/imgs/userAlt.png'}
                    className='h-36 w-36 object-contain rounded-md'
                    loading='lazy'
                />
            </div>
            <div className='p-5'>
                <div className='flex flex-col'>
                    <div className='text-sm text-start mt-1 flex gap-1'>
                        <span className='font-medium'>
                            Title:
                        </span> 
                        {bookInfo.title}
                    </div>
                    <div className='text-sm text-start mt-1 flex gap-1'>
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
            </div>
        </div>
    )
}

export default BookInfoCard