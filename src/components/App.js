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

		// console.log("app.js: ", this.store.appState.authenticated);

		/*
		if (this.store.authenticated === true) {
			const {history} = this.props;
			this.store.setSuccessFlashMessage('You already logged in.');
			history.push('/');
		}
		
		window.location.href = '/auth/login?expired';
		*/
	}
	render() {

		return (
			<div>
				{/*<DevTools />*/}
				<TopBar />
				<LastLocationProvider>
					<Switch>
						<Route exact path="/" component={Home}/>
						<Route path="/login" component={Login}/>
						<Route path="/signup" component={Signup}/>
						<Route path="/confirmEmail/:token" component={ConfirmEmail} />
						<Route path="/invalidConfirmEmail" component={InvalidConfirmEmail} />
						<Route path="/forgotPassword" component={ForgotPassword} />
						<Route path="/resetPassword/:token" component={ResetPassword} />
						<Route path="/profile" {...this.store.appState.authenticated} component={Profile} />

						<Route path="/resource/register" {...this.store.appState.authenticated} component={Register} /> 
						<Route path="/resource/list" {...this.store.appState.authenticated}  component={List} />
						<Route path="/resource/detail" {...this.store.appState.authenticated} component={Detail} />

						<Route component={NotFound}/> 
					</Switch>
				</LastLocationProvider>
				<footer>
						<a href="https://twitter.com/naddicgames" target="_blank">
							@naddic games
						</a>
						{" "}
						| officail korean website:
						{" "}
						<a href="http://closers.nexon.com" target="_blank">
							nexon closers
						</a>
					</footer>
				{/*
				<Route
					exact
					path="/"
					render={props => (
						<LazyRoute {...props} component={import("./Home")} />
					)}
				/>
				<Route
					exact
					path="/posts"
					render={props => (
						<LazyRoute {...props} component={import("./SubPage")} />
					)}
				/>
				<Route
					exact
					path="/posts/:id"
					render={props => (
						<LazyRoute {...props} component={import("./SubItem")} />
					)}
				/>
				<Route
					exact
					path="/login"
					render={props => (
						<LazyRoute {...props} component={import("./auth/Login")} />
					)}
				/>
				<Route
					exact
					path="/signup"
					render={props => (
						<LazyRoute {...props} component={import("./auth/Signup")} />
					)}
				/>
				<footer>
					{testval}
					<a href="https://twitter.com/mhaagens" target="_blank">
						@mhaagens
					</a>
					{" "}
					| github:
					{" "}
					<a href="https://github.com/mhaagens" target="_blank">
						mhaagens
					</a>
				</footer>
					*/}
			</div>
		);
	}
}
