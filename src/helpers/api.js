import axios from 'axios';
import './interceptors.js';

export default class Api {
    constructor() {
        this._api = axios.create({
            baseURL: 'http://localhost:8080/',
            proxy: {
                host: this.baseURL,
                port: 8080,
            }
        });
    }

    async get(url) {
        const res = await this._api.get(url);
        return res;
    }
}