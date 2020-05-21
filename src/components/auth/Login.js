import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Redirect } from "react-router-dom";

import { Container, Button, Dimmer, Loader, Header, Grid, Form, Segment, Input, Divider, Message, Icon, Image } from 'semantic-ui-react'


import redirect from '../../lib/redirect';

@inject("store")
@observer
export default class Login extends Component {
	constructor(props) {
        super(props);
		this.store = this.props.store.appState;
		console.log("login constructor");

		//this.store.checkAuth();
		this.store.setInitUserInfo();
		this.store.checkAuth();
	}
	
	
	componentDidMount() {
		console.log('login componentDidMount');
    }
    
    componentDidUpdate(){
		console.log('login componentDidUpdate');
		
		if (this.store.authenticated === true) {
			const {history,lastLocation} = this.props;
			//console.log("login lastlocation: ", lastLocation);
			this.store.setSuccessFlashMessage('You already logged in.');
			history.push('/');
		}
    }
	
    handleInputPassword = (e, { value }) => {
        this.store.userInfo.password = value;
    }

    handleInputDisplayName = (e, { value }) => {
        this.store.userInfo.displayname = value;
	}
	
	handelLogin(e){
		e.preventDefault();
		{/* add the rest of the function here */}
		//console.log("click")
		this.store.setLoading('on');
		const {history, lastLocation} = this.props;
		this.store.Login(history, lastLocation);
	}

	handleGotoSignup(e) {
		e.preventDefault();
		const {history} = this.props;
		history.push('/signup');
	}

	handleForgotPassword(e){
		e.preventDefault();
		const {history} = this.props;
		history.push('/forgotPassword');
	}

	// for flash
	handleDismiss = (e, {name}) => {
        if (name == "errorFlash") {
            this.store.errorFlash = null;
        }else{
            this.store.successFlash = null;
        }
	}

	render() {
		const { userInfo, error, loading, errorFlash, successFlash } = this.store;
        
        const ErrorView = (
            <Message error visible size='tiny'>{error}</Message>
		);

		var successFlashView = null;
		if (successFlash) {
			successFlashView = (
                <Message success name="successFlash" onDismiss={this.handleDismiss} content={successFlash}/>
			);
		}
        var errorFlashView = null;
        if(errorFlash) {
            errorFlashView = (
                <Message error name="errorFlash" onDismiss={this.handleDismiss} content={errorFlash} />
            );
		}
		
		const loaderView = (
            <Dimmer active inverted>
                <Loader size='huge'></Loader>
            </Dimmer>
        )

		return (
			<Container text style={{ marginTop: '0em' }}>
				{ loading === 'on' ? loaderView : null }
				<div>
					{ errorFlashView }
					{ successFlashView }
				</div>
				<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' >
					
					<Grid.Column style={{ maxWidth: 450 }}>
						<Header as='h4' color='teal' textAlign='center'>
						Login to your account
						</Header>

						<Form size='large'>
							<Segment stacked>
								<Form.Field>
									<Input 
										fluid
										icon='user' 
										iconPosition='left' 
										placeholder='Display name.(Nick name)' 
										name='displayname'
										value={userInfo.displayname} 
                            			onChange={this.handleInputDisplayName}
									/>
								</Form.Field>
								<Form.Field>
									<Input 
										fluid
										icon='lock' 
										iconPosition='left' 
										placeholder='Password' 
										type='password' 
										name='Password'
										value={userInfo.password} 
                            			onChange={this.handleInputPassword}
									/>
								</Form.Field>
								<Form.Field>
                                    <div>
                                        { error !== null ? ErrorView : null }
									</div>
									<div></div>
                                </Form.Field>
								<div>
									<Button color='teal' fluid size='small' onClick={this.handelLogin.bind(this)}>LOGIN</Button>
								</div>
							</Segment>
						</Form>
						<Message>
							<a style={{ cursor: 'pointer', color: 'teal' }} onClick={this.handleForgotPassword.bind(this)}>Forgot Password?</a>
							<br />
							New to us?  <a style={{ cursor: 'pointer', color: 'teal' }} onClick={this.handleGotoSignup.bind(this)}>Sign up</a>
                        </Message>
					</Grid.Column>
				</Grid>
			</Container>
		);
	}
}
