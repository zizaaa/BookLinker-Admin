import React, { useEffect, useState } from 'react'
import { BookBorrowRequestTable, axios, cookie } from '../linkImports'

function BookBorrowRequest() {
    const { token,getCookie } = cookie();
    const [requestData, setRequestData] = useState([]);
    const [borrowedBooks, setBorrowedBooks] = useState({});
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

        const handleGetAllborrowedBooks = async()=>{
            await axios.get(`${serverURL}/api/bookborrowedby/all`, {
                headers: {
                    authorization: token,
                }
            }).then((res)=>{
                setBorrowedBooks(res.data)
            }).catch((error)=>{
                console.error(error)
            })
        }
        handleGetAllRequest();
        handleGetAllborrowedBooks();
    },[token])

    return (
        <div className='bg-sandstone rounded-md drop-shadow-md'>
            <div className='w-full bg-deepred text-white font-medium p-2 text-center rounded-t-md'>
                <h1>Book borrow request</h1>
            </div>
            <div className='w-full grid grid-cols-2 max-[490px]:grid-cols-1 text-center gap-2 p-2'>
                <div className='flex flex-col items-center justify-center h-32 bg-cream rounded-md drop-shadow-md'>
                    <h1 className='text-deepred font-bold text-2xl'>Borrowed books</h1>
                    <span className='font-medium text-2xl'>
                        {
                            borrowedBooks ?
                            borrowedBooks.totalBorrowedBooks:('0')
                        }
                    </span>
                </div>
                <div className='flex flex-col items-center justify-center h-32 bg-cream rounded-md drop-shadow-md'>
                    <h1 className='text-deepred font-bold text-2xl'>Borrow request</h1>
                    <span className='font-medium text-2xl'>
                        {
                            requestData.length > 0 ? 
                            requestData.length:'0'
                        }
                    </span>
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