import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";

import { Dimmer, Checkbox, Dropdown, Container,Button, Input, Form,Grid, Radio, Loader } from 'semantic-ui-react'

const axios = require('axios');

@inject("store")
@observer
export default class Launcher extends Component {
    
    constructor(props) {
        super(props);
        this.store = this.props.store.appState;

        this.store.getTokenForlauncher();

    /*
        axios.post('http://52.74.146.93/v1/auth/login', {
            displayname: 'youngtip',
            password: '11111111',
            ip: '127.0.0.1',
	        country: 'tha'
          })
          .then(function (response) {
            console.log(response);
            console.log(response.data.data.token);
            this.store.setToken(response.data.data.token)
          })
          .catch(function (error) {
            console.log(error);
          });
    */
    }

    componentDidMount() {

        
    }

    handelGameStart(e){
		e.preventDefault();
		{/* add the rest of the function here */}
		//console.log("click")
		//this.store.setLoading('on');
		//const {history, lastLocation} = this.props;
        //this.store.runLauncher();
	}

    render() {
        const { token } = this.store;
        const launcher = "javascript:launchTest('"+token+"')";

        return (
            <Container style={{ marginTop: '5em', width: '95%' }}>
                * 태국 게임 런쳐 기동 테스트 페이지. <br/>
                * 아래 Game Start 버튼을 클릭하면, 태국 QA Web 인증 서버에 자동 로그인 후 JWT를 가져와서 런쳐를 기동 합니다,  <br/>
                * 정상적으로 런쳐 기동이 되는지만 테스트 가능.  <br/>
                    * 런쳐 인스톨이 되어 있지 않다거나 등등의 Error 체크는 하지 않습니다. <br/><br/><br/>
                
                <div>
                    <a href={launcher} className="gamestart">Game Start</a>
                </div>


            </Container>
        );
    }
}
