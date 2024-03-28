import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BookSwapReceiver, BookSwapSender,Spinner, admin, axios, cookie, toastError, toastSuccess } from '../linkImports';
import { FaArrowLeft,IoMdSwap} from '../icons'
import { ToastContainer } from 'react-toastify';

function BookSwappingInformation() {
    const { id } = useParams();
    const { adminData,getAdminAccount } = admin();
    const { token,getCookie } = cookie();

    const [dataInformations, setDataInformations] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isRejectBtnLoading, setIsRejectBtnLoading] = useState(false);

    const navigate = useNavigate();
    
    const env = import.meta.env;
    const serverURL = env.VITE_REACT_SERVER_URL;
    
    useEffect(()=>{
        if(!id){
            navigate('/book-swapping/list')
        }

        const handleGetToken = async()=>{
            await getCookie();
            await getAdminAccount();
        }
        handleGetToken()
    },[id])

    useEffect(()=>{
        const handleGetSingleData = async()=>{
            setIsLoading(true)

            await axios.get(`${serverURL}/booklinker/swap/handleGetSingleAdminSwapStoreRequest/${id}`,{
                headers:{
                    Authorization:token
                }
            })
            .then((res)=>{
                setDataInformations(res.data)
            }).catch((error)=>{
                console.error(error);
                navigate('/book-swapping/list')
            })

            setIsLoading(false)
        }

        if(token && adminData && id){
            handleGetSingleData()
        }
    },[id,token,adminData])

    const handleDissaprove = async()=>{
        setIsRejectBtnLoading(true)
        await axios.post(`${serverURL}/booklinker/swap/handleRequestAction`,{
            data:dataInformations.data,
            status:'Rejected'
        },{
            headers:{
                Authorization:token
            }
        }).then((res)=>{
            toastSuccess(res.data)
            navigate('/book-swapping/list')
        }).catch((error)=>{
            toastError(`${error.response.data.message}`)
        })
        setIsRejectBtnLoading(false)
    }
    return (
        <div className='drop-shadow-md relative overflow-hidden'>
            <ToastContainer/>
            <div className='p-2'>
                <button 
                    className='text-xl bg-deepred p-[0.4rem] rounded-full text-white opacity-50 hover:opacity-80 transition-all duration-200 z-20'
                    onClick={()=>{navigate('/book-swapping/list')}}
                >
                    <FaArrowLeft/>
                </button>
            </div>
            
            <div className='flex flex-row max-[900px]:flex-col items-center w-full pb-2 gap-2 mt-1'>
                <div className='flex-1 bg-sandstone rounded-md w-full'>
                    <div className='w-full bg-deepred text-white font-medium p-2 text-center rounded-t-md'>
                        <h1>Sender</h1>
                    </div>
                    <BookSwapSender
                        serverURL={serverURL}
                        dataInformations={dataInformations}
                        isLoading={isLoading}
                    />
                </div>
                <div className='text-2xl max-[800px]:rotate-90'>
                    <IoMdSwap/>
                </div>
                <div className='flex-1 bg-sandstone rounded-md w-full'>
                    <div className='w-full bg-deepred text-white font-medium p-2 text-center rounded-t-md'>
                        <h1>Receiver</h1>
                    </div>
                    <BookSwapReceiver
                        serverURL={serverURL}
                        dataInformations={dataInformations}
                        isLoading={isLoading}
                    />
                </div>
            </div>
            <div className='w-full flex flex-row items-center justify-end gap-2 mt-2 bg-sandstone p-2 rounded-md'>
                <button 
                    className='bg-deepred w-24 py-2 text-white rounded-md flex items-center justify-center'
                    onClick={handleDissaprove}
                >
                    {
                        !isRejectBtnLoading ?
                        ('Reject'):(
                            <Spinner/>
                        )
                    }
                </button>
                <button 
                    className='bg-green-600 w-24 py-2 text-white rounded-md flex items-center justify-center'
                >
                    Approve
                </button>
            </div>
        </div>
    )
}

export default BookSwappingInformation