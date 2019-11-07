import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";

import { Dimmer, Checkbox, Dropdown, Container,Button, Input, Form,Grid, Radio, Loader } from 'semantic-ui-react'
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
            <Container style={{ marginTop: '5em', width: '95%' }}>
                { loading === 'on' ? loaderView : null  }
                <Grid celled>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Form>
                                <Form.Group>
                                    <Form.Field size='mini' control={Input} label='Start Date' placeholder='Start Date' value={searchKPI.from} onChange={this.handleInputFrom}/>
                                    <Form.Field size='mini' control={Input} label='End Date' placeholder='End Date' value={searchKPI.to} onChange={this.handleInputTo} />
                                </Form.Group>
                                {(searchKPI.radio === 'rev' || searchKPI.radio === 'nru' || searchKPI.radio === "nad") &&
                                    <Dropdown name="period" placeholder='Daily' search selection options={options} defaultValue={options[0].value} onChange={this.handleInputPeriod} />
                                }
                                <br /><br />

                                <Form.Field>
                                    <Button color='violet' onClick={this.handleSearch.bind(this)}>Search</Button>
                                </Form.Field>
                                <br /><br />
                                <Form.Field>
                                    <Radio
                                        label='Revenue (전체 매출)'
                                        name='radioGroup'
                                        value='rev'
                                        checked={searchKPI.radio === 'rev'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='Revenue (NADDIC 매출)'
                                        name='radioGroup'
                                        value='nad'
                                        checked={searchKPI.radio === 'nad'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='New Users (신규 유저)'
                                        name='radioGroup'
                                        value='nru'
                                        checked={searchKPI.radio === 'nru'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='Avg Concurrent Users (평균 동접)'
                                        name='radioGroup'
                                        value='avg'
                                        checked={searchKPI.radio === 'avg'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='Max Concurrent Users (최고 동접)'
                                        name='radioGroup'
                                        value='mcu'
                                        checked={searchKPI.radio === 'mcu'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field> 
                                <Form.Field>
                                    <Radio
                                        label='Unique Users (유니크 유저)'
                                        name='radioGroup'
                                        value='uu'
                                        checked={searchKPI.radio === 'uu'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>

                            </Form>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <div class="ui message">
                                <div class="header">Notice</div>
                                <ul class="list">
                                    <li class="content">각 퍼블리셔의 통계툴에서 크롤링 하고 있습니다.</li>
                                    <li class="content">이 데이터는 추이 분석용으로만 사용 부탁 드립니다. 취소, 환불, 보상등 최종 금액이 반영 되지 않은 데이터 입니다.</li>
                                    <li class="content">한국을 제외한 다른 국가의 Revenue 경우 해당 일자의 환율 혹은 그 당시 고정 환율을 적용해서 원화로 계산 된 데이터 입니다.</li>
                                    <li class="content">매출을 제외한 일부 데이터(ex, 평균 동접)는 2019-03-22일 부터 자동으로 저장이 되고 있습니다. 그 이전 데이터는 취합이 불가합니다.</li>
                                    <li class="content">중국 데이터는 한국시간으로 오후 1:30분에 취합됩니다.</li>
                                    <li class="content">Invalid date는 세로 합계 금액입니다. 또한 새로 추가된 Daily, Weekly, Monthly 조회는 Revenue / New Users 등 3개 메뉴만 가능합니다.</li>
                                </ul>
                            </div>
                            <br/>
                            <div id="chart" style={{width:'100%', height:'400px'}} ></div>

                            <div id="tabulator-2"></div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                
            </Container>
        );
    }
}

export default NewKpi;