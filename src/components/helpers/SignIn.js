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
import { IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import serialize from 'form-serialize';
import {Link} from "react-router-dom";

import ReCAPTCHA from 'react-google-recaptcha';

import config from '../../config.json'
import lang from '../../language'

import Copyright  from './Copyright';


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




class SignIn extends Component {

	constructor(props){
		super(props);

		this.error_force_close = false;
		this.error_open = this.props.error !== null;

		this.recaptchaRef = React.createRef();
		this.recaptchaSitekey = config.recaptchaSitekey;

		this.state = {
			showPassword : false
		}

	}
	

	onSubmitAction = async e =>{
		
		e.preventDefault();
		const data = serialize(e.target, { hash: true });
		const token = await this.recaptchaRef.current.executeAsync();
		this.props.onSignInAction({...data, 'g-recaptcha-response' : token});
	}

	
	onClickShowPassword = e => {
		this.setState((state) => ({showPassword: !state.showPassword}));
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
				
					<img  alt={this.props.title} className={classes.avatar} src="/logo.png" /> 
				
					<form onSubmit={this.onSubmitAction} className={classes.form}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							autoComplete="username"
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type={this.state.showPassword ? 'text' : 'password'}
							id="password"
							autoComplete="current-password"
							InputProps={{

								endAdornment : (
									<InputAdornment position="end">
									<IconButton
									  aria-label="toggle password visibility"
									  onClick={this.onClickShowPassword}
									  onMouseDown={(e) => e.preventDefault()}
									  edge="end"
									>
									  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								  </InputAdornment>
								)
							}}
						/>

						{/* <FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/> */}

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
								{lang.sign_in}
						</Button>

						<Grid container>
							<Grid item xs>
								<Link to="/forgot_password" variant="body2">
									{lang.forgot_password}
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

export default withStyles(useStyles)(SignIn);