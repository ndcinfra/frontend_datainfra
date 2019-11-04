import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";

import { Dimmer, Checkbox, Dropdown, Container,Button, Input, Form,Grid, Radio, Loader, Label,Divider ,Header, Icon} from 'semantic-ui-react'

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

    }

    componentDidMount() {
        this.store.setLoading('on');
        const {history} = this.props;
        if (this.props.store.appState.loggedInUserInfo.permission === "publisher") {
            history.push("/");
        }

        //this.store.fetchUserStatis(this.props.store.appState,history);

    }
    
    handleSearch = (e) => {
        e.preventDefault();
        this.store.setLoading('on');
        const {history} = this.props;

        this.store.fetchUserData(this.props.store.appState,history);
    }

    handleCountry = (e, {value}) => {
        console.log("country: ", value);
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
    }

    render() {
        const { explainInput, oprSearch, loading } = this.store;

        const countryOptions = [
            { key: 'th', value: 'THAILAND', flag: 'th', text: 'Thailand' },
            { key: 'vn', value: 'VIETNAM', flag: 'vn', text: 'Vietnam' },
        ]

        return(
            <Container style={{ marginTop: '5em', width: '95%' }}>
                <Grid celled>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <label> * 현재 개발중입니다...</label>
                                <br/>
                            <label> * 유저 정보를 조회 합니다.</label>
                            <br/>
                            <label> * 유저 정보를 조회 후 free coin을 부여 할 수 있습니다.</label>
                            <br/>

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
                                
                                <Form.Field control={Input} placeholder={explainInput} value={oprSearch.input} onChange={this.handleInput}/>

                                <Divider></Divider>
                                <Form.Button color='violet' onClick={this.handleSearch.bind(this)}>Search</Form.Button>

                            </Form>
                        </Grid.Column>

                        <Grid.Column width={10}>
                            <div id="tabulator_opuser"></div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Container>
        )
    }
}

export default UserOperation;