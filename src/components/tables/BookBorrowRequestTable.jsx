import React from 'react'

function BookBorrowRequestTable() {
    return (
        <section className='w-full'>
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
                        <tbody>
                            <tr className="odd:bg-cream even:bg-transparent">
                                <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                    Borrow
                                </th>
                                <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                    Information Tech
                                </th>
                                <td className="px-3 py-2">
                                    ziza
                                </td>
                                <td className="px-3 py-2">
                                    2024/3/5
                                </td>
                                <td className="px-3 py-2">
                                    <button>View request</button>
                                </td>
                            </tr>
                            <tr className="odd:bg-cream even:bg-transparent">
                                <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                    Borrow
                                </th>
                                <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                    Information Tech
                                </th>
                                <td className="px-3 py-2">
                                    ziza
                                </td>
                                <td className="px-3 py-2">
                                    2024/3/5
                                </td>
                                <td className="px-3 py-2">
                                    <button>View request</button>
                                </td>
                            </tr>
                        </tbody>
                </table>
            </div>
        </section>
    )
}

export default BookBorrowRequestTable