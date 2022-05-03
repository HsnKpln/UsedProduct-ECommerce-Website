import axios from 'axios';

export const baseURL = "https://bootcamp.akbolat.net/";

const jwt = JSON.parse(localStorage.getItem('userJwt'));

const isEmpty = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return true;
    }
    return false;
}
if(isEmpty(jwt)){
axios.defaults.headers.common = { 'Authorization': `Bearer ${jwt}` }
}


export default axios.create({ baseURL });

export const URL = {
    products: '/products',
    register: '/auth/local/register',
    login: '/auth/local',
    offers: '/offers'
}