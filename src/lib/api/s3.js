import request from 'superagent';

export const getImgUrl = (file) => request.post('http://localhost:8080/v1/s3/uploadImage').send(file);