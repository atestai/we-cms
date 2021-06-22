import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import lang from '../../language';

class Doctor extends Component {



    render() {

        return (

                <Dialog open={this.props.open} onClose={this.props.detailClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth >
                    <DialogTitle id="form-dialog-title">{lang.doctor}</DialogTitle>
                    
                    <DialogContent>
                       
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            required
                        />

                        <TextField
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.detailClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.props.detailClose} color="primary">
                            Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>
           
        )
    }
}


export default Doctor