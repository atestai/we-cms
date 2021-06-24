import React, {  Fragment } from 'react'

import { IconButton } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


import Patient from '../details/Patient';

import lang from '../../language';
import Api from '../../helpers/api'
import Assessment from '@material-ui/icons/Assessment';
import { Link } from 'react-router-dom';
import Lists from '../core/Lists';


class Patients extends Lists {

    constructor(props){
        super(props);
    
        this.columns = [
            { field: 'name', headerName: lang.name, flex: 0.25 },
            { field: 'username', headerName: lang.username, flex: 0.25 },
            { field: 'Doctor', headerName: lang.doctor, flex: 0.25, 
                valueGetter : (params) => {
                    if (params.row.Doctor){
                        return params.row.Doctor.name;
                    }
                } 
            },
            { field: 'email', headerName: 'E-mail', flex: 0.25 },
            {
                field: ' ',
                resizable: false,
                sortable: false,
                disableColumnMenu: true,
                align : 'right',
                width: 150,
                           
                renderCell: (params) => (
                    <div >

                        <IconButton 
                            component={ Link } to={'/tests/' + params.id} variant="contained" 
                            title={lang.tests}> 
                                <Assessment style={{ color: '#00f' }} /> 
                        </IconButton>

                        <IconButton 
                            
                            title={lang.edit} 
                            onClick={ () => this.onEditDetail(params.id) }> 
                                <EditIcon style={{ color: 'green' }} /> 
                        </IconButton>

                        <IconButton 
                            
                            title={lang.delete} 
                            onClick={ () => this.onDeleteConfirm(true, params.id) }> 
                                <DeleteIcon style={{ color: 'red' }} /> 
                        </IconButton>
                    </div>
                )
            },
        ];
    }


    onLoadData = async () => {

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
            }
            else{
                window.location.href = '/';
            }
        }

        this.setState({
            rows : this.rows.slice()
        });
    }


    
    onEditDetail = async id =>{

        try {
            const user = await Api.get(Api.urls.patients + '/' + id, {}, {
                'Authorization': 'Bearer ' + this.state.auth.token.token
            });
    
    
            if (user !== undefined && user.name === 'TokenExpiredError'){
                window.location.href = '/';
            }
            else if (user){
                this.user = {...user};
                this.setState({ detail_open: true})
            }    

        } catch (error) {
            console.log(error.message);
        }
    }




    onDeleteAction = async () =>{

        //console.log("delete" +  this.id_to_delete);

        let id = this.id_to_delete;

        if (id != null ){

            if (this.state.auth.token ){
                const status = await Api.del(Api.urls.doctors + '/' + id , {
                    'Authorization': 'Bearer ' + this.state.auth.token.token
                });

                if (status){
                    this.setState((state, props) => ({
                        rows: state.rows.filter( item => item.id !== id)
                    }));
                }
                else{
                       //console.log(user.error);
                    this.message = lang.delete_error;
                    this.onErrorMessage();
                }
            }
        }
    }

    


    onMultiDeleteAction = async () =>{
        
        console.log("selected rowData:", this.selectedRowData);
        
        let refresh = false;

        for (const item of  this.selectedRowData) {
            const status = await Api.del(Api.urls.doctors + '/' + item.id , {
                'Authorization': 'Bearer ' + this.state.auth.token.token
            });

            if (status)
                refresh = status;
        }

        if (refresh){
            this.onLoadData();
        }
    }



    onOKDetailAction = async (data) => {
       
        let status = undefined;

        if (data.id !== undefined){
            status = await Api.patch(Api.urls.doctors +  '/' + data.id, data, {
                'Authorization': 'Bearer ' + this.state.auth.token.token
            })
        }
        else{
            status = await Api.post(Api.urls.doctors, data, {
                'Authorization': 'Bearer ' + this.state.auth.token.token
            })
        }

        if (status === 204 || status === 200 ){

            this.setState({ detail_open: false })
            this.onLoadData();

        }
        else{
            this.message = lang.errors[status];
            this.onErrorMessage(true);
        }     
    }


    getDetailDialog = () => (
        <Patient
            auth = {this.state.auth}

            open = {this.state.detail_open}
            detailClose = {this.onDetailClose} 
            onOK = {this.onOKDetailAction}  
            user = {this.user}
        />
    )

    render() {

        return (        
            <Fragment>
                {this.getDataGridPage(lang.patients, '/patients/')}
                {this.getConfirmDialog()}
                {this.getDetailDialog()}
                {this.getSnackbar()}
            </Fragment>
        )
    }
}

export default Patients;
