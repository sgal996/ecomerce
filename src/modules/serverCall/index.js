import Auth from '../Auth'
import jumpTo from '../Navigation'
import axios from 'axios'
import qs from 'qs'
import paypalConfig from '../../configs/paypalConfig'

//const URL = 'https://zack-ecommerce-nodejs.herokuapp.com'
const URL = 'http://localhost:8081'

const serverCall = (config) => {
    //header authorization
    if (Auth.user_token) {
        const token = Auth.getToken()
        config.headers = {
            "authorization": token
        }
    }
    //interceptors handle network error
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        function (error) {
            if (!error.response) {
                error.response = {
                    data: 'net work error',
                    status: 500
                }
            }
            if (error.response.status === 401) {
                Auth.logout()
                jumpTo('/login')
                throw error
            }
            return Promise.reject(error);
        });
    config.baseURL = URL
    return axios(config)
}

export default serverCall

export const getCurrentUser = () => {

    return serverCall({
        method: 'GET',
        url: '/user/me'
    }).then(res => {

        let new_token = {
            ...Auth.user_token,
            'user_id': res.data.id,
            'user_name': res.data.name
        };
        Auth.setUserToken(new_token);
        return res;
    })

}
export const login = (email, password) => {
  const body =
      {
        "credential": {
          "email": email,
          "password": password
        }
      }
  return serverCall({
    method: 'POST',
    url: '/auth/login',
    data: {
      "username": email,
      "password": password
    }
  })
      .then(res => {
          const token = {
              'token': res.data.tokenType + " " + res.data.accessToken,
              'user_id': res.data.id,
              'user_name': res.data.name
          };
          Auth.setUserToken(token);
          return res;
      })
}

export const getPaypalToken = () => {
    return axios({
        method: 'POST',
        url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        auth: {
            username: paypalConfig.username,
            password: paypalConfig.password
        },
        data: qs.stringify({"grant_type": "client_credentials"})
    })
}