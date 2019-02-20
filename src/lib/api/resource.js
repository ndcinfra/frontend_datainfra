import axios from 'axios';
//require('dotenv').config();

export const registerResource = (resources) => axios.post('/v1/resource/resigster', {...resources});
export const getResourceDetail = (id) => axios.post('/v1/resource/detail/'+id);
export const updateResource = (id, resources) => axios.post('/v1/resource/update/'+id, {...resources});
export const deleteResource = (id) => axios.post('/v1/resource/delete/'+id);