import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";

import { Dimmer, Checkbox, Dropdown, Container, Button, Input, Form, Grid, Radio, Loader, Label, Divider, Header, Icon, Message, Table, Image, Modal } from 'semantic-ui-react'
import { reaction } from 'mobx';

var echarts = require('echarts');

@withRouter
@inject("store")
@observer

class UserOperation extends Component {

    constructor(props) {
        super(props);

        this.store = this.props.store.oprState;
        
        const {history} = this.props;
        if (this.props.store.appState.loggedInUserInfo.permission === "publisher") {
            history.push("/");
        }

        // TODO: props 초기화
        // TODO: 권한 체크, 나라
        this.store.oprSearch.country = "THAILAND"
        this.error = null
    }

    componentDidMount() {
        //this.store.setLoading('on');
        const {history} = this.props;
        if (this.props.store.appState.loggedInUserInfo.permission === "publisher") {
            history.push("/");
        }
        this.store.fetchUserStatis(this.props.store.appState,history);
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.store.setLoading('on');

        if (this.store.oprSearch.input === ""){
            //console.log("INPUT NULL", this.store.oprSearch.input);
            this.setError('Please enter a search word.');
            return;
        } else {
            this.setError(null);
        }
        this.store.fetchUserData(this.props.store.appState,history);
    }

    handleCountry = (e, {value}) => {
        //console.log("country: ", value);
        this.store.setCountry(value);
        //this.store.fetchUserStatis(this.props.store.appState,history);
    }

    handleChange = (e, {value}) => {
        //console.log("kind of calendar: ", value);
        this.store.setType(value);
        //this.store.fetchUserStatis(this.props.store.appState,history);
    }

    handleInput = (e, { value }) => {
        this.store.oprSearch.input = value;

        if (this.store.oprSearch.input === ""){
            this.setError('Please enter a search word.');
            return;
        } else {
            this.setError(null);
        }
    }

    //Input Message Check
    setError(msg) {
        if (msg != null) {
          this.error = msg;
          console.log("error msg = ", this.error);
          this.store.setLoading('off');
        } else {
          this.error = msg;
        }
    }

    show = () => this.store.setModal(true) 
    close = () => this.store.setModal(false) 
    
    //Modal Display
    handleShow(e){
		e.preventDefault();
		this.store.setModal(true);
    }
    
    //Modal Close
    handeClose(e){
		e.preventDefault();
		this.store.setModal(false);
    }
    
    //Modal test
    handleFree = () => {
        console.log("UID: ", this.store.oprResponse.resp_uid);
        console.log("COUNTRY: ", this.store.oprResponse.resp_country);
        this.store.setModal(false);
    }

    render() {
        const { explainInput, oprSearch, oprResponse, error, loading } = this.store;

        //Error Message
        const ErrorView = (
            <Message error visible size='tiny'>{this.error}</Message>
        );
        
        //Search Loading
        const loaderView = (
            <Dimmer active inverted>
                <Loader size='huge'></Loader>
            </Dimmer>
        )

        const countryOptions = [
            { key: 'th', value: 'THAILAND', flag: 'th', text: 'Thailand' },
//            { key: 'vn', value: 'VIETNAM', flag: 'vn', text: 'Vietnam' },
        ]

        const { modalOpened } = this.store

        const modal = (
            <div>
                <Modal size='tiny' style={{position: 'static'}} open={modalOpened} onClose={this.handeClose.bind(this)} >
                    <Modal.Header>You can pay free coins.</Modal.Header>
                    <Modal.Content>
                        <form method="post" id="giveform">
                            <div class="description"><Icon name='angle right' />UID : {this.store.oprResponse.resp_uid}</div>
                            <div class="description"><Icon name='angle right' />Display Name : {this.store.oprResponse.resp_username}</div>
                            <div class="description"><Icon name='angle right' />Balance : {this.store.oprResponse.resp_balance}</div>
                            <Divider></Divider>
                            <div class="description">
                                현재 개발 진행 중입니다..
                            </div>
                        </form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.close}>cancel</Button>
                        <Button positive icon='checkmark' labelPosition='right' content="GIVE" onClick={this.handleFree.bind(this)} />
                    </Modal.Actions>
                </Modal>
            </div>
        );

        return(
            <Container style={{ marginTop: '5em', width: '95%' }}>
                { loading === 'on' ? loaderView : null  }

                <Grid celled>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <div class="ui message">
                                <div class="header">Notice</div>
                                <ul class="list">
                                    <li class="content">현재 개발중입니다.</li>
                                    <li class="content">유저 정보를 조회 후 free coin을 부여 할 수 있습니다.</li>
                                    <li class="content">현재 태국만 가능합니다.</li>
                                </ul>
                            </div>

                            <Divider section />

                            <Form size='mini'>
                                <Form.Group widths='equal'>
                                    <Form.Select fluid label='Country' onChange={this.handleCountry} options={countryOptions} placeholder='Country' defaultValue={oprSearch.country}/>
                                </Form.Group>
                                
                                <Divider></Divider>

                                <Form.Group inline>
                                    <label>입력 정보</label>
                                    <Form.Radio
                                        label='UID'
                                        value='uid'
                                        checked={oprSearch.type === 'uid'}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Radio
                                        label='Username'
                                        value='displayname'
                                        checked={oprSearch.type === 'displayname'}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Radio
                                        label='Email'
                                        value='email'
                                        checked={oprSearch.type === 'email'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                
                                <Form.Field>
                                    <Form.Field>
                                        <Input 
                                            icon='user' 
                                            iconPosition='left' 
                                            placeholder={explainInput} 
                                            name='displayname'
                                            value={oprSearch.input} 
                                            onChange={this.handleInput}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <div>
                                            { this.error !== null ? ErrorView : null }
                                        </div>
                                        <div></div>
                                    </Form.Field>
                                </Form.Field>
                                <Divider></Divider>
                                <Form.Button color='violet' onClick={this.handleSearch.bind(this)}>Search</Form.Button>
                            </Form>
                        </Grid.Column>
                        
                        <Grid.Column width={10}>
                            <div id="tabulator_opuser">
                                <Table celled striped>
                                    <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan='4'>User Info</Table.HeaderCell>
                                    </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                    <Table.Row>
                                        <Table.Cell collapsing width={3}><Icon name='angle right' />Display Name</Table.Cell>
                                        <Table.Cell>{this.store.oprResponse.resp_username}</Table.Cell>
                                        <Table.Cell collapsing width={3}><Icon name='angle right' />Country</Table.Cell>
                                        <Table.Cell>{this.store.oprResponse.resp_country}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell><Icon name='angle right' />Uid</Table.Cell>
                                        <Table.Cell>{this.store.oprResponse.resp_uid}</Table.Cell>
                                        <Table.Cell><Icon name='angle right' />Email</Table.Cell>
                                        <Table.Cell>{this.store.oprResponse.resp_email}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell><Icon name='angle right' />Balance</Table.Cell>
                                        <Table.Cell>{this.store.oprResponse.resp_balance}</Table.Cell>
                                        <Table.Cell><Icon name='angle right' />permission</Table.Cell>
                                        <Table.Cell>{this.store.oprResponse.resp_permission}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell><Icon name='angle right' />Paid Coin Balance</Table.Cell>
                                        <Table.Cell>{this.store.oprResponse.resp_paid}</Table.Cell>
                                        <Table.Cell><Icon name='angle right' />Free Coin Balance</Table.Cell>
                                        <Table.Cell>{this.store.oprResponse.resp_free}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell><Icon name='angle right' />Create Date</Table.Cell>
                                        <Table.Cell>{this.store.oprResponse.resp_createdate}</Table.Cell>
                                        <Table.Cell><Icon name='angle right' />Status</Table.Cell>
                                        <Table.Cell>{this.store.oprResponse.resp_status}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell><Icon name='angle right' />Confirm Date</Table.Cell>
                                        <Table.Cell>{this.store.oprResponse.resp_confirm}</Table.Cell>
                                        <Table.Cell><Icon name='angle right' />IP</Table.Cell>
                                        <Table.Cell>{this.store.oprResponse.resp_ip}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell><Icon name='angle right' />Provider</Table.Cell>
                                        <Table.Cell>{this.store.oprResponse.resp_provider}</Table.Cell>
                                        <Table.Cell><Icon name='angle right' />Provider ID</Table.Cell>
                                        <Table.Cell>{this.store.oprResponse.resp_providerid}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell><Icon name='angle right' />Picture</Table.Cell>
                                        <Table.Cell colSpan='3'><Image src={this.store.oprResponse.resp_pciture} rounded size='mini' />{this.store.oprResponse.resp_pciture}</Table.Cell>
                                    </Table.Row>
                                    </Table.Body>
                                </Table>
                                <Form.Button disabled={this.store.oprSearch.freebalance} onClick={this.handleShow.bind(this)}>Free Balance</Form.Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                {modal}
            </Container>
        )
    }
}

export default UserOperation;
