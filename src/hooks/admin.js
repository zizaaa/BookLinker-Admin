import { create } from 'zustand';
import Cookies from 'js-cookie';
import axios from 'axios';

const admin = create((set)=>({
    adminData:null,

    getAdminAccount: async()=>{
        const adminId = Cookies.get('adminId');
        const adminToken = Cookies.get('adminToken');

            if (!adminId || !adminToken) {
                set({adminData:null})
                return;
            }

        try {
            const env = import.meta.env;
            const serverURL = env.VITE_REACT_SERVER_URL;

            const res = await axios.get(`${serverURL}/booklinker/api/admin/getSingleAcc/${adminId}`, {
                headers: {
                    authorization: adminToken,
                },
            });

            set({adminData:res.data})
        } catch (error) {
            Cookies.remove('adminToken');
            Cookies.remove('adminId');
            location.reload();
            console.error(error)
        }
    }
}))

export default admin;