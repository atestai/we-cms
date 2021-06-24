import React, { Component, Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';


import lang from '../../language';


const useStyle = () =>({
	depositContext: {
    	flex: 1,
  	},
})


class Clock extends Component {

	constructor(props){
		super(props);

		this.state = {
			date : new Date()
		}	
	}

	adjust = () =>{
		this.setState({date: new Date()});
	}



	componentDidMount = () => {
		this.interval = setInterval(() => {
			this.adjust()
		}, 1000);
	}


	componentWillUnmount = () => {
		clearInterval(this.interval)
	}

	render(){

		const {classes} = this.props;

		const time = this.state.date.toLocaleTimeString();
		const date = this.state.date.toLocaleDateString(undefined, { 
			weekday: 'long', 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric' 
		});

		//console.log(mydate.toLocaleTimeString());

		return (

			<Fragment>
				<Title>{lang.clock}</Title>
				<Typography component="p" variant="h4">
					{time}
				</Typography>
				<Typography color="textSecondary" className={classes.depositContext}>
					{date}
				</Typography>
				
			</Fragment>
		);
	}

}

export default withStyles(useStyle)(Clock);

