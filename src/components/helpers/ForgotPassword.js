import React, { Component } from 'react';
import Button from '@material-ui/core/Button';


import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';


import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';


import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {Link} from "react-router-dom";

import serialize from 'form-serialize';
import ReCAPTCHA from "react-google-recaptcha";

import Copyright  from './Copyright';

import config from '../../config.json'
import lang from '../../language'





const useStyles = theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(3, 0, 2, 0),
		
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
});




class ForgotPassword extends Component {

	constructor(props){
		super(props);

		this.error_force_close = false;
		this.error_open = this.props.error !== null;

		this.recaptchaRef = React.createRef();
		this.recaptchaSitekey = config.recaptchaSitekey;
	}
	

	onSubmitAction = async e =>{
		
		e.preventDefault();

		const data = serialize(e.target, { hash: true });
		const token = await this.recaptchaRef.current.executeAsync();

		this.props.onForgotPassword({...data, 'g-recaptcha-response' : token});
	}

	onRecaptchaChange = e =>{
		console.log(e);
	}
	


	render() {
		const {classes} = this.props;


		return (

			<Container component="main" maxWidth="xs">
				
				<Snackbar
					autoHideDuration={5000}
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					open = {this.props.error}
					onClose={this.props.onErrorMessage}
					>

					<MuiAlert elevation={6} variant="filled" severity="error" >{lang.invalid_credentials}! </MuiAlert>
				</Snackbar>
				 

				<CssBaseline />
				<div className={classes.paper}>
				
					<img alt={this.props.title} className={classes.avatar} src="/logo.png" /> 
				
					<form onSubmit={this.onSubmitAction} className={classes.form}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email"
							name="email"
							type="email"
							autoComplete="email"
							autoFocus
						/>

						<ReCAPTCHA
								ref={this.recaptchaRef}
								sitekey={this.recaptchaSitekey}
								size="invisible"
								onChange={this.onRecaptchaChange}
							/>
					
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
								{lang.request_password}
						</Button>

						<Grid container>
							<Grid item xs>
								<Link to="/" variant="body2">
									{lang.sign_in}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>

				<Box mt={8}>
					<Copyright title={this.props.title} />
				</Box>

			</Container>
		);
	}
}

export default withStyles(useStyles)(ForgotPassword);