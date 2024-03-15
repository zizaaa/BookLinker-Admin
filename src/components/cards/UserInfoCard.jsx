import React from 'react'

function UserInfoCard({requestInfo,serverURL}) {
    return (
        <div className='w-full'>
            <div className='w-full flex flex-col items-center justify-center mt-5 relative'>
                <img 
                    src={requestInfo.avatar ? `${serverURL}/${requestInfo.avatar}`:'/imgs/userAlt.png'}
                    className='h-20 w-20 rounded-full object-cover'
                    loading='lazy'
                />
                <h1 className='font-medium'>
                    {requestInfo.name ? requestInfo.name:`${requestInfo.firstName} ${requestInfo.lastName}`}
                </h1>
                <span className='text-sm absolute top-1 right-2 font-medium'>
                    Lvl {requestInfo.level}
                </span>
            </div>
            <div className='flex flex-col p-5 mt-3 text-sm gap-3'>
                    {
                        requestInfo.role === 'Student'?
                        (
                            <div className='flex items-center gap-1'>
                                <span className='font-medium'>USN: </span>
                                {requestInfo.userID}
                            </div>
                        ):(
                            <div className='flex items-center gap-1'>
                                <span className='font-medium'>Faculty ID: </span>
                                {requestInfo.userID}
                            </div>
                        )
                    }
                    {
                        requestInfo.role === 'Student'?
                        (
                            <div className='flex items-center gap-1'>
                                <span className='font-medium'>Program: </span>
                                {requestInfo.program}
                            </div>
                        ):(
                            <div className='flex items-center gap-1'>
                                <span className='font-medium'>Position: </span>
                                {requestInfo.position}
                            </div>
                        )
                    }
                {
                    requestInfo.role === 'Student'?
                    (
                        <div className='flex items-center gap-1'>
                            <span className='font-medium'>Year level: </span>
                            {requestInfo.yearLevel}
                        </div>
                    ):(null)
                }
                <div className='flex items-center gap-1'>
                    <span className='font-medium'>
                        Address: 
                    </span>
                    {requestInfo.address}
                </div>
                <div className='flex items-center gap-1'>
                    <span className='font-medium'>
                        Email: 
                    </span>
                    {typeof requestInfo.email === 'object' ? requestInfo.email.email : requestInfo.email}
                </div>
            </div>
        </div>
    )
}

export default UserInfoCard