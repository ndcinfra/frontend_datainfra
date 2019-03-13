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
  getOption = () => {
    return {
      title: {
        text: 'REVENUE'
      },
      tooltip : {
        trigger: 'axis'
      },
      
      legend: {
        data: ['KOREA', 'CHINA', 'JAPAN', 'TAIWAN', 'NA', 'TOTAL']
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
          data : []
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

    constructor(props) {
        super(props);

        this.store = this.props.store.appState;
        this.state = this.getInitialState();
    }

    data0 = null;

    getInitialState = () => ({option: this.getOption()});

    fetchNewDate = () => { 
      this.store.searchKPI.from = '2019-03-07' // for test
      this.store.searchKPI.to = '2019-03-13' // for test
      this.store.searchKPI.country = 'all' // for test
      this.store.searchKPI.kind = 'graph' // for test
      
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

      // series
      var series = new Object();
      var ldata = new Array();
      var keys = new Array();

     return axios.post(BACKEND_API+'/v1/kpi/list', {...this.store.searchKPI})
     .then((response) => {
       /*
       response.data.data.forEach(element => {
         console.log(element);
         console.log(element.cdate);
         
         option.xAxis[0].data.push(element.cdate);
         //option.series[0].data.push(element.totals);
       });
       */
       console.log(response.data.data, response.data.data.length);
      // set legend
      for (var i=0; i<response.data.data.length; i++) {
        option.xAxis[0].data.push(response.data.data[i].cdate);
      }
      //console.log("legend: ", option.xAxis[0].data);

      console.log(Object.keys(response.data.data[0]).length);

      //set series
      // i = column, j = row
      for (var i=0; i<Object.keys(response.data.data[0]).length; i++) {
        for (var j=0; j<response.data.data.length; j++) {
          // legend
          if (i == 0) {
            option.xAxis[0].data.push(response.data.data[j].cdate);
          }else{
            //series
            // i==1 china
            // i==2 japan
            // i==3 korea
            // i==4 na
            // i==5 taiwan
            // i==6 total

            keys = Object.keys(response.data.data[j])[i]
            series.name = keys;
            series.type = 'line';
            series.label = {normal: {show: true,}};

            switch (i) {
              case 1: // china
                ldata.push(response.data.data[j].china);
              case 2: // japan
                ldata.push(response.data.data[j].japan);
              case 3: // korea
                ldata.push(response.data.data[j].japan);

            }

            //console.log(j,i,keys,response.data.data[j].keys);
            //ldata.push((response.data.data[j])[i]);
          }
          
        }

        //series.data = ldata;
        //ldata = [];
        
        console.log("series: ",series);
      }

      console.log("legend: ", option.xAxis[0].data);
       

       this.setState({
          option,
       });
     })

    };

    componentDidMount() {
      this.fetchNewDate();
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
                             />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default List;