import React, { useEffect, useState } from 'react'
import { Spinner, admin, axios, cookie } from '../linkImports'
import { Link } from 'react-router-dom'

function BookSwappingTable({reqInfoList}) {

    return (
        <section className='w-full'>
            <div className='w-full h-[28rem] overflow-auto mt-2 p-2'>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-transparent">
                        <tr>
                            <th scope="col" className="px-3 py-3">
                                Sender
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Receiver
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className='relative'>
                        {
                            reqInfoList.length > 0 ?
                            (
                                reqInfoList
                                .map((data,index)=>(
                                    <tr className="odd:bg-cream even:bg-transparent" key={index}>
                                        <td scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                            {
                                                data.sender.firstName
                                            }
                                        </td>
                                        <td scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                            {
                                                data.receiver.firstName
                                            }
                                        </td>
                                        <td scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                            <span className="inline-flex items-center bg-orange-300 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-orange-900 dark:text-orange-300">
                                                <span className="w-2 h-2 me-1 bg-orange-500 rounded-full"></span>
                                                {data.status}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2">
                                            <Link to={`/book-swapping/list/${data.id}`}>View request</Link>
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
        </section>
    )
}

export default BookSwappingTable