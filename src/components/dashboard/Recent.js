import React, { Component, Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import { Link } from 'react-router-dom';

import Title from './Title';
import lang from '../../language';
import Api from '../../helpers/api';




const useStyle = theme =>({
	seeMore: {
		marginTop: theme.spacing(3),
	}
})


class Recent extends Component {

	constructor(props){
		super(props);

		const {auth} = this.props;

		
		this.columns = [
			lang.name, 
			lang.email
		]

		if (auth.currentUser.role_id === 1){
			this.columns.push(lang.doctor)
		}
		

		this.state = {
			rows : [],
			auth 
		}
	}


	componentDidMount = () =>{

		this.onLoadData();

		this.interval = setInterval(() => {
			this.onLoadData()
		}, 5 * 60 * 1000);

	}

	onLoadData = async () =>{
		//this.setState({date: new Date()});
		if (this.state.auth){

            let url = null;

            if (this.state.auth.currentUser.role_id === 2 ){
                url = Api.urls.doctors + '/' + this.state.auth.currentUser.id + '/patients';
            }
            else{
                url = Api.urls.list_patients;
            } 

            const data = await Api.get(url, null, {
                'Authorization': 'Bearer ' + this.state.auth.token.token
            });
    
            if (data.users !== undefined ){
                this.rows = data.users;
				
				this.setState({
					rows : this.rows.slice()
				});
            }
            else{
                window.location.href = '/';
            }
        }

      
	}


	componentWillUnmount(){
		clearInterval(this.interval)
	}

	render(){

		const {classes} = this.props;
		const title = lang.recents;


		return (

			<Fragment>
				<Title>{title}</Title>
				<Table size="small">

					<TableHead>
						<TableRow>
							{this.columns.map( (item, index) => <TableCell key={index} >{item}</TableCell>)}
						</TableRow>
					</TableHead>
					<TableBody>
						{this.state.rows.slice(0,5).map( item => (
							<TableRow key={item.id}>
								<TableCell>{item.name} </TableCell>
								<TableCell>{item.email} </TableCell>
								{this.state.auth.currentUser.role_id === 1 && item.Doctor !== null && (
									<TableCell>{item.Doctor.name} </TableCell>
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
				<div className={classes.seeMore}>
					<Link color="primary" to="/patients">{lang.see_more}</Link>
				</div>
				
			</Fragment>
		);
	}

}

export default withStyles(useStyle)(Recent);

