import axios from 'axios';
import {TH_API} from '../../utils/constants';

export const getUserInfo = (searchData) => axios.post(TH_API+'/v1/admin/getProfile', {...searchData});



