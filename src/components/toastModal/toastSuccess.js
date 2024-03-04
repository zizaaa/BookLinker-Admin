import { toast } from 'react-toastify';

const toastSuccess = (message)=>{
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover:false,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

export default toastSuccess;