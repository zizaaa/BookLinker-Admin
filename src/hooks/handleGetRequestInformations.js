import { axios } from '../components/linkImports'
import Cookies from 'js-cookie';

const handleGetRequestInformations = async(collectionID,borrowerID,requestID)=>{
    try {
        const env = import.meta.env;
        const serverURL = env.VITE_REACT_SERVER_URL;
        const token = Cookies.get('adminToken');
        
        const response = await axios.get(`${serverURL}/api/booklinker/admin/getRequestInformation`, {
            params: {
                collectionID,
                borrowerID,
                requestID
            },
            headers:{
                Authorization:token
            }
        });
        return response.data; // Return the data
    } catch (error) {
        console.error("Error fetching request information:", error);
        throw error; // Throw the error
    }
}

export default handleGetRequestInformations;