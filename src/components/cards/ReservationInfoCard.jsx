import React, { useState } from 'react'
import { axios, Spinner, toastError } from '../linkImports'
import { useNavigate } from 'react-router-dom';

function ReservationInfoCard({requestInfo,serverURL,bookBorrowedBy,bookInfo,adminData,token,collectionID,changeNotifier,setChangeNotifier}) {
    const [returnDate, setReturnDate] = useState('');
    const [returnTimestamp, setReturnTimestamp] = useState(null);
    const [isButtonLoading, setIsButtongLoading] = useState(false);
    const [isRejectButtonLoading, setIsRejectButtonLoading] = useState(false);

    const navigate = useNavigate();
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${day}/${month}`;
    }

    const handleReturnDateChange = (e) => {
        setReturnDate(e.target.value);
        const timestamp = calculateReturnTimestamp(e.target.value);
        setReturnTimestamp(timestamp);
    };

    const calculateReturnTimestamp = (selectedValue) => {
        const currentDate = new Date(); // Get current date
        let daysToAdd = 0;
    
        // Extract the number of days/weeks/months from the selected returnDate value
        switch (selectedValue) {
            case '1D':
                daysToAdd = 1;
                break;
            case '2D':
                daysToAdd = 2;
                break;
            case '3D':
                daysToAdd = 3;
                break;
            case '4D':
                daysToAdd = 4;
                break;
            case '5D':
                daysToAdd = 5;
                break;
            case '6D':
                daysToAdd = 6;
                break;
            case '1W':
                daysToAdd = 7;
                break;
            case '2W':
                daysToAdd = 14;
                break;
            case '3W':
                daysToAdd = 21;
                break;
            case '4W':
                daysToAdd = 28;
                break;
            case '1M':
                daysToAdd = 30;
                break;
            default:
                break;
        }
    
        // Calculate the return timestamp by adding the selected number of days to the current date
        const returnDate = new Date(currentDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000); // Convert days to milliseconds
    
        return returnDate.getTime(); // Return timestamp
    };
    

    const handleReject = async()=>{
        setIsRejectButtonLoading(true)

        // console.log(requestInfo.bookRequestID) => ID to find the data on reservcation store
        // console.log(collectionID === requestInfo.collectionID) => ID to find the collection on reservationList
        // console.log(borrowerID === requestInfo.borrowerID) => ID to find User
        // console.log(requestID === requestInfo.id) => ID to find specific data inside reservationList
        
        await axios.post(`${serverURL}/booklinker/api/reservation/action/reject`,{
            reservationStoreID:requestInfo.bookRequestID, 
            reservationListCollectionID:requestInfo.collectionID, 
            reservationID:requestInfo.id
        },{
            headers:{
                Authorization:token
            }
        }).then((res)=>{
            console.log(res.message)
            navigate('/reservation-request/list')
        }).catch((error)=>{
            console.error(error)
        })
        setIsRejectButtonLoading(false)
    }

    const handleApprove = async()=>{
        setIsButtongLoading(true);
        await axios.post(`${serverURL}/booklinker/api/reservation/action/approve`,{
            reservationListCollectionID:requestInfo.collectionID, 
            reservationID:requestInfo.id,
            permittedBy:adminData.position
        },{
            headers:{
                Authorization:token
            }
        }).then(async(res)=>{
            console.log(res)
            setChangeNotifier(changeNotifier ? false:true);
        }).catch((error)=>{
            console.error(error)
        })
        setIsButtongLoading(false);
    }

    // const handleApprove = async()=>{
    //     setIsButtongLoading(true);

    //     if(!returnDate || returnDate === 'N/A' || returnDate === ''){
    //         setIsButtongLoading(false);
    //         toastError('Please select a return date');
    //         return
    //     }

    //     try {
    //         await axios.post(`${serverURL}/api/booklinker/bookHistory/add`,{
    //             bookId:requestInfo.bookId,
    //             borrowerID:requestInfo.borrowerID,
    //             bookRequestID:requestInfo.bookRequestID,
    //             borrowedByData:{
    //                 userId:requestInfo.userID,
    //                 bookId:requestInfo.bookId,
    //                 quantity:requestInfo.quantity,
    //                 borrowedDate:new Date(),
    //                 returnDate:returnTimestamp,
    //                 bookReturnDate:'TBA'
    //             },
    //             userStatus:{
    //                 status:'Approved',
    //                 permittedBy:adminData.position,
    //                 collectionID,
    //                 requestId:requestInfo.id,
    //                 borrowedDate:new Date(),
    //                 returnDate:returnTimestamp
    //             }
    //         },{
    //             headers:{
    //                 Authorization:token
    //             }
    //         }).then(()=>{
    //             setIsButtongLoading(false);
    //             navigate('/book-borrow/request');
    //         }).catch((error)=>{
    //             console.error(error)
    //             navigate('/book-borrow/request');
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         navigate('/book-borrow/request');
    //     }
    // }

    return (
        <div className='p-5'>
            <div className='grid grid-cols-2 max-[500px]:grid-cols-1 gap-3'>
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col'>
                        <span className='font-medium text-gray-900 '>
                            Borrower name:
                        </span>
                        <p className='bg-cream p-2 rounded-sm text-sm'>
                            {requestInfo.name}
                        </p>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-medium text-gray-900 '>
                            Title:
                        </span>
                        <p className='bg-cream p-2 rounded-sm text-sm'>
                            {requestInfo.title}
                        </p>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-medium text-gray-900 '>
                            Quantity:
                        </span>
                        <p className='bg-cream p-2 rounded-sm text-sm'>
                            {requestInfo.quantity}
                        </p>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-medium text-gray-900 '>
                            Request date:
                        </span>
                        <p className='bg-cream p-2 rounded-sm text-sm'>
                            {formatDate(requestInfo.requestDate)}
                        </p>
                    </div>
                    <div className='flex flex-col break-all'>
                        <span className='font-medium text-gray-900 '>Book condition: </span>
                        <p className=' bg-cream p-2 rounded-sm text-sm max-h-60 overflow-auto'>
                            {requestInfo.condition}
                        </p>
                    </div>
                </div>
                <div>
                    <div className='flex flex-col break-all'>
                        <span className='font-medium text-gray-900 '>Reason: </span>
                        <p className=' bg-cream p-2 rounded-sm text-sm min-h-32 max-h-60 overflow-auto'>
                            {requestInfo.reason}
                        </p>
                    </div>
                    <div className='bg-cream mt-5 rounded-md'>
                        <div className='w-full bg-deepred text-white font-medium p-2 text-center rounded-t-md'>
                            <h1>Action</h1>
                        </div>

                        {
                            requestInfo.status === 'Pending' ?
                            (null):(
                                <div className='w-full p-3'>
                                    <form>
                                        <select 
                                            id="countries" 
                                            className="bg-sandstone text-gray-900 text-sm rounded-sm border-none outline-none focus:outline-none focus:border-none focus:ring-transparent w-full"
                                            value={returnDate}
                                            onChange={(e)=>{handleReturnDateChange(e)}}
                                        >
                                            <option value="N/A">Return date</option>
                                            <option value="1D">1 day</option>
                                            <option value="2D">2 days</option>
                                            <option value="3D">3 days</option>
                                            <option value="4D">4 days</option>
                                            <option value="5D">5 days</option>
                                            <option value="6D">6 days</option>
                                            <option value="1W">1 week</option>
                                            <option value="2W">2 weeks</option>
                                            <option value="3W">3 weeks</option>
                                            <option value="4W">4 weeks</option>
                                            <option value="1M">1 month</option>
                                        </select>
                                    </form>
                                </div>
                            )
                        }
                        <div className='flex w-full items-center justify-end gap-3 p-3'>
                            {
                                requestInfo.status === 'Pending' ?
                                (
                                    <>
                                        <button 
                                            className='flex-1 py-2 bg-deepred text-white rounded-md drop-shadow-md'
                                            onClick={handleReject}
                                        >
                                            {
                                                isRejectButtonLoading ?
                                                (
                                                    <div className='w-full flex justify-center items-center'>
                                                        <Spinner/>
                                                    </div>
                                                ):('Reject')
                                            }
                                        </button>
                                        <button 
                                            className={`flex-1 py-2 bg-green-600 text-white rounded-md drop-shadow-md ${isButtonLoading ? 'cursor-not-allowed':''}`}
                                            onClick={handleApprove}
                                            disabled={isButtonLoading}
                                        >
                                            {
                                                isButtonLoading ?
                                                (
                                                    <div className='w-full flex justify-center items-center'>
                                                        <Spinner/>
                                                    </div>
                                                ):('Approve')
                                            }
                                        </button>
                                    </>
                                ):(
                                    <button 
                                        className='flex-1 py-2 bg-green-600 text-white rounded-md drop-shadow-md'
                                    >
                                        Send book
                                    </button>
                                )
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReservationInfoCard