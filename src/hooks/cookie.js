import { create } from 'zustand';
import Cookies from 'js-cookie';

const cookie = create((set)=>({
    adminId:null,
    token:null,

    setCookie: (adminId, token)=>{
        // Save the user ID and token as cookies with an expiration time
        Cookies.set('adminId', adminId, {expires: 7});
        Cookies.set('adminToken', token, {expires: 7})
    },

    getCookie: ()=>{
        set({
            adminId:Cookies.get('adminId'),
            token:Cookies.get('adminToken')
        })
    },

    clearCookie:()=>{
        Cookies.remove('adminToken');
        Cookies.remove('adminId');

        set({
            adminId:null,
            token:null
        })
    }
}));

export default cookie;