import axios from 'axios';
import {store} from '../store/store'
// import { useSelector, useDispatch } from 'react-redux'


const instance = axios.create({
    baseURL:  process.env.REACT_APP_HOST
});


instance.interceptors.request.use(async (request) => {

    request.headers = {
        ...request.headers,
        Authorization: `Bearer ${store.getState().app.token}`
    }
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

// axios.interceptors.response.use(response => {
//     console.log(response);
//     // Edit response config
//     return response;
// }, error => {
//     console.log(error);
//     return Promise.reject(error);
// });

// instance.defaults.headers.common['Authorization'] = ;


export default instance;