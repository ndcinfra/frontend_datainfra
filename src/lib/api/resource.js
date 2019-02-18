import axios from 'axios';

export const resourceRegister = (resources) => axios.post('/v1/resource/resigster', {...resources});