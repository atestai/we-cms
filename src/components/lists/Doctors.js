import React, { Fragment } from 'react'

import { IconButton } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Doctor from '../details/Doctor';

import lang from '../../language';
import Api from '../../helpers/api'
import Lists from '../core/Lists';



class Doctors extends Lists {

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
                            onClick={ () => this.onEditDetail(params.id) }> 
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

    }

    
    onLoadData = async () => {

        if (this.state.auth.token ){
            const data = await Api.get(Api.urls.list_doctors, null, {
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
        const user = await Api.get(Api.urls.doctors + '/' + id, {}, {
            'Authorization': 'Bearer ' + this.state.auth.token.token
        });

        if (user !== undefined && user.name === 'TokenExpiredError'){
            window.location.href = '/';
        }
        else if (user){
            this.user = {...user};
            this.setState({ detail_open: true})
        }
    }



    onDeleteAction = async () =>{

        //console.log("delete" +  this.id_to_delete);

        let id = this.id_to_delete;

        if (id != null ){

            if (this.state.auth ){
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
            this.loadData();
        }
    }


    onDetailClose = () => {
        this.setState({ detail_open: false })
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
            this.loadData();

        }
        else{
            this.message = lang.errors[status];
            this.onErrorMessage(true);
        }     
    }


    getDetailDialog = () => (
        <Doctor
            open = {this.state.detail_open}
            detailClose = {this.onDetailClose} 
            onOK = {this.onOKDetailAction}  
            user = {this.user}
        />
    )

    render() {

        return (        
            <Fragment>

                {this.getDataGridPage(lang.doctors, '/doctors/')}
                {this.getConfirmDialog()}
                {this.getDetailDialog()}
                {this.getSnackbar()}

            </Fragment>
        )
    }
}

export default Doctors;
