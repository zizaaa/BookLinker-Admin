import { axios } from '../components/linkImports'

const sendAndApproveBook = async(serverURL,token,bookId,borrowerID,bookRequestID,borrowedByData,userStatus,type)=>{
    return await axios.post(`${serverURL}/api/booklinker/bookHistory/add`,{
        bookId,
        borrowerID,
        bookRequestID,
        borrowedByData,
        userStatus,
        type
    },{
        headers:{
            Authorization:token
        }
    }).then((res)=>{
        return res
    }).catch((error)=>{
        throw error
    })
}

export default sendAndApproveBook;