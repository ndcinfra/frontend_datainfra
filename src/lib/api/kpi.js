import axios from 'axios';
import {BACKEND_API} from '../../utils/constants';

export const getKPI = (searchData) => axios.post(BACKEND_API+'/v1/kpi/list', {...searchData});
export const getUserKPI = (searchData) => axios.post(BACKEND_API+'/v1/kpi/listUser', {...searchData});
export const getSaleKPI = (searchData) => axios.post(BACKEND_API+'/v1/kpi/listSale', {...searchData});