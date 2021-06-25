import React, { Component } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Input, InputAdornment, MenuItem , TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import serialize from 'form-serialize';

import lang from '../../language';
import Api from '../../helpers/api'



class Patient extends Component {

    constructor(props){
        super(props);

        const {auth} = this.props;

        this.doctors = [];

        this.state = {
            auth,
            showPassword : false 
        };
    }

    componentDidMount = () => {
        this.onLoadData();
    }

    componentWillUnmount = () => {
        this.doctors = [];
    }



    onLoadData = async () => {
    
        if (this.state.auth && this.state.auth.currentUser.role_id === 1){

            const data = await Api.get(Api.urls.list_doctors, null, {
                'Authorization': 'Bearer ' + this.state.auth.token.token
            });
    
            if (data.users !== undefined ){
                // this.setState({
                //     doctors : data.users.slice()
                // });
                this.doctors = data.users.slice();
            }
            else{
                window.location.href = '/';
                return;
            } 
        }
    }


    onClickShowPassword = e => {
		this.setState((state) => ({showPassword: !state.showPassword}));
	}


    onOKAction = e => {
        e.preventDefault();
        const data = serialize(e.target, { hash: true });
        const data_to_send = { ...data, role_id: 3 }

        this.props.onOK(data_to_send);
    }


    onChangeDoctor = e => {
        console.log(e);
    }

    render() {

        const { id, name, username, email, doctor_id = "" } = this.props.user;
        const password_required = id === undefined;

        return (

            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={this.props.open}
                onClose={this.props.detailClose}
                aria-labelledby="form-dialog-title"
                maxWidth="sm" fullWidth >

                <form onSubmit={this.onOKAction}>

                    <DialogTitle id="form-dialog-title">{lang.patient}</DialogTitle>
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
                            defaultValue={name}
                        />

                        { this.state.auth.currentUser.role_id === 1 &&  (
                        
                            <TextField
                                id="doctor_id"
                                select
                                label={lang.doctor}
                                name="doctor_id"
                                defaultValue={doctor_id}
                                onChange={this.onChangeDoctor}
                                // helperText="Please select your currency"
                                fullWidth
                                required
                                >
                                {this.doctors.map((option) => (

                                    <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                    </MenuItem>

                                ))}
                            </TextField>
                        )}

                        { this.state.auth.currentUser.role_id === 2 && (
                            <Input name="doctor_id" value={this.state.auth.currentUser.id} type="hidden" />
                        )}


                        <TextField
                            margin="dense"
                            id="username"
                            name="username"
                            label="Username"
                            type="text"
                            fullWidth
                            required
                            defaultValue={username}
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
                            required
                            fullWidth
                            defaultValue={email}
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


export default Patient;