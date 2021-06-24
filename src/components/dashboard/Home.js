import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Chart from './Chart';
import Clock from './Clock';
import Recent from './Recent';

import React, { Component } from 'react'



const useStyles = theme => ({
	
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


class Home extends Component {


    render() {

        const { classes } = this.props;
		const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

        return (
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9} >
                    <Paper className={fixedHeightPaper}>
                        <Chart />
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <Clock />
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Recent auth={this.props.auth} />
                    </Paper>
                </Grid>
            </Grid>

        )
    }
}


export default withStyles(useStyles)(Home);


