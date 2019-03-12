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

class List extends Component {

    constructor(props) {
        super(props);

        this.store = this.props.store.appState;
        this.state = this.getInitialState();
    }

    data0 = null;

    getInitialState = () => ({option: this.getOption()});

    fetchNewDate = () => { 
      this.store.searchKPI.from = '2019-02-01' // for test
      this.store.searchKPI.to = '2019-02-07' // for test
      this.store.searchKPI.country = 'all' // for test
      
      this.store.GetKPI();
      const option = cloneDeep(this.state.option); // immutable

      //option.legend.data = this.store.searchKPI.legend;
      /*
      console.log(...this.store.searchKPI.legend, this.store.searchKPI.legend.length, this.store.searchKPI.legend[0]);

      for (var i=0; i < this.store.searchKPI.legend.length; i++){
        option.legend.data[i] = this.store.searchKPI.legend[i];
      }
      option.legend.data.push('KOREA');
      */

     return axios.post(BACKEND_API+'/v1/kpi/list', {...this.store.searchKPI})
     .then((response) => {
       response.data.data.forEach(element => {
         console.log(element);
         
         //option.xAxis[0].data.push(element.date);
         //option.series[0].data.push(element.totals);
       });
       
       this.setState({
          option,
       });
     })

    };

    componentDidMount() {
      this.fetchNewDate();
    }

  
  getOption = () => {
    return {
      title: {
        text: 'REVENUE'
      },
      tooltip : {
        trigger: 'axis'
      },
      
      legend: {
        data: ['KOREA', 'CHINA', 'JAPAN', 'TAIWAN', 'NA']
      },
      
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : ['2/1','2/2','2/3','2/4','2/5','2/6','2/7']
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          "name":'KOREA',
          "type":'line',
          //"stack": 'revenue',
          //"areaStyle": "{normal: {}}",
          "label": {
                normal: {
                    show: true,
                    //position: 'top'
                }
            },
         "data":[120, 132, 101, 134, 90, 230, 210]
        },
        {
          "name":'JAPAN',
          "type":'line',
          //"stack": 'revenue',
          //"areaStyle": "{normal: {}}",
          "label": {
                normal: {
                    show: true,
                    //position: 'top'
                }
            },
          "data":[220, 182, 191, 234, 290, 330, 310]
        },
        {
          "name":'TAIWAN',
          "type":'line',
          //"stack": 'revenue',
          //"areaStyle": "{normal: {}}",
          "label": {
                normal: {
                    show: true,
                    //position: 'top'
                }
            },
          "data":[150, 232, 201, 154, 190, 330, 410]
        },
        {
          "name":'CHINA',
          "type":'line',
          //"stack": 'revenue',
          //"areaStyle": "{normal: {}}",
          "label": {
                normal: {
                    show: true,
                    //position: 'top'
                }
            },
          "data":[100, 200, 200, 150, 190, 300, 400]
        },
      ]
    };
  };

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
                             />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default List;