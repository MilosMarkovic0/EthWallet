import { BASE_API_URL } from './env';
import axios from 'axios';
import Cookies from 'js-cookie';


/**
 * function name : [API Folder name] + [API Sub Folder name1] + ... + [target API name]
 */

//Users APIs
const Users_register_register = (emailAddr, pass, fName, lName) => {
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BASE_API_URL}/auth/register`,
        data: {
            email : emailAddr,
            password : pass,
            firstName : fName,
            lastName : lName,
        }
      };
      
      return axios.request(config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
}

const Users_login_login = () => {

}

const Users_refresh_access = () => {

}  

const Users_send_verification_email = () => {

}

const Users_verify_email = () => {

}

const Users_reset_password = () => {

}

const Users_user = () => {

}

const Users_update = () => {

}

//...
//Profile APIs
const Profile_view_get = () => {

}

const Profile_view_create = () => {
    
}

const Profile_view_update = () => {
    
}

export {
    Users_register_register,
    Users_login_login
}