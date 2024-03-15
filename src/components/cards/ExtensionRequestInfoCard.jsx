import React, { useState } from 'react'
import { Spinner, axios, toastError, toastSuccess } from '../linkImports'
import { useNavigate } from 'react-router-dom';

function ExtensionRequestInfoCard({userInfo,request,onHandBookInfo,serverURL,token}) {
    const navigate = useNavigate();
    const [isApprovedButtonLoading, setIsApprovedButtonLoading] = useState(false);
    const [isRejectLoading, setIsRejectLoading] = useState(false);
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${day}/${month}`;
    }

    const handleReject = async()=>{
        if(!request || !token){
            return
        }

        setIsRejectLoading(true)
        await axios.post(`${serverURL}/api/booklinker/extensionrequest/reject`,{requestID:request._id},{
            headers:{
                Authorization:token
            }
        }).then((res)=>{
            toastSuccess(`${res.data.message}`);
            navigate('/extension-request/list');
        }).catch((err)=>{
            toastError(err.response.data.message)
            navigate('/extension-request/list');
        });

        setIsRejectLoading(false)
    }
    const handleApprove = async()=>{
        if(!request || !token){
            return
        }

        setIsApprovedButtonLoading(true)

        const data = {
            onHandCollectionID:request.onHandCollectionID,
            onHandBookId:request.onHandBookId,
            duration:request.duration,
            requestID:request._id
        }

        await axios.post(`${serverURL}/api/booklinker/extensionrequest/approve`,data ,{
            headers:{
                Authorization:token
            }
        }).then((res)=>{
            toastSuccess(`${res.data.message}`);
            navigate('/extension-request/list');
        }).catch((err)=>{
            toastError(err.response.data.message)
            navigate('/extension-request/list');
        });
        setIsApprovedButtonLoading(false)
    }
    return (
        <div className='p-5'>
            <div className='grid grid-cols-2 max-[500px]:grid-cols-1 gap-3'>
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col'>
                        <span className='font-medium text-gray-900 '>
                            Borrower name:
                        </span>
                        <p className='bg-cream p-2 rounded-sm text-sm'>
                            {userInfo.firstName}
                        </p>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-medium text-gray-900 '>
                            Title:
                        </span>
                        <p className='bg-cream p-2 rounded-sm text-sm'>
                            {onHandBookInfo.title}
                        </p>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-medium text-gray-900 '>
                            Borrowed date:
                        </span>
                        <p className='bg-cream p-2 rounded-sm text-sm'>
                            {formatDate(onHandBookInfo.borrowedDate)}
                        </p>
                    </div>
                    <div className='flex flex-col break-all'>
                        <span className='font-medium text-gray-900 '>Return date</span>
                        <p className=' bg-cream p-2 rounded-sm text-sm max-h-60 overflow-auto'>
                            {formatDate(onHandBookInfo.returnDate)}
                        </p>
                    </div>
                    <div className='flex flex-col break-all'>
                        <span className='font-medium text-gray-900 '>Approved by</span>
                        <p className=' bg-cream p-2 rounded-sm text-sm max-h-60 overflow-auto'>
                            {onHandBookInfo.permittedBy}
                        </p>
                    </div>
                </div>
                <div>
                    <div className='flex flex-col'>
                        <span className='font-medium text-gray-900 '>
                            Requested duration:
                        </span>
                        <p className='bg-cream p-2 rounded-sm text-sm'>
                            {
                                request.duration === '1D' ?
                                ('1 day'):(
                                    request.duration === '2D' ?
                                    ('2 days'):(' 3 days')
                                )
                            }
                        </p>
                    </div>
                    <div className='flex flex-col break-all'>
                        <span className='font-medium text-gray-900 '>Reason: </span>
                        <p className=' bg-cream p-2 rounded-sm text-sm min-h-32 max-h-60 overflow-auto'>
                            reason
                        </p>
                    </div>
                    <div className='bg-cream mt-5 rounded-md'>
                        <div className='w-full bg-deepred text-white font-medium p-2 text-center rounded-t-md'>
                            <h1>Action</h1>
                        </div>
                        <div className='flex flex-row max-[300px]:flex-col w-full items-center justify-end gap-3 p-3'>
                            <button 
                                className='flex-1 max-[500px]:w-full py-2 bg-deepred text-white rounded-md drop-shadow-md'
                                onClick={handleReject}
                            >
                                {
                                    isRejectLoading ?
                                    (
                                        <div className='w-full flex items-center justify-center '>
                                            <Spinner/>
                                        </div>
                                    ):('Reject')
                                }
                            </button>
                            <button 
                                className="flex-1 max-[500px]:w-full py-2 bg-green-600 text-white rounded-md drop-shadow-md"
                                onClick={handleApprove}
                            >
                                {
                                    isApprovedButtonLoading ?
                                    (
                                        <div className='w-full flex items-center justify-center '>
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
    )
}

export default ExtensionRequestInfoCard