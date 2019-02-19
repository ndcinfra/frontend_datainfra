import axios from 'axios';

export const registerResource = (resources) => axios.post('/v1/resource/resigster', {...resources});
export const getResourceDetail = (id) => axios.post('/v1/resource/detail/'+id);
export const updateResource = (id, resources) => axios.post('/v1/resource/update/'+id, {...resources});