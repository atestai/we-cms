import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';


import serialize from 'form-serialize';

import lang from '../../language';
import { Input } from '@material-ui/core';

class User extends Component {

    constructor(props){
		super(props);

		this.state = {
			showPassword : false 
		}
	}

    onClickShowPassword = e => {
		this.setState((state) => ({showPassword: !state.showPassword}));
	}

    onOKAction = e => {
        e.preventDefault();
		const data = serialize(e.target, { hash: true });
        this.props.onOK(data);
    }


    render() {

        const {id, name, username, email} = this.props.user;
        const password_required = id === undefined ;

        return (

            <Dialog  
                disableBackdropClick
                disableEscapeKeyDown
                open={this.props.open} 
                onClose={this.props.detailClose} 
                aria-labelledby="form-dialog-title" 
                maxWidth="sm" fullWidth >

                <form onSubmit={this.onOKAction}>

                    <DialogTitle id="form-dialog-title">{lang.user}</DialogTitle>
                    <Input name="id" value={id} type="hidden" />

                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            required
                            defaultValue = {name}
                        />

                        <TextField
                            margin="dense"
                            id="username"
                            name="username"
                            label="Username"
                            type="text"
                            fullWidth
                            aria-readonly
                            value = {username}
                        />

                        <TextField
                            margin="dense"
                            id="password"
                            name="password"
                            label="Password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            fullWidth
                            required={password_required}
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

                        <TextField
                            margin="dense"
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            defaultValue = {email}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.detailClose} color="primary">
                            {lang.cancel}
                        </Button>
                        <Button type="submit" color="primary">
                            {lang.ok}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        )
    }
}

export default User