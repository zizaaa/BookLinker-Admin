import React, { useEffect, useState } from 'react'
import { admin, axios, cookie } from '../linkImports';
import BookSwappingTable from '../tables/BookSwappingTable';

function BookSwappingRequestHome() {
    const { adminData,getAdminAccount } = admin();
    const { token,getCookie } = cookie();
    const [isLoading, setIsLoading] = useState(false);

    const [reqInfoList,setReqInfoList] = useState([]);

    const env = import.meta.env;
    const serverURL = env.VITE_REACT_SERVER_URL;

    useEffect(()=>{
        const handleCredentials = async()=>{
            await getAdminAccount();
            await getCookie();
        }

        handleCredentials();
    },[])

    useEffect(()=>{
        const handleGetRequest = async()=>{
            setIsLoading(true);

            await axios.get(`${serverURL}/booklinker/swap/handleGetAllAdminSwapStoreRequest`,{
                headers:{
                    Authorization:token
                }
            }).then((res)=>{
                handleGetRequestInfo(res.data)
            }).catch((error)=>{
                console.error(error);
                setIsLoading(false)
            })
        }

        const handleGetRequestInfo = async(data)=>{
            await axios.post(`${serverURL}/booklinker/swap/getInformation`,{
                data
            },{
                headers:{
                    Authorization:token
                }
            }
            ).then((res)=>{
                setReqInfoList(res.data)
                setIsLoading(false)
            }).catch((error)=>{
                console.error(error);
                setIsLoading(false)
            })
        }
        
        if(token && adminData){
            handleGetRequest()
        }
        
    },[adminData,token])
    return (
        <div className='bg-sandstone rounded-md drop-shadow-md'>
            <div className='w-full bg-deepred text-white font-medium p-2 text-center rounded-t-md'>
                <h1>Book swapping request</h1>
            </div>
            <div className='w-full grid grid-cols-2 max-[490px]:grid-cols-1 text-center gap-2 p-2'>
                <div className='flex flex-col items-center justify-center h-32 bg-cream rounded-sm'>
                    <h1 className='text-deepred font-bold text-2xl'>Approved request</h1>
                    <span className='font-medium text-2xl'>
                        {reqInfoList.reduce((count, request) => request.status === 'Approved' ? count + 1 : count, 0)}
                    </span>
                </div>
                <div className='flex flex-col items-center justify-center h-32 bg-cream rounded-sm'>
                    <h1 className='text-deepred font-bold text-2xl'>Pending request</h1>
                    <span className='font-medium text-2xl'>
                        {reqInfoList.reduce((count, request) => request.status === 'Waiting for you to accept' ? count + 1 : count, 0)}
                    </span>
                </div>
            </div>
            <BookSwappingTable
                reqInfoList={reqInfoList}
            />
        </div>
    )
}

export default BookSwappingRequestHome