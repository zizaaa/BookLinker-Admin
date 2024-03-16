import React, { useEffect, useState } from 'react'
import { BookReservationTable, axios, cookie } from '../linkImports';

function BookReservationRequest() {
    const { token,getCookie } = cookie();
    const [requestData, setRequestData] = useState([]);
    const [reservationData, setReservationData] = useState([]);
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
            await axios.get(`${serverURL}/booklinker/api/reservation/get/all`, {
                headers: {
                    authorization: token,
                }
            }).then((res)=>{
                setRequestData(res.data)
                setIsLoading(false);
            }).catch((error)=>{
                console.error(error)
            })
        }

        handleGetAllRequest();
    },[token])

    return (
        <div className='bg-sandstone rounded-md drop-shadow-md'>
            <div className='w-full bg-deepred text-white font-medium p-2 text-center rounded-t-md'>
                <h1>Book reservation request</h1>
            </div>
            <div className='w-full grid grid-cols-2 max-[490px]:grid-cols-1 text-center gap-2 p-2'>
                <div className='flex flex-col items-center justify-center h-32 bg-cream rounded-md drop-shadow-md'>
                    <h1 className='text-deepred font-bold text-2xl'>Approved request</h1>
                    <span className='font-medium text-2xl'>
                        {reservationData.reduce((count, request) => request.status === 'Approved' ? count + 1 : count, 0)}
                    </span>
                </div>
                <div className='flex flex-col items-center justify-center h-32 bg-cream rounded-md drop-shadow-md'>
                    <h1 className='text-deepred font-bold text-2xl'>Pending request</h1>
                    <span className='font-medium text-2xl'>
                        {reservationData.reduce((count, request) => request.status === 'Pending' ? count + 1 : count, 0)}
                    </span>
                </div>
            </div>
            <BookReservationTable
                requestData={requestData}
                isLoading={isLoading}
                setReservationData={setReservationData}
            />
        </div>
    )
}

export default BookReservationRequest