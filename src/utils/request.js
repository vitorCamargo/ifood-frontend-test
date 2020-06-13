import axios from 'axios';

export const spotifyBaseUrl = 'https://api.spotify.com/v1/';

export default class Request {

    constructor(resource, baseURL = spotifyBaseUrl) {
        this.resource = resource;
        this.axios = axios.create({
            baseURL,
            timeout: 500000,
        });
    }

    post = (data, additionalPath = '') => {
        const resource = `${this.resource}/${additionalPath}`;
        const config = {
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
        };
        return this.axios.post(resource, data, config);
    };

    putById = (id, data, additionalPath = '', headersConfig = {}) => {
        const resource = `${this.resource}/${id}${additionalPath}`;
        const config = {
            headers: {
                ...headersConfig,
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        return this.axios.put(resource, data, config);
    };

    get = queryParams => {
        const { resource } = this;
        const config = {
            params: queryParams,
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
        };
        return this.axios.get(resource, config);
    };

    getById = (id, queryParams, additionalPath = '') => {
        const resource = `${this.resource}/${id}${additionalPath}`;
        const config = {
            params: queryParams,
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
        };
        return this.axios.get(resource, config);
    };

}
