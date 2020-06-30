import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://burger-store-66049.firebaseio.com/'
})
export default instance