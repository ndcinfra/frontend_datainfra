import {
    observable,
    action
  } from "mobx";

import * as OpsAPI from '../lib/api/ops';

var echarts = require('echarts');
var moment = require('moment');

export default class OprState {
    @observable oprSearch;
    @observable loading;

    constructor() {

        this.oprSearch = {
            type: 'uid',
            input: '',
            country: 'th'
        }

        this.loading = 'off';
        this.explainInput = 'U******로 되어있는 Unique ID를 입력해 주세요';
    }  

    @action setType(value) {
        this.oprSearch.type = value;
        console.log(value);
        if (value == 'uid') {
            this.explainInput = 'U******로 되어있는 Unique ID를 입력해 주세요';
        }else if (value == 'displayname') {
            this.explainInput = '회원 가입시 등록한 username을 입력해 주세요';
        }else if (value == 'email') {
            this.explainInput = '회원 가입시 등록한 email 입력해 주세요';
        }
    }

    @action setCountry(value) {
        this.oprSearch.country = value;
    }

    @action setLoading(value) {
        this.loading = value;
    }

    async fetchUserData(appState, history) { 
        await appState.checkAuth(); // TODO: ??

        if (!appState.authenticated) {
            history.push('/login');

        } else if (appState.loggedInUserInfo.permission === "publisher") {
            history.push('/');
        } else {
            console.log(this.oprSearch);
            
            try {
                const response = await OpsAPI.getUserInfo(this.oprSearch);
                console.log(response);

            } catch (error) {
                this.setLoading('off');
                console.error(error);
            }
        }
    }


}