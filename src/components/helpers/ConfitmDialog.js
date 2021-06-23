import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import lang from '../../language'

class ConfirmDialog extends Component{


	render(){

		const { title, children, open, setOpen, onConfirm } = this.props;

		return (
			<Dialog
				disableBackdropClick
				disableEscapeKeyDown
	
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby="confirm-dialog"
			>
				<DialogTitle id="confirm-dialog">{title}</DialogTitle>
				<DialogContent>{children}</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						onClick={() => setOpen(false)}
						color="secondary"
					>
						{lang.no}
					</Button>
					<Button
						variant="contained"
						onClick={() => {
							setOpen(false);
							onConfirm();
						}}
						color="default"
					>
						{lang.yes}
					</Button>
				</DialogActions>
			</Dialog>
		);

	}
}

export default ConfirmDialog;
