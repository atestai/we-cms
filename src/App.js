import React, { Component } from 'react';

import {BrowserRouter as Router} from 'react-router-dom'; 



import SignIn from './components/SignIn';
import Dashboard from './components/dashboard/Dashboard';

import config from './config.json';

import Api from './helper/api'


const defaultState = {
	user: null,
	token: null,
	error: null
};


class App extends Component {

	constructor(props) {
		super(props);

		this.title = config.project_name;
		this.state = defaultState;
		
		const localToken = localStorage.getItem("token");

		this.wait = localToken ? true : false;

	}


	checkUserFromToken = async token => {

		try {

			//this.wait = true;

			const user = await Api.get(Api.urls.users_by_token, null, {
				'Authorization': 'Bearer ' + token.token
			});

			this.wait = false;

			if (user.name !== 'TokenExpiredError'){
				//console.log(user);

				this.setState({
					token,
					user
				});
			}
			else{
				this.setState({
					token : null,
					user: null,
					error : user.message || 'Error'
				});
			}


		} catch (error) {
			this.wait = false;
			
			this.setState({
				token : null,
				user: null,
				error : error.message || 'Error'
			});
		}
	}

	
	componentDidMount() {

		const localToken = localStorage.getItem("token");

		if (localToken){

			try {
				const token = JSON.parse(localToken);
				this.checkUserFromToken(token);

			} catch (error) {
				console.log(error);

				this.setState({
					token : null,
					user: null,
					error
				});
			}
		}
	}


	onSignInAction = async data => {

		this.setState({
			error: null
		});

		try {
			const token = await Api.post(Api.urls.token, data);
			
			this.checkUserFromToken(token);

			localStorage.setItem('token', JSON.stringify(token));

		} catch (error) {
			this.setState({
				error
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

		if (!this.wait){
			if (this.state.user !== null) {
				main = (
					<Router>
					<Dashboard
						title={this.title}
						onExitToApp={this.onExitToApp}
						user={this.state.user}
						token = {this.state.token}
					/>
					</Router>	
				);
			} else {
				main = (
					<SignIn
						title={this.title}
						onSignInAction={this.onSignInAction}
						error={this.state.error}
	
					/>
				);
			}
		}

		return main 
		
	}
}

export default App