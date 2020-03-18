import React from 'react';

class ErrorBoudary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false
		}
	}

	componentDidCatch(error, info) {
		this.setState({ hasError: true });
	}

	render() {
		return this.state.hasError ?
			<h1>Oooops. That's not good :'(</h1> :
			this.props.children;
	}
}

export default ErrorBoudary;