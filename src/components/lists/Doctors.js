import React, { Component, Fragment } from 'react'

import { IconButton, Snackbar } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import MuiAlert from '@material-ui/lab/Alert';

import ConfirmDialog from '../helpers/ConfitmDialog';
import DatagridPage from '../helpers/DatagridPage';
import Doctor from '../details/Doctor';

import lang from '../../language';
import Api from '../../helpers/api'



class Doctors extends Component {

    constructor(props){
        super(props);

        if ( props.token === undefined){
            window.location.href = '/';
        }

        this.user = {};
        this.selectedRowData = [];

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
                            onClick={ () => this.onEditAction(params.id) }> 
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

    componentDidMount = () => {
        this.loadData();
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


    onAddAction = e =>{
        this.user = {};
        this.setState({ detail_open: true })
    }


    onEditAction = async id =>{
        const user = await Api.get(Api.urls.doctors + '/' + id, {}, {
            'Authorization': 'Bearer ' + this.state.token
        });

        if (user !== undefined && user.name === 'TokenExpiredError'){
            window.location.href = '/';
        }
        else if (user){
            this.user = {...user};
            this.setState({ detail_open: true})
        }
    }


    onOpenDialog = ( open = true, id = null) =>{

        this.setState({ delete_confirm_open: open });

        if (open){
            this.id_to_delete = id;
            console.log("open:" + this.id_to_delete);
        }
    }

    onDeleteAction = async () =>{

        //console.log("delete" +  this.id_to_delete);

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

            const regExp = new RegExp(text, 'i');
            const fields = this.columns.map( e => e.field.trim() );

            this.setState({
                rows: this.rows.filter( item => {

                    for (const field of fields) {   
                        if (Object.hasOwnProperty.call(item, field) && regExp.test(item[field])) {
                            return true;
                        }
                    }
                    return false;
                })
                    
            });
        }
    }


    onMultiDeleteAction = async () =>{
        
        console.log("selected rowData:", this.selectedRowData);
        
        let refresh = false;

        for (const item of  this.selectedRowData) {
            const status = await Api.del(Api.urls.doctors + '/' + item.id , {
                'Authorization': 'Bearer ' + this.state.token
            });

            if (status)
                refresh = status;
        }

        if (refresh){
            this.loadData();
        }

        

    }


    onDetailClose = () => {
        this.setState({ detail_open: false })
    }


    onOKAction = async (data) => {
       
        let status = undefined;

        if (data.id !== undefined){
            status = await Api.patch(Api.urls.doctors +  '/' + data.id, data, {
                'Authorization': 'Bearer ' + this.state.token
            })
        }
        else{
            status = await Api.post(Api.urls.doctors, data, {
                'Authorization': 'Bearer ' + this.state.token
            })
        }

        if (status === 204 || status === 200 ){

            this.setState({ detail_open: false })
            this.loadData();

        }
        else{
            this.message = lang.errors[status];
            this.onErrorMessage(true);
        }     
    }


    onErrorMessage = (error_open = true) => {
        this.setState({ error_open })
    }


    onSelectionModelChange = (e) => {
        const selectedIDs = new Set(e.selectionModel);

        this.selectedRowData = this.rows.filter((row) =>
          selectedIDs.has(row.id)
        );

        // console.log("selected rowData:", this.selectedRowData);
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

                    onSelectionModelChange={this.onSelectionModelChange}

                    
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
                    onOK = {this.onOKAction}  
                    user = {this.user}
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
