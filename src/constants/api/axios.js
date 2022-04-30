import axios from 'axios';

export const baseURL = "https://bootcamp.akbolat.net/";
export default axios.create({baseURL});

export const URL = {
    products : '/products',
    register : '/auth/local/register',
    login : '/auth/local'
}