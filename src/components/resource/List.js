import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";

import { Dimmer, Loader, Segment, Container,Modal, Button, Header, Image } from 'semantic-ui-react'

@withRouter
@inject("store")
@observer
class List extends Component {
    //state = { open: false }
    //show = dimmer => () => this.setState({ dimmer, open: true })
    //close = () => this.setState({ open: false })

    constructor(props) {
        super(props);
        this.store = this.props.store.appState;
    }

    componentDidMount() {
        const { history } = this.props;
        this.store.GetResourceAll(history);        
    }


    render() {
        // const { open, dimmer, modalOpened } = this.state
        return (
            <div>
            <Container style={{ marginTop: '5em', width: '95%' }}>
                List of resource
                
                
                {/*                <div className="table-controls">
                    <span>
                    <label>Field: </label>
                    <select id="filter-field">
                        <option></option>
                        <option value="name">Name</option>
                        <option value="progress">Progress</option>
                        <option value="gender">Gender</option>
                        <option value="rating">Rating</option>
                        <option value="col">Favourite Colour</option>
                        <option value="dob">Date Of Birth</option>
                        <option value="car">Drives</option>
                        <option value="function">Drives &amp;Rating &lt; 3</option>
                    </select>
                    </span>
            
                    <span>
                    <label>Type: </label>
                    <select id="filter-type">
                        <option value="=">=</option>
                        <option value="<">&lt;</option>
                        <option value="<=">&lt;=</option>
                        <option value=">">&gt;</option>
                        <option value=">=">&gt;=</option>
                        <option value="!=">!=</option>
                        <option value="like">like</option>
                    </select>
                    </span>
            
                    <span><label>Value: </label> <input id="filter-value" type="text" placeholder="value to filter" /></span>
            
                    <button id="filter-clear">Clear Filter</button>
                </div>
                */}
                {/*                <div className="table-controls">
                    <button id="download-csv">Download CSV</button>
                    <button id="download-json">Download JSON</button>
                    <button id="download-xlsx">Download XLSX</button>
                    <button id="download-pdf">Download PDF</button>
                </div>
                */}
                <div id="tabulator-1"></div>

            </Container>
                {/*
                {modal}
                */}
            </div>
        );
    }
}

export default List;