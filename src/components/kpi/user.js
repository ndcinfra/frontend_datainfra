import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";

import { Dimmer, Checkbox, Dropdown, Container,Button, Input, Form,Grid, Radio, Loader, Label,Divider ,Header, Icon} from 'semantic-ui-react'

var echarts = require('echarts');

@withRouter
@inject("store")
@observer

class UserKpi extends Component {

    constructor(props) {
        super(props);

        this.store = this.props.store.newkpiState;
        const {history} = this.props;
        if (this.props.store.appState.loggedInUserInfo.permission === "publisher") {
            history.push("/");
        }

        // TODO: props 초기화
        // TODO: 권한 체크, 나라
        this.store.searchKPI.country = "KOREA"

    }

    componentDidMount() {
        this.store.setLoading('on');
        const {history} = this.props;
        if (this.props.store.appState.loggedInUserInfo.permission === "publisher") {
            history.push("/");
        }

        this.store.fetchUserStatis(this.props.store.appState,history);

    }
    
    handleSearch = (e) => {
        e.preventDefault();
        this.store.setLoading('on');
        const {history} = this.props;

        this.store.fetchUserStatis(this.props.store.appState,history);
    }

    handleCountry = (e, {value}) => {
        console.log("country: ", value);
        this.store.setCountry(value);
        this.store.fetchUserStatis(this.props.store.appState,history);
    }

    handleChange = (e, {value}) => {
        console.log("kind of calendar: ", value);
        this.store.setKindCalendar(value);
        this.store.fetchUserStatis(this.props.store.appState,history);
    }


    handleInputFrom = (e, { value }) => {
        this.store.searchKPI.from = value;
    }

    handleInputTo = (e, { value }) => {
        this.store.searchKPI.to = value;
    }

    render() {
        const { option, searchKPI, loading } = this.store;

        const countryOptions = [
            { key: 'kr', value: 'KOREA', flag: 'kr', text: 'Korea' },
            { key: 'jp', value: 'JAPAN', flag: 'jp', text: 'Japan' },
            { key: 'cn', value: 'CHINA', flag: 'cn', text: 'China' },
            { key: 'na', value: 'NAMERICA', flag: 'na', text: 'NAmerica' },
            { key: 'tw', value: 'TAIWAN', flag: 'tw', text: 'Taiwan' },
            { key: 'th', value: 'THAILAND', flag: 'th', text: 'Thailand' },
            { key: 'vn', value: 'VIETNAM', flag: 'vn', text: 'Vietnam' },
        ]

        return(
            <Container style={{ marginTop: '5em', width: '100%' }}>
                <Grid celled>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <div class="ui message">
                                <div class="header">유저통계 User KPI</div>
                                <ul class="list">
                                    <li class="content">uu: Unique User / nru: New Register User / mcu: Max Current User / avg: Average Current User</li>
                                </ul>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <div class="ui ignored positive message">
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Select fluid onChange={this.handleCountry} options={countryOptions} placeholder='Country' defaultValue={searchKPI.country}/>
                                    <Form.Field control={Input} placeholder='Start Date' value={searchKPI.from} onChange={this.handleInputFrom}/> ~ 
                                    <Form.Field control={Input} placeholder='End Date' value={searchKPI.to} onChange={this.handleInputTo} />
                                    <Form.Button color='violet' onClick={this.handleSearch.bind(this)}>Search</Form.Button>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Field control={Radio} name='radioGroup' label='Daily' value='day' checked={searchKPI.kindCalendar === 'day'} onChange={this.handleChange} />
                                    <Form.Field control={Radio} name='radioGroup' label='Weekly' value='week' checked={searchKPI.kindCalendar === 'week'} onChange={this.handleChange} />
                                    <Form.Field control={Radio} name='radioGroup' label='Monthly' value='month' checked={searchKPI.kindCalendar === 'month'} onChange={this.handleChange} />
                                </Form.Group>
                            </Form>
                            </div>
                        </Grid.Column>

                        <Grid.Column width={16}>
                            <div id="chart_user" style={{width:'100%', height:'400px'}} ></div>
                            <br />
                            <div id="tabulator_user"></div>
                            <br />
                            <div className="table-controls">
                                <button id="download-csv" class="ui yellow button">Download CSV</button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Container>
        )
    }
}

export default UserKpi;