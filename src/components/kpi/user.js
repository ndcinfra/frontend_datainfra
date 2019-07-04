import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";

import { Dimmer, Checkbox, Dropdown, Container,Button, Input, Form,Grid, Radio, Loader, Label } from 'semantic-ui-react'

var echarts = require('echarts');

@withRouter
@inject("store")
@observer

class UserKpi extends Component {

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

        //this.store.fetchNewDate(this.props.store.appState,history);

    }
    
    handleSearch = (e) => {
        e.preventDefault();
        this.store.setLoading('on');
        const {history} = this.props;

        //this.store.fetchNewDate(this.props.store.appState,history);
    }

    handleCountry = (e, {value}) => {
        console.log("country: ", value);
        this.store.setCountry(value);
    }

    handleChange = (e, {value}) => {
        console.log("kind of calendar: ", value);
        this.store.setKindCalendar(value);
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
                        <Grid.Column width={2}>
                            유저통계
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <Form size='mini'>
                                <Form.Group widths='equal'>
                                    <Form.Select fluid label='Country' onChange={this.handleCountry} options={countryOptions} placeholder='Country' defaultValue={countryOptions[0].value}/>
                                </Form.Group>
                                <Form.Group widths='inline'>
                                    <Form.Radio
                                        label='Daily'
                                        value='day'
                                        checked={searchKPI.kindCalendar === 'day'}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Radio
                                        label='Weekly'
                                        value='week'
                                        checked={searchKPI.kindCalendar === 'week'}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Radio
                                        label='Monthly'
                                        value='month'
                                        checked={searchKPI.kindCalendar === 'month'}
                                        onChange={this.handleChange}
                                    />

                                    <Form.Field control={Input} placeholder='Start Date' value={searchKPI.from} onChange={this.handleInputFrom}/>
                                    <Form.Field control={Input} placeholder='End Date' value={searchKPI.to} onChange={this.handleInputTo} />

                                    <Form.Button color='violet' onClick={this.handleSearch.bind(this)}>Search</Form.Button>
                                </Form.Group>
                                
                            </Form>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={15}>
                            <label></label>
                            <div id="chart_user" style={{width:'100%', height:'400px'}} ></div>
                            <div id="tabulator_user"></div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Container>
        )
    }
}

export default UserKpi;