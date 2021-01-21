import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'https://newapi.acercate.com.co/AcercateNegociosBackend/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default clienteAxios;