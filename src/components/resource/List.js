import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";

import { Dimmer, Loader, Segment, Container } from 'semantic-ui-react'

@withRouter
@inject("store")
@observer
class List extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.store.appState;
    }

    componentDidMount() {
        const { history } = this.props;
        this.store.GetResourceAll(history);
    }

    render() {
        return (
            <Container style={{ marginTop: '5em' }}>
                List of resource
                <div className="page home">
                    <div id="tabulator-1"></div>
                </div>
            </Container>
        );
    }
}

export default List;