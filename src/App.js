import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignIn from './components/helpers/SignIn';
import Dashboard from './components/dashboard/Dashboard';

import config from './config.json';

import Api from './helpers/api'
import ForgotPassword from './components/helpers/ForgotPassword';
import lang from './language';


const defaultState = {
	user: null,
	token: null,
	error: false,
	forgot_message : null
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

			if (user !== 401 && user.name !== 'TokenExpiredError') {
				return user;
			}
			else {
				return null
			}

		} catch (error) {
			return null;
		}
		finally{
			this.wait = false;
		}
	}


	componentDidMount = async () => {

		const localToken = localStorage.getItem("token");
		this.wait = localToken ? true : false;


		if (localToken) {

			let token = null;
			let user = null;
			let error = true;

			try {
				token = JSON.parse(localToken);

				if (token !== null) {
					user = await this.checkUserFromToken(token);

					if (user){
						error = false;
						localStorage.setItem('token', JSON.stringify(token));
					}
					else{
						localStorage.clear();
					}
				}
				else{
					localStorage.clear();
				}

			} catch (error) {
				token = null;
				localStorage.clear();
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
				user = await this.checkUserFromToken(token);
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
		
		try {
			const status = await Api.forgotPassword(Api.urls.forgot_password, data);

			this.setState({ 
				forgot_message: {
					severity : status === 202 ? 'success' : 'error',
					text : status === 202 ? lang.reset_password_success : lang.reset_password_error
				}
			});

		} catch (error) {
			this.setState({ 
				forgot_message: {
					severity : 'error',
					text : lang.reset_password_error
				}
			});
		}
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
								messagge={this.state.forgot_message}
								onErrorMessage={() => this.setState({ forgot_message: null })}
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