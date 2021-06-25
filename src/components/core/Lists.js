import React, { Component } from 'react'
import ConfirmDialog from '../helpers/ConfitmDialog';

import lang from '../../language';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import DatagridPage from '../helpers/DatagridPage';

class Lists extends Component{

    constructor(props){
        super(props);

        if ( props.auth === undefined){
            window.location.href = '/';
        }

        this.user = {};
        this.selectedRowData = [];
        this.columns = [];
        this.rows = [];

        const {auth} = this.props;
       

        this.state = {
            rows : this.rows.slice(),
            auth,
            delete_confirm_open : false,
            detail_open : false,
            error_open : false
        };
    }

    componentDidMount = () => {
        this.onLoadData();
    }


    getConfirmDialog = () => (
        <ConfirmDialog
            title={lang.delete}
            open={this.state.delete_confirm_open}
            setOpen={this.onDeleteConfirm}
            onConfirm={this.onDeleteAction}>
        
            {lang.delete_question}
            
        </ConfirmDialog>
    ) 

    getDetailDialog = () => {}


    getDataGridPage = (title, baseUrl) => (
        <DatagridPage
            title = {title}
            columns = {this.columns}
            rows = {this.state.rows}
            
            baseUrl = {baseUrl}

            onAdd = {this.onAddAction}
            onSearch = {this.onSearchAction}
            onDelete = {this.onMultiDeleteAction}
            onReload = {this.onLoadData}

            onSelectionModelChange={this.onSelectionModelChange}
        />
    )

    getSnackbar = () => (

        <Snackbar
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open = {this.state.error_open}
            onClose={this.onErrorMessage}
            >

            <MuiAlert elevation={6} variant="filled" severity="error" >{this.message}! </MuiAlert>

        </Snackbar>
    )


    onSearchAction = e =>{

        const text = e.target.value;

        if (!text.length || text.length >= 3 ){

            const regExp = new RegExp(text, 'i');
            const fields = this.columns.map( e => e.field.trim() );

            this.setState({
                rows: this.rows.filter( item => {

                    for (const field of fields) {   
        
                        if (Object.hasOwnProperty.call(item, field)) {

                            const value = typeof(item[field]) === 'object' ? item[field].name : item[field];

                            if( regExp.test(value) ){
                                return true
                            }                                
                        }
                    }
                    return false;
                })
            });
        }
    }


    onAddAction = e =>{
        this.user = {};
        this.setState({ detail_open: true })
    }


    onDeleteConfirm = ( open = true, id = null) =>{

        this.setState({ delete_confirm_open: open });

        if (open){
            this.id_to_delete = id;
        }
    }


    onDetailClose = () => {
        this.setState({ detail_open: false })
    }


    onErrorMessage = (error_open = true) => {
        this.setState({ error_open })
    }


    onSelectionModelChange = (e) => {
        const selectedIDs = new Set(e.selectionModel);
        this.selectedRowData = this.rows.filter(row =>selectedIDs.has(row.id));
    }
}

export default Lists;