import React, { useEffect, useState } from 'react'
import { Spinner, handleGetRequestInformations } from '../linkImports';
import { Link } from 'react-router-dom';

function BookReservationTable({requestData,isLoading,setReservationData}) {
    const [information, setInformation] = useState([]);
    const [reservationFilter, setReservationFilter] = useState('status');

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${day}/${month}`;
    }
    
    useEffect(()=>{
        const handleApi = async (collectionID, borrowerID, requestID) => {
            return await handleGetRequestInformations(collectionID, borrowerID, requestID, 'reservation')
        };
    
        const handleGetRequestInformation = async () => {
            try {
                const apiCalls = requestData.map(data => handleApi(data.borrowerCollectionID, data.borrowerID, data.requestID));
                const responses = await Promise.all(apiCalls);
                responses.reverse()
                setInformation(responses);
                setReservationData(responses)
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
                        <div className='flex items-center justify-end bg-cream p-2 gap-2 rounded-sm'>
                            <h1 className='font-medium'>Filter by:</h1>
                            <div className='w-28'>
                                <select 
                                    id="category" 
                                    className="bg-sandstone border border-none text-gray-900 text-sm rounded-sm focus:ring-transparent focus:border-none block w-full p-2.5 "
                                    value={reservationFilter}
                                    onChange={(e)=>{setReservationFilter(e.target.value)}}
                                >
                                    <option value="status">Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                </select>
                            </div>
                        </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-transparent">
                                <tr>
                                    <th scope="col" className="px-3 py-3">
                                        Status
                                    </th>
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
                                            information
                                            .filter(item => reservationFilter === 'status' || item.status === reservationFilter)
                                            .map((data,index)=>(
                                                <tr className="odd:bg-cream even:bg-transparent" key={index}>
                                                    <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                        {
                                                            data.status === 'Pending' ?
                                                            (
                                                                <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                    <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                                                                    Pending
                                                                </span>
                                                            ):(
                                                                <span className="inline-flex items-center bg-green-300 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                    <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                                                    Approved
                                                                </span>
                                                            )
                                                        }
                                                    </th>
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
                                                        <Link to={`/reservation-request/list/${data.collectionID}/${data.borrowerID}/${data.requestID}`}>View request</Link>
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

export default BookReservationTable