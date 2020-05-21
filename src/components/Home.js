import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Message } from 'semantic-ui-react'

import Carousel from './ui/Carousel';

//import ClearMsgWrapper from './wrapper/ClearMsgWrapper';
//@ClearMsgWrapper

@inject("store")
@observer
export default class Home extends Component {

	constructor(props) {
		console.log("home constructor")
		super(props);
		this.store = this.props.store;

		this.store.appState.setLoading('off');
		//this.store.appState.checkAuth();
	}

    componentDidMount() {
		console.log('home componentDidMount');
		this.store.appState.checkAuth();
    }
     
    componentDidUpdate(){
        console.log('home componentDidUpdate');
	}
	
	// for flash
	handleDismiss = (e, {name}) => {
        if (name == "errorFlash") {
            this.store.appState.errorFlash = null;
        }else{
            this.store.appState.successFlash = null;
        }
	}

	render() {
		const { errorFlash, successFlash } = this.store.appState;

		var successFlashView = null;
		if (successFlash) {
			successFlashView = (
                <Message success name="successFlash" onDismiss={this.handleDismiss} content={successFlash}/>
			);
		}
        var errorFlashView = null;
        if(errorFlash) {
            errorFlashView = (
                <Message error name="errorFlash" onDismiss={this.handleDismiss} content={errorFlash} />
            );
		}
		
		return (
			<div className="page home">
					{/*
					<div>
						{ errorFlashView }
						{ successFlashView }
					</div>
					*/}
				<main>
					<div className="section-header">
						<h3><font color="green">Naddic Games</font></h3>
						<br />
						<img src='http://gwx.bizmeka.com/Upload_LoginImage/%7B78827A05-A152-4E84-94CA-96E3B88EDF7F%7D_293.jpg'></img>
						<br /><br />
						<h3>Infra</h3>
						<br />
					</div>
				</main>
			</div>
		);
	}
}
