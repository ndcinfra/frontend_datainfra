import {
  observable,
  action
} from "mobx";
import axios from "axios";
import validator from 'validator';

import * as AuthAPI from '../lib/api/auth';
import * as UserAPI from '../lib/api/user';
import * as S3API from '../lib/api/s3';
import * as ResourceAPI from '../lib/api/resource';
import * as KpiAPI from '../lib/api/kpi';

import storage from '../lib/storage';
import redirect from '../lib/redirect';
import social from '../lib/social';
import hello from 'hellojs';

import {BACKEND_API} from '../utils/constants';

export default class AppState {
  @observable authenticated;
  //@observable authenticating;
  //@observable items;
  //@observable item;
  //@observable testval;
  //

  @observable displayname;
  @observable email;
  @observable password;
  @observable confirmPassword;

  @observable userInfo;
  @observable loggedInUserInfo;
  @observable error;
  @observable loading;
  @observable errorFlash;
  @observable successFlash;

  @observable originProfileEmail;
  @observable originProfileDisplayname;
  @observable profileEmail;
  @observable profileDisplayname;
  @observable profileProvider;

  // resources
  @observable resources;
  @observable resourcesId;
  /*
  @observable Seha;
  @observable Sylvi;
  @observable Yuri;
  @observable Misteltein;
  @observable J;
  @observable Harpy;
  @observable Levia;
  @observable Nata;
  @observable Tina;
  @observable Violet;
  @observable Wolfgang;
  @observable Soma;
  @observable Luna;
  */

  @observable modalOpened;

  @observable searchKPI;

  constructor() {
    this.authenticated = false;
    //this.authenticating = false;
    //this.items = [];
    //this.item = {};
    //this.testval = "Cobbled together by ";

    //
    this.displayname = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';

    this.error = null;
    this.loading = 'off';
    this.errorFlash = null;
    this.successFlash = null;

    this.originProfileEmail = null;
    this.originProfileDisplayname = null;
    this.profileEmail = null;
    this.profileDisplayname = null;
    this.profileProvider = null;

    // for signup and login
    this.userInfo = {
      displayname: '',
      email: '',
      password: '',
      confirmPassword: ''
    } 

    // loggedInuserInfo 
    this.loggedInUserInfo = {
      UID: '',
      displayname: '',
      gravatar: '',
      balance: '0',
      gravatar: '',
      permission: '',
    }

    this.resources = {
      //id: '',
      sheet: '',
      memo: '',
      seha: '',
      sylvi: '',
      yuri: '',
      misteltein: '',
      jay: '',
      harpy: '',
      levia: '',
      nata: '',
      tina: '',
      violet: '',
      wolfgang: '',
      soma: '',
      luna: '',
      maleacc: '',
      femaleacc: ''
    }

    this.resourcesId = null;

    this.modalOpened = false;

    this.searchKPI = {
      from: '',
      to: '',
      country: '',
      legend: ['KOREA', 'CHINA', 'JAPAN', 'TAIWAN', 'NA'],
      kind: ''
    }

  }

  @action setImgUrl(chracter, value) {
    switch (chracter){
      case 'Seha':
        this.resources.seha = value;
        break;
      case 'Sylvi':
        this.resources.sylvi = value;
        break;
      case 'Yuri':
        this.resources.yuri = value;
        break;
      case 'Misteltein':
        this.resources.misteltein = value;
        break;
      case 'Jay':
        this.resources.jay = value;
        break;
      case 'Harpy':
        this.resources.harpy = value;
        break;
      case 'Levia':
        this.resources.levia = value;
        break;
      case 'Nata':
        this.resources.nata = value;
        break;
      case 'Tina':
        this.resources.tina = value;
        break;
      case 'Violet':
        this.resources.violet = value;
        break;
      case 'Wolfgang':
        this.resources.wolfgang = value;
        break;
      case 'Soma':
        this.resources.soma = value;
        break;
      case 'Luna':
        this.resources.luna = value;
        break;
      case 'MaleA':
        this.resources.maleacc = value;
        break;
      case 'FemaleA':
        this.resources.femaleacc = value;
        break;
    }
  }

  @action setModal(value) {
    this.modalOpened = value;
  }

  
  @action setProfileEmail(value) {
    this.originProfileEmail = value;
    this.profileEmail = value;
  }

  @action setProfileDisplayname(value) {
    this.originProfileDisplayname = value;
    this.profileDisplayname = value;
  }

  @action setProfileProvider(value) {
    this.profileProvider = value;
  }
  
  @action setLoading(value) {
    this.loading = value;
  }

  @action setError(msg) {
    if (msg != null) {
      this.error = msg;
      this.setLoading('off');
    } else {
      this.error = msg;
    }
  }

  @action setInitUserInfo() {
    this.userInfo.displayname = '';
    this.userInfo.email = '';
    this.userInfo.password = '';
    this.userInfo.confirmPassword = '';

    this.setClearMessage();
  }

  @action setAuthenticated(auth, UID, displayname, balance, gravater,permission) {
    this.authenticated = auth;
    
    this.loggedInUserInfo.UID = UID;
    this.loggedInUserInfo.displayname = displayname;
    this.loggedInUserInfo.balance = balance;
    this.loggedInUserInfo.gravatar = gravater;
    this.loggedInUserInfo.permission = permission;
  }

  @action setInitLoggedInUserInfo() {
    // remove cookie
    storage.remove('___GOM___');

    this.authenticated = false;

    this.loggedInUserInfo.UID = '';
    this.loggedInUserInfo.displayname = '';
    this.loggedInUserInfo.balance = '0';
    this.loggedInUserInfo.gravatar = '';
    this.loggedInUserInfo.permission = '';

    //this.setClearMessage();
  }

  @action setClearMessage() {
    this.error = null;
    this.errorFlash = null;
    this.successFlash = null;
  }

  @action setSuccessFlashMessage(msg) {
    this.successFlash = msg;
    this.setLoading('off');
  }

  @action setErrorFlashMessage(msg) {
    this.errorFlash = msg;
    this.setLoading('off');
  }

  @action clearResourceInfo() {
    this.resources.sheet = '';
    this.resources.memo = '';
    this.resources.seha = '';
    this.resources.sylvi = '';
    this.resources.yuri = '';
    this.resources.misteltein = '';
    this.resources.jay = '';
    this.resources.harpy = '';
    this.resources.levia = '';
    this.resources.tina = '';
    this.resources.violet = '';
    this.resources.wolfgang = '';
    this.resources.soma = '';
    this.resources.luna = '';
    this.resources.maleacc = '';
    this.resources.femaleacc = '';
    this.resourcesId = null;
    
  }

  // setImgUrl
  async GetImgUrl(character, acceptedFiles) {
    var file = new FormData();
    file.append('file',acceptedFiles[0])
    

    let respData = null;
    try {
      respData = await S3API.getImgUrl(file);
      let result = JSON.parse(respData.text);

      this.setImgUrl(character, result.data);

    }catch(err){
      console.log("getImgUrl err: ", err);
    }
  }

  // RegisterResource
  async RegisterResource(history, lastLocation) {
    //console.log("RegisterResource");
    //console.log("resource: ", {...this.resources});

    if (validator.isEmpty(this.resources.sheet)) {
      this.setError('You have to inout sheet');
    }else if (validator.isEmpty(this.resources.memo)) {
      this.setError('You have to inout memo');
    }else{
      this.setError(null);
    }

    if (!this.error) {
      //let data = null;
      let respData = null;
      try {
        // call backend
        respData = await ResourceAPI.registerResource(this.resources);
        //console.log(respData)
        this.setLoading('off');
        // redirect to list
        history.push('/resource/list');

      } catch (err) {
        this.setError(err);
      }
    }

  }

  // get resource detail ...
  async GetResource(id) {
    let respData = null;
    try {
      // call backend
      respData = await ResourceAPI.getResourceDetail(id);
      console.log(respData.data.data);

      if (respData !== null) {
        this.resources = {...respData.data.data}
        this.resourcesId = respData.data.data.id;
      }

    } catch (err) {
      this.setError(err);
    }
  }

  async UpdateResource(history) {
    if (validator.isEmpty(this.resources.sheet)) {
      this.setError('You have to inout sheet');
    }else if (validator.isEmpty(this.resources.memo)) {
      this.setError('You have to inout memo');
    }else{
      this.setError(null);
    }

    if (!this.error) {
      //let data = null;
      let respData = null;
      try {
        // call backend
        respData = await ResourceAPI.updateResource(this.resourcesId,this.resources);
        //console.log(respData)
        this.setLoading('off');
        // redirect to list
        history.push('/resource/list');

      } catch (err) {
        this.setError(err);
      }
    }
  }

  async DeleteResource(history) {
    //let data = null;
    let respData = null;
    try {
      // call backend
      respData = await ResourceAPI.deleteResource(this.resourcesId);
      //console.log(respData)
      this.setLoading('off');
      // redirect to list
      history.push('/resource/list');

    } catch (err) {
      this.setError(err);
    }
  }

  // GetKPI
  async GetKPI() {

    //validate date

    if (!this.error) {
      //let data = null;
      let respData = null;
      try {
        // call backend
        respData = await KpiAPI.getKPI(this.searchKPI);

        //console.log(respData.data.data);

        this.searchKPI.result.push(...respData.data.data);
        //console.log(this.searchKPI.result[0]);

        this.setLoading('off');

      } catch (err) {
        this.setError(err);
      }
    }

  }

  // Signup
  async Signup(history, lastLocation) {

    if (
      !(validator.isLength(this.userInfo.displayname, { min: 4, max: 16 })) ||
      (validator.contains(this.userInfo.displayname, ' ')) ||
      !(validator.isAlphanumeric(this.userInfo.displayname))
    ) {
      this.setError('A displayname has 4~16 letters/numbers without space.');
    } else if (!validator.isEmail(this.userInfo.email)) {
      this.setError('Please input a valid email address.');
    } else if (!(validator.isLength(this.userInfo.password, {
        min: 8,
        max: undefined
      })) || (validator.contains(this.userInfo.password, ' '))) {
      this.setError('The password must be at least 8 characters long without space.');
    } else if (!(validator.isLength(this.userInfo.confirmPassword, {
        min: 8,
        max: undefined
      })) || (validator.contains(this.userInfo.confirmPassword, ' '))) {
      this.setError('The Confirm Password must be at least 8 characters long without space.');
    } else if ( this.userInfo.password !== this.userInfo.confirmPassword ) {
      this.setError('Confirm Password does not match.');
    } else {
      this.setError(null);
    }

    if (!this.error) {
      //let data = null;
      let respData = null;
      try {
        // call backend
        respData = await AuthAPI.localRegister({ ...this.userInfo});

        // set init userinfo
        this.setInitUserInfo();

        // make cookie
        storage.set('___GOM___', respData.data.data);

        // login
        //await this.checkAuth();

        // redirect to home
        redirect.set(history, lastLocation);

        // flash message
        this.setSuccessFlashMessage('Welcome ! ' + respData.data.data.displayname);

      } catch (err) {
        if (err.response.data) {
          this.setError(err.response.data.message);
        } else {
          this.setError(err);
        }

      }
    }
  }

  // localLogin
  // async localLogin(history, lastLocation) {
  async Login(history, lastLocation) {
    //console.log("backend: ", process.env.BACKEND_API);

    if (
      !(validator.isLength(this.userInfo.displayname, {
        min: 4,
        max: 16
      })) ||
      (validator.contains(this.userInfo.displayname, ' ')) ||
      !(validator.isAlphanumeric(this.userInfo.displayname))
    ) {
      this.setError('a displayname has 4~16 letters/numbers without space.');
    } else if (!(validator.isLength(this.userInfo.password, {
        min: 8,
        max: undefined
      })) || (validator.contains(this.userInfo.password, ' '))) {
      this.setError('The password must be at least 8 characters long without space.');
    } else {
      this.setError(null);
    }

    if (!this.error) {

      //let data = null;
      let respData = null;
      try {

        respData = await AuthAPI.localLogin({
          displayname: this.userInfo.displayname,
          password: this.userInfo.password
        });

        this.setInitUserInfo();

        //console.log("login: ", respData.data.data);          
        storage.set('___GOM___', respData.data.data);

        //await this.checkAuth();

        redirect.set(history, lastLocation);

        // flash message
        // this.setSuccessFlashMessage('Welcome ! ' + respData.data.data.displayname);

      } catch (err) {
        //console.log(err);
        if (err.response.data) {
          this.setError(err.response.data.message);
        } else {
          this.setError(err);
        }
      }
    }

  }

  async checkAuth() {
    //check auth
    //TODO: think ! check GOM or not
    let cookieInfo = null;
    cookieInfo = storage.get('___GOM___');

    //console.log("cookie: ", cookieInfo);

    if (cookieInfo) {
      let auth = null;
      try {
        auth = await AuthAPI.checkLoginStatus(cookieInfo.token);
        //console.log(auth);

      } catch (e) {
        await this.setInitLoggedInUserInfo();
      }

      if (!auth) {
        await this.setInitLoggedInUserInfo()
      } else {

        console.log('check auth: ', auth.data.data);

        await this.setAuthenticated(
          true,
          auth.data.data.uid,
          auth.data.data.displayname,
          auth.data.data.balance.toString(),
          auth.data.data.picture,
          auth.data.data.permission
        );

        console.log('authenticated: ', this.authenticated);
      }
    } else {
      console.log('no gom');
      await this.setInitLoggedInUserInfo();
    }
  }


  // socialAuth ... not used
  async socialAuth(provider, history, lastLocation) {

    social[provider]().then((auth) => {
      //console.log(auth)

      hello(auth.network).api('/me').then(function (r) {

        AuthAPI.socialAuth({
          provider: provider,
          accessToken: auth.authResponse.access_token,
          email: r.email,
          providerId: r.id,
          picture: r.picture
        }).then((response) => {
          //console.log(response.data.data);

          storage.set('___GOM___', response.data.data);

          redirect.set(history, lastLocation);

          // this.checkAuth();

          // flash message ... um error ... why ??
          // appState.setSuccessFlashMessage('Welcome ! ' + respData.data.data.displayname);
          // this.setSuccessFlashMessage('Welcome ! ' + respData.data.data.displayname);

        }).catch((err) => {
          console.log("err ", err);

          if (err.response.data) {
            this.setError(err.response.data.message);
          } else {
            this.setError(err);
          }
        });

      }, function (e) {
        this.setError('somthing wrong with ' + provider + '. try again after a few minutes. ' + e.message);
      });

    }).catch((err) => {
      this.setError('somthing wrong with ' + provider + '. try again after a few minutes.');
    });
  }

  // email confirm ... not used
  async confirmEmail(confirm_token, history) {
    let data = null;
    try {
      data = await UserAPI.confirmEmail(confirm_token);
    } catch (err) {
      this.errorFlash = err.response.data.message;
    }

    if (!data) {
      this.setErrorFlashMessage('token is invalid or has expired. try resend again.');
      history.push('/invalidConfirmEmail');
    } else {
      await this.setInitLoggedInUserInfo(); //first remove cookie
      await this.checkAuth();
      this.setSuccessFlashMessage('email confirm success. thank you. enjoy after login.');
      history.push('/login');
    }
  }

  // resend email confirm ... not used
  async resendConfirmEmail() {

    if (!validator.isEmail(this.userInfo.email)) {
      //this.setError('Please input a valid email address.');
      this.setErrorFlashMessage('Please input a valid email address.');
    } else {
      this.setErrorFlashMessage(null);
    }

    if (!this.errorFlash) {
      let data = null;
      try {
        data = await UserAPI.resendConfirmEmail(this.userInfo.email);
        this.setInitUserInfo();
      } catch (err) {
        //console.log(err);
        //this.setError(err.response.data.message);
        this.setErrorFlashMessage(err.response.data.message);
      }

      if (data) {
        this.setSuccessFlashMessage('Resend succeed.');
      }
    }
  }

  // logout
  async logout(history, goto) {

    await this.setInitUserInfo();

    await this.setInitLoggedInUserInfo();

    //this.setSuccessFlashMessage("Bye~~~, Hopely see you soon.");

    if (goto == "") {
      history.push('/');
    } else {
      history.push(goto);
    }

  }

  // forgot password
  async forgotPassword() {
    if (!validator.isEmail(this.userInfo.email)) {
      this.setErrorFlashMessage('Please input a valid email address.');
    } else {
      this.setErrorFlashMessage(null);
    }

    if (!this.errorFlash) {
      let data = null;
      try {
        data = await UserAPI.forgotPassword(this.userInfo.email);
        this.setInitUserInfo();
      } catch (err) {
        //console.log(err);
        this.setErrorFlashMessage(err.response.data.message);
      }

      if (data) {
        this.setSuccessFlashMessage('Send a password reset token to yor email. please check your email inbox or spam box.');
      }
    }
  }

  async isValidResetPasswordToken(token, history) {
    let data = null;
    try {
      data = await UserAPI.isValidResetPasswordToken(token);
    } catch (err) {
      this.setErrorFlashMessage(err.response.data.message);
      history.push('/forgotPassword');
    }

    if (data) {
      await this.setInitLoggedInUserInfo(); //first remove cookie
      await this.checkAuth();
      this.setSuccessFlashMessage('Reset Token is valid. Change password.');
    }
  }


  async resetPassword(resetToken, confirmPassword, history) {
    if (!(validator.isLength(this.userInfo.password, {
        min: 8,
        max: undefined
      })) || (validator.contains(this.userInfo.password, ' '))) {
      this.setError('The password must be at least 8 characters long without space.');
    } else if (!(validator.isLength(confirmPassword, {
        min: 8,
        max: undefined
      })) || (validator.contains(confirmPassword, ' '))) {
      this.setError('The confirm password must be at least 8 characters long without space.');
    } else if (this.userInfo.password !== confirmPassword) {
      this.setError('Password does not match.');
    } else {
      this.setError(null);
    }

    if (!this.error) {
      let data = null;
      try {
        data = await UserAPI.resetPassword(resetToken, this.userInfo.password);
        this.setInitUserInfo();
      } catch (err) {
        this.setErrorFlashMessage(err.response.data.message);
      }

      if (data) {
        this.setSuccessFlashMessage('Password is changed. Please SIGN IN.');
        history.push('/login');
      }
    }
  }


  async getProfile(history) {
    let cookieInfo = null;
    cookieInfo = storage.get('___GOM___');

    // console.log("cookie: ", cookieInfo);

    if (cookieInfo) {
      let profile = null;
      try {
        profile = await UserAPI.getProfile(cookieInfo.token);
      } catch (err) {
        this.setErrorFlashMessage(err.response.data.message);
      }

      if (profile) {
        this.setProfileEmail(profile.data.data.email);
        this.setProfileDisplayname(profile.data.data.displayname);
        this.setProfileProvider(profile.data.data.provider);
        this.setLoading('off');

      } else {
        this.setErrorFlashMessages('Something wrong to get profile.');
      }
      
    } else {
      await this.setInitLoggedInUserInfo();
    }
  }


  async updateProfile(history) {
    // TODO: compare original value !!!
    if (this.originProfileDisplayname == this.profileDisplayname && this.originProfileEmail == this.profileEmail) {
      // do nothing
      this.setLoading('off');
    } else {
      // using flash message
      if (
        !(validator.isLength(this.profileDisplayname, {
          min: 4,
          max: 16
        })) ||
        (validator.contains(this.profileDisplayname, ' ')) ||
        !(validator.isAlphanumeric(this.profileDisplayname))
      ) {
        this.setErrorFlashMessage('A displayname has 4~16 letters/numbers without space.')
      } else if (!validator.isEmail(this.profileEmail)) {
        this.setErrorFlashMessage('Please input a valid email address.')
      } else {
        this.setErrorFlashMessage(null);
      }

      if (!this.errorFlash) {

        // check cookie
        let cookieInfo = null;
        cookieInfo = storage.get('___GOM___');

        if (cookieInfo) {
          let data = null;
          try {
            data = await UserAPI.updateProfile(cookieInfo.token, this.profileDisplayname, this.profileEmail);
          } catch (err) {
            this.setErrorFlashMessage(err.response.data.message);
          }

          if (data) {
            await this.setInitLoggedInUserInfo(); //first remove cookie
            this.setSuccessFlashMessage('Profile is changed. please re-sign in.');
            history.push('/login');
          }
        }else{
          await this.setInitLoggedInUserInfo();
          this.setErrorFlashMessage('need login first.');
          history.push('/login');
        }

      }
    }
  }

  async updatePassword(newpassword, confirmPassword, history) {
    this.setInitUserInfo();

    // using error message

    if (!(validator.isLength(newpassword, {
        min: 8,
        max: undefined
      })) || (validator.contains(newpassword, ' '))) {
      this.setError('The password must be at least 8 characters long without space.');
    } else if (!(validator.isLength(confirmPassword, {
        min: 8,
        max: undefined
      })) || (validator.contains(confirmPassword, ' '))) {
      this.setError('The confirm password must be at least 8 characters long without space.');
    } else if (newpassword !== confirmPassword) {
      this.setError('New Password and Confirm Password does not match.');
    } else {
      this.setError(null);
    }

    if (!this.error) {
      // check cookie
      let cookieInfo = null;
      cookieInfo = storage.get('___GOM___');

      console.log("cookie: ", cookieInfo);

      if (cookieInfo) {
        let data = null;
        try {
          data = await UserAPI.updatePassword(cookieInfo.token, newpassword);
        } catch (err) {
          this.setError(err.response.data.message);
        }

        if (data) {
          await this.setInitLoggedInUserInfo(); //first remove cookie
          //await this.checkAuth();
          this.setSuccessFlashMessage('Password is changed. please re-sign in.');
          history.push('/login');
        }
      }else{
        console.log('need login first.');
        await this.setInitLoggedInUserInfo();
        this.setErrorFlashMessage('need login first.');
        history.push('/login');
      }
    }
  }


  // this is to payment history.
  async GetResourceAll(history) {
    //console.log('billingState');
    await this.checkAuth(); // TODO: ??

    if (!this.authenticated) {
        this.setErrorFlashMessage('Need login first');
        history.push('/login');

    } else {

        //Trigger setFilter function with correct parameters
        function updateFilter(){
          //var filter = $("#filter-field").val() == "function" ? customFilter : $("#filter-field").val();
          var filter = $("#filter-field").val();

          if($("#filter-field").val() == "function" ){
              $("#filter-type").prop("disabled", true);
              $("#filter-value").prop("disabled", true);
          }else{
              $("#filter-type").prop("disabled", false);
              $("#filter-value").prop("disabled", false);
          }

          table.setFilter(filter, $("#filter-type").val(), $("#filter-value").val());
        }

        //Update filters on value change
        $("#filter-field, #filter-type").change(updateFilter);
        $("#filter-value").keyup(updateFilter);
        
        //Clear filters on "Clear Filters" button click
        $("#filter-clear").click(function(){
          $("#filter-field").val("");
          $("#filter-type").val("=");
          $("#filter-value").val("");

          table.clearFilter();
        });

        //csv
        //trigger download of data.csv file
        $("#download-csv").click(function(){
          table.download("csv", "data.csv");
        });

        //custom formatter definition
        var editIcon = function(cell, formatterParams, onRendered){ //plain text value
          return "<i className='fas fa-edit'>Edit</i>";
        };

        var table = new Tabulator("#tabulator-1", {
            //height: 511, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
            autoResize:true, 
            resizableRows:true,
            layout: "fitDataFill", //fit columns to width of table (optional, fitColumns)
            //responsiveLayout: true,
            placeholder: "No Data Available", //display message to user on empty table
            columns: [ //Define Table Columns
                {
                    title: "No",
                    //formatter: "rownum",
                    field: "id",
                    align: "center",
                    width: 70,
                },
                {
                    title: "Sheet",
                    //formatter: "rownum",
                    field: "sheet",
                    align: "center",
                    //width: 200,
                    headerFilter:true,
                },
                {
                    title: "Memo",
                    //formatter: "rownum",
                    field: "memo",
                    align: "center",
                    //width: 200,
                    headerFilter:true,
                },
                {
                    title: "Seha",
                    //formatter: "rownum",
                    field: "seha",
                    align: "center",
                    //width: 200,
                    formatter: function(cell, formatterParams) {
                      if (cell.getValue() != ''){
                        return '<img src="'+cell.getValue()+'" height="200" width="200"/>';
                      }else{
                        return
                      }
                    }
                },
                {
                    title: "Sylvi",
                    //formatter: "rownum",
                    field: "sylvi",
                    align: "center",
                    //width: 200,
                    formatter: function(cell, formatterParams) {
                      if (cell.getValue() != ''){
                        return '<img src="'+cell.getValue()+'" height="200" width="200"/>';
                      }else{
                        return
                      }
                    }
                },
                {
                    title: "Yuri",
                    //formatter: "rownum",
                    field: "yuri",
                    align: "center",
                    //width: 200,
                    formatter: function(cell, formatterParams) {
                      if (cell.getValue() != ''){
                        return '<img src="'+cell.getValue()+'" height="200" width="200"/>';
                      }else{
                        return
                      }
                    }
                },
                {
                    title: "Misteltein",
                    //formatter: "rownum",
                    field: "misteltein",
                    align: "center",
                    //width: 200,
                    formatter: function(cell, formatterParams) {
                      if (cell.getValue() != ''){
                        return '<img src="'+cell.getValue()+'" height="200" width="200"/>';
                      }else{
                        return
                      }
                    }
                },
                {
                  title: "J",
                  //formatter: "rownum",
                  field: "jay",
                  align: "center",
                  //width: 200,
                  formatter: function(cell, formatterParams) {
                    if (cell.getValue() != ''){
                      return '<img src="'+cell.getValue()+'" height="200" width="200"/>';
                    }else{
                      return
                    }
                  }
                },
                {
                  title: "Harpy",
                  //formatter: "rownum",
                  field: "harpy",
                  align: "center",
                  //width: 200,
                  formatter: function(cell, formatterParams) {
                    if (cell.getValue() != ''){
                      return '<img src="'+cell.getValue()+'" height="200" width="200"/>';
                    }else{
                      return
                    }
                  }
                },
                {
                  title: "Levia",
                  //formatter: "rownum",
                  field: "levia",
                  align: "center",
                  //width: 200,
                  formatter: function(cell, formatterParams) {
                    if (cell.getValue() != ''){
                      return '<img src="'+cell.getValue()+'" height="200" width="200"/>';
                    }else{
                      return
                    }
                  }
                },
                {
                  title: "Nata",
                  //formatter: "rownum",
                  field: "nata",
                  align: "center",
                  //width: 200,
                  formatter: function(cell, formatterParams) {
                    if (cell.getValue() != ''){
                      return '<img src="'+cell.getValue()+'" height="200" width="200"/>';
                    }else{
                      return
                    }
                  }
                },
                {
                  title: "Tina",
                  //formatter: "rownum",
                  field: "tina",
                  align: "center",
                  //width: 200,
                  formatter: function(cell, formatterParams) {
                    if (cell.getValue() != ''){
                      return '<img src="'+cell.getValue()+'" height="200" width="200"/>';
                    }else{
                      return
                    }
                  }
                },
                {
                  title: "Violet",
                  //formatter: "rownum",
                  field: "violet",
                  align: "center",
                  //width: 200,
                  formatter: function(cell, formatterParams) {
                    if (cell.getValue() != ''){
                      return '<img src="'+cell.getValue()+'" height="200" width="200"/>';
                    }else{
                      return
                    }
                  }
                },
                {
                  title: "Wolfgang",
                  //formatter: "rownum",
                  field: "wolfgang",
                  align: "center",
                  //width: 200,
                  formatter: function(cell, formatterParams) {
                    if (cell.getValue() != ''){
                      return '<img src="'+cell.getValue()+'" height="200" width="200"/>';
                    }else{
                      return
                    }
                  }
                },
                {
                  title: "Soma",
                  //formatter: "rownum",
                  field: "soma",
                  align: "center",
                  //width: 200,
                  formatter: function(cell, formatterParams) {
                    if (cell.getValue() != ''){
                      return '<img src="'+cell.getValue()+'" height="200" width="200"/>';
                    }else{
                      return
                    }
                  }
                },
                {
                  title: "Luna",
                  //formatter: "rownum",
                  field: "luna",
                  align: "center",
                  //width: 200,
                  formatter: function(cell, formatterParams) {
                    if (cell.getValue() != ''){
                      return '<img src="'+cell.getValue()+'" height="200" width="200"/>';
                    }else{
                      return
                    }
                  }
                },

                {
                  title: "Male Accessory",
                  //formatter: "rownum",
                  field: "maleacc",
                  align: "center",
                  //width: 200,
                  formatter: function(cell, formatterParams) {
                    if (cell.getValue() != ''){
                      return '<img src="'+cell.getValue()+'" height="200" width="200"/>';
                    }else{
                      return
                    }
                  }
                },

                {
                  title: "Female Accessory",
                  //formatter: "rownum",
                  field: "femaleacc",
                  align: "center",
                  //width: 200,
                  formatter: function(cell, formatterParams) {
                    if (cell.getValue() != ''){
                      return '<img src="'+cell.getValue()+'" height="200" width="200"/>';
                    }else{
                      return
                    }
                  }
                },

                //{title:"Example", field:"example", formatter:"buttonTick"},
                //{title:"Example", field:"example", formatter:"handle"},
            ],
            
            
            rowClick:function(e, row){ //trigger a modal window when a row is clicked
              console.log('click row: ', row._row.data.id);
              //redirect to detail

              history.push('/resource/detail?id='+row._row.data.id);
            },
            
           
        });

        table.setData(BACKEND_API+'/v1/resource/list', {}, "GET");

    }
  }


}