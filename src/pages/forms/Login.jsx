import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { FaLock,RiAdminFill } from '../../components/icons'
import { Spinner, admin, axios, cookie, toastError } from '../../components/linkImports';

function Login() {
    const { setCookie} = cookie();
    const { getAdminAccount } = admin();
    const [credential, setCredential] = useState({
        adminID:'',
        password:'',
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogIn = async(e)=>{
        e.preventDefault();
        setIsLoading(true);

        if(!credential.adminID || !credential.password){
            setIsLoading(false);
            return toastError('Please input your credentials!');
        }

        try {
            const env = import.meta.env;
            const serverURL = env.VITE_REACT_SERVER_URL;

            await axios.post(`${serverURL}/booklinker/api/admin/login`,{
                adminID:credential.adminID,
                password:credential.password
            })
            .then(async(res)=>{
                await setCookie(res.data.adminId,res.data.adminToken);
                await getAdminAccount();
                navigate('/');
                setIsLoading(false);
            }).catch((error)=>{
                setIsLoading(false);
                return toastError(`${error.response.data.message}`);
            })
        } catch (error) {
            setIsLoading(false);
            return toastError(`${error.response.data.message}`);
        }
    }

    return (
        <section className='bg-sandstone w-full h-screen flex items-center justify-center pt-20 md:pt-0 pb-10 md:pb-0 overflow-hidden'>
            <div className='flex flex-row items-center justify-center py-10 px-10 max-[450px]:px-2 gap-0 md:gap-5 drop-shadow-md bg-cream rounded-md w-auto max-[450px]:w-full mx-5 relative overflow-hidden'>
                <ToastContainer />
                <form className='flex flex-col w-[400px] max-[450px]:w-[95%] h-full py-2'>
                <h1 
                    className='font-medium text-5xl max-[300px]:text-4xl mb-5 text-deepred drop-shadow-md'
                    id='title'
                >
                    BookLinker
                </h1>

                    <label 
                    htmlFor='usn' 
                    className='font-medium text-sm'
                    >
                        Admin ID
                    </label>
                    <div className="flex items-center bg-white rounded-md">
                    <span className='bg-sandstone p-2.5 text-xl text-deepred rounded-l-md'>
                        <RiAdminFill/>
                    </span>
                    <input 
                        type='text' 
                        name='adminID' 
                        id='adminID'
                        placeholder='********'
                        className='outline-none ring-transparent focus:outline-none focus:ring-transparent border-none bg-transparent flex-1'
                        value={credential.adminID}
                        onChange={(e)=>{setCredential(prev => ({...prev,adminID:e.target.value}))}}
                        required
                        autoFocus
                    />
                    </div>
                    
                    <label 
                    htmlFor='pass'
                    className='font-medium text-sm mt-3'
                    >
                    Password
                    </label>
                    <div className='flex items-center bg-white rounded-md'>
                    <span className='bg-sandstone p-2.5 text-xl text-deepred rounded-l-md'>
                        <FaLock/>
                    </span>
                    <input 
                        type='password' 
                        name='pass' 
                        id='pass'
                        placeholder='•••••••••'
                        className='outline-none ring-transparent focus:outline-none focus:ring-transparent border-none bg-transparent flex-1'
                        value={credential.password}
                        onChange={(e)=>{setCredential(prev => ({...prev,password:e.target.value}))}}
                        required
                    />
                    </div>
                    <div className='mt-1'>
                    <Link to='/form/forgotpass' 
                        className='text-deepred font-medium'

                    >
                        Forgot password
                    </Link>
                    </div>
                    <button 
                        className='bg-deepred mt-5 p-2 text-white rounded-md flex items-center justify-center drop-shadow-md'
                        onClick={(e)=>{handleLogIn(e)}}
                    >
                        {
                            isLoading ?
                            (
                                <Spinner/>
                            ):(
                                'Log in'
                            )
                        }
                    </button>
                </form>
                <div className='md:block hidden'>
                <img 
                    src='/logo/logo3.png'
                    className='w-[400px] object-cover'
                />
                </div>
            </div>
        </section>
    )
}

export default Login