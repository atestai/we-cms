import React, { Component } from 'react';

import SignIn from './components/SignIn';
import Dashboard from './components/dashboard/Dashboard';

import Api from './api/api'


class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			title: 'PKU - Smart sensors',
			user: null,
			token : null, 
			error : null
		};
	}

	onSignInAction = async data => {

		this.setState({ 
			error : null
		});

		try {
			const token = await Api.post(Api.urls.token, data);
			
			const user = await Api.get(Api.urls.users_by_token, null, {
				'Authorization': 'Bearer ' + token.token
			});

			this.setState({ 
				token,
				user
			});

		} catch (error) {
			this.setState({ 
				error
			});
		}
		

		

	}


	render() {

		let main;

		if (this.state.user !== null) {
			main = (
				<Dashboard
					title={this.state.title}
				/>
			);
		} else {
			main = (
				<SignIn
					title={this.state.title}
					onSignInAction={this.onSignInAction}
					error = {this.state.error}

				/>
			);
		}


		return main
	}
}

export default App