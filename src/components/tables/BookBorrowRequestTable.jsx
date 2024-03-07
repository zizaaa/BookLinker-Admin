import React, { useEffect, useState } from 'react'
import { Spinner, axios, handleGetRequestInformations } from '../linkImports'
import { Link } from 'react-router-dom';

function BookBorrowRequestTable({requestData,isLoading}) {
    const [information, setInformation] = useState([]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${day}/${month}`;
    }
    
    useEffect(()=>{
        const handleApi = async (collectionID, borrowerID, requestID) => {
            return await handleGetRequestInformations(collectionID, borrowerID, requestID)
        };
    
        const handleGetRequestInformation = async () => {
            try {
                const apiCalls = requestData.map(data => handleApi(data.borrowerCollectionID, data.borrowerID, data.requestID));
                const responses = await Promise.all(apiCalls);
                setInformation(responses);
            } catch (error) {
                console.error(error)
            }
        };
        if (requestData.length > 0 && !isLoading) {
            handleGetRequestInformation();
        }
    },[requestData]);
    return (
        <section className='w-full'>
            {
                !isLoading ? 
                (
                    <div className='w-full h-[28rem] overflow-auto mt-2 p-2'>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-transparent">
                                <tr>
                                    <th scope="col" className="px-3 py-3">
                                        Requestor name
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Book name
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Request Date
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                                <tbody className='relative'>
                                    {
                                        information.length > 0 ?
                                        (
                                            information.map((data,index)=>(
                                                <tr className="odd:bg-cream even:bg-transparent" key={index}>
                                                    <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                        {
                                                            data.name
                                                        }
                                                    </th>
                                                    <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                        {data.title.length > 20 ? `${data.title.substring(0, 20)}...` : data.title}
                                                    </th>
                                                    <td className="px-3 py-2">
                                                        {
                                                            data.quantity
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            formatDate(data.requestDate)
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        <Link to={`/book-borrow/request/${data.collectionID}/${data.borrowerID}/${data.requestID}`}>View request</Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ):(
                                            <tr className="absolute right-[50%]">
                                                <td>No Request</td>
                                            </tr>
                                        )
                                    }
                                    
                                </tbody>
                        </table>
                    </div>
                ):(
                    <div className='w-full flex items-center justify-center h-[28rem]'>
                        <Spinner/>
                    </div>
                )
        }
        </section>
    )
}

export default BookBorrowRequestTable