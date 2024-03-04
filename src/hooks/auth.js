import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

export const authenticate = () => {
      // Check if userId and userToken cookies exist
        const userId = Cookies.get('adminId');
        const userToken = Cookies.get('adminToken');

        if (!userId || !userToken) {
            // userId or userToken is missing, user is not authenticated
            return false;
        }

        try {
            const decodedToken = jwtDecode(userToken); // You'll need to import jwt_decode or use your preferred library
            const currentTime = Date.now() / 1000; // Convert current time to seconds
    
            // Check if the token's expiration time is in the future
            return decodedToken.exp > currentTime;
        } catch (error) {
            // Token decoding error or invalid token
            return false;
        }
};