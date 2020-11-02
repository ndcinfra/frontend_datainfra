import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";

import { Dimmer, Checkbox, Dropdown, Container,Button, Input, Form,Grid, Radio, Loader, Label,Divider ,Header, Icon} from 'semantic-ui-react'

var echarts = require('echarts');

@withRouter
@inject("store")
@observer

class SalesKpi extends Component {

    constructor(props) {
        super(props);

        this.store = this.props.store.newkpiState;
        const {history} = this.props;
        if (this.props.store.appState.loggedInUserInfo.permission === "publisher") {
            history.push("/");
        }

        // TODO: props 초기화
        // TODO: 권한 설정.
        // ARPU - Average Revenue Per User 유저 한명이 결제하는 평균 금액
        // ARPPU - 결제 유저들이 결제하는 평균 금액
        this.store.searchKPI.country = "KOREA"

    }

    componentDidMount() {
        this.store.setLoading('on');
        const {history} = this.props;
        if (this.props.store.appState.loggedInUserInfo.permission === "publisher") {
            history.push("/");
        }

        this.store.fetchSaleStatis(this.props.store.appState,history);

    }
    
    handleSearch = (e) => {
        e.preventDefault();
        this.store.setLoading('on');
        const {history} = this.props;

        this.store.fetchSaleStatis(this.props.store.appState,history);
    }

    handleCountry = (e, {value}) => {
        console.log("country: ", value);
        this.store.setCountry(value);
        this.store.fetchSaleStatis(this.props.store.appState,history);
    }

    handleChange = (e, {value}) => {
        console.log("kind of calendar: ", value);
        this.store.setKindCalendar(value);
        this.store.fetchSaleStatis(this.props.store.appState,history);
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
            { key: 'th', value: 'THAILAND', flag: 'th', text: 'Thailand' },
            { key: 'vn', value: 'VIETNAM', flag: 'vn', text: 'Vietnam' },
            { key: 'kr', value: 'KOREA', flag: 'kr', text: 'Korea' },
            { key: 'cn', value: 'CHINA', flag: 'cn', text: 'China' },
            { key: 'jp', value: 'JAPAN', flag: 'jp', text: 'Japan' },
            { key: 'tw', value: 'TAIWAN', flag: 'tw', text: 'Taiwan' },
            { key: 'na', value: 'NAMERICA', flag: 'na', text: 'NAmerica' },
        ]

        return(
            <Container style={{ marginTop: '5em', width: '100%' }}>
                <Grid celled>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <div class="ui message">
                                <div class="header">매출통계 Sales KPI</div>
                                <ul class="list">
                                    <li class="content">REV: Revenue / ARPPU: Average Revenue Per Paid User / Bu: Buying User / P.rate: Purchase rate</li>
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
                                    <Form.Field control={Radio} name='radioGroup' label='Daily' value='day' checked={searchKPI.kindCalendar === 'day'} onChange={this.handleChange}></Form.Field>
                                    <Form.Field control={Radio} name='radioGroup' label='Weekly' value='week' checked={searchKPI.kindCalendar === 'week'} onChange={this.handleChange}></Form.Field>
                                    <Form.Field control={Radio} name='radioGroup' label='Monthly' value='month' checked={searchKPI.kindCalendar === 'month'} onChange={this.handleChange}></Form.Field>
                                </Form.Group>
                            </Form>
                            </div>
                        </Grid.Column>
                    
                        <Grid.Column width={16}>
                            <div id="chart_sale" style={{width:'100%', height:'400px'}} ></div>
                            <br />
                            <div id="tabulator_sale"></div>
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

export default SalesKpi;