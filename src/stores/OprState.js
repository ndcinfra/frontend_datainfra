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
    @observable oprResponse;
    @observable modalOpened;

    constructor() {

        this.oprSearch = {
            type: 'uid',
            input: '',
            country: 'th',
            freebalance: true,
        }

        this.error = null;
        this.loading = 'off';
        this.modalOpened = false;

        //return value
        this.oprResponse = {
            resp_username: '',
            resp_country: '',
            resp_uid: '',
            resp_email: '',
            resp_balance: '',
            resp_permission: '',
            resp_paid: '',
            resp_free: '',
            resp_createdate: '',
            resp_status: '',
            resp_provider: '',
            resp_providerid: '',
            resp_confirm: '',
            resp_ip: '',
            resp_pciture: '',
        }

        this.explainInput = 'U******로 되어있는 Unique ID를 입력해 주세요';
    }  

    @action setType(value) {
        this.oprSearch.type = value;
        //console.log(value);
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

    //Search Loading
    @action setLoading(value) {
        this.loading = value;
    }

    //Add Free Coin Modal
    @action setModal(value) {
        this.modalOpened = value;
      }

    async fetchUserStatis(appState, history) { 
        await appState.checkAuth(); // TODO: ??

        if (!appState.authenticated) {
            history.push('/login');

        } else if (appState.loggedInUserInfo.permission === "publisher") {
            history.push('/');
        } else {
            console.log(this.oprSearch);
        }
    }

    async fetchUserData(appState, history) { 
        await appState.checkAuth(); // TODO: ??

        if (!appState.authenticated) {
            history.push('/login');
        } else if (appState.loggedInUserInfo.permission === "publisher") {
            history.push('/');
        } else {
            console.log(this.oprSearch);
            this.setLoading('off');
            
            try {
                const response = await OpsAPI.getUserInfo(this.oprSearch);
                console.log("response : ", response.data.data);

                this.oprResponse.resp_username = response.data.data.displayname;
                
                if (response.data.data.country === "vn") {
                    this.oprResponse.resp_country = "VIETNAM";
                }
                else{
                    this.oprResponse.resp_country = "THAILAND";
                }
                
                this.oprResponse.resp_uid = response.data.data.uid;
                this.oprResponse.resp_email = response.data.data.email;
                this.oprResponse.resp_balance = response.data.data.balance;
                this.oprResponse.resp_permission = response.data.data.permission;
                this.oprResponse.resp_paid = response.data.data.paid_of_balance;
                this.oprResponse.resp_free = response.data.data.free_of_balance;
                this.oprResponse.resp_createdate = response.data.data.create_at;
                this.oprResponse.resp_status = response.data.data.status;
                this.oprResponse.resp_provider = response.data.data.provider;
                this.oprResponse.resp_providerid = response.data.data.provider_id;
                this.oprResponse.resp_confirm = response.data.data.confirm_reset_expire;
                this.oprResponse.resp_ip = response.data.data.ip;
                this.oprResponse.resp_pciture = response.data.data.picture;
                
                this.oprSearch.freebalance = false;

            } catch (error) {
                this.oprResponse = {
                    resp_username: '',
                    resp_country: '',
                    resp_uid: '',
                    resp_email: '',
                    resp_balance: '',
                    resp_permission: '',
                    resp_paid: '',
                    resp_free: '',
                    resp_createdate: '',
                    resp_status: '',
                    resp_provider: '',
                    resp_providerid: '',
                    resp_confirm: '',
                    resp_pciture: '',
                    resp_ip: '',
                }

                this.oprSearch.freebalance = true;
                console.error(error);
            }
        }
    }


}