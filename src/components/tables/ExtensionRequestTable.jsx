import React from 'react'
import { useNavigate } from 'react-router-dom'

function ExtensionRequestTable({requestList}) {

    const navigate = useNavigate();

    return (
        <section className='w-full'>
            <div className='w-full h-[28rem] overflow-auto p-2'>
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
                                Duration
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                        <tbody className='relative'>
                            {
                                requestList.map((data,index)=>(
                                    data.request.status === 'Pending' ?
                                    (
                                        <tr 
                                            className="odd:bg-cream even:bg-transparent"
                                            key={index}
                                        >
                                            <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                {data.userName}
                                            </th>
                                            <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                {data.bookTitle}
                                            </th>
                                            <td className="px-3 py-2">
                                                {
                                                    data.request.duration === '1D' ?
                                                    ('1 day'):(
                                                        data.request.duration === '2D' ?
                                                        ('2 days'):('3 days')
                                                    )
                                                }
                                            </td>
                                            <td 
                                                className="px-3 py-2 cursor-pointer"
                                                onClick={()=>{navigate(`/extension-request/list/${data.request._id}`)}}
                                            >
                                                View request
                                            </td>
                                        </tr>
                                    ):(null)
                                ))
                            }
                        </tbody>
                </table>
            </div>
        </section>
    )
}

export default ExtensionRequestTable