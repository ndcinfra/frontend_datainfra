import axios from 'axios';
import {BACKEND_API} from '../../utils/constants';

export const registerResource = (resources) => axios.post(BACKEND_API+'/v1/resource/resigster', {...resources});
export const getResourceDetail = (id) => axios.post(BACKEND_API+'/v1/resource/detail/'+id);
export const updateResource = (id, resources) => axios.post(BACKEND_API+'/v1/resource/update/'+id, {...resources});
export const deleteResource = (id) => axios.post(BACKEND_API+'/v1/resource/delete/'+id);