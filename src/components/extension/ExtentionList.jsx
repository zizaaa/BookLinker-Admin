import React, { useEffect, useState } from 'react'
import { ExtensionRequestTable, Spinner, axios, cookie } from '../linkImports'

function ExtentionList() {
    const { getCookie, token } = cookie();

    const [isLoading, setIsLoading] = useState(false);
    const [requestList, setRequestList] = useState([]);

    const env = import.meta.env;
    const serverURL = env.VITE_REACT_SERVER_URL;

    useEffect(()=>{
        const handleGetCookie = async()=>{
            await getCookie();
        }
        handleGetCookie()
    },[])

    useEffect(()=>{
        
        if(!token){
            return;
        }

        setIsLoading(true);

        const GetAllRequest = async()=>{
            await axios.get(`${serverURL}/api/booklinker/extensionrequest/get`,{
                headers:{
                    Authorization:token
                }
            }).then((res)=>{
                setRequestList(res.data)
            }).catch((error)=>{
                console.error(error);
            })
            setIsLoading(false)
        }

        GetAllRequest();
    },[token]);

    return (
        <div className='bg-sandstone rounded-md drop-shadow-md relative'>
            <div className='w-full bg-deepred text-white font-medium p-2 text-center rounded-t-md'>
                <h1>Return Date Extension Request</h1>
            </div>
            <div className='w-full grid grid-cols-2 max-[490px]:grid-cols-1 gap-2 p-2'>
                <div className='flex flex-col items-center justify-center h-32 bg-cream rounded-sm text-center'>
                    <h1 className='text-deepred font-bold text-2xl'>Approved request</h1>
                    <span className='font-medium text-2xl'>
                        {requestList.reduce((count, request) => request.request.status === 'Approved' ? count + 1 : count, 0)}
                    </span>
                </div>
                <div className='flex flex-col items-center justify-center h-32 bg-cream rounded-sm text-center'>
                    <h1 className='text-deepred font-bold text-2xl'>Pending request</h1>
                    <span className='font-medium text-2xl'>
                        {requestList.reduce((count, request) => request.request.status === 'Pending' ? count + 1 : count, 0)}
                    </span>
                </div>
            </div>
            {
                isLoading ?
                (
                    <div className='w-full flex items-center justify-center h-[28rem]'>
                        <Spinner/>
                    </div>
                ):(
                    requestList.length !== 0 ?
                    (
                        <ExtensionRequestTable
                            requestList={requestList}
                        />
                    ):(
                        <div className='w-full h-[28rem] flex items-center justify-center'>
                            <p className='text-sm font-medium text-gray-500'>No request</p>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default ExtentionList