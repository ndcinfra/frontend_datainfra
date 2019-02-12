import {
  observable,
  action
} from "mobx";
import axios from "axios";
import validator from 'validator';

import * as AuthAPI from '../lib/api/auth';
import * as UserAPI from '../lib/api/user';
import * as S3API from '../lib/api/s3';

import storage from '../lib/storage';
import redirect from '../lib/redirect';
import social from '../lib/social';
import hello from 'hellojs';
// import request from 'superagent';


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

  @observable imgUrl;
  @observable modalOpened;

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

    this.imgUrl = '';
    this.modalOpened = false;

  }

  @action setModal(value) {
    this.modalOpened = value;
  }

  @action setImgUrl(value) {
    this.imgUrl = value;
  }
  
  @action setProfileEmail(value) {
    this.originProfileEmail = value;
    this.profileEmail = value;
  }

  @action setProfileDisplayname(value) {
    this.originProfileDisplayname = value;
    this.profileDisplayname = value;
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

  @action setAuthenticated(auth, UID, displayname, balance, gravater, permission) {
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


  // setImgUrl
  async GetImgUrl(acceptedFiles) {
    var file = new FormData();
    file.append('file',acceptedFiles[0])

    //console.log(file);

    let respData = null;
    try {
      respData = await S3API.getImgUrl(file);

      //console.log("reponse: ", respData);
      let result = JSON.parse(respData.text);
      //console.log("result: ", result.data);
      //setImgUrl(result.data);
      this.setImgUrl(result.data);

    }catch(err){
      console.log("getImgUrl err: ", err);
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
    //console.log("call login");

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
          auth.data.data.picture
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
            layout: "fitColumns", //fit columns to width of table (optional)
            responsiveLayout: true,
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
                    title: "Category#1",
                    //formatter: "rownum",
                    field: "category1",
                    align: "center",
                    //width: 200,
                    headerFilter:true,
                },
                {
                    title: "Category#2",
                    //formatter: "rownum",
                    field: "category2",
                    align: "center",
                    //width: 200,
                    headerFilter:true,
                },
                {
                    title: "Category#3",
                    //formatter: "rownum",
                    field: "category3",
                    align: "center",
                    //width: 200,
                    headerFilter:true,
                },
                {
                    title: "Category#4",
                    //formatter: "rownum",
                    field: "category4",
                    align: "center",
                    //width: 200,
                    headerFilter:true,
                },
                {
                    title: "Character",
                    //formatter: "rownum",
                    field: "character",
                    align: "center",
                    //width: 200,
                    headerFilter:true,
                },
                {
                    title: "Image URL",
                    field: "imgurl",
                    //width: 150,
                    align: "left",
                    //formatter: "image"
                    formatter: function(cell, formatterParams) {
                      console.log(cell.getValue());
                      return '<img src="'+cell.getValue()+'" height="150" width="150"/>';
                    }
                },
                //column definition in the columns array
                {
                  title: "Edit/Delete",
                  formatter:editIcon, 
                  align:"center", 
                  widthGrow:1,
                  /*
                  cellClick:function(e, cell){
                    alert("Printing row data for: " + cell.getRow().getData().id);
                    // call ajax and set detail data and redirect to detail page
                    //this.modalOpened = true;
                    //history.push('/login');
                    //setModal(true);

                  }
                  */
                },

                //{title:"Example", field:"example", formatter:"buttonTick"},
                //{title:"Example", field:"example", formatter:"handle"},
            ],
            
            /*
            rowClick:function(e, row){ //trigger a modal window when a row is clicked
              console.log('click row');
              //$('#req-modal').modal('show');
              //$("#req-modal").tabulator("setData", jsonURL1);
      
              //console.log ("its working");
            },
            */
           
        });

        table.setData('http://localhost:8080/v1/resource/listAll', {}, "GET");

    }
  }


}