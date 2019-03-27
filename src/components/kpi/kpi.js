import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";

import { Dimmer, Checkbox, Dropdown, Container,Button, Input, Form,Grid, Radio, Loader } from 'semantic-ui-react'
//import ApexCharts from 'apexcharts';
//import axios from "axios";
//import {BACKEND_API} from '../../utils/constants';
var echarts = require('echarts');

@withRouter
@inject("store")
@observer

class Kpi extends Component {

    constructor(props) {
        super(props);

        this.store = this.props.store.kpiState;
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
                                </Form.Group>
                                <Form.Group>
                                    <Form.Field size='mini' control={Input} label='End Date' placeholder='End Date' value={searchKPI.to} onChange={this.handleInputTo} />
                                </Form.Group>
                                <Form.Field>
                                    <Button color='violet' onClick={this.handleSearch.bind(this)}>Search</Button>
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='revenue'
                                        name='radioGroup'
                                        value='rev'
                                        checked={searchKPI.radio === 'rev'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='avg concurrent users'
                                        name='radioGroup'
                                        value='avg'
                                        checked={searchKPI.radio === 'avg'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='max concurrent users'
                                        name='radioGroup'
                                        value='mcu'
                                        checked={searchKPI.radio === 'mcu'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='unique users'
                                        name='radioGroup'
                                        value='uu'
                                        checked={searchKPI.radio === 'uu'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='new registered users'
                                        name='radioGroup'
                                        value='nru'
                                        checked={searchKPI.radio === 'nru'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <label>* 각 퍼블리셔의 통계툴에서 크롤링 하고 있습니다.</label>
                            <br/>
                            <label>* 이 데이터는 추이 분석용으로만 사용 부탁 드립니다. 취소, 환불, 보상등 최종 금액이 반영 되지 않은 데이터 입니다. </label>
                            <br/>
                            <label>* 한국을 제외한 다른 국가의 Revenue 경우 해당 일자의 환율 혹은 그 당시 고정 환율을 적용해서 원화로 계산 된 데이터 입니다.</label>
                            <br/>
                            <label>* 매출을 제외한 일부 데이터(ex, 평균 동접)는 2019-03-22일 부터 자동으로 저장이 되고 있습니다. 그 이전 데이터는 취합이 불가합니다.</label>
                            <br/>
                            <br/><br/><br/>
                            <div id="chart" style={{width:'100%', height:'400px'}} ></div>

                            <div id="tabulator-2"></div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                
            </Container>
        );
    }
}

export default Kpi;