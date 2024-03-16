import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { 
        BookInfoCard, 
        ReservationInfoCard, 
        Spinner, 
        UserInfoCard, 
        admin, 
        cookie, 
        getBookInfo, 
        getBorrowedBy, 
        handleGetRequestInformations, 
} from '../linkImports';
import { FaArrowLeft } from '../icons'
import { ToastContainer } from 'react-toastify';

function BookReservationInfo() {
    const { collectionID, borrowerID, requestID } = useParams();
    const { token,getCookie } = cookie();
    const { adminData,getAdminAccount } = admin();
    const [requestInfo, setRequestInfo] = useState({});
    const [bookInfo, setBookInfo] = useState({});
    const [bookBorrowedBy, setBookBorrowedBy] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [changeNotifier, setChangeNotifier] = useState(false);

    const navigate = useNavigate();
    const env = import.meta.env;
    const serverURL = env.VITE_REACT_SERVER_URL;

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
            return navigate('/reservation-request/list');
        }

        if(!token || !adminData){
            return
        }

        const handleRequestInformation = async()=>{
            await handleGetRequestInformations(collectionID,borrowerID,requestID, 'reservation')
            .then((res)=>{
                setRequestInfo(res)
                handeGetBookInfo(res.bookId)
            }).catch((error)=>{
                navigate('/reservation-request/list');
                throw error;
            })
            
        }
        const handeGetBookInfo = async(bookId)=>{
            //get book information
            await getBookInfo(serverURL,bookId,token)
            .then((res)=>{
                setBookInfo(res)

                if(res.borrowedBy){
                    handleGetBorrowedByCollection(res.borrowedBy)
                }else{
                    setBookBorrowedBy([])
                    setIsLoading(false);
                }
                
            }).catch((error)=>{
                navigate('/reservation-request/list');
                console.error(error);
            })
        }
        
        const handleGetBorrowedByCollection = async(id)=>{
            await getBorrowedBy(serverURL,id,token)
            .then((res)=>{
                setBookBorrowedBy(res)
                setIsLoading(false);
            }).catch((error)=>{
                navigate('/reservation-request/list');
                throw error;
            })
            
        }
        handleRequestInformation();

    },[collectionID, borrowerID, requestID,token,adminData,changeNotifier])

    return (
        <div className='w-full overflow-hidden'>
            <ToastContainer/>
            <button 
                className='p-2 rounded-full text-xl text-gray-800 font-medium mt-2'
                onClick={()=>{navigate('/reservation-request/list')}}
            >
                <FaArrowLeft/>
            </button>
            <div className='grid grid-cols-2 max-[890px]:grid-cols-1 p-2 gap-2'>
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
                                    bookBorrowedBy={bookBorrowedBy}
                                />
                            )
                        }
                </div>
            </div>

            <div className='mt-5 bg-sandstone rounded-md'>
                <div className='w-full bg-deepred text-white font-medium p-2 text-center rounded-t-md'>
                    <h1>Reservation Request</h1>
                </div>

                <ReservationInfoCard
                    requestInfo={requestInfo}
                    serverURL={serverURL}
                    bookBorrowedBy={bookBorrowedBy}
                    bookInfo={bookInfo}
                    adminData={adminData}
                    token={token}
                    collectionID={collectionID}
                    changeNotifier={changeNotifier}
                    setChangeNotifier={setChangeNotifier}
                />
            </div>
        </div>
    )
}

export default BookReservationInfo