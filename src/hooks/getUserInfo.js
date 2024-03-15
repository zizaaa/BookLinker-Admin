import { axios } from '../components/linkImports'

const getUserInfo = async(serverURL,userId,token)=>{
    return await axios.get(`${serverURL}/api/booklinker/getSingleData/${userId}`,{
        headers:{
            Authorization:token
        }
    }).then((res)=>{
        return res.data
    }).catch((error)=>{
        throw error;
    })
}

export default getUserInfo