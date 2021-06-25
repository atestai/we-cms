import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';

import MenuIcon from '@material-ui/icons/Menu';


import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { Route, Switch } from "react-router";

import ConfirmDialog from '../helpers/ConfitmDialog';
import Copyright from '../helpers/Copyright';
import Menu from './Menu';

import Home from './Home';

import lang from '../../language';
import Doctors from '../lists/Doctors';
import Patients from '../lists/Patients';
import User from '../details/User';
import api from '../../helpers/api';



const drawerWidth = 240;

const useStyles = theme => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		padding: theme.spacing(2),
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1)
		
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 240,
	},
});


class Dashboard extends Component {

	constructor(props) {
		super(props);

		const {currentUser, token} = this.props;

		this.state = {
			open: true,
			confirm_open: false,
			error_open : false,
			detail_current_user_open : false,
			auth : {
				currentUser,
				token
			}
		};
	}

	componentDidMount = () => {}


	handleDrawerOpen = (e) => {
		this.setState({ open: true });
	}

	handleDrawerClose = (e) => {
		this.setState({ open: false });
	}

	onConfirmOpen = (e = true) => {
		this.setState({ confirm_open: e });
	}


	onExitToApp = () => {
		this.props.onExitToApp();
	}


	onErrorMessage = (error_open = true) => this.setState({ error_open });


	onOKDetailCurrenteUserAction = async (data) => {
		//console.log(data);

		const status = await api.patch(api.urls.users +  '/' + data.id, data, {
			'Authorization': 'Bearer ' + this.state.auth.token.token
		})

		if (status === 204 || status === 200 ){


			this.setState(state => ({
				detail_current_user_open: false,
				auth : {
					...state.auth,
					currentUser : {
						...state.auth.currentUser,
						name : data.name,
						email : data.email
					}
				}
			}))
  
        }
        else{
            this.message = lang.errors[status];
            this.onErrorMessage(true);
        }     
	}

	getDetailCurrenteUserDialog = () => (
        <User
            open = {this.state.detail_current_user_open}
            detailClose = {() => this.setState({detail_current_user_open:false})} 
            onOK = {this.onOKDetailCurrenteUserAction}  
            user = {this.state.auth.currentUser}
        />
    )

	
	
	getSnackbar = () => (

        <Snackbar
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open = {this.state.error_open}
            onClose={this.onErrorMessage}
            >

            <MuiAlert elevation={6} variant="filled" severity="error" >{this.message}! </MuiAlert>

        </Snackbar>
    )


	render() {

		const { classes } = this.props;


		return (
			<div className={classes.root}>
				{this.getDetailCurrenteUserDialog()}
				{this.getSnackbar()}
				<CssBaseline />
				<AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
					<Toolbar className={classes.toolbar}>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="open drawer"
							onClick={this.handleDrawerOpen}
							className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
						>
							<MenuIcon />
						</IconButton>
						<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
							{this.props.title}
						</Typography>
						
						{/* <IconButton color="inherit">
							<Badge badgeContent={4} color="secondary">
								<NotificationsIcon />
							</Badge>
						</IconButton> */}

						<IconButton color="inherit" onClick={() => this.setState({detail_current_user_open:true})} title={this.state.auth.currentUser.name} >
							<AccountCircleIcon />
						</IconButton>

						<IconButton color="inherit" onClick={() => { this.onConfirmOpen(true) }} title={lang.exit_to_app} >
							<ExitToAppIcon />
						</IconButton>

						<ConfirmDialog

							title={lang.exit_to_app}
							open={this.state.confirm_open}
							setOpen={this.onConfirmOpen}
							onConfirm={this.onExitToApp}
						>
							{lang.exit_to_app_question}
						</ConfirmDialog>

					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					classes={{
						paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
					}}
					open={this.state.open}
				>
					<div className={classes.toolbarIcon}>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<List><Menu user={this.state.auth.currentUser} /></List>
					<Divider />

					{/* <List>{secondaryListItems}</List> */}

				</Drawer>
				<main className={classes.content}>
					<div className={classes.appBarSpacer} />

					<Container maxWidth={false} className={classes.container}>

						<Switch>
							
							<Route exact path="/doctors">
								<Doctors auth = {this.state.auth} />
							</Route>
							<Route exact path="/patients">
								<Patients  auth = {this.state.auth}  />
							</Route>
							<Route exact path="/tests">
								<div>tests</div>
							</Route>
							<Route>
								<Home auth = {this.state.auth} />
							</Route>
						</Switch>
						
						<Box pt={1}>
							<Copyright title={this.props.title} />
						</Box>
					</Container>
				</main>
			</div>
		);
	}
}


export default withStyles(useStyles)(Dashboard);
