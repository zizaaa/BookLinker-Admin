import React, { useEffect, useState } from 'react'
import { BookBorrowRequestTable, axios, cookie } from '../linkImports'

function BookBorrowRequest() {
    const { token,getCookie } = cookie();
    const [requestData, setRequestData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const env = import.meta.env;
    const serverURL = env.VITE_REACT_SERVER_URL;

    useEffect(()=>{
        const handleGetToken = async()=>{
            await getCookie();
        }
        handleGetToken()
    },[])

    useEffect(()=>{
        setIsLoading(true);

        if(!token){
            return;
        }

        const handleGetAllRequest = async()=>{
            await axios.get(`${serverURL}/api/booklinker/admin/getallrequest`,{
                headers: {
                    authorization: token,
                }
            }).then((res)=>{
                setRequestData(res.data);
                setIsLoading(false);
            }).catch((error)=>{
                setIsLoading(false);
                console.error(error);
            });
        }
        handleGetAllRequest();
    },[token])

    return (
        <div className='bg-sandstone rounded-md drop-shadow-md'>
            <div className='w-full bg-deepred text-white font-medium p-2 text-center rounded-t-md'>
                <h1>Book borrow request</h1>
            </div>
            <div className='w-full grid grid-cols-2 gap-2 p-2'>
                <div className='flex flex-col items-center justify-center h-32 bg-cream rounded-md drop-shadow-md'>
                    <h1 className='text-deepred font-bold text-2xl'>Borrowed books</h1>
                    <span className='font-medium text-2xl'>20</span>
                </div>
                <div className='flex flex-col items-center justify-center h-32 bg-cream rounded-md drop-shadow-md'>
                    <h1 className='text-deepred font-bold text-2xl'>Borrow request</h1>
                    <span className='font-medium text-2xl'>20</span>
                </div>
            </div>
            <BookBorrowRequestTable
                requestData={requestData}
                isLoading={isLoading}
            />
        </div>
    )
}

export default BookBorrowRequest