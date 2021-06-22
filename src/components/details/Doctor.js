import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


import serialize from 'form-serialize';

import lang from '../../language';

class Doctor extends Component {


    onOKAction = e => {
        e.preventDefault();
		const data = serialize(e.target, { hash: true });

        const data_to_send = { ...data, role_id : 2  }

        // "name": "Paziente 5",
        // "role_id": 3,	
        //     "doctor_id" : 2,
        //     "username" : "pat_5"


        //console.log(data);
        this.props.onOK(data_to_send);
    }


    render() {

        return (

            <Dialog  
                disableBackdropClick
                disableEscapeKeyDown
                open={this.props.open} onClose={this.props.detailClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth >
                <form onSubmit={this.onOKAction}>

                    <DialogTitle id="form-dialog-title">{lang.doctor}</DialogTitle>

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
                        />

                        <TextField
                            margin="dense"
                            id="username"
                            name="username"
                            label="Username"
                            type="text"
                            fullWidth
                            required
                        />

                        <TextField
                            margin="dense"
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            required
                        />

                        <TextField
                            margin="dense"
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
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


export default Doctor