import request from 'superagent';
import {BACKEND_API} from '../../utils/constants';

export const getImgUrl = (file) => request.post(BACKEND_API+'/v1/s3/uploadImage').send(file);