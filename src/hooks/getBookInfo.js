import { axios } from '../components/linkImports'

const getBookInfo = async(serverURL,bookId,token)=>{
    return await axios.get(`${serverURL}/api/booklinker/getSingleBook/${bookId}`,{
        headers:{
            Authorization:token
        }
    }).then((res)=>{
        return res.data.book
    }).catch((error)=>{
        throw error;
    })
}

export default getBookInfo