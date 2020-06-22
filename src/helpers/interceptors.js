import axios from 'axios';
import logger from '../helpers/logger.js';

let log = console.log;

axios.interceptors.request.use((config) =>  {
    logger.SUCCESS(`Request(${config.method}): ${config.url} is completed successfull`);

    return config;
}, function (error) {
    return Promise.reject(error);
});