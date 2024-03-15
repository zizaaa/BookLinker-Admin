import { axios } from '../components/linkImports'

const getBorrowedBy = async(serverURL,id,token)=>{
    return await axios.get(`${serverURL}/api/bookborrowedby/get/${id}`,{
        headers:{
            Authorization:token
        }
    }).then((res)=>{
        return res.data
    }).catch((error)=>{
        throw error;
    })
}

export default getBorrowedBy;