import axios from 'axios';
//import {BACKEND_API} from '../../utils/constants';


export const checkEmail = (email) => axios.get('/api/v1.0/auth/exists/email/' + email);
export const checkDisplayName = (displayname) => axios.get('/v1/auth/checkDisplayName/' + displayname);
export const localRegister = ({displayname,email,password}) => axios.post('/v1/auth/register', {displayname,email,password});
export const localLogin = ({displayname, password}) => axios.post('/v1/auth/login', {displayname, password});
export const checkLoginStatus = (token) => axios.get('/v1/auth/checkLogin', {headers: {Authorization: "Bearer "+token}});
export const socialAuth = ({provider, accessToken, email, providerId, picture}) => axios.post('/v1/auth/social', {provider, accessToken, email, providerId, picture});
export const logout = () => axios.post('/v1/auth/logout');
