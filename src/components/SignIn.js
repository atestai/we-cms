import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import serialize from 'form-serialize';


import os from 'os';


function Copyright() {

	let host = os.hostname();
	console.log(host);

	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href={host}>
				{host}
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
});

//console.log(useStyles);

const Alert = props => {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}



class SignIn extends Component {
	
	constructor(props) {
		super(props);	
		this.state = { utenteAutenticato: false };
	}

	onSubmitAction = e =>{
		
		e.preventDefault();
		const data = serialize(e.target, { hash: true });
		this.props.onSignInAction(data);
	}



	render() {
		const {classes} = this.props;


		let alert = '';

		if (this.props.error !== null){
			alert = (
				<Snackbar open={true} autoHideDuration={2000} >
					<Alert severity="error">
						This is a success message!
					</Alert>
      			</Snackbar>
			)
		}
		

			


		return (


			<Container component="main" maxWidth="xs">
				{alert}
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						{this.props.title}
					</Typography>
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
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						{/* <FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/> */}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								
							</Grid>
						</Grid>
					</form>
				</div>

				<Box mt={8}>
					<Copyright />
				</Box>

			</Container>
		);

	}

}

export default withStyles(useStyles)(SignIn);