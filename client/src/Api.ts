import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URL


const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // You can add other headers like authorization token here
    },
});

api.interceptors.request.use(request => {

    return request;
}, error => {

    return Promise.reject(error);
});

// Add a response interceptor to log the response
api.interceptors.response.use(response => {

    return response;
}, error => {
    console.error('Response Error', error);
    return Promise.reject(error);
});


const apiGet = (url:string, config = {}) => {
    console.log('apiGet', url);
    console.log(BASE_URL)
    return api.get(url, config);
};

const apiPost = (url:string, data:any = {}, config = {}) => {
    return api.post(url, data, config);
};

export { apiGet, apiPost };