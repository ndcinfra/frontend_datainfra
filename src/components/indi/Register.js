import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";

import { Container, Label, Button, Message, Form, Header, Grid, Input } from 'semantic-ui-react'
import axios from 'axios';

@withRouter
@inject("store")
@observer
class Register extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.store.appState;
    }

    componentDidMount() {   
        var get = function(u){
            var x = new XMLHttpRequest;
            x.open('GET', u, false);
            x.send();
            return x.responseText;
        }
        //var clientIP = "";
        this.store.clientIP = JSON.parse(get('http://ifconfig.me/all.json')).ip_addr;
        //console.log(this.store.clientIP);
    }

    handleInputEmail = (e, { value }) => {
        this.store.setClearMessage();
        this.store.userInfo.email = value;
    }

    handleRegisterEmailIn(e) {
        e.preventDefault();
        //console.log("click handleResendConfirmEmail");
        //this.store.setLoading('on');
        const {history} = this.props;
        this.store.registerEmailIndonesia();
    }

    // for flash
	handleDismiss = (e, {name}) => {
        if (name == "errorFlash") {
            this.store.errorFlash = null;
        }else{
            this.store.successFlash = null;
        }
    }
    
    handleClose(e) {
        e.preventDefault();
        console.log("click close");
        //var customWindow = window.open('', '_self', '');
        //customWindow.close();
        window.close();
    }

    render() {
        const { errorFlash, successFlash, userInfo, registerIndiSuccess } = this.store;
        
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
        
        var registerView = null;
        if(registerIndiSuccess) {
            // success
            registerView = (
                <Grid>
                <Grid.Column>
                    <Header as='h2' icon dividing>
                        Register Success.
                    </Header>
                    <div>
                </div>

                    <Header.Subheader>
                        Success.
                    </Header.Subheader>

                    <Header.Subheader>
                        Thank you for enjoying closers so far!
                    </Header.Subheader>
                    <Header.Subheader>
                        If you register your email, we will give you news of closers service.
                    </Header.Subheader>
                    {/*
                    <Form>
                        <Form.Field></Form.Field>
                        <Form.Field>
                            <Button color='violet' onClick={this.handleClose.bind(this)}>Close</Button>
                        </Form.Field>
                    </Form>
                    */}

                </Grid.Column>
            </Grid>
            )
        }else{
            registerView = (
                <Grid>
                    <Grid.Column>
                        <Header as='h2' icon dividing>
                            Register Email.
                        </Header>
                        <div>
                        { errorFlashView }
                        { successFlashView }
                    </div>
                    
                        <Header.Subheader>
                            Thank you for enjoying closers so far!
                        </Header.Subheader>
                        <Header.Subheader>
                            If you register your email, we will give you news of closers service.
                        </Header.Subheader>

                        <Form>
                            <Form.Field></Form.Field>
                            <Form.Field>
                                <Input style={{ maxWidth: 300 }}
                                    icon='mail' 
                                    iconPosition='left'
                                    placeholder='E-mail address' 
                                    name='email' 
                                    size='small'
                                    value={userInfo.email} 
                                    onChange={this.handleInputEmail}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Button color='violet' onClick={this.handleRegisterEmailIn.bind(this)}>Regsiter</Button>
                            </Form.Field>
                        </Form>
                        

                    </Grid.Column>
                </Grid>
            )

        }

        return (
            <Container text style={{ marginTop: '5em' }}>
                {registerView}
            </Container>
        );
    }
}

export default Register;