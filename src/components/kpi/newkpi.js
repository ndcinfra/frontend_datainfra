import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";

import { Dimmer, Checkbox, Dropdown, Container,Button, Input, Form, Grid, Radio, Loader } from 'semantic-ui-react'
//import ApexCharts from 'apexcharts';
//import axios from "axios";
//import {BACKEND_API} from '../../utils/constants';
var echarts = require('echarts');

const options = [
    { key: 1, text: 'Daily', value: '1' },
    { key: 2, text: 'weekly', value: '2' },
    { key: 3, text: 'Monthly', value: '3' },
  ]

@withRouter
@inject("store")
@observer


class NewKpi extends Component {

    constructor(props) {
        super(props);

        this.store = this.props.store.newkpiState;
        
        const {history} = this.props;
        if (this.props.store.appState.loggedInUserInfo.permission === "publisher") {
            history.push("/");
        }
        
    }

    componentDidMount() {
        this.store.setLoading('on');
        const {history} = this.props;
        if (this.props.store.appState.loggedInUserInfo.permission === "publisher") {
            history.push("/");
        }

        this.store.fetchNewDate(this.props.store.appState,history);

    }

    handleChange = (e, { value }) => {
        this.store.searchKPI.radio = value;
        
        if (this.store.searchKPI.radio === "avg" || this.store.searchKPI.radio === "mcu" || this.store.searchKPI.radio === "uu") {
            this.store.searchKPI.period = "1";
        }

        this.store.setLoading('on');
        const {history} = this.props;
        this.store.fetchNewDate(this.props.store.appState,history);
    }


    handleInputFrom = (e, { value }) => {
        this.store.searchKPI.from = value;
    }

    handleInputTo = (e, { value }) => {
        this.store.searchKPI.to = value;
    }

    handleInputPeriod = (e, { value }) => {
        this.store.searchKPI.period = value;
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.store.setLoading('on');
        const {history} = this.props;
        this.store.fetchNewDate(this.props.store.appState,history);
    }

    render() {
        const { option, searchKPI, loading } = this.store;

        const loaderView = (
            <Dimmer active inverted>
                <Loader size='huge'></Loader>
            </Dimmer>
        )

        return (
            <Container style={{ marginTop: '5em', width: '100%' }}>
                { loading === 'on' ? loaderView : null  }
                <Grid celled>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <div class="ui message">
                                <div class="header">Notice</div>
                                <ul class="list">
                                    <li class="content">이 데이터는 취소/환불/보상 등의 내용은 반영되지 않은 데이터입니다. (취합 시작일 : 2019-03-22)</li>
                                    <li class="content">타 국가의 경우 고정 환율 또는 취합일 환율을 적용해서 원화로 계산 된 데이터 입니다.</li>
                                    <li class="content">Invalid date는 세로 합계 금액이고, 세로 금액 합계와 Monthly등 조회 등은 Revenue / New Users 등 3개 메뉴만 가능합니다.</li>
                                    <li class="content">데이터 취합 시간 - 한국 10:30, 중국 13:30, 기타 09:30 이전</li>
                                </ul>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <div class="ui ignored positive message">
                            <Form>
                                <Form.Group>
                                    <Form.Field control={Input} placeholder='Start Date' value={searchKPI.from} onChange={this.handleInputFrom}/> ~ 
                                    <Form.Field control={Input} placeholder='End Date' value={searchKPI.to} onChange={this.handleInputTo} />
                                    {(searchKPI.radio === 'rev' || searchKPI.radio === 'nru' || searchKPI.radio === "nad") &&
                                        <Form.Field control={Dropdown} name='period' placeholder='Daily' search selection options={options} defaultValue={options[0].value} onChange={this.handleInputPeriod} />
                                    }
                                    <Form.Field color='blue' control={Button} onClick={this.handleSearch.bind(this)}>Search</Form.Field>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Field control={Radio} label='Revenue (ALL)' name='radioGroup' value='rev' checked={searchKPI.radio === 'rev'} onChange={this.handleChange}></Form.Field>
                                    <Form.Field control={Radio} label='Revenue (NADDIC)' name='radioGroup' value='nad' checked={searchKPI.radio === 'nad'} onChange={this.handleChange}></Form.Field>
                                    <Form.Field control={Radio} label='New Users (WEB)' name='radioGroup' value='nru' checked={searchKPI.radio === 'nru'} onChange={this.handleChange}></Form.Field>
                                    <Form.Field control={Radio} label='Avg Concurrent' name='radioGroup' value='avg' checked={searchKPI.radio === 'avg'} onChange={this.handleChange}></Form.Field>
                                    <Form.Field control={Radio} label='Max Concurrent' name='radioGroup' value='mcu' checked={searchKPI.radio === 'mcu'} onChange={this.handleChange}></Form.Field>
                                    <Form.Field control={Radio} label='Unique Users' name='radioGroup' value='uu' checked={searchKPI.radio === 'uu'} onChange={this.handleChange}></Form.Field>
                                </Form.Group>
                            </Form>
                            </div>
                            <br /><br />
                            <div id="chart" style={{width:'100%', height:'400px'}} ></div>
                            <br /><br />
                            <div id="tabulator-2"></div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                
            </Container>
        );
    }
}

export default NewKpi;