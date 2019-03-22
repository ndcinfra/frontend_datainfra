import React, { Component } from "react";
import { Route, Link, withRouter, Switch } from "react-router-dom";
import { inject, observer } from "mobx-react";
import LazyRoute from "lazy-route";
import DevTools from "mobx-react-devtools";

import { LastLocationProvider } from 'react-router-last-location';

// Components
import TopBar from "./TopBar";
import NotFound from "./NotFound";
import Home from "./Home";
import { Login, Logout, Signup } from './auth/index';
import {ConfirmEmail, InvalidConfirmEmail, ForgotPassword, ResetPassword, Profile } from './user/index';
import {Register, List, Detail} from './resource/index';

import {RegisterIn} from './indi/index';

import {Kpi} from './kpi/index';

@withRouter
@inject("store")
@observer
export default class App extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}
	
	componentDidMount() {
		//this.authenticate();
		console.log("app.js componentDidMount")
	}

	authenticate = async (e) =>{
		if (e) e.preventDefault();
		//this.store.appState.authenticate();
		await this.store.appState.checkAuth();
	}
	render() {
		const { history } = this.props;
		var cuPath = history.location.pathname;

		var viewPane = null;
		if (cuPath === "/RegisterIn") {
			viewPane = (
				<Route path="/registerIn" component={RegisterIn} />
			);
		}else{
			viewPane = (
				<div>
					
				</div>
			)
			
		}

		return (

			<div>
				{viewPane}
			</div>
		);
	}
}
