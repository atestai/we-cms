import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignIn from './components/helpers/SignIn';
import Dashboard from './components/dashboard/Dashboard';

import config from './config.json';

import Api from './helpers/api'
import ForgotPassword from './components/helpers/ForgotPassword';


const defaultState = {
	user: null,
	token: null,
	error: false
};


class App extends Component {

	constructor(props) {
		super(props);

		this.title = config.project_name;
		this.state = defaultState;
	}



	checkUserFromToken = async token => {

		try {

			const user = await Api.get(Api.urls.users_by_token, null, {
				'Authorization': 'Bearer ' + token.token
			});

			this.wait = false;

			if (user.name !== 'TokenExpiredError') {
				return user;
			}
			else {
				return new Error('TokenExpiredError');
			}

		} catch (error) {
			this.wait = false;
			console.log(error);
			return new Error(error.messagge);
		}
	}


	componentDidMount = () => {

		const localToken = localStorage.getItem("token");
		this.wait = localToken ? true : false;


		if (localToken) {

			let token = null;
			let user = null;
			let error = true;

			try {
				token = JSON.parse(localToken);

				if (token !== null) {
					user = this.checkUserFromToken(token);
					error = false;
					localStorage.setItem('token', JSON.stringify(token));
				}

			} catch (error) {
				token = null;
			}

			this.wait = false;
			this.setState({
				user,
				token,
				error
			});
		}
	}


	onSignInAction = async data => {

		localStorage.clear();

		let token = null;
		let user = null;
		let error = true;

		try {

			token = await Api.getToken(Api.urls.token, data);

			if (token !== null) {
				user = this.checkUserFromToken(token);
				error = false;
				localStorage.setItem('token', JSON.stringify(token));
			}

		} catch (error) {
			token = null;
		}

		this.setState({
			user,
			token,
			error
		});
	}

	onForgotPassword = async data => {
		console.log(data);
	}

	onExitToApp = e => {

		//this.props.history.push("/about");

		localStorage.clear();
		this.setState(defaultState);

		window.location.href = '/';
	}


	render() {

		let main = <div></div>;

		if (!this.wait) {

			if (this.state.user !== null) {

				main = (
					
					<Dashboard
						title={this.title}
						onExitToApp={this.onExitToApp}
						currentUser={this.state.user}
						token={this.state.token}
					/>
				)

			} else {
				
				main = (
					<Switch>
						<Route exact path="/">
							<SignIn
								title={this.title}
								onSignInAction={this.onSignInAction}
								error={this.state.error}
								onErrorMessage={() => this.setState({ error: false })}
							/>
						</Route>
						<Route path="/forgot_password">
							<ForgotPassword 
								title={this.title}
								onForgotPassword={this.onForgotPassword}
								error={this.state.error}
								onErrorMessage={() => this.setState({ error: false })}
							/>
						</Route>

					</Switch>
				);
			}
		}

		return (
			<Router>
				{main}
			</Router>
			
		)

	}
}

export default App