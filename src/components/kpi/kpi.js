import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";

import { Dimmer, Checkbox, Dropdown, Container,Select, Input, Form,Grid, Image, Label } from 'semantic-ui-react'

import ReactEcharts from 'echarts-for-react';
import cloneDeep from 'lodash.clonedeep';
import axios from 'axios';
import {BACKEND_API} from '../../utils/constants';

@withRouter
@inject("store")
@observer

class Kpi extends Component {

    constructor(props) {
        super(props);

        this.store = this.props.store.appState;

        //this.state = this.getInitialState();
        //this.fetchNewDate();
    }

    // getInitialState = () => ({option: this.getOption()});

    componentDidMount() {
      this.store.fetchNewDate();
      //this.timeTicket = setInterval(this.fetchNewDate, 1000);
    }

    handleChange = (e, { checked }) => {
        //this.log('Change', checked)
        //console.log(e, checked)
        console.log(e.target.name, checked)

    }

    render() {

        return (
            <Container style={{ marginTop: '5em', width: '95%' }}>
                KPI
                <Grid celled>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Form>
                                <Form.Group>
                                    <Form.Field size='mini' control={Input} label='Start Date' placeholder='Start Date' />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Field size='mini' control={Input} label='End Date' placeholder='End Date' />
                                </Form.Group>
                                
                                {/*
                                <Form.Group>
                                    <Form.Field>
                                        <label>Country</label>
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Field>
                                        <Checkbox 
                                            id='all'
                                            size='mini' 
                                            name="ALL"
                                            label='ALL'
                                            defaultChecked 
                                            onChange={this.handleChange} />&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Checkbox 
                                            id='korea'
                                            size='mini' 
                                            name="KOREA"
                                            label='KOREA'
                                            defaultChecked 
                                            onChange={this.handleChange} />&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Checkbox 
                                            id='japan'
                                            size='mini' 
                                            name="JAPAN"
                                            label='JAPAN'
                                            defaultChecked 
                                            onChange={this.handleChange} />&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Checkbox 
                                            id='taiwan'
                                            size='mini' 
                                            name="TAIWAN"
                                            label='TAIWAN'
                                            defaultChecked 
                                            onChange={this.handleChange} />&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Checkbox 
                                            id='china'
                                            size='mini' 
                                            name="CHINA"
                                            label='CHINA'
                                            defaultChecked 
                                            onChange={this.handleChange} />&nbsp;&nbsp;&nbsp;&nbsp;
                                    </Form.Field>
                                </Form.Group>
                                */}
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <ReactEcharts
                              option={this.getOption()}
                              notMerge={true}
                              lazyUpdate={true}
                              theme={"theme_name"}
                              onChartReady={this.onChartReadyCallback}
                              //onEvents={EventsDict}
                              //opts={} 
                             />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default Kpi;