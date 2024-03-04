import React from 'react'

function TransactionsHistory() {
    return (
        <section className='w-full bg-cream rounded-md drop-shadow-md mt-5'>
            <div className='flex flex-row max-[400px]:flex-col items-center max-[400px]:items-start gap-0 max-[400px]:gap-2 justify-between mt-2 w-full bg-deepred text-white font-medium p-2 rounded-t-md'>
                <h1 className='font-medium text-white'>Transaction history</h1>
                <div className='flex flex-row max-[300px]:flex-col w-auto max-[300px]:w-full items-center gap-3'>
                    <form className="flex flex-row items-center">
                        <label htmlFor="sort" className="block text-sm font-medium text-white w-24">Filter by</label>
                        <select id="sort" className="bg-sandstone border-none text-black text-sm rounded-sm focus:ring-transparent block w-full p-2.5">
                            <option value="barrow">Barrowed</option>
                            <option value="DE">Swap</option>
                        </select>
                    </form>
                    {/* <CSVLink data={requestData?.history || []} headers={headers} filename="book_request_data.csv"> */}
                        <button className='p-2 rounded-sm bg-sandstone text-black'>Download</button>
                    {/* </CSVLink> */}
                </div>
            </div>
            <div className='w-full h-96 overflow-auto mt-2 p-2'>
                {/* {
                    !isLoading ?
                    (
                        borrowHistory?.history?.length > 0 ?
                        ( */}
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-transparent">
                                    <tr>
                                        <th scope="col" className="px-3 py-3">
                                            Transaction
                                        </th>
                                        <th scope="col" className="px-3 py-3">
                                            Book name
                                        </th>
                                        <th scope="col" className="px-3 py-3">
                                            Quantity
                                        </th>
                                        <th scope="col" className="px-3 py-3">
                                            Date
                                        </th>
                                        <th scope="col" className="px-3 py-3">
                                            Borrower name
                                        </th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        <tr className="odd:bg-sandstone even:bg-transparent">
                                            <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                Borrow
                                            </th>
                                            <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                Information Tech
                                            </th>
                                            <td className="px-3 py-2">
                                                
                                                1
                                            </td>
                                            <td className="px-3 py-2 text-start max-[350px text-center]:">
                                                
                                                2024/3/19 - 2024/3/24
                                            </td>
                                            <td className="px-3 py-2 text-start max-[350px text-center]:">
                                                Jay Ar
                                            </td>
                                        </tr>
                                        <tr className="odd:bg-sandstone even:bg-transparent">
                                            <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                Borrow
                                            </th>
                                            <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                Information Tech
                                            </th>
                                            <td className="px-3 py-2">
                                                
                                                1
                                            </td>
                                            <td className="px-3 py-2 text-start max-[350px text-center]:">
                                                
                                                2024/3/19 - 2024/3/24
                                            </td>
                                            <td className="px-3 py-2 text-start max-[350px text-center]:">
                                                Jay Ar
                                            </td>
                                        </tr>
                                        <tr className="odd:bg-sandstone even:bg-transparent">
                                            <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                Borrow
                                            </th>
                                            <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                Information Tech
                                            </th>
                                            <td className="px-3 py-2">
                                                
                                                1
                                            </td>
                                            <td className="px-3 py-2 text-start max-[350px text-center]:">
                                                
                                                2024/3/19 - 2024/3/24
                                            </td>
                                            <td className="px-3 py-2 text-start max-[350px text-center]:">
                                                Jay Ar
                                            </td>
                                        </tr>
                                        <tr className="odd:bg-sandstone even:bg-transparent">
                                            <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                Borrow
                                            </th>
                                            <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                Information Tech
                                            </th>
                                            <td className="px-3 py-2">
                                                
                                                1
                                            </td>
                                            <td className="px-3 py-2 text-start max-[350px text-center]:">
                                                
                                                2024/3/19 - 2024/3/24
                                            </td>
                                            <td className="px-3 py-2 text-start max-[350px text-center]:">
                                                Jay Ar
                                            </td>
                                        </tr>
                                        <tr className="odd:bg-sandstone even:bg-transparent">
                                            <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                Borrow
                                            </th>
                                            <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                Information Tech
                                            </th>
                                            <td className="px-3 py-2">
                                                
                                                1
                                            </td>
                                            <td className="px-3 py-2 text-start max-[350px text-center]:">
                                                
                                                2024/3/19 - 2024/3/24
                                            </td>
                                            <td className="px-3 py-2 text-start max-[350px text-center]:">
                                                Jay Ar
                                            </td>
                                        </tr>
                                        <tr className="odd:bg-sandstone even:bg-transparent">
                                            <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                Borrow
                                            </th>
                                            <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                Information Tech
                                            </th>
                                            <td className="px-3 py-2">
                                                
                                                1
                                            </td>
                                            <td className="px-3 py-2 text-start max-[350px text-center]:">
                                                
                                                2024/3/19 - 2024/3/24
                                            </td>
                                            <td className="px-3 py-2 text-start max-[350px text-center]:">
                                                Jay Ar
                                            </td>
                                        </tr>
                                        <tr className="odd:bg-sandstone even:bg-transparent">
                                            <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                Borrow
                                            </th>
                                            <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                Information Tech
                                            </th>
                                            <td className="px-3 py-2">
                                                
                                                1
                                            </td>
                                            <td className="px-3 py-2 text-start max-[350px text-center]:">
                                                
                                                2024/3/19 - 2024/3/24
                                            </td>
                                            <td className="px-3 py-2 text-start max-[350px text-center]:">
                                                Jay Ar
                                            </td>
                                        </tr>
                                    </tbody>
                            </table>
                        {/* ):(
                            <div className="w-full h-full flex items-center justify-center">
                                <p className='text-sm font-medium text-slate-600'>No history</p>
                            </div>
                        )
                    ):(
                        <div className="w-full h-full flex items-center justify-center">
                            <Spinner/>
                        </div>
                    )
            } */}
            </div>
                {/* Pagination */}
                <div className="flex flex-col items-center pb-5">
                    {/* Help text */}
                    <span className="text-sm text-gray-700 mt-2">
                        Showing <span className="font-semibold text-gray-900">1</span> to{' '}
                        <span className="font-semibold text-gray-900">15</span> of{' '}
                            <span className="font-semibold text-gray-900">100</span> Entries
                    </span>
                    {/* Buttons */}
                    <div className="inline-flex mt-2 xs:mt-0">
                        <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-deepred rounded-s">
                            Prev
                        </button>
                        <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-deepred border-0 border-s border-cream rounded-e">
                            Next
                        </button>
                    </div>
                </div>
        </section>
    )
}

export default TransactionsHistory