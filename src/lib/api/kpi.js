import axios from 'axios';
import {BACKEND_API} from '../../utils/constants';

export const getKPI = (searchData) => axios.post(BACKEND_API+'/v1/kpi/list', {...searchData});