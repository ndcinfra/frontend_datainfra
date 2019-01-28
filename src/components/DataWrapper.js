import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Redirect } from "react-router-dom";

export default function DataWrapper(WrappedComponent) {
	@inject("store")
	@observer
	class DataFetcher extends Component {
		constructor(props) {
			super(props);
			this.store = this.props.store.appState;
		}

		componentDidMount() {
			//console.log("componentDidMount DW: ", this.props);
			//console.log("this.props.match: ", this.props.match.params.id);

			let pathname = this.props.match.url;
			let id = this.props.match.params.id ? this.props.match.params.id : null;


			this.store.fetchData(pathname, id);
		}

		componentWillUnmount() {
			this.store.clearItems();
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	}
	return DataFetcher;
}
