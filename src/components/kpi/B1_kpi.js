import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";

import { Dimmer, Checkbox, Dropdown, Container,Select, Input, Form,Grid, Image, Label } from 'semantic-ui-react'
import ApexCharts from 'apexcharts';
import axios from "axios";
import {BACKEND_API} from '../../utils/constants';

@withRouter
@inject("store")
@observer

class Kpi extends Component {

    constructor(props) {
        super(props);

        this.store = this.props.store.appState;
    }

    componentDidMount() {
        this.store.fetchNewDate();
    }


    handleChange = (e, { checked }) => {
        console.log(e.target.name, checked)
    }

    render() {
        const { option } = this.store;
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
                                
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <div id="chart"></div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default Kpi;