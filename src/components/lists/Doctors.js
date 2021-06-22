import React, { Component, Fragment } from 'react'

import {  IconButton, Snackbar } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import {Link } from "react-router-dom";

import MuiAlert from '@material-ui/lab/Alert';

import ConfirmDialog from '../ConfitmDialog';
import DatagridPage from '../DatagridPage';
import Doctor from '../details/Doctor';

import lang from '../../language';
import Api from '../../helper/api'



class Doctors extends Component {

    constructor(props){
        super(props);

        this.columns = [
            { field: 'name', headerName: lang.name, flex: 0.33 },
            { field: 'username', headerName: lang.username, flex: 0.33 },
            { field: 'email', headerName: 'E-mail', flex: 0.33 },

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
                            edge='start'  
                            title={lang.edit} 
                            component={ Link } to={'/doctors/' +  params.id} variant="contained"> 
                                <EditIcon style={{ color: 'green' }} /> 
                        </IconButton>

                        <IconButton 
                            edge='end' 
                            title={lang.delete} 
                            onClick={ () => this.onOpenDialog(true, params.id) }> 
                                <DeleteIcon style={{ color: 'red' }} /> 
                        </IconButton>
                    </div>
                   
                  )
            },
        ];

        this.rows = [];


        this.state = {
            rows : [],
            token : props.token.token,
            delete_confirm_open : false,
            detail_open : false,
            error_open : false
        };
    }


    loadData = async () => {

        if (this.state.token ){
            const data = await Api.get(Api.urls.list_doctors, null, {
                'Authorization': 'Bearer ' + this.state.token
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


    componentDidMount = () => {
        this.loadData();
    }


    onAddAction = e =>{
        //console.log(e.target);
        this.setState({ detail_open: true })

    }


    onEditAction = id =>{
        console.log(id);
    }


    onOpenDialog = ( open = true, id = null) =>{

        //console.log(open);
        this.setState({ delete_confirm_open: open });

        if (open){
            this.id_to_delete = id;
            console.log("open:" + this.id_to_delete);
        }
    }

    onDeleteAction = async () =>{

        console.log("delete" +  this.id_to_delete);

        let id = this.id_to_delete;

        if (id != null ){

            if (this.state.token ){
                const status = await Api.del(Api.urls.doctors + '/' + id , {
                    'Authorization': 'Bearer ' + this.state.token
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

    onSearchAction = e =>{

        const text = e.target.value;

        if (!text.length || text.length >= 3 ){
            this.setState({
                rows: this.rows.filter( item => new RegExp(text, 'i').test(item.name) || new RegExp(text, 'i').test(item.email) )    
            });
        }
    }


    onMultiDeleteAction = ids =>{
        console.log(ids);
    }


    onDetailClose = () => {
        this.setState({ detail_open: false })
    }

    insertElement = async (data) => {
       
        const user = await Api.post(Api.urls.doctors, data, {
            'Authorization': 'Bearer ' + this.state.token
        })


        if (user.error === undefined){

            this.setState({ detail_open: false })
            this.loadData();

        }
        else{
            //console.log(user.error);
            this.message = user.error;
            this.onErrorMessage(true);
        }        
    }


    onErrorMessage = (error_open = true) => {
        this.setState({ error_open })
    }


    render() {

        return (        
            <Fragment>

                <DatagridPage
                    title = {lang.doctors}
                    columns = {this.columns}
                    rows = {this.state.rows}
                    
                    baseUrl = '/doctors/'

                    onAdd = {this.onAddAction}
                    onSearch = {this.onSearchAction}
                    onDelete = {this.onMultiDeleteAction}
                    onReload = {this.loadData}
                    
                />

                <ConfirmDialog
                    title={lang.delete}
                    open={this.state.delete_confirm_open}
                    setOpen={this.onOpenDialog}
                    onConfirm={this.onDeleteAction}>
                
                    {lang.delete_question}
                    
                </ConfirmDialog>

                <Doctor
                    open = {this.state.detail_open}
                    detailClose = {this.onDetailClose} 
                    onOK = {this.insertElement}  

                />

                <Snackbar
                        autoHideDuration={5000}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open = {this.state.error_open}
                        onClose={this.onErrorMessage}
                        message={this.message}
                        severity="error">

                        <MuiAlert elevation={6} variant="filled" severity="error" >{this.message}! </MuiAlert>

                    </Snackbar>

            </Fragment>
        )
    }
}

export default Doctors;
