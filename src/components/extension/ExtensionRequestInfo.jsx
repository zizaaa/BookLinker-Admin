import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { BookInfoCard, ExtensionRequestInfoCard, Spinner, UserInfoCard, axios, cookie, getBookInfo, getBorrowedBy, getUserInfo } from '../linkImports';
import { FaArrowLeft } from '../icons'

function ExtensionRequestInfo() {
    const navigate = useNavigate();
    const { requestID } = useParams();
    const { token,getCookie } = cookie();

    const [isLoading, setIsLoading] = useState(false);
    const [request, setRequest] = useState({});
    const [bookInfo, setBookInfo] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [borrowedBy, setBorrowedBy] = useState([]);
    const [onHandBookInfo, setOnHandBookInfo] = useState({});

    const env = import.meta.env;
    const serverURL = env.VITE_REACT_SERVER_URL;

    useEffect(()=>{

        if(!requestID){
            return navigate('/extension-request/list');
        }

        const handleGetToken = async()=>{
            await getCookie();
        }

        handleGetToken();
    },[requestID])

    useEffect(()=>{

        if(!token){
            return
        }

        setIsLoading(true)

        // get request
        const handleGetRequest = async()=>{
            await axios.get(`${serverURL}/api/booklinker/extensionrequest/find/${requestID}`,{
                headers:{
                    Authorization:token
                }
            }).then(async(res)=>{
                setRequest(res.data)
                
                await handleGetBook(res.data.bookId);
                await handleGetUserInfo(res.data.userID);
                await handleOnhandBook(res.data.onHandCollectionID,res.data.onHandBookId);
                setIsLoading(false);
            }).catch((error)=>{
                console.error(error);
                navigate('/extension-request/list')
            });
        }

        // get book
        const handleGetBook = async(bookId)=>{
            await getBookInfo(serverURL,bookId,token)
            .then((res)=>{
                setBookInfo(res)

                if(res.borrowedBy){
                    handleGetBorrowedByCollection(res.borrowedBy)
                }else{
                    setBorrowedBy([])
                    setIsLoading(false);
                }

            }).catch((error)=>{
                console.error(error);
                navigate('/extension-request/list')
            });
        }

        // get user info
        const handleGetUserInfo = async(userId)=>{
            await getUserInfo(serverURL,userId,token)
            .then((res)=>{
                setUserInfo(res)
            }).catch((error)=>{
                navigate('/extension-request/list')
                console.error(error);
            });
        }

        // get borrowed by collection
        const handleGetBorrowedByCollection = async(id)=>{
            await getBorrowedBy(serverURL,id,token)
            .then((res)=>{
                setBorrowedBy(res)
            }).catch((error)=>{
                navigate('/extension-request/list')
                throw error;
            })
            
        }
        
        //get onhand book
        const handleOnhandBook = async(onHandCollectionID,onHandBookId)=>{
            await axios(`${serverURL}/api/booklinker/onhandBooks/single/${onHandCollectionID}?onHandBookID=${onHandBookId}`,{
                headers:{
                    Authorization:token
                }
            })
            .then((res)=>{
                setOnHandBookInfo(res.data)
            }).catch((error)=>{
                throw error;
            })
        }

        handleGetRequest();
    },[token])
    return (
        <div className='w-full overflow-hidden relative'>
            <ToastContainer/>
            <div className='p-2'>
                <button 
                    className='text-xl bg-deepred p-[0.4rem] rounded-full text-white opacity-50 hover:opacity-80 transition-all duration-200 z-20'
                    onClick={()=>{navigate('/extension-request/list')}}
                >
                    <FaArrowLeft/>
                </button>
            </div>
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
                                    serverURL={serverURL}
                                    requestInfo={userInfo}
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
                                    bookBorrowedBy={borrowedBy}
                                />
                            )
                        }
                </div>
            </div>

            <div className='mt-5 bg-sandstone rounded-md'>
                <div className='w-full bg-deepred text-white font-medium p-2 text-center rounded-t-md'>
                    <h1>Request Information</h1>
                </div>
                {
                    isLoading ?
                    (
                        <div className='w-full flex items-center justify-center h-40'>
                            <Spinner/>
                        </div>
                    ):(
                        <ExtensionRequestInfoCard
                            userInfo={userInfo}
                            request={request}
                            onHandBookInfo={onHandBookInfo}
                            serverURL={serverURL}
                            token={token}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default ExtensionRequestInfo