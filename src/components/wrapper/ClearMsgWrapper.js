import React, { Component } from "react";
import { inject, observer } from "mobx-react";
//import { Redirect } from "react-router-dom";

export default function ClearMsgWrapper(WrappedComponent) {
	@inject("store")
	@observer
	class DataFetcher extends Component {
		constructor(props) {
			super(props);
            this.props.store.appState.setLoading('off');
            this.props.store.appState.setClearMessage();
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	}
	return DataFetcher;
}
