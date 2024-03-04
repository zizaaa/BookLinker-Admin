import React, { useEffect } from 'react'
import { BookBorrowRequestTable } from './linkImports'

function BookBorrowRequest() {
    // useEffect(()=>{
    //     const handleGetAllRequest = async()=>{

    //     }
    // },[])
    return (
        <div className='bg-sandstone rounded-md drop-shadow-md'>
            <div className='w-full bg-deepred text-white font-medium p-2 text-center rounded-t-md'>
                <h1>Book borrow request</h1>
            </div>
            <BookBorrowRequestTable/>
        </div>
    )
}

export default BookBorrowRequest