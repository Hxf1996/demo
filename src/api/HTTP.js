import Axios from 'axios';

/* eslint-disable import/no-mutable-exports */
let baseURL = process.env.API_ROOT;
// 临时修改
if (process.env.NODE_ENV === 'development') {
    baseURL = '/';
}

const HTTP = Axios.create({
    baseURL,
    transformResponse: [
        data => JSON.parse(data),
    ],
    withCredentials: true,
});

export {
    baseURL,
};

export default HTTP;
