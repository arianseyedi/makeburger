import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-mkburger.firebaseio.com/'
});

export default instance;