import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";

import { Dimmer, Checkbox, Dropdown, Container,Button, Input, Form,Grid, Radio, Loader, Label,Divider ,Header, Icon} from 'semantic-ui-react'

var echarts = require('echarts');

@withRouter
@inject("store")
@observer

class SalesDetail extends Component {

    constructor(props) {
        super(props);

        this.store = this.props.store.kpiState;
        const {history} = this.props;
        if (this.props.store.appState.loggedInUserInfo.permission === "publisher") {
            history.push("/");
        }

        // TODO: props 초기화
        // TODO: 권한 설정.
        this.store.searchKPI.country = "THAILAND"

    }

    componentDidMount() {
        this.store.setLoading('on');
        const {history} = this.props;
        if (this.props.store.appState.loggedInUserInfo.permission === "publisher") {
            history.push("/");
        }

        this.store.fetchItemSaleStatis(this.props.store.appState,history);

    }
    
    handleSearch = (e) => {
        e.preventDefault();
        this.store.setLoading('on');
        const {history} = this.props;

        this.store.fetchItemSaleStatis(this.props.store.appState,history);
    }

    handleCountry = (e, {value}) => {
        console.log("country: ", value);
        this.store.setCountry(value);
        this.store.fetchItemSaleStatis(this.props.store.appState,history);
    }

    handleChange = (e, {value}) => {
        console.log("kind of calendar: ", value);
        this.store.setKindCalendar(value);
        this.store.fetchItemSaleStatis(this.props.store.appState,history);
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
        ]

        return(
            <Container style={{ marginTop: '5em', width: '95%' }}>
                <Grid celled>
                    <Grid.Row>
                        <Grid.Column width={3}>
                           

                            <Form size='mini'>
                                <Form.Group widths='equal'>
                                    <Form.Select fluid label='Country' onChange={this.handleCountry} options={countryOptions} placeholder='Country' defaultValue={searchKPI.country}/>
                                </Form.Group>
                                <Divider></Divider>
                                <Form.Field control={Input} placeholder='Start Date' value={searchKPI.from} onChange={this.handleInputFrom}/>
                                <Form.Field control={Input} placeholder='End Date' value={searchKPI.to} onChange={this.handleInputTo} />

                                <Form.Button color='violet' onClick={this.handleSearch.bind(this)}>Search</Form.Button>
                            
                                <Form.Field>
                                    <Form.Radio
                                        label='Daily'
                                        value='day'
                                        checked={searchKPI.kindCalendar === 'day'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Radio
                                        label='Weekly'
                                        value='week'
                                        checked={searchKPI.kindCalendar === 'week'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Radio
                                        label='Monthly'
                                        value='month'
                                        checked={searchKPI.kindCalendar === 'month'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                   
                                
                            </Form>
                        </Grid.Column>
                    
                        <Grid.Column width={13}>
                            <label>* 기타 통계 입니다.</label>
                            <br/>
                            <label>* 태국 과 베트남만 지원 합니다.</label>
                            <br/>
                            <br/>

                            <Divider section />
                                <label>1. TOP 50 Sales Items</label>
                                <br/><br/>
                                <div className="table-controls">
                                    <button id="download-csv">Download CSV</button>
                                </div>
                                <div id="tabulator_saleItems"></div>
                                
                            <Divider section />

                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Container>
        )
    }
}

export default SalesDetail;