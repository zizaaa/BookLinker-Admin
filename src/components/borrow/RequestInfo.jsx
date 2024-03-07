import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { BookInfoCard, Spinner, UserInfoCard, admin, axios, cookie, handleGetRequestInformations, toastError } from '../linkImports';
import { ToastContainer } from 'react-toastify';

function RequestInfo() {
    const { collectionID, borrowerID, requestID } = useParams();
    const { token,getCookie } = cookie();
    const { adminData,getAdminAccount } = admin();
    const [requestInfo, setRequestInfo] = useState({});
    const [bookInfo, setBookInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [returnDate, setReturnDate] = useState('');
    const [returnTimestamp, setReturnTimestamp] = useState(null);
    const [isButtonLoading, setIsButtongLoading] = useState(false);
    const [isRejectButtonLoading, setIsRejectButtonLoading] = useState(false);

    const navigate = useNavigate();
    const env = import.meta.env;
    const serverURL = env.VITE_REACT_SERVER_URL;

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${day}/${month}`;
    }

    useEffect(()=>{
        const handleGetInfo = async()=>{
            await getCookie();
            await getAdminAccount();
        }
        handleGetInfo();
    },[])

    useEffect(()=>{

        setIsLoading(true)

        if(!collectionID || !borrowerID || !requestID){
            return navigate('/book-borrow/request');
        }

        if(!token || !adminData){
            return
        }
        const handleRequestInformation = async()=>{
            await handleGetRequestInformations(collectionID,borrowerID,requestID)
            .then((res)=>{
                setRequestInfo(res)
                handeGetBookInfo(res.bookId)
            }).catch((error)=>{
                navigate('/book-borrow/request');
                throw error;
            })
            
        }
        const handeGetBookInfo = async(bookId)=>{
            //get book information
            await axios.get(`${serverURL}/api/booklinker/getSingleBook/${bookId}`,{
                headers:{
                    Authorization:token
                }
            }).then((res)=>{
                setBookInfo(res.data.book)
                setIsLoading(false);
            }).catch((error)=>{
                navigate('/book-borrow/request');
                throw error;
            })
        }
        handleRequestInformation();

    },[collectionID, borrowerID, requestID,token])

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
            case '1W':
                daysToAdd = 7; // 1 week is 7 days
                break;
            case '2W':
                daysToAdd = 14; // 2 weeks is 14 days
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

        await axios.post(`${serverURL}/api/booklinker/bookHistory/reject`,{
            bookRequestID:requestInfo.bookRequestID,
            status:'Rejected',
            permittedBy:adminData.position,
            collectionID,
            requestId:requestInfo.id,
            borrowedDate:'N/A',
            returnDate:'N/A'
        },{
            headers:{
                Authorization:token
            }
        }).then((res)=>{
            setIsRejectButtonLoading(false)
            navigate('/book-borrow/request');
        }).catch((error)=>{
            console.error(error);
        })
    }

    const handleApprove = async()=>{
        setIsButtongLoading(true);

        if(!returnDate){
            setIsButtongLoading(false);
            toastError('Please select a return date');
            return
        }

        try {
            await axios.post(`${serverURL}/api/booklinker/bookHistory/add`,{
                bookId:requestInfo.bookId,
                borrowerID:requestInfo.borrowerID,
                bookRequestID:requestInfo.bookRequestID,
                borrowedByData:{
                    userId:requestInfo.userID,
                    bookId:requestInfo.bookId,
                    borrowedDate:new Date(),
                    returnDate:returnTimestamp,
                    bookReturnDate:'TBA'
                },
                userStatus:{
                    status:'Approved',
                    permittedBy:adminData.position,
                    collectionID,
                    requestId:requestInfo.id,
                    borrowedDate:new Date(),
                    returnDate:returnTimestamp
                }
            },{
                headers:{
                    Authorization:token
                }
            }).then(()=>{
                setIsButtongLoading(false);
                navigate('/book-borrow/request');
            }).catch((error)=>{
                console.error(error)
            });
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='w-full overflow-hidden'>
            <ToastContainer/>
            <div className='grid grid-cols-2 p-2 gap-2'>
                <div className='bg-sandstone rounded-md drop-shadow-md'>
                    <div className='w-full bg-deepred text-white font-medium p-2 text-center rounded-t-md'>
                        <h1>Borrower Information</h1>
                    </div>
                    {
                        isLoading ?
                        (
                            <div className='w-full flex items-center justify-center h-40'>
                                <Spinner/>
                            </div>
                        ):(
                            <UserInfoCard
                                requestInfo={requestInfo}
                                serverURL={serverURL}
                            />
                        )
                    }
                </div>
                <div className='bg-sandstone rounded-md drop-shadow-md'>
                    <div className='w-full bg-deepred text-white font-medium p-2 text-center rounded-t-md'>
                        <h1>Book Information</h1>
                    </div>
                        {
                            isLoading ?
                            (
                                <div className='w-full flex items-center justify-center h-40'>
                                    <Spinner/>
                                </div>
                            ):(
                                <BookInfoCard
                                    serverURL={serverURL}
                                    bookInfo={bookInfo}
                                />
                            )
                        }
                </div>
            </div>

            <div className='mt-5 bg-sandstone rounded-md'>
                <div className='w-full bg-deepred text-white font-medium p-2 text-center rounded-t-md'>
                    <h1>Request Information</h1>
                </div>

                <div className='p-5'>
                    <div className='grid grid-cols-2 gap-3'>
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
                                <p className=' bg-cream p-2 rounded-sm text-sm max-h-60 overflow-auto'>
                                    {requestInfo.reason}
                                </p>
                            </div>
                            <div className='bg-cream mt-5 rounded-md'>
                                <div className='w-full bg-deepred text-white font-medium p-2 text-center rounded-t-md'>
                                    <h1>Action</h1>
                                </div>

                                <div className='w-full p-3'>
                                    <form>
                                        {/* <label htmlFor="countries" className="block text-sm font-medium text-gray-900">Return date</label> */}
                                        <select 
                                            id="countries" 
                                            className="bg-sandstone text-gray-900 text-sm rounded-sm border-none outline-none focus:outline-none focus:border-none focus:ring-transparent w-full"
                                            value={returnDate}
                                            onChange={(e)=>{handleReturnDateChange(e)}}
                                        >
                                            <option defaultValue="">Return date</option>
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
                                            <option value="5W">5 weeks</option>
                                            <option value="1M">1 month</option>
                                        </select>
                                    </form>
                                </div>
                                <div className='flex w-full items-center justify-end gap-3 p-3'>
                                    <button 
                                        className='w-24 py-2 bg-deepred text-white rounded-md drop-shadow-md'
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
                                        className='w-24 py-2 bg-green-600 text-white rounded-md drop-shadow-md'
                                        onClick={handleApprove}
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestInfo